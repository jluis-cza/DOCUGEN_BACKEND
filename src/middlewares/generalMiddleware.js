// ******************************************************************************
// General middlewares utilities
// ******************************************************************************
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { SERVICES } from '../constants/services.js';

const FRONT_URL = SERVICES.frontend.url;

const generalMiddleware = (app) => {
  // ************* Incomming middleware services *************

  // Enable frontend connection
  app.use(
    cors({
      origin: FRONT_URL,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      exposedHeaders: ['set-cookie'],
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // ************* Outgoing middleware services *************
};

export default generalMiddleware;
// ******************************************************************************
