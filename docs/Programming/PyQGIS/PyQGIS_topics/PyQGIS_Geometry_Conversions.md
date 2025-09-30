## გეომეტრიის ცვლილება(Geometry conversions)
<br>
ოფიციალური დოკუმენტაცია <br>
წერტილოვანი შრის ხაზში გადაყვანა - Point to Line Conversion
Points to [path:](https://docs.qgis.org/3.40/en/docs/user_manual/processing_algs/qgis/vectorcreation.html#points-to-path) <br>
ხაზოვანი შრის პოლიგონში გადაყვანა - Lines to polygon
Lines to [polygons:](https://docs.qgis.org/3.40/en/docs/user_manual/processing_algs/qgis/vectorgeometry.html#lines-to-polygons) <br>
პოლიგონალური შრის ხაზში გადაყვანა - Polygon to Lines Conversion
Polygons to [lines:](https://docs.qgis.org/3.40/en/docs/user_manual/processing_algs/qgis/vectorgeometry.html#polygons-to-lines) <br>
ხაზოვანი შრიდან წერტილების მიღება - Points along geometry
Points along [geometry:](https://docs.qgis.org/3.40/en/docs/user_manual/processing_algs/qgis/vectorgeometry.html#points-along-geometry) <br>


- ზოგიერთი განმარტება
- processing.run ნიშნავს QGIS - ის Processing Toolbox - ს. [მეთოდი/ფუნქცია]
- სიტყვა native ნიშნავს QGIS ის ხელსაწყოს და pointstopath მის დასახელებას.
- მასში კოდი მთლიანად არის Dictionary პრინციპი {}  არგუმენტი key:value ობიექტის მნიშვნელობები.
- *ყურადღება მიაქციე ხელსაწყოში 'ORDER_EXPRESSION': '"ID"' , იმიტომ რომ ყველა შრეში ცხრილში ეს აიდის სვეტი არ არის და უნდა ჩაენაცვლოს შესაბამისით.წინააღმდეგ შემთხვევაში პროგრამა მთლიანად გამოდის მწყობრიდან.

## 🟢 წერტილოვანი შრის ხაზში გადაყვანა (Point to Line Conversion)


```py title="Points_to_line.py" linenums="1"
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

📌 შედეგად ვიღებთ ხაზს წერტილების თანმიმდევრობით.

---


## 🟢 ხაზოვანი შრის პოლიგონში გადაყვანა (Line to Polygon)

```py title="Line_to_polygon.py" linenums="1"
fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\line_layer.shp'
output = r'C:\Users\Public\Documents\GK\PyQGIS\shp\Polygon_layer_from_line.shp'

processing.run("qgis:linestopolygons", {'INPUT':fn, 'OUTPUT':output})
layer = iface.addVectorLayer(output, '', 'ogr')
```

📌 ხაზები ერთდება და გეომეტრიულად პოლიგონი ყალიბდება.

---

## 🟢 პოლიგონალური შრის ხაზში გადაყვანა (Polygon to Lines Conversion)

```py title="Polygon_to_Line_Conversion.py" linenums="1"
fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\Polygon_layer.shp'
output = r'C:\Users\Public\Documents\GK\PyQGIS\shp\Line_layer_from_polygon.shp'

processing.run("native:polygonstolines", {'INPUT':fn,'OUTPUT':output})
layer = iface.addVectorLayer(output, '', 'ogr')
```

📌 პოლიგონალური შრის ელემენტები გადადის ხაზობრივ სტილში, მათი კონტურიდან/ფორმიდან გამომდინარე.

---

## 🟢 ხაზოვანი შრიდან წერტილების მიღება (Points along geometry)

```py title="Points_along_geometry.py" linenums="1"
fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\Line_layer.shp'
output = r'C:\Users\Public\Documents\GK\PyQGIS\shp\Points_placed_on_line.shp'

processing.run("native:pointsalonglines", {'INPUT':fn,'DISTANCE':5,'START_OFFSET':0,'END_OFFSET':0,'OUTPUT':output})
layer = iface.addVectorLayer(output, '', 'ogr')
```

📌 ხაზოვანი შრის ნებისმიერ ელემენტზე განსაზღვრული დაშორებით წერტილების განთავსება.

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