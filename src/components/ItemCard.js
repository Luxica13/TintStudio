import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import SwatchRow from './SwatchRow';
import { COLORS, RADIUS } from '../theme';

// One reusable card used for both palettes and saved themes.
// "children" is optional extra content shown under the main area (e.g. a Delete button).
export default function ItemCard({ title, subtitle, colors, onPress, children }) {
  return (
    <View style={styles.card}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.main, pressed && styles.pressed]}
      >
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        <View style={styles.swatches}>
          <SwatchRow colors={colors} />
        </View>
      </Pressable>
      {children ? <View style={styles.extra}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
    overflow: 'hidden',
  },
  main: { padding: 16 },
  pressed: { opacity: 0.7 },
  title: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  subtitle: { fontSize: 14, color: COLORS.muted, marginTop: 2 },
  swatches: { marginTop: 12 },
  extra: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
