# 🧩 PyQGIS — Raster & Vector Operations

ეს დოკუმენტი მოიცავს PyQGIS-ის რამდენიმე პრაქტიკულ მაგალითს:
- რასტრული მონაცემების რეკლასიფიცირება  
- რასტრული სიმბოლიზაცია (ფერადი გამოსახვა)  
- მოცულობის გამოთვლა DEM-ზე  
- მეზობელი ობიექტების შერჩევა  
- რუკის ავტომატური გენერაცია Layout-ში  
- `with...as` კონსტრუქტორის გამოყენება ფაილებთან მუშაობისთვის  

---





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
