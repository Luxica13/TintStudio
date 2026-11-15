import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import ThemeCard from '../components/ThemeCard';
import EmptyState from '../components/EmptyState';
import LoadingView from '../components/LoadingView';
import { getSavedThemes, deleteTheme } from '../storage/storage';
import { COLORS } from '../theme';

const SIDE_PADDING = 16;
const GAP = 12;

export default function SavedThemesScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const cardWidth = Math.floor((width - SIDE_PADDING * 2 - GAP) / 2);

  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadThemes = useCallback(async () => {
    try {
      setError(null);
      const data = await getSavedThemes();
      setThemes(data);
    } catch (e) {
      setError(e.message || 'Could not read saved themes.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Runs every time this tab comes into focus, so the list refreshes
  // after saving, editing or deleting a theme.
  useFocusEffect(
    useCallback(() => {
      loadThemes();
    }, [loadThemes])
  );

  const confirmDelete = (theme) => {
    Alert.alert('Delete theme?', `"${theme.name}" will be removed from this device.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteTheme(theme.id);
            await loadThemes();
          } catch (e) {
            Alert.alert('Could not delete', e.message || 'Something went wrong.');
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <LoadingView message="Loading saved themes..." />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <EmptyState
          icon="alert-circle-outline"
          title="Could not load saved themes"
          message={`${error}\n\nYour saved data has not been deleted.`}
          actionLabel="Try again"
          onAction={loadThemes}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FlatList
        data={themes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Saved themes</Text>
            <Text style={styles.subtitle}>
              {themes.length === 0
                ? 'Stored on this device'
                : `${themes.length} saved on this device. Tap one to edit it.`}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <ThemeCard
            title={item.name}
            subtitle={`Updated ${new Date(item.updatedAt || Date.now()).toLocaleDateString()}`}
            colors={item.colors}
            width={cardWidth}
            actionIcon="trash-outline"
            onAction={() => confirmDelete(item)}
            onPress={() => navigation.navigate('ThemeEditor', { theme: item })}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="bookmark-outline"
            title="No saved themes yet"
            message="Customise a palette in the editor and tap Save Theme. It will show up here."
            actionLabel="Browse palettes"
            onAction={() => navigation.navigate('PaletteLibrary')}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  list: { padding: SIDE_PADDING, paddingBottom: 24 },
  column: { justifyContent: 'space-between' },
  header: { marginBottom: 16 },
  title: { fontSize: 30, fontWeight: '800', color: COLORS.ink },
  subtitle: { fontSize: 14, fontWeight: '600', color: COLORS.muted, marginTop: 4 },
});
