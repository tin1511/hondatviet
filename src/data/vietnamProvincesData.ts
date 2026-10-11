export interface ProvinceInfo {
  id: string;
  name: string;
  region: 'north' | 'central' | 'south';
  regionName: string;
  lat: number;
  lng: number;
  description: string;
  image: string;
  highlights: string[];
}

export const VIETNAM_PROVINCES: ProvinceInfo[] = [
  // ==================== MIỀN BẮC (15 Đơn vị hành chính) ====================
  {
    id: 'hanoi',
    name: 'Hà Nội',
    region: 'north',
    regionName: 'Miền Bắc',
    lat: 21.0285,
    lng: 105.8542,
    description: 'Thủ đô ngàn năm văn hiến, trung tâm chính trị - văn hóa, lưu giữ Hoàng thành Thăng Long, Văn Miếu - Quốc Tử Giám và Phố cổ.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    highlights: ['Hoàng thành Thăng Long', 'Văn Miếu - Quốc Tử Giám', 'Hồ Hoàn Kiếm & Phố cổ Hà Nội']
  },
  {
    id: 'laichau',
    name: 'Lai Châu',
    region: 'north',
    regionName: 'Miền Bắc',
    lat: 22.3995,
    lng: 103.4750,
    description: 'Miền đất biên cương với những ngọn đèo hiểm trở (Ô Quy Hồ) và bản làng văn hóa độc đáo của đồng bào vùng cao.',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80',
    highlights: ['Đèo Ô Quy Hồ', 'Bản Sì Thâu Chải', 'Cao nguyên Sìn Hồ']
  },
  {
    id: 'dienbien',
    name: 'Điện Biên',
    region: 'north',
    regionName: 'Miền Bắc',
    lat: 21.3845,
    lng: 103.0160,
    description: 'Vùng đất lịch sử vang danh với chiến thắng Điện Biên Phủ lừng lẫy năm châu, chấn động địa cầu.',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
    highlights: ['Đồi A1', 'Hầm Đờ-cat', 'Bảo tàng Chiến thắng Điện Biên Phủ', 'Mường Thanh']
  },
  {
    id: 'sonla',
    name: 'Sơn La',
    region: 'north',
    regionName: 'Miền Bắc',
    lat: 21.3273,
    lng: 103.9004,
    description: 'Cao nguyên Mộc Châu xanh ngát đồi chè, hoa cải, hoa mận và di tích Nhà tù Sơn La lịch sử.',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
    highlights: ['Cao nguyên Mộc Châu', 'Đồi chè trái tim', 'Nhà tù Sơn La', 'Thác Dải Yếm']
  },
  {
    id: 'langson',
    name: 'Lạng Sơn',
    region: 'north',
    regionName: 'Miền Bắc',
    lat: 21.8523,
    lng: 106.7570,
    description: 'Xứ Lạng núi liền núi, pháo đài Đồng Đăng, động Tam Thanh - Nhị Thanh và văn hóa chợ Kỳ Lừa.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    highlights: ['Động Tam Thanh', 'Thành Nhà Mạc', 'Ải Chi Lăng', 'Chợ Kỳ Lừa']
  },
  {
    id: 'quangninh',
    name: 'Quảng Ninh',
    region: 'north',
    regionName: 'Miền Bắc',
    lat: 21.0069,
    lng: 107.2925,
    description: 'Kỳ quan thiên nhiên thế giới Vịnh Hạ Long, quần thể danh thắng Yên Tử và vùng mỏ đất mỏ anh hùng.',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    highlights: ['Vịnh Hạ Long', 'Khu danh thắng Yên Tử', 'Đảo Cô Tô', 'Bảo tàng Quảng Ninh']
  },
  {
    id: 'caobang',
    name: 'Cao Bằng',
    region: 'north',
    regionName: 'Miền Bắc',
    lat: 22.6654,
    lng: 106.2573,
    description: 'Miền non nước hữu tình với thác Bản Giốc hùng vĩ, động Ngườm Ngao và Khu di tích Pác Bó.',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    highlights: ['Thác Bản Giốc', 'Khu di tích Pác Bó', 'Suối Lê-nin', 'Động Ngườm Ngao']
  },
  {
    id: 'tuyenquang',
    name: 'Tuyên Quang (Hợp nhất Hà Giang & Tuyên Quang)',
    region: 'north',
    regionName: 'Miền Bắc',
    lat: 22.1557,
    lng: 105.1500,
    description: 'Vùng hợp nhất giữa Cao nguyên đá Đồng Văn (Hà Giang cũ) và Thủ đô kháng chiến Tân Trào, hồ Na Hang.',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
    highlights: ['Cao nguyên đá Đồng Văn', 'Cột mốc Lũng Cú', 'Khu di tích Tân Trào', 'Hồ Na Hang']
  },
  {
    id: 'laocai',
    name: 'Lào Cai (Hợp nhất Lào Cai & Yên Bái)',
    region: 'north',
    regionName: 'Miền Bắc',
    lat: 22.2000,
    lng: 104.3000,
    description: 'Vùng đất đỉnh Fansipan - nóc nhà Đông Dương, ruộng bậc thang Mù Cang Chải và chợ phiên Sa Pa rực rỡ.',
    image: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80',
    highlights: ['Đỉnh Fansipan Sa Pa', 'Ruộng bậc thang Mù Cang Chải', 'Bản Cát Cát', 'Suối Giàng']
  },
  {
    id: 'thainguyen',
    name: 'Thái Nguyên (Hợp nhất Thái Nguyên & Bắc Kạn)',
    region: 'north',
    regionName: 'Miền Bắc',
    lat: 21.8000,
    lng: 105.8000,
    description: 'Thủ đô gió định ATK Định Hóa, danh trà Tân Cương thơm ngát và hồ Ba Bể kỳ thú.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    highlights: ['Hồ Ba Bể Bắc Kạn', 'Vùng chè Tân Cương', 'Khu di tích ATK Định Hóa', 'Bảo tàng Văn hóa các dân tộc VN']
  },
  {
    id: 'phutho',
    name: 'Phú Thọ (Hợp nhất Phú Thọ, Vĩnh Phúc & Hòa Bình)',
    region: 'north',
    regionName: 'Miền Bắc',
    lat: 21.0500,
    lng: 105.3000,
    description: 'Đất tổ cội nguồn Vua Hùng, khu du lịch Tam Đảo mờ sương và thung lũng Mai Châu hòa bình.',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80',
    highlights: ['Khu di tích Đền Hùng', 'Khu du lịch Tam Đảo', 'Thung lũng Mai Châu', 'Hồ Hòa Bình']
  },
  {
    id: 'bacninh',
    name: 'Bắc Ninh (Hợp nhất Bắc Ninh & Bắc Giang)',
    region: 'north',
    regionName: 'Miền Bắc',
    lat: 21.2500,
    lng: 106.1500,
    description: 'Cái nôi của làn điệu Quan họ mượt mà, chùa Phật Tích và danh thắng Tây Yên Tử linh thiêng.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    highlights: ['Chùa Dâu & Chùa Phật Tích', 'Làng tranh Đông Hồ', 'Khu di tích Tây Yên Tử', 'Đình Thổ Hà']
  },
  {
    id: 'hungyen',
    name: 'Hưng Yên (Hợp nhất Hưng Yên & Thái Bình)',
    region: 'north',
    regionName: 'Miền Bắc',
    lat: 20.7500,
    lng: 106.2500,
    description: 'Phố Hiến xưa sầm uất "thứ nhất Kinh kỳ, thứ nhì Phố Hiến" và biển di tích đền Đồng Châu, chùa Keo.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    highlights: ['Khu di tích Phố Hiến', 'Chùa Keo Thái Bình', 'Đền Mẫu Hưng Yên', 'Khu sinh thái Trà Lý']
  },
  {
    id: 'haiphong',
    name: 'Hải Phòng (Hợp nhất Hải Phòng & Hải Dương - Thành phố TW)',
    region: 'north',
    regionName: 'Miền Bắc',
    lat: 20.8449,
    lng: 106.6881,
    description: 'Thành phố Hoa Phượng Đỏ, cảng biển lớn nhất miền Bắc, quần đảo Cát Bà và danh thắng Côn Sơn - Kiếp Bạc.',
    image: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80',
    highlights: ['Quần đảo Cát Bà', 'Vịnh Lan Hạ', 'Khu di tích Côn Sơn - Kiếp Bạc', 'Đền Tranh Hải Dương']
  },
  {
    id: 'ninhbinh',
    name: 'Ninh Bình (Hợp nhất Ninh Bình, Nam Định & Hà Nam)',
    region: 'north',
    regionName: 'Miền Bắc',
    lat: 20.2500,
    lng: 105.9500,
    description: 'Quần thể danh thắng Tràng An - di sản thế giới kép, Cố đô Hoa Lư, Phủ Giầy và Chùa Tam Chúc.',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    highlights: ['Quần thể Tràng An & Tam Cốc', 'Chùa Tam Chúc Hà Nam', 'Phủ Giầy Nam Định', 'Cố đô Hoa Lư']
  },

  // ==================== MIỀN TRUNG (11 Đơn vị hành chính) ====================
  {
    id: 'thanhoa',
    name: 'Thanh Hóa',
    region: 'central',
    regionName: 'Miền Trung',
    lat: 19.8067,
    lng: 105.7852,
    description: 'Xứ Thanh địa linh nhân kiệt với Thành Nhà Hồ - di sản văn hóa thế giới và bãi biển Sầm Sơn nổi tiếng.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    highlights: ['Thành Nhà Hồ', 'Suối cá thần Cẩm Lương', 'Khu bảo tồn Pù Luông', 'Bãi biển Sầm Sơn']
  },
  {
    id: 'nghean',
    name: 'Nghệ An',
    region: 'central',
    regionName: 'Miền Trung',
    lat: 18.6796,
    lng: 105.6813,
    description: 'Quê hương Chủ tịch Hồ Chí Minh tại Kim Liên, bãi biển Cửa Lò và vườn quốc gia Pù Mát.',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
    highlights: ['Khu di tích Kim Liên (Nam Đàn)', 'Bãi biển Cửa Lò', 'Vườn quốc gia Pù Mát', 'Đảo Chè Thanh Chương']
  },
  {
    id: 'hatinh',
    name: 'Hà Tĩnh',
    region: 'central',
    regionName: 'Miền Trung',
    lat: 18.3427,
    lng: 105.9056,
    description: 'Vùng đất hi học với Khu di tích Đại thi hào Nguyễn Du, Ngã ba Đồng Lộc lịch sử và biển Thiên Cầm.',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80',
    highlights: ['Ngã ba Đồng Lộc', 'Khu lưu niệm Nguyễn Du', 'Biển Thiên Cầm', 'Chùa Hương Tích']
  },
  {
    id: 'quangtri',
    name: 'Quảng Trị (Hợp nhất Quảng Bình & Quảng Trị)',
    region: 'central',
    regionName: 'Miền Trung',
    lat: 17.0000,
    lng: 106.7000,
    description: 'Vương quốc hang động Phong Nha - Kẻ Bàng, Thành cổ Quảng Trị, Đôi bờ Hiền Lương và Địa đạo Vịnh Mốc.',
    image: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80',
    highlights: ['Động Phong Nha & Hang Sơn Đoòng', 'Thành cổ Quảng Trị', 'Đôi bờ Hiền Lương - Bến Hải', 'Địa đạo Vịnh Mốc']
  },
  {
    id: 'hue',
    name: 'Huế (Thành phố trực thuộc Trung ương)',
    region: 'central',
    regionName: 'Miền Trung',
    lat: 16.4637,
    lng: 107.5909,
    description: 'Cố đô triều Nguyễn với Quần thể di tích Cố đô Huế, lăng tẩm hoàng gia và nhã nhạc cung đình.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    highlights: ['Đại Nội Kinh thành Huế', 'Lăng Khải Định & Minh Mạng', 'Chùa Thiên Mụ', 'Sông Hương & Cầu Tràng Tiền']
  },
  {
    id: 'quangnam',
    name: 'Đà Nẵng (Hợp nhất Đà Nẵng & Quảng Nam)',
    region: 'central',
    regionName: 'Miền Trung',
    lat: 16.0544,
    lng: 108.2022,
    description: 'Thành phố đáng sống bậc nhất Việt Nam, trung tâm di sản thế giới Phố cổ Hội An, Thánh địa Mỹ Sơn, Cầu Vàng Bà Nà Hills và Ngũ Hành Sơn.',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    highlights: ['Phố cổ Hội An', 'Thánh địa Mỹ Sơn', 'Cầu Vàng Bà Nà Hills', 'Ngũ Hành Sơn & Bán đảo Sơn Trà']
  },
  {
    id: 'quangngai',
    name: 'Quảng Ngãi (Hợp nhất Quảng Ngãi & Kon Tum)',
    region: 'central',
    regionName: 'Miền Trung',
    lat: 14.8000,
    lng: 108.2000,
    description: 'Đảo ngọc Lý Sơn kỳ vĩ, Măng Đen - Đà Lạt thứ hai giữa đại ngàn Tây Nguyên và Di tích Sơn Mỹ.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    highlights: ['Đảo Lý Sơn', 'Khu du lịch sinh thái Măng Đen', 'Nhà thờ gỗ Kon Tum', 'Khu chứng tích Sơn Mỹ']
  },
  {
    id: 'gialai',
    name: 'Gia Lai (Hợp nhất Gia Lai & Bình Định)',
    region: 'central',
    regionName: 'Miền Trung',
    lat: 13.9800,
    lng: 108.0000,
    description: 'Thành phố biển Quy Nhơn thơ mộng, Tháp Chàm cổ kính kết hợp Biển hồ T’Nưng và văn hóa cồng chiêng Pleiku.',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80',
    highlights: ['Kỳ Co - Eo Gió Quy Nhơn', 'Biển hồ T’Nưng Pleiku', 'Tháp Chàm Bánh Ít', 'Chùa Minh Thành']
  },
  {
    id: 'khanhhoa',
    name: 'Khánh Hòa (Hợp nhất Khánh Hòa & Ninh Thuận)',
    region: 'central',
    regionName: 'Miền Trung',
    lat: 12.2500,
    lng: 109.0500,
    description: 'Vịnh Nha Trang thiên đường biển đảo, Tháp Bà Ponagar và vịnh Vĩnh Hy, tháp Chàm Pau Klong Garai.',
    image: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=800&q=80',
    highlights: ['Vịnh Nha Trang & Hòn Chợ', 'Tháp Bà Ponagar', 'Vịnh Vĩnh Hy Ninh Thuận', 'Tháp Po Klong Garai']
  },
  {
    id: 'daklak',
    name: 'Đắk Lắk (Hợp nhất Đắk Lắk & Phú Yên)',
    region: 'central',
    regionName: 'Miền Trung',
    lat: 13.0000,
    lng: 108.2000,
    description: 'Thủ phủ cà phê Buôn Ma Thuột, Vườn quốc gia Yok Đôn kết hợp Gềnh Đá Đĩa và Bãi Xép Phú Yên.',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
    highlights: ['Ghềnh Đá Đĩa Phú Yên', 'Bảo tàng Thế giới Cà phê', 'Hồ Lắk', 'Mũi Điện Đại Lãnh']
  },
  {
    id: 'lamdong',
    name: 'Lâm Đồng (Hợp nhất Lâm Đồng, Đắk Nông & Bình Thuận)',
    region: 'central',
    regionName: 'Miền Trung',
    lat: 11.5000,
    lng: 107.8000,
    description: 'Thành phố ngàn hoa Đà Lạt, cao nguyên mờ sương kết hợp vịnh biển Mũi Né cát bay và Thác Đray Sáp.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    highlights: ['Thành phố Đà Lạt (Hồ Xuân Hương, Thung lũng Tình Yêu)', 'Đồi cát Mũi Né Bình Thuận', 'Thác Đray Sáp Đắk Nông', 'Tháp Pô Sah Inu']
  },

  // ==================== MIỀN NAM (8 Đơn vị hành chính) ====================
  {
    id: 'tphcm',
    name: 'Thành phố Hồ Chí Minh (Hợp nhất TP.HCM, Bình Dương & BR-VT - TP.TW)',
    region: 'south',
    regionName: 'Miền Nam',
    lat: 10.7769,
    lng: 106.7009,
    description: 'Siêu đô thị kinh tế năng động, Dinh Độc Lập, Bến Nhà Rồng, kết hợp Làng gốm Bình Dương và bãi biển Vũng Tàu.',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
    highlights: ['Dinh Độc Lập & Chợ Bến Thành', 'Địa đạo Củ Chi', 'Bãi biển Vũng Tàu & Bạch Dinh', 'Khu du lịch Đại Nam Bình Dương']
  },
  {
    id: 'dongnai',
    name: 'Đồng Nai (Hợp nhất Đồng Nai & Bình Phước)',
    region: 'south',
    regionName: 'Miền Nam',
    lat: 11.2000,
    lng: 107.0000,
    description: 'Vườn quốc gia Cát Tiên - khu dự trữ sinh quyển thế giới, Hồ Trị An và di tích Sóc Bom Bo Bình Phước.',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    highlights: ['Vườn quốc gia Cát Tiên', 'Hồ Trị An & Thác Trị An', 'Khu di tích Sóc Bom Bo', 'Vườn quốc gia Bù Gia Mập']
  },
  {
    id: 'tayninh',
    name: 'Tây Ninh (Hợp nhất Tây Ninh & Long An)',
    region: 'south',
    regionName: 'Miền Nam',
    lat: 11.0000,
    lng: 106.1000,
    description: 'Núi Bà Đen nóc nhà Nam Bộ, Tòa thánh Cao Đài Tây Ninh kết hợp Làng nổi Tân Lập Long An.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    highlights: ['Núi Bà Đen Tây Ninh', 'Tòa thánh Tây Ninh', 'Làng nổi Tân Lập Long An', 'Khu di tích Vàm Nhựt Tảo']
  },
  {
    id: 'cantho',
    name: 'Cần Thơ (Hợp nhất Cần Thơ, Hậu Giang & Sóc Trăng - TP.TW)',
    region: 'south',
    regionName: 'Miền Nam',
    lat: 10.0452,
    lng: 105.7469,
    description: 'Thủ phủ Tây Đô với chợ nổi Cái Răng, Lung Ngọc Hoàng, Chùa Dơi Sóc Trăng và văn hóa sông nước miệt vườn.',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80',
    highlights: ['Chợ nổi Cái Răng & Bến Ninh Kiều', 'Chùa Dơi Sóc Trăng', 'Khu bảo tồn Lung Ngọc Hoàng', 'Nhà cổ Bình Thủy']
  },
  {
    id: 'vinhlong',
    name: 'Vĩnh Long (Hợp nhất Vĩnh Long, Trà Vinh & Bến Tre)',
    region: 'south',
    regionName: 'Miền Nam',
    lat: 10.1000,
    lng: 106.2000,
    description: 'Xứ dừa Bến Tre trù phú, ao Bà Om Trà Vinh linh thiêng và vương quốc gạch gốm đỏ Mang Thít.',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    highlights: ['Làng dừa Bến Tre', 'Ao Bà Om & Chùa Hang Trà Vinh', 'Lò gạch gốm Mang Thít Vĩnh Long', 'Cù lao An Bình']
  },
  {
    id: 'dongthap',
    name: 'Đồng Tháp (Hợp nhất Đồng Tháp & Tiền Giang)',
    region: 'south',
    regionName: 'Miền Nam',
    lat: 10.4000,
    lng: 105.9000,
    description: 'Vương quốc hoa kiểng Sa Đéc, Vườn quốc gia Tràm Chim kết hợp cù lao Thới Sơn và Chợ nổi Cái Bè Tiền Giang.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    highlights: ['Vườn quốc gia Tràm Chim', 'Làng hoa Sa Đéc', 'Cù lao Thới Sơn Tiền Giang', 'Chùa Vĩnh Tràng']
  },
  {
    id: 'angiang',
    name: 'An Giang (Hợp nhất An Giang & Kiên Giang)',
    region: 'south',
    regionName: 'Miền Nam',
    lat: 10.2000,
    lng: 104.8000,
    description: 'Thất Sơn huyền bí, Miếu Bà Chúa Xứ núi Sam kết hợp Đảo ngọc Phú Quốc và quần đảo Nam Du thiên đường.',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80',
    highlights: ['Miếu Bà Chúa Xứ núi Sam', 'Rừng tràm Trà Sư', 'Đảo ngọc Phú Quốc Kiên Giang', 'Quần đảo Nam Du']
  },
  {
    id: 'camau',
    name: 'Cà Mau (Hợp nhất Cà Mau & Bạc Liêu)',
    region: 'south',
    regionName: 'Miền Nam',
    lat: 9.2000,
    lng: 105.4000,
    description: 'Đất mũi cực Nam Tổ quốc, rừng ngập mặn U Minh kết hợp Nhà công tử Bạc Liêu và cánh đồng điện gió.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    highlights: ['Mũi Cà Mau & Cột mốc tọa độ', 'Rừng quốc gia Mũi Cà Mau', 'Khu nhà Công tử Bạc Liêu', 'Cánh đồng điện gió Bạc Liêu']
  }
];
