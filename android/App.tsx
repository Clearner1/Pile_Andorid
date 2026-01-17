import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { PilesContext, createEmptyConfig, upsertPile } from './src/state/pilesStore';
import { HomeScreen } from './src/screens/HomeScreen';
import { ImportScreen } from './src/screens/ImportScreen';
import { EditorScreen } from './src/screens/EditorScreen';
import { createNativeStorageAdapter, getAppStorageRoot } from './src/platform/nativeStorage';
import { loadPilesConfig, savePilesConfig } from './src/services/pilesService';

export default function App() {
  const [config, setConfig] = useState(createEmptyConfig());
  const [activeScreen, setActiveScreen] = useState<'home' | 'import' | 'editor'>('home');
  const storage = useMemo(() => createNativeStorageAdapter(), []);
  const storageRoot = useMemo(() => getAppStorageRoot(), []);
  const configPath = useMemo(() => `${storageRoot}/piles.json`, [storageRoot]);

  const contextValue = useMemo(
    () => ({
      config,
      setConfig,
      addPile: (pileName: string, path: string) => {
        setConfig((prev) => upsertPile(prev, { name: pileName, path }));
      },
    }),
    [config]
  );

  useEffect(() => {
    const loadConfig = async () => {
      await storage.mkdir(storageRoot);
      const savedConfig = await loadPilesConfig(storage, configPath);
      setConfig(savedConfig);
    };
    loadConfig().catch(() => undefined);
  }, [storage, storageRoot, configPath]);

  useEffect(() => {
    savePilesConfig(storage, config, configPath).catch(() => undefined);
  }, [config, storage, configPath]);

  return (
    <PilesContext.Provider value={contextValue}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.header}>
            <Text style={styles.title}>Pile Android</Text>
            <Text style={styles.subtitle}>Phase 1–3 scaffold</Text>
          </View>
          {activeScreen === 'home' && (
            <HomeScreen
              onNavigateImport={() => setActiveScreen('import')}
              onNavigateEditor={() => setActiveScreen('editor')}
            />
          )}
          {activeScreen === 'import' && (
            <ImportScreen
              storage={storage}
              storageRoot={storageRoot}
              onNavigateHome={() => setActiveScreen('home')}
            />
          )}
          {activeScreen === 'editor' && (
            <EditorScreen storage={storage} onNavigateHome={() => setActiveScreen('home')} />
          )}
        </ScrollView>
      </SafeAreaView>
    </PilesContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  scroll: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1B1B1B',
  },
  subtitle: {
    fontSize: 14,
    color: '#5F6368',
    marginTop: 4,
  },
});
