# 🧩 PyQGIS — Raster & Vector Operations

ეს დოკუმენტი მოიცავს PyQGIS-ის რამდენიმე პრაქტიკულ მაგალითს:
- რასტრული მონაცემების რეკლასიფიცირება  
- რასტრული სიმბოლიზაცია (ფერადი გამოსახვა)  
- მოცულობის გამოთვლა DEM-ზე  
- მეზობელი ობიექტების შერჩევა  
- რუკის ავტომატური გენერაცია Layout-ში  
- `with...as` კონსტრუქტორის გამოყენება ფაილებთან მუშაობისთვის  

---

## 🗺️ **Reclassify by Table — რეკლასიფიცირება ცხრილის მიხედვით**

👉 აღნიშნული ფუნქცია საშუალებას გვაძლევს დავაჯგუფოთ რასტრის მნიშვნელობები განსაზღვრულ დიაპაზონებში (კლასებში).

```python
rl = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_9\Raster\DEM\Georgia_slope.tif'
out = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_9\Raster\DEM\G_Slope_Reclass.tif'

processing.run(
    'native:reclassifybytable',
    {
        'INPUT_RASTER': rl,
        'RASTER_BAND': 1,
        'TABLE': [0, 10, 1, 10, 25, 2, 25, 40, 3, 40, 55, 4],
        'NO_DATA': 0,
        'RANGE_BOUNDARIES': 0,
        'NODATA_FOR_MISSING': True,
        'DATA_TYPE': 5,
        'OUTPUT': out
    }
)

iface.addRasterLayer(out)
```

---

## 🎨 **Symbology — რასტრული გამოსახულების სიმბოლიზირება (ფერების მიცემა)**

👉 ვიზუალურად აღსაქმელი ფერების მინიჭება მნიშვნელობების მიხედვით.

```python
rl = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_9\Raster\DEM\Georgia_slope.tif'
ifc = iface.addRasterLayer(rl)

stats = ifc.dataProvider().bandStatistics(1, QgsRasterBandStats.All)
min = stats.minimumValue
a = 10
b = 25
c = 40
max = stats.maximumValue

CS = QgsColorRampShader()
CS.setColorRampType(QgsColorRampShader.Interpolated)

lst = [
    QgsColorRampShader.ColorRampItem(min, QColor(250, 235, 221)),
    QgsColorRampShader.ColorRampItem(a, QColor(245, 136, 96)),
    QgsColorRampShader.ColorRampItem(b, QColor('#cb1b4f')),
    QgsColorRampShader.ColorRampItem(c, QColor('#611f53')),
    QgsColorRampShader.ColorRampItem(max, QColor('#03051a'))
]

CS.setColorRampItemList(lst)
shad = QgsRasterShader()
shad.setRasterShaderFunction(CS)

render = QgsSingleBandPseudoColorRenderer(ifc.dataProvider(), 1, shad)
ifc.setRenderer(render)
```

---

## 🧮 **Volume — მოცულობის დათვლა რასტრულ გამოსახულებაზე**

👉 გამოიყენება მოცულობის გამოთვლისთვის DEM ფენიდან, განსაზღვრული სიმაღლის დონეზე.

```python
rl = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_11\Raster\chiatura_dem.tif'

chiatura_volume_html = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_11\HTML_stat\chiatura_dem_volume.html'
chiatura_volume_Table = r'C:\Users\Public\Documents\GK\PyQGIS\shp\tema_11\shp\chiatura_dem_volume_table.shp'

processing.run(
    "native:rastersurfacevolume",
    {
        'INPUT': rl,
        'BAND': 1,
        'LEVEL': 0,
        'METHOD': 0,
        'OUTPUT_HTML_FILE': chiatura_volume_html,
        'OUTPUT_TABLE': chiatura_volume_Table
    }
)
```

---

## 🧭 **Selecting Neighbors — მეზობელი ობიექტების შერჩევა მოქმედების ღილაკით**

👉 ეს სკრიპტი ამოარჩევს ობიექტებს, რომლებიც სივრცულად ეხებიან მოცემულ ობიექტს (მეზობლებს).

```python
layer_id = '[%@layer_id%]'
fid = [% $id %]

layer = QgsProject.instance().mapLayer(layer_id)

def get_neighbors(fid):
    f = layer.getFeature(fid)
    neighbors = [
        c.id()
        for c in layer.getFeatures(f.geometry().boundingBox())
        if c.geometry().intersects(f.geometry()) and c.id() != f.id()
    ]
    return neighbors

first_degree_neighbors = get_neighbors(fid)
second_degree_neighbors = set()

for n in first_degree_neighbors:
    neighbors = get_neighbors(n)
    second_degree_neighbors.update(neighbors)

second_degree_neighbors = second_degree_neighbors.difference(set(first_degree_neighbors))
second_degree_neighbors.discard(fid)

layer.selectByIds(list(second_degree_neighbors))
```

---

## 🗺️ **QGIS Layout Export — რუკის ავტომატური შექმნა და ექსპორტი**

👉 მაგალითი, როგორ შეიძლება პროგრამულად შეიქმნას რუკის განლაგება (Layout) და ექსპორტირდეს PDF ფორმატში.

```python
from qgis.PyQt import QtGui

layers = QgsProject.instance().mapLayersByName('stream_order')
layer = layers[0]

project = QgsProject.instance()
manager = project.layoutManager()
layoutName = 'Layout1'
layouts_list = manager.printLayouts()

# წაშლა ძველი Layout-ის, თუ უკვე არსებობს
for layout in layouts_list:
    if layout.name() == layoutName:
        manager.removeLayout(layout)

layout = QgsPrintLayout(project)
layout.initializeDefaults()
layout.setName(layoutName)
manager.addLayout(layout)

# რუკის ელემენტის შექმნა
map = QgsLayoutItemMap(layout)
map.setRect(20, 20, 20, 20)

ms = QgsMapSettings()
ms.setLayers([layer])
rect = QgsRectangle(ms.fullExtent())
rect.scale(1.0)
ms.setExtent(rect)
map.setExtent(rect)
map.setBackgroundColor(QColor(255, 255, 255, 0))
layout.addLayoutItem(map)

map.attemptMove(QgsLayoutPoint(5, 20, QgsUnitTypes.LayoutMillimeters))
map.attemptResize(QgsLayoutSize(180, 180, QgsUnitTypes.LayoutMillimeters))

# ლეგენდა
legend = QgsLayoutItemLegend(layout)
legend.setTitle("Legend")
layerTree = QgsLayerTree()
layerTree.addLayer(layer)
legend.model().setRootGroup(layerTree)
layout.addLayoutItem(legend)
legend.attemptMove(QgsLayoutPoint(230, 15, QgsUnitTypes.LayoutMillimeters))

# სკალის ზოლი
scalebar = QgsLayoutItemScaleBar(layout)
scalebar.setStyle('Line Ticks Up')
scalebar.setUnits(QgsUnitTypes.DistanceKilometers)
scalebar.setNumberOfSegments(4)
scalebar.setNumberOfSegmentsLeft(0)
scalebar.setUnitsPerSegment(0.5)
scalebar.setLinkedMap(map)
scalebar.setUnitLabel('km')
scalebar.setFont(QFont('Arial', 14))
scalebar.update()
layout.addLayoutItem(scalebar)
scalebar.attemptMove(QgsLayoutPoint(220, 190, QgsUnitTypes.LayoutMillimeters))

# სათაური
title = QgsLayoutItemLabel(layout)
title.setText("My Title")
title.setFont(QFont('Arial', 24))
title.adjustSizeToText()
layout.addLayoutItem(title)
title.attemptMove(QgsLayoutPoint(10, 5, QgsUnitTypes.LayoutMillimeters))

layout = manager.layoutByName(layoutName)
exporter = QgsLayoutExporter(layout)

fn = 'C:/temp/layout_export.pdf'
exporter.exportToPdf(fn, QgsLayoutExporter.PdfExportSettings())
```

---

## 📘 **With…as კონსტრუქტორი**

👉 `with` გამოიყენება ფაილებისა და რესურსების გახსნისას — ის ავტომატურად ხურავს ფაილს გამოყენების შემდეგ.

```python
with open(r'C:\Users\kapo\Desktop\koordinatebi.txt') as X:
    a = X.read()
    print(a)
```

---

✅ **დასკვნა:**  
PyQGIS იძლევა საშუალებას ავტომატიზირდეს როგორც რასტრული, ისე ვექტორული ოპერაციები — მონაცემების დამუშავებიდან რუკის გენერაციამდე.

---
