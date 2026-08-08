// GENERAL MIDDLEWARE UTILITIES

import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import qs from 'qs'
import { SERVICES } from '../constants/services.js';

const FRONTEND_URL = SERVICES.frontend.url;

const generalMiddleware = (app) => {
  app.use(
    cors({
      origin: FRONTEND_URL,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      exposedHeaders: ['set-cookie'],
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.set('query parser', (str) => qs.parse(str));
};

export default generalMiddleware;
