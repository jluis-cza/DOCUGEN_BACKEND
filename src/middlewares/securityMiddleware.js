// ******************************************************************************
// SECURITY MIDDLEWARE UTILITIES
// This middleware filters the requests according to the access token provided.
// ******************************************************************************
import { NON_AUTH_ROUTES } from '../constants/services.js';
import { verifyToken } from '../helpers/models.js';

const noTokenRoutes = NON_AUTH_ROUTES;

const securityMiddleware = (app) => {
  app.use((req, res, next) => {
    //Verifying the while list routes
    if (noTokenRoutes.includes(req.path)) {
      return next();
    }

    //Verifying the token field
    const tokenBearer = req.get('Authorization');
    if (!tokenBearer) {
      return res.status(401).json({ success: false, message: 'Authorization header missing.' });
    }
    const tokenBearerSplit = tokenBearer.split(' ');

    if (tokenBearerSplit[0] === 'Bearer' && tokenBearerSplit.length === 2) {
      const token = tokenBearerSplit[1];
      try {
        const response = verifyToken(token, 'access'); //Decoding token
        req.user = response.payload; // Saving decoded token
        return next();
      } catch (error) {
        return res.status(400).json({ success: false, message: error });
      }
    }

    return res.status(401).json({ success: false, message: 'No token found.' });
  });
};

export default securityMiddleware;
// ******************************************************************************
