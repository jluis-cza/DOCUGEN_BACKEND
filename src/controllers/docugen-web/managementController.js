import { MESSAGES } from '../../constants/messages.js';
import { USERS } from '../../constants/users.js';
import * as managementServices from '../../services/docugen-web/managementServices.js';
import {
  registerProcess,
  terminateProcess,
  registerActivity,
  setActivitySuccess,
} from '../../services/docugen-web/managementServices.js';

const successMessage = Object.fromEntries(MESSAGES.success.map((s) => [s.code, s]));

// ************* Activities Getter *************
export const activitiesGetter = async (req, res, next) => {
  const query = req.query;
  try {
    const response = await managementServices.activitiesGetter(query);
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
    const response = await managementServices.activityGetter(id);
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
    const response = await managementServices.processesGetter(query);
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
    const response = await managementServices.processGetter(id);
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

// ************* Profile Getter *************
export const profileGetter = async (req, res, next) => {
  // TODO: Configure controller services and filters, fields selectors and updaters
  const id = req.params['profile_id'];
  try {
    const response = await managementServices.profileGetter(id);
    const code = 'S1401';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { profile: response.profile },
    });
  } catch (error) {
    next(error);
  }
};

// ************* Profile Setter *************
export const profileSetter = async (req, res, next) => {
  // TODO: Configure controller services and filters, fields selectors and updaters
  const processId = await registerProcess('P0302', req.sess.id, req.user.id);
  let activity = {};
  const id = req.params['profile_id'];
  const config = req.body.data;
  try {
    activity = await registerActivity(1, processId);
    const response = await managementServices.profileSetter(id, config);
    await setActivitySuccess(activity._id, true);
    const code = 'S1402';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { profile: response.profile, account: response.accountPayload },
    });
  } catch (error) {
    await setActivitySuccess(activity._id, false);
    next(error);
  } finally {
    await terminateProcess(processId);
  }
};

// ************* Notifications gettter *************
export const notificationsGetter = async (req, res, next) => {
  const query = req.query;
  try {
    const response = await managementServices.notificationsGetter(query);
    const code = response.total === 0 ? 'S1302' : 'S1303';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { notifications: response.notifications },
      metadata: {
        notifications: {
          cursor: response.cursor,
          limit: response.limit,
          hasNextChunk: response.hasNextChunk,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// ************* Notification creator *************
export const notificationCreator = async (req, res, next) => {
  const processId = await registerProcess('P0301', req.sess.id, req.user.id);
  let activity = {};
  const config = req.body.data;
  const role = req.user.role;
  if (role !== USERS.server.role.administrator) throw new Error('E1301'); // Checking user's role (admin needed)
  try {
    activity = await registerActivity(1, processId);
    const response = await managementServices.notificationCreator(config);
    await setActivitySuccess(activity._id, true);
    const code = 'S1301';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { notification: response.notification },
    });
  } catch (error) {
    await setActivitySuccess(activity._id, false);
    next(error);
  } finally {
    await terminateProcess(processId);
  }
};

// ************* Notification acknowledger *************

export const notificationAcknowledger = async (req, res, next) => {
  const processId = await registerProcess('P0303', req.sess.id, req.user.id);
  let activity = {};
  const id = req.params['notification_id'];
  // const role = req.user.role;
  // if (role !== USERS.server.role.developer) throw new Error('E1315'); // Checking user's role (dev needed)
  try {
    activity = await registerActivity(1, processId);
    const response = await managementServices.notificationAcknowledger(id);
    await setActivitySuccess(activity._id, true);
    const code = 'S1304';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: { notification: response.notification },
    });
  } catch (error) {
    await setActivitySuccess(activity._id, false);
    next(error);
  } finally {
    await terminateProcess(processId);
  }
};
