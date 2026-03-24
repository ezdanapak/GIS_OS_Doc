## 📋 მეთოდების ცხრილი

| მეთოდი | გამოყენება | მოდული |
|--------|-----------|--------|
| `open(path, "r")` | ფაილის წაკითხვა | built-in |
| `open(path, "w")` | ფაილის ახლიდან ჩაწერა | built-in |
| `open(path, "a")` | ბოლოს დამატება | built-in |
| `csv.DictReader` | CSV სვეტებად წაკითხვა | `csv` |
| `csv.DictWriter` | CSV სვეტებად ჩაწერა | `csv` |
| `iface.activeLayer()` | აქტიური QGIS შრე | PyQGIS |
| `layer.getFeatures()` | ობიექტების იტერაცია | PyQGIS |
| `feature.geometry().asPoint()` | წერტილის კოორდინატები | PyQGIS |
| `QgsVectorLayer(uri, ...)` | CSV-დან შრის შექმნა | PyQGIS |

---