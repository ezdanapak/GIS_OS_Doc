ობიექტების ინდექსით წაშლა შრიდან

#QgsProject არის კლასი(Class) 

#ყველა კლასი შეგიძლია ნახო აქ

#instance არის მეთოდი

#mapLayersByName არის მეთოდი - პროექტში შემოტანილი შრეების სიას იღებს სახელების მიხედვით.

-

#capabilities() არის ფუნქცია. ვნახავთ რა ფუნქციონალია მხარდაჭერილი ვექტორული შრის რედაქტირების დროს. 

#dataProvider()

The data provider is the connection to the underlying file or database that holds the geospatial information to be displayed.

In QGIS, a data provider (instance of qgis.core.QgsVectorDataProvider) allows the vector/raster layer to access the features within the data source. It includes a geometry type (stored in the data source), a list of fields that provide information about the attributes stored for each feature, and the ability to explore features within the data source (using getFeatures() method and QgsFeatureRequest class).

You can access the various data providers using the core.QgsProviderRegistry class.




layers = QgsProject.instance().mapLayersByName('sadguri')



layer = layers[0]



delf = layer.dataProvider().capabilities()



if delf & QgsVectorDataProvider.DeleteFeatures:

    df = layer.dataProvider().deleteFeatures([0,1,2,3,4])



layer.triggerRepaint()



რიცხვითი ატრიბუტების მქონე ობიეტების წაშლა შრიდან


ვარიანტი 1

layers = QgsProject.instance().mapLayersByName('sadguri')



layer = layers[0]



delf = layer.dataProvider().capabilities()

feats = layer.getFeatures()

dfeats = []



if delf & QgsVectorDataProvider.DeleteFeatures:

    for feat in feats:

        if feat['fid'] > 16:

            dfeats.append(feat.id())

    df = layer.dataProvider().deleteFeatures(dfeats)

    layer.triggerRepaint()



ვარიანტი 2

layers = QgsProject.instance().mapLayersByName('Georgia_municipalities')



layer = layers[0]



delf = layer.dataProvider().capabilities()

feats = layer.getFeatures()

dfeats = []



if delf & QgsVectorDataProvider.DeleteFeatures:

    for feat in feats:

        if feat['OBJECTID_1'] > 19:

            dfeats.append(feat.id())

        elif feat['OBJECTID_1'] < 17:

            dfeats.append(feat.id())

    df = layer.dataProvider().deleteFeatures(dfeats)

    layer.triggerRepaint()



ვარიანტი 3



layers = QgsProject.instance().mapLayersByName('Georgia_municipalities')

layer = layers[0]

delf = layer.dataProvider().capabilities()

feats = layer.getFeatures()

dfeats = []

if delf & QgsVectorDataProvider.DeleteFeatures:

    for feat in feats:

        if feat['OBJECTID_1'] > 19 or feat['OBJECTID_1'] < 17:

            dfeats.append(feat.id())

    df = layer.dataProvider().deleteFeatures(dfeats)

    layer.triggerRepaint()



ვარიანტი 4



layers = QgsProject.instance().mapLayersByName('Georgia_municipalities')

layer = layers[0]

delf = layer.dataProvider().capabilities()

feats = layer.getFeatures()

dfeats = []

if delf & QgsVectorDataProvider.DeleteFeatures:

    for feat in feats:

        if feat['OBJECTID_1'] > 6 and feat['OBJECTID_1'] < 10:

            dfeats.append(feat.id())

    

    df = layer.dataProvider().deleteFeatures(dfeats)

    layer.triggerRepaint()


ატრიბუტებით წაშლა - ტექსტური


ვარიანტი 1

layers = QgsProject.instance().mapLayersByName('Georgia_municipalities')

layer = layers[0]

delf = layer.dataProvider().capabilities()

feats = layer.getFeatures()

dfeats = []

if delf & QgsVectorDataProvider.DeleteFeatures:

    for feat in feats:

        if feat['DISTR_ENG'] == "Tsalka":

            dfeats.append(feat.id())

    df = layer.dataProvider().deleteFeatures(dfeats)

    layer.triggerRepaint()



ვარიანტი 2



layers = QgsProject.instance().mapLayersByName('Georgia_municipalities')

layer = layers[0]

delf = layer.dataProvider().capabilities()

feats = layer.getFeatures()

dfeats = []

if delf & QgsVectorDataProvider.DeleteFeatures:

    for feat in feats:

        if feat['DISTR_ENG'] != "Tsalka" or feat['MUNICIPAL'] == "Gurjaani":

            dfeats.append(feat.id())

    df = layer.dataProvider().deleteFeatures(dfeats)

    layer.triggerRepaint()





სვეტების წაშლა ატრიბუტულ ცხრილში


layers = QgsProject.instance().mapLayersByName('Georgia_municipalities')



layer = layers[0]



out = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_4\Georgia_municipalities2.shp'



processing.run("native:deletecolumn", {INPUT': layer,\



'COLUMN':['SHAPE_Leng'],'OUTPUT':out})





დუბლირებული ატრიბუტების წაშლა


layers = QgsProject.instance().mapLayersByName('Georgia_municipalities')



layer = layes[0]



fil = r'C:\Users\Public\Documents\GK\PyQGIS\shp\test\Georgia_municipalities2.shp'



dup = out = r'C:\Users\Public\Documents\GK\PyQGIS\shp\test\Georgia_municipalities3.shp'





processing.run("native:removeduplicatesbyattribute", {'INPUT: layer,\



'FIELDS':['MUNICIPAL'],'OUTPUT':fil, 'DUPLICATES': dup})





დუბლირებული გეომეტრიების წაშლა შრიდან


layers = QgsProject.instance().mapLayersByName('Georgia_municipalities')



layer = layers[0]

output = r"C:\Users\Public\Documents\GK\PyQGIS\shp\tema_4\municipalities_WD.shp'

proces sing.run("native:deleteduplicategeometries", {'INPUT':layer,'OUTPUT':"output})







layers = QgsProject.instance().mapLayersByName('sadguri')

layer = layers[0]

delf = layer.dataProvider().capabilities()

feats = layer.getFeatures()

dfeats = []



კოდის ნაწილია წარმოდგენილი და თუ შეცდომას აგდებს

>>>>
IndexError: list index out of range
ნიშნავს რომ mapLayersByName('sadguri') სახელი შრის არ გაქვს შეცვლილი და ვერ ხვდება.


--

out = r'C:\Users\Public\GIS\PyGK\tema_4_1\Georgia_municipalities2.shp'

processing.run("native:deletecolumn", {INPUT': layer,\


'COLUMN':['SHAPE_Leng'],'OUTPUT':out})


EOL while scanning string literal

შეცდომა ნიშნავს რომ 'INPUT':  - ს აკლია ' ცალ მხარეს


layer = layes[0]


NameError: name 'layes' is not defined

layes აკლია r    - layers


proces sing.run("native:deleteduplicategeometries", {'INPUT':layer,'OUTPUT':output})

invalid syntax შეცდომა proces sing.run ერთად უნდა ეწეროს processing.run


სვეტი რომელსაც სკრიპტი ეძებს ატრიბუტულ ცხრილში ფიზიკურად არ არსებობს...

ამ შემთხვევაში ეს არის fid სვეტი.

Traceback (most recent call last):

  File "<input>", line 1, in <module>

  File "<string>", line 15, in <module>

KeyError: 'fid'