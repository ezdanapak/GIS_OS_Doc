# QgsRasterLayer PyQGIS-ში

`QgsRasterLayer` არის QGIS-ის კლასი, რომელიც გამოიყენება **რასტრული მონაცემების** (მაგ. GeoTIFF, JPEG, DEM, სატელიტური სურათები და სხვ.) ჩასატვირთად და სამართავად.

---

## 🔑 ძირითადი კონცეფცია

რასტრული შრე შედგება **პიქსელების მატრიცისგან**. თითოეულ პიქსელს აქვს მნიშვნელობა (მაგ. სიმაღლე, ტემპერატურა, სურათის ფერი).  
PyQGIS-ში `QgsRasterLayer` საშუალებას გაძლევს:

- ჩატვირთო და აჩვენო სხვადასხვა ფორმატის რასტრები (GeoTIFF, ASCII GRID, JPEG, PNG და სხვ.)
- იმუშაო მრავალბანდიან (multiband) მონაცემებთან.
- წაიკითხო პიქსელების მნიშვნელობები.
- გამოიყენო სტილიზაცია (symbology).
- შეასრულო ანალიზი Raster Processing Toolbox–ით.

---

## 📂 ძირითადი ატრიბუტები

- **Datasource path** – ფაილის მისამართი (მაგ. `"C:/data/dem.tif"`)
- **Layer name** – შრის სახელი QGIS პროექტში
- **Provider type** – ჩვეულებრივ `"gdal"` (რადგან GDAL გამოიყენება რასტრული ფაილების წასაკითხად)

---

## 📝 მაგალითები

### 1. რასტრული ფაილის ჩატვირთვა

```python
from qgis.core import QgsRasterLayer

path = r"C:\Users\Public\GIS\data\dem.tif"
layer_name = "Digital Elevation Model"

raster_layer = QgsRasterLayer(path, layer_name, "gdal")

if raster_layer.isValid():
    QgsProject.instance().addMapLayer(raster_layer)
    print("Raster loaded successfully!")
else:
    print("Failed to load raster.")
```

---

### 2. რასტრული შრის ინფორმაციის ამოღება

```python
print("Layer name:", raster_layer.name())
print("Crs:", raster_layer.crs().authid())
print("Width:", raster_layer.width())
print("Height:", raster_layer.height())
print("Bands:", raster_layer.bandCount())
```

---

### 3. კონკრეტული ბანდის ინფორმაცია

```python
provider = raster_layer.dataProvider()

# ბანდის სტატისტიკის გამოთვლა
stats = provider.bandStatistics(1)
print("Minimum:", stats.minimumValue)
print("Maximum:", stats.maximumValue)
print("Mean:", stats.mean)
```

---

### 4. პიქსელის მნიშვნელობის ამოღება კოორდინატიდან

```python
from qgis.core import QgsPointXY

point = QgsPointXY(356671, 4679923)
ident = raster_layer.dataProvider().identify(point, QgsRaster.IdentifyFormatValue)

if ident.isValid():
    print("Pixel value:", ident.results())
```

---

### 5. სიმბოლიზაციის ცვლილება (Singleband Gray)

```python
from qgis.core import QgsSingleBandGrayRenderer

provider = raster_layer.dataProvider()
renderer = QgsSingleBandGrayRenderer(provider, 1)  # პირველი ბანდი
raster_layer.setRenderer(renderer)
raster_layer.triggerRepaint()
```

---

### 6. სიმბოლიზაცია ფერადი პალიტრით (Pseudo color)

```python
from qgis.core import QgsColorRampShader, QgsRasterShader, QgsSingleBandPseudoColorRenderer
from qgis.PyQt.QtGui import QColor

provider = raster_layer.dataProvider()
fcn = QgsColorRampShader()
fcn.setColorRampType(QgsColorRampShader.Interpolated)

# მინ/მაქს მნიშვნელობები
fcn.setColorRampItemList([
    QgsColorRampShader.ColorRampItem(0, QColor(0,0,255), 'Low'),
    QgsColorRampShader.ColorRampItem(1000, QColor(0,255,0), 'Medium'),
    QgsColorRampShader.ColorRampItem(2000, QColor(255,0,0), 'High')
])

shader = QgsRasterShader()
shader.setRasterShaderFunction(fcn)

renderer = QgsSingleBandPseudoColorRenderer(provider, 1, shader)
raster_layer.setRenderer(renderer)
raster_layer.triggerRepaint()
```

---

## ⚙️ გამოყენების სფეროები

- **DEM (Digital Elevation Model)** → სიმაღლის ანალიზი, დახრილობა, ექსპოზიცია
- **სატელიტური სურათები** → Landsat, Sentinel, MODIS
- **ოროფოტოები (Orthoimagery)** → კარტოგრაფია, ტოპოგრაფიული რუკები
- **კლიმატური მონაცემები** → ტემპერატურა, ნალექები

---

## ℹ️ შენიშვნები

- Raster always uses **GDAL provider** PyQGIS-ში.
- CRS-ის დამთხვევა აუცილებელია სხვა შრეებთან სწორი გადაფარვისთვის.
- დიდ რასტრებზე მუშაობისას შეიძლება საჭირო გახდეს **pyramids** და **tiling**.

---

# დასკვნა

`QgsRasterLayer` არის PyQGIS-ის ძირითადი ინსტრუმენტი რასტრული მონაცემების სამართავად.  
მისი საშუალებით შესაძლებელია როგორც მარტივი ვიზუალიზაცია, ასევე რთული გეოანალიზი Processing Toolbox-თან ერთად.
