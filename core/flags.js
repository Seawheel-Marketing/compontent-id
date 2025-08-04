// core/flags.js

// Kullanılabilir SWID bayrakları
export const FLAGS = [
  'session',
  'device-bound',
  'limited',
  'sandbox',
  'anon',
  'secure',
  'revoked',
  'temporary',
  'read-only',
  'high-anonymity',
];

// Bayrağın geçerli olup olmadığını kontrol eder
export function isValidFlag(flag) {
  return FLAGS.includes(flag);
}

// Flag listesi içinde geçerli olanları filtreler
export function filterValidFlags(flagArray) {
  if (!Array.isArray(flagArray)) return [];
  return flagArray.filter(isValidFlag);
}
