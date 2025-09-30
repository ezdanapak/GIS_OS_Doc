# QVariant PyQGIS-ში

## რა არის QVariant?

**QVariant** არის Qt Framework-ში არსებული უნივერსალური კონტეინერი, რომელსაც შეუძლია შეინახოს სხვადასხვა ტიპის მონაცემები.  
ის არის "generic container" ტიპის ობიექტი, რომელიც გამოიყენება მონაცემთა გადასაცემად **Qt კომპონენტებს შორის**.

მაგალითად, `QVariant`-ში შეიძლება შეინახოს:
- მთელი რიცხვები (int)
- ათწილადი რიცხვები (float, double)
- სტრიქონები (QString / Python str)
- ლოგიკური მნიშვნელობები (bool)
- თარიღები და დრო (QDate, QTime, QDateTime)
- სხვა Qt ტიპები ან მომხმარებლის მიერ განსაზღვრული ობიექტები

ეს მრავალფეროვნება საშუალებას გვაძლევს ერთნაირი ინტერფეისით ვიმუშაოთ მონაცემთა სხვადასხვა ტიპებთან.

---

## რატომ გამოიყენება QVariant PyQGIS-ში?

PyQGIS-ში `QVariant` ხშირად გვხვდება შემდეგ სცენარებში:

1. **ატრიბუტების შენახვა ვექტორულ ფენებში**  
   QGIS-ის ვექტორული ფენების ველები (Fields) ქმნიან ცხრილის სვეტებს, ხოლო თითოეული ატრიბუტი ინახება `QVariant` ობიექტში.

2. **QgsField ტიპის ველები**  
   როდესაც ვქმნით ახალ ფენას, ველი (Field) აღწერილია `QgsField` ობიექტით, სადაც მონაცემთა ტიპი მითითებულია `QVariant`-ის საშუალებით.

3. **გაძლიერებული მოქნილობა**  
   ერთნაირი API შეიძლება იმუშაოს სხვადასხვა მონაცემთა ტიპებთან — PyQGIS იყენებს `QVariant`-ს როგორც ერთგვარ „საყრდენს“.

---

## ძირითადი მაგალითები

### 1. QVariant ატრიბუტებში

```python
from qgis.PyQt.QtCore import QVariant
from qgis.core import QgsField

# ველის შექმნა, რომელიც ინახავს მთელ რიცხვებს
field_id = QgsField("ID", QVariant.Int)

# ველის შექმნა, რომელიც ინახავს ტექსტს
field_name = QgsField("Name", QVariant.String)
```

ამ მაგალითში:
- `QVariant.Int` -> მთელი რიცხვი  
- `QVariant.String` -> ტექსტი  

---

### 2. QVariant სხვადასხვა ტიპებით

```python
from qgis.PyQt.QtCore import QVariant

# მთელ რიცხვად შენახვა
val_int = QVariant(42)
print(val_int.toInt())

# სტრიქონად შენახვა
val_str = QVariant("Tbilisi")
print(val_str.toString())

# ათწილად რიცხვად შენახვა
val_float = QVariant(3.14)
print(val_float.toDouble())
```

**შენიშვნა:** PyQGIS/PyQt-ში `QVariant` ობიექტებს აქვთ მეთოდები (`toInt()`, `toString()`, `toDouble()`), რომლებსაც შეუძლიათ მნიშვნელობის გარდაქმნა საჭირო ტიპად.

---

### 3. QVariant ვექტორულ ფენებში

```python
from qgis.core import QgsVectorLayer, QgsField, QgsFields
from qgis.PyQt.QtCore import QVariant

# ახალი ფენის შექმნა მეხსიერებაში
layer = QgsVectorLayer("Point?crs=epsg:4326", "Cities", "memory")

# ველების დამატება
pr = layer.dataProvider()
fields = QgsFields()
fields.append(QgsField("ID", QVariant.Int))
fields.append(QgsField("Name", QVariant.String))

pr.addAttributes(fields)
layer.updateFields()
```

აქ ველების ტიპები განისაზღვრება `QVariant` კლასის მეშვეობით.

---

## QVariant ტიპები Qt/PyQGIS-ში

ყველაზე ხშირად გამოყენებული `QVariant` ტიპებია:

| QVariant ტიპი | აღწერა |
|---------------|---------|
| `QVariant.Int` | მთელი რიცხვი |
| `QVariant.Double` | ათწილადი რიცხვი |
| `QVariant.String` | ტექსტი |
| `QVariant.Bool` | ლოგიკური მნიშვნელობა (True/False) |
| `QVariant.Date` | თარიღი |
| `QVariant.Time` | დრო |
| `QVariant.DateTime` | თარიღი და დრო |
| `QVariant.LongLong` | გრძელი მთელი რიცხვი |
| `QVariant.ByteArray` | ბინარული მონაცემები |

---

## პრაქტიკული დავალებები სტუდენტებისთვის

1. შექმენით ახალი Point ფენა, სადაც გექნებათ ველები:
   - ID (Int)
   - Name (String)
   - Population (Int)

2. დაამატეთ მინიმუმ 3 ჩანაწერი (მაგალითად, თბილისის, ქუთაისის და ბათუმის შესახებ).

3. შეინახეთ ფენა `GeoPackage` ფორმატში.  
   ფაილში შეამოწმეთ, რომ ველების ტიპები სწორად არის მითითებული.

---

## დასკვნა

- `QVariant` არის უნივერსალური კონტეინერი, რომელიც Qt და PyQGIS-ში გამოიყენება სხვადასხვა ტიპის მონაცემების შესანახად და გადასაცემად.  
- იგი ხშირად გვხვდება **QgsField**, **ატრიბუტების მართვაში**, და მონაცემების **გადაქცევის პროცესში**.  
- PyQGIS-ის ეფექტური გამოყენებისთვის მნიშვნელოვანია გვესმოდეს, თუ როგორ მუშაობს `QVariant` და როგორ გარდაიქმნება ის საჭირო მონაცემთა ტიპად.
