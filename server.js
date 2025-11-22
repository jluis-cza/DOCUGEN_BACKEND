import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// DB conection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado');
    app.listen(process.env.PORT, () => {
      console.log(`Servidor escuchando en puerto ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));
