// GENERAL MIDDLEWARE UTILITIES

import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { SERVICES } from '../constants/services.js';

const FRONTEND_ORIGINS = (SERVICES.frontend.url || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const generalMiddleware = (app) => {
  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, X-Requested-With, Access-Control-Request-Method, Access-Control-Request-Headers'
      );
      return res.sendStatus(204);
    }
    return next();
  });

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || FRONTEND_ORIGINS.includes(origin)) {
          callback(null, true);
          return;
        }

        callback(null, false);
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers',
      ],
      exposedHeaders: ['set-cookie'],
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
};

export default generalMiddleware;
