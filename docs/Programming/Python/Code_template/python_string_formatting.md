# 🐍 Python String Formatting  
სტრიქონების ფორმატირება Python-ში

სტრიქონების ფორმატირება საშუალებას გვაძლევს **მონაცემები მოვათავსოთ ტექსტში მოქნილად და ორგანიზებულად**.  
ამ გზით მარტივად ვბეჭდავთ ცვლადებს, რიცხვებს ან სხვა ტიპის ინფორმაციას სტრიქონში.

---

!!! warning
    სალექციო კურსის ფარგლებში არ არის მისი გამოყენება სავალდებულო!

## 🔹 1. სტრიქონის შეერთება (Concatenation)
ყველაზე მარტივი გზა არის `+` ოპერატორის გამოყენება.

```python
name = "Giorgi"
age = 25
print("My name is " + name + " and I am " + str(age) + " years old.")
```

🧩 **შედეგი:**
```
My name is Giorgi and I am 25 years old.
```

> ❗შენიშვნა: რიცხვების შემთხვევაში საჭიროა `str()` გამოყენება, რადგან სხვადასხვა ტიპის მონაცემებს ვერ ვაერთებთ პირდაპირ.

---

## 🔹 2. %-ფორმატირება (Old Style Formatting)
ეს არის ძველი, მაგრამ ჯერ კიდევ მოქმედი ფორმატირების მეთოდი.

```python
name = "Giorgi"
age = 25
print("My name is %s and I am %d years old." % (name, age))
```

🧩 **შედეგი:**
```
My name is Giorgi and I am 25 years old.
```

📘 `%s` — სტრიქონი  
📘 `%d` — მთელი რიცხვი  
📘 `%f` — ათწილადი რიცხვი  

---

## 🔹 3. `str.format()` მეთოდი
თანამედროვე და უნივერსალური გზა.

```python
name = "Giorgi"
age = 25
print("My name is {} and I am {} years old.".format(name, age))
```

🧩 **შედეგი:**
```
My name is Giorgi and I am 25 years old.
```

შეგიძლია ინდექსების მითითებაც:

```python
print("Name: {0}, Age: {1}".format("Giorgi", 25))
```

ან სახელებით:

```python
print("Name: {n}, Age: {a}".format(n="Giorgi", a=25))
```

---

## 🔹 4. f-სტრიქონები (f-strings) — 🏆 თანამედროვე გზა
Python 3.6-დან მოყოლებული საუკეთესო და ყველაზე მარტივი ფორმატირების მეთოდი.

```python
name = "Giorgi"
age = 25
print(f"My name is {name} and I am {age} years old.")
```

🧩 **შედეგი:**
```
My name is Giorgi and I am 25 years old.
```

👉 შეგვიძლია გამოთვლებიც:
```python
x = 10
y = 5
print(f"Sum: {x + y}, Product: {x * y}")
```

---

## 🔹 5. რიცხვების ფორმატირება
f-სტრიქონებში მარტივად ვაკონტროლებთ რიცხვების გამოჩენის ფორმას:

```python
pi = 3.14159265
print(f"π = {pi:.2f}")   # ორი ათწილადი
```
🧩 შედეგი:
```
π = 3.14
```

რიცხვების გასწორება სიგრძით:
```python
num = 7
print(f"Number: {num:>5}")   # მარჯვნივ გასწორება
print(f"Number: {num:<5}")   # მარცხნივ გასწორება
print(f"Number: {num:^5}")   # ცენტრში გასწორება
```

---

## 🔹 6. მრავალსტრიქონიანი ფორმატირება
f-სტრიქონები მუშაობს მრავალ ხაზზეც:

```python
name = "Giorgi"
job = "Developer"
print(f\"\"\"
Hello, {name}!
Your role: {job}.
Welcome aboard!
\"\"\")
```

---

## 🔹 7. მაგალითი — ფორმატირებული ცხრილი

```python
data = [
    ("Alice", 24, "Engineer"),
    ("Bob", 30, "Designer"),
    ("Giorgi", 25, "Developer")
]

for name, age, job in data:
    print(f"{name:<10} | {age:^5} | {job:>10}")
```

🧩 შედეგი:
```
Alice      |  24   |   Engineer
Bob        |  30   |    Designer
Giorgi     |  25   |   Developer
```

---

## ✅ დასკვნა

| მეთოდი | აღწერა | რეკომენდაცია |
|:--|:--|:--|
| `+` | მარტივი შეერთება | მარტივი შემთხვევებისთვის |
| `%` | ძველი სტილი | აღარ გამოიყენება ახალ კოდში |
| `.format()` | მოქნილი და უსაფრთხო | კარგია ყველა ვერსიაში |
| `f""` | ყველაზე მარტივი და სწრაფი | 🔥 გამოიყენე ყოველთვის, როცა შეგიძლია |

---

📘 **საყვარელი რესურსები:**
- [Python Official Docs – String Formatting](https://docs.python.org/3/library/string.html#format-string-syntax)
- [Real Python Tutorial – F-Strings](https://realpython.com/python-f-strings/)
