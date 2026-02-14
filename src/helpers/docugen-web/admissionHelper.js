// ADMISSION MODEL HELPERS
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { KEYS } from '../../constants/keys.js';

// Time parser
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

// Token generator
// "type" parameter must be: "access" or "refresh"
export const generateToken = (payload, type) => {
  if (!payload || !type) throw new Error('E0301');
  if (type == 'access' || type == 'refresh') {
    const KEY_JWT = KEYS[type].jwt;
    const enhacendPayload = {
      payload: payload,
      jti: crypto.randomUUID(), // ID
      iat: Math.floor(Date.now() / 1000), // Issued At
    };
    const tokenTimeout = KEYS[type].session_timeout[payload.role];
    const token = jwt.sign(enhacendPayload, KEY_JWT, { expiresIn: tokenTimeout });
    if (!token) throw new Error('E0303');
    console.log(`${type.toUpperCase()} token successfully generated.`);
    return token;
  } else {
    throw new Error('E0302');
  }
};

// Token checker
// "type" parameter must be: "access" or "refresh"
export const verifyToken = async (token, type) => {
  // Validation
  if (!token || !type) throw new Error('E0304');
  if (type == 'access' || type == 'refresh') {
    // token verify process
    const KEY_JWT = KEYS[type].jwt;
    const decodedToken = jwt.verify(token, KEY_JWT);
    if (!decodedToken) throw new Error('E0306');
    return decodedToken; // {payload, jti, iat}
  } else {
    throw new Error('E0305');
  }
};
