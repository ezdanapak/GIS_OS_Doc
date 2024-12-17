ხაზოვანი ვექტორული შრის სიმბოლოს ფერის შეცვლა


layers = QgsProject.instance().mapLayersByName('mdinare')

layer = layers[0]



symboll = QgsLineSymbol.createSimple({'color' : 'blue'})

layer.renderer().setSymbol(symboll)



layer.triggerRepaint()

 

ხაზოვანი ვექტორული შრის სიმბოლოს და ფერის შეცვლა




layers = QgsProject.instance().mapLayersByName('mdinare')

layer = layers[0]



symboll = QgsLineSymbol.createSimple({'line_style':'dash','color' : '#1956EC'})

layer.renderer().setSymbol(symboll)



layer.triggerRepaint()



Plot - Chart



დასაკორექტირებელია


from qgis. PyQt import QtGui



fn = r'C:\Users\Public\GIS\PyQGIS\shp\tema_6\rivers.shp'

layer = QgsVectorLayer (fn, '', 'ogr')



LF = 'Shape_Leng'

symb_list = []

opacity = 0

minval = 490

maxval = 50000

lab = 'short'



col1 = QtGui.QColor ('#c0ec19')

symb = QgsSymbol.defaultSymbol (layer.geometryType())

symb.setColor (col1)

symb.setOpacity (opacity)



rang1 = QgsRendererRange (minval, maxval, symb, lab)

symb_list.append(rang1)



iface.addVectorLayer(fn, '', 'ogr')



*
symboll = QgsLineSymbol.createSimple({'line_style':'dash','color' : '#1956EC'})

იყენებს HEX 16 ტობით ფერებს