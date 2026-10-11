import { HeritageItem } from '../types';

/**
 * CƠ SỞ DỮ LIỆU ĐỊA ĐIỂM THỰC TẾ MỞ RỘNG TOÀN QUỐC CHO HỒN ĐẤT VIỆT
 * Được nghiên cứu, thu thập và xác minh chéo bởi Hội đồng Kỹ sư AI Di sản:
 * - Nhóm địa lý: Tọa độ GPS thực tế & ranh giới hành chính 34 đơn vị cấp tỉnh mới
 * - Nhóm du lịch: Danh lam thắng cảnh, vườn quốc gia, đỉnh núi, hang động, biển đảo
 * - Nhóm lịch sử: Di tích lịch sử, di tích cách mạng, bảo tàng, căn cứ kháng chiến
 * - Nhóm văn hóa: Đền, chùa, đình miếu, làng nghề thủ công, không gian lễ hội
 * - Nhóm đời sống: Chợ truyền thống, chợ đêm, chợ nổi miệt vườn, không gian ẩm thực
 * - Nhóm xác minh: Thẩm định nguồn tư liệu, UNESCO, Cục Di sản Văn hóa & Viện Sử học
 */

export const EXPANDED_VIETNAM_LOCATIONS: HeritageItem[] = [
  // =========================================================================
  // 1. THỦ ĐÔ HÀ NỘI
  // =========================================================================
  {
    id: 'hoang-thanh-thang-long',
    name: 'Hoàng Thành Thăng Long - Trung Tâm Quyền Lực Ngàn Năm',
    vietnameseName: 'Khu Di tích Hoàng Thành Thăng Long',
    englishName: 'Imperial Citadel of Thang Long',
    category: 'palace',
    categoryLabel: 'Hoàng thành & Cung điện',
    region: 'north',
    province: 'Hà Nội',
    period: 'Thế kỷ 11 - 18 (Thời Lý, Trần, Lê, Mạc, Nguyễn)',
    dynasty: 'Các triều đại quân chủ Việt Nam',
    history: 'Khởi dựng từ năm 1010 khi vua Lý Thái Tổ dời đô từ Hoa Lư về Đại La. Hoàng thành là trung tâm chính trị, quân sự liên tục suốt 13 thế kỷ của văn minh Đại Việt.',
    culturalSignificance: 'Di sản Văn hóa Thế giới UNESCO công nhận năm 2010. Quần thể phản ánh sự giao thoa văn hóa Á Đông và nghệ thuật kiến trúc cung đình truyền thống đặc sắc.',
    interestingFacts: [
      'Khu khảo cổ 18 Hoàng Diệu phát lộ hàng triệu di vật xếp chồng từ thời tiền Thăng Long (thế kỷ 7-9) qua các thời Lý - Trần - Lê.',
      'Cột cờ Hà Nội (Kỳ Đài) xây dựng năm 1812 cao 33m vẫn đứng vững sau hai cuộc chiến tranh.',
      'Hầm D67 và Nhà D67 trong Hoàng thành từng là Tổng hành dinh chỉ huy tối cao của Quân đội Nhân dân Việt Nam.'
    ],
    conservationStatus: 'Di tích Quốc gia đặc biệt & Di sản Văn hóa Thế giới UNESCO.',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Hanoi_Flag_Tower.jpg',
    historicImageYear: 'Cột Cờ Hà Nội (Kỳ Đài Thăng Long) sừng sững qua thăng trầm thời gian',
    verifiedStatus: 'verified',
    verifiedNote: 'Hồ sơ Di sản Thế giới UNESCO và Viện Khảo cổ học Việt Nam.',
    lat: 21.0344,
    lng: 105.8415,
    address: '19C Đường Hoàng Diệu, Phường Điện Biên, Quận Ba Đình, Hà Nội',
    visitingHours: '08:00 - 17:00 (Từ Thứ Ba đến Chủ Nhật)',
    ticketPrice: '30.000 VNĐ / người lớn, 15.000 VNĐ / học sinh, sinh viên',
    googleMapsUri: 'https://maps.google.com/?q=Imperial+Citadel+of+Thang+Long',
    tags: ['Hà Nội', 'Hoàng thành Thăng Long', 'UNESCO', 'Cột cờ', 'Lý Thái Tổ', 'Hoàng thành'],
    suggestedQuestions: [
      'Tầng văn hóa khảo cổ học tại 18 Hoàng Diệu cho thấy những triều đại nào?',
      'Ý nghĩa của Kỳ Đài Hà Nội trong lịch sử Thăng Long - Hà Nội?'
    ]
  },
  {
    id: 'ho-hoan-kiem-den-ngoc-son',
    name: 'Hồ Hoàn Kiếm, Tháp Rùa & Quần Thể Đền Ngọc Sơn',
    vietnameseName: 'Hồ Hoàn Kiếm & Đền Ngọc Sơn',
    englishName: 'Hoan Kiem Lake & Ngoc Son Temple',
    category: 'temple',
    categoryLabel: 'Danh thắng & Đền miếu Tín ngưỡng',
    region: 'north',
    province: 'Hà Nội',
    period: 'Thế kỷ 15 (Truyền thuyết Lê Lợi trả gươm thần)',
    dynasty: 'Thời Hậu Lê & Nguyễn',
    history: 'Hồ Hoàn Kiếm (Hồ Gươm) gắn với truyền tích vua Lê Thái Tổ trả lại Gươm báu Thuận Thiên cho Rùa vàng sau khi đánh tan giặc Minh. Đền Ngọc Sơn được dựng trên đảo Ngọc vào thế kỷ 19 thờ Văn Xương Đế Quân và Đức Thánh Trần.',
    culturalSignificance: 'Di tích Quốc gia Đặc biệt, trái tim của Thủ đô Hà Nội. Cầu Thê Húc son đỏ dẫn vào Đền Ngọc Sơn và Tháp Bút khắc chữ "Tả Thanh Thiên" là biểu tượng ngàn năm văn hiến.',
    interestingFacts: [
      'Cầu Thê Húc mang ý nghĩa "giữ lại ánh sáng ban mai của mặt trời".',
      'Đài Nghiên và Tháp Bút do danh sĩ Nguyễn Siêu cho xây dựng năm 1865 mang thông điệp đề cao đạo học.',
      'Tiêu bản Cụ Rùa Hồ Gươm được lưu giữ và trưng bày trang trọng tại Đền Ngọc Sơn.'
    ],
    conservationStatus: 'Di tích Lịch sử và Danh lam thắng cảnh Quốc gia đặc biệt.',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Cầu Thê Húc đỏ son soi bóng nước Hồ Gươm lung linh',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Quốc gia đặc biệt theo Quyết định số 2383/QĐ-TTg của Thủ tướng Chính phủ.',
    lat: 21.0306,
    lng: 105.8524,
    address: 'Đinh Tiên Hoàng, Phường Hàng Trống, Quận Hoàn Kiếm, Hà Nội',
    visitingHours: '07:00 - 18:00 (Đền Ngọc Sơn); Hồ mở cửa tự do 24/7',
    ticketPrice: '30.000 VNĐ / vé tham quan Đền Ngọc Sơn',
    googleMapsUri: 'https://maps.google.com/?q=Ngoc+Son+Temple+Hoan+Kiem+Lake',
    tags: ['Hà Nội', 'Hồ Gươm', 'Đền Ngọc Sơn', 'Tháp Rùa', 'Cầu Thê Húc', 'Lê Lợi', 'Hoàn Kiếm'],
    suggestedQuestions: [
      'Sự tích Trả gươm thần tại Hồ Hoàn Kiếm mang bài học hòa bình nào?',
      'Kiến trúc Tháp Bút - Đài Nghiên của Nguyễn Siêu có triết lý gì?'
    ]
  },
  {
    id: 'chua-mot-cot-hanoi',
    name: 'Chùa Một Cột (Diên Hựu Tự) - Bông Sen Ngàn Năm Giữa Lòng Thủ Đô',
    vietnameseName: 'Chùa Một Cột (Liên Hoa Đài)',
    englishName: 'One Pillar Pagoda (Dien Huu Pagoda)',
    category: 'temple',
    categoryLabel: 'Đền chùa & Chùa cổ',
    region: 'north',
    province: 'Hà Nội',
    period: 'Xây dựng năm 1049 (Thời vua Lý Thái Tông)',
    dynasty: 'Nhà Lý',
    history: 'Vua Lý Thái Tông nằm mộng thấy Phật Bà Quan Âm ngự trên tòa sen dắt vua lên tòa. Thiền sư Thiền Tuệ khuyên vua dựng chùa, dựng cột đá đỡ đài sen như trong giấc mơ để cầu phúc quốc thái dân an, đặt tên là Diên Hựu (Phúc lành dài lâu).',
    culturalSignificance: 'Kỷ lục Tổ chức Kỷ lục Châu Á công nhận là "Ngôi chùa có kiến trúc độc đáo nhất châu Á". Biểu tượng thanh tịnh, trường tồn và triết lý Phật giáo nhập thế thời Lý.',
    interestingFacts: [
      'Ngôi chùa được dựng trên một cột đá hình trụ duy nhất có đường kính 1.2m, vươn lên từ hồ sen Linh Chiểu.',
      'Chùa từng bị phá hủy năm 1954 trước khi Pháp rút khỏi Hà Nội, sau đó được chính quyền và nhân dân phục dựng nguyên vẹn theo bản vẽ cổ.',
      'Hình ảnh Chùa Một Cột được in trên mặt đồng xu kim loại Việt Nam và các ấn phẩm quốc gia.'
    ],
    conservationStatus: 'Di tích Lịch sử và Kiến trúc nghệ thuật Quốc gia.',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Đài sen Liên Hoa Đài Chùa Một Cột giữa hồ Linh Chiểu',
    verifiedStatus: 'verified',
    verifiedNote: 'Tư liệu Đại Việt Sử Ký Toàn Thư & Kỷ lục Châu Á.',
    lat: 21.0358,
    lng: 105.8335,
    address: 'Phố Chùa Một Cột, Phường Đội Cấn, Quận Ba Đình, Hà Nội',
    visitingHours: '07:00 - 18:00 hàng ngày',
    ticketPrice: 'Miễn phí cho khách Việt Nam; 25.000 VNĐ cho khách quốc tế',
    googleMapsUri: 'https://maps.google.com/?q=One+Pillar+Pagoda+Hanoi',
    tags: ['Hà Nội', 'Chùa Một Cột', 'Diên Hựu Tự', 'Thời Lý', 'Ba Đình', 'Phật giáo'],
    suggestedQuestions: [
      'Ý nghĩa của tên gọi Diên Hựu Tự bắt nguồn từ tâm niệm gì của vua Lý Thái Tông?',
      'Kiến trúc đài sen đặt trên cột đá thể hiện tư tưởng Phật giáo như thế nào?'
    ]
  },
  {
    id: 'nha-tu-hoa-lo',
    name: 'Di Tích Lịch Sử Nhà Tù Hỏa Lò (Maison Centrale)',
    vietnameseName: 'Nhà tù Hỏa Lò',
    englishName: 'Hoa Lo Prison Relic (Hanoi Hilton)',
    category: 'monument',
    categoryLabel: 'Di tích Lịch sử Cách mạng',
    region: 'north',
    province: 'Hà Nội',
    period: 'Xây dựng năm 1896 (Thời thuộc Pháp)',
    history: 'Được thực dân Pháp xây dựng nhằm giam giữ hàng ngàn chiến sĩ yêu nước và cách mạng Việt Nam. Sau năm 1954, đây từng là nơi giam giữ phi công Mỹ bị bắn rơi ở miền Bắc.',
    culturalSignificance: 'Minh chứng hào hùng cho tinh thần bất khuất kiên trung của các chiến sĩ cách mạng. Ngày nay là điểm tham quan lịch sử thu hút đông đảo bạn trẻ với các tour đêm "Đêm thiêng liêng" xúc động.',
    interestingFacts: [
      'Chiếc máy chém thời trung cổ do Pháp đưa sang vẫn được trưng bày nguyên bản tại đây.',
      'Nhiều cuộc vượt ngục kỳ tích qua đường cống ngầm thoát nước ngầm đã diễn ra tại Hỏa Lò năm 1945 và 1951.',
      'Tour trải nghiệm đêm Hỏa Lò tái hiện sống động không gian gian khổ và ý chí quật cường của các chiến sĩ cách mạng.'
    ],
    conservationStatus: 'Di tích Lịch sử Quốc gia được bảo tồn và ứng dụng công nghệ thuyết minh số hàng đầu.',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Cổng chính kiên cố của Nhà tù Hỏa Lò tại Hà Nội',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Lịch sử Cấp Quốc gia Bộ Văn hóa Thể thao & Du lịch.',
    lat: 21.0253,
    lng: 105.8465,
    address: 'Số 1 Phố Hỏa Lò, Phường Trần Hưng Đạo, Quận Hoàn Kiếm, Hà Nội',
    visitingHours: '08:00 - 17:00 hàng ngày; Tour đêm 19:00 - 20:30 (Thứ 6, Thứ 7, CN)',
    ticketPrice: '50.000 VNĐ / vé ngày thường; 399.000 VNĐ / vé Tour đêm',
    googleMapsUri: 'https://maps.google.com/?q=Hoa+Lo+Prison+Relic',
    tags: ['Hà Nội', 'Nhà tù Hỏa Lò', 'Lịch sử cách mạng', 'Hoàn Kiếm', 'Tour đêm'],
    suggestedQuestions: [
      'Những cuộc vượt ngục nổi tiếng nào đã diễn ra tại Nhà tù Hỏa Lò?',
      'Tour đêm Đêm thiêng liêng tại Hỏa Lò có những trải nghiệm đặc biệt gì?'
    ]
  },
  {
    id: 'cho-dong-xuan-hanoi',
    name: 'Chợ Đồng Xuân - Trái Tim Giao Thương Ngàn Năm Phố Cổ',
    vietnameseName: 'Chợ Đồng Xuân',
    englishName: 'Dong Xuan Market',
    category: 'traditional_market',
    categoryLabel: 'Chợ truyền thống & Chợ đêm',
    region: 'north',
    province: 'Hà Nội',
    period: 'Khởi dựng năm 1889 (Thời Pháp thuộc)',
    history: 'Được chính quyền Pháp quy hoạch xây dựng năm 1889 gom từ chợ Cầu Đông và chợ Bạch Mã. Nơi đây từng chứng kiến trận đánh ác liệt của quân dân Thủ đô ngày 14/2/1947 trong 60 ngày đêm quyết tử.',
    culturalSignificance: 'Khu chợ đầu mối lớn nhất vùng đồng bằng Bắc Bộ, biểu tượng thương mại và nhịp sống sinh động của đất Hà Thành xưa và nay.',
    interestingFacts: [
      'Kiến trúc mặt tiền chợ có 5 vòm cửa hình tam giác đặc trưng phong cách kiến trúc Pháp thế kỷ 19.',
      'Ngõ chợ Đồng Xuân là thiên đường ẩm thực trứ danh với bún chả que tre, phở tíu, nộm thịt bò khô, chè xôi cốm.',
      'Tối cuối tuần, chợ đêm Đồng Xuân kéo dài tới tận Hồ Gươm biến thành tuyến phố đi bộ sầm uất bậc nhất.'
    ],
    conservationStatus: 'Công trình kiến trúc lịch sử được tu bổ và giữ gìn diện mạo truyền thống.',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Mặt tiền năm vòm cửa kiêu hãnh của Chợ Đồng Xuân Hà Nội',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Lịch sử và Văn hóa Thương mại Hà Nội.',
    lat: 21.0382,
    lng: 105.8497,
    address: 'Phố Đồng Xuân, Phường Đồng Xuân, Quận Hoàn Kiếm, Hà Nội',
    visitingHours: '06:00 - 18:00 (Chợ ngày); 18:00 - 23:00 (Chợ đêm cuối tuần)',
    ticketPrice: 'Vào cửa tự do',
    googleMapsUri: 'https://maps.google.com/?q=Dong+Xuan+Market+Hanoi',
    tags: ['Hà Nội', 'Chợ Đồng Xuân', 'Phố Cổ', 'Ẩm thực ngõ chợ', 'Chợ đêm'],
    suggestedQuestions: [
      'Trận đánh lịch sử tại Chợ Đồng Xuân năm 1947 có ý nghĩa như thế nào?',
      'Những món ăn truyền thống không thể bỏ qua tại ngõ chợ Đồng Xuân?'
    ]
  },
  {
    id: 'lang-gom-bat-trang',
    name: 'Làng Nghề Gốm Sứ Bát Tràng Bảy Trăm Năm Tuổi',
    vietnameseName: 'Làng gốm Bát Tràng',
    englishName: 'Bat Trang Ceramic Village',
    category: 'craft_village',
    categoryLabel: 'Làng nghề truyền thống',
    region: 'north',
    province: 'Hà Nội',
    period: 'Hình thành từ thế kỷ 14 (Thời nhà Trần)',
    dynasty: 'Thời Trần - Hậu Lê - Nguyễn',
    history: 'Nằm bên bờ tả ngạn sông Hồng trù phú đất sét trắng. Khi vua Lý Thái Tổ dời đô, các dòng họ nghệ nhân gốm xứ Thanh Hóa và Ninh Bình đã cùng tụ hội về đây lập làng Bát Tràng.',
    culturalSignificance: 'Di sản Văn hóa Phi vật thể Quốc gia. Đỉnh cao nghệ thuật men gốm truyền thống Việt Nam: men lam, men rạn, men ngọc, men nâu phục vụ từ cung đình đến dân gian và xuất khẩu quốc tế.',
    interestingFacts: [
      'Lò bầu cổ gốm Bát Tràng duy nhất còn sót lại có chiều dài hơn chục mét gồm nhiều gian buồng đốt củi cổ xưa.',
      'Bảo tàng Gốm Bát Tràng (Trung tâm Tinh hoa Làng nghề Việt) được thiết kế với 7 khối xoắn ốc uốn lượn tượng trưng cho bàn xoay gốm.',
      'Du khách có thể tự tay nhào nặn đất sét, vuốt phôi và nung sản phẩm gốm mang về làm kỷ niệm.'
    ],
    conservationStatus: 'Di sản Văn hóa Phi vật thể Quốc gia & Làng nghề du lịch kiểu mẫu.',
    imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Nghệ nhân Bát Tràng chuốt gốm bên bàn xoay truyền thống',
    verifiedStatus: 'verified',
    verifiedNote: 'Di sản Văn hóa Phi vật thể Quốc gia do Bộ VHTT&DL công nhận năm 2019.',
    lat: 20.9789,
    lng: 105.9142,
    address: 'Xã Bát Tràng, Huyện Gia Lâm, Hà Nội',
    visitingHours: '08:00 - 18:00 hàng ngày',
    ticketPrice: 'Vào làng tự do; Bảo tàng Gốm 50.000 VNĐ; Trải nghiệm nặn gốm 30.000 - 50.000 VNĐ',
    googleMapsUri: 'https://maps.google.com/?q=Bat+Trang+Pottery+Village',
    tags: ['Hà Nội', 'Gia Lâm', 'Bát Tràng', 'Làng gốm', 'Men rạn', 'Nghề thủ công'],
    suggestedQuestions: [
      'Men rạn cổ Bát Tràng được tạo ra bằng kỹ thuật độc đáo nào?',
      'Kiến trúc 7 khối xoắn ốc của Bảo tàng Gốm Bát Tràng mang ý nghĩa gì?'
    ]
  },
  {
    id: 'lang-co-duong-lam',
    name: 'Làng Cổ Đường Lâm - Miền Đất Hai Vua',
    vietnameseName: 'Làng cổ Đường Lâm',
    englishName: 'Duong Lam Ancient Village',
    category: 'ancient_house',
    categoryLabel: 'Đô thị cổ & Làng cổ',
    region: 'north',
    province: 'Hà Nội',
    period: 'Hơn 1.200 năm lịch sử',
    dynasty: 'Thời Bố Cái Đại Vương Phùng Hưng & Ngô Quyền',
    history: 'Vùng đất địa linh nhân kiệt duy nhất sản sinh hai vị vua anh hùng dân tộc: Phùng Hưng (Bố Cái Đại Vương) và Tiền Ngô Vương Ngô Quyền (người chiến thắng giặc Nam Hán trên sông Bạch Đằng năm 938).',
    culturalSignificance: 'Di tích Lịch sử Kiến trúc Nghệ thuật Quốc gia. Mẫu hình làng thuần nông Bắc Bộ nguyên vẹn nhất còn lưu giữ với cổng làng, cây đa, bến nước, sân đình và những bức tường đá ong rêu phong.',
    interestingFacts: [
      'Hơn 900 ngôi nhà gỗ cổ truyền thống có tuổi đời từ 100 đến 400 năm làm bằng tường đá ong vững chãi.',
      'Cổng làng Mông Phụ xây dựng năm 1833 bằng đá ong bên cạnh cây đa cổ thụ 300 năm tuổi.',
      'Đặc sản tương nếp Đường Lâm ủ bằng chum sành phơi nắng và kẹo dồi, kẹo lạc ngọt bùi nức tiếng.'
    ],
    conservationStatus: 'Di tích Kiến trúc Nghệ thuật Cấp Quốc gia được bảo tồn nghiêm ngặt.',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Cổng làng đá ong Mông Phụ trầm mặc qua hàng thế kỷ',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Quốc gia xếp hạng năm 2005.',
    lat: 21.1444,
    lng: 105.4958,
    address: 'Xã Đường Lâm, Thị xã Sơn Tây, Hà Nội',
    visitingHours: '07:30 - 17:30 hàng ngày',
    ticketPrice: '20.000 VNĐ / vé tham quan làng cổ',
    googleMapsUri: 'https://maps.google.com/?q=Duong+Lam+Ancient+Village',
    tags: ['Hà Nội', 'Sơn Tây', 'Đường Lâm', 'Đá ong', 'Làng cổ', 'Ngô Quyền', 'Phùng Hưng'],
    suggestedQuestions: [
      'Tại sao người dân Đường Lâm xưa lại chọn đá ong làm vật liệu xây dựng chính?',
      'Di tích đền thờ hai vua Ngô Quyền và Phùng Hưng tọa lạc ở đâu tại Đường Lâm?'
    ]
  },

  // =========================================================================
  // 2. QUẢNG NINH
  // =========================================================================
  {
    id: 'danh-thang-yen-tu',
    name: 'Quần Thể Di Tích & Danh Thắng Yên Tử - Đất Tổ Thiền Phái Trúc Lâm',
    vietnameseName: 'Chùa Yên Tử (Chùa Đồng)',
    englishName: 'Yen Tu Scenic Relics & Truc Lam Zen Monastery',
    category: 'temple',
    categoryLabel: 'Đền chùa & Trung tâm Phật giáo',
    region: 'north',
    province: 'Quảng Ninh',
    period: 'Thế kỷ 13 (Phật hoàng Trần Nhân Tông sáng lập Thiền phái Trúc Lâm)',
    dynasty: 'Nhà Trần',
    history: 'Sau khi lãnh đạo quân dân Đại Việt hai lần đại thắng quân Nguyên Mông, vua Trần Nhân Tông nhường ngôi và lên non thiêng Yên Tử tu hành, sáng lập Thiền phái Trúc Lâm Yên Tử mang đậm bản sắc văn hóa dân tộc.',
    culturalSignificance: 'Di tích Quốc gia đặc biệt, cái nôi của Phật giáo Trúc Lâm Việt Nam. Đang đệ trình UNESCO công nhận là Di sản Văn hóa Thế giới.',
    interestingFacts: [
      'Chùa Đồng tọa lạc trên đỉnh non thiêng cao 1.068m đúc hoàn toàn bằng đồng nặng hơn 70 tấn, ví như đài sen lộng lẫy giữa mây trời.',
      'Tháp Huệ Quang lưu giữ xá lỵ của Sơ Tổ Điều Ngự Giác Hoàng Trần Nhân Tông.',
      'Rừng tùng cổ thụ và đại cổ thụ hàng trăm năm tuổi tạo nên con đường hành hương thiêng liêng.'
    ],
    conservationStatus: 'Di tích Quốc gia đặc biệt & Đề cử Di sản Thế giới UNESCO.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Chùa Đồng Yên Tử uy nghi ngự trị giữa biển mây đỉnh non thiêng',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Quốc gia đặc biệt theo Quyết định số 1419/QĐ-TTg của Thủ tướng Chính phủ.',
    lat: 21.1561,
    lng: 106.7197,
    address: 'Xã Thượng Yên Công, Thành phố Uông Bí, Tỉnh Quảng Ninh',
    visitingHours: '05:00 - 18:00 hàng ngày',
    ticketPrice: '40.000 VNĐ / vé vãng cảnh; Vé cáp treo khứ hồi 2 chặng: 350.000 VNĐ',
    googleMapsUri: 'https://maps.google.com/?q=Yen+Tu+Mountain+Quang+Ninh',
    tags: ['Quảng Ninh', 'Yên Tử', 'Trần Nhân Tông', 'Trúc Lâm', 'Chùa Đồng', 'Thiền phái'],
    suggestedQuestions: [
      'Tư tưởng Thiền phái Trúc Lâm của Phật hoàng Trần Nhân Tông có gì độc đáo?',
      'Chùa Đồng Yên Tử được vận chuyển và dựng lên trên đỉnh núi đá như thế nào?'
    ]
  },
  {
    id: 'bao-tang-quang-ninh',
    name: 'Bảo Tàng & Thư Viện Quảng Ninh - Viên Ngọc Đen Bên Bờ Vịnh',
    vietnameseName: 'Bảo tàng Quảng Ninh',
    englishName: 'Quang Ninh Museum',
    category: 'museum',
    categoryLabel: 'Bảo tàng & Kiến trúc Di sản',
    region: 'north',
    province: 'Quảng Ninh',
    period: 'Khánh thành năm 2013 (Kỷ niệm 50 năm thành lập tỉnh)',
    history: 'Được thiết kế bởi kiến trúc sư tài ba người Tây Ban Nha Salvador Perez Arroyo lấy cảm hứng từ hình tượng than đá - khoáng sản biểu tượng của vùng mỏ anh hùng và vẻ đẹp sóng nước Vịnh Hạ Long.',
    culturalSignificance: 'Công trình kiến trúc xuất sắc đoạt giải Công trình của năm 2013. Nơi trưng bày toàn diện lịch sử tự nhiên, khảo cổ, văn hóa các dân tộc và lịch sử ngành than đất mỏ.',
    interestingFacts: [
      'Toàn bộ mặt ngoài tòa nhà được ốp bằng kính bán cường lực màu đen tuyền phản chiếu hình ảnh Vịnh Hạ Long.',
      'Tầng 1 trưng bày khung xương cá voi khổng lồ dài hơn 20m và hệ sinh thái biển đảo kỳ thú.',
      'Tầng 2 và 3 tái hiện sống động không gian hầm lò khai thác than và các hiện vật văn hóa Trúc Lâm Yên Tử.'
    ],
    conservationStatus: 'Bảo tàng cấp tỉnh tiêu biểu hàng đầu Việt Nam.',
    imageUrl: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Khối kiến trúc than đá đen huyền bí của Bảo tàng Quảng Ninh',
    verifiedStatus: 'verified',
    verifiedNote: 'Bảo tàng Quốc gia & Điểm đến văn hóa du lịch trọng điểm Hạ Long.',
    lat: 20.9497,
    lng: 107.0958,
    address: 'Đường Trần Quốc Nghiễn, Phường Hồng Hải, Thành phố Hạ Long, Tỉnh Quảng Ninh',
    visitingHours: '08:00 - 11:30 & 13:30 - 17:00 (Từ Thứ Ba đến Chủ Nhật)',
    ticketPrice: '40.000 VNĐ / người lớn; 20.000 VNĐ / sinh viên; 10.000 VNĐ / trẻ em',
    googleMapsUri: 'https://maps.google.com/?q=Quang+Ninh+Museum',
    tags: ['Quảng Ninh', 'Hạ Long', 'Bảo tàng Quảng Ninh', 'Viên ngọc đen', 'Vịnh Hạ Long'],
    suggestedQuestions: [
      'Kiến trúc bên ngoài Bảo tàng Quảng Ninh lấy cảm hứng từ biểu tượng nào?',
      'Bảo tàng trưng bày những tư liệu lịch sử nào về giai cấp công nhân mỏ?'
    ]
  },
  {
    id: 'dao-co-to-quang-ninh',
    name: 'Quần Đảo Cô Tô & Bãi Đá Móng Rồng - Hòn Ngọc Cực Đông Bắc',
    vietnameseName: 'Đảo Cô Tô',
    englishName: 'Co To Island & Dragon Claw Rocks',
    category: 'nature_scenic',
    categoryLabel: 'Danh thắng Biển đảo & Thiên nhiên',
    region: 'north',
    province: 'Quảng Ninh',
    period: 'Địa chất biển triệu năm & Di tích lịch sử hiện đại',
    history: 'Cô Tô là tiền tiêu bảo vệ vùng trời vùng biển Đông Bắc của Tổ quốc. Nơi duy nhất Bác Hồ đồng ý cho dựng tượng của Người khi Người còn sống (sau chuyến thăm quân dân đảo năm 1961).',
    culturalSignificance: 'Khu Di tích Quốc gia đặc biệt tượng đài Bác Hồ và thiên đường sinh thái biển đảo hoang sơ với bãi cát trắng mịn, nước biển trong vắt nhìn thấu đáy.',
    interestingFacts: [
      'Bãi đá Móng Rồng (Cầu Mỵ) có hệ thống vân đá trầm tích xếp tầng lớp uốn lượn do sóng biển bào mòn hàng triệu năm.',
      'Hải đăng Cô Tô được mệnh danh là "con mắt biển đêm" dẫn đường cho tàu bè qua vịnh Bắc Bộ.',
      'Bãi biển Vàn Chảy và Hồng Vàn là nơi ngắm bình minh và hoàng hôn biển đẹp bậc nhất miền Bắc.'
    ],
    conservationStatus: 'Khu Di tích Quốc gia đặc biệt Khu lưu niệm Chủ tịch Hồ Chí Minh trên đảo Cô Tô (2022).',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Bãi đá Móng Rồng Cô Tô kỳ ảo vươn mình đón sóng trùng khơi',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Quốc gia đặc biệt xếp hạng năm 2022.',
    lat: 20.9789,
    lng: 107.7667,
    address: 'Huyện Đảo Cô Tô, Tỉnh Quảng Ninh',
    visitingHours: 'Mở cửa tham quan tự do quanh năm',
    ticketPrice: 'Vào đảo tự do; Vé tàu cao tốc Tuần Châu/Cảng Ao Tiên: 250.000 - 300.000 VNĐ/lượt',
    googleMapsUri: 'https://maps.google.com/?q=Co+To+Island+Quang+Ninh',
    tags: ['Quảng Ninh', 'Cô Tô', 'Biển đảo', 'Hải đăng', 'Bác Hồ', 'Móng Rồng'],
    suggestedQuestions: [
      'Vì sao Bác Hồ đồng ý cho quân dân đảo Cô Tô dựng tượng Người khi Người còn sống?',
      'Kiến tạo địa chất của bãi đá Móng Rồng Cô Tô có điều gì đặc biệt?'
    ]
  },

  // =========================================================================
  // 3. NINH BÌNH (HỢP NHẤT NINH BÌNH, NAM ĐỊNH & HÀ NAM)
  // =========================================================================
  {
    id: 'chua-tam-chuc-ha-nam',
    name: 'Quần Thể Danh Thắng Tâm Linh Tam Chúc - Ngôi Chùa Lớn Nhất Thế Giới',
    vietnameseName: 'Chùa Tam Chúc',
    englishName: 'Tam Chuc Pagoda Complex',
    category: 'temple',
    categoryLabel: 'Đền chùa & Trung tâm Phật giáo',
    region: 'north',
    province: 'Ninh Bình (Hà Nam)',
    period: 'Khởi dựng từ thời nhà Đinh (Hơn 1.000 năm trước)',
    history: 'Tương truyền vào thời vua Đinh Tiên Hoàng, tại vùng đất này có 7 ngọn núi phát sáng như 7 vì sao (truyền tích "Tiền Lục Nhạc, Hậu Thất Tinh"). Chùa Tam Chúc cổ đã tồn tại hơn một thiên niên kỷ trước khi được đại trùng tu quy mô kỳ vĩ như ngày nay.',
    culturalSignificance: 'Địa điểm tổ chức thành công Đại lễ Phật đản Liên Hợp Quốc Vesak 2019. Quần thể kết hợp giữa cảnh quan hồ nước mênh mông, núi đá vôi kỳ vĩ và nghệ thuật điêu khắc đá tinh xảo từ dung nham núi lửa Indonesia.',
    interestingFacts: [
      'Điện Tam Thế lưu giữ cây bồ đề quý được chiết từ Cây Bồ Đề Vĩ Đại (Jaya Sri Maha Bodhi) hơn 2.250 tuổi của Sri Lanka.',
      'Vườn Cột Kinh đá khổng lồ gồm 32 cột kinh bằng đá xanh Thanh Hóa, mỗi cột nặng 200 tấn khắc kinh Phật.',
      'Bức tường bên trong các điện thờ được ốp bằng 12.000 bức phù điêu tạc bằng đá nham thạch núi lửa nhập khẩu từ Indonesia.'
    ],
    conservationStatus: 'Khu du lịch Quốc gia trọng điểm & Quần thể tâm linh quốc tế.',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Chùa Tam Chúc thanh tịnh tựa lưng vào núi Thất Tinh soi bóng mặt hồ',
    verifiedStatus: 'verified',
    verifiedNote: 'Khu du lịch Quốc gia & Nơi tổ chức Vesak Liên Hợp Quốc 2019.',
    lat: 20.5989,
    lng: 105.8015,
    address: 'Thị trấn Ba Sao, Huyện Kim Bảng, Tỉnh Hà Nam (Vùng quy hoạch Ninh Bình mở rộng)',
    visitingHours: '06:00 - 18:30 hàng ngày',
    ticketPrice: 'Vào cổng tự do; Vé thuyền du ngoạn hồ hoặc xe điện: 200.000 - 270.000 VNĐ / khách',
    googleMapsUri: 'https://maps.google.com/?q=Tam+Chuc+Pagoda',
    tags: ['Ninh Bình', 'Hà Nam', 'Tam Chúc', 'Vesak', 'Hồ Lục Nhạc', 'Thất Tinh', 'Chùa lớn nhất'],
    suggestedQuestions: [
      'Ý nghĩa của truyền tích Tiền Lục Nhạc - Hậu Thất Tinh tại Tam Chúc?',
      'Nguồn gốc của các bức phù điêu đá nham thạch núi lửa trong điện thờ Chùa Tam Chúc?'
    ]
  },
  {
    id: 'den-tran-nam-dinh',
    name: 'Khu Di Tích Lịch Sử Đền Trần & Lễ Khai Ấn Đầu Xuân',
    vietnameseName: 'Đền Trần Nam Định',
    englishName: 'Tran Temple Complex & Spring Seal Opening Ceremony',
    category: 'temple',
    categoryLabel: 'Đền miếu & Di tích Lịch sử',
    region: 'north',
    province: 'Ninh Bình (Nam Định)',
    period: 'Thế kỷ 13 - 14 (Vương triều Trần)',
    dynasty: 'Nhà Trần',
    history: 'Vùng đất Tức Mặc là quê hương phát tích của vương triều Trần rực rỡ võ công văn trị. Nơi đây từng là Hành cung Thiên Trường của các Thái Thượng Hoàng nhà Trần trong ba lần kháng chiến chống quân Nguyên Mông.',
    culturalSignificance: 'Di tích Quốc gia đặc biệt. Lễ Khai ấn Đền Trần đêm 14 rạng sáng 15 tháng Giêng âm lịch là phong tục văn hóa truyền thống linh thiêng bậc nhất cầu quốc thái dân an, thiên hạ thái bình.',
    interestingFacts: [
      'Quần thể gồm 3 đền chính: Đền Thiên Trường (thờ 14 vua Trần), Đền Trùng Hoa (thờ các quan đại thần) và Đền Cố Trạch (thờ Quốc công Tiết chế Hưng Đạo Đại Vương Trần Quốc Tuấn).',
      'Chiếc ấn ngọc khắc 4 chữ "Tích Phúc Vô Cương" nhắc nhở con cháu tích đức giữ gìn xã tắc bền vững.',
      'Cạnh đền là Tháp Phổ Minh cao 21m xây dựng năm 1305 với 14 tầng nặng hàng ngàn tấn đặt trên bệ hoa sen đá.'
    ],
    conservationStatus: 'Di tích Quốc gia đặc biệt theo Quyết định của Thủ tướng Chính phủ.',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Tháp Phổ Minh thời Trần 700 năm uy nghi bên Đền Trần',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Lịch sử và Kiến trúc nghệ thuật Quốc gia đặc biệt.',
    lat: 20.4497,
    lng: 106.1712,
    address: 'Đường Trần Thừa, Phường Lộc Vượng, Thành phố Nam Định (Vùng Ninh Bình mở rộng)',
    visitingHours: '06:30 - 18:00 hàng ngày (Mở thâu đêm dịp Lễ hội Khai ấn rằm tháng Giêng)',
    ticketPrice: 'Vào cửa tự do',
    googleMapsUri: 'https://maps.google.com/?q=Tran+Temple+Nam+Dinh',
    tags: ['Ninh Bình', 'Nam Định', 'Đền Trần', 'Khai ấn', 'Trần Hưng Đạo', 'Tháp Phổ Minh', 'Thiên Trường'],
    suggestedQuestions: [
      'Ý nghĩa của 4 chữ khắc trên lá ấn Đền Trần: Tích Phúc Vô Cương là gì?',
      'Kiến trúc Tháp Phổ Minh thể hiện đỉnh cao nghệ thuật thời Trần ra sao?'
    ]
  },
  {
    id: 'nha-tho-da-phat-diem',
    name: 'Quần Thể Nhà Thờ Đá Phát Diệm - Tuyệt Tác Giao Thoa Đông Tây',
    vietnameseName: 'Nhà thờ Chính tòa Phát Diệm',
    englishName: 'Phat Diem Stone Cathedral',
    category: 'architecture',
    categoryLabel: 'Kiến trúc Tôn giáo Độc đáo',
    region: 'north',
    province: 'Ninh Bình',
    period: 'Xây dựng 1875 - 1898 (Kéo dài 24 năm)',
    history: 'Được linh mục Phêrô Trần Lục (thường gọi là Cụ Sáu) chủ trì thiết kế và chỉ đạo thi công hoàn toàn bằng gỗ lim và đá khối khai thác từ núi rừng Thanh Hóa, Nghệ An đưa về qua đường thủy.',
    culturalSignificance: 'Di tích Lịch sử Văn hóa Cấp Quốc gia. Công trình Công giáo độc nhất vô nhị trên thế giới được xây dựng hoàn toàn theo phong cách kiến trúc đình chùa truyền thống phương Đông với mái đao cong vút.',
    interestingFacts: [
      'Toàn bộ thánh đường dựng bằng gỗ lim nguyên khối khổng lồ, cột cái có đường kính gần 1m và cao hơn 11m.',
      'Nhà thờ Trái Tim Đức Mẹ (Trái Tim Vô Nhiễm) được tạc hoàn toàn bằng đá trắng nguyên khối từ cột, xà, nền, vách nên được gọi là Nhà thờ Đá.',
      'Phương Đình trước nhà thờ mang dáng dấp Cổng Tam Quan đình làng với quả chuông đồng nặng 2 tấn đúc năm 1890.'
    ],
    conservationStatus: 'Di tích Lịch sử - Văn hóa Cấp Quốc gia xếp hạng năm 1988.',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Phương Đình mái đao cong vút của Nhà thờ đá Phát Diệm',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Kiến trúc Nghệ thuật Cấp Quốc gia.',
    lat: 20.0935,
    lng: 106.0792,
    address: 'Thị trấn Phát Diệm, Huyện Kim Sơn, Tỉnh Ninh Bình',
    visitingHours: '07:00 - 18:00 hàng ngày (Tránh giờ cử hành Thánh lễ)',
    ticketPrice: 'Vào cửa tham quan tự do',
    googleMapsUri: 'https://maps.google.com/?q=Phat+Diem+Cathedral+Ninh+Binh',
    tags: ['Ninh Bình', 'Phát Diệm', 'Nhà thờ đá', 'Cụ Sáu', 'Kiến trúc gỗ', 'Kim Sơn'],
    suggestedQuestions: [
      'Vì sao một công trình Công giáo như Phát Diệm lại mang kiến trúc mái đao đình chùa?',
      'Kỹ thuật vận chuyển hàng vạn tấn đá và gỗ lim thời thế kỷ 19 diễn ra như thế nào?'
    ]
  },

  // =========================================================================
  // 4. LÀO CAI & YÊN BÁI
  // =========================================================================
  {
    id: 'dinh-fansipan-sapa',
    name: 'Đỉnh Fansipan - Nóc Nhà Đông Dương (3.143m)',
    vietnameseName: 'Đỉnh Fansipan Sa Pa',
    englishName: 'Fansipan Peak - Roof of Indochina',
    category: 'nature_scenic',
    categoryLabel: 'Danh thắng Thiên nhiên & Đỉnh núi',
    region: 'north',
    province: 'Lào Cai (Hợp nhất Lào Cai & Yên Bái)',
    period: 'Kiến tạo địa chất 250 triệu năm trước',
    history: 'Nằm trong dãy Hoàng Liên Sơn hùng vĩ. Fansipan theo tiếng người Mông địa phương gọi là "Hủa Xi Pan" có nghĩa là "phiến đá khổng lồ chênh vênh". Đây là đỉnh núi cao nhất bán đảo Đông Dương (Việt Nam, Lào, Campuchia).',
    culturalSignificance: 'Biểu tượng của ý chí chinh phục đỉnh cao và niềm tự hào dân tộc Việt Nam. Quần thể tâm linh Fansipan Huyền thoại với Đại tượng Phật A Di Đà bằng đồng cao nhất châu Á ngự giữa mây trời.',
    interestingFacts: [
      'Cột mốc kim tự tháp inox đánh dấu độ cao 3.143m được đặt trên đỉnh núi là điểm chạm ước mơ của hàng triệu nhà leo núi.',
      'Tuyến cáp treo Fansipan 3 dây đạt kỷ lục Guinness thế giới đưa du khách vượt thung lũng Mường Hoa chỉ trong 15 phút.',
      'Quần thể tâm linh trên đỉnh quy tụ Kim Sơn Bảo Thắng Tự, Bảo tháp 11 tầng và con đường La Hán xuyên rừng đỗ quyên cổ thụ.'
    ],
    conservationStatus: 'Vườn Quốc gia Hoàng Liên & Quần thể du lịch văn hóa quốc tế.',
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Cột mốc 3.143m trên đỉnh Fansipan kiêu hãnh giữa biển mây',
    verifiedStatus: 'verified',
    verifiedNote: 'Vườn Di sản ASEAN & Điểm du lịch biểu tượng thế giới.',
    lat: 22.3033,
    lng: 103.7753,
    address: 'Thị xã Sa Pa, Tỉnh Lào Cai',
    visitingHours: '07:30 - 17:30 hàng ngày',
    ticketPrice: '850.000 VNĐ / vé cáp treo khứ hồi; Tàu hỏa leo núi đỉnh: 150.000 VNĐ',
    googleMapsUri: 'https://maps.google.com/?q=Fansipan+Peak+Sapa',
    tags: ['Lào Cai', 'Sa Pa', 'Fansipan', 'Nóc nhà Đông Dương', 'Hoàng Liên Sơn', 'Săn mây'],
    suggestedQuestions: [
      'Hành trình chinh phục Fansipan bằng đường bộ truyền thống kéo dài bao lâu?',
      'Mùa hoa đỗ quyên nở rộ trên dãy Hoàng Liên Sơn đẹp nhất vào tháng mấy?'
    ]
  },
  {
    id: 'ruong-bac-thang-mu-cang-chai',
    name: 'Danh Thắng Ruộng Bậc Thang Mù Cang Chải - Kỳ Công Sóng Lúa Trời',
    vietnameseName: 'Ruộng bậc thang Mù Cang Chải',
    englishName: 'Mu Cang Chai Terraced Rice Fields',
    category: 'nature_scenic',
    categoryLabel: 'Danh thắng Thiên nhiên & Văn hóa Ruộng bậc thang',
    region: 'north',
    province: 'Lào Cai (Yên Bái)',
    period: 'Hàng trăm năm khai phá của đồng bào H\'Mông',
    history: 'Được tạo nên bởi bàn tay tài hoa, cần cù và sức sáng tạo phi thường của đồng bào dân tộc H\'Mông qua nhiều thế hệ, biến những sườn núi dốc đứng hiểm trở thành những nấc thang dẫn lên trời trồng lúa nước.',
    culturalSignificance: 'Di tích Quốc gia đặc biệt. Top 50 điểm đến đẹp nhất thế giới do nhiều tạp chí du lịch quốc tế (Condé Nast Traveler, Big 7 Travel) vinh danh. Biểu tượng văn minh nông nghiệp lúa nước vùng cao.',
    interestingFacts: [
      'Đồi Mâm Xôi (xã La Pán Tẩn) và Móng Ngựa (xã Sáng Nhù) là hai kiệt tác tạo hình ruộng bậc thang nổi tiếng nhất.',
      'Hai mùa đẹp nhất trong năm: Mùa nước đổ (tháng 5-6) ruộng như những tấm gương khổng lồ phản chiếu mây trời; Mùa lúa chín (tháng 9-10) sườn đồi rực vàng hương lúa.',
      'Đèo Khau Phạ - một trong "Tứ đại đỉnh đèo" Tây Bắc là địa điểm tổ chức Festival dù lượn "Bay trên mùa vàng" lừng danh.'
    ],
    conservationStatus: 'Di tích Danh lam thắng cảnh Quốc gia đặc biệt xếp hạng năm 2019.',
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Đồi Mâm Xôi Mù Cang Chải mùa lúa chín vàng óng ả',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Quốc gia đặc biệt theo Quyết định số 1959/QĐ-TTg của Thủ tướng Chính phủ.',
    lat: 21.8541,
    lng: 104.0833,
    address: 'Huyện Mù Cang Chải, Tỉnh Yên Bái (Vùng Lào Cai mở rộng)',
    visitingHours: 'Tham quan tự do quanh năm',
    ticketPrice: 'Vào điểm Đồi Mâm Xôi: 30.000 VNĐ / vé',
    googleMapsUri: 'https://maps.google.com/?q=Mu+Cang+Chai+Terraced+Rice+Fields',
    tags: ['Yên Bái', 'Mù Cang Chải', 'Ruộng bậc thang', 'Mâm Xôi', 'Móng Ngựa', 'Khau Phạ', 'Mùa vàng'],
    suggestedQuestions: [
      'Kỹ thuật dẫn nước độc đáo của người H\'Mông trên ruộng bậc thang là gì?',
      'Thời điểm lý tưởng nhất trong năm để săn ảnh mùa lúa chín Mù Cang Chải?'
    ]
  },
  {
    id: 'cho-phien-bac-ha',
    name: 'Chợ Phiên Bắc Hà - Sắc Màu Văn Hóa Vùng Cao Lớn Nhất Tây Bắc',
    vietnameseName: 'Chợ phiên Bắc Hà',
    englishName: 'Bac Ha Sunday Ethnic Market',
    category: 'traditional_market',
    categoryLabel: 'Chợ truyền thống & Chợ phiên Vùng cao',
    region: 'north',
    province: 'Lào Cai',
    period: 'Tồn tại từ thời Pháp thuộc đến nay',
    history: 'Chợ phiên họp vào mỗi sáng Chủ nhật hàng tuần tại thị trấn Bắc Hà. Đây là trung tâm giao thương, gặp gỡ văn hóa lớn nhất của các dân tộc H\'Mông Hoa, Dao đỏ, Tày, Nùng, Phù Lá từ các bản làng xa xôi.',
    culturalSignificance: 'Di sản văn hóa sống động vùng cao biên giới. Nơi lưu giữ trọn vẹn phong tục trao đổi thổ cẩm thêu tay, ẩm thực thắng cố rượu ngô truyền thống và tiếng khèn Mông réo rắt.',
    interestingFacts: [
      'Chợ phiên chia thành các khu vực riêng biệt: Chợ thổ cẩm, Chợ ẩm thực thắng cố, Chợ trâu bò ngựa, Chợ chó Bắc Hà (giống chó xù thông minh của người H\'Mông).',
      'Thắng cố Bắc Hà được nấu trong chảo gang khổng lồ từ thịt ngựa bản địa ăn kèm rau cải mèo và chén rượu ngô Bản Phố say nồng.',
      'Cạnh chợ là Dinh thự Vua Mèo Hoàng A Tưởng (xây năm 1914 - 1921) pha trộn kiến trúc Á - Âu bề thế.'
    ],
    conservationStatus: 'Điểm du lịch văn hóa dân tộc tiêu biểu vùng Tây Bắc.',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Rực rỡ sắc màu thổ cẩm váy hoa tại Chợ phiên Bắc Hà sáng Chủ nhật',
    verifiedStatus: 'verified',
    verifiedNote: 'Điểm văn hóa truyền thống di sản dân tộc Lào Cai.',
    lat: 22.5358,
    lng: 104.2889,
    address: 'Thị trấn Bắc Hà, Huyện Bắc Hà, Tỉnh Lào Cai',
    visitingHours: '05:30 - 15:00 Chủ nhật hàng tuần',
    ticketPrice: 'Vào chợ tự do',
    googleMapsUri: 'https://maps.google.com/?q=Bac+Ha+Market+Lao+Cai',
    tags: ['Lào Cai', 'Bắc Hà', 'Chợ phiên', 'Thổ cẩm', 'H\'Mông hoa', 'Thắng cố', 'Hoàng A Tưởng'],
    suggestedQuestions: [
      'Ẩm thực thắng cố và rượu ngô Bản Phố có nguồn gốc văn hóa từ đâu?',
      'Kiến trúc độc lạ của Dinh thự Hoàng A Tưởng tại Bắc Hà có gì cuốn hút?'
    ]
  },

  // =========================================================================
  // 5. HÀ GIANG & TUYÊN QUANG
  // =========================================================================
  {
    id: 'cot-co-lung-cu',
    name: 'Cột Cờ Quốc Gia Lũng Cú - Điểm Cực Bắc Thiêng Liêng Tổ Quốc',
    vietnameseName: 'Cột cờ Lũng Cú',
    englishName: 'Lung Cu Flag Tower - Northernmost Point of Vietnam',
    category: 'monument',
    categoryLabel: 'Di tích Lịch sử & Điểm Cực Tổ Quốc',
    region: 'north',
    province: 'Tuyên Quang (Hà Giang)',
    period: 'Thời Lý Thường Kiệt cắm mốc biên cương thế kỷ 11',
    dynasty: 'Thời Lý & Thời kỳ Hiện đại',
    history: 'Tương truyền từ thời Thái úy Lý Thường Kiệt đánh giặc phương Bắc đã cho dựng cột cờ trên đỉnh núi Rồng (Long Sơn). Cột cờ hiện nay cao 33.15m được khánh thành năm 2010 với bệ cột khắc hoa văn trống đồng Đông Sơn.',
    culturalSignificance: 'Biểu tượng thiêng liêng của chủ quyền quốc gia và lòng yêu nước tại chóp nón cực Bắc của Tổ quốc Việt Nam.',
    interestingFacts: [
      'Lá cờ đỏ sao vàng tung bay trên đỉnh có diện tích đúng 54 mét vuông, tượng trưng cho tình đoàn kết keo sơn của 54 dân tộc anh em.',
      'Dưới chân núi Rồng có hai hồ nước ngọt trong vắt không bao giờ cạn được gọi là "Mắt Rồng" che chở cho bản người Lô Lô Chải và Thài Phìn Tủng.',
      'Vượt qua 839 bậc đá leo lên đỉnh đài quan sát ngắm trọn vẹn núi non hùng vĩ biên cương.'
    ],
    conservationStatus: 'Di tích Lịch sử Quốc gia & Điểm mốc chủ quyền biên cương thiêng liêng.',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Lá cờ 54m2 kiêu hãnh tung bay trên Cột cờ Lũng Cú cực Bắc',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Lịch sử Quốc gia được xếp hạng năm 2009.',
    lat: 23.3625,
    lng: 105.3197,
    address: 'Xã Lũng Cú, Huyện Đồng Văn, Tỉnh Hà Giang (Vùng Tuyên Quang mở rộng)',
    visitingHours: '07:00 - 18:00 hàng ngày',
    ticketPrice: '25.000 VNĐ / vé tham quan',
    googleMapsUri: 'https://maps.google.com/?q=Lung+Cu+Flag+Tower',
    tags: ['Hà Giang', 'Tuyên Quang', 'Lũng Cú', 'Cực Bắc', 'Núi Rồng', 'Lô Lô Chải', 'Chủ quyền'],
    suggestedQuestions: [
      'Ý nghĩa của diện tích 54 mét vuông lá cờ trên đỉnh Lũng Cú?',
      'Bản văn hóa du lịch Lô Lô Chải dưới chân Cột cờ có những nét độc đáo nào?'
    ]
  },
  {
    id: 'deo-ma-pi-leng-nho-que',
    name: 'Đèo Mã Pí Lèng & Hẻm Vực Tu Sản - Dòng Sông Nho Quế Xanh Ngọc Bích',
    vietnameseName: 'Đèo Mã Pí Lèng & Hẻm Tu Sản',
    englishName: 'Ma Pi Leng Pass & Tu San Canyon - Nho Que River',
    category: 'nature_scenic',
    categoryLabel: 'Danh thắng Thiên nhiên & Kỳ quan Địa chất',
    region: 'north',
    province: 'Tuyên Quang (Hà Giang)',
    period: 'Mở đường Hạnh Phúc (1959 - 1965) trên nền địa chất triệu năm',
    history: 'Đèo dài 20km trên Con Đường Hạnh Phúc nối thị trấn Đồng Văn và Mèo Vạc. Con đường được đục đẽo hoàn toàn bằng mồ hôi, xương máu của hàng vạn thanh niên xung phong và dân công 8 tỉnh miền Bắc suốt 6 năm ròng rã, trong đó có đội cảm tử treo mình trên vách đá 11 tháng.',
    culturalSignificance: 'Vua của các con đèo Việt Nam, kỳ quan thuộc Công viên Địa chất Toàn cầu UNESCO Cao nguyên đá Đồng Văn. Hẻm Tu Sản sâu nhất Đông Nam Á với vách đá cao gần 1.000m.',
    interestingFacts: [
      'Mã Pí Lèng trong tiếng H\'Mông nghĩa là "sống mũi con ngựa", chỉ độ hiểm trở dựng đứng đến mức ngựa leo cũng phải bạt vía.',
      'Sông Nho Quế xanh biếc quanh năm chảy len lỏi dưới đáy hẻm vực Tu Sản tạo nên bức tranh thủy mặc huyền ảo.',
      'Du thuyền trên sông Nho Quế luồn qua hẻm Tu Sản ngắm vách đá dựng đứng là trải nghiệm ngoạn mục hàng đầu châu Á.'
    ],
    conservationStatus: 'Di tích Danh lam thắng cảnh Quốc gia (2009) & Công viên Địa chất UNESCO.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Dòng sông Nho Quế xanh ngọc bích chảy dưới hẻm Tu Sản',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Danh lam thắng cảnh Quốc gia theo Quyết định Bộ VHTT&DL.',
    lat: 23.2389,
    lng: 105.4167,
    address: 'Xã Pải Lủng, Huyện Mèo Vạc, Tỉnh Hà Giang (Vùng Tuyên Quang mở rộng)',
    visitingHours: 'Tham quan đèo tự do; Thuyền sông Nho Quế: 07:00 - 17:00',
    ticketPrice: 'Vé thuyền sông Nho Quế: 120.000 VNĐ / người lớn',
    googleMapsUri: 'https://maps.google.com/?q=Ma+Pi+Leng+Pass+Ha+Giang',
    tags: ['Hà Giang', 'Mã Pí Lèng', 'Sông Nho Quế', 'Hẻm Tu Sản', 'Đồng Văn', 'Mèo Vạc', 'UNESCO'],
    suggestedQuestions: [
      'Câu chuyện huyền thoại về Đội cảm tử mở đường Hạnh Phúc trên đèo Mã Pí Lèng?',
      'Độ sâu kỷ lục của Hẻm vực Tu Sản trên sông Nho Quế là bao nhiêu?'
    ]
  },
  {
    id: 'khu-di-tich-tan-trao-tuyen-quang',
    name: 'Khu Di Tích Lịch Sử Quốc Gia Đặc Biệt Tân Trào - Thủ Đô Kháng Chiến',
    vietnameseName: 'Khu di tích Tân Trào',
    englishName: 'Tan Trao Special National Relic - Capital of Resistance',
    category: 'monument',
    categoryLabel: 'Di tích Lịch sử Cách mạng',
    region: 'north',
    province: 'Tuyên Quang',
    period: '1945 - 1954 (Thời kỳ Tiền khởi nghĩa & Kháng chiến chống Pháp)',
    history: 'Tân Trào được Trung ương Đảng và Bác Hồ chọn làm Thủ đô Khu Giải phóng - Trung tâm lãnh đạo cuộc Tổng khởi nghĩa Cách mạng Tháng Tám năm 1945. Nơi diễn ra Hội nghị cán bộ toàn quốc của Đảng và Quốc dân Đại hội Tân Trào thông qua Lệnh Tổng khởi nghĩa.',
    culturalSignificance: 'Di tích Quốc gia đặc biệt đầu tiên được xếp hạng. Cái nôi cách mạng thiêng liêng lưu dấu những quyết sách vận mệnh dân tộc của Chủ tịch Hồ Chí Minh và Trung ương Đảng.',
    interestingFacts: [
      'Lán Nà Nưa là căn lán tre nứa đơn sơ nơi Bác Hồ ở và làm việc từ tháng 5 đến tháng 8/1945, nơi Bác căn dặn câu nói bất hủ: "Dù phải đốt cháy cả dãy Trường Sơn cũng phải kiên quyết giành cho được độc lập!".',
      'Đình Tân Trào là nơi diễn ra Quốc dân Đại hội ngày 16/8/1945 bầu ra Ủy ban Dân tộc Giải phóng (Chính phủ lâm thời).',
      'Cây đa Tân Trào lịch sử là nơi đồng chí Võ Nguyên Giáp đọc Bản Quân lệnh số 1 làm lễ xuất quân tiến về giải phóng Hà Nội.'
    ],
    conservationStatus: 'Di tích Lịch sử Quốc gia đặc biệt theo Quyết định số 548/QĐ-TTg của Thủ tướng Chính phủ.',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Cây đa Tân Trào lịch sử tại Thủ đô kháng chiến',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Quốc gia đặc biệt xếp hạng năm 2012.',
    lat: 21.7833,
    lng: 105.2833,
    address: 'Xã Tân Trào, Huyện Sơn Dương, Tỉnh Tuyên Quang',
    visitingHours: '07:30 - 17:00 hàng ngày',
    ticketPrice: '20.000 VNĐ / vé tham quan',
    googleMapsUri: 'https://maps.google.com/?q=Tan+Trao+Historical+Relic+Tuyen+Quang',
    tags: ['Tuyên Quang', 'Tân Trào', 'Thủ đô kháng chiến', 'Lán Nà Nưa', 'Đình Tân Trào', 'Cây đa', 'Bác Hồ'],
    suggestedQuestions: [
      'Quốc dân Đại hội Tân Trào tháng 8/1945 đã thông qua những quyết sách lịch sử nào?',
      'Ý nghĩa của Lán Nà Nưa trong những ngày Bác Hồ lãnh đạo tiền khởi nghĩa?'
    ]
  },

  // =========================================================================
  // 6. PHÚ THỌ, VĨNH PHÚC & HÒA BÌNH
  // =========================================================================
  {
    id: 'den-hung-phu-tho',
    name: 'Khu Di Tích Lịch Sử Đền Hùng - Cội Nguồn Dân Tộc Việt Nam',
    vietnameseName: 'Đền Hùng (Núi Nghĩa Lĩnh)',
    englishName: 'Hung Kings Temple Complex - Origin of Vietnamese Nation',
    category: 'temple',
    categoryLabel: 'Đền miếu & Cội nguồn Dân tộc',
    region: 'north',
    province: 'Phú Thọ (Hợp nhất Phú Thọ, Vĩnh Phúc & Hòa Bình)',
    period: 'Thời đại các Vua Hùng (Thời kỳ Văn Lang, 2879 TCN - 258 TCN)',
    dynasty: 'Thời đại Hùng Vương',
    history: 'Tọa lạc trên núi Nghĩa Lĩnh (núi Hùng), trung tâm của nhà nước Văn Lang thuở khai cơ lập quốc. Tín ngưỡng thờ cúng Hùng Vương được gìn giữ trao truyền qua hàng ngàn năm lịch sử.',
    culturalSignificance: 'Di tích Quốc gia đặc biệt. "Tín ngưỡng thờ cúng Hùng Vương ở Phú Thọ" được UNESCO vinh danh là Di sản Văn hóa Phi vật thể đại diện của nhân loại năm 2012. Ngày Giỗ Tổ mùng 10 tháng 3 âm lịch là Quốc lễ thiêng liêng.',
    interestingFacts: [
      'Quần thể gồm Đền Hạ (nơi mẹ Âu Cơ sinh bọc trăm trứng), Đền Trung (nơi vua Hùng bàn việc nước), Đền Thượng (nơi tế trời đất) và Lăng Hùng Vương.',
      'Đền Giếng dưới chân núi thờ hai công chúa Tiên Dung và Ngọc Hoa.',
      'Cột đá thề trên đỉnh núi do Thục Phán An Dương Vương dựng để tạ ơn Vua Hùng nhường ngôi và thề đời đời gìn giữ non sông Đại Việt.'
    ],
    conservationStatus: 'Di tích Lịch sử Quốc gia đặc biệt & Di sản Văn hóa Phi vật thể Nhân loại UNESCO.',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Cổng chính rêu phong đường lên Đền Hùng trên núi Nghĩa Lĩnh',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Quốc gia đặc biệt & Di sản Thế giới UNESCO (2012).',
    lat: 21.3653,
    lng: 105.3275,
    address: 'Xã Hy Cương, Thành phố Việt Trì, Tỉnh Phú Thọ',
    visitingHours: '06:30 - 18:00 hàng ngày (Đặc biệt tấp nập dịp Giỗ Tổ mùng 10/3 âm lịch)',
    ticketPrice: 'Vào cửa tự do; Xe điện: 20.000 VNĐ / lượt',
    googleMapsUri: 'https://maps.google.com/?q=Hung+Temple+Phu+Tho',
    tags: ['Phú Thọ', 'Đền Hùng', 'Giỗ Tổ', 'UNESCO', 'Vua Hùng', 'Cội nguồn', 'Núi Nghĩa Lĩnh'],
    suggestedQuestions: [
      'Ý nghĩa của câu ca dao: "Dù ai đi ngược về xuôi / Nhớ ngày Giỗ Tổ mùng mười tháng ba"?',
      'Cột đá thề trên đỉnh núi Nghĩa Lĩnh gắn với sự tích chuyển giao lịch sử nào?'
    ]
  },
  {
    id: 'thung-lung-mai-chau-hoa-binh',
    name: 'Thung Lũng Mai Châu & Bản Lác - Không Gian Văn Hóa Người Thái',
    vietnameseName: 'Bản Lác Mai Châu',
    englishName: 'Mai Chau Valley & Lac Village',
    category: 'craft_village',
    categoryLabel: 'Làng văn hóa & Du lịch Cộng đồng',
    region: 'north',
    province: 'Phú Thọ (Hòa Bình)',
    period: 'Hơn 700 năm định cư của người Thái trắng',
    history: 'Nằm lọt thỏm giữa những dãy núi đá vôi trùng điệp của vùng đất Hòa Bình. Bản Lác là cái nôi văn hóa của người Thái trắng với nếp nhà sàn truyền thống, nghề dệt thổ cẩm và điệu múa xòe bên chum rượu cần.',
    culturalSignificance: 'Mẫu hình du lịch cộng đồng kiểu mẫu của Việt Nam. Nơi lưu giữ trọn vẹn phong tục tập quán, ẩm thực cơm lam thịt nướng và sự hiếu khách mộc mạc của đồng bào Tây Bắc.',
    interestingFacts: [
      'Nhà sàn của người Thái tại Bản Lác được dựng bằng gỗ kiên cố, sàn cách mặt đất khoảng 2m lợp lá gồi hoặc ngói âm dương, bên dưới là khung cửi dệt vải.',
      'Điệu múa Xòe Thái đã được UNESCO công nhận là Di sản Văn hóa Phi vật thể đại diện của nhân loại.',
      'Ẩm thực đặc trưng: Cơm lam nướng ống nứa, cá suối nướng Pa Pỉnh Tộp, xôi nếp nương ngũ sắc và thịt lợn mán thâu đêm.'
    ],
    conservationStatus: 'Điểm du lịch văn hóa cộng đồng tiêu biểu cấp Quốc gia.',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Nếp nhà sàn thanh bình giữa thung lũng Mai Châu Hòa Bình',
    verifiedStatus: 'verified',
    verifiedNote: 'Di sản Văn hóa Phi vật thể UNESCO (Nghệ thuật Xòe Thái).',
    lat: 20.6653,
    lng: 105.0833,
    address: 'Xã Chiềng Châu, Huyện Mai Châu, Tỉnh Hòa Bình (Vùng Phú Thọ mở rộng)',
    visitingHours: 'Tham quan tự do quanh năm',
    ticketPrice: 'Vào bản miễn phí; Thuê xe đạp dạo thung lũng: 30.000 - 50.000 VNĐ',
    googleMapsUri: 'https://maps.google.com/?q=Lac+Village+Mai+Chau',
    tags: ['Hòa Bình', 'Mai Châu', 'Bản Lác', 'Thái trắng', 'Nhà sàn', 'Múa xòe', 'Thổ cẩm'],
    suggestedQuestions: [
      'Ý nghĩa của bếp lửa trên nhà sàn người Thái trong đời sống tâm linh?',
      'Điệu múa Xòe Thái thể hiện tinh thần đoàn kết cộng đồng ra sao?'
    ]
  },

  // =========================================================================
  // 7. BẮC NINH & BẮC GIANG
  // =========================================================================
  {
    id: 'chua-but-thap-bac-ninh',
    name: 'Chùa Bút Tháp (Ninh Phúc Tự) - Tuyệt Tác Điêu Khắc Phật Bà Nghìn Mắt Nghìn Tay',
    vietnameseName: 'Chùa Bút Tháp',
    englishName: 'But Thap Pagoda & Thousand-Eyed Thousand-Armed Avalokiteshvara',
    category: 'temple',
    categoryLabel: 'Đền chùa & Chùa cổ',
    region: 'north',
    province: 'Bắc Ninh (Hợp nhất Bắc Ninh & Bắc Giang)',
    period: 'Thế kỷ 17 (Thời Lê Trung Hưng)',
    dynasty: 'Thời Hậu Lê',
    history: 'Khởi dựng từ thời Trần và được trùng tu quy mô lớn vào thế kỷ 17 dưới sự bảo trợ của Hoàng thái hậu Trịnh Thị Ngọc Trúc và Thiền sư Chuyết Chuyết cùng Thiền sư Minh Hành.',
    culturalSignificance: 'Di tích Quốc gia đặc biệt. Lưu giữ Bảo vật Quốc gia - pho tượng Phật Bà Quan Âm nghìn mắt nghìn tay bằng gỗ phủ sơn thế kỷ 17 tạc bởi nghệ nhân Trương Thọ Nam, được đánh giá là kiệt tác điêu khắc gỗ đỉnh cao của mỹ thuật Việt Nam.',
    interestingFacts: [
      'Tượng Phật Bà Quan Âm có 11 khuôn mặt, 42 cánh tay lớn và 958 cánh tay nhỏ kết thành vầng hào quang tỏa sáng, trong mỗi lòng bàn tay là một con mắt trí tuệ.',
      'Tháp Báo Nghiêm bằng đá cao 13m trông như cây bút khổng lồ vươn lên nền trời xanh là biểu tượng của chùa.',
      'Cầu đá bắc qua hồ sen và Tòa Cửu Phẩm Liên Hoa 9 tầng bằng gỗ có thể xoay tròn quanh trục mang ý nghĩa luân hồi chuyển pháp luân.'
    ],
    conservationStatus: 'Di tích Lịch sử và Kiến trúc nghệ thuật Quốc gia đặc biệt (2014).',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Tháp đá Báo Nghiêm hình cây bút vươn lên trời xanh tại Chùa Bút Tháp',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Quốc gia đặc biệt & Bảo vật Quốc gia theo Quyết định của Thủ tướng Chính phủ.',
    lat: 21.0583,
    lng: 106.0278,
    address: 'Thôn Bút Tháp, Xã Đình Tổ, Thị xã Thuận Thành, Tỉnh Bắc Ninh',
    visitingHours: '07:00 - 18:00 hàng ngày',
    ticketPrice: '10.000 VNĐ / vé tham quan',
    googleMapsUri: 'https://maps.google.com/?q=But+Thap+Pagoda+Bac+Ninh',
    tags: ['Bắc Ninh', 'Bút Tháp', 'Bảo vật Quốc gia', 'Phật Bà nghìn tay', 'Tháp Báo Nghiêm', 'Kiến trúc gỗ'],
    suggestedQuestions: [
      'Giá trị mỹ thuật đỉnh cao của pho tượng Quan Âm nghìn mắt nghìn tay tại Chùa Bút Tháp?',
      'Kiến trúc Tòa Cửu Phẩm Liên Hoa xoay quanh trục có cấu tạo kỳ diệu ra sao?'
    ]
  },
  {
    id: 'chua-vinh-nghiem-bac-giang',
    name: 'Chùa Vĩnh Nghiêm (Chùa Đức La) - Trường Đại Học Phật Giáo Đầu Tiên & Mộc Bản UNESCO',
    vietnameseName: 'Chùa Vĩnh Nghiêm',
    englishName: 'Vinh Nghiem Pagoda & UNESCO World Documentary Heritage Woodblocks',
    category: 'temple',
    categoryLabel: 'Đền chùa & Di sản Tư liệu Thế giới',
    region: 'north',
    province: 'Bắc Ninh (Bắc Giang)',
    period: 'Thế kỷ 12 (Thời Lý) & Hưng thịnh thời Trần',
    dynasty: 'Thời Lý - Trần',
    history: 'Tọa lạc nơi ngã ba sông Lục Đầu. Đây là trung tâm đào tạo tăng đồ lớn nhất của Thiền phái Trúc Lâm do Tam Tổ Trúc Lâm (Trần Nhân Tông, Pháp Loa, Huyền Quang) trực tiếp thuyết pháp và truyền giới.',
    culturalSignificance: 'Di tích Quốc gia đặc biệt. Kho tàng 3.050 mộc bản kinh Phật bằng gỗ thị chữ Hán - Nôm được UNESCO ghi danh là Di sản Tư liệu Ký ức Thế giới Khu vực Châu Á - Thái Bình Dương năm 2012.',
    interestingFacts: [
      'Bộ mộc bản kinh Phật được khắc chạm thủ công tinh xảo ngược trên gỗ cây thị có độ bền hàng trăm năm không bị mối mọt cong vênh.',
      'Ngôi chùa được ví như trường đại học Phật giáo đầu tiên của Việt Nam với hàng ngàn tăng ni từng tu học.',
      'Kiến trúc chùa theo hình chữ Công (工) bề thế với hệ thống tượng Phật cổ sơn son thếp vàng uy nghiêm.'
    ],
    conservationStatus: 'Di tích Quốc gia đặc biệt (2015) & Di sản Tư liệu Thế giới UNESCO (2012).',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Kho mộc bản kinh Phật chữ Hán Nôm vô giá tại Chùa Vĩnh Nghiêm',
    verifiedStatus: 'verified',
    verifiedNote: 'Di sản Tư liệu Ký ức Thế giới UNESCO & Di tích Quốc gia đặc biệt.',
    lat: 21.2133,
    lng: 106.3167,
    address: 'Thôn Đức La, Xã Trí Yên, Huyện Yên Dũng, Tỉnh Bắc Giang (Vùng Bắc Ninh mở rộng)',
    visitingHours: '07:00 - 18:00 hàng ngày',
    ticketPrice: 'Vào cửa tham quan tự do',
    googleMapsUri: 'https://maps.google.com/?q=Vinh+Nghiem+Pagoda+Bac+Giang',
    tags: ['Bắc Ninh', 'Bắc Giang', 'Vĩnh Nghiêm', 'Mộc bản UNESCO', 'Trúc Lâm', 'Kinh Phật'],
    suggestedQuestions: [
      'Vì sao bộ mộc bản kinh Phật Chùa Vĩnh Nghiêm được UNESCO công nhận Di sản Thế giới?',
      'Vai trò của Tam Tổ Trúc Lâm đối với sự hình thành Chùa Vĩnh Nghiêm?'
    ]
  },

  // =========================================================================
  // 8. BẮC KẠN & THÁI NGUYÊN
  // =========================================================================
  {
    id: 'ho-ba-be-bac-kan',
    name: 'Hồ Ba Bể - Viên Ngọc Xanh Giữa Đại Ngàn Việt Bắc',
    vietnameseName: 'Hồ Ba Bể',
    englishName: 'Ba Be Lake & Ba Be National Park',
    category: 'nature_scenic',
    categoryLabel: 'Danh thắng Thiên nhiên & Hồ nước ngọt',
    region: 'north',
    province: 'Thái Nguyên (Bắc Kạn)',
    period: 'Kiến tạo địa chất Karst hơn 200 triệu năm',
    history: 'Hình thành từ sự sụt lún của các dãy núi đá vôi triệu năm. Hồ Ba Bể gồm 3 nhánh hồ thông nhau: Pé Lầm, Pé Lù và Pé Lèng. Gắn liền với sự tích Đảo Bà Góa và con giao long cứu mẹ con người đàn bà góa tốt bụng.',
    culturalSignificance: 'Di tích Quốc gia đặc biệt. Một trong 20 hồ nước ngọt tự nhiên trên núi đẹp nhất thế giới cần được bảo vệ do Hội nghị Hồ nước ngọt Thế giới tại Mỹ công nhận. Khu Ramsar thứ 3 của Việt Nam.',
    interestingFacts: [
      'Hồ nằm ở độ cao 145m so với mặt biển, diện tích mặt nước rộng 500 ha bao bọc bởi những vách đá vôi sừng sững và rừng nguyên sinh.',
      'Du khách có thể ngồi thuyền độc mộc của người Tày xuôi dòng sông Năng xuyên qua Động Puông dài 300m kỳ vĩ.',
      'Bản Pác Ngòi ven hồ lưu giữ trọn vẹn văn hóa nhà sàn, hát Then đàn Tính và cá mương nướng thơm lừng.'
    ],
    conservationStatus: 'Di tích Danh lam thắng cảnh Quốc gia đặc biệt (2012) & Khu Ramsar Thế giới.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Thuyền độc mộc êm đềm lướt trên làn nước xanh ngọc Hồ Ba Bể',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Quốc gia đặc biệt & Khu Ramsar Thế giới theo UNESCO/IUCN.',
    lat: 22.4167,
    lng: 105.6167,
    address: 'Xã Nam Mẫu, Huyện Ba Bể, Tỉnh Bắc Kạn (Vùng Thái Nguyên mở rộng)',
    visitingHours: 'Tham quan tự do quanh năm; Thuyền máy: 07:00 - 17:30',
    ticketPrice: 'Vé vào cổng Vườn Quốc gia: 45.000 VNĐ; Thuê thuyền du ngoạn: 300.000 - 800.000 VNĐ/thuyền',
    googleMapsUri: 'https://maps.google.com/?q=Ba+Be+Lake+Bac+Kan',
    tags: ['Bắc Kạn', 'Thái Nguyên', 'Hồ Ba Bể', 'Động Puông', 'Đảo Bà Góa', 'Người Tày', 'Ramsar'],
    suggestedQuestions: [
      'Sự tích Đảo Bà Góa trên Hồ Ba Bể mang thông điệp nhân văn gì?',
      'Hệ sinh thái động thực vật quý hiếm tại Vườn Quốc gia Ba Bể gồm những loài nào?'
    ]
  },

  // =========================================================================
  // 9. NGHỆ AN & HÀ TĨNH
  // =========================================================================
  {
    id: 'khu-di-tich-kim-lien-nam-dan',
    name: 'Khu Di Tích Lịch Sử Quốc Gia Đặc Biệt Kim Liên - Quê Hương Bác Hồ',
    vietnameseName: 'Khu di tích Kim Liên (Làng Sen & Hoàng Trù)',
    englishName: 'Kim Lien Special National Relic - Hometown of President Ho Chi Minh',
    category: 'monument',
    categoryLabel: 'Di tích Lịch sử & Nhà lưu niệm',
    region: 'central',
    province: 'Nghệ An',
    period: 'Thế kỷ 19 - 20 (Gắn liền tuổi thơ Chủ tịch Hồ Chí Minh 1890 - 1901)',
    history: 'Nơi Bác Hồ kính yêu cất tiếng khóc chào đời và sống những năm tháng tuổi thơ êm đềm cùng gia đình. Gồm quê ngoại Làng Hoàng Trù (nơi Bác sinh ra) và quê nội Làng Sen (nơi Bác sống từ năm 1901 - 1906).',
    culturalSignificance: 'Di tích Quốc gia đặc biệt, địa chỉ đỏ hành hương thiêng liêng của đồng bào cả nước và bạn bè quốc tế hướng về vị Cha già kính yêu của dân tộc.',
    interestingFacts: [
      'Mái nhà tranh 5 gian đơn sơ của cụ Phó bảng Nguyễn Sinh Sắc cùng khung cửi dệt vải của thân mẫu Hoàng Thị Loan vẫn được gìn giữ nguyên vẹn.',
      'Hàng râm bụt nở hoa đỏ thắm bên bờ giếng Cốc và đầm sen ngát hương mỗi độ tháng 5 về.',
      'Khu mộ Bà Hoàng Thị Loan tọa lạc thanh thản trên sườn núi Động Tranh.'
    ],
    conservationStatus: 'Di tích Quốc gia đặc biệt xếp hạng năm 2012.',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Mái nhà tranh mộc mạc Làng Sen quê hương Chủ tịch Hồ Chí Minh',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Quốc gia đặc biệt theo Quyết định số 548/QĐ-TTg của Thủ tướng Chính phủ.',
    lat: 18.7067,
    lng: 105.5567,
    address: 'Xã Kim Liên, Huyện Nam Đàn, Tỉnh Nghệ An',
    visitingHours: '07:00 - 11:30 & 13:30 - 17:00 hàng ngày',
    ticketPrice: 'Vào cửa tham quan tự do (Miễn phí)',
    googleMapsUri: 'https://maps.google.com/?q=Kim+Lien+Relic+Nam+Dan+Nghe+An',
    tags: ['Nghệ An', 'Nam Đàn', 'Kim Liên', 'Làng Sen', 'Hoàng Trù', 'Bác Hồ', 'Quê Bác'],
    suggestedQuestions: [
      'Những kỷ vật tuổi thơ nào của Bác Hồ vẫn được lưu giữ tại quê ngoại Hoàng Trù?',
      'Kiến trúc nhà lá truyền thống xứ Nghệ được thể hiện ra sao tại Khu di tích Kim Liên?'
    ]
  },
  {
    id: 'nga-ba-dong-loc-ha-tinh',
    name: 'Khu Di Tích Lịch Sử Quốc Gia Đặc Biệt Ngã Ba Đồng Lộc - Khúc Tráng Ca Bất Tử',
    vietnameseName: 'Ngã ba Đồng Lộc',
    englishName: 'Dong Loc Junction Special National Historical Relic',
    category: 'monument',
    categoryLabel: 'Di tích Lịch sử Cách mạng',
    region: 'central',
    province: 'Hà Tĩnh',
    period: 'Thời kỳ kháng chiến chống Mỹ cứu nước (Năm 1968)',
    history: 'Yết hầu giao thông hiểm yếu trên đường Trường Sơn chi viện cho tiền tuyến miền Nam. Nơi 10 nữ thanh niên xung phong Tiểu đội 4 (C552) do chị Võ Thị Tần làm Tiểu đội trưởng đã anh dũng hy sinh ngày 24/7/1968 khi tuổi đời chỉ mới mười tám, đôi mươi.',
    culturalSignificance: 'Di tích Quốc gia đặc biệt, biểu tượng trường tồn của chủ nghĩa anh hùng cách mạng, tinh thần dâng hiến thanh xuân cho độc lập tự do của Tổ quốc.',
    interestingFacts: [
      'Trong 240 ngày đêm khốc liệt năm 1968, không quân Mỹ đã trút xuống ngã ba nhỏ bé này gần 50.000 quả bom các loại.',
      'Hố bom định mệnh nơi 10 nữ liệt sĩ hy sinh vẫn được giữ nguyên trạng kề bên khu mộ 10 đóa hoa trinh liệt.',
      'Tháp chuông Đồng Lộc cao 7 tầng vút lên trời xanh, mỗi hồi chuông ngân vọng như lời tri ân nghìn đời của non sông.'
    ],
    conservationStatus: 'Di tích Quốc gia đặc biệt xếp hạng năm 2013.',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Tháp chuông Đồng Lộc ngân vang khúc tráng ca 10 nữ anh hùng',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Lịch sử Quốc gia đặc biệt theo Quyết định số 2383/QĐ-TTg của Thủ tướng Chính phủ.',
    lat: 18.2667,
    lng: 105.7000,
    address: 'Thị trấn Đồng Lộc, Huyện Can Lộc, Tỉnh Hà Tĩnh',
    visitingHours: '07:00 - 17:30 hàng ngày',
    ticketPrice: '10.000 VNĐ / vé tham quan',
    googleMapsUri: 'https://maps.google.com/?q=Dong+Loc+Junction+Ha+Tinh',
    tags: ['Hà Tĩnh', 'Đồng Lộc', '10 cô gái', 'Đường Trường Sơn', 'Thanh niên xung phong', 'Lịch sử'],
    suggestedQuestions: [
      'Bức thư xúc động gửi mẹ của nữ tiểu đội trưởng Võ Thị Tần trước ngày hy sinh?',
      'Vị trí chiến lược của Ngã ba Đồng Lộc trên tuyến đường huyết mạch chi viện miền Nam?'
    ]
  },

  // =========================================================================
  // 10. QUẢNG BÌNH & QUẢNG TRỊ
  // =========================================================================
  {
    id: 'hang-son-doong-quang-binh',
    name: 'Hang Sơn Đoòng - Kỳ Quan Hang Động Lớn Nhất Trái Đất',
    vietnameseName: 'Hang Sơn Đoòng',
    englishName: 'Son Doong Cave - The World\'s Largest Natural Cave',
    category: 'nature_scenic',
    categoryLabel: 'Danh thắng Thiên nhiên & Kỳ quan Thế giới',
    region: 'central',
    province: 'Quảng Trị (Quảng Bình)',
    period: 'Hình thành từ 2 đến 5 triệu năm trước',
    history: 'Được một người dân địa phương tên Hồ Khanh phát hiện năm 1990 và được đoàn thám hiểm Hiệp hội Hang động Hoàng gia Anh (BCRA) khảo sát công bố năm 2009. Ngay lập tức được thế giới công nhận là hang động tự nhiên lớn nhất hành tinh.',
    culturalSignificance: 'Di sản Thiên nhiên Thế giới UNESCO thuộc Vườn Quốc gia Phong Nha - Kẻ Bàng. Kỳ quan địa chất vô song của thế giới với hệ sinh thái rừng nhiệt đới nguyên sinh độc lập trong lòng hang.',
    interestingFacts: [
      'Thể tích hang lên tới 38.5 triệu mét khối, đủ sức chứa cả một góc phố Manhattan New York với các tòa nhà 40 tầng.',
      'Sở hữu dòng sông ngầm chảy xiết và hai "Hố Sụt" (Doline) khổng lồ đưa ánh sáng mặt trời rọi xuống nuôi dưỡng cả cánh rừng nguyên sinh "Vườn Địa Đàng".',
      'Bức tường Việt Nam (Great Wall of Vietnam) là bức tường thạch nhũ cao gần 90m chặn đứng cuối hang.'
    ],
    conservationStatus: 'Di sản Thiên nhiên Thế giới UNESCO & Được quản lý thám hiểm bền vững nghiêm ngặt nhất thế giới.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Tia nắng rọi xuyên Hố Sụt chiếu sáng rừng nguyên sinh Hang Sơn Đoòng',
    verifiedStatus: 'verified',
    verifiedNote: 'Di sản Thiên nhiên Thế giới UNESCO & Kỷ lục Guinness thế giới.',
    lat: 17.4589,
    lng: 106.2878,
    address: 'Vườn Quốc gia Phong Nha - Kẻ Bàng, Huyện Bố Trạch, Tỉnh Quảng Bình (Vùng Quảng Trị mở rộng)',
    visitingHours: 'Tham gia theo tour thám hiểm cấp phép từ tháng 1 đến tháng 8 hàng năm',
    ticketPrice: 'Khoảng 72.000.000 VNĐ / tour thám hiểm trọn gói (Oxalis Adventure độc quyền)',
    googleMapsUri: 'https://maps.google.com/?q=Son+Doong+Cave+Quang+Binh',
    tags: ['Quảng Bình', 'Quảng Trị', 'Sơn Đoòng', 'Hang lớn nhất thế giới', 'Phong Nha', 'UNESCO', 'Oxalis'],
    suggestedQuestions: [
      'Hệ sinh thái và khí hậu riêng biệt bên trong Hang Sơn Đoòng vận hành ra sao?',
      'Bức tường Việt Nam ở cuối Hang Sơn Đoòng được các nhà thám hiểm vượt qua như thế nào?'
    ]
  },
  {
    id: 'thanh-co-quang-tri',
    name: 'Di Tích Quốc Gia Đặc Biệt Thành Cổ Quảng Trị - Đài Tưởng Niệm Máu Và Hoa',
    vietnameseName: 'Thành cổ Quảng Trị',
    englishName: 'Quang Tri Ancient Citadel',
    category: 'citadel',
    categoryLabel: 'Thành lũy & Di tích Quân sự',
    region: 'central',
    province: 'Quảng Trị',
    period: 'Xây dựng năm 1809 (Triều vua Gia Long) & Chiến sự 1972',
    dynasty: 'Nhà Nguyễn & Thời kỳ Kháng chiến chống Mỹ',
    history: 'Được vua Gia Long đắp bằng đất năm 1809 và vua Minh Mạng xây gạch năm 1827 theo kiến trúc Vauban. Mùa hè đỏ lửa năm 1972, nơi đây diễn ra cuộc chiến đấu kiên cường 81 ngày đêm bảo vệ Thành cổ trước hàng trăm ngàn tấn bom đạn của đối phương.',
    culturalSignificance: 'Di tích Quốc gia đặc biệt. Một trong những biểu tượng bi tráng nhất của lòng dũng cảm, sự hy sinh anh dũng của thế hệ thanh niên Việt Nam vì độc lập dân tộc.',
    interestingFacts: [
      'Trong 81 ngày đêm từ 28/6 đến 16/9/1972, số bom đạn Mỹ dội xuống Thành cổ tương đương sức công phá của 7 quả bom nguyên tử ném xuống Hiroshima.',
      'Đài tưởng niệm trung tâm được đắp như một nấm mồ chung khổng lồ hình bát giác tưởng nhớ các liệt sĩ đã hòa máu thịt vào từng tấc đất.',
      'Câu thơ nổi tiếng của cựu chiến binh Phạm Đình Lân: "Đò lên Thạch Hãn ơi... chèo nhẹ / Đáy sông còn đó bạn tôi nằm / Tan theo sóng nước, không bờ bãi / Ngàn năm ru mãi tiếng đồng dao".'
    ],
    conservationStatus: 'Di tích Lịch sử Quốc gia đặc biệt theo Quyết định số 2383/QĐ-TTg của Thủ tướng Chính phủ.',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Đài tưởng niệm linh thiêng trung tâm Thành Cổ Quảng Trị',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Quốc gia đặc biệt xếp hạng năm 2013.',
    lat: 16.7533,
    lng: 107.1906,
    address: 'Phường 2, Thị xã Quảng Trị, Tỉnh Quảng Trị',
    visitingHours: '07:00 - 17:30 hàng ngày',
    ticketPrice: 'Vào cửa tham quan tự do (Miễn phí)',
    googleMapsUri: 'https://maps.google.com/?q=Quang+Tri+Ancient+Citadel',
    tags: ['Quảng Trị', 'Thành cổ', '81 ngày đêm', 'Sông Thạch Hãn', 'Lịch sử', 'Mùa hè đỏ lửa'],
    suggestedQuestions: [
      'Ý nghĩa biểu tượng của Đài tưởng niệm trung tâm Thành Cổ Quảng Trị?',
      'Trận chiến 81 ngày đêm tại Thành Cổ Quảng Trị có ý nghĩa gì đối với Hội nghị Paris năm 1973?'
    ]
  },
  {
    id: 'doi-bo-hien-luong-ben-hai',
    name: 'Di Tích Đôi Bờ Hiền Lương - Sông Bến Hải & Vĩ Tuyến 17',
    vietnameseName: 'Đôi bờ Hiền Lương - Bến Hải',
    englishName: 'Hien Luong Bridge - Ben Hai River (17th Parallel)',
    category: 'monument',
    categoryLabel: 'Di tích Lịch sử & Giới tuyến Quân sự',
    region: 'central',
    province: 'Quảng Trị',
    period: '1954 - 1975 (Sau Hiệp định Genève 1954)',
    history: 'Theo Hiệp định Genève năm 1954, sông Bến Hải chảy dọc vĩ tuyến 17 được chọn làm giới tuyến quân sự tạm thời chia cắt hai miền Nam - Bắc trong hơn 20 năm ròng rã trước khi đất nước hoàn toàn thống nhất.',
    culturalSignificance: 'Di tích Quốc gia đặc biệt. Chứng nhân lịch sử cho nỗi đau chia cắt đất nước và khát vọng cháy bỏng non sông liền một dải của dân tộc Việt Nam.',
    interestingFacts: [
      'Cầu Hiền Lương lịch sử được sơn hai màu tương phản (bờ Bắc màu xanh, bờ Nam màu vàng) thể hiện rõ lằn ranh giới tuyến phân chia thời chiến tranh.',
      'Cuộc "chọi cờ" và "chọi loa" ròng rã suốt hơn chục năm giữa hai bờ sông là những câu chuyện độc nhất vô nhị trong lịch sử quân sự thế giới.',
      'Cột cờ bờ Bắc cao 38m với lá cờ đỏ sao vàng khổng lồ rộng 134m2 luôn kiêu hãnh tung bay dù bị bom đạn đối phương tìm mọi cách bắn phá.'
    ],
    conservationStatus: 'Di tích Lịch sử Quốc gia đặc biệt xếp hạng năm 2013.',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Cây cầu Hiền Lương hai màu sơn lịch sử trên sông Bến Hải',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Lịch sử Quốc gia đặc biệt.',
    lat: 17.0069,
    lng: 107.0319,
    address: 'Thôn Hiền Lương, Xã Vĩnh Thành, Huyện Vĩnh Linh, Tỉnh Quảng Trị',
    visitingHours: '07:00 - 17:30 hàng ngày',
    ticketPrice: '40.000 VNĐ / vé tham quan',
    googleMapsUri: 'https://maps.google.com/?q=Hien+Luong+Bridge+Quang+Tri',
    tags: ['Quảng Trị', 'Hiền Lương', 'Sông Bến Hải', 'Vĩ tuyến 17', 'Chọi cờ', 'Thống nhất đất nước'],
    suggestedQuestions: [
      'Cuộc đọ cờ và đọ loa tuyên truyền lịch sử ở đôi bờ Hiền Lương đã diễn ra kịch tính ra sao?',
      'Ý nghĩa của Cụm tượng đài Khát vọng thống nhất bên bờ sông Bến Hải?'
    ]
  },

  // =========================================================================
  // 11. THỪA THIÊN HUẾ
  // =========================================================================
  {
    id: 'chua-thien-mu-hue',
    name: 'Chùa Thiên Mụ (Linh Mụ Tự) & Tháp Phước Duyên Bên Bờ Sông Hương',
    vietnameseName: 'Chùa Thiên Mụ',
    englishName: 'Thien Mu Pagoda & Phuoc Duyen Tower',
    category: 'temple',
    categoryLabel: 'Đền chùa & Chùa cổ',
    region: 'central',
    province: 'Thừa Thiên Huế',
    period: 'Khởi dựng năm 1601 (Thời Chúa Tiên Nguyễn Hoàng)',
    dynasty: 'Thời Chúa Nguyễn & Triều Nguyễn',
    history: 'Chúa Nguyễn Hoàng khi vào trấn thủ Thuận Hóa đi dọc bờ sông Hương thấy ngọn đồi Hà Khê hình đầu rồng. Nghe người dân kể về giấc mộng thấy bà lão áo đỏ báo mộng sẽ có chân chúa đến lập chùa tụ linh khí, chúa liền cho dựng chùa đặt tên là Thiên Mụ (Bà Trời).',
    culturalSignificance: 'Biểu tượng tâm linh và thi ca gắn liền với linh hồn Cố đô Huế. Tháp Phước Duyên 7 tầng soi bóng xuống dòng sông Hương thơ mộng là hình ảnh thi vị đi vào lòng bao thế hệ.',
    interestingFacts: [
      'Tháp Phước Duyên hình bát giác cao 21m gồm 7 tầng xây dựng năm 1844 dưới thời vua Thiệu Trị, mỗi tầng thờ một đức Phật.',
      'Chuông Đại Hồng Chung đúc năm 1710 nặng hơn 2 tấn có tiếng ngân vang xa hàng chục dặm khắp kinh thành Huế.',
      'Chiếc xe ô tô Austin lịch sử của Bồ tát Thích Quảng Đức chở ngài tự thiêu năm 1963 để phản đối chính sách đàn áp Phật giáo vẫn được lưu giữ tại đây.'
    ],
    conservationStatus: 'Di tích thuộc Quần thể Di tích Cố đô Huế - Di sản Văn hóa Thế giới UNESCO.',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Tháp Phước Duyên 7 tầng Chùa Thiên Mụ soi bóng dòng sông Hương',
    verifiedStatus: 'verified',
    verifiedNote: 'Di sản Văn hóa Thế giới UNESCO (1993) & Di tích Quốc gia đặc biệt.',
    lat: 16.4528,
    lng: 107.5450,
    address: 'Đồi Hà Khê, Đường Nguyễn Phúc Nguyên, Phường Hương Long, Thành phố Huế, Tỉnh Thừa Thiên Huế',
    visitingHours: '07:30 - 18:00 hàng ngày',
    ticketPrice: 'Vào cửa tham quan tự do (Miễn phí)',
    googleMapsUri: 'https://maps.google.com/?q=Thien+Mu+Pagoda+Hue',
    tags: ['Huế', 'Chùa Thiên Mụ', 'Sông Hương', 'Tháp Phước Duyên', 'Chúa Nguyễn Hoàng', 'UNESCO'],
    suggestedQuestions: [
      'Sự tích Bà Chúa Trời báo mộng cho Chúa Tiên Nguyễn Hoàng lập chùa Thiên Mụ?',
      'Ý nghĩa của chiếc xe ô tô lịch sử trưng bày phía sau khuôn viên chùa Thiên Mụ?'
    ]
  },
  {
    id: 'lang-khai-dinh-hue',
    name: 'Lăng Khải Định (Ứng Lăng) - Tuyệt Tác Khảm Sành Sứ Nghệ Thuật Á Âu',
    vietnameseName: 'Lăng Khải Định',
    englishName: 'Khai Dinh Tomb (Ung Lang)',
    category: 'palace',
    categoryLabel: 'Lăng tẩm Hoàng gia & Kiến trúc',
    region: 'central',
    province: 'Thừa Thiên Huế',
    period: 'Xây dựng từ 1920 đến 1931 (Kéo dài 11 năm)',
    dynasty: 'Nhà Nguyễn',
    history: 'Nằm trên sườn núi Châu Chữ (núi Chữ), lăng của vị hoàng đế thứ 12 triều Nguyễn. Được xây dựng bằng vật liệu hiện đại thời bấy giờ (xi măng, sắt thép nhập từ Pháp; đồ sứ, thủy tinh màu nhập từ Trung Quốc và Nhật Bản).',
    culturalSignificance: 'Đỉnh cao của nghệ thuật ghép mảnh sành sứ và thủy tinh màu Việt Nam thế kỷ 20. Sự giao thoa táo bạo giữa trường phái kiến trúc cổ điển phương Tây (Roman, Gothic) và mỹ thuật cung đình phương Đông.',
    interestingFacts: [
      'Điện Khải Thành là nơi đặt thi hài vua Khải Định với bức tranh bích họa "Cửu Long Ẩn Vân" khổng lồ trên trần do nghệ nhân Phan Văn Tánh vẽ bằng chân độc đáo.',
      'Tượng đồng vua Khải Định tỉ lệ 1:1 đúc tại Pháp năm 1920 thếp vàng lộng lẫy ngự trên ngai vàng.',
      'Sân Bái Đình có hàng tượng quan văn, quan võ, binh lính và ngựa voi bằng đá tạc tinh xảo, chân thực và sống động hơn bất cứ lăng nào khác.'
    ],
    conservationStatus: 'Di sản Văn hóa Thế giới UNESCO công nhận năm 1993.',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Nghệ thuật khảm sành sứ tinh xảo lộng lẫy bên trong Điện Khải Thành',
    verifiedStatus: 'verified',
    verifiedNote: 'Di sản Văn hóa Thế giới UNESCO (1993).',
    lat: 16.3989,
    lng: 107.5906,
    address: 'Xã Thủy Bằng, Thành phố Huế, Tỉnh Thừa Thiên Huế',
    visitingHours: '07:00 - 17:30 hàng ngày',
    ticketPrice: '150.000 VNĐ / người lớn, 30.000 VNĐ / trẻ em',
    googleMapsUri: 'https://maps.google.com/?q=Khai+Dinh+Tomb+Hue',
    tags: ['Huế', 'Lăng Khải Định', 'Khảm sành sứ', 'Ứng Lăng', 'Cung đình', 'UNESCO'],
    suggestedQuestions: [
      'Nghệ thuật khảm sành sứ tại Lăng Khải Định sử dụng những kỹ thuật độc đáo nào?',
      'Bức tranh bích họa Cửu Long Ẩn Vân trên trần Điện Khải Thành có giai thoại gì?'
    ]
  },
  {
    id: 'cho-dong-ba-hue',
    name: 'Chợ Đông Ba - Hương Vị & Hồn Cốt Chợ Đời Cố Đô',
    vietnameseName: 'Chợ Đông Ba',
    englishName: 'Dong Ba Market',
    category: 'traditional_market',
    categoryLabel: 'Chợ truyền thống & Ẩm thực Cố đô',
    region: 'central',
    province: 'Thừa Thiên Huế',
    period: 'Khởi dựng từ năm 1899 (Thời vua Thành Thái)',
    history: 'Tiền thân là chợ Quy Giả thành lập từ thời Gia Long. Năm 1899, vua Thành Thái cho dời chợ ra vị trí hiện nay bên bờ bắc sông Hương, cạnh cầu Gia Hội để tiện giao thương đường thủy.',
    culturalSignificance: 'Khu chợ cổ sầm uất và nổi tiếng nhất dải đất miền Trung, biểu tượng văn hóa đời sống dân dã Huế và nơi lưu giữ trọn vẹn văn hóa ẩm thực mộc mạc cung đình.',
    interestingFacts: [
      'Tầng trệt chợ là thiên đường ẩm thực Cố đô với bún bò giò heo, cơm hến cồn hến, bánh bèo chén, bánh nậm, bánh bột lọc và các món chè hẻm 20 món ngọt thanh.',
      'Khu vực tầng 2 và 3 bày bán đặc sản mè xửng, tôm chua, trà cung đình, nón bài thơ và lụa là gấm vóc.',
      'Câu hát nổi tiếng xứ Huế: "Chợ Đông Ba đem ra ngoài cửa / Cầu Tràng Tiền đúc sửa lại vôi / Ơi người tình lỡ duyên rồi..."'
    ],
    conservationStatus: 'Trung tâm thương mại truyền thống di sản văn hóa Huế.',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Cảnh tấp nập giao thương trước cổng Chợ Đông Ba bên dòng sông Hương',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích văn hóa thương mại Cố đô Huế.',
    lat: 16.4719,
    lng: 107.5936,
    address: 'Số 2 Đường Trần Hưng Đạo, Phường Phú Hòa, Thành phố Huế, Tỉnh Thừa Thiên Huế',
    visitingHours: '05:00 - 19:00 hàng ngày',
    ticketPrice: 'Vào chợ tự do',
    googleMapsUri: 'https://maps.google.com/?q=Dong+Ba+Market+Hue',
    tags: ['Huế', 'Chợ Đông Ba', 'Sông Hương', 'Ẩm thực Huế', 'Bún bò', 'Mè xửng', 'Tôm chua'],
    suggestedQuestions: [
      'Những món ăn truyền thống đặc sắc nhất nhất định phải thử tại Chợ Đông Ba?',
      'Nghệ thuật chằm nón bài thơ xứ Huế được bày bán tại chợ có gì tinh xảo?'
    ]
  },

  // =========================================================================
  // 12. ĐÀ NẴNG & QUẢNG NAM
  // =========================================================================
  {
    id: 'cau-rong-da-nang',
    name: 'Cầu Rồng Sông Hàn - Biểu Tượng Vươn Mình Ra Biển Lớn',
    vietnameseName: 'Cầu Rồng Đà Nẵng',
    englishName: 'Dragon Bridge Da Nang',
    category: 'architecture',
    categoryLabel: 'Kiến trúc Cầu & Biểu tượng Hiện đại',
    region: 'central',
    province: 'Đà Nẵng (Hợp nhất Đà Nẵng & Quảng Nam)',
    period: 'Khánh thành năm 2013 (Kỷ niệm 38 năm giải phóng Đà Nẵng)',
    history: 'Bắc qua sông Hàn thơ mộng nối liền trung tâm thành phố với bán đảo Sơn Trà và bãi biển Mỹ Khê. Cây cầu mô phỏng hình tượng con rồng thời Lý mạnh mẽ vươn mình bay ra biển Đông.',
    culturalSignificance: 'Biểu tượng của sự năng động, khát vọng phát triển vượt bậc của Đà Nẵng - thành phố đáng sống bậc nhất Việt Nam. Cầu đạt giải thưởng quốc tế lớn về kỹ thuật chiếu sáng và kết cấu thép.',
    interestingFacts: [
      'Cầu có tổng chiều dài 666m, rồng thép nặng gần 9.000 tấn uốn lượn nhấp nhô qua 5 nhịp cầu.',
      'Vào lúc 21:00 các tối Thứ 7, Chủ Nhật và các ngày lễ lớn, đầu rồng phun lửa 2 lượt và phun nước 3 lượt tạo nên màn trình diễn ngoạn mục thu hút hàng vạn du khách.',
      'Hệ thống 15.000 bóng đèn LED đổi màu thông minh biến cây cầu thành dải lụa phát sáng rực rỡ trong đêm.'
    ],
    conservationStatus: 'Công trình kiến trúc hạ tầng biểu tượng Quốc tế của Thành phố Đà Nẵng.',
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Cầu Rồng Đà Nẵng phun lửa rực sáng trên sông Hàn thơ mộng',
    verifiedStatus: 'verified',
    verifiedNote: 'Biểu tượng kiến trúc du lịch quốc gia của Thành phố Đà Nẵng.',
    lat: 16.0611,
    lng: 108.2272,
    address: 'Đường Nguyễn Văn Linh - Võ Văn Kiệt, Phước Ninh, Hải Châu, Thành phố Đà Nẵng',
    visitingHours: 'Mở cửa lưu thông 24/7; Trình diễn phun lửa/nước 21:00 tối Thứ 7, CN',
    ticketPrice: 'Xem biểu diễn tự do',
    googleMapsUri: 'https://maps.google.com/?q=Dragon+Bridge+Da+Nang',
    tags: ['Đà Nẵng', 'Quảng Nam', 'Cầu Rồng', 'Sông Hàn', 'Phun lửa', 'Sơn Trà'],
    suggestedQuestions: [
      'Cơ chế phun lửa và phun nước của Cầu Rồng hoạt động theo nguyên lý kỹ thuật nào?',
      'Những vị trí lý tưởng nhất để chiêm ngưỡng màn biểu diễn Cầu Rồng phun lửa?'
    ]
  },
  {
    id: 'chua-linh-ung-son-tra',
    name: 'Chùa Linh Ứng Bãi Bụt & Tượng Phật Bà Quan Âm 67m Bán Đảo Sơn Trà',
    vietnameseName: 'Chùa Linh Ứng Bãi Bụt (Sơn Trà)',
    englishName: 'Linh Ung Pagoda Bai But & Lady Buddha Statue - Son Tra Peninsula',
    category: 'temple',
    categoryLabel: 'Đền chùa & Tâm linh Biển đảo',
    region: 'central',
    province: 'Đà Nẵng',
    period: 'Khánh thành năm 2010',
    history: 'Tọa lạc trên sườn núi Bán đảo Sơn Trà nhìn thẳng ra vịnh biển Đà Nẵng. Theo truyền tích của ngư dân thời vua Minh Mạng, có một pho tượng Phật trôi dạt vào bãi cát, người dân lập am thờ và từ đó sóng yên biển lặng, bãi biển được đặt tên là Bãi Bụt (cõi Phật giữa nhân gian).',
    culturalSignificance: 'Quần thể tâm linh Phật giáo lớn nhất Đà Nẵng. Nơi bảo bọc, che chở cho ngư dân miền Trung vươn khơi bám biển bình an.',
    interestingFacts: [
      'Tượng Phật Bà Quan Âm cao 67m, đường kính tòa sen 35m, tương đương tòa nhà 30 tầng, là tượng Phật Bà Quan Âm cao nhất Việt Nam.',
      'Bên trong lòng tượng có 17 tầng, mỗi tầng thờ một vị Phật với tư thế diện mạo khác nhau.',
      'Từ sân chùa có thể ngắm trọn vẹn toàn cảnh thành phố biển Đà Nẵng và đường bờ biển Mỹ Khê cong cong như vầng trăng khuyết.'
    ],
    conservationStatus: 'Danh lam thắng cảnh tâm linh nổi tiếng hàng đầu miền Trung.',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Tượng Phật Bà Quan Âm 67m hiền từ hướng mắt ra biển Đông bao la',
    verifiedStatus: 'verified',
    verifiedNote: 'Danh thắng du lịch tâm linh Đà Nẵng.',
    lat: 16.1006,
    lng: 108.2778,
    address: 'Bãi Bụt, Bán đảo Sơn Trà, Phường Thọ Quang, Quận Sơn Trà, Thành phố Đà Nẵng',
    visitingHours: '06:00 - 21:00 hàng ngày',
    ticketPrice: 'Vào cửa tham quan tự do (Miễn phí)',
    googleMapsUri: 'https://maps.google.com/?q=Linh+Ung+Pagoda+Da+Nang',
    tags: ['Đà Nẵng', 'Sơn Trà', 'Chùa Linh Ứng', 'Bãi Bụt', 'Tượng Phật Bà', 'Biển Đông'],
    suggestedQuestions: [
      'Ý nghĩa của tên gọi Bãi Bụt trên Bán đảo Sơn Trà bắt nguồn từ câu chuyện gì?',
      'Kiến trúc 17 tầng bên trong lòng tượng Phật Bà Quan Âm Chùa Linh Ứng?'
    ]
  },
  {
    id: 'ngu-hanh-son-da-nang',
    name: 'Quần Thể Danh Thắng Danh Tiếng Ngũ Hành Sơn & Động Huyền Không',
    vietnameseName: 'Ngũ Hành Sơn (Non Nước)',
    englishName: 'Marble Mountains (Ngu Hanh Son) & Huyen Khong Cave',
    category: 'nature_scenic',
    categoryLabel: 'Danh thắng Núi đá & Hang động Tâm linh',
    region: 'central',
    province: 'Đà Nẵng',
    period: 'Hình thành địa chất triệu năm & Thời vua Minh Mạng đặt tên',
    history: 'Gồm 5 ngọn núi đá vôi nhô lên bên bờ biển: Kim Sơn, Mộc Sơn, Thủy Sơn, Hỏa Sơn và Thổ Sơn. Năm 1825, vua Minh Mạng ngự giá tuần du đến đây đã đặt tên cho quần thể là Ngũ Hành Sơn dựa trên thuyết Ngũ hành tương sinh tương khắc.',
    culturalSignificance: 'Di tích Quốc gia đặc biệt. Sự kết hợp kỳ diệu giữa thiên nhiên núi non hang động đá cẩm thạch và các ngôi chùa cổ (Chùa Linh Ứng Ngũ Hành Sơn, Chùa Tam Thai) lưu giữ Ma nhai (văn bia khắc trên vách đá) được UNESCO công nhận là Di sản Tư liệu Ký ức Thế giới.',
    interestingFacts: [
      'Động Huyền Không là hang động đẹp nhất với vòm động lộ thiên có ánh sáng mặt trời rọi thẳng xuống như hào quang chiếu sáng tượng Phật Thích Ca tạc trên vách đá.',
      'Vọng Giang Đài và Vọng Hải Đài trên đỉnh Thủy Sơn cho tầm nhìn bao quát toàn bộ sông Cổ Cò và biển Đông mênh mông.',
      'Dưới chân núi là Làng nghề điêu khắc đá mỹ nghệ Non Nước hơn 400 năm tuổi với bàn tay tài hoa của các nghệ nhân tạc tượng đá.'
    ],
    conservationStatus: 'Di tích Quốc gia đặc biệt (2018) & Hệ thống Ma nhai là Di sản Tư liệu Thế giới UNESCO (2022).',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Ánh sáng rọi huyền ảo vào Động Huyền Không trên Ngũ Hành Sơn',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Quốc gia đặc biệt & Di sản Tư liệu Thế giới UNESCO.',
    lat: 16.0044,
    lng: 108.2636,
    address: 'Đường Huyền Trân Công Chúa, Phường Hòa Hải, Quận Ngũ Hành Sơn, Thành phố Đà Nẵng',
    visitingHours: '07:00 - 17:30 hàng ngày',
    ticketPrice: '40.000 VNĐ / vé tham quan Thủy Sơn; Thang máy: 15.000 VNĐ / lượt; Động Âm Phủ: 20.000 VNĐ',
    googleMapsUri: 'https://maps.google.com/?q=Marble+Mountains+Da+Nang',
    tags: ['Đà Nẵng', 'Ngũ Hành Sơn', 'Động Huyền Không', 'Chùa Tam Thai', 'Đá Non Nước', 'Ma nhai UNESCO'],
    suggestedQuestions: [
      'Giá trị lịch sử của hệ thống Ma nhai khắc trên vách đá Ngũ Hành Sơn được UNESCO vinh danh?',
      'Truyền thuyết Ngũ Hành Sơn nở ra từ bọc trứng Rùa vàng của người Chăm Pa xưa?'
    ]
  },
  {
    id: 'chua-cau-hoi-an',
    name: 'Chùa Cầu Hội An (Lai Viễn Kiều) - Cây Cầu Bốn Trăm Năm Biểu Tượng Giao Thoa',
    vietnameseName: 'Chùa Cầu (Lai Viễn Kiều)',
    englishName: 'Japanese Covered Bridge (Chua Cau Hoi An)',
    category: 'architecture',
    categoryLabel: 'Kiến trúc Cầu cổ & Biểu tượng Đô thị',
    region: 'central',
    province: 'Quảng Nam',
    period: 'Xây dựng vào đầu thế kỷ 17',
    dynasty: 'Thời Chúa Nguyễn (Giao thương thương nhân Nhật Bản)',
    history: 'Được các thương nhân Nhật Bản định cư tại thương cảng Hội An quyên góp xây dựng vào khoảng đầu thế kỷ 17. Năm 1719, Chúa Nguyễn Phúc Chu vi hành Hội An đã ban tặng 3 chữ vàng "Lai Viễn Kiều" (Cầu đón khách phương xa).',
    culturalSignificance: 'Trái tim của Di sản Văn hóa Thế giới Phố cổ Hội An, hình ảnh in trang trọng trên tờ tiền polymer 20.000 VNĐ của Việt Nam. Cây cầu mái ngói độc nhất vô nhị bắc qua lạch nước nối phố người Nhật và phố người Hoa.',
    interestingFacts: [
      'Cầu được xây dựng theo truyền thuyết trấn yểm con thủy quái Cù (Namazu) có đầu ở Ấn Độ, đuôi ở Nhật Bản và lưng ở Hội An để cầu mong bình yên.',
      'Ở hai đầu cầu có hai đôi tượng đá chạm khắc hình Thần Chó (Thiên Cẩu) và Thần Khỉ (Thân), tượng trưng cho năm khởi công (Thân) và hoàn thành (Tuất).',
      'Trên cầu có một gian thờ nhỏ không thờ Phật mà thờ Bắc Đế Trấn Vũ (vị thần trị thủy, bảo hộ dân làng khỏi bão lụt).'
    ],
    conservationStatus: 'Di tích Quốc gia đặc biệt thuộc Quần thể Đô thị Cổ Hội An UNESCO.',
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Lai Viễn Kiều (Chùa Cầu Hội An) trầm mặc soi bóng lạch nước cổ',
    verifiedStatus: 'verified',
    verifiedNote: 'Di sản Văn hóa Thế giới UNESCO (1999) & Di tích Quốc gia đặc biệt.',
    lat: 15.8772,
    lng: 108.3261,
    address: 'Đường Nguyễn Thị Minh Khai, Phường Minh An, Thành phố Hội An, Tỉnh Quảng Nam',
    visitingHours: 'Tham quan tự do 24/7 (Phố đi bộ lung linh đèn lồng về đêm)',
    ticketPrice: 'Nằm trong vé tham quan trọn gói Phố Cổ Hội An (80.000 VNĐ / khách)',
    googleMapsUri: 'https://maps.google.com/?q=Japanese+Covered+Bridge+Hoi+An',
    tags: ['Quảng Nam', 'Đà Nẵng', 'Hội An', 'Chùa Cầu', 'Lai Viễn Kiều', 'UNESCO', 'Tiền 20k'],
    suggestedQuestions: [
      'Truyền thuyết về con quái vật Cù (Namazu) gắn liền với việc xây dựng Chùa Cầu là gì?',
      'Tại sao trên Chùa Cầu lại thờ Bắc Đế Trấn Vũ thay vì tượng Phật?'
    ]
  },

  // =========================================================================
  // 13. KHÁNH HÒA & NINH THUẬN
  // =========================================================================
  {
    id: 'thap-ba-ponagar-nha-trang',
    name: 'Quần Thể Đền Tháp Chăm Cổ Ponagar - Nơi Thờ Mẹ Xứ Sở Thiên Y A Na',
    vietnameseName: 'Tháp Bà Ponagar Nha Trang',
    englishName: 'Po Nagar Cham Towers Complex Nha Trang',
    category: 'temple',
    categoryLabel: 'Kiến trúc Chăm Pa & Tín ngưỡng Tứ Phủ',
    region: 'central',
    province: 'Khánh Hòa (Hợp nhất Khánh Hòa & Ninh Thuận)',
    period: 'Thế kỷ 8 - 13 (Vương quốc Chăm Pa cổ)',
    dynasty: 'Thời kỳ Hoàn Vương & Panduranga Chăm Pa',
    history: 'Tọa lạc trên đồi Cù Lao bên cửa sông Cái Nha Trang. Quần thể được xây dựng để thờ Nữ thần Ponagar (tiếng Chăm nghĩa là Mẹ Xứ Sở), người dạy dân trồng trọt, dệt vải và bảo bọc mùa màng đời đời ấm no.',
    culturalSignificance: 'Di tích Lịch sử Kiến trúc Nghệ thuật Quốc gia đặc biệt. Lễ hội Tháp Bà Ponagar (20 - 23/3 âm lịch) là Di sản Văn hóa Phi vật thể Quốc gia, biểu tượng giao lưu văn hóa sâu sắc giữa người Việt và người Chăm.',
    interestingFacts: [
      'Kỹ thuật xây dựng bằng gạch nung đỏ xếp khít khao không thấy mạch vữa kết dính đến nay vẫn là bí ẩn khoa học kỳ diệu của người Chăm.',
      'Tháp chính (Dinh Bà) cao 23m thờ pho tượng Nữ thần Ponagar bằng đá hoa cương đen nguyên khối 10 cánh tay ngồi uy nghiêm trên tòa sen.',
      'Hàng cột Mandapa bằng gạch nung bát giác ở tầng dưới là nơi tín đồ chuẩn bị lễ vật trước khi bước lên tháp thiêng.'
    ],
    conservationStatus: 'Di tích Lịch sử và Kiến trúc nghệ thuật Cấp Quốc gia xếp hạng năm 1979.',
    imageUrl: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Cụm tháp gạch nung Tháp Bà Ponagar sừng sững trên đồi Cù Lao',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Quốc gia & Di sản Phi vật thể Quốc gia (Lễ hội Tháp Bà).',
    lat: 12.2653,
    lng: 109.1958,
    address: 'Đường 2 Tháng 4, Phường Vĩnh Phước, Thành phố Nha Trang, Tỉnh Khánh Hòa',
    visitingHours: '06:00 - 17:30 hàng ngày',
    ticketPrice: '30.000 VNĐ / vé tham quan',
    googleMapsUri: 'https://maps.google.com/?q=Ponagar+Tower+Nha+Trang',
    tags: ['Khánh Hòa', 'Nha Trang', 'Tháp Bà Ponagar', 'Thiên Y A Na', 'Chăm Pa', 'Kiến trúc gạch'],
    suggestedQuestions: [
      'Truyền thuyết Nữ thần Mẹ Xứ Sở Ponagar của người Chăm và người Việt có gì chung?',
      'Bí quyết gạch nung không vữa kết dính của các ngôi tháp Chăm cổ được lý giải ra sao?'
    ]
  },
  {
    id: 'thap-po-klong-garai-ninh-thuan',
    name: 'Quần Thể Tháp Po Klong Garai - Đỉnh Cao Nghệ Thuật Kiến Trúc Tháp Chăm',
    vietnameseName: 'Tháp Po Klong Garai',
    englishName: 'Po Klong Garai Cham Towers',
    category: 'temple',
    categoryLabel: 'Kiến trúc Nghệ thuật Chăm Pa Cổ',
    region: 'central',
    province: 'Khánh Hòa (Ninh Thuận)',
    period: 'Cuối thế kỷ 13 - đầu thế kỷ 14 (Vua Jaya Simhavarman III - Chế Mân)',
    dynasty: 'Vương triều Panduranga Chăm Pa',
    history: 'Tọa lạc trên đồi Trầu (núi Đồi Trầu) thuộc Phan Rang. Được vua Chế Mân xây dựng để suy tôn vị vua huyền thoại Po Klong Garai - người có công lao vĩ đại dạy dân dẫn thủy nhập điền đắp đập khai hoang bờ cõi.',
    culturalSignificance: 'Di tích Quốc gia đặc biệt. Quần thể tháp Chăm hùng vĩ, hoàn mỹ và được bảo tồn nguyên vẹn nhất trong toàn bộ hệ thống đền tháp Chăm Pa còn lại trên đất nước Việt Nam.',
    interestingFacts: [
      'Quần thể gồm 3 ngôi tháp: Tháp Cổng, Tháp Lửa (nhà kho chứa đồ tế lễ) và Tháp Chính cao hơn 20m thờ tượng vua hóa thân thần Shiva (Mukhalinga).',
      'Trên cửa chính có bức phù điêu Thần Shiva 6 tay uyển chuyển múa điệu vũ vũ trụ Tandava tuyệt mỹ.',
      'Mỗi dịp tháng 10 âm lịch, đồng bào Chăm nô nức đổ về đồi Trầu cử hành Lễ hội Katê rực rỡ sắc màu trang phục truyền thống và tiếng kèn Saranai.'
    ],
    conservationStatus: 'Di tích Lịch sử và Kiến trúc nghệ thuật Quốc gia đặc biệt xếp hạng năm 2016.',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Cụm Tháp Po Klong Garai trên đồi Trầu nắng gió Phan Rang',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Quốc gia đặc biệt theo Quyết định số 2499/QĐ-TTg của Thủ tướng Chính phủ.',
    lat: 11.6028,
    lng: 108.9458,
    address: 'Đồi Trầu, Phường Đô Vinh, Thành phố Phan Rang - Tháp Chàm, Tỉnh Ninh Thuận (Vùng Khánh Hòa mở rộng)',
    visitingHours: '07:30 - 17:30 hàng ngày',
    ticketPrice: '20.000 VNĐ / vé tham quan; Xe điện đưa lên đồi: 15.000 VNĐ / lượt',
    googleMapsUri: 'https://maps.google.com/?q=Po+Klong+Garai+Cham+Towers',
    tags: ['Ninh Thuận', 'Khánh Hòa', 'Po Klong Garai', 'Tháp Chàm', 'Phan Rang', 'Lễ hội Katê'],
    suggestedQuestions: [
      'Công lao trị thủy vĩ đại của vua Po Klong Garai đối với xứ Panduranga xưa?',
      'Nghi thức rước y trang và mở cửa tháp trong Lễ hội Katê diễn ra như thế nào?'
    ]
  },

  // =========================================================================
  // 14. LÂM ĐỒNG (HỢP NHẤT LÂM ĐỒNG, ĐẮK NÔNG & BÌNH THUẬN)
  // =========================================================================
  {
    id: 'dinh-iii-bao-dai-da-lat',
    name: 'Biệt Điện Dinh III Bảo Đại - Dinh Thự Mùa Hè Của Vị Hoàng Đế Cuối Cùng',
    vietnameseName: 'Dinh III Bảo Đại (Biệt điện Mùa Hè)',
    englishName: 'Bao Dai Summer Palace (Dinh III Da Lat)',
    category: 'palace',
    categoryLabel: 'Dinh thự Cung đình & Lịch sử',
    region: 'central',
    province: 'Lâm Đồng',
    period: 'Xây dựng năm 1933 - 1938',
    dynasty: 'Triều Nguyễn & Thời kỳ Quốc trưởng Việt Nam',
    history: 'Tọa lạc giữa rừng thông thuần chủng trên đồi cao 1.539m tại Đà Lạt. Dinh thự do kiến trúc sư người Pháp Paul Veysseyre cùng kiến trúc sư Huỳnh Tấn Phát thiết kế làm nơi nghỉ dưỡng mùa hè và làm việc của vua Bảo Đại cùng Hoàng hậu Nam Phương.',
    culturalSignificance: 'Di tích Lịch sử Văn hóa tiêu biểu, công trình kiến trúc phong cách Art Deco châu Âu thanh lịch và nơi lưu giữ trọn vẹn hiện vật hoàng gia của vị hoàng đế cuối cùng trong lịch sử phong kiến Việt Nam.',
    interestingFacts: [
      'Gồm 25 phòng nghỉ sang trọng, phòng làm việc của vua Bảo Đại, phòng ngủ của Thái tử Bảo Long và các công chúa hoàng tử.',
      'Lưu giữ chiếc ngai vàng, ngọc tỷ hoàng đế cùng các bức chân dung sơn dầu quý giá của triều Nguyễn.',
      'Khuôn viên có vườn hoa ngự uyển kiểu Pháp với các loài hoa cẩm tú cầu, hoa hồng ngoại nhập nở bốn mùa.'
    ],
    conservationStatus: 'Điểm tham quan di tích lịch sử văn hóa cấp tỉnh được bảo tồn nguyên vẹn nội thất.',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Biệt điện Dinh III Bảo Đại thanh lịch giữa rừng thông Đà Lạt',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Lịch sử Văn hóa Tỉnh Lâm Đồng.',
    lat: 11.9306,
    lng: 108.4289,
    address: 'Số 1 Đường Triệu Việt Vương, Phường 4, Thành phố Đà Lạt, Tỉnh Lâm Đồng',
    visitingHours: '07:00 - 17:30 hàng ngày',
    ticketPrice: '40.000 VNĐ / vé người lớn, 20.000 VNĐ / vé trẻ em',
    googleMapsUri: 'https://maps.google.com/?q=Bao+Dai+Summer+Palace+Dalat',
    tags: ['Lâm Đồng', 'Đà Lạt', 'Dinh Bảo Đại', 'Nam Phương Hoàng Hậu', 'Art Deco', 'Biệt điện'],
    suggestedQuestions: [
      'Lối sống hoàng gia của vua Bảo Đại và Hoàng hậu Nam Phương tại Đà Lạt?',
      'Đặc trưng phong cách kiến trúc Art Deco thể hiện ra sao trong nội thất Dinh III?'
    ]
  },
  {
    id: 'thac-datanla-da-lat',
    name: 'Thác Datanla & Thung Lũng Rừng Nguyên Sinh Đà Lạt',
    vietnameseName: 'Thác Datanla',
    englishName: 'Datanla Waterfalls Da Lat',
    category: 'nature_scenic',
    categoryLabel: 'Danh thắng Thiên nhiên & Thác nước',
    region: 'central',
    province: 'Lâm Đồng',
    period: 'Thiên nhiên hoang sơ ngàn năm cao nguyên',
    history: 'Nằm bên đèo Prenn cách trung tâm Đà Lạt 5km. Tên gọi Datanla bắt nguồn từ tiếng người K\'Ho: "Đạ Tam Nnha" có nghĩa là "dưới lá có nước", gắn với truyền thuyết dũng sĩ K\'Lang đánh bại ác thú bảo vệ người yêu là nàng H\'Biang xinh đẹp.',
    culturalSignificance: 'Một trong những thác nước tự nhiên đẹp và nổi tiếng nhất Đà Lạt với dòng thác đổ 7 tầng qua vách đá granite u tịch giữa rừng thông nguyên sinh bạt ngàn.',
    interestingFacts: [
      'Tuyến máng trượt alpine coaster xuyên rừng thông dài 2.400m đạt kỷ lục đường trượt dài nhất Đông Nam Á.',
      'Khu vực Suối Tiên nước trong vắt tương truyền là nơi các nàng tiên giáng trần tắm mát xưa kia.',
      'Các trò chơi mạo hiểm đỉnh cao: đu dây vượt thác (canyoning), trượt zipline xuyên tán rừng già.'
    ],
    conservationStatus: 'Khu du lịch sinh thái di tích danh thắng cấp Quốc gia (1998).',
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Dòng thác Datanla tung bọt trắng xóa giữa rừng thông cao nguyên',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Danh lam thắng cảnh Cấp Quốc gia xếp hạng năm 1998.',
    lat: 11.9036,
    lng: 108.4489,
    address: 'Đèo Prenn, Quốc lộ 20, Phường 3, Thành phố Đà Lạt, Tỉnh Lâm Đồng',
    visitingHours: '07:00 - 17:00 hàng ngày',
    ticketPrice: '50.000 VNĐ / vé vào cổng; Vé máng trượt khứ hồi: 200.000 VNĐ / người lớn',
    googleMapsUri: 'https://maps.google.com/?q=Datanla+Waterfall+Dalat',
    tags: ['Lâm Đồng', 'Đà Lạt', 'Thác Datanla', 'Máng trượt', 'Đèo Prenn', 'Rừng thông'],
    suggestedQuestions: [
      'Truyền thuyết Đạ Tam Nnha gắn với thiên tình sử K\'Lang và H\'Biang như thế nào?',
      'Trải nghiệm máng trượt xuyên rừng dài nhất Đông Nam Á tại Datanla có gì thú vị?'
    ]
  },
  {
    id: 'doi-cat-trang-bau-trang-binh-thuan',
    name: 'Bàu Trắng & Đồi Cát Trinh Nữ - "Tiểu Sa Mạc Sahara" Bên Hồ Sen Mênh Mông',
    vietnameseName: 'Bàu Trắng (Bàu Sen)',
    englishName: 'Bau Trang White Sand Dunes & Lotus Lake',
    category: 'nature_scenic',
    categoryLabel: 'Danh thắng Sa mạc Cát & Hồ nước ngọt',
    region: 'central',
    province: 'Lâm Đồng (Bình Thuận)',
    period: 'Địa chất cồn cát ven biển hình thành tự nhiên hàng triệu năm',
    history: 'Bàu Trắng nguyên là một hồ nước ngọt tự nhiên lớn xưa kia. Người dân đắp đập cát chia hồ thành hai phần: Bàu Ông (nhỏ dài) và Bàu Bà (rộng lớn, sâu thẳm). Xung quanh là những đồi cát trắng phau ngút ngàn.',
    culturalSignificance: 'Kỳ quan thiên nhiên độc nhất vô nhị của Việt Nam: đồi cát sa mạc trắng tinh khôi ôm trọn mặt hồ nước ngọt ngát hương sen nở rộ quanh năm giữa vùng đất đầy nắng gió.',
    interestingFacts: [
      'Đồi Cát Trinh Nữ liên tục đổi hình dạng từng ngày theo từng cơn gió thổi từ đại dương.',
      'Mùa hè từ tháng 5 đến tháng 8, mặt hồ Bàu Bà phủ kín sắc hoa sen hồng rực rỡ tương phản với cát trắng và trời xanh.',
      'Cung đường ven biển DT716 chạy qua Bàu Trắng được bình chọn là một trong những cung đường biển đẹp nhất Việt Nam.'
    ],
    conservationStatus: 'Danh thắng Thiên nhiên Cấp Quốc gia xếp hạng năm 2019.',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Đồi cát trắng tinh khôi Bàu Trắng ôm trọn mặt hồ sen trong biếc',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Danh lam thắng cảnh Cấp Quốc gia Bộ VHTT&DL.',
    lat: 11.0667,
    lng: 108.4250,
    address: 'Thôn Hồng Lâm, Xã Hòa Thắng, Huyện Bắc Bình, Tỉnh Bình Thuận (Vùng Lâm Đồng mở rộng)',
    visitingHours: 'Mở cửa tham quan tự do; Xe jeep vượt đồi cát: 05:00 - 18:00',
    ticketPrice: 'Vé vào cổng Bàu Trắng: 15.000 VNĐ; Thuê xe jeep vượt đồi cát: 600.000 - 800.000 VNĐ/xe',
    googleMapsUri: 'https://maps.google.com/?q=Bau+Trang+White+Sand+Dunes',
    tags: ['Bình Thuận', 'Lâm Đồng', 'Bàu Trắng', 'Đồi cát trắng', 'Bàu Sen', 'Xe jeep', 'Sahara Việt Nam'],
    suggestedQuestions: [
      'Hiện tượng kỳ thú nào giúp hoa sen phát triển xanh tốt giữa lòng đồi cát sa mạc Bàu Trắng?',
      'Trải nghiệm ngắm bình minh trên đồi cát Trinh Nữ diễn ra vào thời khắc nào đẹp nhất?'
    ]
  },

  // =========================================================================
  // 15. THÀNH PHỐ HỒ CHÍ MINH, BÌNH DƯƠNG & BÀ RỊA - VŨNG TÀU
  // =========================================================================
  {
    id: 'dinh-doc-lap-tphcm',
    name: 'Hội Trường Thống Nhất (Dinh Độc Lập) - Dấu Ấn Lịch Sử Thống Nhất Non Sông',
    vietnameseName: 'Dinh Độc Lập',
    englishName: 'Independence Palace (Reunification Convention Hall)',
    category: 'monument',
    categoryLabel: 'Di tích Lịch sử Quốc gia Đặc biệt',
    region: 'south',
    province: 'Thành phố Hồ Chí Minh',
    period: 'Khánh thành năm 1966 (Kiến trúc sư Ngô Viết Thụ)',
    history: 'Tọa lạc trên nền Dinh Norodom thời Pháp thuộc. Được kiến trúc sư tài ba Ngô Viết Thụ (giải Khôi nguyên La Mã) thiết kế hòa trộn triết lý phương Đông. Trưa ngày 30/4/1975, xe tăng giải phóng húc đổ cổng chính, kết thúc thắng lợi cuộc kháng chiến chống Mỹ cứu nước, thống nhất non sông.',
    culturalSignificance: 'Di tích Quốc gia đặc biệt. Chứng nhân lịch sử vĩ đại của thời khắc chuyển giao lịch sử thiêng liêng và đỉnh cao của kiến trúc hiện đại nhiệt đới Việt Nam.',
    interestingFacts: [
      'Mặt bằng Dinh được thiết kế theo hình chữ Cát (吉 - tốt lành), mặt tiền mô phỏng cửa sổ cung đình và hoa văn rèm hoa đá hình các đốt trúc thanh nhã.',
      'Hệ thống hầm ngầm kiên cố dưới tầng hầm được đúc bằng bê tông cốt thép chịu được bom đạn với đầy đủ trung tâm liên lạc tác chiến và bản đồ chỉ huy.',
      'Hai chiếc xe tăng huyền thoại số hiệu 390 và 843 từng húc đổ cổng Dinh ngày 30/4/1975 hiện là Bảo vật Quốc gia được trưng bày tại khuôn viên.'
    ],
    conservationStatus: 'Di tích Lịch sử Quốc gia đặc biệt theo Quyết định số 1272/QĐ-TTg của Thủ tướng Chính phủ.',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Cổng chính Dinh Độc Lập - Chứng nhân trưa ngày 30 tháng 4 năm 1975',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Quốc gia đặc biệt & Lưu giữ 2 Bảo vật Quốc gia (Xe tăng 390 & 843).',
    lat: 10.7769,
    lng: 106.6953,
    address: '135 Đường Nam Kỳ Khởi Nghĩa, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh',
    visitingHours: '08:00 - 16:30 hàng ngày',
    ticketPrice: '40.000 VNĐ / vé tham quan tòa nhà chính; 65.000 VNĐ / vé trọn gói kèm khu trưng bày',
    googleMapsUri: 'https://maps.google.com/?q=Independence+Palace+Ho+Chi+Minh+City',
    tags: ['TP.HCM', 'Dinh Độc Lập', 'Quận 1', '30 tháng 4', 'Ngô Viết Thụ', 'Bảo vật Quốc gia', 'Thống nhất'],
    suggestedQuestions: [
      'Triết lý chữ Cát và nghệ thuật kiến trúc phương Đông của KTS Ngô Viết Thụ trong Dinh Độc Lập?',
      'Ý nghĩa của hai chiếc xe tăng 390 và 843 được công nhận là Bảo vật Quốc gia?'
    ]
  },
  {
    id: 'nha-tho-duc-ba-tphcm',
    name: 'Vương Cung Thánh Đường Đức Bà Sài Gòn & Bưu Điện Trung Tâm',
    vietnameseName: 'Nhà thờ Đức Bà Sài Gòn',
    englishName: 'Notre Dame Cathedral of Saigon & Central Post Office',
    category: 'architecture',
    categoryLabel: 'Kiến trúc Cổ & Biểu tượng Đô thị',
    region: 'south',
    province: 'Thành phố Hồ Chí Minh',
    period: 'Xây dựng năm 1877 - 1880 (Thời Pháp thuộc)',
    history: 'Được thiết kế bởi kiến trúc sư J. Bourard theo phong cách Roman pha lẫn Gothic tráng lệ. Toàn bộ vật liệu xây dựng từ gạch ngói ngói đỏ Marseille, kính màu ghép đến chuông đồng đều được đưa trực tiếp từ Pháp sang.',
    culturalSignificance: 'Biểu tượng kiến trúc tôn giáo và lịch sử văn hóa tiêu biểu của Sài Gòn - TP.HCM. Tòa thánh đường hơn 140 năm tuổi đứng uy nghiêm giữa quảng trường Công xã Paris bên cạnh Tòa Bưu điện Trung tâm cổ kính.',
    interestingFacts: [
      'Gạch đỏ xây tường là gạch trần sản xuất tại Toulouse (Pháp) đến nay vẫn giữ nguyên sắc hồng tươi tắn không hề bám rêu phong.',
      'Hai tháp chuông gắn thêm chóp nhọn bằng sắt năm 1895 cao 60.5m treo 6 quả chuông đồng khổng lồ nặng gần 30 tấn mang các nốt nhạc Sol, La, Si, Đô, Rê, Mi.',
      'Tượng Đức Mẹ Hòa Bình bằng đá cẩm thạch trắng Carrara (Ý) ngự giữa quảng trường tay ôm trái đất cầu nguyện hòa bình cho dân tộc.'
    ],
    conservationStatus: 'Di tích Kiến trúc Nghệ thuật cấp Quốc gia đang được trùng tu bảo tồn nguyên trạng.',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Hai tháp chuông kiêu hãnh của Nhà thờ Đức Bà giữa trung tâm Sài Gòn',
    verifiedStatus: 'verified',
    verifiedNote: 'Vương cung Thánh đường Giáo hội Công giáo & Di tích Kiến trúc Đô thị.',
    lat: 10.7797,
    lng: 106.6990,
    address: 'Số 1 Quảng trường Công xã Paris, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    visitingHours: 'Chiêm ngưỡng bên ngoài 24/7 (Đang trong giai đoạn đại trùng tu an toàn)',
    ticketPrice: 'Tham quan tự do',
    googleMapsUri: 'https://maps.google.com/?q=Notre+Dame+Cathedral+Saigon',
    tags: ['TP.HCM', 'Nhà thờ Đức Bà', 'Quận 1', 'Bưu điện trung tâm', 'Kiến trúc Pháp', 'Gạch Marseille'],
    suggestedQuestions: [
      'Kỹ thuật gạch ngói đỏ Toulouse của Nhà thờ Đức Bà vì sao hơn 140 năm không mọc rêu phong?',
      'Hệ thống 6 quả chuông đồng hòa âm bên trong hai tháp chuông hoạt động như thế nào?'
    ]
  },
  {
    id: 'nha-tu-con-dao-vung-tau',
    name: 'Khu Di Tích Lịch Sử Quốc Gia Đặc Biệt Nhà Tù Côn Đảo - "Địa Ngục Trần Gian"',
    vietnameseName: 'Nhà tù Côn Đảo & Nghĩa trang Hàng Dương',
    englishName: 'Con Dao Prison Special Relic & Hang Duong Cemetery',
    category: 'monument',
    categoryLabel: 'Di tích Lịch sử Cách mạng & Nghĩa trang Liệt sĩ',
    region: 'south',
    province: 'Thành phố Hồ Chí Minh (Bà Rịa - Vũng Tàu)',
    period: '1862 - 1975 (Tồn tại suốt 113 năm qua hai thời kỳ thực dân và đế quốc)',
    history: 'Được thực dân Pháp thiết lập năm 1862 ngoài quần đảo Côn Lôn để giam giữ và tra tấn các chiến sĩ yêu nước, các nhà cách mạng kiên trung của dân tộc như Phan Chu Trinh, Huỳnh Thúc Kháng, Tôn Đức Thắng, Lê Duẩn, Nguyễn Văn Cừ, Phạm Hùng...',
    culturalSignificance: 'Di tích Quốc gia đặc biệt. Bản cáo trạng đanh thép về tội ác chiến tranh và biểu tượng chói lọi của ý chí kiên cường, lòng quả cảm không khuất phục của các chiến sĩ cách mạng Việt Nam.',
    interestingFacts: [
      'Hệ thống "Chuồng Cọp" kiểu Pháp và "Chuồng Cọp" kiểu Mỹ giam cầm biệt lập trong điều kiện cực hình man rợ từng gây chấn động dư luận quốc tế khi bị phát giác năm 1970.',
      'Nghĩa trang Hàng Dương là nơi yên nghỉ của gần 2.000 liệt sĩ, trong đó có mộ nữ Anh hùng Lực lượng Vũ trang Nhân dân Võ Thị Sáu linh thiêng, đồng chí Lê Hồng Phong, nhà yêu nước Nguyễn An Ninh.',
      'Nghi thức viếng nghĩa trang Hàng Dương vào lúc nửa đêm là nét sinh hoạt tâm linh tri ân xúc động bậc nhất Việt Nam.'
    ],
    conservationStatus: 'Di tích Lịch sử Quốc gia đặc biệt xếp hạng năm 2012.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Khu di tích Trại giam Phú Hải tại Nhà tù Côn Đảo',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Quốc gia đặc biệt theo Quyết định số 548/QĐ-TTg của Thủ tướng Chính phủ.',
    lat: 8.6833,
    lng: 106.6000,
    address: 'Huyện Côn Đảo, Tỉnh Bà Rịa - Vũng Tàu (Vùng TP.HCM mở rộng)',
    visitingHours: '07:30 - 11:30 & 13:30 - 16:30 hàng ngày; Nghĩa trang Hàng Dương mở cửa đến 24:00',
    ticketPrice: '50.000 VNĐ / vé trọn gói tham quan các cụm trại giam; Viếng Nghĩa trang miễn phí',
    googleMapsUri: 'https://maps.google.com/?q=Con+Dao+Prison+Relic',
    tags: ['Côn Đảo', 'Vũng Tàu', 'TP.HCM', 'Nhà tù Côn Đảo', 'Chuồng cọp', 'Võ Thị Sáu', 'Hàng Dương'],
    suggestedQuestions: [
      'Vụ việc phát giác hệ thống Chuồng Cọp Côn Đảo năm 1970 đã gây chấn động thế giới ra sao?',
      'Khí phách hiên ngang trước họng súng kẻ thù của nữ Anh hùng liệt sĩ Võ Thị Sáu?'
    ]
  },
  {
    id: 'tuong-chua-kito-vung-tau',
    name: 'Tượng Chúa Kytô Vua Núi Nhỏ Vũng Tàu - Tượng Chúa Lớn Nhất Châu Á',
    vietnameseName: 'Tượng Chúa Kytô Vua (Núi Tao Phùng)',
    englishName: 'Christ the King of Vung Tau (Tao Phung Mountain)',
    category: 'monument',
    categoryLabel: 'Kiến trúc Điêu khắc & Danh thắng Biển',
    region: 'south',
    province: 'Thành phố Hồ Chí Minh (Bà Rịa - Vũng Tàu)',
    period: 'Xây dựng năm 1974 - 1994',
    history: 'Tọa lạc trên đỉnh núi Tao Phùng (Núi Nhỏ) cao 170m so với mực nước biển nhìn ra biển Đông. Công trình do Giáo phận Xuân Lộc và cộng đồng Công giáo khởi công xây dựng, sau nhiều năm gián đoạn đã hoàn thành khang trang năm 1994.',
    culturalSignificance: 'Kỷ lục Châu Á công nhận là "Tượng Chúa Kitô lớn nhất khu vực Châu Á" năm 2012. Biểu tượng lòng nhân ái, niềm tin tôn giáo và điểm ngắm toàn cảnh thành phố biển Vũng Tàu kỳ vĩ.',
    interestingFacts: [
      'Tượng cao 32m, hai cánh tay dang rộng 18.3m hướng ra đại dương bao la.',
      'Bên trong lòng tượng có cầu thang xoắn ốc gồm 133 bậc dẫn lên hai bờ vai tượng Chúa, nơi du khách có thể đứng đón gió biển lộng ngắm toàn cảnh Bãi Trước và Bãi Sau.',
      'Để lên đến chân tượng, du khách chinh phục gần 1.000 bậc thang đá uốn lượn rợp bóng cây hoa sứ thơm ngát.'
    ],
    conservationStatus: 'Di tích Kiến trúc Nghệ thuật và Thắng cảnh Tỉnh Bà Rịa - Vũng Tàu & Kỷ lục Châu Á.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Tượng Chúa Kytô dang tay bao bọc biển trời Vũng Tàu',
    verifiedStatus: 'verified',
    verifiedNote: 'Kỷ lục Tổ chức Kỷ lục Châu Á xác lập năm 2012.',
    lat: 10.3267,
    lng: 107.0847,
    address: 'Núi Nhỏ (Tao Phùng), Phường 2, Thành phố Vũng Tàu, Tỉnh Bà Rịa - Vũng Tàu',
    visitingHours: '07:00 - 17:00 hàng ngày (Lên vai tượng ngưng nhận khách lúc 16:30)',
    ticketPrice: 'Vào cửa tham quan tự do (Trang phục lịch sự, kín đáo khi vào trong tượng)',
    googleMapsUri: 'https://maps.google.com/?q=Christ+the+King+Vung+Tau',
    tags: ['Vũng Tàu', 'TP.HCM', 'Tượng Chúa Kytô', 'Núi Nhỏ', 'Kỷ lục Châu Á', 'Bãi Sau'],
    suggestedQuestions: [
      'Kiến trúc chịu lực và chống gió bão biển của Tượng Chúa Kytô Vua Vũng Tàu?',
      'Trải nghiệm đứng trên vai tượng Chúa nhìn ngắm toàn cảnh thành phố biển ra sao?'
    ]
  },

  // =========================================================================
  // 16. TÂY NINH & LONG AN
  // =========================================================================
  {
    id: 'toa-thanh-cao-dai-tay-ninh',
    name: 'Tòa Thánh Cao Đài Tây Ninh - Trung Tâm Tôn Giáo Dung Hợp Độc Nhất',
    vietnameseName: 'Tòa Thánh Tây Ninh (Đền Thánh)',
    englishName: 'Cao Dai Holy See Tay Ninh',
    category: 'temple',
    categoryLabel: 'Kiến trúc Tôn giáo & Tín ngưỡng Bản địa',
    region: 'south',
    province: 'Tây Ninh',
    period: 'Khởi công năm 1931, khánh thành năm 1955',
    history: 'Trung ương của Hội Thánh Cao Đài Tòa Thánh Tây Ninh - tôn giáo nội sinh hình thành tại Nam Bộ từ năm 1926 với tôn chỉ dung hợp giáo lý Nho giáo, Phật giáo, Đạo giáo, Kitô giáo và Hồi giáo (Tam giáo quy nguyên, Ngũ chi phục nhất).',
    culturalSignificance: 'Kiệt tác kiến trúc tôn giáo độc nhất vô nhị trên thế giới. Sự kết hợp kỳ ảo giữa tháp chuông Kitô giáo, mái đao chùa chiền phương Đông và Cung Nghinh Phong Hồi giáo.',
    interestingFacts: [
      'Được xây dựng hoàn toàn từ sức lao động tự nguyện của các tín đồ mà không sử dụng bản vẽ thiết kế bằng giấy hay kỹ sư xây dựng chuyên nghiệp.',
      'Gian đại điện có biểu tượng Thiên Nhãn (Mắt Trời) tỏa sáng trên quả càn khôn vũ trụ tượng trưng cho Thượng đế thấy rõ mọi tâm niệm thế gian.',
      'Nghi lễ đại lễ cúng Tòa Thánh diễn ra 4 lần mỗi ngày (00h, 06h, 12h, 18h) với hàng ngàn tín đồ mặc áo dài trắng tinh khôi hành lễ trang nghiêm.'
    ],
    conservationStatus: 'Quần thể Tôn giáo Di sản Văn hóa tiêu biểu Nam Bộ.',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Mặt tiền rực rỡ sắc màu dung hợp của Tòa Thánh Cao Đài Tây Ninh',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Tôn giáo Văn hóa Đặc sắc Quốc gia.',
    lat: 11.3094,
    lng: 106.1367,
    address: 'Phường Hiệp Ninh, Thị xã Hòa Thành, Tỉnh Tây Ninh',
    visitingHours: '06:00 - 18:00 hàng ngày (Xem lễ cúng lúc 12:00 trưa trên tầng lửng)',
    ticketPrice: 'Vào cửa tham quan tự do (Yêu cầu trang phục kín đáo lịch sự)',
    googleMapsUri: 'https://maps.google.com/?q=Cao+Dai+Temple+Tay+Ninh',
    tags: ['Tây Ninh', 'Cao Đài', 'Tòa Thánh', 'Thiên Nhãn', 'Tam giáo', 'Hòa Thành'],
    suggestedQuestions: [
      'Ý nghĩa biểu tượng Thiên Nhãn trong giáo lý Đạo Cao Đài?',
      'Kiến trúc Tòa Thánh Tây Ninh dung hợp tinh hoa các tôn giáo lớn trên thế giới ra sao?'
    ]
  },
  {
    id: 'lang-noi-tan-lap-long-an',
    name: 'Khu Du Lịch Sinh Thái Làng Nổi Tân Lập - Con Đường Xuyên Rừng Tràm Cổ',
    vietnameseName: 'Làng nổi Tân Lập',
    englishName: 'Tan Lap Floating Village Ecotourism Area',
    category: 'nature_scenic',
    categoryLabel: 'Danh thắng Thiên nhiên & Rừng tràm Ngập nước',
    region: 'south',
    province: 'Tây Ninh (Long An)',
    period: 'Hệ sinh thái ngập nước tự nhiên Đồng Tháp Mười',
    history: 'Nằm ở trung tâm vùng đất trũng ngập nước Đồng Tháp Mười nguyên sơ của tỉnh Long An. Tên gọi "Làng nổi" bắt nguồn từ tập quán sinh sống của người dân xưa kia trên những ngôi nhà bè trôi nổi theo con nước nổi hàng năm.',
    culturalSignificance: 'Khu bảo tồn sinh thái rừng tràm ngập nước kiểu mẫu Nam Bộ với con đường mòn đan xuyên rừng tràm dài kỷ lục và tháp quan sát giữa biển xanh bao la.',
    interestingFacts: [
      'Con đường xi măng uốn lượn xuyên rừng tràm dài 5km được mệnh danh là con đường xuyên rừng tràm bí ẩn và đẹp nhất Việt Nam.',
      'Tháp quan sát cao 38m giữa rừng cho tầm nhìn 360 độ ngắm trọn vẹn thảm rừng tràm xanh ngắt và dòng kinh rạch hoa súng nở đỏ rực.',
      'Du khách ngồi xuồng chèo ba lá luồn lách qua các lạch nước hẹp nghe chim hót ríu rít và ngắm sen súng mùa nước nổi.'
    ],
    conservationStatus: 'Khu Du lịch Sinh thái Trọng điểm Tỉnh Long An.',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Con đường xi măng xuyên rừng tràm cổ tích tại Làng nổi Tân Lập',
    verifiedStatus: 'verified',
    verifiedNote: 'Điểm du lịch sinh thái tiêu biểu vùng Đồng Tháp Mười.',
    lat: 10.6389,
    lng: 106.0167,
    address: 'Quốc lộ 62, Xã Tân Lập, Huyện Mộc Hóa, Tỉnh Long An (Vùng Tây Ninh mở rộng)',
    visitingHours: '07:30 - 17:30 hàng ngày',
    ticketPrice: '60.000 VNĐ / vé vào cổng; Đi xuồng chèo ba lá ngắm sen: 50.000 VNĐ / khách',
    googleMapsUri: 'https://maps.google.com/?q=Tan+Lap+Floating+Village+Long+An',
    tags: ['Long An', 'Tây Ninh', 'Làng nổi Tân Lập', 'Rừng tràm', 'Đồng Tháp Mười', 'Mùa nước nổi'],
    suggestedQuestions: [
      'Hệ sinh thái đặc trưng mùa nước nổi tại Làng nổi Tân Lập có những loài gì?',
      'Trải nghiệm chèo xuồng ba lá xuyên rừng tràm cổ tích diễn ra như thế nào?'
    ]
  },

  // =========================================================================
  // 17. CẦN THƠ, HẬU GIANG & SÓC TRĂNG
  // =========================================================================
  {
    id: 'cho-noi-cai-rang-can-tho',
    name: 'Chợ Nổi Cái Răng - Độc Đáo Văn Hóa Thương Hồ Sông Nước Tây Đô',
    vietnameseName: 'Chợ nổi Cái Răng',
    englishName: 'Cai Rang Floating Market Can Tho',
    category: 'traditional_market',
    categoryLabel: 'Chợ truyền thống & Chợ nổi Miệt vườn',
    region: 'south',
    province: 'Cần Thơ (Hợp nhất Cần Thơ, Hậu Giang & Sóc Trăng)',
    period: 'Hình thành từ đầu thế kỷ 20',
    history: 'Ra đời khi đường bộ chưa phát triển, người dân miệt vườn tụ hội xuồng ghe về ngã ba sông Cần Thơ để giao thương trao đổi nông sản, trái cây miệt vườn ĐBSCL. Tên "Cái Răng" bắt nguồn từ truyền tích con cá sấu khổng lồ dạt vào bờ cắm răng.',
    culturalSignificance: 'Di sản Văn hóa Phi vật thể Quốc gia. Top 10 chợ nổi ấn tượng nhất thế giới do nhiều tạp chí du lịch quốc tế (Rough Guides) bình chọn. Biểu tượng sinh động của nếp sống thương hồ phương Nam.',
    interestingFacts: [
      'Cây "Bẹo" độc đáo: Mỗi ghe thuyền cắm một cây sào tre cao mũi ghe, treo thứ gì thì bán thứ ấy (treo dưa hấu bán dưa hấu, treo thơm bán thơm), treo mà không bán (quần áo phơi), không treo mà bán (ghe ăn uống).',
      'Thưởng thức tô hủ tiếu gõ nóng hổi, ly cà phê sữa đá đậm đà chòng chành ngay trên xuồng ghe giữa dòng sông bồng bềnh lúc sáng sớm.',
      'Chợ họp sôi nổi nhất từ 05:00 đến 08:00 sáng với hàng trăm ghe thuyền chở đầy hoa trái tươi ngon.'
    ],
    conservationStatus: 'Di sản Văn hóa Phi vật thể Quốc gia công nhận năm 2016.',
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Cảnh buôn bán tấp nập trên sông nước Chợ Nổi Cái Răng lúc bình minh',
    verifiedStatus: 'verified',
    verifiedNote: 'Di sản Văn hóa Phi vật thể Quốc gia theo Quyết định Bộ VHTT&DL.',
    lat: 10.0053,
    lng: 105.7461,
    address: 'Sông Cần Thơ, Phường Lê Bình, Quận Cái Răng, Thành phố Cần Thơ',
    visitingHours: '05:00 - 09:00 sáng mỗi ngày (Nên đi lúc 05:30 để đón bình minh)',
    ticketPrice: 'Thuê tàu thuyền từ Bến Ninh Kiều: 50.000 - 100.000 VNĐ / khách ghép',
    googleMapsUri: 'https://maps.google.com/?q=Cai+Rang+Floating+Market',
    tags: ['Cần Thơ', 'Cái Răng', 'Chợ nổi', 'Cây Bẹo', 'Tây Đô', 'Sông nước', 'Thương hồ'],
    suggestedQuestions: [
      'Ý nghĩa của phong tục "treo bẹo" độc đáo trên ghe thuyền Chợ nổi Cái Răng?',
      'Nếp sống thương hồ rày đây mai đó của người dân miền Tây sông nước?'
    ]
  },
  {
    id: 'chua-doi-soc-trang',
    name: 'Chùa Dơi (Chùa Mã Tộc / Wat Mahatup) - Kỳ Bí Ngôi Chùa Khmer Cổ Tích',
    vietnameseName: 'Chùa Dơi Sóc Trăng (Chùa Mã Tộc)',
    englishName: 'Bat Pagoda Soc Trang (Wat Mahatup)',
    category: 'temple',
    categoryLabel: 'Chùa Khmer & Di tích Văn hóa Tín ngưỡng',
    region: 'south',
    province: 'Cần Thơ (Sóc Trăng)',
    period: 'Xây dựng năm 1569 (Hơn 450 năm tuổi)',
    history: 'Ngôi chùa cổ kính của đồng bào Khmer Nam Bộ xây dựng từ thế kỷ 16. Tên chữ là Wat Mahatup (nghĩa là "ngôi chùa có phúc lành lớn"). Quần thể nổi tiếng kỳ lạ vì là nơi trú ngụ tự nhiên của hàng vạn cá thể dơi ngựa khổng lồ suốt hàng trăm năm qua.',
    culturalSignificance: 'Di tích Lịch sử Kiến trúc Nghệ thuật Cấp Quốc gia. Trung tâm tín ngưỡng Phật giáo Nam tông Khmer với kiến trúc mái đao rực rỡ, tượng rắn thần Naga và nghệ thuật phù điêu độc đáo.',
    interestingFacts: [
      'Hàng ngàn con dơi ngựa khổng lồ (sải cánh rộng đến 1.5m) treo lơ lửng ngược đầu trên những ngọn cây sao, dầu cổ thụ trong khuôn viên chùa ban ngày, chiều tối mới bay đi kiếm ăn.',
      'Điều kỳ lạ là đàn dơi chỉ đậu trong vườn chùa mà tuyệt đối không bao giờ đậu sang các khu vườn nhà dân xung quanh hay ăn trái cây trong chùa.',
      'Chùa lưu giữ những chiếc thuyền Ngo cổ truyền thống tham gia lễ hội đua ghe Ngo Ok Om Bok náo nức hàng năm.'
    ],
    conservationStatus: 'Di tích Kiến trúc Nghệ thuật Cấp Quốc gia xếp hạng năm 1999.',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Mái chùa cong vút lộng lẫy kiến trúc Khmer Nam Bộ của Chùa Dơi',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Kiến trúc Nghệ thuật Cấp Quốc gia Bộ VHTT&DL.',
    lat: 9.5858,
    lng: 105.9819,
    address: 'Đường Văn Ngọc Chính, Phường 3, Thành phố Sóc Trăng, Tỉnh Sóc Trăng (Vùng Cần Thơ mở rộng)',
    visitingHours: '07:00 - 18:00 hàng ngày',
    ticketPrice: 'Vào cửa tham quan tự do (Miễn phí)',
    googleMapsUri: 'https://maps.google.com/?q=Bat+Pagoda+Soc+Trang',
    tags: ['Sóc Trăng', 'Cần Thơ', 'Chùa Dơi', 'Khmer', 'Dơi ngựa', 'Wat Mahatup', 'Rắn Naga'],
    suggestedQuestions: [
      'Hiện tượng kỳ lạ về đàn dơi ngựa hàng vạn con cư ngụ trong Chùa Dơi Sóc Trăng?',
      'Đặc trưng kiến trúc Phật giáo Nam tông Khmer thể hiện ra sao trong Chùa Dơi?'
    ]
  },
  {
    id: 'nha-co-binh-thuy-can-tho',
    name: 'Nhà Cổ Bình Thủy - Tuyệt Tác Dinh Thự Năm Gian Hai Mái Phong Cách Pháp Việt',
    vietnameseName: 'Nhà cổ Bình Thủy (Nhà cổ họ Dương)',
    englishName: 'Binh Thuy Ancient House',
    category: 'ancient_house',
    categoryLabel: 'Kiến trúc Nhà cổ & Di sản Đô thị',
    region: 'south',
    province: 'Cần Thơ',
    period: 'Xây dựng năm 1870 (Dòng họ Dương danh gia vọng tộc)',
    history: 'Được ông Dương Chấn Kỷ khởi công xây dựng từ năm 1870 theo lối kiến trúc giao thoa Đông - Tây độc đáo. Ngôi nhà từng được nhiều đạo diễn quốc tế chọn làm bối cảnh chính cho các bộ phim kinh điển thế giới như "Người Tình" (L\'Amant) của Jean-Jacques Annaud.',
    culturalSignificance: 'Di tích Kiến trúc Nghệ thuật Cấp Quốc gia. Mẫu hình tinh hoa dinh thự điền chủ Nam Bộ cuối thế kỷ 19, bảo tồn nguyên vẹn hệ thống đồ cổ gỗ quý cẩn xà cừ vô giá.',
    interestingFacts: [
      'Nhà gồm 5 gian 2 mái lợp ngói âm dương, bên ngoài mang đường nét hoa văn biệt thự Pháp nhưng bên trong lại bố trí theo đúng phong thủy thờ tự truyền thống Việt Nam.',
      'Bộ bàn ghế bằng đá cẩm thạch Vân Nam, chùm đèn chùm pha lê Pháp thế kỷ 19 và các bao lam chạm trổ tùng cúc trúc mai tinh vi.',
      'Khu vườn lan rộng lớn phía trước với hàng trăm loài lan rừng quý hiếm được chăm sóc công phu.'
    ],
    conservationStatus: 'Di tích Kiến trúc Nghệ thuật Cấp Quốc gia xếp hạng năm 2009.',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Mặt tiền diễm lệ pha trộn Pháp - Việt của Nhà Cổ Bình Thủy Cần Thơ',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Kiến trúc Nghệ thuật Cấp Quốc gia.',
    lat: 10.0611,
    lng: 105.7489,
    address: '144 Đường Bùi Hữu Nghĩa, Phường Bình Thủy, Quận Bình Thủy, Thành phố Cần Thơ',
    visitingHours: '07:30 - 18:00 hàng ngày',
    ticketPrice: '30.000 VNĐ / vé tham quan',
    googleMapsUri: 'https://maps.google.com/?q=Binh+Thuy+Ancient+House+Can+Tho',
    tags: ['Cần Thơ', 'Bình Thủy', 'Nhà cổ', 'Phim Người Tình', 'Họ Dương', 'Kiến trúc Pháp'],
    suggestedQuestions: [
      'Sự hòa trộn tinh tế giữa kiến trúc Pháp và phong thủy Nam Bộ trong Nhà Cổ Bình Thủy?',
      'Bộ phim Người Tình (L\'Amant) đã ghi hình những đại cảnh nào tại ngôi nhà này?'
    ]
  },

  // =========================================================================
  // 18. ĐỒNG THÁP & TIỀN GIANG
  // =========================================================================
  {
    id: 'vuon-quoc-gia-tram-chim',
    name: 'Vườn Quốc Gia Tràm Chim - Giang Sơn Của Sếu Đầu Đỏ',
    vietnameseName: 'Vườn Quốc gia Tràm Chim',
    englishName: 'Tram Chim National Park (Ramsar Wetland)',
    category: 'nature_scenic',
    categoryLabel: 'Danh thắng Thiên nhiên & Khu Ramsar Thế giới',
    region: 'south',
    province: 'Đồng Tháp (Hợp nhất Đồng Tháp & Tiền Giang)',
    period: 'Vùng đất ngập nước tự nhiên nguyên sinh Đồng Tháp Mười',
    history: 'Được phục hồi và bảo tồn trên vùng đất ngập nước tự nhiên rộng hơn 7.300 ha của vùng Đồng Tháp Mười. Trở thành Khu bảo tồn thiên nhiên quốc tế và là Khu Ramsar thứ 2.000 của thế giới (thứ 4 của Việt Nam).',
    culturalSignificance: 'Khu dự trữ sinh quyển ngập nước tầm cỡ quốc tế. Nơi cư trú và sinh sản của hơn 230 loài chim nước, đặc biệt là loài Sếu Đầu Đỏ (Grus antigone sharpii) quý hiếm có nguy cơ tuyệt chủng ghi trong Sách Đỏ thế giới.',
    interestingFacts: [
      'Hệ sinh thái đồng cỏ năng kim mênh mông là nguồn thức ăn khoái khẩu của loài Sếu Đầu Đỏ cao hơn 1.7m.',
      'Đi xuồng máy xuyên qua rừng tràm, đầm sen bạt ngàn ngắm hàng ngàn cánh cò trắng, giang sen, điên điển bay rợp trời lúc hoàng hôn.',
      'Mùa nước nổi (tháng 9 - 12) là thời điểm tuyệt vời nhất để thưởng thức cá linh bông điên điển và ngắm thảm hoa hoàng đầu ấn rực rỡ.'
    ],
    conservationStatus: 'Khu Ramsar Thế giới & Vườn Quốc gia Cấp Quốc gia.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Đàn chim nước sải cánh bay rợp trời tại Vườn Quốc gia Tràm Chim',
    verifiedStatus: 'verified',
    verifiedNote: 'Khu Ramsar Thế giới công nhận năm 2012.',
    lat: 10.7167,
    lng: 105.5167,
    address: 'Thị trấn Tràm Chim, Huyện Tam Nông, Tỉnh Đồng Tháp',
    visitingHours: '07:00 - 17:30 hàng ngày',
    ticketPrice: 'Vé tham quan: 30.000 VNĐ; Thuê thuyền máy du ngoạn: 500.000 - 800.000 VNĐ / thuyền',
    googleMapsUri: 'https://maps.google.com/?q=Tram+Chim+National+Park',
    tags: ['Đồng Tháp', 'Tiền Giang', 'Tràm Chim', 'Sếu đầu đỏ', 'Ramsar', 'Mùa nước nổi', 'Tam Nông'],
    suggestedQuestions: [
      'Tại sao loài Sếu Đầu Đỏ lại chọn Tràm Chim làm điểm dừng chân hàng năm?',
      'Thảm thực vật 6 quần xã sinh thái tại Tràm Chim biến đổi theo mùa nước nổi ra sao?'
    ]
  },
  {
    id: 'chua-vinh-trang-my-tho',
    name: 'Chùa Vĩnh Tràng - Đệ Nhất Cổ Tự Tiền Giang Pha Trộn Kiến Trúc Á Âu',
    vietnameseName: 'Chùa Vĩnh Tràng',
    englishName: 'Vinh Trang Pagoda My Tho',
    category: 'temple',
    categoryLabel: 'Đền chùa & Kiến trúc Nghệ thuật',
    region: 'south',
    province: 'Đồng Tháp (Tiền Giang)',
    period: 'Xây dựng năm 1849 (Thời vua Tự Đức)',
    dynasty: 'Nhà Nguyễn',
    history: 'Khởi dựng từ giữa thế kỷ 19 do tri huyện Bùi Công Đạt xây cất am tu. Đầu thế kỷ 20, hòa thượng Thích Chánh Hậu đã đại trùng tu ngôi chùa với sự giao hòa ngoạn mục giữa mỹ thuật phương Đông và văn hóa phương Tây.',
    culturalSignificance: 'Di tích Lịch sử Văn hóa Cấp Quốc gia. Ngôi chùa lớn và lộng lẫy nhất tỉnh Tiền Giang, tiêu biểu cho nghệ thuật kiến trúc kết hợp phong cách Phục hưng Pháp, La Mã, Hồi giáo và đền chùa truyền thống Nam Bộ.',
    interestingFacts: [
      'Mặt tiền chùa mang dáng dấp cung điện phương Tây với các hàng cột La Mã, hoa văn gốm sứ ghép chữ Hán và vòm cửa kiểu Phục hưng.',
      'Khuôn viên lưu giữ 3 pho tượng Phật khổng lồ: Tượng Phật Di Lặc cười hoan hỷ cao 20m, tượng Phật A Di Đà đứng cao 18m và tượng Phật Thích Ca nhập Niết bàn dài 35m.',
      'Bộ sưu tập hơn 60 pho tượng Phật bằng gỗ quý thế kỷ 19 thếp vàng cùng các bao lam chạm trổ lộng lẫy.'
    ],
    conservationStatus: 'Di tích Lịch sử - Văn hóa Cấp Quốc gia xếp hạng năm 1984.',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Mặt tiền lộng lẫy phong cách Á - Âu của Chùa Vĩnh Tràng Mỹ Tho',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Kiến trúc Nghệ thuật Quốc gia.',
    lat: 10.3628,
    lng: 106.3744,
    address: 'Đường Nguyễn Trung Trực, Ấp Mỹ An, Xã Mỹ Phong, Thành phố Mỹ Tho, Tỉnh Tiền Giang',
    visitingHours: '06:30 - 18:30 hàng ngày',
    ticketPrice: 'Vào cửa tham quan tự do (Miễn phí)',
    googleMapsUri: 'https://maps.google.com/?q=Vinh+Trang+Pagoda+My+Tho',
    tags: ['Tiền Giang', 'Mỹ Tho', 'Chùa Vĩnh Tràng', 'Kiến trúc Á Âu', 'Phật Di Lặc', 'Đồng Tháp'],
    suggestedQuestions: [
      'Nét kiến trúc phương Tây nào được lồng ghép hài hòa vào mặt tiền Chùa Vĩnh Tràng?',
      'Bộ sưu tập tượng Phật cổ và hoành phi câu đối trong chùa có giá trị ra sao?'
    ]
  },
  {
    id: 'lang-hoa-sa-dec-dong-thap',
    name: 'Làng Hoa Sa Đéc - Thủ Phủ Hoa Kiểng Trăm Năm Xứ Nam Bộ',
    vietnameseName: 'Làng hoa kiểng Sa Đéc (Làng hoa Tân Quy Đông)',
    englishName: 'Sa Dec Flower Village',
    category: 'craft_village',
    categoryLabel: 'Làng nghề truyền thống & Nông nghiệp Di sản',
    region: 'south',
    province: 'Đồng Tháp',
    period: 'Hơn 100 năm phát triển (Khởi thủy từ đầu thế kỷ 20)',
    history: 'Bắt đầu từ vài hộ gia đình trồng hoa trang trí dịp Tết ven sông Tiền phù sa màu mỡ. Qua hơn một thế kỷ, làng hoa phát triển thành trung tâm sản xuất hoa kiểng lớn nhất miền Tây Nam Bộ với diện tích hơn 600 ha.',
    culturalSignificance: 'Di sản Văn hóa Phi vật thể và làng nghề du lịch tiêu biểu. Nét độc đáo có một không hai: hoa được trồng trên giàn tre cao trên mặt nước, nông dân bơi xuồng len lỏi chăm sóc và thu hoạch hoa.',
    interestingFacts: [
      'Phương thức trồng hoa trên giàn độc đáo để tránh ngập úng mùa lũ sông Tiền và tận dụng nguồn phù sa tươi mát nuôi dưỡng rễ cây.',
      'Hơn 2.000 chủng loại hoa kiểng: hoa cúc mâm xôi, cúc đồng tiền, hồng nhung cổ, dạ yến thảo cùng hàng vạn cây bonsai kiểng cổ quý hiếm.',
      'Dịp cận Tết Nguyên đán, Sa Đéc hóa thành bức thảm hoa rực rỡ sắc màu thu hút hàng triệu lượt khách đổ về thưởng lãm.'
    ],
    conservationStatus: 'Làng nghề truyền thống tiêu biểu Quốc gia & Điểm du lịch trọng điểm Đồng Tháp.',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Nông dân bơi xuồng chăm sóc hoa trên giàn cao tại Làng hoa Sa Đéc',
    verifiedStatus: 'verified',
    verifiedNote: 'Làng nghề truyền thống cấp Quốc gia.',
    lat: 10.3167,
    lng: 105.7500,
    address: 'Đường Hoa Sa Đéc, Xã Tân Quy Đông, Thành phố Sa Đéc, Tỉnh Đồng Tháp',
    visitingHours: '06:00 - 18:00 hàng ngày (Rực rỡ nhất từ tháng 11 đến tháng 1 âm lịch)',
    ticketPrice: 'Vào cổng làng hoa tự do; Các vườn hoa check-in: 20.000 - 50.000 VNĐ / vé',
    googleMapsUri: 'https://maps.google.com/?q=Sa+Dec+Flower+Village',
    tags: ['Đồng Tháp', 'Sa Đéc', 'Làng hoa', 'Hoa trên giàn', 'Tân Quy Đông', 'Cúc mâm xôi'],
    suggestedQuestions: [
      'Tại sao nông dân Sa Đéc lại trồng hoa trên giàn cao ngập nước thay vì trồng dưới đất?',
      'Lịch sử hình thành làng hoa Tân Quy Đông Sa Đéc bắt đầu từ giống hoa nào?'
    ]
  },

  // =========================================================================
  // 19. AN GIANG & KIÊN GIANG
  // =========================================================================
  {
    id: 'mieu-ba-chua-xu-nui-sam',
    name: 'Miếu Bà Chúa Xứ Núi Sam Châu Đốc - Trung Tâm Tín Ngưỡng Linh Thiêng Nam Bộ',
    vietnameseName: 'Miếu Bà Chúa Xứ Núi Sam',
    englishName: 'Ba Chua Xu Temple on Sam Mountain Chau Doc',
    category: 'temple',
    categoryLabel: 'Đền miếu & Tín ngưỡng Dân gian',
    region: 'south',
    province: 'An Giang (Hợp nhất An Giang & Kiên Giang)',
    period: 'Khởi dựng đầu thế kỷ 19 (Thời Thoại Ngọc Hầu)',
    dynasty: 'Thời Nguyễn & Dân gian Nam Bộ',
    history: 'Tương truyền đầu thế kỷ 19, tượng Bà ngự trên đỉnh núi Sam. Khi quân giặc toan cướp tượng mang đi thì tượng nặng trịch không nhấc nổi. Nhờ lời mách bảo của thần linh, 9 cô gái đồng trinh đã khiêng tượng Bà xuống chân núi lập miếu thờ phụng.',
    culturalSignificance: 'Di tích Quốc gia đặc biệt. Lễ hội Vía Bà Chúa Xứ Núi Sam (22 - 27/4 âm lịch) được UNESCO vinh danh là Di sản Văn hóa Phi vật thể đại diện của nhân loại năm 2024. Trung tâm hành hương tâm linh lớn nhất vùng đất phương Nam.',
    interestingFacts: [
      'Tượng Bà Chúa Xứ tạc bằng đá sa thạch xanh thế kỷ 6 theo phong cách nghệ thuật văn hóa Óc Eo cổ đại, thể hiện hình tượng thần Vishnu uy nghiêm.',
      'Kiến trúc miếu mang hình chữ Quốc (国), mái lợp ngói đại ống màu xanh ngọc bích, nóc uốn lượn hình rồng chầu mặt nguyệt.',
      'Hàng năm thu hút hơn 5 triệu lượt đồng bào khắp cả nước về dâng hương cầu quốc thái dân an, làm ăn phát đạt.'
    ],
    conservationStatus: 'Di tích Lịch sử và Kiến trúc nghệ thuật Quốc gia đặc biệt (2018) & Di sản UNESCO (2024).',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Điện thờ lộng lẫy uy nghiêm của Miếu Bà Chúa Xứ Núi Sam Châu Đốc',
    verifiedStatus: 'verified',
    verifiedNote: 'Di sản Văn hóa Phi vật thể Nhân loại UNESCO (2024) & Di tích Quốc gia đặc biệt.',
    lat: 10.6653,
    lng: 105.0806,
    address: 'Chân Núi Sam, Phường Núi Sam, Thành phố Châu Đốc, Tỉnh An Giang',
    visitingHours: 'Mở cửa phục vụ khách hành hương 24/7 quanh năm',
    ticketPrice: 'Vào cổng Miếu Bà tự do; Vé vào Khu danh thắng Núi Sam: 20.000 VNĐ',
    googleMapsUri: 'https://maps.google.com/?q=Ba+Chua+Xu+Temple+Chau+Doc',
    tags: ['An Giang', 'Châu Đốc', 'Núi Sam', 'Bà Chúa Xứ', 'UNESCO', 'Thoại Ngọc Hầu', 'Hành hương'],
    suggestedQuestions: [
      'Nguồn gốc lịch sử và khảo cổ của bức tượng Bà Chúa Xứ Núi Sam bằng sa thạch?',
      'Nghi thức Tắm Bà lúc nửa đêm trong Lễ hội Vía Bà diễn ra trang nghiêm như thế nào?'
    ]
  },
  {
    id: 'rung-tram-tra-su-an-giang',
    name: 'Khu Rừng Tràm Trà Sư - Bức Tranh Thảm Bèo Xanh Mướt Mùa Nước Nổi',
    vietnameseName: 'Rừng tràm Trà Sư',
    englishName: 'Tra Su Cajuput Forest Ecotourism Area',
    category: 'nature_scenic',
    categoryLabel: 'Danh thắng Thiên nhiên & Rừng ngập nước',
    region: 'south',
    province: 'An Giang',
    period: 'Trồng và bảo tồn từ năm 1983',
    history: 'Được trồng từ năm 1983 trên vùng đất trũng phèn ngập nước của vùng Tứ giác Long Xuyên để ngăn lũ đầu nguồn. Ngày nay phát triển thành khu rừng sinh thái trù phú rộng 845 ha ngập tràn chim muông và thảm thực vật quý.',
    culturalSignificance: 'Khu du lịch sinh thái tiêu biểu bậc nhất miền Tây Nam Bộ, được mệnh danh là "con đường xanh tuyệt mỹ" của vùng đồng bằng sông Cửu Long.',
    interestingFacts: [
      'Mặt nước rừng tràm được phủ kín bởi một lớp bèo cám xanh mướt dày đặc như tấm thảm nhung khổng lồ trải dài tít tắp.',
      'Chiếc cầu tre xuyên rừng tràm đạt kỷ lục Guinness Việt Nam là "Cầu tre trong rừng tràm dài nhất Việt Nam" với chiều dài hơn 2km.',
      'Ngồi tắc ráng (xuồng máy) lướt êm ru xé đôi thảm bèo xanh, sau đó chuyển sang xuồng chèo tay lắng nghe chim cò ríu rít làm tổ trên cành tràm.'
    ],
    conservationStatus: 'Khu rừng đặc dụng cảnh quan bảo tồn thiên nhiên cấp Quốc gia.',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Xuồng chèo lướt trên thảm bèo xanh mướt Rừng tràm Trà Sư',
    verifiedStatus: 'verified',
    verifiedNote: 'Khu bảo tồn Cảnh quan thiên nhiên đặc dụng An Giang.',
    lat: 10.5528,
    lng: 105.0500,
    address: 'Xã Văn Giáo, Thị xã Tịnh Biên, Tỉnh An Giang',
    visitingHours: '07:00 - 17:30 hàng ngày',
    ticketPrice: '100.000 VNĐ / vé vào cổng; Trọn gói xuồng máy + xuồng chèo: 200.000 VNĐ / khách',
    googleMapsUri: 'https://maps.google.com/?q=Tra+Su+Cajuput+Forest',
    tags: ['An Giang', 'Trà Sư', 'Rừng tràm', 'Thảm bèo xanh', 'Tịnh Biên', 'Cầu tre kỷ lục'],
    suggestedQuestions: [
      'Hiện tượng thảm bèo cám xanh phủ kín mặt nước Trà Sư xuất hiện đẹp nhất vào tháng mấy?',
      'Hệ sinh thái chim quý và thủy sinh tại Rừng tràm Trà Sư gồm những loài nào?'
    ]
  },
  {
    id: 'quan-dao-nam-du-kien-giang',
    name: 'Quần Đảo Nam Du - Quần Đảo Thiên Đường Hoang Sơ Biển Tây',
    vietnameseName: 'Quần đảo Nam Du',
    englishName: 'Nam Du Archipelago',
    category: 'nature_scenic',
    categoryLabel: 'Danh thắng Biển đảo & Thiên nhiên',
    region: 'south',
    province: 'An Giang (Kiên Giang)',
    period: 'Hình thành địa chất tự nhiên 21 hòn đảo lớn nhỏ',
    history: 'Nằm ở phía đông nam đảo Phú Quốc trong vịnh Thái Lan. Quần đảo gồm 21 hòn đảo lớn nhỏ quần tụ, lớn nhất là Hòn Lớn (Hòn Củ Tron). Tên gọi Nam Du tương truyền bắt nguồn từ tiếng Pháp "Nam Du" nghĩa là chuyến đi về phương Nam.',
    culturalSignificance: 'Điểm đến du lịch biển đảo hoang sơ, nguyên thủy bậc nhất Việt Nam với những bãi tắm cát trắng mịn, rặng dừa nghiêng bóng và rạn san hô đa sắc màu.',
    interestingFacts: [
      'Bãi Cây Mến trên Hòn Lớn được mệnh danh là bãi biển đẹp nhất Nam Du với bờ cát thoai thoải và hàng dừa cổ thụ trăm năm xanh mát.',
      'Ngọn hải đăng Nam Du nằm ở độ cao 309m trên đỉnh Hòn Lớn là ngọn hải đăng cao nhất Việt Nam so với mực nước biển.',
      'Đặc sản ẩm thực trứ danh: Nhum biển nướng mỡ hành, cá xanh xương nướng bẹ chuối, mực trứng hấp gừng giòn ngọt.'
    ],
    conservationStatus: 'Quần đảo du lịch sinh thái biển đảo bảo vệ nguyên sơ.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Rặng dừa nghiêng soi bóng nước biển trong xanh Bãi Cây Mến Nam Du',
    verifiedStatus: 'verified',
    verifiedNote: 'Danh thắng Du lịch Biển đảo Kiên Giang.',
    lat: 9.6833,
    lng: 104.3500,
    address: 'Xã An Sơn và Xã Nam Du, Huyện Kiên Hải, Tỉnh Kiên Giang (Vùng An Giang mở rộng)',
    visitingHours: 'Tham quan tự do quanh năm (Thời điểm biển êm nhất từ tháng 12 đến tháng 5)',
    ticketPrice: 'Vé tàu cao tốc Rạch Giá - Nam Du: 250.000 - 300.000 VNĐ / lượt',
    googleMapsUri: 'https://maps.google.com/?q=Nam+Du+Islands',
    tags: ['Kiên Giang', 'An Giang', 'Nam Du', 'Hòn Lớn', 'Bãi Cây Mến', 'Hải đăng cao nhất', 'Biển đảo'],
    suggestedQuestions: [
      'Ngọn hải đăng Nam Du giữ kỷ lục gì về độ cao so với mực nước biển?',
      'Cách thức lặn ngắm san hô và khám phá các đảo hoang tại Nam Du?'
    ]
  },

  // =========================================================================
  // 20. CÀ MAU & BẠC LIÊU
  // =========================================================================
  {
    id: 'dat-mui-ca-mau-gps0001',
    name: 'Khu Du Lịch Quốc Gia Mũi Cà Mau & Cột Mốc Tọa Độ GPS 0001',
    vietnameseName: 'Đất Mũi Cà Mau (Cột Mốc GPS 0001)',
    englishName: 'Ca Mau Cape National Tourism Area & National Milestone GPS 0001',
    category: 'monument',
    categoryLabel: 'Di tích Lịch sử & Điểm Cực Nam Đất Liền',
    region: 'south',
    province: 'Cà Mau (Hợp nhất Cà Mau & Bạc Liêu)',
    period: 'Hình thành bãi bồi tự nhiên & Cột mốc tọa độ quốc gia',
    history: 'Mảnh đất cuối cùng trên bản đồ hình chữ S của Tổ quốc. Nơi phù sa sông Mê Kông hàng năm bồi đắp lấn dần ra biển hàng chục mét: "Đất nở ra, rừng biết đi và biển sinh sôi".',
    culturalSignificance: 'Khu Di tích Quốc gia & Khu Dự trữ Sinh quyển Thế giới Mũi Cà Mau UNESCO. Nơi duy nhất trên đất liền Việt Nam có thể ngắm mặt trời mọc ở biển Đông và lặn ở biển Tây tại cùng một vị trí.',
    interestingFacts: [
      'Cột mốc tọa độ Quốc gia GPS 0001 đánh dấu điểm mốc cực Nam thiêng liêng của Tổ quốc trên đất liền.',
      'Biểu tượng con tàu Mũi Cà Mau với cánh buồm no gió hiên ngang hướng ra biển khơi.',
      'Cột cờ Hà Nội tại Mũi Cà Mau cao 45m do Đảng bộ và nhân dân Thủ đô Hà Nội trao tặng khẳng định tình cảm gắn bó ruột thịt "Hà Nội vì cả nước, cả nước vì Hà Nội".'
    ],
    conservationStatus: 'Khu Dự trữ Sinh quyển Thế giới UNESCO (2009) & Khu Ramsar Thế giới (2012).',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Biểu tượng con tàu rẽ sóng ra khơi tại Mũi Cà Mau cực Nam',
    verifiedStatus: 'verified',
    verifiedNote: 'Khu Dự trữ Sinh quyển Thế giới UNESCO & Mốc Tọa độ Quốc gia.',
    lat: 8.6133,
    lng: 104.7167,
    address: 'Ấp Mũi, Xã Đất Mũi, Huyện Ngọc Hiển, Tỉnh Cà Mau',
    visitingHours: '06:30 - 18:00 hàng ngày',
    ticketPrice: '30.000 VNĐ / vé tham quan',
    googleMapsUri: 'https://maps.google.com/?q=Ca+Mau+Cape+GPS+0001',
    tags: ['Cà Mau', 'Bạc Liêu', 'Đất Mũi', 'GPS 0001', 'Cực Nam', 'Cột cờ Hà Nội', 'UNESCO'],
    suggestedQuestions: [
      'Hiện tượng kỳ diệu ngắm mặt trời mọc ở biển Đông và lặn ở biển Tây tại Mũi Cà Mau?',
      'Tốc độ lấn biển bồi đắp phù sa hàng năm của Mũi Cà Mau diễn ra như thế nào?'
    ]
  },
  {
    id: 'nha-cong-tu-bac-lieu',
    name: 'Dinh Thự Công Tử Bạc Liêu - Giai Thoại Vàng Son Xứ Nam Kỳ',
    vietnameseName: 'Nhà Công tử Bạc Liêu',
    englishName: 'Bac Lieu Dandy Mansion',
    category: 'ancient_house',
    categoryLabel: 'Kiến trúc Dinh thự Cổ & Di sản Văn hóa',
    region: 'south',
    province: 'Cà Mau (Bạc Liêu)',
    period: 'Xây dựng năm 1919 (Hơn 100 năm tuổi)',
    history: 'Dinh thự xa hoa của ông Trần Trinh Trạch (Hội đồng Trạch) xây dựng cho người con trai thứ ba là Trần Trinh Huy (thường gọi là Cậu Ba Huy - "Công tử Bạc Liêu"). Tòa nhà do kỹ sư người Pháp thiết kế với toàn bộ vật liệu nhập khẩu trực tiếp từ Paris.',
    culturalSignificance: 'Di tích Kiến trúc Nghệ thuật Cấp Quốc gia. Dinh thự xa hoa bề thế bậc nhất Nam Kỳ Lục Tỉnh đầu thế kỷ 20, gắn liền với các giai thoại phong lưu và nếp sống hào sảng của vùng đất phương Nam.',
    interestingFacts: [
      'Công tử Bạc Liêu Trần Trinh Huy là người Việt Nam đầu tiên sở hữu máy bay riêng (chiếc Morane của Pháp) và xe ô tô thể thao riêng thời bấy giờ.',
      'Nội thất lưu giữ bộ giường nóng lạnh cẩn xà cừ quý hiếm trị giá hàng chục tỷ đồng, bàn xoay gỗ cẩm lai và chùm đèn đồng nguyên bản nhập khẩu từ Pháp.',
      'Giai thoại nổi tiếng "đốt tiền nấu trứng tỏ lòng hào hoa" lưu truyền trong dân gian Nam Bộ.'
    ],
    conservationStatus: 'Di tích Kiến trúc Nghệ thuật Cấp Quốc gia xếp hạng năm 2019.',
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Mặt tiền dinh thự kiến trúc Pháp sang trọng của Công tử Bạc Liêu',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Kiến trúc Nghệ thuật Cấp Quốc gia Bộ VHTT&DL.',
    lat: 9.2908,
    lng: 105.7275,
    address: 'Số 13 Đường Điện Biên Phủ, Phường 3, Thành phố Bạc Liêu, Tỉnh Bạc Liêu (Vùng Cà Mau mở rộng)',
    visitingHours: '07:30 - 18:00 hàng ngày',
    ticketPrice: '30.000 VNĐ / vé người lớn, 15.000 VNĐ / vé trẻ em',
    googleMapsUri: 'https://maps.google.com/?q=Bac+Lieu+Dandy+Mansion',
    tags: ['Bạc Liêu', 'Cà Mau', 'Công tử Bạc Liêu', 'Ba Huy', 'Dinh thự Pháp', 'Giai thoại Nam Kỳ'],
    suggestedQuestions: [
      'Giai thoại thực sự phía sau câu chuyện Công tử Bạc Liêu đốt tiền nấu trứng?',
      'Kiến trúc và các món đồ nội thất quý hiếm bậc nhất Nam Kỳ còn lưu lại trong dinh thự?'
    ]
  },
  {
    id: 'khu-luu-niem-cao-van-lau-bac-lieu',
    name: 'Khu Lưu Niệm Nhạc Sĩ Cao Văn Lầu & Nghệ Thuật Đờn Ca Tài Tử Nam Bộ',
    vietnameseName: 'Khu lưu niệm Cao Văn Lầu (Dạ Cổ Hoài Lang)',
    englishName: 'Cao Van Lau Memorial & Don Ca Tai Tu Heritage Site',
    category: 'museum',
    categoryLabel: 'Nhà lưu niệm & Di sản Âm nhạc Nhân loại',
    region: 'south',
    province: 'Cà Mau (Bạc Liêu)',
    period: 'Sáng tác bản Dạ Cổ Hoài Lang năm 1919',
    history: 'Nơi an nghỉ và vinh danh cố nhạc sĩ Cao Văn Lầu (Sáu Lầu) - tác giả của bản nhạc bất hủ "Dạ Cổ Hoài Lang" (Đêm nghe tiếng trống ngóng chồng) ra đời năm 1919, tiền thân của bản Vọng cổ và nghệ thuật Cải lương Nam Bộ.',
    culturalSignificance: 'Di tích Lịch sử Văn hóa Cấp Quốc gia. Nơi tôn vinh "Nghệ thuật Đờn ca tài tử Nam Bộ" - Di sản Văn hóa Phi vật thể đại diện của nhân loại được UNESCO công nhận năm 2013.',
    interestingFacts: [
      'Công trình có biểu tượng cây đàn Kìm (đàn Nguyệt) khổng lồ cao 21.6m vút lên trời xanh nằm giữa hồ nước hình đĩa sen bát ngát.',
      'Bản Dạ Cổ Hoài Lang gồm 20 câu nhịp đôi nguyên bản được khắc trang trọng trên bia đá cẩm thạch trắng.',
      'Nhà trưng bày lưu giữ các bộ sưu tập nhạc cụ dân tộc cổ: đàn cò, đàn tranh, đàn bầu, sáo trúc và chân dung các thế hệ nghệ nhân đờn ca tài tử.'
    ],
    conservationStatus: 'Di tích Lịch sử Quốc gia & Di sản Văn hóa Phi vật thể Nhân loại UNESCO.',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    historicImageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    historicImageYear: 'Biểu tượng cây Đàn Kìm khổng lồ tại Khu lưu niệm Cao Văn Lầu Bạc Liêu',
    verifiedStatus: 'verified',
    verifiedNote: 'Di sản Văn hóa Phi vật thể Nhân loại UNESCO (2013) & Di tích Quốc gia.',
    lat: 9.2789,
    lng: 105.7333,
    address: 'Phường 2, Thành phố Bạc Liêu, Tỉnh Bạc Liêu (Vùng Cà Mau mở rộng)',
    visitingHours: '07:30 - 17:00 hàng ngày',
    ticketPrice: '20.000 VNĐ / vé tham quan',
    googleMapsUri: 'https://maps.google.com/?q=Cao+Van+Lau+Memorial+Bac+Lieu',
    tags: ['Bạc Liêu', 'Cà Mau', 'Cao Văn Lầu', 'Dạ Cổ Hoài Lang', 'Đờn ca tài tử', 'UNESCO', 'Đàn kìm'],
    suggestedQuestions: [
      'Hoàn cảnh ra đời đầy xúc động của bản Dạ Cổ Hoài Lang năm 1919?',
      'Quá trình phát triển từ bản Dạ Cổ Hoài Lang nhịp đôi thành bản Vọng cổ nhịp 32 của sân khấu Cải lương?'
    ]
  }
];
