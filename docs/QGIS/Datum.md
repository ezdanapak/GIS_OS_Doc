## Datum
A datum is a mathematical model that defines the shape, size, and orientation of the Earth’s surface. The Earth is not a perfect sphere, but
rather an oblate spheroid, which means that its shape is closer to a flattened sphere than a perfect sphere. Datums are needed to accurately
represent the shape of the Earth’s surface in geospatial data.
Datums are used in geodesy, which is the science of measuring and modeling the Earth’s surface. They are typically represented by an ellipsoid
or geoid, which is a mathematical model of the Earth’s surface. An ellipsoid is a smooth surface that approximates the shape of the Earth,
while a geoid is a more irregular surface that represents the Earth’s
gravity field.
There are two main types of datums: geographic and projected. Ge-
*GENERATED FOR Giorgi Kapanadze ON 2025-01-06 - THIS BOOK IS COPYRIGHTED - DO NOT DISTRIBUTE*
26 CHAPTER 2. MAPPING THE WORLD’S PORTS AND AIRPORTS
ographic datums are used to define the shape of the Earth’s surface,
while projected datums are used to map the 3D surface of the Earth
onto a 2D plane.
Geographic datums are used to define the shape of the Earth’s surface
and are typically represented by an ellipsoid. The most commonly used
geographic datum is the World Geodetic System 1984 (WGS84), which
is used by the Global Positioning System (GPS) and is the standard
for most geospatial data. Other common geographic datums include
North American Datum 1983 (NAD83) and European Terrestrial Reference Frame 1989 (ETRF89).
Projected datums are used to map the 3D surface of the Earth onto a
2D plane. They are typically represented by a flat plane or a cylinder.
Some common projected datums include Universal Transverse Mercator (UTM), which is used for large-scale mapping and navigation, and
State Plane Coordinate System (SPCS), which is used for smaller-scale
mapping and surveying.
Datums are needed to accurately represent the shape, size, and orientation of the Earth’s surface in geospatial data. They are typically
represented by an ellipsoid or geoid and are used to define the shape
of the Earth’s surface in geographic and projected coordinate reference
systems. Common datums include WGS84, NAD83, ETRF89, UTM, and
SPCS.
Projections
Projections are a method of representing the 3D surface of the Earth onto
a 2D plane. Since the Earth is a 3D object and maps are 2D, projections
are necessary to flatten the Earth’s surface onto a map.
A datum and a projection are both important concepts in geospatial
data analysis, but they serve different purposes. A datum defines the
shape, size, and orientation of the Earth’s surface, while a projection is
a method of representing the 3D surface of the Earth onto a 2D plane.
Datums are used to represent the Earth’s surface in geospatial data,
while projections are used to flatten the Earth’s surface onto a map.
Projections are needed for several reasons. Firstly, they allow us to create maps that are easier to read and understand than a globe. Maps
can provide more detailed information, such as political boundaries,
transportation routes, and landmarks, that are not easily visible on a
*GENERATED FOR Giorgi Kapanadze ON 2025-01-06 - THIS BOOK IS COPYRIGHTED - DO NOT DISTRIBUTE*
2.1. BASIC POINT PLOTTING - AIRPORTS AND PORTS MAP 27
globe. Secondly, maps are useful for measuring distances, areas, and
angles, which are important for a variety of applications such as surveying, navigation, and natural resource management. Finally, maps
are essential for visualizing geospatial data and identifying patterns
and relationships between different geographic features.
There are many different types of map projections, each with its own
set of advantages and disadvantages. Some projections preserve certain
properties of the Earth’s surface, such as area, distance, or shape, while
sacrificing others. The choice of projection depends on the purpose of
the map and the region being depicted.
Here are some examples of commonly used projections:
• Mercator projection: This is a cylindrical projection that preserves the direction of true north and is often used for navigation.
However, it distorts the size and shape of objects near the poles,
making Greenland and Antarctica appear much larger than they
actually are.
• Lambert Conformal Conic projection: This projection is commonly used for maps of the United States and Canada. It preserves the shape and size of objects near the standard parallel(s),
but distorts them elsewhere on the map.
• Albers Equal Area projection: This projection preserves area,
making it useful for maps that require accurate comparisons of
different regions’ sizes. It is commonly used for maps of the
United States and other countries.
• Robinson projection: This is a compromise projection that attempts to balance the preservation of area, shape, and distance.
It is a popular projection for world maps due to its attractive and
well-balanced appearance.
Projections are a method of representing the 3D surface of the Earth
onto a 2D plane. They are necessary for creating maps that are easier
to read and understand, measuring distances and areas, and visualizing geospatial data. There are many different types of projections, each
with its own advantages and disadvantages, and the choice of projection depends on the purpose of the map and the region being depicted.