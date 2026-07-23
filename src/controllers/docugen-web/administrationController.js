// ADMINISTRATION CONTROLLER
import { USERS } from '../../constants/users.js';
import { MESSAGES } from '../../constants/messages.js';
import * as administrationServices from '../../services/docugen-web/administrationServices.js';
import {
  registerProcess,
  terminateProcess,
  registerActivity,
  setActivitySuccess,
} from '../../services/docugen-web/managementServices.js';

const successMessage = Object.fromEntries(MESSAGES.success.map((s) => [s.code, s]));

// ************* System Parameters Monitor *************
export const systemParametersGetter = async (req, res, next) => {
  const role = req.user.role;
  if (role !== USERS.server.role.administrator) throw new Error('E0501'); // Checking user's role (admin needed)
  try {
    const response = await administrationServices.systemParametersGetter();
    const code = response.total === 0 ? 'S0501' : 'S0502';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { systemParameters: response.systemParameters },
      metadata: {
        systemParameters: {
          pagination: response.pagination,
          sort: response.sort,
          search: response.search,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// ************* System Parameter Monitor *************
export const systemParameterGetter = async (req, res, next) => {
  const id = req.params['system_parameter_id'];
  const role = req.user.role;
  if (role !== USERS.server.role.administrator) throw new Error('E0509'); // Checking user's role (admin needed)
  try {
    const response = await administrationServices.systemParameterGetter(id);
    const code = 'S0504';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { systemParameter: response.systemParameter },
    });
  } catch (error) {
    next(error);
  }
};

// ************* System parameter configuration *************
export const systemParameterSetter = async (req, res, next) => {
  const processId = await registerProcess('P0201', req.sess.id, req.user.id);
  let activity = {};
  const config = req.body.data;
  const id = req.params['system_parameter_id'];
  const role = req.user.role;
  if (role !== USERS.server.role.administrator) throw new Error('E0502'); // Checking user's role (admin needed)
  try {
    activity = await registerActivity(1, processId);
    const response = await administrationServices.systemParameterSetter(id, config);
    await setActivitySuccess(activity._id, true);
    const code = 'S0503';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { systemParameter: response.systemParameter },
    });
  } catch (error) {
    await setActivitySuccess(activity._id, false);
    next(error);
  } finally {
    await terminateProcess(processId);
  }
};

// ************* System parameters overviewer *************
export const systemParametersOverviewer = async (req, res, next) => {
  const role = req.user.role;
  if (role !== USERS.server.role.administrator) throw new Error('E0512'); // Checking user's role (admin needed)
  try {
    const response = await administrationServices.systemParametersOverviewer();
    const code = 'S0505';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: {
        systemParametersOverview: response.systemParametersOverview,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ************* Accounts Monitor *************
export const accountsGetter = async (req, res, next) => {
  const query = req.query;
  const role = req.user.role;
  if (role !== USERS.server.role.administrator) throw new Error('E0118'); // Checking user's role (admin needed)
  try {
    const response = await administrationServices.accountsGetter(query);
    const code = response.total === 0 ? 'S0102' : 'S0103';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { accounts: response.accounts },
      metadata: {
        accounts: { pagination: response.pagination, sort: response.sort, search: response.search },
      },
    });
  } catch (error) {
    next(error);
  }
};

// ************* Account Monitor *************
export const accountGetter = async (req, res, next) => {
  const id = req.params['account_id'];
  const role = req.user.role;
  if (role !== USERS.server.role.administrator) throw new Error('E0121'); // Checking user's role (admin needed)
  try {
    const response = await administrationServices.accountGetter(id);
    const code = 'S0105';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { account: response.account },
    });
  } catch (error) {
    next(error);
  }
};

// ************* Account configuration *************
export const accountSetter = async (req, res, next) => {
  const processId = await registerProcess('P0202', req.sess.id, req.user.id);
  let activity = {};
  const config = req.body.data;
  const id = req.params['account_id'];
  const role = req.user.role;
  if (role !== USERS.server.role.administrator) throw new Error('E0119'); // Checking user's role (admin needed)
  try {
    activity = await registerActivity(1, processId);
    const response = await administrationServices.accountSetter(id, config);
    await setActivitySuccess(activity._id, true);
    const code = 'S0104';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { account: response.account },
    });
  } catch (error) {
    await setActivitySuccess(activity._id, false);
    next(error);
  } finally {
    await terminateProcess(processId);
  }
};

// ************* Accounts overviewer *************
export const accountsOverviewer = async (req, res, next) => {
  const role = req.user.role;
  if (role !== USERS.server.role.administrator) throw new Error('E0123'); // Checking user's role (admin needed)
  try {
    const response = await administrationServices.accountsOverviewer();
    const code = 'S0106';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: {
        accountsOverview: response.accountsOverview,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ************* Services Getter *************
export const servicesGetter = async (req, res, next) => {
  const query = req.query;
  const id = req.params['account_id'];
  const role = req.user.role;
  if (role !== USERS.server.role.administrator) throw new Error('E0810'); // Checking user's role (admin needed)
  try {
    const response = await administrationServices.servicesGetter(id, query);
    const code = response.total === 0 ? 'S0801' : 'S0802';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { services: response.services },
      metadata: {
        services: { pagination: response.pagination, sort: response.sort, search: response.search },
      },
    });
  } catch (error) {
    next(error);
  }
};

// ************* Service Setter *************
export const serviceSetter = async (req, res, next) => {
  const processId = await registerProcess('P0203', req.sess.id, req.user.id);
  let activity = {};
  const config = req.body.data;
  const id = req.params['service_id'];
  const role = req.user.role;
  if (role !== USERS.server.role.administrator) throw new Error('E0811'); // Checking user's role (admin needed)
  try {
    activity = await registerActivity(1, processId);
    const response = await administrationServices.serviceSetter(id, config);
    await setActivitySuccess(activity._id, true);
    const code = 'S0803';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { service: response.service },
    });
  } catch (error) {
    await setActivitySuccess(activity._id, false);
    next(error);
  } finally {
    await terminateProcess(processId);
  }
};

// ************* Service Lookups Monitor *************
export const serviceLookupsGetter = async (req, res, next) => {
  const role = req.user.role;
  if (role !== USERS.server.role.administrator) throw new Error('E0701'); // Checking user's role (admin needed)
  try {
    const response = await administrationServices.serviceLookupsGetter();
    const code = 'S0701';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { serviceLookups: response.serviceLookups },
      metadata: {
        serviceLookups: {
          pagination: response.pagination,
          sort: response.sort,
          search: response.search,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// ************* Service Lookup Monitor *************
export const serviceLookupGetter = async (req, res, next) => {
  const id = req.params['service_id'];
  const role = req.user.role;
  if (role !== USERS.server.role.administrator) throw new Error('E0709'); // Checking user's role (admin needed)
  try {
    const response = await administrationServices.serviceLookupGetter(id);
    const code = 'S0703';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { serviceLookup: response.serviceLookup },
    });
  } catch (error) {
    next(error);
  }
};

// ************* Service Lookup Setter *************
export const serviceLookupSetter = async (req, res, next) => {
  const processId = await registerProcess('P0204', req.sess.id, req.user.id);
  let activity = {};
  const config = req.body.data;
  const id = req.params['service_id'];
  const role = req.user.role;
  if (role !== USERS.server.role.administrator) throw new Error('E0706'); // Checking user's role (admin needed)
  try {
    activity = await registerActivity(1, processId);
    const response = await administrationServices.serviceLookupSetter(id, config);
    await setActivitySuccess(activity._id, true);
    const code = 'S0702';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { serviceLookup: response.serviceLookup },
    });
  } catch (error) {
    await setActivitySuccess(activity._id, false);
    next(error);
  } finally {
    await terminateProcess(processId);
  }
};

// ************* Service Lookup overviewer *************
export const serviceLookupsOverviewer = async (req, res, next) => {
  const role = req.user.role;
  if (role !== USERS.server.role.administrator) throw new Error('E0712'); // Checking user's role (admin needed)
  try {
    const response = await administrationServices.serviceLookupsOverviewer();
    const code = 'S0704';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: {
        serviceLookupsOverview: response.serviceLookupsOverview,
      },
    });
  } catch (error) {
    next(error);
  }
};

// ************* Sessions Monitor *************
export const sessionsGetter = async (req, res, next) => {
  const query = req.query;
  const id = req.params['account_id'];
  const role = req.user.role;
  if (role !== USERS.server.role.administrator) throw new Error('E0215'); // Checking user's role (admin needed)
  try {
    const response = await administrationServices.sessionsGetter(id, query);
    const code = response.total === 0 ? 'S0203' : 'S0204';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { sessions: response.sessions },
      metadata: {
        sessions: { pagination: response.pagination, sort: response.sort, search: response.search },
      },
    });
  } catch (error) {
    next(error);
  }
};
