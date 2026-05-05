// ADMINISTRATION CONTROLLER
import { USERS } from '../../constants/users.js';
import { MESSAGES } from '../../constants/messages.js';
import * as administrationServices from '../../services/docugen-web/administrationServices.js';

const successMessage = Object.fromEntries(MESSAGES.success.map((s) => [s.code, s]));

// ************* System parameters Monitor *************
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

// ************* System parameter configuration *************
export const systemParameterSetter = async (req, res, next) => {
  const config = req.body.data;
  const id = req.params['system_parameter_id'];
  const role = req.user.role;
  if (role !== USERS.server.role.administrator) throw new Error('E0502'); // Checking user's role (admin needed)
  try {
    const response = await administrationServices.systemParameterSetter(id, config);
    console.log({ response });
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

// ************* Account configuration *************
export const accountSetter = async (req, res, next) => {
  const config = req.body.data;
  const id = req.params['account_id'];
  const role = req.user.role;
  if (role !== USERS.server.role.administrator) throw new Error('E0119'); // Checking user's role (admin needed)
  try {
    const response = await administrationServices.accountSetter(id, config);
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
    next(error);
  }
};

// ************* Services Monitor *************
export const servicesGetter = async (req, res, next) => {
  const role = req.user.role;
  if (role !== USERS.server.role.administrator) throw new Error('E0701'); // Checking user's role (admin needed)
  try {
    const response = await administrationServices.servicesGetter();
    const code = 'S0701';
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

export const serviceSetter = async (req, res, next) => {
  const config = req.body.data;
  const id = req.params['service_id'];
  const role = req.user.role;
  if (role !== USERS.server.role.administrator) throw new Error('E0706'); // Checking user's role (admin needed)
  try {
    const response = await administrationServices.serviceSetter(id, config);
    const code = 'S0702';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { service: response.service },
    });
  } catch (error) {
    next(error);
  }
};
