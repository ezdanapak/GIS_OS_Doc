# `native:` და `qgis:` — განსხვავება PyQGIS-ში

`processing.run()`-ში პირველი არგუმენტი ყოველთვის ასე გამოიყურება:

```python
processing.run("native:pointstopath", {...})
processing.run("qgis:selectbyattribute", {...})
#               ↑
#          provider:toolname
#          ─────────────────
#          პრეფიქსი : ხელსაწყოს სახელი
```

**პრეფიქსი** — ეუბნება QGIS-ს **სად მოძებნოს** ეს ხელსაწყო.

---

## 🔑 ძირითადი განსხვავება

| | `native:` | `qgis:` |
|--|-----------|---------|
| **დაწერილია** | C++-ში | Python-ში |
| **სიჩქარე** | ⚡ სწრაფი | 🐢 შედარებით ნელი |
| **ვინ ინახავს** | QGIS Core ბიბლიოთეკა | QGIS Python Plugins |
| **სტაბილურობა** | ✅ მაღალი | 🔶 ვერსიებს შორის შეიძლება შეიცვალოს |
| **Thread-safe** | ✅ | 🔶 ყოველთვის არა |
| **მდებარეობა** | `qgis/src/analysis/` | `python/plugins/processing/` |

---

## 🔧 `native:` — C++ ხელსაწყოები

`native:` — QGIS-ის **C++ ბირთვში** ჩაშენებული ხელსაწყოები. ყველაზე სწრაფი და სტაბილური.

### მაგალითები

```python
# წერტილი → ხაზი
processing.run("native:pointstopath", {
    'INPUT'            : layer,
    'ORDER_EXPRESSION' : '"ID"',
    'CLOSE_PATH'       : False,
    'OUTPUT'           : 'TEMPORARY_OUTPUT'
})

# ბუფერი
processing.run("native:buffer", {
    'INPUT'    : layer,
    'DISTANCE' : 100,
    'SEGMENTS' : 5,
    'OUTPUT'   : 'TEMPORARY_OUTPUT'
})

# პოლიგონი → ხაზი
processing.run("native:polygonstolines", {
    'INPUT' : layer,
    'OUTPUT': 'TEMPORARY_OUTPUT'
})

# ხაზზე წერტილები
processing.run("native:pointsalonglines", {
    'INPUT'   : layer,
    'DISTANCE': 50,
    'OUTPUT'  : 'TEMPORARY_OUTPUT'
})

# Dissolve
processing.run("native:dissolve", {
    'INPUT' : layer,
    'FIELD' : ['Region'],
    'OUTPUT': 'TEMPORARY_OUTPUT'
})

# დუბლიკატ გეომეტრიების წაშლა
processing.run("native:deleteduplicategeometries", {
    'INPUT' : layer,
    'OUTPUT': 'TEMPORARY_OUTPUT'
})
```

### სად ცხოვრობს კოდი?

```
QGIS Source Code:
  qgis/src/analysis/processing/
    ├── qgsalgorithmbuffer.cpp          ← native:buffer
    ├── qgsalgorithmpointstopath.cpp    ← native:pointstopath
    ├── qgsalgorithmpolygonstolines.cpp ← native:polygonstolines
    └── ...
```

---

## 🐍 `qgis:` — Python ხელსაწყოები

`qgis:` — Python-ში დაწერილი ხელსაწყოები, QGIS Processing Framework-ის ნაწილი.

### მაგალითები

```python
# ატრიბუტით მონიშვნა
processing.run("qgis:selectbyattribute", {
    'INPUT'    : layer,
    'FIELD'    : 'Region',
    'OPERATOR' : 0,        # 0 = equals (=)
    'VALUE'    : 'კახეთი',
    'METHOD'   : 0         # 0 = new selection
})

# ხაზი → პოლიგონი
processing.run("qgis:linestopolygons", {
    'INPUT' : layer,
    'OUTPUT': 'TEMPORARY_OUTPUT'
})

# ველის გაანგარიშება
processing.run("qgis:fieldcalculator", {
    'INPUT'         : layer,
    'FIELD_NAME'    : 'area_ha',
    'FIELD_TYPE'    : 0,       # 0 = Float
    'FIELD_LENGTH'  : 10,
    'FIELD_PRECISION': 2,
    'FORMULA'       : '$area / 10000',
    'OUTPUT'        : 'TEMPORARY_OUTPUT'
})

# რენდომული შერჩევა
processing.run("qgis:randomselection", {
    'INPUT' : layer,
    'METHOD': 0,     # 0 = Number of selected features
    'NUMBER': 10
})
```

### სად ცხოვრობს კოდი?

```
QGIS Source Code:
  python/plugins/processing/algs/qgis/
    ├── SelectByAttribute.py      ← qgis:selectbyattribute
    ├── LinesToPolygons.py        ← qgis:linestopolygons
    ├── FieldCalculator.py        ← qgis:fieldcalculator
    └── ...
```

---

## ⚡ სიჩქარის განსხვავება — რატომ?

```
native:buffer (C++)                    qgis:selectbyattribute (Python)
─────────────────────────────────      ─────────────────────────────────
კომპილირებული binary კოდი             ინტერპრეტირებული Python კოდი
         │                                        │
         ▼                                        ▼
CPU პირდაპირ ასრულებს                Python interpreter → bytecode → CPU
         │                                        │
         ▼                                        ▼
    ~10x სწრაფი                          overhead ყოველ ოპერაციაზე
```

**პრაქტიკული განსხვავება:**

```python
import time

# 100,000 feature-იანი შრე

start = time.time()
processing.run("native:buffer", {'INPUT': large_layer, 'DISTANCE': 100, 'OUTPUT': 'TEMPORARY_OUTPUT'})
print(f"native: {time.time() - start:.2f}s")   # → native:  1.2s

start = time.time()
processing.run("qgis:buffer", {'INPUT': large_layer, 'DISTANCE': 100, 'OUTPUT': 'TEMPORARY_OUTPUT'})
print(f"qgis:   {time.time() - start:.2f}s")   # → qgis:   11.8s  (არსებობდა ძველ ვერსიებში)
```

> 💡 სწორედ ამიტომ **ბევრი `qgis:` ხელსაწყო `native:`-ად გადაიწერა** QGIS 3.x-ის ციკლში.

---

## 🔄 `qgis:` → `native:` — მიგრაცია

QGIS 3.x-ის განვითარებასთან ერთად, ბევრი `qgis:` ხელსაწყო **C++-ად გადაიწერა** და `native:` გახდა. ძველი `qgis:` სახელი ხშირად **alias-ად** ინახება — ძველი კოდი მაინც მუშაობს.

```python
# ეს ორი ხშირად ერთი და იგივეა QGIS 3.x-ში:
processing.run("qgis:dissolve", {...})    # ← alias
processing.run("native:dissolve", {...}) # ← რეალური განხორციელება

# QGIS-ი ხელსაწყოს ბიბლიოთეკა ამას პასუხობს:
# "qgis:dissolve is deprecated, use native:dissolve"
```

### ვერსიების მიხედვით

| ხელსაწყო | ძველი | ახალი (3.x) |
|---------|-------|------------|
| Dissolve | `qgis:dissolve` | `native:dissolve` |
| Buffer | `qgis:fixeddistancebuffer` | `native:buffer` |
| Polygon to Lines | `qgis:polygonstolines` | `native:polygonstolines` |
| Points along Geometry | `qgis:pointsalonglines` | `native:pointsalonglines` |
| Centroid | `qgis:centroids` | `native:centroids` |

---

## 🌐 სხვა პრეფიქსები

`native:` და `qgis:`-ს გარდა სხვა პრეფიქსებიც არსებობს:

```python
# gdal: — GDAL ბიბლიოთეკა (რასტრი, ვექტორი)
processing.run("gdal:translate", {...})
processing.run("gdal:warpreproject", {...})
processing.run("gdal:rasterize", {...})

# grass7: — GRASS GIS ხელსაწყოები
processing.run("grass7:v.buffer", {...})
processing.run("grass7:r.slope.aspect", {...})

# saga: — SAGA GIS ხელსაწყოები
processing.run("saga:slopeaspectcurvature", {...})

# 3d: — QGIS 3D ხელსაწყოები
processing.run("3d:tessellate", {...})
```

### პრეფიქსების შედარება

| პრეფიქსი | ენა | სპეციალიზაცია |
|---------|-----|--------------|
| `native:` | C++ | ვექტორი, ზოგადი geo-processing |
| `qgis:` | Python | ზოგადი, სელექცია, ველები |
| `gdal:` | C++ | რასტრი, ფორმატების კონვერტაცია |
| `grass7:` | C | ჰიდროლოგია, ანალიზი, რასტრი |
| `saga:` | C++ | მოდელირება, ტერიტორიული ანალიზი |
| `3d:` | C++ | 3D გეომეტრია |

---

## 🔍 ხელსაწყოს პოვნა

### Python Console-ში — ყველა ხელსაწყოს სია

```python
# ყველა ხელსაწყო
for alg in QgsApplication.processingRegistry().algorithms():
    print(alg.id())
# → native:buffer
# → native:pointstopath
# → qgis:selectbyattribute
# → gdal:translate
# → ...

# კონკრეტული საძიებო სიტყვით
for alg in QgsApplication.processingRegistry().algorithms():
    if 'point' in alg.id().lower():
        print(alg.id(), '→', alg.displayName())
# → native:pointstopath → Points to Path
# → native:pointsalonglines → Points along Geometry
# → native:randompointsinextent → Random points in extent
```

### ხელსაწყოს პარამეტრების გარკვევა

```python
# ხელსაწყოს სრული აღწერა
import processing
processing.algorithmHelp("native:pointstopath")
# გამოდის:
# Points to Path (native:pointstopath)
# Parameters
# INPUT: Input layer [vector: point]
# ORDER_EXPRESSION: Order expression [expression]
# ...
```

### Processing Toolbox-ში ვიზუალურად

```
QGIS → Processing → Toolbox (Ctrl+Alt+T)
     → მარჯვენა ღილაკი ხელსაწყოზე
     → "Copy as Python Command"
     → პირდაპირ კოდს გაძლევს processing.run()-ით
```

---

## 📌 შეჯამება

```
processing.run("native:pointstopath", {...})
               ↑
               └── native: = C++ = სწრაფი, სტაბილური ✅

processing.run("qgis:selectbyattribute", {...})
               ↑
               └── qgis: = Python = მოქნილი, ჩასწორებადი 🔶
```

- **`native:`** — C++-ში დაწერილი, სწრაფი, **პირველი არჩევანი** თუ არსებობს
- **`qgis:`** — Python-ში დაწერილი, ნელი, ზოგჯერ `native:`-ის **alias**
- ახალ კოდში ყოველთვის **`native:`** გამოიყენე სადაც შესაძლებელია
- **`gdal:`**, **`grass7:`**, **`saga:`** — სპეციალიზირებული ბიბლიოთეკები
- `processing.algorithmHelp("native:toolname")` — ხელსაწყოს პარამეტრების გარკვევა

👉 QGIS Processing Toolbox-ში ხელსაწყოს სახელს ყოველთვის იხილავ — `native:` ან `qgis:` პრეფიქსით.# `native:` და `qgis:` — განსხვავება PyQGIS-ში

`processing.run()`-ში პირველი არგუმენტი ყოველთვის ასე გამოიყურება:

```python
processing.run("native:pointstopath", {...})
processing.run("qgis:selectbyattribute", {...})
#               ↑
#          provider:toolname
#          ─────────────────
#          პრეფიქსი : ხელსაწყოს სახელი
```

**პრეფიქსი** — ეუბნება QGIS-ს **სად მოძებნოს** ეს ხელსაწყო.

---

## 🔑 ძირითადი განსხვავება

| | `native:` | `qgis:` |
|--|-----------|---------|
| **დაწერილია** | C++-ში | Python-ში |
| **სიჩქარე** | ⚡ სწრაფი | 🐢 შედარებით ნელი |
| **ვინ ინახავს** | QGIS Core ბიბლიოთეკა | QGIS Python Plugins |
| **სტაბილურობა** | ✅ მაღალი | 🔶 ვერსიებს შორის შეიძლება შეიცვალოს |
| **Thread-safe** | ✅ | 🔶 ყოველთვის არა |
| **მდებარეობა** | `qgis/src/analysis/` | `python/plugins/processing/` |

---

## 🔧 `native:` — C++ ხელსაწყოები

`native:` — QGIS-ის **C++ ბირთვში** ჩაშენებული ხელსაწყოები. ყველაზე სწრაფი და სტაბილური.

### მაგალითები

```python
# წერტილი → ხაზი
processing.run("native:pointstopath", {
    'INPUT'            : layer,
    'ORDER_EXPRESSION' : '"ID"',
    'CLOSE_PATH'       : False,
    'OUTPUT'           : 'TEMPORARY_OUTPUT'
})

# ბუფერი
processing.run("native:buffer", {
    'INPUT'    : layer,
    'DISTANCE' : 100,
    'SEGMENTS' : 5,
    'OUTPUT'   : 'TEMPORARY_OUTPUT'
})

# პოლიგონი → ხაზი
processing.run("native:polygonstolines", {
    'INPUT' : layer,
    'OUTPUT': 'TEMPORARY_OUTPUT'
})

# ხაზზე წერტილები
processing.run("native:pointsalonglines", {
    'INPUT'   : layer,
    'DISTANCE': 50,
    'OUTPUT'  : 'TEMPORARY_OUTPUT'
})

# Dissolve
processing.run("native:dissolve", {
    'INPUT' : layer,
    'FIELD' : ['Region'],
    'OUTPUT': 'TEMPORARY_OUTPUT'
})

# დუბლიკატ გეომეტრიების წაშლა
processing.run("native:deleteduplicategeometries", {
    'INPUT' : layer,
    'OUTPUT': 'TEMPORARY_OUTPUT'
})
```

### სად ცხოვრობს კოდი?

```
QGIS Source Code:
  qgis/src/analysis/processing/
    ├── qgsalgorithmbuffer.cpp          ← native:buffer
    ├── qgsalgorithmpointstopath.cpp    ← native:pointstopath
    ├── qgsalgorithmpolygonstolines.cpp ← native:polygonstolines
    └── ...
```

---

## 🐍 `qgis:` — Python ხელსაწყოები

`qgis:` — Python-ში დაწერილი ხელსაწყოები, QGIS Processing Framework-ის ნაწილი.

### მაგალითები

```python
# ატრიბუტით მონიშვნა
processing.run("qgis:selectbyattribute", {
    'INPUT'    : layer,
    'FIELD'    : 'Region',
    'OPERATOR' : 0,        # 0 = equals (=)
    'VALUE'    : 'კახეთი',
    'METHOD'   : 0         # 0 = new selection
})

# ხაზი → პოლიგონი
processing.run("qgis:linestopolygons", {
    'INPUT' : layer,
    'OUTPUT': 'TEMPORARY_OUTPUT'
})

# ველის გაანგარიშება
processing.run("qgis:fieldcalculator", {
    'INPUT'         : layer,
    'FIELD_NAME'    : 'area_ha',
    'FIELD_TYPE'    : 0,       # 0 = Float
    'FIELD_LENGTH'  : 10,
    'FIELD_PRECISION': 2,
    'FORMULA'       : '$area / 10000',
    'OUTPUT'        : 'TEMPORARY_OUTPUT'
})

# რენდომული შერჩევა
processing.run("qgis:randomselection", {
    'INPUT' : layer,
    'METHOD': 0,     # 0 = Number of selected features
    'NUMBER': 10
})
```

### სად ცხოვრობს კოდი?

```
QGIS Source Code:
  python/plugins/processing/algs/qgis/
    ├── SelectByAttribute.py      ← qgis:selectbyattribute
    ├── LinesToPolygons.py        ← qgis:linestopolygons
    ├── FieldCalculator.py        ← qgis:fieldcalculator
    └── ...
```

---

## ⚡ სიჩქარის განსხვავება — რატომ?

```
native:buffer (C++)                    qgis:selectbyattribute (Python)
─────────────────────────────────      ─────────────────────────────────
კომპილირებული binary კოდი             ინტერპრეტირებული Python კოდი
         │                                        │
         ▼                                        ▼
CPU პირდაპირ ასრულებს                Python interpreter → bytecode → CPU
         │                                        │
         ▼                                        ▼
    ~10x სწრაფი                          overhead ყოველ ოპერაციაზე
```

**პრაქტიკული განსხვავება:**

```python
import time

# 100,000 feature-იანი შრე

start = time.time()
processing.run("native:buffer", {'INPUT': large_layer, 'DISTANCE': 100, 'OUTPUT': 'TEMPORARY_OUTPUT'})
print(f"native: {time.time() - start:.2f}s")   # → native:  1.2s

start = time.time()
processing.run("qgis:buffer", {'INPUT': large_layer, 'DISTANCE': 100, 'OUTPUT': 'TEMPORARY_OUTPUT'})
print(f"qgis:   {time.time() - start:.2f}s")   # → qgis:   11.8s  (არსებობდა ძველ ვერსიებში)
```

> 💡 სწორედ ამიტომ **ბევრი `qgis:` ხელსაწყო `native:`-ად გადაიწერა** QGIS 3.x-ის ციკლში.

---

## 🔄 `qgis:` → `native:` — მიგრაცია

QGIS 3.x-ის განვითარებასთან ერთად, ბევრი `qgis:` ხელსაწყო **C++-ად გადაიწერა** და `native:` გახდა. ძველი `qgis:` სახელი ხშირად **alias-ად** ინახება — ძველი კოდი მაინც მუშაობს.

```python
# ეს ორი ხშირად ერთი და იგივეა QGIS 3.x-ში:
processing.run("qgis:dissolve", {...})    # ← alias
processing.run("native:dissolve", {...}) # ← რეალური განხორციელება

# QGIS-ი ხელსაწყოს ბიბლიოთეკა ამას პასუხობს:
# "qgis:dissolve is deprecated, use native:dissolve"
```

### ვერსიების მიხედვით

| ხელსაწყო | ძველი | ახალი (3.x) |
|---------|-------|------------|
| Dissolve | `qgis:dissolve` | `native:dissolve` |
| Buffer | `qgis:fixeddistancebuffer` | `native:buffer` |
| Polygon to Lines | `qgis:polygonstolines` | `native:polygonstolines` |
| Points along Geometry | `qgis:pointsalonglines` | `native:pointsalonglines` |
| Centroid | `qgis:centroids` | `native:centroids` |

---

## 🌐 სხვა პრეფიქსები

`native:` და `qgis:`-ს გარდა სხვა პრეფიქსებიც არსებობს:

```python
# gdal: — GDAL ბიბლიოთეკა (რასტრი, ვექტორი)
processing.run("gdal:translate", {...})
processing.run("gdal:warpreproject", {...})
processing.run("gdal:rasterize", {...})

# grass7: — GRASS GIS ხელსაწყოები
processing.run("grass7:v.buffer", {...})
processing.run("grass7:r.slope.aspect", {...})

# saga: — SAGA GIS ხელსაწყოები
processing.run("saga:slopeaspectcurvature", {...})

# 3d: — QGIS 3D ხელსაწყოები
processing.run("3d:tessellate", {...})
```

### პრეფიქსების შედარება

| პრეფიქსი | ენა | სპეციალიზაცია |
|---------|-----|--------------|
| `native:` | C++ | ვექტორი, ზოგადი geo-processing |
| `qgis:` | Python | ზოგადი, სელექცია, ველები |
| `gdal:` | C++ | რასტრი, ფორმატების კონვერტაცია |
| `grass7:` | C | ჰიდროლოგია, ანალიზი, რასტრი |
| `saga:` | C++ | მოდელირება, ტერიტორიული ანალიზი |
| `3d:` | C++ | 3D გეომეტრია |

---

## 🔍 ხელსაწყოს პოვნა

### Python Console-ში — ყველა ხელსაწყოს სია

```python
# ყველა ხელსაწყო
for alg in QgsApplication.processingRegistry().algorithms():
    print(alg.id())
# → native:buffer
# → native:pointstopath
# → qgis:selectbyattribute
# → gdal:translate
# → ...

# კონკრეტული საძიებო სიტყვით
for alg in QgsApplication.processingRegistry().algorithms():
    if 'point' in alg.id().lower():
        print(alg.id(), '→', alg.displayName())
# → native:pointstopath → Points to Path
# → native:pointsalonglines → Points along Geometry
# → native:randompointsinextent → Random points in extent
```

### ხელსაწყოს პარამეტრების გარკვევა

```python
# ხელსაწყოს სრული აღწერა
import processing
processing.algorithmHelp("native:pointstopath")
# გამოდის:
# Points to Path (native:pointstopath)
# Parameters
# INPUT: Input layer [vector: point]
# ORDER_EXPRESSION: Order expression [expression]
# ...
```

### Processing Toolbox-ში ვიზუალურად

```
QGIS → Processing → Toolbox (Ctrl+Alt+T)
     → მარჯვენა ღილაკი ხელსაწყოზე
     → "Copy as Python Command"
     → პირდაპირ კოდს გაძლევს processing.run()-ით
```

---

## 📌 შეჯამება

```
processing.run("native:pointstopath", {...})
               ↑
               └── native: = C++ = სწრაფი, სტაბილური ✅

processing.run("qgis:selectbyattribute", {...})
               ↑
               └── qgis: = Python = მოქნილი, ჩასწორებადი 🔶
```

- **`native:`** — C++-ში დაწერილი, სწრაფი, **პირველი არჩევანი** თუ არსებობს
- **`qgis:`** — Python-ში დაწერილი, ნელი, ზოგჯერ `native:`-ის **alias**
- ახალ კოდში ყოველთვის **`native:`** გამოიყენე სადაც შესაძლებელია
- **`gdal:`**, **`grass7:`**, **`saga:`** — სპეციალიზირებული ბიბლიოთეკები
- `processing.algorithmHelp("native:toolname")` — ხელსაწყოს პარამეტრების გარკვევა

👉 QGIS Processing Toolbox-ში ხელსაწყოს სახელს ყოველთვის იხილავ — `native:` ან `qgis:` პრეფიქსით.