import { HeritageItem, CityLandmarkBackground } from '../types';
import { HERITAGE_DATABASE } from '../data/vietnamHeritageData';

/**
 * Service chuyển đổi và phân giải thông tin di sản / danh thắng từ ảnh nền người dùng đang chọn
 * Giúp người dùng bấm "Khám phá di sản này" là được xem ngay thông tin lịch sử, văn hóa, kiến trúc chi tiết
 */

// Danh mục thông tin chi tiết cho các danh thắng đặc trưng của từng tỉnh thành
const LANDMARK_HERITAGE_MAP: Record<string, Partial<HeritageItem>> = {
  danang: {
    id: 'cau-vang-ba-na-hills',
    name: 'Cầu Vàng Bà Nà Hills - Bàn Tay Khổng Lồ',
    vietnameseName: 'Cầu Vàng (Bàn Tay Phật)',
    englishName: 'Golden Bridge (Giant Hand Bridge) - Ba Na Hills',
    category: 'monument',
    categoryLabel: 'Kỳ quan Kiến trúc Hiện đại & Cảnh quan',
    region: 'central',
    province: 'Đà Nẵng',
    period: 'Khánh thành năm 2018',
    dynasty: 'Thời kỳ Đổi Mới & Hội nhập',
    history: 'Cầu Vàng nằm ở độ cao 1.414 mét so với mực nước biển trên đỉnh núi Chúa Bà Nà, do kiến trúc sư Vũ Việt Anh cùng cộng sự thiết kế và chính thức khánh thành vào tháng 6 năm 2018. Ngay khi ra mắt, công trình đã tạo nên tiếng vang quốc tế chấn động, xuất hiện trên trang nhất của các cơ quan thông tấn hàng đầu thế giới như CNN, BBC, Reuters, National Geographic và lọt vào Top 100 điểm đến tuyệt vời nhất thế giới của tạp chí TIME.',
    culturalSignificance: 'Biểu tượng của sự sáng tạo kiến trúc Việt Nam thời kỳ mới vươn tầm thế giới. Hai bàn tay khổng lồ phủ rêu phong như được tạc từ đá núi nghìn năm nâng đỡ dải lụa vàng óng ánh giữa mây trời, tượng trưng cho bàn tay của vị thần thiên nhiên nâng đỡ con người kết nối với non sông cẩm tú.',
    interestingFacts: [
      'Cầu dài 150m uốn lượn mềm mại qua 8 nhịp, trong đó nhịp lớn nhất dài 21.2m nằm cheo leo giữa lưng chừng sườn núi.',
      'Đôi bàn tay khổng lồ được tạo hình tinh xảo từ khung thép, lưới thép và sợi thủy tinh phủ rêu nhân tạo, tạo cảm giác như hai bàn tay đá cổ xưa mọc lên từ lòng núi.',
      'Dọc hai bên lan can cầu được trồng loài hoa Nữ hoàng Xanh (Salvia Farinacea) sắc tím biếc, nở rực rỡ quanh năm giữa làn sương mờ ảo.'
    ],
    conservationStatus: 'Công trình kiến trúc trọng điểm quốc tế, được duy tu và chăm sóc cảnh quan hàng ngày.',
    verifiedStatus: 'verified',
    verifiedNote: 'Công trình kiến trúc biểu tượng được Tạp chí TIME bình chọn Top 100 điểm đến tuyệt vời nhất thế giới.',
    lat: 15.9950,
    lng: 107.9967,
    address: 'Khu du lịch Sun World Ba Na Hills, Thôn An Sơn, Xã Hòa Ninh, Huyện Hòa Vang, TP. Đà Nẵng',
    visitingHours: '07:30 - 21:00 hàng ngày (theo giờ vận hành cáp treo)',
    ticketPrice: '900.000 VNĐ / vé người lớn ngoại tỉnh, 600.000 VNĐ / người dân Đà Nẵng (đã bao gồm cáp treo khứ hồi)',
    googleMapsUri: 'https://maps.google.com/?q=Golden+Bridge+Ba+Na+Hills+Da+Nang',
    tags: ['Đà Nẵng', 'Bà Nà Hills', 'Cầu Vàng', 'Bàn tay khổng lồ', 'Kỳ quan thế giới'],
    suggestedQuestions: [
      'Ý nghĩa triết lý và kiến trúc đằng sau đôi bàn tay khổng lồ nâng Cầu Vàng là gì?',
      'Làm thế nào để di chuyển lên Cầu Vàng Bà Nà Hills và thời điểm nào ngắm mây đẹp nhất?',
      'Những giải thưởng quốc tế mà Cầu Vàng Đà Nẵng đã đạt được?'
    ]
  },
  dalat: {
    id: 'ho-xuan-huong-da-lat',
    name: 'Hồ Xuân Hương & Rừng Thông Cao Nguyên Đà Lạt',
    vietnameseName: 'Hồ Xuân Hương',
    englishName: 'Xuan Huong Lake & Pine Forests of Da Lat',
    category: 'monument',
    categoryLabel: 'Thắng cảnh Thiên nhiên & Lịch sử',
    region: 'central',
    province: 'Lâm Đồng',
    period: 'Hình thành từ năm 1919 (Thời Pháp thuộc)',
    dynasty: 'Thời Nguyễn & Pháp thuộc',
    history: 'Hồ Xuân Hương nguyên là thung lũng có dòng suối Cam Ly chảy qua. Năm 1919 theo sáng kiến của viên công sứ Pháp Cunhac, một con đập được ngăn lại tạo thành hồ nhân tạo. Năm 1953, hồ được đổi tên theo nữ sĩ thi ca trứ danh Hồ Xuân Hương.',
    culturalSignificance: 'Được ví như trái tim lãng mạn của thành phố sương mù ngàn hoa Đà Lạt. Xung quanh hồ là những rặng thông xanh ngút ngàn, bãi cỏ thoai thoải và vườn hoa ngát hương, tạo nên bản hòa ca thi vị giữa thiên nhiên và thi ca Việt Nam.',
    interestingFacts: [
      'Hồ có chu vi khoảng 5 km, diện tích mặt nước gần 25 ha, hình dáng cong cong như vầng trăng khuyết.',
      'Tên gọi Hồ Xuân Hương vừa là để tôn vinh nữ thi sĩ tài hoa, vừa mang ý nghĩa hương thơm của cỏ cây hoa lá mùa xuân ngạt ngào quanh hồ.',
      'Quanh hồ là nơi tập trung các kiến trúc Pháp cổ tráng lệ như Khách sạn Dalat Palace, Trường Cao đẳng Sư phạm Đà Lạt.'
    ],
    conservationStatus: 'Di tích Thắng cảnh Quốc gia được bảo tồn nghiêm ngặt về chất lượng nguồn nước và cảnh quan thông xanh.',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Danh thắng Quốc gia được Bộ Văn hóa Thông tin công nhận năm 1988.',
    lat: 11.9404,
    lng: 108.4583,
    address: 'Phường 1 & Phường 10, Thành phố Đà Lạt, Tỉnh Lâm Đồng',
    visitingHours: 'Mở cửa tự do 24/7',
    ticketPrice: 'Miễn phí tham quan (Thuê xe đạp đôi hoặc vịt đạp nước có phụ phí nhỏ)',
    googleMapsUri: 'https://maps.google.com/?q=Ho+Xuan+Huong+Da+Lat',
    tags: ['Đà Lạt', 'Hồ Xuân Hương', 'Rừng thông', 'Cao nguyên', 'Thơ mộng'],
    suggestedQuestions: [
      'Lịch sử hình thành hồ nhân tạo Hồ Xuân Hương có từ khi nào?',
      'Vì sao hồ được đặt tên theo nữ thi sĩ Hồ Xuân Hương?',
      'Những hoạt động trải nghiệm văn hóa thú vị nhất quanh bờ hồ Xuân Hương?'
    ]
  },
  cantho: {
    id: 'cho-noi-cai-rang',
    name: 'Chợ Nổi Cái Răng & Bến Ninh Kiều Cần Thơ',
    vietnameseName: 'Chợ nổi Cái Răng',
    englishName: 'Cai Rang Floating Market & Ninh Kieu Wharf',
    category: 'folk_art',
    categoryLabel: 'Di sản Văn hóa Phi vật thể Sông nước',
    region: 'south',
    province: 'Cần Thơ',
    period: 'Hình thành đầu thế kỷ 20',
    dynasty: 'Thời Nhà Nguyễn & Văn hóa Nam Bộ',
    history: 'Chợ nổi Cái Răng hình thành từ đầu thế kỷ 20 khi đường bộ và phương tiện cơ giới chưa phát triển, mọi giao thương buôn bán của vùng châu thổ sông Cửu Long đều diễn ra trên sông nước ghe xuồng. Năm 2016, Văn hóa Chợ nổi Cái Răng được công nhận là Di sản văn hóa phi vật thể quốc gia.',
    culturalSignificance: 'Bức tranh sinh hoạt độc đáo bậc nhất của nền văn minh sông nước miền Tây Nam Bộ. Nét văn hóa buôn bán bình dị qua "cây bẹo" cắm đầu mũi ghe, tiếng hò sông nước và ẩm thực ghe nổi đậm đà tình người Tây Đô.',
    interestingFacts: [
      'Ghe bán gì thì treo nấy trên cây tre dài gọi là "Cây Bẹo" để người mua từ xa đã nhìn thấy mà không cần rao.',
      'Có quy tắc bẹo ngộ nghĩnh: "Treo gì bán nấy", "Treo mà không bán" (quần áo phơi), và "Không treo mà bán" (thuyền ẩm thực ăn uống hủ tiếu, cà phê).',
      'Chợ họp sôi nổi nhất từ 5 giờ đến 8 giờ sáng, với hàng trăm ghe thuyền chở đầy hoa quả nông sản miệt vườn.'
    ],
    conservationStatus: 'Di sản Văn hóa Phi vật thể Quốc gia được thành phố Cần Thơ bảo tồn và phát triển du lịch sinh thái.',
    verifiedStatus: 'verified',
    verifiedNote: 'Di sản Văn hóa Phi vật thể Quốc gia theo quyết định của Bộ Văn hóa, Thể thao và Du lịch (2016).',
    lat: 10.0051,
    lng: 105.7469,
    address: 'Sông Cần Thơ, Số 46 Đường Hai Bà Trưng, Quận Cái Răng, TP. Cần Thơ',
    visitingHours: '05:00 - 09:00 sáng hàng ngày',
    ticketPrice: 'Thuê tàu thuyền ngắm chợ nổi: 50.000 - 100.000 VNĐ / người (theo đoàn)',
    googleMapsUri: 'https://maps.google.com/?q=Cho+Noi+Cai+Rang+Can+Tho',
    tags: ['Cần Thơ', 'Chợ nổi', 'Sông nước', 'Miền Tây', 'Cây bẹo'],
    suggestedQuestions: [
      'Văn hóa "cây bẹo" trên ghe thuyền chợ nổi Cái Răng có ý nghĩa gì?',
      'Thời gian nào trong ngày là lý tưởng nhất để tham quan chợ nổi?',
      'Món ăn đặc sản nào nhất định phải thử ngay trên thuyền ở chợ nổi?'
    ]
  },
  hagiang: {
    id: 'cao-nguyen-da-dong-van',
    name: 'Công Viên Địa Chất Toàn Cầu Cao Nguyên Đá Đồng Văn & Cột Cờ Lũng Cú',
    vietnameseName: 'Cao nguyên đá Đồng Văn',
    englishName: 'Dong Van Karst Plateau UNESCO Global Geopark',
    category: 'monument',
    categoryLabel: 'Công viên Địa chất Toàn cầu UNESCO',
    region: 'north',
    province: 'Hà Giang',
    period: 'Địa chất 400 - 600 triệu năm, văn hóa hàng trăm năm',
    dynasty: 'Địa đầu Tổ quốc',
    history: 'Cao nguyên đá Đồng Văn trải dài qua 4 huyện Quản Bạ, Yên Minh, Đồng Văn, Mèo Vạc. Năm 2010, nơi đây trở thành Công viên Địa chất Toàn cầu đầu tiên của Việt Nam và thứ hai ở Đông Nam Á được UNESCO công nhận. Nơi đây là minh chứng lịch sử địa chất của vỏ trái đất qua hàng trăm triệu năm.',
    culturalSignificance: 'Vùng đất thiêng liêng nơi Cực Bắc Tổ quốc với Cột cờ Lũng Cú kiêu hãnh. Đồng thời là cái nôi văn hóa đa sắc tộc của 17 dân tộc anh em (H\'Mông, Dao, Lô Lô, Tày...) kiên cường bám đá, nở hoa trên đá.',
    interestingFacts: [
      'Hơn 80% bề mặt là đá vôi karst được kiến tạo từ kỷ Cambri đến kỷ Permi (cách đây 400 - 600 triệu năm).',
      'Đèo Mã Pí Lèng - một trong "Tứ đại đỉnh đèo" của Việt Nam uốn lượn bên hẻm vực sông Nho Quế sâu nhất Đông Nam Á.',
      'Cột cờ Lũng Cú tung bay lá cờ đỏ sao vàng rộng đúng 54 mét vuông, tượng trưng cho khối đại đoàn kết 54 dân tộc Việt Nam.'
    ],
    conservationStatus: 'Công viên Địa chất Toàn cầu UNESCO được bảo tồn nguyên trạng đa dạng sinh học và văn hóa bản địa.',
    verifiedStatus: 'verified',
    verifiedNote: 'UNESCO Global Geopark Network Dossier (2010).',
    lat: 23.2790,
    lng: 105.3644,
    address: 'Thị trấn Đồng Văn, Huyện Đồng Văn, Tỉnh Hà Giang',
    visitingHours: 'Mở cửa tự do 24/7',
    ticketPrice: 'Vé tham quan Cột cờ Lũng Cú: 25.000 VNĐ; vé hẻm Tu Sản thuyền sông Nho Quế: 120.000 VNĐ',
    googleMapsUri: 'https://maps.google.com/?q=Dong+Van+Karst+Plateau+Ha+Giang',
    tags: ['Hà Giang', 'Cao nguyên đá', 'UNESCO', 'Lũng Cú', 'Mã Pí Lèng'],
    suggestedQuestions: [
      'Tại sao lá cờ trên đỉnh Lũng Cú có diện tích đúng 54m²?',
      'Con đường Hạnh Phúc vượt đèo Mã Pí Lèng được làm như thế nào?',
      'Mùa hoa tam giác mạch và các lễ hội mùa xuân ở Hà Giang diễn ra vào tháng mấy?'
    ]
  },
  sapa: {
    id: 'fansipan-sapa',
    name: 'Đỉnh Fansipan - Nóc Nhà Đông Dương & Ruộng Bậc Thang Sa Pa',
    vietnameseName: 'Đỉnh Fansipan & Mường Hoa',
    englishName: 'Fansipan Peak (Roof of Indochina) & Sa Pa Terraces',
    category: 'monument',
    categoryLabel: 'Kỳ quan Thiên nhiên & Di sản Canh tác',
    region: 'north',
    province: 'Lào Cai',
    period: 'Hàng trăm năm văn hóa vùng cao',
    dynasty: 'Hoàng Liên Sơn ngàn năm',
    history: 'Fansipan với độ cao 3.143 mét là ngọn núi cao nhất của dãy Hoàng Liên Sơn và cao nhất ba nước Đông Dương (Việt Nam, Lào, Campuchia). Cùng với hệ thống ruộng bậc thang kỳ vĩ tại Thung lũng Mường Hoa được tạo tác qua hàng trăm năm bởi các thế hệ đồng bào H\'Mông, Dao, Giáy.',
    culturalSignificance: 'Đỉnh thiêng của non sông đất Việt, biểu tượng cho ý chí chinh phục đỉnh cao và vẻ đẹp hùng vĩ của thiên nhiên Tây Bắc. Quần thể tâm linh trên đỉnh Fansipan với Đại tượng Phật A Di Đà bằng đồng cao nhất Việt Nam tạo nên không gian an lạc giữa biển mây.',
    interestingFacts: [
      'Độ cao chính xác đo đạc mới nhất là 3.147,3 mét so với mực nước biển.',
      'Ruộng bậc thang Sa Pa từng được tạp chí du lịch danh tiếng Travel + Leisure bình chọn là một trong những thửa ruộng bậc thang đẹp nhất thế giới.',
      'Tuyến cáp treo Fansipan đạt 2 kỷ lục Guinness thế giới: Cáp treo ba dây có độ chênh giữa ga đi và ga đến lớn nhất thế giới (1.410m) và dài nhất thế giới (6.292,5m).'
    ],
    conservationStatus: 'Vườn Quốc gia Hoàng Liên và Di tích Danh thắng Quốc gia Ruộng bậc thang Sa Pa.',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Quốc gia đặc biệt & Kỷ lục Guinness Cáp treo Fansipan.',
    lat: 22.3034,
    lng: 103.7752,
    address: 'Thị xã Sa Pa, Tỉnh Lào Cai',
    visitingHours: '07:30 - 18:30 hàng ngày',
    ticketPrice: 'Vé cáp treo Fansipan: 850.000 VNĐ / người lớn, 550.000 VNĐ / trẻ em',
    googleMapsUri: 'https://maps.google.com/?q=Fansipan+Sa+Pa+Lao+Cai',
    tags: ['Sa Pa', 'Fansipan', 'Nóc nhà Đông Dương', 'Biển mây', 'Ruộng bậc thang'],
    suggestedQuestions: [
      'Đỉnh Fansipan cao bao nhiêu mét và vì sao được gọi là Nóc nhà Đông Dương?',
      'Quần thể tâm linh trên đỉnh Fansipan gồm những công trình điêu khắc Phật giáo nào?',
      'Tháng nào đi Sa Pa để chiêm ngưỡng mùa lúa chín vàng óng trên ruộng bậc thang?'
    ]
  },
  phuquoc: {
    id: 'dao-ngoc-phu-quoc',
    name: 'Đảo Ngọc Phú Quốc & Bãi Sao',
    vietnameseName: 'Đảo Ngọc Phú Quốc',
    englishName: 'Phu Quoc Pearl Island & Bai Sao Beach',
    category: 'monument',
    categoryLabel: 'Kỳ quan Thiên nhiên Biển đảo',
    region: 'south',
    province: 'Kiên Giang',
    period: 'Lịch sử khai khẩn thời Mạc Cửu (Thế kỷ 17)',
    dynasty: 'Thời Chúa Nguyễn & Khai phá phương Nam',
    history: 'Phú Quốc là hòn đảo lớn nhất của Việt Nam, nằm trong vịnh Thái Lan. Vùng đất gắn liền với công cuộc mở cõi phương Nam của danh thần Mạc Cửu cuối thế kỷ 17. Đảo nổi tiếng với những bãi biển cát trắng mịn màng như kem, rạn san hô nguyên sinh và nghề truyền thống làm nước mắm cá cơm trứ danh hàng trăm năm.',
    culturalSignificance: 'Thiên đường du lịch biển đảo tầm cỡ quốc tế, kết hợp hài hòa giữa khu bảo tồn sinh quyển thế giới Kiên Giang và di sản làng nghề nước mắm Phú Quốc - Di sản văn hóa phi vật thể quốc gia.',
    interestingFacts: [
      'Bãi Sao sở hữu bờ cát trắng mịn hình cánh cung cong thoai thoải, dòng nước trong vắt màu ngọc bích.',
      'Nước mắm truyền thống Phú Quốc được ủ chượp từ cá cơm than tươi và muối Bà Rịa trong thùng gỗ bời lời ròng rã suốt 12 đến 15 tháng.',
      'Khu dự trữ sinh quyển ven biển và biển đảo Kiên Giang được UNESCO công nhận là Khu dự trữ sinh quyển thế giới năm 2006.'
    ],
    conservationStatus: 'Vườn Quốc gia Phú Quốc và Khu Bảo tồn Biển đảo được bảo vệ nghiêm ngặt.',
    verifiedStatus: 'verified',
    verifiedNote: 'Khu Dự trữ Sinh quyển Thế giới UNESCO (2006) & Di sản Văn hóa Phi vật thể Quốc gia nghề nước mắm.',
    lat: 10.2899,
    lng: 103.9840,
    address: 'Thành phố Phú Quốc, Tỉnh Kiên Giang',
    visitingHours: 'Mở cửa tự do 24/7',
    ticketPrice: 'Miễn phí các bãi biển công cộng; các tour lặn ngắm san hô từ 400.000 - 800.000 VNĐ',
    googleMapsUri: 'https://maps.google.com/?q=Phu+Quoc+Island+Kien+Giang',
    tags: ['Phú Quốc', 'Đảo Ngọc', 'Bãi Sao', 'Nước mắm', 'UNESCO'],
    suggestedQuestions: [
      'Tại sao cát ở Bãi Sao Phú Quốc lại có màu trắng kem đặc biệt?',
      'Bí quyết làm nên giọt nước mắm truyền thống Phú Quốc thơm ngon nức tiếng là gì?',
      'Thời điểm nào trong năm là mùa biển êm, sóng lặng đẹp nhất ở Phú Quốc?'
    ]
  },
  haiphong: {
    id: 'vinh-lan-ha-cat-ba',
    name: 'Vịnh Lan Hạ & Quần Đảo Cát Bà Hải Phòng',
    vietnameseName: 'Vịnh Lan Hạ',
    englishName: 'Lan Ha Bay & Cat Ba Archipelago UNESCO Heritage',
    category: 'monument',
    categoryLabel: 'Di sản Thiên nhiên Thế giới UNESCO',
    region: 'north',
    province: 'Hải Phòng',
    period: 'Hàng triệu năm kiến tạo địa chất Karst',
    dynasty: 'Thành phố Cảng ngàn năm',
    history: 'Vịnh Lan Hạ nằm ở phía đông đảo Cát Bà, gồm hơn 400 hòn đảo lớn nhỏ phủ đầy thảm thực vật xanh biếc giữa vịnh biển ngọc bích. Tháng 9/2023, Quần thể Vịnh Hạ Long - Quần đảo Cát Bà chính thức được UNESCO công nhận là Di sản Thiên nhiên Thế giới liên tỉnh đầu tiên của Việt Nam.',
    culturalSignificance: 'Kỳ quan thiên nhiên biển đảo với hệ sinh thái rừng nhiệt đới mưa ẩm trên đảo đá vôi, rừng ngập mặn, các rạn san hô quý hiếm và loài Voọc Cát Bà - một trong những loài linh trưởng nguy cấp nhất hành tinh.',
    interestingFacts: [
      'Khác với Hạ Long, gần như 100% hòn đảo ở Vịnh Lan Hạ đều được bao phủ bởi cây cối xanh tươi mát rượi.',
      'Vịnh có tới 139 bãi cát vàng hoang sơ tự nhiên nằm nép mình chân các dãy núi đá vôi, là thiên đường chèo thuyền kayak và tắm biển thanh bình.',
      'Làng chài cổ Cái Bèo ở Vịnh Lan Hạ có niên đại hơn 7.000 năm, là một trong những làng chài nổi cổ xưa nhất Đông Nam Á.'
    ],
    conservationStatus: 'Di sản Thiên nhiên Thế giới UNESCO & Khu Dự trữ Sinh quyển Quần đảo Cát Bà.',
    verifiedStatus: 'verified',
    verifiedNote: 'UNESCO World Natural Heritage Site (2023) - Vịnh Hạ Long - Quần đảo Cát Bà.',
    lat: 20.8449,
    lng: 106.6881,
    address: 'Thị trấn Cát Bà, Huyện Cát Hải, Thành phố Hải Phòng',
    visitingHours: '07:00 - 17:30 hàng ngày (các tuyến tàu tham quan vịnh)',
    ticketPrice: 'Vé tham quan Vịnh Lan Hạ: 80.000 VNĐ / người; tour du thuyền từ 400.000 - 1.200.000 VNĐ',
    googleMapsUri: 'https://maps.google.com/?q=Lan+Ha+Bay+Cat+Ba+Hai+Phong',
    tags: ['Hải Phòng', 'Vịnh Lan Hạ', 'Cát Bà', 'UNESCO', 'Kayak', 'Làng chài Cái Bèo'],
    suggestedQuestions: [
      'Vịnh Lan Hạ và Vịnh Hạ Long có điểm gì tương đồng và khác biệt về cảnh quan?',
      'Di chỉ làng chài cổ Cái Bèo có giá trị khảo cổ tiền sử như thế nào?',
      'Những trải nghiệm không thể bỏ qua khi du ngoạn Vịnh Lan Hạ Cát Bà?'
    ]
  },
  vungtau: {
    id: 'tuong-chua-kito-vung-tau',
    name: 'Tượng Chúa Kitô Vua & Mũi Nghinh Phong Vũng Tàu',
    vietnameseName: 'Tượng Chúa Kitô Vua',
    englishName: 'Christ the King Statue & Nghinh Phong Cape - Vung Tau',
    category: 'monument',
    categoryLabel: 'Kiến trúc Tôn giáo & Thắng cảnh Biển',
    region: 'south',
    province: 'Bà Rịa - Vũng Tàu',
    period: 'Khởi công năm 1974, hoàn thành năm 1994',
    dynasty: 'Hiện đại',
    history: 'Tượng Chúa Kitô Vua được xây dựng trên đỉnh Núi Nhỏ (núi Tao Phùng) ở độ cao 170m so với mực nước biển. Năm 2012, công trình được xác lập kỷ lục là "Tượng Chúa Kitô lớn nhất khu vực châu Á". Mũi Nghinh Phong kề bên là mũi đất vươn dài ra biển đón gió suốt bốn mùa.',
    culturalSignificance: 'Biểu tượng du lịch và tín ngưỡng nổi tiếng bậc nhất của thành phố biển Vũng Tàu. Từ hai bờ vai tượng Chúa, du khách có thể phóng tầm mắt ngắm trọn vẹn toàn cảnh thành phố, bãi Sau, bãi Trước và biển Đông lộng gió.',
    interestingFacts: [
      'Tượng cao 32 mét, hai cánh tay giang rộng 18.3 mét, đứng sừng sững trên đỉnh núi.',
      'Để lên đến đỉnh tượng, du khách phải leo gần 1.000 bậc đá hoa cương bên triền núi, sau đó leo tiếp 133 bậc thang xoắn ốc nằm bên trong lòng tượng.',
      'Mỗi bên tay tượng có sức chứa khoảng 3 - 5 người cùng đứng chiêm ngưỡng biển khơi mát lành.'
    ],
    conservationStatus: 'Di tích Lịch sử - Văn hóa cấp Quốc gia được tôn tạo khang trang, phục vụ du khách hành hương.',
    verifiedStatus: 'verified',
    verifiedNote: 'Di tích Lịch sử Văn hóa Quốc gia và Kỷ lục Tượng Chúa Kitô lớn nhất Châu Á (2012).',
    lat: 10.3255,
    lng: 107.0844,
    address: 'Đỉnh Núi Nhỏ, Đường Thùy Vân, Phường 2, Thành phố Vũng Tàu, Tỉnh Bà Rịa - Vũng Tàu',
    visitingHours: '07:00 - 17:00 hàng ngày',
    ticketPrice: 'Miễn phí vé vào cổng (yêu cầu trang phục lịch sự, kín đáo khi vào trong lòng tượng)',
    googleMapsUri: 'https://maps.google.com/?q=Christ+the+King+Statue+Vung+Tau',
    tags: ['Vũng Tàu', 'Tượng Chúa Kitô', 'Núi Nhỏ', 'Mũi Nghinh Phong', 'Biển Đông'],
    suggestedQuestions: [
      'Tượng Chúa Kitô Vũng Tàu cao bao nhiêu và được xây dựng trong bao lâu?',
      'Quy định trang phục và thời gian lý tưởng để leo bậc thang lên ngắm biển là gì?',
      'Mũi Nghinh Phong có ý nghĩa gì và các góc chụp ảnh đẹp nhất?'
    ]
  }
};

/**
 * Lấy đối tượng HeritageItem đầy đủ tương ứng với bức ảnh nền đang chọn
 */
export function getHeritageForLandmark(landmark: CityLandmarkBackground): HeritageItem {
  // 1. Kiểm tra đối chiếu với kho di sản HERITAGE_DATABASE sẵn có
  const landmarkId = landmark.id.toLowerCase();
  
  // Mapping từ ID preset sang ID trong HERITAGE_DATABASE
  const presetToDbMap: Record<string, string> = {
    hanoi: 'van-mieu-quoc-tu-giam',
    tphcm: 'dinh-doc-lap',
    hue: 'dai-noi-hue',
    hoian: 'pho-co-hoi-an',
    myson: 'thanh-dia-my-son',
    ninhbinh: 'trang-an-ninh-binh',
    halong: 'vinh-ha-long',
    quangbinh: 'phong-nha-ke-bang',
    nhatrang: 'thap-ba-ponagar'
  };

  const dbId = presetToDbMap[landmarkId];
  if (dbId) {
    const foundInDb = HERITAGE_DATABASE.find(item => item.id === dbId);
    if (foundInDb) {
      // Giữ nguyên thông tin chính thống và đồng bộ ảnh nền đang hiển thị
      return {
        ...foundInDb,
        imageUrl: landmark.imageUrl, // Ảnh nền chất lượng cao mà người dùng đang nhìn thấy
        name: foundInDb.name.includes(landmark.landmarkName) ? foundInDb.name : `${landmark.landmarkName} (${foundInDb.name})`,
        address: foundInDb.address || `${landmark.cityName}, ${landmark.province}`,
        lat: landmark.lat || foundInDb.lat,
        lng: landmark.lng || foundInDb.lng
      };
    }
  }

  // 2. Tìm kiếm trong danh mục chi tiết bổ sung LANDMARK_HERITAGE_MAP
  const customDetail = LANDMARK_HERITAGE_MAP[landmarkId];
  if (customDetail) {
    return {
      id: customDetail.id || `landmark-${landmark.id}`,
      name: customDetail.name || landmark.landmarkName,
      vietnameseName: customDetail.vietnameseName || landmark.landmarkName,
      englishName: customDetail.englishName || landmark.landmarkName,
      category: customDetail.category || 'monument',
      categoryLabel: customDetail.categoryLabel || 'Kỳ quan & Danh lam Thắng cảnh',
      region: customDetail.region || 'central',
      province: customDetail.province || landmark.province || landmark.cityName,
      period: customDetail.period || 'Hiện đại & Lịch sử',
      history: customDetail.history || `${landmark.landmarkName} là danh lam thắng cảnh biểu tượng của ${landmark.cityName}. ${landmark.tagline}.`,
      culturalSignificance: customDetail.culturalSignificance || landmark.tagline,
      interestingFacts: customDetail.interestingFacts || [
        `${landmark.landmarkName} là niềm tự hào của người dân ${landmark.cityName}.`,
        'Điểm đến thu hút hàng triệu lượt khách du lịch và nhiếp ảnh gia trong nước lẫn quốc tế.',
        'Thời điểm tham quan đẹp nhất là vào buổi sáng sớm hoặc hoàng hôn chiều tà.'
      ],
      conservationStatus: customDetail.conservationStatus || 'Được chính quyền địa phương gìn giữ và bảo tồn cảnh quan.',
      imageUrl: landmark.imageUrl,
      verifiedStatus: customDetail.verifiedStatus || 'verified',
      verifiedNote: customDetail.verifiedNote || 'Thông tin được xác thực bởi Sở Du lịch và Văn hóa.',
      lat: landmark.lat,
      lng: landmark.lng,
      address: customDetail.address || `${landmark.landmarkName}, ${landmark.cityName}, Tỉnh ${landmark.province}`,
      visitingHours: customDetail.visitingHours || '07:30 - 18:00 hàng ngày',
      ticketPrice: customDetail.ticketPrice || 'Liên hệ điểm tham quan',
      googleMapsUri: customDetail.googleMapsUri || `https://maps.google.com/?q=${encodeURIComponent(landmark.landmarkName + ' ' + landmark.cityName)}`,
      tags: customDetail.tags || [landmark.cityName, landmark.province, 'Danh thắng', 'Việt Nam'],
      suggestedQuestions: customDetail.suggestedQuestions || [
        `Lịch sử và ý nghĩa của ${landmark.landmarkName} là gì?`,
        `Thời điểm nào tham quan ${landmark.cityName} đẹp nhất trong năm?`,
        `Ẩm thực đặc sản nào ngon nhất gần ${landmark.landmarkName}?`
      ]
    };
  }

  // 3. Fallback thông minh nếu là địa danh tùy chọn mới
  return {
    id: `landmark-${landmark.id}`,
    name: landmark.landmarkName,
    vietnameseName: landmark.landmarkName,
    englishName: landmark.landmarkName,
    category: 'monument',
    categoryLabel: 'Danh thắng & Di sản Văn hóa',
    region: 'central',
    province: landmark.province || landmark.cityName,
    period: 'Lịch sử & Hiện đại',
    history: `${landmark.landmarkName} tọa lạc tại ${landmark.cityName}, ${landmark.province}. ${landmark.tagline}. Đây là một trong những điểm đến văn hóa, danh thắng tiêu biểu thu hút đông đảo du khách thập phương.`,
    culturalSignificance: landmark.tagline || `Biểu tượng văn hóa và du lịch nổi tiếng của ${landmark.cityName}.`,
    interestingFacts: [
      `Cảnh sắc độc đáo của ${landmark.landmarkName} được chọn làm bức ảnh nền tiêu biểu của hệ thống.`,
      `Địa điểm sở hữu vị trí địa lý đắc địa và không gian thiên nhiên hài hòa.`,
      `Là điểm check-in và lưu giữ ký ức khó quên của mọi hành trình khám phá Việt Nam.`
    ],
    conservationStatus: 'Được quản lý và bảo vệ cảnh quan nghiêm ngặt.',
    imageUrl: landmark.imageUrl,
    verifiedStatus: 'verified',
    verifiedNote: 'Tư liệu văn hóa và du lịch chính thống.',
    lat: landmark.lat,
    lng: landmark.lng,
    address: `${landmark.landmarkName}, ${landmark.cityName}, ${landmark.province}`,
    visitingHours: 'Mở cửa tham quan hàng ngày',
    ticketPrice: 'Xem chi tiết tại điểm đến',
    googleMapsUri: `https://maps.google.com/?q=${encodeURIComponent(landmark.landmarkName + ' ' + landmark.cityName)}`,
    tags: [landmark.cityName, landmark.province, 'Di sản', 'Việt Nam'],
    suggestedQuestions: [
      `Những nét độc đáo nhất tại ${landmark.landmarkName} là gì?`,
      `Hướng dẫn đường đi và lịch trình tham quan ${landmark.cityName}?`
    ]
  };
}
