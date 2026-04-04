// DATABASE CONFIGURATION
// Configuration of the MongoDB connection through Mongoose.

import mongoose from 'mongoose';
import { SERVICES } from '../constants/services.js';

const DB_URI = SERVICES.database.uri;

const connectDB = async () => {
  try {
    const response = await mongoose.connect(DB_URI);
    console.log('Data Base connected');
    return response;
  } catch (error) {
    console.log('Error in connecting the database.', error);
    process.exit(1);
  }
};

export default connectDB;
