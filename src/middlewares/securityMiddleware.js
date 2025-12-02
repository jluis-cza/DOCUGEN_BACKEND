// // Security middlewares utilities

// import express from 'express'
// import jwt from 'jsonwebtoken';
// import { SERVICES } from '../constants/services.js';

// const FRONT_URL = SERVICES.frontend.url

// const securityMiddleware = (app) => {
 
//  // ************* Incomming security middleware services ************* 
 
//  // JWT verification middleware
//  // app.use((req, res, next) => {
//  //  const token = req.headers['authorization'];
//  //  if (!token) {
//  //   return res.status(401).json({ success: false, message: 'No token provided.' });
//  //  }
//  //  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//  //   if (err) {
//  //    return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
//  //   }
//  //   req.userId = decoded.id;
//  //   next();
//  //  });
//  // });
 
//  // ************* Outgoing security middleware services *************

// }

// export default securityMiddleware
