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
          lookup: '/categories',
          resource: {
            system_parameters: {
              base: '/system',
              id: '/:system_parameter_id',
            },
            accounts: {
              base: '/accounts',
              id: '/:account_id',
              resource: {
                sessions: {
                  base: '/sessions',
                  id: '/:session_id',
                },
              },
            },
            services: {
              base: '/services',
              id: '/:service_id',
            },
          },
        },
        management: {},
      },
      docugen_app: {},
      utils: {
        base: '/utils',
        routes_info: '/info',
        time: '/time',
        notifications: {
          base: '/notifications',
          id: '/:notification_id',
        },
        activities: {
          base: '/activities',
          id: '/:activity_id',
        },
        processes: {
          base: '/processes',
          id: '/:process_id',
        },
      },
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
