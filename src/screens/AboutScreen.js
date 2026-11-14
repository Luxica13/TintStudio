import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ROLES } from '../utils/colors';
import { COLORS, RADIUS } from '../theme';

// TODO: replace these placeholders with your own details before submitting.
const STUDENT_NAME = 'Luxica Pratheepan';
const STUDENT_INDEX = '2022/ICT/118';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Section title="What is TintStudio?">
          <Text style={styles.body}>
            TintStudio is a small tool for designing colour themes for mobile apps. Pick a starter
            palette, change its colours, preview them on a sample dashboard and save your own
            themes.
          </Text>
        </Section>

        <Section title="How to use it">
          <Text style={styles.body}>1. Browse or search the Palette Library and filter by category.</Text>
          <Text style={styles.body}>2. Tap a palette to see its colours and HEX codes.</Text>
          <Text style={styles.body}>3. Tap "Customise & Preview" to open the editor.</Text>
          <Text style={styles.body}>4. Type new HEX codes (like #9988FF) and tap "Apply Changes".</Text>
          <Text style={styles.body}>5. Give the theme a name and tap "Save Theme".</Text>
          <Text style={styles.body}>6. Open "Saved Themes" to edit or delete your themes.</Text>
        </Section>

        <Section title="The five colour roles">
          {ROLES.map((role) => (
            <Text key={role.key} style={styles.body}>
              <Text style={styles.bold}>{role.label}: </Text>
              {role.description}.
            </Text>
          ))}
        </Section>

        <Section title="Offline & local storage">
          <Text style={styles.body}>
            TintStudio works fully offline. It uses no internet, accounts or online databases. The
            starter palettes and your saved themes are stored on this device with AsyncStorage, so
            they are still here after you close and reopen the app.
          </Text>
        </Section>

        <Section title="About the student">
          <Text style={styles.body}>
            <Text style={styles.bold}>Name: </Text>
            {STUDENT_NAME}
          </Text>
          <Text style={styles.body}>
            <Text style={styles.bold}>Index number: </Text>
            {STUDENT_INDEX}
          </Text>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, children }) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16 },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 12,
  },
  heading: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  body: { fontSize: 15, color: COLORS.text, lineHeight: 22, marginBottom: 4 },
  bold: { fontWeight: '700' },
});
