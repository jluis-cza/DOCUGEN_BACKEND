import { MESSAGES } from '../constants/messages.js';
import * as lookupServices from '../services/lookupServices.js';

const successMessage = Object.fromEntries(MESSAGES.success.map((s) => [s.code, s]));

/// ************* Accounts Information Getter *************
export const adminAccountsLookup = async (req, res, next) => {
  try {
    const response = await lookupServices.adminAccountsLookup();
    const code = 'S0107';
    const status = successMessage[code]?.status || 200;
    const message = successMessage[code]?.message || 'OK';
    return res.status(status).json({
      success: true,
      code: code,
      message: message,
      data: {
        adminAccounts: response.adminAccounts,
      },
    });
  } catch (error) {
    next(error);
  }
};
