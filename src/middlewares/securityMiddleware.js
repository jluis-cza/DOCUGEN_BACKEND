// Security middlewares utilities

import jwt from "jsonwebtoken";
import { NON_AUTH_ROUTES } from "../constants/services.js";
import { KEYS } from "../constants/keys.js";

const KEY_JWT = KEYS.backend.jwt;
const noTokenRoutes = NON_AUTH_ROUTES;

const securityMiddleware = (app) => {
 app.use((req, res, next) => {
  //Verifying the while list routes
  if (noTokenRoutes.includes(req.path)) {
   return next();
  }
  //Verifying the token field
  const tokenBearer = req.get("Authorization");
  if (!tokenBearer) {
   return res
    .status(401)
    .json({ success: false, message: "Authorization header missing." });
  }
  const tokenBearerSplit = tokenBearer.split(" ");

  if (tokenBearerSplit[0] === "Bearer" && tokenBearerSplit.length === 2) {
   const token = tokenBearerSplit[1];
   console.log("Token encontrado:", token)
   try {
    const payload = jwt.verify(token, KEY_JWT); //Decoding token
    req.user = payload; // Saving decoded token
    console.log("Token decodificado: ", req.user)
    return next();
   } catch (error) {
    return res
     .status(400)
     .json({ success: false, message: "Error decoding token." });
   }
  }
  return res.status(401).json({ success: false, message: "No token found." });
 });
};

export default securityMiddleware;
