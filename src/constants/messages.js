// COMMON MESSAGES FROM CONTROLLERS TO THE USER
// The messages are generic and not especific for secutity reasons.
// Includes HTTP response message dictionary

export const MESSAGES = {
  success: [
    {
      code: 'S0101',
      status: 201,
      message:
        'La cuenta fue creada exitosamente, por favor ingrese al enlace enviado a su correo para completar el registro.',
    },
    {
      code: 'S0102',
      status: 200,
      message: 'No se encontraron cuentas.',
    },
    {
      code: 'S0103',
      status: 200,
      message: 'La consulta se realizó exitosamente , se encontraron cuentas.',
    },
    {
      code: 'S0104',
      status: 200,
      message: 'La configuración de la cuenta se realizó exitosamente.',
    },
    { code: 'S0201', status: 200, message: ' Welcome. Session started.' },
    { code: 'S0202', status: 200, message: ' The session was succesfully closed.' },
    {
      code: 'S0401',
      status: 200,
      message: ' Welcome again. The access token was successfully renewed.',
    },
    {
      code: 'S0501',
      status: 200,
      message: ' No se encontraron resultados para los parámetros de búsqueda.',
    },
    {
      code: 'S0502',
      status: 200,
      message:
        ' La consulta fue exitosa. Se encontraron resultados para los parámetros de búsqueda.',
    },
    {
      code: 'S0503',
      status: 200,
      message: ' La configuración del parámetro del sistema se realizó exitosamente.',
    },
    {
      code: 'S0601',
      status: 200,
      message:
        'La dirección de correo electrónico asociada a la cuenta registrada fue verificada exitosamente. La cuenta ha sido habilitada.',
    },
    {
      code: 'S0701',
      status: 200,
      message: ' La información de servicios fue recuperada exitosamente.',
    },
    {
      code: 'S0702',
      status: 200,
      message: ' La configuración del servicio se realizó exitosamente.',
    },
  ],
  error: [
    {
      code: 'E0101',
      status: 500,
      message:
        'Al least one of the parameters (username, email, id or temporary token) needs to be provided.',
    },
    { code: 'E0102', status: 400, message: 'The account was not found.' },
    { code: 'E0103', status: 409, message: 'The username or email already exists.' },
    { code: 'E0104', status: 500, message: 'The account was not saved.' },
    { code: 'E0105', status: 500, message: 'Wrong parameters entry.' },
    { code: 'E0106', status: 500, message: "Error in setting the user's role." },
    { code: 'E0107', status: 500, message: 'Wrong parameters entry.' },
    { code: 'E0108', status: 500, message: 'Failed to set account status.' },
    { code: 'E0109', status: 500, message: 'Wrong parameters entry.' },
    { code: 'E0110', status: 500, message: 'An error has happened setting the services.' },
    { code: 'E0111', status: 500, message: 'Wrong parameters entry.' },
    { code: 'E0112', status: 500, message: 'The request body for Account Register was not found.' },
    {
      code: 'E0113',
      status: 500,
      message: 'Falta el argumento "id" en la función setAccountToken.',
    },
    {
      code: 'E0114',
      status: 500,
      message: 'Error en la actualización del token de verificación de la cuenta.',
    },
    {
      code: 'E0115',
      status: 500,
      message: 'Sucedió un error encontrando las cuentas inactivas.',
    },
    {
      code: 'E0116',
      status: 500,
      message: 'No se encontró ninguna cuenta inactiva.',
    },
    {
      code: 'E0117',
      status: 500,
      message: 'Sucedió un error eliminando las cuentas inactivas.',
    },
    {
      code: 'E0118',
      status: 500,
      message:
        'Usted no cuenta con el rol de administrador para ejecutar esta operación. Error en la consulta de cuentas.',
    },
    {
      code: 'E0119',
      status: 500,
      message:
        'Usted no cuenta con el rol de administrador para ejecutar esta operación. Error en la configuración de cuenta.',
    },
    {
      code: 'E0120',
      status: 500,
      message:
        'No se proporcionó el argumento "config" para la configuración de la cuenta. Error en la configuración de cuenta.',
    },
    // {
    //   code: 'E0121',
    //   status: 500,
    //   message: 'La propiedad especificada  para la configuración de la cuenta no existe.',
    // },
    { code: 'E0201', status: 400, message: 'Incorrect password.' },
    { code: 'E0202', status: 400, message: 'The account id was not found.' },
    { code: 'E0203', status: 500, message: 'No current session was foound.' },
    { code: 'E0204', status: 500, message: 'Missing closure status entry.' },
    { code: 'E0205', status: 500, message: 'The closure status must be "expired" or "inactive".' },
    { code: 'E0206', status: 500, message: 'Error in updating the end session data.' },
    { code: 'E0207', status: 500, message: 'Wrong parameters entry.' },
    { code: 'E0208', status: 500, message: 'Error in creating new session' },
    { code: 'E0209', status: 500, message: 'Request body for Session Starter was not found.' },
    { code: 'E0210', status: 500, message: 'Request body for Session Closer was not found.' },
    { code: 'E0211', status: 500, message: 'An error has ocurred finding active sessions.' },
    { code: 'E0212', status: 500, message: 'No active sessions were found.' },
    {
      code: 'E0213',
      status: 500,
      message: 'Un error sucedió al recabar las sesiones de la base de datos.',
    },
    { code: 'E0214', status: 500, message: 'No se encontraron sesiones.' }, //falso positivo
    { code: 'E0301', status: 500, message: 'No payload or type of token provided.' },
    {
      code: 'E0302',
      status: 500,
      message: 'Type of token not supported. The type of token must be: "access" or "refresh"',
    },
    {
      code: 'E0303',
      status: 500,
      message: 'The token was not generated because of a signing error.',
    },
    { code: 'E0304', status: 500, message: 'The token or type of token is not specified.' },
    { code: 'E0305', status: 500, message: 'The type of token must be "access" or "refresh".' },
    { code: 'E0306', status: 500, message: 'The process of token verification has failed.' },
    { code: 'E0401', status: 403, message: "The refresh token hasn't been found" },
    {
      code: 'E0501',
      status: 403,
      message:
        'No tiene los permisos necesarios para completar esta acción. No se encontró el rol de adminnistrador. Error en la operación de consulta.',
    },
    {
      code: 'E0502',
      status: 403,
      message:
        'No tiene los permisos necesarios para completar esta acción. No se encontró el rol de adminnistrador. Error en la operación de configuración.',
    },
    {
      code: 'E0503',
      status: 500,
      message: "Error en el paso del argumento 'config' al servicio 'systemParameterSetter'.",
    },
    // { code: 'E0504', status: 400, message: 'La propiedad especificada no existe.' },
    {
      code: 'E0505',
      status: 400,
      message:
        "El valor para la propiedad 'status' del parámetro de sistema especificado no existe.",
    },
    {
      code: 'E0506',
      status: 400,
      message: "El valor de 'status' debe ser: 'followed' o 'unfollowed'",
    },
    {
      code: 'E0507',
      status: 400,
      message: 'La lista de parámetros del sistema no se pudo recuperar.',
    },
    {
      code: 'E0508',
      status: 400,
      message: 'No se encontró ningún parámetro del sistema para ser mostrado.',
    },
    {
      code: 'E0601',
      status: 500,
      message:
        "El argumento 'to' o el argumento 'type' o el argumento 'data' están ausentes en la llamada a la función 'sendEmail'.",
    },
    {
      code: 'E0602',
      status: 500,
      message: "El 'type' ingresado no coincide con ningun tipo de email.",
    },
    {
      code: 'E0603',
      status: 500,
      message: "El argumento 'token' para el servicio 'emailValidator' no fue proporcionado.",
    },
    {
      code: 'E0701',
      status: 500,
      message:
        'La verificación del tipo de rol falló. No se puede ejecutar la obtención de servicios.',
    },
    {
      code: 'E0702',
      status: 500,
      message: 'Error al obtener la lista de servicios.',
    },
    {
      code: 'E0703',
      status: 500,
      message: 'No se encontró ningún servicio para ser mostrado.',
    },
    {
      code: 'E0704',
      status: 500,
      message: 'No se proporciono el status para el servicio.',
    },
    {
      code: 'E0705',
      status: 500,
      message: 'Estado no válido, los estados permitidos son: "running" y "stopped".',
    },
    {
      code: 'E0706',
      status: 500,
      message:
        'Se requiere el rol de administrador para configurar un servicio. Error en la configuración del servicio.',
    },
    {
      code: 'E0707',
      status: 500,
      message: 'Ocurrió un error encontrando el servicio.',
    },
    {
      code: 'E0708',
      status: 500,
      message: 'No se proporciono el parametro de configuración para el servicio',
    },
    // {
    //   code: 'E0709',
    //   status: 500,
    //   message: 'La propiedad especificada para la configuración del servicio no es válida.',
    // },
  ],
  warning: [],
  info: [{ code: 'I0101', status: 400, message: 'Account creation was unsuccessful.' }],
};

// code format: ABCDE
// A: Success or Error
// BC: Entity:
//    01:Account
//    02:Session
//    03:Token(no model entity)
//    04:Access(no model entity)
//    05:SystemParameters
//    06:Email(no model entity)
//    07:Services(pseudo-lookup entity)
// DE: Number of error or success
