import Account from '../models/docugen-web/Account.js';

// LOOKUPS
export const adminAccountsLookup = async () => {
  const adminAccounts = await Account.getAdminAccountsInfo();
  return { adminAccounts };
};
