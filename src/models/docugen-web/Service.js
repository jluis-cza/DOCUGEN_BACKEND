// Services models
// Controls particularly the two services to provide by the system:
// 1. Edition of templates
// 2. Document generation
import mongoose, { Schema } from 'mongoose';
// *************************************************************************************************

// Document
const ServiceSchema = new mongoose.Schema(
  {
    associated_account: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    associated_service_lookup: {
      type: Schema.Types.ObjectId,
      ref: 'ServiceLookup',
      required: true,
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
// Methods

ServiceSchema.statics.getAllServices = async function () {
  const servicesModel = this;
  const services = await servicesModel.find();
  if (!services) throw new Error('E0801');
  return services;
};

ServiceSchema.statics.findService = async function (serviceId) {
  const servicesModel = this;
  const service = await servicesModel.findById(serviceId);
  if (!service) throw new Error('E0806');
  return service;
};

ServiceSchema.statics.getCustomizedServices = async function (id, params) {
  const servicesModel = this;
  const { filter, sort, skip, limit } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('E0803');
  }

  const serviceFilter = {
    associated_account: new mongoose.Types.ObjectId(id),
    ...filter,
  };

  const [services, total] = await Promise.all([
    servicesModel
      .find(serviceFilter)
      .populate('associated_account')
      .populate('associated_service_lookup')
      .sort(sort)
      .skip(skip)
      .limit(limit),
    servicesModel.countDocuments(serviceFilter),
  ]);

  return { services, total };
};

ServiceSchema.methods.setServiceStatus = async function (status) {
  if (!status) throw new Error('E0804');
  if (status === 'running' || status === 'stopped') {
    const service = this;
    service.status = status;

    const updatedService = await service.save();
    await updatedService.populate('associated_account');
    await updatedService.populate('associated_service_lookup');

    return updatedService;
  } else {
    throw new Error('E0805');
  }
};

ServiceSchema.methods.createService = async function (
  associatedAccountId,
  associatedServiceLookupId
) {
  const service = this;
  if (!associatedAccountId) throw new Error('E0812');
  if (!associatedServiceLookupId) throw new Error('E0813');
  service.associated_account = associatedAccountId;
  service.associated_service_lookup = associatedServiceLookupId;
  service.status = 'running';
  const createdService = await service.save();
  if (!createdService) throw new Error('E0814');
  return createdService;
};

const Service = mongoose.model('Service', ServiceSchema);
export default Service;
