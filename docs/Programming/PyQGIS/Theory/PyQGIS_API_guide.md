# PyQGIS API დოკუმენტაციის კითხვა

PyQGIS-ის ოფიციალური დოკუმენტაცია შეიძლება პირველად **რთულად მოეჩვენოს** — სიმბოლოები, ტიპები, arrow-ები. ეს გვერდი ხსნის **როგორ წავიკითხოთ** ეს ინფორმაცია პრაქტიკული მაგალითებით.

---

## 🔗 მაგალითი — `mapLayersByName`

ოფიციალური დოკუმენტაციის ბმული:
[QgsMapLayerStore.mapLayersByName](https://qgis.org/pyqgis/3.44/core/QgsMapLayerStore.html#qgis.core.QgsMapLayerStore.mapLayersByName)

```
mapLayersByName(self, name: str | None) → list[QgsMapLayer]
```

---

## 🔬 სიგნატურის დაშლა

```
mapLayersByName  (  self,  name: str | None  )  →  list[QgsMapLayer]
│                   │      │                      │
│                   │      │                      └── რას აბრუნებს
│                   │      └── პარამეტრი სახელით და ტიპით
│                   └── ყოველ Python კლასის მეთოდში — თვით ობიექტი
└── მეთოდის სახელი
```

### ნაწილი 1 — `self`

```python
mapLayersByName(self, name: str | None)
#               ↑
#   Python-ის კლასის მეთოდებში ყოველთვის პირველია.
#   გამოძახებისას ხელით არ გადაეცემა — Python ავტომატურად.
#   ნიშნავს: "ეს მეთოდი კლასის ობიექტს ეკუთვნის"
```

```python
# self = QgsProject.instance() — ანუ პროექტის ობიექტი
QgsProject.instance().mapLayersByName('gis_osm_places_free_1')
#          ↑
#     ეს არის "self" — კლასის ობიექტი, მეთოდი მასზე გამოიძახება
```

---

### ნაწილი 2 — `name: str | None`

```
name: str | None
│     │    │
│     │    └── None-ც მიიღება (Optional პარამეტრი)
│     └── str — სტრიქონი (string)
└── პარამეტრის სახელი
```

```
str | None  ←→  Optional[str]
```

ეს ნიშნავს: `name` პარამეტრი შეიძლება იყოს:

```python
# ✅ სტრიქონი
mapLayersByName('gis_osm_places_free_1')

# ✅ None
mapLayersByName(None)    # ← ყველა შრე დაუბრუნდება სახელის მიუხედავად
```

---

### ნაწილი 3 — `→ list[QgsMapLayer]`

```
→ list[QgsMapLayer]
↑  │    │
│  │    └── სიის ელემენტების ტიპი — QgsMapLayer ობიექტები
│  └── Python სია (list)
└── arrow = "აბრუნებს"
```

ანუ: მეთოდი **ყოველთვის სიას აბრუნებს** — `[]` — მაშინაც კი, თუ არაფერი მოიძებნა:

```python
result = QgsProject.instance().mapLayersByName('gis_osm_places_free_1')
print(type(result))   # → <class 'list'>

# მოიძებნა
print(result)         # → [<QgsVectorLayer: 'gis_osm_places_free_1' (ogr)>]

# ვერ მოიძებნა
result = QgsProject.instance().mapLayersByName('არარსებული')
print(result)         # → []    ← ცარიელი სია, არა None!
```

---

## 📖 სრული დოკუმენტაციის კითხვა

```
mapLayersByName(self, name: str | None) → list[QgsMapLayer]   ← სიგნატურა

Retrieve a list of matching layers by layer name.            ← რას აკეთებს

Parameters:
    name (Optional[str]) – name of layers to match          ← პარამეტრის აღწერა

Return type:
    list[QgsMapLayer]                                        ← დაბრუნების ტიპი

Returns:
    list of matching layers                                  ← დაბრუნების აღწერა

See also
    mapLayer()                                               ← მსგავსი მეთოდები
    mapLayers()
```

### ველი-ველად

| ველი | ღირებულება | ნიშნავს |
|------|-----------|---------|
| **სიგნატურა** | `mapLayersByName(self, name: str \| None)` | მეთოდის ხელწერა |
| **Parameters** | `name (Optional[str])` | რა გადაეცემა |
| **Return type** | `list[QgsMapLayer]` | რა ტიპი ბრუნდება |
| **Returns** | `list of matching layers` | დაბრუნებულის აღწერა |
| **See also** | `mapLayer()`, `mapLayers()` | მსგავსი მეთოდები |

---

## ✍️ კოდად გადაქცევა

დოკუმენტაციის წაკითხვიდან კოდამდე:

```python
# სიგნატურიდან ვიცით:
# 1. QgsProject.instance()-ზე გამოვიძახებთ (self)
# 2. name-ად სტრიქონს გადავცემთ
# 3. სიას მივიღებთ

layers = QgsProject.instance().mapLayersByName('gis_osm_places_free_1')
#                               ↑ name პარამეტრი

# "→ list[QgsMapLayer]" — სია მივიღეთ
# list[0] — პირველი ელემენტი (QgsMapLayer ობიექტი)
layer = layers[0]
```

### სიის `[0]` — რატომ?

```python
# mapLayersByName სიას აბრუნებს — შეიძლება რამდენიმე შრე ერთი სახელით!
layers = QgsProject.instance().mapLayersByName('roads')
# → [<QgsVectorLayer: 'roads' (ogr)>, <QgsVectorLayer: 'roads' (memory)>]
#     ↑ index 0                         ↑ index 1

layer = layers[0]    # ← პირველი შრე ავიღეთ
```

### სწორი გამოყენება — `IndexError`-ის თავიდან ასაცილებლად

```python
layers = QgsProject.instance().mapLayersByName('gis_osm_places_free_1')

# ❌ პირდაპირ [0] — თუ სია ცარიელია → IndexError: list index out of range
layer = layers[0]

# ✅ შემოწმებით
if layers:
    layer = layers[0]
    print(f"✅ ნაპოვნია: {layer.name()}")
else:
    print("❌ შრე ვერ მოიძებნა — შეამოწმე სახელი Layers პანელში")
```

---

## 🔗 `See also` — მსგავსი მეთოდები

დოკუმენტაცია ყოველთვის **მსგავს მეთოდებს** გვთავაზობს:

```
See also  mapLayer()    ← ერთი შრე ID-ით
See also  mapLayers()   ← ყველა შრე dictionary-ად
```

| მეთოდი | სიგნატურა | გამოიყენება |
|--------|----------|------------|
| `mapLayersByName()` | `(name) → list[QgsMapLayer]` | სახელით ძიება |
| `mapLayer()` | `(layerId) → QgsMapLayer` | ID-ით ძიება |
| `mapLayers()` | `() → dict[str, QgsMapLayer]` | ყველა შრე |

```python
# mapLayer() — ერთ ობიექტს აბრუნებს (სიას კი არა)
layer = QgsProject.instance().mapLayer('abc123_20250115')
# → <QgsVectorLayer: ...>  ან  None

# mapLayers() — ყველა შრე dictionary-ად
all_layers = QgsProject.instance().mapLayers()
# → {'id1': <QgsVectorLayer...>, 'id2': <QgsRasterLayer...>, ...}
for layer_id, layer in all_layers.items():
    print(layer.name())
```

---

## 📐 ტიპების ცნობარი

API დოკუმენტაციაში ხშირად გვხვდება ეს ნიშნები:

| ნიშანი | მნიშვნელობა | მაგალითი |
|--------|------------|---------|
| `str` | სტრიქონი | `'roads'` |
| `int` | მთელი რიცხვი | `42` |
| `float` | ათწილადი | `3.14` |
| `bool` | ლოგიკური | `True` / `False` |
| `None` | ცარიელი მნიშვნელობა | `None` |
| `str \| None` | სტრიქონი **ან** None | `Optional[str]` |
| `list[X]` | X ტიპის სია | `[layer1, layer2]` |
| `dict[K, V]` | K→V dictionary | `{'id': layer}` |
| `→ X` | X ტიპს აბრუნებს | `→ list[QgsMapLayer]` |
| `self` | კლასის ობიექტი | ხელით არ გადაეცემა |

---

## 📌 შეჯამება

```
mapLayersByName(self, name: str | None) → list[QgsMapLayer]
      │               │    │                 │
      │               │    └── None-ც შეიძლება
      │               └── str — სტრიქონი
      │         გადაეცემა → name='roads'
      └── მეთოდი QgsProject.instance()-ზე

→ list[QgsMapLayer]   =   ყოველთვის სია
                          ცარიელი [] თუ ვერ მოიძებნა
                          [layer] თუ ერთი მოიძებნა
                          [l1, l2] თუ რამდენიმე ერთი სახელით
```

```python
# დოკუმენტაციის წასაკითხი ნაბიჯები:
# 1. სახელი       → mapLayersByName
# 2. პარამეტრი    → name: str
# 3. დაბრუნება    → list → [0] პირველი ელემენტი
# 4. See also     → mapLayer() / mapLayers() — ალტერნატივები

layers = QgsProject.instance().mapLayersByName('gis_osm_places_free_1')
if layers:
    layer = layers[0]
```

👉 ოფიციალური PyQGIS 3.44 დოკუმენტაცია: [qgis.org/pyqgis/3.44](https://qgis.org/pyqgis/3.44/)