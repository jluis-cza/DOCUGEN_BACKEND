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
          base: '/auth',
          register_account: '/register',
          start_session: '/login',
          close_session: '/logout',
          renew_access: '/refresh',
        },
        administration: {
          base: '/admin',
          monitor: '/monitor',
          configuration: '/config',
          resource: {
            system_parameters: '/system',
            accounts: '/accounts',
            services: '/services',
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
}
