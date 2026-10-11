import urllib.request, re, urllib.parse

articles = [
    'Mỹ_Sơn',
    'Tràng_An_Scenic_Landscape_Complex',
    'Independence_Palace',
    'Thiên_Mụ_Pagoda',
    'Phong_Nha-Kẻ_Bàng_National_Park',
    'Cái_Răng_floating_market',
    'Da_Lat_railway_station',
    'Hạ_Long_Bay'
]

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for art in articles:
    url = f'https://en.wikipedia.org/wiki/{urllib.parse.quote(art)}'
    req = urllib.request.Request(url, headers=headers)
    try:
        html = urllib.request.urlopen(req, timeout=5).read().decode('utf-8')
        m = re.findall(r'//upload\.wikimedia\.org/wikipedia/commons/(?:thumb/)?([0-9a-f]/[0-9a-f]{2}/[^/\"\'\s]+?\.(?:jpg|jpeg|png))', html, re.IGNORECASE)
        filtered = [x for x in m if not any(w in x.lower() for w in ['icon', 'logo', 'flag', 'symbol', 'button', 'red_pencile'])]
        if filtered:
            print(f'{art} -> https://upload.wikimedia.org/wikipedia/commons/{filtered[0]}')
        else:
            print(f'{art} -> None')
    except Exception as e:
        print(f'{art} -> {e}')
