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