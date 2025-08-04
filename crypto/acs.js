// crypto/acs.js

// Örnek olarak Web Crypto API ile RSA-OAEP anahtar çifti üreten ve
// basit encrypt/decrypt fonksiyonları sağlayan modül.
// Gerçek kullanımda anahtarlar dışarıdan güvenli şekilde gelmeli.

let keyPair = null;

/**
 * Anahtar çifti oluşturur (RSA-OAEP, 2048 bit)
 */
export async function generateKeyPair() {
  keyPair = await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );
  return keyPair;
}

/**
 * Veri şifreler (public key kullanır)
 * @param {string} plainText
 * @returns {Promise<string>} Base64 encoded şifreli veri
 */
export async function encryptWithACS(plainText) {
  if (!keyPair) await generateKeyPair();

  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);

  const encrypted = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    keyPair.publicKey,
    data
  );

  // Base64 encode
  return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}

/**
 * Şifre çözme (private key kullanır)
 * @param {string} base64CipherText
 * @returns {Promise<string>} Açık metin
 */
export async function decryptWithACS(base64CipherText) {
  if (!keyPair) throw new Error("Key pair not generated.");

  const binary = Uint8Array.from(atob(base64CipherText), c => c.charCodeAt(0));

  const decrypted = await crypto.subtle.decrypt(
    { name: "RSA-OAEP" },
    keyPair.privateKey,
    binary
  );

  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}
