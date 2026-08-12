// TOKEN KEYS

import dotenv from 'dotenv';
dotenv.config();

export const KEYS = {
  access: {
    jwt: process.env.JWT_SECRET_ACCESS,
    session_timeout: {
      dev: '30m',
      admin: '15m',
    },
  },
  refresh: {
    jwt: process.env.JWT_SECRET_REFRESH,
    session_timeout: {
      dev: '6h',
      admin: '3h',
    },
    cookie_config: {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      // path: '/auth/refresh',
    },
  },
};

// *Refresh tokens are cookies and access tokens are stored in memory
