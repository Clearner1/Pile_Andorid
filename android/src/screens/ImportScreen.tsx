import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { PilesContext } from '@state/pilesStore';
import { StorageAdapter } from '@platform/storage';
import { importPileFromDirectory } from '../services/pilesService';
import { pickPileDirectory } from '../platform/nativeFilePicker';

type ImportScreenProps = {
  storage: StorageAdapter;
  storageRoot: string;
  onNavigateHome: () => void;
};

export const ImportScreen = ({ storage, storageRoot, onNavigateHome }: ImportScreenProps) => {
  const context = useContext(PilesContext);
  const [pileName, setPileName] = useState('Imported Pile');
  const [pilePath, setPilePath] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handlePickDirectory = async () => {
    const selected = await pickPileDirectory();
    if (!selected) return;
    setPilePath(selected);
  };

  const handleImport = async () => {
    if (!context) return;
    if (!pilePath.trim()) {
      setStatus('Select a pile folder before importing.');
      return;
    }
    setStatus('Validating pile structure...');
    try {
      const result = await importPileFromDirectory(storage, pilePath.trim(), storageRoot);
      context.addPile(pileName.trim() || result.name, result.path);
      setStatus(`Imported ${result.files} files into ${result.path}`);
      onNavigateHome();
    } catch (error) {
      setStatus('Import failed. Check permissions and folder access.');
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Import pile (stub)</Text>
      <Text style={styles.description}>
        This is a Phase 3 scaffold. The file picker and copy logic will be wired
        into the storage adapter.
      </Text>
      <Text style={styles.label}>Pile name</Text>
      <TextInput style={styles.input} value={pileName} onChangeText={setPileName} />
      <Text style={styles.label}>Pile path</Text>
      <TextInput style={styles.input} value={pilePath} onChangeText={setPilePath} />
      <TouchableOpacity style={styles.secondaryButton} onPress={handlePickDirectory}>
        <Text style={styles.secondaryText}>Pick Folder</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleImport}>
        <Text style={styles.buttonText}>Save pile</Text>
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
  status: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: '#4B5563',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 10,
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
