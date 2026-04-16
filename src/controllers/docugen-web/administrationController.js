// ADMINISTRATION CONTROLLER
import { USERS } from '../../constants/users.js';
import { MESSAGES } from '../../constants/messages.js';
import * as administrationServices from '../../services/docugen-web/administrationServices.js';

const successMessage = Object.fromEntries(MESSAGES.success.map((s) => [s.code, s]));

// ************* System parameters Monitor *************
export const systemParametersGetter = async (req, res, next) => {
  const query = req.query;
  const role = req.user.role;
  if (role !== USERS.server.role.administrator) throw new Error('E0501'); // Checking user's role (admin needed)
  try {
    const response = await administrationServices.systemParametersGetter(query);
    let code = '';
    if (response.total === 0) code = 'S0501';
    code = 'S0502';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { systemParameters: response.systemParameters },
      metadata: { systemParameters: { pagination: response.pagination } },
    });
  } catch (error) {
    next(error);
  }
};

// ************* System parameter configuration *************
export const systemParameterSetter = async (req, res, next) => {
  const config = req.body;
  const id = req.params['system_parameter_id'];
  const role = req.user.role;
  if (role !== USERS.server.role.administrator) throw new Error('E0502'); // Checking user's role (admin needed)
  try {
    await administrationServices.systemParameterSetter(id, config);
    const code = 'S0503';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
    });
  } catch (error) {
    next(error);
  }
};
