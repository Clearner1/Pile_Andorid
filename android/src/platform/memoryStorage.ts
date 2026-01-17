import { StorageAdapter } from './storage';

type Entry = {
  path: string;
  contents: string | null;
};

export const createMemoryStorageAdapter = (): StorageAdapter => {
  const store = new Map<string, Entry>();

  const normalize = (path: string) => path.replace(/[\\]+/g, '/');

  const ensureDir = (path: string) => {
    const normalized = normalize(path);
    if (!store.has(normalized)) {
      store.set(normalized, { path: normalized, contents: null });
    }
  };

  const getChildren = (path: string) => {
    const normalized = normalize(path);
    const prefix = normalized.endsWith('/') ? normalized : `${normalized}/`;
    return Array.from(store.values()).filter((entry) => entry.path.startsWith(prefix));
  };

  return {
    readFile: async (path: string) => {
      const normalized = normalize(path);
      const entry = store.get(normalized);
      if (!entry || entry.contents === null) {
        throw new Error(`File not found: ${normalized}`);
      }
      return entry.contents;
    },
    writeFile: async (path: string, contents: string) => {
      const normalized = normalize(path);
      store.set(normalized, { path: normalized, contents });
    },
    exists: async (path: string) => {
      return store.has(normalize(path));
    },
    listEntries: async (path: string) => {
      const normalized = normalize(path);
      const children = getChildren(normalized);
      const entries = new Map<string, { path: string; isDirectory: boolean }>();

      children.forEach((entry) => {
        const relative = entry.path.replace(normalized, '').replace(/^\/+/, '');
        if (!relative) return;
        const first = relative.split('/')[0];
        const childPath = `${normalized}/${first}`;
        const isDirectory = relative.includes('/');
        entries.set(childPath, { path: childPath, isDirectory });
      });

      return Array.from(entries.values());
    },
    mkdir: async (path: string) => {
      ensureDir(path);
    },
    copyFile: async (source: string, destination: string) => {
      const src = store.get(normalize(source));
      if (!src || src.contents === null) {
        throw new Error(`Source file missing: ${source}`);
      }
      store.set(normalize(destination), { path: normalize(destination), contents: src.contents });
    },
  };
};
