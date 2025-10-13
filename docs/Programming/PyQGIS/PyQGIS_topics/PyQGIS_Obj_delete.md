# თემა IV

შრის ატრიბუტული ცხრილიდან სვეტის წაშლა
შრიდან ობიექტის წაშლა
დუბლირებული გეომეტრიების წაშლა
დუბლირებული ცხრილური ჩანაწერების წაშლა

---

## შესავალი

!!! tip
> რეკომენდაცია: სანამდე რაიმე წაშლის ოპერაციას გაუშვებთ შეინახეთ სარეზერვო ასლი (shapefile/GeoPackage ან სხვა).

---

## ობიექტების ინდექსით წაშლა შრიდან

ამ მეთოდით პირდაპირ ვკითხულობთ `QgsVectorDataProvider` შესაძლებლობებს და ვშლით `deleteFeatures()` ID-ების მასივით.

```python
from qgis.core import QgsProject, QgsVectorDataProvider

layers = QgsProject.instance().mapLayersByName('proeqtshi arsebuli shris saxelwodeba')
if not layers:
    raise ValueError('Layer "proeqtshi arsebuli shris saxelwodeba" not found')
layer = layers[0]

delf = layer.dataProvider().capabilities()

if delf & QgsVectorDataProvider.DeleteFeatures:
    # წაშლა ინდექსებით
    to_delete = [0, 1, 2, 3, 4]
    res = layer.dataProvider().deleteFeatures(to_delete)
    layer.triggerRepaint()
else:
    print('წაშლა შეუძლებელია')
```
---

## რიცხვითი ატრიბუტების მქონე ობიექტების წაშლა შრიდან
```python
ვარიანტი 1

layers = QgsProject.instance().mapLayersByName('sadguri')



layer = layers[0]



delf = layer.dataProvider().capabilities()

feats = layer.getFeatures()

dfeats = []



if delf & QgsVectorDataProvider.DeleteFeatures:

    for feat in feats:

        if feat['fid'] > 16:

            dfeats.append(feat.id())

    df = layer.dataProvider().deleteFeatures(dfeats)

    layer.triggerRepaint()



ვარიანტი 2

layers = QgsProject.instance().mapLayersByName('Georgia_municipalities')



layer = layers[0]



delf = layer.dataProvider().capabilities()

feats = layer.getFeatures()

dfeats = []



if delf & QgsVectorDataProvider.DeleteFeatures:

    for feat in feats:

        if feat['OBJECTID_1'] > 19:

            dfeats.append(feat.id())

        elif feat['OBJECTID_1'] < 17:

            dfeats.append(feat.id())

    df = layer.dataProvider().deleteFeatures(dfeats)

    layer.triggerRepaint()



ვარიანტი 3



layers = QgsProject.instance().mapLayersByName('Georgia_municipalities')

layer = layers[0]

delf = layer.dataProvider().capabilities()

feats = layer.getFeatures()

dfeats = []

if delf & QgsVectorDataProvider.DeleteFeatures:

    for feat in feats:

        if feat['OBJECTID_1'] > 19 or feat['OBJECTID_1'] < 17:

            dfeats.append(feat.id())

    df = layer.dataProvider().deleteFeatures(dfeats)

    layer.triggerRepaint()



ვარიანტი 4



layers = QgsProject.instance().mapLayersByName('Georgia_municipalities')

layer = layers[0]

delf = layer.dataProvider().capabilities()

feats = layer.getFeatures()

dfeats = []

if delf & QgsVectorDataProvider.DeleteFeatures:

    for feat in feats:

        if feat['OBJECTID_1'] > 6 and feat['OBJECTID_1'] < 10:

            dfeats.append(feat.id())

    

    df = layer.dataProvider().deleteFeatures(dfeats)

    layer.triggerRepaint()

```

### ვრცელი მაგალითი (ვარიანტი 1)

```python
layers = QgsProject.instance().mapLayersByName('Georgia_municipalities')
layer = layers[0]

delf = layer.dataProvider().capabilities()
if not (delf & QgsVectorDataProvider.DeleteFeatures):
    raise RuntimeError('DeleteFeatures capability not available')

ids_to_delete = []
for feat in layer.getFeatures():
    # მაგალითად წავშალოთ ები, სადაც OBJECTID_1 > 19
    if feat['OBJECTID_1'] > 19:
        ids_to_delete.append(feat.id())

layer.dataProvider().deleteFeatures(ids_to_delete)
layer.triggerRepaint()
```

### სხვა სინტაქსური ვარიანტები

* გამოიყენეთ ლოგიკური `or` / `and` მდგომარეობები (ვარიანტი 2 და 3).
* გამოიყენეთ შუალედური შემოწმება `if 6 < feat['OBJECTID_1'] < 10:` (ვარიანტი 4).

---

## ატრიბუტებით (ტექსტური) წაშლა

ტექსტური ფილტრის მაგალითი — ვიშორებთ ობიექტებს კონკრეტული ენის/სახელის მიხედვით.

```python
ვარიანტი 1

layers = QgsProject.instance().mapLayersByName('Georgia_municipalities')

layer = layers[0]

delf = layer.dataProvider().capabilities()

feats = layer.getFeatures()

dfeats = []

if delf & QgsVectorDataProvider.DeleteFeatures:

    for feat in feats:

        if feat['DISTR_ENG'] == "Tsalka":

            dfeats.append(feat.id())

    df = layer.dataProvider().deleteFeatures(dfeats)

    layer.triggerRepaint()



ვარიანტი 2



layers = QgsProject.instance().mapLayersByName('Georgia_municipalities')

layer = layers[0]

delf = layer.dataProvider().capabilities()

feats = layer.getFeatures()

dfeats = []

if delf & QgsVectorDataProvider.DeleteFeatures:

    for feat in feats:

        if feat['DISTR_ENG'] != "Tsalka" or feat['MUNICIPAL'] == "Gurjaani":

            dfeats.append(feat.id())

    df = layer.dataProvider().deleteFeatures(dfeats)

    layer.triggerRepaint()
```

---

## სვეტების წაშლა ატრიბუტულ ცხრილში (processing)

`processing` მოდულის `native:deletecolumn` - ით შესაძლებელია CSV/Shapefile/GeoPackage სვეტების წაშლა და ახალ ფაილში ექსპორტი.

```python
import processing
from qgis.core import QgsProject

layer = QgsProject.instance().mapLayersByName('Georgia_municipalities')[0]
output = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_4\Georgia_municipalities2.shp'

processing.run(
    'native:deletecolumn',
    {
        'INPUT': layer,
        'COLUMN': ['SHAPE_Leng'],
        'OUTPUT': output
    }
)
```

> შენიშვნა: `COLUMN` არის სია იმ სვეტების სახელებისა, რომლებსაც გსურთ მოაშოროთ.

---

## დუბლირებული ატრიბუტების წაშლა
შრის ცხრილში მსგავსი ელემენტების პოვნა და დაფილტვრა.

 `native:removeduplicatesbyattribute`.

```python
processing.run(
    'native:removeduplicatesbyattribute',
    {
        'INPUT': layer,
        'FIELDS': ['MUNICIPAL'],
        'OUTPUT': r'C:\Users\Public\Documents\GK\PyQGIS\shp\test\Georgia_municipalities_unique.shp',
        'DUPLICATES': r'C:\Users\Public\Documents\GK\PyQGIS\shp\test\Georgia_municipalities_duplicates.shp'
    }
)
```

---

## დუბლირებული გეომეტრიების მოცილება

```python
layers = QgsProject.instance().mapLayersByName('Georgia_municipalities')



layer = layers[0]

output = r"C:\Users\Public\Documents\GK\PyQGIS\shp\tema_4\municipalities_WD.shp'

proces sing.run("native:deleteduplicategeometries", {'INPUT':layer,'OUTPUT':"output})
```
---

## უსაფრთხოების რეკომენდაციები და შენიშვნები


---
