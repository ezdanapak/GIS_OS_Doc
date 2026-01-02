# Python-ის Built-in ფუნქციები

## შინაარსი
1. [zip() ფუნქცია](#zip-ფუნქცია)
2. [map() ფუნქცია](#map-ფუნქცია)
3. [filter() ფუნქცია](#filter-ფუნქცია)
4. [reduce() ფუნქცია](#reduce-ფუნქცია)
5. [enumerate() ფუნქცია](#enumerate-ფუნქცია)
6. [sorted() და sort()](#sorted-და-sort)
7. [lambda ფუნქციები](#lambda-ფუნქციები)
8. [any() და all()](#any-და-all)
9. [min(), max(), sum()](#min-max-sum)
10. [პრაქტიკული სავარჯიშოები](#პრაქტიკული-სავარჯიშოები)

---

## zip() ფუნქცია

`zip()` აერთიანებს რამდენიმე იტერირებად ობიექტს და აბრუნებს tuple-ების იტერატორს.

### სინტაქსი
```python
zip(*iterables)
```

### ძირითადი მაგალითები

#### მაგალითი 1: ორი სიის გაერთიანება

```python
names = ["გიორგი", "მარიამ", "ნინო"]
ages = [25, 30, 28]

# zip-ის გამოყენება
result = zip(names, ages)
print(list(result))
# შედეგი: [('გიორგი', 25), ('მარიამ', 30), ('ნინო', 28)]
```

#### მაგალითი 2: სამი სიის გაერთიანება

```python
names = ["გიორგი", "მარიამ", "ნინო"]
ages = [25, 30, 28]
cities = ["თბილისი", "ბათუმი", "ქუთაისი"]

for name, age, city in zip(names, ages, cities):
    print(f"{name}, {age} წლის, ცხოვრობს {city}-ში")

# შედეგი:
# გიორგი, 25 წლის, ცხოვრობს თბილისი-ში
# მარიამ, 30 წლის, ცხოვრობს ბათუმი-ში
# ნინო, 28 წლის, ცხოვრობს ქუთაისი-ში
```

#### მაგალითი 3: dict-ის შექმნა

```python
keys = ["სახელი", "ასაკი", "ქალაქი"]
values = ["გიორგი", 25, "თბილისი"]

person = dict(zip(keys, values))
print(person)
# შედეგი: {'სახელი': 'გიორგი', 'ასაკი': 25, 'ქალაქი': 'თბილისი'}
```

#### მაგალითი 4: სხვადასხვა სიგრძის სიები

```python
numbers = [1, 2, 3, 4, 5]
letters = ['a', 'b', 'c']

result = list(zip(numbers, letters))
print(result)
# შედეგი: [(1, 'a'), (2, 'b'), (3, 'c')]
# zip ჩერდება უმოკლესი სიის ბოლოს!
```

#### მაგალითი 5: zip-ის გაუქმება (unzip)

```python
pairs = [('გიორგი', 25), ('მარიამ', 30), ('ნინო', 28)]

names, ages = zip(*pairs)
print(names)  # ('გიორგი', 'მარიამ', 'ნინო')
print(ages)   # (25, 30, 28)
```

#### მაგალითი 6: პარალელური იტერაცია

```python
temperatures_celsius = [0, 10, 20, 30, 40]
temperatures_fahrenheit = [32, 50, 68, 86, 104]

print("ცელსიუსი → ფარენჰაიტი")
for c, f in zip(temperatures_celsius, temperatures_fahrenheit):
    print(f"{c}°C = {f}°F")
```

---

## map() ფუნქცია

`map()` აწვდის ფუნქციას თითოეულ ელემენტს იტერირებად ობიექტში და აბრუნებს შედეგების იტერატორს.

### სინტაქსი
```python
map(function, iterable, ...)
```

### ძირითადი მაგალითები

#### მაგალითი 1: რიცხვების კვადრატში აყვანა

```python
numbers = [1, 2, 3, 4, 5]

def square(x):
    return x ** 2

result = map(square, numbers)
print(list(result))
# შედეგი: [1, 4, 9, 16, 25]
```

#### მაგალითი 2: lambda-სთან ერთად

```python
numbers = [1, 2, 3, 4, 5]

result = map(lambda x: x ** 2, numbers)
print(list(result))
# შედეგი: [1, 4, 9, 16, 25]
```

#### მაგალითი 3: სტრიქონების გარდაქმნა

```python
words = ["python", "javascript", "ruby"]

result = map(str.upper, words)
print(list(result))
# შედეგი: ['PYTHON', 'JAVASCRIPT', 'RUBY']
```

#### მაგალითი 4: სტრიქონიდან int-ში გარდაქმნა

```python
string_numbers = ["1", "2", "3", "4", "5"]

result = map(int, string_numbers)
numbers = list(result)
print(numbers)
# შედეგი: [1, 2, 3, 4, 5]
print(sum(numbers))  # 15
```

#### მაგალითი 5: რამდენიმე სია

```python
list1 = [1, 2, 3, 4]
list2 = [10, 20, 30, 40]

# ორი რიცხვის შეკრება
result = map(lambda x, y: x + y, list1, list2)
print(list(result))
# შედეგი: [11, 22, 33, 44]
```

#### მაგალითი 6: რთული მაგალითი - ტემპერატურის კონვერტაცია

```python
celsius = [0, 10, 20, 30, 40]

def celsius_to_fahrenheit(c):
    return (c * 9/5) + 32

fahrenheit = list(map(celsius_to_fahrenheit, celsius))
print(fahrenheit)
# შედეგი: [32.0, 50.0, 68.0, 86.0, 104.0]
```

#### მაგალითი 7: dict-ებთან მუშაობა

```python
students = [
    {"name": "გიორგი", "grade": 85},
    {"name": "მარიამ", "grade": 92},
    {"name": "ნინო", "grade": 78}
]

names = list(map(lambda s: s["name"], students))
print(names)
# შედეგი: ['გიორგი', 'მარიამ', 'ნინო']

# ქულების გაზრდა 5 პუნქტით
updated = list(map(lambda s: {**s, "grade": s["grade"] + 5}, students))
print(updated)
```

---

## filter() ფუნქცია

`filter()` აბრუნებს იტერატორს, რომელიც შეიცავს მხოლოდ იმ ელემენტებს, რომლებისთვისაც ფუნქცია აბრუნებს True-ს.

### სინტაქსი
```python
filter(function, iterable)
```

### ძირითადი მაგალითები

#### მაგალითი 1: კენტი რიცხვების გაფილტვრა

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

def is_odd(n):
    return n % 2 != 0

odd_numbers = list(filter(is_odd, numbers))
print(odd_numbers)
# შედეგი: [1, 3, 5, 7, 9]
```

#### მაგალითი 2: lambda-სთან ერთად

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
print(even_numbers)
# შედეგი: [2, 4, 6, 8, 10]
```

#### მაგალითი 3: დადებითი რიცხვები

```python
numbers = [-5, -2, 0, 3, 7, -1, 9]

positive = list(filter(lambda x: x > 0, numbers))
print(positive)
# შედეგი: [3, 7, 9]
```

#### მაგალითი 4: სტრიქონების გაფილტვრა

```python
words = ["python", "is", "awesome", "and", "powerful"]

# 5-ზე მეტი სიმბოლოს მქონე სიტყვები
long_words = list(filter(lambda w: len(w) > 5, words))
print(long_words)
# შედეგი: ['python', 'awesome', 'powerful']
```

#### მაგალითი 5: None მნიშვნელობების ამოღება

```python
values = [1, None, 3, None, 5, 0, 7]

# None-ების ამოღება (filter(None, ...) აშორებს False-ად მიჩნეულ მნიშვნელობებს)
filtered = list(filter(None, values))
print(filtered)
# შედეგი: [1, 3, 5, 7]
# ყურადღება: 0 ასევე წაიშალა, რადგან False-ია!

# უკეთესი ვარიანტი მხოლოდ None-ების ამოსაღებად:
filtered = list(filter(lambda x: x is not None, values))
print(filtered)
# შედეგი: [1, 3, 5, 0, 7]
```

#### მაგალითი 6: სტუდენტების გაფილტვრა

```python
students = [
    {"name": "გიორგი", "grade": 85},
    {"name": "მარიამ", "grade": 92},
    {"name": "ნინო", "grade": 78},
    {"name": "დავით", "grade": 65},
    {"name": "ანა", "grade": 95}
]

# 80-ზე მეტი ქულის მქონე სტუდენტები
top_students = list(filter(lambda s: s["grade"] >= 80, students))

for student in top_students:
    print(f"{student['name']}: {student['grade']}")

# შედეგი:
# გიორგი: 85
# მარიამ: 92
# ანა: 95
```

#### მაგალითი 7: რთული პირობა

```python
numbers = list(range(1, 21))

# რიცხვები, რომლებიც იყოფა 3-ზე ან 5-ზე, მაგრამ არა ორივეზე
special = list(filter(lambda x: (x % 3 == 0 or x % 5 == 0) and not (x % 3 == 0 and x % 5 == 0), numbers))
print(special)
# შედეგი: [3, 5, 6, 9, 10, 12, 18, 20]
```

---

## reduce() ფუნქცია

`reduce()` აწვდის ფუნქციას წყვილებს და აბრუნებს ერთ მნიშვნელობას. სათავოდ უნდა დავაიმპორტოთ `functools`-იდან.

### სინტაქსი
```python
from functools import reduce
reduce(function, iterable[, initializer])
```

### ძირითადი მაგალითები

#### მაგალითი 1: რიცხვების ჯამი

```python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

def add(x, y):
    return x + y

result = reduce(add, numbers)
print(result)  # 15

# ანუ: ((((1 + 2) + 3) + 4) + 5) = 15
```

#### მაგალითი 2: lambda-სთან ერთად

```python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# ჯამი
sum_result = reduce(lambda x, y: x + y, numbers)
print(f"ჯამი: {sum_result}")  # 15

# ნამრავლი
product = reduce(lambda x, y: x * y, numbers)
print(f"ნამრავლი: {product}")  # 120
```

#### მაგალითი 3: მაქსიმალური მნიშვნელობის პოვნა

```python
from functools import reduce

numbers = [34, 12, 78, 23, 90, 45]

maximum = reduce(lambda x, y: x if x > y else y, numbers)
print(f"მაქსიმუმი: {maximum}")  # 90
```

#### მაგალითი 4: საწყისი მნიშვნელობა

```python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# საწყისი მნიშვნელობა 10
result = reduce(lambda x, y: x + y, numbers, 10)
print(result)  # 25 (10 + 1 + 2 + 3 + 4 + 5)
```

#### მაგალითი 5: სტრიქონების გაერთიანება

```python
from functools import reduce

words = ["Python", "არის", "მძლავრი", "ენა"]

sentence = reduce(lambda x, y: x + " " + y, words)
print(sentence)
# შედეგი: Python არის მძლავრი ენა
```

#### მაგალითი 6: რთული მაგალითი - ფაქტორიალი

```python
from functools import reduce

def factorial(n):
    return reduce(lambda x, y: x * y, range(1, n + 1))

print(f"5! = {factorial(5)}")   # 120
print(f"7! = {factorial(7)}")   # 5040
```

---

## enumerate() ფუნქცია

`enumerate()` აბრუნებს იტერატორს tuple-ებით (index, value).

### სინტაქსი
```python
enumerate(iterable, start=0)
```

### ძირითადი მაგალითები

#### მაგალითი 1: ძირითადი გამოყენება

```python
fruits = ["ვაშლი", "ბანანი", "ატამი"]

for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# შედეგი:
# 0: ვაშლი
# 1: ბანანი
# 2: ატამი
```

#### მაგალითი 2: საწყისი ინდექსი

```python
fruits = ["ვაშლი", "ბანანი", "ატამი"]

for index, fruit in enumerate(fruits, start=1):
    print(f"{index}. {fruit}")

# შედეგი:
# 1. ვაშლი
# 2. ბანანი
# 3. ატამი
```

#### მაგალითი 3: dict-ის შექმნა

```python
fruits = ["ვაშლი", "ბანანი", "ატამი"]

fruit_dict = dict(enumerate(fruits, start=1))
print(fruit_dict)
# შედეგი: {1: 'ვაშლი', 2: 'ბანანი', 3: 'ატამი'}
```

#### მაგალითი 4: პოზიციის პოვნა

```python
names = ["გიორგი", "მარიამ", "ნინო", "დავით"]
search_name = "ნინო"

for index, name in enumerate(names):
    if name == search_name:
        print(f"{search_name} არის პოზიციაზე {index}")
        break
# შედეგი: ნინო არის პოზიციაზე 2
```

#### მაგალითი 5: რამდენიმე სიის ერთდროული იტერაცია

```python
names = ["გიორგი", "მარიამ", "ნინო"]
ages = [25, 30, 28]

for i, name in enumerate(names):
    print(f"{i+1}. {name} - {ages[i]} წლის")

# შედეგი:
# 1. გიორგი - 25 წლის
# 2. მარიამ - 30 წლის
# 3. ნინო - 28 წლის
```

---

## sorted() და sort()

### sorted() - ახალი დალაგებული სიის დაბრუნება

```python
# ძირითადი გამოყენება
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
sorted_numbers = sorted(numbers)
print(sorted_numbers)  # [1, 1, 2, 3, 4, 5, 6, 9]
print(numbers)  # [3, 1, 4, 1, 5, 9, 2, 6] - ორიგინალი უცვლელია
```

#### მაგალითი 1: კლებადი თანმიმდევრობა

```python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
sorted_desc = sorted(numbers, reverse=True)
print(sorted_desc)  # [9, 6, 5, 4, 3, 2, 1, 1]
```

#### მაგალითი 2: სტრიქონების დალაგება

```python
words = ["python", "javascript", "ruby", "go", "rust"]

# ანბანის მიხედვით
sorted_words = sorted(words)
print(sorted_words)
# შედეგი: ['go', 'javascript', 'python', 'ruby', 'rust']

# სიგრძის მიხედვით
sorted_by_length = sorted(words, key=len)
print(sorted_by_length)
# შედეგი: ['go', 'ruby', 'rust', 'python', 'javascript']
```

#### მაგალითი 3: dict-ების დალაგება

```python
students = [
    {"name": "გიორგი", "grade": 85},
    {"name": "მარიამ", "grade": 92},
    {"name": "ნინო", "grade": 78},
    {"name": "დავით", "grade": 95}
]

# ქულის მიხედვით
sorted_by_grade = sorted(students, key=lambda s: s["grade"], reverse=True)

for student in sorted_by_grade:
    print(f"{student['name']}: {student['grade']}")

# შედეგი:
# დავით: 95
# მარიამ: 92
# გიორგი: 85
# ნინო: 78
```

#### მაგალითი 4: tuple-ების დალაგება

```python
data = [("გიორგი", 25), ("მარიამ", 30), ("ნინო", 28)]

# პირველი ელემენტის მიხედვით (default)
sorted_data = sorted(data)
print(sorted_data)

# მეორე ელემენტის მიხედვით
sorted_by_age = sorted(data, key=lambda x: x[1])
print(sorted_by_age)
# შედეგი: [('გიორგი', 25), ('ნინო', 28), ('მარიამ', 30)]
```

### sort() - სიის ადგილზე დალაგება

```python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
numbers.sort()
print(numbers)  # [1, 1, 2, 3, 4, 5, 6, 9]
# ორიგინალი შეიცვალა!
```

---

## lambda ფუნქციები

`lambda` არის ანონიმური (უსახელო) ფუნქცია ერთი გამოსახულებისთვის.

### სინტაქსი
```python
lambda arguments: expression
```

### ძირითადი მაგალითები

#### მაგალითი 1: მარტივი lambda

```python
# ჩვეულებრივი ფუნქცია
def square(x):
    return x ** 2

# lambda-ს გამოყენებით
square_lambda = lambda x: x ** 2

print(square(5))         # 25
print(square_lambda(5))  # 25
```

#### მაგალითი 2: რამდენიმე არგუმენტი

```python
add = lambda x, y: x + y
multiply = lambda x, y: x * y
power = lambda x, y: x ** y

print(add(3, 5))       # 8
print(multiply(3, 5))  # 15
print(power(2, 3))     # 8
```

#### მაგალითი 3: პირობითი გამოსახულება

```python
# მაქსიმუმის პოვნა
max_value = lambda x, y: x if x > y else y
print(max_value(10, 20))  # 20

# კენტი/ლუწი
is_even = lambda x: "ლუწი" if x % 2 == 0 else "კენტი"
print(is_even(7))   # კენტი
print(is_even(10))  # ლუწი
```

#### მაგალითი 4: map-თან ერთად

```python
numbers = [1, 2, 3, 4, 5]

# კვადრატები
squares = list(map(lambda x: x ** 2, numbers))
print(squares)  # [1, 4, 9, 16, 25]

# გაორმაგება
doubled = list(map(lambda x: x * 2, numbers))
print(doubled)  # [2, 4, 6, 8, 10]
```

#### მაგალითი 5: filter-თან ერთად

```python
numbers = list(range(1, 11))

# ლუწი რიცხვები
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4, 6, 8, 10]

# 5-ზე მეტი
greater = list(filter(lambda x: x > 5, numbers))
print(greater)  # [6, 7, 8, 9, 10]
```

#### მაგალითი 6: sorted-თან ერთად

```python
words = ["python", "is", "awesome", "and", "powerful"]

# სიგრძის მიხედვით
sorted_words = sorted(words, key=lambda w: len(w))
print(sorted_words)
# შედეგი: ['is', 'and', 'python', 'awesome', 'powerful']

# ბოლო ასოს მიხედვით
sorted_last = sorted(words, key=lambda w: w[-1])
print(sorted_last)
# შედეგი: ['and', 'awesome', 'powerful', 'is', 'python']
```

---

## any() და all()

### any() - True თუ ერთი მაინც True-ა

```python
# ძირითადი გამოყენება
values = [False, False, True, False]
print(any(values))  # True

# ყველა False
values = [False, False, False]
print(any(values))  # False

# ყველა True
values = [True, True, True]
print(any(values))  # True
```

#### any() მაგალითები

```python
# რიცხვები
numbers = [0, 0, 5, 0]
print(any(numbers))  # True (5 არის True)

# არის თუ არა დადებითი რიცხვი
numbers = [-5, -2, -3, -1]
print(any(n > 0 for n in numbers))  # False

numbers = [-5, 3, -3, -1]
print(any(n > 0 for n in numbers))  # True

# სტრიქონები
words = ["python", "java", "ruby"]
print(any(len(w) > 5 for w in words))  # True (python)
```

### all() - True თუ ყველა True-ა

```python
# ძირითადი გამოყენება
values = [True, True, True]
print(all(values))  # True

# ერთი False
values = [True, False, True]
print(all(values))  # False

# ყველა False
values = [False, False, False]
print(all(values))  # False
```

#### all() მაგალითები

```python
# ყველა დადებითია?
numbers = [1, 2, 3, 4, 5]
print(all(n > 0 for n in numbers))  # True

numbers = [1, 2, -3, 4, 5]
print(all(n > 0 for n in numbers))  # False

# ყველა სიტყვა იწყება "p"-ით?
words = ["python", "programming", "pip"]
print(all(w.startswith("p") for w in words))  # True

# ყველა რიცხვი ლუწია?
numbers = [2, 4, 6, 8, 10]
print(all(n % 2 == 0 for n in numbers))  # True
```

---

## min(), max(), sum()

### min() - მინიმალური მნიშვნელობა

```python
numbers = [34, 12, 78, 23, 90, 45]
print(min(numbers))  # 12

# სტრიქონები (ანბანის მიხედვით)
words = ["python", "java", "ruby"]
print(min(words))  # 'java'

# key პარამეტრი
words = ["python", "is", "awesome"]
shortest = min(words, key=len)
print(shortest)  # 'is'

# dict-ები
students = [
    {"name": "გიორგი", "grade": 85},
    {"name": "ნინო", "grade": 78},
    {"name": "მარიამ", "grade": 92}
]
lowest = min(students, key=lambda s: s["grade"])
print(f"ყველაზე დაბალი ქულა: {lowest['name']} - {lowest['grade']}")
```

### max() - მაქსიმალური მნიშვნელობა

```python
numbers = [34, 12, 78, 23, 90, 45]
print(max(numbers))  # 90

# key პარამეტრი
words = ["python", "is", "awesome"]
longest = max(words, key=len)
print(longest)  # 'awesome'

# რამდენიმე არგუმენტი
print(max(10, 20, 5, 30, 15))  # 30
```

### sum() - რიცხვების ჯამი

```python
numbers = [1, 2, 3, 4, 5]
print(sum(numbers))  # 15

# საწყისი მნიშვნელობა
print(sum(numbers, 10))  # 25

# საშუალოს გამოთვლა
average = sum(numbers) / len(numbers)
print(f"საშუალო: {average}")  # 3.0

# ქულების ჯამი
students = [
    {"name": "გიორგი", "grade": 85},
    {"name": "მარიამ", "grade": 92},
    {"name": "ნინო", "grade": 78}
]
total = sum(s["grade"] for s in students)
print(f"ჯამური ქულა: {total}")  # 255
```

---

## პრაქტიკული სავარჯიშოები

### ამოცანა 1: სტუდენტების მონაცემთა დამუშავება

შექმენით პროგრამა, რომელიც დაამუშავებს სტუდენტების მონაცემებს.

**ამოხსნა:**

```python
students = [
    {"name": "გიორგი", "grades": [85, 90, 78, 92]},
    {"name": "მარიამ", "grades": [92, 88, 95, 90]},
    {"name": "ნინო", "grades": [78, 82, 75, 80]},
    {"name": "დავით", "grades": [95, 92, 98, 94]}
]

# 1. საშუალო ქულების დამატება
students_with_avg = list(map(
    lambda s: {**s, "average": sum(s["grades"]) / len(s["grades"])},
    students
))

# 2. საშუალოს მიხედვით დალაგება
sorted_students = sorted(students_with_avg, key=lambda s: s["average"], reverse=True)

# 3. მხოლოდ 85-ზე მეტი საშუალო
top_students = list(filter(lambda s: s["average"] >= 85, sorted_students))

print("=== საუკეთესო სტუდენტები (საშუალო ≥ 85) ===")
for i, student in enumerate(top_students, 1):
    print(f"{i}. {student['name']}: {student['average']:.2f}")

# შედეგი:
# === საუკეთესო სტუდენტები (საშუალო ≥ 85) ===
# 1. დავით: 94.75
# 2. მარიამ: 91.25
# 3. გიორგი: 86.25
```

---

### ამოცანა 2: ტემპერატურების ანალიზი

დაამუშავეთ ტემპერატურების მონაცემები.

**ამოხსნა:**

```python
# ტემპერატურები ცელსიუსში (7 დღის)
temperatures_c = [15, 18, 22, 19, 25, 28, 23]
days = ["ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი", "კვირა"]

# 1. ცელსიუსიდან ფარენჰაიტში
temperatures_f = list(map(lambda c: (c * 9/5) + 32, temperatures_c))

# 2. დღეებთან დაწყვილება
temp_data = list(zip(days, temperatures_c, temperatures_f))

# 3. თბილი დღეები (>20°C)
warm_days = list(filter(lambda t: t[1] > 20, temp_data))

print("=== ყველა დღე ===")
for day, c, f in temp_data:
    print(f"{day}: {c}°C = {f:.1f}°F")

print("\n=== თბილი დღეები (>20°C) ===")
for day, c, f in warm_days:
    print(f"{day}: {c}°C")

# სტატისტიკა
print(f"\n=== სტატისტიკა ===")
print(f"საშუალო: {sum(temperatures_c) / len(temperatures_c):.1f}°C")
print(f"მინიმუმი: {min(temperatures_c)}°C")
print(f"მაქსიმუმი: {max(temperatures_c)}°C")
print(f"თბილი დღეები: {len(warm_days)} დღე")
```

---

### ამოცანა 3: პროდუქტების მართვა

შექმენით პროდუქტების მართვის სისტემა.

**ამოხსნა:**

```python
products = [
    {"name": "ლეპტოპი", "price": 1200, "quantity": 5, "category": "ელექტრონიკა"},
    {"name": "მაუსი", "price": 25, "quantity": 50, "category": "აქსესუარები"},
    {"name": "კლავიატურა", "price": 75, "quantity": 30, "category": "აქსესუარები"},
    {"name": "მონიტორი", "price": 300, "quantity": 15, "category": "ელექტრონიკა"},
    {"name": "ყურსასმენი", "price": 50, "quantity": 40, "category": "აქსესუარები"}
]

print("=== 1. ჯამური ღირებულება ===")
# ჯამური ღირებულება თითოეული პროდუქტისთვის
products_with_total = list(map(
    lambda p: {**p, "total_value": p["price"] * p["quantity"]},
    products
))

for p in products_with_total:
    print(f"{p['name']}: {p['total_value']} ლარი")

print("\n=== 2. ძვირი პროდუქტები (>100 ლარი) ===")
# ძვირი პროდუქტები
expensive = list(filter(lambda p: p["price"] > 100, products))
for p in expensive:
    print(f"{p['name']}: {p['price']} ლარი")

print("\n=== 3. ფასის მიხედვით დალაგება ===")
# ფასის მიხედვით დალაგება
sorted_by_price = sorted(products, key=lambda p: p["price"], reverse=True)
for i, p in enumerate(sorted_by_price, 1):
    print(f"{i}. {p['name']}: {p['price']} ლარი")

print("\n=== 4. კატეგორიის მიხედვით ჯამი ===")
# ელექტრონიკის ჯამური ღირებულება
electronics = filter(lambda p: p["category"] == "ელექტრონიკა", products)
electronics_value = sum(p["price"] * p["quantity"] for p in electronics)
print(f"ელექტრონიკა: {electronics_value} ლარი")

print("\n=== 5. მარაგი შემოწმება ===")
# ყველა პროდუქტის მარაგი საკმარისია? (>10)
all_stocked = all(p["quantity"] > 10 for p in products)
print(f"ყველა პროდუქტის მარაგი საკმარისია: {all_stocked}")

# არის თუ არა რომელიმე პროდუქტი, რომლის მარაგიც <10
low_stock = any(p["quantity"] < 10 for p in products)
print(f"არის დაბალი მარაგის პროდუქტი: {low_stock}")
```

---

### ამოცანა 4: სიტყვების ანალიზი

გააანალიზეთ ტექსტი სხვადასხვა კრიტერიუმით.

**ამოხსნა:**

```python
text = """
Python არის მძლავრი პროგრამირების ენა რომელიც გამოიყენება
ვებ დეველოპმენტში მონაცემთა ანალიზში და ხელოვნურ ინტელექტში
"""

# 1. სიტყვებად დაყოფა და გაწმენდა
words = text.lower().split()
words = list(filter(lambda w: len(w) > 2, words))

print(f"=== 1. ძირითადი ინფორმაცია ===")
print(f"სიტყვების რაოდენობა: {len(words)}")
print(f"უნიკალური სიტყვები: {len(set(words))}")

# 2. სიტყვების სიგრძეები
word_lengths = list(map(len, words))
print(f"\n=== 2. სიგრძის სტატისტიკა ===")
print(f"საშუალო სიგრძე: {sum(word_lengths) / len(word_lengths):.1f}")
print(f"უმოკლესი: {min(word_lengths)}")
print(f"უგრძელესი: {max(word_lengths)}")

# 3. გრძელი სიტყვები (>7 სიმბოლო)
long_words = list(filter(lambda w: len(w) > 7, words))
print(f"\n=== 3. გრძელი სიტყვები ===")
print(long_words)

# 4. სიგრძის მიხედვით დალაგება
sorted_words = sorted(set(words), key=len, reverse=True)
print(f"\n=== 4. უგრძელესი სიტყვები ===")
print(sorted_words[:5])

# 5. სიტყვა-სიგრძე წყვილები
word_length_pairs = list(zip(words, word_lengths))
print(f"\n=== 5. პირველი 5 წყვილი ===")
for word, length in word_length_pairs[:5]:
    print(f"{word}: {length} სიმბოლო")

# 6. ყველა სიტყვა >3 სიმბოლოა?
all_long = all(len(w) > 3 for w in words)
print(f"\n=== 6. შემოწმება ===")
print(f"ყველა სიტყვა >3 სიმბოლო: {all_long}")

# არის თუ არა 10+ სიმბოლოს სიტყვა?
has_very_long = any(len(w) >= 10 for w in words)
print(f"არის 10+ სიმბოლოს სიტყვა: {has_very_long}")
```

---

### ამოცანა 5: რთული კომბინაცია - მონაცემთა ანალიზი

გააერთიანეთ ყველა ფუნქცია რთულ ამოცანაში.

**ამოხსნა:**

```python
from functools import reduce

# საწყისი მონაცემები
sales_data = [
    {"month": "იანვარი", "revenue": 12000, "expenses": 8000},
    {"month": "თებერვალი", "revenue": 15000, "expenses": 9000},
    {"month": "მარტი", "revenue": 18000, "expenses": 10000},
    {"month": "აპრილი", "revenue": 14000, "expenses": 8500},
    {"month": "მაისი", "revenue": 20000, "expenses": 11000}
]

print("=== 1. მოგების დამატება ===")
# 1. მოგების გამოთვლა და დამატება
with_profit = list(map(
    lambda d: {**d, "profit": d["revenue"] - d["expenses"]},
    sales_data
))

for data in with_profit:
    print(f"{data['month']}: მოგება = {data['profit']} ლარი")

print("\n=== 2. მომგებიანი თვეები ===")
# 2. მხოლოდ მომგებიანი თვეები (მოგება > 5000)
profitable = list(filter(lambda d: d["profit"] > 5000, with_profit))
print(f"მომგებიანი თვეების რაოდენობა: {len(profitable)}")

print("\n=== 3. საუკეთესო თვე ===")
# 3. ყველაზე მომგებიანი თვე
best_month = max(with_profit, key=lambda d: d["profit"])
print(f"საუკეთესო: {best_month['month']} - {best_month['profit']} ლარი მოგება")

print("\n=== 4. ჯამური მაჩვენებლები ===")
# 4. ჯამური შემოსავალი
total_revenue = reduce(lambda x, y: x + y, map(lambda d: d["revenue"], sales_data))
print(f"ჯამური შემოსავალი: {total_revenue} ლარი")

# ჯამური ხარჯი
total_expenses = sum(d["expenses"] for d in sales_data)
print(f"ჯამური ხარჯი: {total_expenses} ლარი")

# ჯამური მოგება
total_profit = sum(d["profit"] for d in with_profit)
print(f"ჯამური მოგება: {total_profit} ლარი")

print("\n=== 5. საშუალო მაჩვენებლები ===")
# 5. საშუალო მაჩვენებლები
avg_revenue = total_revenue / len(sales_data)
avg_expenses = total_expenses / len(sales_data)
avg_profit = total_profit / len(with_profit)

print(f"საშუალო შემოსავალი: {avg_revenue:.2f} ლარი")
print(f"საშუალო ხარჯი: {avg_expenses:.2f} ლარი")
print(f"საშუალო მოგება: {avg_profit:.2f} ლარი")

print("\n=== 6. შემოწმებები ===")
# 6. ყველა თვე მომგებიანია?
all_profitable = all(d["profit"] > 0 for d in with_profit)
print(f"ყველა თვე მომგებიანია: {all_profitable}")

# არის თუ არა თვე 10000+ მოგებით?
has_high_profit = any(d["profit"] >= 10000 for d in with_profit)
print(f"არის 10000+ მოგების თვე: {has_high_profit}")

print("\n=== 7. დეტალური ანგარიში (დალაგებული მოგების მიხედვით) ===")
# 7. მოგების მიხედვით დალაგება
sorted_data = sorted(with_profit, key=lambda d: d["profit"], reverse=True)

for i, data in enumerate(sorted_data, 1):
    profit_percent = (data["profit"] / data["revenue"]) * 100
    print(f"{i}. {data['month']}: მოგება {data['profit']} ლარი ({profit_percent:.1f}%)")
```

---

## შეჯამება

### ძირითადი ფუნქციები მოკლედ

| ფუნქცია | დანიშნულება | მაგალითი |
|---------|-------------|---------|
| `zip()` | რამდენიმე სიის გაერთიანება | `zip([1,2], ['a','b'])` |
| `map()` | ფუნქციის გამოყენება ყველა ელემენტზე | `map(lambda x: x*2, [1,2,3])` |
| `filter()` | ელემენტების გაფილტვრა | `filter(lambda x: x>0, [-1,2])` |
| `reduce()` | ელემენტების დაყვანა ერთ მნიშვნელობამდე | `reduce(lambda x,y: x+y, [1,2,3])` |
| `enumerate()` | ინდექსი + მნიშვნელობა | `enumerate(['a','b'], start=1)` |
| `sorted()` | დალაგებული სიის შექმნა | `sorted([3,1,2])` |
| `lambda` | ანონიმური ფუნქცია | `lambda x: x**2` |
| `any()` | ერთი მაინც True-ა? | `any([False, True, False])` |
| `all()` | ყველა True-ა? | `all([True, True, True])` |
| `min()` | მინიმალური მნიშვნელობა | `min([1,2,3])` |
| `max()` | მაქსიმალური მნიშვნელობა | `max([1,2,3])` |
| `sum()` | ელემენტების ჯამი | `sum([1,2,3])` |

### როდის რა გამოვიყენოთ?

- **zip()**: როცა გვჭირდება რამდენიმე სიის პარალელური იტერაცია
- **map()**: როცა გვჭირდება ყველა ელემენტზე ერთი და იგივე ოპერაციის შესრულება
- **filter()**: როცა გვჭირდება სიიდან კონკრეტული ელემენტების გამორჩევა
- **reduce()**: როცა გვჭირდება სიის დაყვანა ერთ მნიშვნელობამდე (ჯამი, ნამრავლი, და ა.შ.)
- **enumerate()**: როცა გვჭირდება ელემენტი და მისი ინდექსი
- **lambda**: როცა გვჭირდება მარტივი ერთხელ გამოსაყენებელი ფუნქცია

---

✅ ეს ფუნქციები Python-ის ძალაა - ისინი ხდიან კოდს უფრო კონცენტრირებულს, მარტივს და ეფექტურს!