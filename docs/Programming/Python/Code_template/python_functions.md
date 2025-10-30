# 🧩 ფუნქციები Python-ში

ფუნქცია არის კოდის ბლოკი, რომელიც ასრულებს კონკრეტულ ამოცანას.  
ის იძახება საჭიროებისამებრ და ამცირებს კოდის გამეორებას.

---

## 🔹 რატომ ვიყენებთ ფუნქციებს?
- კოდი ხდება უფრო მოკლე და გასაგები  
- ადვილია შეცვლა და გამართვა  
- შეგვიძლია ერთი ფუნქცია მრავალჯერ გამოვიყენოთ სხვადასხვა მონაცემებზე  

---

## 🔹 ფუნქციის შექმნა (`def` საკვანძო სიტყვით)

ფუნქცია იქმნება საკვანძო სიტყვით `def` და მისი სახელით.  
შიგნით წერია მოქმედება, ხოლო სურვილისამებრ — დაბრუნების მნიშვნელობა `return`.

## 🔹 უპარამეტრო ფუნქცია | ფუნქციის გამოძახება

```python
def greet():
    print("გამარჯობა!")
greet()
```
📘 შედეგი:
გამარჯობა!


## 🔹 პარამეტრიანი ფუნქცია | ფუნქციის გამოძახება
პარამეტრები — ეს არის ცვლადები, რომლებსაც ფუნქცია იღებს, როცა მას ვიძახებთ.

```python

def greet(name):
    print("გამარჯობა,", name, "!")
    
greet("გიორგი")
```
📘 შედეგი:
გამარჯობა, გიორგი !

## 🔹 გაჩუმებით (ნაგულისხმევი) პარამეტრი
თუ მომხმარებელი არ გადასცემს მნიშვნელობას, ფუნქცია გამოიყენებს ნაგულისხმევს.

```python
def greet(name="გიორგი"):
    print("გამარჯობა,", name, "!")

greet()
greet("ნინო")
```
📘 შედეგი:

გამარჯობა, გიორგი ! <br>
გამარჯობა, ნინო !

## 🔹 ფუნქცია, რომელიც აბრუნებს მნიშვნელობას (return)
```python

def square(x):
    return x * x

result = square(5)
print("რიცხვის კვადრატი არის:", result)
```
📘 შედეგი:
რიცხვის კვადრატი არის: 25

## 🔹 ანონიმური (lambda) ფუნქცია
თუ ფუნქცია ძალიან მოკლეა, შეგვიძლია გამოვიყენოთ lambda.

```python
square = lambda x: x * x
print("4 ის კვადრატია:", square(4))
```
📘 შედეგი:
4 ის კვადრატია: 16

## 🧠 პრაქტიკული ამოცანები

- დაწერე ფუნქცია hello_world(), რომელიც დაბეჭდავს ტექსტს "Hello, World!" <br>

- შექმენი ფუნქცია add(a, b), რომელიც დააბრუნებს ორი რიცხვის ჯამს. <br>

- შეცვალე წინა ფუნქცია ისე, რომ თუ მეორე რიცხვი არ არის გადაცემული, მნიშვნელობა იყოს 0. <br>

- დაწერე ფუნქცია is_even(n), რომელიც აბრუნებს True, თუ რიცხვი ლუწია. <br>

- გამოიყენე lambda, რათა შექმნა მოკლე ფუნქცია, რომელიც აბრუნებს რიცხვის სამმაგს. <br>

- შექმენი ფუნქცია greet_user(name, lang="ka"), რომელიც დაბეჭდავს: <br>

"გამარჯობა" თუ lang="ka" <br>

"Hello" თუ lang="en" <br>

- დაწერე ფუნქცია, რომელიც მიიღებს სიას და დაბეჭდავს მხოლოდ ლუწ რიცხვებს. <br>


---


- ამოცანა 1: ფაქტორიალი

დაწერეთ ფუნქცია factorial(n), რომელიც ითვლის n-ის ფაქტორიალს (n! = 1 * 2 * ... * n).
მაგალითი: factorial(5) → 120
ფუნქციამ უნდა მიიღოს ერთი პარამეტრი n.


- ამოცანა 2: მისალმება გაჩუმებით პარამეტრით

შექმენით ფუნქცია say_hello(name="Guest"), რომელიც ბეჭდავს „Hello, [name]!“. თუ სახელი არ გადაეცემა, გამოიყენოს „Guest“.


- ამოცანა 3: კვადრატების ჯამი

დაწერეთ ფუნქცია sum_of_squares(n), რომელიც ითვლის 1-დან n-მდე რიცხვების კვადრატების ჯამს (1² + 2² + ... + n²).
მაგალითი: sum_of_squares(3) → 14 (1² + 2² + 3² = 1 + 4 + 9 = 14).


- ამოცანა 4: Lambda ფუნქცია

გამოიყენეთ lambda ფუნქცია, რომელიც ითვლის მოცემული რიცხვის კუბს (x³).
მაგალითი: (lambda x: x**3)(4) → 64.


- ამოცანა 5: მარტივი კალკულატორი

შექმენით ფუნქცია calculate(a, b, operation="add"), რომელიც ასრულებს მითითებულ ოპერაციას (გაკრება, გამოკლება, გამრავლება) ორ რიცხვზე. თუ ოპერაცია არ არის მითითებული, ნაგულისხმევად აკეთებს გაკრებას.



!!! tip "რჩევა"
    ფუნქციების განსაზღვრისას გამოიყენეთ def საკვანძო სიტყვა. <br>
    return-ის გამოყენებით ფუნქციამ შეიძლება დააბრუნოს მნიშვნელობა. <br>
    Lambda ფუნქციები გამოიყენეთ მხოლოდ მარტივი ოპერაციებისთვის. <br>
    ყოველთვის შეამოწმეთ შეყვანილი მონაცემების ვალიდურობა (მაგ., უარყოფითი რიცხვები factorial-ისთვის). <br>





---


```python
def hello_world():
    print("Hello, World!")


def add(a, b=0):
    return a + b


def is_even(n):
    return n % 2 == 0


triple = lambda x: x * 3


def greet_user(name, lang="ka"):
    if lang == "ka":
        print("გამარჯობა")
    elif lang == "en":
        print("Hello")


def print_even_numbers(numbers):
    for n in numbers:
        if n % 2 == 0:
            print(n)


def factorial(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result


def say_hello(name="Guest"):
    print(f"Hello, {name}!")


def sum_of_squares(n):
    return sum(i**2 for i in range(1, n + 1))


cube = lambda x: x ** 3


def calculate(a, b, operation="add"):
    if operation == "add":
        return a + b
    elif operation == "subtract":
        return a - b
    elif operation == "multiply":
        return a * b
    else:
        return None

```

- მისალმება
**აღწერა:** დაწერეთ ფუნქცია, რომელიც იღებს სახელს და აბრუნებს მისალმებას.
მოთხოვნა: გამოიყენეთ return.

```python
# მაგალითი
print(greet("ანა"))  # "გამარჯობა, ანა!"

```

- კვადრატი

**აღწერა:** დაწერეთ ფუნქცია, რომელიც აბრუნებს რიცხვის კვადრატს.
```python
# მაგალითი
print(square(5))  # 25

```

- მაქსიმუმი ორ რიცხვს შორის
**აღწერა:** დაწერეთ ფუნქცია, რომელიც აბრუნებს ორი რიცხვიდან უდიდესს (გამოიყენეთ max არ გჭირდებათ).

```python
# მაგალითი
print(max_of_two(3, 7))  # 7

```
- ლუწია თუ კენტი?

**აღწერა:** დაწერეთ ფუნქცია, რომელიც ამოწმებს, ლუწია თუ კენტი რიცხვი.
```python
# მაგალითი
print(is_even(4))   # True
print(is_even(5))   # False

```
- ფაქტორიალი

**აღწერა:** დაწერეთ რეკურსიული ფუნქცია, რომელიც ითვლის ფაქტორიალს.

```python
# მაგალითი
print(factorial(5))  # 120
```

- სტრიქონის სიგრძე
**აღწერა:** დაწერეთ ფუნქცია, რომელიც აბრუნებს სტრიქონის სიგრძეს (len()-ის გარეშე).

```python
# მაგალითი
print(str_length("გამარჯობა"))  # 8

```

- პოზიტივი
**აღწერა:** დაწერეთ ფუნქცია, რომელიც ამოწმებს, დადებითია თუ არა რიცხვი.
```python
# მაგალითი
print(is_positive(-3))  # False
print(is_positive(0))   # False
print(is_positive(5))   # True

```
- საშუალო არითმეტიკული
**აღწერა:** დაწერეთ ფუნქცია, რომელიც ითვლის ორი რიცხვის საშუალოს.
```python
# მაგალითი
print(average(10, 20))  # 15.0

```

- სტრიქონის გამეორება

**აღწერა:** დაწერეთ ფუნქცია, რომელიც აბრუნებს სტრიქონს გამეორებულს n ჯერ.
```python
# მაგალითი
print(repeat("ჰა", 3))  # "ჰაჰაჰა"

```
- სამკუთხედის ფართობი

**აღწერა:** დაწერეთ ფუნქცია, რომელიც ითვლის სამკუთხედის ფართობს (ფუძე × სიმაღლე / 2).
```python
# მაგალითი
print(triangle_area(6, 8))  # 24.0

```
- სიტყვების რაოდენობა
**აღწერა:** დაწერეთ ფუნქცია, რომელიც ითვლის წინადადებაში სიტყვების რაოდენობას.
```python

# მაგალითი
print(word_count("გამარჯობა როგორ ხარ?"))  # 3
```

- ციფრების ჯამი
**აღწერა:** დაწერეთ ფუნქცია, რომელიც ითვლის მთელ რიცხვში ციფრების ჯამს.

```python
# მაგალითი
print(digit_sum(1234))  # 10

```

- მინიმუმი სამი რიცხვიდან
**აღწერა:** დაწერეთ ფუნქცია, რომელიც აბრუნებს სამი რიცხვიდან უმცირესს (min არ გამოიყენოთ).

```python
# მაგალითი
print(min_of_three(5, 2, 8))  # 2

```

---

## 1. მისალმება
```python
def greet(name):
    # აბრუნებს: "გამარჯობა, [სახელი]!"
    pass
```
```python
print(greet("ანა"))  # გამარჯობა, ანა!
```

---

## 2. რიცხვის კვადრატი
```python
def square(num):
    # აბრუნებს რიცხვის კვადრატს
    pass
```
```python
print(square(7))  # 49
```

---

## 3. ორი რიცხვიდან მაქსიმუმი
```python
def max_of_two(a, b):
    # აბრუნებს უდიდესს (if-ის გამოყენებით)
    pass
```
```python
print(max_of_two(10, 4))  # 10
```

---

## 4. ლუწია თუ კენტი?
```python
def is_even(n):
    # აბრუნებს True თუ ლუწია, False თუ კენტი
    pass
```
```python
print(is_even(6))   # True
print(is_even(9))   # False
```

---

## 5. ფაქტორიალი (რეკურსია)
```python
def factorial(n):
    # 5! = 5 × 4 × 3 × 2 × 1 = 120
    pass
```
```python
print(factorial(5))  # 120
```

---

## 6. სტრიქონის სიგრძე (`len()`-ის გარეშე)
```python
def str_length(text):
    # ითვლის სიმბოლოების რაოდენობას
    pass
```
```python
print(str_length("გამარჯობა"))  # 8
```

---

## 7. დადებითია თუ არა?
```python
def is_positive(num):
    # True თუ > 0, False თუ <= 0
    pass
```
```python
print(is_positive(5))   # True
print(is_positive(-2))  # False
print(is_positive(0))   # False
```

---

## 8. საშუალო არითმეტიკული
```python
def average(a, b):
    # (a + b) / 2
    pass
```
```python
print(average(10, 20))  # 15.0
```

---

## 9. სტრიქონის გამეორება
```python
def repeat(text, times):
    # "ჰა" × 3 → "ჰაჰაჰა"
    pass
```
```python
print(repeat("ჰა", 3))  # ჰაჰაჰა
```

---

## 10. სამკუთხედის ფართობი
```python
def triangle_area(base, height):
    # ფართობი = (ფუძე × სიმაღლე) / 2
    pass
```
```python
print(triangle_area(5, 10))  # 25.0
```

---

## 11. სიტყვების რაოდენობა წინადადებაში
```python
def word_count(sentence):
    # "გამარჯობა მსოფლიო" → 2
    pass
```
```python
print(word_count("გამარჯობა მსოფლიო პითონი"))  # 3
```

---

## 12. ციფრების ჯამი რიცხვში
```python
def digit_sum(number):
    # 123 → 1 + 2 + 3 = 6
    pass
```
```python
print(digit_sum(1234))  # 10
```

---

## 13. პალინდრომის შემოწმება
```python
def is_palindrome(text):
    # "რადარ" → True, "პითონი" → False
    pass
```
```python
print(is_palindrome("რადარ"))     # True
print(is_palindrome("სალამი"))     # False
```

---

## 14. სამი რიცხვიდან მინიმუმი
```python
def min_of_three(a, b, c):
    # `min()` არ გამოიყენოთ
    pass
```
```python
print(min_of_three(5, 2, 8))  # 2
```

---

## 15. სტრიქონის შებრუნება (სლაისინგის გარეშე)
```python
def reverse_string(text):
    # "პითონი" → "ინოთიპ"
    pass
```
```python
print(reverse_string("პითონი"))  # ინოთიპ
```

---

**შენიშვნა:**  
ყველა ფუნქცია უნდა დაიწყოს `def`-ით და აბრუნებდეს შედეგს `return`-ით (სადაც საჭიროა).  
გამოიყენეთ `if`, `for`, `while`, რეკურსია — სირთულის მიხედვით.


> **რჩევა:** გამოიყენეთ `assert` ან `print` შედეგების შესამოწმებლად.

---

## 1. `greet(name)`
```python
def test_greet():
    assert greet("ანა") == "გამარჯობა, ანა!"
    assert greet("გიორგი") == "გამარჯობა, გიორგი!"
    print("greet() — PASS")
```

---

## 2. `square(num)`
```python
def test_square():
    assert square(5) == 25
    assert square(0) == 0
    assert square(-4) == 16
    print("square() — PASS")
```

---

## 3. `max_of_two(a, b)`
```python
def test_max_of_two():
    assert max_of_two(3, 7) == 7
    assert max_of_two(10, 5) == 10
    assert max_of_two(-2, -5) == -2
    print("max_of_two() — PASS")
```

---

## 4. `is_even(n)`
```python
def test_is_even():
    assert is_even(4) == True
    assert is_even(7) == False
    assert is_even(0) == True
    print("is_even() — PASS")
```

---

## 5. `factorial(n)`
```python
def test_factorial():
    assert factorial(0) == 1
    assert factorial(1) == 1
    assert factorial(5) == 120
    assert factorial(3) == 6
    print("factorial() — PASS")
```

---

## 6. `str_length(text)`
```python
def test_str_length():
    assert str_length("") == 0
    assert str_length("ა") == 1
    assert str_length("გამარჯობა") == 8
    assert str_length("Python 3") == 8
    print("str_length() — PASS")
```

---

## 7. `is_positive(num)`
```python
def test_is_positive():
    assert is_positive(5) == True
    assert is_positive(0) == False
    assert is_positive(-3) == False
    print("is_positive() — PASS")
```

---

## 8. `average(a, b)`
```python
def test_average():
    assert average(10, 20) == 15.0
    assert average(0, 0) == 0.0
    assert average(-5, 5) == 0.0
    print("average() — PASS")
```

---

## 9. `repeat(text, times)`
```python
def test_repeat():
    assert repeat("ჰა", 3) == "ჰაჰაჰა"
    assert repeat("ა", 1) == "ა"
    assert repeat("ტესტი", 0) == ""
    print("repeat() — PASS")
```

---

## 10. `triangle_area(base, height)`
```python
def test_triangle_area():
    assert triangle_area(6, 8) == 24.0
    assert triangle_area(5, 10) == 25.0
    assert triangle_area(0, 10) == 0.0
    print("triangle_area() — PASS")
```

---

## 11. `word_count(sentence)`
```python
def test_word_count():
    assert word_count("გამარჯობა") == 1
    assert word_count("გამარჯობა მსოფლიო") == 2
    assert word_count("  ა   ბ  ") == 2
    assert word_count("") == 0
    print("word_count() — PASS")
```

---

## 12. `digit_sum(number)`
```python
def test_digit_sum():
    assert digit_sum(1234) == 10
    assert digit_sum(9) == 9
    assert digit_sum(0) == 0
    assert digit_sum(555) == 15
    print("digit_sum() — PASS")
```

---

## 13. `is_palindrome(text)`
```python
def test_is_palindrome():
    assert is_palindrome("რადარ") == True
    assert is_palindrome("აბა") == True
    assert is_palindrome("სალამი") == False
    assert is_palindrome("") == True
    assert is_palindrome("ა") == True
    print("is_palindrome() — PASS")
```

---

## 14. `min_of_three(a, b, c)`
```python
def test_min_of_three():
    assert min_of_three(5, 2, 8) == 2
    assert min_of_three(3, 3, 3) == 3
    assert min_of_three(-1, -5, 0) == -5
    print("min_of_three() — PASS")
```

---

## 15. `reverse_string(text)`
```python
def test_reverse_string():
    assert reverse_string("პითონი") == "ინოთიპ"
    assert reverse_string("abc") == "cba"
    assert reverse_string("") == ""
    assert reverse_string("ა") == "ა"
    print("reverse_string() — PASS")
```

---

## სრული ტესტის გაშვება

```python

def run_all_tests():
    test_greet()
    test_square()
    test_max_of_two()
    test_is_even()
    test_factorial()
    test_str_length()
    test_is_positive()
    test_average()
    test_repeat()
    test_triangle_area()
    test_word_count()
    test_digit_sum()
    test_is_palindrome()
    test_min_of_three()
    test_reverse_string()
    print("\nყველა ტესტი წარმატებით გაიარა! 🎉")
run_all_tests()
```
