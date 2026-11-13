import AsyncStorage from '@react-native-async-storage/async-storage';
import { STARTER_PALETTES } from '../data/starterPalettes';
import { ROLE_KEYS, isValidHex, copyColors } from '../utils/colors';

// Two separate storage keys: one for starter data, one for the user's themes.
export const PALETTES_KEY = 'tintstudio:starterPalettes';
export const THEMES_KEY = 'tintstudio:savedThemes';

// ---------- Validation helpers ----------

function hasValidColors(colors) {
  return (
    !!colors &&
    typeof colors === 'object' &&
    ROLE_KEYS.every((key) => isValidHex(colors[key]))
  );
}

function isValidPalette(p) {
  return (
    !!p &&
    typeof p.id === 'string' &&
    typeof p.name === 'string' &&
    typeof p.category === 'string' &&
    typeof p.description === 'string' &&
    hasValidColors(p.colors)
  );
}

function isValidTheme(t) {
  return (
    !!t &&
    typeof t.id === 'string' &&
    typeof t.name === 'string' &&
    hasValidColors(t.colors)
  );
}

// ---------- Starter palettes ----------

// Copies the bundled dataset into AsyncStorage ONLY if the key does not exist yet
// (first launch). On later launches it does nothing, so data is never overwritten.
export async function initStorage() {
  const existing = await AsyncStorage.getItem(PALETTES_KEY);
  if (existing === null) {
    await AsyncStorage.setItem(PALETTES_KEY, JSON.stringify(STARTER_PALETTES));
  }
}

// Reads palettes from storage. If the stored data is broken we fall back to the
// bundled list for display only. Starter palettes are not user data, and we do not
// overwrite the stored value here.
export async function getPalettes() {
  const raw = await AsyncStorage.getItem(PALETTES_KEY);
  if (raw !== null) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const valid = parsed.filter(isValidPalette);
        if (valid.length > 0) {
          return valid;
        }
      }
    } catch (error) {
      console.warn('Starter palette data is malformed, using bundled copy.');
    }
  }
  return STARTER_PALETTES;
}

// ---------- Saved themes ----------

// Reads the raw saved-themes array. Throws if the stored text cannot be read,
// so callers never overwrite data they could not understand.
async function readRawThemes() {
  const raw = await AsyncStorage.getItem(THEMES_KEY);
  if (raw === null) {
    return [];
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new Error('Saved themes data is unreadable. Nothing was changed or deleted.');
  }
  if (!Array.isArray(parsed)) {
    throw new Error('Saved themes data has an unexpected format. Nothing was changed or deleted.');
  }
  return parsed;
}

async function writeRawThemes(list) {
  await AsyncStorage.setItem(THEMES_KEY, JSON.stringify(list));
}

// Returns valid themes for display, newest first.
// Invalid entries are skipped when displaying but are kept in storage.
export async function getSavedThemes() {
  const list = await readRawThemes();
  return list.filter(isValidTheme).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
}

function makeUniqueId(list) {
  let id;
  do {
    id = `theme_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  } while (list.some((t) => t && t.id === id));
  return id;
}

export async function createTheme({ name, colors }) {
  const list = await readRawThemes();
  const now = Date.now();
  const theme = {
    id: makeUniqueId(list),
    name: name.trim(),
    colors: copyColors(colors),
    createdAt: now,
    updatedAt: now,
  };
  await writeRawThemes([...list, theme]);
  return theme;
}

// Updates the existing theme with the same id (no duplicate is created).
export async function updateTheme(id, { name, colors }) {
  const list = await readRawThemes();
  const index = list.findIndex((t) => t && t.id === id);
  if (index === -1) {
    throw new Error('This theme no longer exists, so it could not be updated.');
  }
  const updated = {
    ...list[index],
    name: name.trim(),
    colors: copyColors(colors),
    updatedAt: Date.now(),
  };
  const next = [...list];
  next[index] = updated;
  await writeRawThemes(next);
  return updated;
}

export async function deleteTheme(id) {
  const list = await readRawThemes();
  await writeRawThemes(list.filter((t) => !(t && t.id === id)));
}
