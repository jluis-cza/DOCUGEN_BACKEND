// CRON JOBS
// Configuration of the automatic cron jobs in the server.

import cron from 'node-cron';
import { sampleSystemParameters } from '../services/docugen-web/administrationServices.js';
import {
  checkActiveSessionDuration,
  checkInactiveAccounts,
} from '../services/docugen-web/admissionServices.js';
import { MESSAGES } from '../constants/messages.js';
import {
  registerProcess,
  terminateProcess,
  registerActivity,
  setActivitySuccess,
} from '../services/docugen-web/managementServices.js';

const errorMessage = Object.fromEntries(MESSAGES.error.map((e) => [e.code, e]));
const startCronJobs = async (session, account) => {
  try {
    // Sampling system parameters
    cron.schedule('*/6 * * * *', async () => {
      let processId = {};
      let activity = {};
      try {
        processId = await registerProcess('P0205', session._id, account._id);
        console.log('Starting system parameter sampling...');
        activity = await registerActivity(1, processId);
        await sampleSystemParameters();
        await setActivitySuccess(activity._id, true);
      } catch (error) {
        console.log('Error in sampling system parameters.', error);
        await handleCronJobError(error, processId, activity._id);
      } finally {
        await terminateProcess(processId);
      }
    });

    // Closing inactive sessions
    cron.schedule('*/1 * * * *', async () => {
      let processId = {};
      let activity = {};
      try {
        processId = await registerProcess('P0103', session._id, account._id);
        console.log('Starting active session duration control...');
        activity = await registerActivity(1, processId);
        await checkActiveSessionDuration();
        await setActivitySuccess(activity._id, true);
      } catch (error) {
        console.log('Error in checking active session duration.', error);
        await handleCronJobError(error, processId, activity._id);
      } finally {
        await terminateProcess(processId);
      }
    });

    // Deleting inactive accounts
    cron.schedule('*/3 * * * *', async () => {
      let processId = {};
      let activity = {};
      try {
        processId = await registerProcess('P0104', session._id, account._id);
        console.log('Starting inactive account detection...');
        activity = await registerActivity(1, processId);
        await checkInactiveAccounts();
        await setActivitySuccess(activity._id, true);
      } catch (error) {
        console.log('Error in checking inactive accounts.', error);
        await handleCronJobError(error, processId, activity._id);
      } finally {
        await terminateProcess(processId);
      }
    });
    //Example
    // cron.schedule("*/1 * * * *", async () => {
    //  console.log("Testing (cada un minuto)");
    // });
    console.log('Cron jobs started.');
  } catch (error) {
    console.log('Error in starting cron jobs.', error);
    const code = error.message || 'default';
    const message = errorMessage[code].message;
    console.log('Error message:', message);
  }
};

const handleCronJobError = async (error, processId, activityId) => {
  await setActivitySuccess(activityId, false);
  const code = error.message || 'default';
  const message = errorMessage[code]?.message || 'Unknown error';
  console.log('Error message:', message);
};

export default startCronJobs;
