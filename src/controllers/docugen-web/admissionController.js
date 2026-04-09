// ADMISSION CONTROLLER
import * as admissionServices from '../../services/docugen-web/admissionServices.js';
import { MESSAGES } from '../../constants/messages.js';
import { KEYS } from '../../constants/keys.js';

const successMessage = Object.fromEntries(MESSAGES.success.map((s) => [s.code, s]));

// ************* Sign-up *************
export const accountRegister = async (req, res, next) => {
  const data = req.body;
  try {
    const response = await admissionServices.accountRegister(data);
    const code = 'S0101';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { account: response },
    });
  } catch (error) {
    next(error);
  }
};

// ************* Sign-in *************
export const sessionStarter = async (req, res, next) => {
  const data = req.body;
  try {
    const response = await admissionServices.sessionStarter(data);
    const code = 'S0201';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    const formatedResponse = {
      token: response.accessToken,
      account: response.accountPayload,
      session: response.sessionPayload,
    };
    const refreshToken = response.refreshToken;
    const cookieConfig = KEYS.refresh.cookie_config;
    res.cookie('refreshToken', refreshToken, cookieConfig);
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: formatedResponse,
    });
  } catch (error) {
    next(error);
  }
};

// ************* Logout *************
export const sessionCloser = async (req, res, next) => {
  const data = req.body;
  try {
    await admissionServices.sessionCloser(data);
    const code = 'S0202';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    const cookieConfig = KEYS.refresh.cookie_config;
    res.clearCookie('refreshToken', cookieConfig); // Order to delete the cookie in frontend
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
    });
  } catch (error) {
    next(error);
  }
};

// ************* Renew access *************
export const accessRenewer = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new Error('E0401');
    const response = await admissionServices.accessRenewer(refreshToken);
    const code = 'S0401';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    const formatedResponse = {
      token: response.newAccessToken,
      account: response.accountPayload,
      session: response.sessionPayload,
    };
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: formatedResponse,
    });
  } catch (error) {
    next(error);
  }
};

// ************* Email verifier *************
export const emailVerifier = async (req, res, next) => {
  const data = req.body;
  try {
    const { token } = data;
    const response = await admissionServices.emailVerifier(token);
    const code = 'S0601';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { email: response.email },
    });
  } catch (error) {
    next(error);
  }
};
