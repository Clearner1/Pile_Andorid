import DocumentPicker from 'react-native-document-picker';

export const pickPileDirectory = async (): Promise<string | null> => {
  const result = await DocumentPicker.pickDirectory();
  if (!result) return null;
  return result.uri ?? null;
};
