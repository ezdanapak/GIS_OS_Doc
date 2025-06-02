ცხრილში ახალი სვეტის შექმნა და მონაცემის შეტანა


with edit არის ოპერატორი

იმისათვის რომ გაეშვას გამოხატვით გადაცემული ჩვენი კოდი საჭიროა შესაბამისი QgsExpressionContext ის მიწოდება





# Calculate Field



layers = QgsProject.instance().mapLayersByName('Rivers')

layer = layers[0]



pv = layer.dataProvider()

pv.addAttributes([QgsField('Type', QVariant.String)])

#QVariant.String - ის ნაცვლად თუ QVariant.Int - ს გამოვიყენებთ



layer.updateFields()



cntx = QgsExpressionContext()

cntx.appendScopes(QgsExpressionContextUtils.globalProjectLayerScopes(layer))



with edit(layer):

    for i in layer.getFeatures():

        cntx.setFeature(i)

        i['Type'] = 'mdinare' 

#აქ უკვე 'ეს ფრჩხილები აღარ გვჭირდება, რიცხვები წავა სვეტში ტექსტის ნაცვლად'

        layer.updateFeature(i)





ცხრილში ახალი სვეტების შექმნა და მონაცემების შეტანა




# Calculate Fields

layers = QgsProject.instance().mapLayersByName('Rivers')

layer = layers[0]



pv = layer.dataProvider()

pv.addAttributes([QgsField('Type', QVariant.String),\

                QgsField('Type_Eng', QVariant.String)])



layer.updateFields()



cntx = QgsExpressionContext()

cntx.appendScopes(QgsExpressionContextUtils.globalProjectLayerScopes(layer))



with edit(layer):

    for i in layer.getFeatures():

        cntx.setFeature(i)

        i['Type'] = 'mdinare'

        i['Type_Eng'] = 'River'

        layer.updateFeature(i)



ხაზოვან შრეში სიგრძის დათვლა


# Calculate length



layers = QgsProject.instance().mapLayersByName('Rivers')

layer = layers[0]



pv = layer.dataProvider()

pv.addAttributes([QgsField('Len_M', QVariant.Double)])



layer.updateFields()



expr1 = QgsExpression('length($geometry)')



cntx = QgsExpressionContext()

cntx.appendScopes(QgsExpressionContextUtils.globalProjectLayerScopes(layer))



with edit(layer):

    for i in layer.getFeatures():

        cntx.setFeature(i)

        i['Len_M'] = expr1.evaluate(cntx)

        layer.updateFeature(i)





პოლიგონალურ შრეში ფართობის და პერიმეტრის დათვლა ერთდროულად




# Calculate Area and Perimeter



layers = QgsProject.instance().mapLayersByName('nakveti')

layer = layers[0]



pv = layer.dataProvider()

pv.addAttributes([QgsField('Area_sq_m', QVariant.Double)])

pv.addAttributes([QgsField('Perimeter', QVariant.Double)])



layer.updateFields()



expr1 = QgsExpression('area($geometry)')

expr2 = QgsExpression('perimeter($geometry)')



cntx = QgsExpressionContext()

cntx.appendScopes(QgsExpressionContextUtils.globalProjectLayerScopes(layer))



with edit(layer):

    for i in layer.getFeatures():

        cntx.setFeature(i)

        i['Area_sq_m'] = expr1.evaluate(cntx)

        i['Perimeter'] = expr2.evaluate(cntx)

        layer.updateFeature(i)



მოსახლეობის სიმჭიდროვის გამოანგარიშება ცხრილში
Population Density = Number of People/Land Area

D=P/A

Where D is the density

P is the population number

A is the area



# Calculate Fields



layers = QgsProject.instance().mapLayersByName('Municipalitys')

layer = layers[0]



pv = layer.dataProvider()

pv.addAttributes([QgsField('area', QVariant.Double), \

    QgsField('area_km', QVariant.Double), QgsField('simwidrove', QVariant.Double)])

layer.updateFields()



expr1 = QgsExpression('$area')

expr2 = QgsExpression('"area"/1000000')

expr3 = QgsExpression('"Mosaxl_200"/area_km')



cntx = QgsExpressionContext()

cntx.appendScopes(QgsExpressionContextUtils.globalProjectLayerScopes(layer))



with edit(layer):

    for i in layer.getFeatures():

        cntx.setFeature(i)

        i['area'] = expr1.evaluate(cntx)

        layer.updateFeature(i)

       

with edit(layer):

    for i in layer.getFeatures():

        cntx.setFeature(i)

        i['area_km'] = expr2.evaluate(cntx)

        layer.updateFeature(i)

        

with edit(layer):

    for i in layer.getFeatures():

        cntx.setFeature(i)

        i['simwidrove'] = expr3.evaluate(cntx)

        layer.updateFeature(i)





Traceback (most recent call last):

  File "C:\PROGRA1\QGIS331.2\apps\Python39\lib\code.py", line 90, in runcode

    exec(code, self.locals)

  File "<input>", line 1, in <module>

  File "<string>", line 27, in <module>

KeyError: 'X_coordinate' 


ნიშნავს რომ კოდში დაწერილი 

pv.addAttributes([QgsField('Area_sq_m', QVariant.Double)])

სვეტის ეს სახელწოდება არის გრძელი შეიპისთვის და უნდა შემოკლდეს



Traceback (most recent call last):

  File "C:\PROGRA~1\QGIS33~1.2\apps\Python39\lib\code.py", line 90, in runcode

    exec(code, self.locals)

  File "<input>", line 1, in <module>

  File "<string>", line 29, in <module>

  File "C:\PROGRA~1/QGIS33~1.2/apps/qgis/./python\qgis\core\additions\edit.py", line 38, in __enter__

    assert self.layer.startEditing()

AssertionError



შრის რედაქტირება გარსიდან უკვე ჩართული გაქვს და უნდა გათიშო

