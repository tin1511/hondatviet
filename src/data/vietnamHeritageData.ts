import { 
  HeritageItem, 
  PlaceItem, 
  TraditionalCraftVillage, 
  TraditionalArtItem, 
  QuizTopic, 
  TimelineMilestone, 
  PastAndPresentItem,
  FamilyStoryMemory
} from '../types';

export const HERITAGE_DATABASE: HeritageItem[] = [
  {
    id: 'dai-noi-hue',
    name: 'Đại Nội Huế (Hoàng Thành & Tử Cấm Thành)',
    vietnameseName: 'Quần thể Di tích Cố đô Huế',
    englishName: 'Hue Imperial Citadel',
    category: 'palace',
    categoryLabel: 'Cung điện & Hoàng thành',
    region: 'central',
    province: 'Thừa Thiên Huế',
    period: 'Triều Nguyễn (1802 - 1945)',
    dynasty: 'Nhà Nguyễn',
    history: 'Được khởi công xây dựng từ năm 1804 dưới thời vua Gia Long và hoàn thành vào năm 1833 dưới triều vua Minh Mạng. Đại Nội là trung tâm hành chính và nơi sinh hoạt hoàng gia của 13 vị vua triều Nguyễn suốt 143 năm.',
    culturalSignificance: 'Di sản Văn hóa Thế giới được UNESCO công nhận năm 1993. Là biểu tượng kiến trúc cung đình đỉnh cao của Việt Nam, kết hợp hài hòa giữa triết lý phong thủy phương Đông và kiến trúc quân sự phương Tây Vauban.',
    interestingFacts: [
      'Ngọ Môn có 5 cửa, cửa chính giữa chỉ dành riêng cho Hoàng đế đi lại.',
      'Toàn bộ kinh thành có hệ thống sông Ngự Hà và hào nước bảo vệ tự nhiên kết nối sông Hương.',
      'Điện Thái Hòa là nơi cử hành các đại lễ trọng đại như đăng quang, sinh nhật vua và đón tiếp sứ thần.'
    ],
    conservationStatus: 'Được bảo tồn và phục hồi quy mô lớn bởi Trung tâm Bảo tồn Di tích Cố đô Huế và các đối tác quốc tế.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Meridian_Gate%2C_Hue_%28I%29.jpg',
    historicImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Annam_-_Hu%C3%A9_-_Porte_d%27entr%C3%A9e_du_Palais_Royal.jpg',
    historicImageYear: 'Ảnh tư liệu Cổng Ngọ Môn Cung Đình Huế (Đầu thế kỷ 20)',
    aiReconstructionNote: '',
    verifiedStatus: 'verified',
    verifiedNote: 'Tư liệu lịch sử được chứng thực bởi UNESCO và Viện Sử học Việt Nam.',
    lat: 16.4697,
    lng: 107.5796,
    address: 'Đường 23/8, Phường Thuận Hòa, Thành phố Huế, Tỉnh Thừa Thiên Huế',
    visitingHours: '07:30 - 17:30 hàng ngày',
    ticketPrice: '200.000 VNĐ / người lớn, 40.000 VNĐ / trẻ em',
    googleMapsUri: 'https://maps.google.com/?q=Imperial+City+Hue',
    tags: ['Cố đô', 'Triều Nguyễn', 'UNESCO', 'Hoàng thành', 'Kiến trúc gỗ'],
    suggestedQuestions: [
      'Vì sao Ngọ Môn có 5 cửa nhưng vua chỉ đi cửa giữa?',
      'Điện Thái Hòa có ý nghĩa văn hóa gì trong lịch sử triều Nguyễn?',
      'Kinh thành Huế được xây dựng theo phong thủy như thế nào?'
    ]
  },
  {
    id: 'van-mieu-quoc-tu-giam',
    name: 'Văn Miếu - Quốc Tử Giám Hà Nội',
    vietnameseName: 'Văn Miếu - Quốc Tử Giám',
    englishName: 'Temple of Literature & First National University',
    category: 'monument',
    categoryLabel: 'Di tích Lịch sử & Giáo dục',
    region: 'north',
    province: 'Hà Nội',
    period: 'Thời Lý - Trần - Lê (Từ năm 1070)',
    dynasty: 'Nhà Lý',
    history: 'Xây dựng năm 1070 dưới thời vua Lý Thánh Tông để thờ Khổng Tử và các bậc hiền triết. Năm 1076, vua Lý Nhân Tông cho lập Quốc Tử Giám kề bên, trở thành trường đại học đầu tiên của Việt Nam.',
    culturalSignificance: 'Nơi lưu giữ 82 Bia Tiến sĩ được UNESCO ghi danh là Di sản tư liệu thế giới. Biểu tượng cho truyền thống hiếu học, tôn sư trọng đạo và tinh thần trọng dụng nhân tài của dân tộc Việt Nam.',
    interestingFacts: [
      '82 tấm bia tiến sĩ đặt trên lưng rùa đá khắc tên 1.304 vị đỗ đại khoa qua 82 khoa thi (1442 - 1779).',
      'Khuê Văn Các được chọn làm biểu tượng chính thức của Thủ đô Hà Nội.',
      'Chu Văn An - người thầy mẫu mực muôn đời của Việt Nam từng giữ chức Tư nghiệp Quốc Tử Giám.'
    ],
    conservationStatus: 'Di tích Quốc gia đặc biệt được giữ gìn nguyên vẹn qua nhiều thế kỷ.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Hanoi_Temple_of_Literature.jpg',
    historicImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Constellation_of_Literature_pavilion_%28Temple_of_Literature%2C_Hanoi%29.jpg',
    historicImageYear: 'Ảnh tư liệu Khuê Văn Các - Gác Sao Khuê',
    verifiedStatus: 'verified',
    verifiedNote: 'Hồ sơ Di sản tư liệu UNESCO và Tư liệu Viện Nghiên cứu Hán Nôm.',
    lat: 21.0287,
    lng: 105.8355,
    address: '58 Phố Quốc Tử Giám, Phường Văn Miếu, Quận Đống Đa, Hà Nội',
    visitingHours: '08:00 - 17:00 hàng ngày',
    ticketPrice: '70.000 VNĐ / vé thường, 35.000 VNĐ / học sinh sinh viên',
    googleMapsUri: 'https://maps.google.com/?q=Van+Mieu+Quoc+Tu+Giam+Hanoi',
    tags: ['Hà Nội', 'Đại học đầu tiên', 'Bia Tiến sĩ', 'UNESCO', 'Hiếu học'],
    suggestedQuestions: [
      'Tại sao rùa đá lại được chọn để đội bia tiến sĩ?',
      'Khuê Văn Các mang ý nghĩa thiên văn và giáo dục như thế nào?',
      'Thầy Chu Văn An đã có những đóng góp gì cho nền giáo dục nước nhà?'
    ]
  },
  {
    id: 'pho-co-hoi-an',
    name: 'Đô thị Cổ Hội An (Phố Cổ Hội An)',
    vietnameseName: 'Phố cổ Hội An',
    englishName: 'Hoi An Ancient Town',
    category: 'ancient_house',
    categoryLabel: 'Di sản Đô thị Cổ',
    region: 'central',
    province: 'Quảng Nam',
    period: 'Thế kỷ 15 - 19',
    dynasty: 'Thời Chúa Nguyễn & Triều Nguyễn',
    history: 'Từng là thương cảng quốc tế sầm uất bậc nhất Đông Nam Á từ thế kỷ 16 đến 19, nơi giao thương nhộn nhịp giữa thương nhân Việt Nam, Nhật Bản, Trung Hoa, Bồ Đào Nha, Hà Lan.',
    culturalSignificance: 'UNESCO công nhận Di sản Văn hóa Thế giới năm 1999. Là mẫu hình tiêu biểu về một cảng thị truyền thống châu Á được bảo tồn gần như nguyên vẹn với hơn 1.000 ngôi nhà cổ, hội quán và Chùa Cầu.',
    interestingFacts: [
      'Chùa Cầu (Lai Viễn Kiều) do các thương gia Nhật Bản xây dựng vào khoảng thế kỷ 17.',
      'Các ngôi nhà cổ Hội An có cấu trúc hình ống thông suốt từ phố trước ra bờ sông Hoài để tiện bốc dỡ hàng hóa.',
      'Vào đêm 14 âm lịch hàng tháng, cả phố cổ tắt đèn điện và thắp sáng bằng đèn lồng lung linh.'
    ],
    conservationStatus: 'Khu bảo tồn đặc biệt với quy chế kiểm soát nghiêm ngặt kiến trúc và không gian sinh hoạt.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/PhoCoHoiAn.jpg',
    historicImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Cau_Nhat_Ban.jpg',
    historicImageYear: 'Chùa Cầu (Lai Viễn Kiều) - Di tích biểu tượng hơn 400 năm tuổi',
    verifiedStatus: 'verified',
    verifiedNote: 'Chứng nhận Di sản Văn hóa Thế giới UNESCO số 948.',
    lat: 15.8801,
    lng: 108.3380,
    address: 'Phường Minh An, Thành phố Hội An, Tỉnh Quảng Nam',
    visitingHours: 'Mở cửa tự do (Vé tham quan các di tích trong tuyến: 120.000 VNĐ)',
    ticketPrice: '120.000 VNĐ / khách',
    googleMapsUri: 'https://maps.google.com/?q=Hoi+An+Ancient+Town',
    tags: ['Thương cảng', 'Chùa Cầu', 'Nhà cổ', 'UNESCO', 'Đèn lồng'],
    suggestedQuestions: [
      'Chùa Cầu có mối liên hệ gì với truyền thuyết thủy quái Mamazu của Nhật Bản?',
      'Kiến trúc nhà cổ Hội An thích nghi với mùa lũ lụt sông Hoài như thế nào?',
      'Vì sao thương cảng Hội An dần nhường vị thế cho cảng Đà Nẵng vào cuối thế kỷ 19?'
    ]
  },
  {
    id: 'trang-an-ninh-binh',
    name: 'Quần thể Danh thắng Tràng An & Cố đô Hoa Lư',
    vietnameseName: 'Quần thể Danh thắng Tràng An',
    englishName: 'Trang An Landscape Complex',
    category: 'monument',
    categoryLabel: 'Di sản Hỗn hợp Thiên nhiên & Văn hóa',
    region: 'north',
    province: 'Ninh Bình',
    period: 'Thế kỷ 10 đến nay (Thời Đinh - Tiền Lê)',
    dynasty: 'Nhà Đinh, Tiền Lê, Lý',
    history: 'Khu vực gắn liền với kinh đô Hoa Lư được vua Đinh Tiên Hoàng chọn làm nơi định đô năm 968 sau khi dẹp loạn 12 sứ quân, mở ra kỷ nguyên độc lập tự chủ lâu dài của dân tộc.',
    culturalSignificance: 'Di sản hỗn hợp thế giới (Văn hóa & Thiên nhiên) đầu tiên và duy nhất ở Đông Nam Á được UNESCO công nhận năm 2014.',
    interestingFacts: [
      'Hệ thống hang động xuyên thủy kỳ ảo với các di chỉ khảo cổ chứng minh người tiền sử sinh sống cách đây hơn 30.000 năm.',
      'Địa thế núi non hiểm trở đã từng là thành lũy tự nhiên bất khả xâm phạm bảo vệ kinh đô Hoa Lư.'
    ],
    conservationStatus: 'Khu Di sản Thế giới được quy hoạch và quản lý bền vững nghiêm ngặt.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Muaxuantamcoc.jpg',
    historicImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Lehoidendinh.jpg',
    historicImageYear: 'Lễ hội Đền Vua Đinh Cố đô Hoa Lư',
    verifiedStatus: 'verified',
    verifiedNote: 'UNESCO World Heritage Mixed Site Dossier #1438.',
    lat: 20.2536,
    lng: 105.9038,
    address: 'Xã Ninh Xuân, Huyện Hoa Lư, Tỉnh Ninh Bình',
    visitingHours: '07:00 - 17:00 hàng ngày',
    ticketPrice: '250.000 VNĐ / người lớn (vé thuyền du lịch)',
    googleMapsUri: 'https://maps.google.com/?q=Trang+An+Ninh+Binh',
    tags: ['Ninh Bình', 'Hoa Lư', 'UNESCO', 'Hang động', 'Thuyền nan'],
    suggestedQuestions: [
      'Vì sao Đinh Tiên Hoàng chọn Hoa Lư làm kinh đô thay vì Đại La?',
      'Di chỉ khảo cổ người tiền sử tại Tràng An có ý nghĩa gì đối với lịch sử nhân loại?'
    ]
  },
  {
    id: 'chua-thien-mu',
    name: 'Chùa Thiên Mụ (Linh Mụ Tự)',
    vietnameseName: 'Chùa Thiên Mụ',
    englishName: 'Thien Mu Pagoda',
    category: 'temple',
    categoryLabel: 'Chùa & Phật giáo',
    region: 'central',
    province: 'Thừa Thiên Huế',
    period: 'Khởi dựng năm 1601',
    dynasty: 'Thời Chúa Nguyễn Hoàng',
    history: 'Được dựng vào năm 1601 bởi Đoan Quận công Nguyễn Hoàng – vị chúa Nguyễn đầu tiên ở Đàng Trong, sau khi nghe người dân địa phương kể về một bà tiên áo đỏ báo mộng.',
    culturalSignificance: 'Ngôi cổ tự danh tiếng nhất đất Cố đô, tọa lạc trên đồi Hà Khê soi bóng xuống dòng sông Hương thơ mộng, là biểu tượng tâm linh và văn hóa sâu sắc của xứ Huế.',
    interestingFacts: [
      'Tháp Phước Duyên hình bát giác 7 tầng cao 21m được vua Thiệu Trị cho xây năm 1844.',
      'Chuông Đại Hồng Chung đúc năm 1710 thời chúa Nguyễn Phúc Chu nặng hơn 2 tấn, tiếng ngân vang xa hàng chục dặm.'
    ],
    conservationStatus: 'Di tích được bảo tồn tốt, nơi tu học của chư tăng và điểm hành hương du lịch trọng điểm.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/ThienMuPagoda.jpg/1280px-ThienMuPagoda.jpg',
    historicImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/ThienMuPagoda.jpg/1280px-ThienMuPagoda.jpg',
    historicImageYear: 'Tháp Phước Duyên 7 tầng soi bóng sông Hương',
    verifiedStatus: 'folk_legend',
    verifiedNote: 'Lịch sử xây dựng chùa có thật (năm 1601), sự tích Bà Tiên áo đỏ là truyền thuyết dân gian khởi nguồn tên gọi.',
    lat: 16.4532,
    lng: 107.5451,
    address: 'Đường Nguyễn Phúc Nguyên, Phường Hương Long, Thành phố Huế',
    visitingHours: '06:00 - 18:00 hàng ngày',
    ticketPrice: 'Miễn phí tham quan',
    googleMapsUri: 'https://maps.google.com/?q=Thien+Mu+Pagoda+Hue',
    tags: ['Huế', 'Chùa cổ', 'Tháp Phước Duyên', 'Sông Hương', 'Chúa Nguyễn'],
    suggestedQuestions: [
      'Truyền thuyết Thiên Mụ giáng trần đã mở màn cho sự định đô của chúa Nguyễn thế nào?',
      'Tháp Phước Duyên 7 tầng tượng trưng cho điều gì trong giáo lý Phật giáo?'
    ]
  },
  {
    id: 'dinh-doc-lap',
    name: 'Dinh Độc Lập (Hội trường Thống Nhất)',
    vietnameseName: 'Dinh Độc Lập',
    englishName: 'Independence Palace',
    category: 'architecture',
    categoryLabel: 'Công trình Kiến trúc Lịch sử',
    region: 'south',
    province: 'TP. Hồ Chí Minh',
    period: '1962 - 1966 (Khánh thành 1966)',
    dynasty: 'Thời kỳ Hiện đại',
    history: 'Được thiết kế bởi Kiến trúc sư tài hoa Ngô Viết Thụ (người Việt Nam duy nhất đạt giải Khôi nguyên La Mã). Là chứng nhân lịch sử của ngày 30/4/1975 non sông thống nhất trọn vẹn.',
    culturalSignificance: 'Di tích Quốc gia Đặc biệt. Kiệt tác kiến trúc kết hợp tinh hoa hiện đại thế giới và triết lý phương Đông sâu sắc (chiết tự Hán: Cát, Khẩu, Trung, Tam, Chủ).',
    interestingFacts: [
      'Mặt tiền dinh mô phỏng bức rèm hoa đá hình các đốt trúc, lấy ánh sáng tự nhiên và thông gió mát mẻ.',
      'Hệ thống hầm chỉ huy kiên cố dưới lòng đất có thể chịu được bom hạng nặng.'
    ],
    conservationStatus: 'Di tích được bảo quản trang thiết bị, phòng khánh tiết và hiện vật nguyên bản.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/20190923_Independence_Palace-10.jpg/1280px-20190923_Independence_Palace-10.jpg',
    historicImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/20190923_Independence_Palace-10.jpg/1280px-20190923_Independence_Palace-10.jpg',
    historicImageYear: 'Mặt tiền rèm hoa đá kiến trúc Dinh Độc Lập',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Lịch sử cấp Quốc gia Đặc biệt được Bộ Văn hóa Thể thao & Du lịch công nhận.',
    lat: 10.7770,
    lng: 106.6953,
    address: '135 Nam Kỳ Khởi Nghĩa, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh',
    visitingHours: '08:00 - 16:30 hàng ngày',
    ticketPrice: '40.000 VNĐ / người lớn, 10.000 VNĐ / học sinh sinh viên',
    googleMapsUri: 'https://maps.google.com/?q=Independence+Palace+Ho+Chi+Minh+City',
    tags: ['TP.HCM', 'Ngô Viết Thụ', 'Di tích Lịch sử', 'Kiến trúc', '1975'],
    suggestedQuestions: [
      'Triết lý chữ Hán trong cấu trúc mặt bằng của KTS Ngô Viết Thụ gồm những chữ gì?',
      'Khoảnh khắc lịch sử trưa ngày 30/4/1975 diễn ra tại cổng Dinh Độc Lập như thế nào?'
    ]
  },
  {
    id: 'thanh-dia-my-son',
    name: 'Thánh địa Mỹ Sơn',
    vietnameseName: 'Khu Di tích Mỹ Sơn',
    englishName: 'My Son Sanctuary',
    category: 'temple',
    categoryLabel: 'Đền tháp Cổ Chăm Pa',
    region: 'central',
    province: 'Quảng Nam',
    period: 'Thế kỷ 4 - 13',
    dynasty: 'Vương quốc Chăm Pa cổ',
    history: 'Tổ hợp đền tháp Ấn Độ giáo cổ đại của vương quốc Chăm Pa, nơi thờ thần Shiva và chôn cất các vị vua Chăm anh minh. Xây dựng rải rác qua hơn 10 thế kỷ giữa thung lũng khép kín.',
    culturalSignificance: 'Di sản Văn hóa Thế giới UNESCO (1999). Minh chứng độc nhất vô nhị về nền văn minh Champa rực rỡ với kỹ thuật xây gạch không lộ mạch vữa bí ẩn.',
    interestingFacts: [
      'Các viên gạch cổ liên kết với nhau bằng một chất kết dính tự nhiên gốc thực vật (nhựa cây ô dước) không để lộ khe hở vữa.',
      'Mỗi ngọn tháp là một vũ trụ thu nhỏ (Núi Meru) theo thế giới quan thần thoại Hindu giáo.'
    ],
    conservationStatus: 'Được trùng tu hợp tác chặt chẽ với các chuyên gia khảo cổ học Ý, Ấn Độ và Việt Nam.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/A_far_view_of_the_ruins_at_My_Son_%2830992152933%29.jpg/1280px-A_far_view_of_the_ruins_at_My_Son_%2830992152933%29.jpg',
    historicImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/A_far_view_of_the_ruins_at_My_Son_%2830992152933%29.jpg/1280px-A_far_view_of_the_ruins_at_My_Son_%2830992152933%29.jpg',
    historicImageYear: 'Tháp gạch Chăm Pa cổ thế kỷ 4 - 13',
    verifiedStatus: 'verified',
    verifiedNote: 'UNESCO World Heritage List #949.',
    lat: 15.7959,
    lng: 108.1245,
    address: 'Xã Duy Phú, Huyện Duy Xuyên, Tỉnh Quảng Nam',
    visitingHours: '06:30 - 17:00 hàng ngày',
    ticketPrice: '150.000 VNĐ / khách quốc tế, 100.000 VNĐ / khách Việt Nam',
    googleMapsUri: 'https://maps.google.com/?q=My+Son+Sanctuary',
    tags: ['Chăm Pa', 'Đền tháp', 'UNESCO', 'Mỹ Sơn', 'Thần Shiva'],
    suggestedQuestions: [
      'Bí quyết gạch nung không lộ vữa của người Chăm cổ là gì?',
      'Điệu múa Apsara cổ truyền tại đền tháp Mỹ Sơn có ý nghĩa gì?'
    ]
  },
  {
    id: 'vinh-ha-long',
    name: 'Vịnh Hạ Long & Quần đảo Cát Bà',
    vietnameseName: 'Vịnh Hạ Long',
    englishName: 'Ha Long Bay World Natural Heritage',
    category: 'monument',
    categoryLabel: 'Di sản Thiên nhiên Thế giới',
    region: 'north',
    province: 'Quảng Ninh',
    period: 'Hàng trăm triệu năm kiến tạo địa chất',
    history: 'Truyền thuyết rồng mẹ cùng đàn rồng con hạ phàm phun châu nhả ngọc tạo thành hàng ngàn hòn đảo đá kỳ vĩ để ngăn bước quân thù giữ yên bờ cõi giang sơn.',
    culturalSignificance: 'Di sản Thiên nhiên Thế giới 3 lần được UNESCO vinh danh (Địa mạo cảnh quan, Giá trị địa chất, Đa dạng sinh học mở rộng sang Cát Bà năm 2023).',
    interestingFacts: [
      'Gồm gần 2.000 hòn đảo đá vôi lớn nhỏ nhô lên giữa làn nước biển xanh ngọc lục bảo.',
      'Chứa đựng các nền văn hóa khảo cổ nổi tiếng tiền sử như Văn hóa Soi Nhụ, Cái Bèo, Hạ Long.'
    ],
    conservationStatus: 'Khu Di sản Quốc tế được bảo vệ môi trường biển khắt khe.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Ha_Long_Bay_in_2019.jpg/1280px-Ha_Long_Bay_in_2019.jpg',
    historicImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Ha_Long_Bay_in_2019.jpg/1280px-Ha_Long_Bay_in_2019.jpg',
    historicImageYear: 'Kỳ quan đảo đá vôi Vịnh Hạ Long',
    verifiedStatus: 'folk_legend',
    verifiedNote: 'Giá trị địa chất cảnh quan đã được UNESCO chứng thực khoa học; Tên gọi Vịnh Hạ Long bắt nguồn từ truyền thuyết Rồng Hạ.',
    lat: 20.9101,
    lng: 107.1839,
    address: 'Thành phố Hạ Long, Tỉnh Quảng Ninh',
    visitingHours: 'Theo các tuyến tàu du lịch cảng quốc tế Tuần Châu & Hạ Long',
    ticketPrice: '290.000 VNĐ / vé tuyến tham quan',
    googleMapsUri: 'https://maps.google.com/?q=Ha+Long+Bay',
    tags: ['Vịnh Hạ Long', 'UNESCO', 'Kỳ quan', 'Biển đảo', 'Truyền thuyết Rồng'],
    suggestedQuestions: [
      'Tại sao Vịnh lại có tên là Hạ Long theo truyện tích dân gian?',
      'Quá trình Karst hóa địa chất tạo nên các hang động thạch nhũ tại Hạ Long diễn ra bao lâu?'
    ]
  },
];

export const PLACES_NEAR_HERITAGE: Record<string, PlaceItem[]> = {
  'dai-noi-hue': [
    {
      id: 'place-hue-1',
      name: 'Nhà hàng Bếp Khói Cố Đô (Đặc sản Huế)',
      category: 'restaurant',
      categoryLabel: 'Nhà hàng Ẩm thực Cố Đô',
      address: '27 Đường Lê Thánh Tôn, Thuận Thành, Thành phố Huế (Cách Đại Nội 450m)',
      lat: 16.4715,
      lng: 107.5812,
      rating: 4.7,
      userRatingCount: 1420,
      priceLevel: 2,
      priceText: '50.000 - 150.000 VNĐ',
      openNow: true,
      openingHoursText: '08:00 - 22:00',
      websiteUri: 'https://bepkhoicodo.vn',
      nationalPhoneNumber: '0234 382 9988',
      photoUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
      googleMapsUri: 'https://maps.google.com/?q=Nha+Hang+Bep+Khoi+Co+Do+Hue',
      isDemoData: true,
      attributionText: 'Dữ liệu demo tổng hợp từ vị trí thực tế quanh Đại Nội Huế',
      distanceKm: 0.45,
      specialties: ['Bún bò Huế chuẩn vị củi', 'Bánh bèo, nậm, lọc', 'Cơm hến Cồn Hến', 'Nem lụi nướng than'],
      reviewSummary: {
        foodMention: 'Đồ ăn mang hương vị mộc mạc cung đình, nước dùng bún bò thơm mùi sả ruốc tự nhiên.',
        ambianceMention: 'Không gian nhà rường gỗ cổ kính, thoáng mát với sân vườn hoa sứ.',
        serviceMention: 'Nhân viên mặc áo dài truyền thống, tư vấn món tận tình.',
        pricingMention: 'Mức giá rất hợp lý so với chất lượng và vị trí sát di sản.',
        positiveHighlights: [
          'Hương vị đậm đà, không bị ngọt hóa kiểu du lịch',
          'Vị trí đi bộ chỉ 5 phút từ Cửa Hiển Nhơn Đại Nội',
          'Trình bày mẹt bánh Huế rất đẹp mắt'
        ],
        considerations: [
          'Vào giờ trưa cao điểm (11h30 - 12h30) có thể phải đợi bàn khoảng 10-15 phút'
        ],
        dataCoverageNotice: 'Dựa trên phân tích các chủ đề thường gặp từ đánh giá của khách hàng.'
      }
    },
    {
      id: 'place-hue-2',
      name: 'Cà Phê Muối Xứ Huế (Quán Gốc Nguyễn Huệ)',
      category: 'cafe',
      categoryLabel: 'Quán Cà phê & Thức uống',
      address: '10 Nguyễn Huệ, Vĩnh Ninh, TP. Huế (Cách Đại Nội 1.2km)',
      lat: 16.4610,
      lng: 107.5890,
      rating: 4.8,
      userRatingCount: 3180,
      priceLevel: 1,
      priceText: '20.000 - 45.000 VNĐ',
      openNow: true,
      openingHoursText: '06:30 - 22:30',
      photoUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
      googleMapsUri: 'https://maps.google.com/?q=Ca+Phe+Muoi+Nguyen+Hue+Hue',
      isDemoData: true,
      attributionText: 'Dữ liệu demo đại diện nét ẩm thực đường phố Huế',
      distanceKm: 1.2,
      specialties: ['Cà phê kem muối nguyên bản', 'Trà cung đình thanh nhiệt', 'Bánh ép Huế'],
      reviewSummary: {
        foodMention: 'Lớp kem muối béo mặn nhẹ quyện cà phê phin đậm đà tạo hương vị khó quên.',
        ambianceMention: 'Gần gũi, nhiều bóng cây xanh rợp mát rượi.',
        serviceMention: 'Phục vụ nhanh nhẹn dù quán luôn đông khách.',
        pricingMention: 'Giá bình dân, sinh viên và du khách đều rất thích.',
        positiveHighlights: [
          'Cà phê muối chuẩn gốc xứ Huế thơm ngon đặc biệt',
          'Mở cửa sớm tiện nạp năng lượng trước khi tham quan Cố đô'
        ],
        considerations: [
          'Chỗ để xe hơi hạn chế vào buổi sáng cuối tuần'
        ],
        dataCoverageNotice: 'Dựa trên phân tích các chủ đề thường gặp từ đánh giá của khách hàng.'
      }
    },
    {
      id: 'place-hue-3',
      name: 'Không gian Ca Huế & Thưởng trà Sông Hương',
      category: 'entertainment',
      categoryLabel: 'Văn hóa & Giải trí',
      address: 'Bến thuyền Tòa Khâm, Đường Lê Lợi, TP. Huế',
      lat: 16.4680,
      lng: 107.5910,
      rating: 4.6,
      userRatingCount: 890,
      priceLevel: 2,
      priceText: '100.000 - 180.000 VNĐ / vé thuyền rồng',
      openNow: true,
      openingHoursText: '19:00 - 21:30',
      photoUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80',
      googleMapsUri: 'https://maps.google.com/?q=Ben+Thuyen+Toa+Kham+Ca+Hue',
      isDemoData: true,
      attributionText: 'Dữ liệu demo trải nghiệm di sản phi vật thể Huế',
      distanceKm: 1.1,
      specialties: ['Biểu diễn Nhã nhạc & Ca Huế', 'Thả hoa đăng trên sông Hương', 'Thưởng trà tiến vua'],
      reviewSummary: {
        foodMention: 'Kèm trà sen và kẹo cau Huế ngọt nhẹ.',
        ambianceMention: 'Thuyền rồng lững lờ trôi đêm ngắm cầu Tràng Tiền đổi 7 màu.',
        serviceMention: 'Nghệ sĩ đàn tranh, tỳ bà thuyết minh khúc điệu rất truyền cảm.',
        pricingMention: 'Chi phí xứng đáng cho một buổi tối văn hóa lắng đọng.',
        positiveHighlights: [
          'Trải nghiệm nghe ca Huế mộc sống động trên dòng Hương giang',
          'Hoạt động thả hoa đăng cầu may mắn rất thiêng liêng'
        ],
        considerations: [
          'Nên đặt vé trước vào những đêm trăng rằm hoặc dịp lễ hội'
        ],
        dataCoverageNotice: 'Dựa trên phân tích các chủ đề thường gặp từ đánh giá của khách hàng.'
      }
    }
  ],
  'van-mieu-quoc-tu-giam': [
    {
      id: 'place-hn-1',
      name: 'Phở Gia Truyền Bát Đàn',
      category: 'restaurant',
      categoryLabel: 'Quán ăn Địa phương',
      address: '49 Bát Đàn, Quận Hoàn Kiếm, Hà Nội (Cách Văn Miếu 1.5km)',
      lat: 21.0336,
      lng: 105.8471,
      rating: 4.5,
      userRatingCount: 4200,
      priceLevel: 2,
      priceText: '55.000 - 85.000 VNĐ',
      openNow: true,
      openingHoursText: '06:00 - 10:00 & 18:00 - 21:30',
      photoUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=600&q=80',
      googleMapsUri: 'https://maps.google.com/?q=Pho+Gia+Truyen+Bat+Dan+Hanoi',
      isDemoData: true,
      attributionText: 'Dữ liệu ẩm thực Hà Nội truyền thống',
      distanceKm: 1.5,
      specialties: ['Phở bò tái nạm', 'Phở tái lăn', 'Quẩy giòn Hà Nội'],
      reviewSummary: {
        foodMention: 'Nước dùng phở trong, ngọt thanh từ xương bò hầm không mì chính.',
        ambianceMention: 'Quán ăn phố cổ mộc mạc, đậm chất văn hóa xếp hàng thời bao cấp.',
        positiveHighlights: [
          'Bò tươi mềm ngọt, bánh phở dẻo dai tự nhiên',
          'Hương vị phở chuẩn Hà Thành xưa'
        ],
        considerations: [
          'Thực khách tự bưng bê và xếp hàng vào giờ cao điểm'
        ],
        dataCoverageNotice: 'Dựa trên phân tích các chủ đề thường gặp từ đánh giá của khách hàng.'
      }
    },
    {
      id: 'place-hn-2',
      name: 'Cà Phê Giảng (Cà Phê Trứng Nguyên Bản từ 1946)',
      category: 'cafe',
      categoryLabel: 'Quán Cà phê & Thức uống',
      address: '39 Nguyễn Hữu Huân, Hàng Bạc, Hoàn Kiếm, Hà Nội',
      lat: 21.0345,
      lng: 105.8540,
      rating: 4.7,
      userRatingCount: 6800,
      priceLevel: 1,
      priceText: '35.000 - 55.000 VNĐ',
      openNow: true,
      openingHoursText: '07:00 - 22:30',
      photoUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
      googleMapsUri: 'https://maps.google.com/?q=Ca+Phe+Giang+Hanoi',
      isDemoData: true,
      attributionText: 'Dữ liệu di sản thức uống Hà Nội',
      distanceKm: 1.9,
      specialties: ['Cà phê trứng nóng đặt trong bát nước ấm', 'Cacao trứng', 'Matcha trứng'],
      reviewSummary: {
        foodMention: 'Lớp bọt trứng đánh bông mịn như kem, không hề tanh, thơm ngậy quyện cà phê đậm.',
        ambianceMention: 'Căn nhà cổ sâu hun hút với cầu thang gỗ và tranh Hà Nội xưa.',
        positiveHighlights: [
          'Thức uống mang tính biểu tượng văn hóa Hà Nội',
          'Nhiều lựa chọn trứng nóng hoặc đá cho mọi lứa tuổi'
        ],
        considerations: [
          'Bàn ghế thấp nhỏ theo kiểu truyền thống phố cổ'
        ],
        dataCoverageNotice: 'Dựa trên phân tích các chủ đề thường gặp từ đánh giá của khách hàng.'
      }
    }
  ],
  'pho-co-hoi-an': [
    {
      id: 'place-ha-1',
      name: 'Bánh Mì Phượng Hội An',
      category: 'local_food',
      categoryLabel: 'Món ăn Nổi tiếng Thế giới',
      address: '2B Phan Chu Trinh, Cẩm Châu, Hội An',
      lat: 15.8790,
      lng: 108.3325,
      rating: 4.6,
      userRatingCount: 8900,
      priceLevel: 1,
      priceText: '30.000 - 45.000 VNĐ',
      openNow: true,
      openingHoursText: '06:30 - 21:30',
      photoUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
      googleMapsUri: 'https://maps.google.com/?q=Banh+Mi+Phuong+Hoi+An',
      isDemoData: true,
      attributionText: 'Dữ liệu địa điểm ẩm thực Hội An',
      distanceKm: 0.3,
      specialties: ['Bánh mì thập cẩm pate bơ', 'Nước sốt gia truyền Anthony Bourdain từng khen ngợi'],
      reviewSummary: {
        foodMention: 'Vỏ bánh mì giòn rụm, pate béo bùi, rau thơm Trà Quế tạo nên vị tổng thể hài hòa.',
        ambianceMention: 'Cửa hàng 2 tầng ấm cúng giữa lòng phố cổ.',
        positiveHighlights: ['Hương vị nước sốt đặc trưng khó tìm ở nơi khác', 'Phục vụ nhanh dù hàng dài'],
        considerations: ['Có thể đông khách vào khoảng 17h00 - 19h00'],
        dataCoverageNotice: 'Dựa trên phân tích các chủ đề thường gặp từ đánh giá của khách hàng.'
      }
    }
  ],
  'thanh-dia-my-son': [
    {
      id: 'place-ms-1',
      name: 'Bê Thui Cầu Mống Mười Hiển (Đặc Sản Quảng Nam)',
      category: 'restaurant',
      categoryLabel: 'Nhà hàng Đặc sản Xứ Quảng',
      address: 'Quốc Lộ 1A, Điện Phương, Thị xã Điện Bàn (gần ngã 3 đi Mỹ Sơn)',
      lat: 15.8621,
      lng: 108.2312,
      rating: 4.7,
      userRatingCount: 3450,
      priceLevel: 2,
      priceText: '120.000 - 250.000 VNĐ',
      openNow: true,
      openingHoursText: '08:30 - 21:00',
      photoUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
      googleMapsUri: 'https://maps.google.com/?q=Be+Thui+Cau+Mong+Muoi+Hien',
      isDemoData: true,
      attributionText: 'Đặc sản trứ danh xứ Quảng Nam',
      distanceKm: 4.8,
      specialties: ['Bê thui than hoa da vàng giòn thịt hồng đào', 'Mắm nêm cá cơm đậm đà', 'Bánh tráng Đại Lộc cuốn rau rừng'],
      reviewSummary: {
        foodMention: 'Thịt bê thui chín tới mềm ngọt mọng nước, da giòn sần sật cuộn bánh tráng và rau sống chấm mắm nêm xuất sắc.',
        ambianceMention: 'Quán rộng rãi, sạch sẽ, bãi đỗ xe ô tô thoải mái cho đoàn du lịch hành hương Mỹ Sơn.',
        positiveHighlights: ['Nước mắm nêm gia truyền pha với tỏi ớt gừng thơm nức mũi', 'Thịt thái tươi tại chỗ'],
        considerations: ['Nên ghé tầm trưa hoặc chiều để thưởng thức lúc mẻ bê vừa thui ra lò'],
        dataCoverageNotice: 'Địa chỉ ẩm thực truyền thống không thể bỏ qua trên cung đường di sản Mỹ Sơn.'
      }
    },
    {
      id: 'place-ms-2',
      name: 'Mì Quảng Gà Ta & Bánh Đập Duy Xuyên',
      category: 'local_food',
      categoryLabel: 'Quán ăn Dân dã Bản địa',
      address: 'Thị trấn Nam Phước, Duy Xuyên, Tỉnh Quảng Nam',
      lat: 15.8245,
      lng: 108.2410,
      rating: 4.6,
      userRatingCount: 1820,
      priceLevel: 1,
      priceText: '30.000 - 45.000 VNĐ',
      openNow: true,
      openingHoursText: '06:00 - 18:30',
      photoUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=600&q=80',
      googleMapsUri: 'https://maps.google.com/?q=Mi+Quang+Nam+Phuoc+Duy+Xuyen',
      isDemoData: true,
      attributionText: 'Ẩm thực truyền thống Duy Xuyên',
      distanceKm: 5.2,
      specialties: ['Mì Quảng gà ta đồi thả vườn', 'Bánh tráng mè nướng giòn', 'Bắp chuối non thái sợi'],
      reviewSummary: {
        foodMention: 'Sợi mì gạo quê dẻo thơm, nước như chỉ vừa xâm xấp quyện thịt gà ta săn chắc đậm đà hương củ nén và dầu đậu phộng.',
        ambianceMention: 'Không gian thôn quê mộc mạc đậm chất xứ Quảng mến khách.',
        positiveHighlights: ['Chuẩn vị mì Quảng gốc Duy Xuyên', 'Giá bình dân, phục vụ nhanh'],
        considerations: ['Quán đông khách địa phương vào sáng sớm'],
        dataCoverageNotice: 'Được gợi ý nồng nhiệt bởi các tài xế và hướng dẫn viên tuyến Đà Nẵng - Mỹ Sơn.'
      }
    }
  ],
  'dinh-doc-lap': [
    {
      id: 'place-sg-1',
      name: 'Nhà hàng Cơm Niêu Sài Gòn',
      category: 'restaurant',
      categoryLabel: 'Nhà hàng Đặc sản Nam Bộ',
      address: '27 Tú Xương, Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh',
      lat: 10.7812,
      lng: 106.6890,
      rating: 4.6,
      userRatingCount: 3890,
      priceLevel: 3,
      priceText: '100.000 - 300.000 VNĐ',
      openNow: true,
      openingHoursText: '10:00 - 22:00',
      photoUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
      googleMapsUri: 'https://maps.google.com/?q=Com+Nieu+Sai+Gon',
      isDemoData: true,
      attributionText: 'Dữ liệu địa điểm ẩm thực Sài Gòn',
      distanceKm: 0.9,
      specialties: ['Cơm đập niêu đất bay điệu nghệ', 'Cá kho tộ Nam Bộ', 'Canh cua rau đay', 'Sườn non nướng mật ong'],
      reviewSummary: {
        foodMention: 'Cơm cháy giòn rụm chấm mỡ hành và kho quẹt cực kỳ bắt vị, cá bống kho đậm đà chuẩn miền Nam.',
        ambianceMention: 'Kiến trúc gạch mộc và vườn cây xanh yên tĩnh giữa lòng phố thị sầm uất.',
        positiveHighlights: ['Tiết mục đập niêu cơm biểu diễn trực tiếp ấn tượng', 'Thực đơn đa dạng món quê truyền thống'],
        considerations: ['Giá nhỉnh hơn quán bình dân nhưng rất xứng đáng trải nghiệm'],
        dataCoverageNotice: 'Tổng hợp từ trải nghiệm khách du lịch và cư dân Sài Gòn.'
      }
    },
    {
      id: 'place-sg-2',
      name: 'Cà Phê Đỗ Phủ - Cơm Tấm Đại Hàn (Hầm Vũ Khí Biệt Động)',
      category: 'cafe',
      categoryLabel: 'Cà phê Di tích Lịch sử',
      address: '113A Đặng Dung, Phường Tân Định, Quận 1, TP. Hồ Chí Minh',
      lat: 10.7930,
      lng: 106.6912,
      rating: 4.7,
      userRatingCount: 2150,
      priceLevel: 1,
      priceText: '35.000 - 65.000 VNĐ',
      openNow: true,
      openingHoursText: '07:00 - 21:30',
      photoUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
      googleMapsUri: 'https://maps.google.com/?q=Ca+Phe+Do+Phu+Dang+Dung',
      isDemoData: true,
      attributionText: 'Địa điểm di sản lịch sử Biệt động Sài Gòn',
      distanceKm: 1.8,
      specialties: ['Cà phê bơ sữa vợt cổ điển', 'Cơm tấm kim chi Đại Hàn gia truyền', 'Trà đào hoa cúc'],
      reviewSummary: {
        foodMention: 'Món cơm tấm sườn nướng kèm kim chi muối theo công thức biệt động xưa rất độc đáo.',
        ambianceMention: 'Nơi lưu giữ hầm bí mật cất giấu vũ khí thời kháng chiến, giữ nguyên đồ dùng thập niên 1960.',
        positiveHighlights: ['Vừa uống cà phê vừa trực tiếp chui xuống hầm vũ khí bí mật', 'Nhân viên kể chuyện lịch sử hào hứng'],
        considerations: ['Không gian nhà phố cổ điển nên sức chứa vừa phải'],
        dataCoverageNotice: 'Điểm tham quan kết hợp cà phê di sản được yêu thích tại TP.HCM.'
      }
    }
  ],
  'trang-an-ninh-binh': [
    {
      id: 'place-nb-1',
      name: 'Nhà hàng Thăng Long (Dê Núi Cơm Cháy Ninh Bình)',
      category: 'restaurant',
      categoryLabel: 'Nhà hàng Ẩm thực Tràng An',
      address: 'Tràng An, Chi Lăng, Hoa Lư, Ninh Bình',
      lat: 20.2580,
      lng: 105.9320,
      rating: 4.6,
      userRatingCount: 4200,
      priceLevel: 2,
      priceText: '80.000 - 250.000 VNĐ',
      openNow: true,
      openingHoursText: '08:00 - 22:00',
      photoUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
      googleMapsUri: 'https://maps.google.com/?q=Nha+Hang+Thang+Long+Ninh+Binh',
      isDemoData: true,
      attributionText: 'Đặc sản Cố đô Hoa Lư',
      distanceKm: 1.1,
      specialties: ['Dê núi tái chanh cuộn lá sung', 'Cơm cháy sốt tim cật Ninh Bình', 'Dê nướng tảng than hoa'],
      reviewSummary: {
        foodMention: 'Thịt dê núi tươi ngọt, không bị hôi; cơm cháy hạt nở vàng rụm chấm nước sốt sánh mịn tuyệt hảo.',
        ambianceMention: 'Sát sườn núi đá vôi hùng vĩ, bãi đỗ xe rộng rãi, thoáng mát.',
        positiveHighlights: ['Món dê nướng tảng và tái chanh chuẩn vị Ninh Bình', 'Phục vụ nhanh nhẹn'],
        considerations: ['Cuối tuần lượng khách tham quan Tràng An ghé ăn rất đông'],
        dataCoverageNotice: 'Dựa trên phân tích thực khách sau chuyến du ngoạn Tràng An.'
      }
    }
  ]
};

export const TRADITIONAL_CRAFTS: TraditionalCraftVillage[] = [
  {
    id: 'gom-bat-trang',
    name: 'Làng Gốm Bát Tràng',
    craftType: 'Gốm sứ thủ công',
    province: 'Hà Nội',
    region: 'north',
    history: 'Hình thành từ thế kỷ 14 thời nhà Lý - Trần khi người dân các dòng họ gốm Ninh Bình, Thanh Hóa theo vua dời đô về Thăng Long lập nghiệp ven bờ sông Hồng.',
    products: ['Men ngọc, men lam, men rạn', 'Bình hút lộc, ấm chén phong thủy', 'Gốm gia dụng và mỹ thuật xuất khẩu'],
    processSteps: [
      'Chọn và xử lý đất sét trắng dẻo',
      'Tạo hình trên bàn xoay hoặc khuôn thạch cao',
      'Phơi khô, tỉa sửa và vẽ hoa văn bằng bút lông',
      'Tráng men phủ độc quyền bí truyền',
      'Nung trong lò củi/lò gas ở nhiệt độ 1.200°C - 1.300°C'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1000&q=80',
    googleMapsUri: 'https://maps.google.com/?q=Bat+Trang+Pottery+Village',
    visitingLocation: 'Bảo tàng Gốm Bát Tràng (Trung tâm Tinh hoa Làng nghề Việt)',
    verifiedStatus: 'verified'
  },
  {
    id: 'tranh-dong-ho',
    name: 'Làng Tranh Dân Gian Đông Hồ',
    craftType: 'Tranh in khắc gỗ dân gian',
    province: 'Bắc Ninh',
    region: 'north',
    history: 'Nghề làm tranh có từ thế kỷ 17, gắn liền với bức tranh sinh hoạt thôn quê ngày Tết của người Việt: "Hứng dừa", "Đám cưới chuột", "Vinh hoa phú quý", "Đàn lợn âm dương".',
    products: ['Tranh Tết truyền thống', 'Tranh chúc tụng, tranh thờ', 'Tranh minh họa tích truyện dân gian'],
    processSteps: [
      'Sáng tác mẫu và khắc bản gỗ tỉ mỉ từng màu sắc',
      'Làm giấy điệp từ vỏ sò điệp nghiền mịn quét lên giấy dó',
      'Chế tạo màu tự nhiên: đen từ than lá tre, đỏ từ sỏi son, vàng từ hoa hòe, xanh từ lá chàm',
      'In lần lượt từng bản màu lên giấy điệp và phơi gió tự nhiên'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
    googleMapsUri: 'https://maps.google.com/?q=Dong+Ho+Painting+Village',
    visitingLocation: 'Trung tâm Bảo tồn Tranh Dân gian Đông Hồ, Thuận Thành, Bắc Ninh',
    verifiedStatus: 'verified'
  },
  {
    id: 'non-la-tay-ho',
    name: 'Làng Nón Lá Tây Hồ (Nón Bài Thơ Xứ Huế)',
    craftType: 'Chằm nón lá truyền thống',
    province: 'Thừa Thiên Huế',
    region: 'central',
    history: 'Nằm bên dòng sông Như Ý, làng Tây Hồ đã gắn bó với nghề chằm nón hàng trăm năm. Chiếc nón bài thơ trứ danh ra đời tại đây vào khoảng thập niên 1960.',
    products: ['Nón bài thơ ép hoa cỏ lá sen', 'Nón quai thao Cố đô', 'Nón lá dừa xuất khẩu'],
    processSteps: [
      'Chọn lá non, ủi phẳng bằng lưỡi gang nóng',
      'Vót 16 vành nón bằng tre cật tròn đều',
      'Xếp lớp thơ, câu đối hoặc tranh cảnh chùa Thiên Mụ kẹp giữa 2 lớp lá',
      'Chằm từng đường kim cước tinh xảo đều tăm tắp',
      'Quét lớp dầu bóng chống thấm nước mưa'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80',
    googleMapsUri: 'https://maps.google.com/?q=Tay+Ho+Conical+Hat+Village+Hue',
    visitingLocation: 'Làng Tây Hồ, Xã Phú Hồ, Huyện Phú Vang, Thừa Thiên Huế',
    verifiedStatus: 'verified'
  },
  {
    id: 'lua-van-phuc',
    name: 'Làng Lụa Vạn Phúc (Hà Đông)',
    craftType: 'Dệt lụa tơ tằm',
    province: 'Hà Nội',
    region: 'north',
    history: 'Có lịch sử hơn 1.000 năm dệt lụa, từng được chọn may y phục cho triều đình và được vinh danh tại các hội chợ thương mại quốc tế Marseille, Paris thời Pháp thuộc.',
    products: ['Lụa vân mộc', 'Gấm sa, đũi tơ tằm', 'Khăn lụa thêu tay mỹ thuật'],
    processSteps: [
      'Ươm tơ tằm tự nhiên',
      'Mắc sợi và cài hoa văn cổ điển trên khung dệt',
      'Dệt lụa với kỹ thuật vân thủ công độc đáo',
      'Nấu tẩy và nhuộm màu bằng thảo mộc tự nhiên',
      'Phơi lụa trong nắng nhẹ'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80',
    googleMapsUri: 'https://maps.google.com/?q=Van+Phuc+Silk+Village',
    visitingLocation: 'Phố lụa Vạn Phúc, Quận Hà Đông, Hà Nội',
    verifiedStatus: 'verified'
  }
];

export const TRADITIONAL_ARTS: TraditionalArtItem[] = [
  {
    id: 'nha-nhac-cung-dinh',
    name: 'Nhã Nhạc Cung Đình Huế',
    artType: 'nha_nhac',
    artTypeLabel: 'Nhã nhạc Cung đình',
    originRegion: 'Thừa Thiên Huế (Miền Trung)',
    description: 'Âm nhạc cung đình bác học được trình diễn trong các đại lễ tế trời đất Giao, đăng quang, triều hội và yến tiệc của triều đình nhà Nguyễn.',
    characteristics: [
      'Dàn nhạc chia thành Đại nhạc (kèn, trống chiến, bồng) và Tiểu nhạc (đàn tỳ bà, tam, nguyệt, nhị, sáo, sênh tiền)',
      'Lời ca thanh nhã, tôn nghiêm, ca ngợi thái bình thịnh trị và đạo lý nhân nghĩa',
      'Quy chuẩn chặt chẽ theo hệ thống ngũ cung và luật âm dương phương Đông'
    ],
    culturalMeaning: 'Di sản Văn hóa Phi vật thể đầu tiên của Việt Nam được UNESCO ghi danh năm 2003.',
    recognizedByUnesco: true,
    unescoYear: '2003',
    sampleAudioOrVideoDescription: 'Khúc nhạc "Mười bản ngự" và "Đăng đàn cung"',
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'quan-ho-bac-ninh',
    name: 'Dân Ca Quan Họ Bắc Ninh',
    artType: 'quan_ho',
    artTypeLabel: 'Dân ca Đối đáp',
    originRegion: 'Vùng Kinh Bắc (Bắc Ninh - Bắc Giang)',
    description: 'Hình thức hát dân ca đối đáp giao duyên mặn mà giữa các liền anh khăn xếp áo then và liền chị áo tứ thân nón quai thao.',
    characteristics: [
      'Kỹ thuật hát 4 tiêu chí cốt lõi: Vang - Rền - Nền - Nảy',
      'Hát không cần nhạc đệm (hát chay) hoặc đệm đàn bầu, đàn nhị nhẹ nhàng',
      'Lối ứng xử tao nhã, trọng nghĩa khí và văn hóa mời trầu têm cánh phượng'
    ],
    culturalMeaning: 'Di sản Phi vật thể Đại diện của Nhân loại UNESCO (2009).',
    recognizedByUnesco: true,
    unescoYear: '2009',
    sampleAudioOrVideoDescription: 'Điệu hát "Người ở đừng về", "Cây trúc xinh", "Khách đến chơi nhà"',
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'don-ca-tai-tu',
    name: 'Đờn Ca Tài Tử Nam Bộ',
    artType: 'don_ca_tai_tu',
    artTypeLabel: 'Nghệ thuật Đờn ca',
    originRegion: '21 tỉnh thành Nam Bộ',
    description: 'Nghệ thuật đờn và ca thính phòng mang đậm cốt cách phóng khoáng, tình cảm chân thành của người dân phương Nam trên vùng sông nước trù phú.',
    characteristics: [
      'Dàn nhạc cụ ngũ tuyệt: Kìm, Tranh, Cò, Bầu, Ghita phím lõm kết hợp sáo tiêu',
      'Gồm 20 bản tổ (6 bản Bắc, 3 bản Nam, 4 bản Oán, 7 bản Hạ)',
      'Không gian sinh hoạt bình dị từ vườn cây, sân đình đến chòi ghe bến sông'
    ],
    culturalMeaning: 'Di sản Phi vật thể UNESCO công nhận năm 2013.',
    recognizedByUnesco: true,
    unescoYear: '2013',
    sampleAudioOrVideoDescription: 'Bản Dạ Cổ Hoài Lang (Cao Văn Lầu) & Bản Nam Xuân',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80'
  }
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    id: 'era-van-lang',
    period: 'Thời dựng nước & Hồng Bàng',
    timeRange: 'Thế kỷ 7 TCN - Thế kỷ 3 TCN',
    dynastyOrEra: 'Nhà nước Văn Lang (Hùng Vương) & Âu Lạc (An Dương Vương)',
    overview: 'Thuở bình minh của lịch sử dân tộc với nền văn hóa Đông Sơn rực rỡ, kỹ thuật đúc đồng đỉnh cao và ý thức đoàn kết cộng đồng qua biểu tượng Mẹ Âu Cơ - Cha Lạc Long Quân.',
    keyEvents: [
      '18 đời vua Hùng dựng nước Văn Lang đóng đô tại Phong Châu (Phú Thọ)',
      'Thục Phán An Dương Vương xây thành Cổ Loa hình xoáy trôn ốc đánh giặc Triệu Đà',
      'Đúc Trống đồng Ngọc Lũ, Hoàng Hạ với hoa văn chim Lạc, thuyền chiến'
    ],
    prominentFigures: ['Vua Hùng', 'An Dương Vương', 'Thánh Gióng', 'Sơn Tinh - Thủy Tinh'],
    associatedHeritages: ['Khu di tích Đền Hùng', 'Thành Cổ Loa', 'Bảo vật Quốc gia Trống đồng Đông Sơn'],
    verifiedStatus: 'folk_legend'
  },
  {
    id: 'era-doc-lap-ly-tran',
    period: 'Thời kỳ Quân chủ Độc lập & Hưng thịnh',
    timeRange: 'Thế kỷ 10 - 15 (938 - 1427)',
    dynastyOrEra: 'Thời Ngô - Đinh - Tiền Lê - Lý - Trần - Hậu Lê',
    overview: 'Thời kỳ quốc gia Đại Việt phát triển rực rỡ về văn hóa, Phật giáo, Nho học và võ công hiển hách đánh bại quân Tống, 3 lần đại thắng Nguyên Mông và khởi nghĩa Lam Sơn.',
    keyEvents: [
      'Năm 938: Ngô Quyền cắm cọc gỗ trên sông Bạch Đằng chấm dứt 1.000 năm Bắc thuộc',
      'Năm 1010: Vua Lý Thái Tổ ban Chiếu dời đô về Thăng Long',
      'Năm 1070 & 1076: Xây dựng Văn Miếu và thành lập trường Đại học Quốc Tử Giám',
      'Năm 1285 & 1288: Hưng Đạo Vương Trần Quốc Tuấn chỉ huy 3 lần phá tan quân Nguyên Mông'
    ],
    prominentFigures: ['Ngô Quyền', 'Đinh Tiên Hoàng', 'Lý Thái Tổ', 'Lý Thường Kiệt', 'Trần Hưng Đạo', 'Lê Lợi', 'Nguyễn Trãi'],
    associatedHeritages: ['Hoàng thành Thăng Long', 'Văn Miếu Quốc Tử Giám', 'Chùa Một Cột', 'Cố đô Hoa Lư', 'Bạch Đằng Giang'],
    verifiedStatus: 'verified'
  },
  {
    id: 'era-nguyen',
    period: 'Thời kỳ Thống nhất & Triều Nguyễn',
    timeRange: '1802 - 1945',
    dynastyOrEra: 'Nhà Nguyễn (13 đời Hoàng đế)',
    overview: 'Triều đại phong kiến cuối cùng của Việt Nam, thống nhất giang sơn từ Mũi Cà Mau đến Ải Nam Quan, xây dựng kinh đô Huế và xác lập chủ quyền Hoàng Sa - Trường Sa.',
    keyEvents: [
      'Năm 1802: Nguyễn Ánh lên ngôi Hoàng đế lấy niên hiệu Gia Long, đặt quốc hiệu Việt Nam',
      'Xây dựng Quần thể Di tích Cố đô Huế, các lăng tẩm và thành quách trên cả nước',
      'Khắc 33 tấm mộc bản Cương mục và đúc Cửu Đỉnh ghi nhận chủ quyền biển đảo',
      'Năm 1945: Vua Bảo Đại trao ấn kiếm thoái vị, chấm dứt chế độ quân chủ'
    ],
    prominentFigures: ['Gia Long', 'Minh Mạng', 'Thiệu Trị', 'Tự Đức', 'Phan Bội Châu', 'Phan Châu Trinh'],
    associatedHeritages: ['Đại Nội Huế', 'Chùa Thiên Mụ', 'Lăng Khải Định', 'Lăng Tự Đức', 'Cửu Đỉnh Cố Đô'],
    verifiedStatus: 'verified'
  },
  {
    id: 'era-hien-dai',
    period: 'Thời đại Độc lập & Hội nhập Quốc tế',
    timeRange: 'Từ năm 1945 đến nay',
    dynastyOrEra: 'Nước Cộng hòa Xã hội Chủ nghĩa Việt Nam',
    overview: 'Thời kỳ đấu tranh giành lại toàn vẹn non sông, đổi mới đất nước, đưa các di sản văn hóa truyền thống vươn tầm thế giới và ứng dụng công nghệ AI để bảo tồn ký ức.',
    keyEvents: [
      'Ngày 2/9/1945: Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình',
      'Ngày 30/4/1975: Chiến dịch Hồ Chí Minh toàn thắng, đất nước thống nhất',
      'Hàng chục di sản vật thể và phi vật thể được UNESCO công nhận là di sản nhân loại'
    ],
    prominentFigures: ['Chủ tịch Hồ Chí Minh', 'Đại tướng Võ Nguyên Giáp'],
    associatedHeritages: ['Lăng Chủ tịch Hồ Chí Minh', 'Dinh Độc Lập', 'Địa đạo Củ Chi', 'Di sản UNESCO Việt Nam'],
    verifiedStatus: 'verified'
  }
];

export const PAST_AND_PRESENT: PastAndPresentItem[] = [
  {
    id: 'ngo-mon-hue',
    name: 'Cổng Ngọ Môn - Đại Nội Cung Đình Huế',
    location: 'Thành phố Huế',
    presentImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Meridian_Gate%2C_Hue_%28I%29.jpg',
    historicImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Annam_-_Hu%C3%A9_-_Porte_d%27entr%C3%A9e_du_Palais_Royal.jpg',
    historicYear: 'Ảnh tư liệu thời Pháp thuộc (Đầu thế kỷ 20)',
    isAiReconstructed: false,
    changeDescription: 'Ngọ Môn thời thuộc địa bị rêu phong và hư hại lầu Ngũ Phụng do chiến tranh. Qua nhiều đợt đại trùng tu từ năm 1993 đến nay với công nghệ xử lý gỗ và sơn ta truyền thống, công trình đã lấy lại vẻ uy nghiêm tráng lệ.',
    conservationDetails: 'Dự án bảo tồn có sự tham gia của các chuyên gia di sản UNESCO, CHLB Đức và Viện Bảo tồn Di tích.'
  },
  {
    id: 'chua-cau-hoi-an',
    name: 'Chùa Cầu (Lai Viễn Kiều)',
    location: 'Hội An, Quảng Nam',
    presentImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Cau_Nhat_Ban.jpg',
    historicImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/PhoCoHoiAn.jpg',
    historicYear: 'Không gian kiến trúc Phố cổ Hội An thế kỷ 17 - 19',
    isAiReconstructed: false,
    changeDescription: 'Cây cầu gỗ mái ngói âm dương biểu tượng của Hội An vừa trải qua đợt trùng tu hạ giải toàn diện (2022 - 2024), gia cố mố trụ chống lún sụt do dòng nước và giữ lại tối đa các cấu kiện gỗ nguyên bản cổ xưa.',
    conservationDetails: 'Mọi thanh gỗ, đinh chốt và màu vôi được đo đạc bằng công nghệ quét 3D laser trước khi hạ giải.'
  },
  {
    id: 'dien-kinh-thien-ai',
    name: 'Phục dựng 3D Điện Kính Thiên (Hoàng Thành Thăng Long)',
    location: 'Hà Nội',
    presentImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Hanoi_Temple_of_Literature.jpg',
    historicImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Hanoi_Temple_of_Literature.jpg',
    historicYear: 'Khảo cổ học Hoàng Thành Thăng Long',
    isAiReconstructed: true,
    changeDescription: 'Hiện nay chỉ còn bậc thềm rồng đá thời Lê sơ. Mô hình số phục dựng kiến trúc gỗ 2 tầng mái lợp ngói rồng vàng bằng công nghệ đồ họa AI dựa trên tư liệu hố khai quật khảo cổ học.',
    conservationDetails: 'Ảnh phục dựng bằng AI & Khảo cổ số – không phải ảnh lịch sử nguyên bản. Được tham vấn bởi các nhà sử học Viện Khảo cổ.'
  },
  {
    id: 'dinh-doc-lap-past-present',
    name: 'Dinh Độc Lập (Hội trường Thống Nhất)',
    location: 'Quận 1, TP. Hồ Chí Minh',
    presentImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/20190923_Independence_Palace-10.jpg/1280px-20190923_Independence_Palace-10.jpg',
    historicImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/20190923_Independence_Palace-10.jpg/1280px-20190923_Independence_Palace-10.jpg',
    historicYear: 'Kiến trúc Ngô Viết Thụ (1966 - 1975)',
    isAiReconstructed: false,
    changeDescription: 'Kiệt tác kiến trúc của KTS Ngô Viết Thụ với hoa văn rèm hoa đá hình đốt trúc, phòng Khánh tiết và hầm chỉ huy lịch sử được bảo tồn nguyên vẹn 100% trang thiết bị từ thời điểm lịch sử trưa ngày 30/4/1975.',
    conservationDetails: 'Di tích Lịch sử cấp Quốc gia Đặc biệt được tu bổ định kỳ giữ nguyên lớp sơn, nội thất thảm dệt và hiện vật trưng bày.'
  }
];

export const QUIZ_TOPICS: QuizTopic[] = [
  {
    id: 'quiz-hue',
    title: 'Khám phá Cố đô Huế & Triều Nguyễn',
    subtitle: 'Thử thách kiến trúc cung đình, lễ nghi và ẩm thực xứ Thần Kinh',
    region: 'Miền Trung',
    difficulty: 'medium',
    questions: [
      {
        id: 'q-hue-1',
        question: 'Ngọ Môn Huế có bao nhiêu cửa và cửa chính giữa dành riêng cho ai?',
        options: [
          'Có 3 cửa, dành cho Quan nhất phẩm',
          'Có 5 cửa, cửa chính giữa (Ngọ Môn) chỉ dành riêng cho Hoàng đế',
          'Có 4 cửa, cửa chính giữa dành cho Hoàng thái hậu',
          'Có 6 cửa, chia đều cho quan văn và quan võ'
        ],
        correctIndex: 1,
        explanation: 'Ngọ Môn có 5 lối đi. Cửa chính giữa lát đá thanh dành riêng cho vua, hai cửa bên (Tả Giáp Môn, Hữu Giáp Môn) cho quan văn quan võ, hai cửa ngoài cùng (Tả Dịch Môn, Hữu Dịch Môn) cho binh lính và voi ngựa kéo.',
        culturalNote: 'Quy chế phân định lối đi phản ánh trật tự lễ nghi cung đình phương Đông nghiêm cẩn.'
      },
      {
        id: 'q-hue-2',
        question: 'Di sản nào của xứ Huế được UNESCO công nhận là Di sản Phi vật thể đầu tiên của Việt Nam vào năm 2003?',
        options: [
          'Ca trù',
          'Hát bội Tuồng Huế',
          'Nhã nhạc Cung đình Huế',
          'Múa chén Cung đình'
        ],
        correctIndex: 2,
        explanation: 'Nhã nhạc Cung đình Huế được UNESCO công nhận là Kiệt tác di sản truyền khẩu và phi vật thể của nhân loại năm 2003.',
        culturalNote: 'Nhã nhạc từng đạt đến đỉnh cao vào thời vua Minh Mạng và Tự Đức.'
      },
      {
        id: 'q-hue-3',
        question: 'Tháp Phước Duyên nổi tiếng tại Chùa Thiên Mụ cao bao nhiêu tầng?',
        options: ['5 tầng', '7 tầng', '9 tầng', '12 tầng'],
        correctIndex: 1,
        explanation: 'Tháp Phước Duyên có hình bát giác gồm 7 tầng, cao 21 mét, được vua Thiệu Trị cho xây dựng vào năm 1844.',
        culturalNote: 'Con số 7 tầng tượng trưng cho 7 kiếp hóa thân của Đức Phật (Thất Phước Lợi Thân).'
      },
      {
        id: 'q-hue-4',
        question: 'Món ăn đặc sản dân dã nào ở Huế gắn liền với câu thơ "Cồn Hến trăng lên cá quẫy đuôi"?',
        options: ['Bún bò Huế', 'Cơm hến & Chè bắp Cồn Hến', 'Bánh canh Nam Phổ', 'Bánh khoái'],
        correctIndex: 1,
        explanation: 'Cơm hến Cồn Hến kết hợp thịt hến xào cay, tóp mỡ giòn rụm, môn thục, hoa chuối và mắm ruốc tạo nên vị cay nồng đặc trưng đất cố đô.',
        culturalNote: 'Từng là món dân dã được tiến vua vào thời nhà Nguyễn.'
      },
      {
        id: 'q-hue-5',
        question: 'Cửu Đỉnh đặt tại Thế Miếu - Đại Nội Huế có ý nghĩa biểu trưng gì?',
        options: [
          'Tượng trưng cho 9 mùa màng bội thu',
          'Biểu trưng cho quyền lực thống nhất, sự vững bền của giang sơn và cương vực biển đảo',
          'Nơi lưu giữ tro cốt của 9 vị hoàng đế',
          'Để chứa nước mưa tinh khiết cho cung cấm'
        ],
        correctIndex: 1,
        explanation: 'Cửu Đỉnh được đúc năm 1835 thời vua Minh Mạng, chạm khắc 153 hình ảnh về phong cảnh, sinh vật, sông núi và biển Đông (Hoàng Sa, Trường Sa) khẳng định chủ quyền non sông vẹn toàn.',
        culturalNote: 'Bảo vật Quốc gia độc nhất vô nhị của Việt Nam.'
      }
    ]
  },
  {
    id: 'quiz-hanoi',
    title: 'Nghìn năm Thăng Long - Hà Nội',
    subtitle: 'Tìm hiểu danh thắng, lịch sử hiếu học và làng nghề đất Tràng An',
    region: 'Miền Bắc',
    difficulty: 'easy',
    questions: [
      {
        id: 'q-hn-1',
        question: 'Văn Miếu - Quốc Tử Giám được khởi công xây dựng vào triều đại nào?',
        options: ['Nhà Trần', 'Nhà Lý (năm 1070 & 1076)', 'Nhà Hậu Lê', 'Nhà Đinh'],
        correctIndex: 1,
        explanation: 'Văn Miếu được dựng năm 1070 dưới triều vua Lý Thánh Tông và Quốc Tử Giám được mở năm 1076 thời vua Lý Nhân Tông.',
        culturalNote: 'Nền móng cho nền giáo dục đại học chính quy đầu tiên của nước ta.'
      },
      {
        id: 'q-hn-2',
        question: 'Làng gốm Bát Tràng nằm bên bờ con sông nào của thủ đô Hà Nội?',
        options: ['Sông Đáy', 'Sông Hồng', 'Sông Nhuệ', 'Sông Tô Lịch'],
        correctIndex: 1,
        explanation: 'Làng gốm Bát Tràng nằm bên tả ngạn sông Hồng thuộc huyện Gia Lâm, vị trí đắc địa giúp giao thương đường thủy thuận tiện từ hàng trăm năm trước.',
        culturalNote: 'Men rạn và men lam Bát Tràng là tinh hoa gốm sứ Việt Nam.'
      },
      {
        id: 'q-hn-3',
        question: 'Công trình kiến trúc nào có hình dáng như một đóa hoa sen nở trên mặt nước tọa lạc tại Hà Nội?',
        options: ['Chùa Trấn Quốc', 'Chùa Một Cột (Diên Hựu Tự)', 'Tháp Rùa', 'Khuê Văn Các'],
        correctIndex: 1,
        explanation: 'Chùa Một Cột dựng năm 1049 thời vua Lý Thái Tông, mô phỏng giấc mơ Phật Bà Quan Âm ngồi trên tòa sen dắt vua lên đài.',
        culturalNote: 'Kiệt tác độc bản về kiến trúc tâm linh Việt Nam.'
      }
    ]
  }
];

export const DEMO_GRANDPARENT_STORIES: FamilyStoryMemory[] = [
  {
    id: 'memory-1',
    userId: 'user-demo-1',
    tellerName: 'Ông Nguyễn Văn An',
    tellerBirthYear: 1942,
    location: 'Làng cổ Đường Lâm, Sơn Tây, Hà Nội',
    topic: 'Ký ức đêm trăng giã gạo và giếng đá ong làng',
    timePeriod: 'Giai đoạn 1955 - 1965',
    storyContent: 'Ngày xưa làng tôi nhà nào cũng xây bằng đá ong vàng ươm, mùa đông thì ấm mà mùa hè thì mát rượi. Đêm rằm tháng Tám, trai gái trong làng tụ tập bên sân đình giã gạo đôi, tiếng chày cắc cụp hòa lẫn điệu hát trống quân. Nước giếng làng trong vắt nhìn thấy đáy, múc lên rửa mặt mát lạnh cả tâm hồn. Ông luôn dặn con cháu: Dù đi đâu xa, chớ quên mùi khói rơm và vị tương nếp quê mình.',
    visibility: 'public',
    createdAt: '2026-09-10T14:30:00Z',
    tags: ['Đường Lâm', 'Đá ong', 'Ký ức quê hương', 'Thập niên 50']
  },
  {
    id: 'memory-2',
    userId: 'user-demo-2',
    tellerName: 'Bà Lê Thị Mẫu',
    tellerBirthYear: 1948,
    location: 'Phường Vỹ Dạ, Thành phố Huế',
    topic: 'Nghề chằm nón bài thơ và tiếng rao chè đêm sông Hương',
    timePeriod: 'Giai đoạn 1965 - 1975',
    storyContent: 'Hồi bà mười tám tuổi, con gái Vỹ Dạ ai cũng phải học chằm nón lá. Để làm được chiếc nón bài thơ mỏng nhẹ, bà phải thức sớm từ lúc sương còn đọng trên tàu lá chuối để ủi từng lá non cho phẳng lỳ. Đặt bài thơ chữ Hán hay hình cầu Tràng Tiền vào giữa hai lớp lá, soi lên ánh nắng mặt trời mới thấy hiện lên. Chiều chiều, ghe chè bắp trôi ngang cất tiếng rao ngọt lịm như rót mật vào tai.',
    visibility: 'public',
    createdAt: '2026-09-12T09:15:00Z',
    tags: ['Huế', 'Nón bài thơ', 'Vỹ Dạ', 'Ký ức thời con gái']
  }
];
