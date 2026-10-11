export interface LandmarkPhotoItem {
  id: string;
  title: string;
  cityName: string;
  province: string;
  landmarkName: string;
  tagline: string;
  imageUrl: string;
  thumbUrl: string;
  lat: number;
  lng: number;
  tags: string[];
  photographer: string;
  source: string;
}

export const VIETNAM_LANDMARK_PHOTOS: LandmarkPhotoItem[] = [
  // HÀ NỘI
  {
    id: 'hn-van-mieu',
    title: 'Khuê Văn Các - Văn Miếu Quốc Tử Giám',
    cityName: 'Hà Nội',
    province: 'Hà Nội',
    landmarkName: 'Văn Miếu - Quốc Tử Giám Hà Nội',
    tagline: 'Thủ đô ngàn năm văn hiến, biểu tượng hiếu học và trường đại học đầu tiên',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Hanoi_Temple_of_Literature.jpg',
    thumbUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Hanoi_Temple_of_Literature.jpg/640px-Hanoi_Temple_of_Literature.jpg',
    lat: 21.0293,
    lng: 105.8361,
    tags: ['Hà Nội', 'Văn Miếu', 'Quốc Tử Giám', 'Khuê Văn Các', 'Bia Tiến Sĩ', 'Lịch sử', 'Di tích'],
    photographer: 'Wikimedia Heritage',
    source: 'Wikimedia Commons / Di tích Quốc gia'
  },
  {
    id: 'hn-khue-van-cac-close',
    title: 'Khuê Văn Các - Gác Sao Khuê Soi Bóng Giếng Thiên Quang',
    cityName: 'Hà Nội',
    province: 'Hà Nội',
    landmarkName: 'Khuê Văn Các - Văn Miếu Hà Nội',
    tagline: 'Biểu tượng chính thức của Thủ đô Hà Nội với kiến trúc gỗ sơn son tinh xảo',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Constellation_of_Literature_pavilion_%28Temple_of_Literature%2C_Hanoi%29.jpg',
    thumbUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Constellation_of_Literature_pavilion_%28Temple_of_Literature%2C_Hanoi%29.jpg/640px-Constellation_of_Literature_pavilion_%28Temple_of_Literature%2C_Hanoi%29.jpg',
    lat: 21.0287,
    lng: 105.8355,
    tags: ['Hà Nội', 'Khuê Văn Các', 'Văn Miếu', 'Giếng Thiên Quang', 'Sao Khuê'],
    photographer: 'Nhiếp ảnh gia Di sản',
    source: 'Wikimedia Commons'
  },
  {
    id: 'hn-ho-guom',
    title: 'Tháp Rùa - Trái Tim Hồ Hoàn Kiếm',
    cityName: 'Hà Nội',
    province: 'Hà Nội',
    landmarkName: 'Hồ Hoàn Kiếm & Tháp Rùa',
    tagline: 'Trái tim của Thủ đô với truyền thuyết vua Lê Lợi trả gươm báu cho Rùa vàng',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Thap_Rua.jpg',
    thumbUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Thap_Rua.jpg/640px-Thap_Rua.jpg',
    lat: 21.0285,
    lng: 105.8542,
    tags: ['Hà Nội', 'Hồ Gươm', 'Tháp Rùa', 'Hoàn Kiếm', 'Đền Ngọc Sơn'],
    photographer: 'Wikimedia Explorer',
    source: 'Wikimedia Commons'
  },
  {
    id: 'hn-cau-the-huc',
    title: 'Cầu Thê Húc Màu Son & Đền Ngọc Sơn',
    cityName: 'Hà Nội',
    province: 'Hà Nội',
    landmarkName: 'Cầu Thê Húc & Đền Ngọc Sơn',
    tagline: 'Cây cầu màu đỏ son cong cong dẫn lối vào chốn linh thiêng Đền Ngọc Sơn',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/The_Huc_Bridge.jpg',
    thumbUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/The_Huc_Bridge.jpg/640px-The_Huc_Bridge.jpg',
    lat: 21.0307,
    lng: 105.8524,
    tags: ['Hà Nội', 'Cầu Thê Húc', 'Đền Ngọc Sơn', 'Hồ Hoàn Kiếm'],
    photographer: 'Wikimedia Heritage',
    source: 'Wikimedia Commons'
  },
  {
    id: 'hn-chua-mot-cot',
    title: 'Chùa Một Cột (Diên Hựu Tự) Tựa Bông Sen Nở',
    cityName: 'Hà Nội',
    province: 'Hà Nội',
    landmarkName: 'Chùa Một Cột Hà Nội',
    tagline: 'Bông sen đá thanh khiết vươn lên giữa hồ Linh Chiểu thời Lý',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/90/One_Pillar_Pagoda_Hanoi.jpg',
    thumbUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/One_Pillar_Pagoda_Hanoi.jpg/640px-One_Pillar_Pagoda_Hanoi.jpg',
    lat: 21.0358,
    lng: 105.8335,
    tags: ['Hà Nội', 'Chùa Một Cột', 'Diên Hựu Tự', 'Thời Lý', 'Kiến trúc Phật giáo'],
    photographer: 'Wikimedia Commons',
    source: 'Wikimedia Commons'
  },
  {
    id: 'hn-pho-co',
    title: 'Phố Cổ Hà Nội 36 Phố Phường',
    cityName: 'Hà Nội',
    province: 'Hà Nội',
    landmarkName: 'Phố Cổ Hà Nội & Cầu Long Biên',
    tagline: 'Nét rêu phong cổ kính đan xen nhịp sống sôi động của người Tràng An',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
    lat: 21.0368,
    lng: 105.8505,
    tags: ['Hà Nội', 'Phố Cổ', 'Cầu Long Biên', 'Hoàng hôn', 'Đường phố'],
    photographer: 'Vietnamese Heritage',
    source: 'Unsplash'
  },

  // TP. HỒ CHÍ MINH
  {
    id: 'hcm-dinh-doc-lap',
    title: 'Dinh Độc Lập - Hội Trường Thống Nhất',
    cityName: 'TP. Hồ Chí Minh',
    province: 'TP. Hồ Chí Minh',
    landmarkName: 'Dinh Độc Lập & Bến Bạch Đằng',
    tagline: 'Đô thị phương Nam phồn hoa, giao thoa truyền thống và hiện đại',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/20190923_Independence_Palace-10.jpg/1280px-20190923_Independence_Palace-10.jpg',
    thumbUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/20190923_Independence_Palace-10.jpg/640px-20190923_Independence_Palace-10.jpg',
    lat: 10.7770,
    lng: 106.6953,
    tags: ['TP. Hồ Chí Minh', 'Sài Gòn', 'Dinh Độc Lập', 'Bến Bạch Đằng', 'Hội trường Thống Nhất', 'Ngô Viết Thụ'],
    photographer: 'Wikimedia Commons / Independence Palace',
    source: 'Wikimedia Commons / Di tích Lịch sử'
  },
  {
    id: 'hcm-nha-tho-duc-ba',
    title: 'Nhà Thờ Đức Bà & Bưu Điện Trung Tâm Sài Gòn',
    cityName: 'TP. Hồ Chí Minh',
    province: 'TP. Hồ Chí Minh',
    landmarkName: 'Nhà Thờ Đức Bà & Bưu Điện Thành Phố',
    tagline: 'Tuyệt tác kiến trúc cổ điển hơn 140 năm giữa trung tâm thành phố',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=2000&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    lat: 10.7798,
    lng: 106.6990,
    tags: ['TP. Hồ Chí Minh', 'Sài Gòn', 'Nhà Thờ Đức Bà', 'Kiến trúc'],
    photographer: 'Hoang Nam',
    source: 'Unsplash'
  },

  // THỪA THIÊN HUẾ
  {
    id: 'hue-dai-noi',
    title: 'Ngọ Môn & Lầu Ngũ Phụng - Đại Nội Cung Đình Huế',
    cityName: 'Thừa Thiên Huế',
    province: 'Thừa Thiên Huế',
    landmarkName: 'Đại Nội Cung Đình Huế (Hoàng Thành & Tử Cấm Thành)',
    tagline: 'Kiến trúc cung đình đỉnh cao triều Nguyễn - Di sản Văn hóa Thế giới UNESCO',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Meridian_Gate%2C_Hue_%28I%29.jpg',
    thumbUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Meridian_Gate%2C_Hue_%28I%29.jpg/640px-Meridian_Gate%2C_Hue_%28I%29.jpg',
    lat: 16.4697,
    lng: 107.5796,
    tags: ['Huế', 'Đại Nội', 'Cung đình Huế', 'Ngọ Môn', 'Lầu Ngũ Phụng', 'Hoàng Thành', 'Tử Cấm Thành', 'Cố đô', 'UNESCO'],
    photographer: 'Wikimedia Heritage (Supanut Arunoprayote)',
    source: 'Wikimedia Commons / Di sản UNESCO'
  },
  {
    id: 'hue-dai-noi-toan-canh',
    title: 'Cổng Ngọ Môn & Cầu Trung Đạo Soi Bóng Hồ Sen',
    cityName: 'Thừa Thiên Huế',
    province: 'Thừa Thiên Huế',
    landmarkName: 'Cổng Ngọ Môn - Đại Nội Huế',
    tagline: 'Năm cửa chín lầu uy nghi, biểu tượng quyền lực tối thượng của Hoàng đế triều Nguyễn',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/26/C%E1%BB%95ng_Ng%E1%BB%8D_M%C3%B4n_Hu%E1%BA%BF.jpg',
    thumbUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/C%E1%BB%95ng_Ng%E1%BB%8D_M%C3%B4n_Hu%E1%BA%BF.jpg/640px-C%E1%BB%95ng_Ng%E1%BB%8D_M%C3%B4n_Hu%E1%BA%BF.jpg',
    lat: 16.4688,
    lng: 107.5779,
    tags: ['Huế', 'Đại Nội', 'Ngọ Môn', 'Hồ sen', 'Cung đình', 'Cố đô'],
    photographer: 'Nhiếp ảnh gia Di sản Cố đô',
    source: 'Wikimedia Commons'
  },
  {
    id: 'hue-dai-noi-tu-lieu',
    title: 'Cổng Ngọ Môn Hoàng Cung Huế Xưa (Ảnh Tư Liệu Lịch Sử)',
    cityName: 'Thừa Thiên Huế',
    province: 'Thừa Thiên Huế',
    landmarkName: 'Đại Nội Huế Thời Kỳ Triều Nguyễn',
    tagline: 'Bức ảnh tư liệu quý ghi lại cửa ngõ chính vào Hoàng thành Huế đầu thế kỷ 20',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Annam_-_Hu%C3%A9_-_Porte_d%27entr%C3%A9e_du_Palais_Royal.jpg',
    thumbUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Annam_-_Hu%C3%A9_-_Porte_d%27entr%C3%A9e_du_Palais_Royal.jpg/640px-Annam_-_Hu%C3%A9_-_Porte_d%27entr%C3%A9e_du_Palais_Royal.jpg',
    lat: 16.4695,
    lng: 107.5790,
    tags: ['Huế', 'Đại Nội', 'Ảnh tư liệu', 'Triều Nguyễn', 'Lịch sử Cố đô', 'Hoàng cung'],
    photographer: 'Tư liệu Lịch sử Hoàng gia',
    source: 'Tư liệu Lịch sử / Wikimedia'
  },
  {
    id: 'hue-chua-thien-mu',
    title: 'Chùa Thiên Mụ & Tháp Phước Duyên Sông Hương',
    cityName: 'Thừa Thiên Huế',
    province: 'Thừa Thiên Huế',
    landmarkName: 'Chùa Thiên Mụ & Lăng Tẩm Triều Nguyễn',
    tagline: 'Biểu tượng tâm linh thanh tịnh soi bóng bên dòng sông Hương thơ mộng',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/ThienMuPagoda.jpg/1280px-ThienMuPagoda.jpg',
    thumbUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/ThienMuPagoda.jpg/640px-ThienMuPagoda.jpg',
    lat: 16.4528,
    lng: 107.5451,
    tags: ['Huế', 'Chùa Thiên Mụ', 'Tháp Phước Duyên', 'Tâm linh', 'Sông Hương'],
    photographer: 'Wikimedia Heritage (Thien Mu Pagoda)',
    source: 'Wikimedia Commons'
  },

  // ĐÀ NẴNG
  {
    id: 'dn-cau-vang',
    title: 'Cầu Vàng Bà Nà Hills - Bàn Tay Phật Nâng Cầu',
    cityName: 'Đà Nẵng',
    province: 'Đà Nẵng',
    landmarkName: 'Cầu Vàng Bà Nà & Bán Đảo Sơn Trà',
    tagline: 'Thành phố biển hiện đại kề bên danh thắng Ngũ Hành Sơn & bán đảo Sơn Trà',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/84152-Da-Nang_%2848572442536%29.jpg/1280px-84152-Da-Nang_%2848572442536%29.jpg',
    thumbUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/84152-Da-Nang_%2848572442536%29.jpg/640px-84152-Da-Nang_%2848572442536%29.jpg',
    lat: 15.9950,
    lng: 107.9965,
    tags: ['Đà Nẵng', 'Cầu Vàng', 'Bà Nà Hills', 'Biển Mỹ Khê', 'Bàn tay khổng lồ'],
    photographer: 'Wikimedia Explorer (Da Nang Golden Bridge)',
    source: 'Wikimedia Commons'
  },
  {
    id: 'dn-cau-rong',
    title: 'Cầu Rồng Phun Lửa Sông Hàn Ban Đêm',
    cityName: 'Đà Nẵng',
    province: 'Đà Nẵng',
    landmarkName: 'Cầu Rồng & Sông Hàn Rực Rỡ Ánh Sáng',
    tagline: 'Kiến trúc rồng thép uốn lượn vươn ra biển lớn độc nhất vô nhị',
    imageUrl: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=2000&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=600&q=80',
    lat: 16.0612,
    lng: 108.2269,
    tags: ['Đà Nẵng', 'Cầu Rồng', 'Sông Hàn', 'Đêm'],
    photographer: 'Dragon Bridge Team',
    source: 'Unsplash'
  },

  // HỘI AN & QUẢNG NAM
  {
    id: 'qn-hoi-an',
    title: 'Phố Cổ Hội An & Nhà Cổ Tường Vàng',
    cityName: 'Hội An (Quảng Nam)',
    province: 'Quảng Nam',
    landmarkName: 'Phố Cổ Hội An',
    tagline: 'Thương cảng cổ kính rực rỡ sắc vàng của tường cổ, hoa giấy và đèn lồng',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/PhoCoHoiAn.jpg',
    thumbUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/PhoCoHoiAn.jpg',
    lat: 15.8801,
    lng: 108.3380,
    tags: ['Hội An', 'Quảng Nam', 'Phố Cổ', 'Nhà Cổ', 'Tường Vàng', 'UNESCO'],
    photographer: 'Wikimedia Commons / Di sản UNESCO',
    source: 'Wikimedia Commons'
  },
  {
    id: 'qn-chua-cau',
    title: 'Chùa Cầu (Lai Viễn Kiều) Biểu Tượng Hội An',
    cityName: 'Hội An (Quảng Nam)',
    province: 'Quảng Nam',
    landmarkName: 'Chùa Cầu Hội An (Lai Viễn Kiều)',
    tagline: 'Cây cầu ngói cổ kính hơn 400 năm tuổi bắc qua lạch nước sông Hoài',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Cau_Nhat_Ban.jpg',
    thumbUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Cau_Nhat_Ban.jpg',
    lat: 15.8771,
    lng: 108.3259,
    tags: ['Hội An', 'Chùa Cầu', 'Lai Viễn Kiều', 'Cầu Nhật Bản', 'UNESCO'],
    photographer: 'Wikimedia Commons / Cầu Nhật Bản',
    source: 'Wikimedia Commons'
  },
  {
    id: 'qn-hoi-an-den-long',
    title: 'Phố Cổ Hội An Lung Linh Đèn Lồng Sông Hoài',
    cityName: 'Hội An (Quảng Nam)',
    province: 'Quảng Nam',
    landmarkName: 'Đèn Lồng Phố Cổ Hội An',
    tagline: 'Hàng ngàn chiếc đèn lồng lụa lung linh rực rỡ sắc màu thắp sáng phố cổ về đêm',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=2000&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
    lat: 15.8801,
    lng: 108.3380,
    tags: ['Hội An', 'Đèn Lồng', 'Sông Hoài', 'Đêm Phố Cổ', 'Quảng Nam'],
    photographer: 'Unsplash / Hoi An Lanterns',
    source: 'Unsplash'
  },
  {
    id: 'qn-my-son',
    title: 'Thánh Địa Mỹ Sơn Thung Lũng Thiêng',
    cityName: 'Quảng Nam (Mỹ Sơn)',
    province: 'Quảng Nam',
    landmarkName: 'Thánh Địa Mỹ Sơn & Tháp Chăm',
    tagline: 'Quần thể đền tháp Chăm Pa nghìn năm bí ẩn giữa thung lũng thiêng',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/A_far_view_of_the_ruins_at_My_Son_%2830992152933%29.jpg/1280px-A_far_view_of_the_ruins_at_My_Son_%2830992152933%29.jpg',
    thumbUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/A_far_view_of_the_ruins_at_My_Son_%2830992152933%29.jpg/640px-A_far_view_of_the_ruins_at_My_Son_%2830992152933%29.jpg',
    lat: 15.7997,
    lng: 108.1250,
    tags: ['Quảng Nam', 'Mỹ Sơn', 'Tháp Chăm', 'Chăm Pa', 'UNESCO', 'Thánh địa'],
    photographer: 'Wikimedia Commons / UNESCO Site #949',
    source: 'Wikimedia Commons'
  },

  // NINH BÌNH
  {
    id: 'nb-trang-an',
    title: 'Quần Thể Danh Thắng Tràng An & Tam Cốc Non Nước',
    cityName: 'Ninh Bình',
    province: 'Ninh Bình',
    landmarkName: 'Quần thể Danh thắng Tràng An & Tam Cốc',
    tagline: 'Di sản Kép thế giới giữa non nước hữu tình và hang động huyền ảo',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Muaxuantamcoc.jpg',
    thumbUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Muaxuantamcoc.jpg/640px-Muaxuantamcoc.jpg',
    lat: 20.2506,
    lng: 105.9048,
    tags: ['Ninh Bình', 'Tràng An', 'Bái Đính', 'Tam Cốc', 'Hang Múa', 'UNESCO', 'Hoa Lư'],
    photographer: 'Wikimedia Commons (Mùa xuân Tam Cốc)',
    source: 'Wikimedia Commons / UNESCO'
  },
  {
    id: 'nb-hang-mua',
    title: 'Đỉnh Hang Múa Nhìn Xuống Dòng Sông Ngô Đồng',
    cityName: 'Ninh Bình',
    province: 'Ninh Bình',
    landmarkName: 'Hang Múa Tuyệt Đỉnh Non Nước Ninh Bình',
    tagline: 'Góc nhìn toàn cảnh ngoạn mục ôm trọn thung lũng Tam Cốc',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=2000&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
    lat: 20.2319,
    lng: 105.9327,
    tags: ['Ninh Bình', 'Hang Múa', 'Tam Cốc', 'Non Nước'],
    photographer: 'Tam Coc Vista',
    source: 'Unsplash'
  },

  // QUẢNG NINH
  {
    id: 'qn-ha-long',
    title: 'Vịnh Hạ Long Kỳ Quan Thiên Nhiên Thế Giới',
    cityName: 'Quảng Ninh',
    province: 'Quảng Ninh',
    landmarkName: 'Vịnh Hạ Long & Quần đảo Kỳ Vĩ',
    tagline: 'Kỳ quan thiên nhiên thế giới với hàng nghìn đảo đá vôi xanh ngọc',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Ha_Long_Bay_in_2019.jpg/1280px-Ha_Long_Bay_in_2019.jpg',
    thumbUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Ha_Long_Bay_in_2019.jpg/640px-Ha_Long_Bay_in_2019.jpg',
    lat: 20.9101,
    lng: 107.1839,
    tags: ['Quảng Ninh', 'Hạ Long', 'Vịnh Hạ Long', 'UNESCO', 'Kỳ quan'],
    photographer: 'Wikimedia Commons (Ha Long Bay 2019)',
    source: 'Wikimedia Commons'
  },

  // LÀO CAI / SA PA
  {
    id: 'lc-sapa-fansipan',
    title: 'Đỉnh Fansipan & Đại Tượng Phật Trên Mây',
    cityName: 'Lào Cai (Sa Pa)',
    province: 'Lào Cai',
    landmarkName: 'Đỉnh Fansipan & Ruộng Bậc Thang Sa Pa',
    tagline: 'Nóc nhà Đông Dương bồng bềnh giữa biển mây và ruộng bậc thang',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Amit%C4%81bha_statue_on_Fansipan_1.jpg/1280px-Amit%C4%81bha_statue_on_Fansipan_1.jpg',
    thumbUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Amit%C4%81bha_statue_on_Fansipan_1.jpg/640px-Amit%C4%81bha_statue_on_Fansipan_1.jpg',
    lat: 22.3034,
    lng: 103.7753,
    tags: ['Lào Cai', 'Sa Pa', 'Fansipan', 'Mây', 'Tây Bắc', 'Núi rừng', 'Tượng Phật'],
    photographer: 'Wikimedia Commons (Fansipan Summit)',
    source: 'Wikimedia Commons'
  },

  // CAO BẰNG
  {
    id: 'cb-ban-gioc',
    title: 'Thác Bản Giốc Tuyệt Tác Biên Cương',
    cityName: 'Cao Bằng',
    province: 'Cao Bằng',
    landmarkName: 'Thác Bản Giốc & Động Ngườm Ngao',
    tagline: 'Thác nước tự nhiên kỳ vĩ bậc nhất Đông Nam Á giữa biên cương',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
    lat: 22.8536,
    lng: 106.7237,
    tags: ['Cao Bằng', 'Thác Bản Giốc', 'Biên cương', 'Thác nước'],
    photographer: 'Cao Bang GeoPark',
    source: 'Unsplash'
  },

  // HÀ GIANG
  {
    id: 'hg-ma-pi-leng',
    title: 'Cột Cờ Quốc Gia Lũng Cú & Cao Nguyên Đá Đồng Văn',
    cityName: 'Hà Giang',
    province: 'Hà Giang',
    landmarkName: 'Cột Cờ Lũng Cú & Cao Nguyên Đá Đồng Văn',
    tagline: 'Cực Bắc thiêng liêng của Tổ quốc với non sông cẩm tú ngút ngàn',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Lung_Cu_Flag_Tower.jpg/1280px-Lung_Cu_Flag_Tower.jpg',
    thumbUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Lung_Cu_Flag_Tower.jpg/640px-Lung_Cu_Flag_Tower.jpg',
    lat: 23.2389,
    lng: 105.4181,
    tags: ['Hà Giang', 'Lũng Cú', 'Cột Cờ', 'Mã Pí Lèng', 'Đồng Văn', 'Cao nguyên đá', 'Cực Bắc'],
    photographer: 'Wikimedia Commons (Lung Cu Flag Tower)',
    source: 'Wikimedia Commons'
  },

  // QUẢNG BÌNH
  {
    id: 'qb-phong-nha',
    title: 'Vườn Quốc Gia Phong Nha - Kẻ Bàng',
    cityName: 'Quảng Bình',
    province: 'Quảng Bình',
    landmarkName: 'Quần Thể Hang Động Phong Nha & Sơn Đoòng',
    tagline: 'Vương quốc hang động thế giới ẩn sâu giữa đại ngàn nguyên sinh',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Phongnhacave.jpg',
    thumbUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Phongnhacave.jpg/640px-Phongnhacave.jpg',
    lat: 17.5898,
    lng: 106.2829,
    tags: ['Quảng Bình', 'Phong Nha', 'Kẻ Bàng', 'Sơn Đoòng', 'Hang động', 'UNESCO'],
    photographer: 'Wikimedia Commons (Phong Nha Cave)',
    source: 'Wikimedia Commons / Di sản UNESCO'
  },

  // LÂM ĐỒNG / ĐÀ LẠT
  {
    id: 'ld-da-lat',
    title: 'Ga Xe Lửa Đà Lạt & Cao Nguyên Ngàn Hoa',
    cityName: 'Lâm Đồng (Đà Lạt)',
    province: 'Lâm Đồng',
    landmarkName: 'Ga Xe Lửa Đà Lạt & Hồ Xuân Hương',
    tagline: 'Xứ sở sương mù ngập tràn sắc hoa và kiến trúc Pháp cổ kính',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Da_Lat_train_station_12.jpg/1280px-Da_Lat_train_station_12.jpg',
    thumbUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Da_Lat_train_station_12.jpg/640px-Da_Lat_train_station_12.jpg',
    lat: 11.9404,
    lng: 108.4583,
    tags: ['Lâm Đồng', 'Đà Lạt', 'Ga Đà Lạt', 'Hồ Xuân Hương', 'Hoa dã quỳ', 'Sương mù'],
    photographer: 'Wikimedia Commons (Da Lat Railway Station)',
    source: 'Wikimedia Commons'
  },

  // KHÁNH HÒA / NHA TRANG
  {
    id: 'kh-nha-trang',
    title: 'Tháp Bà Ponagar & Vịnh Biển Nha Trang',
    cityName: 'Khánh Hòa (Nha Trang)',
    province: 'Khánh Hòa',
    landmarkName: 'Tháp Bà Ponagar & Vịnh Nha Trang',
    tagline: 'Thành phố biển ngập tràn nắng vàng và di tích Chăm Pa cổ kính',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Po_Nagar.jpg/1280px-Po_Nagar.jpg',
    thumbUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Po_Nagar.jpg/640px-Po_Nagar.jpg',
    lat: 12.2654,
    lng: 109.1967,
    tags: ['Khánh Hòa', 'Nha Trang', 'Tháp Bà Ponagar', 'Chăm Pa', 'Biển đảo'],
    photographer: 'Wikimedia Commons (Po Nagar)',
    source: 'Wikimedia Commons'
  },

  // KIÊN GIANG / PHÚ QUỐC
  {
    id: 'kg-phu-quoc',
    title: 'Đảo Ngọc Phú Quốc & Biển Bãi Sao Hoàng Hôn',
    cityName: 'Kiên Giang (Phú Quốc)',
    province: 'Kiên Giang',
    landmarkName: 'Đảo Ngọc Phú Quốc & Vịnh Thái Lan',
    tagline: 'Thiên đường đảo ngọc với bờ cát trắng mịn và biển xanh ngọc bích',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=2000&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
    lat: 10.2899,
    lng: 103.9840,
    tags: ['Kiên Giang', 'Phú Quốc', 'Đảo Ngọc', 'Bãi Sao', 'Biển'],
    photographer: 'Phu Quoc Sunset',
    source: 'Unsplash'
  },

  // CẦN THƠ / ĐỒNG BẰNG SÔNG CỬU LONG
  {
    id: 'ct-cai-rang',
    title: 'Chợ Nổi Cái Răng & Bến Ninh Kiều Sông Nước Tây Đô',
    cityName: 'Cần Thơ',
    province: 'Cần Thơ',
    landmarkName: 'Bến Ninh Kiều & Chợ Nổi Cái Răng Cần Thơ',
    tagline: 'Thủ phủ miền Tây sông nước trù phú với nét văn hóa thương hồ đặc sắc',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Mua_ban_tren_song.jpg/1280px-Mua_ban_tren_song.jpg',
    thumbUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Mua_ban_tren_song.jpg/640px-Mua_ban_tren_song.jpg',
    lat: 10.0452,
    lng: 105.7469,
    tags: ['Cần Thơ', 'Chợ Nổi', 'Cái Răng', 'Ninh Kiều', 'Miền Tây', 'Sông nước', 'Văn hóa thương hồ'],
    photographer: 'Wikimedia Commons (Mua ban tren song)',
    source: 'Wikimedia Commons'
  },

  // TÂY NINH
  {
    id: 'tn-ba-den',
    title: 'Núi Bà Đen Nóc Nhà Nam Bộ & Tòa Thánh',
    cityName: 'Tây Ninh',
    province: 'Tây Ninh',
    landmarkName: 'Núi Bà Đen & Tòa Thánh Tây Ninh',
    tagline: 'Vùng đất tâm linh huyền bí với đỉnh núi cao nhất Nam Bộ',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2000&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80',
    lat: 11.3789,
    lng: 106.1689,
    tags: ['Tây Ninh', 'Núi Bà Đen', 'Tòa Thánh Cao Đài', 'Tâm linh'],
    photographer: 'Tay Ninh Horizon',
    source: 'Unsplash'
  },

  // BÀ RỊA - VŨNG TÀU
  {
    id: 'vt-tuong-chua',
    title: 'Tượng Chúa Kitô Vua & Biển Vũng Tàu',
    cityName: 'Bà Rịa - Vũng Tàu',
    province: 'Bà Rịa - Vũng Tàu',
    landmarkName: 'Tượng Chúa Kitô & Ngọn Hải Đăng Vũng Tàu',
    tagline: 'Bán đảo biển xinh đẹp đón gió đại dương ngay cạnh Sài Gòn',
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=2000&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=600&q=80',
    lat: 10.3238,
    lng: 107.0843,
    tags: ['Vũng Tàu', 'Bà Rịa', 'Tượng Chúa', 'Hải Đăng', 'Biển'],
    photographer: 'Vung Tau Coast',
    source: 'Unsplash'
  },

  // BÌNH THUẬN / MŨI NÉ
  {
    id: 'bt-mui-ne',
    title: 'Đồi Cát Trắng & Biển Mũi Né Phan Thiết',
    cityName: 'Bình Thuận (Phan Thiết)',
    province: 'Bình Thuận',
    landmarkName: 'Đồi Cát Bay Mũi Né & Tháp Chàm Poshanư',
    tagline: 'Tiểu sa mạc ven biển rực rỡ với đồi cát vàng cát trắng mênh mông',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=2000&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
    lat: 10.9333,
    lng: 108.2833,
    tags: ['Bình Thuận', 'Mũi Né', 'Phan Thiết', 'Đồi Cát', 'Poshanư', 'Biển'],
    photographer: 'Phan Thiet Tourism',
    source: 'Unsplash'
  },

  // YÊN BÁI / MÙ CANG CHẢI
  {
    id: 'yb-mu-cang-chai',
    title: 'Ruộng Bậc Thang Mù Cang Chải Mùa Lúa Chín',
    cityName: 'Yên Bái (Mù Cang Chải)',
    province: 'Yên Bái',
    landmarkName: 'Ruộng Bậc Thang Mù Cang Chải & Đèo Khau Phạ',
    tagline: 'Kỳ quan nhân tạo uốn lượn vàng rực giữa mây ngàn Tây Bắc',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=85',
    thumbUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
    lat: 21.8497,
    lng: 104.0863,
    tags: ['Yên Bái', 'Mù Cang Chải', 'Ruộng Bậc Thang', 'Mùa Lúa Chín', 'Khau Phạ'],
    photographer: 'Northwest Heritage',
    source: 'Unsplash'
  }
];

/**
 * Smart Search utility to find matching landmark photos based on landmark name & city name
 */
export function findMatchingLandmarkPhotos(
  landmarkName: string = '', 
  cityName: string = '',
  maxResults: number = 6
): LandmarkPhotoItem[] {
  const cleanTerm = `${landmarkName} ${cityName}`.trim().toLowerCase();
  if (!cleanTerm) return VIETNAM_LANDMARK_PHOTOS.slice(0, maxResults);

  // Normalize string for Vietnamese match
  const removeAccents = (str: string) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  const termNorm = removeAccents(cleanTerm);
  const termWords = termNorm.split(/[\s,&/-]+/).filter(w => w.length > 1);

  const scored = VIETNAM_LANDMARK_PHOTOS.map(photo => {
    const rawTarget = `${photo.landmarkName} ${photo.title} ${photo.cityName} ${photo.province} ${photo.tagline} ${photo.tags.join(' ')}`;
    const targetNorm = removeAccents(rawTarget);

    let score = 0;
    // Exact or strong phrase match
    if (landmarkName && targetNorm.includes(removeAccents(landmarkName))) {
      score += 50;
    }
    if (cityName && targetNorm.includes(removeAccents(cityName))) {
      score += 30;
    }

    // Word matches
    for (const w of termWords) {
      if (targetNorm.includes(w)) {
        score += 10;
      }
    }

    return { photo, score };
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  const filtered = scored.filter(s => s.score > 0).map(s => s.photo);
  if (filtered.length > 0) {
    return filtered.slice(0, maxResults);
  }

  return VIETNAM_LANDMARK_PHOTOS.slice(0, maxResults);
}

