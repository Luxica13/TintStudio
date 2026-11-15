import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS, RADIUS } from '../theme';

// One editor row: role name, a colour swatch, a HEX text box and an optional error.
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
  label: { fontSize: 16, fontWeight: '700', color: COLORS.ink },
  description: { fontSize: 13, color: COLORS.muted, marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center' },
  swatch: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: COLORS.field,
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.ink,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  inputError: { borderColor: COLORS.danger, backgroundColor: COLORS.dangerSoft },
  error: { color: COLORS.danger, fontSize: 13, fontWeight: '600', marginTop: 4 },
});
