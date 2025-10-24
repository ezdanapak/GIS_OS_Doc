# 📘 ჩაშენებული ფუნქციები Python-ში  

---

## 🔹 რა არის ჩაშენებული ფუნქციები?

Python-ს აქვს მრავალი **ჩაშენებული (built-in)** ფუნქცია, რომელიც გამოიყენება ყოველდღიურ ამოცანებში  
და არ საჭიროებს დამატებითი მოდულის ჩატვირთვას.

მაგალითად:
```python
x = -10
print(abs(x))  # აბრუნებს რიცხვის აბსოლუტურ მნიშვნელობას → 10

y = 5.8
print(round(y))  # ამრგვალებს → 6
🔹 ძირითადი ჩაშენებული რიცხვითი ფუნქციები
ფუნქცია	აღწერა	მაგალითი	შედეგი
abs(x)	აბრუნებს აბსოლუტურ მნიშვნელობას	abs(-7)	7
pow(x, y)	აყავს x რიცხვი y ხარისხში	pow(2, 3)	8
round(x, n)	ამრგვალებს რიცხვს n ათწილადის სიზუსტით	round(3.14159, 2)	3.14
max(a, b, c)	აბრუნებს მაქსიმალურ მნიშვნელობას	max(5, 8, 2)	8
min(a, b, c)	აბრუნებს მინიმალურ მნიშვნელობას	min(5, 8, 2)	2
sum(list)	ჯამობს სიაში არსებულ რიცხვებს	sum([1, 2, 3])	6

```
## რიცხვით მნიშვნელობებთან სამუშაო ჩაშენებული ფუნქციები, Math მოდული და შემთხვევითი რიცხვები

🧮 Math მოდული
თუ გვჭირდება უფრო რთული მათემატიკური გამოთვლები — ვიყენებთ math მოდულს.
ეს მოდული მოიცავს მრავალ ფუნქციას: √, sin, cos, log, π და ა.შ.

```python
Copy code
import math

print(math.sqrt(16))    # კვადრატული ფესვი → 4.0
print(math.pi)          # პი → 3.141592653589793
print(math.cos(0))      # cos(0) → 1.0
print(math.log(10))     # ბუნებრივი ლოგარითმი → 2.302585...

```

## 📦 Math მოდულის მთავარი ფუნქციები

| ფუნქცია | აღწერა | მაგალითი | შედეგი |
|----------|----------|-----------|---------|
| `math.sqrt(x)` | აბრუნებს ფესვს | `import math`<br>`print(math.sqrt(25))` | `5.0` |
| `math.pow(x, y)` | აყავს `x`-ს `y` ხარისხში | `import math`<br>`print(math.pow(2, 4))` | `16.0` |
| `math.floor(x)` | ამრგვალებს ქვემოთ (მთელამდე) | `import math`<br>`print(math.floor(3.9))` | `3` |
| `math.ceil(x)` | ამრგვალებს ზემოთ (მთელამდე) | `import math`<br>`print(math.ceil(3.1))` | `4` |
| `math.pi` | მუდმივა π | `import math`<br>`print(math.pi)` | `3.1415...` |
| `math.e` | მუდმივა e | `import math`<br>`print(math.e)` | `2.7182...` |




🎲 შემთხვევითი რიცხვები (Random მოდული)
თუ გვინდა შემთხვევითი რიცხვების გენერაცია, გამოვიყენებთ random მოდულს.

```python
import random

print(random.random())       # 0 და 1 შორის შემთხვევითი ათწილადი
print(random.randint(1, 10)) # შემთხვევითი მთელი რიცხვი 1-დან 10-მდე
print(random.choice([2, 4, 6, 8])) # შემთხვევითი არჩევანი სიიდან

```
📦 მოკლე ცხრილი: Random მოდულის ძირითადი ფუნქციები

| ფუნქცია | აღწერა | მაგალითი | შედეგი (მიახლოებითი) |
|----------|----------|-----------|------------------------|
| `random.random()` | აბრუნებს შემთხვევით ათწილად რიცხვს 0-დან 1-მდე. | ```import random print(random.random())``` | 0.7345 |
| `random.randint(a, b)` | აბრუნებს შემთხვევით მთელ რიცხვს `[a, b]` დიაპაზონში (ჩათვლით `b`). | ```import random print(random.randint(5, 15))``` | 11 |
| `random.choice(list)` | აბრუნებს შემთხვევით ელემენტს სიიდან. | ```import random print(random.choice(['a', 'b', 'c']))``` | `'b'` |
| `random.uniform(a, b)` | აბრუნებს შემთხვევით ათწილად რიცხვს `[a, b]` დიაპაზონში. | ```import random print(random.uniform(1, 5))``` | 3.64 |
| `random.shuffle(list)` | ალაგებს სიის ელემენტებს შემთხვევითი წესით (ცვლის თავდაპირველ სიას). | ```import random nums = [1, 2, 3, 4] random.shuffle(nums) print(nums)``` | `[3, 1, 4, 2]` *(შემთხვევითი)* |


🧩 პრაქტიკული ამოცანები
🧠 მარტივი
მომხმარებელს შეეკითხე რიცხვი და დაბეჭდე მისი აბსოლუტური მნიშვნელობა.

იპოვე სამ რიცხვს შორის მაქსიმალური და მინიმალური მნიშვნელობები.

მომხმარებლის მიერ შეყვანილი რიცხვი გაამრგვალე ორი ათწილადი სიზუსტით.

⚙️ საშუალო
გამოთვალე წრის ფართობი: S = π * r^2, სადაც r შეყვანილია მომხმარებლის მიერ.

შექმენი პროგრამა, რომელიც ბეჭდავს შემთხვევით რიცხვს 1-დან 100-მდე.

დაწერე პროგრამა, რომელიც 5 შემთხვევით რიცხვს ბეჭდავს სიაში.



### მომხმარებელს შეეკითხე რიცხვი და დაბეჭდე მისი აბსოლუტური მნიშვნელობა
```python
num = float(input("შეიყვანე რიცხვი: "))
print("აბსოლუტური მნიშვნელობა:", abs(num))
```

---

### იპოვე სამ რიცხვს შორის მაქსიმალური და მინიმალური მნიშვნელობები
```python
a = float(input("შეიყვანე პირველი რიცხვი: "))
b = float(input("შეიყვანე მეორე რიცხვი: "))
c = float(input("შეიყვანე მესამე რიცხვი: "))

print("მაქსიმალური მნიშვნელობა:", max(a, b, c))
print("მინიმალური მნიშვნელობა:", min(a, b, c))
```

---

### მომხმარებლის მიერ შეყვანილი რიცხვი გაამრგვალე ორი ათწილადი სიზუსტით
```python
num = float(input("შეიყვანე ათწილადი რიცხვი: "))
print("დამრგვალებული მნიშვნელობა:", round(num, 2))
```

---

## ⚙️ საშუალო

### გამოთვალე წრის ფართობი: S = π * r^2, სადაც r შეყვანილია მომხმარებლის მიერ
```python
import math

r = float(input("შეიყვანე რადიუსი: "))
S = math.pi * r ** 2
print("წრის ფართობი:", round(S, 2))
```

---

### შექმენი პროგრამა, რომელიც ბეჭდავს შემთხვევით რიცხვს 1-დან 100-მდე
```python
import random

print("შემთხვევითი რიცხვი:", random.randint(1, 100))
```

---

### დაწერე პროგრამა, რომელიც 5 შემთხვევით რიცხვს ბეჭდავს სიაში
```python
import random

nums = [random.randint(1, 100) for _ in range(5)]
print("შემთხვევითი რიცხვების სია:", nums)
```

---

ჩაშენებული ფუნქციები (1-10)

1. აბსოლუტური მნიშვნელობა

```python 
შეიყვანე რიცხვი, გამოთვალე abs
num = int(input("რიცხვი: "))
print(f"აბსოლუტური: {abs(num)}")
```
2. შეკრეგმა
```python 
შეიყვანე 3.14159, შეკრეგმე
pi = 3.14159
print(round(pi, 2))  # 3.14
```
3. მინიმუმი სიიდან
```python
numbers = [5, 2, 8, 1, 9]
print(min(numbers))  # 1
```
4. მაქსიმუმი
```python
print(max(3, 7, 2, 9, 1))  # 9
```
5. ხარისხი
```python
pythonbase = 2
exp = 5
print(pow(base, exp))  # 32
```
6. უარყოფითი → დადებითი
```python
num = -15
print(abs(num))  # 15
```
7. შეყვანის შეკრეგმა
```python
num = float(input("რიცხვი: "))
print(round(num))
```
8. სამი რიცხვიდან მინიმუმი
```python
a, b, c = 4, 1, 7
print(min(a, b, c))  # 1
```
9. ორი რიცხვის შუალედი
```python
a, b = 3, 7
print((a + b) / 2)  # დამრგვალება არაა საჭირო
```
10. კვადრატი
```python
num = 4
print(pow(num, 2))  # 16
```

Math მოდული (11-18) <br>
11. კვადრატული ფესვი
```python
import math
print(math.sqrt(81))  # 9.0
```
12. ციკლის ღერძი
```python
import math
r = 5
print(2 * math.pi * r)  # ~31.4
```
13. ზევით დამრგვალება
```python
import math
print(math.ceil(3.1))  # 4
```
14. ქვემოთ დამრგვალება
```python
import math
print(math.floor(3.9))  # 3
```
15. ფართობი
```python
import math
r = 3
print(math.pi * pow(r, 2))  # ~28.27
```
16. მთელი ნაწილი
```python
import math
print(math.floor(5.89))  # 5
```
17. შეყვანა + ფესვი
```python
import math
num = int(input("რიცხვი: "))
print(math.sqrt(num))
```
18. პი
```python
import math
print(f"Pi = {math.pi:.2f}")
```
შემთხვევითი რიცხვები (19-25) <br>
19. კამათელი
```python
import random
print(random.randint(1, 6))
```
20. რიცხვის გამოცნობა
```python
import random
secret = random.randint(1, 10)
guess = int(input("გამოცანე (1-10): "))
if guess == secret:
    print("სწორია!")

```
21. 3 რიცხვი
```python
import random
for i in range(3):
    print(random.randint(1, 100))
```
22. ლუწი/კენტი
```python
import random
num = random.randint(1, 20)
print(f"{num} - {'ლუწი' if num % 2 == 0 else 'კენტი'}")

```
23. შემთხვევითი არჩევანი
```python
import random
colors = ["წითელი", "ლურჯი", "მწვანე"]
print(random.choice(colors))
```
24. 5 რიცხვის სია
```python
import random
numbers = [random.randint(1, 50) for _ in range(5)]
print(numbers)
```
25. ლოტო
```python
import random
lotto = random.randint(1, 49)
print(f"ლოტოს რიცხვი: {lotto}")
```