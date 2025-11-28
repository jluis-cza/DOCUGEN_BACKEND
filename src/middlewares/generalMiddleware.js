// General middlewares utilities

import cors from 'cors';
import express from 'express'
import { SERVICES } from '../constants/services.js';

const FRONT_URL = SERVICES.frontend.url

const generalMiddleware = (app) => {
 
 // ************* Incomming middleware services ************* 
 
 // Enable frontend connection
 app.use(cors({
   origin: FRONT_URL,
  //  credentials: true
 }));
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 
 // ************* Outgoing middleware services ************* 

}

export default generalMiddleware
