# 🌍 OOP მაგალითები გეოგრაფიულ ობიექტებზე და მათი გამოყენება PyQGIS-ში

## შესავალი
Object-Oriented Programming (OOP) — ობიექტზე ორიენტირებული პროგრამირება — არის პროგრამირების პარადიგმა, რომელიც გვეხმარება კოდის ორგანიზებასა და რეალურ სამყაროსთან მიახლოებულ მოდელირებაში.  
GIS-ში (Geographic Information Systems) ეს განსაკუთრებით მნიშვნელოვანია, რადგან გეოგრაფიული ობიექტები ბუნებრივად შეიძლება აღვწეროთ როგორც **კლასები** და **ობიექტები**.

---

## 🎯 OOP-ის ძირითადი პრინციპები

- **კლასი (Class)** — შაბლონი, რომელიც აღწერს ობიექტს (მაგ., „Point“, „Polygon“).  
- **ობიექტი (Object)** — კონკრეტული ინსტანცია კლასის (მაგ., `Tbilisi = Point(41.7, 44.8)`).  
- **ატრიბუტები (Attributes)** — ობიექტის მახასიათებლები (მაგ., კოორდინატები, ფერი, სახელი).  
- **მეთოდები (Methods)** — მოქმედებები, რომლებსაც ობიექტი ასრულებს (მაგ., „გამოთვალე სიგრძე“, „დახატე რუკაზე“).  
- **მემკვიდრეობა (Inheritance)** — კლასების გადამემკვიდრებელი სტრუქტურა (მაგ., `Geometry` → `Point`, `Line`, `Polygon`).  
- **პოლიმორფიზმი (Polymorphism)** — ერთი და იგივე მეთოდის სხვადასხვა რეალიზაცია სხვადასხვა კლასისთვის.

---

## 📌 მაგალითი: წერტილი როგორც ობიექტი

```python
class Point:
    def __init__(self, x, y, name=""):
        self.x = x
        self.y = y
        self.name = name

    def __repr__(self):
        return f"Point({self.name}: {self.x}, {self.y})"
    
    def distance_to(self, other):
        return ((self.x - other.x)**2 + (self.y - other.y)**2)**0.5

# ობიექტები
tbilisi = Point(44.8, 41.7, "Tbilisi")
batumi = Point(41.6, 41.65, "Batumi")

print(tbilisi)
print("Distance:", tbilisi.distance_to(batumi))
```

📍 შედეგი: ობიექტების აღწერა და მათ შორის მანძილის გამოთვლა.

---

## 📌 მაგალითი: ხაზი და სიგრძე

```python
class Line:
    def __init__(self, points):
        self.points = points
    
    def length(self):
        length = 0
        for i in range(len(self.points)-1):
            length += self.points[i].distance_to(self.points[i+1])
        return length

# ობიექტები
p1 = Point(0, 0)
p2 = Point(3, 4)
p3 = Point(6, 8)

line = Line([p1, p2, p3])
print("Line length:", line.length())
```

📏 შედეგი: ხაზის სიგრძე = წერტილებს შორის დისტანციების ჯამი.

---

## 📌 მაგალითი: პოლიგონი და ფართობი

```python
class Polygon:
    def __init__(self, points):
        self.points = points
    
    def area(self):
        # Shoelace formula
        n = len(self.points)
        area = 0
        for i in range(n):
            j = (i + 1) % n
            area += self.points[i].x * self.points[j].y
            area -= self.points[j].x * self.points[i].y
        return abs(area) / 2

# სამკუთხედი
triangle = Polygon([Point(0,0), Point(4,0), Point(4,3)])
print("Area:", triangle.area())
```

📐 შედეგი: პოლიგონის ფართობის გამოთვლა.

---

## 🌐 PyQGIS-ში გამოყენება

PyQGIS არის Python API QGIS-ისთვის. აქ კლასები უკვე არსებობს:  
- `QgsPointXY` — წერტილი  
- `QgsGeometry` — გეომეტრია  
- `QgsFeature` — ობიექტი ატრიბუტებით  
- `QgsVectorLayer` — ფენა

### 📌 PyQGIS მაგალითი: წერტილის შექმნა და რუკაზე დამატება

```python
from qgis.core import QgsProject, QgsPointXY, QgsGeometry, QgsFeature, QgsVectorLayer

# ფენის შექმნა
layer = QgsVectorLayer("Point?crs=EPSG:4326", "Cities", "memory")
prov = layer.dataProvider()

# ატრიბუტების დამატება
layer.startEditing()
prov.addAttributes([QgsField("Name", QVariant.String)])
layer.updateFields()

# ობიექტის შექმნა
feat = QgsFeature()
feat.setGeometry(QgsGeometry.fromPointXY(QgsPointXY(44.8, 41.7)))
feat.setAttributes(["Tbilisi"])
prov.addFeatures([feat])
layer.commitChanges()

# ფენის დამატება პროექტში
QgsProject.instance().addMapLayer(layer)
```

📍 შედეგი: რუკაზე დაემატება წერტილი (თბილისი).

---

## 📌 PyQGIS მაგალითი: ხაზის სიგრძის გამოთვლა

```python
from qgis.core import QgsGeometry, QgsPointXY

line = QgsGeometry.fromPolylineXY([
    QgsPointXY(0,0), QgsPointXY(3,4), QgsPointXY(6,8)
])

print("Line length:", line.length())
```

📏 შედეგი: გამოთვლის სიგრძეს CRS-ის ერთეულებში.

---

## 📌 PyQGIS მაგალითი: პოლიგონის ფართობის გამოთვლა

```python
from qgis.core import QgsGeometry, QgsPointXY

polygon = QgsGeometry.fromPolygonXY([[
    QgsPointXY(0,0),
    QgsPointXY(4,0),
    QgsPointXY(4,3),
    QgsPointXY(0,0)
]])

print("Polygon area:", polygon.area())
```

📐 შედეგი: პოლიგონის ფართობის გამოთვლა.

---

## 🚀 საუკეთესო პრაქტიკები GIS-ში OOP-ის გამოყენებისას

1. **კლასებით აღწერეთ გეოგრაფიული ობიექტები** — ასე კოდი ხდება გასაგები და ხელახალი გამოყენებადი.  
2. **გამოიყენეთ მემკვიდრეობა** — შექმენით მშობელი `Geometry` კლასი და შვილები (`Point`, `Line`, `Polygon`).  
3. **შეაერთეთ Python კლასები PyQGIS API-თან** — მაგალითის მსგავსად, თქვენს კლასებს შეუძლია ჰქონდეთ მეთოდი, რომელიც აბრუნებს `QgsGeometry` ობიექტს.  
4. **გამოიყენეთ ატრიბუტები კლასებში** — GIS ობიექტებს ხშირად აქვთ სახელი, კატეგორია, ფერი.  
5. **დოკუმენტაცია** — სტუდენტებისთვის ძალიან მნიშვნელოვანია ახსნილი იყოს რას აკეთებს თითოეული კლასი და მეთოდი.

---

## დასკვნა

OOP არის ძლიერი მიდგომა GIS პროექტებში.  
- გეოგრაფიული ობიექტები მარტივად აღწერილი შეიძლება იყოს კლასების საშუალებით.  
- PyQGIS უკვე გვთავაზობს მრავალი კლასის რეალიზაციას.  
- სწორი გამოყენებით, შეგიძლიათ შექმნათ სტრუქტურირებული, გასაგები და ხელახალი გამოყენებადი კოდი.

➡️ **შემდეგი ნაბიჯი სტუდენტებისთვის:** სცადეთ შექმნათ საკუთარი `Geometry` კლასი, რომელიც მუშაობს PyQGIS-თან ერთად და აქვს მეთოდები ფართობის, სიგრძის და მანძილის გამოთვლისთვის.
