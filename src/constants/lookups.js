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
            description: 'El usuario inició correctamente una nueva sesión.',
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
            description: 'El usuario terminó la sesión.',
          },
        ],
      },
      {
        code: 'P0103',
        name: 'Cierre de sesión',
        alias: 'session_closer',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Cierre de sesión',
            alias: 'session_closer',
            description: 'El sistema terminó la sesión debido a que la sesión actual expiró.',
          },
        ],
      },
      {
        code: 'P0104',
        name: 'Eliminación de cuentas no registradas',
        alias: 'inactive_account_deleter',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Eliminación de cuentas no registradas',
            alias: 'inactive_account_deleter',
            description:
              'El sistema eliminó la cuenta debido a que en el proceso de registro la verificación por email falló .',
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
            description: 'Se configuró exitosamente el parámetro del sistema.',
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
            description: 'Se configuró exitosamente la cuenta.',
          },
        ],
      },
      {
        code: 'P0203',
        name: 'Configuración de servicio a usuario',
        alias: 'service_setter',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Configuración de servicio a usuario',
            alias: 'service_setter',
            description: 'El servicio para el usuario fue exitosamente configurado.',
          },
        ],
      },
      {
        code: 'P0204',
        name: 'Configuracion de global de servicio',
        alias: 'service_lookup_setter',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Configuracion de global de servicio',
            alias: 'service_lookup_setter',
            description: 'El servicio global fue configurado exitosamente',
          },
        ],
      },
      {
        code: 'P0205',
        name: 'Recabando información de los parámetros de sistema',
        alias: 'system_parameters_sampler',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Recabando información de los parámetros de sistema',
            alias: 'system_parameters_sampler',
            description: 'Se recabó exitosamente información de los parámetros del sistema.',
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
// ...
