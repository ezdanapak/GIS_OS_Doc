# 🗻 DEM (Digital Elevation Model) — მონაცემთა დამუშავება

---

## 🧩 ორი რასტრული DEM-ის გაერთიანება *(merge)*

```python
fn = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/srtm_46_04.tif'
fn1 = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/srtm_45_04.tif'

output = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/dem.tif'

processing.run("gdal:merge", {
    'INPUT': [fn, fn1],
    'PCT': False,
    'SEPARATE': False,
    'NODATA_INPUT': None,
    'NODATA_OUTPUT': None,
    'OPTIONS': '',
    'EXTRA': '',
    'DATA_TYPE': 5,
    'OUTPUT': output
})

layer = iface.addRasterLayer(output, '')
```

---

## ✂️ კავკასიის DEM-ის მოჭრა საქართველოს კონტურით *(cliprasterbymasklayer)*

```python
fn = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/dem.tif'
fn1 = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/shp/Georgia_regionebi.shp'

output = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/Georgia_dem.tif'

processing.run("gdal:cliprasterbymasklayer", {
    'INPUT': fn,
    'MASK': fn1,
    'SOURCE_CRS': QgsCoordinateReferenceSystem('EPSG:4326'),
    'TARGET_CRS': QgsCoordinateReferenceSystem('EPSG:32638'),
    'TARGET_EXTENT': None,
    'NODATA': 255,
    'ALPHA_BAND': False,
    'CROP_TO_CUTLINE': True,
    'KEEP_RESOLUTION': False,
    'SET_RESOLUTION': False,
    'MULTITHREADING': False,
    'OPTIONS': '',
    'DATA_TYPE': 0,
    'EXTRA': '',
    'OUTPUT': output
})

layer = iface.addRasterLayer(output, '')
```

---

## 📉 ფერდობების დახრილობა *(Slope)*

```python
dem = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/Georgia_dem.tif'
slp = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/Georgia_slope.tif'

processing.run('qgis:slope', {
    'INPUT': dem,
    'Z_FACTOR': 1,
    'OUTPUT': slp
})

iface.addRasterLayer(slp)
```

---

## 🧭 ექსპოზიცია *(Aspect)*

```python
dem = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/Georgia_dem.tif'
aspect = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/Georgia_aspect.tif'

processing.run("native:aspect", {
    'INPUT': dem,
    'Z_FACTOR': 1,
    'OUTPUT': aspect
})

iface.addRasterLayer(aspect)
```

---

## 🌄 რელიეფის ჩრდილი *(Hillshade)*

```python
dem = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/Georgia_dem.tif'
hillshade = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/Georgia_hillshade.tif'

processing.run("native:hillshade", {
    'INPUT': dem,
    'Z_FACTOR': 1,
    'AZIMUTH': 300,
    'V_ANGLE': 40,
    'OUTPUT': hillshade
})

iface.addRasterLayer(hillshade)
```

---

## 🗺️ იზოჰიფსების ამოღება *(Contour lines)*

```python
dem = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/Georgia_dem.tif'
contour = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/shp/contour.shp'

processing.run("gdal:contour", {
    'INPUT': dem,
    'BAND': 1,
    'INTERVAL': 150,
    'FIELD_NAME': 'ELEV',
    'CREATE_3D': False,
    'IGNORE_NODATA': False,
    'NODATA': 255,
    'OFFSET': 0,
    'EXTRA': '',
    'OUTPUT': contour
})

iface.addVectorLayer(contour, '', 'ogr')
```

---

## 📊 რასტრული ჰისტოგრამა *(Raster Histogram)*

```python
fn = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/Georgia_dem.tif'
histogram = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/histogram/dem_histogram.html'

processing.run("qgis:rasterlayerhistogram", {
    'INPUT': fn,
    'BAND': 1,
    'BINS': 15,
    'OUTPUT': histogram
})
```

---

## 📐 Extent-იდან პოლიგონის შექმნა *(Polygon from Layer Extent)*

```python
cont = r'D:/!Work/!BTU/Raster/Contour_Vere.shp'
ext = r'D:/!Work/!BTU/Raster/Extent_Vere.shp'

processing.run("native:polygonfromlayerextent", {
    'INPUT': cont,
    'ROUND_TO': 0,
    'OUTPUT': ext
})

iface.addVectorLayer(ext, '', 'ogr')
```

---

## 🕳️ TIN ინტერპოლაცია *(Triangulated Irregular Network)*

```python
cont = r'D:/!Work/!BTU/Raster/Contour_Vere.shp'
tin = r'D:/!Work/!BTU/Raster/TIN_Vere.tif'

processing.run("qgis:tininterpolation", {
    'INTERPOLATION_DATA': cont + '::~::0::~::1::~::1',
    'METHOD': 0,
    'EXTENT': '451209,483929,4608998,4625248 [EPSG:32638]',
    'PIXEL_SIZE': 10,
    'OUTPUT': tin
})

iface.addRasterLayer(tin)
```

---

## 🎨 სიმბოლიზაცია *(Graduated Symbol Renderer)*

```python
from qgis.PyQt.QtGui import QColor
from qgis.core import QgsVectorLayer, QgsSymbol, QgsRendererRange, QgsGraduatedSymbolRenderer, QgsWkbTypes, QgsProject

file_name = r'C:/Users/KETI/Desktop/QGIS/gis-masala/tema_6/rivers.shp'
layer_name = 'Rivers'
layer = QgsVectorLayer(file_name, layer_name, 'ogr')

range_field = 'Shape_Leng'
opacity = 0.75
minval = 1000
maxval = 20000
color = '#c0ec19'
label = 'short'

range1_symbol = QgsSymbol.defaultSymbol(QgsWkbTypes.LineGeometry)
range1_symbol.setColor(QColor(color))
range1_symbol.setOpacity(opacity)
range1 = QgsRendererRange(minval, maxval, range1_symbol, label)

renderer = QgsGraduatedSymbolRenderer(range_field, [range1])
layer.setRenderer(renderer)
QgsProject.instance().addMapLayer(layer)
```


# 🌄 Raster მონაცემების მსუბუქი ოპერაციები PyQGIS-ით

ეს ფაილი მოიცავს მარტივ და სწრაფ ოპერაციებს რასტრული მონაცემების (DEM, სატელიტური გამოსახულება და ა.შ.) დასამუშავებლად PyQGIS-ში.

---

## 🧩 1. მინიმალური და მაქსიმალური მნიშვნელობების მიღება
```python
layer = iface.activeLayer()
provider = layer.dataProvider()

stats = provider.bandStatistics(1, QgsRasterBandStats.All)
print(f"Min: {stats.minimumValue()}, Max: {stats.maximumValue()}")
```
👉 გამოსადეგია DEM-ის სიმაღლის დიაპაზონის ან სპექტრული მნიშვნელობების გასარკვევად.

---

## 🎚️ 2. პიქსელის მნიშვნელობა კონკრეტულ წერტილზე
```python
from qgis.core import QgsPointXY

layer = iface.activeLayer()
point = QgsPointXY(443000, 4615000)  # ჩასვი შენი კოორდინატები
value = layer.dataProvider().sample(point, 1)
print("Pixel value:", value)
```
👉 სწრაფი გზაა კონკრეტული ადგილის სიმაღლის ან სხვა მნიშვნელობის შესამოწმებლად.

---

## 🧮 3. რასტრული გამრავლება ან გაყოფა
```python
import processing

input_raster = r'C:/data/dem.tif'
output = r'C:/data/dem_scaled.tif'

processing.run("gdal:rastercalculator", {
    'INPUT_A': input_raster,
    'BAND_A': 1,
    'FORMULA': 'A/10',  # ან 'A*1.5'
    'OUTPUT': output
})

iface.addRasterLayer(output, 'DEM_scaled')
```
👉 გამოსადეგია DEM-ის ერთეულების ან კონტრასტის შესაცვლელად.

---

## 🧩 4. რასტრული რეპროექცია (CRS შეცვლა)
```python
input_raster = r'C:/data/dem.tif'
output = r'C:/data/dem_32638.tif'

processing.run("gdal:warpreproject", {
    'INPUT': input_raster,
    'SOURCE_CRS': 'EPSG:4326',
    'TARGET_CRS': 'EPSG:32638',
    'RESAMPLING': 0,
    'OUTPUT': output
})

iface.addRasterLayer(output, 'DEM_UTM')
```
👉 გამოსადეგია სხვა ფენებთან თანხვედრისთვის.

---

## ✂️ 5. Extent-ის მიხედვით მოჭრა
```python
raster = r'C:/data/dem.tif'
output = r'C:/data/dem_clip.tif'

processing.run("gdal:cliprasterbyextent", {
    'INPUT': raster,
    'PROJWIN': [440000, 4610000, 450000, 4600000],  # xmin, ymin, xmax, ymax
    'OUTPUT': output
})

iface.addRasterLayer(output, 'DEM_clip')
```
👉 კონკრეტული უბნის ამოსაჭრელად მარტივი მეთოდი.

---

## 🎨 6. ფერის პალიტრის დამატება (Color Ramp)
```python
layer = iface.activeLayer()
shader = QgsRasterShader()
color_ramp = QgsColorRampShader()
color_ramp.setColorRampType(QgsColorRampShader.Interpolated)
color_ramp.setColorRampItemList([
    QgsColorRampShader.ColorRampItem(0, QColor(0, 0, 255), 'Low'),
    QgsColorRampShader.ColorRampItem(1000, QColor(255, 255, 0), 'Mid'),
    QgsColorRampShader.ColorRampItem(2000, QColor(255, 0, 0), 'High')
])
shader.setRasterShaderFunction(color_ramp)
renderer = QgsSingleBandPseudoColorRenderer(layer.dataProvider(), 1, shader)
layer.setRenderer(renderer)
layer.triggerRepaint()
```
👉 DEM-ს ანიჭებს სიმაღლის მიხედვით ფერად გრადაციას.

---

