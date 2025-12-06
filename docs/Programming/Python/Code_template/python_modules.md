# მოდულები, პაკეტები და Version Control System

## შესავალი

როდესაც პროგრამები იზრდება, კოდის ორგანიზება აუცილებელი ხდება. **მოდულები** და **პაკეტები** საშუალებას გვაძლევს დავყოთ კოდი ლოგიკურ ნაწილებად, ხოლო **Version Control** დაგვეხმარება ცვლილებების თვალყურის დევნებაში.

---

## 1. მოდულები (Modules)

### რა არის მოდული?

**მოდული** - Python ფაილი (`.py`), რომელიც შეიცავს ფუნქციებს, კლასებსა და ცვლადებს. ნებისმიერი `.py` ფაილი არის მოდული!

### 1.1 მოდულის შექმნა

```python
# ფაილი: math_utils.py
"""Mathematical utility functions."""

PI = 3.14159

def add(a, b):
    """Add two numbers."""
    return a + b

def multiply(a, b):
    """Multiply two numbers."""
    return a * b

def circle_area(radius):
    """Calculate circle area."""
    return PI * radius ** 2

class Calculator:
    """Simple calculator class."""
    
    def __init__(self):
        self.result = 0
    
    def add(self, value):
        self.result += value
        return self.result
```

### 1.2 მოდულის იმპორტი - import

```python
# მთელი მოდულის იმპორტი
import math_utils

result = math_utils.add(5, 3)
print(result)  # 8

area = math_utils.circle_area(10)
print(area)  # 314.159

# კლასის გამოყენება
calc = math_utils.Calculator()
```

### 1.3 from...import - კონკრეტული ფუნქციების იმპორტი

```python
# კონკრეტული ფუნქციის იმპორტი
from math_utils import add, multiply

result = add(10, 20)  # math_utils. არ გვჭირდება!
print(result)  # 30

product = multiply(5, 4)
print(product)  # 20
```

### 1.4 import as - მოკლე სახელის მიცემა

```python
# მოდულს მოკლე სახელი
import math_utils as mu

result = mu.add(7, 3)
print(result)  # 10

# ფუნქციას მოკლე სახელი
from math_utils import circle_area as area

a = area(5)
print(a)  # 78.53975
```

### 1.5 from module import * - ყველაფრის იმპორტი

```python
# ყველა ფუნქციის იმპორტი (არ არის რეკომენდებული!)
from math_utils import *

result = add(1, 2)
area = circle_area(3)

# ⚠️ პრობლემა: სახელების კონფლიქტი შესაძლებელია!
```

### 1.6 პრაქტიკული მაგალითი

```python
# ფაილი: string_utils.py
"""String manipulation utilities."""

def reverse_string(text):
    """Reverse a string."""
    return text[::-1]

def capitalize_words(text):
    """Capitalize each word."""
    return ' '.join(word.capitalize() for word in text.split())

def count_vowels(text):
    """Count vowels in text."""
    vowels = 'aeiouAEIOU'
    return sum(1 for char in text if char in vowels)

# ფაილი: main.py
from string_utils import reverse_string, capitalize_words

text = "hello world"
print(reverse_string(text))      # dlrow olleh
print(capitalize_words(text))    # Hello World
```

---

## 2. მოდულის მოძებნა და ჩატვირთვა

### 2.1 როგორ პოულობს Python მოდულებს?

Python ეძებს მოდულებს შემდეგ ადგილებში (რიგითობით):

1. **მიმდინარე საქაღალდე** - სადაც სკრიპტი გაიშვა
2. **PYTHONPATH** - გარემოს ცვლადი
3. **სტანდარტული ბიბლიოთეკა** - Python-ის ინსტალაციის საქაღალდე
4. **site-packages** - მესამე მხარის პაკეტები (pip-ით დაინსტალირებული)

```python
import sys

# ყველა path-ის ჩვენება
for path in sys.path:
    print(path)
```

### 2.2 __name__ და __main__

```python
# ფაილი: calculator.py

def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

# ეს კოდი მხოლოდ მაშინ გაეშვება, როცა ფაილი პირდაპირ გაეშვება
if __name__ == "__main__":
    print("Calculator module testing")
    print(f"5 + 3 = {add(5, 3)}")
    print(f"5 * 3 = {multiply(5, 3)}")

# როცა გავუშვებთ: python calculator.py
# Output:
# Calculator module testing
# 5 + 3 = 8
# 5 * 3 = 15

# მაგრამ როცა import calculator - ეს არ გაეშვება!
```

### 2.3 მოდულის ხელმეორედ ჩატვირთვა (Reload)

```python
import importlib
import math_utils

# მოდული ჩაიტვირთა

# თუ შეცვალეთ math_utils.py ფაილი და გინდათ ხელახალი ჩატვირთვა:
importlib.reload(math_utils)

# ახლა განახლებული ვერსია იმუშავებს
```

### 2.4 dir() - მოდულის შინაარსის ნახვა

```python
import math

# ყველა ფუნქციის და ცვლადის სია
print(dir(math))

# Output: ['__doc__', '__name__', 'acos', 'asin', 'atan', 'ceil', 
#          'cos', 'degrees', 'e', 'exp', 'floor', 'log', 'pi', 'sin', ...]
```

---

## 3. პაკეტები (Packages)

### რა არის პაკეტი?

**პაკეტი** - საქაღალდე, რომელიც შეიცავს რამდენიმე მოდულს და `__init__.py` ფაილს.

### 3.1 პაკეტის სტრუქტურა

```
myapp/
│
├── __init__.py          # ეს ფაილი აქცევს საქაღალდეს პაკეტად!
├── utils.py
├── database.py
└── models.py
```

### 3.2 __init__.py ფაილი

```python
# myapp/__init__.py
"""MyApp package - main initialization."""

# პაკეტის ვერსია
__version__ = "1.0.0"

# ავტომატურად იმპორტირებული ფუნქციები
from .utils import format_date, validate_email
from .models import User, Product

# __all__ განსაზღვრავს რა იმპორტდება "from myapp import *" დროს
__all__ = ['format_date', 'validate_email', 'User', 'Product']

print(f"MyApp package v{__version__} loaded")
```

### 3.3 სრული მაგალითი: E-commerce პაკეტი

```python
# ecommerce/
# ├── __init__.py
# ├── products.py
# ├── cart.py
# └── payments.py

# ecommerce/__init__.py
"""E-commerce package."""
__version__ = "1.0.0"

from .products import Product, ProductManager
from .cart import ShoppingCart
from .payments import PaymentProcessor

__all__ = ['Product', 'ProductManager', 'ShoppingCart', 'PaymentProcessor']

# ecommerce/products.py
"""Product management module."""

class Product:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock
    
    def __repr__(self):
        return f"Product('{self.name}', {self.price}₾, stock={self.stock})"

class ProductManager:
    def __init__(self):
        self.products = []
    
    def add_product(self, product):
        self.products.append(product)
    
    def list_products(self):
        return self.products

# ecommerce/cart.py
"""Shopping cart module."""

class ShoppingCart:
    def __init__(self):
        self.items = []
    
    def add_item(self, product, quantity=1):
        self.items.append({
            'product': product,
            'quantity': quantity
        })
    
    def get_total(self):
        return sum(item['product'].price * item['quantity'] 
                  for item in self.items)
    
    def __repr__(self):
        return f"ShoppingCart({len(self.items)} items)"

# ecommerce/payments.py
"""Payment processing module."""

class PaymentProcessor:
    def __init__(self, merchant_id):
        self.merchant_id = merchant_id
    
    def process_payment(self, amount, card_number):
        # რეალურში აქ იქნებოდა payment gateway integration
        print(f"Processing payment: {amount}₾")
        return {"status": "success", "transaction_id": "TXN123456"}

# გამოყენება: main.py
from ecommerce import Product, ShoppingCart, PaymentProcessor

# პროდუქტების შექმნა
laptop = Product("Laptop", 1200, 5)
mouse = Product("Mouse", 25, 50)

# კალათა
cart = ShoppingCart()
cart.add_item(laptop, 1)
cart.add_item(mouse, 2)

print(f"Total: {cart.get_total()}₾")  # Total: 1250₾

# გადახდა
processor = PaymentProcessor("MERCHANT_001")
result = processor.process_payment(cart.get_total(), "1234-5678-9012-3456")
print(result)  # {'status': 'success', 'transaction_id': 'TXN123456'}
```

### 3.4 Nested Packages - ქვეპაკეტები

```python
# webapp/
# ├── __init__.py
# ├── frontend/
# │   ├── __init__.py
# │   ├── templates.py
# │   └── static.py
# └── backend/
#     ├── __init__.py
#     ├── api.py
#     └── database.py

# იმპორტი:
from webapp.frontend import templates
from webapp.backend.api import create_user
from webapp.backend.database import Database

# ან
import webapp.backend.api as api
user = api.create_user("Giorgi")
```

### 3.5 Relative Imports

```python
# პაკეტის შიგნით relative import-ები

# webapp/backend/api.py
from . import database           # იგივე დონის მოდული
from ..frontend import templates # მშობელი პაკეტის სხვა ქვეპაკეტი
from .database import Database   # კონკრეტული კლასი

# . = მიმდინარე საქაღალდე
# .. = მშობელი საქაღალდე
# ... = მშობლის მშობელი
```

---

## 4. Version Control System - Git

### რა არის Version Control?

**Version Control System (VCS)** - სისტემა, რომელიც აკონტროლებს ფაილებში ცვლილებებს დროში. **Git** - ყველაზე პოპულარული VCS.

### 4.1 რატომ გვჭირდება Git?

✅ **ისტორია** - ყველა ცვლილების თვალყურის დევნება  
✅ **თანამშრომლობა** - რამდენიმე ადამიანი მუშაობს ერთ პროექტზე  
✅ **Backup** - კოდის უსაფრთხო შენახვა  
✅ **Branches** - პარალელური განვითარება  
✅ **Rollback** - ძველ ვერსიაზე დაბრუნება

### 4.2 Git ძირითადი კონცეფციები

```
Working Directory → Staging Area → Local Repository → Remote Repository
     (ფაილები)      (git add)      (git commit)      (git push)
```

### 4.3 Git-ის დაწყება

```bash
# Git-ის ინსტალაცია შემოწმება
git --version

# კონფიგურაცია (პირველი გამოყენებისას)
git config --global user.name "Giorgi Beridze"
git config --global user.email "giorgi@example.com"

# რეპოზიტორის ინიციალიზაცია
cd my_project
git init

# Output: Initialized empty Git repository in /path/to/my_project/.git/
```

### 4.4 ძირითადი Git ბრძანებები

```bash
# სტატუსის ნახვა
git status

# ფაილების დამატება staging area-ში
git add myfile.py           # ერთი ფაილი
git add *.py                # ყველა .py ფაილი
git add .                   # ყველა ცვლილება

# Commit - ცვლილებების შენახვა
git commit -m "Add user authentication"

# ისტორიის ნახვა
git log
git log --oneline           # მოკლე ფორმატი
git log --graph             # ვიზუალური

# ცვლილებების ნახვა
git diff                    # არ-დამატებული ცვლილებები
git diff --staged           # staging area-ში ცვლილებები
```

### 4.5 პრაქტიკული მაგალითი

```bash
# პროექტის დაწყება
mkdir todo_app
cd todo_app
git init

# ფაილების შექმნა
echo "# Todo App" > README.md
echo "flask" > requirements.txt

# ფაილების დამატება
git add README.md requirements.txt
git status

# Commit
git commit -m "Initial commit: Add README and requirements"

# კოდის დამატება
cat > app.py << EOF
from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello World!"

if __name__ == '__main__':
    app.run(debug=True)
EOF

# დამატება და commit
git add app.py
git commit -m "Add Flask application"

# ისტორია
git log --oneline
```

### 4.6 .gitignore ფაილი

```bash
# .gitignore - რომელი ფაილები არ უნდა ვერსიონდება

# Python
__pycache__/
*.py[cod]
*$py.class
*.so

# Virtual Environment
venv/
env/
ENV/

# IDEs
.vscode/
.idea/
*.swp

# Database
*.db
*.sqlite3

# Environment variables
.env

# OS
.DS_Store
Thumbs.db

# Logs
*.log
```

### 4.7 Branches - ტოტები

```bash
# Branch არის პარალელური განვითარების ხაზი

# ყველა branch-ის ნახვა
git branch

# ახალი branch-ის შექმნა
git branch feature-login

# Branch-ზე გადასვლა
git checkout feature-login
# ან ახალი სინტაქსი:
git switch feature-login

# შექმნა და გადასვლა ერთდროულად
git checkout -b feature-register
# ან
git switch -c feature-register

# ცვლილებები feature branch-ზე
echo "def login(): pass" > auth.py
git add auth.py
git commit -m "Add login function"

# main branch-ზე დაბრუნება
git checkout main

# branch-ების შერწყმა (merge)
git merge feature-login

# branch-ის წაშლა
git branch -d feature-login
```

### 4.8 Remote Repository - GitHub/GitLab

```bash
# Remote repository-ს დამატება
git remote add origin https://github.com/username/repo.git

# Remote-ების ნახვა
git remote -v

# კოდის ატვირთვა (push)
git push origin main
git push -u origin main    # პირველი push

# კოდის ჩამოტვირთვა (pull)
git pull origin main

# Repository-ს clone
git clone https://github.com/username/repo.git
```

---

## 5. პრაქტიკული სცენარები

### 5.1 პროექტის სტრუქტურა Git-ით

```bash
# პროექტის შექმნა
mkdir library_system
cd library_system
git init

# სტრუქტურის შექმნა
mkdir -p library/{models,utils,api}
touch library/__init__.py
touch library/models/{__init__.py,book.py,user.py}
touch library/utils/{__init__.py,validators.py}
touch library/api/{__init__.py,routes.py}
touch requirements.txt README.md .gitignore

# .gitignore
cat > .gitignore << EOF
__pycache__/
*.pyc
venv/
.env
*.db
EOF

# README
cat > README.md << EOF
# Library Management System

A Python library management system.

## Installation
\`\`\`bash
pip install -r requirements.txt
\`\`\`

## Usage
\`\`\`python
from library import Book, User
\`\`\`
EOF

# requirements.txt
cat > requirements.txt << EOF
flask==2.3.0
sqlalchemy==2.0.0
pytest==7.3.0
EOF

# ყველაფრის commit
git add .
git commit -m "Initial project structure"
```

### 5.2 Feature განვითარება Branch-ით

```python
# main branch-ზე
git checkout main

# ახალი feature branch
git checkout -b feature-book-model

# library/models/book.py
"""Book model for library system."""

class Book:
    def __init__(self, title, author, isbn):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.is_available = True
    
    def borrow(self):
        if self.is_available:
            self.is_available = False
            return True
        return False
    
    def return_book(self):
        self.is_available = True
    
    def __repr__(self):
        status = "Available" if self.is_available else "Borrowed"
        return f"Book('{self.title}' by {self.author}, {status})"

# Commit
git add library/models/book.py
git commit -m "Add Book model with borrow/return functionality"

# main-ში შერწყმა
git checkout main
git merge feature-book-model
git branch -d feature-book-model
```

### 5.3 Conflict Resolution

```bash
# ორი ადამიანი ცვლის იმავე ფაილს

# Developer 1:
git checkout -b dev1-changes
# ცვლის functions.py-ს
git commit -m "Update function signature"

# Developer 2:
git checkout -b dev2-changes
# ცვლის იმავე ფაილს
git commit -m "Add new parameter"

# main-ში merge დროს:
git checkout main
git merge dev1-changes  # OK
git merge dev2-changes  # CONFLICT!

# კონფლიქტის ხელით გადაჭრა:
# <<<<<<< HEAD
# Version 1 code
# =======
# Version 2 code
# >>>>>>> dev2-changes

# გადაწყვეტილების შემდეგ:
git add functions.py
git commit -m "Resolve merge conflict"
```

---

## 6. GitHub/GitLab Workflow

### 6.1 Repository-ს შექმნა GitHub-ზე

```bash
# 1. შექმენით repository GitHub-ზე (Web Interface)

# 2. ლოკალური რეპოზიტორის დაკავშირება
git remote add origin https://github.com/username/myproject.git

# 3. პირველი push
git branch -M main
git push -u origin main

# 4. შემდეგ push-ები
git push
```

### 6.2 Pull Request Workflow

```bash
# 1. Repository-ს Fork GitHub-ზე (თუ სხვისია)

# 2. Clone თქვენი Fork
git clone https://github.com/yourusername/project.git

# 3. Feature Branch
git checkout -b fix-bug-123

# 4. ცვლილებები
# ... edit files ...
git add .
git commit -m "Fix bug #123: Description"

# 5. Push თქვენს Fork-ში
git push origin fix-bug-123

# 6. GitHub-ზე შექმენით Pull Request
# Base: original/main ← Compare: yourfork/fix-bug-123
```

### 6.3 Collaborator Workflow

```bash
# თუ თქვენ ხართ collaborator:

# 1. Clone
git clone https://github.com/team/project.git
cd project

# 2. Branch
git checkout -b feature-new-ui

# 3. Work & Commit
git add .
git commit -m "Add new UI components"

# 4. Push
git push origin feature-new-ui

# 5. Pull Request on GitHub

# 6. Review & Merge

# 7. Update local main
git checkout main
git pull origin main

# 8. Delete merged branch
git branch -d feature-new-ui
git push origin --delete feature-new-ui
```

---

## 7. Best Practices

### 7.1 Commit Messages

```bash
# ✅ კარგი commit messages
git commit -m "Add user authentication module"
git commit -m "Fix: Resolve login timeout issue"
git commit -m "Update: Improve database query performance"
git commit -m "Docs: Add API documentation"

# ❌ ცუდი commit messages
git commit -m "fixed stuff"
git commit -m "updates"
git commit -m "asdfgh"
```

### 7.2 პროექტის სტრუქტურა

```
my_project/
│
├── .git/                 # Git repository (ავტომატური)
├── .gitignore           # Ignored files
├── README.md            # Documentation
├── requirements.txt     # Dependencies
├── setup.py            # Package setup
│
├── src/                 # Source code
│   ├── __init__.py
│   ├── main.py
│   └── utils/
│       ├── __init__.py
│       └── helpers.py
│
├── tests/               # Tests
│   ├── __init__.py
│   └── test_main.py
│
└── docs/                # Documentation
    └── api.md
```

### 7.3 Branching Strategy

```bash
# Git Flow სტრატეგია:

main         # Production-ready code
│
├── develop  # Integration branch
│   │
│   ├── feature-login    # New features
│   ├── feature-payment
│   │
│   └── hotfix-security  # Urgent fixes
```

---

## 8. სავარჯიშოები

### სავარჯიშო 1: მოდულების შექმნა

შექმენით პაკეტი `calculator`:
```
calculator/
├── __init__.py
├── basic.py      # add, subtract, multiply, divide
└── advanced.py   # power, sqrt, factorial
```

გამოიყენეთ `main.py`-ში:
```python
from calculator.basic import add, multiply
from calculator.advanced import power

result1 = add(10, 5)
result2 = power(2, 8)
```

### სავარჯიშო 2: Git პრაქტიკა

```bash
# 1. შექმენით repository
# 2. დაამატეთ Python ფაილები
# 3. გააკეთეთ 3 commit
# 4. შექმენით branch "feature"
# 5. დაამატეთ ახალი ფუნქციონალი
# 6. merge გააკეთეთ main-ში
```

### სავარჯიშო 3: სრული პროექტი

შექმენით `blog` პაკეტი Git-ით:
```
blog/
├── models/
│   ├── __init__.py
│   ├── post.py
│   └── author.py
├── utils/
│   ├── __init__.py
│   └── markdown.py
└── api/
    ├── __init__.py
    └── routes.py
```

---

## 9. შემაჯამებელი

### Python Modules & Packages

| კონცეფცია | აღწერა | მაგალითი |
|-----------|--------|----------|
| **Module** | ერთი .py ფაილი | `utils.py` |
| **Package** | საქაღალდე მოდულებით | `myapp/` |
| **import** | მოდულის ჩატვირთვა | `import math` |
| **from...import** | კონკრეტული იმპორტი | `from math import pi` |
| **__init__.py** | პაკეტის ინიციალიზაცია | საქაღალდის პაკეტად გარდაქმნა |

### Git Essentials

| ბრძანება | მიზანი |
|----------|--------|
| `git init` | რეპოზიტორის შექმნა |
| `git add` | staging area-ში დამატება |
| `git commit` | ცვლილებების შენახვა |
| `git push` | remote-ზე ატვირთვა |
| `git pull` | remote-დან ჩამოტვირთვა |
| `git branch` | branch-ების მართვა |
| `git merge` | branch-ების შერწყმა |
| `git clone` | repository-ს კოპირება |

### Workflow რეკომენდაციები

1. ✅ **დაყავით კოდი** მოდულებად და პაკეტებად
2. ✅ **გამოიყენეთ** `__init__.py` პაკეტების ორგანიზაციისთვის
3. ✅ **დაწერეთ** docstrings თითოეულ მოდულში
4. ✅ **გააკეთეთ** commit-ები პატარა, ლოგიკური ნაწილებით
5. ✅ **იმუშავეთ** branch-ებზე ახალი feature-ებისთვის
6. ✅ **დაწერეთ** გასაგები commit messages
7. ✅ **გამოიყენეთ** .gitignore არასაჭირო ფაილებისთვის
8. ✅ **გააკეთეთ** pull request-ები გუნდური მუშაობისთვის

---

## 10. დამატებითი რესურსები

### Python Modules & Packages
- 📘 Python Modules: https://docs.python.org/3/tutorial/modules.html
- 📦 Python Packages: https://packaging.python.org

### Git & Version Control
- 📖 Pro Git Book: https://git-scm.com/book
- 🎓 GitHub Learning Lab: https://lab.github.com
- 🔧 Git Reference: https://git-scm.com/docs

### პრაქტიკა
- 💻 GitHub: https://github.com
- 🦊 GitLab: https://gitlab.com
- 🏆 Git Exercises: https://gitexercises.fracz.com

---

## დასკვნა

🎯 **მოდულები და პაკეტები** - კოდის ორგანიზაციის საფუძველი

🎯 **Import სტრატეგიები** - სწორი იმპორტირება წარმატების გასაღებია

🎯 **Git** - აუცილებელი ინსტრუმენტი ყველა დეველოპერისთვის
