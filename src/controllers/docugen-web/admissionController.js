import Account from "../../models/docugen-web/Account.js";

export const accountRegister = async (req, res) => {
 console.log({req:req.body})
 try {
  //TO-DO:validation
  const newAccount = new Account(req.body);
  const accountsExists = await newAccount.checkAccountExistence();
  if (accountsExists) {
   return res.status(400).json({
    success: false,
    message: "Account with this username or email already exists",
   });
  }
  const accountCreated = await newAccount.saveAccount();
  if (accountCreated) {
   res.status(201).json({
    success: true,
    message: "Account created successfully",
    data: newAccount,
   });
  }
 } catch (error) {
  res.status(500).json({
   success: false,
   message: "Error creating the account",
   error: error.message,
  });
 }
};
