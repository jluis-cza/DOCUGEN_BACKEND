// CRON JOBS
// Configuration of the automatic cron jobs in the server.

import cron from 'node-cron';
import { sampleSystemParameters } from '../services/docugen-web/administrationServices.js';
import {
  checkActiveSessionDuration,
  checkInactiveAccounts,
} from '../services/docugen-web/admissionServices.js';
import { MESSAGES } from '../constants/messages.js';
import { registerProcessSignature } from '../helpers/utils.js';
import { terminateProcess, logActivity } from '../services/utils.js';

const errorMessage = Object.fromEntries(MESSAGES.error.map((e) => [e.code, e]));
const startCronJobs = async (session, account) => {
  try {
    // Sampling system parameters
    cron.schedule('*/30 * * * *', async () => {
      let idSet = {};
      try {
        idSet = await registerProcessSignature('P0205', session._id, account._id);
        console.log('Starting system parameter sampling...');
        await sampleSystemParameters(idSet);
      } catch (error) {
        console.log('Error in sampling system parameters.', error);
        await handleCronJobError(error, idSet);
      } finally {
        await terminateProcess(idSet.associated_process);
      }
    });

    // Closing inactive sessions
    cron.schedule('*/5 * * * *', async () => {
      let idSet = {};
      try {
        idSet = await registerProcessSignature('P0103', session._id, account._id);
        console.log('Starting active session duration control...');
        await checkActiveSessionDuration(idSet);
      } catch (error) {
        console.log('Error in checking active session duration.', error);
        await handleCronJobError(error, idSet);
      } finally {
        await terminateProcess(idSet.associated_process);
      }
    });

    // Deleting inactive accounts
    cron.schedule('*/10 * * * *', async () => {
      let idSet = {};
      try {
        idSet = await registerProcessSignature('P0104', session._id, account._id);
        console.log('Starting inactive account detection...');
        await checkInactiveAccounts(idSet);
      } catch (error) {
        console.log('Error in checking inactive accounts.', error);
        await handleCronJobError(error, idSet);
      } finally {
        await terminateProcess(idSet.associated_process);
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

const handleCronJobError = async (error, idSet) => {
  await logActivity(1, false, idSet);
  const code = error.message || 'default';
  const message = errorMessage[code]?.message || 'Unknown error';
  console.log('Error message:', message);
};

export default startCronJobs;
