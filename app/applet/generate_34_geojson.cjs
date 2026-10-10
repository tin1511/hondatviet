const fs = require('fs');

// Read vietnamProvincesData.ts as text and parse or define the 34 provinces array directly
const provinces = [
  { id: 'hanoi', name: 'Hà Nội', region: 'north', lat: 21.0285, lng: 105.8542 },
  { id: 'laichau', name: 'Lai Châu', region: 'north', lat: 22.3995, lng: 103.4750 },
  { id: 'dienbien', name: 'Điện Biên', region: 'north', lat: 21.3845, lng: 103.0160 },
  { id: 'sonla', name: 'Sơn La', region: 'north', lat: 21.3273, lng: 103.9004 },
  { id: 'langson', name: 'Lạng Sơn', region: 'north', lat: 21.8523, lng: 106.7570 },
  { id: 'quangninh', name: 'Quảng Ninh', region: 'north', lat: 21.0069, lng: 107.2925 },
  { id: 'caobang', name: 'Cao Bằng', region: 'north', lat: 22.6654, lng: 106.2573 },
  { id: 'tuyenquang', name: 'Tuyên Quang', region: 'north', lat: 22.1557, lng: 105.1500 },
  { id: 'laocai', name: 'Lào Cai', region: 'north', lat: 22.2000, lng: 104.3000 },
  { id: 'thainguyen', name: 'Thái Nguyên', region: 'north', lat: 21.8000, lng: 105.8000 },
  { id: 'phutho', name: 'Phú Thọ', region: 'north', lat: 21.0500, lng: 105.3000 },
  { id: 'bacninh', name: 'Bắc Ninh', region: 'north', lat: 21.2500, lng: 106.1500 },
  { id: 'hungyen', name: 'Hưng Yên', region: 'north', lat: 20.6500, lng: 106.0500 },
  { id: 'haiphong', name: 'Hải Phòng', region: 'north', lat: 20.8449, lng: 106.6881 },
  { id: 'ninhbinh', name: 'Ninh Bình', region: 'north', lat: 20.2539, lng: 105.9744 },
  { id: 'thanhoa', name: 'Thanh Hóa', region: 'central', lat: 19.8067, lng: 105.7852 },
  { id: 'nghean', name: 'Nghệ An', region: 'central', lat: 18.6796, lng: 105.6813 },
  { id: 'hatinh', name: 'Hà Tĩnh', region: 'central', lat: 18.3430, lng: 105.9056 },
  { id: 'quangtri', name: 'Quảng Trị', region: 'central', lat: 16.7523, lng: 107.1994 },
  { id: 'hue', name: 'Huế', region: 'central', lat: 16.4637, lng: 107.5909 },
  { id: 'quangnam', name: 'Đà Nẵng (Hợp nhất Đà Nẵng & Quảng Nam)', region: 'central', lat: 16.0544, lng: 108.2022 },
  { id: 'quangngai', name: 'Quảng Ngãi', region: 'central', lat: 15.1214, lng: 108.8048 },
  { id: 'gialai', name: 'Gia Lai', region: 'central', lat: 13.9838, lng: 108.0000 },
  { id: 'khanhhoa', name: 'Khánh Hòa', region: 'central', lat: 12.2388, lng: 109.1967 },
  { id: 'daklak', name: 'Đắk Lắk', region: 'central', lat: 12.6667, lng: 108.0500 },
  { id: 'lamdong', name: 'Lâm Đồng', region: 'central', lat: 11.5500, lng: 107.8000 },
  { id: 'tphcm', name: 'Thành phố Hồ Chí Minh', region: 'south', lat: 10.7769, lng: 106.7009 },
  { id: 'dongnai', name: 'Đồng Nai', region: 'south', lat: 11.2000, lng: 107.0000 },
  { id: 'tayninh', name: 'Tây Ninh', region: 'south', lat: 11.0000, lng: 106.1000 },
  { id: 'cantho', name: 'Cần Thơ', region: 'south', lat: 10.0452, lng: 105.7469 },
  { id: 'vinhlong', name: 'Vĩnh Long', region: 'south', lat: 10.1000, lng: 106.2000 },
  { id: 'dongthap', name: 'Đồng Tháp', region: 'south', lat: 10.4000, lng: 105.9000 },
  { id: 'angiang', name: 'An Giang', region: 'south', lat: 10.2000, lng: 104.8000 },
  { id: 'camau', name: 'Cà Mau', region: 'south', lat: 9.2000, lng: 105.4000 }
];

const raw = fs.readFileSync('public/data/vietnam-provinces.geojson', 'utf8');
const oldGeo = JSON.parse(raw);

const mapping = {
  hanoi: ['Ha Noi city', 'Hà Nội'],
  laichau: ['Lai Chau', 'Lai Châu'],
  dienbien: ['Dien Bien', 'Điện Biên'],
  sonla: ['Son La', 'Sơn La'],
  langson: ['Lang Son', 'Lạng Sơn'],
  quangninh: ['Quang Ninh', 'Quảng Ninh'],
  caobang: ['Cao Bang', 'Cao Bằng'],
  tuyenquang: ['Ha Giang', 'Tuyen Quang', 'Hà Giang', 'Tuyên Quang'],
  laocai: ['Lao Cai', 'Yen Bai', 'Lào Cai', 'Yên Bái'],
  thainguyen: ['Thai Nguyen', 'Bac Kan', 'Thái Nguyên', 'Bắc Kạn'],
  phutho: ['Phu Tho', 'Vinh Phuc', 'Hoa Binh', 'Phú Thọ', 'Vĩnh Phúc', 'Hòa Bình'],
  bacninh: ['Bac Ninh', 'Bac Giang', 'Bắc Ninh', 'Bắc Giang'],
  hungyen: ['Hung Yen', 'Thai Binh', 'Hưng Yên', 'Thái Bình'],
  haiphong: ['Hai Phong city', 'Hai Duong', 'Hải Phòng', 'Hải Dương'],
  ninhbinh: ['Ninh Binh', 'Nam Dinh', 'Ha Nam', 'Ninh Bình', 'Nam Định', 'Hà Nam'],
  thanhoa: ['Thanh Hoa', 'Thanh Hóa'],
  nghean: ['Nghe An', 'Nghệ An'],
  hatinh: ['Ha Tinh', 'Hà Tĩnh'],
  quangtri: ['Quang Binh', 'Quang Tri', 'Quảng Bình', 'Quảng Trị'],
  hue: ['Thua Thien - Hue', 'Thừa Thiên Huế'],
  quangnam: ['Quang Nam', 'Da Nang', 'Quảng Nam', 'Đà Nẵng'],
  quangngai: ['Quang Ngai', 'Kon Tum', 'Quảng Ngãi'],
  gialai: ['Gia Lai', 'Binh Dinh', 'Bình Định'],
  khanhhoa: ['Khanh Hoa', 'Ninh Thuan', 'Khánh Hòa', 'Ninh Thuận'],
  daklak: ['Dak Lak', 'Phu Yen', 'Đắk Lắk', 'Phú Yên'],
  lamdong: ['Lam Dong', 'Dak Nong', 'Binh Thuan', 'Lâm Đồng', 'Đắk Nông', 'Bình Thuận'],
  tphcm: ['Ho Chi Minh city', 'Binh Duong', 'Ba Ria - Vung Tau', 'TP. Hồ Chí Minh', 'Bình Dương', 'Bà Rịa - Vũng Tàu'],
  dongnai: ['Dong Nai', 'Binh Phuoc', 'Đồng Nai', 'Bình Phước'],
  tayninh: ['Tay Ninh', 'Long An', 'Tây Ninh', 'Long An'],
  cantho: ['Can Tho city', 'Hau Giang', 'Soc Trang', 'Cần Thơ', 'Hậu Giang', 'Sóc Trăng'],
  vinhlong: ['Vinh Long', 'Tra Vinh', 'Ben Tre', 'Vĩnh Long', 'Trà Vinh', 'Bến Tre'],
  dongthap: ['Dong Thap', 'Tien Giang', 'Đồng Tháp', 'Tiền Giang'],
  angiang: ['An Giang', 'Kien Giang'],
  camau: ['Ca Mau', 'Bac Lieu', 'Cà Mau', 'Bạc Liêu']
};

const newFeatures = [];

provinces.forEach(prov => {
  const keywords = mapping[prov.id] || [prov.name];
  
  const matchedFeatures = oldGeo.features.filter(f => {
    const name = f.properties.Name || '';
    const vnName = f.properties.vietnameseName || '';
    return keywords.some(kw => 
      name.toLowerCase().includes(kw.toLowerCase()) || 
      vnName.toLowerCase().includes(kw.toLowerCase()) ||
      kw.toLowerCase().includes(name.toLowerCase()) ||
      kw.toLowerCase().includes(vnName.toLowerCase())
    );
  });

  if (matchedFeatures.length > 0) {
    const primary = matchedFeatures[0];
    let coordinates = primary.geometry.coordinates;
    let type = primary.geometry.type;

    if (matchedFeatures.length > 1) {
      const allCoords = [];
      matchedFeatures.forEach(mf => {
        if (mf.geometry.type === 'Polygon') {
          allCoords.push(mf.geometry.coordinates);
          type = 'MultiPolygon';
        } else if (mf.geometry.type === 'MultiPolygon') {
          allCoords.push(...mf.geometry.coordinates);
          type = 'MultiPolygon';
        }
      });
      if (allCoords.length > 0 && type === 'MultiPolygon') {
        coordinates = allCoords;
      }
    }

    newFeatures.push({
      type: 'Feature',
      properties: {
        Name: prov.id,
        vietnameseName: prov.name,
        region: prov.region,
        center: [prov.lat, prov.lng]
      },
      geometry: {
        type: type,
        coordinates: coordinates
      }
    });
  } else {
    newFeatures.push({
      type: 'Feature',
      properties: {
        Name: prov.id,
        vietnameseName: prov.name,
        region: prov.region,
        center: [prov.lat, prov.lng]
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[[prov.lng, prov.lat], [prov.lng + 0.1, prov.lat], [prov.lng + 0.1, prov.lat + 0.1], [prov.lng, prov.lat + 0.1], [prov.lng, prov.lat]]]
      }
    });
  }
});

const newGeoJSON = {
  type: 'FeatureCollection',
  features: newFeatures
};

fs.writeFileSync('public/data/vietnam-provinces.geojson', JSON.stringify(newGeoJSON, null, 2), 'utf8');
console.log('Successfully generated 34 provinces GeoJSON! Total features:', newFeatures.length);
