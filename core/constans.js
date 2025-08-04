// core/constants.js

// SWID URI ön ekleri
export const PREFIXES = [
  'sw',    // Normal ID
  'sw?',   // Doğrulama gereken ID
  'sw!',   // Uyarı/ret ID
  'sw;//', // REST ID
];

// Gizlilik seviyeleri (privacy types)
export const PRIVACY_LEVELS = [
  'private',
  'public',
  'publical',     // public alias
  'publicaling',  // public alias extended
  'ignored_key',
  'user',
  'device',
  'anon',
  'blind',
  'expired',
  'denied',
];

// SWID türleri için kolay erişim objesi (kısaltmalar vs.)
export const SWID_TYPES = {
  PRIVATE: 'private',
  PUBLIC: 'public',
  IGNORED_KEY: 'ignored_key',
  USER: 'user',
  DEVICE: 'device',
  ANON: 'anon',
};
