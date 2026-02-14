// DIRECT ROUTES
// These functions don't interact with models and resolve requests and
// responses by themselves.

import { SERVICES } from '../constants/services.js';

const ROUTES_INFO = SERVICES.backend.routers;

export const infoRoute = (req, res) => {
  res.json({
    success: true,
    message: 'Information of routes',
    routers: ROUTES_INFO,
  });
};

export const healthRoute = (req, res) => {
  res.json({
    success: true,
    message: 'Server is up!',
    timestamp: new Date().toISOString(),
  });
};

export const notFoundRoute = (req, res) => {
  // res.status(404).json({
  //  success: false,
  //  message: "Path not found",
  //  path: req.originalUrl,
  // });

  res.status(404).send('404 Not Found');
};

// export errorHandlerRoute = (err, req, res, next) => {

// }
