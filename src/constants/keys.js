// ******************************************************************************
// KEYS
// Definition of the private key for generating the tokens
// Timeout sessions specifications
// ******************************************************************************
import dotenv from 'dotenv';
dotenv.config();

export const KEYS = {
  access: {
    jwt: process.env.JWT_SECRET_ACCESS,
    session_timeout: {
      client: '5m',
      server: '5m',
    },
  },
  refresh: {
    jwt: process.env.JWT_SECRET_REFRESH,
    session_timeout: {
      client: '8h',
      server: '1h',
    },
    cookie_config: {
      httpOnly: true,
      secure: false, // true in HTTPS
      sameSite: 'lax', //None in HTTPS
      // path: '/auth/refresh',
    },
  },
};
// ******************************************************************************
