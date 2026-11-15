import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import ThemeCard from '../components/ThemeCard';
import EmptyState from '../components/EmptyState';
import LoadingView from '../components/LoadingView';
import Chip from '../components/Chip';
import OfflineBadge from '../components/OfflineBadge';
import { initStorage, getPalettes } from '../storage/storage';
import { PURPOSES } from '../data/starterPalettes';
import { COLORS, RADIUS } from '../theme';

const CATEGORIES = ['All', 'Pastel', 'Minimal', 'Vibrant', 'Dark'];
const PURPOSE_OPTIONS = ['Any', ...PURPOSES];
const SIDE_PADDING = 16;
const GAP = 12;

export default function PaletteLibraryScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const cardWidth = Math.floor((width - SIDE_PADDING * 2 - GAP) / 2);

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
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <LoadingView message="Loading palettes..." />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <EmptyState
          icon="alert-circle-outline"
          title="Something went wrong"
          message={error}
          actionLabel="Try again"
          onAction={loadPalettes}
        />
      </SafeAreaView>
    );
  }

  // Everything above the grid scrolls together with the cards.
  const header = (
    <View>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Find your theme</Text>
        <OfflineBadge />
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={22} color={COLORS.muted} />
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search themes"
          placeholderTextColor={COLORS.muted}
          autoCorrect={false}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.chipRow}
      >
        {CATEGORIES.map((item) => (
          <Chip
            key={item}
            label={item}
            selected={item === category}
            onPress={() => setCategory(item)}
            style={styles.chipSpacing}
          />
        ))}
      </ScrollView>

      <Text style={styles.label}>Website type</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.chipRow}
      >
        {PURPOSE_OPTIONS.map((item) => (
          <Chip
            key={item}
            label={item}
            compact
            selected={item === purpose}
            onPress={() => setPurpose(item)}
            style={styles.chipSpacing}
          />
        ))}
      </ScrollView>

      <Text style={styles.count}>
        Showing {visiblePalettes.length} of {palettes.length} themes
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FlatList
        data={visiblePalettes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={header}
        renderItem={({ item }) => (
          <ThemeCard
            title={item.name}
            subtitle={item.category}
            colors={item.colors}
            width={cardWidth}
            onPress={() => navigation.navigate('PaletteDetails', { palette: item })}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="search-outline"
            title="No themes found"
            message="Try a different name, category or website type."
            actionLabel="Clear search & filters"
            onAction={clearFilters}
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
  titleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: { fontSize: 30, fontWeight: '800', color: COLORS.ink, marginRight: 10, marginVertical: 2 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.field,
    borderRadius: RADIUS.lg,
    paddingHorizontal: 16,
    height: 54,
    marginBottom: 14,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 17, color: COLORS.ink },
  chipRow: { paddingRight: 8 },
  chipSpacing: { marginRight: 10 },
  label: { fontSize: 14, fontWeight: '700', color: COLORS.muted, marginTop: 14, marginBottom: 8 },
  count: { fontSize: 13, fontWeight: '600', color: COLORS.muted, marginTop: 14, marginBottom: 12 },
});
