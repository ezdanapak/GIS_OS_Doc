# `isValid()` PyQGIS-ში

**`isValid()`** — PyQGIS-ის "ჯანმრთელობის შემოწმება". ეუბნება, წარმატებით ჩაიტვირთა თუ არა ობიექტი და **მზადაა თუ არა სამუშაოდ**.

---

## 🔑 ძირითადი იდეა

როდესაც QGIS-ში ფენას (Layer) ქმნი, ის ყოველთვის **შეიქმნება მეხსიერებაში** — მაშინაც კი, თუ ფაილი არ არსებობს ან მისამართი არასწორია. სწორედ ამიტომ გვჭირდება `isValid()`:

```
QgsVectorLayer("არასწორი/გზა.shp", "ფენა", "ogr")
        │
        ▼
  ობიექტი შეიქმნა ✅   ←── ყოველთვის
        │
        ├── isValid() → True   ✅  მონაცემები ნაპოვნია
        └── isValid() → False  ❌  მონაცემები ვერ მოიძებნა
```

---

## 📦 საიდან მოდის?

`isValid()` განსაზღვრულია **`QgsMapLayer`** კლასში — PyQGIS-ის ყველა შრის საერთო მშობელ კლასში:

```
QgsMapLayer          ← isValid() აქ არის განსაზღვრული
    ├── QgsVectorLayer
    └── QgsRasterLayer
```

📌 ანუ `isValid()`-ს გამოიყენებ **ნებისმიერ** შრეზე — ვექტორულზეც და რასტრულზეც.

---

## ▶️ მარტივი გამოყენება

```python
from qgis.core import QgsVectorLayer

layer = QgsVectorLayer(
    r'C:\GIS\shapefile\lake.shp',
    'Lake Layer',
    'ogr'
)

if not layer.isValid():
    print("❌ ფენა ვერ ჩაიტვირთა — შეამოწმე ფაილის მისამართი")
else:
    print("✅ ფენა ვალიდურია — შეგიძლია მუშაობა")
```

> ⚠️ **რჩევა:** ყოველთვის გამოიყენე `isValid()` ფენის ჩატვირთვის შემდეგ — მის გარეშე შემდგომი ოპერაციები შეიძლება **QGIS-ის crash-ს** გამოიწვიოს.

---

## 🛠 სად გვხვდება `isValid()`?

`isValid()` **მხოლოდ Layer-ებში** არ გვხვდება — PyQGIS-ის სხვა მნიშვნელოვან კლასებშიც:

| კლასი | `isValid()` რას ამოწმებს |
|-------|------------------------|
| `QgsVectorLayer` | მონაცემთა წყარო (ფაილი/ბაზა) ნაპოვნია და გახსნილია |
| `QgsRasterLayer` | რასტრული ფაილი წარმატებით ჩაიტვირთა |
| `QgsGeometry` | გეომეტრია OGC სტანდარტებს აკმაყოფილებს (არ არის "გატეხილი") |
| `QgsPointXY` | წერტილი სწორი კოორდინატებით ინიციალიზებულია |
| `QgsRectangle` | მართკუთხედი სწორი კოორდინატებით ინიციალიზებულია |
| `QgsMessageBar` | ვიზუალური ელემენტი შეტყობინების გამოსატანად მზადაა |

---

## 🔍 `QgsVectorLayer` — დეტალური მაგალითი

```python
from qgis.core import QgsVectorLayer, QgsProject

# ✅ სწორი ბილიკი
layer = QgsVectorLayer(
    r'C:\GIS\shapefile\roads.shp',
    'Roads',
    'ogr'
)

if layer.isValid():
    QgsProject.instance().addMapLayer(layer)
    print(f"✅ ჩაიტვირთა — {layer.featureCount()} feature")
    print(f"   CRS: {layer.crs().authid()}")
    print(f"   ტიპი: {layer.geometryType()}")
else:
    print("❌ ფენა ვერ ჩაიტვირთა")
```

```python
# ❌ არასწორი ბილიკი — ობიექტი მაინც შეიქმნება!
layer = QgsVectorLayer(
    r'C:\GIS\არარსებული_ფაილი.shp',
    'Test',
    'ogr'
)

print(layer)           # → <QgsVectorLayer: ...>   ← ობიექტი არსებობს
print(layer.isValid()) # → False                   ← მაგრამ ვალიდური არ არის
```

---

## 🔷 `QgsGeometry` — გეომეტრიის ვალიდაცია

`QgsGeometry`-ს `isValid()` ამოწმებს OGC სტანდარტებს — **გეომეტრიული სისწორეს**:

```python
from qgis.core import QgsGeometry

# ✅ სწორი გეომეტრია
geom_ok = QgsGeometry.fromWkt("POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))")
print(geom_ok.isValid())   # → True

# ❌ "გატეხილი" გეომეტრია — პოლიგონი კვეთს საკუთარ თავს (butterfly)
geom_bad = QgsGeometry.fromWkt("POLYGON ((0 0, 1 1, 1 0, 0 1, 0 0))")
print(geom_bad.isValid())  # → False

# შეცდომის მიზეზი
if not geom_bad.isValid():
    print(geom_bad.lastError())
    # → "Ring self-intersection" ან მსგავსი
```

> 💡 გეომეტრიის **გასწორება** ავტომატურად: `geom.makeValid()` — QGIS 3.x+

---

## 🔗 `processing.run()`-თან ერთად

```python
from qgis.core import QgsProject

result = processing.run("native:polygonstolines", {
    'INPUT' : fn,
    'OUTPUT': 'TEMPORARY_OUTPUT'
})

temp_layer = result['OUTPUT']

# isValid() შემოწმება processing-ის შედეგზეც
if not temp_layer or not temp_layer.isValid():
    print("❌ Processing-ის შედეგი არასწორია")
elif temp_layer.featureCount() == 0:
    print("⚠️ შრე ცარიელია")
else:
    QgsProject.instance().addMapLayer(temp_layer)
    print(f"✅ {temp_layer.featureCount()} feature დაემატა")
```

---

## ⚡ try / except + `isValid()` — საუკეთესო პრაქტიკა

```python
from qgis.core import QgsVectorLayer, QgsProject

def load_layer(path: str, name: str) -> QgsVectorLayer | None:
    """
    შრეს ჩატვირთავს და ვალიდაციას ჩაატარებს.
    წარმატებისას QgsVectorLayer-ს აბრუნებს, წინააღმდეგ შემთხვევაში None-ს.
    """
    try:
        layer = QgsVectorLayer(path, name, 'ogr')

        if not layer.isValid():
            print(f"❌ [{name}] — ვერ ჩაიტვირთა: {path}")
            return None

        QgsProject.instance().addMapLayer(layer)
        print(f"✅ [{name}] — {layer.featureCount()} feature | {layer.crs().authid()}")
        return layer

    except Exception as e:
        print(f"❌ გამონაკლისი: {e}")
        return None


# გამოყენება
layer = load_layer(r'C:\GIS\shapefile\regions.shp', 'Regions')

if layer:
    # მხოლოდ ვალიდური შრეზე ვმუშაობთ
    for feat in layer.getFeatures():
        print(feat['name'])
```

---

## 📌 შეჯამება

- **`isValid()`** — ობიექტის "ჯანმრთელობის შემოწმება": მზადაა სამუშაოდ თუ არა
- `QgsMapLayer`-შია განსაზღვრული — მოქმედებს **ვექტორულ** და **რასტრულ** შრეებზე
- ობიექტი ყოველთვის **შეიქმნება** — `isValid() → False` არ ნიშნავს, რომ ობიექტი არ არსებობს
- `QgsGeometry.isValid()` — გეომეტრიული სისწორის შემოწმება (self-intersection, ring სისწორე)
- `isValid()` გარეშე შემდგომი ოპერაციები — **Crash-ის** პოტენციური მიზეზი

👉 **წესი:** ნებისმიერი შრის ჩატვირთვის შემდეგ — **პირველი ნაბიჯი** ყოველთვის `isValid()`.