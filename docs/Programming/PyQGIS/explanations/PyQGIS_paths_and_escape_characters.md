# 📂 Python-ში დირექტორიების სწორად ჩაწერა

Python-ში ფაილებისა და დირექტორიების მისამართების ჩაწერისას მნიშვნელოვანია სწორად განვასხვავოთ **უკუქცეული ხაზი (\\)** და **მიმართული ხაზი (/)**.  

---

## ✅ ვალიდური დირექტორიების ჩანაწერები

Python-ში ერთზე მეტი გზაა ბილიკების (path) სწორად ჩასაწერად:

- ორმაგი უკუქცეული ხაზი (**\\**)  
- მიმართული ხაზი (**/**)  
- **raw string** სინტაქსი (r"...")  

> თუ იყენებ `/` ან `\\` — **r დაწერა სავალდებულო აღარაა**.

### მაგალითები:
```py
r"C:\Lessons\Georgia.gpkg\ambulances"
"C:/Lessons/Georgia.gpkg/ambulances"
"C:\\Lessons\\Georgia.gpkg\\ambulances"
```

ყველა ეს ჩანაწერი სწორია და **ურთიერთშენაცვლებადია**.

---

## 🔹 კოდში დირექტორიების საკითხი

Python-ში ერთი უკუქცეული ხაზი **(\)** გამოიყენება როგორც **Escape Character**.  
ამის გამო, ბილიკებში რეკომენდებულია ორმაგი უკუქცეული ხაზი (\\), raw სტრიქონი (r"...") ან მიმართული ხაზი (/).

მაგალითები:

```py
r"C:\QGIS\PyQGIS\database.gpkg"
"C:/QGIS/PyQGIS/database.gpkg"
"C:\\QGIS\\PyQGIS\\database.gpkg"
```

---

# 🔑 Escape Character Python-ში

Escape Character არის **უკუქცეული ხაზი ( \ )**, რომელიც გამოიყენება სპეციალური სიმბოლოების გამოსატანად.  

---

## 📍 სპეციალური სიმბოლოების ჩასმა

### ბრჭყალები სტრიქონში
```py title="Special characters" linenums="1"
City = "My city is \"Chiatura!\""
print(City)
# გამოსავალი: My city is "Chiatura!"
```

### ახალი ხაზი `\n`
```py title="New line" linenums="1"
City = "My city is \nChiatura"
print(City)
# გამოსავალი:
# My city is
# Chiatura
```

### ტაბულაცია `\t`
```py title="Tab character" linenums="1"
City = "My city is \tChiatura"
print(City)
# გამოსავალი: My city is   Chiatura
```

### უკუქცეული ხაზი `\\`
თუ გვჭირდება თავად ხაზის გამოჩენა, მას ორჯერ ვწერთ:

```py title="Backslash" linenums="1"
path = "C:\\QGIS\\PyQGIS\\database.gpkg"
print(path)
# გამოსავალი: C:\QGIS\PyQGIS\database.gpkg
```

---

## 🖼️ Path მაგალითების ვიზუალური დიაგრამა

Windows და Linux ბილიკების მაგალითები:

```
Windows:   C:\Users\Student\Documents\project\data.csv
Linux:     /home/student/project/data.csv
Raw string: r"C:\Users\Student\Documents\project\data.csv"
```


---

## 📌 შეჯამება
- **\** → Escape Character (სპეციალური სიმბოლოებისთვის).  
- **\\** → რეალური უკუქცეული ხაზი ბილიკში.  
- **/** → შეიძლება გამოიყენო Windows-ზეც.  
- **r"..."** → raw string, გამორიცხავს Escape Character-ის საჭიროებას.  

👉 ეს ყველაფერი Python-ში აუცილებელია სწორი ბილიკების ჩასაწერად და ტექსტთან მუშაობისას სიზუსტის შესანარჩუნებლად.
