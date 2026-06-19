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
    associated_resource: {
      type: Schema.Types.ObjectId,
      refPath: 'associated_resource_model',
    },
    associated_resource_model: {
      type: String,
      trim: true,
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

ActivitySchema.statics.getActivities = async function (query) {
  if (!query) throw new Error('E1009');
  const activitiesModel = this;
  const activities = await activitiesModel.find(query).sort({ createdAt: -1 });
  if (!activities) throw new Error('E1010');
  return activities;
};

ActivitySchema.statics.findActivity = async function (id) {
  if (!id) throw new Error('E1013');
  const activitiesModel = this;
  const activity = await activitiesModel.findOne({ _id: id });
  if (!activity) throw new Error('E1014');
  return activity;
};

ActivitySchema.methods.createActivity = async function (activityData, processId) {
  if (!activityData || !processId) throw new Error('E1001');

  const activityModel = this;
  const { stage, name, alias, description } = activityData;
  activityModel.stage = stage;
  activityModel.name = name;
  activityModel.alias = alias;
  activityModel.description = description;
  activityModel.associated_process = processId;

  const createdActivity = await activityModel.save();
  if (!createdActivity) throw new Error('E1002');
  return createdActivity;
};

ActivitySchema.methods.addActivityResource = async function (id, model) {
  if (!id || !model) throw new Error('E1011');
  const activityModel = this;
  activityModel.associated_resource_model = model;
  activityModel.associated_resource = id;
  const updatedActivity = await activityModel.save();
  if (!updatedActivity) throw new Error('E1012');
  return updatedActivity;
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
