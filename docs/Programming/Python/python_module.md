# პითონის მოდულები, პაკეტები და ვერსიების კონტროლი

## შინაარსი
1. [მოდულები](#მოდულები)
2. [import ინსტრუქცია](#import-ინსტრუქცია)
3. [from ინსტრუქცია](#from-ინსტრუქცია)
4. [მოდულის მოძებნა და ხელახალი ჩატვირთვა](#მოდულის-მოძებნა-და-ხელახალი-ჩატვირთვა)
5. [პაკეტები](#პაკეტები)
6. [ვერსიების კონტროლის სისტემა (Git)](#ვერსიების-კონტროლის-სისტემა)

---

## მოდულები

**მოდული** არის Python ფაილი, რომელიც შეიცავს ფუნქციებს, კლასებს და ცვლადებს, რომლებიც შეგვიძლია გამოვიყენოთ სხვა პროგრამებში.

### რატომ გვჭირდება მოდულები?

- კოდის ორგანიზება და სტრუქტურირება
- კოდის ხელახალი გამოყენება
- სახელთა სივრცის მართვა
- დიდი პროექტების ეფექტური მენეჯმენტი

### მოდულის შექმნა

**ფაილი: `my_math.py`**
```python
"""
ეს არის მარტივი მათემატიკური მოდული
"""

PI = 3.14159

def add(a, b):
    """ორი რიცხვის შეკრება"""
    return a + b

def subtract(a, b):
    """ორი რიცხვის გამოკლება"""
    return a - b

def circle_area(radius):
    """წრეწირის ფართობის გამოთვლა"""
    return PI * radius ** 2

class Calculator:
    """მარტივი კალკულატორი"""
    
    def multiply(self, a, b):
        return a * b
    
    def divide(self, a, b):
        if b == 0:
            return "შეცდომა: ნულზე გაყოფა შეუძლებელია"
        return a / b
```

---

## import ინსტრუქცია

`import` ინსტრუქცია საშუალებას გვაძლევს გამოვიყენოთ მოდული ჩვენს პროგრამაში.

### მაგალითი 1: მთელი მოდულის იმპორტი

```python
import my_math

# მოდულის გამოყენება
result = my_math.add(5, 3)
print(f"5 + 3 = {result}")  # 5 + 3 = 8

area = my_math.circle_area(5)
print(f"წრეწირის ფართობი: {area}")  # წრეწირის ფართობი: 78.53975

# კლასის გამოყენება
calc = my_math.Calculator()
print(f"4 * 7 = {calc.multiply(4, 7)}")  # 4 * 7 = 28
```

### მაგალითი 2: მოდულის იმპორტი სხვა სახელით (alias)

```python
import my_math as mm

result = mm.subtract(10, 3)
print(f"10 - 3 = {result}")  # 10 - 3 = 7
```

### მაგალითი 3: სტანდარტული მოდულების იმპორტი

```python
import math
import random
import datetime

# math მოდული
print(math.sqrt(16))  # 4.0
print(math.cos(0))    # 1.0

# random მოდული
print(random.randint(1, 10))  # შემთხვევითი რიცხვი 1-დან 10-მდე

# datetime მოდული
now = datetime.datetime.now()
print(f"მიმდინარე დრო: {now}")
```

---

## from ინსტრუქცია

`from` საშუალებას გვაძლევს დავაიმპორტოთ მოდულის კონკრეტული ელემენტები.

### მაგალითი 1: კონკრეტული ფუნქციის იმპორტი

```python
from my_math import add, subtract

# ახლა უშუალოდ შეგვიძლია გამოვიყენოთ
result1 = add(5, 3)
result2 = subtract(10, 4)

print(f"5 + 3 = {result1}")   # 5 + 3 = 8
print(f"10 - 4 = {result2}")  # 10 - 4 = 6
```

### მაგალითი 2: ყველა ელემენტის იმპორტი

```python
from my_math import *

# ყველა ფუნქცია და ცვლადი ხელმისაწვდომია
print(PI)  # 3.14159
print(add(2, 3))  # 5
print(circle_area(10))  # 314.159
```

⚠️ **გაფრთხილება:** `from module import *` გამოყენება არ არის რეკომენდებული, რადგან შეიძლება სახელების კონფლიქტი მოხდეს.

### მაგალითი 3: იმპორტი alias-ით

```python
from my_math import circle_area as area
from my_math import Calculator as Calc

print(area(7))  # 153.93791

calculator = Calc()
print(calculator.divide(20, 4))  # 5.0
```

---

## მოდულის მოძებნა და ხელახალი ჩატვირთვა

### როგორ პოულობს Python მოდულებს?

Python მოდულებს ეძებს შემდეგ ადგილებში (მითითებული თანმიმდევრობით):

1. მიმდინარე დირექტორია
2. PYTHONPATH გარემოს ცვლადში მითითებული დირექტორიები
3. სტანდარტული ბიბლიოთეკის დირექტორია

### sys.path - ძებნის გზების ნახვა

```python
import sys

print("Python ეძებს მოდულებს შემდეგ ადგილებში:")
for path in sys.path:
    print(path)
```

### საკუთარი გზის დამატება

```python
import sys

# ახალი გზის დამატება
sys.path.append('/home/user/my_modules')

# ახლა შეგვიძლია დავაიმპორტოთ მოდული ამ დირექტორიიდან
import my_custom_module
```

### მოდულის ხელახალი ჩატვირთვა

როდესაც მოდულს პირველად ვაიმპორტებთ, Python-ი ინახავს მას მეხსიერებაში. თუ მოდულს შევცვლით და გვინდა ცვლილებების ნახვა, უნდა გადავტვირთოთ იგი.

```python
import importlib
import my_math

# მოდულის გამოყენება
print(my_math.add(2, 3))  # 5

# ვთქვათ, my_math.py-ში რაღაც შევცვალეთ...

# მოდულის ხელახალი ჩატვირთვა
importlib.reload(my_math)

# ახლა ცვლილებები ჩანს
print(my_math.add(2, 3))
```

### `__name__` ატრიბუტი

**ფაილი: `demo.py`**
```python
def main():
    print("ეს არის მთავარი ფუნქცია")

if __name__ == "__main__":
    # ეს კოდი მხოლოდ მაშინ შესრულდება, როცა ფაილს პირდაპირ გავუშვებთ
    print("ფაილი გაშვებულია პირდაპირ")
    main()
else:
    # ეს კოდი შესრულდება, როცა ფაილს სხვაგან დავაიმპორტებთ
    print("ფაილი დაიმპორტდა როგორც მოდული")
```

---

## პაკეტები

**პაკეტი** არის დირექტორია, რომელიც შეიცავს მოდულებს და სპეციალურ `__init__.py` ფაილს.

### პაკეტის სტრუქტურა

```
my_package/
│
├── __init__.py
├── module1.py
├── module2.py
└── subpackage/
    ├── __init__.py
    └── module3.py
```

### პაკეტის შექმნის მაგალითი

**დირექტორიის სტრუქტურა:**
```
math_tools/
├── __init__.py
├── basic.py
└── advanced.py
```

**ფაილი: `math_tools/__init__.py`**
```python
"""
მათემატიკური ინსტრუმენტების პაკეტი
"""

print("math_tools პაკეტი ჩაიტვირთა")

# პაკეტის ვერსია
__version__ = "1.0.0"
```

**ფაილი: `math_tools/basic.py`**
```python
"""
ძირითადი მათემატიკური ოპერაციები
"""

def add(a, b):
    """შეკრება"""
    return a + b

def subtract(a, b):
    """გამოკლება"""
    return a - b

def multiply(a, b):
    """გამრავლება"""
    return a * b

def divide(a, b):
    """გაყოფა"""
    if b == 0:
        raise ValueError("ნულზე გაყოფა შეუძლებელია")
    return a / b
```

**ფაილი: `math_tools/advanced.py`**
```python
"""
მოწინავე მათემატიკური ოპერაციები
"""

def power(base, exponent):
    """ხარისხში აყვანა"""
    return base ** exponent

def factorial(n):
    """ფაქტორიალი"""
    if n < 0:
        raise ValueError("ფაქტორიალი უარყოფითი რიცხვისთვის არ არსებობს")
    if n == 0 or n == 1:
        return 1
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

def fibonacci(n):
    """ფიბონაჩის n-ური წევრი"""
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        a, b = 0, 1
        for _ in range(2, n + 1):
            a, b = b, a + b
        return b
```

### პაკეტის გამოყენება

```python
# მთელი მოდულის იმპორტი
import math_tools.basic
import math_tools.advanced

result1 = math_tools.basic.add(5, 3)
result2 = math_tools.advanced.factorial(5)

print(f"5 + 3 = {result1}")  # 5 + 3 = 8
print(f"5! = {result2}")     # 5! = 120

# კონკრეტული ფუნქციების იმპორტი
from math_tools.basic import multiply
from math_tools.advanced import fibonacci

print(f"4 * 7 = {multiply(4, 7)}")  # 4 * 7 = 28
print(f"Fibonacci(10) = {fibonacci(10)}")  # Fibonacci(10) = 55

# alias-ით იმპორტი
from math_tools import basic as b
from math_tools import advanced as adv

print(b.divide(20, 4))  # 5.0
print(adv.power(2, 10))  # 1024
```

### `__init__.py` ფაილის გამოყენება

შეგვიძლია `__init__.py`-ში განვსაზღვროთ, რა იქნება ხელმისაწვდომი პაკეტის იმპორტისას.

**გაუმჯობესებული `__init__.py`:**
```python
"""
math_tools - მათემატიკური ოპერაციების პაკეტი
"""

__version__ = "1.0.0"
__author__ = "თქვენი სახელი"

# ავტომატურად ხელმისაწვდომი ფუნქციები
from .basic import add, subtract, multiply, divide
from .advanced import power, factorial, fibonacci

# რა იქნება ხელმისაწვდომი from math_tools import * -ისას
__all__ = ['add', 'subtract', 'multiply', 'divide', 
           'power', 'factorial', 'fibonacci']
```

**გამარტივებული გამოყენება:**
```python
import math_tools

# ახლა პირდაპირ შეგვიძლია გამოყენება
print(math_tools.add(3, 4))  # 7
print(math_tools.factorial(6))  # 720
```

---

## ვერსიების კონტროლის სისტემა

### Git - არსი და მნიშვნელობა

**Git** არის განაწილებული ვერსიების კონტროლის სისტემა, რომელიც საშუალებას გვაძლევს:

- თვალი ვადევნოთ კოდის ცვლილებებს დროში
- რამდენიმე დეველოპერმა ერთდროულად იმუშაოს პროექტზე
- დავუბრუნდეთ კოდის ძველ ვერსიებს
- შევქმნათ ალტერნატიული განვითარების შტოები (branches)
- დავაფიქსიროთ ყველა ცვლილება და მისი ავტორი

### Git-ის ძირითადი კონცეფციები

1. **Repository (რეპოზიტორია)** - პროექტის მთავარი საცავი
2. **Commit (კომიტი)** - კოდის ცვლილებების შენახული მდგომარეობა
3. **Branch (ბრენჩი)** - განვითარების დამოუკიდებელი ხაზი
4. **Merge (შერწყმა)** - ორი ბრენჩის გაერთიანება
5. **Clone (კლონირება)** - რეპოზიტორიის ასლის შექმნა

### Git-ის ინსტალაცია

**Linux/Ubuntu:**
```bash
sudo apt update
sudo apt install git
```

**macOS:**
```bash
brew install git
```

**Windows:** ჩამოტვირთეთ [git-scm.com](https://git-scm.com)

**შემოწმება:**
```bash
git --version
```

### Git-ის კონფიგურაცია

```bash
# სახელისა და ელ-ფოსტის დაყენება
git config --global user.name "თქვენი სახელი"
git config --global user.email "your.email@example.com"

# კონფიგურაციის ნახვა
git config --list
```

### Git-ის ძირითადი ბრძანებები

#### 1. ახალი რეპოზიტორიის შექმნა

```bash
# დირექტორიის შექმნა და გადასვლა
mkdir my_project
cd my_project

# Git რეპოზიტორიის ინიციალიზაცია
git init
```

#### 2. ფაილების დამატება და კომიტი

```bash
# ფაილის შექმნა
echo "# ჩემი პროექტი" > README.md

# ფაილის მდგომარეობის შემოწმება
git status

# ფაილის დამატება staging area-ში
git add README.md

# ან ყველა ფაილის დამატება
git add .

# კომიტის შექმნა
git commit -m "პირველი კომიტი: დამატებულია README"
```

#### 3. ისტორიის ნახვა

```bash
# კომიტების ისტორია
git log

# მოკლე ფორმატი
git log --oneline

# გრაფიკული ვიზუალიზაცია
git log --graph --oneline --all
```

### პრაქტიკული მაგალითი

**პროექტის სტრუქტურა:**
```
my_python_project/
├── .git/
├── README.md
├── main.py
├── utils.py
└── requirements.txt
```

**ნაბიჯ-ნაბიჯ Git სამუშაო ციკლი:**

```bash
# 1. პროექტის დირექტორიაში Git-ის ინიციალიზაცია
git init

# 2. .gitignore ფაილის შექმნა (რომელი ფაილები არ უნდა ვერსიონდებოდეს)
echo "__pycache__/" > .gitignore
echo "*.pyc" >> .gitignore
echo ".env" >> .gitignore

# 3. README ფაილის შექმნა
echo "# ჩემი Python პროექტი" > README.md

# 4. Python ფაილის შექმნა
cat > main.py << 'EOF'
def main():
    print("გამარჯობა, Git!")

if __name__ == "__main__":
    main()
EOF

# 5. ყველა ფაილის დამატება
git add .

# 6. პირველი კომიტი
git commit -m "საწყისი კომიტი: დამატებულია main.py და README"

# 7. main.py-ის შეცვლა
cat > main.py << 'EOF'
def greet(name):
    return f"გამარჯობა, {name}!"

def main():
    print(greet("Git"))

if __name__ == "__main__":
    main()
EOF

# 8. ცვლილებების ნახვა
git diff

# 9. ცვლილებების დამატება და კომიტი
git add main.py
git commit -m "დამატებულია greet ფუნქცია"

# 10. ისტორიის ნახვა
git log --oneline
```

### ბრენჩები (Branches)

ბრენჩები საშუალებას გვაძლევს პარალელურად ვიმუშაოთ სხვადასხვა ფუნქციონალზე.

```bash
# ბრენჩების სია
git branch

# ახალი ბრენჩის შექმნა
git branch feature-login

# ბრენჩზე გადასვლა
git checkout feature-login

# ან ერთდროულად შექმნა და გადასვლა
git checkout -b feature-register

# ფაილის შეცვლა ახალ ბრენჩში
echo "# Login ფუნქციონალი" > login.py

# კომიტი ახალ ბრენჩში
git add login.py
git commit -m "დამატებულია login ფუნქციონალი"

# მთავარ ბრენჩზე დაბრუნება
git checkout main

# ბრენჩის შერწყმა (merge)
git merge feature-login

# ბრენჩის წაშლა
git branch -d feature-login
```

### დისტანციური რეპოზიტორია (GitHub)

```bash
# GitHub-ზე რეპოზიტორიის დაკავშირება
git remote add origin https://github.com/username/my_project.git

# პირველად ატვირთვა
git push -u origin main

# ცვლილებების ატვირთვა
git push

# ცვლილებების ჩამოტვირთვა
git pull
```

---

## სავარჯიშოები

### ამოცანა 1: მარტივი მოდული
შექმენით მოდული `geometry.py`, რომელიც შეიცავს ფუნქციებს:
- სამკუთხედის ფართობის გამოსათვლელად
- მართკუთხედის ფართობის გამოსათვლელად
- წრეწირის ფართობისა და პერიმეტრის გამოსათვლელად

**ამოხსნა:**

**ფაილი: `geometry.py`**
```python
"""
გეომეტრიული ფიგურების მოდული
"""

import math

def triangle_area(base, height):
    """სამკუთხედის ფართობი"""
    return 0.5 * base * height

def rectangle_area(length, width):
    """მართკუთხედის ფართობი"""
    return length * width

def circle_area(radius):
    """წრეწირის ფართობი"""
    return math.pi * radius ** 2

def circle_perimeter(radius):
    """წრეწირის პერიმეტრი"""
    return 2 * math.pi * radius
```

**გამოყენება:**
```python
import geometry

print(f"სამკუთხედის ფართობი: {geometry.triangle_area(10, 5)}")
print(f"მართკუთხედის ფართობი: {geometry.rectangle_area(8, 6)}")
print(f"წრეწირის ფართობი: {geometry.circle_area(7):.2f}")
print(f"წრეწირის პერიმეტრი: {geometry.circle_perimeter(7):.2f}")
```

---

### ამოცანა 2: პაკეტის შექმნა
შექმენით პაკეტი `data_tools`, რომელიც შეიცავს:
- `readers.py` - მონაცემების წაკითხვის ფუნქციები
- `writers.py` - მონაცემების ჩაწერის ფუნქციები
- `processors.py` - მონაცემების დამუშავების ფუნქციები

**ამოხსნა:**

**სტრუქტურა:**
```
data_tools/
├── __init__.py
├── readers.py
├── writers.py
└── processors.py
```

**ფაილი: `data_tools/__init__.py`**
```python
"""
მონაცემების დამუშავების პაკეტი
"""

__version__ = "1.0.0"

from .readers import read_file, read_csv
from .writers import write_file, write_csv
from .processors import process_numbers, filter_data

__all__ = ['read_file', 'read_csv', 'write_file', 
           'write_csv', 'process_numbers', 'filter_data']
```

**ფაილი: `data_tools/readers.py`**
```python
"""
მონაცემების წაკითხვის ფუნქციები
"""

def read_file(filename):
    """ტექსტური ფაილის წაკითხვა"""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        return f"შეცდომა: ფაილი '{filename}' ვერ მოიძებნა"

def read_csv(filename):
    """CSV ფაილის წაკითხვა"""
    data = []
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            for line in f:
                data.append(line.strip().split(','))
        return data
    except FileNotFoundError:
        return f"შეცდომა: ფაილი '{filename}' ვერ მოიძებნა"
```

**ფაილი: `data_tools/writers.py`**
```python
"""
მონაცემების ჩაწერის ფუნქციები
"""

def write_file(filename, content):
    """ტექსტური ფაილის ჩაწერა"""
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        return f"წარმატებით ჩაიწერა '{filename}'"
    except Exception as e:
        return f"შეცდომა: {e}"

def write_csv(filename, data):
    """CSV ფაილის ჩაწერა"""
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            for row in data:
                f.write(','.join(map(str, row)) + '\n')
        return f"წარმატებით ჩაიწერა '{filename}'"
    except Exception as e:
        return f"შეცდომა: {e}"
```

**ფაილი: `data_tools/processors.py`**
```python
"""
მონაცემების დამუშავების ფუნქციები
"""

def process_numbers(numbers):
    """რიცხვების სიის დამუშავება"""
    if not numbers:
        return {}
    
    return {
        'ჯამი': sum(numbers),
        'საშუალო': sum(numbers) / len(numbers),
        'მინიმუმი': min(numbers),
        'მაქსიმუმი': max(numbers),
        'რაოდენობა': len(numbers)
    }

def filter_data(data, condition):
    """მონაცემების ფილტრაცია"""
    return [item for item in data if condition(item)]
```

**გამოყენება:**
```python
from data_tools import write_file, read_file, process_numbers

# ფაილის ჩაწერა
write_file('test.txt', 'გამარჯობა, Python!')

# ფაილის წაკითხვა
content = read_file('test.txt')
print(content)

# რიცხვების დამუშავება
numbers = [10, 25, 30, 45, 50, 15, 20]
stats = process_numbers(numbers)
print(stats)
```

---

### ამოცანა 3: Git-ით მუშაობა
შექმენით პატარა Python პროექტი და აკონტროლეთ იგი Git-ით:

1. ინიციალიზაცია გაუკეთეთ Git რეპოზიტორიას
2. შექმენით რამდენიმე Python ფაილი
3. შექმენით `.gitignore` ფაილი
4. გააკეთეთ რამდენიმე კომიტი
5. შექმენით ახალი ბრენჩი და დაამატეთ ახალი ფუნქციონალი
6. შეუერთეთ ბრენჩი მთავარ შტოს

**ამოხსნა:**

```bash
# 1. პროექტის დირექტორიის შექმნა
mkdir weather_app
cd weather_app

# 2. Git-ის ინიციალიზაცია
git init

# 3. .gitignore ფაილის შექმნა
cat > .gitignore << 'EOF'
__pycache__/
*.pyc
.env
.vscode/
*.log
EOF

# 4. README ფაილის შექმნა
cat > README.md << 'EOF'
# ამინდის აპლიკაცია

მარტივი Python აპლიკაცია ამინდის მონაცემების დასამუშავებლად.

## ფუნქციონალი
- ტემპერატურის კონვერტაცია
- ამინდის პროგნოზი
EOF

# 5. მთავარი ფაილის შექმნა
cat > weather.py << 'EOF'
"""
ამინდის აპლიკაცია
"""

def celsius_to_fahrenheit(celsius):
    """ცელსიუსიდან ფარენჰაიტში კონვერტაცია"""
    return (celsius * 9/5) + 32

def fahrenheit_to_celsius(fahrenheit):
    """ფარენჰაიტიდან ცელსიუსში კონვერტაცია"""
    return (fahrenheit - 32) * 5/9

def main():
    temp_c = 25
    temp_f = celsius_to_fahrenheit(temp_c)
    print(f"{temp_c}°C = {temp_f}°F")

if __name__ == "__main__":
    main()
EOF

# 6. პირველი კომიტი
git add .
git commit -m "საწყისი კომიტი: დამატებულია ძირითადი ფუნქციონალი"

# 7. ფუნქციონალის გაფართოება
cat >> weather.py << 'EOF'

def get_weather_description(temp_c):
    """ამინდის აღწერა ტემპერატურის მიხედვით"""
    if temp_c < 0:
        return "ძალიან ცივა"
    elif temp_c < 10:
        return "ცივა"
    elif temp_c < 20:
        return "გრილია"
    elif temp_c < 30:
        return "თბილა"
    else:
        return "ცხელა"
EOF

# 8. მეორე კომიტი
git add weather.py
git commit -m "დამატებულია ამინდის აღწერის ფუნქცია"

# 9. ახალი ბრენჩის შექმნა humidity ფუნქციონალისთვის
git checkout -b feature-humidity

# 10. ახალი ფუნქციის დამატება
cat > humidity.py << 'EOF'
"""
ტენიანობის გამოთვლები
"""

def calculate_heat_index(temp_c, humidity):
    """სითბოს ინდექსის გამოთვლა"""
    temp_f = (temp_c * 9/5) + 32
    
    # გამარტივებული ფორმულა
    hi = -42.379 + 2.04901523 * temp_f + 10.14333127 * humidity
    
    return round((hi - 32) * 5/9, 2)  # ფარენჰაიტიდან ცელსიუსში

def humidity_status(humidity):
    """ტენიანობის სტატუსი"""
    if humidity < 30:
        return "მშრალი"
    elif humidity < 60:
        return "კომფორტული"
    else:
        return "ტენიანი"
EOF

# 11. კომიტი ახალ ბრენჩში
git add humidity.py
git commit -m "დამატებულია ტენიანობის ფუნქციონალი"

# 12. მთავარ ბრენჩზე დაბრუნება
git checkout main

# 13. ბრენჩის შერწყმა
git merge feature-humidity

# 14. ისტორიის ნახვა
git log --oneline --graph --all

# 15. ბრენჩის წაშლა
git branch -d feature-humidity

# შედეგის ნახვა
echo "
=== პროექტის ფაილები ==="
ls -la

echo "
=== Git ისტორია ==="
git log --oneline

echo "
=== Git სტატუსი ==="
git status
```

---

## დამატებითი რესურსები

### სასარგებლო Git ბრძანებები

```bash
# ცვლილებების დროებით შენახვა
git stash

# დროებით შენახული ცვლილებების დაბრუნება
git stash pop

# ბოლო კომიტის შეცვლა
git commit --amend

# კონკრეტული ფაილის ისტორია
git log --follow filename.py

# ფაილის ბოლო ცვლილების ნახვა
git blame filename.py

# დისტანციური რეპოზიტორიის ინფორმაცია
git remote -v
```

### Python პაკეტების მენეჯმენტი (pip)

```bash
# პაკეტის ინსტალაცია
pip install package_name

# კონკრეტული ვერსიის ინსტალაცია
pip install package_name==1.2.3

# requirements.txt-ის შექმნა
pip freeze > requirements.txt

# requirements.txt-იდან ინსტალაცია
pip install -r requirements.txt

# პაკეტის წაშლა
pip uninstall package_name

# დაინსტალირებული პაკეტების სია
pip list
```

---

## შეჯამება

ამ დოკუმენტაციაში განვიხილეთ:

✅ **მოდულები** - როგორ შევქმნათ და გამოვიყენოთ საკუთარი მოდულები

✅ **import და from** - მოდულების იმპორტის სხვადასხვა მეთოდი

✅ **მოდულის მოძებნა** - როგორ პოულობს Python მოდულებს და როგორ გადავტვირთოთ

✅ **პაკეტები** - როგორ შევქმნათ და ავაწყოთ მრავალმოდულიანი პაკეტები

✅ **Git** - ვერსიების კონტროლის სისტემის საფუძვლები და პრაქტიკული გამოყენება

ეს უნარები საფუძველია პროფესიონალური Python დეველოპმენტისთვის და გუნდურ მუშაობაში!


be1f2f32d7ad231e
4d56e9fb81edbda6
db1e38bb0824cdba
61f5555ac130ebab
f577ca0eb349e8a2
1b1b775211e4ad43
06c0621276f1fab8
a94bacfc8f503470