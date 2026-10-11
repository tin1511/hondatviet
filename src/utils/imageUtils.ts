/**
 * Utility functions and fallback image resolvers for Vietnam Heritage App
 */
import choBenThanh from '../assets/images/cho_ben_thanh_ai_1790222984463.jpg';
import thacBanGioc from '../assets/images/thac_ban_gioc_ai_1790223003025.jpg';
import nuiBaDen from '../assets/images/nui_ba_den_ai_1790223018722.jpg';
import chuaHuong from '../assets/images/chua_huong_ai_1790223034956.jpg';
import diaDaoCuChi from '../assets/images/dia_dao_cu_chi_ai_1790223048774.jpg';
import muiNePoshanu from '../assets/images/mui_ne_poshanu_ai_1790253193961.jpg';
import phuQuocDinhCau from '../assets/images/phu_quoc_dinh_cau_ai_1790223080472.jpg';
import daiNoiHueAi from '../assets/images/dai_noi_hue_ai_1790253207610.jpg';
import vinhHaLongAi from '../assets/images/vinh_ha_long_ai_1790253180514.jpg';
import trangAnNinhBinhAi from '../assets/images/trang_an_ninh_binh_ai_1790253218816.jpg';
import hoiAnPhoCoAi from '../assets/images/hoi_an_pho_co_ai_1790253393382.jpg';

// Traditional Crafts & Arts AI Images
import gomBatTrang from '../assets/images/gom_bat_trang_ai_1790223652469.jpg';
import tranhDongHo from '../assets/images/tranh_dong_ho_ai_1790223668903.jpg';
import nonLaTayHo from '../assets/images/non_la_tay_ho_ai_1790223686482.jpg';
import luaVanPhuc from '../assets/images/lua_van_phuc_ai_1790223704738.jpg';
import nhaNhacCungDinh from '../assets/images/nha_nhac_cung_dinh_ai_1790223720926.jpg';
import quanHoBacNinh from '../assets/images/quan_ho_bac_ninh_ai_1790223735263.jpg';
import donCaTaiTu from '../assets/images/don_ca_tai_tu_ai_1790223749341.jpg';

export const DEFAULT_HERITAGE_FALLBACK = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80';

export const HERITAGE_PHOTO_MAP: Record<string, string> = {
  'dai-noi-hue': daiNoiHueAi,
  'van-mieu-quoc-tu-giam': 'https://upload.wikimedia.org/wikipedia/commons/3/31/Hanoi_Temple_of_Literature.jpg',
  'pho-co-hoi-an': hoiAnPhoCoAi,
  'trang-an-ninh-binh': trangAnNinhBinhAi,
  'chua-thien-mu': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/ThienMuPagoda.jpg/1280px-ThienMuPagoda.jpg',
  'dinh-doc-lap': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/20190923_Independence_Palace-10.jpg/1280px-20190923_Independence_Palace-10.jpg',
  'thanh-dia-my-son': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/A_far_view_of_the_ruins_at_My_Son_%2830992152933%29.jpg/1280px-A_far_view_of_the_ruins_at_My_Son_%2830992152933%29.jpg',
  'vinh-ha-long': vinhHaLongAi,
  'phong-nha-ke-bang': 'https://upload.wikimedia.org/wikipedia/commons/4/45/Phongnhacave.jpg',
  'chua-bai-dinh': 'https://images.unsplash.com/photo-1598977123418-45f04b01d4ec?auto=format&fit=crop&w=1200&q=80',
  'thap-ba-ponagar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Po_Nagar.jpg/1280px-Po_Nagar.jpg',
  'fansipan-sapa': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Amit%C4%81bha_statue_on_Fansipan_1.jpg/1280px-Amit%C4%81bha_statue_on_Fansipan_1.jpg',
  'cau-vang-bana-hills': 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
  'cho-ben-thanh': choBenThanh,
  'thac-ban-gioc': thacBanGioc,
  'nui-ba-den': nuiBaDen,
  'chua-huong': chuaHuong,
  'dia-dao-cu-chi': diaDaoCuChi,
  'mui-ne-poshanu': muiNePoshanu,
  'phu-quoc-dinh-cau': phuQuocDinhCau
};

export const CRAFTS_ARTS_PHOTO_MAP: Record<string, string> = {
  'gom-bat-trang': gomBatTrang,
  'gom-bat-trang-ai-image': gomBatTrang,
  'tranh-dong-ho': tranhDongHo,
  'tranh-dong-ho-ai-image': tranhDongHo,
  'non-la-tay-ho': nonLaTayHo,
  'non-la-tay-ho-ai-image': nonLaTayHo,
  'lua-van-phuc': luaVanPhuc,
  'lua-van-phuc-ai-image': luaVanPhuc,
  'nha-nhac-cung-dinh': nhaNhacCungDinh,
  'nha-nhac-cung-dinh-ai-image': nhaNhacCungDinh,
  'quan-ho-bac-ninh': quanHoBacNinh,
  'quan-ho-bac-ninh-ai-image': quanHoBacNinh,
  'don-ca-tai-tu': donCaTaiTu,
  'don-ca-tai-tu-ai-image': donCaTaiTu
};

/**
 * Ensures a reliable, CDN-cached image URL for a heritage site.
 * Filters out blocked / broken Wikimedia thumb hashes.
 */
export function getSafeHeritageImageUrl(url?: string, heritageId?: string): string {
  if (heritageId && HERITAGE_PHOTO_MAP[heritageId]) {
    return HERITAGE_PHOTO_MAP[heritageId];
  }

  if (!url || url.trim() === '') {
    return (heritageId && HERITAGE_PHOTO_MAP[heritageId]) || DEFAULT_HERITAGE_FALLBACK;
  }

  return url;
}

/**
 * Ensures a reliable image URL for traditional crafts and arts, mapping placeholder strings
 * to high-fidelity AI-generated local images.
 */
export function getSafeCraftOrArtImageUrl(url?: string, itemId?: string): string {
  if (itemId && CRAFTS_ARTS_PHOTO_MAP[itemId]) {
    return CRAFTS_ARTS_PHOTO_MAP[itemId];
  }
  if (url && CRAFTS_ARTS_PHOTO_MAP[url]) {
    return CRAFTS_ARTS_PHOTO_MAP[url];
  }
  return url || DEFAULT_HERITAGE_FALLBACK;
}

/**
 * Standard error handler for HTML img tags
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackUrl: string = DEFAULT_HERITAGE_FALLBACK
): void {
  const target = event.currentTarget;
  if (target.src !== fallbackUrl) {
    target.src = fallbackUrl;
  }
}
