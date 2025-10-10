# QGIS-ში შრის მონიშვნა და შერჩევა PyQGIS-ით


## განმარტებები

- `iface` — QGIS-ის GUI ინტერფეისისთვის (QGIS Python Console / Plugins).
- `QgsProject` — მიმდინარე პროექტის მართვა (გაფართოება, შრეთა წაკითხვა).
- `processing` — QGIS-ის ხელსაწყოების ნაკრები; მონიშვნების `qgis:selectbyattribute`, `native:selectbylocation` და სხვ.

- writer - ის წაშლა აუცილებელია. განმარტება ჩასამატებელია.
- ამ თემის კოდებში მოცემულია როგორც დირექტორიიდან წაკითხვა შრის და ისე მისი ობიექტების შერჩევა, ასევე პროექტში უკვე დამატებულის მოძებნა, გააქტიურება და ოპერაციის განხორციელება.

---



მონიშვნის ოპერატორები გამოიყენება `selectbyattribute` ფუნქციაში. ისინი განსაზღვრავენ ლოგიკურ შედარებას ველის მნიშვნელობასთან.

| კოდი | ოპერატორი | აღწერა | მაგალითი SQL-ში |
|------|-----------|--------|------------------|
| 0    | =         | ტოლია | `DISTR_ENG = 'Oni'` |
| 1    | ≠         | არ უდრის | `DISTR_ENG ≠ 'Poti'` |
| 2    | >         | მეტია | `Area > 1000000` |
| 3    | >=        | მეტი ან ტოლი | `Area >= 1000000` |
| 4    | <         | ნაკლებია | `Area < 1000000` |
| 5    | <=        | ნაკლები ან ტოლი | `Area <= 1000000` |
| 6    | begins with | იწყება...-ით | `DISTR_ENG begins with 'O'` |
| 7    | contains  | შეიცავს | `DISTR_ENG contains 'ani'` |
| 8    | is null   | ცარიელია | `DISTR_ENG is null` |
| 9    | is not null | არ არის ცარიელი | `DISTR_ENG is not null` |
| 10   | does not contain | არ შეიცავს | `DISTR_ENG does not contain 'ani'` |

---


## ინტერაქტიული მონიშვნის მეთოდები

ინტერაქტიული მონიშვნის მეთოდები განსაზღვრავს, როგორ მოქმედებს ახალი შერჩევა არსებულზე.

| კოდი | მეთოდი | აღწერა |
|------|--------|--------|
| 'METHOD':0    | creating new selection | ქმნის ახალ შერჩევას (წინა შერჩევა იწმინდება) |
| 'METHOD':1    | adding to current selection | ამატებს ახალ ობიექტებს მიმდინარე შერჩევას |
| 'METHOD':2    | removing from current selection | აცილებს ობიექტებს მიმდინარე შერჩევიდან |
| 'METHOD':3    | selecting within current selection | შერჩევა მხოლოდ მიმდინარე შერჩევის ფარგლებში |

---


### შრის წაკითხვა

```py title="Read_layer" linenums="1"
#შრის წაკითხვა დირექტორიიდან პროექტში
fn = r'C:\Users\Public\Documents\GIS\shp\Georgia_municipalities.shp'

layer = iface.addVectorLayer(fn, '', 'ogr')
#proccess

#პროექტში შემოტანილი შრის წაკითხვა
layers = QgsProject.instance().mapLayersByName('Georgia_municipalities')
layer = layers[0]
#proccess
```

### შრეში ყველა ობიექტის მონიშვნა — *Select All*

```py title="select_all_features" linenums="1"

fn = r'C:\Users\Public\Documents\GIS\shp\Georgia_municipalities.shp'
layer = iface.addVectorLayer(fn, 'Georgia Municipalities', 'ogr')
if not layer:
    raise ValueError(f"Layer not loaded: {fn}")

#ყველა ობიექტის მონიშვნა
#layer.selectAll()
```

## მონიშნული ობიექტების ფერის შეცვლა <br>

```py title="change_selection_color" linenums="1"

iface.mapCanvas().setSelectionColor(QColor('red'))

```


## შრეში ატრიბუტებით მონიშვნა

```py title="select_object_with_selectbyattribute_tool" linenums="1"
#SQL  - ში DISTR_ENG = 'Oni'

fn = r'C:\Users\Public\Documents\GIS\shp\Georgia_municipalities.shp'

layer = iface.addVectorLayer(fn, '', 'ogr')

processing.run("qgis:selectbyattribute", {'INPUT':fn,'FIELD':'DISTR_ENG','OPERATOR':0,'VALUE':'Oni','METHOD':0})

```

## მოვნიშნოთ შრეში ყველა მუნიციპალიტეტი, გარდა ფოთისა.

```py title="select_object_with_selectbyattribute_tool" linenums="1"
SQL  - ში DISTR_ENG ≠ 'Oni'

fn = r'C:\Users\Public\Documents\GIS\shp\Georgia_municipalities.shp'

layer = iface.addVectorLayer(fn, '', 'ogr')

#'OPERATOR':1 წყვეტს მთლიან საკითხს კოდში

processing.run("qgis:selectbyattribute", {'INPUT':fn,'FIELD':'DISTR_ENG','OPERATOR':1,'VALUE':'Poti','METHOD':0})

```

## ობიექტის გამოხატვით შერჩევა - Select By Expression

#ტექსტური ტიპის მონაცემები

#SQL  - ში  DISTR_ENG  =  'Gardabani'

```py title="select_object_with_selectbyattribute_tool" linenums="1"

fn = r'C:\Users\Public\Documents\GIS\shp\Georgia_municipalities.shp'

layer = iface.addVectorLayer(fn, '', 'ogr')

layer.selectByExpression('"DISTR_ENG"  =  \'Gardabani\'')
```
!!!info
    ბრჭყალები ('') გამოიყენება ტექსტური მნიშვნელობებისთვის (სტრინგები), რადგან QGIS SQL-ში ასეა განსაზღვრული.
    \' არის ესკეიპი (escape sequence) Python-ში: რადგან მთლიანი გამოხატვა ერთ ციტატაშია ჩაკეტილი ("" ან ''), შიგნით მეორე ციტატის დასაწყებად/დასასრულებლად \' უნდა გამოიყენო, რომ Python-ნი არ შეცდეს და სწორად გაანალიზოს სტრინგი. თუ ესკეიპი არ იქნება, Python-ის პარსერი დაუშვებდა სინტაქსურ შეცდომას.



---
## ობიექტის სივრცითი შერჩევა - Select By Location
#დასამუშავებელია - 

fn = r’D:\Location\Municipalitys.shp’

fn_sel = r’D:\Location\Settlments.shp'

fn_2 = r’D:\Location\ soxumi.shp’

processing.run("native:selectbylocation", \

	{'INPUT':fn_sel, 'PREDICATE':[0], 'INTERSECT': fn_2, 'METHOD':0})

processing.run("native:selectbylocation", {'INPUT':fn_sel,'PREDICATE':[0],\

    'INTERSECT':QgsProcessingFeatureSourceDefinition(fn, selectedFeaturesOnly=True, \

	featureLimit=-1, geometryCheck=QgsFeatureRequest.GeometryAbortOnInvalid),'METHOD':0})





-- 

fn = r'C:\Users\Public\GIS\PyGK\tema_3\Georgia_municipalities.shp'

fn1 = r'C:\Users\Public\GIS\PyGK\tema_3\settlement.shp'



processing.run("native:selectbylocation", {'INPUT':fn1,'PREDICATE':[0],'INTERSECT':QgsProcessingFeatureSourceDefinition(fn, selectedFeaturesOnly=True, featureLimit=-1, geometryCheck=QgsFeatureRequest.GeometryAbortOnInvalid),'METHOD':0})





layer = iface.addVectorLayer(fn1, '', 'ogr')

---





## რიცხვითი ტიპის მონაცემები

```py title="select_object_selectByExpression" linenums="1"
#SQL - ში  Area >= 1268097314
fn = r'C:\Users\Public\Documents\GIS\shp\Georgia_municipalities.shp'

layer = iface.addVectorLayer(fn, '', 'ogr')

layer.selectByExpression('"Area"  >=  1268097314')

```
## პროექტში არსებული შრის შერჩევა გამოხატვით
```py title="select_object_selectByExpression" linenums="1"
#
layers = QgsProject.instance().mapLayersByName('Georgia_municipalities')
layer = layers[0]

layer.selectByExpression('"Area"  <=  1268097314')



## შერჩეული ელემენტისგან ცალკე ახალი შრის შექმნა
```py title="selectByExpression_create_new_layer" linenums="1"

layers = QgsProject.instance().mapLayersByName('Georgia_municipalities')

layer = layers[0]

layer.selectByExpression('"Area"  =  1268097314')

ახალი შრის განსაზღვრა და გადაცემა writer - ისთვის ჩასაწერად

fn2 = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_3\Georgia_municipalities1.shp'

#მხოლოდ შერჩეული ელემენტისთვის შექმნა onlySelected = True პარამეტრი
writer = QgsVectorFileWriter.writeAsVectorFormat(layer, fn2, \
    'utf-8', driverName = 'ESRI Shapefile', onlySelected = True)

layer2 = iface.addVectorLayer(fn2, '', 'ogr')

del(writer)

```