import { stringifyPostFile } from '@core/frontmatter';
import { PostMetadata } from '@core/types';
import { buildPostPath, getDirectoryPath } from '@core/paths';
import { StorageAdapter } from '@platform/storage';
import { listFilesRecursive } from './fileTree';
import { loadOrRebuildIndex } from './pilesService';

export const createPost = async (
  adapter: StorageAdapter,
  pilePath: string,
  content: string
): Promise<string> => {
  const now = new Date();
  const postPath = buildPostPath(pilePath, now);
  const metadata: PostMetadata = {
    title: '',
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    highlight: null,
    highlightColor: null,
    tags: [],
    replies: [],
    attachments: [],
    isReply: false,
    isAI: false,
  };

  const fileContents = stringifyPostFile(content, metadata);
  await adapter.mkdir(getDirectoryPath(postPath));
  await adapter.writeFile(postPath, fileContents);

  const files = await listFilesRecursive(adapter, pilePath);
  await loadOrRebuildIndex(adapter, pilePath, files);
  return postPath;
};
