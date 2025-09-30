## 🔎 შეცდომები და მათი ახსნა

 

- **დირექტორია (paths)** → გამოიყენე `r"path"` ან ორმაგი `\`
- **Missing functions in IDE** → თუ ფუნქციები არ ჩანს, მაშინ qgis მოდული უნდა შემოიტანო კოდის დასაწყისში. "import qgis"
- **EOL while scanning string** → ფაილის დირექტორიის მისამართს აკლია ბრჭყალი `"`.  
EOL means end of line, and the message means that Python reached the end of the line of code while processing the string on line 2. The path string needs another quotation mark to finish it. 
- **QVariant.Int** → **AttributeError: type object 'QVariant' has no attribute 'int'** → პატარა `i` შეცდომაა, სწორია `Int`.



- **TEMPORARY_OUTPUT** → დროებითი შედეგი, თუ გვინდა ფაილად შევინახოთ → ჩავანაცვლოთ `output`
!!!warning
    სხვა შემთხვევაში პროგრამის დახურვის შემდეგ მიღებული შედეგები დაიკარგება.