// API TOKEN SERVICE
// Business logic para gestión de tokens independientes

import crypto from 'node:crypto';
import APIToken from '../../models/docugen-app/APIToken.js';

export const createAPIToken = async ({ ownerId, name, description, scopes, expiresAt }) => {
  if (!name || !name.trim()) {
    throw new Error('E3001'); // Token name required
  }

  // Generar token
  const { token, token_hash, token_preview } = APIToken.generateToken();

  // Crear documento en BD
  const apiToken = new APIToken({
    owner: ownerId,
    name: name.trim(),
    description: description?.trim() || '',
    token_hash,
    token_preview,
    scopes: Array.isArray(scopes) && scopes.length > 0 ? scopes : ['documents:generate'],
    expiresAt: expiresAt || null,
  });

  await apiToken.save();

  // Retornar token SOLO UNA VEZ (nunca más se puede ver)
  return {
    id: apiToken._id,
    name: apiToken.name,
    token, // ⚠️ SOLO ESTA VEZ
    token_preview: apiToken.token_preview,
    scopes: apiToken.scopes,
    createdAt: apiToken.createdAt,
    expiresAt: apiToken.expiresAt,
    message: 'Copia tu token ahora. No se mostrará de nuevo.',
  };
};

export const getAPITokens = async ({ ownerId }) => {
  const tokens = await APIToken.getActiveTokens(ownerId);

  return tokens.map((token) => ({
    id: token._id,
    name: token.name,
    description: token.description,
    token_preview: token.token_preview,
    scopes: token.scopes,
    createdAt: token.createdAt,
    expiresAt: token.expiresAt,
    lastUsedAt: token.lastUsedAt,
    lastUsedIp: token.lastUsedIp,
    accessCount: token.accessCount,
    status: token.status,
  }));
};

export const getAPIToken = async ({ id, ownerId }) => {
  const token = await APIToken.findOne({
    _id: id,
    owner: ownerId,
  });

  if (!token) {
    throw new Error('E3002'); // Token not found
  }

  return token.toJSON();
};

export const updateAPIToken = async ({ id, ownerId, payload }) => {
  const token = await APIToken.findOne({
    _id: id,
    owner: ownerId,
  });

  if (!token) {
    throw new Error('E3002'); // Token not found
  }

  if (payload.name !== undefined) {
    token.name = payload.name.trim();
  }

  if (payload.description !== undefined) {
    token.description = payload.description.trim();
  }

  if (Array.isArray(payload.scopes) && payload.scopes.length > 0) {
    token.scopes = payload.scopes;
  }

  if (payload.expiresAt !== undefined) {
    token.expiresAt = payload.expiresAt ? new Date(payload.expiresAt) : null;
  }

  await token.save();

  return token.toJSON();
};

export const revokeAPIToken = async ({ id, ownerId }) => {
  const token = await APIToken.findOne({
    _id: id,
    owner: ownerId,
  });

  if (!token) {
    throw new Error('E3002'); // Token not found
  }

  if (token.revokedAt) {
    throw new Error('E3003'); // Token already revoked
  }

  await token.revoke();

  return {
    id: token._id,
    message: 'Token revocado correctamente.',
    revokedAt: token.revokedAt,
  };
};

export const deleteAPIToken = async ({ id, ownerId }) => {
  const token = await APIToken.findOneAndDelete({
    _id: id,
    owner: ownerId,
  });

  if (!token) {
    throw new Error('E3002'); // Token not found
  }

  return {
    id: token._id,
    message: 'Token eliminado correctamente.',
  };
};

// Verificar token de API (usado por middleware)
export const verifyAPIToken = async (token) => {
  if (!token || !token.startsWith('api_sk_')) {
    return null;
  }

  const token_hash = crypto.createHash('sha256').update(token).digest('hex');

  const apiToken = await APIToken.findOne({
    token_hash,
    revokedAt: null,
  }).populate('owner');

  if (!apiToken) {
    return null;
  }

  // Verificar expiración
  if (apiToken.expiresAt && apiToken.expiresAt < new Date()) {
    apiToken.status = 'expired';
    await apiToken.save();
    return null;
  }

  return apiToken;
};

// Registrar uso del token (auditoría)
export const recordTokenAccess = async (apiToken, ipAddress = null) => {
  await apiToken.recordAccess(ipAddress);
};
