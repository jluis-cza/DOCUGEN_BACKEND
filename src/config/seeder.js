// SEEDER
// Populate a initial set of data in a collection database

import SystemParameter from '../models/docugen-web/SystemParameter.js';

const seedDB = async () => {
  try {
    await SystemParameter.deleteAllSystemParameters();
    await SystemParameter.seedDefaultSystemParameters();
    // ...
  } catch (error) {
    console.error('Error in seeding the database.', error);
    process.exit(1);
  }
};

export default seedDB;
