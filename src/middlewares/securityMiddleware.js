// SECURITY MIDDLEWARE UTILITIES
// This middleware verifies the existence of an access token.

import { verifyToken } from '../helpers/docugen-web/admissionHelper.js';

const securityMiddleware = async (req, res, next) => {
  // Verifying the token bearer payload field
  const tokenBearer = req.get('Authorization');
  if (!tokenBearer) {
    return res.status(401).json({ success: false, message: 'Authorization header missing.' });
  }
  const tokenBearerSplit = tokenBearer.split(' ');

  if (tokenBearerSplit[0] === 'Bearer' && tokenBearerSplit.length === 2) {
    const token = tokenBearerSplit[1];
    try {
      const response = await verifyToken(token, 'access'); //Decoding token
      req.user = response.payload; // Saving decoded token
      return next(); // it passed the verification
    } catch (error) {
      return res.status(401).json({ success: false, message: error.message });
    }
  }
  return res.status(401).json({ success: false, message: 'Token error' });
};

export default securityMiddleware;
