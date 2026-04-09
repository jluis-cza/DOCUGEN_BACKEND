// ADMISSION MODEL HELPERS
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { KEYS } from '../../constants/keys.js';
import nodemailer from 'nodemailer';
import { SERVICES } from '../../constants/services.js';

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
  } else if (type == 'verification') {
    const { bytes } = payload;
    return crypto.randomBytes(bytes).toString('hex');
  } else {
    throw new Error('E0302');
  }
};

// Token checker
// "type" parameter must be: "access" or "refresh"
// The "verification" type is used for email verification tokens.
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

// *************************************************************************************************
// Email sender
// *************************************************************************************************
// Used in email verification (registry process)
export const sendEmail = async (to, type, config) => {
  if (!to || !type || !config) throw new Error('E0601');

  const name = 'Jorge Callisaya';
  const service = 'gmail';
  const auth = { user: SERVICES.smtp.email, pass: SERVICES.smtp.pass };
  // const host = 'smtp.ethereal.email';
  // const port = 587;

  const transporter = nodemailer.createTransport({
    service,
    auth,
    // host,
    // port,
  });

  let info = {};

  if (type === 1) {
    //  1: email verification - registration process
    const { url } = config;
    const generateHtmlEmail = (url) => {
      return `
<div><h1>Bienvenido a DOCUGEN</h1></div>
<div><p>Para completar su registro, por favor haga click en el siguiente enlace:</p> <a href="${url}" >Verificar</a></div>
<br>
<div><p>Atentamente DOCUGEN</p><p>2026</p></div>
  `;
    };

    const options = {
      from: `"${name}" <${auth.user}>`,
      to: `${to}`,
      subject: 'Verificación de Email para DOCUGEN',
      text: `Por favor haga click en el siguiente enlace para la verificación de su cuenta: ${url}`,
      html: generateHtmlEmail(url),
    };

    info = await transporter.sendMail(options);
  } else {
    throw new Error('E0602');
  }

  return info;
};
// *************************************************************************************************
