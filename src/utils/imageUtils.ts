import React from 'react';
import { getVerifiedHeritageImageData } from '../services/imageVerificationService';

export const DEFAULT_HERITAGE_IMAGE = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80';

export function getSafeHeritageImageUrl(url?: string, heritageId?: string, _name?: string): string {
  if (heritageId) {
    const verified = getVerifiedHeritageImageData({ id: heritageId });
    if (verified && verified.imageUrl) {
      return verified.imageUrl;
    }
  }

  if (url && typeof url === 'string' && url.trim().length > 0 && !url.includes('placeholder')) {
    return url;
  }

  if (heritageId) {
    const verified = getVerifiedHeritageImageData({ id: heritageId });
    if (verified && verified.imageUrl) {
      return verified.imageUrl;
    }
  }

  return url || DEFAULT_HERITAGE_IMAGE;
}

export function getSafeCraftOrArtImageUrl(url?: string, _fallback?: any): string {
  if (url && typeof url === 'string' && url.trim().length > 0 && !url.includes('placeholder')) {
    return url;
  }
  return DEFAULT_HERITAGE_IMAGE;
}

export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
  const target = e.currentTarget;
  if (target.src !== DEFAULT_HERITAGE_IMAGE) {
    target.src = DEFAULT_HERITAGE_IMAGE;
  }
}
