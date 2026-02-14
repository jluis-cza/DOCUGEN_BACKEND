// MAIN SERVER CONFIGURATION
// Main entry point of the server, it start all the server related services including the Express APP.

import app from './src/app.js';
import connectDB from './src/config/database.js';
import { SERVICES } from './src/constants/services.js';
import startCJ from './src/config/cron.js';
import seedDB from './src/config/seeder.js';

const PORT = SERVICES.backend.port;

await connectDB();
await seedDB();
await startCJ();

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT} port.`);
});
