## შრის შექმნა(ESRI Shapefile)
<br>


### წერტილოვანი შრე

```py title="shapefile_point.py" linenums="1"
shapefile_home = r'C:\Users\Public\Documents\GIS\shapefile\saxli.shp'

layerfield = QgsFields() #თუ გვინდა რომ ატრიბუტულ ცხრილში სვეტები დავამატოთ

layerfield.append(QgsField('ID', QVariant.Int)) #სვეტი 1

layerfield.append(QgsField('Field_1', QVariant.String)) #სვეტი 2

layerfield.append(QgsField('Field_2', QVariant.Double)) #სვეტი 3

#writer კრებს ინფორმაციას, უნიკოდირებას, სვეტებს, გეომეტრიას,
#საკოორდინატო სისტემას და აერიანებს მას კონტეინერად.

writer = QgsVectorFileWriter(shapefile_home, 'UTF-8', layerfield, QgsWkbTypes.Point, \

               QgsCoordinateReferenceSystem('EPSG:32638'), 'ESRI Shapefile')


del(writer)

```

<p>შესაძლებელია აქვე ჩავწეროთ მონაცემი შრეში</p>
```py title="shapefile_point.py" linenums="1"

#writer - ის ზედა ნაწილში უნდა ჩაჯდეს კოდის ეს ნაწილი 

fc = QgsFeature() #ქმნის სივრცულ ობიექტს

#ქმნის გეომეტრიას წინასწარ განსაზღვრული კოორდინატით
fc.setGeometry(QgsGeometry.fromPointXY(QgsPointXY(357965.61, 4683353.56))) 

#ჩასვავს ატრიბუტულ ცხრილში ინფორმაციას, გამომდინარე იქედან 
#რა გვქონდა შრის შექმნის მომენტში სვეტები
fc.setAttributes([1, 'text', 25])  #(ID, 'ტექსტი ამ უჯრისთვის', რიცხვი)

writer.addFeature(fc) #დაემატოს შრეს ობიექტი
```

```py title="shapefile_point.py" linenums="1"
#shapefile_home ფაილის სახელწოდება - '' შრის სახელწოდება - ogr vector file

layer = iface.addVectorLayer(shapefile_home, '', 'ogr')
```
[OGR ბიბლიოთეკა](https://osdoc.qgis.ge/PyQGIS/explanations/ogr_library/)


### QgsFields კლასი
QgsFields არის QGIS API-ში გამოყენებული კლასი, რომელიც წარმოადგენს ატრიბუტების (ველების) კოლექციას.
ველები (Fields) არის მონაცემთა სტრუქტურები, რომლებიც განსაზღვრავენ ფენას (Layer) ან ფაილში შენახულ მონაცემებს. თითოეული ველი აქვს სახელი, ტიპი (მაგ., ტექსტი, რიცხვი) და სხვა თვისებები.
layerfield = QgsFields()
ამ კოდის შედეგად:

იქმნება ცარიელი QgsFields ობიექტი.
ეს ობიექტი გამოიყენება ახალი ატრიბუტული ველების დამატებისთვის ან არსებული ველების შესანახად ფენისთვის.