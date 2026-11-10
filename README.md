# TintStudio – Offline UI Colour Palette & Theme Designer

Individual React Native (Expo) project for ICA 03.

**Student:** [Your Name Here]  |  **Index No.:** [Your Index Number Here]

## Features
- Palette Library with search by name, category filter (All, Pastel, Minimal, Vibrant, Dark) and website-purpose filter. All three work together.
- Palette Details with colour roles, HEX codes and "Best for" website purposes.
- Theme Editor with a sample dashboard preview, HEX validation (`#RRGGBB`), Apply, Reset and Save.
- Saved Themes: open to edit, delete with confirmation, empty state, data kept after closing the app.
- About & Help screen.
- Loading, no-results, empty and error states.

## Tech
Expo, React Native, JavaScript, React Navigation (native stack), AsyncStorage, React hooks, StyleSheet.

## Run the project
See `RUN-GUIDE.md` for step-by-step instructions (VS Code + Expo Go).

Short version:
```
npm install
npx expo install --fix
npx expo start
```

## Folder structure
```
App.js                      navigation setup
index.js                    app entry point
app.json                    Expo configuration
package.json               dependencies and scripts
src/
  theme.js                  app UI colours, spacing, radius
  data/starterPalettes.js   20 starter palettes + website purposes list
  storage/storage.js        all AsyncStorage reading/writing
  utils/colors.js           colour roles + HEX validation
  components/               ItemCard, SwatchRow, ColorInput, PreviewDashboard,
                            PrimaryButton, EmptyState, LoadingView
  screens/                  PaletteLibrary, PaletteDetails, ThemeEditor,
                            SavedThemes, About
```

## Local storage
| Key | Contents |
| --- | --- |
| `tintstudio:starterPalettes` | The 20 starter palettes. Written once on first launch only. |
| `tintstudio:savedThemes` | The user's saved themes (id, name, colours, timestamps). |

- Starter data is copied to storage only if the key does not exist yet, so it is never overwritten on later launches.
- If saved-theme data cannot be parsed, the app shows an error and refuses to write, so nothing is silently deleted.
- Each new theme gets a unique ID. Editing a saved theme updates it in place.

## Dataset reference
Palette names and moods follow the colour combinations in Figma's "100 color combinations" guide (figma.com/resource-library/color-combinations). The guide shows palettes as images, so the HEX values are my own choices, checked for readable contrast.

## Assignment requirements
| Requirement | Where |
| --- | --- |
| 5+ screens with navigation | `App.js`, `src/screens/` |
| Own dataset, stored locally | `src/data/starterPalettes.js`, `src/storage/storage.js` |
| Dynamic local data | `FlatList` in Library and Saved Themes |
| Search, filter, detail view | `PaletteLibraryScreen`, `PaletteDetailsScreen` |
| Works without internet | No network calls anywhere in the code |
| GitHub repository | Individual repository with regular commits |
