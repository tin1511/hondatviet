import { HeritageItem } from '../types';

export interface DeduplicationReport {
  totalInputRecords: number;
  uniqueRecords: number;
  duplicateGroupsFound: number;
  mergedRecords: number;
  conflictsResolved: number;
  details: {
    duplicateGroupName: string;
    matchedIds: string[];
    retainedId: string;
    reason: string;
  }[];
}

/**
 * Normalizes text for similarity comparison:
 * lowercase, trims, removes punctuation and redundant spaces.
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics for phonetic fuzzy match
    .replace(/[^\w\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Calculates geographical distance in meters between two lat/lng coordinates (Haversine formula).
 */
export function calculateDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  if (!lat1 || !lon1 || !lat2 || !lon2) return Infinity;
  const R = 6371e3; // Earth radius in metres
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Token Jaccard similarity score between 0 and 1.
 */
export function tokenSimilarity(str1: string, str2: string): number {
  const tokens1 = new Set(normalizeText(str1).split(' ').filter(Boolean));
  const tokens2 = new Set(normalizeText(str2).split(' ').filter(Boolean));
  if (tokens1.size === 0 || tokens2.size === 0) return 0;

  let intersection = 0;
  tokens1.forEach(t => {
    if (tokens2.has(t)) intersection++;
  });

  const union = new Set([...tokens1, ...tokens2]).size;
  return intersection / union;
}

/**
 * Merges two heritage records, preserving the highest fidelity fields.
 */
export function mergeHeritageItems(primary: HeritageItem, secondary: HeritageItem): HeritageItem {
  return {
    ...primary,
    // Preserve more detailed name or aliases
    vietnameseName: primary.vietnameseName || secondary.vietnameseName || primary.name,
    englishName: primary.englishName || secondary.englishName,
    // Keep verified coordinates if available
    lat: primary.lat || secondary.lat,
    lng: primary.lng || secondary.lng,
    address: primary.address && primary.address.length > (secondary.address?.length || 0) 
      ? primary.address 
      : secondary.address || primary.address,
    // Choose richer history and significance
    history: primary.history && primary.history.length >= (secondary.history?.length || 0)
      ? primary.history
      : secondary.history || primary.history,
    culturalSignificance: primary.culturalSignificance && primary.culturalSignificance.length >= (secondary.culturalSignificance?.length || 0)
      ? primary.culturalSignificance
      : secondary.culturalSignificance || primary.culturalSignificance,
    // Merge interesting facts and tags without duplicates
    interestingFacts: Array.from(new Set([...(primary.interestingFacts || []), ...(secondary.interestingFacts || [])])),
    tags: Array.from(new Set([...(primary.tags || []), ...(secondary.tags || [])])),
    suggestedQuestions: Array.from(new Set([...(primary.suggestedQuestions || []), ...(secondary.suggestedQuestions || [])])),
    // Preserve higher quality image or historic image
    imageUrl: primary.imageUrl || secondary.imageUrl,
    historicImageUrl: primary.historicImageUrl || secondary.historicImageUrl,
    historicImageYear: primary.historicImageYear || secondary.historicImageYear,
    visitingHours: primary.visitingHours || secondary.visitingHours,
    ticketPrice: primary.ticketPrice || secondary.ticketPrice,
    googleMapsUri: primary.googleMapsUri || secondary.googleMapsUri,
    verifiedStatus: primary.verifiedStatus === 'verified' || secondary.verifiedStatus === 'verified' 
      ? 'verified' 
      : primary.verifiedStatus || secondary.verifiedStatus || 'verified',
    verifiedNote: primary.verifiedNote || secondary.verifiedNote
  };
}

/**
 * Comprehensive deduplication engine for nationwide heritage records.
 * Identifies duplicates by ID collision, name similarity, and spatial proximity.
 */
export function deduplicateHeritages(items: HeritageItem[]): {
  dedupedItems: HeritageItem[];
  report: DeduplicationReport;
} {
  const result: HeritageItem[] = [];
  const processedIds = new Set<string>();
  const report: DeduplicationReport = {
    totalInputRecords: items.length,
    uniqueRecords: 0,
    duplicateGroupsFound: 0,
    mergedRecords: 0,
    conflictsResolved: 0,
    details: []
  };

  for (let i = 0; i < items.length; i++) {
    const current = items[i];
    if (processedIds.has(current.id)) continue;

    let merged = { ...current };
    const duplicatesForThisItem: HeritageItem[] = [];

    for (let j = i + 1; j < items.length; j++) {
      const candidate = items[j];
      if (processedIds.has(candidate.id)) continue;

      let isDuplicate = false;
      let reason = '';

      // Check 1: Identical ID
      if (candidate.id === current.id) {
        isDuplicate = true;
        reason = 'Trùng khớp ID bản ghi';
      }

      // Check 2: Same Province AND high name similarity
      if (!isDuplicate && candidate.province && current.province) {
        const sameProvince = normalizeText(candidate.province) === normalizeText(current.province);
        if (sameProvince) {
          const sim = tokenSimilarity(candidate.name, current.name);
          if (sim >= 0.75) {
            isDuplicate = true;
            reason = `Tên tương đồng cao (${Math.round(sim * 100)}%) trong cùng tỉnh ${current.province}`;
          }
        }
      }

      // Check 3: Geographical proximity (< 300 meters) AND partial name overlap
      if (!isDuplicate && current.lat && current.lng && candidate.lat && candidate.lng) {
        const distMeters = calculateDistanceMeters(current.lat, current.lng, candidate.lat, candidate.lng);
        if (distMeters < 300) {
          const sim = tokenSimilarity(candidate.name, current.name);
          if (sim >= 0.4) {
            isDuplicate = true;
            reason = `Cùng tọa độ địa lý (${Math.round(distMeters)}m) và có từ khóa chung`;
          }
        }
      }

      if (isDuplicate) {
        duplicatesForThisItem.push(candidate);
        processedIds.add(candidate.id);
        merged = mergeHeritageItems(merged, candidate);
        report.mergedRecords++;
        report.conflictsResolved++;
      }
    }

    if (duplicatesForThisItem.length > 0) {
      report.duplicateGroupsFound++;
      report.details.push({
        duplicateGroupName: merged.name,
        matchedIds: [current.id, ...duplicatesForThisItem.map(d => d.id)],
        retainedId: merged.id,
        reason: duplicatesForThisItem.map(d => d.name).join(' | ')
      });
    }

    processedIds.add(current.id);
    result.push(merged);
  }

  report.uniqueRecords = result.length;
  return { dedupedItems: result, report };
}
