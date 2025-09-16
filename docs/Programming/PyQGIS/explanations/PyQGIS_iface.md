# QGIS Python Interface (iface)

## რა არის `iface`?
`iface` არის **QgisInterface** ობიექტი, რომელიც Python კონსოლში და QGIS პლაგინებში უზრუნველყოფს წვდომას QGIS-ის გრაფიკულ ინტერფეისთან (GUI).  
მისი საშუალებით შესაძლებელია:
- შრეების დამატება/წაშლა
- რუკის ხედის მართვა
- მომხმარებლის შეტყობინებების ჩვენება
- პროექტის ფანჯარასთან ურთიერთობა

---

## iface.addVectorLayer()

### აღწერა
`iface.addVectorLayer()` გამოიყენება **ვექტორული შრის დასამატებლად QGIS-ის ინტერფეისში**.  

### სინტაქსი
```python
iface.addVectorLayer(path, layer_name, provider)
```

### პარამეტრები
- **path** *(str)* – ფაილის გზა ან მონაცემთა წყაროს URI  
- **layer_name** *(str)* – სახელი Layers Panel-ში  
- **provider** *(str)* – მონაცემთა პროვაიდერი (მაგ.: `"ogr"`, `"postgres"`, `"spatialite"`, `"memory"`)

### დაბრუნებული მნიშვნელობა
აბრუნებს **QgsVectorLayer** ობიექტს (ან `None`, თუ შრე ვერ ჩაიტვირთა).

### მაგალითები
```python
# Shapefile
iface.addVectorLayer("C:/data/roads.shp", "Roads", "ogr")

# GeoJSON
iface.addVectorLayer("C:/data/buildings.geojson", "Buildings", "ogr")

# PostGIS
uri = "dbname='gisdb' host=localhost port=5432 user='postgres' password='1234' table=\"public\".\"roads\" (geom)"
iface.addVectorLayer(uri, "Roads from PostGIS", "postgres")
```

---

## ალტერნატივა: QgsVectorLayer + QgsProject

```python
layer = QgsVectorLayer("C:/data/roads.shp", "Roads", "ogr")
if layer.isValid():
    QgsProject.instance().addMapLayer(layer)
```

---

## iface-ის სხვა ხშირად გამოყენებული მეთოდები

### 1. რუკის ხედის კონტროლი
- **`iface.mapCanvas()`** – აბრუნებს რუკის Canvas ობიექტს  
- **`iface.zoomIn()`** – მასშტაბის გაზრდა  
- **`iface.zoomOut()`** – მასშტაბის შემცირება  
- **`iface.zoomFull()`** – სრული_extent-ზე გადასვლა  
- **`iface.zoomToActiveLayer()`** – აქტიურ შრეზე გადაზუმვა  

### 2. შრეებთან მუშაობა
- **`iface.activeLayer()`** – აბრუნებს ამჟამინდელ აქტიურ შრეს  
- **`iface.addRasterLayer(path, name)`** – რასტრული შრის დამატება  
- **`iface.legendInterface()`** *(QGIS 2.x)* – შრეების კონტროლი (QGIS 3-ში გამოყენებულია `QgsLayerTree`)  

### 3. შეტყობინებები და დიალოგები
- **`iface.messageBar().pushMessage("Title", "Text")`** – შეტყობინების ჩვენება Message Bar-ში  
- **`iface.messageBar().pushWarning("Warning", "Something went wrong")`**  
- **`iface.messageBar().pushSuccess("Success", "Operation completed")`**  

### 4. GUI ფანჯრები და პანელები
- **`iface.mainWindow()`** – აბრუნებს QGIS-ის მთავარ ფანჯარას (QMainWindow ობიექტი)  
- **`iface.layerTreeView()`** – აბრუნებს შრეების ხის ვიზუალს  
- **`iface.newProject()`** – ქმნის ახალ ცარიელ პროექტს  

### 5. კურსორის პოზიცია
- **`iface.mapCanvas().mouseLastXY()`** – ბოლო კურსორის კოორდინატები Canvas-ზე  
- **`iface.mapCanvas().extent()`** – ამჟამინდელი extent  

---

## სად გამოიყენება `iface`
- **QGIS Python Console** – პირდაპირი სკრიპტების გასაშვებად  
- **QGIS Plugins** – GUI-ზე რეაგირებისთვის და შრეების სამართავად  
- **სასწავლო მაგალითებში** – სტუდენტებისთვის QGIS API-ის გაცნობისას  

---

## ✍️ რეზიუმე
- `iface` = **QgisInterface**, რომელიც აკავშირებს Python-სა და QGIS ინტერფეისს.  
- `iface.addVectorLayer()` ამატებს ვექტორულ შრეს GUI-ში.  
- `iface`-ში ასევე შედის რუკის მართვა, შეტყობინებების ჩვენება, შრეების კონტროლი და პროექტის ფანჯარასთან წვდომა.  
- სასწავლო პროცესში `iface` საშუალებას აძლევს სტუდენტებს **ინტერაქტიულად მართონ QGIS Python Console-იდან**.
