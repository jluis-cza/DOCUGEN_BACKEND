// TOKEN KEYS

import dotenv from 'dotenv';
dotenv.config();

export const KEYS = {
  access: {
    jwt: process.env.JWT_SECRET_ACCESS,
    session_timeout: {
      dev: '2m',
      admin: '5m',
    },
  },
  refresh: {
    jwt: process.env.JWT_SECRET_REFRESH,
    session_timeout: {
      dev: '5m',
      admin: '1h',
    },
    cookie_config: {
      httpOnly: true,
      secure: false, // true in HTTPS
      sameSite: 'lax', //None in HTTPS
      // path: '/auth/refresh',
    },
  },
};

// *Refresh tokens are cookies and access tokens are stored in memory
