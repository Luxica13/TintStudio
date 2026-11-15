# TintStudio – Offline UI Colour Palette & Theme Designer

TintStudio is an offline app for exploring colour palettes and customising themes for websites and apps.

**Name:** Luxica Pratheepan  
**Index No.:** 2022/ICT/118

## Features

- **Explore:** Browse palettes using a name search, category filter, and website-type filter. Search and filters can be used together.
- **Palette Details:** View a colour strip, colour roles, HEX codes, and suggested website purposes.
- **Theme Editor:** Customise colours with `#RRGGBB` HEX validation, preview them on a sample dashboard, and apply, reset, or save changes.
- **Saved Themes:** Open themes for editing or delete them with confirmation. Saved themes remain available after closing the app.
- **About & Help:** Find information about the app and how to use it.
- Loading, no-results, empty, and error states provide feedback while using the app.

## Design

The interface uses indigo and lavender colours, rounded cards, palette previews, and bottom-tab navigation for Explore, Saved, and Help. Each palette card includes a small website preview using that palette’s colours.

The interface is built with React Native views and `StyleSheet`, with `@expo/vector-icons` for icons.

## Technologies

- Expo and React Native
- JavaScript and React hooks
- React Navigation: native stack and bottom tabs
- AsyncStorage for local data
- React Native `StyleSheet` for styling

## Run the project

Install Node.js and Expo Go before starting. Open a terminal in the project folder containing `package.json`.

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Start the Expo development server:

   ```bash
   npx expo start
   ```

3. Connect your phone and computer to the same Wi-Fi network, then scan the QR code using Expo Go.

Keep the development server running while testing the app. Palette browsing, theme editing, and saved themes work offline; connecting to the Expo development server is part of this development setup.

## Project structure

| File or folder | Purpose |
| --- | --- |
| `App.js` | Navigation setup |
| `index.js` | App entry point |
| `app.json` | Expo configuration |
| `package.json` | Dependencies and scripts |
| `src/theme.js` | Shared colours, corner radii, and shadows |
| `src/data/starterPalettes.js` | 20 starter palettes and website purposes |
| `src/storage/storage.js` | AsyncStorage operations |
| `src/utils/colors.js` | Colour roles and HEX validation |
| `src/components/` | Reusable cards, filters, buttons, colour inputs, previews, and feedback views |
| `src/screens/` | Palette Library, Palette Details, Theme Editor, Saved Themes, and About screens |

## Local storage

The app uses AsyncStorage to keep the palette dataset and saved themes on the device.

| Storage key | Contents |
| --- | --- |
| `tintstudio:starterPalettes` | The 20 starter palettes |
| `tintstudio:savedThemes` | Saved themes, including IDs, names, colours, and timestamps |

Users can save customised themes, reopen them for editing, and delete themes they no longer need.

## Dataset reference

Palette names and moods are inspired by Figma’s [100 color combinations guide](https://www.figma.com/resource-library/color-combinations/). The palette HEX values are defined in the local dataset.

## Assignment requirements

| Requirement | Implementation |
| --- | --- |
| Five or more screens with navigation | `App.js` and `src/screens/` |
| Own dataset stored locally | `src/data/starterPalettes.js` and `src/storage/storage.js` |
| Dynamic local data | `FlatList` in Palette Library and Saved Themes |
| Search, filter, and detail view | Palette Library and Palette Details screens |
| Offline functionality | Palette browsing, theme editing, and saved themes work offline |
| GitHub repository | Individual project with version control and branch-based development |
