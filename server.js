// MAIN SERVER CONFIGURATION
// Main entry point of the server, it start all the server related services including the Express APP.

import app from './src/app.js';
import { connectDB } from './src/config/database.js';
import { SERVICES } from './src/constants/services.js';
import startCronJobs from './src/config/cron.js';
import { startSystemSession, systemShutdown } from './src/config/system.js';

const PORT = SERVICES.backend.port;

await connectDB();
const { session, account } = await startSystemSession();
await startCronJobs(session, account);

// Starting the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

// Listening to shutdowns
process.on('SIGINT', () => systemShutdown('SIGINT', server)); //listen to ctrl+C
process.on('SIGTERM', () => systemShutdown('SIGTERM', server)); //listen to ending signal of Docker, Heroku, etc
