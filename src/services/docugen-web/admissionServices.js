import Session from '../../models/docugen-web/Session.js';
import { KEYS } from '../../constants/keys.js';
import { USERS } from '../../constants/users.js';
import { jwtTimeoutToMinutesParser } from '../../helpers/models.js';

// ******************************************************************************
// SESSIONS
// ******************************************************************************

// ACTIVE SESSION CLOSER
export const checkActiveSessionDuration = async () => {
  try {
    let sessionTimeoutString = null;
    let sessionTimeoutNumber = null;
    let userRole = null;
    let loginTime = null;
    let currentDuration = null;

    const adminRole = USERS.type.server.role.administrator;
    const devRole = USERS.type.client.role.developer;
    const adminSessionTimeout = KEYS.refresh.session_timeout.server;
    const devSessionTimeout = KEYS.refresh.session_timeout.client;

    // Getting the active sessions
    console.log('Starting checking active session duration...');
    const activeSessions =
      (await Session.find({ status: 'active' }).populate('associated_account')) || [];
    console.log({ activeSessions: activeSessions });

    // Checking session duration
    for (const activeSession of activeSessions) {
      // Checking user's role and assigned timeouts
      userRole = activeSession.associated_account.role;
      sessionTimeoutString =
        userRole === adminRole
          ? adminSessionTimeout
          : userRole === devRole
            ? devSessionTimeout
            : '0';

      sessionTimeoutNumber = jwtTimeoutToMinutesParser(sessionTimeoutString); // Parsing

      //  Calculating current session duration
      loginTime = activeSession.loginTime.getTime();
      const currentTime = new Date();
      currentDuration = Math.round((currentTime.getTime() - loginTime) / (1000 * 60)); //minutes

      // Executing closure of session if conditions are met
      if (currentDuration >= sessionTimeoutNumber) {
        await activeSession.endSession('expired'); // assigns the "expired" status
      } 
    }
  } catch (error) {
    console.log('An error has arised checking active sessions durations.');
    throw error;
  }
};
// ******************************************************************************
