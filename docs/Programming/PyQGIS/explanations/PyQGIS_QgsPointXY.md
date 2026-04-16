# QgsPointXY PyQGIS-ში

## ℹ️ ზოგადი აღწერა
**QgsPointXY** არის მარტივი ობიექტი, რომელიც წარმოადგენს წერტილს (X,Y კოორდინატებით).  
იგი გამოიყენება გეომეტრიული ობიექტების (მაგ. `QgsGeometry`) შესაქმნელად და სხვადასხვა გეოგრაფიულ ოპერაციებში.

---

## 🛠️ ძირითადი კონსტრუქტორები
```python
# ცარიელი წერტილი
pt = QgsPointXY()

# X და Y მნიშვნელობებით
pt = QgsPointXY(357965.61, 4683353.56)

# სხვა QgsPointXY ობიექტის კოპირება
pt2 = QgsPointXY(pt)
```

---

## 📌 ძირითადი მეთოდები

### კოორდინატებზე წვდომა
```python
x = pt.x()   # აბრუნებს X მნიშვნელობას
y = pt.y()   # აბრუნებს Y მნიშვნელობას
```

### კოორდინატების შეცვლა
```python
pt.setX(358000.0)
pt.setY(4683400.0)
```

### წერტილის შედარება
```python
pt1 = QgsPointXY(10, 20)
pt2 = QgsPointXY(10, 20)
pt3 = QgsPointXY(15, 25)

print(pt1 == pt2)  # True
print(pt1 == pt3)  # False
```

---

## 🧭 გამოყენება QgsGeometry-თან
ხშირად `QgsPointXY` გამოიყენება გეომეტრიის შესაქმნელად:
```python
pt = QgsPointXY(357965.61, 4683353.56)
geom = QgsGeometry.fromPointXY(pt)
```

---

## 🌍 პრაქტიკული მაგალითი — წერტილოვანი შრის შექმნა
```python
fn = r'C:/Users/Public/Documents/GIS/points.shp'

fields = QgsFields()
fields.append(QgsField('ID', QVariant.Int))
fields.append(QgsField('Name', QVariant.String))

writer = QgsVectorFileWriter(fn, 'UTF-8', fields, QgsWkbTypes.Point,
                             QgsCoordinateReferenceSystem('EPSG:32638'), 'ESRI Shapefile')

# წერტილები
coords = [(357960, 4683350), (357970, 4683360), (357980, 4683370)]

for i, (x, y) in enumerate(coords):
    pt = QgsPointXY(x, y)
    geom = QgsGeometry.fromPointXY(pt)
    feat = QgsFeature()
    feat.setGeometry(geom)
    feat.setAttributes([i, f"point_{i}"])
    writer.addFeature(feat)

del(writer)

layer = iface.addVectorLayer(fn, '', 'ogr')
```

---

## 📖 როდის გამოვიყენოთ
- მარტივი წერტილის ობიექტებისთვის (მაგ. X,Y კოორდინატები).
- გეომეტრიის (`QgsGeometry`) შესაქმნელად.
- დროებითი წერტილების შესანახად და ანალიზისთვის.
- ალგორითმების გასამარტივებლად, სადაც სრული გეომეტრიული ობიექტი საჭირო არ არის.

---

✅ **QgsPointXY** PyQGIS-ში ერთ-ერთი ყველაზე ხშირად გამოყენებადი კლასი წერტილოვან მონაცემებთან მუშაობისას.
