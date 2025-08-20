# QgsProject

`QgsProject` არის PyQGIS-ის ერთ-ერთი ყველაზე მნიშვნელოვანი კლასი, რომელიც გამოიყენება QGIS პროექტის (`.qgz` ან `.qgs`) ფაილების სამართავად.  
ამ კლასის საშუალებით შესაძლებელია:

- არსებული პროექტის გახსნა  
- ახალი პროექტის შექმნა  
- პროექტის შენახვა  
- ფენების დამატება/ამოღება პროექტიდან  
- პროექტის თვისებების მართვა (CRS, გზები, ჩანაწერები)

---

## 📌 ძირითადი მეთოდები და ატრიბუტები

### 1. `QgsProject.instance()`
QGIS-ში არსებობს მხოლოდ ერთი აქტიური პროექტი. მისი წვდომა ხდება `instance()` მეთოდით.

```python
project = QgsProject.instance()
```

---

### 2. `setFileName(path)`
პროექტის ფაილის მისამართის მითითება.

```python
project.setFileName("C:/Users/Public/Documents/GIS/my_project.qgz")
```

---

### 3. `read(path)` – პროექტის გახსნა
არსებული `.qgz` ან `.qgs` ფაილის ჩატვირთვა.

```python
project.read("C:/Users/Public/Documents/GIS/existing_project.qgz")
```

---

### 4. `write()`
პროექტის შენახვა იმავე ფაილში, რომელსაც მიენიჭა `setFileName()`.

```python
project.write()
```

ან ახალი სახელით:

```python
project.write("C:/Users/Public/Documents/GIS/new_project.qgz")
```

---

### 5. ფენების დამატება პროექტში
შეიძლება დავამატოთ როგორც ვექტორული, ისე რასტრული ფენები.

```python
from qgis.core import QgsVectorLayer, QgsRasterLayer

# ვექტორული ფენის დამატება
vlayer = QgsVectorLayer("C:/Users/Public/Documents/GIS/roads.shp", "Roads", "ogr")
project.addMapLayer(vlayer)

# რასტრული ფენის დამატება
rlayer = QgsRasterLayer("C:/Users/Public/Documents/GIS/dem.tif", "DEM")
project.addMapLayer(rlayer)
```

---

### 6. `removeMapLayer(layer)`
ფენის წაშლა პროექტიდან.

```python
project.removeMapLayer(vlayer.id())
```

---

### 7. `mapLayers()`
პროექტში არსებული ყველა ფენის dictionary-ს დაბრუნება (`layer_id: layer_object`).

```python
layers = project.mapLayers()
for layer_id, layer in layers.items():
    print(layer.name(), layer.type())
```

---

### 8. CRS (Coordinate Reference System) პროექტისთვის
პროექტის ძირითადი CRS-ის დაყენება.

```python
from qgis.core import QgsCoordinateReferenceSystem

crs = QgsCoordinateReferenceSystem("EPSG:4326")  # WGS84
project.setCrs(crs)
```

---

## 📌 სრული მაგალითი

```python
from qgis.core import QgsProject, QgsVectorLayer, QgsRasterLayer, QgsCoordinateReferenceSystem

# პროექტის ინსტანსის მიღება
project = QgsProject.instance()

# ფაილის სახელის მინიჭება
project.setFileName("C:/Users/Public/Documents/GIS/my_project.qgz")

# ვექტორული ფენის დამატება
roads = QgsVectorLayer("C:/Users/Public/Documents/GIS/roads.shp", "Roads", "ogr")
project.addMapLayer(roads)

# რასტრული ფენის დამატება
dem = QgsRasterLayer("C:/Users/Public/Documents/GIS/dem.tif", "DEM")
project.addMapLayer(dem)

# CRS დაყენება
crs = QgsCoordinateReferenceSystem("EPSG:32638")  # UTM Zone 38N
project.setCrs(crs)

# პროექტის შენახვა
project.write()
```

---

## 📖 დასკვნა
`QgsProject` გვაძლევს საშუალებას ვმართოთ მთელი QGIS პროექტი პროგრამულად.  
სტუდენტებისთვის ეს არის ერთ-ერთი საბაზისო თემა, რადგან პრაქტიკულად ყველა PyQGIS სკრიპტში საჭიროა პროექტის ფენებთან მუშაობა.
