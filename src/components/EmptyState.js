import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from './PrimaryButton';
import { COLORS } from '../theme';

// Used for "no results", "no saved themes" and error messages.
export default function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {actionLabel ? (
        <PrimaryButton
          label={actionLabel}
          onPress={onAction}
          variant="secondary"
          style={styles.button}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 32 },
  title: { fontSize: 18, fontWeight: '700', color: COLORS.text, textAlign: 'center' },
  message: { fontSize: 15, color: COLORS.muted, textAlign: 'center', marginTop: 8 },
  button: { marginTop: 16, alignSelf: 'stretch' },
});
