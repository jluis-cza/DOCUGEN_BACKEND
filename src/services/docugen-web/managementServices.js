import Activity from '../../models/docugen-web/Activity.js';
import Process from '../../models/docugen-web/Process.js';
import Notification from '../../models/docugen-web/Notification.js';
import Account from '../../models/docugen-web/Account.js';
import { LOOKUPS } from '../../constants/lookups.js';

// *************************************************************************************************
// FOR CONTROLLERS
// *************************************************************************************************

// ************* ACTIVITIES *************
export const activitiesGetter = async (query) => {
  if (!query) throw new Error('E1008');
  const activities = await Activity.getActivities(query);
  return { activities, query };
};

export const activityGetter = async (id) => {
  if (!id) throw new Error('E1017');
  const activity = await Activity.findActivity(id);
  return activity;
};

// ************* PROCESSES *************
export const processesGetter = async (query) => {
  if (!query) throw new Error('E1113');
  const processes = await Process.getProcesses(query);
  return { processes, query };
};

export const processGetter = async (id) => {
  if (!id) throw new Error('E1114');
  const process = await Process.findProcess(id);
  return process;
};

// ************* NOTIFICATIONS *************
export const notificationsGetter = async (query) => {
  if (!query) throw new Error('E1302');
  const { cursor, limit, ...filter } = query;
  const pagination = {};
  pagination.cursor = cursor && cursor !== 'null' && cursor !== 'undefined' ? cursor : null;
  pagination.limit = parseInt(limit) + 1;
  const notifications = await Notification.getNotifications(pagination, filter);
  pagination.hasNextChunk = notifications.length > limit;
  if (pagination.hasNextChunk) notifications.pop();
  if (notifications.length > 0) {
    pagination.cursor = notifications[notifications.length - 1]['_id'];
  } else {
    pagination.cursor = null;
  }
  return { notifications, cursor: pagination.cursor, limit, hasNextChunk: pagination.hasNextChunk };
};

export const notificationCreator = async (config) => {
  if (!config) throw new Error('E1303');
  const newNotification = new Notification();
  const created_notification = await newNotification.createNotification(config);
  return { notification: created_notification };
};

export const notificationAcknowledger = async (id) => {
  if (!id) throw new Error('E1314');
  const updated_notification = await Notification.acknowledgeNotification(id);
  return { notification: updated_notification };
};

export const notificationsCounter = async (query) => {
  if (!query) throw new Error('E1315');
  const filter = {};
  if (query.to) filter.to = query.to;
  if (query.status) filter.status = query.status;
  const notificationsCount = await Notification.countNotifications(filter);
  return { notificationsCount };
};
// ************* PROFILES *************
export const profileGetter = async (id) => {
  if (!id) throw new Error('E1401');
  const profile = await Account.findAccount('', '', id, '');
  return { profile };
};
export const profileSetter = async (id, config) => {
  if (!id || !config) throw new Error('E1402');
  let updated_account = {};
  if (config.password) updated_account = await Account.setAccountPassword(id, config.password);
  if (config.username) updated_account = await Account.setAccountUsername(id, config.username);
  const accountPayload = {
    id: updated_account._id,
    role: updated_account.role,
    status: updated_account.status,
  };
  return { profile: updated_account, accountPayload };
};

// *************************************************************************************************
// FOR LOGGING PROCESSES AND ACTIVITIES
// *************************************************************************************************

export const registerProcess = async (code, sessionId, accountId) => {
  if (!code || !sessionId || !accountId) throw new Error('E1111');
  const newProcess = new Process();
  const selectedProcess = LOOKUPS.docugen_web.processes.find((p) => p.code === code);
  const { activities, ...processData } = selectedProcess;
  const process = await newProcess.createProcess({ ...processData }, sessionId, accountId);
  return process._id;
};

export const terminateProcess = async (id) => {
  if (!id) throw new Error('E1112');
  const process = await Process.findProcess(id);
  // Checking the success of the process
  const activities = await Activity.findProcessActivities(id);
  const n = activities.length;
  if (n === process.stages) {
    await process.setProcessSuccess(activities[n - 1].success);
  } else {
    await process.setProcessSuccess(false);
  }
  await process.setProcessStatus('terminated');
};

export const registerActivity = async (stage, processId) => {
  if (!stage || !processId) throw new Error('E1007');
  // Searching the related process
  const process = await Process.findProcess(processId);
  const selectedProcess = LOOKUPS.docugen_web.processes.find((p) => p.code === process.code);
  // Extracting the activity data in: (stage, code)
  const { activities } = selectedProcess;
  const selectedActivity = activities.find((a) => a.stage === stage);
  // Creating the new Activity
  const newActivity = new Activity();
  const activity = await newActivity.createActivity(selectedActivity, processId);
  // Adding reference to the process activities stack
  await process.addProcessActivity(activity._id);
  return activity;
};

export const setActivitySuccess = async (activityId, success) => {
  if (!activityId || typeof success !== 'boolean') throw new Error('E1015');
  // Searching the activity by id
  const activity = await Activity.findActivity(activityId);
  // Adding the success value
  const updatedActivity = await activity.setActivitySuccess(success);
  return updatedActivity;
};

export const setActivityResourse = async (activityId, resourceData) => {
  if (!activityId || !resourceData) throw new Error('E1016');
  // Searching the activity by id
  const activity = await Activity.findActivity(activityId);
  const { id, model } = resourceData;
  // Adding the resourse
  const updatedActivity = await activity.addActivityResource(id, model);
  return updatedActivity;
};
