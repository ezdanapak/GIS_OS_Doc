გრადუსი, მინუტი, სეკუნდი | კოორდინატების გადაყვანა მეათედ გრადუსებში და ბეჭდვა მასივად

def transform(deg, min, sec):

    result = deg + min / 60 + sec / 3600

    return result



# 41°44'39.59"N     44°44'24.07"E

lat = [(41, 44, 39.59), (41, 44, 36.93), (41, 44, 27.32)]  # N

long = [(44, 44, 24.07), (44, 44, 24.46), (44, 44, 17.99)]  # E

E = []

N = []

for i in range(len(lat)):

    E.append(transform(long[i][0],long[i][1],long[i][2]))

    N.append(transform(lat[i][0],lat[i][1],lat[i][2]))



print(E)

print(N)





ვექტორული მონაცემების მოჭრა სხვა ვექტორით(clip)

მოვჭრათ მუნიციპალიტეტები რეგიონით


layers = QgsProject.instance().mapLayersByName('Municipality')

over = QgsProject.instance().mapLayersByName('imereti')

layer = layers[0]

ov = over[0]



fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_7\test.shp'



processing.run('native:clip', {'INPUT':layer, 'OVERLAY':ov, 'OUTPUT':fn})

iface.addVectorLayer(fn, '', 'ogr')



ვექტორული მონაცემების მოჭრა სხვა ვექტორის ჩარჩოთი(Clip vector by extent)

იმერეთის რეგიონის ექსტენტით მუნიციპალიტეტების მოჭრა


layers = QgsProject.instance().mapLayersByName('Municipality')

over = QgsProject.instance().mapLayersByName('imereti')

layer = layers[0]

ov = over[0]



fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_7\test.shp'



processing.run("native:extractbyextent", {'INPUT':layer,\

    'EXTENT':ov,'CLIP':False,'OUTPUT':fn})

iface.addVectorLayer(fn, '', 'ogr')


# Clip 3 NULL

#layers = QgsProject.instance().mapLayersByName('Settlments')

#over = QgsProject.instance().mapLayersByName('Area_CLP')

#layer = layers[0]

#ov = over[0]

#

#fn = r'D:\!Work\!BTU\Out\out.shp'

#

#processing.run("gdal:clipvectorbyextent", \

#        {'INPUT':layer,'EXTENT':ov,'OUTPUT':fn})

#iface.addVectorLayer(fn, '', 'ogr')


ვექტორული მონაცემების მოჭრა ადგილმდებარეობით(Extract by location)


ამოვჭრათ დასახლებული პუნქტებიდან ის ელემენტები რომლებიც იკვეთება იმერეთის რეგიონზე


layers = QgsProject.instance().mapLayersByName('settlement')

intersct = QgsProject.instance().mapLayersByName('imereti')

layer = layers[0]

intsct = intersct[0]



fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_7\settlement_imereti.shp'



processing.run("native:extractbylocation", {'INPUT':layer,\

            'PREDICATE':[0],'INTERSECT':intsct,'OUTPUT':fn})

iface.addVectorLayer(fn, '', 'ogr')



ამოვჭრათ დასახლებული პუნქტებიდან ის ელემენტები რომლებიც იკვეთება მონიშნულ მუნიციპალიტეტებზე


layers = QgsProject.instance().mapLayersByName('settlement')

layer = layers[0]



intersct = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_7\Municipality.shp'

fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_7\test.shp'



processing.run("native:extractbylocation", {'INPUT':layer,'PREDICATE':[0],\

    'INTERSECT':QgsProcessingFeatureSourceDefinition(intersct, \

    selectedFeaturesOnly=True, featureLimit=-1, \

    geometryCheck=QgsFeatureRequest.GeometryAbortOnInvalid),'OUTPUT':fn})



iface.addVectorLayer(fn, '', 'ogr')


სხვადასხვა ვექტორული შრის გაერთიანება(Merge vector layers)

ორი სხვადასხვა ვექტორული შრის გაერთიანება


layers_aW = QgsProject.instance().mapLayersByName('chiatura')

layers_af = QgsProject.instance().mapLayersByName('sachxere')

layer_aW = layers_aW[0]

layer_af = layers_af[0]



fn = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_7\chiatura_sachxere.shp'

processing.run('native:mergevectorlayers', {'LAYERS':[layer_aW, layer_af],\

    'CRS':QgsCoordinateReferenceSystem('EPSG:32637'), 'OUTPUT':fn})

    

iface.addVectorLayer(fn, '', 'ogr')