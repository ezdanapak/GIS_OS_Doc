
!!!danger 
    ქართული ასოების და სხვა სიმბოლოების გამოყენება გარდა ქვედა ტირისა _ აკრძალულია არქივის, საქაღალდის, ფაილის სახელწოდებებში, ცხრილების სვეტებზე, ცვლადებზე, ფუნქციებზე, კლასებზე, მასივებზე, კორტეჟებზე და ა.შ ❌

    მხოლოდ laTinuri_anbani_da_qveda_tire, რეგისტრს დიდი მნიშვნელობა არ აქვს.

!!!Tip
    ქართული წარწერები შესაძლებელია ჩაიწეროს UTF-8 უნიკოდირების წესების დაცვით ცხრილის უჯრებში, ასევე ლათინური ანბანით ჩაწერილი მონაცემების გარდაქმნა შესაძლებელია ქართული ფონტებით.


## ტრანსლიტერი

თუ უკვე ცხრილის სვეტებში არსებობს ჩანაწერები ქართული ასოებით მისი კონვერტაცია ლათინურზე შესაძლებელია მარტივად PyQGIS კოდის გამოყენებით, ისე რომ ქართული ფონტისთვის შესაბამისი გახდეს.

![A cool animation](./images/PyQGIS_transliter_code_geo_to_eng.gif)

```py title="transliteration.py" linenums="1"
#ქუდის ნაწილის გამოტოვება შესაძლებელია, თუ QGIS კონსოლს ვიყენებთ.
# from qgis.core import (
#     QgsProject,
#     QgsVectorLayer,
#     QgsField
# )
# from PyQt5.QtCore import QVariant

# ფუნქცია ქართულიდან ლათინურ ასოებზე კონვერტაციისთვის
def georgian_to_latin(text):
    transliteration_map = {
        'ა': 'a', 'ბ': 'b', 'გ': 'g', 'დ': 'd', 'ე': 'e', 'ვ': 'v', 'ზ': 'z', 
        'თ': 'T', 'ი': 'i', 'კ': 'k', 'ლ': 'l', 'მ': 'm', 'ნ': 'n', 'ო': 'o', 
        'პ': 'p', 'ჟ': 'J', 'რ': 'r', 'ს': 's', 'ტ': "t", 'უ': 'u', 
        'ფ': "f", 'ქ': "q", 'ღ': 'R', 'ყ': "y", 'შ': 'S', 'ჩ': 'C', 
        'ც': 'c', 'ძ': 'Z', 'წ': "w", 'ჭ': "W", 'ხ': 'x', 'ჯ': 'j', 
        'ჰ': 'h'
    }
    return ''.join(transliteration_map.get(char, char) for char in text)

# პარამეტრები
# მიუთითე მონაცემთა ბაზა
layer_path = "D:/GIS/werili/Geodatabase/bagdati.gdb"  
# მიუთითე ბაზის შრის სახელწოდება
layer_name = "Layer_name"  
# სვეტის სახელწოდება სადაც ქართული ასოებით წერია მნიშვნელობები
input_field = "Layer_name"  
# ახალი სვეტი სადაც გადაიწერება ინფორმაცია
output_field = "Layer_name"  

# ვექტორული შრის ჩატვირთვა
layer = QgsVectorLayer(f"{layer_path}|layername={layer_name}", layer_name, "ogr")

if not layer.isValid():
    print("Layer failed to load!")
else:
    print("Layer loaded successfully!")

# შემოწმება ახალი სვეტის არსებობაზე, დამატება, განახლება
if output_field not in [field.name() for field in layer.fields()]:
    layer.dataProvider().addAttributes([QgsField(output_field, QVariant.String)])
    layer.updateFields()

# სვეტის შევსება ახალი მნიშვნელობებით
with edit(layer):
    for feature in layer.getFeatures():
        georgian_text = feature[input_field]
        if georgian_text:  
            feature[output_field] = georgian_to_latin(georgian_text)
            layer.updateFeature(feature)

print("Transliteration complete.")

```

## ტრანსლიტერის ფლაგინი

QGIS რეპოზიტორიაზე მოძებნეთ Transliterator

Author: Giorgi Kapanadze <br>
Author's email: g.kapanadze1908@gmail.com <br>
Maintainer: kapanadze <br>
Plugin home [page](https://ezdanapak.github.io/transliterator/) <br>
Tracker: Browse and report [bugs](https://github.com/ezdanapak/transliterator/issues) <br>
Code [repository](https://github.com/ezdanapak/transliterator) <br>

