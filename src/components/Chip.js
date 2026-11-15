import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS } from '../theme';

// Filter pill. "compact" makes a smaller outlined version for the website-type filter.
export default function Chip({ label, selected, onPress, compact = false, style }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={[
        styles.chip,
        compact ? styles.compact : styles.regular,
        selected && styles.selected,
        !selected && compact && styles.compactIdle,
        style,
      ]}
    >
      <Text style={[styles.text, compact && styles.compactText, selected && styles.selectedText]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.field,
  },
  regular: { height: 42, paddingHorizontal: 22 },
  compact: { height: 34, paddingHorizontal: 14 },
  compactIdle: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
  selected: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  text: { fontSize: 16, fontWeight: '700', color: COLORS.ink },
  compactText: { fontSize: 13 },
  selectedText: { color: '#FFFFFF' },
});
