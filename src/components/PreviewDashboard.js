import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// A fixed sample mobile dashboard. This is the ONLY place that uses the edited colours.
// colors = { primary, background, surface, text, buttonText }
export default function PreviewDashboard({ colors }) {
  return (
    <View style={[styles.phone, { backgroundColor: colors.background }]}>
      {/* Header uses Primary + Button Text */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={[styles.headerTitle, { color: colors.buttonText }]}>My Dashboard</Text>
      </View>

      <View style={styles.body}>
        <Text style={[styles.greeting, { color: colors.text }]}>Good morning, Alex</Text>

        {/* Card uses Surface + Text */}
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Today’s Summary</Text>
          <Text style={[styles.cardText, { color: colors.text }]}>
            You have 3 tasks to finish and 1 meeting this afternoon.
          </Text>

          {/* Button uses Primary + Button Text */}
          <View style={[styles.button, { backgroundColor: colors.primary }]}>
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>Add Task</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  phone: { borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#E2DCF7' },
  header: { paddingVertical: 16, paddingHorizontal: 16 },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  body: { padding: 16 },
  greeting: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  card: { borderRadius: 12, padding: 16 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  cardText: { fontSize: 14, lineHeight: 20, marginBottom: 16 },
  button: { paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  buttonText: { fontSize: 15, fontWeight: '700' },
});
