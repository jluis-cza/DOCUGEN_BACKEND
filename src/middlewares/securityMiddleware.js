// SECURITY MIDDLEWARE UTILITIES
// This middleware verifies the existence of an access token.
// Supports both JWT session tokens and independent API tokens

import { verifyToken } from '../helpers/docugen-web/admissionHelper.js';
import * as apiTokenService from '../services/docugen-app/apiTokenService.js';

const securityMiddleware = async (req, res, next) => {
  // Verifying the token bearer payload field
  const tokenBearer = req.get('Authorization');
  if (!tokenBearer) {
    return res.status(401).json({ success: false, message: 'Authorization header missing.' });
  }
  const tokenBearerSplit = tokenBearer.split(' ');

  if (tokenBearerSplit[0] === 'Bearer' && tokenBearerSplit.length === 2) {
    const token = tokenBearerSplit[1];

    // Check if it's an API Token (starts with api_sk_)
    if (token.startsWith('api_sk_')) {
      try {
        const apiToken = await apiTokenService.verifyAPIToken(token);

        if (!apiToken) {
          return res.status(401).json({
            success: false,
            code: 'E0001',
            message: 'API Token inválido o revocado.',
          });
        }

        // Verificar si está revocado o expirado
        if (apiToken.revokedAt) {
          return res.status(401).json({
            success: false,
            code: 'E0002',
            message: 'API Token ha sido revocado.',
          });
        }

        if (apiToken.expiresAt && apiToken.expiresAt < new Date()) {
          return res.status(401).json({
            success: false,
            code: 'E0003',
            message: 'API Token ha expirado.',
          });
        }

        // Registrar acceso (auditoría)
        const ipAddress = req.ip || req.connection.remoteAddress;
        await apiTokenService.recordTokenAccess(apiToken, ipAddress);

        // Establecer contexto del usuario (del token de API)
        req.user = {
          id: apiToken.owner._id,
          email: apiToken.owner.user?.email,
          name: apiToken.owner.user?.name,
        };
        req.sess = { id: `api-token-${apiToken._id}` };
        req.apiToken = apiToken;
        req.scopes = apiToken.scopes;
        req.isAPIToken = true;

        return next();
      } catch (error) {
        return res.status(401).json({
          success: false,
          code: 'E0001',
          message: 'Invalid API Token',
        });
      }
    }

    // If not an API token, treat as JWT session token
    try {
      const response = await verifyToken(token, 'access'); // Decoding token
      req.user = response.payload.accountPayload; // Saving account info from decoded token
      req.sess = response.payload.sessionPayload; // Saving session info from decoded token
      req.isAPIToken = false;
      return next(); // it passed the verification
    } catch (error) {
      return res.status(401).json({ success: false, message: error.message });
    }
  }

  return res.status(401).json({ success: false, message: 'Token error' });
};

export default securityMiddleware;
