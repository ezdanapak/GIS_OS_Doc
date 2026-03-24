# თემა IV — ობიექტებისა და სვეტების წაშლა

შრიდან ობიექტის წაშლა · ატრიბუტული სვეტის წაშლა · დუბლირებული გეომეტრიების წაშლა · დუბლირებული ჩანაწერების წაშლა

---

## შესავალი

!!! tip "რეკომენდაცია"
    სანამ წაშლის ოპერაციას გაუშვებთ — **შეინახეთ სარეზერვო ასლი** (Shapefile / GeoPackage).
    `deleteFeatures()` და `deletecolumn` **პირდაპირ ცვლის** ფაილს და ოპერაცია **შეუქცევადია**.

---

## 1. ობიექტის წაშლა ინდექსით (ID)

ყველაზე პირდაპირი მეთოდი — ID-ების სია პირდაპირ `deleteFeatures()`-ს გადაეცემა.

```py title="delete_by_id.py" linenums="1"
from qgis.core import QgsProject, QgsVectorDataProvider

# შრის მოძიება სახელით
layers = QgsProject.instance().mapLayersByName('გასასუფთავებელი შრის სახელი')
if not layers:
    raise ValueError('შრე ვერ მოიძებნა')

layer = layers[0]
caps  = layer.dataProvider().capabilities()

if caps & QgsVectorDataProvider.DeleteFeatures:
    ids_to_delete = [0, 1, 2, 3, 4]   # ID-ების სია
    layer.dataProvider().deleteFeatures(ids_to_delete)
    layer.triggerRepaint()
    print(f"წაიშალა: {len(ids_to_delete)} ობიექტი")
else:
    print("⚠ შრე არ უჭერს მხარს DeleteFeatures ოპერაციას")
```

> 💡 `triggerRepaint()` — QGIS-ს ატყობინებს, რომ ხელახლა გადახაზოს შრე.
> გარეშე — ცვლილება ჩაიწერება, მაგრამ ეკრანზე ძველი სახე დარჩება.

---

## 2. ობიექტების წაშლა **რიცხვითი** ატრიბუტით

### ვარიანტი 1 — მარტივი პირობა (`>`)

```py title="delete_numeric_v1.py" linenums="1"
from qgis.core import QgsProject, QgsVectorDataProvider

layer = QgsProject.instance().mapLayersByName('sadguri')[0]
caps  = layer.dataProvider().capabilities()
ids   = []

if caps & QgsVectorDataProvider.DeleteFeatures:
    for feat in layer.getFeatures():
        if feat['fid'] > 16:          # fid > 16 — წაიშლება
            ids.append(feat.id())

    layer.dataProvider().deleteFeatures(ids)
    layer.triggerRepaint()
    print(f"წაიშალა: {len(ids)} ობიექტი")
```

---

### ვარიანტი 2 — ორი ცალკე პირობა (`or`)

```py title="delete_numeric_v2.py" linenums="1"
from qgis.core import QgsProject, QgsVectorDataProvider

layer = QgsProject.instance().mapLayersByName('Georgia_municipalities')[0]
caps  = layer.dataProvider().capabilities()
ids   = []

if caps & QgsVectorDataProvider.DeleteFeatures:
    for feat in layer.getFeatures():
        oid = feat['OBJECTID_1']
        if oid > 19 or oid < 17:      # 17, 18, 19 დარჩება — დანარჩენი წაიშლება
            ids.append(feat.id())

    layer.dataProvider().deleteFeatures(ids)
    layer.triggerRepaint()
    print(f"წაიშალა: {len(ids)} ობიექტი")
```

---

### ვარიანტი 3 — შუალედური პირობა (`<` `<`)

```py title="delete_numeric_v3.py" linenums="1"
from qgis.core import QgsProject, QgsVectorDataProvider

layer = QgsProject.instance().mapLayersByName('Georgia_municipalities')[0]
caps  = layer.dataProvider().capabilities()
ids   = []

if caps & QgsVectorDataProvider.DeleteFeatures:
    for feat in layer.getFeatures():
        # პითონის "ჯაჭვური" შედარება — იკითხება ბუნებრივად
        if 6 < feat['OBJECTID_1'] < 10:   # 7, 8, 9 წაიშლება
            ids.append(feat.id())

    layer.dataProvider().deleteFeatures(ids)
    layer.triggerRepaint()
    print(f"წაიშალა: {len(ids)} ობიექტი")
```

> 💡 `6 < x < 10` — პითონის ექსკლუზიური სინტაქსი.
> ეკვივალენტია `x > 6 and x < 10`-ისა, მაგრამ **უფრო იკითხება**.

---

## 3. ობიექტების წაშლა **ტექსტური** ატრიბუტით

### ვარიანტი 1 — ზუსტი დამთხვევა (`==`)

```py title="delete_text_v1.py" linenums="1"
from qgis.core import QgsProject, QgsVectorDataProvider

layer = QgsProject.instance().mapLayersByName('Georgia_municipalities')[0]
caps  = layer.dataProvider().capabilities()
ids   = []

if caps & QgsVectorDataProvider.DeleteFeatures:
    for feat in layer.getFeatures():
        if feat['DISTR_ENG'] == "Tsalka":   # მხოლოდ Tsalka წაიშლება
            ids.append(feat.id())

    layer.dataProvider().deleteFeatures(ids)
    layer.triggerRepaint()
    print(f"წაიშალა: {len(ids)} ობიექტი")
```

---

### ვარიანტი 2 — კომბინირებული პირობა (`!=` + `or`)

```py title="delete_text_v2.py" linenums="1"
from qgis.core import QgsProject, QgsVectorDataProvider

layer = QgsProject.instance().mapLayersByName('Georgia_municipalities')[0]
caps  = layer.dataProvider().capabilities()
ids   = []

if caps & QgsVectorDataProvider.DeleteFeatures:
    for feat in layer.getFeatures():
        # წაიშლება: ყველა, ვინც არ არის Tsalka — ან Gurjaani-ა
        if feat['DISTR_ENG'] != "Tsalka" or feat['MUNICIPAL'] == "Gurjaani":
            ids.append(feat.id())

    layer.dataProvider().deleteFeatures(ids)
    layer.triggerRepaint()
    print(f"წაიშალა: {len(ids)} ობიექტი")
```

> ⚠️ `or` **ფართო** პირობაა — გამოიყენეთ ფრთხილად.
> მეტი კონტროლისთვის `and` ამჯობინეთ.

---

## 4. სვეტის წაშლა ატრიბუტულ ცხრილიდან

`native:deletecolumn` — ირჩევს სვეტ(ებ)ს და ახალ ფაილად ახდენს ექსპორტს.

```py title="delete_column.py" linenums="1"
import processing
from qgis.core import QgsProject

layer  = QgsProject.instance().mapLayersByName('Georgia_municipalities')[0]
output = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_4\Georgia_municipalities2.shp'

result = processing.run(
    'native:deletecolumn',
    {
        'INPUT' : layer,
        'COLUMN': ['SHAPE_Leng', 'SHAPE_Area'],   # სიაში — ერთი ან მეტი სვეტი
        'OUTPUT': output
    }
)

print("ახალი ფაილი:", result['OUTPUT'])
```

> 💡 `COLUMN` — **სია** (`list`). ერთდროულად რამდენიმე სვეტის წაშლაც შეიძლება.
> ოპერაცია **ახალ ფაილს** ქმნის — ორიგინალი **არ იცვლება**.

---

## 5. დუბლირებული ატრიბუტების წაშლა

`native:removeduplicatesbyattribute` — ინახავს **უნიკალურ** ჩანაწერებს, დუბლიკატებს ცალკე ფაილში ათავსებს.

```py title="delete_duplicate_attributes.py" linenums="1"
import processing
from qgis.core import QgsProject

layer = QgsProject.instance().mapLayersByName('Georgia_municipalities')[0]

result = processing.run(
    'native:removeduplicatesbyattribute',
    {
        'INPUT'     : layer,
        'FIELDS'    : ['MUNICIPAL'],    # დუბლიკატი ამ სვეტის მიხედვით განისაზღვრება
        'OUTPUT'    : r'C:\Users\Public\Documents\GK\PyQGIS\shp\test\municipalities_unique.shp',
        'DUPLICATES': r'C:\Users\Public\Documents\GK\PyQGIS\shp\test\municipalities_duplicates.shp'
    }
)

print("უნიკალური:", result['OUTPUT'])
print("დუბლიკატები:", result['DUPLICATES'])
```

> 💡 `DUPLICATES` — არასავალდებულო, მაგრამ სასარგებლო: ინახავს **ამოღებულ** ობიექტებს
> ცალკე ფაილად, შემოწმებისთვის.

---

## 6. დუბლირებული გეომეტრიების წაშლა

`native:deleteduplicategeometries` — ერთ ადგილას **ორი ან მეტი** ერთნაირი გეომეტრიის შემთხვევაში ტოვებს მხოლოდ ერთს.

```py title="delete_duplicate_geometries.py" linenums="1"
import processing
from qgis.core import QgsProject

layer  = QgsProject.instance().mapLayersByName('Georgia_municipalities')[0]
output = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_4\municipalities_no_dupes.shp'

result = processing.run(
    'native:deleteduplicategeometries',
    {
        'INPUT' : layer,
        'OUTPUT': output
    }
)

print("შედეგი:", result['OUTPUT'])
```

---

## 📋 მეთოდების შეჯამება

| მეთოდი / ინსტრუმენტი | გამოყენება | შენიშვნა |
|----------------------|-----------|----------|
| `deleteFeatures([ids])` | ობიექტები ID-ით | **პირდაპირ ცვლის** შრეს |
| `feat.id()` | ობიექტის შიდა ID | ატრიბუტული `fid`-ისგან განსხვავდება |
| `triggerRepaint()` | ეკრანის განახლება | ყოველი წაშლის შემდეგ |
| `native:deletecolumn` | სვეტის წაშლა | ახალ ფაილად ინახავს |
| `native:removeduplicatesbyattribute` | ატრიბუტული დუბლიკატები | დუბლიკატებს ცალკე ინახავს |
| `native:deleteduplicategeometries` | გეომეტრიული დუბლიკატები | ახალ ფაილად ინახავს |

---

## ⚠️ უსაფრთხოების შეახსენებლები

1. **სარეზერვო ასლი ყოველთვის** — `deleteFeatures()` შეუქცევადია
2. **შრის ტიპი** — `deleteFeatures` მუშაობს მხოლოდ **ვექტორულ** შრეებზე
3. **შესაძლებლობების შემოწმება** — `caps & QgsVectorDataProvider.DeleteFeatures` — ყოველთვის გადაამოწმეთ შრე უჭერს თუ არა მხარს წაშლას (მაგ: WFS read-only შრეებს — არ უჭერს)
4. **processing ფუნქციები** — ახალ ფაილს ქმნიან და ორიგინალს **არ ცვლიან**

---

> **შემდეგი თემა:** ობიექტების და ატრიბუტების **შექმნა და განახლება** — `addFeatures()`, `changeAttributeValue()`.