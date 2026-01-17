import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { PilesContext } from '@state/pilesStore';
import { StorageAdapter } from '@platform/storage';
import { createPost } from '../services/postService';

type EditorScreenProps = {
  storage: StorageAdapter;
  onNavigateHome: () => void;
};

export const EditorScreen = ({ storage, onNavigateHome }: EditorScreenProps) => {
  const context = useContext(PilesContext);
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const currentPile = context?.config.piles[0];

  const handleSave = async () => {
    if (!currentPile) {
      setStatus('No pile available. Import a pile first.');
      return;
    }
    const path = await createPost(storage, currentPile.path, content);
    setStatus(`Saved to ${path}`);
    setContent('');
  };

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Editor (basic)</Text>
      <Text style={styles.description}>
        This is a placeholder editor using a multiline text input. Rich text
        will be integrated after the WebView/native editor decision.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Write your entry..."
        multiline
        value={content}
        onChangeText={setContent}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Entry</Text>
      </TouchableOpacity>
      {status ? <Text style={styles.status}>{status}</Text> : null}
      <TouchableOpacity style={styles.secondaryButton} onPress={onNavigateHome}>
        <Text style={styles.secondaryText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 16,
  },
  input: {
    minHeight: 180,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#1B1B1B',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  status: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 12,
  },
  secondaryButton: {
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  secondaryText: {
    color: '#1F2937',
    fontWeight: '600',
  },
});
