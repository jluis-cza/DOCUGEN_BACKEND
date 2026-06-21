import { SERVICES } from '../constants/services.js';

export const serverTimeGetter = () => {
  const currentTime = new Date().toISOString();
  if (!currentTime) throw new Error('E0901');
  return {
    currentTime,
  };
};

export const routesInfoGetter = () => {
  const routes = SERVICES.backend.routers;
  return {
    routes,
  };
};
