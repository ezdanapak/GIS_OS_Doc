# `QgsProject.instance()` PyQGIS-ში

**`QgsProject.instance()`** — მიმდინარე QGIS პროექტის **გლობალური ობიექტი**. ეს არის ერთადერთი წვდომის წერტილი პროექტის მონაცემებზე, შრეებზე, CRS-ზე და პარამეტრებზე.

---

## 🔑 ძირითადი იდეა

QGIS-ში ყოველთვის **ერთი პროექტია გახსნილი** (შეიძლება ცარიელი იყოს). `QgsProject.instance()` სწორედ ამ პროექტს გვიბრუნებს — **Singleton პატერნი**:

```
QGIS პროგრამა
    │
    └── QgsProject  (მხოლოდ ერთი ეგზემპლარი)
            │
            ├── შრეები (Layers)
            ├── CRS (კოორდინატული სისტემა)
            ├── ცვლადები (Variables)
            ├── ბილიკი (.qgz ფაილი)
            └── პარამეტრები
```

> 💡 **Singleton** — დიზაინ პატერნი, სადაც კლასს **მხოლოდ ერთი ეგზემპლარი** შეიძლება ჰქონდეს. `instance()` ყოველთვის **იმავე** ობიექტს აბრუნებს.

---

## 📦 იმპორტი

```python
from qgis.core import QgsProject

# Singleton — ყოველი გამოძახება იმავე ობიექტს აბრუნებს
project = QgsProject.instance()

print(type(project))
# → <class 'qgis._core.QgsProject'>

# ორი გამოძახება — ერთი და იგივე ობიექტი
a = QgsProject.instance()
b = QgsProject.instance()
print(a is b)  # → True
```

---

## 🗂️ შრეების მართვა

### შრის დამატება

```python
from qgis.core import QgsVectorLayer, QgsProject

layer = QgsVectorLayer(
    r'C:\GIS\shapefile\regions.shp',
    'Regions',
    'ogr'
)

if layer.isValid():
    QgsProject.instance().addMapLayer(layer)
    print("✅ შრე დაემატა პროექტს")
```

### ყველა შრის ჩამონათვალი

```python
project = QgsProject.instance()

# dictionary — {layer_id: QgsMapLayer}
all_layers = project.mapLayers()

for layer_id, layer in all_layers.items():
    print(f"ID: {layer_id[:8]}...  სახელი: {layer.name()}")
```

### შრის ძიება სახელით

```python
# სახელით (სია — შეიძლება რამდენიმე ემთხვეოდეს)
layers = QgsProject.instance().mapLayersByName('Roads')

if layers:
    layer = layers[0]
    print(f"✅ ნაპოვნია: {layer.name()} — {layer.featureCount()} feature")
else:
    print("❌ შრე ვერ მოიძებნა")
```

### შრის ძიება ID-ით

```python
layer_id = "roads_abc123_20250101"

layer = QgsProject.instance().mapLayer(layer_id)

if layer:
    print(f"✅ {layer.name()}")
else:
    print("❌ ID არ მოიძებნა")
```

### შრის წაშლა

```python
layer = QgsProject.instance().mapLayersByName('TempLayer')[0]

# ID-ით წაშლა
QgsProject.instance().removeMapLayer(layer.id())

# ან პირდაპირ ობიექტით
QgsProject.instance().removeMapLayer(layer)

print("🗑️ შრე წაიშალა პროექტიდან")
```

---

## 🌐 CRS — კოორდინატული სისტემა

```python
from qgis.core import QgsProject, QgsCoordinateReferenceSystem

project = QgsProject.instance()

# პროექტის მიმდინარე CRS
crs = project.crs()
print(crs.authid())       # → "EPSG:32638"
print(crs.description())  # → "WGS 84 / UTM zone 38N"

# პროექტის CRS-ის შეცვლა
new_crs = QgsCoordinateReferenceSystem('EPSG:4326')
project.setCrs(new_crs)
print("✅ CRS შეიცვალა:", project.crs().authid())
```

---

## 📁 პროექტის ფაილი

```python
project = QgsProject.instance()

# პროექტის ფაილის სრული ბილიკი
print(project.fileName())
# → "C:/GIS/Projects/my_project.qgz"  ან "" თუ შენახული არ არის

# პროექტის სახელი
print(project.title())
# → "GGTC Pipeline Map"

# სახელის შეცვლა
project.setTitle("GGTC Pipeline Map 2025")

# პროექტის შენახვა
project.write()
print("💾 პროექტი შეინახა")

# ახალ ბილიკში შენახვა
project.write(r'C:\GIS\Projects\backup.qgz')
```

---

## 🔧 Transform Context

`transformContext()` — კოორდინატული გარდაქმნის კონტექსტი, რომელიც **სავალდებულოა** თანამედროვე PyQGIS API-ში (`QgsVectorFileWriter.create()`, `writeAsVectorFormatV3()`):

```python
from qgis.core import QgsProject, QgsVectorFileWriter

transform_context = QgsProject.instance().transformContext()

options = QgsVectorFileWriter.SaveVectorOptions()
options.driverName   = "ESRI Shapefile"
options.fileEncoding = "UTF-8"

writer = QgsVectorFileWriter.create(
    r'C:\GIS\output.shp',
    fields,
    QgsWkbTypes.Point,
    QgsCoordinateReferenceSystem('EPSG:32638'),
    transform_context,          # ← QgsProject.instance().transformContext()
    options
)
del writer
```

---

## 🧩 ცვლადები (Variables)

```python
from qgis.core import QgsExpressionContextUtils, QgsProject

project = QgsProject.instance()

# ცვლადის დაყენება
QgsExpressionContextUtils.setProjectVariable(project, 'company',  'GGTC')
QgsExpressionContextUtils.setProjectVariable(project, 'map_year', 2025)

# ცვლადის წაკითხვა
scope = QgsExpressionContextUtils.projectScope(project)
print(scope.variable('company'))   # → "GGTC"
print(scope.variable('map_year'))  # → 2025

# QGIS Expression-ში გამოიყენება: @company, @map_year
```

---

## 🧹 პროექტის გასუფთავება

```python
# ყველა შრის წაშლა
QgsProject.instance().removeAllMapLayers()
print("🗑️ ყველა შრე წაიშალა")

# პროექტის სრული გასუფთავება (შრეები + პარამეტრები)
QgsProject.instance().clear()
print("🔄 პროექტი გასუფთავდა")
```

> ⚠️ `clear()` — **შეუქცევადია**. პროექტის ყველა მონაცემი, ცვლადი და პარამეტრი წაიშლება.

---

## 📡 სიგნალები (Signals)

`QgsProject` PyQt სიგნალებს გასცემს — შეგიძლია **ივენთებზე** მოუსმინო:

```python
project = QgsProject.instance()

# შრის დამატებისას
project.layersAdded.connect(
    lambda layers: print(f"➕ დაემატა: {[l.name() for l in layers]}")
)

# შრის წაშლისას
project.layersRemoved.connect(
    lambda ids: print(f"🗑️ წაიშალა: {ids}")
)

# პროექტის შენახვისას
project.projectSaved.connect(
    lambda: print(f"💾 შენახულია: {project.fileName()}")
)

# CRS-ის შეცვლისას
project.crsChanged.connect(
    lambda: print(f"🌐 CRS შეიცვალა: {project.crs().authid()}")
)
```

---

## 📋 ხშირად გამოყენებული მეთოდები

| მეთოდი | დანიშნულება | დაბრუნებული ტიპი |
|--------|------------|----------------|
| `instance()` | პროექტის Singleton ობიექტი | `QgsProject` |
| `addMapLayer(layer)` | შრის დამატება | `QgsMapLayer` |
| `removeMapLayer(id)` | შრის წაშლა ID-ით | — |
| `mapLayers()` | ყველა შრის dictionary | `dict` |
| `mapLayersByName(name)` | შრის ძიება სახელით | `list` |
| `mapLayer(id)` | შრის ძიება ID-ით | `QgsMapLayer` |
| `crs()` | პროექტის CRS | `QgsCoordinateReferenceSystem` |
| `setCrs(crs)` | CRS-ის შეცვლა | — |
| `fileName()` | `.qgz` ფაილის ბილიკი | `str` |
| `title()` | პროექტის სახელი | `str` |
| `write()` | შენახვა | `bool` |
| `clear()` | სრული გასუფთავება | — |
| `transformContext()` | კოორდინატური გარდაქმნის კონტექსტი | `QgsCoordinateTransformContext` |
| `removeAllMapLayers()` | ყველა შრის წაშლა | — |

---

## 📌 შეჯამება

- **`QgsProject.instance()`** — **Singleton**: ყოველთვის **ერთი და იგივე** ობიექტი
- პროექტის **შრეები, CRS, ცვლადები, ბილიკი** — ყველაფერი აქედანაა ხელმისაწვდომი
- **`transformContext()`** — სავალდებულოა `QgsVectorFileWriter.create()` და `writeAsVectorFormatV3()`-ში
- **სიგნალები** — Layer-ების დამატება/წაშლა, CRS-ის ცვლილება, შენახვა — ყველა ივენთი მოისმინება
- `clear()` — **ფრთხილად**: შეუქცევადი სრული გასუფთავება

👉 `QgsProject.instance()` — PyQGIS-ის **ცენტრალური კვანძი**. პროექტთან ნებისმიერი ურთიერთობა ამ ობიექტიდან იწყება.