import SystemParameter from '../models/docugen-web/SystemParameter.js';

const seedDB = async () => {
  await SystemParameter.deleteAllSystemParameters();
  await SystemParameter.seedDefaultSystemParameters();
  // ...
};
export default seedDB;
