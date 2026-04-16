# 🧩 PyQGIS — QgsFeature
**QgsFeature** წარმოადგენს ერთ გეოგრაფიულ ობიექტს ვექტორულ ფენაში: მას აქვს **გეომეტრია** (QgsGeometry) და **ატრიბუტები** (ველების შესაბამისი მნიშვნელობები).  

---

## 📚 როდის ვიყენებთ QgsFeature-ს?
- ახალი ობიექტის დასამატებლად ფენაში (წერტილი/ხაზი/პოლიგონი)
- არსებული ობიექტების ასაკრეფად, წასაკითხად და შესაცვლელად
- ატრიბუტების დასაყენებლად/განახლებისთვის
- ბუფერების/გადაფარვების/სხვა ანალიზის შედეგების ჩასაწერად

---

## 🧠 ძირითადი კონცეფციები
- **Feature (ობიექტი)** — გეომეტრიისა და ატრიბუტების ერთობლიობა
- **FID/ID** — ფენაში უნიკალური იდენტიფიკატორი (განსხვავდება ატრიბუტის სვეტში არსებული „ID“-სგან)
- **Geometry** — QgsGeometry (Point/LineString/Polygon/Multiparts…)
- **Attributes** — სია/ლისტი მნიშვნელობებისა, რომელიც ემთხვევა ფენის `QgsFields()` სტრუქტურას

---

## ✅ სწრაფი მაგალითი — QgsFeature შექმნა და ატრიბუტების დაყენება
```python
from qgis.core import QgsFeature, QgsGeometry, QgsPointXY

feat = QgsFeature()                              # ცარიელი ობიექტი
geom = QgsGeometry.fromPointXY(QgsPointXY(44.8, 41.7))
feat.setGeometry(geom)                           # ვანიჭებთ გეომეტრიას
feat.setAttributes([1, "Tbilisi", 1110000])     # ვანიჭებთ ატრიბუტებს (უმჯობესია ფენასთან შესაბამისი რიგითობით)
```

> შენიშვნა: `setAttributes()` სიაში ელემენტთა რაოდენობა უნდა ემთხვეოდეს ფენის `QgsFields()` რაოდენობას (ან გამოიყენე `setAttribute(index, value)`).

---

## 🧪 გამოყენება ფენასთან — ახალი ობიექტის ჩაწერა
```python
from qgis.core import QgsProject, QgsVectorLayer, QgsField, QgsFields, QgsWkbTypes, QgsFeature, QgsGeometry, QgsPointXY
from PyQt5.QtCore import QVariant

# შევქმნათ მეხსიერების ფენა (Point, EPSG:4326)
vl = QgsVectorLayer("Point?crs=EPSG:4326", "Cities", "memory")
pr = vl.dataProvider()

# დავამატოთ ველები
pr.addAttributes([QgsField("ID", QVariant.Int), QgsField("Name", QVariant.String), QgsField("Pop", QVariant.Int)])
vl.updateFields()

# შევქმნათ ობიექტი
f = QgsFeature(vl.fields())                      # გადავცემთ ველების სტრუქტურას
f.setGeometry(QgsGeometry.fromPointXY(QgsPointXY(44.8, 41.7)))
f["ID"] = 1                                      # ალტერნატივა: f.setAttribute("ID", 1)
f["Name"] = "Tbilisi"
f["Pop"] = 1110000

pr.addFeatures([f])                              # ჩავამატოთ ფენაში
vl.updateExtents()

QgsProject.instance().addMapLayer(vl)
```

---

## 🔁 არსებული ობიექტების წაკითხვა და ცვლილება (რედაქტირების რეჟიმი)
```python
# რედაქტირების რეჟიმი საჭიროა ატრიბუტების/გეომეტრიის შესაცვლელად
vl.startEditing()

for f in vl.getFeatures():                       # იტერაცია ყველა ობიექტზე
    if f["Name"] == "Tbilisi":
        vl.changeAttributeValue(f.id(), vl.fields().indexOf("Pop"), 1200000)  # Pop = 1.2m

# გეომეტრიის შეცვლა (მაგ., მილიმეტრული შიფტი)
for f in vl.getFeatures():
    g = f.geometry()
    if g and g.isMultipart() is False:
        p = g.asPoint()
        new_g = QgsGeometry.fromPointXY(QgsPointXY(p.x() + 0.001, p.y()))
        vl.changeGeometry(f.id(), new_g)

vl.commitChanges()                               # ცვლილებების შენახვა
```

> TIP: `vl.rollBack()` გამოიყენე შეცდომისას ცვლილებების გასაუქმებლად.

---

## 🧮 სასარგებლო მეთოდები
- `QgsFeature(fields=None)` — კონსტრუქტორი; სურვილისამებრ ველების სტრუქტურით
- `setGeometry(QgsGeometry)` / `geometry()`
- `setAttributes(list)` / `attributes()`
- `setAttribute(index_or_name, value)` / `attribute(index_or_name)`
- `id()` — ფენის შიდა იდენტიფიკატორი (FID)
- `isValid()` — აქვს თუ არა მინიჭებული გეომეტრია/ატრიბუტები შესაბამისობაში

---

## 🧷 მრავალნაწილიანი გეომეტრია (Multipart)
```python
from qgis.core import QgsGeometry, QgsPointXY

# ორი წერტილისგან Multipart Point
mp = QgsGeometry.fromMultiPointXY([QgsPointXY(44.8, 41.7), QgsPointXY(41.6, 41.65)])
f = QgsFeature(vl.fields())
f.setGeometry(mp)
f.setAttributes([2, "Cities MP", None])
vl.dataProvider().addFeatures([f])
vl.updateExtents()
```

> გამოიყენე `geometry().isMultipart()` რათა გაიგო, არის თუ არა ობიექტი მრავალნაწილიანი.

---

## 🧰 QgsFeature შრეებიდან ამოღება (Selection / Filter)
```python
# 1) Feature iterator + expression filter
expr = '"Pop" > 1000000'                         # QGIS expression
for f in vl.getFeatures(expr):
    print(f["Name"], f["Pop"])

# 2) მაიდენტიფიცირებელი Feature ID-ებით
ids = [f.id() for f in vl.getFeatures() if f["Name"].startswith("T")]
for fid in ids:
    feat = next(vl.getFeatures(f"id = {fid}"))   # კონკრეტული FID-ის მოძებნა
    print("Selected:", feat["Name"])
```

---

## 🧱 შეცდომები და გავრცელებული ხაფანგები
- **ველების ბმის დარღვევა** — `setAttributes()` სიის სიგრძე არ ემთხვევა `QgsFields()` რაოდენობას → გამოიყენე `setAttribute()` ინდივიდუალურად.
- **რედაქტირების რეჟიმის დავიწყება** — `changeAttributeValue` / `changeGeometry` მოითხოვს `startEditing()` და `commitChanges()`.
- **FID vs Attribute ID** — `f.id()` != `f["ID"]` (პირველი შიდა ტექნიკური იდენტიფიკატორია).  
- **CRS/ერთეულები** — `geometry().area()/length()` აბრუნებს შედეგს ფენის CRS-ის ერთეულებში.

---

## 🧭 მცირე ამოცანები
1) შექმენი მეხსიერების ფენა Point ტიპით, ველებით: `ID(Int), Name(String), Elev(Double)` და დაამატე 5 წერტილი.  
2) იპოვე ყველა წერტილი, სადაც `Elev > 1200`, და დაამატე მათ ახალ ველში `High=True`.  
3) არსებული ხაზოვანი ფენიდან აიღე თითო feature და ჩაწერე მისი სიგრძე ველში `Len_m` (გაითვალისწინე CRS მეტრებში).  
4) შექმენი Multipart Polygon ერთი Feature-ით ორი სამკუთხედით და ჩაამატე ფენაში.

---

## 🔚 შეჯამება
- **QgsFeature** არის ძირითადი სამშენებლო ელემენტი ვექტორულ მონაცემებში.  
- მასთან ერთად იყენებ **QgsGeometry**-სა და **QgsFields/QgsField**-ს.  
- სწორი რედაქტირების-ციკლი: `startEditing()` → ცვლილებები → `commitChanges()` (ან `rollBack()`).  
- იმუშავე გამჭვირვალე ატრიბუტების სქემით და CRS-ების ცოდნით.

