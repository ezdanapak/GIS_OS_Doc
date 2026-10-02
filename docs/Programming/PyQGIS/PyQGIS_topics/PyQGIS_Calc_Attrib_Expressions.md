---
title: "PyQGIS გეოსივრცითი გამოთვლების სკრიპტები"
author: "GK"
date: "2025-10-26"
description: "QGIS Python (PyQGIS) სკრიპტების კოლექცია გეოსივრცითი გამოთვლებისთვის — სიგრძე, ფართობი, პერიმეტრი და მოსახლეობის სიმჭიდროვე."
---

# 🗺️ PyQGIS გეოსივრცითი გამოთვლების სკრიპტები

ეს დოკუმენტი შეიცავს Python სკრიპტებს QGIS-ში გეოსივრცითი გამოთვლების შესასრულებლად, მათ შორის:

- ხაზოვანი შრის სიგრძის გამოთვლა  
- პოლიგონალური შრის ფართობისა და პერიმეტრის გამოთვლა  
- მოსახლეობის სიმჭიდროვის გამოთვლა ცხრილში  
- ახალი ველების შექმნა და მუდმივი მნიშვნელობების ჩაწერა  

ყველა სკრიპტი იყენებს QGIS-ის Python API-ს (**PyQGIS**) და ითვალისწინებს შესაბამისი შრეების არსებობას QGIS პროექტში.

---

## 1️⃣ ხაზოვანი შრის სიგრძის გამოთვლა

ეს სკრიპტი ითვლის ხაზოვანი შრის (მაგ., *Rivers*) ობიექტების სიგრძეს და ინახავს შედეგს ახალ ველში **`Len_M`**.

### 📜 კოდი

```python
# შრის მიღება სახელით 'Rivers'
layers = QgsProject.instance().mapLayersByName('Rivers')
layer = layers[0]

# მონაცემთა პროვაიდერზე წვდომა
pv = layer.dataProvider()

# ახალი ველის 'Len_M' დამატება სიგრძისთვის (double ტიპი)
pv.addAttributes([QgsField('Len_M', QVariant.Double)])
layer.updateFields()

# გამოთვლის გამოსახულების განსაზღვრა
expr1 = QgsExpression('length($geometry)')

# გამოსახულების კონტექსტის შექმნა
cntx = QgsExpressionContext()
cntx.appendScopes(QgsExpressionContextUtils.globalProjectLayerScopes(layer))

# შრის რედაქტირება და სიგრძის გამოთვლა
with edit(layer):
    for i in layer.getFeatures():
        cntx.setFeature(i)
        i['Len_M'] = expr1.evaluate(cntx)
        layer.updateFeature(i)
```

### 💡 განმარტება

- **შრის არჩევა:** იღებს შრეს სახელით `'Rivers'` QGIS პროექტიდან.  
- **ველი:** ქმნის ახალ ველს `Len_M` თითოეული ობიექტის სიგრძის შესანახად.  
- **გამოსახულება:** გამოიყენება `length($geometry)` თითოეული ობიექტის გეომეტრიის სიგრძის გამოსათვლელად.  
- **განახლება:** თითოეულ ობიექტზე ხდება გამოსახულების შეფასება და `Len_M` ველის განახლება.

---

## 2️⃣ პოლიგონალური შრის ფართობისა და პერიმეტრის გამოთვლა

ეს სკრიპტი ითვლის პოლიგონალური შრის (მაგ., *nakveti*) ობიექტების ფართობსა და პერიმეტრს და შედეგებს ინახავს ახალ ველებში **`Area_sq_m`** და **`Perimeter`**.

### 📜 კოდი

```python
# შრის მიღება სახელით 'nakveti'
layers = QgsProject.instance().mapLayersByName('nakveti')
layer = layers[0]

# მონაცემთა პროვაიდერზე წვდომა
pv = layer.dataProvider()

# ახალი ველების დამატება ფართობისა და პერიმეტრისთვის
pv.addAttributes([QgsField('Area_sq_m', QVariant.Double)])
pv.addAttributes([QgsField('Perimeter', QVariant.Double)])
layer.updateFields()

# გამოთვლის გამოსახულებების განსაზღვრა
expr1 = QgsExpression('area($geometry)')
expr2 = QgsExpression('perimeter($geometry)')

# გამოსახულების კონტექსტის შექმნა
cntx = QgsExpressionContext()
cntx.appendScopes(QgsExpressionContextUtils.globalProjectLayerScopes(layer))

# შრის რედაქტირება და ფართობისა და პერიმეტრის გამოთვლა
with edit(layer):
    for i in layer.getFeatures():
        cntx.setFeature(i)
        i['Area_sq_m'] = expr1.evaluate(cntx)
        i['Perimeter'] = expr2.evaluate(cntx)
        layer.updateFeature(i)
```

### 💡 განმარტება

- **შრის არჩევა:** იღებს შრეს სახელით `'nakveti'`.  
- **ველი:** ქმნის ორ ახალ ველს: `Area_sq_m` ფართობისთვის და `Perimeter` პერიმეტრისთვის.  
- **გამოსახულებები:**  
  - `area($geometry)` — ითვლის ფართობს  
  - `perimeter($geometry)` — ითვლის პერიმეტრს  
- **განახლება:** თითოეულ ობიექტზე ხდება ორივე გამოსახულების შეფასება და ველების განახლება.

---

## 3️⃣ მოსახლეობის სიმჭიდროვის გამოთვლა ცხრილში

ეს სკრიპტი ითვლის მოსახლეობის სიმჭიდროვეს შრეში (მაგ., *Municipalitys*) ფორმულით:

\[
D = \frac{P}{A}
\]

სადაც:

- **D** — მოსახლეობის სიმჭიდროვე  
- **P** — მოსახლეობის რაოდენობა (ველი `Mosaxl_200`)  
- **A** — ფართობი (კვ. მეტრში ან კვ. კმ-ში)

### 📜 კოდი

```python
# შრის მიღება სახელით 'Municipalitys'
layers = QgsProject.instance().mapLayersByName('Municipalitys')
layer = layers[0]

# მონაცემთა პროვაიდერზე წვდომა
pv = layer.dataProvider()

# ახალი ველების დამატება ფართობის, ფართობის კვ.კმ-ში და სიმჭიდროვისთვის
pv.addAttributes([
    QgsField('area', QVariant.Double),
    QgsField('area_km', QVariant.Double),
    QgsField('simwidrove', QVariant.Double)
])
layer.updateFields()

# გამოთვლის გამოსახულებების განსაზღვრა
expr1 = QgsExpression('$area')                 # ფართობი კვ. მეტრში
expr2 = QgsExpression('"area"/1000000')        # ფართობი კვ. კილომეტრში
expr3 = QgsExpression('"Mosaxl_200"/area_km')  # მოსახლეობის სიმჭიდროვე

# გამოსახულების კონტექსტის შექმნა
cntx = QgsExpressionContext()
cntx.appendScopes(QgsExpressionContextUtils.globalProjectLayerScopes(layer))

# ფართობის გამოთვლა
with edit(layer):
    for i in layer.getFeatures():
        cntx.setFeature(i)
        i['area'] = expr1.evaluate(cntx)
        layer.updateFeature(i)

# ფართობის გარდაქმნა კვ. კილომეტრში
with edit(layer):
    for i in layer.getFeatures():
        cntx.setFeature(i)
        i['area_km'] = expr2.evaluate(cntx)
        layer.updateFeature(i)

# მოსახლეობის სიმჭიდროვის გამოთვლა
with edit(layer):
    for i in layer.getFeatures():
        cntx.setFeature(i)
        i['simwidrove'] = expr3.evaluate(cntx)
        layer.updateFeature(i)
```

### 💡 განმარტება

- **შრის არჩევა:** იღებს შრეს სახელით `'Municipalitys'`.  
- **ველი:** ქმნის სამ ახალ ველს —  
  `area` (კვ.მ), `area_km` (კვ.კმ), `simwidrove` (სიმჭიდროვე).  
- **გამოსახულებები:**  
  - `expr1`: `$area` — ითვლის ფართობს კვ. მეტრში  
  - `expr2`: `"area"/1000000` — გარდაქმნის ფართობს კვ. კილომეტრში  
  - `expr3`: `"Mosaxl_200"/area_km` — ითვლის მოსახლეობის სიმჭიდროვეს  
- **განახლება:** გამოთვლები სრულდება სამ ცალკე ციკლში, რათა სწორად შეიქმნას დამოკიდებულებები (`area` → `area_km` → `simwidrove`).

---

## 4️⃣ ახალი ველების შექმნა და მუდმივი მნიშვნელობების ჩაწერა

თუ გამოსახულება არ გვჭირდება და ყველა ობიექტს ერთი და იგივე ტექსტი/რიცხვი უნდა მივანიჭოთ, ველს ვამატებთ და მნიშვნელობას პირდაპირ ვწერთ.

### 📜 კოდი

```python
layers = QgsProject.instance().mapLayersByName('Rivers')
layer = layers[0]

pv = layer.dataProvider()
pv.addAttributes([
    QgsField('Type', QVariant.String),
    QgsField('Type_Eng', QVariant.String)
])
layer.updateFields()

# QVariant.String-ის ნაცვლად თუ QVariant.Int-ს გამოვიყენებთ,
# მნიშვნელობა რიცხვი უნდა იყოს და ბრჭყალები აღარ გვჭირდება

with edit(layer):
    for i in layer.getFeatures():
        i['Type'] = 'mdinare'
        i['Type_Eng'] = 'River'
        layer.updateFeature(i)
```

### 💡 განმარტება

- **`with edit(layer)`** ხსნის რედაქტირების რეჟიმს და ბლოკის ბოლოს ინახავს ცვლილებებს.
- **`QgsExpressionContext`** აქ საჭირო არ არის, რადგან გამოსახულებას არ ვაფასებთ. ის აუცილებელია მხოლოდ მაშინ, როცა `QgsExpression.evaluate()` გამოიყენება (იხ. პუნქტები 1–3).

---

## ⚙️ შენიშვნები

- **წინაპირობები:** დარწმუნდით, რომ შრეები (`Rivers`, `nakveti`, `Municipalitys`) არსებობს QGIS პროექტში და შეიცავს საჭირო ველებს (მაგ., `Mosaxl_200` მოსახლეობისთვის).  
- **შესრულება:** სკრიპტები უნდა გაეშვას QGIS-ის Python კონსოლში ან QGIS პლაგინის ფარგლებში.  
- **შეცდომების მართვა:** რეკომენდებულია შრის არსებობისა და ველების ხელმისაწვდომობის შემოწმება.  
- **ეფექტურობა:** დიდი მონაცემთა ნაკრებისთვის განიხილეთ ოპტიმიზაცია (მაგ., ერთჯერადი რედაქტირების სესიები).

---

📘 *Autogenerated educational resource for QGIS scripting with PyQGIS.*
