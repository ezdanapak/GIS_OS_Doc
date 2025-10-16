## 🔎🔎🔎

 

- **დირექტორია (paths)** → გამოიყენე `r"path"` ან ორმაგი `\`

!!!info
    გადახედე კიდევ ერთხელ განმარტებებში "დახრილი ხაზი" იგივე "Python-ში დირექტორიების სწორად ჩაწერა" - ს.


- **EOL while scanning string** → ფაილის დირექტორიის მისამართს აკლია ბრჭყალი `"`.  
EOL means end of line, and the message means that Python reached the end of the line of code while processing the string on line 2. The path string needs another quotation mark to finish it. 
- **QVariant.Int** → **AttributeError: type object 'QVariant' has no attribute 'int'** → პატარა `i` შეცდომაა, სწორია `Int`.

- **Missing functions in IDE** → თუ ფუნქციები არ ჩანს, მაშინ qgis მოდული უნდა შემოიტანო კოდის დასაწყისში. 

```py title="Missing_functions_in_IDE.py" linenums="1"
import qgis

#კოდის დანარჩენი ნაწილი თემატურად
```

---

- **TEMPORARY_OUTPUT** → დროებითი შედეგი, თუ გვინდა ფაილად შევინახოთ → ჩავანაცვლოთ `output`
!!!warning
    სხვა შემთხვევაში პროგრამის დახურვის შემდეგ მიღებული შედეგები დაიკარგება.



    layers = QgsProject.instance().mapLayersByName('sadguri')

layer = layers[0]

delf = layer.dataProvider().capabilities()

feats = layer.getFeatures()

dfeats = []



კოდის ნაწილია წარმოდგენილი და თუ შეცდომას აგდებს

>>>>
IndexError: list index out of range
ნიშნავს რომ mapLayersByName('sadguri') სახელი შრის არ გაქვს შეცვლილი და ვერ ხვდება.


--

out = r'C:\Users\Public\GIS\PyGK\tema_4_1\Georgia_municipalities2.shp'

processing.run("native:deletecolumn", {INPUT': layer,\


'COLUMN':['SHAPE_Leng'],'OUTPUT':out})


EOL while scanning string literal

შეცდომა ნიშნავს რომ 'INPUT':  - ს აკლია ' ცალ მხარეს


layer = layes[0]


NameError: name 'layes' is not defined

layes აკლია r    - layers


proces sing.run("native:deleteduplicategeometries", {'INPUT':layer,'OUTPUT':output})

invalid syntax შეცდომა proces sing.run ერთად უნდა ეწეროს processing.run


სვეტი რომელსაც სკრიპტი ეძებს ატრიბუტულ ცხრილში ფიზიკურად არ არსებობს...

ამ შემთხვევაში ეს არის fid სვეტი.

Traceback (most recent call last):

  File "<input>", line 1, in <module>

  File "<string>", line 15, in <module>

KeyError: 'fid'