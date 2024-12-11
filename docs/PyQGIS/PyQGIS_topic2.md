## ვექტორული შრის შექმნა(ESRI Shapefile)
<br>



<p>წერტილოვანი შრე</p>>

```py title="shapefile_point.py" linenums="1"
shapefile_home = r'C:\Users\Public\Documents\GIS\shapefile\saxli.shp'

layerfield = QgsFields()

layerfield.append(QgsField('ID', QVariant.Int))

layerfield.append(QgsField('saxeli', QVariant.String))

layerfield.append(QgsField('asaki', QVariant.Double))

writer = QgsVectorFileWriter(fn, 'UTF-8', layerfield, QgsWkbTypes.Point, \

               QgsCoordinateReferenceSystem('EPSG:32638'), 'ESRI Shapefile')


#შესაძლებელია აქვე ჩავწეროთ მონაცემი შრეში

fc = QgsFeature()

fc.setGeometry(QgsGeometry.fromPointXY(QgsPointXY(357965.61, 4683353.56)))

fc.setAttributes([1, 'giorgi', 25])

writer.addFeature(fc)

#თუ არაფრის ჩაწერა არ გვინდა ვაგრძელებთ გზას და კოდის ზედა ნაწილს გამოვტოვებთ

del(writer)

#fn file name - '' layer name - ogr vector file

layer = iface.addVectorLayer(fn, '', 'ogr')

```
QgsFields კლასი
QgsFields არის QGIS API-ში გამოყენებული კლასი, რომელიც წარმოადგენს ატრიბუტების (ველების) კოლექციას.
ველები (Fields) არის მონაცემთა სტრუქტურები, რომლებიც განსაზღვრავენ ფენას (Layer) ან ფაილში შენახულ მონაცემებს. თითოეული ველი აქვს სახელი, ტიპი (მაგ., ტექსტი, რიცხვი) და სხვა თვისებები.
layerfield = QgsFields()
ამ კოდის შედეგად:

იქმნება ცარიელი QgsFields ობიექტი.
ეს ობიექტი გამოიყენება ახალი ატრიბუტული ველების დამატებისთვის ან არსებული ველების შესანახად ფენისთვის.