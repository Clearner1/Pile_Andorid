import { PilesConfig } from '@core/types';
import { StorageAdapter } from '@platform/storage';
import { buildIndexFromFiles, loadIndexFile, saveIndexFile } from '@core/indexing';
import { copyDirectory, listFilesRecursive } from './fileTree';

const DEFAULT_CONFIG_PATH = 'piles.json';

export const loadPilesConfig = async (
  adapter: StorageAdapter,
  configPath: string = DEFAULT_CONFIG_PATH
): Promise<PilesConfig> => {
  if (!(await adapter.exists(configPath))) {
    return { piles: [] };
  }
  const contents = await adapter.readFile(configPath);
  return JSON.parse(contents) as PilesConfig;
};

export const savePilesConfig = async (
  adapter: StorageAdapter,
  config: PilesConfig,
  configPath: string = DEFAULT_CONFIG_PATH
): Promise<void> => {
  await adapter.writeFile(configPath, JSON.stringify(config, null, 2));
};

export const rebuildPileIndex = async (
  adapter: StorageAdapter,
  pilePath: string,
  filePaths: string[]
): Promise<void> => {
  const indexPath = `${pilePath}/index.json`;
  const index = await buildIndexFromFiles(adapter, pilePath, filePaths);
  await saveIndexFile(adapter, indexPath, index);
};

export const loadOrRebuildIndex = async (
  adapter: StorageAdapter,
  pilePath: string,
  filePaths: string[]
): Promise<void> => {
  const indexPath = `${pilePath}/index.json`;
  const existing = await loadIndexFile(adapter, indexPath);
  if (existing) return;
  await rebuildPileIndex(adapter, pilePath, filePaths);
};

export const importPileFromDirectory = async (
  adapter: StorageAdapter,
  sourcePath: string,
  destinationRoot: string
): Promise<{ name: string; path: string; files: number }> => {
  const pileName = sourcePath.replace(/[\\]+/g, '/').split('/').pop() ?? 'Imported';
  const destinationPath = `${destinationRoot}/${pileName}`;
  await copyDirectory(adapter, sourcePath, destinationPath);
  const files = await listFilesRecursive(adapter, destinationPath);
  await loadOrRebuildIndex(adapter, destinationPath, files);
  return { name: pileName, path: destinationPath, files: files.length };
};
