## ობიექტის სივრცითი შერჩევა — Select By Location

სივრცითი შერჩევა საშუალებას გვაძლევს ვიპოვოთ ობიექტები **სხვა შრის** გეომეტრიასთან მათი სივრცითი ურთიერთობის მიხედვით — მაგ: „გამიარჩიე ყველა დასახლება, რომელიც კვეთს ქ. სოხუმის კონტურს".

---

### გამოყენებული პარამეტრები

| პარამეტრი | აღწერა |
|-----------|--------|
| `INPUT` | შრე, რომელშიც ხდება შერჩევა |
| `PREDICATE` | სივრცითი პირობა (იხ. ქვემოთ) |
| `INTERSECT` | „ნიღბის" შრე — მასთან მიმართებით ხდება შერჩევა |
| `METHOD` | შერჩევის რეჟიმი (ახალი / დამატება / გამოკლება) |

**`PREDICATE` მნიშვნელობები:**

| კოდი | სივრცითი პირობა |
|------|----------------|
| `0` | intersects — კვეთს |
| `1` | contains — შეიცავს |
| `2` | disjoint — არ კვეთს |
| `3` | equals — ემთხვევა |
| `4` | touches — ეხება |
| `5` | overlaps — გადაფარავს |
| `6` | within — შიგნითაა |
| `7` | crosses — გადაკვეთს |

**`METHOD` მნიშვნელობები:**

| კოდი | რეჟიმი |
|------|--------|
| `0` | ახალი შერჩევა |
| `1` | არსებულ შერჩევას ემატება |
| `2` | არსებულ შერჩევიდან გამოკლება |
| `3` | არსებული შერჩევის ფარგლებში |

---

### ვარიაცია 1 — მარტივი შერჩევა მთელი შრით

```py title="select_by_location_simple.py" linenums="1"
# ფაილების მისამართები
fn_settlements = r'D:\Location\Settlements.shp'  # INPUT — სადაც ვასრულებთ შერჩევას
fn_sokhumi     = r'D:\Location\Sokhumi.shp'      # INTERSECT — "ნიღაბი"

# შერჩევა: ყველა დასახლება, რომელიც კვეთს სოხუმის კონტურს
processing.run(
    "native:selectbylocation",
    {
        'INPUT'    : fn_settlements,
        'PREDICATE': [0],            # 0 = intersects (კვეთს)
        'INTERSECT': fn_sokhumi,
        'METHOD'   : 0               # 0 = ახალი შერჩევა
    }
)
```

> 💡 **მარტივი შემთხვევა** — `INTERSECT`-ში გადადის **მთელი შრე**.
> შრის ყველა ობიექტი მონაწილეობს „ნიღბის" როლში.

---

### ვარიაცია 2 — შერჩევა **შერჩეული ობიექტებით** (`selectedFeaturesOnly`)

```py title="select_by_location_selected.py" linenums="1"
from qgis.core import QgsProcessingFeatureSourceDefinition, QgsFeatureRequest

# ფაილების მისამართები
fn_municipalities = r'D:\Location\Municipalitys.shp'  # INTERSECT — "ნიღაბი" (შერჩეული)
fn_settlements    = r'D:\Location\Settlements.shp'    # INPUT — სადაც ვასრულებთ შერჩევას

# შერჩევა: მხოლოდ შერჩეული მუნიციპალიტეტ(ებ)ის ტერიტორიაზე მოხვედრილი დასახლებები
processing.run(
    "native:selectbylocation",
    {
        'INPUT'    : fn_settlements,
        'PREDICATE': [0],            # 0 = intersects
        'INTERSECT': QgsProcessingFeatureSourceDefinition(
            fn_municipalities,
            selectedFeaturesOnly = True,   # მხოლოდ შერჩეული ობიექტები
            featureLimit         = -1,     # ლიმიტი არ არის (-1 = ყველა)
            geometryCheck        = QgsFeatureRequest.GeometryAbortOnInvalid
        ),
        'METHOD'   : 0
    }
)
```

> 💡 **`selectedFeaturesOnly=True`** — „ნიღბად" გამოიყენება არა მთელი შრე,
> არამედ **მხოლოდ წინასწარ შერჩეული** ობიექტები (ხელით ან კოდით).
>
> ⚠️ **`GeometryAbortOnInvalid`** — არასწორი გეომეტრიის შემთხვევაში პროცესი წყდება.
> ალტერნატივა: `GeometrySkipInvalid` — არასწორი ობიექტი გამოტოვდება (გაფრთხილება).

---

### ვარიაცია 3 — სრული სამუშაო ნაკადი (Pipeline)

```py title="select_by_location_pipeline.py" linenums="1"
from qgis.core import QgsProcessingFeatureSourceDefinition, QgsFeatureRequest

# ---- 1. ფაილების განსაზღვრა ----
fn_municipalities = r'C:\Users\Public\GIS\PyGK\tema_3\Georgia_municipalities.shp'
fn_settlements    = r'C:\Users\Public\GIS\PyGK\tema_3\settlement.shp'

# ---- 2. სივრცითი შერჩევა — შერჩეული მუნიციპალიტეტ(ებ)ის მიხედვით ----
processing.run(
    "native:selectbylocation",
    {
        'INPUT'    : fn_settlements,
        'PREDICATE': [0],
        'INTERSECT': QgsProcessingFeatureSourceDefinition(
            fn_municipalities,
            selectedFeaturesOnly = True,
            featureLimit         = -1,
            geometryCheck        = QgsFeatureRequest.GeometryAbortOnInvalid
        ),
        'METHOD'   : 0
    }
)

# ---- 3. შრის ჩატვირთვა რუკაზე ----
layer = iface.addVectorLayer(fn_settlements, 'დასახლებები', 'ogr')

if layer and layer.isValid():
    print(f"შრე ჩაიტვირთა: {layer.name()}")
    print(f"შერჩეული ობიექტები: {layer.selectedFeatureCount()}")
else:
    print("⚠ შეცდომა: შრე ვერ ჩაიტვირთა")
```

> 💡 `iface.addVectorLayer(path, სახელი, 'ogr')` — შრეს ამატებს **Layers Panel**-ში.
> მეორე არგუმენტი (`'დასახლებები'`) — შრის სახელი QGIS-ში.
> ცარიელი სტრიქონის (`''`) გადაცემა ნებადართულია, მაგრამ სახელის მიცემა რეკომენდებულია.

---

### ვარიაცია 4 — შერჩევა კოდით + შერჩეულების გამოტანა

```py title="select_by_location_export.py" linenums="1"
from qgis.core import (
    QgsProcessingFeatureSourceDefinition,
    QgsFeatureRequest,
    QgsVectorLayer
)

fn_municipalities = r'C:\Users\Public\GIS\PyGK\tema_3\Georgia_municipalities.shp'
fn_settlements    = r'C:\Users\Public\GIS\PyGK\tema_3\settlement.shp'

# ---- 1. მუნიციპალიტეტების შრის ჩატვირთვა ----
muni_layer = QgsVectorLayer(fn_municipalities, 'მუნიციპალიტეტები', 'ogr')

# ---- 2. კოდით შერჩევა — მაგ: Tbilisi მუნიციპალიტეტი ----
muni_layer.selectByExpression('"name_ka" = \'თბილისი\'')

print(f"შერჩეული მუნიციპალიტეტი: {muni_layer.selectedFeatureCount()}")

# ---- 3. სივრცითი შერჩევა ----
processing.run(
    "native:selectbylocation",
    {
        'INPUT'    : fn_settlements,
        'PREDICATE': [0],
        'INTERSECT': QgsProcessingFeatureSourceDefinition(
            fn_municipalities,
            selectedFeaturesOnly = True,
            featureLimit         = -1,
            geometryCheck        = QgsFeatureRequest.GeometryAbortOnInvalid
        ),
        'METHOD'   : 0
    }
)

# ---- 4. შერჩეული დასახლებების სახელების გამოტანა ----
sett_layer = iface.addVectorLayer(fn_settlements, 'დასახლებები', 'ogr')

for feat in sett_layer.selectedFeatures():
    print(f"  → {feat['name_ka']}")
```

---

### 📋 მეთოდების შეჯამება

| მეთოდი | გამოყენება |
|--------|-----------|
| `processing.run("native:selectbylocation", {...})` | სივრცითი შერჩევა |
| `QgsProcessingFeatureSourceDefinition(path, selectedFeaturesOnly=True)` | შერჩეული ობიექტებით ნიღბი |
| `iface.addVectorLayer(path, name, 'ogr')` | შრის ჩატვირთვა რუკაზე |
| `layer.selectedFeatureCount()` | შერჩეული ობიექტების რაოდენობა |
| `layer.selectedFeatures()` | შერჩეული ობიექტების იტერაცია |
| `layer.selectByExpression("\"field\" = 'value'")` | გამოსახულებით შერჩევა |

---

> **შემდეგი თემა:** `processing.run("native:saveselectedfeatures", {...})` — შერჩეული ობიექტების ახალ ფაილად შენახვა.