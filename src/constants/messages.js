// COMMON MESSAGES FROM CONTROLLERS TO THE USER
// The messages are generic and not especific for secutity reasons.
// Includes HTTP response message dictionary

export const MESSAGES = {
  success:[
        { code: "S0101", status: 201, message: 'The account was successfully created' },
        { code: "S0201", status: 200, message: ' Welcome. Session started.' },
        { code: "S0202", status: 200, message: ' The session was succesfully closed.' },
        { code: "S0401", status: 200, message: ' Welcome again. The access token was successfully renewed.' },
  ],
  error:[
        { code: "E0101", status: 500, message: 'Al least one of the parameters (username, email or id) needs to be provided.' },
        { code: "E0102", status: 400, message: 'The account was not found.' },
        { code: "E0103", status: 400, message: 'The username or email already exists.' },
        { code: "E0104", status: 500, message: 'The account was not saved.' },
        { code: "E0105", status: 500, message: 'Wrong parameters entry.' },
        { code: "E0106", status: 500, message: "Error in setting the user's role." },
        { code: "E0107", status: 500, message: 'Wrong parameters entry.' },
        { code: "E0108", status: 500, message: 'Failed to set account status.' },
        { code: "E0109", status: 500, message: 'Wrong parameters entry.' },
        { code: "E0110", status: 500, message: 'An error has happened setting the services.'},
        { code: "E0111", status: 500, message: 'Wrong parameters entry.' },
        { code: "E0112", status: 500, message: 'The request body for Account Register was not found.' },
        { code: "E0201", status: 400, message: 'Incorrect password.' },
        { code: "E0202", status: 400, message: 'The account id was not found.' },
        { code: "E0203", status: 500, message: 'No current session was foound.' },
        { code: "E0204", status: 500, message: 'Missing closure status entry.' },
        { code: "E0205", status: 500, message: 'The closure status must be "expired" or "inactive".' },
        { code: "E0206", status: 500, message: 'Error in updating the end session data.' },
        { code: "E0207", status: 500, message: 'Wrong parameters entry.' },
        { code: "E0208", status: 500, message: 'Error in creating new session' },
        { code: "E0209", status: 500, message: 'Request body for Session Starter was not found.' },
        { code: "E0210", status: 500, message: 'Request body for Session Closer was not found.' },
        { code: "E0211", status: 500, message: 'An error has ocurred finding active sessions.' },
        { code: "E0212", status: 500, message: 'No active sessions were found.' },
        { code: "E0301", status: 500, message: 'No payload or type of token provided.' },
        { code: "E0302", status: 500, message: 'Type of token not supported. The type of token must be: "access" or "refresh"' },
        { code: "E0303", status: 500, message: 'The token was not generated because of a signing error.'},
        { code: "E0304", status: 500, message: 'The token or type of token is not specified.'},
        { code: "E0305", status: 500, message: 'The type of token must be "access" or "refresh".'},
        { code: "E0306", status: 500, message: 'The process of token verification has failed.'},
        { code: "E0401", status: 403, message: "The refresh token hasn't been found"},
  ],
  warning:[],
  info:[
        { code: "I0101", status: 400, message: 'Account creation was unsuccessful.' },
  ]
};

// ABCD
// A: Success or Error
// B: Entity: 
//    01:Account
//    02:Session
//    03:Token(no model entity)
//    04:Access(no model entity)
// CD: Number of error or success