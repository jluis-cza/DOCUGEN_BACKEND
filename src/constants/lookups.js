// LOOKUP DATA STRUCTURES

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
    // activities: [
    //   {
    //     name: "Crear plantilla",
    //     alias: "template_creation",
    //     associated_service: "edition",
    //     description: "El usuario agurado una plantilla."
    //   }
    // ]
  },
  docugen_app: {},
};
