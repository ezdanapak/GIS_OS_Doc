# QGIS --- Layer Tools (ქართულად)

## 1. ფენის ინფორმაციის ექსპორტი (Export layer(s) information)

**დანიშნულება:**\
ამ ხელსაწყოს საშუალებით მიიღება თითოეული ფენის გეომეტრიული ವ್ಯಾಪ্তის
პოლიგონი და დამატებითი მეტამონაცემები.

**პარამეტრები:**\
- `LAYERS` --- ფენების სია\
- `OUTPUT` --- გამომავალი პოლიგონის ფაილი

**Python მაგალითი:**

``` python
import processing

params = {
    'LAYERS': ['layer1', 'layer2'],
    'OUTPUT': 'TEMPORARY_OUTPUT'
}
processing.run('native:exportlayersinformation', params)
```

------------------------------------------------------------------------

## 2. ექსპორტი ცხრილში (Export to spreadsheet)

**დანიშნულება:**\
ერთ ან რამდენიმე ფენის ატრიბუტების ცხრილების ექსპორტი spreadsheet-ში
(xlsx/ods). თითოეული ფენა ხდება ცალკე ფურცელი.

**Python მაგალითი:**

``` python
import processing

params = {
    'LAYERS': ['layerA', 'layerB'],
    'USE_ALIAS': False,
    'FORMATTED_VALUES': True,
    'OVERWRITE': True,
    'OUTPUT': '/tmp/layers.xlsx'
}
processing.run('native:exporttospreadsheet', params)
```

------------------------------------------------------------------------

## 3. ფენის ექსტენტის ამოღება (Extract layer extent)

**დანიშნულება:**\
გენერირდება პოლიგონი, რომელიც წარმოადგენს ფენის მინიმალურ შემოაღত্বის
ოთხკუთხედს.

**Python მაგალითი:**

``` python
import processing

params = {
    'INPUT': 'my_layer',
    'OUTPUT': '/tmp/extent.gpkg'
}
processing.run('qgis:polygonfromlayerextent', params)
```

------------------------------------------------------------------------

## რეალური სცენარი --- GIS პროექტის ავტომატური დოკუმენტირება

``` python
import processing

# 1. ფენების მეტამონაცემების ექსპორტი
processing.run('native:exportlayersinformation', {
    'LAYERS': ['roads', 'buildings', 'rivers'],
    'OUTPUT': '/tmp/layers_info.gpkg'
})

# 2. ყველა ფენის ატრიბუტების ექსპორტი Excel-ში
processing.run('native:exporttospreadsheet', {
    'LAYERS': ['roads', 'buildings', 'rivers'],
    'USE_ALIAS': True,
    'FORMATTED_VALUES': True,
    'OVERWRITE': True,
    'OUTPUT': '/tmp/project_data.xlsx'
})

# 3. თითოეული ფენის extent-ის შექმნა
for lyr in ['roads', 'buildings', 'rivers']:
    processing.run('qgis:polygonfromlayerextent', {
        'INPUT': lyr,
        'OUTPUT': f'/tmp/{lyr}_extent.gpkg'
    })
```

------------------------------------------------------------------------

დოკუმენტი მოიცავს QGIS Layer Tools-ის მოკლე, მაგრამ პრაქტიკულ საჩვენებელ
მაგალითებს.
