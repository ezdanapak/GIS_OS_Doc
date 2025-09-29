

- ზოგიერთი განმარტება
- processing.run ნიშნავს QGIS - ის Processing Toolbox - ს. [მეთოდი/ფუნქცია]
- სიტყვა native ნიშნავს QGIS ის ხელსაწყოს და pointstopath მის დასახელებას.
- მასში კოდი მთლიანად არის Dictionary პრინციპი {}  არგუმენტი key:value ობიექტის მნიშვნელობები.
- *ყურადღება მიაქციე ხელსაწყოში 'ORDER_EXPRESSION': '"ID"' , იმიტომ რომ ყველა შრეში ცხრილში ეს აიდის სვეტი არ არის და უნდა ჩაენაცვლოს შესაბამისით.წინააღმდეგ შემთხვევაში პროგრამა მთლიანად გამოდის მწყობრიდან.

## 🟢 წერტილოვანი შრის ხაზში გადაყვანა (Point to Line Conversion)



```py title="new_layer_points_to_path.py" linenums="1"
fn = r'C:\Users\Public\Documents\GIS\shapefile\points.shp'
output = r'C:\Users\Public\Documents\GIS\shapefile\points_to_line.shp'

processing.run("native:pointstopath", {
    'INPUT': fn,
    'CLOSE_PATH': True,
    'ORDER_EXPRESSION': '"ID"',
    'NATURAL_SORT': False,
    'GROUP_EXPRESSION': '',
    'OUTPUT': output
})

layer = iface.addVectorLayer(output, '', 'ogr')
```

📌 აქედან ვიღებთ ხაზს წერტილების თანმიმდევრობით.

---


## 🟢 ხაზოვანი შრის პოლიგონში გადაყვანა (Lines to Polygon)

```python
fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\lake_line.shp'
output = r'C:\Users\Public\Documents\GK\PyQGIS\shp\lake_poly.shp'

processing.run("qgis:linestopolygons", {'INPUT':fn, 'OUTPUT':output})
layer = iface.addVectorLayer(output, '', 'ogr')
```

📌 ხაზები ერთდება და პოლიგონი ყალიბდება.

---

## ❗️ შენიშვნები სტუდენტებისთვის

- **QVariant.Int** → აუცილებლად დიდი I  
- **TEMPORARY_OUTPUT** → დროებითი შედეგი, თუ გვინდა ფაილად შევინახოთ → ჩავანაცვლოთ `output`
- **დირექტორია (paths)** → გამოიყენე `r"path"` ან ორმაგი `\`

---

## 🔎 შეცდომები და მათი ახსნა

- **EOL while scanning string** → ფაილის დირექტორიის მისამართს აკლია ბრჭყალი `"`.  
- **AttributeError: type object 'QVariant' has no attribute 'int'** → პატარა `i` შეცდომაა, სწორია `Int`.

---

# 📚 შეჯამება

ამ თემაში გავიარეთ:  
- ახალი შრეების შექმნა PyQGIS-ით  
- წერტილი → ხაზი → პოლიგონი კონვერტაციები  
- დროებითი და მუდმივი შედეგების შენახვა  
- შეცდომების აღმოჩენა და გასწორება  