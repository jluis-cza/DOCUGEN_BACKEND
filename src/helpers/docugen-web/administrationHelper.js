import mongoose from 'mongoose';
import os from 'os';

export const systemParameterValuesCollector = {
  getDataBaseUsedSize: async () => {
    try {
      const db = mongoose.connection.db;
      const stats = await db.stats();
      // stats.dataSize =only data size
      // stats.totalSize =data size +index size
      return {
        value: (stats.totalSize / (1024 * 1024)).toFixed(2), // MB
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
      const hours = (uptime / 3600).toFixed(2);
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

// *************************************************************************************************
// Util functions

export const getDataBaseName = async () => {
  try {
    const db = mongoose.connection.db;
    const stats = await db.stats();
    const dbName = stats.db;
    return dbName;
  } catch (error) {
    console.error('Error getting the database name.', error);
  }
};

export const getDataBaseTotalSize = async () => {
  try {
    const db = mongoose.connection.db;
    const stats = await db.stats();
    return {
      value: (stats.fsTotalSize / (1024 * 1024 * 1024)).toFixed(2), // GB
      unit: 'GB',
    };
  } catch (error) {
    console.error('Error getting the database total size.', error);
    return { value: null, unit: 'GB' };
  }
};

export const getHostname = () => {
  const hostname = os.hostname();
  return hostname;
};

export const getPlatform = () => {
  const platform = os.platform();
  return platform;
};

export const getNetworkInfo = () => {
  const interfaces = os.networkInterfaces();
  const reporte = {};

  for (const [nombreInterfaz, datos] of Object.entries(interfaces)) {
    // Filtramos para ignorar interfaces internas (como loopback/127.0.0.1)
    const datosValidos = datos.filter((info) => !info.internal);

    if (datosValidos.length > 0) {
      // Mapeamos solo los datos clave que necesitas
      reporte[nombreInterfaz] = datosValidos.map((info) => ({
        tipo: info.family,
        ip: info.address,
        mac: info.mac,
      }));
    }
  }

  // Devolvemos el objeto
  return reporte;
};
