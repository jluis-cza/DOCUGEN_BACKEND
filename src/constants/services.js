// SERVICES CONSTANTS
// A centralized constant configuration file for api routes, ULRs and URIs.

import dotenv from 'dotenv';

dotenv.config();

export const SERVICES = {
  frontend: {
    url: process.env.FRONTEND_URL,
  },
  backend: {
    port: process.env.BACKEND_PORT,
    routers: {
      base: '/api',
      version: '/v1',
      docugen_web: {
        admission: {
          base: '/adm',
          register_account: '/register',
          start_session: '/login',
          close_session: '/logout',
          renew_access: '/refresh',
          verify_email: '/verify-email',
        },
        administration: {
          base: '/admin',
          monitor: '/monitor',
          configuration: '/config',
          resource: {
            system_parameters: {
              base: '/system',
              id: '/:system-parameter-id',
            },
            accounts: {
              base: '/accounts',
              id: '/:account-id',
            },
            services: {
              base: '/services',
              id: '/:service-id',
            },
          },
        },
        default: '/',
        health: '/health',
      },
      docugen_app: {},
    },
  },
  database: {
    uri: process.env.DB_URI,
  },
  smtp: {
    email: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};
