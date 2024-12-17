მონაცემების დამუშავება

მონიშვნის ოპერატორები

'OPERATOR':0

0 — =

1 — ≠

2 — >

3 — >=

4 — <

5 — <=

6 — begins with

7 — contains

8 — is null

9 — is not null

10 — does not contain


ინტერაქტიული მონიშვნის მეთოდები
'METHOD':0

0 — creating new selection

1 — adding to current selection

2 — removing from current selection

3 — selecting within current selection




შრიდან მონაცემების წამოღება, დამრგვალება, დაფილტვრა და ახალ შრედ ამოღება


#layer_path = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_6\original_rivers.shp'

#layer = QgsVectorLayer(layer_path, 'rivers', 'ogr')



layers = QgsProject.instance().mapLayersByName('rivers')

layer = layers[0]

feats = layer.getFeatures()



L = []

for i in feats:



   L.append(round(i["Shape_Leng"]))



L.sort(reverse=True)

print(L[5])

processing.run("qgis:selectbyattribute", {'INPUT':layer, \



   'FIELD':'Shape_Leng','OPERATOR':2,'VALUE':L[5],'METHOD':0})







fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_6\river_select.shp'



writer = QgsVectorFileWriter.writeAsVectorFormat(layer, fn, \



   'utf-8', driverName = 'ESRI Shapefile', onlySelected = True)



    

layer1 = iface.addVectorLayer(fn, '', 'ogr')



del(writer)



ბუფერი  - Buffer  

layers = QgsProject.instance().mapLayersByName('river_select')

layer = layers[0]

fields = layer.fields()

feats = layer.getFeatures()



dist = 100



fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_6\river_select_buffer.shp'

writer = QgsVectorFileWriter(fn, 'UTF-8', fields, QgsWkbTypes.Polygon, \

   layer.sourceCrs(), 'ESRI Shapefile')



for i in feats:

   geo = i.geometry()

   buf = geo.buffer(dist, 50)

   i.setGeometry(buf)

   writer.addFeature(i)



del writer

iface.addVectorLayer(fn, '', 'ogr')



ბუფერი 2

layers = QgsProject.instance().mapLayersByName('river_select')

layer = layers[0]



fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_6\riverb1.shp'



processing.run('native:buffer', {'INPUT' : layer, \

               'DISTANCE':150, 'OUTPUT' : fn})

iface.addVectorLayer(fn, '', 'ogr')





Dissolve





layers = QgsProject.instance().mapLayersByName('Municipality')

layer = layers[0]



fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_6\mun_dissolve.shp'



processing.run("native:dissolve", {'INPUT':layer ,'FIELD':[],\

'SEPARATE_DISJOINT':False,'OUTPUT':fn})

iface.addVectorLayer(f, '', 'ogr')



დაშლა - Dissolve



buffer/dissolve



#layers = QgsProject.instance().mapLayersByName('Municipality')

#layer = layers[0]

#

#fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_6\mun_dissolve1.shp'

#

#processing.run('native:buffer', {'INPUT' : layer,'FIELD':['Region'], 'DISTANCE':500,\

#               'DISSOLVE' : True, 'OUTPUT' : fn})

#iface.addVectorLayer(fn, '', 'ogr')




განმარტება

'', შრის სახელწოდებაა

iface.addVectorLayer(fn, '', 'ogr')



NameError: name 'Region' is not defined ნიშნავს რომ [Region] ჩასმული უნდა იყოს ფრჩხილებში >>>  ['Region']

processing.run("native:dissolve", {'INPUT':layer ,'FIELD':['Region'],\

'SEPARATE_DISJOINT':False,'OUTPUT':fn})


NameError: name 'f' is not defined

iface.addVectorLayer(f, '', 'ogr')

iface.addVectorLayer(fაქ აკლია n ასო და მაგიტომ ვერ ხედავს, '', 'ogr')

iface.addVectorLayer(fn, '', 'ogr')

