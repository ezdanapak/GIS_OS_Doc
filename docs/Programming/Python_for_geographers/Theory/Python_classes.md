# 🐍 პითონის კლასები: გამოყენება გეოგრაფიულ ინფორმაციულ სისტემებში (GIS)

## 🔹 შესავალი  
პითონის კლასები არის ობიექტზე ორიენტირებული პროგრამირების (OOP) ძირითადი ელემენტი, რომელიც საშუალებას გვაძლევს შევქმნათ სტრუქტურირებული, ხელახლა გამოყენებადი და ორგანიზებული კოდი.  
GIS-ში, სადაც მონაცემები ხშირად მოიცავს რთულ სივრცით სტრუქტურებს (წერტილები, ხაზები, პოლიგონები), კლასები გვეხმარება ამ მონაცემების ეფექტურად მოდელირებაში.  

👉 ეს სახელმძღვანელო განკუთვნილია სტუდენტებისთვის, რომლებიც სწავლობენ პითონს და აინტერესებთ GIS.  

---

## 🔹 რა არის კლასი?  
კლასი არის **„შაბლონი“** ან **„ნახაზი“**, რომელიც განსაზღვრავს:  
- **ატრიბუტებს** (მონაცემები, напр. წერტილის კოორდინატები)  
- **მეთოდებს** (ფუნქციები, напр. მანძილის გამოთვლა)  

📖 GIS-ის მაგალითი:  
- კლასი შეიძლება წარმოადგენდეს წერტილს რუკაზე  
- მდინარის ხაზს  
- ქალაქის საზღვრის პოლიგონს  

---

## 🔹 რატომ გამოვიყენოთ კლასები GIS-ში?  

- ✅ **მონაცემთა ორგანიზება** – რთული მონაცემების სტრუქტურირება  
- ✅ **ხელახლა გამოყენება** – ერთხელ შექმნილი კლასი ბევრ პროექტში გამოგადგება  
- ✅ **სიცხადე** – კოდი უფრო გასაგები ხდება  
- ✅ **მოდელირება** – რეალური ობიექტების (გზები, შენობები) მოდელირება  

---

## 🔹 კლასის შექმნის საფუძვლები  

```python
class Point:
    def __init__(self, x, y):
        self.x = x  # x-კოორდინატი
        self.y = y  # y-კოორდინატი
    
    def describe(self):
        return f"წერტილი კოორდინატებით ({self.x}, {self.y})"
```

- `class Point:` → განსაზღვრავს კლასის სახელს  
- `__init__` → კონსტრუქტორი, რომელიც ობიექტის შექმნისას იწყებს მის თვისებებს  
- `self` → მიუთითებს კონკრეტულ ობიექტზე  
- `describe()` → აბრუნებს წერტილის აღწერას  

**გამოყენება:**  
```python
tbilisi = Point(44.8, 41.7)
print(tbilisi.describe())
# შედეგი: წერტილი კოორდინატებით (44.8, 41.7)
```

---

## 🔹 GIS-ის მაგალითი: მანძილის გამოთვლა  

```python
import math

class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def describe(self):
        return f"წერტილი კოორდინატებით ({self.x}, {self.y})"
    
    def distance_to(self, other_point):
        dx = self.x - other_point.x
        dy = self.y - other_point.y
        return math.sqrt(dx**2 + dy**2)
```

**გამოყენება:**  
```python
tbilisi = Point(44.8, 41.7)
batumi = Point(41.6, 41.6)

distance = tbilisi.distance_to(batumi)
print(f"მანძილი თბილისსა და ბათუმს შორის: {distance:.2f} ერთეული")
```

👉 გამოყენებულია **ევკლიდური მანძილი**. რეალურ GIS-ში შეგვიძლია ჰავერსინის ფორმულაც გამოვიყენოთ.  

---

## 🔹 GIS-ის მაგალითი: პოლიგონის ფართობი  

```python
class Polygon:
    def __init__(self, points):
        self.points = points  # წერტილების სია [(x1, y1), (x2, y2), ...]
    
    def describe(self):
        return f"პოლიგონი {len(self.points)} წვეროთი"
    
    def area(self):
        # Shoelace formula
        n = len(self.points)
        area = 0.0
        for i in range(n):
            j = (i + 1) % n
            area += self.points[i][0] * self.points[j][1]
            area -= self.points[j][0] * self.points[i][1]
        return abs(area) / 2.0
```

**გამოყენება:**  
```python
triangle = Polygon([(0, 0), (4, 0), (0, 3)])
print(triangle.describe())
print(f"ფართობი: {triangle.area()} კვ. ერთეული")
```

👉 გამოყენებულია **Shoelace formula**, რაც GIS-ში ფართოდ გამოიყენება.  

---

## 🔹 GIS-ის მაგალითი: მემკვიდრეობა  

```python
class Geometry:
    def __init__(self, name):
        self.name = name
    
    def describe(self):
        return f"გეომეტრიული ობიექტი: {self.name}"

class Point(Geometry):
    def __init__(self, x, y, name):
        super().__init__(name)
        self.x = x
        self.y = y
    
    def describe(self):
        return f"წერტილი {self.name} კოორდინატებით ({self.x}, {self.y})"

class Line(Geometry):
    def __init__(self, start_point, end_point, name):
        super().__init__(name)
        self.start = start_point
        self.end = end_point
    
    def length(self):
        return math.sqrt((self.end.x - self.start.x)**2 + (self.end.y - self.start.y)**2)
```

**გამოყენება:**  
```python
tbilisi = Point(44.8, 41.7, "თბილისი")
batumi = Point(41.6, 41.6, "ბათუმი")
road = Line(tbilisi, batumi, "თბილისი-ბათუმი")

print(tbilisi.describe())
print(f"ხაზის {road.name} სიგრძე: {road.length():.2f} ერთეული")
```

👉 `Point` და `Line` მემკვიდრეობით იღებენ Geometry-ს, მაგრამ ამატებენ საკუთარ ფუნქციონალს.  

---

## 🔹 საუკეთესო პრაქტიკა 

- დაიწყეთ **მარტივი კლასებით** (მაგ., Point)  
- გამოიყენეთ **აღწერითი სახელები**  
- **მემკვიდრეობა** გამოიყენეთ გონივრულად  
- დაამატეთ კომენტარები კოდში  
- GIS-ში ხშირად გამოიყენეთ ბიბლიოთეკები: **geopandas, shapely**  

---

## 🔹 დასკვნა  

პითონის კლასები GIS-ში:  
- ინარჩუნებს კოდს ორგანიზებულად  
- აადვილებს სივრცითი ობიექტების მოდელირებას  
- ამარტივებს ანალიზს (მაგ., მანძილი, ფართობი)  

