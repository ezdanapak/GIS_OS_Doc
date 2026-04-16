# QgsWkbTypes PyQGIS-ში

**QgsWkbTypes** არის PyQGIS-ის კლასი, რომელიც განსაზღვრავს **გეომეტრიის ტიპებს** — ანუ პასუხობს კითხვაზე: "ეს შრე წერტილებისგანაა, ხაზებისგან, თუ პოლიგონებისგან?"

---

## 🔑 ძირითადი იდეა

`QgsWkbTypes` შეიცავს **კონსტანტებს (enumerations)**, რომლებიც აღწერს გეომეტრიის ტიპს WKB (Well-Known Binary) ფორმატის მიხედვით.

ეს კლასი გამოიყენება:

- ახალი შრის ან ფაილის შექმნისას (`QgsVectorFileWriter`, `QgsMemoryLayer`)
- გეომეტრიის ტიპის შემოწმებისას
- ობიექტის გეომეტრიის განსაზღვრისას

---

## 📐 ძირითადი გეომეტრიის ტიპები

| კონსტანტი | მნიშვნელობა | გამოყენება |
|-----------|-------------|-----------|
| `QgsWkbTypes.Point` | წერტილი | სახლი, სადგური, სხვა ობიექტი |
| `QgsWkbTypes.LineString` | ხაზი | გზა, მდინარე, მილსადენი |
| `QgsWkbTypes.Polygon` | პოლიგონი | მიწის ნაკვეთი, ტბა, შენობა |
| `QgsWkbTypes.MultiPoint` | მრავალი წერტილი | ერთ ობიექტში მრავალი წერტილი |
| `QgsWkbTypes.MultiLineString` | მრავალი ხაზი | გზების ქსელი |
| `QgsWkbTypes.MultiPolygon` | მრავალი პოლიგონი | კუნძულები, ანკლავები |
| `QgsWkbTypes.NoGeometry` | გეომეტრია არ არის | მხოლოდ ატრიბუტების ცხრილი |
| `QgsWkbTypes.Unknown` | უცნობი ტიპი | განუსაზღვრელი |

---

## ▶️ გამოყენება — შრის შექმნისას

```python
from qgis.core import (
    QgsVectorFileWriter,
    QgsFields,
    QgsField,
    QgsWkbTypes,
    QgsCoordinateReferenceSystem
)
from PyQt5.QtCore import QVariant

fields = QgsFields()
fields.append(QgsField('ID',   QVariant.Int))
fields.append(QgsField('Name', QVariant.String))

# Point შრის შექმნა
writer = QgsVectorFileWriter(
    r'C:\GIS\points.shp',
    'UTF-8',
    fields,
    QgsWkbTypes.Point,                          # ← აქ
    QgsCoordinateReferenceSystem('EPSG:32638'),
    'ESRI Shapefile'
)
del writer
```

📌 `QgsWkbTypes.Point` — ეუბნება writer-ს, რომ ფაილში მხოლოდ წერტილები ჩაიწერება.

---

## 🔍 გეომეტრიის ტიპის შემოწმება

```python
layer = QgsVectorLayer(r'C:\GIS\roads.shp', 'Roads', 'ogr')

geom_type = layer.wkbType()
print(geom_type)  # → 2 (LineString)

# ადამიანის-წასაკითხი სახელი
type_name = QgsWkbTypes.displayString(geom_type)
print(type_name)  # → "LineString"
```

---

## 🛠 პრაქტიკული მეთოდები

### `QgsWkbTypes.geometryType(wkb_type)`

WKB ტიპს გარდაქმნის ზოგად კატეგორიად:

```python
from qgis.core import QgsWkbTypes

wkb = QgsWkbTypes.MultiPolygon

# კატეგორია
category = QgsWkbTypes.geometryType(wkb)
# → QgsWkbTypes.PolygonGeometry

# სახელი
print(QgsWkbTypes.displayString(wkb))
# → "MultiPolygon"
```

გეომეტრიის კატეგორიები:

| კატეგორია | WKB ტიპები |
|-----------|-----------|
| `PointGeometry` | Point, MultiPoint |
| `LineGeometry` | LineString, MultiLineString |
| `PolygonGeometry` | Polygon, MultiPolygon |
| `NullGeometry` | NoGeometry |

---

### `QgsWkbTypes.hasZ(wkb_type)` და `QgsWkbTypes.hasM(wkb_type)`

შეამოწმებს, ჰქვია თუ არა Z (სიმაღლე) ან M (საზომი) კოორდინატი:

```python
# PointZ — 3D წერტილი
wkb_3d = QgsWkbTypes.PointZ

print(QgsWkbTypes.hasZ(wkb_3d))  # → True
print(QgsWkbTypes.hasM(wkb_3d))  # → False
```

---

### `QgsWkbTypes.isSingleType()` და `QgsWkbTypes.isMultiType()`

```python
print(QgsWkbTypes.isSingleType(QgsWkbTypes.Point))        # → True
print(QgsWkbTypes.isMultiType(QgsWkbTypes.MultiPolygon))  # → True
```

---

## 🌐 Z და M ტიპები (3D და საზომი)

| ტიპი | აღწერა |
|------|--------|
| `QgsWkbTypes.PointZ` | 3D წერტილი (X, Y, Z) |
| `QgsWkbTypes.PointM` | საზომი წერტილი (X, Y, M) |
| `QgsWkbTypes.PointZM` | 3D + საზომი (X, Y, Z, M) |
| `QgsWkbTypes.LineStringZ` | 3D ხაზი |
| `QgsWkbTypes.PolygonZ` | 3D პოლიგონი |

```python
# 3D Point შრის შექმნა
writer = QgsVectorFileWriter(
    r'C:\GIS\points_3d.shp',
    'UTF-8',
    fields,
    QgsWkbTypes.PointZ,                         # ← Z კოორდინატი
    QgsCoordinateReferenceSystem('EPSG:32638'),
    'ESRI Shapefile'
)
del writer
```

---

## 📊 WKB რიცხვითი მნიშვნელობები

`QgsWkbTypes` კონსტანტები რეალურად **მთელი რიცხვებია** (OGC WKB სტანდარტი):

```python
print(int(QgsWkbTypes.Point))        # → 1
print(int(QgsWkbTypes.LineString))   # → 2
print(int(QgsWkbTypes.Polygon))      # → 3
print(int(QgsWkbTypes.MultiPoint))   # → 4
print(int(QgsWkbTypes.PointZ))       # → 1001
print(int(QgsWkbTypes.PointM))       # → 2001
print(int(QgsWkbTypes.PointZM))      # → 3001
```

---

## 📌 შეჯამება

- **`QgsWkbTypes`** განსაზღვრავს გეომეტრიის ტიპს PyQGIS-ში
- გამოიყენება `QgsVectorFileWriter`, `QgsMemoryLayer` და სხვა კლასებში
- მხარს უჭერს **2D**, **3D (Z)** და **M** ტიპებს
- `displayString()` გეომეტრიის სახელს სტრიქონად აბრუნებს
- `geometryType()` ზოგად კატეგორიად გარდაქმნის

👉 ყოველ ჯერზე, როდესაც ახალ შრეს ქმნი ან გეომეტრიის ტიპს ამოწმებ — `QgsWkbTypes` შენი პირველი ინსტრუმენტია.