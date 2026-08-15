// LOOKUP DATA STRUCTURES
import dotenv from 'dotenv';

dotenv.config();

export const LOOKUPS = {
  docugen_web: {
    system_parameters: [
      { name: 'database_used_size', alias: 'Tamaño usado de la base de datos' },
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

      {
        code: 'P0302',
        name: 'Configuración de perfil',
        alias: 'profile_setter',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Configuración de perfil',
            alias: 'profile_setter',
            description: 'Configurando perfil.',
          },
        ],
      },

      {
        code: 'P0303',
        name: 'Recepción de notificación',
        alias: 'notification_acknowledger',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Recepción de notificación',
            alias: 'notification_acknowledger',
            description: 'Recibiendo notificación',
          },
        ],
      }, // Edition processes
      {
        code: 'P0401',
        name: 'Creación de plantilla',
        alias: 'template_creator',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Creación de plantilla',
            alias: 'template_creator',
            description: 'Creando nueva plantilla.',
          },
        ],
      },
      {
        code: 'P0402',
        name: 'Actualización de plantilla',
        alias: 'template_updater',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Actualización de plantilla',
            alias: 'template_updater',
            description: 'Guardando cambios de la plantilla.',
          },
        ],
      },
      {
        code: 'P0403',
        name: 'Eliminación de plantilla',
        alias: 'template_deleter',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Eliminación de plantilla',
            alias: 'template_deleter',
            description: 'Eliminando plantilla.',
          },
        ],
      },
      // Processing processes
      {
        code: 'P0701',
        name: 'Generación de documento PDF',
        alias: 'pdf_document_generator',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Generación de documento PDF',
            alias: 'pdf_document_generator',
            description: 'Generando documento PDF a partir de la plantilla.',
          },
        ],
      },
      // API token processes
      {
        code: 'P0801',
        name: 'Creación de token de API',
        alias: 'api_token_creator',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Creación de token de API',
            alias: 'api_token_creator',
            description: 'Creando token de acceso programático a la API.',
          },
        ],
      },
      {
        code: 'P0802',
        name: 'Actualización de token de API',
        alias: 'api_token_updater',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Actualización de token de API',
            alias: 'api_token_updater',
            description: 'Actualizando configuración del token de API.',
          },
        ],
      },
      {
        code: 'P0803',
        name: 'Revocación de token de API',
        alias: 'api_token_revoker',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Revocación de token de API',
            alias: 'api_token_revoker',
            description: 'Revocando acceso del token de API.',
          },
        ],
      },
      {
        code: 'P0804',
        name: 'Eliminación de token de API',
        alias: 'api_token_deleter',
        stages: 1,
        activities: [
          {
            stage: 1,
            name: 'Eliminación de token de API',
            alias: 'api_token_deleter',
            description: 'Eliminando token de API del sistema.',
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
// 04: Edition
// 05: Acquisition
// 06: Configuration
// 07: Processing
// 08: Presentation
