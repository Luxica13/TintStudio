// Starter dataset: 20 palettes (5 per category).
// Palette names and moods follow the colour combinations listed on Figma's
// "100 color combinations" guide (figma.com/resource-library/color-combinations).
// The guide shows its palettes as images, so the HEX values below are my own
// choices that match each combination's described colours, adjusted so that
// text stays readable on the background, on cards and on buttons.
// Each palette also has a "purposes" list: the kinds of website it suits.
// Each palette has the five editor roles:
// primary, background, surface, text, buttonText.

// Website purposes shown as filter chips on the Palette Library screen.
export const PURPOSES = [
  'Wellness',
  'Fitness',
  'Food',
  'Finance',
  'Travel',
  'Fashion',
  'Education',
  'Gaming & Tech',
  'Creative',
  'Productivity',
  'Shopping',
];

export const STARTER_PALETTES = [
  // ---------- Pastel ----------
  {
    id: 'pal-01',
    name: 'Lavender Fields',
    category: 'Pastel',
    description: 'Cream background with soft lilac accents, calm and dreamy.',
    purposes: ['Wellness', 'Creative'],
    colors: { primary: '#B9A6E8', background: '#FBF7EE', surface: '#FFFFFF', text: '#2E2A45', buttonText: '#2E2A45' },
  },
  {
    id: 'pal-02',
    name: 'Fresh Peach',
    category: 'Pastel',
    description: 'Light peach tones that feel warm, fresh and airy.',
    purposes: ['Food', 'Fashion'],
    colors: { primary: '#F6A98C', background: '#FFF4EC', surface: '#FFFFFF', text: '#4A2B1F', buttonText: '#4A2B1F' },
  },
  {
    id: 'pal-03',
    name: 'Pistachio Dream',
    category: 'Pastel',
    description: 'Muted pastel greens for a peaceful, focused look.',
    purposes: ['Wellness', 'Productivity'],
    colors: { primary: '#A8D5A2', background: '#F3FAF0', surface: '#FFFFFF', text: '#1F3A22', buttonText: '#1F3A22' },
  },
  {
    id: 'pal-04',
    name: 'Cotton Candy Skies',
    category: 'Pastel',
    description: 'Periwinkle blue on pale pink, whimsical like sunset clouds.',
    purposes: ['Education', 'Creative'],
    colors: { primary: '#A9B8F5', background: '#FDF3F9', surface: '#FFFFFF', text: '#2A2D4F', buttonText: '#20244A' },
  },
  {
    id: 'pal-05',
    name: 'Cherry Blossom',
    category: 'Pastel',
    description: 'Soft pinks and clean white for a gentle, fresh feel.',
    purposes: ['Wellness', 'Fashion'],
    colors: { primary: '#F4A6C0', background: '#FFF5F8', surface: '#FFFFFF', text: '#4A2433', buttonText: '#4A2433' },
  },

  // ---------- Minimal ----------
  {
    id: 'pal-06',
    name: 'Salt and Pepper',
    category: 'Minimal',
    description: 'Clean whites and greys for a modern, focused interface.',
    purposes: ['Productivity', 'Shopping'],
    colors: { primary: '#3D3D3D', background: '#F5F5F5', surface: '#FFFFFF', text: '#1C1C1C', buttonText: '#FFFFFF' },
  },
  {
    id: 'pal-07',
    name: 'Harbor Haze',
    category: 'Minimal',
    description: 'Blue-grey pewter with neutral taupe, calm and trustworthy.',
    purposes: ['Finance', 'Productivity'],
    colors: { primary: '#4F6272', background: '#F1EFEC', surface: '#FFFFFF', text: '#26303A', buttonText: '#FFFFFF' },
  },
  {
    id: 'pal-08',
    name: 'Night Sands',
    category: 'Minimal',
    description: 'Sandy background with dark earthy accents and text.',
    purposes: ['Shopping', 'Wellness'],
    colors: { primary: '#5A4A3A', background: '#EFE6D8', surface: '#FAF6EE', text: '#2B2118', buttonText: '#FFFFFF' },
  },
  {
    id: 'pal-09',
    name: 'Cappuccino',
    category: 'Minimal',
    description: 'Warm tan and coffee browns that suit reading and focus.',
    purposes: ['Food', 'Productivity'],
    colors: { primary: '#6F4E37', background: '#E9DFD3', surface: '#F8F3EC', text: '#2A1F17', buttonText: '#FFFFFF' },
  },
  {
    id: 'pal-10',
    name: 'Eucalyptus Grove',
    category: 'Minimal',
    description: 'Dusty sage green with soft grey and off-white.',
    purposes: ['Wellness', 'Productivity'],
    colors: { primary: '#587664', background: '#F4F5F2', surface: '#FFFFFF', text: '#25312B', buttonText: '#FFFFFF' },
  },

  // ---------- Vibrant ----------
  {
    id: 'pal-11',
    name: 'Bubblegum Pop',
    category: 'Vibrant',
    description: 'Bright bubblegum pink on a fresh teal-tinted background.',
    purposes: ['Fashion', 'Creative'],
    colors: { primary: '#D4146F', background: '#E8FAF8', surface: '#FFFFFF', text: '#12303A', buttonText: '#FFFFFF' },
  },
  {
    id: 'pal-12',
    name: 'Tropical Punch',
    category: 'Vibrant',
    description: 'Juicy mango orange with a sunny pineapple background.',
    purposes: ['Travel', 'Food'],
    colors: { primary: '#C2410C', background: '#FFF6DC', surface: '#FFFFFF', text: '#3A1A08', buttonText: '#FFFFFF' },
  },
  {
    id: 'pal-13',
    name: 'Electric Fusion',
    category: 'Vibrant',
    description: 'Confident electric blue that feels energetic and sporty.',
    purposes: ['Fitness', 'Gaming & Tech'],
    colors: { primary: '#1F45E0', background: '#EEF2FF', surface: '#FFFFFF', text: '#0F1B4D', buttonText: '#FFFFFF' },
  },
  {
    id: 'pal-14',
    name: 'Fireworks',
    category: 'Vibrant',
    description: 'Scarlet action colour with deep purple text for drama.',
    purposes: ['Shopping', 'Fashion'],
    colors: { primary: '#C81E1E', background: '#FDF1F1', surface: '#FFFFFF', text: '#2A1038', buttonText: '#FFFFFF' },
  },
  {
    id: 'pal-15',
    name: 'Alchemical Reaction',
    category: 'Vibrant',
    description: 'Bold purple with a light green tint, futuristic and lively.',
    purposes: ['Finance', 'Education'],
    colors: { primary: '#7A2FE0', background: '#F3F8EC', surface: '#FFFFFF', text: '#1D1030', buttonText: '#FFFFFF' },
  },

  // ---------- Dark ----------
  {
    id: 'pal-16',
    name: 'Blue Eclipse',
    category: 'Dark',
    description: 'Midnight blues that are sleek and easy on the eyes.',
    purposes: ['Gaming & Tech', 'Productivity'],
    colors: { primary: '#5B8DEF', background: '#0A1020', surface: '#131B33', text: '#E6ECFA', buttonText: '#06122B' },
  },
  {
    id: 'pal-17',
    name: 'Neon Noir',
    category: 'Dark',
    description: 'Near-black base with a bright neon green highlight.',
    purposes: ['Gaming & Tech', 'Creative'],
    colors: { primary: '#7CF542', background: '#0B0B10', surface: '#16161F', text: '#ECECF4', buttonText: '#0B1A04' },
  },
  {
    id: 'pal-18',
    name: 'Cobalt Sky',
    category: 'Dark',
    description: 'Deep navy with bright cobalt, credible and modern.',
    purposes: ['Gaming & Tech', 'Finance'],
    colors: { primary: '#3560F0', background: '#0B1530', surface: '#12214A', text: '#E8EEFF', buttonText: '#FFFFFF' },
  },
  {
    id: 'pal-19',
    name: 'Under the Moonlight',
    category: 'Dark',
    description: 'Periwinkle over deep indigo for a calm night-time feel.',
    purposes: ['Wellness', 'Education'],
    colors: { primary: '#9AA5F0', background: '#0F1330', surface: '#1A2050', text: '#E9EBFA', buttonText: '#10153A' },
  },
  {
    id: 'pal-20',
    name: 'Gothic Noir',
    category: 'Dark',
    description: 'Charcoal blacks with warm taupe, moody and refined.',
    purposes: ['Fashion', 'Creative'],
    colors: { primary: '#B8A99A', background: '#121212', surface: '#1E1E1E', text: '#EDEAE6', buttonText: '#1A1410' },
  },
];
