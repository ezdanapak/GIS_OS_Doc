# PyQGIS Class: QgsGeometry

## Introduction
`QgsGeometry` არის PyQGIS-ის მთავარი კლასი, რომელიც გამოიყენება გეომეტრიული ობიექტების (წერტილები, ხაზები, პოლიგონები და სხვა) შესანახად და დასამუშავებლად.  
ეს კლასი გვაძლევს საშუალებას შევქმნათ, გარდავქმნათ, შევადაროთ და დავაკავშიროთ გეომეტრიული ფორმები.

---

## Key Features
- **Geometry Creation** — წერტილების, ხაზებისა და პოლიგონების შექმნა.
- **Geometry Transformation** — გადაადგილება, ბუფერიზაცია, მარტივება.
- **Geometry Analysis** — შეჯახების შემოწმება, დაშორების გამოთვლა.
- **Geometry Export** — სხვა ფორმატებში გადატანა (WKT, WKB).

---

## Commonly Used Methods

### 1. Geometry Creation
```python
from qgis.core import QgsPointXY, QgsGeometry

# წერტილის გეომეტრია
point = QgsGeometry.fromPointXY(QgsPointXY(357965.61, 4683353.56))

# ხაზის გეომეტრია
line = QgsGeometry.fromPolylineXY([
    QgsPointXY(357965.61, 4683353.56),
    QgsPointXY(357970.20, 4683360.10)
])

# პოლიგონის გეომეტრია
polygon = QgsGeometry.fromPolygonXY([[
    QgsPointXY(357965.61, 4683353.56),
    QgsPointXY(357970.20, 4683360.10),
    QgsPointXY(357960.10, 4683365.50),
    QgsPointXY(357965.61, 4683353.56)
]])
```

---

### 2. Geometry Transformation
```python
# ბუფერის შექმნა (მაგ: 50 მეტრი)
buffer = point.buffer(50, 5)

# გეომეტრიის გადაადგილება
moved = point.translate(100, 200)

# გეომეტრიის გამარტივება
simplified = line.simplify(10)
```

---

### 3. Geometry Analysis
```python
# ორი გეომეტრიის გადაკვეთა
intersects = point.intersects(buffer)

# დაშორება ობიექტებს შორის
dist = point.distance(line)

# გეომეტრიის ფართობი (პოლიგონისთვის)
area = polygon.area()

# გეომეტრიის პერიმეტრი
length = line.length()
```

---

### 4. Geometry Export
```python
# WKT ფორმატში გადატანა
print(point.asWkt())

# JSON ფორმატში
print(polygon.asJson())

# ბინარული ფორმა (WKB)
wkb = line.asWkb()
```

---

## Example: Checking if a Point is Inside a Polygon
```python
point = QgsGeometry.fromPointXY(QgsPointXY(357965.61, 4683353.56))
polygon = QgsGeometry.fromPolygonXY([[
    QgsPointXY(357960, 4683350),
    QgsPointXY(357970, 4683350),
    QgsPointXY(357970, 4683360),
    QgsPointXY(357960, 4683360),
    QgsPointXY(357960, 4683350)
]])

if point.within(polygon):
    print("Point is inside polygon")
else:
    print("Point is outside polygon")
```

---

## Notes
- `QgsGeometry` მუშაობს ყველა ტიპის გეომეტრიაზე: **Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon**.
- ხშირად გამოიყენება სხვა კლასებთან ერთად: `QgsFeature`, `QgsVectorLayer`.
- სარგებლობს GEOS ბიბლიოთეკით გეომეტრიული ოპერაციებისთვის.

---

## Summary
`QgsGeometry` არის PyQGIS-ის ერთ-ერთი ყველაზე მნიშვნელოვანი კლასი.  
ის გვაძლევს ინსტრუმენტებს სივრცული მონაცემების შესაქმნელად, დასამუშავებლად და გასანალიზებლად.  
სტუდენტებისთვის აუცილებელია მისი პრაქტიკულად გამოყენება სხვადასხვა GIS ოპერაციებში.
