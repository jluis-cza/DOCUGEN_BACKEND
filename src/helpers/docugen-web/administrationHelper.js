import mongoose from 'mongoose';
import os from 'os';
export const systemParameterValuesCollector = {
  getDataBaseSize: async () => {
    try {
      const db = mongoose.connection.db;
      const stats = await db.stats();
      return {
        value: (stats.dataSize / (1024 * 1024)).toFixed(2), // MB
        unit: 'MB',
      };
    } catch (error) {
      console.error('Error getting database size. ', error);
      return { value: null, unit: 'MB' };
    }
  },
  getSystemUptime: async () => {
    try {
      const uptime = os.uptime(); // en segundos
      const hours = Math.floor(uptime / 3600);
      return {
        value: hours,
        unit: 'hours',
      };
    } catch (error) {
      console.error('Error collecting system uptime. ', error);
      return { value: null, unit: 'hours' };
    }
  },
};
