
მონიშვნები

მონიშვნის ოპერატორები

'OPERATOR':0


0 — =

1 — ≠

2 — >

3 — >=

4 — <

5 — <=

6 — begins with

7 — contains

8 — is null

9 — is not null

10 — does not contain


ინტერაქტიული მონიშვნის მეთოდები

'METHOD':0


0 — creating new selection

1 — adding to current selection

2 — removing from current selection

3 — selecting within current selection


შრეში ყველა ობიექტის მონიშვნა - Select all

#დაამატებს შრეს პროგრამაში დირექტორიიდან

fn = r'C:\Users\Public\Documents\GIS\shp\Georgia_municipalities.shp'

layer = iface.addVectorLayer(fn, '', 'ogr')



#მონიშნული ობიექტების ფერის შეცვლა, რაც არაა სტანდარტულად სავალდებულო, რომ კოდში იყოს

iface.mapCanvas().setSelectionColor(QColor('red'))

#ფუნქცია რომ ყველა ელემენტი მონიშნოს

layer.selectAll()


მოვნიშნოთ შრეში ონის მუნიციპალიტეტი

SQL  - ში DISTR_ENG = 'Oni'


fn = r'C:\Users\Public\Documents\GIS\shp\Georgia_municipalities.shp'



layer = iface.addVectorLayer(fn, '', 'ogr')



processing.run("qgis:selectbyattribute", {'INPUT':fn,'FIELD':'DISTR_ENG','OPERATOR':0,'VALUE':'Oni','METHOD':0})


მოვნიშნოთ შრეში ყველა მუნიციპალიტეტი, გარდა ფოთისა.

SQL  - ში DISTR_ENG = 'Oni'


fn = r'C:\Users\Public\Documents\GIS\shp\Georgia_municipalities.shp'



layer = iface.addVectorLayer(fn, '', 'ogr')

#'OPERATOR':1 წყვეტს მთლიან საკითხს კოდში

processing.run("qgis:selectbyattribute", {'INPUT':fn,'FIELD':'DISTR_ENG','OPERATOR':1,'VALUE':'Poti','METHOD':0})











ობიექტის გამოხატვით შერჩევა - Select By Expression


ტექსტური ტიპის მონაცემები

SQL  - ში  DISTR_ENG  =  'Gardabani'



fn = r'C:\Users\Public\Documents\GIS\shp\Georgia_municipalities.shp'



layer = iface.addVectorLayer(fn, '', 'ogr')



layer.selectByExpression('"DISTR_ENG"  =  \'Gardabani\'')
ან
layer.selectByExpression("DISTR_ENG = 'Gardabani'")



ობიექტის სივრცითი შერჩევა - Select By Location
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







რიცხვითი ტიპის მონაცემები

SQL  - ში  Area = 1268097314



fn = r'C:\Users\Public\Documents\GIS\shp\Georgia_municipalities.shp'



layer = iface.addVectorLayer(fn, '', 'ogr')





layer.selectByExpression('"Area"  =  1268097314')
ან
layer.selectByExpression("Area  =  1268097314")



პროექტში არსებული შრის შერჩევა გამოხატვით


layers = QgsProject.instance().mapLayersByName('Georgia_municipalities')

layer = layers[0]



layer.selectByExpression('"Area"  =  1268097314')
ან
layer.selectByExpression("Area  =  1268097314")


შერჩეული ელემენტისგან ცალკე ახალი შრის შექმნა


#პროექტში არსებული შრის შერჩევა გამოხატვით



layers = QgsProject.instance().mapLayersByName('Georgia_municipalities')

layer = layers[0]

layer.selectByExpression('"Area"  =  1268097314')
ან
layer.selectByExpression("Area  =  1268097314")

######## გამარტივებული ვარიანტი


#ახალი შრის განსაზღვრა და გადაცემა writer - ისთვის ჩასაწერად



fn2 = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_3\Georgia_municipalities1.shp'



#მხოლოდ შერჩეული ელემენტისთვის შექმნა onlySelected = True პარამეტრი



writer = QgsVectorFileWriter.writeAsVectorFormat(layer, fn2, \



    'utf-8', driverName = 'ESRI Shapefile', onlySelected = True)



#დაამატოს ახალი შექმნილი შრე პროექტში



layer2 = iface.addVectorLayer(fn2, '', 'ogr')

del(writer)