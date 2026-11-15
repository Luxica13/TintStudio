import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../theme';

export default function OfflineBadge() {
  return (
    <View style={styles.badge}>
      <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
      <Text style={styles.text}>Available offline</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successSoft,
    borderRadius: RADIUS.pill,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  text: { marginLeft: 6, fontSize: 13, fontWeight: '700', color: COLORS.ink },
});
