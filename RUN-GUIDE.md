# TintStudio – Run it in VS Code and open it in Expo Go (Windows 11)

## What you need
- Node.js LTS, version 22.13 or newer (check with `node -v`; get it from nodejs.org)
- VS Code
- Expo Go app on your Android phone (Google Play Store)
- Phone and PC on the same Wi-Fi

## Step by step
1. Open VS Code, choose File > Open Folder, and select your project folder (the one that contains `package.json`).
2. Open the terminal: Terminal > New Terminal. If it is PowerShell, switch to Command Prompt using the dropdown beside the + button.
3. Install the packages:
   ```
   npm install
   ```
4. Let Expo set every package to the exact version for your Expo SDK:
   ```
   npx expo install --fix
   ```
5. Optional health check:
   ```
   npx expo-doctor
   ```
6. Start the development server:
   ```
   npx expo start
   ```
   A QR code appears in the terminal.
7. On your phone, open Expo Go, tap "Scan QR code" and scan it. TintStudio opens on the Palette Library.
8. Edit a file in VS Code and save. The app reloads by itself. Stop the server with Ctrl + C.

## If Expo Go says the project is incompatible
This project is set up for Expo SDK 58. Expo Go on the Play Store must support the same SDK. The message tells you which SDK your Expo Go supports. If it says SDK 57:
```
npx expo install expo@^57.0.0 --fix
npx expo start -c
```

## If the QR code does not connect
- Phone and PC must be on the same Wi-Fi (not a guest or campus network that blocks devices).
- Allow Node.js through the Windows firewall for private networks.
- Or use the tunnel (needs a free Expo account): `npx expo login`, then `npx expo start --tunnel`.

## If `npm install` fails
Delete the `node_modules` folder and `package-lock.json`, then run `npm install` again. If it still fails, copy the full error and ask for help.

## Clear old app data
The app copies the starter palettes to storage only on first launch. If you ran an earlier version, clear Expo Go's data once: Android Settings > Apps > Expo Go > Storage > Clear data. This also deletes saved themes.

## Before you submit
- Put your name and index number in `src/screens/AboutScreen.js` and `README.md`.
- Run the manual testing checklist in `GUIDE.md`.
