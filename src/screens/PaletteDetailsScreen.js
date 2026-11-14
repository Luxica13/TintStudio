import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PrimaryButton from '../components/PrimaryButton';
import { ROLES } from '../utils/colors';
import { COLORS, RADIUS } from '../theme';

export default function PaletteDetailsScreen({ route, navigation }) {
  const { palette } = route.params;

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.name}>{palette.name}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{palette.category}</Text>
        </View>
        <Text style={styles.description}>{palette.description}</Text>

        {palette.purposes && palette.purposes.length > 0 ? (
          <View style={styles.purposeBlock}>
            <Text style={styles.purposeTitle}>Best for</Text>
            <View style={styles.purposeRow}>
              {palette.purposes.map((item) => (
                <View key={item} style={styles.purposeChip}>
                  <Text style={styles.purposeChipText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        <View style={styles.card}>
          {ROLES.map((role, index) => (
            <View
              key={role.key}
              style={[styles.roleRow, index === ROLES.length - 1 && styles.lastRow]}
            >
              <View style={[styles.swatch, { backgroundColor: palette.colors[role.key] }]} />
              <View style={styles.roleText}>
                <Text style={styles.roleName}>{role.label}</Text>
                <Text style={styles.roleDesc}>{role.description}</Text>
              </View>
              <Text style={styles.hex}>{palette.colors[role.key]}</Text>
            </View>
          ))}
        </View>

        <PrimaryButton
          label="Customise & Preview"
          onPress={() => navigation.navigate('ThemeEditor', { palette })}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16 },
  name: { fontSize: 26, fontWeight: '800', color: COLORS.text },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accentSoft,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
    marginTop: 8,
  },
  badgeText: { color: COLORS.accent, fontWeight: '700', fontSize: 13 },
  description: { fontSize: 16, color: COLORS.muted, marginTop: 12, marginBottom: 16, lineHeight: 22 },
  purposeBlock: { marginBottom: 16 },
  purposeTitle: { fontSize: 14, fontWeight: '700', color: COLORS.muted, marginBottom: 8 },
  purposeRow: { flexDirection: 'row', flexWrap: 'wrap' },
  purposeChip: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  purposeChipText: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  roleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  lastRow: { borderBottomWidth: 0 },
  swatch: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 12,
  },
  roleText: { flex: 1 },
  roleName: { fontSize: 16, fontWeight: '600', color: COLORS.text },
  roleDesc: { fontSize: 12, color: COLORS.muted },
  hex: { fontSize: 15, fontWeight: '600', color: COLORS.text },
});
