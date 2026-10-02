# შრის შექმნა(ESRI Shapefile)
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

!!! warning "`del(writer)`-ის ადგილი"
    ობიექტის დამატების კოდი უნდა მოვათავსოთ `writer`-ის შექმნის **შემდეგ** და `del(writer)`-მდე. `del(writer)` ხურავს ფაილს და მონაცემებს დისკზე წერს, ამიტომ მის შემდეგ `writer.addFeature(fc)` უკვე აღარ იმუშავებს.

სრული თანმიმდევრობა ერთ სკრიპტში:

```py title="new_shapefile_point_full.py" linenums="1"
shapefile_home = r'C:\Users\Public\Documents\GIS\shapefile\saxli.shp'

layerfield = QgsFields()
layerfield.append(QgsField('ID', QVariant.Int))
layerfield.append(QgsField('Field_1', QVariant.String))
layerfield.append(QgsField('Field_2', QVariant.Double, len=10, prec=2))

# 1. writer იქმნება
writer = QgsVectorFileWriter(shapefile_home, 'UTF-8', layerfield, QgsWkbTypes.Point, \
               QgsCoordinateReferenceSystem('EPSG:32638'), 'ESRI Shapefile')

# 2. ობიექტი ემატება writer-ს
fc = QgsFeature()
fc.setGeometry(QgsGeometry.fromPointXY(QgsPointXY(357965.61, 4683353.56)))
fc.setAttributes([1, 'text', 25])
writer.addFeature(fc)

# 3. ბოლოს writer იხურება
del(writer)

# 4. შრე ემატება QGIS პროექტს
layer = iface.addVectorLayer(shapefile_home, '', 'ogr')
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


!!! info "`XY.index(i)` თუ `enumerate`?"
    ზემოთ ციკლში ID-ს `XY.index(i)` გვიბრუნებს. ის სიაში ეძებს ელემენტს და აბრუნებს მის ადგილს. ეს მუშაობს, მაგრამ თუ სიაში ორი ერთნაირი წერტილია, ორივეს ერთი და იგივე ID მიენიჭება, ამას გარდა ყოველ ჯერზე სიას თავიდან ეძებს.
    მარტივი ალტერნატივაა `enumerate`, რომელიც თვითონ გვაძლევს ნომერს და ელემენტს:

    ```py
    for n, (x, y) in enumerate(XY, start=1):
        fc = QgsFeature()
        fc.setGeometry(QgsGeometry.fromPointXY(QgsPointXY(x, y)))
        fc.setAttributes([n, 'lake'])   # n = 1, 2, 3 ...
        writer.addFeature(fc)
    ```

    `start=1` ნიშნავს, რომ დათვლა 1-დან დაიწყება (ნაგულისხმევად 0-დანაა).


## შრის შექმნა ფუნქციით (გაუმჯობესებული ვერსია)

ზემოთ მოცემული სკრიპტები ყოველ ჯერზე ხელით გვაიძულებს გეომეტრიის, ველების და გზის გადაწერას. ქვემოთ მოცემული ფუნქცია:

- მუშაობს **ნებისმიერ გეომეტრიაზე** (`Point`, `LineString`, `Polygon`, `Multi...`)
- მუშაობს **Shapefile-ზეც და GeoPackage-ზეც** (გაფართოების მიხედვით ირჩევს დრაივერს)
- ამოწმებს, არსებობს თუ არა ფაილი და საქაღალდე, ხოლო შეცდომისას გვიბრუნებს გასაგებ შეტყობინებას
- ველებს იღებს მარტივი სიიდან და **ყველა ობიექტს ერთად ამატებს**
- ბოლოს ამატებს შრეს პროექტში

```py title="create_layer_function.py" linenums="1"
import os
from qgis.core import (
    QgsVectorFileWriter, QgsFields, QgsField, QgsFeature, QgsGeometry,
    QgsPointXY, QgsCoordinateReferenceSystem, QgsProject, QgsVectorLayer, QgsWkbTypes
)
from qgis.PyQt.QtCore import QVariant

# ველის ტიპები სტრიქონით, რომ ყოველ ჯერზე QVariant არ დაგვჭირდეს
FIELD_TYPES = {
    'int': QVariant.Int,
    'str': QVariant.String,
    'float': QVariant.Double,
    'date': QVariant.Date,
}

# გაფართოება -> OGR დრაივერი
DRIVERS = {'.shp': 'ESRI Shapefile', '.gpkg': 'GPKG', '.geojson': 'GeoJSON'}


def create_layer(path, geom_type, epsg, fields, features=None,
                 overwrite=False, add_to_project=True):
    """
    path        - ფაილის სრული გზა (.shp / .gpkg / .geojson)
    geom_type   - QgsWkbTypes.Point, QgsWkbTypes.LineString, QgsWkbTypes.Polygon ...
    epsg        - მაგ. 32638
    fields      - [('ID', 'int'), ('Name', 'str'), ('Area', 'float')]
    features    - [(geometry, [ატრიბუტები]), ...]  (არასავალდებულო)
    overwrite   - თუ ფაილი უკვე არსებობს, გადაეწეროს თუ არა
    """
    folder, ext = os.path.dirname(path), os.path.splitext(path)[1].lower()

    if ext not in DRIVERS:
        raise ValueError(f'მხარდაუჭერელი ფორმატი: {ext}')
    if not os.path.isdir(folder):
        os.makedirs(folder)          # საქაღალდე თუ არ არსებობს, შეიქმნას
    if os.path.exists(path) and not overwrite:
        raise FileExistsError(f'ფაილი უკვე არსებობს: {path}')

    crs = QgsCoordinateReferenceSystem(f'EPSG:{epsg}')
    if not crs.isValid():
        raise ValueError(f'არასწორი EPSG კოდი: {epsg}')

    qfields = QgsFields()
    for name, ftype in fields:
        qfields.append(QgsField(name, FIELD_TYPES[ftype]))

    options = QgsVectorFileWriter.SaveVectorOptions()
    options.driverName = DRIVERS[ext]
    options.fileEncoding = 'UTF-8'
    options.actionOnExistingFile = QgsVectorFileWriter.CreateOrOverwriteFile

    writer = QgsVectorFileWriter.create(
        path, qfields, geom_type, crs,
        QgsProject.instance().transformContext(), options
    )
    if writer.hasError() != QgsVectorFileWriter.NoError:
        raise RuntimeError(writer.errorMessage())

    for geom, attrs in (features or []):
        fc = QgsFeature(qfields)
        fc.setGeometry(geom)
        fc.setAttributes(attrs)
        writer.addFeature(fc)

    del writer   # ფაილი იხურება და მონაცემები იწერება დისკზე

    layer = QgsVectorLayer(path, os.path.splitext(os.path.basename(path))[0], 'ogr')
    if add_to_project and layer.isValid():
        QgsProject.instance().addMapLayer(layer)
    return layer
```

### გამოყენების მაგალითები

**წერტილოვანი შრე მონაცემებით**

```py title="example_points.py" linenums="1"
pts = [(356671.0049, 4679923.0988), (356672.2015, 4679929.5719)]

features = [
    (QgsGeometry.fromPointXY(QgsPointXY(x, y)), [i, 'lake'])
    for i, (x, y) in enumerate(pts, start=1)
]

layer = create_layer(
    r'C:\Users\Public\Documents\GIS\shapefile\lakes.shp',
    QgsWkbTypes.Point, 32638,
    fields=[('ID', 'int'), ('Category', 'str')],
    features=features,
    overwrite=True
)
```

**ცარიელი პოლიგონური შრე GeoPackage-ში (მონაცემებს მერე ხელით დავხატავთ)**

```py title="example_polygon_gpkg.py" linenums="1"
layer = create_layer(
    r'C:\Users\Public\Documents\GIS\parcels.gpkg',
    QgsWkbTypes.Polygon, 32638,
    fields=[('ID', 'int'), ('Owner', 'str'), ('Area_m2', 'float')],
    overwrite=True
)
```

!!! tip "რატომ GeoPackage?"
    Shapefile-ს აქვს შეზღუდვები: ველის სახელი მაქსიმუმ 10 სიმბოლო, ტექსტი 254 სიმბოლომდე, ერთი შრე 3–7 ფაილისგან შედგება. `.gpkg` ამ პრობლემებს არ შეიცავს, ამიტომ ახალი პროექტებისთვის ის უკეთესი არჩევანია.

!!! note "QVariant-ის შესახებ"
    QGIS 3.38+ ვერსიებიდან `QVariant.Int` და მსგავსი ტიპები ჩანაცვლებულია `QMetaType.Type.Int` ტიპით. ძველი ვარიანტი ჯერ კიდევ მუშაობს, მაგრამ შესაძლოა გაფრთხილება გამოიტანოს.

## ველების დამატება არსებულ შრეში

არსებულ შრეში ახალი სვეტების დამატება და მათი გამოთვლა იხილეთ გვერდზე
[ატრიბუტული ცხრილის გამოთვლები](PyQGIS_Calc_Attrib_Expressions.md).

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
