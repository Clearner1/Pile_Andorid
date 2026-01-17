import RNFS from 'react-native-fs';
import { StorageAdapter } from './storage';

const normalize = (path: string) => path.replace(/[\\]+/g, '/');

const ensureDir = async (path: string) => {
  const exists = await RNFS.exists(path);
  if (!exists) {
    await RNFS.mkdir(path);
  }
};

export const createNativeStorageAdapter = (): StorageAdapter => {
  return {
    readFile: async (path: string) => {
      return RNFS.readFile(normalize(path), 'utf8');
    },
    writeFile: async (path: string, contents: string) => {
      const normalized = normalize(path);
      const dir = normalized.split('/').slice(0, -1).join('/');
      await ensureDir(dir);
      await RNFS.writeFile(normalized, contents, 'utf8');
    },
    exists: async (path: string) => {
      return RNFS.exists(normalize(path));
    },
    listEntries: async (path: string) => {
      const entries = await RNFS.readDir(normalize(path));
      return entries.map((entry) => ({
        path: entry.path,
        isDirectory: entry.isDirectory(),
      }));
    },
    mkdir: async (path: string) => {
      await ensureDir(normalize(path));
    },
    copyFile: async (source: string, destination: string) => {
      const normalized = normalize(destination);
      const dir = normalized.split('/').slice(0, -1).join('/');
      await ensureDir(dir);
      await RNFS.copyFile(normalize(source), normalized);
    },
  };
};

export const getAppStorageRoot = () => {
  return `${RNFS.DocumentDirectoryPath}/piles`;
};
