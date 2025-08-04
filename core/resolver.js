// core/resolver.js
import { parseSWID } from './swidgen.js';

/**
 * SWID URI'sini çözümleyip tipine göre işlem yapar
 * @param {string} uri - SWID URI
 * @returns {Object} - Çözümleme sonucu
 *   {
 *     valid: boolean,
 *     reason?: string,
 *     data?: {
 *       prefix: string,
 *       privacy: string,
 *       encodedId: string,
 *       flags: string[]
 *     },
 *     action?: 'accept' | 'reject' | 'verify' | 'ignore' | 'unknown'
 *   }
 */
export function resolveSWID(uri) {
  const parsed = parseSWID(uri);
  if (!parsed) {
    return { valid: false, reason: 'Invalid SWID format' };
  }

  const { prefix, privacy, encodedId, flags } = parsed;

  // Basit doğrulama
  if (!encodedId || encodedId.length < 10) {
    return { valid: false, reason: 'Encoded ID missing or too short' };
  }

  // İşlem mantığı - prefix ve privacy tipine göre
  switch (prefix) {
    case 'sw': // Normal RESTful ID
    case 'sw;//':
      return {
        valid: true,
        data: parsed,
        action: 'accept'
      };

    case 'sw?': // Doğrulama gerektiren
      if (privacy === 'private') {
        return { valid: true, data: parsed, action: 'verify' };
      }
      if (privacy === 'public' || privacy === 'publical' || privacy === 'publicaling') {
        return { valid: true, data: parsed, action: 'verify' };
      }
      return { valid: false, reason: 'Unknown privacy type for sw? prefix' };

    case 'sw!': // Reddedilen/uyarılı ID
      return { valid: false, data: parsed, action: 'reject' };

    default:
      return { valid: false, reason: 'Unknown prefix' };
  }
}
