import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import PrimaryButton from '../components/PrimaryButton';
import MiniSite from '../components/MiniSite';
import { ROLES } from '../utils/colors';
import { COLORS, RADIUS, SHADOW } from '../theme';

export default function PaletteDetailsScreen({ route, navigation }) {
  const { palette } = route.params;
  const c = palette.colors;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.topRow}>
          <Pressable
            onPress={() => navigation.goBack()}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons name="arrow-back" size={28} color={COLORS.ink} />
          </Pressable>
          <Text style={styles.title} numberOfLines={2}>
            {palette.name}
          </Text>
        </View>

        <View style={styles.categoryPill}>
          <Text style={styles.categoryText}>{palette.category}</Text>
        </View>
        <Text style={styles.description}>{palette.description}</Text>

        {/* Big website mock-up in this palette's colours */}
        <View style={[styles.previewCard, SHADOW, { backgroundColor: c.background }]}>
          <MiniSite colors={c} name={palette.name} scale={1.5} />
        </View>

        <Text style={styles.sectionTitle}>Colour palette</Text>
        <View style={[styles.card, SHADOW]}>
          {ROLES.map((role, index) => (
            <View
              key={role.key}
              style={[styles.roleRow, index === ROLES.length - 1 && styles.lastRow]}
            >
              <View style={[styles.bar, { backgroundColor: c[role.key] }]} />
              <View style={styles.roleText}>
                <Text style={styles.hex}>{c[role.key]}</Text>
                <Text style={styles.roleName}>
                  {role.label} · {role.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Buttons</Text>
        <View style={[styles.buttonsCard, { backgroundColor: c.surface }]}>
          <View style={[styles.sampleButton, { backgroundColor: c.primary }]}>
            <Text style={[styles.sampleText, { color: c.buttonText }]}>Primary Button</Text>
          </View>
          <View style={[styles.sampleButton, styles.sampleOutline, { borderColor: c.primary }]}>
            <Text style={[styles.sampleText, { color: c.text }]}>Secondary Button</Text>
          </View>
        </View>

        {palette.purposes && palette.purposes.length > 0 ? (
          <View>
            <Text style={styles.sectionTitle}>Best for</Text>
            <View style={styles.purposeRow}>
              {palette.purposes.map((item) => (
                <View key={item} style={styles.purposeChip}>
                  <Text style={styles.purposeChipText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          label="Customise & Preview"
          onPress={() => navigation.navigate('ThemeEditor', { palette })}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: 16, paddingBottom: 24 },
  topRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  title: { flex: 1, fontSize: 30, fontWeight: '800', color: COLORS.ink, marginLeft: 14 },
  categoryPill: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primarySoft,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  categoryText: { fontSize: 13, fontWeight: '700', color: COLORS.primary },
  description: { fontSize: 16, color: COLORS.muted, lineHeight: 23, marginTop: 10, marginBottom: 16 },
  previewCard: {
    borderRadius: RADIUS.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: COLORS.ink, marginTop: 22, marginBottom: 10 },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
  },
  roleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primarySoft,
  },
  lastRow: { borderBottomWidth: 0 },
  bar: {
    width: 68,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
    marginRight: 14,
  },
  roleText: { flex: 1 },
  hex: { fontSize: 16, fontWeight: '800', color: COLORS.ink },
  roleName: { fontSize: 12, color: COLORS.muted, marginTop: 2 },
  buttonsCard: {
    borderRadius: RADIUS.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sampleButton: { height: 46, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  sampleOutline: { marginTop: 10, borderWidth: 1.5 },
  sampleText: { fontSize: 15, fontWeight: '700' },
  purposeRow: { flexDirection: 'row', flexWrap: 'wrap' },
  purposeChip: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 8,
    marginBottom: 8,
  },
  purposeChipText: { fontSize: 13, fontWeight: '700', color: COLORS.ink },
  footer: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
});
