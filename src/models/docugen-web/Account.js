import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../helpers/models.js';

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
      maxlength: 30,
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

// Methods
// Check account existence by username or email
AccountSchema.statics.findAccount = async function (email, username, id) {
  const accounts = this;
  const query = [];
  if (email) query.push({ 'user.email': email });
  if (username) query.push({ username });
  if (id && mongoose.Types.ObjectId.isValid(id)) query.push({ _id: id });
  if (query.length === 0) return null;

  try {
    const account = await accounts.findOne({
      $or: query,
    });
    return account;
  } catch (error) {
    console.log('Error finding account.', error);
    throw error;
  }
};

AccountSchema.statics.setAccountRole = async function (accountId, role) {
  const accounts = this;
  return await accounts.findOneAndUpdate(
    { _id: accountId },
    { $set: { role: role } },
    { new: true }
  );
};

AccountSchema.statics.setAccountStatus = async function (accountId, status) {
  const accounts = this;
  return await accounts.findOneAndUpdate(
    { _id: accountId },
    { $set: { status: status } },
    { new: true }
  );
};

AccountSchema.statics.setAccountServices = async function (accountId, services) {
  const accounts = this;
  return await accounts.findOneAndUpdate(
    { _id: accountId },
    { $set: { services: services } },
    { new: true }
  );
};

AccountSchema.methods.saveAccount = async function () {
  const account = this;
  return await account.save();
};

AccountSchema.methods.verifyAccountPassword = async function (password) {
  const account = this;
  const isMatch = await bcrypt.compare(password, account.password);
  return isMatch;
};

AccountSchema.methods.generateAccountAccessToken = function () {
  const account = this;
  const payload = {
    id: account._id,
    username: account.username,
    role: account.role,
    status: account.status,
  };
  const response = generateToken(payload, 'access');
  return response.payload.token;
};

AccountSchema.methods.generateAccountRefreshToken = function () {
  const account = this;
  const payload = {
    id: account._id,
    username: account.username,
    role: account.role,
    status: account.status,
  };
  const response = generateToken(payload, 'refresh');
  return response.payload.token;
};

const Account = mongoose.model('Account', AccountSchema);
export default Account;
