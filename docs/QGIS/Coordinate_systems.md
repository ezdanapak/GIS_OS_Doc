## .PRJ .WKT .PROJ4 .SRID .EPSG 
 წარმოდგენილი ფაილ ფორმატები გვაძლევს საშუალებას საკოორდინატო სისტემებთან სხვადასხვა გარემოში სწრაფ წვდომას და ინფორმაციის მიღებას.

## PRJ
 .prj (Projection File) არის ტექსტური ფაილი, რომელიც თან ახლავს შეიპ-ფაილებს.იგი განსაზღვრავს საკოორდინატო სისტემასა და პროექციის ინფორმაციას, იყენებს Well-Known Text (WKT) ფორმატს CRS-ის განსასაზღვრად. <br>

!!!example
    PROJCS["WGS_1984_UTM_Zone_38N",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984", <br>SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],<br>UNIT["Degree",0.0174532925199433]],PROJECTION["Transverse_Mercator"],<br>PARAMETER["False_Easting",500000.0],PARAMETER["False_Northing",0.0],<br>PARAMETER["Central_Meridian",45.0],PARAMETER["Scale_Factor",0.9996],<br>PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]

## WKT
 .wkt Well-known text [WKT](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry) არის (ტექსტური მარკირების ენა) რომელსაც შეუძლია ვექტორული გეომეტრიული ობიექტების გამოსახვა.  <br><br>

    - WKT can represent the following distinct geometric objects:

        1. Point, MultiPoint
        2. LineString, MultiLineString
        3. Polygon, MultiPolygon, Triangle
        4. PolyhedralSurface
        5. TIN (Triangulated irregular network)
        6. GeometryCollection 

ამავე ინფორმაციის მონაცემთა ბაზაში შესანახ ფორმატად გამოიყენება ორმაგი ექვივალენტის ფორმატი WKB (Well-Known Binary), ასევე მონაცემთა გადატანისთვის და ის უფრო მოსახერხებელია კომპიუტერული დამუშავებისთვის. <br><br>
  
## PROJ4
.proj4 არის [ბიბლიოთეკა](https://en.wikipedia.org/wiki/PROJ) რომელიც 1 პროექციიდან მეორეში ბრძანებებით გადაყვანის საშუალებას იძლევა. 

## SRID

A spatial reference identifier [(SRID)](https://desktop.arcgis.com/en/arcmap/latest/manage-data/using-sql-with-gdbs/what-is-an-srid.htm) უნიკალური მაიდენტიფიცირებელი რომელიც დაკავშირებულია განსაზღვრულ საკოორდინატო სისტემას.


## EPSG

- EPSG კოდი უნიკალური მაიდენტიფიცირებელი საშუალებაა, რომელიც მინიჭებულია კონკრეტულ კოორდინატულ სარეფერენციო სისტემას (CRS) ან კოორდინატების ტრანსფორმაციას, რომელიც გამოიყენება რუკების შექმნასა და სივრცულ მონაცემებში. 

- EPSG აღნიშნავს ევროპის ნავთობის კვლევის ჯგუფს (European Petroleum Survey Group), რომელმაც შექმნა საკოორდინატო სისტემების, პროექციების და ტრანსფორმაციების კომპლექსური რეესტრი, რომელიც გამოიყენება მთელ მსოფლიოში. დღეს ეს რეესტრი იმართება ნავთობისა და გაზის მწარმოებელთა საერთაშორისო ასოციაციის (IOGP) გეოდეზიის ქვეკომიტეტის მიერ და ეს სტანდარტი ერთ-ერთ ყველაზე ფართოდ გამოყენებადია გეოგრაფიული ინფორმაციული სისტემებისა (GIS) და რუკების შექმნის პროგრამებისთვის.

- EPSG კოდების ძირითადი მახასიათებლები:
უნიკალური მაიდენტიფიცირებელი: თითოეული EPSG კოდი არის რიცხვითი იდენტიფიკატორი კონკრეტული სარეფერენციო სისტემისთვის ან ტრანსფორმაციისთვის, რაც ხელს უწყობს მომხმარებლებსა და პროგრამებს იდენტიფიცირებას.

- გამოყენება GIS-ში:

სივრცულ მონაცემებთან მუშაობისას მნიშვნელოვანია ვიცოდეთ ან ვიაზრებდეთ რომელ საკოორდინატო სისტემის გამოყენებას ვაპირებთ საქმიანობაში. ამის განსასაზღვრავად აუცილებელია ადგილმდებარეობის გათვალისწინება.
პროგრამები როგორიცაა QGIS, ArcGIS, SuperMap და ა.შ, მომხმარებელს აძლევს საშუალებას მიუთითონ EPSG კოდი, თუმცა ახალბედა GIS-ში მოღვაწემ იშვიათად იცის მის შესახებ.
მონაცემები და წვდომა: EPSG ბაზა საჯაროდ ხელმისაწვდომია და მოიცავს ათასობით EPSG კოდს, რომლებიც ფარავს სარეფერენციო სისტემების და პროექციების ფართო სპექტრს სხვადასხვა რეგიონისა და დანიშნულებისთვის.

!!!info "___"
    საკოორდინატო სისტემები რომელიც გამოიყენება საქართველოში:

    - EPSG:4326 – ეს არის ერთ-ერთი ყველაზე გავრცელებული EPSG კოდი, რომელიც აღნიშნავს WGS 84 ელიფსოიდს, რომელიც გამოიყენება GPS სისტემებში და სხვა გლობალური სივრცული მონაცემებისთვის.

    - მართკუთხა ახალი  :
    ელიფსოიდია WGS 84 და პროექცია UTM  <br>
    WGS 84 / UTM zone 38N | EPSG:32638 <br>
    WGS 84 / UTM zone 37N | EPSG:32637  <br>

        WGS 84 / Pseudo-Mercator -- Spherical Mercator, Google Maps, OpenStreetMap, Bing, ArcGIS, ESRI. EPSG:3857 (Web Mercator) – ხშირად გამოიყენება ვებ რუკების აპლიკაციებში. <br>

    - მართკუთხა ძველი  :
    ელიფსოიდია Pulkovo 1942 და პროექცია Gauss-Kruger <br>
    Pulkovo 1942 / Gauss-Kruger zone 8 | EPSG:28408 <br>
    Pulkovo 1942 / Gauss-Kruger zone 7 | EPSG:28407 <br>

სხვა EPSG კოდების არქივი შეგიძლია [ნახო აქ](https://epsg.io/)

WGS84 (World Geodetic System 1984) and Pulkovo 1942 are both geodetic coordinate systems, but they are based on different reference ellipsoids and datum definitions, leading to several key differences:

Datum and Reference Ellipsoid:

WGS84 is based on a global datum that is designed to best fit the Earth's shape for global positioning. It uses the WGS84 ellipsoid, which is aligned with the Earth's center of mass and is designed for GPS systems. The WGS84 ellipsoid has a semi-major axis of 6,378,137 meters and a flattening of 1/298.257223563.

Pulkovo 1942 is a regional geodetic datum used primarily in Russia and surrounding areas. It uses the Krassovsky 1940 ellipsoid, which is optimized for the area around Russia and has a semi-major axis of 6,378,245 meters and a flattening of 1/298.3. This ellipsoid is slightly different from the WGS84 ellipsoid.

Geographical Coverage:

WGS84 is a global datum, meaning it’s used worldwide and forms the basis for most modern GPS systems.

Pulkovo 1942 is a regional datum, and its usage is mostly limited to the former Soviet Union and Eastern Europe, particularly Russia, where the system was developed to fit the specific regional geography better.

Coordinate System Alignment:

WGS84 is aligned with the Earth's center of mass (mean sea level), and the system is designed to represent the Earth's shape as accurately as possible on a global scale.

Pulkovo 1942 is oriented based on local measurements, so its coordinates are not aligned with the global Earth center, which can lead to differences in positioning when compared to WGS84.

Transformations:

If you need to convert coordinates between the two systems (WGS84 and Pulkovo 1942), transformation parameters must be used. Typically, these transformations involve translations, rotations, and scaling between the two coordinate systems.

The differences can be quite significant, with shifts of several meters, particularly over long distances, due to the different definitions of the reference ellipsoid and the origin of the coordinate systems.

Usage in Modern Systems:

WGS84 is the standard for GPS and modern mapping systems, making it much more widespread and used globally.

Pulkovo 1942 was more commonly used for mapping and surveying in the Soviet era and in the Russian Federation but is less commonly used in modern global applications.

In summary, the main differences lie in their reference ellipsoids, geographic relevance (global vs. regional), and the fact that WGS84 is aligned with the Earth's center of mass for global use, while Pulkovo 1942 is more regionally focused and was designed to fit specific areas in Eastern Europe and Russia.

!!!bug
    დოკუმენტაციის ზოგიერთი ნაწილი შექმნილია ხელოვნური ინტელექტის მიერ, შესაძლებელია იყოს დაშვებული შეცდომები.
    თუ რაიმეს შესწორება გსურთ, Github-ზე შეგიძლიათ "Submit the Pull Request". 