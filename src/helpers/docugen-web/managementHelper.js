export const identifyModuleProcessPrefix = (module) => {
  if (!module) throw Error('No module argument was provided');
  let prefix = '';
  switch (module) {
    case 'admission':
      prefix = 'P01';
      break;
    case 'administration':
      prefix = 'P02';
      break;
    case 'management':
      prefix = 'P03';
      break;
    case 'edition':
      prefix = 'P04';
      break;
    case 'acquisition':
      prefix = 'P05';
      break;
    case 'configuration':
      prefix = 'P06';
      break;
    case 'processing':
      prefix = 'P07';
      break;
    case 'presentation':
      prefix = 'P08';
      break;
    default:
      prefix = 'PXX';
  }
  return prefix;
};
