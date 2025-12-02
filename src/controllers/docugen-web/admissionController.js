import Account from "../../models/docugen-web/Account.js";
import { USERS } from "../../constants/users.js"; 

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
  const accountCreatedUpdated1 = await Account.setAccountRole(accountCreated._id, USERS.type.client.role.developer); // Giving the default "developer role"
  const accountCreatedUpdated2 = await Account.setAccountStatus(accountCreated._id, USERS.status.active); //Default active
  const accountCreatedUpdated3 = await Account.setAccountServices(accountCreated._id, [USERS.services.edition, USERS.services.generation]); //Default both services enabled

  if (accountCreated) {
   res.status(201).json({
    success: true,
    message: "Account created successfully.",
    data: accountCreatedUpdated3,
   });
  }
 } catch (error) {
  res.status(500).json({
   success: false,
   message: "Error creating the account.",
   error: error.message,
  });
 }
};

export const sessionStarter = async (req, res) => {
 try {
  const arrivingCredentials = req.body;

  //--> Access authority
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
  //Verifying password
  const isMatch = await registeredAccount.verifyAccountPassword(
   arrivingCredentials.password
  );
  if (!isMatch) {
   return res
    .status(400)
    .json({ success: false, message: "Incorrect password." });
  }
  //Preparing response
  if (registeredAccount && isMatch) {
   // generating token
   const token = registeredAccount.generateAccountToken();
   if (!token) {
    return res
     .status(500)
     .json({ success: false, message: "Error generating the token." });
   }
   // sending response
   res.status(200).json({
    success: true,
    message: "Welcome",
    token: token,
    accountData: registeredAccount,
   });
  }
 } catch (error) {
  res.status(500).json({
   success: false,
   message: "Error in login process.",
   error: error.message,
  });
 }
};
