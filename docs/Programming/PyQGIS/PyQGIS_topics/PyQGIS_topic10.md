Statistics 1 - სტატისტიკა რასტრზე 1

fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_9\Raster\DEM\dem.tif'



rlayer = iface.addRasterLayer(fn)



stats = rlayer.dataProvider().bandStatistics(1, QgsRasterBandStats.All)



print("minimumValue: ", stats.minimumValue)

print("maximumValue: ", stats.maximumValue)

print("mean: ", stats.mean)

print("range: ", stats.range)

print("sum: ", stats.sum)

print("sumOfSquares: ", stats.sumOfSquares)





შედეგის მაგალითი

#minimumValue:  -18.0

#maximumValue:  5035.0

#mean:  1233.8903706592614

#range:  5053.0

#sum:  13471455895.0

#sumOfSquares:  7804600900270.026


Statistics 2 - სტატისტიკა რასტრზე 2
value მნიშვნელობა result True or False

თუ ეს კოორდინატი რასტრს სცდება მნიშვნელობას ვერ წამოიღებს. შედეგი უნდა იყოს 0 ან 1 True or False. თუ True დაჯდა მაშინ ამ კოორდინატზე რასტრის მნიშვნელობას წამოიღებს და დაბეჭდავს.


fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_9\Raster\DEM\dem.tif'



rlayer = iface.addRasterLayer(fn)



val, res = rlayer.dataProvider().\

    sample(QgsPointXY(474517,4615243), 1)

    

print(val, res)


Statistics 3 - სტატისტიკა რასტრზე 3


from osgeo import gdal

fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_9\Raster\DEM\dem.tif'



rlayer = iface.addRasterLayer(fn)



ds = gdal.Open(rlayer.dataProvider().dataSourceUri())

tin_arr = ds.GetRasterBand(1).ReadAsArray()

print(tin_arr) #მთლიანი Array

print(len(tin_arr)) #რამდენი რიგია

print(len(tin_arr[0])) #რამდენი სვეტია

print(tin_arr[1200][1200]) #კონკრეტულ კვეთაზე 1 კონკრეტული რა მნიშვნელობა დევს


შედეგის მაგალითი



[[255. 255. 255. 255. 255. 255.]

 [255. 255. 255. 255. 255. 255.]

 [255. 255. 255. 255. 255. 255.]

 ...

 [255. 255. 255. 255. 255. 255.]

 [255. 255. 255. 255. 255. 255.]

 [255. 255. 255. 255. 255. 255.]]

3644

6883

255.0


Raster calculator - რასტრის კალკულატორი

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



calc = QgsRasterCalculator('ras@1 + 25.7', out, 'GTiff', \

    lyr1.extent(), lyr1.width(), lyr1.height(), entries)



calc.processCalculation()

iface.addRasterLayer(out)