# TEMPORARY_OUTPUT PyQGIS-ში

**`TEMPORARY_OUTPUT`** — `processing.run()`-ის სპეციალური მნიშვნელობა, რომელიც შედეგს **ფაილად არ ინახავს**, არამედ მეხსიერებაში (RAM) ქმნის **დროებით შრეს**.

---

## 🔑 ძირითადი იდეა

`processing.run()`-ში `'OUTPUT'` პარამეტრს ჩვეულებრივ ფაილის ბილიკი გადაეცემა:

```python
# ჩვეულებრივი გზა — ფაილი დისკზე
processing.run("native:polygonstolines", {
    'INPUT' : fn,
    'OUTPUT': r'C:\GIS\output.shp'   # ← ფაილი დისკზე
})
```

`TEMPORARY_OUTPUT`-ის შემთხვევაში შედეგი **ფაილად არ ჩაიწერება**:

```python
# TEMPORARY_OUTPUT — მხოლოდ მეხსიერებაში
processing.run("native:polygonstolines", {
    'INPUT' : fn,
    'OUTPUT': 'TEMPORARY_OUTPUT'     # ← RAM-ში, ფაილი არ იქმნება
})
```

---

## 🧱 სტრუქტურა — რა ხდება შიგნით?

```
processing.run(...)
       │
       ▼
  შედეგი → QgsVectorLayer (memory provider)
       │
       ├── ტიპი:   "memory:"
       ├── ფაილი:  არ არსებობს დისკზე
       ├── სიცოცხლე: QGIS სესია
       └── წვდომა:  result['OUTPUT'] ობიექტიდან
```

---

## ▶️ სწორი გამოყენება

`processing.run()` **ყოველთვის** dictionary-ს აბრუნებს.
`TEMPORARY_OUTPUT`-ის შემთხვევაში `result['OUTPUT']`-ში იდება **`QgsVectorLayer` ობიექტი** (სტრიქონი კი არა):

```python
result = processing.run("native:polygonstolines", {
    'INPUT' : fn,
    'OUTPUT': 'TEMPORARY_OUTPUT'
})

# result['OUTPUT'] → QgsVectorLayer ობიექტი
temp_layer = result['OUTPUT']

print(type(temp_layer))
# → <class 'qgis._core.QgsVectorLayer'>

print(temp_layer.name())
# → "Polygons to lines"

print(temp_layer.featureCount())
# → 42  (feature-ების რაოდენობა)
```

---

## 🗺️ QGIS-ში გამოჩენა — `addMapLayer()`

შრე ავტომატურად **არ ჩნდება** QGIS Layers პანელში — ხელით უნდა დაამატო:

```python
from qgis.core import QgsProject

result = processing.run("native:polygonstolines", {
    'INPUT' : fn,
    'OUTPUT': 'TEMPORARY_OUTPUT'
})

temp_layer = result['OUTPUT']

# QGIS Layers პანელში დამატება
QgsProject.instance().addMapLayer(temp_layer)
```

> 💡 `addMapLayer()` გარეშე შრე მეხსიერებაში არსებობს, მაგრამ **ხილული არ არის**.

---

## 🔗 ჯაჭვური გამოყენება — Output as Input

`TEMPORARY_OUTPUT`-ის ყველაზე ძლიერი გამოყენება — **ერთი ხელსაწყოს შედეგი მეორის შეყვანად**:

```python
fn = r'C:\GIS\shapefile\polygon_layer.shp'

# ნაბიჯი 1: პოლიგონი → ხაზი
step1 = processing.run("native:polygonstolines", {
    'INPUT' : fn,
    'OUTPUT': 'TEMPORARY_OUTPUT'
})

# ნაბიჯი 2: ხაზი → წერტილები (step1-ის შედეგი პირდაპირ შეყვანად)
step2 = processing.run("native:pointsalonglines", {
    'INPUT'   : step1['OUTPUT'],   # ← QgsVectorLayer პირდაპირ
    'DISTANCE': 10,
    'OUTPUT'  : 'TEMPORARY_OUTPUT'
})

# ნაბიჯი 3: ბოლო შედეგის დამატება რუკაზე
final_layer = step2['OUTPUT']
QgsProject.instance().addMapLayer(final_layer)

print(f"✅ {final_layer.featureCount()} წერტილი განთავსდა")
```

📌 შუალედური ბილიკების ან ფაილების გარეშე — **ყველაფერი მეხსიერებაში**.

---

## 💾 დროებითი შრის ფაილად შენახვა

თუ გაანალიზე და ბოლოს ფაილი გჭირდება:

```python
from qgis.core import QgsVectorFileWriter, QgsProject

result = processing.run("native:polygonstolines", {
    'INPUT' : fn,
    'OUTPUT': 'TEMPORARY_OUTPUT'
})

temp_layer = result['OUTPUT']

# ვარიანტი A — writeAsVectorFormatV3
options = QgsVectorFileWriter.SaveVectorOptions()
options.driverName   = "ESRI Shapefile"
options.fileEncoding = "UTF-8"

save_path = r'C:\GIS\output_final.shp'

error, _, _, _ = QgsVectorFileWriter.writeAsVectorFormatV3(
    temp_layer,
    save_path,
    QgsProject.instance().transformContext(),
    options
)

if error == QgsVectorFileWriter.NoError:
    print("✅ ფაილი შეინახა:", save_path)
else:
    print("❌ შეცდომა:", error)
```

```python
# ვარიანტი B — processing.run savefeatures
processing.run("native:savefeatures", {
    'INPUT' : temp_layer,
    'OUTPUT': r'C:\GIS\output_final.shp'
})
```

---

## 🔄 `TEMPORARY_OUTPUT` vs ფაილის ბილიკი

| | `TEMPORARY_OUTPUT` | ფაილის ბილიკი |
|--|-------------------|---------------|
| **სად ინახება** | RAM (მეხსიერება) | დისკი |
| **სიჩქარე** | ⚡ სწრაფი | 🐢 შედარებით ნელი |
| **სიცოცხლე** | QGIS სესიის ბოლომდე | მუდმივი |
| **ავტო-ჩვენება** | ❌ `addMapLayer()` საჭიროა | ❌ `addVectorLayer()` საჭიროა |
| **result['OUTPUT'] ტიპი** | `QgsVectorLayer` | `str` (ბილიკი) |
| **ჯაჭვური გამოყენება** | ✅ პირდაპირ | ❌ ბილიკი ხელახლა გადასაცემია |
| **დისკის სივრცე** | ✅ არ სჭირდება | ❌ სჭირდება |

---

## ⚡ შეცდომების დამუშავება

```python
try:
    result = processing.run("native:polygonstolines", {
        'INPUT' : fn,
        'OUTPUT': 'TEMPORARY_OUTPUT'
    })

    temp_layer = result['OUTPUT']

    if not temp_layer or not temp_layer.isValid():
        print("❌ შრე არასწორია")
    elif temp_layer.featureCount() == 0:
        print("⚠️ შრე ცარიელია — feature-ები არ მოიძებნა")
    else:
        QgsProject.instance().addMapLayer(temp_layer)
        print(f"✅ {temp_layer.featureCount()} feature დაემატა რუკაზე")

except Exception as e:
    print(f"❌ Processing შეცდომა: {e}")
```

---

## 📌 შეჯამება

- **`TEMPORARY_OUTPUT`** — შედეგი ფაილის გარეშე, მხოლოდ RAM-ში
- `result['OUTPUT']` → **`QgsVectorLayer`** ობიექტი (სტრიქონი კი არა)
- `QgsProject.instance().addMapLayer()` — ხელით უნდა დაამატო პანელში
- **ჯაჭვური გამოყენება** — ერთი შედეგი მეორის `'INPUT'`-ად გადაეცემა პირდაპირ
- სესიის დასრულებისას ყველა `TEMPORARY_OUTPUT` **ავტომატურად წაიშლება**

👉 გამოიყენე `TEMPORARY_OUTPUT` შუალედური ნაბიჯებისთვის, ტესტირებისთვის, ან როდესაც ფაილი საბოლოოდ არ გჭირდება.