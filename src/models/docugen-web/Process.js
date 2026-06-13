// PROCESS MODEL

import mongoose from 'mongoose';

// *************************************************************************************************
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
      enum: ['started', 'running', 'terminated'],
      default: 'started',
      required: true,
    },
    success: {
      type: Boolean,
      default: false,
      required: true,
    },
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

ProcessSchema.methods.createProcess = async function (data) {
  if (!data) throw new Error('E1101');

  const processModel = this;
  const { code, name, alias, stages } = data;

  processModel.code = code;
  processModel.name = name;
  processModel.alias = alias;
  processModel.stages = stages;

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

const Process = mongoose.model('Process', ProcessSchema);
export default Process;
