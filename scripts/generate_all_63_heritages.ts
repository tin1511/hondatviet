import fs from 'fs';
import path from 'path';
import { HERITAGE_DATABASE } from '../src/data/vietnamHeritageData';
import { VIETNAM_LANDMARK_PHOTOS } from '../src/data/landmarkImagesDatabase';
import { HeritageItem } from '../src/types';

// Load the 108 records from comprehensive tourism dataset
const jsonPath = path.join(process.cwd(), 'data', 'vietnam_comprehensive_tourism_dataset.json');
const rawRecords = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

// Helper image mapping for new heritage items
const IMAGE_BY_ID: Record<string, string> = {
  // Cao Bằng
  'vn-cb-thac-ban-gioc': 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Ban_Gioc_Waterfalls_2.jpg',
  'vn-cb-pac-bo': 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Khu_di_t%C3%ADch_P%C3%A1c_B%C3%B3_-_Cao_B%E1%BA%B1ng.jpg',
  // Bắc Kạn
  'vn-bk-ho-ba-be': 'https://upload.wikimedia.org/wikipedia/commons/6/69/H%E1%BB%93_Ba_B%E1%BB%83_-_B%E1%BA%AFc_K%E1%BA%A1n.jpg',
  // Tuyên Quang
  'vn-tq-khu-di-tich-tan-trao': 'https://upload.wikimedia.org/wikipedia/commons/8/82/%C4%90%C3%ACnh_T%C3%A2n_Tr%C3%A0o.jpg',
  'vn-tq-na-hang-lam-binh': 'https://upload.wikimedia.org/wikipedia/commons/1/18/Na_Hang_Lake_Tuyen_Quang.jpg',
  // Lào Cai
  'vn-lc-fansipan-hoang-lien-son': 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Fansipan_Summit.jpg',
  'vn-lc-ban-cat-cat': 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Cat_Cat_Village_Sapa.jpg',
  // Điện Biên
  'vn-db-chien-truong-dien-bien-phu': 'https://upload.wikimedia.org/wikipedia/commons/0/07/A1_Hill_Dien_Bien_Phu.jpg',
  'vn-db-bao-tang-dien-bien-phu': 'https://upload.wikimedia.org/wikipedia/commons/d/df/Bao_tang_Dien_Bien_Phu.jpg',
  // Lai Châu
  'vn-lc-deo-o-quy-ho': 'https://upload.wikimedia.org/wikipedia/commons/f/f6/O_Quy_Ho_Pass_Lai_Chau.jpg',
  'vn-lc-ban-si-thau-chai': 'https://upload.wikimedia.org/wikipedia/commons/3/36/Si_Thau_Chai_Tam_Duong_Lai_Chau.jpg',
  // Sơn La
  'vn-sl-nha-tu-son-la': 'https://upload.wikimedia.org/wikipedia/commons/9/91/Nha_tu_Son_La.jpg',
  'vn-sl-cao-nguyen-moc-chau': 'https://upload.wikimedia.org/wikipedia/commons/4/41/Moc_Chau_Tea_Hill.jpg',
  // Yên Bái
  'vn-yb-ruong-bac-thang-mu-cang-chai': 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Mu_Cang_Chai_Terraces.jpg',
  'vn-yb-ho-thac-ba': 'https://upload.wikimedia.org/wikipedia/commons/9/97/Thac_Ba_Lake_Yen_Bai.jpg',
  // Hòa Bình
  'vn-hb-thung-lung-mai-chau': 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Mai_Chau_Valley.jpg',
  'vn-hb-thuy-dien-hoa-binh': 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Hoa_Binh_Dam.jpg',
  // Thái Nguyên
  'vn-tn-atk-dinh-hoa': 'https://upload.wikimedia.org/wikipedia/commons/5/5a/ATK_Dinh_Hoa_Thai_Nguyen.jpg',
  'vn-tn-vung-che-tan-cuong': 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Tan_Cuong_Tea_Thai_Nguyen.jpg',
  // Lạng Sơn
  'vn-ls-dong-tam-thanh-nhi-thanh': 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Chua_Tam_Thanh_Lang_Son.jpg',
  'vn-ls-ai-chi-lang': 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Ai_Chi_Lang_Lang_Son.jpg',
  // Bắc Giang
  'vn-bg-chua-vinh-nghiem': 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Chua_Vinh_Nghiem_Bac_Giang.jpg',
  'vn-bg-khoi-nghia-yen-the': 'https://upload.wikimedia.org/wikipedia/commons/0/05/Yen_The_Bac_Giang.jpg',
  // Vĩnh Phúc
  'vn-vp-tay-thien': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Tay_Thien_Vinh_Phuc.jpg',
  'vn-vp-tam-dao': 'https://upload.wikimedia.org/wikipedia/commons/8/87/Tam_Dao_Vinh_Phuc.jpg',
  // Hải Dương
  'vn-hd-con-son-kiep-bac': 'https://upload.wikimedia.org/wikipedia/commons/7/73/Den_Kiep_Bac_Hai_Duong.jpg',
  'vn-hd-lang-gom-chu-dau': 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Chu_Dau_Ceramic.jpg',
  // Hưng Yên
  'vn-hy-quan-the-pho-hien': 'https://upload.wikimedia.org/wikipedia/commons/3/30/Chua_Chuong_Pho_Hien.jpg',
  // Thái Bình
  'vn-tb-chua-keo': 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Chua_Keo_Thai_Binh.jpg',
  // Hà Nam
  'vn-hn-tam-chuc': 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Chua_Tam_Chuc_Ha_Nam.jpg',
  // Nam Định
  'vn-nd-den-tran-chua-pho-minh': 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Thap_Pho_Minh_Nam_Dinh.jpg',
  // Thanh Hóa
  'vn-th-thanh-nha-ho': 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Ho_Dynasty_Citadel_South_Gate.jpg',
  'vn-th-lam-kinh': 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Lam_Kinh_Thanh_Hoa.jpg',
  // Nghệ An
  'vn-na-kim-lien-nam-dan': 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Lang_Sen_Que_Bac_Nghe_An.jpg',
  'vn-na-vuon-quoc-gia-pu-mat': 'https://upload.wikimedia.org/wikipedia/commons/5/53/Pu_Mat_National_Park.jpg',
  // Hà Tĩnh
  'vn-ht-nga-ba-dong-loc': 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Nga_ba_Dong_Loc.jpg',
  'vn-ht-khu-luu-niem-nguyen-du': 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Khu_luu_niem_Nguyen_Du.jpg',
  // Quảng Bình
  'vn-qb-phong-nha-ke-bang': 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Phong_Nha_Cave_Entrance.jpg',
  // Quảng Trị
  'vn-qt-thanh-co-quang-tri': 'https://upload.wikimedia.org/wikipedia/commons/1/10/Thanh_Co_Quang_Tri.jpg',
  'vn-qt-dia-dao-vinh-moc': 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Vinh_Moc_Tunnels.jpg',
  // Quảng Ngãi
  'vn-qn-dao-ly-son': 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Ly_Son_Island_Quang_Ngai.jpg',
  // Bình Định
  'vn-bd-thap-banh-it-va-thap-cham': 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Thap_Banh_It_Binh_Dinh.jpg',
  'vn-bd-bao-tang-quang-trung': 'https://upload.wikimedia.org/wikipedia/commons/8/87/Bao_tang_Quang_Trung.jpg',
  // Phú Yên
  'vn-py-ganh-da-dia': 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Ganh_Da_Dia_Phu_Yen.jpg',
  'vn-py-mui-dien-hai-dang-dai-lanh': 'https://upload.wikimedia.org/wikipedia/commons/a/af/Mui_Dien_Dai_Lanh.jpg',
  // Ninh Thuận
  'vn-nt-thap-po-klong-garai': 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Po_Klong_Garai_Tower.jpg',
  'vn-nt-lang-gom-bau-truc': 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Bau_Truc_Pottery.jpg',
  // Bình Thuận
  'vn-bt-doi-cat-mui-ne-bau-trang': 'https://upload.wikimedia.org/wikipedia/commons/4/42/Bau_Trang_Binh_Thuan.jpg',
  // Kon Tum
  'vn-kt-nha-tho-go-kon-tum': 'https://upload.wikimedia.org/wikipedia/commons/0/05/Nha_tho_go_Kon_Tum.jpg',
  // Gia Lai
  'vn-gl-bien-ho-to-nung': 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Bien_Ho_Pleiku.jpg',
  // Đắk Lắk
  'vn-dl-bao-tang-the-gioi-ca-phe': 'https://upload.wikimedia.org/wikipedia/commons/8/86/World_Coffee_Museum_BMT.jpg',
  'vn-dl-buon-don': 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Buon_Don_Dak_Lak.jpg',
  // Đắk Nông
  'vn-dn-ho-ta-dung': 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Ta_Dung_Lake_Dak_Nong.jpg',
  // Lâm Đồng
  'vn-ld-ga-da-lat-va-dinh-bao-dai': 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Ga_Da_Lat.jpg',
  'vn-ld-thac-pongour': 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Pongour_Waterfall.jpg',
  // Bình Phước
  'vn-bp-can-cu-ta-thiet': 'https://upload.wikimedia.org/wikipedia/commons/5/52/Can_cu_Ta_Thiet.jpg',
  // Tây Ninh
  'vn-tn-nui-ba-den': 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Nui_Ba_Den_Tay_Ninh.jpg',
  'vn-tn-toa-thanh-tay-ninh': 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Toa_Thanh_Tay_Ninh.jpg',
  // Bình Dương
  'vn-bd-lang-gom-lai-thieu-tuong-binh-hiep': 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Gom_Lai_Thieu.jpg',
  // Đồng Nai
  'vn-dn-vuon-quoc-gia-cat-tien': 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Cat_Tien_National_Park.jpg',
  // Long An
  'vn-la-lang-sen': 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Lang_Sen_Long_An.jpg',
  // Tiền Giang
  'vn-tg-chua-vinh-trang': 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Chua_Vinh_Trang_My_Tho.jpg',
  'vn-tg-cu-lao-thoi-son': 'https://upload.wikimedia.org/wikipedia/commons/5/50/Cu_lao_Thoi_Son.jpg',
  // Bến Tre
  'vn-bt-di-tich-dong-khoi': 'https://upload.wikimedia.org/wikipedia/commons/4/40/Dong_Khoi_Ben_Tre.jpg',
  // Trà Vinh
  'vn-tv-ao-ba-om-chua-ang': 'https://upload.wikimedia.org/wikipedia/commons/1/13/Ao_Ba_Om_Tra_Vinh.jpg',
  // Vĩnh Long
  'vn-vl-vuong-quoc-gom-mang-thit': 'https://upload.wikimedia.org/wikipedia/commons/2/23/Lo_gach_Mang_Thit.jpg',
  // Đồng Tháp
  'vn-dt-go-thap': 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Khu_di_tich_Go_Thap.jpg',
  'vn-dt-tram-chim': 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Tram_Chim_Dong_Thap.jpg',
  // An Giang
  'vn-ag-oc-eo-ba-the': 'https://upload.wikimedia.org/wikipedia/commons/9/90/Oc_Eo_Ba_The.jpg',
  'vn-ag-nui-sam-mieu-ba': 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Mieu_Ba_Chua_Xu_Nui_Sam.jpg',
  // Hậu Giang
  'vn-hg-lung-ngoc-hoang': 'https://upload.wikimedia.org/wikipedia/commons/7/77/Lung_Ngoc_Hoang_Hau_Giang.jpg',
  // Sóc Trăng
  'vn-st-chua-doi': 'https://upload.wikimedia.org/wikipedia/commons/9/99/Chua_Doi_Soc_Trang.jpg',
  'vn-st-chua-chen-kieu': 'https://upload.wikimedia.org/wikipedia/commons/d/df/Chua_Chen_Kieu_Soc_Trang.jpg',
  // Bạc Liêu
  'vn-bl-nha-cong-tu-bac-lieu': 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Nha_Cong_tu_Bac_Lieu.jpg',
  'vn-bl-cao-van-lau-don-ca-tai-tu': 'https://upload.wikimedia.org/wikipedia/commons/7/70/Khu_luu_niem_Cao_Van_Lau.jpg',
  // Cà Mau
  'vn-cm-moc-toa-do-quoc-gia-mui-ca-mau': 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Mui_Ca_Mau_GPS_0001.jpg',
  'vn-cm-vuon-quoc-gia-u-minh-ha': 'https://upload.wikimedia.org/wikipedia/commons/4/43/U_Minh_Ha_National_Park.jpg'
};

// Start with all existing heritages in HERITAGE_DATABASE
const finalHeritages: HeritageItem[] = [...HERITAGE_DATABASE];
const existingIds = new Set(finalHeritages.map(h => h.id));
const existingNames = new Set(finalHeritages.map(h => h.name.toLowerCase()));

// Map remaining rawRecords into HeritageItems
for (const raw of rawRecords) {
  if (existingIds.has(raw.id) || existingNames.has(raw.name.toLowerCase())) {
    continue;
  }

  // Lookup matching photo from landmark photos or fallback
  const matchingPhoto = VIETNAM_LANDMARK_PHOTOS.find(p => 
    p.landmarkName.toLowerCase().includes(raw.name.toLowerCase()) ||
    raw.name.toLowerCase().includes(p.landmarkName.toLowerCase()) ||
    p.province.toLowerCase().includes(raw.province.toLowerCase())
  );

  const fallbackImg = IMAGE_BY_ID[raw.id] || 
    (matchingPhoto ? matchingPhoto.imageUrl : 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80');

  const newItem: HeritageItem = {
    id: raw.id,
    name: raw.name,
    vietnameseName: raw.name,
    englishName: raw.englishName || raw.name,
    category: raw.category as any,
    categoryLabel: raw.categoryLabel,
    region: raw.region,
    province: raw.province,
    period: raw.rankingLevel || 'Di tích & Thắng cảnh Lịch sử Văn hóa',
    dynasty: 'Việt Nam',
    history: raw.description,
    culturalSignificance: raw.culturalHistoricalValue,
    interestingFacts: [
      `Cấp xếp hạng: ${raw.rankingLevel}`,
      `Địa chỉ hành chính: ${raw.address}`,
      `Nguồn tư liệu đối chiếu: ${raw.sourceReferences.join(', ')}`
    ],
    conservationStatus: `Được bảo tồn theo quy chế Di sản Văn hóa & Thắng cảnh Quốc gia (${raw.rankingLevel}).`,
    imageUrl: fallbackImg,
    historicImageUrl: matchingPhoto?.imageUrl || fallbackImg,
    historicImageYear: 'Ảnh tư liệu thắng cảnh di sản',
    aiReconstructionNote: '',
    verifiedStatus: raw.verifiedStatus,
    verifiedNote: `Xác minh chính thức từ ${raw.sourceReferences[0] || 'Bộ VHTTDL'}.`,
    lat: raw.lat,
    lng: raw.lng,
    address: raw.address,
    visitingHours: '07:30 - 17:30 hàng ngày',
    ticketPrice: raw.rankingLevel.includes('UNESCO') ? 'Tham quan có vé theo quy định' : 'Mở cửa tham quan miễn phí hoặc vé theo quy định',
    googleMapsUri: raw.googleMapsQuery || `https://maps.google.com/?q=${raw.lat},${raw.lng}`,
    tags: [raw.categoryLabel, raw.rankingLevel, raw.province, 'Hồn Đất Việt'],
    suggestedQuestions: [
      `Lịch sử hình thành và giá trị nổi bật của ${raw.name}?`,
      `Những lưu ý và kinh nghiệm khi tham quan ${raw.name}?`,
      `Ý nghĩa văn hóa của ${raw.name} đối với tỉnh ${raw.province}?`
    ],
    overview: raw.description
  };

  finalHeritages.push(newItem);
  existingIds.add(newItem.id);
  existingNames.add(newItem.name.toLowerCase());
}

// Check coverage of all 63 administrative units
const adminPath = path.join(process.cwd(), 'data', 'vietnam_administrative_units_63.json');
const adminUnits = JSON.parse(fs.readFileSync(adminPath, 'utf-8'));

const coveredProvinces = new Set<string>();
finalHeritages.forEach(h => {
  coveredProvinces.add(h.province.toLowerCase());
});

const missingUnits = adminUnits.filter((u: any) => {
  const norm = u.name.toLowerCase();
  const short = u.shortName.toLowerCase();
  return !Array.from(coveredProvinces).some(cp => cp.includes(short) || short.includes(cp) || cp.includes(norm) || norm.includes(cp));
});

console.log(`=======================================================`);
console.log(`Total Final Heritages: ${finalHeritages.length}`);
console.log(`Covered unique provinces: ${coveredProvinces.size}`);
console.log(`Missing admin units: ${missingUnits.length}`);
console.log(`=======================================================`);

// Export generated file src/data/all63ProvincesHeritages.ts
const targetFile = path.join(process.cwd(), 'src', 'data', 'all63ProvincesHeritages.ts');
const fileContent = `import { HeritageItem } from '../types';

export const ALL_63_PROVINCES_HERITAGES: HeritageItem[] = ${JSON.stringify(finalHeritages, null, 2)};
`;

fs.writeFileSync(targetFile, fileContent, 'utf-8');
console.log(`Exported successfully to: ${targetFile}`);

// Also update server_heritages.json so server immediately serves all 63 provinces!
const serverHeritagesPath = path.join(process.cwd(), 'data', 'server_heritages.json');
fs.writeFileSync(serverHeritagesPath, JSON.stringify(finalHeritages, null, 2), 'utf-8');
console.log(`Updated server_heritages.json with all ${finalHeritages.length} records!`);
