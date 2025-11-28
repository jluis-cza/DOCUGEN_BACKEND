import { SERVICES } from "../constants/services.js";

const ROUTES_INFO = SERVICES.backend.routes;

export const infoRoute = (req, res) => {
 res.json({
  success: true,
  message: "Information of routes",
  routes: ROUTES_INFO,
 });
};

export const healthRoute = (req, res) => {
 res.json({
  success: true,
  message: "Server is up!",
  timestamp: new Date().toISOString(),
 });
};

export const notFoundRoute = (req, res, next) => {
 // res.status(404).json({
 //  success: false,
 //  message: "Path not found",
 //  path: req.originalUrl,
 // });

 res.status(404).send("404 Not Found");
};

// export errorHandlerRoute = (err, req, res, next) => {

// }
