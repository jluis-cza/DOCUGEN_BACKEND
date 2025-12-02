// A centralized constant configuration file

import dotenv from "dotenv";

dotenv.config();

export const SERVICES = {
 frontend: {
  url: process.env.FRONT_URL,
 },
 backend: {
  port: process.env.PORT,
  routes: {
   base: "/api",
   version: "/v1",
   docugen_web: {
    admission: {
     base: "/auth",
     register_account: "/register",
     start_session: "/login",
    },
    default: "/",
    health: "/health",
   },
   docugen_app: {},
  },
 },
 database: {
  uri: process.env.DB_URI,
 },
};
