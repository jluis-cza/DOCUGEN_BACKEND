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
    {
      code: 'S0105',
      status: 200,
      message: 'La información de la cuenta se recuperó exitosamente.',
    },
    {
      code: 'S0106',
      status: 200,
      message: 'La información resumida de las cuentas se recuperó exitosamente.',
    },
    {
      code: 'S0107',
      status: 200,
      message:
        'La consulta de información acerca de los usuarios administradores se realizó correctamente.',
    },
    { code: 'S0201', status: 200, message: ' Welcome. Session started.' },
    { code: 'S0202', status: 200, message: ' The session was succesfully closed.' },
    {
      code: 'S0203',
      status: 200,
      message:
        ' Se realizó la consulta de sesiones para la cuenta dada y no se halló ninguna sesión.',
    },
    {
      code: 'S0204',
      status: 200,
      message: ' La consulta fue exitosa y se hallaron sesiones para la cuenta dada.',
    },
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
      code: 'S0504',
      status: 200,
      message: 'El parámetro de sistema fue recuperado exitósamente.',
    },
    {
      code: 'S0505',
      status: 200,
      message: 'La sistesis de los parámetros del sistema fue recuperada exitosamente.',
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
      message: ' La información de servicio lookups fue recuperada exitosamente.',
    },
    {
      code: 'S0702',
      status: 200,
      message: ' La configuración del servicio lookup se realizó exitosamente.',
    },
    {
      code: 'S0703',
      status: 200,
      message: ' La recuperación del servicio lookup se realizó exitosamente.',
    },
    {
      code: 'S0704',
      status: 200,
      message: 'La información resumida de Service Lookups fue recuperada exitosamente.',
    },
    {
      code: 'S0801',
      status: 200,
      message:
        ' La consulta de servicios fue exitosa. No se encontraron resultados asociados a la búsqueda.',
    },
    {
      code: 'S0802',
      status: 200,
      message: ' La consulta fue exitosa y se encontraron servicios asociados a la búsqueda.',
    },
    {
      code: 'S0803',
      status: 200,
      message: ' La operación fue exitosa y se configuró el servicio.',
    },
    {
      code: 'S0901',
      status: 200,
      message: 'El tiempo del servidor se recuperó exitosamente.',
    },
    {
      code: 'S1001',
      status: 200,
      message: 'La consulta fue exitosa y no se recuperaron actividades asociadas a la consulta.',
    },
    {
      code: 'S1002',
      status: 200,
      message: 'La consulta fue exitosa y se recuperaron actividades asociadas a la consulta.',
    },
    {
      code: 'S1003',
      status: 200,
      message: 'La consulta fue exitosa y se recuperó la actividad.',
    },
    {
      code: 'S1101',
      status: 200,
      message: 'La consulta fue exitosa y no se recuperaron procesos asociados a la consulta.',
    },
    {
      code: 'S1102',
      status: 200,
      message: 'La consulta fue exitosa y se recuperaron procesos asociados a la consulta.',
    },
    {
      code: 'S1103',
      status: 200,
      message: 'La consulta fue exitosa se recuperó el proceso.',
    },
    {
      code: 'S1201',
      status: 200,
      message: 'La información de las rutas del la API se recueraron exitosamente.',
    },
    {
      code: 'S1301',
      status: 200,
      message: 'La notificación fue configurada exitosamente.',
    },
    {
      code: 'S1302',
      status: 200,
      message: 'La consulta fue exitosa pero no se encontraron notificaciones para la consulta.',
    },
    {
      code: 'S1303',
      status: 200,
      message: 'Consulta realizada exitosamente. Se recuperaron notificaciones.',
    },
    {
      code: 'S1304',
      status: 200,
      message: 'El acuse de recibo de notificación se configuró exitosamente.',
    },
    {
      code: 'S1305',
      status: 200,
      message:
        'Consulta realizada exitosamente. El número de notificaciones que coinciden con la consulta es cero.',
    },
    {
      code: 'S1306',
      status: 200,
      message:
        'Consulta realizada exitosamente. Se obtuvo la cuenta del número de notificaciones para la consulta.',
    },
    {
      code: 'S1401',
      status: 200,
      message: 'Consulta realizada exitosamente. Se recuperó la información del perfil.',
    },
    {
      code: 'S1402',
      status: 200,
      message: 'La configuración del perfil se realizó exitosamente.',
    },
    {
      code: 'S1501',
      status: 200,
      message: 'El proceso de verificación contraseña se ejecutó exitosamente.',
    },
    {
      code: 'S1601',
      status: 200,
      message: 'Consulta de disponibilidad de nombre de usuario realizada correctamente.',
    },
    {
      code: 'S1602',
      status: 200,
      message: 'La consulta de nombre de usuario se realizó con éxito.',
    },
  ],
  error: [
    {
      code: 'E0101',
      status: 500,
      message:
        'Al least one of the parameters (username, email, id or temporary token) needs to be provided.',
    },
    { code: 'E0102', status: 400, message: 'La cuenta no fue encontrada.' },
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
    {
      code: 'E0121',
      status: 500,
      message:
        'No se cuenta con el rol necesario (administrador) para usar la función accountGetter.',
    },
    {
      code: 'E0122',
      status: 500,
      message: 'No se tiene el parámetro id en el servicio de accountGetter.',
    },
    {
      code: 'E0123',
      status: 500,
      message: 'No se tiene el rol necesario para usar el controlador "accountsOverviewer".',
    },
    {
      code: 'E0124',
      status: 500,
      message: 'Error en el argumento "filter" del método "getAccountsCount".',
    },
    {
      code: 'E0125',
      status: 500,
      message: 'Error en el argumentos del método "setAccountPassword".',
    },
    {
      code: 'E0126',
      status: 500,
      message: 'Error configurando la contraseña. Error en el método "setAccountPassword".',
    },
    {
      code: 'E0127',
      status: 500,
      message: 'Error en el argumentos del método "setAccountUsername".',
    },
    {
      code: 'E0128',
      status: 500,
      message: 'Error guardando el nombre de usuario.',
    },

    {
      code: 'E0129',
      status: 500,
      message: 'Error encontrando información de cuentas de administradores.',
    },
    { code: 'E0201', status: 400, message: 'Incorrect password.' },
    { code: 'E0202', status: 400, message: 'The account id was not found.' },
    { code: 'E0203', status: 500, message: 'No se encontró una sesión en curso.' },
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
    {
      code: 'E0215',
      status: 500,
      message: 'No se puede usar el controlador sessionGetter con su rol actual.',
    },
    { code: 'E0216', status: 500, message: 'El id de la cuenta no es valido.' },
    {
      code: 'E0217',
      status: 500,
      message: 'El token provisto para el método "addSessionToken" debe ser de tipo "string".',
    },
    { code: 'E0218', status: 500, message: 'Error en el guardado del refresh token a la sesión.' },
    {
      code: 'E0219',
      status: 500,
      message: 'Error en el parámetro de entrada del método "findHistoricalSessions"',
    },
    {
      code: 'E0220',
      status: 500,
      message: 'Error en la búsqueda de las sesiones históricas asociadas a la cuenta.',
    },
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
    { code: 'E0401', status: 403, message: 'El refresh token no fue encontrado.' },
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
      code: 'E0509',
      status: 400,
      message:
        'El controlador systemParameterGetter necesita de un rol de administrador para ser usado.',
    },
    {
      code: 'E0510',
      status: 400,
      message: 'El servicio systemParameterGetter necesita de un id como argumento.',
    },
    {
      code: 'E0511',
      status: 400,
      message: 'No se encontró ningun parámetro del sistema con el id especificado.',
    },
    {
      code: 'E0512',
      status: 500,
      message: 'El rol del usuario debe ser "administrador".',
    },
    // {
    //   code: 'E0513',
    //   status: 400,
    //   message: 'No se encontró ningun parámetro del sistema con el id especificado.',
    // },
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
        'La verificación del tipo de rol falló. No se puede ejecutar la obtención de servicio lookups.',
    },
    {
      code: 'E0702',
      status: 500,
      message: 'Error al obtener la lista de servicio lookups.',
    },
    {
      code: 'E0703',
      status: 500,
      message: 'No se encontró ningún servicio lookup para ser mostrado.',
    },
    {
      code: 'E0704',
      status: 500,
      message: 'No se proporciono el status para el servicio lookup.',
    },
    {
      code: 'E0705',
      status: 500,
      message:
        'Estado no válido, los estados permitidos para setServiceLookupStatus son: "running" y "stopped".',
    },
    {
      code: 'E0706',
      status: 500,
      message:
        'Se requiere el rol de administrador para configurar un servicio lookup. Error en la configuración del servicio lookup.',
    },
    {
      code: 'E0707',
      status: 500,
      message: 'Ocurrió un error encontrando el servicio lookup.',
    },
    {
      code: 'E0708',
      status: 500,
      message: 'No se proporciono el parametro de configuración para el servicio',
    },
    {
      code: 'E0709',
      status: 500,
      message:
        'Para ejecutar el controlador serviceLookupGetter se necesitan privilegios de administrador.',
    },
    {
      code: 'E0710',
      status: 500,
      message: 'No se especificó correctamente el id para el servicio serviceLookupGetter.',
    },
    {
      code: 'E0711',
      status: 500,
      message:
        'El método "findServiceLookup" requiere al menos un parámetro de entrada ya sea "id" del servicio lookup o el "name" de este.',
    },
    {
      code: 'E0712',
      status: 500,
      message:
        'Se requiere un rol de administrador para utilizar el controlador "serviceLookupsOverviewer".',
    },
    {
      code: 'E0801',
      status: 500,
      message: 'La consulta para recuperar todos los servicios falló.',
    },
    {
      code: 'E0802',
      status: 500,
      message: 'El parámetro pasado al método getAccountServices no corresponde a un id válido.',
    },
    {
      code: 'E0803',
      status: 500,
      message: 'El parámetro "id" pasado al método getServices no corresponde a un id válido.',
    },
    {
      code: 'E0804',
      status: 500,
      message: 'Error en el parámetro "status" del servicio setServiceStatus.',
    },
    {
      code: 'E0805',
      status: 500,
      message: 'Los posibles estados de "status" son "running" o "stopped',
    },
    {
      code: 'E0806',
      status: 500,
      message: 'Error buscando el servicio pedido.',
    },
    // {
    //   code: 'E0807',
    //   status: 500,
    //   message:
    //     'El parámetro "searchBy" del método "getServices" debe ser "account" o "service-lookup" ',
    // },
    {
      code: 'E0808',
      status: 500,
      message: 'Error del parámetro "id" en servicio "servicesGetter"',
    },
    {
      code: 'E0809',
      status: 500,
      message: 'Error en el parámetro "config" del método "serviceSetter"',
    },
    {
      code: 'E0810',
      status: 500,
      message:
        'El controlador "serviceGetter" necesita de un rol de administrador para poder ser ejecutado.',
    },
    {
      code: 'E0811',
      status: 500,
      message:
        'Se neecesita que se tenga rol de administrador para ejecutar el controlador "serviceSetter".',
    },
    {
      code: 'E0812',
      status: 500,
      message: 'El parámetro "associatedAccountId" es incorrecto.',
    },
    {
      code: 'E0813',
      status: 500,
      message: 'El parámetro "associatedServiceLookupId" es incorrecto.',
    },
    {
      code: 'E0814',
      status: 500,
      message: 'Error en la creación del servicio.',
    },
    {
      code: 'E0901',
      status: 500,
      message: 'Error En la consulta del tiempo del servidor.',
    },
    {
      code: 'E1001',
      status: 500,
      message: 'El método "createActivity" no posee argumentos de entrada válidos.',
    },
    {
      code: 'E1002',
      status: 500,
      message: 'Error en el guardado de la nueva actividad.',
    },
    {
      code: 'E1003',
      status: 500,
      message: 'Error al guardar el valor de la propiedad "success" de la actividad.',
    },
    {
      code: 'E1004',
      status: 500,
      message: 'El valor de "success" debe ser booleano.',
    },
    {
      code: 'E1005',
      status: 500,
      message:
        'El valor del argumento "processId" del método "findProcessActivities" es incorrecto.',
    },
    {
      code: 'E1006',
      status: 500,
      message: 'Error encontrando actividades para el proceso.',
    },
    {
      code: 'E1007',
      status: 500,
      message: 'Error en los argumentos de entrada del servicio auxiliar "registryActivity".',
    },
    {
      code: 'E1008',
      status: 500,
      message: 'El servicio "activitiesGetter" requiere un arguento query válido.',
    },
    {
      code: 'E1009',
      status: 500,
      message: 'Argumento no valido para el método "getActivities".',
    },
    {
      code: 'E1010',
      status: 500,
      message: 'Un error sucedio al encontrar las actividades.',
    },
    {
      code: 'E1011',
      status: 500,
      message: 'El método "addActivityResource" tiene argumentos no válidos.',
    },
    {
      code: 'E1012',
      status: 500,
      message: 'Error en el guardado de la actividad.',
    },
    {
      code: 'E1013',
      status: 500,
      message: 'Argumento "id" no válido.',
    },
    {
      code: 'E1014',
      status: 500,
      message: 'Error al encontrar la actividad.',
    },
    {
      code: 'E1015',
      status: 500,
      message: 'Error en los argumentos de entrada de "setActivitySuccess".',
    },
    {
      code: 'E1016',
      status: 500,
      message: 'En los argumentos de entrada de "setActivityResourse".',
    },
    {
      code: 'E1017',
      status: 500,
      message: 'Error en los argumentos de entrada de "activityGetter"',
    },
    {
      code: 'E1101',
      status: 500,
      message: 'El método "createProcess" no posee argumentos de entrada válido.',
    },
    {
      code: 'E1102',
      status: 500,
      message: 'Error en el guardado del nuevo proceso.',
    },
    {
      code: 'E1103',
      status: 500,
      message: 'El argumento del método setProcessStatus es inválido.',
    },
    {
      code: 'E1104',
      status: 500,
      message: 'Error en el guardado el proceso.',
    },
    {
      code: 'E1105',
      status: 500,
      message: 'El valor de status debe ser running o terminated.',
    },
    {
      code: 'E1106',
      status: 500,
      message: 'Error en la especificación del método "findProcess".',
    },
    {
      code: 'E1107',
      status: 500,
      message: 'Error en la búsqueda del proceso.',
    },
    {
      code: 'E1108',
      status: 500,
      message: 'Error en la actualización del estado del proceso.',
    },
    {
      code: 'E1109',
      status: 500,
      message: 'El parámetro de entrada debe ser booleano.',
    },
    // {
    //   code: 'E1110',
    //   status: 500,
    //   message: 'Error en una de las entradas de la función auxiliar "registerProcessSignature"',
    // },
    {
      code: 'E1111',
      status: 500,
      message:
        'Error en la entrada "code" "sessionId" o "resourceId" del servicio auxiliar "registerProcess"',
    },
    {
      code: 'E1112',
      status: 500,
      message: 'Error en la entrada "id" del servicio auxiliar "terminateProcess"',
    },
    {
      code: 'E1113',
      status: 500,
      message: 'Error en el argumento "query" del servicio "processesGetter"',
    },
    {
      code: 'E1114',
      status: 500,
      message: 'Error en el argumento "id" del servicio "processGetter"',
    },
    {
      code: 'E1115',
      status: 500,
      message: 'No se puede agregar actividades a un proceso que no este en estado "running".',
    },
    {
      code: 'E1116',
      status: 500,
      message: 'El argumento "activityId" no es válido.',
    },
    {
      code: 'E1301',
      status: 500,
      message:
        'El rol necesario para utilizar el controlador "notificationCreator" debe ser de administrador.',
    },
    {
      code: 'E1302',
      status: 500,
      message: 'Error del argumento "query" en el servicio "notificationsGetter".',
    },
    {
      code: 'E1303',
      status: 500,
      message: 'Error en los argumentos de entrada del servicio "notificationCreator".',
    },
    {
      code: 'E1304',
      status: 500,
      message: 'Error en el argumento de entrada "id" del método "findNotification".',
    },
    {
      code: 'E1305',
      status: 500,
      message: 'Error en la búsqueda de la notificación pedida.',
    },
    {
      code: 'E1306',
      status: 500,
      message:
        'Error en el argumento de entrada "filter" o "pagination" del método "getNotifications".',
    },
    {
      code: 'E1307',
      status: 500,
      message:
        'Error en el proceso de encontrar notificaciones a través de la consulta especificada.',
    },
    {
      code: 'E1308',
      status: 500,
      message: 'Error en el argumento de entrada "query" del método "createNotification".',
    },
    {
      code: 'E1309',
      status: 500,
      message: 'El argumento de entrada "from" no posee el tipo de id de mongoose.',
    },
    {
      code: 'E1310',
      status: 500,
      message: 'El argumento de entrada "to" no posee el tipo de id de mongoose.',
    },
    {
      code: 'E1311',
      status: 500,
      message: 'Los argumentos de entrada "subject" o "message" no son correctos.',
    },
    {
      code: 'E1312',
      status: 500,
      message: 'El método "acknowledgementNotification" necesita un argumento "id" válido.',
    },
    {
      code: 'E1313',
      status: 500,
      message: 'Error en la búsqueda de la notificación.',
    },
    {
      code: 'E1314',
      status: 500,
      message: 'El servicio "notificationAcknowledger" requiere de un "id" válido.',
    },
    {
      code: 'E1315',
      status: 500,
      message: 'El servicio "notificationsCounter" requiere parámetros válidos.',
    },
    {
      code: 'E1316',
      status: 500,
      message: 'El método "countNotifications" requiere de un "filter" válido.',
    },
    {
      code: 'E1317',
      status: 500,
      message: 'Un error sucedió al obtener el número de notificaciones.',
    },
    {
      code: 'E1401',
      status: 500,
      message: 'El argumento "id" del servicio "profileGetter" es incorrecto.',
    },
    {
      code: 'E1402',
      status: 500,
      message: 'Error en los argumentos de entrada al servicio "profileSetter".',
    },
    // {
    //   code: 'E1403',
    //   status: 400,
    //   message: 'Error en el cambio de contraseña. La contraseña actual no es correcta.',
    // },
    {
      code: 'E1501',
      status: 500,
      message:
        'El servicio "passwordVerifier" necesita de una argumento "password" y "id" válidos.',
    },
    {
      code: 'E1502',
      status: 400,
      message: 'Contraseña incorrecta.',
    },
    {
      code: 'E1601',
      status: 500,
      message: 'Error en el argumento del servicio "usernameChecker".',
    },
    {
      code: 'E1602',
      status: 500,
      message: 'Elmservicio "usernameGetter" requiere un argumento "id".',
    },
    {
      code: 'E1701',
      status: 500,
      message: '',
    },
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
//    07:ServiceLookup(lookup model entity)
//    08:Service
//    09:Time(no model entity)
//    10:Activity
//    11:Process
//    12:Routes(no model entity)
//    13:Notifications
//    14:Profile(no model entity)
//    15:Password(no model entity)
//    16:Username(no model entity)
// DE: Number of error or success
//
