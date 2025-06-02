#DEM

ორი რასტრული მონაცემის გაერთიანება ციფრული რელიეფის(DEM) მაგალითზე. merge

fn = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/srtm_46_04.tif'

fn1 = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/srtm_45_04.tif'



output = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/dem.tif'



processing.run("gdal:merge", {'INPUT':[fn, fn1],\

'PCT':False,'SEPARATE':False,'NODATA_INPUT':None,'NODATA_OUTPUT':None,'OPTIONS':'',\

'EXTRA':'','DATA_TYPE':5,'OUTPUT':output})



layer = iface.addRasterLayer(output, '')


კავკასიის ციფრული რელიეფის მოჭრა საქართველოზე ვექტორული შრით. cliprasterbymasklayer

fn = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/dem.tif'

fn1 = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_9\shp\Georgia_regionebi.shp'



output = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/Georgia_dem.tif'



processing.run("gdal:cliprasterbymasklayer", {'INPUT':fn,\

'MASK':fn1,'SOURCE_CRS':QgsCoordinateReferenceSystem \

('EPSG:4326'),'TARGET_CRS':QgsCoordinateReferenceSystem('EPSG:32638'),'TARGET_EXTENT':None,'NODATA':255,'ALPHA_BAND':False,\

'CROP_TO_CUTLINE':True,'KEEP_RESOLUTION':False,'SET_RESOLUTION':False,'X_RESOLUTION':None,'Y_RESOLUTION':None,\

'MULTITHREADING':False,'OPTIONS':'','DATA_TYPE':0,'EXTRA':'','OUTPUT':output})



layer = iface.addRasterLayer(output, '')




ფერდობების დახრილობა რელიეფიდან(Slope)

dem = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/Georgia_dem.tif'

slp = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/Georgia_slope.tif'



processing.run('qgis:slope', \

    {'INPUT':dem,'Z_FACTOR':1,'OUTPUT':slp})

iface.addRasterLayer(slp)


ექსპოზიცია რელიეფიდან(Aspect)

dem = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/Georgia_dem.tif'

aspect = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/Georgia_aspect.tif'



processing.run(native:aspect", {'INPUT':dem,'Z_FACTOR':1,'OUTPUT':aspect"})

iface.addRasterLayer(aspect)


რელიეფის ჩრდილი (hillshade)

dem = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/Georgia_dem.tif'



hillshade = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/Georgia_hillshade.tif'



processing.run("native:hillshade", {'INPUT':dem,\

'Z_FACTOR':1,'AZIMUTH':300,'V_ANGLE':40,'OUTPUT':hillshade})



iface.addRasterLayer(hillshade)


რელიეფიდან იზოჰიფსების ამოღება ინტერვალებით. contour

dem = r'C:/Users/Public/Documents/GK/PyQGIS/shp/tema_9/Raster/DEM/Georgia_dem.tif'

contour = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_9\shp\contour.shp'



processing.run("gdal:contour", {'INPUT':dem,'BAND':1,'INTERVAL':150,\

'FIELD_NAME':'ELEV','CREATE_3D':False,'IGNORE_NODATA':False,'NODATA':255,\

'OFFSET':0,'EXTRA':'','OUTPUT':contour})



iface.addVectorLayer(contour, '', 'ogr')


რასტრული გამოსახულებიდან ჰისტოგრამის აგება. rasterlayerhistogram

fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_9\Raster\DEM\Georgia_dem.tif'



histogram = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_9\histogram\dem_histogram.html'



processing.run("qgis:rasterlayerhistogram", {'INPUT':f,'BAND':1,\

'BINS':15,'OUTPUT':"histogram"})




დასაკორექტირებელია

#Extent შრის ჩარჩოსგან შექმნას პოლიგონი


cont = r'D:\!Work\!BTU\Raster\Contour_Vere.shp'

ext = r'D:\!Work\!BTU\Raster\Extent_Vere.shp'



processing.run("native:polygonfromlayerextent", \

       {'INPUT':cont,'ROUND_TO':0,'OUTPUT':ext})



iface.addVectorLayer(ext, '', 'ogr')


#TIN

'::~::0::~::1::~::1' არის ვექტორული შრის შემავალი ატრიბუტები სიმაღლე და ა.შ

cont = r'D:\!Work\!BTU\Raster\Contour_Vere.shp'

tin = r'D:\!Work\!BTU\Raster\TIN_Vere.tif'



processing.run("qgis:tininterpolation", \

   {'INTERPOLATION_DATA':cont + '::~::0::~::1::~::1',\

   'METHOD':0,'EXTENT':'451209,483929,4608998,4625248 \

   [EPSG:32638]','PIXEL_SIZE':10,'OUTPUT':tin})



iface.addRasterLayer(tin)



from qgis.PyQt import QtGui

from qgis.core import QgsVectorLayer, QgsSymbol, QgsRendererRange,

QgsGraduatedSymbolRenderer

file_name = r'C:\Users\KETI\Desktop\QGIS\gis-masala\tema_6\rivers.shp'

layer_name = 'Rivers'

layer = QgsVectorLayer(file_name, layer_name, 'ogr')

range_field= 'Shape_Leng'



opacity = 0.75

minval = 1000

maxval = 20000

color = '#c0ec19'

label = 'short'



range1_symbol = QgsSymbol.defaultSymbol(QgsWkbTypes.LineGeometry)

range1_symbol.setColor(QColor(color))

range1_symbol.setOpacity (opacity)

range1 = QgsRendererRange(minval, maxval, range1_symbol, label)



renderer = QgsGraduatedSymbolRenderer(range_field, [range1])

layer.setRenderer(renderer)

QgsProject.instance().addMapLayer(layer) 