import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MiniSite from './MiniSite';
import { ROLE_KEYS } from '../utils/colors';
import { COLORS, RADIUS, SHADOW } from '../theme';

// A grid card for a palette or a saved theme.
// The card is tinted with the palette's own background colour.
// actionIcon / onAction add a small icon button (used for Delete on Saved Themes).
export default function ThemeCard({ title, subtitle, colors, onPress, actionIcon, onAction, width }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        SHADOW,
        { width, backgroundColor: colors.background },
        pressed && styles.pressed,
      ]}
    >
      <MiniSite colors={colors} name={title} />

      <View style={styles.swatches}>
        {ROLE_KEYS.map((key, index) => (
          <View
            key={key}
            style={[
              styles.swatch,
              { backgroundColor: colors[key], marginRight: index === ROLE_KEYS.length - 1 ? 0 : 5 },
            ]}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <View style={styles.footerText}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={[styles.subtitle, { color: colors.text }]} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>
        {actionIcon ? (
          <Pressable onPress={onAction} hitSlop={10} accessibilityRole="button" accessibilityLabel="Delete theme">
            <Ionicons name={actionIcon} size={22} color={colors.text} />
          </Pressable>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.lg,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pressed: { opacity: 0.85 },
  swatches: { flexDirection: 'row', marginTop: 8 },
  swatch: {
    flex: 1,
    height: 22,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
  },
  footer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  footerText: { flex: 1, marginRight: 6 },
  title: { fontSize: 15, fontWeight: '800' },
  subtitle: { fontSize: 12, opacity: 0.7, marginTop: 1 },
});
