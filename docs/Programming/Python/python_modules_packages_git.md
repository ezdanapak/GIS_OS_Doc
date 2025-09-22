# დამატებითი საკითხები, ნაწილი 2

## მოდულები Python-ში
**მოდული** არის Python ფაილი (`.py`), რომელიც შეიცავს ცვლადებს, ფუნქციებსა და კლასებს.  
მოდულები საშუალებას გვაძლევს კოდი დავყოთ ლოგიკურ ნაწილებად.

### import ინსტრუქცია
```python
import math

print(math.sqrt(16))   # 4.0
```

### from … import ინსტრუქცია
```python
from math import sqrt, pi

print(sqrt(25))    # 5.0
print(pi)          # 3.14159...
```

### ასახელი (alias)
```python
import numpy as np
```

---

## მოდულის მოძებნა და ხელმეორედ ჩატვირთვა
Python ეძებს მოდულებს `sys.path`-ში მითითებულ გზებზე.

```python
import sys
print(sys.path)
```

მოდულის ხელმეორედ ჩატვირთვა (`reload`) სასარგებლოა ინტერაქტიულ გარემოში:
```python
import importlib
import mymodule

importlib.reload(mymodule)
```

---

## პაკეტები
**პაკეტი** არის დირექტორია, რომელიც შეიცავს რამდენიმე მოდულს და ფაილს `__init__.py`.  
ეს საშუალებას იძლევა კოდი ორგანიზდეს უფრო დიდ პროექტებში.

სტრუქტურის მაგალითი:
```
mypackage/
    __init__.py
    module1.py
    module2.py
```

გამოყენება:
```python
from mypackage import module1
```

---

## ვერსიების კონტროლის სისტემები
**ვერსიების კონტროლი (VCS)** – საშუალებას იძლევა კოდის ისტორიის შენახვა, გუნდის მუშაობა და ცვლილებების კონტროლი.

### Git – ყველაზე პოპულარული სისტემა
ძირითადი ოპერაციები:
```bash
git init                 # ახალი რეპოზიტორიის შექმნა
git clone URL            # პროექტის გადმოწერა
git status               # მდგომარეობის შემოწმება
git add file.py          # ცვლილებების stage
git commit -m "msg"      # კომიტი
git push                 # ატვირთვა
git pull                 # განახლება
```

### GitHub/GitLab/Bitbucket
ონლაინ პლატფორმები, რომლებიც Git-ს ემყარება და ამარტივებს თანამშრომლობას.

---

## შემაჯამებელი ლექცია
ამ ნაწილში შევისწავლეთ:
- მოდულები და მათი იმპორტი (`import`, `from … import`, alias)
- მოდულის მოძებნა და ხელმეორედ ჩატვირთვა (`importlib.reload`)
- პაკეტების სტრუქტურა (`__init__.py`)
- ვერსიების კონტროლის სისტემა (Git)
- Git-ის ძირითადი ოპერაციები და გამოყენება გუნდურ პროექტებში

---

## [1] პრაქტიკული დავალება #5

**დავალება:**  
1. შექმენი პაკეტი სახელით `geometry`, სადაც იქნება მოდული `area.py`.  
2. `area.py`-ში აღწერე ფუნქცია `rectangle_area(a, b)`.  
3. მთავარი პროგრამიდან (`main.py`) გამოიყენე ეს პაკეტი `import`-ით და გამოიტანე მართკუთხედის ფართობი.  
4. შექმენი Git რეპოზიტორია, დააკომიტე და ატვირთე GitHub-ზე.

### სტრუქტურა
```
geometry/
  ├── geometry/
  │   ├── __init__.py
  │   └── area.py
  ├── main.py
  ├── README.md
```

### area.py
```python
def rectangle_area(a, b):
    return a * b
```

### main.py
```python
from geometry import area

print("მართკუთხედის ფართობი =", area.rectangle_area(5, 10))
```

### Git ოპერაციები
```bash
git init
git add .
git commit -m "Initial commit - geometry package"
git branch -M main
git remote add origin https://github.com/user/geometry.git
git push -u origin main
```

---

## განხილვა-ანალიზი
- პაკეტები Python-ში საშუალებას იძლევა პროექტის სტრუქტურირება.  
- `import` და `from … import` საჭიროა კოდის ხელახლა გამოყენებისთვის.  
- Git უზრუნველყოფს კოდის ცვლილებების ისტორიის შენახვას და კოლაბორაციას.  
- დავალებაში სტუდენტი სწავლობს: **პაკეტის შექმნას**, **მოდულის იმპორტს**, **Git-ის მუშაობას** და **GitHub-ზე ატვირთვას**.

