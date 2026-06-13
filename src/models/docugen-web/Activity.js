// ACTIVITY MODEL

import mongoose, { Schema } from 'mongoose';

// *************************************************************************************************
// Document
const ActivitySchema = new mongoose.Schema(
  {
    stage: {
      type: Number,
      default: 1,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    alias: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    success: {
      type: Boolean,
      default: false,
      required: true,
    },
    associated_session: {
      type: Schema.Types.ObjectId,
      ref: 'Session',
      required: true,
    },
    associated_account: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    associated_process: {
      type: Schema.Types.ObjectId,
      ref: 'Process',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// *************************************************************************************************
// Methods
ActivitySchema.statics.findProcessActivities = async function (processId) {
  if (!processId) throw new Error('E1005');
  const activitiesModel = this;
  //moongose query
  const activities_set = await activitiesModel
    .find({
      associated_process: processId,
    })
    .sort({ createdAt: -1 });
  if (!activities_set) throw new Error('E1006');
  return activities_set;
};

ActivitySchema.methods.createActivity = async function (activityData, referenceData) {
  if (!activityData || !referenceData) throw new Error('E1001');

  const activityModel = this;
  const { stage, name, alias, description } = activityData;
  const { associated_account, associated_session, associated_process } = referenceData;

  activityModel.stage = stage;
  activityModel.name = name;
  activityModel.alias = alias;
  activityModel.description = description;
  activityModel.associated_session = associated_session;
  activityModel.associated_account = associated_account;
  activityModel.associated_process = associated_process;

  const createdActivity = await activityModel.save();
  if (!createdActivity) throw new Error('E1002');
  return createdActivity;
};

ActivitySchema.methods.setActivitySuccess = async function (success) {
  if (typeof success === 'boolean') {
    const activityModel = this;
    activityModel.success = success;

    const updatedActivity = await activityModel.save();
    if (!updatedActivity) throw new Error('E1003');
    return updatedActivity;
  } else {
    throw new Error('E1004');
  }
};

const Activity = mongoose.model('Activity', ActivitySchema);
export default Activity;
