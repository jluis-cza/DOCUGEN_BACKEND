//Main server configuration

import app from './src/app.js'
import connectDB from './src/config/database.js';
import { SERVICES } from './src/constants/services.js';

const PORT = SERVICES.backend.port

await connectDB()

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT} port`);
});