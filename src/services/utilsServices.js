import Process from '../models/docugen-web/Process.js';
import Activity from '../models/docugen-web/Activity.js';
import { LOOKUPS } from '../constants/lookups.js';
import { SERVICES } from '../constants/services.js';

// *************************************************************************************************
// MODEL ASSOCIATED SERVICES
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

// -------

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
  if (!activityId || !success) throw new Error('E1015');
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

// *************************************************************************************************
// MODELLESS SERVICES

export const serverTimeGetter = () => {
  const currentTime = new Date().toISOString();
  if (!currentTime) throw new Error('E0901');
  return {
    currentTime,
  };
};

export const routesInfoGetter = () => {
  const routes = SERVICES.backend.routers;
  return {
    routes,
  };
};
