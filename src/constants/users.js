// ******************************************************************************
// USER CONSTANTS
// Defines the options of a user's account data
// ******************************************************************************
export const USERS = {
  type: {
    client: {
      role: {
        guest: 'guest',
        developer: 'dev',
      },
    },
    server: {
      role: {
        administrator: 'admin',
      },
    },
  },
  status: {
    active: 'active',
    suspended: 'suspended',
    inactive: 'inactive',
  },
  services: {
    generation: {
      name: 'Generación de Documentos',
      description:
        'El usuario puede generar documentos personalizados en base a plantillas y datos personalizables.',
    },
    edition: {
      name: 'Edición de Plantillas',
      description:
        'El usuario puede diseñar graficamente el contenido de su documento a traves de la edición de su plantilla correspondiente.',
    },
  },
};
// ******************************************************************************
