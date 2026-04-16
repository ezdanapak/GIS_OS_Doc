# PyQGIS კლასების იერარქია

---

## მემკვიდრეობა (Inheritance)

```
QObject  (Qt — საბაზო კლასი, გარე ბიბლიოთეკა)
├── QgsMapLayer
│   ├── QgsVectorLayer
│   └── QgsRasterLayer
├── QgsProject
└── QgisInterface  (iface)
```

| კლასი | მშობელი | ფაილი |
|-------|---------|-------|
| `QgsVectorLayer` | `QgsMapLayer` | [PyQGIS_QgsVectorLayer.md](PyQGIS_QgsVectorLayer.md) |
| `QgsRasterLayer` | `QgsMapLayer` | [PyQGIS_QgsRasterLayer.md](PyQGIS_QgsRasterLayer.md) |
| `QgsProject` | `QObject` | [PyQGIS_QgsProject.md](PyQGIS_QgsProject.md) |
| `QgisInterface` (iface) | `QObject` | [PyQGIS_iface.md](PyQGIS_iface.md) |

---

## კომპოზიცია (Composition / "აქვს" კავშირი)

```
QgsVectorLayer
└── შეიცავს QgsFeature-ებს
    ├── .geometry()  →  QgsGeometry
    │                   └── იყენებს  QgsPointXY
    │                   └── იყენებს  QgsWkbTypes  (enum)
    └── .fields()    →  QgsFields
```

| კლასი | ვინ შეიცავს | ფაილი |
|-------|------------|-------|
| `QgsFeature` | `QgsVectorLayer` (მისი ობიექტები) | [PyQGIS_QgsFeature.md](PyQGIS_QgsFeature.md) |
| `QgsGeometry` | `QgsFeature.geometry()` | [PyQGIS_QgsGeometry.md](PyQGIS_QgsGeometry.md) |
| `QgsPointXY` | `QgsGeometry` (წერტილური გეომეტრია) | [PyQGIS_QgsPointXY.md](PyQGIS_QgsPointXY.md) |
| `QgsWkbTypes` | `QgsGeometry` (ტიპის განსაზღვრა) | [PyQGIS_QgsWkbTypes.md](PyQGIS_QgsWkbTypes.md) |
| `QgsFields` | `QgsFeature.fields()` | [PyQGIS_QgsFields.md](PyQGIS_QgsFields.md) |

---

## დამხმარე / Utility კლასები

დამოუკიდებელი კლასები — არ მემკვიდრეობენ ზემოთ ნახსენებ კლასებს:

| კლასი | დანიშნულება | ფაილი |
|-------|------------|-------|
| `QgsCoordinateReferenceSystem` | კოორდინატთა სისტემა (CRS) | [PyQGIS_QgsCoordinateReferenceSystem.md](PyQGIS_QgsCoordinateReferenceSystem.md) |
| `QgsExpressionContext` | გამოსახულებების კონტექსტი | [PyQGIS_QgsExpressionContext.md](PyQGIS_QgsExpressionContext.md) |
| `QgsVectorFileWriter` | ვექტორული ფაილის ჩაწერა | [PyQGIS_QgsVectorFileWriter.md](PyQGIS_QgsVectorFileWriter.md) |
| `QVariant` | Qt-ის უნივერსალური ტიპი | [PyQGIS_QVariant.md](PyQGIS_QVariant.md) |

---

## გარე ბიბლიოთეკები

| ბიბლიოთეკა | დანიშნულება | ფაილი |
|------------|------------|-------|
| OGR (GDAL) | ვექტორული მონაცემების წაკითხვა/ჩაწერა | [PyQGIS_OGR_Library.md](PyQGIS_OGR_Library.md) |

---

## დამატებითი

| სახელი | სახეობა | ფაილი |
|--------|--------|-------|
| Shapefile სტრუქტურა | კონცეფცია | [PyQGIS_shapefile.md](PyQGIS_shapefile.md) |
| Path-ები და Escape სიმბოლოები | კონცეფცია | [PyQGIS_paths_and_escape_characters.md](PyQGIS_paths_and_escape_characters.md) |
