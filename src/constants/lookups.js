// LOOKUP DATA STRUCTURES
import dotenv from 'dotenv';

dotenv.config();

export const LOOKUPS = {
  docugen_web: {
    system_parameters: [
      { name: 'database_size', alias: 'Tamaño de la base de datos' },
      { name: 'system_uptime', alias: 'Tiempo de actividad del sistema' },
    ],
    services: [
      {
        name: 'Generación de Documentos',
        alias: 'generation',
        description:
          'El usuario puede generar documentos personalizados en base a plantillas y datos personalizables.',
      },
      {
        name: 'Edición de Plantillas',
        alias: 'edition',
        description:
          'El usuario puede diseñar graficamente el contenido de su documento a traves de la edición de su plantilla correspondiente.',
      },
    ],
    accounts: [
      {
        username: 'system',
        role: 'admin',
        password: process.env.SYSTEM_PASS, // raw
        status: 'active',
        token: '',
        user: {
          name: 'System',
          lastname: 'System',
          email: 'system@system.com',
        },
      },
      {
        username: 'admin',
        role: 'admin',
        password: process.env.ADMIN_PASS, // raw
        status: 'active',
        token: '',
        user: {
          name: 'Admin',
          lastname: 'Admin',
          email: 'admin@admin.com',
        },
      },
    ],
    processes: [
      // Admission processes
      {
        code: 'P0101',
        name: 'Inicio de sesión',
        alias: 'session_starter',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Inicio de sesión',
            alias: 'session_starter',
            description: 'Iniciando sesión.',
          },
        ],
      },
      {
        code: 'P0102',
        name: 'Cierre de sesión',
        alias: 'session_closer',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Cierre de sesión',
            alias: 'session_closer',
            description: 'Cerrando sesión.',
          },
        ],
      },
      {
        code: 'P0103',
        name: 'Monitoreo de sesiones activas',
        alias: 'active_session_monitoring',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Monitoreo de sesiones activas',
            alias: 'active_session_monitoring',
            description: 'Monitoreando sesiones activas.',
          },
        ],
      },
      {
        code: 'P0104',
        name: 'Monitoreo de cuentas inactivas',
        alias: 'inactive_account_monitoring',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Eliminación de cuentas no registradas',
            alias: 'inactive_account_monitoring',
            description: 'Monitoreando cuentas inactivas.',
          },
        ],
      },
      // Administration processes
      {
        code: 'P0201',
        name: 'Configuración de parámetro de sistema',
        alias: 'system_parameter_setter',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Configuración de parámetro de sistema',
            alias: 'system_parameter_setter',
            description: 'Configurando parámetro de sistema.',
          },
        ],
      },
      {
        code: 'P0202',
        name: 'Configuración de cuenta',
        alias: 'account_setter',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Configuración de cuenta',
            alias: 'account_setter',
            description: 'Configurando cuenta.',
          },
        ],
      },
      {
        code: 'P0203',
        name: 'Configuración particular de servicio',
        alias: 'particular_service_setter',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Configuración particular de servicio',
            alias: 'particular_service_setter',
            description: 'Configurando servicio de usuario.',
          },
        ],
      },
      {
        code: 'P0204',
        name: 'Configuracion global de servicio',
        alias: 'global_service_setter',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Configuracion global de servicio',
            alias: 'global_service_setter',
            description: 'Configurando servicio global.',
          },
        ],
      },
      {
        code: 'P0205',
        name: 'Muestreo de parámetros del sistema',
        alias: 'system_parameters_sampler',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Muestreo de parámetros del sistema',
            alias: 'system_parameters_sampler',
            description: 'Recabando información de los parámetros de sistema',
          },
        ],
      },
      // Management processes
      {
        code: 'P0301',
        name: 'Creación de notificación',
        alias: 'notification_creator',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Creación de notificación',
            alias: 'notification_creator',
            description: 'Creando notificación de usuario.',
          },
        ],
      },
    ],
  },
  docugen_app: {},
};

// Process reference notation
// A process is composed of one or many activities.
// A process' status reflects the stage of the inner activity.
// PMNPQ
// P: stands for Process
// Reference MN list:
// 01: Admission
// 02: Administration
// 03: Management
// ...
