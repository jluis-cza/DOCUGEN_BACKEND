// Connection between Express and MongoDB

import mongoose from 'mongoose';
import { SERVICES } from '../constants/services.js';

const DB_URI = SERVICES.database.uri;

const connectDB = async () => {
  try {
    const response = await mongoose.connect(DB_URI);
    console.log('Data Base connected');
    return response;
  } catch (error) {
    console.log(error);
    process.exit(1);
    return error;
  }
};

export default connectDB;
