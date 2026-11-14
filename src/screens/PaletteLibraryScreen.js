import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ItemCard from '../components/ItemCard';
import EmptyState from '../components/EmptyState';
import LoadingView from '../components/LoadingView';
import PrimaryButton from '../components/PrimaryButton';
import { initStorage, getPalettes } from '../storage/storage';
import { PURPOSES } from '../data/starterPalettes';
import { COLORS, RADIUS } from '../theme';

const CATEGORIES = ['All', 'Pastel', 'Minimal', 'Vibrant', 'Dark'];
const PURPOSE_OPTIONS = ['Any', ...PURPOSES];

export default function PaletteLibraryScreen({ navigation }) {
  const [palettes, setPalettes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('All');
  const [purpose, setPurpose] = useState('Any');

  // Load palettes from AsyncStorage (creating them on first launch only).
  const loadPalettes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await initStorage();
      const data = await getPalettes();
      setPalettes(data);
    } catch (e) {
      setError('Could not load palettes from local storage.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPalettes();
  }, [loadPalettes]);

  // Search, category and purpose filters work together: a palette must pass ALL tests.
  const visiblePalettes = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    return palettes.filter((palette) => {
      const matchesCategory = category === 'All' || palette.category === category;
      const matchesSearch = query === '' || palette.name.toLowerCase().includes(query);
      // Older stored palettes may not have a purposes list, so fall back to an empty one.
      const matchesPurpose = purpose === 'Any' || (palette.purposes || []).includes(purpose);
      return matchesCategory && matchesSearch && matchesPurpose;
    });
  }, [palettes, searchText, category, purpose]);

  const clearFilters = () => {
    setSearchText('');
    setCategory('All');
    setPurpose('Any');
  };

  if (loading) {
    return <LoadingView message="Loading palettes..." />;
  }

  if (error) {
    return (
      <EmptyState
        title="Something went wrong"
        message={error}
        actionLabel="Try again"
        onAction={loadPalettes}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <View style={styles.top}>
        <View style={styles.navRow}>
          <PrimaryButton
            label="Saved Themes"
            variant="secondary"
            style={styles.navButton}
            onPress={() => navigation.navigate('SavedThemes')}
          />
          <PrimaryButton
            label="About & Help"
            variant="secondary"
            style={styles.navButton}
            onPress={() => navigation.navigate('About')}
          />
        </View>

        <TextInput
          style={styles.search}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search palettes by name"
          placeholderTextColor={COLORS.muted}
          autoCorrect={false}
          clearButtonMode="while-editing"
        />

        <View style={styles.chips}>
          {CATEGORIES.map((item) => {
            const selected = item === category;
            return (
              <Pressable
                key={item}
                onPress={() => setCategory(item)}
                style={[styles.chip, selected && styles.chipSelected]}
              >
                <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{item}</Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.purposeLabel}>Website purpose</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.purposeRow}
        >
          {PURPOSE_OPTIONS.map((item) => {
            const selected = item === purpose;
            return (
              <Pressable
                key={item}
                onPress={() => setPurpose(item)}
                style={[styles.chip, selected && styles.chipSelected]}
              >
                <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{item}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={visiblePalettes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <ItemCard
            title={item.name}
            subtitle={item.category}
            colors={item.colors}
            onPress={() => navigation.navigate('PaletteDetails', { palette: item })}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title="No palettes found"
            message="Try a different name, category or website purpose."
            actionLabel="Clear search & filter"
            onAction={clearFilters}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  top: { paddingHorizontal: 16, paddingTop: 12 },
  navRow: { flexDirection: 'row', marginBottom: 12 },
  navButton: { flex: 1, marginRight: 8 },
  search: {
    height: 48,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    fontSize: 16,
    color: COLORS.text,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  chipText: { fontSize: 14, color: COLORS.text, fontWeight: '600' },
  chipTextSelected: { color: '#FFFFFF' },
  purposeLabel: { fontSize: 14, fontWeight: '700', color: COLORS.muted, marginBottom: 8 },
  purposeRow: { paddingBottom: 4 },
  list: { padding: 16, paddingTop: 8 },
});
