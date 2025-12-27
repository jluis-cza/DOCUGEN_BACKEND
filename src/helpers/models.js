import mongoose from 'mongoose';
import os from 'os';
import jwt from 'jsonwebtoken';
import { KEYS } from '../constants/keys.js';

// ******************************************************************************
// ADMISSION MODEL HELPERS
// ******************************************************************************
// ***TIME EXPRESSION PARSER***
// Strings like '1s', '2m', '5h' to their equivalent in minutes
export const jwtTimeoutToMinutesParser = (timeoutString) => {
  let timeoutNumber = null; // in minutes

  //  Validation
  if (!timeoutString) {
    throw new Error('Time string cannot be empty.');
  }

  // Regex settings
  const regex = /(\d+)([a-z])/i;
  const match = timeoutString.match(regex);

  // Capturing matches
  if (!match || match.length !== 3) {
    throw new Error(
      `Invalid time string format: ${timeoutString}. Expected format like "5m" or "2h".`
    );
  }

  //  Extracting values
  const value = parseInt(match[1]); // The number part (e.g., 5, 2, 1)
  const unit = match[2].toLowerCase(); // The unit part (e.g., 'm', 'h', 'd')
  // Setting the conversion factors to MINUTES
  const factors = {
    s: 1 / 60, // Seconds to minutes
    m: 1, // Minutes to minutes
    h: 60, // Hours to minutes
    d: 24 * 60, // Days to minutes
  };

  //  Checking units
  if (!factors[unit]) {
    throw new Error(`Unsupported time unit: ${unit}. Supported units: s, m, h, d.`);
  }

  timeoutNumber = value * factors[unit];
  return timeoutNumber;
};

// ***TOKEN GENERATOR***
// "type" parameter must be: "access" or "refresh"
export const generateToken = (payload, type) => {
  // Entry validation
  if (!payload) {
    return { success: false, message: 'No payload provided.' };
  }
  if (!type) {
    return { success: false, message: 'No type of token provided.' };
  }
  if (type !== 'access' && type !== 'refresh') {
    return { success: false, message: 'Type of token not supported.' };
  }

  // Generating new access token
  // It is assumed that the timeout value is inside the payload
  const KEY_JWT = KEYS[type].jwt;
  const token = jwt.sign(payload, KEY_JWT);

  return {
    success: true,
    message: 'Access token successfully generated.',
    payload: { token: token },
  };
};

// ***TOKEN VERIFY FUNCTION***
// "type" parameter must be: "access" or "refresh"
export const verifyToken = async (token, type) => {
  // Validation
  if (!token) {
    return { success: false, message: 'No token provided.' };
  }
  if (!type) {
    return { success: false, message: 'No type of token provided.' };
  }
  if (type !== 'access' && type !== 'refresh') {
    return { success: false, message: 'Type of token not supported.' };
  }

  // token verify process
  const KEY_JWT = KEYS[type].jwt;
  const payload = jwt.verify(token, KEY_JWT);
  if (!payload) return { success: false, message: 'Failed to validate token.' };

  return { success: true, message: 'Token successfully decoded.', payload: payload };
};
// ******************************************************************************

// ******************************************************************************
// ADMINISTRATION MODEL HELPERS
// ******************************************************************************
export const systemParameterValuesCollector = {
  getDataBaseSize: async () => {
    try {
      const db = mongoose.connection.db;
      const stats = await db.stats();
      return {
        value: (stats.dataSize / (1024 * 1024)).toFixed(2), // MB
        unit: 'MB',
      };
    } catch (error) {
      console.error('Error getting database size. ', error);
      return { value: null, unit: 'MB' };
    }
  },
  getSystemUptime: async () => {
    try {
      const uptime = os.uptime(); // en segundos
      const hours = Math.floor(uptime / 3600);
      return {
        value: hours,
        unit: 'hours',
      };
    } catch (error) {
      console.error('Error collecting system uptime. ', error);
      return { value: null, unit: 'hours' };
    }
  },
};
// ******************************************************************************