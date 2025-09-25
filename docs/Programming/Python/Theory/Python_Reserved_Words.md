# Python-ის რეზერვირებული სიტყვები

ეს დოკუმენტი განკუთვნილია სტუდენტებისთვის და აღწერს Python-ის რეზერვირებულ სიტყვებს, რას ნიშნავს ისინი და როგორ გამოიყენება.

---

## რა არის რეზერვირებული სიტყვები?

**რეზერვირებული სიტყვები** (Reserved Words ან Keywords) Python-ში არის წინასწარ განსაზღვრული სიტყვები, რომლებსაც ენაში სპეციალური მნიშვნელობა აქვთ.  
ისინი გამოიყენება პროგრამის სტრუქტურის განსასაზღვრად და ვერ გამოვიყენებთ როგორც ცვლადის სახელს.

**მაგალითი (არასწორი კოდი):**
```python
class = 10   # შეცდომა, რადგან 'class' არის რეზერვირებული სიტყვა
```

---

## Python-ის რეზერვირებული სიტყვების სია (Python 3.10+)

```
False      await      else       import     pass
None       break      except     in         raise
True       class      finally    is         return
and        continue   for        lambda     try
as         def        from       nonlocal   while
assert     del        global     not        with
async      elif       if         or         yield
```

---

## მაგალითები გამოყენების

### 1. `if`, `elif`, `else`
გამოიყენება პირობითი კონსტრუქციებისთვის.
```python
x = 5
if x > 0:
    print("დადებითი")
elif x < 0:
    print("უარყოფითი")
else:
    print("ნული")
```

### 2. `for` და `while`
გამოიყენება ციკლებისთვის.
```python
for i in range(3):
    print(i)

count = 0
while count < 3:
    print(count)
    count += 1
```

### 3. `def` და `return`
ფუნქციის განსაზღვრა და მნიშვნელობის დაბრუნება.
```python
def square(x):
    return x * x

print(square(4))  # 16
```

### 4. `class`
კლასის განსაზღვრა ობიექტზე ორიენტირებულ პროგრამირებაში.
```python
class Person:
    def __init__(self, name):
        self.name = name

p = Person("Nino")
print(p.name)
```

### 5. `try`, `except`, `finally`
გამონაკლისების დამუშავება.
```python
try:
    x = 1 / 0
except ZeroDivisionError:
    print("გაყოფა ნულზე!")
finally:
    print("ეს ყოველთვის შესრულდება")
```

---

## დასკვნა

- რეზერვირებული სიტყვები არის Python-ის „ფუნდამენტური აგურები“.  
- მათ ენაში აქვთ სპეციალური მნიშვნელობა და **ვერ გამოვიყენებთ როგორც ცვლადის სახელს**.  
- სწორი გამოყენება აუცილებელია პროგრამის სწორი მუშაობისთვის.
