import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PilesContext } from '@state/pilesStore';

type HomeScreenProps = {
  onNavigateImport: () => void;
  onNavigateEditor: () => void;
};

export const HomeScreen = ({ onNavigateImport, onNavigateEditor }: HomeScreenProps) => {
  const context = useContext(PilesContext);

  const hasPile = !!context?.config.piles.length;

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Piles</Text>
      {context?.config.piles.length ? (
        context.config.piles.map((pile) => (
          <View key={pile.name} style={styles.pileRow}>
            <Text style={styles.pileName}>{pile.name}</Text>
            <Text style={styles.pilePath}>{pile.path}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.empty}>No piles yet. Import or create one.</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={onNavigateImport}>
        <Text style={styles.buttonText}>Import Desktop Pile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, !hasPile && styles.buttonDisabled]}
        onPress={onNavigateEditor}
        disabled={!hasPile}
      >
        <Text style={styles.buttonText}>Open Editor</Text>
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
    marginBottom: 12,
  },
  empty: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  pileRow: {
    marginBottom: 12,
  },
  pileName: {
    fontSize: 16,
    fontWeight: '500',
  },
  pilePath: {
    fontSize: 12,
    color: '#6B7280',
  },
  button: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#1B1B1B',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
