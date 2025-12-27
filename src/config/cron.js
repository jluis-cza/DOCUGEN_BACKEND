
// ******************************************************************************
// CRON INITIALIZATION
// ******************************************************************************
import cron from 'node-cron';
import { sampleSystemParameters } from '../services/docugen-web/administrationServices.js';
import { checkActiveSessionDuration } from '../services/docugen-web/admissionServices.js';

const initCronJobs = async () => {
  try {
    // System parameters tasks
    cron.schedule('*/30 * * * *', async () => {
      console.log('Sampling system parameters values.');
      await sampleSystemParameters();
    });

    // Session tasks
    cron.schedule('*/1 * * * *', async () => {
      console.log('Checking active session duration.');
      await checkActiveSessionDuration();
    });
    //Example
    // cron.schedule("*/1 * * * *", async () => {
    //  console.log("Testing (cada un minuto)");
    // });

    console.log('Cron jobs started.');
  } catch (error) {
    console.log('Error starting cron schedule.', error);
  }
};
export default initCronJobs;
// ******************************************************************************
// Ejecutar cada 5 minutos: */5 * * * *
// Ejecutar cada hora: 0 * * * *
// Ejecutar cada día a medianoche: 0 0 * * *
// Ejecutar cada 30 segundos: */30 * * * * *
