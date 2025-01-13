## ტემპერატურების კონვერტაცია

ცელსიუსიდან ფარენჰაიტზე - Celsius to Fahrenheit

### ცვლადით
```py title="C_F_Variable.py" linenums="1"


temp_c = 17

temp_f = temp_c * 9 / 5 + 32

print(temp_f)

#შედეგი 62.6
```

### ციკლით სიაში
```py title="C_F_Loop_List.py" linenums="1"


templist_c = [17, 19, 24, 21, 16]

for temp_c in templist_c:

    temp_f = temp_c * 9 / 5 + 32

    print(temp_f)
```