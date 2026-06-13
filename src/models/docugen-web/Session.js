// SESSION MODEL

import mongoose, { Schema } from 'mongoose';

// *************************************************************************************************
// Subdocument
// const activitiesSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     description: { type: String, required: true, trim: true },
//     service: { type: String, required: true, trim: true },
//     associated_template: {
//       type: Schema.Types.ObjectId,
//       ref: 'Template',
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// Document
const SessionSchema = new mongoose.Schema(
  {
    associated_account: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    duration: {
      type: Number, // minutes
      default: 0,
    },
    status: {
      type: String,
      enum: ['active', 'terminated', 'expired'],
      default: 'terminated',
      required: true,
    },
    token: { type: String, default: '' }, // Refresh token
    loginTime: {
      type: Date,
      default: Date.now,
    },
    logoutTime: {
      type: Date,
    },
    // activities: [activitiesSchema],
  },
  {
    timestamps: true,
  }
);

// *************************************************************************************************
// Methods

// Retrive all sessions
SessionSchema.statics.findAllSessions = async function () {
  const sessions = this;
  const all_sessions = await sessions.find({});
  if (!all_sessions) throw new Error('E0213');
  if (all_sessions.length === 0) throw new Error('E0214');
  return all_sessions;
};

// Checking if there are a set of historical sessions for the Account id provided
SessionSchema.statics.findHistoricalSessions = async function (associatedAccountId) {
  const sessions = this;
  if (!associatedAccountId) throw new Error('E0219');
  //moongose query
  const sessions_set = await sessions
    .find({
      associated_account: associatedAccountId,
      status: { $in: ['terminated', 'expired'] },
    })
    .populate('associated_account')
    .sort({ createdAt: -1 });
  if (!sessions_set) throw new Error('E0220');
  return sessions_set;
};

// To find the current session if any
SessionSchema.statics.findCurrentSession = async function (associatedAccountId) {
  const sessions = this;
  if (!associatedAccountId) throw new Error('E0202');
  const current_session = await sessions
    .findOne({
      associated_account: associatedAccountId,
      status: 'active',
    })
    .populate('associated_account');
  if (!current_session) throw new Error('E0203');
  return current_session;
};

// To find all active sessions
SessionSchema.statics.findActiveSessions = async function () {
  const sessions = this;
  const active_sessions = await sessions.find({ status: 'active' }).populate('associated_account');
  if (!active_sessions) throw new Error('E0211');
  if (active_sessions.length === 0) throw new Error('E0212');
  return active_sessions;
};

SessionSchema.statics.getCustomizedSessions = async function (id, params) {
  const sessionsModel = this;
  const { filter, sort, skip, limit } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('E0216');
  }

  const accountFilter = {
    associated_account: new mongoose.Types.ObjectId(id),
    ...filter,
  };

  const [sessions, total] = await Promise.all([
    sessionsModel
      .find(accountFilter)
      .populate('associated_account')
      .sort(sort)
      .skip(skip)
      .limit(limit),
    sessionsModel.countDocuments(accountFilter),
  ]);

  return { sessions, total };
};

//Create a new session and add the idaccount and status active
SessionSchema.methods.createSession = async function (associatedAccountId) {
  const session = this;
  if (!associatedAccountId) throw new Error('E0207');
  session.associated_account = associatedAccountId;
  session.status = 'active';
  session.loginTime = new Date();
  session.duration = 0;
  const createdSession = await session.save();
  if (!createdSession) throw new Error('E0208');
  return createdSession;
};

// Adding a refresh token to the session
SessionSchema.methods.addSessionToken = async function (token) {
  const session = this;
  if (!token) throw new Error('E0217');
  session.token = token;
  const updatedSession = await session.save();
  if (!updatedSession) throw new Error('E0218');
  return updatedSession;
};

//Update the duration field according to the help od the registered and currect timestamp
//closureStatus must be : "inactive" or "expired"
SessionSchema.methods.endSession = async function (closureStatus) {
  const session = this;
  if (!closureStatus) throw new Error('E0204');
  if (closureStatus == 'expired' || closureStatus == 'terminated') {
    session.logoutTime = new Date();
    const loginTime = session.loginTime.getTime();
    const logoutTime = session.logoutTime.getTime();
    session.duration = Math.round((logoutTime - loginTime) / (1000 * 60)); //Calculating the session's duration in minutes
    session.status = closureStatus;
    session.token = '';
    const updatedSession = await session.save();
    if (!updatedSession) throw new Error('E0206');
    return updatedSession;
  } else {
    throw new Error('E0205');
  }
};

//Add a new activity to the currect session
// SessionSchema.methods.addSessionActivity = async function (activity) {
//   const session = this;
//   if (session.status !== 'active') {
//     throw new Error('Could not add activities to a not active activity.');
//   }
//   if (!activity.name || !activity.description) {
//     throw new Error('the activity has to have name and description.');
//   }
//   session.activities.push({
//     name: activity.name,
//     description: activity.description,
//   });
//   return await session.save();
// };

const Session = mongoose.model('Session', SessionSchema);
export default Session;
