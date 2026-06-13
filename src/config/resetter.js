// RESETTER
//  Run before starting the server.
//  Run with: npm run reset
// This deletes all the collections within the current database
import { connectDB, disconnectDB } from './database.js';
import mongoose from 'mongoose';

const resetDB = async () => {
  try {
    const db = mongoose.connection.db;
    await db.dropDatabase();
    console.log('Successfully restored');
  } catch (error) {
    console.error('Error in resetting the database.', error);
    process.exit(1);
  }
};

await connectDB();
await resetDB();
await disconnectDB();
