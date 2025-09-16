
# თემა II – PyQGIS პრაქტიკული მაგალითები

## 🚀 ეშვება QGIS კონსოლში

---
- ზოგიერთი განმარტება

fn ნიშნავს file name - ჩვეულებრივი ცვლადია, მისი შეცვლა შესაძლებელია.

ატრიბუტული ცხრილის სვეტებს შექმნის QgsFields()

File Handling - "r" - Read - Default value. Opens a file for reading, error if the file does not exist 

ახალი შრე შეიქმნა და შენახვა მოხდა 'ESRI Shapefile' დრაივერის დახმარებით.

არგუმენტებში აუცილებელია გადავცეთ უნიკოდირება, პროექცია, დრაივერი და ა.შ

ფუნქცია დააბრუნებს ობიექტს რომელიც განსაზღვრულია როგორც writer კოდში, რომელსაც შეუძლია დაამატოს და ჩაწეროს ახალი ობიექტები შრეში.


## 🟢 ახალი წერტილოვანი ვექტორული შრის შექმნა (ESRI Shapefile)

```python
fn = r'C:\Users\Public\Documents\GIS\shapefile\saxli.shp'

layerfield = QgsFields()
layerfield.append(QgsField('ID', QVariant.Int))
layerfield.append(QgsField('saxeli', QVariant.String))
layerfield.append(QgsField('asaki', QVariant.Double))

writer = QgsVectorFileWriter(fn, 'UTF-8', layerfield, QgsWkbTypes.Point, 
               QgsCoordinateReferenceSystem('EPSG:32638'), 'ESRI Shapefile')

fc = QgsFeature()
fc.setGeometry(QgsGeometry.fromPointXY(QgsPointXY(357965.61, 4683353.56)))
fc.setAttributes([1, 'giorgi', 25])
writer.addFeature(fc)

del(writer)
layer = iface.addVectorLayer(fn, '', 'ogr')
```

📌 ეს კოდი ქმნის წერტილოვან შრეს და ერთ ობიექტს ამატებს.

---

## 🟢 წერტილოვანი შრის ხაზში გადაყვანა (Point to Line Conversion)

```python
fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\lake.shp'
output = r'C:\Users\Public\Documents\GK\PyQGIS\shp\lake_line.shp'

processing.run("native:pointstopath", {
    'INPUT': fn,
    'CLOSE_PATH': True,
    'ORDER_EXPRESSION': '"ID"',
    'NATURAL_SORT': False,
    'GROUP_EXPRESSION': '',
    'OUTPUT': output
})

layer = iface.addVectorLayer(output, '', 'ogr')
```

📌 აქედან ვიღებთ ხაზს წერტილების თანმიმდევრობით.

---

## 🔄 ვიზუალური დიაგრამა (სტუდენტებისთვის)
```
POINTS (წერტილები)
   ↓
Point to Line Conversion
   ↓
LINE (ხაზი)
   ↓
Lines to Polygon Conversion
   ↓
POLYGON (პოლიგონი)
   ↓
Polygon to Lines Conversion
   ↓
LINES
   ↓
Convert Lines to Points
   ↓
POINTS
```

---

## 🟢 ხაზოვანი შრის პოლიგონში გადაყვანა (Lines to Polygon)

```python
fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\lake_line.shp'
output = r'C:\Users\Public\Documents\GK\PyQGIS\shp\lake_poly.shp'

processing.run("qgis:linestopolygons", {'INPUT':fn, 'OUTPUT':output})
layer = iface.addVectorLayer(output, '', 'ogr')
```

📌 ხაზები ერთდება და პოლიგონი ყალიბდება.

---

## ❗️ შენიშვნები სტუდენტებისთვის

- **QVariant.Int** → აუცილებლად დიდი I  
- **TEMPORARY_OUTPUT** → დროებითი შედეგი, თუ გვინდა ფაილად შევინახოთ → ჩავანაცვლოთ `output`
- **გეზები (paths)** → გამოიყენე `r"path"` ან ორმაგი `\`

---

## 🔎 შეცდომები და მათი ახსნა

- **EOL while scanning string** → ფაილის მისამართს აკლია ბრჭყალი `"`.  
- **AttributeError: type object 'QVariant' has no attribute 'int'** → პატარა `i` შეცდომაა, სწორია `Int`.

---

# 📚 შეჯამება

ამ თემაში გავიარეთ:  
- ახალი შრეების შექმნა PyQGIS-ით  
- წერტილი → ხაზი → პოლიგონი კონვერტაციები  
- დროებითი და მუდმივი შედეგების შენახვა  
- შეცდომების აღმოჩენა და გასწორება  

