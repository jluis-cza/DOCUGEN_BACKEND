// Services models
// Controls globally the two services to provide by the system:
// 1. Edition of templates
// 2. Document generation
import mongoose from 'mongoose';
import { LOOKUPS } from '../../constants/lookups.js';
// *************************************************************************************************

// Document
const ServiceSchema = new mongoose.Schema(
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
ServiceSchema.statics.findService = async function (id) {
  const servicesModel = this;
  const service = await servicesModel.findById(id);
  if (!service) throw new Error('E0707');
  return service;
};

ServiceSchema.statics.getAllServices = async function () {
  const servicesModel = this;
  const services = await servicesModel.find();
  if (!services) throw new Error('E0702');
  if (services.length === 0) throw new Error('E0703');
  return services;
};

ServiceSchema.statics.seedDefaultServices = async function () {
  const servicesModel = this;
  const defaultServices = LOOKUPS.docugen_web.services;
  try {
    for (const parameter of defaultServices) {
      await servicesModel.findOneAndUpdate(
        { name: parameter.name },
        { $setOnInsert: parameter },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    const services = await servicesModel.find();
    return services;
  } catch (error) {
    console.log('Error seeding services.', error);
    throw error;
  }
};

ServiceSchema.statics.deleteAllServices = async function () {
  const servicesModel = this;
  try {
    const response = await servicesModel.deleteMany();
    return response;
  } catch (error) {
    console.log('Error deleting services.', error);
    throw error;
  }
};

ServiceSchema.methods.setServiceStatus = async function (status) {
  if (!status) throw new Error('E0704');
  if (status === 'running' || status === 'stopped') {
    const service = this;
    service.status = status;
    return await service.save();
  } else {
    throw new Error('E0705');
  }
};

const Service = mongoose.model('Service', ServiceSchema);
export default Service;
