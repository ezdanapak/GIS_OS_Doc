## შრის შექმნა(ESRI Shapefile)
<br>
ოფიციალური დოკუმენტაცია <br>
Class: [QgsWkbTypes](https://qgis.org/pyqgis/3.44/core/QgsWkbTypes.html) <br>
GDAL [OGR](https://www.osgeo.org/projects/gdal/) <br>
საკოორდინატო სისტემის შესარჩევად: Coordinate Systems [Worldwide](https://epsg.io/)

რა არის QgsField,QgsFields() , QVariant, QgsFeature() , iface და ა.შ დეტალებს <br>
< < < განმარტებების განყოფილებაში ნახავ

### წერტილოვანი შრე

**ზოგიერთი განმარტება**

- გეომეტრია დაკონკრეტებულია აქვე რადგან საჭიროა writer - ში მისი გათვალისწინება, QgsWkbTypes.Point ის ნაცვლად შესაძლებელია Line, Polygon, Unknown, Null - ის გამოყენება.

## ✅ ძირითადი გეომეტრიული ტიპები PyQGIS-ში:

| ტიპი           | შრის ტიპი (string სახით) | მაგალითი კოდში |
|----------------|--------------------------|----------------|
| წერტილი        | `"Point"`                | `QgsGeometry.fromPointXY(QgsPointXY(x, y))` |
| მრავალწერტილი   | `"MultiPoint"`           | `QgsGeometry.fromMultiPointXY([QgsPointXY(x1, y1), QgsPointXY(x2, y2)])` |
| ხაზი           | `"LineString"`           | `QgsGeometry.fromPolylineXY([QgsPointXY(x1, y1), QgsPointXY(x2, y2)])` |
| მრავალხაზი     | `"MultiLineString"`      | `QgsGeometry.fromMultiPolylineXY([[QgsPointXY(x1, y1), QgsPointXY(x2, y2)], [QgsPointXY(x3, y3), QgsPointXY(x4, y4)]])` |
| პოლიგონი       | `"Polygon"`              | `QgsGeometry.fromPolygonXY([[QgsPointXY(x1, y1), QgsPointXY(x2, y2), QgsPointXY(x3, y3), QgsPointXY(x1, y1)]])` |
| მრავალპოლიგონი | `"MultiPolygon"`         | `QgsGeometry.fromMultiPolygonXY([[[QgsPointXY(x1, y1), QgsPointXY(x2, y2), QgsPointXY(x3, y3), QgsPointXY(x1, y1)]]])` |

- shapefile_home ცვლადია და თემატური სახელწოდებით გადის სკრიპტში
- ატრიბუტული ცხრილის სვეტებს შექმნის QgsFields()
- File Handling - "r" - Read - Default value. Opens a file for reading, error if the file does not exist 
- writer კრებს ინფორმაციას, უნიკოდირებას, სვეტებს, გეომეტრიას, საკოორდინატო სისტემას და აერიანებს მას კონტეინერად.
- ახალი შრე შეიქმნება და შეინახება 'ESRI Shapefile' დრაივერის დახმარებით.
- არგუმენტებში აუცილებელია გადავცეთ უნიკოდირება, პროექცია, დრაივერი და ა.შ
- ფუნქცია დააბრუნებს ობიექტს რომელიც განსაზღვრულია როგორც writer კოდში, რომელსაც შეუძლია დაამატოს და ჩაწეროს ახალი ობიექტები შრეში.



გატესტე კოდი პირდაპირ QGIS - ის Python - ის კონსოლში, რომლის გამოძახება შეგიძლია სწრაფი ღილაკებით

<br>
++left-control+left-alt+"P"++
<br>


```py title="new_shapefile_point.py" linenums="1"

shapefile_home = r'C:\Users\Public\Documents\GIS\shapefile\saxli.shp'

layerfield = QgsFields() 

layerfield.append(QgsField('ID', QVariant.Int)) #სვეტი 1

layerfield.append(QgsField('Field_1', QVariant.String)) #სვეტი 2

layerfield.append(QgsField('Field_2', QVariant.Double, len=10, prec=2)) #სვეტი 3

writer = QgsVectorFileWriter(shapefile_home, 'UTF-8', layerfield, QgsWkbTypes.Point, \

               QgsCoordinateReferenceSystem('EPSG:32638'), 'ESRI Shapefile')


del(writer)

```

კოდის დაკომენტარებაში ან პირიქით დაგეხმარება ეს სწრაფი ღილაკები
<br>
++left-control+left-shift+":"++
<br>

<p>შესაძლებელია აქვე ჩავწეროთ მონაცემი შრეში</p>
```py title="new_shapefile_point_with_data.py" linenums="1"

#writer - ის ზედა ნაწილში უნდა ჩაჯდეს კოდის ეს ნაწილი 

fc = QgsFeature() #ქმნის სივრცულ ობიექტს

#ქმნის გეომეტრიას წინასწარ განსაზღვრული კოორდინატით
fc.setGeometry(QgsGeometry.fromPointXY(QgsPointXY(357965.61, 4683353.56))) 

#ჩასვავს ატრიბუტულ ცხრილში ინფორმაციას, გამომდინარე იქედან 
#რა გვქონდა შრის შექმნის მომენტში სვეტები
fc.setAttributes([1, 'text', 25])  #(ID, 'ტექსტი ამ უჯრისთვის', რიცხვი)

writer.addFeature(fc) #დაემატოს შრეს ობიექტი
```

## შრის დამატება QGIS პროექტის გარემოში

```py title="shapefile_point.py" linenums="1"
#shapefile_home ფაილის სახელწოდება - '' შრის სახელწოდება - ogr vector file

#iface.addVectorLayer წყვეტს რომელი შრე დაემატოს QGIS - ის Layer გარემოში.
layer = iface.addVectorLayer(shapefile_home, '', 'ogr')
```

ახალი წერტილოვანი ვექტორული შრის შექმნა, წყვილი წერტილებით და დამატება QGIS პროექტის გარემოში.

```py title="create_shapefile_with_tuples.py" linenums="1"
fn = r'C:\Users\Public\Documents\GIS\shapefile\new_shapefile_point_tuples.shp'



layerfield = QgsFields()

layerfield.append(QgsField('ID', QVariant.Int))

layerfield.append(QgsField('Category', QVariant.String))



writer = QgsVectorFileWriter(fn, 'UTF-8', layerfield, QgsWkbTypes.Point, \

              QgsCoordinateReferenceSystem('EPSG:32638'), 'ESRI Shapefile')



XY = [(356671.0049, 4679923.0988),

(356672.2015, 4679929.5719),

(356672.9728, 4679933.1198),

(356674.5925, 4679935.2022),

(356676.0579, 4679936.8219),

(356676.9835, 4679938.1332),

(356645.632, 4679901.1075),

(356654.4244, 4679905.3495),

(356659.9775, 4679909.2829),

(356664.2194, 4679912.7536),

(356668.055, 4679916.8107)]  


for i in XY:

    fc = QgsFeature()

    fc.setGeometry(QgsGeometry.fromPointXY(QgsPointXY(i[0], i[1])))

    fc.setAttributes([XY.index(i), 'lake'])

    writer.addFeature(fc)



del(writer)



layer = iface.addVectorLayer(fn, '', 'ogr')

```


## ცხრილში ახალი სვეტის შექმნა და მონაცემის შეტანა

!!! note "with edit"
    with edit არის ოპერატორი
    იმისათვის რომ გაეშვას გამოხატვით გადაცემული ჩვენი კოდი საჭიროა შესაბამისი QgsExpressionContext-ის მიწოდება


## Calculate Field

```python
layers = QgsProject.instance().mapLayersByName('Rivers')
layer = layers[0]

pv = layer.dataProvider()
pv.addAttributes([QgsField('Type', QVariant.String)])
# QVariant.String-ის ნაცვლად თუ QVariant.Int-ს გამოვიყენებთ

layer.updateFields()

cntx = QgsExpressionContext()
cntx.appendScopes(QgsExpressionContextUtils.globalProjectLayerScopes(layer))

with edit(layer):
    for i in layer.getFeatures():
        cntx.setFeature(i)
        i['Type'] = 'mdinare'
        # აქ უკვე ეს ფრჩხილები აღარ გვჭირდება, რიცხვები წავა სვეტში ტექსტის ნაცვლად
        layer.updateFeature(i)
```

---

# ცხრილში ახალი სვეტების შექმნა და მონაცემების შეტანა

## Calculate Fields

```python
layers = QgsProject.instance().mapLayersByName('Rivers')
layer = layers[0]

pv = layer.dataProvider()
pv.addAttributes([
    QgsField('Type', QVariant.String),
    QgsField('Type_Eng', QVariant.String)
])

layer.updateFields()

cntx = QgsExpressionContext()
cntx.appendScopes(QgsExpressionContextUtils.globalProjectLayerScopes(layer))

with edit(layer):
    for i in layer.getFeatures():
        cntx.setFeature(i)
        i['Type'] = 'mdinare'
        i['Type_Eng'] = 'River'
        layer.updateFeature(i)
```

## ℹ️ განმარტებები – PyQGIS კომპონენტები

ამ განყოფილებაში იხილავ ხშირად გამოყენებული ობიექტებისა და კლასების მოკლე ახსნებს, რომლებიც საჭიროა PyQGIS სკრიპტების წერისას.

> ❗ *ეს კომპონენტები ხშირად გვხვდება შრის შექმნის, ატრიბუტების ან გეომეტრიასთან მუშაობის დროს.*

---

### 🔹 `QgsField`

გამოიყენება შრის ველის (ატრიბუტის სვეტის) განსაზღვრისთვის. მოიცავს ველის სახელსა და ტიპს.

**მაგალითი**:

```python
QgsField("name", QVariant.String)
# ქმნის "name" სახელის მქონე ტექსტურ ველს
```

---

### 🔹 `QgsFields`

წარმოადგენს ველების კოლექციას (ანუ რამდენიმე `QgsField` ერთად). საჭიროა, როცა უნდა გადმოაწოდო ყველა ველი ერთად, მაგალითად შრის შექმნისას.

**მაგალითი**:

```python
fields = QgsFields()
fields.append(QgsField("name", QVariant.String))
```

---

### 🔹 `QVariant`

Qt-ის მონაცემთა ტიპების კლასი, რომელსაც QGIS იყენებს ატრიბუტის მნიშვნელობების ტიპების განსასაზღვრად. (მაგ. `String`, `Int`, `Double` და სხვ.)

**მაგალითები**:

* `QVariant.String` – ტექსტური ველი
* `QVariant.Int` – მთელი რიცხვი
* `QVariant.Double` – ათწილადი რიცხვი

---

### 🔹 `QgsFeature`

წარმოადგენს ერთ ობიექტს (წერტილს, ხაზს ან პოლიგონს) თავისი გეომეტრიითა და ატრიბუტებით.

**მაგალითი**:

```python
feature = QgsFeature()
feature.setGeometry(QgsGeometry.fromPointXY(QgsPointXY(44.8, 41.7)))
feature.setAttributes(["Tbilisi"])
```

---

### 🔹 `iface`

`iface` (Interface) არის QGIS-ის მთავარი ობიექტი, რომელიც გამოიყენება QGIS-ის ინტერფეისთან (Layers Panel, Map Canvas და სხვ.) ურთიერთობისთვის.

**მაგალითი**:

```python
iface.addVectorLayer("/path/to/file.shp", "My Layer", "ogr")
# ამატებს ფენას პირდაპირ QGIS-ის პროექტში
```

⚠️ `iface` ხელმისაწვდომია მხოლოდ QGIS-ის **Python Console**-ში. სტანდარტულ Python სკრიპტში ის არ მუშაობს.

---

### 🔹 დამატებითი სასარგებლო კლასები

| კლასი                          | აღწერა                                                         |
| ------------------------------ | -------------------------------------------------------------- |
| `QgsGeometry`                  | გეომეტრიის ობიექტი (წერტილი, ხაზი, პოლიგონი და სხვ.)           |
| `QgsPointXY`                   | 2D წერტილის ობიექტი – x და y კოორდინატებით                     |
| `QgsVectorLayer`               | ვექტორული შრის ობიექტი                                         |
| `QgsProject`                   | QGIS პროექტი – იძლევა შრეების დამატებისა და მართვის საშუალებას |
| `QgsCoordinateReferenceSystem` | საკოორდინატო სისტემის განსაზღვრა EPSG კოდის მიხედვით           |
