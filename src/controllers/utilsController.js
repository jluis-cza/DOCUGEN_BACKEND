import { MESSAGES } from '../constants/messages.js';
import * as utilsServices from '../services/utilsServices.js';

const successMessage = Object.fromEntries(MESSAGES.success.map((s) => [s.code, s]));
// *************************************************************************************************
// MODEL ASSOCIATED CONTROLLERS

// ************* Activities Getter *************
export const activitiesGetter = async (req, res, next) => {
  const query = req.query;
  try {
    const response = await utilsServices.activitiesGetter(query);
    const code = response.total === 0 ? 'S1001' : 'S1002';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { activities: response.activities },
      metadata: {
        activities: {
          query: response.query,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// ************* Activity Getter *************
export const activityGetter = async (req, res, next) => {
  const id = req.params['activity_id'];
  try {
    const response = await utilsServices.activityGetter(id);
    const code = 'S1003';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { activity: response.activity },
    });
  } catch (error) {
    next(error);
  }
};

// ************* Processes gettter *************
export const processesGetter = async (req, res, next) => {
  const query = req.query;
  try {
    const response = await utilsServices.processesGetter(query);
    const code = response.total === 0 ? 'S1101' : 'S1102';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { processes: response.processes },
      metadata: {
        processes: {
          query: response.query,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// ************* Process Getter *************
export const processGetter = async (req, res, next) => {
  const id = req.params['process_id'];
  try {
    const response = await utilsServices.processGetter(id);
    const code = 'S1103';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { process: response.process },
    });
  } catch (error) {
    next(error);
  }
};

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
