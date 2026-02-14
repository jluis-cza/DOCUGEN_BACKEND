// SYSTEM PARAMETERS

import SystemParameter from '../../models/docugen-web/SystemParameter.js';
import { systemParameterValuesCollector } from '../../helpers/docugen-web/administrationHelper.js';

// System parameters updater
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
