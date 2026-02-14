// ACCOUNT MODEL
// The account can be either for a 'dev' or 'admin' user role.

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// *************************************************************************************************
// Subdocuments
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  lastname: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
});
const serviceSchema = new mongoose.Schema({
  name: { type: String , trim: true },
  description: { type: String, trim: true },
});

// Document
const AccountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
    },
    role: {
      type: String,
      enum: ['dev', 'admin'],
      default: "dev",
      // required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'suspended', 'inactive'],
      default: "active",
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

// *************************************************************************************************
// Hooks
AccountSchema.pre('save', async function (next) {
  const account = this;
  if (!account.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(account.password, salt);
    account.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

// *************************************************************************************************
// Methods 
AccountSchema.statics.findAccount = async function (email, username, id) {
  const accounts = this;
  const query = []
  if(email) query.push({ 'user.email': email })
  if(username) query.push( { username })
  if(id) query.push({ _id: id })
  if(query.length === 0 ) throw new Error('E0101');

  // if (!email || !username || !id || !mongoose.Types.ObjectId.isValid(id)) 
  const account = await accounts.findOne({
    $or: query,
  });
  if (!account) throw new Error('E0102');
  return account;
};

AccountSchema.statics.setAccountRole = async function (accountId, role) {
  const accounts = this;
  if (!accountId || !role) throw new Error('E0105');
  const account = await accounts.findOneAndUpdate(
    { _id: accountId },
    { $set: { role: role } },
    { new: true }
  );
  if (!account) throw new Error('E0106');
  return account;
};

AccountSchema.statics.setAccountStatus = async function (accountId, status) {
  const accounts = this;
  if (!accountId || !status) throw new Error('E0107');
  const account = await accounts.findOneAndUpdate(
    { _id: accountId },
    { $set: { status: status } },
    { new: true }
  );
  if (!account) throw new Error('E0108');
  return account;
};

AccountSchema.statics.setAccountServices = async function (accountId, services) {
  const accounts = this;
  if (!accountId || !services) throw new Error('E0109');
  const account = await accounts.findOneAndUpdate(
    { _id: accountId },
    { $set: { services: services } },
    { new: true }
  );
  if (!account) throw new Error('E0110');
  return account;
};

AccountSchema.methods.saveAccount = async function () {
  const account = this;
  const response = await account.save();
  if (!response) throw new Error('E0104');
  return response;
};

AccountSchema.methods.verifyAccountPassword = async function (password) {
  const account = this;
  if(!password) throw new Error("E0111")
  const isMatch = await bcrypt.compare(password, account.password);
  return isMatch;
};


const Account = mongoose.model('Account', AccountSchema);
export default Account;
