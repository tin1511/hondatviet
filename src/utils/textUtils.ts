/**
 * Text utility functions for cleaning, excerpting and processing heritage content.
 */

export function cleanVietnameseText(str: string): string {
  if (!str) return '';
  return str.trim();
}

export function deepCleanVietnamese(str: string): string {
  if (!str) return '';
  return str.trim();
}

export function removeDiacritics(str: string): string {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

export function truncateText(text: string, maxLength: number = 120): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function cleanHtmlTags(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '');
}
