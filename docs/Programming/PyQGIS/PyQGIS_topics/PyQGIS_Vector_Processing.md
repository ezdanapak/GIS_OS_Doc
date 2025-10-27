# 🧭 მონაცემების დამუშავება (Data Processing)

---

## ⚙️ მონიშვნის ოპერატორები (Selection Operators)

| კოდი | ოპერატორი | აღწერა |
|------|------------|---------|
| 0 | `=` | ტოლია |
| 1 | `≠` | არ ტოლია |
| 2 | `>` | მეტია |
| 3 | `>=` | მეტია ან ტოლია |
| 4 | `<` | ნაკლებია |
| 5 | `<=` | ნაკლებია ან ტოლია |
| 6 | begins with | იწყება |
| 7 | contains | შეიცავს |
| 8 | is null | ცარიელია |
| 9 | is not null | არ არის ცარიელი |
| 10 | does not contain | არ შეიცავს |

---

## 🖱️ ინტერაქტიური მონიშვნის მეთოდები (Interactive Selection Methods)

| კოდი | მეთოდი | აღწერა |
|------|---------|---------|
| 0 | creating new selection | ახალი მონიშვნის შექმნა |
| 1 | adding to current selection | არსებულ მონიშვაზე დამატება |
| 2 | removing from current selection | არსებულიდან ამოშლა |
| 3 | selecting within current selection | შიდა მონიშვაში არჩევა |

---

## 📊 შრიდან მონაცემების წამოღება (Extract Data from Layer)

**დამრგვალება, დაფილტვრა და ახალი შრის შექმნა**

```python
layers = QgsProject.instance().mapLayersByName('rivers')
layer = layers[0]
feats = layer.getFeatures()

L = []
for i in feats:
   L.append(round(i["Shape_Leng"]))

L.sort(reverse=True)
print(L[5])

processing.run("qgis:selectbyattribute", {
   'INPUT': layer,
   'FIELD': 'Shape_Leng',
   'OPERATOR': 2,
   'VALUE': L[5],
   'METHOD': 0
})

fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_6\river_select.shp'

writer = QgsVectorFileWriter.writeAsVectorFormat(
   layer, fn, 'utf-8', driverName='ESRI Shapefile', onlySelected=True
)

layer1 = iface.addVectorLayer(fn, '', 'ogr')
del(writer)
```

---

## 🌀 ბუფერი (Buffer)

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

## 💧 ბუფერი 2 (Processing Buffer)

```python
layers = QgsProject.instance().mapLayersByName('river_select')
layer = layers[0]

fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_6\riverb1.shp'

processing.run('native:buffer', {
   'INPUT': layer,
   'DISTANCE': 150,
   'OUTPUT': fn
})
iface.addVectorLayer(fn, '', 'ogr')
```

---

## 🔗 გაერთიანება (Dissolve)

```python
layers = QgsProject.instance().mapLayersByName('Municipality')
layer = layers[0]

fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_6\mun_dissolve.shp'

processing.run("native:dissolve", {
   'INPUT': layer,
   'FIELD': [],
   'SEPARATE_DISJOINT': False,
   'OUTPUT': fn
})

iface.addVectorLayer(fn, '', 'ogr')
```

---

## 🧩 დაშლა + ბუფერი (Buffer + Dissolve)

```python
layers = QgsProject.instance().mapLayersByName('Municipality')
layer = layers[0]

fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_6\mun_dissolve1.shp'

processing.run('native:buffer', {
   'INPUT': layer,
   'FIELD': ['Region'],
   'DISTANCE': 500,
   'DISSOLVE': True,
   'OUTPUT': fn
})
iface.addVectorLayer(fn, '', 'ogr')
```

---

## ✂️ ვექტორული მონაცემების მოჭრა სხვა ვექტორით (Clip by Vector)

```python
layers = QgsProject.instance().mapLayersByName('Municipality')
over = QgsProject.instance().mapLayersByName('imereti')
layer = layers[0]
ov = over[0]

fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_7\test.shp'

processing.run('native:clip', {
   'INPUT': layer,
   'OVERLAY': ov,
   'OUTPUT': fn
})
iface.addVectorLayer(fn, '', 'ogr')
```

---

## 📐 Clip by Extent

```python
layers = QgsProject.instance().mapLayersByName('Municipality')
over = QgsProject.instance().mapLayersByName('imereti')
layer = layers[0]
ov = over[0]

fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_7\test.shp'

processing.run("native:extractbyextent", {
    'INPUT': layer,
    'EXTENT': ov,
    'CLIP': False,
    'OUTPUT': fn
})
iface.addVectorLayer(fn, '', 'ogr')
```

---

## 📍 Extract by Location (ადგილის მიხედვით ამოღება)

```python

layers = QgsProject.instance().mapLayersByName('settlement')
intersct = QgsProject.instance().mapLayersByName('imereti')
layer = layers[0]
intsct = intersct[0]

fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_7\settlement_imereti.shp'

processing.run("native:extractbylocation", {
    'INPUT': layer,
    'PREDICATE': [0],
    'INTERSECT': intsct,
    'OUTPUT': fn
})
iface.addVectorLayer(fn, '', 'ogr')

```

---

## 📍 Extract by Location (მონიშნულ მუნიციპალიტეტებზე)

```python
layers = QgsProject.instance().mapLayersByName('settlement')
layer = layers[0]

intersct = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_7\Municipality.shp'
fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_7\test.shp'

processing.run("native:extractbylocation", {
    'INPUT': layer,
    'PREDICATE': [0],
    'INTERSECT': QgsProcessingFeatureSourceDefinition(
        intersct,
        selectedFeaturesOnly=True,
        featureLimit=-1,
        geometryCheck=QgsFeatureRequest.GeometryAbortOnInvalid
    ),
    'OUTPUT': fn
})
iface.addVectorLayer(fn, '', 'ogr')
```

---

## 🔀 სხვადასხვა ვექტორული შრის გაერთიანება (Merge Vector Layers)

```python
layers_aW = QgsProject.instance().mapLayersByName('chiatura')
layers_af = QgsProject.instance().mapLayersByName('sachxere')
layer_aW = layers_aW[0]
layer_af = layers_af[0]

fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_7\chiatura_sachxere.shp'

processing.run('native:mergevectorlayers', {
   'LAYERS': [layer_aW, layer_af],
   'CRS': QgsCoordinateReferenceSystem('EPSG:32637'),
   'OUTPUT': fn
})

iface.addVectorLayer(fn, '', 'ogr')
```
