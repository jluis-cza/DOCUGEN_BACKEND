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
          verify_password: '/verify-pass',
          check_username: '/check-user',
          get_username: '/get-user',
        },
        administration: {
          base: '/admin',
          monitor: '/monitor',
          configuration: '/config',
          review: '/rev',
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
        management: {
          base: '/manager',
          monitor: '/monitor',
          configuration: '/config', //Rarely used
          resource: {
            activities: {
              base: '/activities',
              id: '/:activity_id',
            },
            processes: {
              base: '/processes',
              id: '/:process_id',
            },
            notifications: {
              base: '/notifications',
              id: '/:notification_id',
              acknowledgement: '/ack',
              creation: '/create',
            },
            profiles: {
              base: '/profiles',
              id: '/:profile_id',
            },
          },
        },
      },
      docugen_app: {},
      utils: {
        base: '/utils',
        routes: '/info',
        time:'/time'
      },
      lookup: {
        base: '/lookup',
        resource:{
          accounts: {
            base: '/accounts',
          },
          roles: {
            base: '/roles',
            admin: '/admin',
            dev: '/dev'
          }
        }
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
