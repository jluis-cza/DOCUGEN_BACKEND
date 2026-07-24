// PROCESS MODEL

import mongoose, { Schema } from 'mongoose';
import { identifyModuleProcessPrefix } from '../../helpers/docugen-web/managementHelper.js';

// *************************************************************************************************
// Subdocuments
const activitiesSchema = new mongoose.Schema(
  {
    associated_activity: {
      type: Schema.Types.ObjectId,
      ref: 'Activity',
      required: true,
    },
  },
  { timestamps: true }
);

// Document
const ProcessSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      index: true,
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
    stages: {
      type: Number,
      default: 1,
      required: true,
    },
    status: {
      type: String,
      enum: ['running', 'terminated'],
      default: 'running',
      required: true,
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
    activities: [activitiesSchema],
  },
  {
    timestamps: true,
  }
);

// *************************************************************************************************
// Methods
ProcessSchema.statics.findProcess = async function (id) {
  const processesModel = this;
  if (!id) throw new Error('E1106');
  const process = await processesModel.findOne({
    _id: id,
  });
  if (!process) throw new Error('E1107');
  return process;
};

ProcessSchema.statics.getProcesses = async function (query) {
  if (!query) throw new Error('E1009');
  const processesModel = this;
  let processedQuery = query;
  console.log(processedQuery);

  // Processing query
  // *the aditional "[]" is put there by axios
  if (query['requestedModules[]']) {
    let prefix = '';
    if (Array.isArray(query['requestedModules[]'])) {
      let filters = [];
      for (const module of query['requestedModules[]']) {
        prefix = identifyModuleProcessPrefix(module);
        filters.push({ code: new RegExp(`^${prefix}`) });
      }
      processedQuery = { $or: filters };
    } else {
      prefix = identifyModuleProcessPrefix(query['requestedModules[]']);
      processedQuery = { code: new RegExp(`^${prefix}`) };
    }
  }
  const processes = await processesModel.find(processedQuery).sort({ createdAt: -1 });
  if (!processes) throw new Error('E1010');
  return processes;
};

ProcessSchema.methods.createProcess = async function (data, sessionId, accountId) {
  if (!data || !sessionId || !accountId) throw new Error('E1101');

  const processModel = this;
  const { code, name, alias, stages } = data;

  processModel.code = code;
  processModel.name = name;
  processModel.alias = alias;
  processModel.stages = stages;
  processModel.associated_session = sessionId;
  processModel.associated_account = accountId;

  const createdProcess = await processModel.save();
  if (!createdProcess) throw new Error('E1102');
  return createdProcess;
};

ProcessSchema.methods.setProcessStatus = async function (status) {
  if (!status) throw new Error('E1103');
  if (status === 'running' || status === 'terminated') {
    const processModel = this;
    processModel.status = status;

    const updatedProcess = await processModel.save();
    if (!updatedProcess) throw new Error('E1104');
    return updatedProcess;
  } else {
    throw new Error('E1105');
  }
};

ProcessSchema.methods.setProcessSuccess = async function (success) {
  if (typeof success === 'boolean') {
    const processModel = this;
    processModel.success = success;

    const updatedProcess = await processModel.save();
    if (!updatedProcess) throw new Error('E1108');
    return updatedProcess;
  } else {
    throw new Error('E1109');
  }
};

//Add a new activity to the currect process
ProcessSchema.methods.addProcessActivity = async function (activityId) {
  if (!activityId) {
    throw new Error('E1116');
  }
  const processModel = this;
  if (processModel.status !== 'running') {
    throw new Error('E1115');
  }
  processModel.activities.push({
    associated_activity: activityId,
  });
  return await processModel.save();
};

const Process = mongoose.model('Process', ProcessSchema);
export default Process;
