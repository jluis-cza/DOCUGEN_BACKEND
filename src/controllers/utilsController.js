import { MESSAGES } from '../constants/messages.js';
import * as utilsServices from '../services/utilsServices.js';

const successMessage = Object.fromEntries(MESSAGES.success.map((s) => [s.code, s]));

// *************************************************************************************************
// MODELLESS CONTROLLERS

// *************Real Server Time Getter  *************
export const serverTimeGetter = async (req, res, next) => {
  try {
    const response = await utilsServices.serverTimeGetter();
    const code = 'S0901';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: {
        time: response.currentTime,
      },
    });
  } catch (error) {
    next(error);
  }
};

/// ************* Routes Information Getter *************
export const routesInfoGetter = async (req, res, next) => {
  try {
    const response = await utilsServices.routesInfoGetter();
    const code = 'S1201';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: {
        routes: response.routes,
      },
    });
  } catch (error) {
    next(error);
  }
};
