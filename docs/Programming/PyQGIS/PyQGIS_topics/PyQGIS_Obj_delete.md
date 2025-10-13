# თემა IV — PyQGIS (GitHub-ready)



---

## შესავალი

ეს დოკუმენტი აერთიანებს პრაქტიკულ PyQGIS სკრიპტებს, რომლებიც გამოსადეგია ფენებზე (layers) მოქმედებისას: ობიექტების წაშლა, ფილტრაცია ატრიბუტებით, სვეტების რედუქცია და დუბლიკატების მოცილება. კოდები დაწერილია QGIS Python API (Qgs*) და `processing` მოდულის გამოყენებით.

> რეკომენდაცია: დიდი მასშტაბის ოპერაციების წინ შეინახეთ ბექაპი (shapefile/GeoPackage ან სხვა) ან გამოიყენეთ პროექტის snapshot.

---

## ობიექტების ინდექსით წაშლა შრიდან

ამ მეთოდით პირდაპირ ვკითხულობთ `QgsVectorDataProvider` შესაძლებლობებს და ვაძახებთ `deleteFeatures()` ID-ების მასივით.

```python
from qgis.core import QgsProject, QgsVectorDataProvider

layers = QgsProject.instance().mapLayersByName('sadguri')
if not layers:
    raise ValueError('Layer "sadguri" ვერ მოიძებნა')
layer = layers[0]

delf = layer.dataProvider().capabilities()

if delf & QgsVectorDataProvider.DeleteFeatures:
    # წაშლა ინდექსებით
    to_delete = [0, 1, 2, 3, 4]
    res = layer.dataProvider().deleteFeatures(to_delete)
    layer.triggerRepaint()
else:
    print('წაშლა არ არის მიღმა ამ პროვაიდერში')
```



ეს დოკუმენტი აერთიანებს პრაქტიკულ PyQGIS სკრიპტებს, რომლებიც გამოსადეგია ფენებზე (layers) მოქმედებისას: ობიექტების წაშლა, ფილტრაცია ატრიბუტებით, სვეტების რედუქცია და დუბლიკატების მოცილება. კოდები დაწერილია QGIS Python API (Qgs*) და `processing` მოდულის გამოყენებით.

> რეკომენდაცია: დიდი მასშტაბის ოპერაციების წინ შეინახეთ ბექაპი (shapefile/GeoPackage ან სხვა) ან გამოიყენეთ პროექტის snapshot.

---

## ობიექტების ინდექსით წაშლა შრიდან

ამ მეთოდით პირდაპირ ვკითხულობთ `QgsVectorDataProvider` შესაძლებლობებს და ვაძახებთ `deleteFeatures()` ID-ების მასივით.

```python
from qgis.core import QgsProject, QgsVectorDataProvider

layers = QgsProject.instance().mapLayersByName('sadguri')
if not layers:
    raise ValueError('Layer "sadguri" ვერ მოიძებნა')
layer = layers[0]

delf = layer.dataProvider().capabilities()

if delf & QgsVectorDataProvider.DeleteFeatures:
    # წაშლა ინდექსებით
    to_delete = [0, 1, 2, 3, 4]
    res = layer.dataProvider().deleteFeatures(to_delete)
    layer.triggerRepaint()
else:
    print('წაშლა არ არის მიღმა ამ პროვაიდერში')
```

---

## რიცხვითი ატრიბუტების მქონე ობიექტების წაშლა შრიდან

ერთადერთი სწორი практика — შეგროვდეს გასაქვით ID-ები და შემდეგ ერთჯერადად განხორციელდეს `deleteFeatures()` ოპერაცია.

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
layers = QgsProject.instance().mapLayersByName('Georgia_municipalities')
layer = layers[0]

ids_to_delete = []
for feat in layer.getFeatures():
    if feat['DISTR_ENG'] == 'Tsalka':
        ids_to_delete.append(feat.id())

layer.dataProvider().deleteFeatures(ids_to_delete)
layer.triggerRepaint()
```

---

## სვეტების წაშლა ატრიბუტულ ცხრილში (processing)

`processing` მოდულის `native:deletecolumn` იძლევა CSV/Shapefile/GeoPackage სვეტების წაშლას და ახალ ფაილში ექსპორტს.

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

თუ გსურთ ერთნაირი მნიშვნელობის მქონე რიგების დეკომპოზიცია — გამოვიყენოთ `native:removeduplicatesbyattribute`.

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

დუბლირებული ან ოვერლეპინგი გეომეტრიების დასუფთავებისთვის რეკომენდებულია:

* GRASS `v.clean` (QGIS processing ინტერფეისით) ან
* QGIS-ის `Delete duplicate geometries` ინსტრუმენტი,
* ან `topology`-ზე დაფუძნებული გასუფთავება, დამოკიდებულია სქემაზე.


---

## უსაფრთხოების რეკომენდაციები და შენიშვნები

1. დიდი მასშტაბის ოპერაციების წინ ყოველთვის გააკეთეთ ბექაპი. GeoPackage (.gpkg) ხშირად უკეთესია ვიდრე SHP.
2. შეამოწმეთ `layer.dataProvider().capabilities()` — ყველა პროვაიდერი არ გვაძლევს რედაქტირების ფუნქციას.
3. თუ გამოჩნდება შეცდომა `AttributeError` ან `KeyError`, დარწმუნდით რომ ველი ნამდვილად არსებობს: `field_names = [f.name() for f in layer.fields()]`.
4. ოპერაციების სტატუსის საჩვენებლად გამოიყენეთ `QgsMessageLog` ან `iface.messageBar()` (თუ QGIS GUI მოდულია).

---
