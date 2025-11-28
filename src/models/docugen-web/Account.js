import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Subdocuments schemas
const userSchema = new mongoose.Schema({
 name: { type: String, required: true, trim: true },
 lastname: { type: String, required: true, trim: true },
 email: { type: String, required: true, unique: true, trim: true },
});
const serviceSchema = new mongoose.Schema({
 name: { type: String, required: true, trim: true },
 description: { type: String, required: true, trim: true },
});

// Main document schema
const AccountSchema = new mongoose.Schema(
 {
  username: {
   type: String,
   required: true,
   trim: true,
   unique: true,
   minlength: 3,
   maxlength: 30
  },
  role: {
   type: String,
   // required: true,
   trim: true,
  },
  password: {
   type: String,
   required: true,
  },
  status: {
   type: String,
   // required: true,
   trim: true,
  },
  user: userSchema,
  services: [serviceSchema],
 },
 {
  timestamps: true,
 }
);

// Hooks
AccountSchema.pre('save', async function(next){
 const account = this
 if (!account.isModified('password')) return next();
 try{
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(account.password, salt)
  account.password = hash;
  next();
 }catch(error){
  next(error)
 }
})

// Methods
// Check account existence by username or email
AccountSchema.methods.checkAccountExistence = async function(){
 const account = this
 try{
  const existingAccount = await Account.findOne({
   $or: [
    { username: account.username },
    { 'user.email': account.user.email }
   ]
  })
  return existingAccount
 }catch(error){
  console.log('Error checking account existence:', error)
  throw error
 }
}
//------ AccountRegister -------
AccountSchema.methods.saveAccount = async function(){
 const account = this
 return await account.save()
}

const Account = mongoose.model("Account", AccountSchema);
export default Account;
