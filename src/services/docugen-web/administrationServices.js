// SYSTEM PARAMETERS

import SystemParameter from '../../models/docugen-web/SystemParameter.js';
import Account from '../../models/docugen-web/Account.js';
import ServiceLookup from '../../models/docugen-web/ServiceLookup.js';
import Service from '../../models/docugen-web/Service.js';
import Session from '../../models/docugen-web/Session.js';
import { systemParameterValuesCollector } from '../../helpers/docugen-web/administrationHelper.js';

// *************************************************************************************************
// FROM CONTROLLERS
// *************************************************************************************************
// ************* System parameters Monitor *************
export const systemParametersGetter = async () => {
  const systemParameters = await SystemParameter.getAllSystemParameters();
  const total = systemParameters.length;
  const pagination = {
    page: 1,
    limit: total,
    total: total,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };
  const sort = { by: null, order: null };
  const search = null;
  return {
    systemParameters,
    pagination,
    sort,
    search,
    total,
  };
};

// ************* System parameter Monitor *************
export const systemParameterGetter = async (id) => {
  if (!id) throw new Error('E0510');
  const systemParameter = await SystemParameter.findSystemParameter(id);
  return { systemParameter };
};

// ************* System parameter Configuration *************
export const systemParameterSetter = async (id, config) => {
  const resources = []
  if (!config) throw new Error('E0503');
  const systemParameter = await SystemParameter.findSystemParameter(id);
  let updated_systemParameter = {};
  if (config.status)
    updated_systemParameter = await systemParameter.setSystemParameterStatus(config.status);
  resources.push({})
  return { systemParameter: updated_systemParameter, resources };
};

// ************* Accounts Monitor *************
export const accountsGetter = async (query) => {
  // Params
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const search = query.search || '';
  const sortBy = query.sortBy || 'username';
  const sortOrder = query.sortOrder === 'desc' ? -1 : 1;
  // Filer of search
  const filter = {};
  if (search) {
    filter.$or = [
      { username: { $regex: search, $options: 'i' } },
      { 'user.name': { $regex: search, $options: 'i' } },
      { 'user.lastname': { $regex: search, $options: 'i' } },
      { status: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit; // Jump
  const sort = { [sortBy]: sortOrder }; // Order of list

  // Parallel query
  const { accounts, total } = await Account.getCustomizedAccounts(filter, sort, skip, limit);

  const totalPages = Math.ceil(total / limit);

  // Metadata
  const pagination = {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };

  return { accounts, pagination, sort: { by: sortBy, order: query.sortOrder }, search, total };
};

// ************* Account Monitor *************
export const accountGetter = async (id) => {
  if (!id) throw new Error('E0122');
  const account = await Account.findAccount('', '', id, '');
  return { account };
};

// ************* Account Configuration *************
export const accountSetter = async (id, config) => {
  if (!config) throw new Error('E0120');
  let updated_account = {};
  if (config.status) updated_account = await Account.setAccountStatus(id, config.status);
  return { account: updated_account };
};

// ************* Services Getter *************
export const servicesGetter = async (id, query) => {
  if (!id) throw new Error('E0808');
  // Params
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const search = query.search || '';
  const sortBy = query.sortBy || 'associated_service_lookup.name';
  const sortOrder = query.sortOrder === 'asc' ? -1 : 1;
  // Filer of search
  const filter = {};
  if (search) {
    filter.$or = [
      { 'associated_service_lookup.name': { $regex: search, $options: 'i' } },
      { status: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit; // Jump
  const sort = { [sortBy]: sortOrder }; // Order of list

  // Parallel query
  const params = { filter, sort, skip, limit };
  const { services, total } = await Service.getCustomizedServices(id, params);

  const totalPages = Math.ceil(total / limit);

  // Metadata
  const pagination = {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };

  return { services, pagination, sort: { by: sortBy, order: query.sortOrder }, search, total };
};

// ************* Service Setter *************
export const serviceSetter = async (id, config) => {
  if (!config) throw new Error('E0809');
  const service = await Service.findService(id);
  let updated_service = {};
  if (config.status) updated_service = await service.setServiceStatus(config.status);
  return { service: updated_service };
};

// ************* Service Lookups getter *************
export const serviceLookupsGetter = async () => {
  const serviceLookups = await ServiceLookup.getAllServiceLookups();
  const total = serviceLookups.length;
  const pagination = {
    page: 1,
    limit: total,
    total: total,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };
  const sort = { by: null, order: null };
  const search = null;
  return { serviceLookups, pagination, sort, search, total };
};

// ************* Service Lookup Monitor *************
export const serviceLookupGetter = async (id) => {
  if (!id) throw new Error('E0710');
  const serviceLookup = await ServiceLookup.findServiceLookup(id, '');
  return { serviceLookup };
};

// ************* Service Lookup Configuration *************
export const serviceLookupSetter = async (id, config) => {
  if (!config) throw new Error('E0708');
  const serviceLookup = await ServiceLookup.findServiceLookup(id, '');
  let updated_serviceLookup = {};
  if (config.status)
    updated_serviceLookup = await serviceLookup.setServiceLookupStatus(config.status);
  return { serviceLookup: updated_serviceLookup };
};

// ************* Sessions monitor *************
export const sessionsGetter = async (id, query) => {
  // Params
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const search = query.search || '';
  const sortBy = query.sortBy || 'loginTime';
  const sortOrder = query.sortOrder === 'asc' ? -1 : 1;
  // Filer of search
  const filter = {};
  if (search) {
    filter.$or = [{ status: { $regex: search, $options: 'i' } }];
  }

  const skip = (page - 1) * limit; // Jump
  const sort = { [sortBy]: sortOrder }; // Order of list

  // Parallel query
  const params = { filter, sort, skip, limit };
  const { sessions, total } = await Session.getCustomizedSessions(id, params);

  const totalPages = Math.ceil(total / limit);

  // Metadata
  const pagination = {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };

  return { sessions, pagination, sort: { by: sortBy, order: query.sortOrder }, search, total };
};
// // ************* Home monitor *************
// export const homeGetter = async (role) => {
//   if (role === 'admin') {
//     // notifications
//     // database size
//     // uptime
//     // count of users
//     // number of sessions per day
//     // date
//     // timeline admin activity
//     // number of registered users per day
//     // number of users who uses the two services per day
//     // number of templates
//     // number of generated documents
//   }
//   if (role === 'dev') {
//     // notifications
//     // date
//     // timeline admin activity
//     // number of templates
//     // number of generated documents
//   }
// };

// *************************************************************************************************
// FROM CRON JOBS
// *************************************************************************************************
// ************* System parameters updater *************
export const sampleSystemParameters = async () => {
  // Getting the followed parameters
  const followedParameters = await SystemParameter.find({ status: 'followed' });
  // console.log('Parameters to sample:', { followedParameters: followedParameters });

  for (const parameter of followedParameters) {
    let newValue = null;
    switch (parameter.name) {
      case 'database_size':
        newValue = await systemParameterValuesCollector.getDataBaseSize();
        break;
      case 'system_uptime':
        newValue = await systemParameterValuesCollector.getSystemUptime();
        break;
      default:
        console.log(`No collector defined for: ${parameter.name}`);
        continue;
    }
    if (newValue && newValue.value !== null) {
      await parameter.addSystemParameterValue(newValue.value, newValue.unit);
      // console.log(`Sample ${parameter.name}: ${newValue.value} ${newValue.unit}`);
    }
  }
  console.log('Sampling complete.');
};
