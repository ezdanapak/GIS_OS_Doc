# ღრუბლოვანი გამოთვლების მოდელები GIS-ში
### სასაუბრო მასალა სტუდენტებისთვის

---

## 🎯 რომელ სფეროს მიეკუთვნება?

ეს თემა კვეთაზეა რამდენიმე დისციპლინისა:

| სფერო | კავშირი თემასთან |
|---|---|
| **Cloud Computing** | ბაზისური ტექნოლოგიური სფერო — SaaS, PaaS, IaaS, FaaS მოდელები |
| **GIS / გეოინფორმატიკა** | სივრცითი მონაცემების შენახვა, დამუშავება და გამოქვეყნება ღრუბელში |
| **DevOps / SysAdmin** | ინფრასტრუქტურის მართვა, სერვერები, კონტეინერიზაცია |
| **Software Engineering** | Web-GIS აპლიკაციებისა და API-ების დეველოპმენტი |
| **Data Engineering** | დიდი სივრცითი მონაცემების (DTM, Lidar, ორთოფოტო) პაიპლაინები |

**მოკლედ:** ეს არის **Cloud GIS / GeoIT** — გეოინფორმატიკისა და ღრუბლოვანი ინფრასტრუქტურის გადაკვეთა.

---

## 👨‍💻 რომელ პროფესიას მიეკუთვნება?

| პროფესია | რას აკეთებს ამ კონტექსტში |
|---|---|
| **GIS Developer / Engineer** | აწყობს Web-GIS-ს, PostGIS + GeoServer + tile server-ს ღრუბელში |
| **Cloud / DevOps Engineer** | მართავს IaaS/PaaS ინფრასტრუქტურას, კონტეინერებს, CI/CD-ს |
| **Geospatial Data Engineer** | ქმნის serverless პაიპლაინებს (FaaS) მონაცემთა კონვერტაცია/ტაილინგისთვის |
| **Solutions Architect** | ირჩევს სწორ მოდელს (SaaS vs IaaS) კონკრეტული ამოცანისთვის |
| **GIS Analyst** | იყენებს მზა SaaS ინსტრუმენტებს (ArcGIS Online, Carto) ანალიზისთვის |

---

## ☁️ პასუხისმგებლობის გადანაწილება

მოდელები განსხვავდება იმით, თუ რას მართავს **მომხმარებელი** და რას — **პროვაიდერი**:

```
On-Premise → IaaS → PaaS → FaaS → SaaS
   მეტი კონტროლი ────────────► ნაკლები კონტროლი
   ნაკლები მოხერხებულობა ─────► მეტი მოხერხებულობა
```

---

## 📦 მოდელები დეტალურად

### 1. SaaS (Software as a Service)
**რა არის:** მზა ვებ-ინსტრუმენტები, სერვერის ადმინისტრირების გარეშე.

- **პროპრიეტარული:** ArcGIS Online, Mapbox Studio, Carto
- **🟢 Open-source ალტერნატივები:** **QGIS Cloud**, **GeoNode**, **Kepler.gl**, **uMap** (OpenStreetMap-ზე), **Felt**-ის ალტერნატივა GeoNode-ით
- **როდის:** როცა გჭირდება რუკების სწრაფად გამოქვეყნება, დეშბორდები ან მარტივი ანალიტიკა

### 2. IaaS (Infrastructure as a Service)
**რა არის:** ვირტუალური სერვერები, საცავი, ქსელი — სრული კონტროლი OS-სა და პროგრამებზე.

- **პლატფორმა:** AWS EC2/S3, GCP, Azure VM (ან თვითჰოსტინგი — Fedora/Ubuntu სერვერი)
- **🟢 Open-source GIS სტეკი VM-ზე:**
  - **მონაცემთა ბაზა:** PostGIS (PostgreSQL)
  - **სერვერი:** GeoServer, QGIS Server, MapServer, pygeoapi
  - **ტაილები:** Martin, TileServer GL, MapProxy, pg_tileserv
  - **ფრონტენდი:** OpenLayers, Leaflet, MapLibre GL
  - **კონტეინერი:** Docker / Podman
  - **Reverse proxy:** Caddy, Nginx
- **როდის:** საკუთარი Web-GIS ინფრასტრუქტურა, დიდი მონაცემები (DTM, ორთოფოტო, Lidar)

### 3. PaaS (Platform as a Service)
**რა არის:** პლატფორმა დეველოპერებისთვის — ინფრასტრუქტურას მართავს პროვაიდერი, შენ მხოლოდ კოდსა და მონაცემებს ტვირთავ.

- **პროპრიეტარული:** Google Earth Engine, Firebase/Heroku GIS API
- **🟢 Open-source ალტერნატივები:** **Sentinel Hub / openEO** (open API), **STAC** კატალოგები, **TiTiler** (Cloud-Optimized GeoTIFF-ისთვის), **Dask / Datacube** დისტანციური ზონდირებისთვის
- **როდის:** გლობალური Remote Sensing ანალიზი, custom Web-GIS API დეველოპმენტი

### 4. FaaS (Function as a Service / Serverless)
**რა არის:** პატარა ფუნქციები, რომლებიც მხოლოდ გაშვებისას სრულდება.

- **პლატფორმა:** AWS Lambda, Azure Functions
- **🟢 Open-source serverless:** **OpenFaaS**, **Knative**, **Apache OpenWhisk** — მასზე გაშვებული **GDAL/OGR** კონვერტაცია, **Fiona/Shapely/GeoPandas** დამუშავება, **Rasterio** რასტრებისთვის
- **როდის:** ავტომატიზაცია — ფაილის ატვირთვისას კონვერტაცია (GDAL), ტაილების გენერაცია, გეოკოდირება (Nominatim, Pelias)

### 5. On-Premise
**რა არის:** ტრადიციული ლოკალური ინფრასტრუქტურა.

- **🟢 სრული open-source სტეკი:** QGIS Desktop + PostGIS + GeoServer + GeoNetwork (მეტამონაცემები) + pgAdmin — ყველაფერი ლიცენზიის გადასახადის გარეშე
- **როდის:** სახელმწიფო უწყებებში, სადაც უსაფრთხოების მკაცრი რეგულაციებია და მონაცემი ღრუბელში ვერ გავა (მაგ. NSDI ტიპის გეopორტალები)

---

## ⚖️ რომელი სჯობს?

| მიზანი | საუკეთესო არჩევანი |
|---|---|
| მსუბუქი ვებ-რუკები, სწრაფი შედეგი | **SaaS** |
| მასშტაბური Web-GIS, საკუთარი GeoServer + PostGIS | **IaaS** |
| გლობალური RS ანალიზი კოდით | **PaaS** |
| ავტომატიზაცია, ტრიგერები | **FaaS** |
| მკაცრი უსაფრთხოება, ლოკალური მონაცემები | **On-Premise** |

---

## 🟢 Open-Source GIS ლექსიკონი (მთავარი სიტყვები საქმეში)

| ტერმინი | რა არის |
|---|---|
| **QGIS** | დესკტოპ GIS — ArcGIS-ის უფასო ალტერნატივა |
| **PostGIS** | სივრცითი გაფართოება PostgreSQL ბაზისთვის |
| **GeoServer** | სივრცითი მონაცემების სერვერი (WMS/WFS/WMTS) |
| **QGIS Server** | QGIS პროექტების პირდაპირ გამოქვეყნება ვებში |
| **MapServer** | კიდევ ერთი open-source map server (UMN) |
| **pygeoapi** | OGC API სტანდარტების Python სერვერი |
| **OpenLayers** | ძლიერი ვებ-რუკის ბიბლიოთეკა (JS) |
| **Leaflet** | მსუბუქი, მარტივი ვებ-რუკის ბიბლიოთეკა |
| **MapLibre GL** | ვექტორული ტაილების რენდერი (Mapbox GL-ის fork) |
| **GDAL/OGR** | სივრცითი მონაცემების კონვერტაციის "შვეიცარიული დანა" |
| **GeoPandas** | ვექტორული ანალიზი Python-ში (Pandas + geometry) |
| **Rasterio / Shapely / Fiona** | რასტრი / გეომეტრია / I/O Python-ში |
| **Martin / pg_tileserv** | ვექტორული ტაილების სერვერი პირდაპირ PostGIS-იდან |
| **MapProxy / TileServer GL** | ტაილების ქეშირება და მიწოდება |
| **GeoNode** | მზა Web-GIS პლატფორმა (CMS + GeoServer) |
| **GeoNetwork** | მეტამონაცემების კატალოგი (SDI-ისთვის) |
| **OpenStreetMap (OSM)** | ღია, უფასო მსოფლიო რუკის მონაცემები |
| **Nominatim / Pelias** | open-source გეოკოდირება |
| **STAC / COG / GeoParquet** | თანამედროვე ღია ფორმატები ღრუბლისთვის |
| **TiTiler** | დინამიური ტაილინგი COG-ებისთვის |
| **openEO / Sentinel Hub** | დისტანციური ზონდირების ღია API |
| **OpenFaaS / Knative** | open-source serverless პლატფორმები |
| **Docker / Podman** | კონტეინერიზაცია |
| **Caddy / Nginx** | ვებ-სერვერი და reverse proxy |

---

## 🌍 რეალური მაგალითები — რომელი მოდელია?

ერთი და იგივე რუკა სხვადასხვაგვარად რომ განათავსო, სხვადასხვა მოდელი გამოდის:

### 📍 მაგალითი 1: GitHub Pages-ზე მსუბუქი რუკა → **SaaS** (static hosting)

როცა Leaflet/OpenLayers-ის რუკას `index.html`-ით GitHub Pages-ზე დებ:

- GitHub ჰოსტავს შენს **სტატიკურ ფაილებს** — შენ სერვერს არ მართავ
- backend არ გაქვს, ბაზა არ გაქვს — მხოლოდ HTML/JS/CSS + GeoJSON
- GitHub Pages თავად მზა სერვისია, შენი რუკა კი მასზე განთავსებული static web app

> **მაგალითი:** `ezdanapak.github.io/my-map` — GeoJSON + Leaflet, მონაცემი პირდაპირ ფაილიდან.
> 🟢 Leaflet + GeoJSON/PMTiles + GitHub Pages = სრულიად უფასო, backend-ის გარეშე.

---

### 📍 მაგალითი 2: Vercel + GitHub ერთად → **PaaS** (+ FaaS)

აქ ორი რამ მუშაობს ერთად:

- **GitHub** = კოდის საცავი (source)
- **Vercel** = PaaS პლატფორმა, GitHub-ს უერთდება, ავტომატურად აშენებს (build) და ჰოსტავს

განსხვავება GitHub Pages-თან:

| | GitHub Pages | Vercel |
|---|---|---|
| სტატიკური ფაილები | ✅ | ✅ |
| Backend / API (serverless) | ❌ | ✅ |
| ავტომატური CI/CD (push → deploy) | ნაწილობრივ | ✅ სრული |
| დინამიური აპები (React + API) | ❌ | ✅ |

> ინფრასტრუქტურას (სერვერი, build, scaling) მართავს Vercel — შენ მხოლოდ კოდსა და მონაცემებს ტვირთავ. ეს **PaaS**-ის ზუსტი განმარტებაა.
> Vercel-ის serverless function ტექნიკურად **FaaS**-იც არის → Vercel = PaaS + FaaS.

---

### 📍 მაგალითი 3: საკუთარ ლეპტოპზე ჰოსტინგი → **On-Premise** (self-hosted)

როცა ლეპტოპზე უშვებ PostGIS + GeoServer + Martin + Caddy-ს Podman-ით:

- **მთელ სტეკს შენ მართავ** — OS, ბაზა, სერვერი, ქსელი, უსაფრთხოება
- არავითარი გარე პროვაიდერი — სუფთა self-hosted
- Cloudflare Tunnel-ით გარეთ გატანა **არ ცვლის ამას** — ინფრასტრუქტურა მაინც შენია, Cloudflare მხოლოდ "გვირაბს" აკეთებს

> **მაგალითი:** offline-first geoportal (`geoportal.local` via Avahi) — კლასიკური On-Premise, თუნდაც ლეპტოპი "სერვერის" როლში იყოს.
> განსხვავება IaaS-თან: IaaS-ზე ვირტუალურ მანქანას AWS-ისგან **ქირაობ**; On-Premise-ზე შენი **ფიზიკური ტექნიკაა**.

---

### 📊 შეჯამების ცხრილი

| მაგალითი | მოდელი | ვინ მართავს ინფრასტრუქტურას |
|---|---|---|
| GitHub Pages-ზე Leaflet რუკა | **SaaS** (static hosting) | GitHub |
| Vercel + GitHub (React + API) | **PaaS** (+ FaaS) | Vercel |
| ლეპტოპზე PostGIS + GeoServer | **On-Premise** / self-hosted | შენ თვითონ |
| AWS EC2-ზე იგივე სტეკი | **IaaS** | შენ (OS ზევით), AWS (ტექნიკა) |

---

## 💬 სასაუბრო კითხვები სტუდენტებისთვის

1. თუ სკოლას სჭირდება მარტივი ინტერაქტიული რუკა ვებგვერდზე — რომელ მოდელს ირჩევ და რატომ?
2. რატომ ვერ გავა სახელმწიფო კადასტრის მონაცემი ხშირად ღრუბელში?
3. რა განსხვავებაა PaaS-სა და IaaS-ს შორის GeoServer-ის განთავსების თვალსაზრისით?
4. ატვირთე shapefile და გინდა ავტომატურად გადაკეთდეს GeoJSON-ად — რომელი მოდელი გამოგადგება?
5. Google Earth Engine რომელ მოდელს მიეკუთვნება და რატომ?
