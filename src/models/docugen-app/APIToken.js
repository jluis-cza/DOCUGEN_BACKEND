// API TOKEN MODEL
// Tokens independientes para acceso programático a la API
// Separados de los tokens de sesión web

import mongoose from 'mongoose';
import crypto from 'crypto';

const APITokenSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      example: 'Facturación App',
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: '',
    },
    // Token almacenado como hash SHA256 (nunca se guarda en texto plano)
    token_hash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    // Solo los últimos 8 caracteres visibles (para UI)
    token_preview: {
      type: String,
      required: true,
      example: 'api_sk_...xyz',
    },
    // Permisos/Scopes que puede hacer este token
    scopes: {
      type: [String],
      default: ['documents:generate'],
      enum: [
        'documents:generate',
        'documents:read',
        'templates:read',
        'templates:write',
        'api:full',
      ],
    },
    // Configuración de expiración
    expiresAt: {
      type: Date,
      default: null, // null = nunca expira
    },
    // Revocación (marca como revocado sin borrar)
    revokedAt: {
      type: Date,
      default: null,
    },
    // Auditoría - Última vez que se usó
    lastUsedAt: {
      type: Date,
      default: null,
    },
    lastUsedIp: {
      type: String,
      default: null,
    },
    // Restricciones de IP (opcional)
    ipRestrictions: {
      type: [String],
      default: [],
    },
    // Contador de accesos
    accessCount: {
      type: Number,
      default: 0,
    },
    // Status del token
    status: {
      type: String,
      enum: ['active', 'revoked', 'expired'],
      default: 'active',
    },
  },
  { timestamps: true }
);

// Índices para búsquedas frecuentes
APITokenSchema.index({ owner: 1, revokedAt: 1 });
APITokenSchema.index({ owner: 1, createdAt: -1 });

// Método para generar un nuevo token (solo se llama una vez)
APITokenSchema.statics.generateToken = function () {
  // Generar token random de 32 bytes (256 bits)
  const randomBytes = crypto.randomBytes(32);
  const token = `api_sk_${randomBytes.toString('hex')}`;

  // Guardar solo el hash
  const token_hash = crypto.createHash('sha256').update(token).digest('hex');

  // Preview: últimos 8 caracteres
  const token_preview = `api_sk_...${token.slice(-8)}`;

  return { token, token_hash, token_preview };
};

// Método para verificar un token
APITokenSchema.statics.verifyToken = async function (token, ownerId) {
  const token_hash = crypto.createHash('sha256').update(token).digest('hex');

  const apiToken = await this.findOne({
    token_hash,
    owner: ownerId,
    revokedAt: null,
  });

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

// Método para obtener tokens activos del usuario
APITokenSchema.statics.getActiveTokens = async function (ownerId) {
  return this.find({
    owner: ownerId,
    revokedAt: null,
    status: { $ne: 'expired' },
  }).sort({ createdAt: -1 });
};

// Método para registrar acceso (auditoría)
APITokenSchema.methods.recordAccess = async function (ipAddress = null) {
  this.lastUsedAt = new Date();
  if (ipAddress) {
    this.lastUsedIp = ipAddress;
  }
  this.accessCount = (this.accessCount || 0) + 1;
  await this.save();
};

// Método para revocar token
APITokenSchema.methods.revoke = async function () {
  this.revokedAt = new Date();
  this.status = 'revoked';
  await this.save();
};

// No retornar información sensible en JSON
APITokenSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.token_hash;
  return obj;
};

const APIToken = mongoose.model('APIToken', APITokenSchema);

export default APIToken;
