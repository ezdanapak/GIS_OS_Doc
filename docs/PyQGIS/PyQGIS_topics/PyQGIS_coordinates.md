## კოორდინატების კონვერტაცია



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