# მონაცემების დამუშავება

## მონიშვნის ოპერატორები

'OPERATOR':0

```
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
```

## ინტერაქტიური მონიშვნის მეთოდები

'METHOD':0

```
0 — creating new selection
1 — adding to current selection
2 — removing from current selection
3 — selecting within current selection
```

---

# შრიდან მონაცემების წამოღება, დამრგვალება, დაფილტვრა და ახალ შრედ ამოღება

```python
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

processing.run("qgis:selectbyattribute", {'INPUT':layer,
   'FIELD':'Shape_Leng','OPERATOR':2,'VALUE':L[5],'METHOD':0})

fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_6\river_select.shp'

writer = QgsVectorFileWriter.writeAsVectorFormat(layer, fn,
   'utf-8', driverName='ESRI Shapefile', onlySelected=True)

layer1 = iface.addVectorLayer(fn, '', 'ogr')
del(writer)
```

---

# ბუფერი (Buffer)

```python
layers = QgsProject.instance().mapLayersByName('river_select')
layer = layers[0]
fields = layer.fields()
feats = layer.getFeatures()

dist = 100

fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_6\river_select_buffer.shp'
writer = QgsVectorFileWriter(fn, 'UTF-8', fields, QgsWkbTypes.Polygon,
   layer.sourceCrs(), 'ESRI Shapefile')

for i in feats:
   geo = i.geometry()
   buf = geo.buffer(dist, 50)
   i.setGeometry(buf)
   writer.addFeature(i)

del writer
iface.addVectorLayer(fn, '', 'ogr')
```

---

# ბუფერი 2

```python
layers = QgsProject.instance().mapLayersByName('river_select')
layer = layers[0]

fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_6\riverb1.shp'

processing.run('native:buffer', {'INPUT':layer,
               'DISTANCE':150, 'OUTPUT':fn})
iface.addVectorLayer(fn, '', 'ogr')
```

---

# Dissolve

```python
layers = QgsProject.instance().mapLayersByName('Municipality')
layer = layers[0]

fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_6\mun_dissolve.shp'

processing.run("native:dissolve", {'INPUT':layer ,'FIELD':[],
'SEPARATE_DISJOINT':False,'OUTPUT':fn})

iface.addVectorLayer(fn, '', 'ogr')
```

---

# დაშლა (Dissolve)

```python
#layers = QgsProject.instance().mapLayersByName('Municipality')
#layer = layers[0]
#
#fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_6\mun_dissolve1.shp'
#
#processing.run('native:buffer', {'INPUT' : layer,'FIELD':['Region'], 'DISTANCE':500,
#               'DISSOLVE' : True, 'OUTPUT' : fn})
#iface.addVectorLayer(fn, '', 'ogr')
```

# ვექტორული მონაცემების მოჭრა და გაერთიანება PyQGIS-ით

## ვექტორული მონაცემების მოჭრა სხვა ვექტორით (Clip)

მოვჭრათ მუნიციპალიტეტები რეგიონით:

```python
layers = QgsProject.instance().mapLayersByName('Municipality')
over = QgsProject.instance().mapLayersByName('imereti')
layer = layers[0]
ov = over[0]

fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_7\test.shp'

processing.run('native:clip', {'INPUT':layer, 'OVERLAY':ov, 'OUTPUT':fn})
iface.addVectorLayer(fn, '', 'ogr')
ვექტორული მონაცემების მოჭრა სხვა ვექტორის ჩარჩოთი (Clip vector by extent)
იმერეთის რეგიონის ექსტენტით მუნიციპალიტეტების მოჭრა:

python
Copy code
layers = QgsProject.instance().mapLayersByName('Municipality')
over = QgsProject.instance().mapLayersByName('imereti')
layer = layers[0]
ov = over[0]

fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_7\test.shp'

processing.run("native:extractbyextent", {'INPUT':layer,
    'EXTENT':ov,'CLIP':False,'OUTPUT':fn})
iface.addVectorLayer(fn, '', 'ogr')
ვექტორული მონაცემების მოჭრა ადგილმდებარეობით (Extract by location)
ამოვჭრათ დასახლებული პუნქტებიდან ის ელემენტები რომლებიც იკვეთება იმერეთის რეგიონზე:

python
Copy code
layers = QgsProject.instance().mapLayersByName('settlement')
intersct = QgsProject.instance().mapLayersByName('imereti')
layer = layers[0]
intsct = intersct[0]

fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_7\settlement_imereti.shp'

processing.run("native:extractbylocation", {'INPUT':layer,
            'PREDICATE':[0],'INTERSECT':intsct,'OUTPUT':fn})
iface.addVectorLayer(fn, '', 'ogr')
ამოვჭრათ დასახლებული პუნქტებიდან ის ელემენტები რომლებიც იკვეთება მონიშნულ მუნიციპალიტეტებზე:

python
Copy code
layers = QgsProject.instance().mapLayersByName('settlement')
layer = layers[0]

intersct = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_7\Municipality.shp'
fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_7\test.shp'

processing.run("native:extractbylocation", {'INPUT':layer,'PREDICATE':[0],
    'INTERSECT':QgsProcessingFeatureSourceDefinition(intersct,
    selectedFeaturesOnly=True, featureLimit=-1,
    geometryCheck=QgsFeatureRequest.GeometryAbortOnInvalid),'OUTPUT':fn})

iface.addVectorLayer(fn, '', 'ogr')
სხვადასხვა ვექტორული შრის გაერთიანება (Merge vector layers)
ორი სხვადასხვა ვექტორული შრის გაერთიანება:

python
Copy code
layers_aW = QgsProject.instance().mapLayersByName('chiatura')
layers_af = QgsProject.instance().mapLayersByName('sachxere')
layer_aW = layers_aW[0]
layer_af = layers_af[0]

fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_7\chiatura_sachxere.shp'
processing.run('native:mergevectorlayers', {'LAYERS':[layer_aW, layer_af],
    'CRS':QgsCoordinateReferenceSystem('EPSG:32637'), 'OUTPUT':fn})

iface.addVectorLayer(fn, '', 'ogr')