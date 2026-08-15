// API TOKEN CONTROLLER
// HTTP orchestration para gestión de tokens de API

import * as apiTokenService from '../../services/docugen-app/apiTokenService.js';
import {
  registerProcess,
  registerActivity,
  setActivitySuccess,
  terminateProcess,
} from '../../services/docugen-web/managementServices.js';

export const createAPIToken = async (req, res, next) => {
  const sessionId = req.sess?.id ?? `api-token-${req.user?.id ?? 'unknown'}`;
  const processId = await registerProcess('P0801', sessionId, req.user.id);
  let activity = {};
  try {
    activity = await registerActivity(1, processId);

    const response = await apiTokenService.createAPIToken({
      ownerId: req.user.id,
      name: req.body.name,
      description: req.body.description,
      scopes: req.body.scopes,
      expiresAt: req.body.expiresAt,
    });

    await setActivitySuccess(activity._id, true);

    return res.status(201).json({
      success: true,
      code: 'S3001',
      message: 'Token de API creado correctamente.',
      data: response,
    });
  } catch (error) {
    if (activity?._id) await setActivitySuccess(activity._id, false);
    next(error);
  } finally {
    await terminateProcess(processId);
  }
};

export const getAPITokens = async (req, res, next) => {
  try {
    const response = await apiTokenService.getAPITokens({
      ownerId: req.user.id,
    });

    return res.status(200).json({
      success: true,
      code: 'S3002',
      message: 'Tokens de API listados correctamente.',
      data: {
        tokens: response,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAPIToken = async (req, res, next) => {
  try {
    const { token_id } = req.params;

    const response = await apiTokenService.getAPIToken({
      id: token_id,
      ownerId: req.user.id,
    });

    return res.status(200).json({
      success: true,
      code: 'S3003',
      message: 'Token de API obtenido correctamente.',
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAPIToken = async (req, res, next) => {
  const sessionId = req.sess?.id ?? `api-token-${req.user?.id ?? 'unknown'}`;
  const processId = await registerProcess('P0802', sessionId, req.user.id);
  let activity = {};
  try {
    const { token_id } = req.params;
    activity = await registerActivity(1, processId);

    const response = await apiTokenService.updateAPIToken({
      id: token_id,
      ownerId: req.user.id,
      payload: req.body,
    });

    await setActivitySuccess(activity._id, true);

    return res.status(200).json({
      success: true,
      code: 'S3004',
      message: 'Token de API actualizado correctamente.',
      data: response,
    });
  } catch (error) {
    if (activity?._id) await setActivitySuccess(activity._id, false);
    next(error);
  } finally {
    await terminateProcess(processId);
  }
};

export const revokeAPIToken = async (req, res, next) => {
  const sessionId = req.sess?.id ?? `api-token-${req.user?.id ?? 'unknown'}`;
  const processId = await registerProcess('P0803', sessionId, req.user.id);
  let activity = {};
  try {
    const { token_id } = req.params;
    activity = await registerActivity(1, processId);

    const response = await apiTokenService.revokeAPIToken({
      id: token_id,
      ownerId: req.user.id,
    });

    await setActivitySuccess(activity._id, true);

    return res.status(200).json({
      success: true,
      code: 'S3005',
      message: 'Token de API revocado correctamente.',
      data: response,
    });
  } catch (error) {
    if (activity?._id) await setActivitySuccess(activity._id, false);
    next(error);
  } finally {
    await terminateProcess(processId);
  }
};

export const deleteAPIToken = async (req, res, next) => {
  const sessionId = req.sess?.id ?? `api-token-${req.user?.id ?? 'unknown'}`;
  const processId = await registerProcess('P0804', sessionId, req.user.id);
  let activity = {};
  try {
    const { token_id } = req.params;
    activity = await registerActivity(1, processId);

    const response = await apiTokenService.deleteAPIToken({
      id: token_id,
      ownerId: req.user.id,
    });

    await setActivitySuccess(activity._id, true);

    return res.status(200).json({
      success: true,
      code: 'S3006',
      message: 'Token de API eliminado correctamente.',
      data: response,
    });
  } catch (error) {
    if (activity?._id) await setActivitySuccess(activity._id, false);
    next(error);
  } finally {
    await terminateProcess(processId);
  }
};

export const getTokenUsage = async (req, res, next) => {
  try {
    const { token_id } = req.params;

    const response = await apiTokenService.getAPIToken({
      id: token_id,
      ownerId: req.user.id,
    });

    return res.status(200).json({
      success: true,
      code: 'S3007',
      message: 'Estadísticas de uso del token obtenidas.',
      data: {
        id: response.id,
        name: response.name,
        accessCount: response.accessCount,
        lastUsedAt: response.lastUsedAt,
        lastUsedIp: response.lastUsedIp,
        createdAt: response.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
