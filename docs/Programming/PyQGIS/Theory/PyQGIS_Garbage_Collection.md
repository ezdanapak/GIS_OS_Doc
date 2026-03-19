# 📌 PyQGIS: Shapefile-ის შექმნა და Garbage Collection

> **QGIS 3.22 – 3.44+ | თანამედროვე API | Georgian Technical Guide**

შენი კლასიკური `QgsVectorFileWriter` + `del writer` მიდგომა **ჯერ კიდევ მუშაობს**, მაგრამ თანამედროვე QGIS-ში უფრო უსაფრთხო და ელეგანტური გზები არსებობს.

---

## 📋 შინაარსი

1. [მაგალითი კოდი — ძველი სანდო სტილი](#მაგალითი-კოდი)
2. [რა არის Garbage Collector?](#რა-არის-garbage-collector)
3. [QgsVectorFileWriter-ის ცხოვრების ციკლი](#ცხოვრების-ციკლი)
4. [del writer-ის გარეშე — რა ხდება?](#del-writer-ის-გარეშე)
5. [თანამედროვე მიდგომა (QGIS 3.22+)](#თანამედროვე-მიდგომა)
6. [try / finally — საუკეთესო პრაქტიკა](#try--finally)
7. [Context Manager — `with` სტილი](#context-manager--with-სტილი)
8. [სრული მაგალითი — Feature-ების ჩაწერა](#სრული-მაგალითი--feature-ების-ჩაწერა)
9. [TL;DR — სწრაფი გადაწყვეტილების ცხრილი](#tldr)

---

## 🧾 მაგალითი კოდი

### ძველი (მაგრამ სანდო) სტილი

```python
from qgis.core import (
    QgsVectorFileWriter,
    QgsFields,
    QgsField,
    QgsWkbTypes,
    QgsCoordinateReferenceSystem
)
from PyQt5.QtCore import QVariant

shapefile_path = r'C:\Users\Public\Documents\GIS\shapefile\saxli.shp'

# ველების განსაზღვრა
fields = QgsFields()
fields.append(QgsField('ID',      QVariant.Int))
fields.append(QgsField('Field_1', QVariant.String))
fields.append(QgsField('Field_2', QVariant.Double))

# Writer-ის შექმნა
writer = QgsVectorFileWriter(
    shapefile_path,
    'UTF-8',
    fields,
    QgsWkbTypes.Point,
    QgsCoordinateReferenceSystem('EPSG:32638'),
    'ESRI Shapefile'
)

# ... აქ ჩაწერ feature-ებს ...

del writer  # ⚠️ ეს ხაზი სავალდებულოა!
```

> ⚠️ **გამაფრთხილებელი შენიშვნა:** `del writer` გარეშე ფაილი შეიძლება **არასრული** ან **locked** დარჩეს!

---

## ♻️ რა არის Garbage Collector?

Python ავტომატურად მართავს მეხსიერებას — როდესაც ობიექტზე **reference** აღარ არსებობს, GC მას შლის.

**პრობლემა PyQGIS-ში** — ორ-ფენიანი არქიტექტურა:

```
┌─────────────────────────────┐
│   Python (SIP wrapper)      │  ← GC-ს ეს ფენა ხედავს
├─────────────────────────────┤
│   C++ (ფაილი, ბუფერი, lock) │  ← GC-ს ეს ფენა ყოველთვის არ ხედავს
└─────────────────────────────┘
```

👉 **შედეგი:** Python-ის GC შეიძლება "გაახსენდეს" ობიექტის წაშლა, მაგრამ C++ დესტრუქტორი არ გაიძახოს — ფაილი კი დახურულ-გაურეცხავი დარჩეს.

---

## 🔄 ცხოვრების ციკლი

```
writer = QgsVectorFileWriter(...)   →   ✅ ფაილი იხსნება + lock-დება
          ↓
addFeature(feat)                    →   📦 მონაცემები ბუფერში
          ↓
del writer  (ან GC)                 →   🔧 C++ დესტრუქტორი იძახება
          ↓
ფაილი იხურება + ბოლო მონაცემები ჩაიწერება   →   ✅ დასრულებულია
```

---

## ❌ `del writer`-ის გარეშე — რა ხდება?

| პრობლემა | შედეგი | სად ხდება ხშირად |
|----------|--------|-----------------|
| 🔒 ფაილი რჩება **locked** | `"File in use"` — წაშლა/გადატანა შეუძლებელია | Windows-ზე ყოველთვის |
| 💾 ბოლო feature-ები **არ ჩაიწერება** | `.shp` ფაილი არასრულია, ზოგჯერ 0 KB | ნებისმიერ OS-ზე |
| 🧠 **Memory leak** loop-ში | `Out of Memory` / QGIS-ი იკეტება | დიდი ციკლების დროს |

---

## 🚀 თანამედროვე მიდგომა

### `create()` + `SaveVectorOptions` (QGIS 3.22+)

```python
from qgis.core import (
    QgsVectorFileWriter,
    QgsCoordinateTransformContext,
    QgsProject
)

options = QgsVectorFileWriter.SaveVectorOptions()
options.driverName   = "ESRI Shapefile"
options.fileEncoding = "UTF-8"
# options.actionOnExistingFile = QgsVectorFileWriter.CreateOrOverwriteFile

transform_context = QgsProject.instance().transformContext()

writer = QgsVectorFileWriter.create(
    shapefile_path,
    fields,
    QgsWkbTypes.Point,
    QgsCoordinateReferenceSystem('EPSG:32638'),
    transform_context,
    options
)

if writer.hasError() != QgsVectorFileWriter.NoError:
    print("❌ შეცდომა:", writer.errorMessage())
else:
    # ... addFeature(feat) ...
    del writer
    print("✅ ფაილი წარმატებით შეიქმნა")
```

### Layer-ის პირდაპირ ექსპორტი

```python
# თუ გაქვს მზა QgsVectorLayer
error, new_file, _, _ = QgsVectorFileWriter.writeAsVectorFormatV3(
    layer,
    shapefile_path,
    transform_context,
    options
)

if error == QgsVectorFileWriter.NoError:
    print("✅ ექსპორტი დასრულდა — del საჭირო არ არის!")
```

> ✅ `writeAsVectorFormatV3` — ამ შემთხვევაში **`del` არ გჭირდება**, რადგან writer შიდა scope-შია.

---

## 🛡️ `try / finally` — საუკეთესო პრაქტიკა

```python
writer = QgsVectorFileWriter.create(
    shapefile_path,
    fields,
    QgsWkbTypes.Point,
    QgsCoordinateReferenceSystem('EPSG:32638'),
    QgsProject.instance().transformContext(),
    options
)

try:
    for feature in features:
        writer.addFeature(feature)
    print(f"✅ {len(features)} feature ჩაიწერა")

except Exception as e:
    print(f"❌ შეცდომა: {e}")

finally:
    del writer  # გარანტირებული cleanup — შეცდომის შემთხვევაშიც!
    print("🔒 ფაილი უსაფრთხოდ დახურულია")
```

> 💡 `finally` ბლოკი **ყოველთვის** სრულდება — გამონაკლისის შემთხვევაშიც, რაც cleanup-ს გარანტიას იძლევა.

---

## 🧩 Context Manager — `with` სტილი

### პრობლემა: `QgsVectorFileWriter`-ს `with` ჩაშენებული არ აქვს

`QgsVectorFileWriter` **არ არის** native context manager — მას არ გააჩნია `__enter__` / `__exit__` მეთოდები. ამიტომ პირდაპირ ასე **ვერ** გამოიყენებ:

```python
# ❌ ეს არ მუშაობს!
with QgsVectorFileWriter(...) as writer:
    writer.addFeature(feat)
```

### გამოსავალი 1 — `contextlib.contextmanager` (მარტივი)

```python
from contextlib import contextmanager
from qgis.core import QgsVectorFileWriter, QgsProject

@contextmanager
def vector_writer(path, fields, geom_type, crs, options):
    """
    QgsVectorFileWriter-ის context manager wrapper.
    with ბლოკის დასასრულს ავტომატურად ახდენს cleanup-ს.
    """
    writer = QgsVectorFileWriter.create(
        path, fields, geom_type, crs,
        QgsProject.instance().transformContext(),
        options
    )
    if writer.hasError() != QgsVectorFileWriter.NoError:
        raise RuntimeError(f"Writer შეცდომა: {writer.errorMessage()}")
    try:
        yield writer          # ← ეს "writer" მოდის as-ში
    finally:
        del writer            # ← with ბლოკის დასასრულს ყოველთვის სრულდება
        print("✅ ფაილი დახურულია")


# გამოყენება:
with vector_writer(shapefile_path, fields, QgsWkbTypes.Point, crs, options) as writer:
    for feat in features:
        writer.addFeature(feat)
# ← აქ del ავტომატურად უკვე მოხდა
```

> ✅ **უპირატესობა:** `del`-ზე ფიქრი აღარ გჭირდება — `finally` ბლოკი ამას ყოველთვის გაარიგებს.

---

### გამოსავალი 2 — Wrapper კლასი `__enter__` / `__exit__`-ით (ობიექტ-ორიენტირებული)

```python
from qgis.core import (
    QgsVectorFileWriter, QgsFields, QgsWkbTypes,
    QgsCoordinateReferenceSystem, QgsProject
)

class ShapefileWriter:
    """
    QgsVectorFileWriter-ის OOP wrapper with context manager მხარდაჭერით.

    გამოყენება:
        with ShapefileWriter(path, fields, geom_type, crs) as writer:
            writer.addFeature(feat)
    """

    def __init__(self, path, fields, geom_type, crs, options=None):
        self.path      = path
        self.fields    = fields
        self.geom_type = geom_type
        self.crs       = crs
        self.options   = options or self._default_options()
        self._writer   = None

    @staticmethod
    def _default_options():
        opts = QgsVectorFileWriter.SaveVectorOptions()
        opts.driverName   = "ESRI Shapefile"
        opts.fileEncoding = "UTF-8"
        return opts

    def __enter__(self):
        self._writer = QgsVectorFileWriter.create(
            self.path, self.fields, self.geom_type, self.crs,
            QgsProject.instance().transformContext(),
            self.options
        )
        if self._writer.hasError() != QgsVectorFileWriter.NoError:
            raise RuntimeError(self._writer.errorMessage())
        return self._writer    # ← ეს "writer" მოდის as writer-ში

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self._writer is not None:
            del self._writer   # ← გარანტირებული cleanup
            self._writer = None
        if exc_type:
            print(f"❌ გამონაკლისი: {exc_val}")
        else:
            print(f"✅ '{self.path}' — წარმატებით შეიქმნა")
        return False           # ← False = გამონაკლისი კვლავ გარეთ გადაეცემა


# გამოყენება:
with ShapefileWriter(shapefile_path, fields, QgsWkbTypes.Point, crs) as writer:
    for feat in features:
        writer.addFeature(feat)
```

> 💡 **რატომ `return False`?** — `__exit__` ბლოკში `False` ნიშნავს, რომ გამონაკლისი **არ ჩახშობილა** — ის კვლავ გარეთ "ამოვა". `True` კი ჩახშობდა, რაც ჩვეულებრივ არასასურველია.

---

### მეთოდების შედარება

```
┌──────────────────┬───────────────────┬──────────────────┬──────────────────┐
│ მიდგომა          │ auto cleanup      │ კოდის სიმარტივე  │ რეკომენდაცია    │
├──────────────────┼───────────────────┼──────────────────┼──────────────────┤
│ del writer       │ ❌ ხელით          │ ✅ მარტივი       │ ძველი კოდი      │
│ try / finally    │ ✅ გარანტირებული  │ 🔶 საშუალო       │ ✅ კარგი         │
│ contextmanager   │ ✅ გარანტირებული  │ ✅ მარტივი       │ ✅ კარგი         │
│ Wrapper კლასი    │ ✅ გარანტირებული  │ ✅ ელეგანტური    │ ⭐ საუკეთესო     │
└──────────────────┴───────────────────┴──────────────────┴──────────────────┘
```

---

## 📝 სრული მაგალითი — Feature-ების ჩაწერა

ქვემოთ მოცემულია **end-to-end** მაგალითი: ველების განსაზღვრიდან დაწყებული, feature-ების შექმნამდე და Shapefile-ში ჩაწერამდე. კოორდინატები — **EPSG:32638** (UTM Zone 38N, საქართველო).

```python
from qgis.core import (
    QgsVectorFileWriter,
    QgsFields,
    QgsField,
    QgsFeature,
    QgsGeometry,
    QgsPointXY,
    QgsWkbTypes,
    QgsCoordinateReferenceSystem,
    QgsProject
)
from PyQt5.QtCore import QVariant
from contextlib import contextmanager

# ──────────────────────────────────────────────
# 1. კონფიგურაცია
# ──────────────────────────────────────────────
OUTPUT_PATH = r'C:\Users\Public\Documents\GIS\shapefile\saxlebi.shp'
CRS         = QgsCoordinateReferenceSystem('EPSG:32638')  # UTM 38N — საქართველო

# ──────────────────────────────────────────────
# 2. ველების (სვეტების) განსაზღვრა
# ──────────────────────────────────────────────
fields = QgsFields()
fields.append(QgsField('id',         QVariant.Int))
fields.append(QgsField('dasaxeleba', QVariant.String, len=100))
fields.append(QgsField('fartobi',    QVariant.Double, prec=2))
fields.append(QgsField('aghuricxva', QVariant.Int))

# ──────────────────────────────────────────────
# 3. საცდელი მონაცემები (სახლების სია)
# ──────────────────────────────────────────────
saxlebi_data = [
    # (id,  dasaxeleba,              fartobi, aghuricxva, x_utm,      y_utm     )
    (1,  'სახლი N1 — თბილისი',  120.5,   4,          490230.0,  4741850.0),
    (2,  'სახლი N2 — რუსთავი',   85.0,   2,          501100.0,  4732400.0),
    (3,  'სახლი N3 — გორი',      210.0,  6,          432700.0,  4740600.0),
    (4,  'სახლი N4 — ქუთაისი',   95.5,   3,          340850.0,  4738200.0),
    (5,  'სახლი N5 — ბათუმი',   175.0,   5,          241950.0,  4616300.0),
]

# ──────────────────────────────────────────────
# 4. Context Manager (contextlib სტილი)
# ──────────────────────────────────────────────
@contextmanager
def vector_writer(path, fields, geom_type, crs):
    options = QgsVectorFileWriter.SaveVectorOptions()
    options.driverName   = "ESRI Shapefile"
    options.fileEncoding = "UTF-8"
    options.actionOnExistingFile = QgsVectorFileWriter.CreateOrOverwriteFile

    writer = QgsVectorFileWriter.create(
        path, fields, geom_type, crs,
        QgsProject.instance().transformContext(),
        options
    )
    if writer.hasError() != QgsVectorFileWriter.NoError:
        raise RuntimeError(f"❌ Writer ვერ შეიქმნა: {writer.errorMessage()}")
    try:
        yield writer
    finally:
        del writer   # C++ destructor → ფაილი იხურება + flush

# ──────────────────────────────────────────────
# 5. Feature-ების შექმნა და ჩაწერა
# ──────────────────────────────────────────────
written_count = 0

with vector_writer(OUTPUT_PATH, fields, QgsWkbTypes.Point, CRS) as writer:

    for row in saxlebi_data:
        feat_id, dasaxeleba, fartobi, aghuricxva, x, y = row

        # 5a. Feature ობიექტის შექმნა
        feat = QgsFeature(fields)

        # 5b. გეომეტრია — Point
        feat.setGeometry(QgsGeometry.fromPointXY(QgsPointXY(x, y)))

        # 5c. ატრიბუტების შევსება
        feat['id']          = feat_id
        feat['dasaxeleba']  = dasaxeleba
        feat['fartobi']     = fartobi
        feat['aghuricxva']  = aghuricxva

        # 5d. Feature-ის ჩაწერა
        if writer.addFeature(feat):
            written_count += 1
            print(f"  ✅ [{feat_id}] {dasaxeleba}")
        else:
            print(f"  ❌ [{feat_id}] ჩაწერა ვერ მოხდა!")

# ── with ბლოკი დასრულდა → del ავტომატურად მოხდა ──
print(f"\n📊 სულ ჩაიწერა: {written_count} / {len(saxlebi_data)} feature")
print(f"📁 ფაილი: {OUTPUT_PATH}")
```

### მოსალოდნელი გამოტანა (output)

```
  ✅ [1] სახლი N1 — თბილისი
  ✅ [2] სახლი N2 — რუსთავი
  ✅ [3] სახლი N3 — გორი
  ✅ [4] სახლი N4 — ქუთაისი
  ✅ [5] სახლი N5 — ბათუმი

📊 სულ ჩაიწერა: 5 / 5 feature
📁 ფაილი: C:\Users\Public\Documents\GIS\shapefile\saxlebi.shp
✅ ფაილი დახურულია
```

---

### 🗺️ Feature-ების ჩაწერის სქემა

```
saxlebi_data (list of tuples)
        │
        ▼
  for row in saxlebi_data:
        │
        ├── QgsFeature(fields)            ← ჩარჩო/template
        │
        ├── setGeometry(QgsPointXY(x,y))  ← კოორდინატი
        │
        ├── feat['სახელი'] = მნიშვნელობა  ← ატრიბუტები
        │
        └── writer.addFeature(feat)       ← ბუფერში ჩაიწერება
                                                 │
                                    del writer  (with __exit__)
                                                 │
                                    C++ flush → disk ✅
```

> 💡 **შენიშვნა ველის სიგრძეზე:** `QgsField('dasaxeleba', QVariant.String, len=100)` — ESRI Shapefile-ში სტრიქონის მაქსიმალური სიგრძეა **254 სიმბოლო**. Georgian Unicode სიმბოლოებისთვის კარგი ზღვარია **100–150**.

---

## ⭐ TL;DR

### სწრაფი გადაწყვეტილების ცხრილი (2025–2026)

| სიტუაცია | რეკომენდაცია | `del` აუცილებელია? |
|----------|-------------|-------------------|
| მარტივი ერთჯერადი writer | `create()` + `del writer` | ✅ ხელით |
| Layer-ის ექსპორტი | `writeAsVectorFormatV3()` | ❌ არა |
| ბევრი ფაილის წერა ციკლში | `try / finally` + `del writer` | ✅ ხელით |
| სუფთა, მოდულური კოდი | `contextmanager` wrapper | ✅ ავტომატური |
| OOP / გამოყენებადი კლასი | `ShapefileWriter` (`__exit__`) | ✅ ავტომატური |
| მაქსიმალური სტაბილურობა | ნებისმიერი `with` მიდგომა | ✅ გარანტირებული |

---

### 💎 მთავარი გზავნილი

```
PyQGIS  =  Python  +  C++
GC      ≠  საკმარისი
```

- **`del writer`** — ყოველთვის გამოიყენე ხელით შექმნილ writer-ებთან
- **`try / finally`** — გარანტირებული cleanup ნებისმიერ სცენარში
- **`contextmanager`** — სუფთა `with` სტილი მინიმალური კოდით
- **`ShapefileWriter` კლასი** — OOP მიდგომა, გამოყენებადი მთელ პროექტში
- **`writeAsVectorFormatV3`** — ყველაზე სუფთა გზა layer-ების ექსპორტისთვის

---

*გამოყენებული API: QGIS 3.22–3.44+ | PyQGIS | SIP wrapper | C++ destructor pattern*