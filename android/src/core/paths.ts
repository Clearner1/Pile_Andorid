export const getRelativeReplyPath = (absolutePath: string): string => {
  const parts = absolutePath.split(/[\\/]/);
  return parts.slice(-3).join('/');
};

export const buildPostPath = (pilePath: string, date: Date): string => {
  const year = date.getFullYear().toString();
  const month = date.toLocaleString('default', { month: 'short' });
  const stamp = buildTimestamp(date);
  return [pilePath, year, month, `${stamp}.md`].join('/');
};

export const buildMediaPath = (pilePath: string, date: Date, filename: string): string => {
  const year = date.getFullYear().toString();
  const month = date.toLocaleString('default', { month: 'short' });
  return [pilePath, year, month, 'media', filename].join('/');
};

export const getDirectoryPath = (filePath: string): string => {
  const normalized = filePath.replace(/[\\]+/g, '/');
  const parts = normalized.split('/');
  parts.pop();
  return parts.join('/');
};

const buildTimestamp = (date: Date): string => {
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}-${hours}${minutes}${seconds}`;
};
