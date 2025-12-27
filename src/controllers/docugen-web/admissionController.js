import Account from '../../models/docugen-web/Account.js';
import Session from '../../models/docugen-web/Session.js';
import { USERS } from '../../constants/users.js';
import { KEYS } from '../../constants/keys.js';
import { generateToken, verifyToken } from '../../helpers/models.js';

// ******************************************************************************
// SIGNING UP PROCESS
// It asummes a developer is signing up so a developer role account is created
// ******************************************************************************
export const accountRegister = async (req, res) => {
  try {
    const arrivingAccount = req.body;
    const registeredAccount = await Account.findAccount(
      arrivingAccount.user.email,
      arrivingAccount.username,
      ''
    );
    if (registeredAccount) {
      return res.status(400).json({
        success: false,
        message: 'Account with this username or email already exists.',
      });
    }
    const newAccount = new Account(arrivingAccount);
    const accountCreated = await newAccount.saveAccount();
    await Account.setAccountRole(accountCreated._id, USERS.type.client.role.developer); // Giving the default "developer role"
    await Account.setAccountStatus(accountCreated._id, USERS.status.active); //Default active
    const accountCreatedUpdated = await Account.setAccountServices(accountCreated._id, [
      USERS.services.edition,
      USERS.services.generation,
    ]); //Default: both services enabled

    if (accountCreated) {
      return res.status(201).json({
        success: true,
        message: 'Account created successfully.',
        data: accountCreatedUpdated,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating the account.',
      error: error.message,
    });
  }
};
// ******************************************************************************

// ******************************************************************************
// LOGIN PROCESS
// ******************************************************************************
export const sessionStarter = async (req, res) => {
  try {
    const arrivingCredentials = req.body;

    // Checking if there is a registered account with the email or username
    const registeredAccount = await Account.findAccount(
      arrivingCredentials.email,
      arrivingCredentials.username,
      ''
    );
    if (!registeredAccount) {
      return res.status(400).json({
        success: false,
        message: 'It doesn´t exist an account asociated with this email.',
      });
    }

    // Verifying password
    const isMatch = await registeredAccount.verifyAccountPassword(arrivingCredentials.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Incorrect password.' });
    }

    // Checking if there is a current  ongoing session
    const currentSession = await Session.findCurrentSession(registeredAccount._id);
    if (currentSession) {
      currentSession.endSession('inactive');// Closing the ongoing session
    }

    //Creating a new session
    const newSession = new Session();
    const createdSession = await newSession.createSession(registeredAccount._id);
    
    if (!createdSession) {
      return res
        .status(500)
        .json({ success: false, message: "A new session hasn't been created." });
    }

    // Generating tokens
    const accessToken = registeredAccount.generateAccountAccessToken();
    if (!accessToken) {
      return res
        .status(500)
        .json({ success: false, message: 'Error generating the access token.' });
    }
    const refreshToken = registeredAccount.generateAccountRefreshToken();
    if (!refreshToken) {
      return res
        .status(500)
        .json({ success: false, message: 'Error generating the refresh token.' });
    }

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

    const cookieConfig = KEYS.refresh.cookie_config
    res.cookie('refreshToken', refreshToken, cookieConfig);

    return res.status(200).json({
      success: true,
      message: 'Welcome',
      accessToken: accessToken,
      accountData: accountPayload,
      sessionData: sessionPayload,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error in login process.',
      error: error.message,
    });
  }
};
// ******************************************************************************

// ******************************************************************************
// LOGOUT PROCESS
// ******************************************************************************
export const sessionCloser = async (req, res) => {
  const arrivingIdentity = req.body;

  // Checking if there is a registered account with the username
  const registeredAccount = await Account.findAccount('', arrivingIdentity.username, '');
  if (!registeredAccount) {
    return res.status(400).json({
      success: false,
      message: 'It doesn´t exist an account asociated with this email.',
    });
  }

  // Creating a new session, checking if there is a current  ongoing session
  const currentSession = await Session.findCurrentSession(registeredAccount._id);
  if (!currentSession) {
    return res.status(400).json({
      success: false,
      message: "Current session for the account hasn't been found. The session has been closed.",
    });
  }
  
  currentSession.endSession('inactive');// Closing the ongoing session in DB

  // Order to delete the cookie in frontend
  const cookieConfig = KEYS.refresh.cookie_config
  res.clearCookie('refreshToken', cookieConfig)

  return res.status(200).json({
    success: true,
    message: 'Session closed.',
  });
};
// ******************************************************************************

// ******************************************************************************
// RENEW ACCESS
//"access" abstract entity works with "account" and "session" entities
// ******************************************************************************
export const accessRenewer = async (req, res) => {
  let response = null;
  const token = req.cookies.refreshToken;

  // Validating refresh token existence in the cookie.
  if (!token) {
    return res.status(403).json({
      success: false,
      message: "The refresh token hasn't been found. Log in again.",
    });
  }

  // Verifying refresh token, extracting payload of token and account id
  response = await verifyToken(token, 'refresh');
  if (!response.success) {
    return res.status(403).json({
      success: false,
      message: response.message,
    });
  }
  const payload = response.payload;
  const accountId = response.payload.id;

  // Renewing the access token
  response = generateToken(payload, 'access');
  if (!response.success) {
    return res.status(403).json({
      success: false,
      message: response.message,
    });
  }
  
  // Getting the current account and session
  const account = await Account.findAccount('', '', accountId);
  if (!account) {
    return res.status(400).json({
      success: false,
      message: 'It doesn´t exist an account asociated with the id.',
    });
  }
  const session = await Session.findCurrentSession(accountId);
  if (!session) {
    return res.status(400).json({
      success: false,
      message: "Current session for the account hasn't been found.",
    });
  }

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

  // Sending response
  return res.status(200).json({
    success: true,
    message: 'Welcome again',
    accessToken: response.payload.token,
    accountData: accountPayload,
    sessionData: sessionPayload,
  });
};
// ******************************************************************************
