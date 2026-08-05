// Service Lookups models
// Controls globally the two services to provide by the system:
// 1. Edition of templates
// 2. Document generation
import mongoose from 'mongoose';
import { LOOKUPS } from '../../constants/lookups.js';
// *************************************************************************************************

// Document
const ServiceLookupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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
    },
    status: {
      type: String,
      enum: ['running', 'stopped'],
      default: 'running',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// *************************************************************************************************
// Hooks

// *************************************************************************************************
// Methods
ServiceLookupSchema.statics.findServiceLookup = async function (id, name) {
  const serviceLookupsModel = this;
  const query = [];
  if (name) query.push({ name });
  if (id) query.push({ _id: id });
  if (query.length === 0) throw new Error('E0711');
  const serviceLookup = await serviceLookupsModel.findOne({
    $or: query,
  });
  if (!serviceLookup) throw new Error('E0707');
  return serviceLookup;
};

ServiceLookupSchema.statics.getAllServiceLookups = async function () {
  const serviceLookupsModel = this;
  const serviceLookups = await serviceLookupsModel.find();
  if (!serviceLookups) throw new Error('E0702');
  if (serviceLookups.length === 0) throw new Error('E0703');
  return serviceLookups;
};

ServiceLookupSchema.statics.seedDefaultServiceLookups = async function () {
  const serviceLookupsModel = this;
  const defaultServiceLookup = LOOKUPS.docugen_web.services;
  try {
    for (const parameter of defaultServiceLookup) {
      await serviceLookupsModel.findOneAndUpdate(
        { name: parameter.name },
        { $setOnInsert: parameter },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    const serviceLookups = await serviceLookupsModel.find();
    return serviceLookups;
  } catch (error) {
    console.log('Error seeding service lookups.', error);
    throw error;
  }
};

ServiceLookupSchema.statics.deleteAllServiceLookups = async function () {
  const serviceLookupsModel = this;
  try {
    const response = await serviceLookupsModel.deleteMany();
    return response;
  } catch (error) {
    console.log('Error deleting service lookups.', error);
    throw error;
  }
};

ServiceLookupSchema.methods.setServiceLookupStatus = async function (status) {
  if (!status) throw new Error('E0704');
  if (status === 'running' || status === 'stopped') {
    const serviceLookup = this;
    serviceLookup.status = status;
    return await serviceLookup.save();
  } else {
    throw new Error('E0705');
  }
};

const ServiceLookup = mongoose.model('ServiceLookup', ServiceLookupSchema);
export default ServiceLookup;
