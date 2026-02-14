// USER CONSTANTS

export const USERS = {
  client: {
    role: {
      guest: 'guest',
      developer: 'dev',
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
    status: {
      active: 'active',
      suspended: 'suspended',
      inactive: 'inactive',
    },
  },
  server: {
    role: {
      administrator: 'admin',
    },
  },
};
