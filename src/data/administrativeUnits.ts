export interface AdministrativeUnit {
  code: string;            // Official GSO Administrative Code (e.g. '01' for Hanoi)
  name: string;            // Official standard Vietnamese name
  shortName: string;       // e.g. 'Hà Nội'
  region: 'north' | 'central' | 'south';
  regionName: string;      // 'Miền Bắc' | 'Miền Trung' | 'Miền Nam'
  subRegion: 'tay_bac' | 'dong_bac' | 'dong_bang_song_hong' | 'bac_trung_bo' | 'nam_trung_bo' | 'tay_nguyen' | 'dong_nam_bo' | 'dong_bang_song_cuu_long';
  subRegionName: string;
  type: 'thanh_pho_tw' | 'tinh';
  center: [number, number]; // [lat, lng]
  historicalNames?: string[];
  historicalNotes?: string;
  islandsOrArchipelagos?: string[];
}

export const VIETNAM_63_ADMINISTRATIVE_UNITS: AdministrativeUnit[] = [
  // ==================== MIỀN BẮC (25 Tỉnh / Thành phố) ====================
  // --- Đồng bằng sông Hồng (10) ---
  {
    code: '01',
    name: 'Thành phố Hà Nội',
    shortName: 'Hà Nội',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'dong_bang_song_hong',
    subRegionName: 'Đồng bằng sông Hồng',
    type: 'thanh_pho_tw',
    center: [21.0285, 105.8542],
    historicalNames: ['Thăng Long', 'Đông Đô', 'Đông Quan', 'Đông Kinh'],
    historicalNotes: 'Hợp nhất tỉnh Hà Tây và huyện Mê Linh (Vĩnh Phúc) vào Hà Nội ngày 01/08/2008 theo Nghị quyết 15/2008/QH12.'
  },
  {
    code: '31',
    name: 'Thành phố Hải Phòng',
    shortName: 'Hải Phòng',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'dong_bang_song_hong',
    subRegionName: 'Đồng bằng sông Hồng',
    type: 'thanh_pho_tw',
    center: [20.8449, 106.6881],
    historicalNames: ['Hải An', 'Cảng Hải Phòng'],
    islandsOrArchipelagos: ['Quần đảo Cát Bà', 'Đảo Bạch Long Vĩ', 'Đảo Hòn Dấu']
  },
  {
    code: '27',
    name: 'Tỉnh Bắc Ninh',
    shortName: 'Bắc Ninh',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'dong_bang_song_hong',
    subRegionName: 'Đồng bằng sông Hồng',
    type: 'tinh',
    center: [21.1861, 106.0763],
    historicalNames: ['Kinh Bắc', 'Hà Bắc (giai đoạn 1962-1996)'],
    historicalNotes: 'Tách từ tỉnh Hà Bắc tái lập tỉnh Bắc Ninh ngày 01/01/1997.'
  },
  {
    code: '30',
    name: 'Tỉnh Hải Dương',
    shortName: 'Hải Dương',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'dong_bang_song_hong',
    subRegionName: 'Đồng bằng sông Hồng',
    type: 'tinh',
    center: [20.9373, 106.3146],
    historicalNames: ['Xứ Đông', 'Hải Hưng (giai đoạn 1968-1996)'],
    historicalNotes: 'Tách từ tỉnh Hải Hưng tái lập ngày 01/01/1997.'
  },
  {
    code: '33',
    name: 'Tỉnh Hưng Yên',
    shortName: 'Hưng Yên',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'dong_bang_song_hong',
    subRegionName: 'Đồng bằng sông Hồng',
    type: 'tinh',
    center: [20.6464, 106.0511],
    historicalNames: ['Phố Hiến', 'Hải Hưng (giai đoạn 1968-1996)'],
    historicalNotes: 'Tách từ tỉnh Hải Hưng tái lập ngày 01/01/1997.'
  },
  {
    code: '34',
    name: 'Tỉnh Thái Bình',
    shortName: 'Thái Bình',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'dong_bang_song_hong',
    subRegionName: 'Đồng bằng sông Hồng',
    type: 'tinh',
    center: [20.4463, 106.3366],
    historicalNames: ['Quê lúa', 'Bố Hải Khẩu'],
    islandsOrArchipelagos: ['Cồn Vành', 'Cồn Đen']
  },
  {
    code: '35',
    name: 'Tỉnh Hà Nam',
    shortName: 'Hà Nam',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'dong_bang_song_hong',
    subRegionName: 'Đồng bằng sông Hồng',
    type: 'tinh',
    center: [20.5845, 105.9221],
    historicalNames: ['Nam Hà (1965-1975)', 'Hà Nam Ninh (1975-1991)', 'Nam Hà (1991-1996)'],
    historicalNotes: 'Tái lập từ tỉnh Nam Hà năm 1997.'
  },
  {
    code: '36',
    name: 'Tỉnh Nam Định',
    shortName: 'Nam Định',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'dong_bang_song_hong',
    subRegionName: 'Đồng bằng sông Hồng',
    type: 'tinh',
    center: [20.4344, 106.1774],
    historicalNames: ['Thiên Trường', 'Hà Nam Ninh (1975-1991)', 'Nam Hà (1991-1996)'],
    historicalNotes: 'Vương triều Trần phát tích tại phủ Thiên Trường.'
  },
  {
    code: '37',
    name: 'Tỉnh Ninh Bình',
    shortName: 'Ninh Bình',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'dong_bang_song_hong',
    subRegionName: 'Đồng bằng sông Hồng',
    type: 'tinh',
    center: [20.2506, 105.9745],
    historicalNames: ['Hoa Lư', 'Hà Nam Ninh (1975-1991)'],
    historicalNotes: 'Cố đô Hoa Lư thời vua Đinh Tiên Hoàng và tiền Lê.'
  },
  {
    code: '26',
    name: 'Tỉnh Vĩnh Phúc',
    shortName: 'Vĩnh Phúc',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'dong_bang_song_hong',
    subRegionName: 'Đồng bằng sông Hồng',
    type: 'tinh',
    center: [21.3609, 105.5474],
    historicalNames: ['Vĩnh Phú (giai đoạn 1968-1996)'],
    historicalNotes: 'Tách từ tỉnh Vĩnh Phú tái lập ngày 01/01/1997.'
  },

  // --- Tây Bắc Bộ (6) ---
  {
    code: '12',
    name: 'Tỉnh Lai Châu',
    shortName: 'Lai Châu',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'tay_bac',
    subRegionName: 'Tây Bắc Bộ',
    type: 'tinh',
    center: [22.3995, 103.4750],
    historicalNotes: 'Chia tách tỉnh Lai Châu cũ thành tỉnh Điện Biên và tỉnh Lai Châu mới năm 2004.'
  },
  {
    code: '11',
    name: 'Tỉnh Điện Biên',
    shortName: 'Điện Biên',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'tay_bac',
    subRegionName: 'Tây Bắc Bộ',
    type: 'tinh',
    center: [21.3845, 103.0160],
    historicalNames: ['Mường Thanh'],
    historicalNotes: 'Thành lập ngày 01/01/2004 trên cơ sở chia tách tỉnh Lai Châu cũ.'
  },
  {
    code: '14',
    name: 'Tỉnh Sơn La',
    shortName: 'Sơn La',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'tay_bac',
    subRegionName: 'Tây Bắc Bộ',
    type: 'tinh',
    center: [21.3273, 103.9004],
    historicalNotes: 'Vùng cao nguyên Mộc Châu và sông Đà huyền thoại.'
  },
  {
    code: '17',
    name: 'Tỉnh Hòa Bình',
    shortName: 'Hòa Bình',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'tay_bac',
    subRegionName: 'Tây Bắc Bộ',
    type: 'tinh',
    center: [20.8172, 105.3376],
    historicalNames: ['Hà Sơn Bình (1975-1991)'],
    historicalNotes: 'Cái nôi của nền Văn hóa Hòa Bình tiền sử.'
  },
  {
    code: '10',
    name: 'Tỉnh Lào Cai',
    shortName: 'Lào Cai',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'tay_bac',
    subRegionName: 'Tây Bắc Bộ',
    type: 'tinh',
    center: [22.4856, 103.9707],
    historicalNames: ['Hoàng Liên Sơn (1975-1991)'],
    historicalNotes: 'Tái lập từ tỉnh Hoàng Liên Sơn tháng 10/1991.'
  },
  {
    code: '15',
    name: 'Tỉnh Yên Bái',
    shortName: 'Yên Bái',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'tay_bac',
    subRegionName: 'Tây Bắc Bộ',
    type: 'tinh',
    center: [21.7168, 104.8976],
    historicalNames: ['Hoàng Liên Sơn (1975-1991)'],
    historicalNotes: 'Tái lập từ tỉnh Hoàng Liên Sơn tháng 10/1991.'
  },

  // --- Đông Bắc Bộ (9) ---
  {
    code: '02',
    name: 'Tỉnh Hà Giang',
    shortName: 'Hà Giang',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'dong_bac',
    subRegionName: 'Đông Bắc Bộ',
    type: 'tinh',
    center: [22.8233, 104.9839],
    historicalNames: ['Hà Tuyên (1975-1991)'],
    historicalNotes: 'Cột cờ Lũng Cú - Điểm cực Bắc thiêng liêng của Tổ quốc.'
  },
  {
    code: '04',
    name: 'Tỉnh Cao Bằng',
    shortName: 'Cao Bằng',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'dong_bac',
    subRegionName: 'Đông Bắc Bộ',
    type: 'tinh',
    center: [22.6666, 106.2639],
    historicalNames: ['Cao Lạng (1975-1978)'],
    historicalNotes: 'Khu di tích Pác Bó và Thác Bản Giốc biên cương.'
  },
  {
    code: '06',
    name: 'Tỉnh Bắc Kạn',
    shortName: 'Bắc Kạn',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'dong_bac',
    subRegionName: 'Đông Bắc Bộ',
    type: 'tinh',
    center: [22.1470, 105.8348],
    historicalNames: ['Bắc Thái (1965-1996)'],
    historicalNotes: 'Tái lập từ tỉnh Bắc Thái ngày 01/01/1997. Danh thắng Hồ Ba Bể.'
  },
  {
    code: '08',
    name: 'Tỉnh Tuyên Quang',
    shortName: 'Tuyên Quang',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'dong_bac',
    subRegionName: 'Đông Bắc Bộ',
    type: 'tinh',
    center: [21.8236, 105.2180],
    historicalNames: ['Hà Tuyên (1975-1991)'],
    historicalNotes: 'Thủ đô Kháng chiến Tân Trào.'
  },
  {
    code: '19',
    name: 'Tỉnh Thái Nguyên',
    shortName: 'Thái Nguyên',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'dong_bac',
    subRegionName: 'Đông Bắc Bộ',
    type: 'tinh',
    center: [21.5942, 105.8482],
    historicalNames: ['Bắc Thái (1965-1996)'],
    historicalNotes: 'Thủ đô Gió ngàn ATK và Đệ nhất danh trà Tân Cương.'
  },
  {
    code: '20',
    name: 'Tỉnh Lạng Sơn',
    shortName: 'Lạng Sơn',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'dong_bac',
    subRegionName: 'Đông Bắc Bộ',
    type: 'tinh',
    center: [21.8537, 106.7615],
    historicalNames: ['Cao Lạng (1975-1978)'],
    historicalNotes: 'Ải Chi Lăng, Chùa Tam Thanh và Đỉnh Mẫu Sơn.'
  },
  {
    code: '24',
    name: 'Tỉnh Bắc Giang',
    shortName: 'Bắc Giang',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'dong_bac',
    subRegionName: 'Đông Bắc Bộ',
    type: 'tinh',
    center: [21.2731, 106.1946],
    historicalNames: ['Hà Bắc (1962-1996)'],
    historicalNotes: 'Tái lập từ tỉnh Hà Bắc ngày 01/01/1997. Chùa Vĩnh Nghiêm, Khởi nghĩa Yên Thế.'
  },
  {
    code: '25',
    name: 'Tỉnh Phú Thọ',
    shortName: 'Phú Thọ',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'dong_bac',
    subRegionName: 'Đông Bắc Bộ',
    type: 'tinh',
    center: [21.3228, 105.2280],
    historicalNames: ['Vĩnh Phú (1968-1996)'],
    historicalNotes: 'Đất Tổ Hùng Vương - Cội nguồn dân tộc Việt Nam.'
  },
  {
    code: '22',
    name: 'Tỉnh Quảng Ninh',
    shortName: 'Quảng Ninh',
    region: 'north',
    regionName: 'Miền Bắc',
    subRegion: 'dong_bac',
    subRegionName: 'Đông Bắc Bộ',
    type: 'tinh',
    center: [20.9505, 107.0734],
    historicalNames: ['Khu Hồng Quảng & Hải Ninh'],
    historicalNotes: 'Thành lập năm 1963 từ việc sáp nhập khu Hồng Quảng và tỉnh Hải Ninh.',
    islandsOrArchipelagos: ['Quần đảo Cô Tô', 'Vân Đồn', 'Bạch Long Vĩ (lịch sử)', 'Vịnh Bái Tử Long']
  },

  // ==================== MIỀN TRUNG (19 Tỉnh / Thành phố) ====================
  // --- Bắc Trung Bộ (6) ---
  {
    code: '38',
    name: 'Tỉnh Thanh Hóa',
    shortName: 'Thanh Hóa',
    region: 'central',
    regionName: 'Miền Trung',
    subRegion: 'bac_trung_bo',
    subRegionName: 'Bắc Trung Bộ',
    type: 'tinh',
    center: [19.8075, 105.7764],
    historicalNames: ['Ái Châu', 'Thanh Hoa'],
    historicalNotes: 'Thành Nhà Hồ (Di sản Thế giới), Lam Kinh quê hương vua Lê Lợi.'
  },
  {
    code: '40',
    name: 'Tỉnh Nghệ An',
    shortName: 'Nghệ An',
    region: 'central',
    regionName: 'Miền Trung',
    subRegion: 'bac_trung_bo',
    subRegionName: 'Bắc Trung Bộ',
    type: 'tinh',
    center: [19.2343, 104.9200],
    historicalNames: ['Nghệ Tĩnh (1975-1991)'],
    historicalNotes: 'Quê hương Chủ tịch Hồ Chí Minh (Kim Liên, Nam Đàn).'
  },
  {
    code: '42',
    name: 'Tỉnh Hà Tĩnh',
    shortName: 'Hà Tĩnh',
    region: 'central',
    regionName: 'Miền Trung',
    subRegion: 'bac_trung_bo',
    subRegionName: 'Bắc Trung Bộ',
    type: 'tinh',
    center: [18.3559, 105.9059],
    historicalNames: ['Nghệ Tĩnh (1975-1991)'],
    historicalNotes: 'Quê hương Đại thi hào Nguyễn Du và Ngã ba Đồng Lộc lịch sử.'
  },
  {
    code: '44',
    name: 'Tỉnh Quảng Bình',
    shortName: 'Quảng Bình',
    region: 'central',
    regionName: 'Miền Trung',
    subRegion: 'bac_trung_bo',
    subRegionName: 'Bắc Trung Bộ',
    type: 'tinh',
    center: [17.5392, 106.3249],
    historicalNames: ['Bình Trị Thiên (1975-1989)'],
    historicalNotes: 'Vương quốc hang động thế giới: Sơn Đoòng, Phong Nha - Kẻ Bàng.'
  },
  {
    code: '45',
    name: 'Tỉnh Quảng Trị',
    shortName: 'Quảng Trị',
    region: 'central',
    regionName: 'Miền Trung',
    subRegion: 'bac_trung_bo',
    subRegionName: 'Bắc Trung Bộ',
    type: 'tinh',
    center: [16.7513, 107.1856],
    historicalNames: ['Bình Trị Thiên (1975-1989)'],
    historicalNotes: 'Thành cổ Quảng Trị, Vĩ tuyến 17 Sông Bến Hải - Cầu Hiền Lương.',
    islandsOrArchipelagos: ['Đảo Cồn Cỏ']
  },
  {
    code: '46',
    name: 'Tỉnh Thừa Thiên Huế',
    shortName: 'Thừa Thiên Huế',
    region: 'central',
    regionName: 'Miền Trung',
    subRegion: 'bac_trung_bo',
    subRegionName: 'Bắc Trung Bộ',
    type: 'tinh',
    center: [16.4637, 107.5909],
    historicalNames: ['Thuận Hóa', 'Phú Xuân', 'Cố đô Huế'],
    historicalNotes: 'Kinh đô triều Nguyễn (1802-1945), Quần thể Di tích Cố đô Huế UNESCO.'
  },

  // --- Duyên hải Nam Trung Bộ (8) ---
  {
    code: '48',
    name: 'Thành phố Đà Nẵng',
    shortName: 'Đà Nẵng',
    region: 'central',
    regionName: 'Miền Trung',
    subRegion: 'nam_trung_bo',
    subRegionName: 'Duyên hải Nam Trung Bộ',
    type: 'thanh_pho_tw',
    center: [16.0544, 108.2022],
    historicalNames: ['Tourane', 'Quảng Nam - Đà Nẵng (1975-1996)'],
    historicalNotes: 'Trở thành thành phố trực thuộc Trung ương ngày 01/01/1997.',
    islandsOrArchipelagos: ['🇻🇳 Quần đảo Hoàng Sa (Huyện Hoàng Sa trực thuộc TP. Đà Nẵng)']
  },
  {
    code: '49',
    name: 'Tỉnh Quảng Nam',
    shortName: 'Quảng Nam',
    region: 'central',
    regionName: 'Miền Trung',
    subRegion: 'nam_trung_bo',
    subRegionName: 'Duyên hải Nam Trung Bộ',
    type: 'tinh',
    center: [15.5994, 108.0000],
    historicalNames: ['Quảng Nam - Đà Nẵng (1975-1996)'],
    historicalNotes: 'Phố cổ Hội An & Thánh địa Mỹ Sơn (2 Di sản Văn hóa Thế giới UNESCO).',
    islandsOrArchipelagos: ['Cù Lao Chàm']
  },
  {
    code: '51',
    name: 'Tỉnh Quảng Ngãi',
    shortName: 'Quảng Ngãi',
    region: 'central',
    regionName: 'Miền Trung',
    subRegion: 'nam_trung_bo',
    subRegionName: 'Duyên hải Nam Trung Bộ',
    type: 'tinh',
    center: [15.1205, 108.7923],
    historicalNames: ['Nghĩa Bình (1975-1989)'],
    historicalNotes: 'Văn hóa Sa Huỳnh cổ đại và Đội Hùng binh Hoàng Sa.',
    islandsOrArchipelagos: ['Đảo Lý Sơn (Huyện đảo Lý Sơn)']
  },
  {
    code: '52',
    name: 'Tỉnh Bình Định',
    shortName: 'Bình Định',
    region: 'central',
    regionName: 'Miền Trung',
    subRegion: 'nam_trung_bo',
    subRegionName: 'Duyên hải Nam Trung Bộ',
    type: 'tinh',
    center: [14.1670, 109.0000],
    historicalNames: ['Phủ Quy Nhơn', 'Nghĩa Bình (1975-1989)'],
    historicalNotes: 'Cái nôi Vương triều Tây Sơn - Hoàng đế Quang Trung Nguyễn Huệ, Miền đất Võ.'
  },
  {
    code: '54',
    name: 'Tỉnh Phú Yên',
    shortName: 'Phú Yên',
    region: 'central',
    regionName: 'Miền Trung',
    subRegion: 'nam_trung_bo',
    subRegionName: 'Duyên hải Nam Trung Bộ',
    type: 'tinh',
    center: [13.0882, 109.0924],
    historicalNames: ['Phú Khánh (1975-1989)'],
    historicalNotes: 'Ghềnh Đá Đĩa kỳ thú và Mũi Điện (Hải đăng Đại Lãnh - Nơi đón bình minh đầu tiên trên đất liền).'
  },
  {
    code: '56',
    name: 'Tỉnh Khánh Hòa',
    shortName: 'Khánh Hòa',
    region: 'central',
    regionName: 'Miền Trung',
    subRegion: 'nam_trung_bo',
    subRegionName: 'Duyên hải Nam Trung Bộ',
    type: 'tinh',
    center: [12.2388, 109.1967],
    historicalNames: ['Phú Khánh (1975-1989)'],
    historicalNotes: 'Xứ trầm hương biển yến. Tháp Bà Ponagar Nha Trang.',
    islandsOrArchipelagos: ['🇻🇳 Quần đảo Trường Sa (Huyện đảo Trường Sa trực thuộc Tỉnh Khánh Hòa)', 'Đảo Bình Ba', 'Hòn Mun']
  },
  {
    code: '58',
    name: 'Tỉnh Ninh Thuận',
    shortName: 'Ninh Thuận',
    region: 'central',
    regionName: 'Miền Trung',
    subRegion: 'nam_trung_bo',
    subRegionName: 'Duyên hải Nam Trung Bộ',
    type: 'tinh',
    center: [11.6842, 108.9132],
    historicalNames: ['Thuận Hải (1976-1991)'],
    historicalNotes: 'Tháp Po Klong Garai và Làng gốm Bàu Trúc (UNESCO Di sản cần bảo vệ khẩn cấp).'
  },
  {
    code: '60',
    name: 'Tỉnh Bình Thuận',
    shortName: 'Bình Thuận',
    region: 'central',
    regionName: 'Miền Trung',
    subRegion: 'nam_trung_bo',
    subRegionName: 'Duyên hải Nam Trung Bộ',
    type: 'tinh',
    center: [11.0904, 108.0722],
    historicalNames: ['Thuận Hải (1976-1991)'],
    historicalNotes: 'Thủ đô resort Mũi Né, Tháp Chăm Poshanu, Đồi Cát Bay.',
    islandsOrArchipelagos: ['Đảo Phú Quý (Huyện đảo Phú Quý)']
  },

  // --- Tây Nguyên (5) ---
  {
    code: '62',
    name: 'Tỉnh Kon Tum',
    shortName: 'Kon Tum',
    region: 'central',
    regionName: 'Miền Trung',
    subRegion: 'tay_nguyen',
    subRegionName: 'Tây Nguyên',
    type: 'tinh',
    center: [14.3533, 108.0000],
    historicalNames: ['Gia Lai - Kon Tum (1975-1991)'],
    historicalNotes: 'Nhà thờ Gỗ Kon Tum hơn 100 năm tuổi và ngã ba Đông Dương Bờ Y.'
  },
  {
    code: '64',
    name: 'Tỉnh Gia Lai',
    shortName: 'Gia Lai',
    region: 'central',
    regionName: 'Miền Trung',
    subRegion: 'tay_nguyen',
    subRegionName: 'Tây Nguyên',
    type: 'tinh',
    center: [13.9833, 108.0000],
    historicalNames: ['Gia Lai - Kon Tum (1975-1991)'],
    historicalNotes: 'Biển Hồ T’Nưng (Đôi mắt Pleiku) và Không gian văn hóa Cồng chiêng Tây Nguyên UNESCO.'
  },
  {
    code: '66',
    name: 'Tỉnh Đắk Lắk',
    shortName: 'Đắk Lắk',
    region: 'central',
    regionName: 'Miền Trung',
    subRegion: 'tay_nguyen',
    subRegionName: 'Tây Nguyên',
    type: 'tinh',
    center: [12.6667, 108.0383],
    historicalNotes: 'Thủ phủ Cà phê Buôn Ma Thuột và Voi Bản Đôn huyền thoại.'
  },
  {
    code: '67',
    name: 'Tỉnh Đắk Nông',
    shortName: 'Đắk Nông',
    region: 'central',
    regionName: 'Miền Trung',
    subRegion: 'tay_nguyen',
    subRegionName: 'Tây Nguyên',
    type: 'tinh',
    center: [12.0000, 107.6833],
    historicalNotes: 'Tách từ tỉnh Đắk Lắk thành lập ngày 01/01/2004. Công viên Địa chất Toàn cầu UNESCO Đắk Nông.'
  },
  {
    code: '68',
    name: 'Tỉnh Lâm Đồng',
    shortName: 'Lâm Đồng',
    region: 'central',
    regionName: 'Miền Trung',
    subRegion: 'tay_nguyen',
    subRegionName: 'Tây Nguyên',
    type: 'tinh',
    center: [11.9404, 108.4583],
    historicalNotes: 'Thành phố ngàn hoa Đà Lạt, Cao nguyên Langbiang (Khu Dự trữ Sinh quyển Thế giới).'
  },

  // ==================== MIỀN NAM (19 Tỉnh / Thành phố) ====================
  // --- Đông Nam Bộ (6) ---
  {
    code: '79',
    name: 'Thành phố Hồ Chí Minh',
    shortName: 'TP. Hồ Chí Minh',
    region: 'south',
    regionName: 'Miền Nam',
    subRegion: 'dong_nam_bo',
    subRegionName: 'Đông Nam Bộ',
    type: 'thanh_pho_tw',
    center: [10.8231, 106.6297],
    historicalNames: ['Sài Gòn - Gia Định', 'Bến Nghé'],
    historicalNotes: 'Được Quốc hội đổi tên thành TP. Hồ Chí Minh ngày 02/07/1976. Địa đạo Củ Chi, Dinh Độc Lập, Chợ Bến Thành.',
    islandsOrArchipelagos: ['Đảo Thạnh An (Huyện Cần Giờ)']
  },
  {
    code: '77',
    name: 'Tỉnh Bà Rịa - Vũng Tàu',
    shortName: 'Bà Rịa - Vũng Tàu',
    region: 'south',
    regionName: 'Miền Nam',
    subRegion: 'dong_nam_bo',
    subRegionName: 'Đông Nam Bộ',
    type: 'tinh',
    center: [10.4962, 107.1685],
    historicalNames: ['Đặc khu Vũng Tàu - Côn Đảo (1979-1991)'],
    historicalNotes: 'Thành lập tỉnh ngày 12/08/1991.',
    islandsOrArchipelagos: ['Quần đảo Côn Đảo (Huyện Côn Đảo - Di tích Nhà tù Côn Đảo)']
  },
  {
    code: '74',
    name: 'Tỉnh Bình Dương',
    shortName: 'Bình Dương',
    region: 'south',
    regionName: 'Miền Nam',
    subRegion: 'dong_nam_bo',
    subRegionName: 'Đông Nam Bộ',
    type: 'tinh',
    center: [11.1667, 106.6667],
    historicalNames: ['Sông Bé (1976-1996)', 'Thủ Dầu Một'],
    historicalNotes: 'Tách từ tỉnh Sông Bé tái lập ngày 01/01/1997. Làng gốm Lái Thiêu, Chùa Bà Thiên Hậu.'
  },
  {
    code: '70',
    name: 'Tỉnh Bình Phước',
    shortName: 'Bình Phước',
    region: 'south',
    regionName: 'Miền Nam',
    subRegion: 'dong_nam_bo',
    subRegionName: 'Đông Nam Bộ',
    type: 'tinh',
    center: [11.7513, 106.9044],
    historicalNames: ['Sông Bé (1976-1996)'],
    historicalNotes: 'Tách từ tỉnh Sông Bé tái lập ngày 01/01/1997. Căn cứ Tà Thiết, Vườn quốc gia Bù Gia Mập.'
  },
  {
    code: '75',
    name: 'Tỉnh Đồng Nai',
    shortName: 'Đồng Nai',
    region: 'south',
    regionName: 'Miền Nam',
    subRegion: 'dong_nam_bo',
    subRegionName: 'Đông Nam Bộ',
    type: 'tinh',
    center: [11.0500, 107.1667],
    historicalNames: ['Biên Hòa', 'Đồng Nai cũ'],
    historicalNotes: 'Vùng đất hơn 325 năm hình thành phát triển. Vườn quốc gia Cát Tiên UNESCO.'
  },
  {
    code: '72',
    name: 'Tỉnh Tây Ninh',
    shortName: 'Tây Ninh',
    region: 'south',
    regionName: 'Miền Nam',
    subRegion: 'dong_nam_bo',
    subRegionName: 'Đông Nam Bộ',
    type: 'tinh',
    center: [11.3103, 106.0983],
    historicalNotes: 'Quần thể Núi Bà Đen (Nóc nhà Nam Bộ) và Tòa Thánh Cao Đài Tây Ninh.'
  },

  // --- Đồng bằng sông Cửu Long (13) ---
  {
    code: '92',
    name: 'Thành phố Cần Thơ',
    shortName: 'Cần Thơ',
    region: 'south',
    regionName: 'Miền Nam',
    subRegion: 'dong_bang_song_cuu_long',
    subRegionName: 'Đồng bằng sông Cửu Long',
    type: 'thanh_pho_tw',
    center: [10.0452, 105.7469],
    historicalNames: ['Tây Đô', 'Hậu Giang cũ'],
    historicalNotes: 'Trở thành thành phố trực thuộc Trung ương ngày 01/01/2004. Chợ nổi Cái Răng, Bến Ninh Kiều.'
  },
  {
    code: '80',
    name: 'Tỉnh Long An',
    shortName: 'Long An',
    region: 'south',
    regionName: 'Miền Nam',
    subRegion: 'dong_bang_song_cuu_long',
    subRegionName: 'Đồng bằng sông Cửu Long',
    type: 'tinh',
    center: [10.6954, 106.2431],
    historicalNotes: 'Cửa ngõ miền Tây Nam Bộ. Làng nổi Tân Lập, Đồng Tháp Mười.'
  },
  {
    code: '82',
    name: 'Tỉnh Tiền Giang',
    shortName: 'Tiền Giang',
    region: 'south',
    regionName: 'Miền Nam',
    subRegion: 'dong_bang_song_cuu_long',
    subRegionName: 'Đồng bằng sông Cửu Long',
    type: 'tinh',
    center: [10.4493, 106.3421],
    historicalNames: ['Mỹ Tho đại phố', 'Định Tường'],
    historicalNotes: 'Di tích Chiến thắng Rạch Gầm - Xoài Mút, Cù lao Thới Sơn.'
  },
  {
    code: '83',
    name: 'Tỉnh Bến Tre',
    shortName: 'Bến Tre',
    region: 'south',
    regionName: 'Miền Nam',
    subRegion: 'dong_bang_song_cuu_long',
    subRegionName: 'Đồng bằng sông Cửu Long',
    type: 'tinh',
    center: [10.2433, 106.3756],
    historicalNames: ['Xứ Dừa', 'Kiến Hòa (trước 1975)'],
    historicalNotes: 'Quê hương phong trào Đồng Khởi 1960 và Danh nhân văn hóa Nguyễn Đình Chiểu.'
  },
  {
    code: '84',
    name: 'Tỉnh Trà Vinh',
    shortName: 'Trà Vinh',
    region: 'south',
    regionName: 'Miền Nam',
    subRegion: 'dong_bang_song_cuu_long',
    subRegionName: 'Đồng bằng sông Cửu Long',
    type: 'tinh',
    center: [9.9347, 106.3455],
    historicalNames: ['Cửu Long (1976-1991)'],
    historicalNotes: 'Hơn 140 ngôi chùa Khmer cổ kính: Chùa Âng, Ao Bà Om, Lễ hội Ok Om Bok.'
  },
  {
    code: '86',
    name: 'Tỉnh Vĩnh Long',
    shortName: 'Vĩnh Long',
    region: 'south',
    regionName: 'Miền Nam',
    subRegion: 'dong_bang_song_cuu_long',
    subRegionName: 'Đồng bằng sông Cửu Long',
    type: 'tinh',
    center: [10.2537, 105.9722],
    historicalNames: ['Long Hồ dinh', 'Cửu Long (1976-1991)'],
    historicalNotes: 'Tái lập từ tỉnh Cửu Long ngày 05/05/1992. Làng gốm Mang Thít (Vương quốc gạch đỏ).'
  },
  {
    code: '87',
    name: 'Tỉnh Đồng Tháp',
    shortName: 'Đồng Tháp',
    region: 'south',
    regionName: 'Miền Nam',
    subRegion: 'dong_bang_song_cuu_long',
    subRegionName: 'Đồng bằng sông Cửu Long',
    type: 'tinh',
    center: [10.5364, 105.6881],
    historicalNames: ['Sa Đéc', 'Đồng Tháp Mười'],
    historicalNotes: 'Làng hoa Sa Đéc trăm năm tuổi, Khu di tích Cụ Phó bảng Nguyễn Sinh Sắc.'
  },
  {
    code: '89',
    name: 'Tỉnh An Giang',
    shortName: 'An Giang',
    region: 'south',
    regionName: 'Miền Nam',
    subRegion: 'dong_bang_song_cuu_long',
    subRegionName: 'Đồng bằng sông Cửu Long',
    type: 'tinh',
    center: [10.5216, 105.1259],
    historicalNames: ['Bảy Núi (Thất Sơn)'],
    historicalNotes: 'Miếu Bà Chúa Xứ Núi Sam Châu Đốc, Di chỉ khảo cổ Văn hóa Óc Eo cổ đại.'
  },
  {
    code: '91',
    name: 'Tỉnh Kiên Giang',
    shortName: 'Kiên Giang',
    region: 'south',
    regionName: 'Miền Nam',
    subRegion: 'dong_bang_song_cuu_long',
    subRegionName: 'Đồng bằng sông Cửu Long',
    type: 'tinh',
    center: [10.0136, 105.0809],
    historicalNames: ['Rạch Giá', 'Hà Tiên thập cảnh'],
    historicalNotes: 'Mạc Cửu khai trấn Hà Tiên. Đảo Ngọc Phú Quốc là đảo lớn nhất Việt Nam.',
    islandsOrArchipelagos: ['Thành phố đảo Phú Quốc', 'Quần đảo Nam Du', 'Quần đảo Bà Lụa', 'Quần đảo Hải Tặc']
  },
  {
    code: '93',
    name: 'Tỉnh Hậu Giang',
    shortName: 'Hậu Giang',
    region: 'south',
    regionName: 'Miền Nam',
    subRegion: 'dong_bang_song_cuu_long',
    subRegionName: 'Đồng bằng sông Cửu Long',
    type: 'tinh',
    center: [9.7844, 105.4701],
    historicalNotes: 'Tách từ tỉnh Cần Thơ cũ thành lập ngày 01/01/2004. Chợ nổi Ngã Bảy Phụng Hiệp.'
  },
  {
    code: '94',
    name: 'Tỉnh Sóc Trăng',
    shortName: 'Sóc Trăng',
    region: 'south',
    regionName: 'Miền Nam',
    subRegion: 'dong_bang_song_cuu_long',
    subRegionName: 'Đồng bằng sông Cửu Long',
    type: 'tinh',
    center: [9.6033, 105.9722],
    historicalNames: ['Hậu Giang cũ (1976-1991)'],
    historicalNotes: 'Chùa Dơi (Chùa Mã Tộc), Chùa Chén Kiểu, Lễ hội Đua ghe Ngo Oóc Om Bóc.'
  },
  {
    code: '95',
    name: 'Tỉnh Bạc Liêu',
    shortName: 'Bạc Liêu',
    region: 'south',
    regionName: 'Miền Nam',
    subRegion: 'dong_bang_song_cuu_long',
    subRegionName: 'Đồng bằng sông Cửu Long',
    type: 'tinh',
    center: [9.2941, 105.7278],
    historicalNames: ['Minh Hải (1976-1996)'],
    historicalNotes: 'Quê hương bản Dạ Cổ Hoài Lang (Nhạc sĩ Cao Văn Lầu), Nhà Công tử Bạc Liêu.'
  },
  {
    code: '96',
    name: 'Tỉnh Cà Mau',
    shortName: 'Cà Mau',
    region: 'south',
    regionName: 'Miền Nam',
    subRegion: 'dong_bang_song_cuu_long',
    subRegionName: 'Đồng bằng sông Cửu Long',
    type: 'tinh',
    center: [9.1769, 105.1500],
    historicalNames: ['Minh Hải (1976-1996)'],
    historicalNotes: 'Điểm cực Nam của Tổ quốc (Mũi Cà Mau, Cột mốc tọa độ Quốc gia GPS 0001).',
    islandsOrArchipelagos: ['Hòn Khoai', 'Hòn Chuối', 'Hòn Đá Bạc']
  }
];

export function getAdministrativeUnitByCode(code: string): AdministrativeUnit | undefined {
  return VIETNAM_63_ADMINISTRATIVE_UNITS.find(u => u.code === code);
}

export function getAdministrativeUnitByName(name: string): AdministrativeUnit | undefined {
  const norm = name.trim().toLowerCase();
  return VIETNAM_63_ADMINISTRATIVE_UNITS.find(u => 
    u.name.toLowerCase().includes(norm) ||
    u.shortName.toLowerCase() === norm ||
    norm.includes(u.shortName.toLowerCase())
  );
}


/**
 * Current provincial-level administrative units after the 2025 reorganization.
 * Official list: 34 units (28 provinces and 6 centrally governed cities).
 * Legacy 63-unit data above is retained for historical references only.
 */
const POST_2025_PROVINCES: Array<{
  code: string; shortName: string; center: [number, number]; type: 'tinh' | 'thanh_pho_tw';
  oldNames: string[];
}> = [
  { code: '01', shortName: 'Hà Nội', center: [21.0285, 105.8542], type: 'thanh_pho_tw', oldNames: ['Hà Nội'] },
  { code: '04', shortName: 'Cao Bằng', center: [22.6667, 106.2500], type: 'tinh', oldNames: ['Cao Bằng'] },
  { code: '08', shortName: 'Tuyên Quang', center: [21.8236, 105.2142], type: 'tinh', oldNames: ['Tuyên Quang', 'Hà Giang'] },
  { code: '11', shortName: 'Điện Biên', center: [21.3860, 103.0230], type: 'tinh', oldNames: ['Điện Biên'] },
  { code: '12', shortName: 'Lai Châu', center: [22.3964, 103.4582], type: 'tinh', oldNames: ['Lai Châu'] },
  { code: '14', shortName: 'Sơn La', center: [21.3270, 103.9140], type: 'tinh', oldNames: ['Sơn La'] },
  { code: '15', shortName: 'Lào Cai', center: [21.7051, 104.8758], type: 'tinh', oldNames: ['Lào Cai', 'Yên Bái'] },
  { code: '19', shortName: 'Thái Nguyên', center: [21.5944, 105.8482], type: 'tinh', oldNames: ['Thái Nguyên', 'Bắc Kạn'] },
  { code: '20', shortName: 'Lạng Sơn', center: [21.8537, 106.7610], type: 'tinh', oldNames: ['Lạng Sơn'] },
  { code: '22', shortName: 'Quảng Ninh', center: [20.9500, 107.0800], type: 'tinh', oldNames: ['Quảng Ninh'] },
  { code: '24', shortName: 'Bắc Ninh', center: [21.2819, 106.1975], type: 'tinh', oldNames: ['Bắc Ninh', 'Bắc Giang'] },
  { code: '25', shortName: 'Phú Thọ', center: [21.3227, 105.4019], type: 'tinh', oldNames: ['Phú Thọ', 'Vĩnh Phúc', 'Hòa Bình'] },
  { code: '31', shortName: 'Hải Phòng', center: [20.8449, 106.6881], type: 'thanh_pho_tw', oldNames: ['Hải Phòng', 'Hải Dương'] },
  { code: '33', shortName: 'Hưng Yên', center: [20.6464, 106.0511], type: 'tinh', oldNames: ['Hưng Yên', 'Thái Bình'] },
  { code: '37', shortName: 'Ninh Bình', center: [20.2506, 105.9745], type: 'tinh', oldNames: ['Ninh Bình', 'Hà Nam', 'Nam Định'] },
  { code: '38', shortName: 'Thanh Hóa', center: [19.8067, 105.7852], type: 'tinh', oldNames: ['Thanh Hóa'] },
  { code: '40', shortName: 'Nghệ An', center: [18.6796, 105.6813], type: 'tinh', oldNames: ['Nghệ An'] },
  { code: '42', shortName: 'Hà Tĩnh', center: [18.3559, 105.8877], type: 'tinh', oldNames: ['Hà Tĩnh'] },
  { code: '44', shortName: 'Quảng Trị', center: [17.4689, 106.6223], type: 'tinh', oldNames: ['Quảng Trị', 'Quảng Bình'] },
  { code: '46', shortName: 'Huế', center: [16.4637, 107.5909], type: 'thanh_pho_tw', oldNames: ['Thừa Thiên Huế', 'Huế'] },
  { code: '48', shortName: 'Đà Nẵng', center: [16.0544, 108.2022], type: 'thanh_pho_tw', oldNames: ['Đà Nẵng', 'Quảng Nam'] },
  { code: '51', shortName: 'Quảng Ngãi', center: [15.1205, 108.7923], type: 'tinh', oldNames: ['Quảng Ngãi', 'Kon Tum'] },
  { code: '52', shortName: 'Gia Lai', center: [13.7820, 109.2190], type: 'tinh', oldNames: ['Gia Lai', 'Bình Định'] },
  { code: '56', shortName: 'Khánh Hòa', center: [12.2388, 109.1967], type: 'tinh', oldNames: ['Khánh Hòa', 'Ninh Thuận'] },
  { code: '66', shortName: 'Đắk Lắk', center: [12.6667, 108.0500], type: 'tinh', oldNames: ['Đắk Lắk', 'Phú Yên'] },
  { code: '68', shortName: 'Lâm Đồng', center: [11.9404, 108.4583], type: 'tinh', oldNames: ['Lâm Đồng', 'Đắk Nông', 'Bình Thuận'] },
  { code: '75', shortName: 'Đồng Nai', center: [10.9574, 106.8427], type: 'tinh', oldNames: ['Đồng Nai', 'Bình Phước'] },
  { code: '79', shortName: 'Hồ Chí Minh', center: [10.7769, 106.7009], type: 'thanh_pho_tw', oldNames: ['TP. Hồ Chí Minh', 'Thành phố Hồ Chí Minh', 'Bình Dương', 'Bà Rịa - Vũng Tàu'] },
  { code: '80', shortName: 'Tây Ninh', center: [11.3100, 106.0983], type: 'tinh', oldNames: ['Tây Ninh', 'Long An'] },
  { code: '82', shortName: 'Đồng Tháp', center: [10.3600, 106.3600], type: 'tinh', oldNames: ['Đồng Tháp', 'Tiền Giang'] },
  { code: '86', shortName: 'Vĩnh Long', center: [10.2537, 105.9722], type: 'tinh', oldNames: ['Vĩnh Long', 'Bến Tre', 'Trà Vinh'] },
  { code: '91', shortName: 'An Giang', center: [10.0125, 105.0809], type: 'tinh', oldNames: ['An Giang', 'Kiên Giang'] },
  { code: '92', shortName: 'Cần Thơ', center: [10.0452, 105.7469], type: 'thanh_pho_tw', oldNames: ['Cần Thơ', 'Hậu Giang', 'Sóc Trăng'] },
  { code: '96', shortName: 'Cà Mau', center: [9.1769, 105.1500], type: 'tinh', oldNames: ['Cà Mau', 'Bạc Liêu'] }
];

export const VIETNAM_34_ADMINISTRATIVE_UNITS: AdministrativeUnit[] = POST_2025_PROVINCES.map((province) => {
  const base = VIETNAM_63_ADMINISTRATIVE_UNITS.find(unit =>
    province.oldNames.some(name => unit.shortName.toLocaleLowerCase('vi') === name.toLocaleLowerCase('vi'))
  );
  const lat = province.center[0];
  const region: AdministrativeUnit['region'] = lat >= 20.5 ? 'north' : lat >= 14.5 ? 'central' : 'south';
  const subRegion: AdministrativeUnit['subRegion'] = region === 'north'
    ? 'dong_bang_song_hong'
    : region === 'central' ? 'nam_trung_bo' : 'dong_nam_bo';
  return {
    code: province.code,
    name: province.type === 'thanh_pho_tw' ? `Thành phố ${province.shortName}` : `Tỉnh ${province.shortName}`,
    shortName: province.shortName,
    region,
    regionName: region === 'north' ? 'Miền Bắc' : region === 'central' ? 'Miền Trung' : 'Miền Nam',
    subRegion: base?.subRegion || subRegion,
    subRegionName: base?.subRegionName || (region === 'north' ? 'Miền Bắc' : region === 'central' ? 'Duyên hải miền Trung' : 'Miền Nam'),
    type: province.type,
    center: province.center,
    historicalNames: province.oldNames.filter(name => name !== province.shortName),
    historicalNotes: province.oldNames.length > 1
      ? `Đơn vị hành chính mới sau sắp xếp năm 2025; kế thừa địa bàn ${province.oldNames.join(', ')}.`
      : undefined
  };
});

export function getCurrentAdministrativeUnitByName(name: string): AdministrativeUnit | undefined {
  const normalized = name.trim().toLocaleLowerCase('vi').replace(/^(tỉnh|thành phố)\s+/, '');
  return VIETNAM_34_ADMINISTRATIVE_UNITS.find(unit =>
    unit.shortName.toLocaleLowerCase('vi') === normalized ||
    unit.name.toLocaleLowerCase('vi') === name.trim().toLocaleLowerCase('vi')
  );
}
