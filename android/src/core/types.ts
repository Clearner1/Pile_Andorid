export type PileTheme = 'light' | 'blue' | 'purple' | 'yellow' | 'green';

export type PileConfig = {
  name: string;
  path: string;
  theme?: PileTheme;
};

export type PilesConfig = {
  piles: PileConfig[];
};

export type PostMetadata = {
  title: string;
  createdAt: string;
  updatedAt: string;
  highlight: string | null;
  highlightColor: string | null;
  tags: string[];
  replies: string[];
  attachments: string[];
  isReply: boolean;
  isAI: boolean;
};

export type PostFile = {
  content: string;
  data: PostMetadata;
};
