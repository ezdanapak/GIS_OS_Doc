# `QgsCoordinateReferenceSystem` PyQGIS-ში

**`QgsCoordinateReferenceSystem`** (მოკლედ — `QgsCRS`) არის PyQGIS-ის კლასი, რომელიც **კოორდინატთა საცნობარო სისტემებს** (CRS) წარმოადგენს და მართავს. CRS განსაზღვრავს, **როგორ უკავშირდება** ბრტყელი GIS რუკა დედამიწის რეალურ ზედაპირს.

---

## 🔑 ძირითადი დანიშნულება

- CRS-ის ინფორმაციის შენახვა და მართვა
- EPSG კოდების და PROJ სტრიქონების მხარდაჭერა
- CRS-ის ვალიდაციის შემოწმება
- ერთეულების, ელიფსოიდის და პროექციის ინფორმაციის მიღება
- კოორდინატების გარდაქმნა ერთი CRS-იდან მეორეში

---

## 📦 იმპორტი

```python
from qgis.core import (
    QgsCoordinateReferenceSystem,
    QgsCoordinateTransform,
    QgsProject
)
```

---

## ▶️ CRS-ის შექმნა

### EPSG კოდით (რეკომენდებული)

```python
# WGS 84 — გეოგრაფიული კოორდინატები
crs_geo = QgsCoordinateReferenceSystem("EPSG:4326")

# WGS 84 / UTM Zone 38N — საქართველო
crs_utm = QgsCoordinateReferenceSystem("EPSG:32638")

print(crs_utm.isValid())      # → True
print(crs_utm.authid())       # → "EPSG:32638"
print(crs_utm.description())  # → "WGS 84 / UTM zone 38N"
```

### PROJ სტრიქონით

```python
crs = QgsCoordinateReferenceSystem.fromProj(
    "+proj=longlat +datum=WGS84 +no_defs"
)
print(crs.isValid())   # → True
print(crs.authid())    # → "EPSG:4326"
```

### WKT (Well-Known Text) ფორმატით

```python
wkt = 'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257]]]'

crs = QgsCoordinateReferenceSystem()
crs.createFromWkt(wkt)

print(crs.isValid())   # → True
```

> 💡 **რეკომენდაცია:** ყოველთვის გამოიყენე **EPSG კოდი** — ყველაზე კითხვადი და სტანდარტულია. PROJ სტრიქონი ან WKT — მხოლოდ განსაკუთრებულ შემთხვევებში.

---

## 📖 ძირითადი მეთოდები

| მეთოდი | დანიშნულება | მაგალითი |
|--------|------------|---------|
| `isValid()` | CRS ვალიდურია? | `True` / `False` |
| `authid()` | Authority ID | `"EPSG:32638"` |
| `description()` | ადამიანის-წასაკითხი სახელი | `"WGS 84 / UTM zone 38N"` |
| `mapUnits()` | საზომი ერთეული | `QgsUnitTypes.DistanceMeters` |
| `toWkt()` | WKT ფორმატად გარდაქმნა | სრული WKT სტრიქონი |
| `toProj()` | PROJ სტრიქონი | `"+proj=utm +zone=38..."` |
| `ellipsoidAcronym()` | ელიფსოიდის სახელი | `"WGS84"` |
| `isGeographic()` | გეოგრაფიულია? (გრადუსები) | `True` თუ EPSG:4326 |
| `projectionAcronym()` | პროექციის სახელი | `"utm"`, `"longlat"` |

---

## 🔍 CRS-ის ინფორმაციის გამოტანა

```python
crs = QgsCoordinateReferenceSystem("EPSG:32638")

if crs.isValid():
    print("✅ CRS ვალიდურია")
    print("   Auth ID:     ", crs.authid())
    print("   სახელი:      ", crs.description())
    print("   ელიფსოიდი:  ", crs.ellipsoidAcronym())
    print("   პროექცია:   ", crs.projectionAcronym())
    print("   გეოგრაფია?: ", crs.isGeographic())
    print("   WKT:         ", crs.toWkt()[:60], "...")
else:
    print("❌ CRS არავალიდურია")
```

**გამოტანა:**

```
✅ CRS ვალიდურია
   Auth ID:      EPSG:32638
   სახელი:       WGS 84 / UTM zone 38N
   ელიფსოიდი:   WGS84
   პროექცია:    utm
   გეოგრაფია?:  False
   WKT:          PROJCRS["WGS 84 / UTM zone 38N",BASEGEOGCRS["WGS 84" ...
```

---

## 🔄 კოორდინატების გარდაქმნა — `QgsCoordinateTransform`

ერთი CRS-იდან მეორეში **წერტილის გარდაქმნა**:

```python
from qgis.core import (
    QgsCoordinateReferenceSystem,
    QgsCoordinateTransform,
    QgsPointXY,
    QgsProject
)

# საწყისი და სამიზნე CRS
src_crs  = QgsCoordinateReferenceSystem("EPSG:32638")  # UTM 38N
dest_crs = QgsCoordinateReferenceSystem("EPSG:4326")   # WGS 84

# Transform ობიექტი
transform = QgsCoordinateTransform(
    src_crs,
    dest_crs,
    QgsProject.instance()
)

# UTM კოორდინატი (თბილისი, დაახლოებით)
point_utm = QgsPointXY(490230.0, 4741850.0)

# WGS 84-ში გარდაქმნა
point_geo = transform.transform(point_utm)

print(f"UTM:   X={point_utm.x():.1f},  Y={point_utm.y():.1f}")
print(f"WGS84: lon={point_geo.x():.6f}, lat={point_geo.y():.6f}")
```

**გამოტანა:**

```
UTM:   X=490230.0,  Y=4741850.0
WGS84: lon=44.796132, lat=42.835241
```

---

## 🗺️ შრის გარდაქმნა სხვა CRS-ში

```python
from qgis.core import QgsVectorFileWriter, QgsProject

layer = iface.activeLayer()

# სამიზნე CRS
dest_crs = QgsCoordinateReferenceSystem("EPSG:4326")

options = QgsVectorFileWriter.SaveVectorOptions()
options.driverName   = "ESRI Shapefile"
options.fileEncoding = "UTF-8"
options.ct = QgsCoordinateTransform(
    layer.crs(),
    dest_crs,
    QgsProject.instance()
)

output_path = r'C:\GIS\output_wgs84.shp'

error, _, _, _ = QgsVectorFileWriter.writeAsVectorFormatV3(
    layer,
    output_path,
    QgsProject.instance().transformContext(),
    options
)

if error == QgsVectorFileWriter.NoError:
    print(f"✅ შრე შეინახა WGS84-ში: {output_path}")
else:
    print(f"❌ შეცდომა: {error}")
```

---

## 🌍 საქართველოში გამოყენებული CRS-ები

| EPSG | სახელი | გამოყენება |
|------|--------|-----------|
| `EPSG:4326` | WGS 84 | GPS, გეოგრაფიული კოორდინატები |
| `EPSG:32637` | WGS 84 / UTM Zone 37N | დასავლეთ საქართველო |
| `EPSG:32638` | WGS 84 / UTM Zone 38N | აღმოსავლეთ საქართველო |
| `EPSG:5342` | ETRS89 / UTM Zone 38N | ევროპული სტანდარტი |
| `EPSG:28408` | Pulkovo 1942 / GK Zone 8 | ძველი საბჭოური რუკები |

> 💡 **რეკომენდაცია საქართველოსთვის:** `EPSG:32638` — WGS 84 / UTM Zone 38N. მეტრული ერთეული, სწორი ფართობისა და სიგრძის გაანგარიშებისთვის.

---

## ⚠️ გავრცელებული შეცდომები

### CRS-ის შეუსაბამობა (Mismatch)

```python
layer1 = QgsVectorLayer(r'C:\GIS\roads.shp',    'Roads',    'ogr')
layer2 = QgsVectorLayer(r'C:\GIS\buildings.shp', 'Buildings', 'ogr')

# შეამოწმე — ემთხვევა თუ არა
if layer1.crs() != layer2.crs():
    print("⚠️ CRS არ ემთხვევა!")
    print(f"   Roads:     {layer1.crs().authid()}")
    print(f"   Buildings: {layer2.crs().authid()}")
    print("   სივრცული ანალიზამდე გარდაქმენი ერთ CRS-ში")
else:
    print("✅ CRS ემთხვევა")
```

### CRS-ის ვალიდაცია

```python
crs = QgsCoordinateReferenceSystem("EPSG:99999")  # არარსებული კოდი

if not crs.isValid():
    print("❌ CRS არავალიდურია — შეამოწმე EPSG კოდი")
```

---

## 📌 შეჯამება

- **`QgsCoordinateReferenceSystem`** — CRS-ის წარმოდგენა და მართვა PyQGIS-ში
- **EPSG კოდი** — ყველაზე მოხერხებული გზა CRS-ის განსაზღვრისთვის
- **`isValid()`** — ყოველთვის შეამოწმე CRS-ის შექმნის შემდეგ
- **`QgsCoordinateTransform`** — კოორდინატების გარდაქმნა ერთი CRS-იდან მეორეში
- **CRS შეუსაბამობა** — სივრცული ანალიზის ყველაზე გავრცელებული შეცდომის წყარო
- საქართველოსთვის → **`EPSG:32638`** (UTM Zone 38N, მეტრები)

👉 ნებისმიერი სივრცული ოპერაციამდე **შეამოწმე CRS** — ეს გარანტიას იძლევა, რომ ფართობი, სიგრძე და მდებარეობა **სწორად გამოითვლება**.

---

## 📚 გამოყენებული რესურსები

- [QGIS Documentation — CRS](https://docs.qgis.org/latest/en/docs/user_manual/working_with_projections/working_with_projections.html)
- [PyQGIS Developer Cookbook — CRS](https://docs.qgis.org/latest/en/docs/pyqgis_developer_cookbook/crs.html)
- [EPSG Registry](https://epsg.io)