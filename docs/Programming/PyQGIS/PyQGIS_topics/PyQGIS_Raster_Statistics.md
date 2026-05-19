# 🧮 Raster Statistics & Calculations — PyQGIS

PyQGIS გვაძლევს საშუალებას მოვახდინოთ რასტრული მონაცემების სტატისტიკური ანალიზი, პიქსელების ამოღება, მათემატიკური ოპერაციები და სხვა სხვადასხვა გამოთვლები.

---

## 📊 **Statistics 1 — რასტრული სტატისტიკა (მინიმუმი, მაქსიმუმი და სხვ.)**

ამ მაგალითში გამოითვლება რასტრული ფენის ძირითადი სტატისტიკური მახასიათებლები — **მინიმუმი**, **მაქსიმუმი**, **საშუალო**, **დიაპაზონი**, **ჯამი** და **კვადრატების ჯამი**.

```python
fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_9\Raster\DEM\dem.tif'

rlayer = iface.addRasterLayer(fn)

stats = rlayer.dataProvider().bandStatistics(1, QgsRasterBandStats.All)

print("minimumValue:", stats.minimumValue)
print("maximumValue:", stats.maximumValue)
print("mean:", stats.mean)
print("range:", stats.range)
print("sum:", stats.sum)
print("sumOfSquares:", stats.sumOfSquares)
```

**შედეგის მაგალითი:**
```
minimumValue:  -18.0  
maximumValue:  5035.0  
mean:  1233.8903706592614  
range:  5053.0  
sum:  13471455895.0  
sumOfSquares:  7804600900270.026
```

---

## 📍 **Statistics 2 — პიქსელის მნიშვნელობის ამოღება კონკრეტულ წერტილზე**

👉 ამოწმებს კონკრეტული კოორდინატის მნიშვნელობას რასტრში.  
თუ წერტილი სცდება რასტრის საზღვრებს, დაბრუნდება `False`.

```python
fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_9\Raster\DEM\dem.tif'

rlayer = iface.addRasterLayer(fn)

val, res = rlayer.dataProvider().sample(QgsPointXY(474517, 4615243), 1)

print(val, res)
```

📘 **შენიშვნა:**
- თუ `res = True`, მაშინ `val` შეიცავს პიქსელის მნიშვნელობას.  
- თუ `res = False`, წერტილი რასტრის ფარგლებს გარეთაა.

---

## 🧠 **Statistics 3 — რასტრული მონაცემის წაკითხვა როგორც Array**

👉 მონაცემების უფრო ღრმა ანალიზისთვის შესაძლებელია მთელი რასტრული მატრიცის წაკითხვა `gdal` მოდულით.

```python
from osgeo import gdal

fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_9\Raster\DEM\dem.tif'

rlayer = iface.addRasterLayer(fn)

ds = gdal.Open(rlayer.dataProvider().dataSourceUri())
tin_arr = ds.GetRasterBand(1).ReadAsArray()

print(tin_arr)           # მთლიანი Array
print(len(tin_arr))      # რიგების რაოდენობა
print(len(tin_arr[0]))   # სვეტების რაოდენობა
print(tin_arr[1200][1200])  # კონკრეტული პიქსელის მნიშვნელობა
```

**შედეგის მაგალითი:**
```
[[255. 255. 255. 255. 255. 255.]
 [255. 255. 255. 255. 255. 255.]
 ...
 [255. 255. 255. 255. 255. 255.]]
3644
6883
255.0
```

---

## 🧮 **Raster Calculator — რასტრის კალკულატორი PyQGIS-ში**

👉 გამოიყენება მარტივი მათემატიკური ოპერაციების შესასრულებლად რასტერზე (მაგ. მნიშვნელობების დამატება ან გამრავლება).

```python
from osgeo import gdal

fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_9\Raster\DEM\dem.tif'

lyr1 = QgsRasterLayer(fn)
out = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_9\Raster\DEM\dem_calc.tif'

entries = []

ras = QgsRasterCalculatorEntry()
ras.ref = 'ras@1'
ras.raster = lyr1
ras.bandNumber = 1
entries.append(ras)

calc = QgsRasterCalculator(
    'ras@1 + 25.7',  # მაგალითი: თითოეულ პიქსელს ემატება 25.7
    out,
    'GTiff',
    lyr1.extent(),
    lyr1.width(),
    lyr1.height(),
    entries
)

calc.processCalculation()
iface.addRasterLayer(out)
```

---

## 🎨 **Symbology — რასტრული გამოსახულების სიმბოლიზირება (ფერების მიცემა)**

👉 ვიზუალურად აღსაქმელი ფერების მინიჭება მნიშვნელობების მიხედვით.

```python
rl = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_9\Raster\DEM\Georgia_slope.tif'
ifc = iface.addRasterLayer(rl)

stats = ifc.dataProvider().bandStatistics(1, QgsRasterBandStats.All)
min = stats.minimumValue
a = 10
b = 25
c = 40
max = stats.maximumValue

CS = QgsColorRampShader()
CS.setColorRampType(QgsColorRampShader.Interpolated)

lst = [
    QgsColorRampShader.ColorRampItem(min, QColor(250, 235, 221)),
    QgsColorRampShader.ColorRampItem(a, QColor(245, 136, 96)),
    QgsColorRampShader.ColorRampItem(b, QColor('#cb1b4f')),
    QgsColorRampShader.ColorRampItem(c, QColor('#611f53')),
    QgsColorRampShader.ColorRampItem(max, QColor('#03051a'))
]

CS.setColorRampItemList(lst)
shad = QgsRasterShader()
shad.setRasterShaderFunction(CS)

render = QgsSingleBandPseudoColorRenderer(ifc.dataProvider(), 1, shad)
ifc.setRenderer(render)
```

---


## 🗺️ **Reclassify by Table — რეკლასიფიცირება ცხრილის მიხედვით**

👉 აღნიშნული ფუნქცია საშუალებას გვაძლევს დავაჯგუფოთ რასტრის მნიშვნელობები განსაზღვრულ დიაპაზონებში (კლასებში).

```python
rl = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_9\Raster\DEM\Georgia_slope.tif'
out = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_9\Raster\DEM\G_Slope_Reclass.tif'

processing.run(
    'native:reclassifybytable',
    {
        'INPUT_RASTER': rl,
        'RASTER_BAND': 1,
        'TABLE': [0, 10, 1, 10, 25, 2, 25, 40, 3, 40, 55, 4],
        'NO_DATA': 0,
        'RANGE_BOUNDARIES': 0,
        'NODATA_FOR_MISSING': True,
        'DATA_TYPE': 5,
        'OUTPUT': out
    }
)

iface.addRasterLayer(out)
```

---

📘 **შენიშვნა:**  
`QgsRasterCalculator` საშუალებას გაძლევთ შექმნათ ახალი რასტრი სხვადასხვა მათემატიკური გამოთვლებით (მაგ. `ras@1 * 2`, `ras@1 - 100` და სხვ.).

---

✅ **დასკვნა:**  
PyQGIS იძლევა ძლიერ ინსტრუმენტებს რასტრული მონაცემების ანალიზისა და მათზე ოპერაციების შესრულებისთვის — სტატისტიკა, პიქსელური ამოღება, მათემატიკური გამოთვლები და სრული მატრიცის წვდომა.

---
