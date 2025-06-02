## კოდში დირექტორიების საკითხი


<p>ორმაგი უკუქცეული ხაზი (\\) გამოიყენება ბილიკში(Path) ერთის (\) ნაცვლად. 
Python-ში ერთი გამოყენებულია როგორც escape სიმბოლო და შეიძლება გამოიწვიოს არასასურველი შედეგები. 
ორმაგი უკუქცეული ხაზის ნაცვლად, შეგიძლიათ გამოიყენოთ სიმბოლო r (raw) სტრიქონის წინ, მაგალითად: r"C:\QGIS\PyQGIS\database.gpkg", ან გამოიყენოთ ერთი მიმართული ხაზი (forward slash), მაგალითად: "C:/QGIS/PyQGIS/database.gpkg". 
ეს სამი ფორმატი სწორი და ურთიერთშენაცვლებადია გამოყენებისას.
თუ იყენებ (/) or double backslash (\\) - ს r დაწერა სავალდებულო აღარაა. </p>

* r"C:\QGIS\PyQGIS\database.gpkg"

* "C:/QGIS/PyQGIS/database.gpkg" 

* "C:\ \QGIS\ \PyQGIS\ \database.gpkg" 

Python-ში Escape Character არის უკუქცეული ხაზი ( \ ). ეს სიმბოლო მიუთითებს, რომ შემდეგი სიმბოლო ან კომბინაცია უნდა იყოს ინტერპრეტირებული განსაკუთრებულად, გარკვეული სიმბოლოების ჩასასმელად ან გასაკონტროლებლად, რომლებიც სხვაგვარად ვერ ჩაეწერებოდა პირდაპირ.


## Escape Character 
სპეციალური სიმბოლოების ჩასმა:

მაგალითად, თუ საჭიროა სტრიქონში ბრჭყალების გამოყენება:

```py title="Special characters" linenums="1"

City = "My city is \"Chiatura!\""
print(City)
# დაბეჭდავს: My city is "Chiatura!"

```

სიმბოლო \n გამოიყენება ახალი ხაზის დასაწყებად.

```py title="New line" linenums="1"
City = "My city is \nChiatura"
print(City)
# დაბეჭდავს:
# My city is
# Chiatura
```

სიმბოლო \t ამატებს გამოტოვებას.

```py title="tab" linenums="1"

City = "My city is \tChiatura"
print(City)
# გამოსავალი: My city is  Chiatura
```

თუ საჭიროა თვითონ ხაზის გამოჩენა, მას ორჯერ ვწერთ: \ \ .
```py title="backslash" linenums="1"
path = "C:\\QGIS\\PyQGIS\\database.gpkg"
print(path)
# გამოსავალი: C:\QGIS\PyQGIS\database.gpkg
```

Escape Character Python-ში ძალზედ მნიშვნელოვანია სპეციალური სიმბოლოების მართვისთვის და ტექსტთან მუშაობისას სიზუსტის უზრუნველსაყოფად.
