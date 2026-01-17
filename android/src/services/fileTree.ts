import { StorageAdapter } from '@platform/storage';

export const listFilesRecursive = async (
  adapter: StorageAdapter,
  rootPath: string
): Promise<string[]> => {
  const files: string[] = [];
  const walk = async (path: string) => {
    const entries = await adapter.listEntries(path);
    for (const entry of entries) {
      if (entry.isDirectory) {
        await walk(entry.path);
      } else {
        files.push(entry.path);
      }
    }
  };

  await walk(rootPath);
  return files;
};

export const copyDirectory = async (
  adapter: StorageAdapter,
  sourcePath: string,
  destinationPath: string
): Promise<void> => {
  await adapter.mkdir(destinationPath);
  const entries = await adapter.listEntries(sourcePath);
  for (const entry of entries) {
    const name = entry.path.split('/').pop();
    if (!name) continue;
    const target = `${destinationPath}/${name}`;
    if (entry.isDirectory) {
      await copyDirectory(adapter, entry.path, target);
    } else {
      await adapter.copyFile(entry.path, target);
    }
  }
};
