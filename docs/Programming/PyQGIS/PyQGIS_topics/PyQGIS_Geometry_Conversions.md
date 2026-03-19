## გეომეტრიის ცვლილება(Geometry conversions)
<br>
ოფიციალური დოკუმენტაცია <br>
წერტილოვანი შრის ხაზში გადაყვანა - Point to Line Conversion
Points to [path:](https://docs.qgis.org/3.40/en/docs/user_manual/processing_algs/qgis/vectorcreation.html#points-to-path) <br>
ხაზოვანი შრის პოლიგონში გადაყვანა - Lines to polygon
Lines to [polygons:](https://docs.qgis.org/3.40/en/docs/user_manual/processing_algs/qgis/vectorgeometry.html#lines-to-polygons) <br>
პოლიგონალური შრის ხაზში გადაყვანა - Polygon to Lines Conversion
Polygons to [lines:](https://docs.qgis.org/3.40/en/docs/user_manual/processing_algs/qgis/vectorgeometry.html#polygons-to-lines) <br>
ხაზოვანი შრიდან წერტილების მიღება - Points along geometry
Points along [geometry:](https://docs.qgis.org/3.40/en/docs/user_manual/processing_algs/qgis/vectorgeometry.html#points-along-geometry) <br>

**Geometry Conversions** — ვექტორული შრეების გეომეტრიული ტიპის შეცვლა `processing.run()`-ის გამოყენებით.

### ზოგიერთი განმარტება
- processing.run ნიშნავს QGIS - ის Processing Toolbox - ს. [მეთოდი/ფუნქცია]
- სიტყვა native ნიშნავს QGIS ის ხელსაწყოს და pointstopath მის დასახელებას.
- მასში კოდი მთლიანად არის Dictionary პრინციპი {}  არგუმენტი key:value ობიექტის მნიშვნელობები.

!!! warning
    ყურადღება მიაქციე ხელსაწყოში 'ORDER_EXPRESSION': '"ID"' , იმიტომ რომ ყველა შრეში ცხრილში ეს აიდის სვეტი არ არის და უნდა ჩაენაცვლოს შესაბამისით.წინააღმდეგ შემთხვევაში პროგრამა მთლიანად გამოდის მწყობრიდან.




---

## 🔑 ძირითადი იდეა

PyQGIS-ში შეგიძლია ვექტორული შრის გეომეტრია **გარდაქმნა** სხვა ტიპში — QGIS Processing Toolbox-ის ხელსაწყოების პირდაპირ გამოძახებით კოდიდან.

```
Point  ──→  Line  ──→  Polygon
  ↑                       │
  └───── Points along ←───┘
```

| კონვერტაცია | ხელსაწყო | Processing ID |
|------------|---------|---------------|
| წერტილი → ხაზი | Points to Path | `native:pointstopath` |
| ხაზი → პოლიგონი | Lines to Polygons | `qgis:linestopolygons` |
| პოლიგონი → ხაზი | Polygons to Lines | `native:polygonstolines` |
| ხაზი → წერტილები | Points along Geometry | `native:pointsalonglines` |

---

## 🧩 `processing.run()` — როგორ მუშაობს?

```python
processing.run("provider:toolname", { პარამეტრები })
```

- **`processing.run`** — QGIS Processing Toolbox-ის გამოძახება კოდიდან
- **`native`** — QGIS-ის ჩაშენებული ხელსაწყო
- **`qgis`** — QGIS ალგორითმების ბიბლიოთეკა
- **`{ ... }`** — პარამეტრები `key: value` Dictionary სახით

---

## 🟢 წერტილი → ხაზი

**Points to Path** — წერტილოვანი შრის ხაზში გადაყვანა

📎 ოფიციალური დოკუმენტაცია: [Points to Path](https://docs.qgis.org/3.40/en/docs/user_manual/processing_algs/qgis/vectorcreation.html#points-to-path)

```python
fn     = r'C:\Users\Public\Documents\GIS\shapefile\points.shp'
output = r'C:\Users\Public\Documents\GIS\shapefile\points_to_line.shp'

processing.run("native:pointstopath", {
    'INPUT'            : fn,
    'CLOSE_PATH'       : True,    # True = ხაზი ჩაიხურება (წრე)
    'ORDER_EXPRESSION' : '"ID"',  # ⚠️ სვეტის სახელი — იხ. გაფრთხილება
    'NATURAL_SORT'     : False,
    'GROUP_EXPRESSION' : '',
    'OUTPUT'           : output
})

layer = iface.addVectorLayer(output, 'Points to Line', 'ogr')
```

> ⚠️ **`ORDER_EXPRESSION`** — ეს პარამეტრი განსაზღვრავს, **რა თანმიმდევრობით** შეუერთდება წერტილები ხაზში. სვეტი `"ID"` ყველა შრეში არ არის — **შეამოწმე შენი შრის ატრიბუტები** და შეცვალე შესაბამისი სვეტის სახელით. სვეტის გარეშე ან არასწორი სახელით პროგრამა `ERROR`-ს გასცემს.

📌 შედეგად ვიღებთ **ხაზს**, სადაც წერტილები `ORDER_EXPRESSION`-ის მიხედვით თანმიმდევრულად შეუერთდა.

---

## 🔵 ხაზი → პოლიგონი

**Lines to Polygons** — ხაზოვანი შრის პოლიგონში გადაყვანა

📎 ოფიციალური დოკუმენტაცია: [Lines to Polygons](https://docs.qgis.org/3.40/en/docs/user_manual/processing_algs/qgis/vectorgeometry.html#lines-to-polygons)

```python
fn     = r'C:\Users\Public\Documents\GIS\shapefile\line_layer.shp'
output = r'C:\Users\Public\Documents\GIS\shapefile\polygon_from_line.shp'

processing.run("qgis:linestopolygons", {
    'INPUT' : fn,
    'OUTPUT': output
})

layer = iface.addVectorLayer(output, 'Line to Polygon', 'ogr')
```

📌 ხაზის **პირველი და ბოლო წერტილი** ავტომატურად შეუერთდება — ყალიბდება **დახურული გეომეტრია** (პოლიგონი).

> 💡 ხაზი **დახურული** უნდა იყოს ან მჭიდროდ მიახლოებული, წინააღმდეგ შემთხვევაში შედეგი შეიძლება მოულოდნელი გამოვიდეს.

---

## 🟠 პოლიგონი → ხაზი

**Polygons to Lines** — პოლიგონალური შრის ხაზებში გადაყვანა

📎 ოფიციალური დოკუმენტაცია: [Polygons to Lines](https://docs.qgis.org/3.40/en/docs/user_manual/processing_algs/qgis/vectorgeometry.html#polygons-to-lines)

```python
fn     = r'C:\Users\Public\Documents\GIS\shapefile\polygon_layer.shp'
output = r'C:\Users\Public\Documents\GIS\shapefile\line_from_polygon.shp'

processing.run("native:polygonstolines", {
    'INPUT' : fn,
    'OUTPUT': output
})

layer = iface.addVectorLayer(output, 'Polygon to Line', 'ogr')
```

📌 პოლიგონის **კონტური** გადადის ხაზად — სასარგებლოა ბუფერის, კიდის ანალიზისა და ვიზუალიზაციისთვის.

---

## 🟣 ხაზი → წერტილები (Points along geometry)

**Points along Geometry** — ხაზზე თანაბარი დაშორებით წერტილების განთავსება

📎 ოფიციალური დოკუმენტაცია: [Points along Geometry](https://docs.qgis.org/3.40/en/docs/user_manual/processing_algs/qgis/vectorgeometry.html#points-along-geometry)

```python
fn     = r'C:\Users\Public\Documents\GIS\shapefile\line_layer.shp'
output = r'C:\Users\Public\Documents\GIS\shapefile\points_on_line.shp'

processing.run("native:pointsalonglines", {
    'INPUT'       : fn,
    'DISTANCE'    : 5,    # ← წერტილებს შორის დაშორება (CRS ერთეულებში)
    'START_OFFSET': 0,    # ← ხაზის დასაწყისიდან გამოტოვება
    'END_OFFSET'  : 0,    # ← ხაზის ბოლოდან გამოტოვება
    'OUTPUT'      : output
})

layer = iface.addVectorLayer(output, 'Points along Line', 'ogr')
```

📌 `DISTANCE` — **CRS-ის ერთეულებში** არის: თუ შრე მეტრულ კოორდინატებშია (მაგ. EPSG:32638), `5` ნიშნავს **5 მეტრს**.

> 💡 გეოგრაფიულ კოორდინატებში (EPSG:4326) `DISTANCE` **გრადუსებში** იქნება — ამ შემთხვევაში პროექცია შეცვალე მეტრულად (`EPSG:32638`) სწორი შედეგისთვის.

---

## 🗂️ შედეგების დროებით შენახვა (Memory Layer)

`OUTPUT`-ში `'TEMPORARY_OUTPUT'` ან `'memory:'` გამოიყენე, თუ ფაილი არ გინდა:

```python
result = processing.run("native:polygonstolines", {
    'INPUT' : fn,
    'OUTPUT': 'TEMPORARY_OUTPUT'   # ← მხოლოდ მეხსიერებაში
})

# დროებითი layer-ი
temp_layer = result['OUTPUT']
QgsProject.instance().addMapLayer(temp_layer)
```

> 💡 `'TEMPORARY_OUTPUT'` — სესიის დასრულებისას **ავტომატურად წაიშლება**. ფაილის შენახვა საჭიროების შემთხვევაში გამოიყენე სრული ბილიკი.

---

## ⚡ შეცდომების დამუშავება

```python
import processing
from qgis.core import QgsVectorLayer

fn     = r'C:\Users\Public\Documents\GIS\shapefile\points.shp'
output = r'C:\Users\Public\Documents\GIS\shapefile\points_to_line.shp'

try:
    result = processing.run("native:pointstopath", {
        'INPUT'            : fn,
        'CLOSE_PATH'       : True,
        'ORDER_EXPRESSION' : '"ID"',
        'NATURAL_SORT'     : False,
        'GROUP_EXPRESSION' : '',
        'OUTPUT'           : output
    })

    layer = iface.addVectorLayer(output, 'Points to Line', 'ogr')

    if not layer or not layer.isValid():
        print("❌ შრე ვერ ჩაიტვირთა")
    else:
        print(f"✅ შრე ჩაიტვირთა — {layer.featureCount()} feature")

except Exception as e:
    print(f"❌ Processing შეცდომა: {e}")
```

---

## 📌 შეჯამება

ამ თემაში განვიხილეთ:

| კონვერტაცია | Processing ID | შედეგი |
|------------|--------------|--------|
| 🟢 წერტილი → ხაზი | `native:pointstopath` | წერტილები თანმიმდევრულად ერთდება |
| 🔵 ხაზი → პოლიგონი | `qgis:linestopolygons` | ხაზი იხურება, ყალიბდება ფართობი |
| 🟠 პოლიგონი → ხაზი | `native:polygonstolines` | კონტური ხდება ხაზი |
| 🟣 ხაზი → წერტილები | `native:pointsalonglines` | თანაბარი წერტილები ხაზზე |

👉 ყველა კონვერტაცია `processing.run()` გამოიყენებს — QGIS Processing Toolbox-ის ძალა პირდაპირ კოდიდან.

## 🟢 წერტილოვანი შრის ხაზში გადაყვანა (Point to Line Conversion)


```py title="Points_to_line.py" linenums="1"
fn = r'C:\Users\Public\Documents\GIS\shapefile\points.shp'
output = r'C:\Users\Public\Documents\GIS\shapefile\points_to_line.shp'

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

📌 შედეგად ვიღებთ ხაზს წერტილების თანმიმდევრობით.

---


## 🟢 ხაზოვანი შრის პოლიგონში გადაყვანა (Line to Polygon)

```py title="Line_to_polygon.py" linenums="1"
fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\line_layer.shp'
output = r'C:\Users\Public\Documents\GK\PyQGIS\shp\Polygon_layer_from_line.shp'

processing.run("qgis:linestopolygons", {'INPUT':fn, 'OUTPUT':output})
layer = iface.addVectorLayer(output, '', 'ogr')
```

📌 ხაზები ერთდება და გეომეტრიულად პოლიგონი ყალიბდება.

---

## 🟢 პოლიგონალური შრის ხაზში გადაყვანა (Polygon to Lines Conversion)

```py title="Polygon_to_Line_Conversion.py" linenums="1"
fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\Polygon_layer.shp'
output = r'C:\Users\Public\Documents\GK\PyQGIS\shp\Line_layer_from_polygon.shp'

processing.run("native:polygonstolines", {'INPUT':fn,'OUTPUT':output})
layer = iface.addVectorLayer(output, '', 'ogr')
```

📌 პოლიგონალური შრის ელემენტები გადადის ხაზობრივ სტილში, მათი კონტურიდან/ფორმიდან გამომდინარე.

---

## 🟢 ხაზოვანი შრიდან წერტილების მიღება (Points along geometry)

```py title="Points_along_geometry.py" linenums="1"
fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\Line_layer.shp'
output = r'C:\Users\Public\Documents\GK\PyQGIS\shp\Points_placed_on_line.shp'

processing.run("native:pointsalonglines", {'INPUT':fn,'DISTANCE':5,'START_OFFSET':0,'END_OFFSET':0,'OUTPUT':output})
layer = iface.addVectorLayer(output, '', 'ogr')
```

📌 ხაზოვანი შრის ნებისმიერ ელემენტზე განსაზღვრული დაშორებით წერტილების განთავსება.

---



# 📚 შეჯამება

ამ თემაში გავიარეთ:  
- ახალი შრეების შექმნა PyQGIS-ით  
- წერტილი → ხაზი → პოლიგონი კონვერტაციები  
- დროებითი და მუდმივი შედეგების შენახვა  
- შეცდომების აღმოჩენა და გასწორება  