import { registerProcess } from '../services/utils.js';

export const registerProcessSignature = async (code, sessionId, accountId) => {
  if (!code || !sessionId || !accountId) throw new Error('E1110');
  const processId = await registerProcess(code);
  const idSet = {
    associated_session: sessionId,
    associated_account: accountId,
    associated_process: processId,
  };
  return idSet;
};
