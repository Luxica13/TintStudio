import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PreviewDashboard from '../components/PreviewDashboard';
import ColorInput from '../components/ColorInput';
import PrimaryButton from '../components/PrimaryButton';
import { createTheme, updateTheme } from '../storage/storage';
import { ROLES, ROLE_KEYS, isValidHex, copyColors, colorsEqual } from '../utils/colors';
import { COLORS, RADIUS } from '../theme';

const HEX_ERROR = 'Enter a 6-digit HEX code like #9988FF';

export default function ThemeEditorScreen({ route }) {
  // The screen opens with EITHER a palette (from Details) OR a saved theme (from Saved Themes).
  const { palette, theme } = route.params;
  const startColors = copyColors(theme ? theme.colors : palette.colors);

  // Colours loaded at the start of this editing session. Reset goes back to these.
  const [initialColors] = useState(startColors);
  // What the user is typing in the five boxes.
  const [inputs, setInputs] = useState(startColors);
  // The last valid colours that were applied. The preview ONLY uses these.
  const [applied, setApplied] = useState(startColors);

  const [name, setName] = useState(theme ? theme.name : `${palette.name} Custom`);
  const [nameError, setNameError] = useState('');
  const [message, setMessage] = useState('');
  // null = this is a new theme. Once saved (or if opened from Saved Themes) we keep its id,
  // so saving again UPDATES the same theme instead of creating a duplicate.
  const [themeId, setThemeId] = useState(theme ? theme.id : null);
  const [saving, setSaving] = useState(false);

  // One error message per role (empty string when the HEX is valid).
  const errors = useMemo(() => {
    const result = {};
    ROLE_KEYS.forEach((key) => {
      result[key] = isValidHex(inputs[key]) ? '' : HEX_ERROR;
    });
    return result;
  }, [inputs]);

  const allValid = ROLE_KEYS.every((key) => errors[key] === '');
  const hasUnappliedChanges = allValid && !colorsEqual(inputs, applied);

  const handleChange = (key, text) => {
    // Remove spaces and use capitals so "#9988ff" becomes "#9988FF".
    const cleaned = text.replace(/\s/g, '').toUpperCase();
    setInputs((previous) => ({ ...previous, [key]: cleaned }));
    setMessage('');
  };

  const handleApply = () => {
    if (!allValid) {
      setMessage('Fix the invalid HEX codes first. The preview keeps the last valid colours.');
      return;
    }
    setApplied({ ...inputs });
    setMessage('Changes applied to the preview.');
  };

  const handleReset = () => {
    setInputs(initialColors);
    setApplied(initialColors);
    setMessage('Colours reset to how they were when you opened the editor.');
  };

  const handleSave = async () => {
    if (name.trim() === '') {
      setNameError('Please enter a theme name.');
      return;
    }
    setNameError('');

    if (!allValid) {
      setMessage('Fix the invalid HEX codes before saving.');
      return;
    }

    setSaving(true);
    try {
      if (themeId) {
        await updateTheme(themeId, { name, colors: inputs });
      } else {
        const created = await createTheme({ name, colors: inputs });
        setThemeId(created.id);
      }
      setApplied({ ...inputs });
      setMessage('');
      Alert.alert('Saved', `"${name.trim()}" was saved on this device.`);
    } catch (e) {
      Alert.alert('Could not save', e.message || 'Something went wrong while saving.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <Text style={styles.sectionTitle}>Live Preview</Text>
          <PreviewDashboard colors={applied} />

          <Text style={styles.sectionTitle}>Theme Name</Text>
          <TextInput
            style={[styles.nameInput, !!nameError && styles.inputError]}
            value={name}
            onChangeText={(text) => {
              setName(text);
              setNameError('');
            }}
            placeholder="e.g. My Purple Theme"
            placeholderTextColor={COLORS.muted}
            maxLength={40}
          />
          {nameError ? <Text style={styles.error}>{nameError}</Text> : null}

          <Text style={styles.sectionTitle}>Colours</Text>
          {ROLES.map((role) => (
            <ColorInput
              key={role.key}
              label={role.label}
              description={role.description}
              value={inputs[role.key]}
              onChangeText={(text) => handleChange(role.key, text)}
              error={errors[role.key]}
              // Show the typed colour if valid, otherwise the last applied one.
              swatchColor={isValidHex(inputs[role.key]) ? inputs[role.key] : applied[role.key]}
            />
          ))}

          {hasUnappliedChanges ? (
            <Text style={styles.hint}>You have changes that are not applied to the preview yet.</Text>
          ) : null}
          {message ? <Text style={styles.message}>{message}</Text> : null}

          <View style={styles.buttonRow}>
            <PrimaryButton
              label="Apply Changes"
              variant="secondary"
              style={styles.rowButton}
              onPress={handleApply}
            />
            <PrimaryButton
              label="Reset"
              variant="secondary"
              style={styles.rowButton}
              onPress={handleReset}
            />
          </View>
          <PrimaryButton
            label={saving ? 'Saving...' : themeId ? 'Save Theme (update)' : 'Save Theme'}
            onPress={handleSave}
            disabled={saving}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16, paddingBottom: 32 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 20,
    marginBottom: 10,
  },
  nameInput: {
    height: 48,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: 14,
    fontSize: 16,
    color: COLORS.text,
  },
  inputError: { borderColor: COLORS.danger },
  error: { color: COLORS.danger, fontSize: 13, marginTop: 4 },
  hint: { color: COLORS.accent, fontSize: 14, marginBottom: 8 },
  message: { color: COLORS.muted, fontSize: 14, marginBottom: 12 },
  buttonRow: { flexDirection: 'row', marginBottom: 12 },
  rowButton: { flex: 1, marginRight: 8 },
});
