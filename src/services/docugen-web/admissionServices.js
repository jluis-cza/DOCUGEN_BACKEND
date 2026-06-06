// ADMISSION SERVICES
// Manages the main business logic of the admission module.

import { KEYS } from '../../constants/keys.js';
import { USERS } from '../../constants/users.js';
import { SERVICES } from '../../constants/services.js';
import { jwtTimeoutToMinutesParser } from '../../helpers/docugen-web/admissionHelper.js';
import Session from '../../models/docugen-web/Session.js';
import Account from '../../models/docugen-web/Account.js';
import Service from '../../models/docugen-web/Service.js';
import ServiceLookup from '../../models/docugen-web/ServiceLookup.js';
import {
  generateToken,
  verifyToken,
  sendEmail,
} from '../../helpers/docugen-web/admissionHelper.js';

// *************************************************************************************************
// FROM CONTROLLERS
// *************************************************************************************************

// ************* SIGN-UP *************
// It asummes a developer is signing up so a developer role account is created
export const myAccountRegister = async (data) => {
  if (!data) throw new Error('E0112');
  const { username, user } = data;
  const { email } = user;
  try {
    const registeredAccount = await Account.findAccount(email, username, '', '');
    if (registeredAccount) throw new Error('E0103');
  } catch (error) {
    if (error.message !== 'E0102') throw error;
  }
  const newAccount = new Account(data);
  const accountCreated = await newAccount.saveAccount();

  // Email verification
  const payload = { bytes: 64 };
  const token = generateToken(payload, 'verification');
  await Account.setAccountToken(accountCreated._id, token);
  const url = SERVICES.frontend.url + `/verification?token=${token}`;
  console.log({ VERIFICATION_URL: url });

  // Sending the verification message to the email provided
  // const info = sendEmail(email, 1, { url });
  // console.log({ id: info.messageId, accepted: info.accepted, rejected: info.rejected });

  // Admin user registration hardcoded
  // const accountCreatedUpdated = await Account.setAccountRole(accountCreated._id, USERS.server.role.administrator); // Giving the default "developer role"
  // await Account.setAccountStatus(accountCreated._id, USERS.client.status.active); //Default active

  return accountCreated;
};

// ************* SIGN-IN *************
export const mySessionStarter = async (data) => {
  if (!data) throw new Error('E0209');
  const { username, user, password } = data;
  const { email } = user;
  const registeredAccount = await Account.findAccount(email, username, '', ''); // Checking if there is a registered account with the email or username
  const isMatch = await registeredAccount.verifyAccountPassword(password); // Verifying password
  if (!isMatch) throw new Error('E0201');
  try {
    const currentSession = await Session.findCurrentSession(registeredAccount._id); // Checking if there is a current  ongoing session
    currentSession.endSession('terminated'); // Closing the ongoing session
  } catch (error) {
    if (error.message !== 'E0203') throw error;
  }
  // Generating tokens
  const payload = {
    id: registeredAccount._id,
    username: registeredAccount.username,
    role: registeredAccount.role,
    status: registeredAccount.status,
  };
  const accessToken = generateToken(payload, 'access');
  const refreshToken = generateToken(payload, 'refresh');
  // Creating a new session
  const newSession = new Session();
  const createdSession = await newSession.createSession(registeredAccount._id, refreshToken);
  // Sending response
  const accountPayload = {
    id: registeredAccount._id,
    username: registeredAccount.username,
    role: registeredAccount.role,
    status: registeredAccount.status,
  };
  const sessionPayload = {
    id: createdSession._id,
    status: createdSession.status,
  };
  const response = { accessToken, refreshToken, accountPayload, sessionPayload };
  return response;
};

// ************* LOG-OUT *************
export const mySessionCloser = async (data) => {
  if (!data) throw new Error('E0210');
  const arrivingIdentity = data;
  const registeredAccount = await Account.findAccount('', arrivingIdentity.username, '', ''); // Checking if there is a registered account with the username
  const currentSession = await Session.findCurrentSession(registeredAccount._id); // Checking if there is a current  ongoing session
  const closedSession = currentSession.endSession('terminated'); // Closing the ongoing session in DB
  return closedSession;
};

// ************* RENEW ACCESS *************
export const accessRenewer = async (token) => {
  const { payload } = await verifyToken(token, 'refresh'); // Verifying refresh token
  const accountId = payload.id; // Extracting payload of token and account id
  const newAccessToken = generateToken(payload, 'access'); // Renewing the access token
  // Getting the current account and session
  const account = await Account.findAccount('', '', accountId, '');
  const session = await Session.findCurrentSession(accountId);
  // Generating the account and session payloads
  const accountPayload = {
    id: account._id,
    username: account.username,
    role: account.role,
    status: account.status,
  };
  const sessionPayload = {
    id: session._id,
    status: session.status,
  };
  // Sending the response
  const response = { newAccessToken, accountPayload, sessionPayload }; // Sending response
  return response;
};

// ************* EMAIL VERIFIER *************
export const emailVerifier = async (token) => {
  if (!token) throw new Error('E0603');
  const account = await Account.findAccount('', '', '', token);

  // Adding services
  // adding the "generation" service
  let serviceLookup = {};
  serviceLookup = await ServiceLookup.findServiceLookup('', 'Generación de Documentos');
  const newService1 = new Service();
  await newService1.createService(account._id, serviceLookup._id);
  // adding the "edition" service
  serviceLookup = await ServiceLookup.findServiceLookup('', 'Edición de Plantillas');
  const newService2 = new Service();
  await newService2.createService(account._id, serviceLookup._id);

  await Account.setAccountStatus(account._id, USERS.client.status.active); // Activating the account
  await Account.setAccountToken(account._id, '');
  return { email: account.user.email };
};
// *************************************************************************************************

// *************************************************************************************************
// FROM CRON JOBS
// *************************************************************************************************

// ************* ACTIVE SESSION CLOSER *************
// It uses "refresh token" timeouts to close sessions
export const checkActiveSessionDuration = async () => {
  let sessionTimeoutString = null;
  let sessionTimeoutNumber = null;
  let userRole = null;
  let loginTime = null;
  let currentDuration = null;
  let activeSessions = [];
  const adminRole = USERS.server.role.administrator;
  const devRole = USERS.client.role.developer;
  const adminSessionTimeout = KEYS.refresh.session_timeout.admin;
  const devSessionTimeout = KEYS.refresh.session_timeout.dev;
  // Getting the active sessions
  try {
    activeSessions = await Session.findActiveSessions();
  } catch (error) {
    if (error.message !== 'E0212') throw error;
  }
  // Checking session duration
  for (const activeSession of activeSessions) {
    // Checking user's role and assigned timeouts
    userRole = activeSession.associated_account.role;
    sessionTimeoutString =
      userRole === adminRole ? adminSessionTimeout : userRole === devRole ? devSessionTimeout : '0';
    sessionTimeoutNumber = jwtTimeoutToMinutesParser(sessionTimeoutString); // Parsing
    // Calculating current session duration
    loginTime = activeSession.loginTime.getTime();
    const currentTime = new Date();
    currentDuration = Math.round((currentTime.getTime() - loginTime) / (1000 * 60)); //minutes
    // Executing closure of session if conditions are met
    if (currentDuration > sessionTimeoutNumber) {
      await activeSession.endSession('expired'); // assigns the "expired" status
      console.log('Expired session found and closed.');
    }
  }
};
// ************* INACTIVE ACCOUNT DELETER *************
export const checkInactiveAccounts = async () => {
  const response = await Account.deleteInactiveAccounts();
  if (response.deletedCount > 0) {
    console.log(`Deleted ${response.deletedCount} inactive accounts.`);
  }
};
// *************************************************************************************************
