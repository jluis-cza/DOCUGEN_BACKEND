import Account from "../../models/docugen-web/Account.js";
import Session from "../../models/docugen-web/Session.js";
import { USERS } from "../../constants/users.js";

// ******************************************************************************
// SIGNING UP PROCESS
// It asummes a developer is signing up so a developer role account is created
// ******************************************************************************
export const accountRegister = async (req, res) => {
 try {
  const arrivingAccount = req.body;
  const registeredAccount = await Account.findAccount(
   arrivingAccount.user.email,
   arrivingAccount.username
  );
  if (registeredAccount) {
   return res.status(400).json({
    success: false,
    message: "Account with this username or email already exists.",
   });
  }
  const newAccount = new Account(arrivingAccount);
  const accountCreated = await newAccount.saveAccount();
  const accountCreatedUpdated1 = await Account.setAccountRole(
   accountCreated._id,
   USERS.type.client.role.developer
  ); // Giving the default "developer role"
  const accountCreatedUpdated2 = await Account.setAccountStatus(
   accountCreated._id,
   USERS.status.active
  ); //Default active
  const accountCreatedUpdated3 = await Account.setAccountServices(
   accountCreated._id,
   [USERS.services.edition, USERS.services.generation]
  ); //Default: both services enabled

  if (accountCreated) {
   return res.status(201).json({
    success: true,
    message: "Account created successfully.",
    data: accountCreatedUpdated3,
   });
  }
 } catch (error) {
  return res.status(500).json({
   success: false,
   message: "Error creating the account.",
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
   arrivingCredentials.username
  );
  if (!registeredAccount) {
   return res.status(400).json({
    success: false,
    message: "It doesn´t exist an account asociated with this email.",
   });
  }

  // Verifying password
  const isMatch = await registeredAccount.verifyAccountPassword(
   arrivingCredentials.password
  );
  if (!isMatch) {
   return res
    .status(400)
    .json({ success: false, message: "Incorrect password." });
  }

  // Creating a new session
  // Creating a new session - Checking if there is a current  ongoing session
  const currentSession = await Session.findCurrentSession(
   registeredAccount._id
  );
  if (currentSession) {
   // Closing the ongoing session
   currentSession.endSession();
  }
  // Creating a new session - Creating a new session
  const newSession = new Session();
  const createdSession = newSession.createSession(registeredAccount._id);
  if (!createdSession) {
   return res
    .status(500)
    .json({ success: false, message: "A new session hasn't been created." });
  }

  // Processing response
  // Processing response - Generating token
  const token = registeredAccount.generateAccountToken();
  if (!token) {
   return res
    .status(500)
    .json({ success: false, message: "Error generating the token." });
  }
  // Processing response - Sending response
  return res.status(200).json({
   success: true,
   message: "Welcome",
   token: token,
   accountData: registeredAccount,
  });
 } catch (error) {
  res.status(500).json({
   success: false,
   message: "Error in login process.",
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
 console.log({ reqBody: req.body });
 // Checking if there is a registered account with the username
 const registeredAccount = await Account.findAccount(
  "",
  arrivingIdentity.username
 );
 if (!registeredAccount) {
  return res.status(400).json({
   success: false,
   message: "It doesn´t exist an account asociated with this email.",
  });
 }
 // Creating a new session - Checking if there is a current  ongoing session
 const currentSession = await Session.findCurrentSession(registeredAccount._id);
 if (!currentSession) {
  return res.status(400).json({
   success: false,
   message:
    "Current session for the account hasn't been found. The session has been closed.",
  });
 }
 // Closing the ongoing session
 currentSession.endSession();

 return res.status(200).json({
  success: true,
  message: "Session closed.",
 });
};
