import Process from '../models/docugen-web/Process.js';
import Activity from '../models/docugen-web/Activity.js';
import { LOOKUPS } from '../constants/lookups.js';

export const registerProcess = async (code) => {
  if (!code) throw new Error('E1111');
  const newProcess = new Process();
  const selectedProcess = LOOKUPS.docugen_web.processes.find((p) => p.code === code);
  const { activities, ...processData } = selectedProcess;
  const process = await newProcess.createProcess({ ...processData });
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

export const logActivity = async (stage, success, idSet) => {
  if (!stage || !success || !idSet) throw new Error('E1007');
  // Searching the related process
  const { associated_process } = idSet;
  const process = await Process.findProcess(associated_process);
  const selectedProcess = LOOKUPS.docugen_web.processes.find((p) => p.code === process.code);
  // Extracting the activity data in: (stage, code)
  const { activities } = selectedProcess;
  const selectedActivity = activities.find((a) => a.stage === stage);
  // Creating the new Activity
  const newActivity = new Activity();
  const activity = await newActivity.createActivity(selectedActivity, idSet);
  await activity.setActivitySuccess(success);
};
