import matter from 'gray-matter';
import { PostFile, PostMetadata } from './types';

const emptyMetadata: PostMetadata = {
  title: '',
  createdAt: '',
  updatedAt: '',
  highlight: null,
  highlightColor: null,
  tags: [],
  replies: [],
  attachments: [],
  isReply: false,
  isAI: false,
};

export function parsePostFile(fileContents: string): PostFile | null {
  try {
    const { data, content } = matter(fileContents);
    return {
      content,
      data: { ...emptyMetadata, ...data },
    } as PostFile;
  } catch (error) {
    return null;
  }
}

export function stringifyPostFile(content: string, data: PostMetadata): string {
  return matter.stringify(content, data);
}
