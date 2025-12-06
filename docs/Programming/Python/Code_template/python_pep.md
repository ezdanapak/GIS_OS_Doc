# PEP 8 Style Guide და PyPI - Python სტანდარტები

## შესავალი

კარგი კოდი არ არის მხოლოდ მუშა კოდი - ის უნდა იყოს **გასაგები**, **თანმიმდევრული** და **მოვლადი**. Python-ს აქვს ოფიციალური სტილის სახელმძღვანელო და პაკეტების მძლავრი ეკოსისტემა.

---

## 1. PEP 8 - Python Style Guide

### რა არის PEP?

**PEP** (Python Enhancement Proposal) - Python-ის გაუმჯობესების წინადადება. **PEP 8** არის ოფიციალური სახელმძღვანელო Python კოდის დასაწერად.

### რატომ არის PEP 8 მნიშვნელოვანი?

- 📖 **გასაგებობა** - სხვებს ადვილად გაერკვევიან თქვენს კოდში
- 🤝 **თანამშრომლობა** - გუნდური მუშაობა უფრო ეფექტური ხდება
- 🔧 **მოვლადობა** - კოდის შეცვლა და განახლება იოლდება
- 💼 **პროფესიონალიზმი** - ყველა პროფესიონალი იყენებს სტანდარტებს

---

## 2. PEP 8 ძირითადი წესები

### 2.1 დაშორება (Indentation)

**წესი**: გამოიყენეთ **4 ცალი space** (არა tab!)

```python
# ✅ სწორი
def calculate_average(numbers):
    total = sum(numbers)
    count = len(numbers)
    return total / count

# ❌ არასწორი (2 space)
def calculate_average(numbers):
  total = sum(numbers)
  return total / len(numbers)
```

### 2.2 ხაზის მაქსიმალური სიგრძე

**წესი**: მაქსიმუმ **79 სიმბოლო** ხაზში

```python
# ✅ სწორი - გრძელი ხაზის გატეხვა
def process_user_data(user_id, username, email, 
                     phone_number, address):
    pass

# ან ასე
result = some_function(
    first_argument,
    second_argument,
    third_argument
)

# ❌ არასწორი - ძალიან გრძელი ხაზი
def process_user_data(user_id, username, email, phone_number, address, city, country, postal_code):
    pass
```

### 2.3 სახელების მიცემა (Naming Conventions)

```python
# ✅ ცვლადები და ფუნქციები: lowercase_with_underscores
user_name = "Giorgi"
total_price = 100

def calculate_total_price():
    pass

# ✅ კლასები: CapitalizedWords (PascalCase)
class UserAccount:
    pass

class ShoppingCart:
    pass

# ✅ კონსტანტები: UPPERCASE_WITH_UNDERSCORES
MAX_CONNECTIONS = 100
PI = 3.14159
DATABASE_URL = "localhost:5432"

# ❌ არასწორი
UserName = "Giorgi"  # ცვლადი არ უნდა იყოს PascalCase
def CalculatePrice():  # ფუნქცია არ უნდა იყოს PascalCase
    pass
```

### 2.4 ცარიელი ხაზები

```python
# ✅ სწორი - 2 ცარიელი ხაზი კლასებსა და ფუნქციებს შორის
class Student:
    pass


class Teacher:
    pass


def calculate_grade():
    pass


def print_report():
    pass


# ✅ 1 ცარიელი ხაზი მეთოდებს შორის კლასში
class Person:
    def __init__(self, name):
        self.name = name
    
    def greet(self):
        return f"Hello, {self.name}"
    
    def goodbye(self):
        return f"Goodbye, {self.name}"
```

### 2.5 Imports - ბიბლიოთეკების იმპორტი

```python
# ✅ სწორი - თითოეული import ცალკე ხაზზე
import os
import sys
import json

# ✅ ჯგუფური imports
from collections import defaultdict, Counter
from typing import List, Dict, Optional

# ✅ იმპორტების რიგითობა:
# 1. სტანდარტული ბიბლიოთეკა
import os
import sys

# 2. მესამე მხარის პაკეტები
import numpy as np
import pandas as pd

# 3. ლოკალური imports
from myapp.models import User
from myapp.utils import helper

# ❌ არასწორი
import os, sys, json  # ერთ ხაზზე არ უნდა
```

### 2.6 Whitespace - სივრცეები

```python
# ✅ სწორი
x = 5
y = x + 10
my_list = [1, 2, 3]
result = function(arg1, arg2)

# ❌ არასწორი - ზედმეტი სივრცეები
x=5
y = x+10
my_list = [ 1,2,3 ]
result = function (arg1,arg2)

# ✅ ოპერატორების გარშემო
income = salary + bonus - tax
is_valid = (age >= 18) and (has_id == True)

# ✅ არგუმენტები
def function(arg1, arg2, arg3):
    pass
```

### 2.7 კომენტარები

```python
# ✅ სწორი - გასაგები კომენტარი
# Calculate the average score of all students
def calculate_average(scores):
    return sum(scores) / len(scores)

# ✅ Docstring - ფუნქციის დოკუმენტაცია
def calculate_discount(price, discount_percent):
    """
    Calculate final price after applying discount.
    
    Args:
        price (float): Original price
        discount_percent (float): Discount percentage (0-100)
    
    Returns:
        float: Final price after discount
    """
    discount = price * (discount_percent / 100)
    return price - discount

# ❌ არასწორი - ზედმეტი კომენტარი
x = x + 1  # Increment x by 1
```

---

## 3. Style Guide Checkers

### 3.1 პოპულარული Tools

#### **pycodestyle** (ყოფილი pep8)
ყველაზე მარტივი PEP 8 checker

```bash
# ინსტალაცია
pip install pycodestyle

# გამოყენება
pycodestyle myfile.py
pycodestyle myproject/
```

#### **flake8** - ყველაზე პოპულარული
pycodestyle + pyflakes + mccabe complexity

```bash
# ინსტალაცია
pip install flake8

# გამოყენება
flake8 myfile.py

# კონფიგურაცია .flake8 ფაილში
[flake8]
max-line-length = 88
exclude = .git,__pycache__,venv
```

#### **pylint** - ყველაზე სრული
მოიცავს PEP 8 + კოდის ხარისხის შემოწმებას

```bash
# ინსტალაცია
pip install pylint

# გამოყენება
pylint myfile.py

# შეფასება 0-დან 10-მდე
```

#### **black** - ავტომატური Formatter
"The Uncompromising Code Formatter"

```bash
# ინსტალაცია
pip install black

# გამოყენება - ავტომატურად აფორმატებს
black myfile.py
black myproject/

# შემოწმება გარეშე შეცვლისა
black --check myfile.py
```

#### **autopep8** - ავტომატური შესწორება

```bash
# ინსტალაცია
pip install autopep8

# გამოყენება
autopep8 --in-place myfile.py
```

### 3.2 პრაქტიკული მაგალითი

```python
# ❌ PEP 8 დარღვევები
def calculatePrice(items,discount=0,tax= 0.1 ):
    total=0
    for item in items:
        total+=item['price']
    if discount>0:
        total=total-discount
    total=total*(1+tax)
    return total

# ✅ PEP 8 შესაბამისი
def calculate_price(items, discount=0, tax=0.1):
    """
    Calculate total price with discount and tax.
    
    Args:
        items (list): List of item dictionaries
        discount (float): Discount amount
        tax (float): Tax rate (default 0.1)
    
    Returns:
        float: Final price
    """
    total = 0
    
    for item in items:
        total += item['price']
    
    if discount > 0:
        total = total - discount
    
    total = total * (1 + tax)
    return total
```

### 3.3 Checkers-ის შედარება

| Tool | რას აკეთებს | სირთულე | რეკომენდაცია |
|------|-------------|----------|--------------|
| **pycodestyle** | PEP 8 შემოწმება | მარტივი | დამწყებთათვის |
| **flake8** | PEP 8 + შეცდომები | საშუალო | ყველასთვის |
| **pylint** | სრული ანალიზი | რთული | პროექტებისთვის |
| **black** | ავტო-ფორმატირება | მარტივი | ყველასთვის |
| **autopep8** | ავტო-შესწორება | მარტივი | სწრაფი fix-ებისთვის |

---

## 4. PyPI - Python Package Index

### რა არის PyPI?

**PyPI** (Python Package Index) - Python პაკეტების ოფიციალური რეპოზიტორია. შეიცავს **500,000+** პაკეტს!

🌐 ვებსაიტი: https://pypi.org

### 4.1 pip - Package Manager

**pip** არის Python-ის ოფიციალური პაკეტების მენეჯერი.

```bash
# პაკეტის ინსტალაცია
pip install requests
pip install numpy pandas matplotlib

# კონკრეტული ვერსია
pip install django==4.2.0
pip install "flask>=2.0.0"

# requirements.txt-დან ინსტალაცია
pip install -r requirements.txt

# პაკეტის მოხსნა
pip uninstall requests

# ინსტალირებული პაკეტების სია
pip list

# პაკეტის ინფორმაცია
pip show requests

# პაკეტების განახლება
pip install --upgrade requests
```

### 4.2 requirements.txt

პროექტის დამოკიდებულებების ფაილი:

```text
# requirements.txt
django==4.2.0
requests>=2.28.0
pandas>=1.5.0
numpy==1.24.0
matplotlib>=3.7.0
```

გენერირება:
```bash
# ყველა დაინსტალირებული პაკეტის შენახვა
pip freeze > requirements.txt

# ინსტალაცია requirements-დან
pip install -r requirements.txt
```

### 4.3 პოპულარული პაკეტები

#### მონაცემთა ანალიზი
```bash
pip install numpy      # რიცხვითი გამოთვლები
pip install pandas     # მონაცემთა ანალიზი
pip install matplotlib # ვიზუალიზაცია
```

#### Web Development
```bash
pip install django     # Full-stack framework
pip install flask      # Micro framework
pip install fastapi    # Modern API framework
```

#### Machine Learning
```bash
pip install scikit-learn  # ML ალგორითმები
pip install tensorflow    # Deep Learning
pip install pytorch       # Deep Learning
```

#### Utilities
```bash
pip install requests   # HTTP requests
pip install beautifulsoup4  # Web scraping
pip install pillow     # Image processing
```

---

## 5. Virtual Environments - ვირტუალური გარემოები

### რატომ გვჭირდება?

თითოეულ პროექტს სჭირდება განსხვავებული პაკეტები და ვერსიები. Virtual Environment იზოლირებულ გარემოს ქმნის.

### 5.1 venv - Python-ის ჩაშენებული

```bash
# ვირტუალური გარემოს შექმნა
python -m venv myenv

# გააქტიურება (Windows)
myenv\Scripts\activate

# გააქტიურება (Linux/Mac)
source myenv/bin/activate

# დეაქტივაცია
deactivate
```

### 5.2 პრაქტიკული მაგალითი

```bash
# პროექტის დაწყება
mkdir my_project
cd my_project

# virtual environment-ის შექმნა
python -m venv venv

# გააქტიურება
source venv/bin/activate  # Linux/Mac
# ან
venv\Scripts\activate     # Windows

# პაკეტების ინსტალაცია
pip install flask requests

# requirements.txt-ის შენახვა
pip freeze > requirements.txt

# სამუშაოს დასრულება
deactivate
```

---

## 6. პარალელი სხვა ენებთან

### Package Managers შედარება

| ენა | Package Manager | რეპოზიტორია | მაგალითი |
|-----|----------------|--------------|----------|
| **Python** | pip | PyPI | `pip install requests` |
| **JavaScript** | npm / yarn | npm registry | `npm install express` |
| **Java** | Maven / Gradle | Maven Central | `maven: org.springframework` |
| **Ruby** | gem | RubyGems | `gem install rails` |
| **PHP** | Composer | Packagist | `composer require laravel` |
| **Rust** | Cargo | crates.io | `cargo add serde` |
| **Go** | go get | pkg.go.dev | `go get github.com/gin-gonic/gin` |
| **C#** | NuGet | NuGet Gallery | `dotnet add package Newtonsoft.Json` |

### პარალელური კონცეფციები

```bash
# Python
pip install requests
pip freeze > requirements.txt
python -m venv venv

# JavaScript (npm)
npm install axios
npm list --depth=0 > package.json
# node_modules/ (virtual env ექვივალენტი)

# Ruby
gem install rails
gem list > Gemfile
bundle install

# PHP
composer require symfony/http-foundation
composer.json
composer install
```

---

## 7. პრაქტიკული სავარჯიშოები

### სავარჯიშო 1: PEP 8 შესწორება

შეასწორეთ შემდეგი კოდი PEP 8 სტანდარტის მიხედვით:

```python
# ❌ არასწორი კოდი
def calculateTotalPrice(items,discount=0):
    total=0
    for item in items:
        total+=item['price']
    if discount>0:total=total-discount
    return total

class student:
    def __init__(self,name,age):
        self.Name=name
        self.Age=age

# თქვენი შესწორებული ვერსია აქ:
```

<details>
<summary>პასუხი</summary>

```python
# ✅ სწორი კოდი
def calculate_total_price(items, discount=0):
    """Calculate total price with optional discount."""
    total = 0
    
    for item in items:
        total += item['price']
    
    if discount > 0:
        total = total - discount
    
    return total


class Student:
    """Represents a student with name and age."""
    
    def __init__(self, name, age):
        self.name = name
        self.age = age
```
</details>

### სავარჯიშო 2: Virtual Environment პრაქტიკა

შექმენით პროექტი virtual environment-ით:

```bash
# 1. შექმენით საქაღალდე "weather_app"
# 2. შექმენით virtual environment
# 3. დააინსტალირეთ requests და beautifulsoup4
# 4. შეინახეთ requirements.txt
# 5. შექმენით მარტივი სკრიპტი რომელიც იყენებს requests-ს

# თქვენი ბრძანებები აქ:
```

### სავარჯიშო 3: flake8 გამოყენება

```bash
# 1. დააინსტალირეთ flake8
# 2. შექმენით test.py ფაილი PEP 8 დარღვევებით
# 3. გაუშვით flake8 და გამოასწორეთ ყველა შეცდომა
```

---

## 8. Best Practices - საუკეთესო პრაქტიკა

### 8.1 პროექტის სტრუქტურა

```
my_project/
│
├── venv/                  # Virtual environment (არ უნდა git-ში!)
├── src/                   # Source code
│   ├── __init__.py
│   ├── main.py
│   └── utils.py
├── tests/                 # Tests
│   ├── test_main.py
│   └── test_utils.py
├── requirements.txt       # Dependencies
├── .gitignore            # Git ignore file
├── README.md             # Documentation
└── setup.py              # Package setup
```

### 8.2 .gitignore მაგალითი

```text
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python

# Virtual Environment
venv/
env/
ENV/

# IDEs
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db
```

### 8.3 რჩევები

1. **ყოველთვის** გამოიყენეთ Virtual Environment
2. **ყოველთვის** შეინახეთ requirements.txt
3. **გაუშვით** flake8 ან black კოდის შემოწმებისთვის
4. **დაწერეთ** docstrings ფუნქციებისთვის
5. **გამოიყენეთ** Type Hints (Python 3.5+)

```python
from typing import List, Dict, Optional

def process_data(items: List[Dict], 
                 limit: Optional[int] = None) -> Dict:
    """
    Process data items.
    
    Args:
        items: List of data dictionaries
        limit: Optional limit for processing
    
    Returns:
        Processed data dictionary
    """
    pass
```

---

## 9. დამატებითი რესურსები

### ოფიციალური დოკუმენტაცია
- 📘 PEP 8: https://pep8.org
- 📦 PyPI: https://pypi.org
- 🐍 Python Docs: https://docs.python.org

### Tools
- 🔧 flake8: https://flake8.pycqa.org
- ⚫ black: https://black.readthedocs.io
- 📊 pylint: https://pylint.org

### სასწავლო მასალები
- Real Python: https://realpython.com
- Python Package Index Guide: https://packaging.python.org

---

## დასკვნა

✅ **PEP 8** - თქვენი კოდი უნდა იყოს სუფთა და თანმიმდევრული

✅ **Style Checkers** - გამოიყენეთ flake8 და black

✅ **PyPI** - უზარმაზარი პაკეტების ბიბლიოთეკა

✅ **Virtual Environments** - თითოეული პროექტისთვის იზოლირებული გარემო

✅ **pip** - მარტივი და ძლიერი package manager

კარგი სტილი და პაკეტების სწორი მართვა - პროფესიონალი დეველოპერის ნიშანია! 🚀