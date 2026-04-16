# QgsVectorLayer QGIS-ში

**QgsVectorLayer** არის PyQGIS-ის ერთ-ერთი ყველაზე მნიშვნელოვანი კლასი, რომელიც გამოიყენება ვექტორული მონაცემების ჩასატვირთად და სამართავად (მაგ. Shapefile, GeoPackage, PostGIS).

---

## 🔑 ძირითადი იდეა
QgsVectorLayer წარმოადგენს **ვექტორულ შრეს** (წერტილები, ხაზები, პოლიგონები), რომელსაც აქვს:
- **გეომეტრია** (სივრცითი მონაცემები)
- **ატრიბუტები** (ცხრილური მონაცემები)

ეს ობიექტი გვაძლევს საშუალებას: <br>
- ჩავტვირთოთ არსებული ფაილი <br>
- შევქმნათ ახალი შრე <br>
- წავიკითხოთ/დავამატოთ/ჩავწეროთ ობიექტები <br>
- ვმართოთ სიმბოლიკა და შრის სტილი <br>

---

## ▶️ QgsVectorLayer-ის შექმნა

```python
# არსებულ ვექტორულ ფაილთან დაკავშირება
fn = r"C:/Users/Public/Documents/GIS/shapefile/lake.shp"
layer = QgsVectorLayer(fn, "Lake Layer", "ogr")

if not layer.isValid():
    print("❌ შრის ჩატვირთვა ვერ მოხერხდა")
else:
    print("✅ შრე წარმატებით ჩაიტვირთა")
```

📌 აქ:
- `fn` = ფაილის მისამართი
- `"Lake Layer"` = სახელი QGIS-ში
- `"ogr"` = data provider (Shapefile, GeoJSON, GeoPackage და სხვ.)

---

## 🛠 შრის ტიპები

QgsVectorLayer შეიძლება იყოს: <br>
- **QgsWkbTypes.Point** → წერტილები <br>
- **QgsWkbTypes.LineString** → ხაზები <br>
- **QgsWkbTypes.Polygon** → პოლიგონები <br>

---

## 📋 ატრიბუტების წვდომა

```python
for feature in layer.getFeatures():
    geom = feature.geometry()
    attrs = feature.attributes()
    print("Geometry:", geom.asWkt())
    print("Attributes:", attrs)
```

---

## ➕ ახალი ობიექტის დამატება

```python
from qgis.PyQt.QtCore import QVariant

pr = layer.dataProvider()

# ახალი ატრიბუტების ველები
pr.addAttributes([QgsField("Name", QVariant.String),
                  QgsField("Value", QVariant.Double)])
layer.updateFields()

# ახალი ობიექტის შექმნა
feat = QgsFeature(layer.fields())
feat.setGeometry(QgsGeometry.fromPointXY(QgsPointXY(357965.61, 4683353.56)))
feat.setAttributes(["Lake1", 123.45])

pr.addFeature(feat)
layer.updateExtents()
```

---

## 💾 ახალი ვექტორული ფაილის შექმნა

```python
from qgis.core import QgsVectorFileWriter, QgsFields, QgsField, QgsWkbTypes, QgsCoordinateReferenceSystem

fn = r"C:/Users/Public/Documents/GIS/shapefile/new_layer.shp"
fields = QgsFields()
fields.append(QgsField("ID", QVariant.Int))
fields.append(QgsField("Name", QVariant.String))

writer = QgsVectorFileWriter(fn, "UTF-8", fields,
                             QgsWkbTypes.Point,
                             QgsCoordinateReferenceSystem("EPSG:32638"),
                             "ESRI Shapefile")

del writer
```

---

## 🔍 ფილტრაცია და Query

```python
expr = QgsExpression("Value > 100")
it = layer.getFeatures(QgsFeatureRequest(expr))

for f in it:
    print(f["Name"], f["Value"])
```

---

## 🎨 სიმბოლოები და ვიზუალიზაცია

```python
symbol = QgsSymbol.defaultSymbol(layer.geometryType())
symbol.setColor(QColor("blue"))
symbol.setSize(3)

layer.renderer().setSymbol(symbol)
layer.triggerRepaint()
```

---

## 📌 შეჯამება

- **QgsVectorLayer** არის ვექტორული მონაცემების ძირითადი ობიექტი PyQGIS-ში.
- შეგვიძლია:
  - ჩავტვირთოთ შრე
  - დავამატოთ ახალი ობიექტები
  - ვმართოთ ატრიბუტები
  - ჩავწეროთ ფაილად
  - შევცვალოთ სიმბოლოები

👉 ეს კლასი არის QGIS API-ის ერთ-ერთი ყველაზე გამოყენებადი ინსტრუმენტი GIS მონაცემების მართვისთვის.
