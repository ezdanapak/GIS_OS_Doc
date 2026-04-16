# WKT და WKB — სრული განმარტება

> **OGC სტანდარტი | გეომეტრიის კოდირება | GIS | PostGIS | PyQGIS**

**WKT** და **WKB** — გეომეტრიის **სერიალიზაციის** ორი სტანდარტი. ორივე OGC-ის (Open Geospatial Consortium) მიერ განსაზღვრული ფორმატია, რომელიც გეომეტრიულ ფიგურებს (წერტილი, ხაზი, პოლიგონი...) **ერთგვაროვნად** წარმოადგენს — ენისა და პლატფორმის მიუხედავად.

---

## 📋 შინაარსი

1. [ძირითადი განმარტება](#ძირითადი-განმარტება)
2. [WKT — Well-Known Text](#wkt--well-known-text)
3. [WKB — Well-Known Binary](#wkb--well-known-binary)
4. [მსგავსება და განსხვავება](#მსგავსება-და-განსხვავება)
5. [გეომეტრიის ტიპები](#გეომეტრიის-ტიპები)
6. [3D და M ვარიანტები](#3d-და-m-ვარიანტები)
7. [EWKT და EWKB — PostGIS გაფართოება](#ewkt-და-ewkb--postgis-გაფართოება)
8. [გამოყენება PostGIS-ში](#გამოყენება-postgis-ში)
9. [გამოყენება PyQGIS-ში](#გამოყენება-pyqgis-ში)
10. [გამოყენება სხვა ტექნოლოგიებში](#გამოყენება-სხვა-ტექნოლოგიებში)
11. [OGC სტანდარტი](#ogc-სტანდარტი)
12. [შედარებითი ცხრილი](#შედარებითი-ცხრილი)

---

## 🔑 ძირითადი განმარტება

```
გეომეტრია (მეხსიერებაში)
         │
         ├──→  WKT  →  "POINT (41.69 44.83)"          ← ადამიანი კითხულობს
         │
         └──→  WKB  →  0101000000...3D0A57404048F340   ← კომპიუტერი კითხულობს
```

| | **WKT** | **WKB** |
|--|---------|---------|
| სრული სახელი | Well-Known Text | Well-Known Binary |
| ფორმატი | ტექსტი (ASCII / UTF-8) | ორობითი (bytes) |
| კითხვადობა | ✅ ადამიანისთვის | ❌ ადამიანისთვის |
| ზომა | დიდი | მცირე (≈ 2-3x) |
| სიჩქარე | ნელი (parsing) | სწრაფი (direct read) |
| სტანდარტი | OGC SFA | OGC SFA |

---

## 📝 WKT — Well-Known Text

**WKT** არის **ტექსტური** ფორმატი გეომეტრიის გამოსახატავად. ადამიანისთვის კითხვადი, გამართვისა და დოკუმენტაციისთვის იდეალური.

### WKT სინტაქსი

```
გეომეტრიის_ტიპი (კოორდინატები)
```

### მარტივი მაგალითები

```
POINT (44.8015 41.6938)
```

```
LINESTRING (44.80 41.69, 44.81 41.70, 44.82 41.68)
```

```
POLYGON ((44.79 41.69, 44.82 41.69, 44.82 41.71, 44.79 41.71, 44.79 41.69))
```

> 💡 **კოორდინატების თანმიმდევრობა:** WKT-ში კოორდინატები **`X Y`** თანმიმდევრობითაა — გეოგრაფიულ სისტემებში X=**lon**, Y=**lat**.

### WKT-ის სტრუქტურა

```
POLYGON (
    (
        44.79 41.69,    ← გარე კონტური (exterior ring) — სავალდებულო
        44.82 41.69,
        44.82 41.71,
        44.79 41.71,
        44.79 41.69     ← პირველი = ბოლო (დახურული)
    ),
    (
        44.80 41.695,   ← შიდა კონტური (interior ring / hole) — სურვილისამებრ
        44.81 41.695,
        44.81 41.705,
        44.80 41.695
    )
)
```

---

## 💾 WKB — Well-Known Binary

**WKB** არის **ორობითი** ფორმატი — იგივე გეომეტრია, მაგრამ **bytes-ის სახით**. კომპიუტერი პირდაპირ კითხულობს, parsing საჭირო არ არის.

### WKB სტრუქტურა

```
┌──────────┬──────────────┬──────────────────────────────────────┐
│  1 byte  │   4 bytes    │           N bytes                    │
│  byte    │   geometry   │           coordinates                │
│  order   │   type       │           (8 bytes per ordinate)     │
├──────────┼──────────────┼──────────────────────────────────────┤
│  01      │  01000000    │  000000000000F040  000000000048F340  │
│  (LE)    │  (Point=1)   │  X = 44.8015       Y = 41.6938      │
└──────────┴──────────────┴──────────────────────────────────────┘
```

### Byte Order (Endianness)

```
01 → Little-Endian (LE) — Intel/AMD x86 — ყველაზე გავრცელებული
00 → Big-Endian (BE)    — Network byte order, SPARC
```

### WKB ჰექსადეციმალური სახით (HEX-WKB)

WKB ხშირად **ჰექსადეციმალური სტრიქონის** სახით გამოიყენება ბაზებსა და API-ებში:

```
Point (44.8015, 41.6938) WKB Hex:
0101000000713D0A57404046403D0A573D0A4846 40

ნაწილები:
01         → byte order (Little-Endian)
01000000   → geometry type (Point = 1)
713D0A5740404640 → X = 44.8015 (IEEE 754 double)
3D0A573D0A484640 → Y = 41.6938 (IEEE 754 double)
```

### WKB Geometry Type კოდები

```
1  → Point
2  → LineString
3  → Polygon
4  → MultiPoint
5  → MultiLineString
6  → MultiPolygon
7  → GeometryCollection

1001 → PointZ
1002 → LineStringZ
1003 → PolygonZ
2001 → PointM
3001 → PointZM
```

---

## 🔄 მსგავსება და განსხვავება

### მსგავსება

```
✅ ორივე OGC SFA (Simple Features Access) სტანდარტია
✅ ორივე ერთი და იგივე გეომეტრიის ტიპებს წარმოადგენს
✅ ორივე reversible — WKT → WKB → WKT (ინფორმაციის დაკარგვის გარეშე)
✅ ორივე მხარს უჭერს 2D, 3D (Z), M და ZM გეომეტრიებს
✅ ორივე CRS-დამოუკიდებელია (CRS ინფო EWKT/EWKB-ში)
```

### განსხვავება — სიღრმისეული

```
┌─────────────────────┬──────────────────────┬──────────────────────┐
│ კრიტერიუმი          │ WKT                  │ WKB                  │
├─────────────────────┼──────────────────────┼──────────────────────┤
│ ფორმატი             │ ASCII სტრიქონი       │ bytes / hex სტრიქონი │
│ ზომა (Point)        │ ~25 სიმბოლო          │ 21 byte               │
│ ზომა (Polygon 100p) │ ~2,500 სიმბოლო      │ ~826 byte             │
│ კომპრესია           │ ≈1x (ბაზისი)         │ ≈2-3x პატარა         │
│ Parsing სიჩქარე     │ ნელი (string parse)  │ სწრაფი (direct copy) │
│ კითხვადობა         │ ✅ ადამიანი კითხულობს │ ❌ hex/bytes          │
│ Debug/განმარტება    │ ✅ იდეალური          │ ❌ ძნელი              │
│ DB შენახვა          │ TEXT სვეტი           │ BYTEA / geometry      │
│ Network Transfer    │ JSON/XML API-ებში    │ PostGIS-ის native     │
│ SQL-ში წაკითხვა     │ ST_AsText()          │ ST_AsBinary()         │
│ SQL-ში ჩაწერა       │ ST_GeomFromText()    │ ST_GeomFromWKB()      │
└─────────────────────┴──────────────────────┴──────────────────────┘
```

### ზომის შედარება — რეალური მაგალითი

```python
# Point (44.8015, 41.6938)

WKT:  "POINT (44.8015 41.6938)"         → 23 სიმბოლო = 23 byte
WKB:  0101000000...                     → 21 byte
      (header 5 + X 8 + Y 8 = 21)

# Polygon — 1000 წერტილი
WKT:  ≈ 22,000 byte
WKB:  ≈  8,017 byte   (≈ 2.7x პატარა)
```

---

## 📐 გეომეტრიის ტიპები

### ყველა ტიპი WKT სახით

```sql
-- წერტილი
POINT (44.80 41.69)

-- ხაზი
LINESTRING (44.79 41.69, 44.82 41.70, 44.85 41.68)

-- პოლიგონი (ხვრელის გარეშე)
POLYGON ((44.79 41.69, 44.82 41.69, 44.82 41.71, 44.79 41.71, 44.79 41.69))

-- პოლიგონი ხვრელით (hole)
POLYGON (
    (44.79 41.69, 44.83 41.69, 44.83 41.72, 44.79 41.72, 44.79 41.69),
    (44.80 41.70, 44.82 41.70, 44.82 41.71, 44.80 41.71, 44.80 41.70)
)

-- მრავალი წერტილი
MULTIPOINT ((44.80 41.69), (44.81 41.70), (44.82 41.68))

-- მრავალი ხაზი
MULTILINESTRING (
    (44.79 41.69, 44.82 41.70),
    (44.83 41.68, 44.85 41.71)
)

-- მრავალი პოლიგონი
MULTIPOLYGON (
    ((44.79 41.69, 44.81 41.69, 44.81 41.71, 44.79 41.69)),
    ((44.82 41.70, 44.84 41.70, 44.84 41.72, 44.82 41.70))
)

-- შერეული კოლექცია
GEOMETRYCOLLECTION (
    POINT (44.80 41.69),
    LINESTRING (44.79 41.69, 44.82 41.70),
    POLYGON ((44.83 41.68, 44.85 41.68, 44.85 41.70, 44.83 41.68))
)

-- ცარიელი გეომეტრია
POINT EMPTY
LINESTRING EMPTY
POLYGON EMPTY
```

---

## 🌐 3D და M ვარიანტები

WKT/WKB მხარს უჭერს **Z** (სიმაღლე) და **M** (საზომი) კოორდინატებს:

### Z — სიმაღლე (3D)

```sql
POINT Z (44.80 41.69 520.5)
--                    ↑ სიმაღლე მეტრებში

LINESTRING Z (44.79 41.69 400, 44.82 41.70 450, 44.85 41.68 380)

POLYGON Z ((44.79 41.69 300, 44.82 41.69 300, 44.82 41.71 300, 44.79 41.71 300, 44.79 41.69 300))
```

### M — საზომი (Measure)

```sql
POINT M (44.80 41.69 125.5)
--                    ↑ საზომი (მაგ. მილსადენის km, დროის ღირებულება)

LINESTRING M (44.79 41.69 0, 44.82 41.70 5.2, 44.85 41.68 10.8)
--                          ↑ კm პიკეტაჟი
```

### ZM — სიმაღლე + საზომი

```sql
POINT ZM (44.80 41.69 520.5 125.5)
--                    ↑Z    ↑M

LINESTRING ZM (44.79 41.69 400 0, 44.82 41.70 450 5.2)
```

> 💡 **გამოყენება საქართველოში:** მილსადენის GIS-ში `M` — **კm პიკეტაჟი**, `Z` — **სიმაღლე ზღვის დონიდან**. ეს ორივე ერთ გეომეტრიაში (ZM) შეიძლება შეინახოს.

---

## 🐘 EWKT და EWKB — PostGIS გაფართოება

**EWKT** (Extended WKT) და **EWKB** (Extended WKB) — PostGIS-ის **გაფართოება**, რომელიც OGC სტანდარტს **SRID** (CRS) ინფორმაციას უმატებს.

### EWKT — SRID-ით

```sql
-- SRID=32638 → WGS84 / UTM Zone 38N
SRID=32638;POINT (490230.0 4741850.0)

SRID=4326;POINT (44.8015 41.6938)

SRID=32638;LINESTRING (490230 4741850, 491000 4742000, 491500 4741700)

SRID=4326;POLYGON ((44.79 41.69, 44.82 41.69, 44.82 41.71, 44.79 41.71, 44.79 41.69))
```

### EWKB — SRID-ით (ჰექს)

```
EWKB-ში SRID ჩაშენებულია WKB header-ში (სპეციალური ფლაგით):

01           → byte order (LE)
01000020     → Point type + SRID flag (0x20000000)
E6100000     → SRID = 4326 (little-endian)
...          → კოორდინატები
```

### WKT vs EWKT

```sql
WKT:   POINT (44.8015 41.6938)
EWKT:  SRID=4326;POINT (44.8015 41.6938)
       ↑ SRID პირდაპირ ჩაწერილია
```

> ⚠️ **OGC vs PostGIS:** EWKT/EWKB **OGC სტანდარტი არ არის** — PostGIS-ის სპეციფიკური გაფართოებაა. სხვა სისტემებთან გაცვლისთვის — OGC WKT/WKB გამოიყენე.

---

## 🐘 გამოყენება PostGIS-ში

### WKT-ის ჩაწერა და წაკითხვა

```sql
-- ცხრილის შექმნა
CREATE TABLE pipeline_points (
    id      SERIAL PRIMARY KEY,
    name    VARCHAR(100),
    geom    GEOMETRY(POINT, 32638)
);

-- WKT-იდან ჩაწერა — ST_GeomFromText()
INSERT INTO pipeline_points (name, geom)
VALUES (
    'ტბა N1',
    ST_GeomFromText('POINT (490230.0 4741850.0)', 32638)
);

-- EWKT-იდან ჩაწერა — ST_GeomFromEWKT()
INSERT INTO pipeline_points (name, geom)
VALUES (
    'ტბა N2',
    ST_GeomFromEWKT('SRID=32638;POINT (491000.0 4742000.0)')
);

-- WKT-ად წაკითხვა — ST_AsText()
SELECT name, ST_AsText(geom) AS wkt
FROM pipeline_points;
-- → "POINT(490230 4741850)"

-- EWKT-ად წაკითხვა — ST_AsEWKT()
SELECT name, ST_AsEWKT(geom) AS ewkt
FROM pipeline_points;
-- → "SRID=32638;POINT(490230 4741850)"
```

### WKB-ის ჩაწერა და წაკითხვა

```sql
-- WKB-ად წაკითხვა (ჰექს) — ST_AsBinary() / ST_AsEWKB()
SELECT name,
       ST_AsBinary(geom)  AS wkb,    -- OGC WKB
       ST_AsEWKB(geom)    AS ewkb,   -- EWKB (SRID-ით)
       encode(ST_AsBinary(geom), 'hex') AS wkb_hex
FROM pipeline_points;

-- WKB hex-იდან ჩაწერა
INSERT INTO pipeline_points (name, geom)
VALUES (
    'ტბა N3',
    ST_GeomFromWKB(decode('0101000020E6100000...', 'hex'))
);
```

### სასარგებლო PostGIS ფუნქციები

```sql
-- ტიპი
SELECT ST_GeometryType(geom) FROM pipeline_points;  -- → "ST_Point"

-- SRID
SELECT ST_SRID(geom) FROM pipeline_points;           -- → 32638

-- ვალიდაცია
SELECT ST_IsValid(geom), ST_IsValidReason(geom) FROM pipeline_points;

-- WKT → GeoJSON
SELECT ST_AsGeoJSON(geom) FROM pipeline_points;

-- WKT კოორდინატების ამოღება
SELECT ST_X(geom), ST_Y(geom) FROM pipeline_points;  -- → 490230, 4741850

-- CRS გარდაქმნა WKT სახით
SELECT ST_AsText(
    ST_Transform(geom, 4326)
) FROM pipeline_points;
-- → "POINT(44.8015 41.6938)"
```

---

## 🐍 გამოყენება PyQGIS-ში

### WKT → QgsGeometry

```python
from qgis.core import QgsGeometry, QgsWkbTypes

# WKT-იდან გეომეტრიის შექმნა
geom_point = QgsGeometry.fromWkt("POINT (490230.0 4741850.0)")
geom_line  = QgsGeometry.fromWkt("LINESTRING (490230 4741850, 491000 4742000)")
geom_poly  = QgsGeometry.fromWkt(
    "POLYGON ((490000 4741000, 491000 4741000, 491000 4742000, 490000 4742000, 490000 4741000))"
)

# ვალიდაციის შემოწმება
print(geom_point.isValid())         # → True
print(geom_point.type())            # → QgsWkbTypes.PointGeometry
print(QgsWkbTypes.displayString(geom_point.wkbType()))  # → "Point"
```

### QgsGeometry → WKT

```python
# WKT-ად გარდაქმნა
wkt = geom_point.asWkt()
print(wkt)
# → "Point (490230 4741850)"

# სიზუსტის მითითებით
wkt_precise = geom_point.asWkt(precision=6)
print(wkt_precise)
# → "Point (490230.000000 4741850.000000)"
```

### WKB — QgsGeometry-ში

```python
# QgsGeometry → WKB (bytes)
wkb_bytes = geom_point.asWkb()
print(type(wkb_bytes))   # → <class 'QByteArray'>
print(bytes(wkb_bytes).hex())
# → "0101000000000000004046174100000040..."

# WKB → QgsGeometry
from qgis.core import QgsGeometry

wkb_hex = "0101000000713D0A574040464..."
geom_from_wkb = QgsGeometry()
geom_from_wkb.fromWkb(bytes.fromhex(wkb_hex))
```

### Feature-ის გეომეტრია WKT სახით

```python
layer = iface.activeLayer()

for feature in layer.getFeatures():
    geom = feature.geometry()

    # WKT
    print(f"ID {feature.id()}: {geom.asWkt()}")

    # ტიპი
    print(f"  ტიპი: {QgsWkbTypes.displayString(geom.wkbType())}")

    # ვალიდაცია
    if not geom.isValid():
        print(f"  ⚠️ გეომეტრია გატეხილია: {geom.lastError()}")
        fixed = geom.makeValid()
        print(f"  ✅ გასწორება: {fixed.asWkt()}")
```

### WKT-ის გამოყენება ახალი Feature-ისთვის

```python
from qgis.core import QgsFeature, QgsGeometry, QgsFields, QgsField
from PyQt5.QtCore import QVariant

# WKT-ის სიის Feature-ებად გარდაქმნა
wkt_list = [
    ("Pipeline KP 0",  "POINT ZM (490230 4741850 520 0)"),
    ("Pipeline KP 5",  "POINT ZM (491000 4742000 510 5)"),
    ("Pipeline KP 10", "POINT ZM (491500 4741700 505 10)"),
]

fields = QgsFields()
fields.append(QgsField('name', QVariant.String))
fields.append(QgsField('km',   QVariant.Double))

features = []
for name, wkt in wkt_list:
    feat = QgsFeature(fields)
    feat.setGeometry(QgsGeometry.fromWkt(wkt))
    feat['name'] = name
    features.append(feat)

print(f"✅ {len(features)} feature მომზადებულია")
```

---

## 🌍 გამოყენება სხვა ტექნოლოგიებში

### GeoJSON-თან შედარება

```
WKT:     POINT (44.80 41.69)
WKB:     0101000000...
GeoJSON: {"type": "Point", "coordinates": [44.80, 41.69]}
```

| | WKT | WKB | GeoJSON |
|--|-----|-----|---------|
| **კითხვადობა** | ✅ | ❌ | ✅ |
| **ზომა** | საშუალო | მცირე | დიდი |
| **Web API** | 🔶 | ❌ | ✅ |
| **DB შენახვა** | ✅ | ✅ (native) | 🔶 |
| **CRS** | ❌ (EWKT-ში ✅) | ❌ (EWKB-ში ✅) | ❌ (CRS84 default) |

### Shapefile (.shp)

```
Shapefile → WKB-ის მსგავსი binary ფორმატი, მაგრამ ESRI-სპეციფიკური.
PostGIS-ში: shp2pgsql → WKB-ად გარდაქმნა ავტომატურად.
```

### GML (Geography Markup Language)

```xml
<!-- GML — XML-ზე დაფუძნებული, OGC სტანდარტი -->
<gml:Point srsName="EPSG:4326">
    <gml:coordinates>44.80,41.69</gml:coordinates>
</gml:Point>
```

### KML (Google/OGC)

```xml
<Point>
    <coordinates>44.80,41.69,0</coordinates>
</Point>
```

### Python shapely ბიბლიოთეკა

```python
from shapely import wkt, wkb
from shapely.geometry import Point, LineString, Polygon

# WKT-იდან შექმნა
geom = wkt.loads("POINT (44.80 41.69)")

# WKT-ად გარდაქმნა
print(geom.wkt)           # → "POINT (44.8 41.69)"

# WKB-ად გარდაქმნა
wkb_bytes = wkb.dumps(geom)
print(wkb_bytes.hex())

# WKB-იდან შექმნა
geom2 = wkb.loads(wkb_bytes)
print(geom2.wkt)

# ოპერაციები WKT-ზე დაფუძნებით
poly = wkt.loads("POLYGON ((44.79 41.69, 44.82 41.69, 44.82 41.71, 44.79 41.71, 44.79 41.69))")
point_in = wkt.loads("POINT (44.80 41.70)")
point_out = wkt.loads("POINT (44.85 41.75)")

print(poly.contains(point_in))   # → True
print(poly.contains(point_out))  # → False
```

---

## 📜 OGC სტანდარტი

### SFA — Simple Features Access

**WKT** და **WKB** განსაზღვრულია OGC **Simple Features Access (SFA)** სტანდარტში:

```
OGC 06-103r4 — OpenGIS Implementation Standard
"Geographic information — Simple feature access — Part 1: Common architecture"

ISO 19125-1:2004 — Geographic information — Simple feature access
```

### სტანდარტის ევოლუცია

```
1999 → OGC SFA 1.0 — WKT/WKB პირველი ვარიანტი
2003 → OGC SFA 1.1 — Multi-გეომეტრიები
2006 → OGC SFA 1.2 — ISO 19125 ადაპტაცია, Z/M მხარდაჭერა
2011 → OGC SFA 1.2.1 — მიმდინარე სტანდარტი
```

### PostGIS-ის EWKT/EWKB — გაფართოებები

```
PostGIS შემოიტანა EWKT/EWKB:
  → SRID ჩაშენება გეომეტრიაში
  → ISO SQL/MM-ის ალტერნატივა

ISO SQL/MM (ISO 13249-3):
  → SQL-ში გეომეტრიის ტიპები
  → ST_ ფუნქციების სტანდარტი
  → PostGIS 1.5+ — სრული მხარდაჭერა
```

---

## 📊 შედარებითი ცხრილი

### WKT vs WKB — სრული შედარება

| კრიტერიუმი | WKT | WKB | EWKT | EWKB |
|-----------|-----|-----|------|------|
| **ფორმატი** | ASCII ტექსტი | binary/hex | ASCII ტექსტი | binary/hex |
| **SRID** | ❌ | ❌ | ✅ | ✅ |
| **კითხვადობა** | ✅ | ❌ | ✅ | ❌ |
| **ზომა** | დიდი | მცირე | დიდი | მცირე |
| **სიჩქარე** | ნელი | სწრაფი | ნელი | სწრაფი |
| **OGC სტანდარტი** | ✅ | ✅ | ❌ (PostGIS) | ❌ (PostGIS) |
| **PostGIS** | ✅ | ✅ | ✅ | ✅ |
| **PyQGIS** | ✅ | ✅ | ❌ | ❌ |
| **Shapely** | ✅ | ✅ | ❌ | ❌ |
| **GeoServer** | ✅ | ✅ | ✅ | ✅ |
| **Debug** | ✅ იდეალური | ❌ ძნელი | ✅ | ❌ |
| **3D (Z)** | ✅ | ✅ | ✅ | ✅ |
| **M** | ✅ | ✅ | ✅ | ✅ |

### გამოყენების არეალი

| სცენარი | რეკომენდებული |
|---------|--------------|
| PostGIS-ში ჩაწერა | EWKT ან EWKB |
| PostGIS-ის query debug | WKT (`ST_AsText()`) |
| PyQGIS-ში გეომეტრიის შექმნა | WKT (`fromWkt()`) |
| DB-ს ექსპორტი / გაცვლა | WKT ან GeoJSON |
| DB-ის native შენახვა | WKB (ავტომატური) |
| Web API | GeoJSON (WKT-ზე ნაკლებ გავრცელებული) |
| მილსადენი (Pipeline) GIS | EWKT ZM-ით (SRID + Z + M) |
| Log/დოკუმენტაცია | WKT |

---

## 📌 შეჯამება

```
WKT   → "POINT (44.80 41.69)"           ← კითხვადი, debug, API
WKB   → 0101000000...                   ← სწრაფი, DB native, compact
EWKT  → "SRID=4326;POINT (44.80 41.69)" ← PostGIS, CRS-ით
EWKB  → 0101000020E6100000...           ← PostGIS native შენახვა
```

- **WKT** — ადამიანი კითხულობს → გამოიყენე debug-ისთვის, დოკუმენტაციაში, API-ებში
- **WKB** — კომპიუტერი კითხულობს → DB-ის native ფორმატი, სწრაფი, კომპაქტური
- **EWKT/EWKB** — PostGIS-ის გაფართოება → SRID ჩაშენებული, **PostGIS-ში სტანდარტი**
- ორივე **OGC SFA** სტანდარტია — **ურთიერთგარდასაქმნელი** ინფორმაციის დაკარგვის გარეშე
- Z და M — **3D და საზომი** კოორდინატები ჩაშენებულია სტანდარტშივე

👉 PyQGIS-ში → **`fromWkt()` / `asWkt()`** | PostGIS-ში → **`ST_GeomFromText()` / `ST_AsText()`**

---

## 📚 გამოყენებული რესურსები

- [OGC Simple Features Access Standard](https://www.ogc.org/standards/sfa)
- [PostGIS — WKT/WKB Functions](https://postgis.net/docs/reference.html#Geometry_Inputs)
- [PyQGIS — QgsGeometry](https://qgis.org/pyqgis/master/core/QgsGeometry.html)
- [Shapely — WKT/WKB](https://shapely.readthedocs.io/en/stable/manual.html#well-known-formats)
- [EPSG Registry](https://epsg.io)