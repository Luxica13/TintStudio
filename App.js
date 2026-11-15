import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import PaletteLibraryScreen from './src/screens/PaletteLibraryScreen';
import PaletteDetailsScreen from './src/screens/PaletteDetailsScreen';
import ThemeEditorScreen from './src/screens/ThemeEditorScreen';
import SavedThemesScreen from './src/screens/SavedThemesScreen';
import AboutScreen from './src/screens/AboutScreen';
import { COLORS } from './src/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Icon names: [active, inactive]
const TAB_ICONS = {
  PaletteLibrary: ['compass', 'compass-outline'],
  SavedThemes: ['bookmark', 'bookmark-outline'],
  About: ['help-circle', 'help-circle-outline'],
};

// The three main screens live in a bottom tab bar.
function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="PaletteLibrary"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '700' },
        tabBarStyle: { backgroundColor: COLORS.bg, borderTopColor: COLORS.border },
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={TAB_ICONS[route.name][focused ? 0 : 1]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="PaletteLibrary" component={PaletteLibraryScreen} options={{ title: 'Explore' }} />
      <Tab.Screen name="SavedThemes" component={SavedThemesScreen} options={{ title: 'Saved' }} />
      <Tab.Screen name="About" component={AboutScreen} options={{ title: 'Help' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator
          initialRouteName="Tabs"
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.bg },
            headerTintColor: COLORS.ink,
            headerTitleStyle: { color: COLORS.ink, fontWeight: '800' },
            headerShadowVisible: false,
            contentStyle: { backgroundColor: COLORS.bg },
          }}
        >
          <Stack.Screen name="Tabs" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="PaletteDetails" component={PaletteDetailsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ThemeEditor" component={ThemeEditorScreen} options={{ title: 'Theme Editor' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
