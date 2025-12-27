// ******************************************************************************
// SERVICES CONSTANTS
// A centralized constant configuration file for api rutes ULRs and URIs
// ******************************************************************************
import dotenv from 'dotenv';

dotenv.config();

export const SERVICES = {
  frontend: {
    url: process.env.FRONT_URL,
  },
  backend: {
    port: process.env.PORT,
    routes: {
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
};
// ******************************************************************************

// ******************************************************************************
// NON AUTHENTICATED ROUTES
// These routes can be accessed by the user with the guest role. No token needed.
// ******************************************************************************
export const NON_AUTH_ROUTES = [
  SERVICES.backend.routes.version +
    SERVICES.backend.routes.base +
    SERVICES.backend.routes.docugen_web.admission.base +
    SERVICES.backend.routes.docugen_web.admission.register_account,
  SERVICES.backend.routes.version +
    SERVICES.backend.routes.base +
    SERVICES.backend.routes.docugen_web.admission.base +
    SERVICES.backend.routes.docugen_web.admission.start_session,
  SERVICES.backend.routes.version +
    SERVICES.backend.routes.base +
    SERVICES.backend.routes.docugen_web.admission.base +
    SERVICES.backend.routes.docugen_web.admission.renew_access,
  SERVICES.backend.routes.version +
    SERVICES.backend.routes.base +
    SERVICES.backend.routes.docugen_web.default,
  SERVICES.backend.routes.version +
    SERVICES.backend.routes.base +
    SERVICES.backend.routes.docugen_web.health,
];
// ******************************************************************************
