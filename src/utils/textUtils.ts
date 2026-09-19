/**
 * Utility to normalize and clean Vietnamese text from Unicode formatting anomalies,
 * decomposed diacritics (NFD -> NFC), stray backticks/accents, and ensure flawless typography.
 */

export function cleanVietnameseText(input: string | undefined | null): string {
  if (!input) return '';

  let text = String(input);

  // Normalize Unicode to NFC (Canonical Composition)
  // This turns decomposed letters + combining marks into proper single Vietnamese glyphs (ví dụ: e + \u0300 -> è)
  text = text.normalize('NFC');

  // Fix common anomalies where combining marks or accents were separated by spaces or backticks
  // Replace stray backticks or accents between letters
  // E.g., "đế ́", "đề`m", "bằ`ng", "dấ`u", "đấ`t", "kiế`n thiế`t", "chắ ́ n", "Hế ́ n", "cồ`n"
  text = text
    .replace(/([\p{L}])\s*[\u0300\u0301\u0303\u0309\u0323\u02CA\u02CB\u00B4`]\s*([\p{L}])/gu, '$1$2')
    .replace(/([\p{L}])\s*[\u0300\u0301\u0303\u0309\u0323\u02CA\u02CB\u00B4`]/gu, '$1')
    .replace(/[`´ˊˋ]/g, '') // remove isolated stray backticks or grave/acute accents in prose text
    .replace(/\s{2,}/g, ' '); // collapse accidental double spaces

  // Re-run NFC normalization to be 100% sure all characters are precomposed
  return text.normalize('NFC').trim();
}

/**
 * Deep cleans all strings inside an object or array (useful for API JSON responses)
 */
export function deepCleanVietnamese<T>(data: T): T {
  if (data === null || data === undefined) {
    return data;
  }

  if (typeof data === 'string') {
    return cleanVietnameseText(data) as unknown as T;
  }

  if (Array.isArray(data)) {
    return data.map(item => deepCleanVietnamese(item)) as unknown as T;
  }

  if (typeof data === 'object') {
    const result: any = {};
    for (const [key, value] of Object.entries(data)) {
      result[key] = deepCleanVietnamese(value);
    }
    return result;
  }

  return data;
}
