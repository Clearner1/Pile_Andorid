import { parsePostFile } from './frontmatter';
import { PostMetadata } from './types';
import { StorageAdapter } from '@platform/storage';

export type IndexEntry = {
  path: string;
  data: PostMetadata;
};

export type PileIndex = Map<string, PostMetadata>;

export const loadIndexFile = async (
  adapter: StorageAdapter,
  indexPath: string
): Promise<PileIndex | null> => {
  try {
    const contents = await adapter.readFile(indexPath);
    const parsed = JSON.parse(contents) as [string, PostMetadata][];
    return new Map(parsed);
  } catch (error) {
    return null;
  }
};

export const buildIndexFromFiles = async (
  adapter: StorageAdapter,
  pilePath: string,
  filePaths: string[]
): Promise<PileIndex> => {
  const index = new Map<string, PostMetadata>();
  for (const filePath of filePaths) {
    if (!filePath.endsWith('.md')) continue;
    const contents = await adapter.readFile(filePath);
    const parsed = parsePostFile(contents);
    if (!parsed) continue;
    const relativePath = filePath.replace(`${pilePath}/`, '');
    index.set(relativePath, parsed.data);
  }
  return index;
};

export const saveIndexFile = async (
  adapter: StorageAdapter,
  indexPath: string,
  index: PileIndex
): Promise<void> => {
  const payload = JSON.stringify(Array.from(index.entries()));
  await adapter.writeFile(indexPath, payload);
};
