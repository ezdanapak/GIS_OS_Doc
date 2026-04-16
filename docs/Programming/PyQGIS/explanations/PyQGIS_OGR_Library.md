# 📚 PyQGIS-ში OGR ბიბლიოთეკის გამოყენება

ეს დოკუმენტი მიზნად ისახავს **OGR ბიბლიოთეკის** (Open Geospatial Consortium Simple Features Reading/Writing) შესწავლას **PyQGIS-ის** კონტექსტში.  
OGR არის **GDAL-ის (Geospatial Data Abstraction Library)** ნაწილი, რომელიც უზრუნველყოფს ვექტორული GIS მონაცემების წაკითხვას, მანიპულაციასა და ჩაწერას მრავალ ფორმატში.  

PyQGIS-ში OGR ინტეგრირდება **QgsVectorLayer**-ისა და **QgsVectorFileWriter**-ის მეშვეობით, რაც საშუალებას იძლევა QGIS-ის სკრიპტებში ავტომატიზაცია.  
 
👉 რეკომენდებულია **QGIS 3.28+** ვერსიის გამოყენება და **Python Console** (Plugins > Python Console).  

---

## 🔹 შესავალი OGR-ში

### რა არის OGR?
- მხარს უჭერს **400+ ვექტორულ ფორმატს** (Shapefile, GeoJSON, GeoPackage, KML და სხვ.).  
- გამოიყენება PyQGIS-ში ვექტორული ფენების შესაქმნელად და სამართავად.  

### ძირითადი კლასები:
- **QgsVectorLayer** – ვექტორული ფენის წარმოდგენა.  
- **QgsFeature** – ფენის ერთეული ელემენტი (გეომეტრია + ატრიბუტები).  
- **QgsVectorFileWriter** – ფაილში ჩაწერა OGR დრაივერებით.  

---

## 🚀 რატომ გამოვიყენოთ OGR PyQGIS-ში?

- **ავტომატიზაცია** – მონაცემების ჩატვირთვა, გარდაქმნა, ფილტრაცია.  
- **კონვერსია** – ფორმატიდან ფორმატში გადაყვანა (მაგ.: Shapefile → GeoJSON).  

### პრერეკვიზიტები:
```py
from qgis.core import *
```

---

## 🧩 OGR-ის ძირითადი კონცეფციები

- **გეომეტრია**: Point, LineString, Polygon.  
- **ატრიბუტები**: ცხრილის ველები (მაგ.: ID, სახელი).  
- **CRS (Coordinate Reference System)**: EPSG კოდები (მაგ.: EPSG:4326 WGS84).  

---

## 📂 OGR დრაივერები PyQGIS-ში

დრაივერები განსაზღვრავს მონაცემთა ფორმატს. ყველაზე გავრცელებული:

| დრაივერი | ფორმატი       | მაგალითი ფაილის გაფართოება |
|----------|--------------|---------------------------|
| ESRI Shapefile | Shapefile    | `.shp` |
| GeoJSON        | GeoJSON      | `.geojson` |
| GPKG           | GeoPackage   | `.gpkg` |
| CSV            | CSV (WKT)    | `.csv` |
| KML            | KML          | `.kml` |

👉 `driverName` უნდა მიუთითოთ ფაილის ჩაწერისას.

---

## 📥 ვექტორული ფენის ჩატვირთვა (Reading)

```py
from qgis.core import QgsVectorLayer, QgsProject

layer_path = "/path/to/your/data/airports.shp"
vlayer = QgsVectorLayer(layer_path, "Aeroporti", "ogr")

if not vlayer.isValid():
    print("შეცდომა: ფენა ვერ ჩაიტვირთა!")
else:
    QgsProject.instance().addMapLayer(vlayer)
    print("ფენა წარმატებით ჩაიტვირთა.")
```

- **ogr** – მიუთითებს OGR პროვაიდერს.  
- **isValid()** – ამოწმებს ფენის სისწორეს.  

---

## 🔎 ფენის გამოკვლევა (Iteration)

```py
features = vlayer.getFeatures()

for feature in features:
    geom = feature.geometry()
    attrs = feature.attributes()
    print(f"ID: {feature.id()}")
    if geom.type() == 0:  # Point
        print(f"კოორდინატები: {geom.asPoint()}")
    print(f"ატრიბუტები: {attrs}")
    break
```

- **getFeatures()** – აბრუნებს ფუნქციების იტერატორს.  
- **geometry().asPoint()** – კოორდინატები Point-ისთვის.  

---

## 🎯 ფილტრაცია (სივრცული და ატრიბუტული)

```py
from qgis.core import QgsRectangle, QgsFeatureRequest

roi = QgsRectangle(450290, 400520, 450750, 400780)
request = QgsFeatureRequest().setFilterRect(roi)

request = QgsFeatureRequest().setFilterExpression("name = 'Tbilisi'")

for feature in vlayer.getFeatures(request):
    print(f"შეტანილი ფუნქცია: {feature['name']}")
```

---

## 💾 ვექტორული მონაცემების ჩაწერა (Writing)

```py
from qgis.core import QgsVectorFileWriter, QgsProject

save_options = QgsVectorFileWriter.SaveVectorOptions()
save_options.driverName = "GPKG"
save_options.fileEncoding = "UTF-8"

transform_context = QgsProject.instance().transformContext()

output_path = "/path/to/output/my_data.gpkg"
error = QgsVectorFileWriter.writeAsVectorFormatV3(
    vlayer, output_path, transform_context, save_options
)

if error[0] == QgsVectorFileWriter.NoError:
    print("წარმატებით შენახული!")
else:
    print(f"შეცდომა: {error}")
```

- **driverName** – ფორმატი (მაგ.: `"ESRI Shapefile"`).  
- **writeAsVectorFormatV3** – ჩაწერის თანამედროვე მეთოდი.  

---

## 🆕 ახალი ფენის შექმნა ნულიდან

```py
from qgis.PyQt.QtCore import QVariant
from qgis.core import QgsFields, QgsField, QgsFeature, QgsGeometry, QgsPointXY

fields = QgsFields()
fields.append(QgsField("ID", QVariant.Int))
fields.append(QgsField("სახელი", QVariant.String))

new_layer = QgsVectorLayer(
    "Point?crs=epsg:4326&field=ID:integer&field=სახელი:string",
    "ახალი_ფენა", "memory"
)
new_layer.dataProvider().addFeatures([])

feat = QgsFeature(new_layer.fields())
feat.setAttribute("ID", 1)
feat.setAttribute("სახელი", "თბილისი")
feat.setGeometry(QgsGeometry.fromPointXY(QgsPointXY(44.7937, 41.7151)))
new_layer.dataProvider().addFeature(feat)

save_options.driverName = "ESRI Shapefile"
QgsVectorFileWriter.writeAsVectorFormatV3(new_layer, "/path/to/new.shp", transform_context, save_options)
```

---

## 📝 პრაქტიკული დავალებები

1. ჩამოტვირთეთ Natural Earth Shapefiles, ჩატვირთეთ PyQGIS-ში და გამოთვალეთ ფუნქციების რაოდენობა:  
```py
print(f"ფუნქციების რაოდენობა: {vlayer.featureCount()}")
```

2. შექმენით ახალი Point ფენა თბილისის კოორდინატებით და შეინახეთ **GeoJSON**-ად.  

3. გაფილტრეთ ფენა CRS-ის მიხედვით და შეინახეთ ახალ ფორმატში:  
```py
print(layer.crs().authid())
```

---

## ⚠ შეცდომები და რჩევები

- **"Layer not valid"** – შეამოწმეთ ფაილის გზა და ფორმატი.  
- გამოიყენეთ **QGIS Python Console** ტესტირებისთვის.  
- მეტი მაგალითისთვის: **QGIS PyQGIS Cookbook**.  

---

## 📚 დამატებითი რესურსები

- [QGIS PyQGIS Developer Cookbook](https://docs.qgis.org)  
- [GDAL Vector Drivers](https://gdal.org/drivers/vector/index.html)  
