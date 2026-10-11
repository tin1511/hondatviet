/**
 * Utilities for removing duplicate tourism/heritage entries and calculating
 * distances between geographic coordinates.
 *
 * The server merges curated heritage records with OpenStreetMap records, so
 * this module deliberately accepts generic records instead of assuming every
 * entry has the same shape.
 */

type GeoRecord = {
  id?: unknown;
  name?: unknown;
  vietnameseName?: unknown;
  province?: unknown;
  address?: unknown;
  lat?: unknown;
  lng?: unknown;
  lon?: unknown;
};

export interface DeduplicationResult<T> {
  uniquePlaces: T[];
  duplicatesRemoved: number;
}

function normalizeText(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function getCoordinates(record: GeoRecord): { lat: number; lng: number } | null {
  const lat = typeof record.lat === 'number' ? record.lat : Number(record.lat);
  const rawLng = record.lng ?? record.lon;
  const lng = typeof rawLng === 'number' ? rawLng : Number(rawLng);

  if (
    !Number.isFinite(lat) ||
    !Number.isFinite(lng) ||
    lat < -90 ||
    lat > 90 ||
    lng < -180 ||
    lng > 180
  ) {
    return null;
  }

  return { lat, lng };
}

/** Return the great-circle distance in metres between two latitude/longitude pairs. */
export function calculateDistanceMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const values = [lat1, lng1, lat2, lng2];
  if (!values.every((value) => Number.isFinite(value))) {
    return Number.POSITIVE_INFINITY;
  }
  if (
    lat1 < -90 || lat1 > 90 ||
    lat2 < -90 || lat2 > 90 ||
    lng1 < -180 || lng1 > 180 ||
    lng2 < -180 || lng2 > 180
  ) {
    return Number.POSITIVE_INFINITY;
  }

  const earthRadiusMeters = 6_371_000;
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const deltaLat = toRadians(lat2 - lat1);
  const deltaLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(deltaLng / 2) ** 2;
  const clampedA = Math.min(1, Math.max(0, a));

  return earthRadiusMeters * 2 * Math.atan2(Math.sqrt(clampedA), Math.sqrt(1 - clampedA));
}

/**
 * Remove repeated records while preserving their original order. Matching IDs
 * are considered identical. Otherwise, matching normalized names are treated
 * as duplicates only when their coordinates are nearby or their location
 * metadata matches, avoiding accidental merges of same-named places in
 * different provinces.
 */
export function deduplicateTourismPlaces<T extends GeoRecord>(
  places: T[],
  nearbyThresholdMeters = 150
): DeduplicationResult<T> {
  if (!Array.isArray(places) || places.length === 0) {
    return { uniquePlaces: [], duplicatesRemoved: 0 };
  }

  const uniquePlaces: T[] = [];
  const seenIds = new Set<string>();
  let duplicatesRemoved = 0;

  for (const place of places) {
    if (!place || typeof place !== 'object') continue;

    const id = typeof place.id === 'string' || typeof place.id === 'number'
      ? String(place.id).trim()
      : '';

    if (id && seenIds.has(id)) {
      duplicatesRemoved += 1;
      continue;
    }

    const name = normalizeText(place.vietnameseName || place.name);
    const province = normalizeText(place.province);
    const address = normalizeText(place.address);
    const coordinates = getCoordinates(place);

    const duplicate = uniquePlaces.some((existing) => {
      const existingName = normalizeText(existing.vietnameseName || existing.name);
      if (!name || name !== existingName) return false;

      const existingCoordinates = getCoordinates(existing);
      if (coordinates && existingCoordinates) {
        return calculateDistanceMeters(
          coordinates.lat,
          coordinates.lng,
          existingCoordinates.lat,
          existingCoordinates.lng
        ) <= nearbyThresholdMeters;
      }

      const existingProvince = normalizeText(existing.province);
      const existingAddress = normalizeText(existing.address);

      if (address && existingAddress) {
        return address === existingAddress;
      }
      return Boolean(province && existingProvince && province === existingProvince);
    });

    if (duplicate) {
      duplicatesRemoved += 1;
      continue;
    }

    uniquePlaces.push(place);
    if (id) seenIds.add(id);
  }

  return { uniquePlaces, duplicatesRemoved };
}
