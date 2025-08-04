// core/swidgen.js

/**
 * SWID URI formatlayıcı
 * @param {string} privacy - Gizlilik seviyesi ('priv', 'pub', 'anon', 'blind', vs.)
 * @param {string} encodedId - Şifrelenmiş veya hash’lenmiş ID değeri
 * @param {Array<string>} flags - Opsiyonel, bayraklar ['session', 'hardware-bound', ...]
 * @param {string} prefix - URI ön eki ('sw', 'sw?', 'sw!', 'sw;//'), default 'sw'
 * @returns {string} - Formatlanmış SWID URI'si
 */
export function formatSWID(privacy, encodedId, flags = [], prefix = 'sw') {
  if (typeof privacy !== 'string' || !privacy.length) {
    throw new Error('Invalid privacy level');
  }
  if (typeof encodedId !== 'string' || !encodedId.length) {
    throw new Error('Invalid encoded ID');
  }
  if (!Array.isArray(flags)) {
    throw new Error('Flags must be an array');
  }
  if (!['sw', 'sw?', 'sw!', 'sw;//'].includes(prefix)) {
    throw new Error('Invalid URI prefix');
  }

  const baseUri = `${prefix}://${privacy}:${encodedId}`;
  if (flags.length > 0) {
    return `${baseUri}.flags[${flags.join(',')}]`;
  }
  return baseUri;
}
export function parseSWID(uri) {
  if (typeof uri !== 'string') return null;
  const regex = /^(sw|sw\?|sw!|sw;//):\/\/([^:]+):([^\.]+)(?:\.flags\[([^\]]*)\])?$/;
  const match = uri.match(regex);
  if (!match) return null;

  const [, prefix, privacy, encodedId, flagsRaw] = match;
  const flags = flagsRaw ? flagsRaw.split(',').map(f => f.trim()).filter(Boolean) : [];

  return {
    prefix,
    privacy,
    encodedId,
    flags,
  };
}
