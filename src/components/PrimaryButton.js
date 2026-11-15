import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS } from '../theme';

// variant: 'primary' (filled indigo), 'secondary' (outlined), 'soft' (lavender), 'danger'
export default function PrimaryButton({ label, onPress, variant = 'primary', disabled = false, style }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'soft' && styles.soft,
        variant === 'danger' && styles.danger,
        (pressed || disabled) && styles.dim,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          variant === 'primary' && styles.labelPrimary,
          (variant === 'secondary' || variant === 'soft') && styles.labelAccent,
          variant === 'danger' && styles.labelDanger,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    paddingHorizontal: 16,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: { backgroundColor: COLORS.primary },
  secondary: { backgroundColor: COLORS.surface, borderWidth: 1.5, borderColor: COLORS.primary },
  soft: { backgroundColor: COLORS.primarySoft },
  danger: { backgroundColor: COLORS.dangerSoft },
  dim: { opacity: 0.6 },
  label: { fontSize: 16, fontWeight: '700' },
  labelPrimary: { color: '#FFFFFF' },
  labelAccent: { color: COLORS.primary },
  labelDanger: { color: COLORS.danger },
});
