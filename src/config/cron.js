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
import { terminateProcess } from '../services/utils.js';

const errorMessage = Object.fromEntries(MESSAGES.error.map((e) => [e.code, e]));
const startCronJobs = async (session, account) => {
  try {
    // Sampling system parameters
    cron.schedule('*/30 * * * *', async () => {
      const idSet = await registerProcessSignature('P0205', session._id, account._id);
      console.log('Sampling system parameters values...');
      await sampleSystemParameters(idSet);
      await terminateProcess(idSet.associated_process);
    });

    // Closing inactive sessions
    cron.schedule('*/5 * * * *', async () => {
      const idSet = await registerProcessSignature('P0103', session._id, account._id);
      console.log('Checking active session duration...');
      await checkActiveSessionDuration(idSet);
      await terminateProcess(idSet.associated_process);
    });

    // Deleting inactive accounts
    cron.schedule('*/10 * * * *', async () => {
      const idSet = await registerProcessSignature('P0104', session._id, account._id);
      console.log('Checking inactive accounts to delete them...');
      await checkInactiveAccounts(idSet);
      await terminateProcess(idSet.associated_process);
    });
    //Example
    // cron.schedule("*/1 * * * *", async () => {
    //  console.log("Testing (cada un minuto)");
    // });

    console.log('Cron jobs started.');
  } catch (error) {
    console.log('Error in starting cron schedule.', error);
    const code = error.message || 'default';
    const message = errorMessage[code].message;
    console.log('Error message:', message);
    process.exit(1);
  }
};

export default startCronJobs;
