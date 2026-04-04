// SYSTEM PARAMETERS

import SystemParameter from '../../models/docugen-web/SystemParameter.js';
import { systemParameterValuesCollector } from '../../helpers/docugen-web/administrationHelper.js';
// *************************************************************************************************
// FROM CONTROLLERS
// *************************************************************************************************
// ************* System parameters Monitor *************
export const systemParametersGetter = async (query) => {
  // Params
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const search = query.search || '';
  const sortBy = query.sortBy || 'name';
  const sortOrder = query.sortOrder === 'desc' ? -1 : 1;
  // Filer of search
  const filter = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { alias: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit; // Jump
  const sort = { [sortBy]: sortOrder }; // Order of list

  // Parallel query
  const { systemParameters, total } = await SystemParameter.getCustomizedSystemParameters(
    filter,
    sort,
    skip,
    limit
  );

  const totalPages = Math.ceil(total / limit);

  // Metadata
  const pagination = {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };

  return { systemParameters, pagination, total };
};

// ************* System parameters Configuration *************
export const systemParameterSetter = async (config) => {
  if (!config) throw new Error('E0503');
  const { id, property, value } = config;
  const systemParameter = await SystemParameter.findSystemParameter(id);
  switch (property) {
    case 'status':
      await systemParameter.setSystemParameterStatus(value);
      break;
    default:
      throw new Error('E0504');
  }
};

// *************************************************************************************************
// FROM CRON JOBS
// *************************************************************************************************
// ************* System parameters updater *************
export const sampleSystemParameters = async () => {
  try {
    console.log('Starting System Parameters sampling...');

    // Getting the followed parameters
    const followedParameters = await SystemParameter.find({ status: 'followed' });
    console.log('Paremeters to sample:', { followedParameters: followedParameters });

    for (const parameter of followedParameters) {
      let newValue = null;
      switch (parameter.name) {
        case 'database_size':
          newValue = await systemParameterValuesCollector.getDataBaseSize();
          break;
        case 'system_uptime':
          newValue = await systemParameterValuesCollector.getSystemUptime();
          break;
        default:
          console.log(`No collector defined for: ${parameter.name}`);
          continue;
      }
      if (newValue && newValue.value !== null) {
        await parameter.addSystemParameterValue(newValue.value, newValue.unit);
        console.log(`Sample ${parameter.name}: ${newValue.value} ${newValue.unit}`);
      }
    }
    console.log('Sampling complete.');
  } catch (error) {
    console.error('Error sampling values. ', error);
  }
};
