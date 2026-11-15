import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// A tiny website mock-up drawn with the colours of one palette.
// colors = { primary, background, surface, text, buttonText }
// scale makes everything bigger (1 = card thumbnail, 1.5 = details page).
export default function MiniSite({ colors, name = 'Brand', scale = 1 }) {
  const s = (n) => n * scale;
  return (
    <View style={[styles.wrap, { backgroundColor: colors.surface, borderRadius: s(12), padding: s(9) }]}>
      {/* Top bar */}
      <View style={styles.nav}>
        <Text style={{ fontSize: s(8), fontWeight: '800', color: colors.text, flex: 1 }} numberOfLines={1}>
          {name}
        </Text>
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            style={{
              width: s(9),
              height: s(3),
              borderRadius: s(2),
              marginLeft: s(4),
              backgroundColor: colors.text,
              opacity: 0.35,
            }}
          />
        ))}
      </View>

      {/* Hero */}
      <View style={[styles.hero, { marginTop: s(9) }]}>
        <View style={{ flex: 1.2 }}>
          <Text
            style={{ fontSize: s(11), lineHeight: s(13), fontWeight: '900', color: colors.text }}
            numberOfLines={3}
          >
            Build something beautiful
          </Text>
          <View
            style={{
              height: s(3),
              width: '85%',
              borderRadius: s(2),
              marginTop: s(6),
              backgroundColor: colors.text,
              opacity: 0.25,
            }}
          />
          <View
            style={{
              alignSelf: 'flex-start',
              marginTop: s(8),
              paddingHorizontal: s(8),
              paddingVertical: s(4),
              borderRadius: s(6),
              backgroundColor: colors.primary,
            }}
          >
            <Text style={{ fontSize: s(7), fontWeight: '800', color: colors.buttonText }}>Get Started</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            height: s(58),
            marginLeft: s(8),
            borderRadius: s(9),
            backgroundColor: colors.primary,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              position: 'absolute',
              right: -s(8),
              bottom: -s(8),
              width: s(34),
              height: s(34),
              borderRadius: s(17),
              backgroundColor: colors.background,
              opacity: 0.85,
            }}
          />
        </View>
      </View>

      {/* Three feature tiles */}
      <View style={[styles.tiles, { marginTop: s(9) }]}>
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            style={{
              flex: 1,
              height: s(14),
              borderRadius: s(5),
              marginRight: i === 2 ? 0 : s(5),
              backgroundColor: colors.background,
            }}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { overflow: 'hidden' },
  nav: { flexDirection: 'row', alignItems: 'center' },
  hero: { flexDirection: 'row', alignItems: 'center' },
  tiles: { flexDirection: 'row' },
});
