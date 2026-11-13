import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS, RADIUS } from '../theme';

// One editor row: role name, a swatch, a HEX text box and an optional error.
export default function ColorInput({ label, description, value, onChangeText, error, swatchColor }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.row}>
        <View style={[styles.swatch, { backgroundColor: swatchColor }]} />
        <TextInput
          style={[styles.input, !!error && styles.inputError]}
          value={value}
          onChangeText={onChangeText}
          placeholder="#RRGGBB"
          placeholderTextColor={COLORS.muted}
          autoCapitalize="characters"
          autoCorrect={false}
          maxLength={7}
          accessibilityLabel={`${label} HEX code`}
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: { fontSize: 16, fontWeight: '600', color: COLORS.text },
  description: { fontSize: 13, color: COLORS.muted, marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center' },
  swatch: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    fontSize: 16,
    color: COLORS.text,
    backgroundColor: COLORS.surface,
  },
  inputError: { borderColor: COLORS.danger },
  error: { color: COLORS.danger, fontSize: 13, marginTop: 4 },
});
