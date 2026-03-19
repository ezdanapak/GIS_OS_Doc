# QgsVectorFileWriter PyQGIS-ში

**QgsVectorFileWriter** არის PyQGIS-ის კლასი, რომელიც გამოიყენება **ვექტორული ფაილების შესაქმნელად და ჩასაწერად** — მაგ. Shapefile, GeoPackage, GeoJSON და სხვა ფორმატები.

---

## 🔑 ძირითადი იდეა

`QgsVectorFileWriter` გვაძლევს საშუალებას:

- შევქმნათ ახალი ვექტორული ფაილი ნულიდან
- ჩავწეროთ `QgsFeature` ობიექტები ფაილში
- ავირჩიოთ ფაილის ფორმატი, CRS და კოდირება
- მოვახდინოთ მზა შრის ექსპორტი სხვა ფორმატში

---

## 📦 იმპორტი

```python
from qgis.core import (
    QgsVectorFileWriter,
    QgsFields,
    QgsField,
    QgsFeature,
    QgsGeometry,
    QgsPointXY,
    QgsWkbTypes,
    QgsCoordinateReferenceSystem,
    QgsProject
)
from PyQt5.QtCore import QVariant
```

---

## ▶️ ძირითადი სინტაქსი — ძველი სტილი

```python
writer = QgsVectorFileWriter(
    path,          # ფაილის მისამართი
    encoding,      # კოდირება, მაგ. 'UTF-8'
    fields,        # QgsFields ობიექტი
    geometryType,  # QgsWkbTypes.Point / LineString / Polygon
    crs,           # QgsCoordinateReferenceSystem
    driverName     # 'ESRI Shapefile', 'GPKG', 'GeoJSON' და სხვ.
)
```

📌 ეს სინტაქსი კვლავ მუშაობს QGIS 3.x-ში, მაგრამ deprecated-ად ითვლება.

---

## 🛠 მარტივი მაგალითი — Point Shapefile

```python
from qgis.core import (
    QgsVectorFileWriter, QgsFields, QgsField,
    QgsWkbTypes, QgsCoordinateReferenceSystem
)
from PyQt5.QtCore import QVariant

shapefile_path = r'C:\Users\Public\Documents\GIS\shapefile\saxli.shp'

# ველების განსაზღვრა
fields = QgsFields()
fields.append(QgsField('ID',    QVariant.Int))
fields.append(QgsField('Name',  QVariant.String, len=100))
fields.append(QgsField('Area',  QVariant.Double, prec=2))

# Writer-ის შექმნა
writer = QgsVectorFileWriter(
    shapefile_path,
    'UTF-8',
    fields,
    QgsWkbTypes.Point,
    QgsCoordinateReferenceSystem('EPSG:32638'),
    'ESRI Shapefile'
)

# ⚠️ del — სავალდებულოა! ფაილი მხოლოდ მაშინ დაიხურება
del writer
```

---

## ➕ Feature-ების ჩაწერა

```python
from qgis.core import QgsFeature, QgsGeometry, QgsPointXY

# Writer შექმნის შემდეგ — feature-ების დამატება
feat = QgsFeature(fields)
feat.setGeometry(QgsGeometry.fromPointXY(QgsPointXY(490230.0, 4741850.0)))
feat['ID']   = 1
feat['Name'] = 'სახლი N1'
feat['Area'] = 120.5

if writer.addFeature(feat):
    print("✅ feature ჩაიწერა")
else:
    print("❌ ჩაწერა ვერ მოხდა")

del writer
```

---

## 🚀 თანამედროვე სინტაქსი — `create()` (QGIS 3.22+)

```python
from qgis.core import QgsVectorFileWriter, QgsProject

options = QgsVectorFileWriter.SaveVectorOptions()
options.driverName   = "ESRI Shapefile"
options.fileEncoding = "UTF-8"
options.actionOnExistingFile = QgsVectorFileWriter.CreateOrOverwriteFile

writer = QgsVectorFileWriter.create(
    shapefile_path,
    fields,
    QgsWkbTypes.Point,
    QgsCoordinateReferenceSystem('EPSG:32638'),
    QgsProject.instance().transformContext(),
    options
)

if writer.hasError() != QgsVectorFileWriter.NoError:
    print("❌ შეცდომა:", writer.errorMessage())
else:
    writer.addFeature(feat)
    del writer
    print("✅ ფაილი შეიქმნა")
```

📌 `create()` — რეკომენდებული მიდგომა QGIS 3.22-დან.

---

## 💾 მხარდაჭერილი ფორმატები

| `driverName` | ფორმატი | გაფართოება |
|-------------|---------|-----------|
| `"ESRI Shapefile"` | Shapefile | `.shp` |
| `"GPKG"` | GeoPackage | `.gpkg` |
| `"GeoJSON"` | GeoJSON | `.geojson` |
| `"KML"` | Keyhole Markup Language | `.kml` |
| `"CSV"` | CSV (გეომეტრიის გარეშე) | `.csv` |
| `"MapInfo File"` | MapInfo TAB | `.tab` |
| `"DXF"` | AutoCAD DXF | `.dxf` |

---

## 📤 Layer-ის ექსპორტი — `writeAsVectorFormatV3`

თუ გაქვს მზა `QgsVectorLayer` და გინდა სხვა ფორმატში შეინახო:

```python
layer = iface.activeLayer()  # ან ნებისმიერი QgsVectorLayer

options = QgsVectorFileWriter.SaveVectorOptions()
options.driverName   = "GPKG"
options.fileEncoding = "UTF-8"

error, new_file, _, _ = QgsVectorFileWriter.writeAsVectorFormatV3(
    layer,
    r'C:\GIS\output.gpkg',
    QgsProject.instance().transformContext(),
    options
)

if error == QgsVectorFileWriter.NoError:
    print("✅ ექსპორტი წარმატებულია:", new_file)
else:
    print("❌ შეცდომა:", error)
```

📌 `writeAsVectorFormatV3` — ამ შემთხვევაში `del` **საჭირო არ არის**.

---

## 🛡️ შეცდომების შემოწმება

```python
writer = QgsVectorFileWriter.create(...)

# შეცდომის კოდი
error_code = writer.hasError()

if error_code == QgsVectorFileWriter.NoError:
    print("✅ Writer მზადაა")
elif error_code == QgsVectorFileWriter.ErrDriverNotFound:
    print("❌ Driver ვერ მოიძებნა")
elif error_code == QgsVectorFileWriter.ErrCreateDataSource:
    print("❌ ფაილის შექმნა ვერ მოხდა")
elif error_code == QgsVectorFileWriter.ErrCreateLayer:
    print("❌ შრის შექმნა ვერ მოხდა")
else:
    print("❌ სხვა შეცდომა:", writer.errorMessage())
```

---

## ♻️ Cleanup — `del writer` და `try / finally`

`QgsVectorFileWriter` **ფაილს ბლოკავს** სანამ ცოცხალია.
`del writer` — იძახებს C++ დესტრუქტორს და ხურავს ფაილს.

```python
writer = QgsVectorFileWriter.create(...)

try:
    for feat in features:
        writer.addFeature(feat)
    print(f"✅ {len(features)} feature ჩაიწერა")
except Exception as e:
    print(f"❌ შეცდომა: {e}")
finally:
    del writer  # გარანტირებული cleanup
    print("🔒 ფაილი დახურულია")
```

> `del` გარეშე შეიძლება: ფაილი დარჩეს locked, ბოლო მონაცემები არ ჩაიწეროს, მეხსიერება გაიჟოს ციკლებში.

---

## 📋 `SaveVectorOptions` პარამეტრები

```python
options = QgsVectorFileWriter.SaveVectorOptions()

options.driverName        = "ESRI Shapefile"   # ფორმატი
options.fileEncoding      = "UTF-8"             # კოდირება
options.layerName         = "my_layer"          # შრის სახელი (GPKG-ში)
options.onlySelectedFeatures = False            # მხოლოდ მონიშნულები?
options.actionOnExistingFile = QgsVectorFileWriter.CreateOrOverwriteFile
# ან: QgsVectorFileWriter.AppendToLayerNoNewFields
# ან: QgsVectorFileWriter.AppendToLayerAddNewFields
```

---

## 📌 შეჯამება

- **`QgsVectorFileWriter`** ქმნის ვექტორულ ფაილებს PyQGIS-ში
- `create()` — თანამედროვე, რეკომენდებული გზა (QGIS 3.22+)
- `writeAsVectorFormatV3()` — მზა layer-ის ექსპორტისთვის
- `del writer` — **ყოველთვის** სავალდებულოა `create()`-ით შექმნილ writer-ებთან
- `try / finally` — გარანტირებული cleanup ნებისმიერ სცენარში

👉 ეს კლასი არის PyQGIS-ში ვექტორული მონაცემების შენახვის ძირითადი ინსტრუმენტი.