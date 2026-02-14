// CRON JOBS
// Configuration of the automatic cron jobs in the server.

import cron from 'node-cron';
import { sampleSystemParameters } from '../services/docugen-web/administrationServices.js';
import { checkActiveSessionDuration } from '../services/docugen-web/admissionServices.js';
import { MESSAGES } from '../constants/messages.js';

const errorMessage = Object.fromEntries(MESSAGES.error.map(e => [e.code, e]))
const startCJ = async () => {
  try {
    // Sampling system parameters
    cron.schedule('*/30 * * * *', async () => {
      console.log('Sampling system parameters values...');
      await sampleSystemParameters();
    });

    // Closing inactive sessions
    cron.schedule('*/1 * * * *', async () => {
      console.log('Checking active session duration...');
      await checkActiveSessionDuration();
    });

    //Example
    // cron.schedule("*/1 * * * *", async () => {
    //  console.log("Testing (cada un minuto)");
    // });

    console.log('Cron jobs started.');
  } catch (error) {
    console.log('Error in starting cron schedule.', error);
    const code = error.message || "default"
    const message = errorMessage[code].message
    console.log('Error message:', message);
    process.exit(1);
  }
};
export default startCJ;
