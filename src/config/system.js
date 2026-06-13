import Account from '../models/docugen-web/Account.js';
import Session from '../models/docugen-web/Session.js';
import { disconnectDB } from './database.js';

// System session starter
export const startSystemSession = async () => {
  try {
    await endSystemSession('expired'); // Cleaning previous system session if any
    const account = await Account.findAccount('', 'system', '', '');
    const newSession = new Session();
    const session = await newSession.createSession(account._id);
    console.log('System session started');
    return { session, account };
  } catch (error) {
    console.log('Error in starting the system.', error);
    process.exit(1);
  }
};

// System session terminator
export const endSystemSession = async (closureStatus) => {
  try {
    const account = await Account.findAccount('', 'system', '', '');
    try {
      const session = await Session.findCurrentSession(account._id);
      await session.endSession(closureStatus);
      console.log('System session ended');
    } catch (error) {
      if (error.message !== 'E0203') throw error;
    }
  } catch (error) {
    console.log('Error in terminating the system.', error);
    process.exit(1);
  }
};

// Graceful system shutdown
export const systemShutdown = async (signal, server) => {
  console.log(
    `A termination system signal (${signal}) has been reveived. Proceding to shut down the system.`
  );
  try {
    await new Promise((resolve) => {
      server.close(() => {
        console.log('HTTP Server offline');
        resolve();
      });
    });
    await endSystemSession('terminated');
    await disconnectDB(); //At the end, because it also exits de server internally.
    process.exit(0); // safe exit
  } catch (error) {
    console.error(error.message);
    console.error('Error while shutting down the system.', error);
    process.exit(1);
  }
};
