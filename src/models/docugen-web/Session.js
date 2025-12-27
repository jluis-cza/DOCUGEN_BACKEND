import mongoose, { Schema } from 'mongoose';

// Subdocuments schemas
const activitiesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

// Main document schema
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
      enum: ['active', 'inactive', 'expired'],
      default: 'active',
      required: true,
    },
    loginTime: {
      type: Date,
      default: Date.now,
    },
    logoutTime: {
      type: Date,
    },
    activities: [activitiesSchema],
  },
  {
    timestamps: true,
  }
);

//Hooks
// SessionSchema.pre("save", function (next) {
//  const session = this;
//  if (session.status === "active" && session.loginTime) {
//   const hoursActive =
//    (Date.now() - session.loginTime.getTime()) / (1000 * 60 * 60);
//   if (hoursActive > 24) {
//    session.status = "expired";
//    session.logoutTime = new Date();
//    session.duration = Math.round(
//     (session.logoutTime - session.loginTime) / (1000 * 60)
//    );
//   }
//  }
//  next();
// });

// Methods
// Checking if there are a set of historical sessions for the Account id provided
SessionSchema.statics.findHistoricalSessions = async function (asociatedAccountId) {
  const sessions = this;
  try {
    //moongose query
    const sessions_set = await sessions
      .find({
        associated_account: asociatedAccountId,
        status: { $in: ['inactive', 'expired'] },
      })
      .populate('associated_account')
      .sort({ createdAt: -1 });
    return sessions_set;
  } catch (error) {
    console.log('Error finding sessions of account.', error);
    throw error;
  }
};

// To find the current session if any
SessionSchema.statics.findCurrentSession = async function (asociatedAccountId) {
  const sessions = this;
  try {
    const current_session = await sessions
      .findOne({
        associated_account: asociatedAccountId,
        status: 'active',
      })
      .populate('associated_account');
    return current_session;
  } catch (error) {
    console.log('Error finding current session.', error);
    throw error;
  }
};

//Create a new session and add the idaccount and status active
SessionSchema.methods.createSession = async function (asociatedAccountId) {
  const session = this;
  // const existingSession = await mongoose
  //  .model("Session")
  //  .findCurrentSession(asociatedAccountId);
  // if (existingSession) {
  //  throw new Error("There is an active session for this account.");
  // }
  session.associated_account = asociatedAccountId;
  session.status = 'active';
  session.loginTime = new Date();
  session.duration = 0;
  return await session.save();
};

//Update the duration field according to the help od the registered and currect timestamp
//closureStatus must be : "inactive" or "expired"
SessionSchema.methods.endSession = async function (closureStatus) {
  const session = this;

  // if (session.status !== "active") {
  //  throw new Error("The session is finished.");
  // }
  //Calculating the sessin's duration in minutes
  session.logoutTime = new Date();
  const loginTime = session.loginTime.getTime();
  const logoutTime = session.logoutTime.getTime();
  session.duration = Math.round((logoutTime - loginTime) / (1000 * 60));
  session.status = closureStatus;

  return await session.save();
};

//Add a new activity to the currect session
SessionSchema.methods.addSessionActivity = async function (activity) {
  const session = this;
  if (session.status !== 'active') {
    throw new Error('Could not add activities to a not active activity.');
  }
  if (!activity.name || !activity.description) {
    throw new Error('the activity has to have name and description.');
  }
  session.activities.push({
    name: activity.name,
    description: activity.description,
  });
  return await session.save();
};

const Session = mongoose.model('Session', SessionSchema);
export default Session;
