# PyQGIS — გავრცელებული შეცდომები და გამოსწორება

PyQGIS-ში მუშაობისას ზოგიერთი შეცდომა **განმეორებადია**. ეს გვერდი აღწერს ყველაზე ხშირ შეცდომებს — რას ნიშნავს თითოეული და **როგორ გამოსწორდება**.

---

## 📋 სწრაფი ცნობარი

| შეცდომა | მიზეზი |
|---------|--------|
| `EOL while scanning string literal` | ბრჭყალი ან `'` აკლია |
| `AttributeError: QVariant has no attribute 'int'` | პატარა `i` — სწორია `Int` |
| `NameError: name 'X' is not defined` | typo სახელში ან `['Region']` ნაცვლად `[Region]` |
| `IndexError: list index out of range` | შრის სახელი პროექტში ვერ მოიძებნა |
| `KeyError: 'field_name'` | სვეტი ატრიბუტულ ცხრილში არ არსებობს |
| `AssertionError` (startEditing) | შრე რედაქტირების რეჟიმში უკვე გახსნილია |
| `invalid syntax` | სიტყვა ან სიმბოლო გაყოფილია — ერთად უნდა იწეროს |
| `Missing functions in IDE` | `import qgis` კოდის დასაწყისში აკლია |

---

## 🔴 EOL while scanning string literal

### რას ნიშნავს?

**EOL** = End Of Line — Python-მა სტრიქონი ბოლომდე ვერ წაიკითხა, რადგან **ბრჭყალი დაკარგულია**.

### მიზეზი 1 — `'INPUT'`-ს აკლია `'` ერთ მხარეს

```python
# ❌ შეცდომა — INPUT-ს წინ აკლია '
processing.run("native:deletecolumn", {INPUT': layer,
    'COLUMN': ['SHAPE_Leng'],
    'OUTPUT': out
})

# ✅ სწორია
processing.run("native:deletecolumn", {'INPUT': layer,
    'COLUMN': ['SHAPE_Leng'],
    'OUTPUT': out
})
```

### მიზეზი 2 — ფაილის ბილიკს ბოლოში `"` აკლია

```python
# ❌ შეცდომა
fn = r'C:\Users\Public\GIS\shapefile\roads.shp   # ← ' აკლია ბოლოში

# ✅ სწორია
fn = r'C:\Users\Public\GIS\shapefile\roads.shp'
```

> 💡 **გახსოვდეს:** ყოველი გახსნილი `'` ან `"` **დახურული** უნდა იყოს.

---

## 🔴 AttributeError: type object 'QVariant' has no attribute 'int'

### რას ნიშნავს?

`QVariant`-ის ატრიბუტი `int` (პატარა ასოებით) **არ არსებობს** — Python case-sensitive ენაა.

```python
# ❌ შეცდომა — პატარა 'i'
fields.append(QgsField('ID', QVariant.int))

# ✅ სწორია — დიდი 'I'
fields.append(QgsField('ID', QVariant.Int))
```

### სწორი მნიშვნელობები

```python
QVariant.Int        # მთელი რიცხვი
QVariant.Double     # ათწილადი
QVariant.String     # ტექსტი
QVariant.Bool       # True / False
QVariant.Date       # თარიღი
QVariant.DateTime   # თარიღი + დრო
```

---

## 🔴 NameError: name 'X' is not defined

### მიზეზი 1 — typo ცვლადის სახელში

```python
# ❌ შეცდომა — 'layes' (r აკლია)
layer = layes[0]

# ✅ სწორია
layer = layers[0]
```

```python
# ❌ შეცდომა — 'f' (n აკლია)
iface.addVectorLayer(f, '', 'ogr')

# ✅ სწორია
iface.addVectorLayer(fn, '', 'ogr')
```

### მიზეზი 2 — `['Region']` ნაცვლად `[Region]`

`FIELD` პარამეტრი **სტრიქონების სიას** ელოდება — ბრჭყალები სავალდებულოა:

```python
# ❌ შეცდომა — Region ბრჭყალების გარეშე, Python მას ცვლადად ეძებს
processing.run("native:dissolve", {
    'INPUT' : layer,
    'FIELD' : [Region],       # ← Python: "ცვლადი Region?"
    'OUTPUT': fn
})

# ✅ სწორია — 'Region' სტრიქონი სიაში
processing.run("native:dissolve", {
    'INPUT' : layer,
    'FIELD' : ['Region'],     # ← სვეტის სახელი სტრიქონად
    'OUTPUT': fn
})
```

---

## 🔴 IndexError: list index out of range

### რას ნიშნავს?

`mapLayersByName()` **ცარიელ სიას** აბრუნებს — შრე ამ სახელით პროექტში **ვერ მოიძებნა**.

```python
# ❌ შეცდომა — 'sadguri' სახელის შრე პროექტში არ არის
layers = QgsProject.instance().mapLayersByName('sadguri')
layer  = layers[0]   # ← IndexError: list index out of range
```

```python
# ✅ სწორია — ჯერ შეამოწმე, შემდეგ გამოიყენე
layers = QgsProject.instance().mapLayersByName('sadguri')

if not layers:
    print("❌ შრე 'sadguri' ვერ მოიძებნა — შეამოწმე სახელი Layers პანელში")
else:
    layer = layers[0]
    print(f"✅ ნაპოვნია: {layer.name()}")
```

> 💡 **როგორ შეამოწმო სახელი?** QGIS Layers პანელში შრეს თავზე გადაატარე — ზუსტი სახელი გამოჩნდება. კოდში **სიტყვა-სიტყვით** უნდა ემთხვეოდეს (მათ შორის, დიდი/პატარა ასოებიც).

---

## 🔴 KeyError: 'field_name'

### მიზეზი 1 — სვეტი ატრიბუტულ ცხრილში არ არსებობს

```python
# ❌ შეცდომა — 'fid' სვეტი ცხრილში არ არის
for feat in layer.getFeatures():
    print(feat['fid'])   # → KeyError: 'fid'
```

```python
# ✅ გამოსწორება — ჯერ შეამოწმე სვეტები
print([f.name() for f in layer.fields()])
# → ['ID', 'Name', 'Area', 'Region']  ← 'fid' არ არის!

# შემდეგ გამოიყენე სწორი სახელი
for feat in layer.getFeatures():
    print(feat['ID'])
```

### მიზეზი 2 — სვეტის სახელი ძალიან გრძელია Shapefile-ისთვის

ESRI Shapefile-ი **მაქსიმუმ 10 სიმბოლოს** იძლევა სვეტის სახელში:

```python
# ❌ შეცდომა — 12 სიმბოლო, Shapefile ვერ ინახავს
layer.dataProvider().addAttributes([
    QgsField('X_coordinate', QVariant.Double)   # → KeyError: 'X_coordinate'
])

# ✅ სწორია — 10 სიმბოლოს ფარგლებში
layer.dataProvider().addAttributes([
    QgsField('X_coord', QVariant.Double)        # 7 სიმბოლო ✅
])
```

> 💡 GeoPackage (`.gpkg`) ან GeoJSON ფორმატებს სახელის სიგრძის შეზღუდვა **არ აქვთ**.

---

## 🔴 AssertionError — startEditing()

### რას ნიშნავს?

შრე **რედაქტირების რეჟიმში** (`Edit Mode`) უკვე გახსნილია — ორჯერ ვერ გაიხსნება.

```
AssertionError
File "edit.py", line 38, in __enter__
    assert self.layer.startEditing()
```

### გამოსწორება

```python
# ✅ გამოსწორება A — QGIS-ში ხელით გათიშე Edit Mode (✏️ ღილაკი Toolbar-ში)

# ✅ გამოსწორება B — კოდში შეამოწმე, სანამ გახსნი
if layer.isEditable():
    layer.rollBack()        # ან layer.commitChanges()

with edit(layer):
    # ახლა უსაფრთხოდ შეგიძლია რედაქტირება
    layer.changeAttributeValue(feat.id(), idx, new_value)
```

> ⚠️ **QGIS-ში** Layers პანელში შრეს ✏️ პატარა ფანქრის ხატი ეკვრის თუ Edit Mode ჩართულია — **გათიშე** სანამ სკრიპტს გაუშვებ.

---

## 🔴 invalid syntax — Processing ფუნქციის სახელი

### რას ნიშნავს?

ფუნქციის სახელი გაყოფილია — Python **ვერ ცნობს** გაყოფილ სახელს.

```python
# ❌ შეცდომა — 'proces sing' გაყოფილია
proces sing.run("native:deleteduplicategeometries", {
    'INPUT' : layer,
    'OUTPUT': output
})

# ✅ სწორია — ერთად
processing.run("native:deleteduplicategeometries", {
    'INPUT' : layer,
    'OUTPUT': output
})
```

---

## 🔴 Missing functions in IDE

### რას ნიშნავს?

გარე IDE-ში (VS Code, PyCharm) `QgsVectorLayer`, `QgsProject` და სხვა კლასები **არ ჩანს**, რადგან `qgis` მოდული **შემოტანილი არ არის**.

```python
# ❌ შეცდომა — QGIS კლასები ხელმისაწვდომი არ არის
layer = QgsVectorLayer(fn, 'Layer', 'ogr')   # → NameError

# ✅ სწორია — კოდის დასაწყისში შემოიტანე
import qgis
from qgis.core import QgsVectorLayer, QgsProject, QgsVectorFileWriter

layer = QgsVectorLayer(fn, 'Layer', 'ogr')
```

> 💡 **QGIS Python Console-ში** ეს იმპორტი **ავტომატურად** ხდება. გარე IDE-ში ხელით უნდა ჩაწერო.

---

## 🗂️ ფაილის ბილიკები — სწორი ჩაწერა

Windows-ზე `\` სიმბოლო Python-ში **escape character**-ია — სპეციალური მნიშვნელობა აქვს.

```python
# ❌ არასწორი — \U, \P Python-ი სპეციალურ სიმბოლოდ კითხულობს
fn = 'C:\Users\Public\GIS\points.shp'

# ✅ ვარიანტი 1 — r"" raw string (რეკომენდებული)
fn = r'C:\Users\Public\GIS\points.shp'

# ✅ ვარიანტი 2 — ორმაგი backslash
fn = 'C:\\Users\\Public\\GIS\\points.shp'

# ✅ ვარიანტი 3 — forward slash (მუშაობს Windows-ზეც)
fn = 'C:/Users/Public/GIS/points.shp'
```

> 💡 **რეკომენდაცია:** გამოიყენე `r''` (raw string) — ყველაზე კითხვადია და შეცდომები გამოირიცხება.

---

## 💡 `iface.addVectorLayer()` — სახელის პარამეტრი

```python
iface.addVectorLayer(fn, '', 'ogr')
#                        ↑
#                  ეს არის შრის სახელი QGIS-ში
#                  '' = ცარიელი → QGIS ფაილის სახელს გამოიყენებს
```

```python
# სახელის მითითებით
iface.addVectorLayer(fn, 'ჩემი შრე', 'ogr')
```

---

## 📌 შეჯამება — შეცდომების სქემა

```
შეცდომა მიიღე?
      │
      ├── EOL / SyntaxError    → ბრჭყალი ან ' აკლია
      │
      ├── NameError            → typo სახელში? ['Field'] ბრჭყალები?
      │
      ├── AttributeError       → QVariant.Int (დიდი I)?
      │
      ├── IndexError           → mapLayersByName() სახელი სწორია?
      │
      ├── KeyError             → სვეტი ცხრილში არსებობს? სახელი ≤10 სიმბოლო?
      │
      └── AssertionError       → Edit Mode გათიშული? isEditable() შეამოწმე
```

👉 **პირველი ნაბიჯი ყოველთვის:** შეცდომის **ბოლო სტრიქონი** წაიკითხე — იქ არის მიზეზი.