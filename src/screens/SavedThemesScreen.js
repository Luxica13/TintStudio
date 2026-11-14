import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

import ItemCard from '../components/ItemCard';
import EmptyState from '../components/EmptyState';
import LoadingView from '../components/LoadingView';
import PrimaryButton from '../components/PrimaryButton';
import { getSavedThemes, deleteTheme } from '../storage/storage';
import { COLORS } from '../theme';

export default function SavedThemesScreen({ navigation }) {
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

  // Runs every time this screen comes into focus, so the list refreshes
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
    return <LoadingView message="Loading saved themes..." />;
  }

  if (error) {
    return (
      <EmptyState
        title="Could not load saved themes"
        message={`${error}\n\nYour saved data has not been deleted.`}
        actionLabel="Try again"
        onAction={loadThemes}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <FlatList
        data={themes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ItemCard
            title={item.name}
            subtitle={`Updated ${new Date(item.updatedAt || Date.now()).toLocaleDateString()}`}
            colors={item.colors}
            onPress={() => navigation.navigate('ThemeEditor', { theme: item })}
          >
            <PrimaryButton label="Delete" variant="danger" onPress={() => confirmDelete(item)} />
          </ItemCard>
        )}
        ListHeaderComponent={
          themes.length > 0 ? <Text style={styles.hint}>Tap a theme to edit it.</Text> : null
        }
        ListEmptyComponent={
          <EmptyState
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
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { padding: 16 },
  hint: { color: COLORS.muted, fontSize: 14, marginBottom: 12 },
});
