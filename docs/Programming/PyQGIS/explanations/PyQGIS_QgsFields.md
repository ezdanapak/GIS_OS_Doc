# 📝 PyQGIS: **QgsFields()** რა არის და რას აკეთებს?

## ▶️ რა არის QgsFields()?  
`QgsFields` არის **კლასი PyQGIS-ში**, რომელიც წარმოადგენს **ატრიბუტული ცხრილის სვეტების კოლექციას**.  
ანუ, როდესაც ვქმნით ახალ ვექტორულ შრეს (მაგ., shapefile), მის ცხრილში აუცილებლად უნდა განვსაზღვროთ სვეტები (ID, სახელი, ასაკი და ა.შ.). სწორედ ეს სვეტები ინახება **QgsFields()** ობიექტში.
ველები (Fields) არის მონაცემთა სტრუქტურები, რომლებიც განსაზღვრავენ ფენას (Layer) ან ფაილში შენახულ მონაცემებს. თითოეული ველი აქვს სახელი, ტიპი (მაგ., ტექსტი, რიცხვი) და სხვა თვისებები.
layerfield = QgsFields()
ამ კოდის შედეგად:

იქმნება ცარიელი QgsFields ობიექტი.
ეს ობიექტი გამოიყენება ახალი ატრიბუტული ველების დამატებისთვის ან არსებული ველების შესანახად ფენისთვის.

---

## 📦 ძირითადი ფუნქცია
- ინახავს **QgsField** ობიექტებს (ანუ თითოეული სვეტის აღწერას).  
- იძლევა საშუალებას მივუმატოთ, წავშალოთ ან მოვიძიოთ სვეტები.  
- გამოიყენება ახალ შრეში მონაცემების ჩასაწერად.

---

## 🧱 მაგალითი – ახალი ატრიბუტული ცხრილის შექმნა

```python
from qgis.core import QgsFields, QgsField
from PyQt5.QtCore import QVariant

# ვქმნით ცარიელ სვეტების კოლექციას
fields = QgsFields()

# ვამატებთ სვეტებს
fields.append(QgsField("ID", QVariant.Int))
fields.append(QgsField("Name", QVariant.String))
fields.append(QgsField("Age", QVariant.Double))

# ახლა fields ობიექტი ინახავს 3 სვეტს: ID, Name, Age
print(fields.count())   # გამოიტანს 3
```

---

## 📊 როგორ მუშაობს?

- `QgsField` – აღწერს ერთ სვეტს (სახელი + ტიპი).  
- `QgsFields` – არის **სვეტების ჯგუფი**.  
- როცა `QgsVectorFileWriter`–ს ვაწვდით `QgsFields`, ის ქმნის ახალ shapefile-ს მითითებული სვეტებით.

---

## 🔎 რატომ არის მნიშვნელოვანი?

1. **სტრუქტურის განსაზღვრა** – თუ არ გვაქვს ატრიბუტული სვეტები, ვერ შევინახავთ მნიშვნელობებს.  
2. **მონაცემების მართვა** – პროგრამულად ვაკონტროლებთ რა ტიპის ინფორმაცია ჩაიწერება (მთელი რიცხვი, ტექსტი, ათწილადი და ა.შ.).  
3. **ავტომატიზაცია** – როცა ბევრი shapefile უნდა შევქმნათ ერთნაირი სტრუქტურით, `QgsFields()` ამ პროცესს ამარტივებს.

---

## 🚀 პრაქტიკული მაგალითი: შრის შექმნა სვეტებით
```python
from qgis.core import QgsVectorFileWriter, QgsCoordinateReferenceSystem, QgsWkbTypes, QgsFeature, QgsGeometry, QgsPointXY

# ფაილის მისამართი
fn = r"C:\Users\Public\Documents\GIS\new_points.shp"

# ვქმნით სვეტებს
fields = QgsFields()
fields.append(QgsField("ID", QVariant.Int))
fields.append(QgsField("Name", QVariant.String))

# ვქმნით შრეს
writer = QgsVectorFileWriter(fn, "UTF-8", fields, QgsWkbTypes.Point,
                             QgsCoordinateReferenceSystem("EPSG:32638"), "ESRI Shapefile")

# ვამატებთ წერტილს
feat = QgsFeature()
feat.setGeometry(QgsGeometry.fromPointXY(QgsPointXY(356000, 4679000)))
feat.setAttributes([1, "Lake"])
writer.addFeature(feat)

del(writer)  # ვხურავთ writer-ს

iface.addVectorLayer(fn, "", "ogr")  # ვამატებთ QGIS-ში
```

---

## 🎯 დასკვნა
- **`QgsField`** – ერთ სვეტს აღწერს.  
- **`QgsFields`** – სვეტების სრული სიაა (ატრიბუტული ცხრილის სტრუქტურა).  
- თუ გინდა QGIS-ში ახალი ფაილი შექმნა, `QgsFields()` აუცილებელია.
