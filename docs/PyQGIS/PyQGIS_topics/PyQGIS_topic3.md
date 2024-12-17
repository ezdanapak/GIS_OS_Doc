ტემპერატურების კონვერტაცია

ცელსიუსიდან ფარენჰაიტზე


#ცვლადით

temp_c = 17

temp_f = temp_c * 9 / 5 + 32

print(temp_f)

#62.6



___



#ციკლით სიაში 

templist_c = [17, 19, 24, 21, 16]

for temp_c in templist_c:

    temp_f = temp_c * 9 / 5 + 32

    print(temp_f)


კოორდინატების კონვერტაცია - Coordinate conversion
გრადუსები მინუტები სეკუნდებიდან > მეათედ გრადუსებში/Degrees, Minutes, Seconds > Decimal Degrees 

Kotia Cave, Chiatura-Perevisa-Sveri-Tvalueti-Gezruli, Georgia. კოორდინატები Google Earth - იდან 42°12'47.83"N 43°19'27.72"E > 42.213286° 43.324367°


def transformation(deg, min, sec):

    result = deg + min/60 + sec/3600

    return result

    

print(transformation(42, 12, 47.83))

print(transformation(43, 19, 27.72))



#შედეგი: 42.21328611111112 43.32436666666667

 

მეათედი გრადუსებიდან > გრადუსები მინუტები სეკუნდებზე/Decimal Degrees > Degrees, Minutes, Seconds


def reverse_transform(decimal_deg):



    degrees = int(decimal_deg)



    decimal_min = (decimal_deg - degrees) * 60



    minutes = int(decimal_min)



    seconds = (decimal_min - minutes) * 60



    return degrees, minutes, seconds





print(reverse_transform(41.688554))



print(reverse_transform(44.693789))



#შედეგი 

(41, 41, 18.794400000012388)

(44, 41, 37.64040000000875)


გრადუსები მინუტები სეკუნდები, მეათედ მინუტებზე

გასარჩევია

def dms_to_dd(d, m, s):

    """Converts degrees, minutes, and seconds to decimal degrees."""

    dd = d + m/60 + s/3600

    return dd



def convert_coordinates(coordinates):

    """Converts a list of coordinates from DMS to DD format."""

    decimal_coordinates = []

    for coord in coordinates:

        d, m, s = coord

        dd = dms_to_dd(d, m, s)

        decimal_coordinates.append(dd)

    return decimal_coordinates



# List of coordinates in DMS format: (degrees, minutes, seconds)

coordinates_dms = [

    (45, 30, 15),

    (60, 20, 10),

    (30, 15, 45)

]



# Convert coordinates to DD format

decimal_coordinates = convert_coordinates(coordinates_dms)

print(decimal_coordinates)











print(transformation(45, 31, 14.306))

print(transformation(45, 31, 14.697))

print(transformation(45, 31, 14.660))

print(transformation(45, 31, 14.699))

print(transformation(45, 31, 14.510))

print(transformation(45, 31, 14.333))

print(transformation(45, 31, 14.296))

print(transformation(45, 31, 14.041))

print(transformation(45, 31, 14.079))

print(transformation(45, 31, 14.040))

print(transformation(45, 31, 14.229))

print(transformation(45, 31, 14.268))



print('N')



print(transformation(41, 57, 18.654))

print(transformation(41, 57, 18.513))

print(transformation(41, 57, 18.454))

print(transformation(41, 57, 18.440))

print(transformation(41, 57, 18.148))

print(transformation(41, 57, 18.211))

print(transformation(41, 57, 18.153))

print(transformation(41, 57, 18.244))

print(transformation(41, 57, 18.303))

print(transformation(41, 57, 18.317))

print(transformation(41, 57, 18.609))

print(transformation(41, 57, 18.595))





def dms_to_dd(d, m, s):

    """Converts degrees, minutes, and seconds to decimal degrees."""

    dd = d + m/60 + s/3600

    return dd



def convert_coordinates(coordinates):

    """Converts a list of coordinates from DMS to DD format."""

    decimal_coordinates = []

    for coord in coordinates:

        d, m, s = coord

        dd = dms_to_dd(d, m, s)

        decimal_coordinates.append(dd)

    return decimal_coordinates



# List of coordinates in DMS format: (degrees, minutes, seconds)

coordinates_dms_north = [

    (45, 31, 14.306),

    (45, 31, 14.697),

    (45, 31, 14.660),

    (45, 31, 14.699),

    (45, 31, 14.510),

    (45, 31, 14.333),

    (45, 31, 14.296),

    (45, 31, 14.041),

    (45, 31, 14.079),

    (45, 31, 14.040),

    (45, 31, 14.229),

    (45, 31, 14.268)

]



coordinates_dms_south = [

    (41, 57, 18.654),

    (41, 57, 18.513),

    (41, 57, 18.454),

    (41, 57, 18.440),

    (41, 57, 18.148),

    (41, 57, 18.211),

    (41, 57, 18.153),

    (41, 57, 18.244),

    (41, 57, 18.303),

    (41, 57, 18.317),

    (41, 57, 18.609),

    (41, 57, 18.595)

]



# Convert coordinates to DD format

decimal_coordinates_north = convert_coordinates(coordinates_dms_north)

decimal_coordinates_south = convert_coordinates(coordinates_dms_south)



# Save coordinates to a text file

with open("converted_coordinates.txt", "w") as file:

    file.write("North Coordinates:\n")

    for coord in decimal_coordinates_north:

        file.write(f"{coord}\n")

    

    file.write("\nSouth Coordinates:\n")

    for coord in decimal_coordinates_south:

        file.write(f"{coord}\n")



print("Coordinates have been saved to 'converted_coordinates.txt' file.")




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



პროექტში არსებული შრის შერჩევა გამოხატვით


layers = QgsProject.instance().mapLayersByName('Georgia_municipalities')

layer = layers[0]



layer.selectByExpression('"Area"  =  1268097314')



შერჩეული ელემენტისგან ცალკე ახალი შრის შექმნა


#პროექტში არსებული შრის შერჩევა გამოხატვით



layers = QgsProject.instance().mapLayersByName('Georgia_municipalities')

layer = layers[0]

layer.selectByExpression('"Area"  =  1268097314')



#ახალი შრის განსაზღვრა და გადაცემა writer - ისთვის ჩასაწერად



fn2 = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_3\Georgia_municipalities1.shp'



#მხოლოდ შერჩეული ელემენტისთვის შექმნა onlySelected = True პარამეტრი



writer = QgsVectorFileWriter.writeAsVectorFormat(layer, fn2, \



    'utf-8', driverName = 'ESRI Shapefile', onlySelected = True)



#დაამატოს ახალი შექმნილი შრე პროექტში



layer2 = iface.addVectorLayer(fn2, '', 'ogr')

del(writer)