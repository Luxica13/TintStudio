// The five colour roles used by every palette, theme and the editor.
export const ROLES = [
  { key: 'primary', label: 'Primary', description: 'Header bar and button background' },
  { key: 'background', label: 'Background', description: 'Main screen background' },
  { key: 'surface', label: 'Surface / Card', description: 'Card background' },
  { key: 'text', label: 'Text', description: 'Headings and body text' },
  { key: 'buttonText', label: 'Button Text', description: 'Text on the header and button' },
];

export const ROLE_KEYS = ROLES.map((role) => role.key);

// Exactly "#" followed by six hex digits, e.g. #9988FF
const HEX_PATTERN = /^#[0-9A-Fa-f]{6}$/;

export function isValidHex(value) {
  return typeof value === 'string' && HEX_PATTERN.test(value);
}

// Returns a clean copy that contains only the five roles, in upper case.
export function copyColors(colors) {
  const result = {};
  ROLE_KEYS.forEach((key) => {
    result[key] = String(colors[key]).toUpperCase();
  });
  return result;
}

export function colorsEqual(a, b) {
  return ROLE_KEYS.every((key) => a[key] === b[key]);
}
