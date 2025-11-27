
# თემა: მონაცემთა სიები (List). ოპერაციები სიებზე, მრავალგანზომილებიანი სიები, Tuple მონაცემთა ტიპი

## 1. შესავალი — მონაცემთა სტრუქტურების როლი Python-ში
Python გთავაზობს რამდენიმე ძირითადი მონაცემთა ტიპს: რიცხვები, სტრიქონები, ლოგიკური მნიშვნელობები.  
მონაცემთა ორგანიზებისთვის კი უმნიშვნელოვანესია კონტეინერები—მათ შორის ყველაზე გამოყენებადი არის სიები (Lists) და ტუფლები (Tuples - წყვილები - კორტეჟი).

- მონაცემთა სიები (Lists) არის Python-ის ერთ-ერთი ყველაზე მნიშვნელოვანი და ხშირად გამოყენებადი მონაცემთა სტრუქტურა. სიები საშუალებას გვაძლევს შევინახოთ მრავალი მნიშვნელობა ერთ ცვლადში და ეფექტურად ვიმუშაოთ მონაცემთა კოლექციებზე.

- სიების გამოყენებით შეგვიძლია: <br>
შევინახოთ დაკავშირებული მონაცემები ერთად <br>
ვიმუშაოთ დიდი რაოდენობის ინფორმაციაზე <br>
დავაორგანიზოთ და დავაწესრიგოთ მონაცემები <br>
შევქმნათ უფრო რთული მონაცემთა სტრუქტურები <br>


## 2. სიები (List)

### 2.1 სიის შექმნა
```python
numbers = [10, 20, 30]
mixed = [1, "hello", True, 3.14]
empty = []
```

### 2.2 ელემენტებზე წვდომა
```python
numbers = [10, 20, 30]
print(numbers[0])
print(numbers[2])
print(numbers[-1])
```

## 3. ძირითადი ოპერაციები სიებზე

### 3.1 ელემენტის დამატება
```python
lst.append(4)
lst.insert(1, "Python")
a.extend(b)
```

### 3.2 ელემენტის ამოშლა
```python
lst.remove(2)
lst.pop(1)
del lst[1:3]
```

### 3.3 სიების დახარისხება
```python
nums.sort()
nums.sort(reverse=True)
sorted_list = sorted(nums)
```

## 4. მრავალგანზომილებიანი სიები
```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
```

## 5. Tuple მონაცემთა ტიპი
```python
t = (10, 20, 30)
print(t[0])
```

## 6. პრაქტიკული მაგალითები

### მაგალითი 1 — მომხმარებლიდან მიღებული მონაცემების სიის შექმნა
```python
names = []
for i in range(3):
    name = input("შეიყვანე სახელი: ")
    names.append(name)
print(names)
```

### მაგალითი 2 — max/min/average
```python
nums = [10, 20, 5, 40]
print(max(nums), min(nums), sum(nums)/len(nums))
```

### მაგალითი 3 — Matrix ბეჭდვა
```python
for row in matrix:
    print("სტრიქონი:", row)
```

```python
#1. სიის შექმნა


#1.1 ცარიელი სიის შექმნა
# ცარიელი სიის შექმნა კვადრატული ფრჩხილებით
my_list = []

# ცარიელი სიის შექმნა list() ფუნქციით

my_list2 = list()

print(my_list)   # []
print(my_list2)  # []
#1.2 მნიშვნელობებით სიის შექმნა
# რიცხვების სია
numbers = [1, 2, 3, 4, 5]

# სტრიქონების სია
fruits = ["ვაშლი", "მსხალი", "ბანანი", "ატამი"]

# შერეული ტიპების სია
mixed_list = [1, "ტექსტი", 3.14, True, None]

# სია სიაში (ჩადგმული სია)
nested_list = [1, 2, [3, 4, 5], 6]

print(numbers)      # [1, 2, 3, 4, 5]
print(fruits)       # ['ვაშლი', 'მსხალი', 'ბანანი', 'ატამი']
print(mixed_list)   # [1, 'ტექსტი', 3.14, True, None]
1.3 სიის შექმნა range() ფუნქციით
python# 0-დან 9-მდე რიცხვების სია
numbers = list(range(10))
print(numbers)  # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# 1-დან 10-მდე რიცხვების სია
numbers2 = list(range(1, 11))
print(numbers2)  # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# ყოველი მეორე რიცხვი 0-დან 20-მდე
even_numbers = list(range(0, 21, 2))
print(even_numbers)  # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
2. სიის ელემენტებზე წვდომა (Indexing)
pythonfruits = ["ვაშლი", "მსხალი", "ბანანი", "ატამი", "საზამთრო"]

# პირველი ელემენტი (ინდექსი 0)
print(fruits[0])   # ვაშლი

# მესამე ელემენტი (ინდექსი 2)
print(fruits[2])   # ბანანი

# ბოლო ელემენტი (უარყოფითი ინდექსი)
print(fruits[-1])  # საზამთრო

# ბოლოდან მეორე
print(fruits[-2])  # ატამი

# სიის სიგრძე
print(len(fruits))  # 5
2.1 Slicing (სიის ნაწილის ამოღება)
pythonnumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# პირველი 3 ელემენტი
print(numbers[0:3])   # [0, 1, 2]

# ინდექსიდან 2 ინდექსამდე 7
print(numbers[2:7])   # [2, 3, 4, 5, 6]

# ინდექსიდან 5 ბოლომდე
print(numbers[5:])    # [5, 6, 7, 8, 9]

# დასაწყისიდან ინდექსამდე 4
print(numbers[:4])    # [0, 1, 2, 3]

# ყოველი მეორე ელემენტი
print(numbers[::2])   # [0, 2, 4, 6, 8]

# სიის შებრუნება
print(numbers[::-1])  # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
3. ელემენტის დამატება
3.1 append() - ბოლოში დამატება
pythonfruits = ["ვაშლი", "მსხალი"]
print("თავდაპირველი სია:", fruits)

fruits.append("ბანანი")
print("append-ის შემდეგ:", fruits)

fruits.append("ატამი")
print("კიდევ append:", fruits)
# შედეგი: ['ვაშლი', 'მსხალი', 'ბანანი', 'ატამი']
3.2 insert() - კონკრეტულ ადგილას დამატება
pythonfruits = ["ვაშლი", "ბანანი", "ატამი"]
print("თავდაპირველი:", fruits)

# ინდექსზე 1 ჩასმა
fruits.insert(1, "მსხალი")
print("insert-ის შემდეგ:", fruits)
# შედეგი: ['ვაშლი', 'მსხალი', 'ბანანი', 'ატამი']

# დასაწყისში ჩასმა
fruits.insert(0, "საზამთრო")
print("დასაწყისში:", fruits)
# შედეგი: ['საზამთრო', 'ვაშლი', 'მსხალი', 'ბანანი', 'ატამი']
3.3 extend() - სხვა სიის დამატება
pythonlist1 = [1, 2, 3]
list2 = [4, 5, 6]

print("თავდაპირველი list1:", list1)

list1.extend(list2)
print("extend-ის შემდეგ:", list1)
# შედეგი: [1, 2, 3, 4, 5, 6]

# შედარება: append vs extend
list3 = [1, 2, 3]
list4 = [1, 2, 3]

list3.append([4, 5])
list4.extend([4, 5])

print("append:", list3)  # [1, 2, 3, [4, 5]]
print("extend:", list4)  # [1, 2, 3, 4, 5]
4. ელემენტის წაშლა/ამოშლა
4.1 remove() - მნიშვნელობით წაშლა
pythonfruits = ["ვაშლი", "მსხალი", "ბანანი", "ატამი", "მსხალი"]

fruits.remove("მსხალი")  # პირველი "მსხალი" წაიშლება
print(fruits)  # ['ვაშლი', 'ბანანი', 'ატამი', 'მსხალი']

# თუ ელემენტი არ არსებობს, მოხდება შეცდომა
try:
    fruits.remove("ყურძენი")
except ValueError:
    print("ელემენტი არ მოიძებნა სიაში!")
4.2 pop() - ინდექსით წაშლა და დაბრუნება
pythonnumbers = [10, 20, 30, 40, 50]

# ბოლო ელემენტის ამოშლა
last = numbers.pop()
print("ამოშლილი:", last)      # 50
print("დარჩენილი სია:", numbers)  # [10, 20, 30, 40]

# კონკრეტული ინდექსის ამოშლა
second = numbers.pop(1)
print("ამოშლილი:", second)     # 20
print("დარჩენილი სია:", numbers)  # [10, 30, 40]
4.3 del - ელემენტის ან სიის წაშლა
pythonfruits = ["ვაშლი", "მსხალი", "ბანანი", "ატამი", "საზამთრო"]

# კონკრეტული ელემენტის წაშლა
del fruits[2]
print(fruits)  # ['ვაშლი', 'მსხალი', 'ატამი', 'საზამთრო']

# რამდენიმე ელემენტის წაშლა (slice)
del fruits[1:3]
print(fruits)  # ['ვაშლი', 'საზამთრო']

# მთელი სიის წაშლა
del fruits
# print(fruits)  # შეცდომა: ცვლადი აღარ არსებობს
4.4 clear() - სიის გასუფთავება
pythonnumbers = [1, 2, 3, 4, 5]
numbers.clear()
print(numbers)  # []
5. სიის დახარისხება (Sorting)
5.1 sort() - სიის დახარისხება (ადგილზე)
python# რიცხვების დახარისხება
numbers = [5, 2, 8, 1, 9, 3]
numbers.sort()
print("ზრდადობით:", numbers)  # [1, 2, 3, 5, 8, 9]

numbers.sort(reverse=True)
print("კლებადობით:", numbers)  # [9, 8, 5, 3, 2, 1]

# სტრიქონების დახარისხება
fruits = ["ბანანი", "ვაშლი", "მსხალი", "ატამი"]
fruits.sort()
print("ანბანის მიხედვით:", fruits)
# ['ატამი', 'ბანანი', 'ვაშლი', 'მსხალი']

# სიგრძის მიხედვით დახარისხება
words = ["ბანანი", "ვაშლი", "მსხალი", "კივი"]
words.sort(key=len)
print("სიგრძით:", words)  # ['კივი', 'ვაშლი', 'ბანანი', 'მსხალი']
5.2 sorted() - ახალი დახარისხებული სიის შექმნა
pythonnumbers = [5, 2, 8, 1, 9, 3]

# ორიგინალი არ იცვლება
sorted_numbers = sorted(numbers)
print("ორიგინალი:", numbers)       # [5, 2, 8, 1, 9, 3]
print("დახარისხებული:", sorted_numbers)  # [1, 2, 3, 5, 8, 9]

# კლებადობით
sorted_desc = sorted(numbers, reverse=True)
print("კლებადობით:", sorted_desc)  # [9, 8, 5, 3, 2, 1]
5.3 reverse() - სიის შებრუნება
pythonnumbers = [1, 2, 3, 4, 5]
numbers.reverse()
print(numbers)  # [5, 4, 3, 2, 1]

# ალტერნატივა - slicing
numbers2 = [1, 2, 3, 4, 5]
reversed_numbers = numbers2[::-1]
print(reversed_numbers)  # [5, 4, 3, 2, 1]
6. სიაში ძებნა და რაოდენობა
6.1 in ოპერატორი - ელემენტის არსებობის შემოწმება
pythonfruits = ["ვაშლი", "მსხალი", "ბანანი", "ატამი"]

if "ბანანი" in fruits:
    print("ბანანი არის სიაში")

if "ყურძენი" not in fruits:
    print("ყურძენი არ არის სიაში")
6.2 index() - ელემენტის ინდექსის პოვნა
pythonfruits = ["ვაშლი", "მსხალი", "ბანანი", "ატამი", "მსხალი"]

# პირველი "მსხალი"-ს ინდექსი
position = fruits.index("მსხალი")
print(position)  # 1

# დიაპაზონში ძებნა
position2 = fruits.index("მსხალი", 2)  # ინდექსიდან 2 დაწყება
print(position2)  # 4

# თუ ელემენტი არ არსებობს
try:
    position = fruits.index("ყურძენი")
except ValueError:
    print("ელემენტი არ მოიძებნა!")
6.3 count() - ელემენტის რაოდენობა
pythonnumbers = [1, 2, 3, 2, 4, 2, 5, 2]

count_2 = numbers.count(2)
print("2-ის რაოდენობა:", count_2)  # 4

count_6 = numbers.count(6)
print("6-ის რაოდენობა:", count_6)  # 0
7. სიებზე სხვა ოპერაციები
7.1 სიების შეერთება
pythonlist1 = [1, 2, 3]
list2 = [4, 5, 6]

# + ოპერატორით
combined = list1 + list2
print(combined)  # [1, 2, 3, 4, 5, 6]

# * ოპერატორით (გამრავლება)
repeated = list1 * 3
print(repeated)  # [1, 2, 3, 1, 2, 3, 1, 2, 3]
7.2 სიის კოპირება
pythonoriginal = [1, 2, 3, 4, 5]

# არასწორი - reference კოპირება
copy1 = original
copy1[0] = 999
print("ორიგინალი:", original)  # [999, 2, 3, 4, 5] - შეიცვალა!

# სწორი - ახალი სიის შექმნა
original = [1, 2, 3, 4, 5]
copy2 = original.copy()
# ან copy2 = original[:]
copy2[0] = 999
print("ორიგინალი:", original)  # [1, 2, 3, 4, 5] - არ შეიცვალა
print("ასლი:", copy2)  # [999, 2, 3, 4, 5]
8. მრავალგანზომილებიანი სიები
8.1 ორგანზომილებიანი სია (მატრიცა)
python# 3x3 მატრიცა
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# ელემენტებზე წვდომა
print(matrix[0][0])  # 1 (პირველი რიგი, პირველი სვეტი)
print(matrix[1][2])  # 6 (მეორე რიგი, მესამე სვეტი)
print(matrix[2][1])  # 8 (მესამე რიგი, მეორე სვეტი)

# რიგების გადარჩევა
print(matrix[0])     # [1, 2, 3] - პირველი რიგი
print(matrix[1])     # [4, 5, 6] - მეორე რიგი
8.2 მატრიცაზე იტერაცია
pythonmatrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# ყველა ელემენტის დაბეჭდვა
for row in matrix:
    for element in row:
        print(element, end=" ")
    print()  # ახალი ხაზი

# ინდექსებით
for i in range(len(matrix)):
    for j in range(len(matrix[i])):
        print(f"matrix[{i}][{j}] = {matrix[i][j]}")
8.3 პრაქტიკული მაგალითი - სტუდენტების ქულები
python# სტუდენტების ქულები 3 გამოცდაზე
grades = [
    [85, 90, 88],  # სტუდენტი 1
    [92, 87, 95],  # სტუდენტი 2
    [78, 85, 80]   # სტუდენტი 3
]

# თითოეული სტუდენტის საშუალო ქულა
for i, student_grades in enumerate(grades, 1):
    average = sum(student_grades) / len(student_grades)
    print(f"სტუდენტი {i}: საშუალო = {average:.2f}")

# თითოეული გამოცდის საშუალო ქულა
for exam in range(3):
    exam_total = sum(grades[student][exam] for student in range(3))
    average = exam_total / 3
    print(f"გამოცდა {exam + 1}: საშუალო = {average:.2f}")
9. Tuple მონაცემთა ტიპი
9.1 Tuple-ის შექმნა
python# Tuple შექმნა ფრჩხილებით
coordinates = (10, 20)
print(coordinates)  # (10, 20)

# Tuple ფრჩხილების გარეშე
point = 5, 15
print(point)  # (5, 15)

# ერთელემენტიანი tuple (მძიმე აუცილებელია!)
single = (42,)
print(type(single))  # <class 'tuple'>

wrong = (42)
print(type(wrong))   # <class 'int'> - ეს tuple არ არის!

# ცარიელი tuple
empty = ()
print(empty)  # ()
9.2 Tuple-ის თვისებები
python# Tuple არის immutable (შეუცვლელი)
coordinates = (10, 20, 30)
print(coordinates[0])  # 10 - წაკითხვა შეიძლება

# coordinates[0] = 100  # TypeError - ცვლილება შეუძლებელია!

# Tuple-ის unpacking
x, y, z = coordinates
print(f"x={x}, y={y}, z={z}")  # x=10, y=20, z=30

# მნიშვნელობების გაცვლა
a = 5
b = 10
a, b = b, a
print(f"a={a}, b={b}")  # a=10, b=5
9.3 Tuple vs List - როდის რა გამოვიყენოთ
python# List - როცა მონაცემები იცვლება
shopping_list = ["რძე", "პური", "კვერცხი"]
shopping_list.append("კარაქი")  # OK

# Tuple - როცა მონაცემები უნდა დარჩეს უცვლელი
coordinates = (40.7128, -74.0060)  # ნიუ იორკის კოორდინატები
# coordinates[0] = 0  # შეცდომა - არ უნდა შეიცვალოს!

# Tuple როგორც dictionary-ის key
locations = {
    (40.7128, -74.0060): "ნიუ იორკი",
    (51.5074, -0.1278): "ლონდონი"
}
print(locations[(40.7128, -74.0060)])  # ნიუ იორკი
9.4 Tuple-ის მეთოდები
pythonnumbers = (1, 2, 3, 2, 4, 2, 5)

# count() - ელემენტის რაოდენობა
print(numbers.count(2))  # 3

# index() - ელემენტის ინდექსი
print(numbers.index(4))  # 4

# len() - სიგრძე
print(len(numbers))  # 7

# min() და max()
print(min(numbers))  # 1
print(max(numbers))  # 5
10. List Comprehension (სიის გენერაცია)
10.1 ძირითადი სინტაქსი
python# ტრადიციული გზა
squares = []
for x in range(1, 11):
    squares.append(x ** 2)
print(squares)  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# List comprehension
squares = [x ** 2 for x in range(1, 11)]
print(squares)  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
10.2 პირობით List Comprehension
python# მხოლოდ ლუწი რიცხვები
evens = [x for x in range(20) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# დადებითი რიცხვების კვადრატები
numbers = [-5, -2, 0, 3, 7, -1, 9]
positive_squares = [x ** 2 for x in numbers if x > 0]
print(positive_squares)  # [9, 49, 81]

# სტრიქონების ფილტრაცია
words = ["ვაშლი", "მსხალი", "კივი", "ბანანი", "ატამი"]
long_words = [word for word in words if len(word) > 4]
print(long_words)  # ['მსხალი', 'ბანანი', 'ატამი']
```


## პრაქტიკული ამოცანები
ამოცანა 1: საშუალო ქულის გამოთვლა
შექმენით პროგრამა, რომელიც:

მიიღებს 5 სტუდენტის ქულებს
გამოთვლის თითოეული სტუდენტის საშუალო ქულას
დაბეჭდავს მაქსიმალურ და მინიმალურ ქულებს

ამოცანა 2: სიის ფილტრაცია
მოცემული რიცხვების სიიდან:

ამოშალეთ ყველა უარყოფითი რიცხვი
დაალაგეთ დარჩენილი რიცხვები კლებადობით
დაბეჭდეთ შედეგი

ამოცანა 3: სიტყვების სია
შექმენით პროგრამა, რომელიც:

მიიღებს მომხმარებლისგან სიტყვებს (შეწყვეტა: "stop")
შეინახავს მათ სიაში
დაალაგებს ანბანის მიხედვით
დაბეჭდავს თითოეული სიტყვის სიგრძეს

ამოცანა 4: დუბლიკატების მოძებნა
დაწერეთ ფუნქცია, რომელიც:

მიიღებს რიცხვების სიას
იპოვის ყველა დუბლიკატს
დააბრუნებს დუბლიკატების სიას (თითოეული ერთხელ)

ამოცანა 5: მატრიცის ტრანსპონირება
შექმენით ფუნქცია, რომელიც:

მიიღებს 3x3 მატრიცას
შექმნის ტრანსპონირებულ მატრიცას (რიგები და სვეტები გადაიცვლება)
დააბრუნებს ახალ მატრიცას

ამოცანა 6: ლოტოს რიცხვები
შექმენით პროგრამა, რომელიც:

შექმნის 6 შემთხვევითი რიცხვის სიას (1-დან 49-მდე)
დაალაგებს მათ ზრდადობით
შეამოწმებს დუბლიკატების არსებობას
თუ არის დუბლიკატი, ხელახლა გენერირდება რიცხვები

ამოცანა 7: სტუდენტების რეიტინგი
შექმენით პროგრამა, რომელიც:

შეინახავს სტუდენტების სახელებსა და ქულებს tuple-ების სიაში
დაალაგებს სტუდენტებს ქულების მიხედვით (კლებადობით)
დაბეჭდავს რეიტინგს (ადგილი, სახელი, ქულა)

ამოცანა 8: სიების გაერთიანება
დაწერეთ ფუნქცია, რომელიც:

მიიღებს ორ დალაგებულ სიას
გააერთიანებს მათ ერთ დალაგებულ სიაში
არ გამოიყენოს sort() ან sorted() ფუნქციები

---

!!! tip "რჩევები და საუკეთესო პრაქტიკა"
    გამოიყენეთ სწორი სახელები: items, numbers, students - აშკარა და აღწერილობითი <br>
    List vs Tuple: გამოიყენეთ tuple უცვლელი მონაცემებისთვის <br>
    List Comprehension: მარტივი ოპერაციებისთვის უფრო კომპაქტურია <br>
    Slicing: ეფექტური გზა სიების ნაწილების მისაღებად <br>
    copy(): ყოველთვის გამოიყენეთ სიის დამოუკიდებელი ასლის შესაქმნელად <br>
    in ოპერატორი: სწრაფი გზა ელემენტის არსებობის შესამოწმებლად <br>

---

```python
# ამოცანა 1: საშუალო ქულის გამოთვლა


scores = []
for i in range(5):
    score = float(input(f"მიუთითეთ სტუდენტის {i+1} ქულა: "))
    scores.append(score)

average = sum(scores) / len(scores)
max_score = max(scores)
min_score = min(scores)

print(f"საშუალო ქულა: {average}")
print(f"მაქსიმალური ქულა: {max_score}")
print(f"მინიმალური ქულა: {min_score}")
ამოცანა 2: სიის ფილტრაცია
Pythonnumbers = [10, -5, 23, -8, 0, 15, -3, 7]

positive = [x for x in numbers if x >= 0]
positive.sort(reverse=True)

print(positive)
ამოცანა 3: სიტყვების სია
Pythonwords = []
while True:
    word = input("შეიყვანეთ სიტყვა (ან 'stop' გასაჩერებლად): ")
    if word.lower() == "stop":
        break
    words.append(word)

words.sort()
print("სიტყვები და მათი სიგრძე:")
for w in words:
    print(f"{w} — {len(w)} ასო")
ამოცანა 4: დუბლიკატების მოძებნა
Pythondef find_duplicates(lst):
    seen = set()
    duplicates = set()
    for item in lst:
        if item in seen:
            duplicates.add(item)
        else:
            seen.add(item)
    return list(duplicates)

# მაგალითი
numbers = [1, 2, 3, 4, 2, 5, 1, 6, 3]
print(find_duplicates(numbers))  # [1, 2, 3]
ამოცანა 5: მატრიცის ტრანსპონირება
Pythondef transpose(matrix):
    rows = len(matrix)
    cols = len(matrix[0])
    transposed = [[0 for _ in range(rows)] for _ in range(cols)]
    
    for i in range(rows):
        for j in range(cols):
            transposed[j][i] = matrix[i][j]
    
    return transposed

# მაგალითი
mat = [[1, 2, 3],
       [4, 5, 6],
       [7, 8, 9]]

print(transpose(mat))
# [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
ამოცანა 6: ლოტოს რიცხვები
Pythonimport random

def generate_lotto():
    while True:
        numbers = random.sample(range(1, 50), 6)  # უნიკალური რიცხვები ავტომატურად
        numbers.sort()
        return numbers

lotto = generate_lotto()
print("ლოტოს რიცხვები:", lotto)
ამოცანა 7: სტუდენტების რეიტინგი
Pythonstudents = [
    ("ანა", 85),
    ("გიორგი", 92),
    ("მარიამ", 78),
    ("ლუკა", 95),
    ("თეკლა", 88)
]

# დალაგება ქულების მიხედვით (კლებადი)
sorted_students = sorted(students, key=lambda x: x[1], reverse=True)

print("რეიტინგი:")
for place, (name, score) in enumerate(sorted_students, 1):
    print(f"{place}. {name} — {score} ქულა")

ამოცანა 8: სიების გაერთიანება (merge ორი დალაგებული სიის)
Pythondef merge_sorted(list1, list2):
    result = []
    i = j = 0
    
    while i < len(list1) and j < len(list2):
        if list1[i] <= list2[j]:
            result.append(list1[i])
            i += 1
        else:
            result.append(list2[j])
            j += 1
    
    # დარჩენილი ელემენტების დამატება
    result.extend(list1[i:])
    result.extend(list2[j:])
    
    return result

# მაგალითი
a = [1, 3, 5, 7, 9]
b = [2, 4, 6, 8, 10]
print(merge_sorted(a, b))  # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```


## ამოცანები

შექმენი სია სახელად numbers, რომელიც შეიცავს რიცხვებს 1-დან 10-მდე და დაბეჭდე მისი სიგრძე. <br>
შექმენი სია სახელად colors, რომელიც შეიცავს 3 ფერს, შემდეგ დაამატე მასში ახალი ფერი append მეთოდით და დაბეჭდე განახლებული სია. <br>
შექმენი სია სახელად animals, რომელიც შეიცავს 5 ცხოველის სახელს, შემდეგ ამოიღე მეორე ელემენტი pop მეთოდით და დაბეჭდე დარჩენილი სია. <br>
შექმენი სია სახელად letters, რომელიც შეიცავს ასოებს 'a'-დან 'f'-მდე, შემდეგ გამოიყენე slicing, რომ ამოიღო მეორედან მეოთხე ელემენტამდე და დაბეჭდე შედეგი. <br>
შექმენი მრავალგანზომილებიანი სია სახელად matrix, რომელიც არის 2x3 მატრიცა რიცხვებით (მაგალითად, [[1,2,3],[4,5,6]]), შემდეგ დაბეჭდე მეორე რიგის პირველი ელემენტი. <br>
შექმენი tuple სახელად coordinates, რომელიც შეიცავს ორ რიცხვს (x, y), შემდეგ დაბეჭდე მისი პირველი ელემენტი. <br>
შექმენი tuple სახელად person, რომელიც შეიცავს სახელს, ასაკს და ქალაქს, შემდეგ გამოიყენე unpacking, რომ მიანიჭო ცვლადებს name, age, city და დაბეჭდე ისინი. <br>
შექმენი სია სახელად mixed, რომელიც შეიცავს რიცხვებს და სტრინგებს, შემდეგ გამოიყენე index მეთოდი, რომ იპოვო კონკრეტული ელემენტის პოზიცია და დაბეჭდე იგი. <br>
შექმენი tuple სახელად days, რომელიც შეიცავს კვირის დღეებს, შემდეგ სცადე შეცვლა ერთ-ერთი ელემენტის და დააკომენტარე შეცდომა (იმუტაბილობის დემონსტრაცია). <br>
შექმენი მრავალგანზომილებიანი სია სახელად board, რომელიც წარმოადგენს 3x3 ჭადრაკის დაფას 'X' და 'O' სიმბოლოებით, შემდეგ შეცვალე ერთ-ერთი ელემენტი და დაბეჭდე განახლებული მატრიცა. <br>









ამოხსნები
```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(len(numbers))
```

```python
colors = ['red', 'green', 'blue']
colors.append('yellow')
print(colors)
```

```python
animals = ['dog', 'cat', 'bird', 'fish', 'lion']
animals.pop(1)
print(animals)
```

```python
letters = ['a', 'b', 'c', 'd', 'e', 'f']
sliced = letters[1:4]
print(sliced)
```

```python
matrix = [[1, 2, 3], [4, 5, 6]]
print(matrix[1][0])
```

```python
coordinates = (10, 20)
print(coordinates[0])
```

```python
person = ('John', 30, 'New York')
name, age, city = person
print(name, age, city)
```

```python
mixed = [1, 'apple', 2, 'banana', 3]
position = mixed.index('banana')
print(position)
```

```python
days = ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
# days[0] = 'Sunday'  # ეს გამოიწვევს TypeError-ს, რადგან tuple იმუტაბილია
```

```python
board = [['X', 'O', 'X'], ['O', 'X', 'O'], ['X', 'O', 'X']]
board[1][1] = 'O'
print(board)
```