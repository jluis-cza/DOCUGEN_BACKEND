import dotenv from "dotenv";

dotenv.config();

export const KEYS = {
 backend: {
  jwt: process.env.JWT_SECRET,
  session_timeout: "2h"
 },
};