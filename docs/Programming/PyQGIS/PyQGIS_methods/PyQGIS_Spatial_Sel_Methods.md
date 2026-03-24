### 📋 მეთოდების შეჯამება

| მეთოდი | გამოყენება |
|--------|-----------|
| `processing.run("native:selectbylocation", {...})` | სივრცითი შერჩევა |
| `QgsProcessingFeatureSourceDefinition(path, selectedFeaturesOnly=True)` | შერჩეული ობიექტებით ნიღბი |
| `iface.addVectorLayer(path, name, 'ogr')` | შრის ჩატვირთვა რუკაზე |
| `layer.selectedFeatureCount()` | შერჩეული ობიექტების რაოდენობა |
| `layer.selectedFeatures()` | შერჩეული ობიექტების იტერაცია |
| `layer.selectByExpression("\"field\" = 'value'")` | გამოსახულებით შერჩევა |

---