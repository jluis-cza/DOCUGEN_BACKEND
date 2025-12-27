//Main server configuration

import app from './src/app.js';
import connectDB from './src/config/database.js';
import { SERVICES } from './src/constants/services.js';
import initCronJobs from './src/config/cron.js';
import seedDB from './src/config/seeder.js';

const PORT = SERVICES.backend.port;

await connectDB();
await seedDB();
await initCronJobs();

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT} port`);
});
