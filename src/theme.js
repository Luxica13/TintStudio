// Design tokens: a calm indigo and lavender look.
// The app UI uses these everywhere. Palette cards and the editor preview
// show the colours of the palette or theme they belong to.

export const COLORS = {
  bg: '#F7F4FF', // page background
  surface: '#FFFFFF',
  field: '#ECE8FB', // search box and soft chips
  ink: '#1E1B4B', // main text
  muted: '#6B6890',
  primary: '#4F46E5', // indigo
  primarySoft: '#E9E5FF',
  border: '#E2DCF7',
  success: '#0F7A4D',
  successSoft: '#D8F5E6',
  danger: '#C62828',
  dangerSoft: '#FDE8E8',
};

export const SPACING = { xs: 4, sm: 8, md: 16, lg: 24 };

export const RADIUS = { sm: 10, md: 14, lg: 20, pill: 999 };

// Soft shadow used on cards.
export const SHADOW = {
  shadowColor: '#4F46E5',
  shadowOpacity: 0.1,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 4 },
  elevation: 2,
};
