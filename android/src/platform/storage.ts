export type StorageAdapter = {
  readFile: (path: string) => Promise<string>;
  writeFile: (path: string, contents: string) => Promise<void>;
  exists: (path: string) => Promise<boolean>;
  listEntries: (path: string) => Promise<{ path: string; isDirectory: boolean }[]>;
  mkdir: (path: string) => Promise<void>;
  copyFile: (source: string, destination: string) => Promise<void>;
};

export const createStubStorageAdapter = (): StorageAdapter => {
  return {
    readFile: async () => '',
    writeFile: async () => undefined,
    exists: async () => false,
    listEntries: async () => [],
    mkdir: async () => undefined,
    copyFile: async () => undefined,
  };
};
