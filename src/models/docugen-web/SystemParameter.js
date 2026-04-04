// SYSTEM PARAMETERS MODEL

import mongoose from 'mongoose';
import { LOOKUPS } from '../../constants/lookups.js';

// *************************************************************************************************
// Subdocuments
const valuesSchema = new mongoose.Schema(
  {
    //The type of the value depends on the type of system parameter
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    unit: { type: String, trim: true, required: true },
  },
  {
    timestamps: true,
  }
);

// Document
const SystemParameterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      // minlength: 3,
      // maxlength: 50,
    },
    alias: {
      type: String,
      required: true,
      trim: true,
      index: true,

      // minlength: 3,
      // maxlength: 50,
    },
    status: {
      type: String,
      enum: ['followed', 'unfollowed'],
      default: 'followed',
      required: true,
    },
    values: [valuesSchema],
  },
  {
    timestamps: true,
  }
);

// *************************************************************************************************
// Methods ---

SystemParameterSchema.statics.findSystemParameter = async function (parameter_id) {
  const systemParameters = this;
  try {
    const systemParameter = await systemParameters.findOne({ _id: parameter_id });
    return systemParameter;
  } catch (error) {
    console.log('Error finding the system parameter.', error);
    throw error;
  }
};

SystemParameterSchema.statics.getAllSystemParameters = async function () {
  const systemParametersModel = this;
  try {
    const systemParameters = await systemParametersModel.find();
    console.log('Después de la recuperación de toda la colección: ', {
      systemParameters: systemParameters,
    });
    return systemParameters;
  } catch (error) {
    console.log('Error finding all the system parameters.', error);
    throw error;
  }
};

SystemParameterSchema.statics.getCustomizedSystemParameters = async function (
  filter,
  sort,
  skip,
  limit
) {
  const systemParametersModel = this;
  const [systemParameters, total] = await Promise.all([
    systemParametersModel.find(filter).sort(sort).skip(skip).limit(limit),
    systemParametersModel.countDocuments(filter),
  ]);
  return { systemParameters, total };
};

SystemParameterSchema.statics.deleteAllSystemParameters = async function () {
  const systemParametersModel = this;
  try {
    const systemParameters = await systemParametersModel.deleteMany();
    return systemParameters;
  } catch (error) {
    console.log('Error deleting system parameters.', error);
    throw error;
  }
};

SystemParameterSchema.statics.seedDefaultSystemParameters = async function () {
  const systemParametersModel = this;
  const defaultSystemParameters = LOOKUPS.docugen_web.system_parameters;

  try {
    for (const parameter of defaultSystemParameters) {
      await systemParametersModel.findOneAndUpdate(
        { name: parameter.name },
        { $setOnInsert: parameter },
        { upsert: true, new: true }
      );
    }
    const systemParameters = await systemParametersModel.find();
    return systemParameters;
  } catch (error) {
    console.log('Error finding all the system parameters.', error);
    throw error;
  }
};

SystemParameterSchema.methods.setSystemParameterStatus = async function (status) {
  if (!status) throw new Error('E0505');
  if (status === 'followed' || status === 'unfollowed') {
    const systemParameter = this;
    systemParameter.status = status;
    return await systemParameter.save();
  } else {
    throw new Error('E0506');
  }
};

// SystemParameterSchema.methods.setSystemParameterProperty = async function (property, value) {
//   const systemParameter = this;
//   systemParameter[property] = value;
//   return await systemParameter.save();
// };

SystemParameterSchema.methods.addSystemParameterValue = async function (value, unit) {
  const systemParameter = this;
  systemParameter.values.push({
    value: value,
    unit: unit,
  });
  return await systemParameter.save();
};

// ---

const SystemParameter = mongoose.model('SystemParameter', SystemParameterSchema);
export default SystemParameter;
