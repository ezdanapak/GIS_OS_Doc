## შრის შექმნა(ESRI Shapefile)
<br>
ოფიციალური დოკუმენტაცია
Class: [QgsWkbTypes](https://qgis.org/pyqgis/3.44/core/QgsWkbTypes.html)
GDAL [OGR](https://www.osgeo.org/projects/gdal/)

### წერტილოვანი შრე

გეომეტრია დაკონკრეტებულია აქვე რადგან საჭიროა writer - ში მისი გათვალისწინება, QgsWkbTypes.Point ის ნაცვლად შესაძლებელია Line, Polygon, Unknown, Null - ის გამოყენება.

- shapefile_home ცვლადია და თემატური სახელწოდებით გადის სკრიპტში
- ატრიბუტული ცხრილის სვეტებს შექმნის QgsFields()
- writer კრებს ინფორმაციას, უნიკოდირებას, სვეტებს, გეომეტრიას, საკოორდინატო სისტემას და აერიანებს მას კონტეინერად.
- ახალი შრე შეიქმნება და შეინახება 'ESRI Shapefile' დრაივერის დახმარებით.
- არგუმენტებში აუცილებელია გადავცეთ უნიკოდირება, პროექცია, დრაივერი და ა.შ
- ფუნქცია დააბრუნებს ობიექტს რომელიც განსაზღვრულია როგორც writer კოდში, რომელსაც შეუძლია დაამატოს და ჩაწეროს ახალი ობიექტები შრეში.

```py title="shapefile_point.py" linenums="1"

shapefile_home = r'C:\Users\Public\Documents\GIS\shapefile\saxli.shp'

layerfield = QgsFields() 

layerfield.append(QgsField('ID', QVariant.Int)) #სვეტი 1

layerfield.append(QgsField('Field_1', QVariant.String)) #სვეტი 2

layerfield.append(QgsField('Field_2', QVariant.Double)) #სვეტი 3

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

## შრის დამატება QGIS პროექტის გარემოში

```py title="shapefile_point.py" linenums="1"
#shapefile_home ფაილის სახელწოდება - '' შრის სახელწოდება - ogr vector file

layer = iface.addVectorLayer(shapefile_home, '', 'ogr')
```

ახალი წერტილოვანი ვექტორული შრის შექმნა, წყვილი წერტილებით და დამატება QGIS პროექტის გარემოში.

```py title="create_shapefile_with_tuples.py" linenums="1"
fn = r'C:\Users\Public\Documents\GIS\shapefile\lake.shp'



layerfield = QgsFields()

layerfield.append(QgsField('ID', QVariant.Int))

layerfield.append(QgsField('Name', QVariant.String))



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


### QgsFields კლასი
QgsFields არის QGIS API-ში გამოყენებული კლასი, რომელიც წარმოადგენს ატრიბუტების (ველების) კოლექციას.
ველები (Fields) არის მონაცემთა სტრუქტურები, რომლებიც განსაზღვრავენ ფენას (Layer) ან ფაილში შენახულ მონაცემებს. თითოეული ველი აქვს სახელი, ტიპი (მაგ., ტექსტი, რიცხვი) და სხვა თვისებები.
layerfield = QgsFields()
ამ კოდის შედეგად:

იქმნება ცარიელი QgsFields ობიექტი.
ეს ობიექტი გამოიყენება ახალი ატრიბუტული ველების დამატებისთვის ან არსებული ველების შესანახად ფენისთვის.