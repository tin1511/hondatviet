import fs from 'fs';
import { VIETNAM_PROVINCES } from './src/data/vietnamProvincesData';

const raw = fs.readFileSync('public/data/vietnam-provinces.geojson', 'utf8');
const oldGeo = JSON.parse(raw);

const mapping: Record<string, string[]> = {
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

const newFeatures: any[] = [];

VIETNAM_PROVINCES.forEach(prov => {
  const keywords = mapping[prov.id] || [prov.name];
  
  const matchedFeatures = oldGeo.features.filter((f: any) => {
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
      const allCoords: any[] = [];
      matchedFeatures.forEach((mf: any) => {
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
        vietnameseName: prov.name.split('(')[0].trim(),
        fullName: prov.name,
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
        vietnameseName: prov.name.split('(')[0].trim(),
        fullName: prov.name,
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
console.log('Successfully generated 34 provinces GeoJSON with total features:', newFeatures.length);
