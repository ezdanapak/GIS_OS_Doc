# დამატებითი საკითხები, ნაწილი 1

## PEP 8 – Python კოდის სტილის გიდი
**PEP 8** არის ოფიციალური სტანდარტი Python კოდის წერის სტილზე.  
მისი მიზანია კოდის **კონსისტენტურობა**, **წაკითხვადობა** და **თანმიმდევრულობა**.

### ძირითადი პრინციპები
- **ინტენდაცია:** 4 space (არ გამოიყენოთ tab).  
- **ხაზის სიგრძე:** მაქსიმუმ 79 სიმბოლო.  
- **ცვლადების სახელები:**  
  - `lower_case_with_underscores` – ცვლადები და ფუნქციები  
  - `UPPER_CASE` – კონსტანტები  
  - `CamelCase` – კლასები  
- **იმპორტები:** თითო ხაზზე ერთი მოდული.  
- **ცარიელი ხაზები:** ფუნქციებს შორის მინიმუმ ერთი ცარიელი ხაზი.

```python
def calculate_area(width, height):
    return width * height
```

---

## Style Guide Checker-ები
სტანდარტების ავტომატური შემოწმება შესაძლებელია სპეციალური ინსტრუმენტებით:

- **pycodestyle** – ამოწმებს PEP 8 შესაბამისობას  
- **flake8** – ამოწმებს სინტაქსს, სტილს და მარტივ შეცდომებს  
- **pylint** – უფრო ფართო ანალიზი, ხარისხის ქულით  
- **black** – კოდის ავტომატური ფორმატერი (PEP 8 friendly)  
- **isort** – იმპორტების დალაგება

მაგალითი:
```bash
pip install flake8
flake8 myscript.py
```

---

## PyPI – Python Package Index
**PyPI** არის Python-ის ოფიციალური პაკეტების რეპოზიტორი.  
პროგრამისტები აქ აქვეყნებენ და აზიარებენ თავიანთ ბიბლიოთეკებს.

პაკეტის ინსტალაცია:
```bash
pip install requests
```

პაკეტის განახლება:
```bash
pip install --upgrade requests
```

---

## პარალელი სხვა ენების პაკეტ მენეჯერებთან
- **JavaScript** → npm (Node Package Manager)  
- **Java** → Maven, Gradle  
- **Ruby** → RubyGems  
- **PHP** → Composer  
- **.NET** → NuGet  

Python-ში `pip` არის ძირითადი ინსტრუმენტი, რომელიც მუშაობს PyPI რეპოზიტორთან.

---

## [1] პრაქტიკული დავალება

### დისკუსია
- კოდის წერის სტანდარტები ზრდის **გუნდური მუშაობის ეფექტურობას**.  
- **style checker-ები** ამარტივებენ რევიუს პროცესს.  
- სტუდენტებმა უნდა გაიაზრონ, რომ „მუშა კოდი“ != „კარგი კოდი“ – სტილი მნიშვნელოვანია.

### დავალება
1. დაწერე პატარა მოდული (მაგ.: `geometry.py`), რომელშიც იქნება ფუნქცია მართკუთხედის ფართობისთვის.  
2. გაუშვი **flake8** ან **black** სტილის შემოწმებისთვის.  
3. შექმენი შენი პაკეტი და ატვირთე PyPI-ზე (სასწავლო მიზნებისთვის შეგიძლია გამოიყენო [TestPyPI](https://test.pypi.org/)).  

#### პაკეტის სტრუქტურა
```
geometry/
  ├── geometry/
  │   ├── __init__.py
  │   └── area.py
  ├── setup.py
  ├── README.md
  └── LICENSE
```

#### setup.py (მაგალითი)
```python
from setuptools import setup, find_packages

setup(
    name="geometry",
    version="0.1",
    packages=find_packages(),
    install_requires=[],
    author="Your Name",
    description="Simple geometry utilities",
    url="https://github.com/yourname/geometry",
)
```

PyPI-ზე ატვირთვა:
```bash
pip install twine
python setup.py sdist
twine upload dist/*
```

---

## დასკვნა
- PEP 8 – Python-ის „კოდექსი“ სტილზე.  
- Checker-ები → ხელს უწყობს სტანდარტების დაცვას.  
- PyPI – ცენტრალური ადგილი ბიბლიოთეკების გასაზიარებლად.  
- სხვა ენებშიც არსებობს მსგავსი მენეჯერები.  
- პრაქტიკაში: შექმენი პაკეტი, გადაამოწმე სტილი, ატვირთე TestPyPI-ზე.
