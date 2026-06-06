// SEEDER
//  Run before starting the server.
//  Run with: npm run seed
// Populate a initial set of data in a collection database
import { connectDB, disconnectDB } from './database.js';
import SystemParameter from '../models/docugen-web/SystemParameter.js';
import ServiceLookup from '../models/docugen-web/ServiceLookup.js';

const seedDB = async () => {
  try {
    await SystemParameter.deleteAllSystemParameters(); //Delete this if you dont want to delete the already data in the collection and just (update and insert)
    await SystemParameter.seedDefaultSystemParameters();
    // ...
    await ServiceLookup.deleteAllServiceLookups(); //Delete this if you dont want to delete the already data in the collection and just (update and insert)
    await ServiceLookup.seedDefaultServiceLookups();

    console.log('Successfully seeded');
  } catch (error) {
    console.error('Error in seeding the database.', error);
    process.exit(1);
  }
};

await connectDB();
await seedDB();
await disconnectDB();
