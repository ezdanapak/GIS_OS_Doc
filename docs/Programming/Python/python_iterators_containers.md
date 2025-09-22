# იტერატორები და კონტეინერები Python-ში

## შესავალი
**იტერირებადი ობიექტი (iterable)** – ობიექტი, რომელზეც შეგვიძლია იტერაცია `for` ციკლით (მაგ.: `list`, `tuple`, `dict`, `set`, `str`).  
**იტერატორი (iterator)** – ობიექტი, რომელიც ინახავს მიმდინარე პოზიციას და აბრუნებს მომდევნო ელემენტს `__next__()` მეთოდით, სანამ წარმოიშვება `StopIteration`.

- Iterable → უზრუნველყოფს `__iter__()` მეთოდს, რომელიც აბრუნებს **იტერატორს**
- Iterator → უზრუნველყოფს `__iter__()` და `__next__()` მეთოდებს

```python
nums = [10, 20, 30]       # iterable (სია)
it = iter(nums)           # ვიღებთ iterator-ს
print(next(it))           # 10
print(next(it))           # 20
print(next(it))           # 30
# next(it) გამოიწვევს StopIteration
```

---

## კონტეინერები (Containers) და სექვენსები (Sequences)
**კონტეინერი** არის ტიპი, რომელიც ინახავს სხვა ობიექტებს. ძირითადი ჯგუფები:
- **Sequences (მიმდევრობები):** `list`, `tuple`, `str`, `range`
- **Sets (სიმრავლეები):** `set`, `frozenset`
- **Mappings (ასოც. კოლექციები):** `dict`

მახასიათებლები:
- სექვენსებს აქვთ **ინდექსაცია** და **წესრიგი** (`list`, `tuple`, `str`).
- `set` არ ინახავს დუბლიკატებს და ელემენტების წესრიგი განსაზღვრული არაა.
- `dict` ინახავს **გასაღები→მნიშვნელობა** წყვილებს (Python 3.7+ ინარჩუნებს ჩასმის წესრიგს).

```python
seq = [1, 2, 3]             # sequence
bag = {1, 2, 2, 3}          # set → {1, 2, 3}
mapping = {"a": 1, "b": 2}  # dict
```

---

## Iterable vs Iterator პროტოკოლი
```python
class CountDown:
    def __init__(self, start):
        self.current = start
    def __iter__(self):         # iterable → iterator-სვე აბრუნებს
        return self
    def __next__(self):         # iterator
        if self.current <= 0:
            raise StopIteration
        val = self.current
        self.current -= 1
        return val

for x in CountDown(3):          # 3, 2, 1
    print(x)
```

---

## გენერატორები (Generators)
გენერატორი არის ფუნქცია, რომელიც იყენებს `yield`-ს iterator-ის შესაქმნელად.  
მეხსიერებას ხარჯავს „ზარმაცად“ – ელემენტებს აბრუნებს მოთხოვნისამებრ.

```python
def squares(n):
    for i in range(n):
        yield i * i

g = squares(4)        # generator
print(next(g))        # 0
print(list(g))        # [1, 4, 9]
```

### გენერატორის გამოსახულება (Generator Expression)
```python
gexpr = (x*x for x in range(5))
print(next(gexpr))    # 0
print(sum(gexpr))     # 30 (დანარჩენების ჯამი)
```

---

## სასარგებლო ჩაშენებული იტერატორები
- `enumerate(iterable, start=0)` – ინდექსით იტერაცია
- `zip(a, b, ...)` – პარალელური იტერაცია
- `reversed(seq)` – შებრუნებული იტერაცია (მხოლოდ სექვენსებზე)
- `map(func, iterable)` – ფუნქციის გამოყენება ყოველ ელემენტზე
- `filter(func, iterable)` – ფილტრაცია ბულეანი ფუნქციით

```python
names = ["Ana", "Gio", "Nino"]
for i, n in enumerate(names, start=1):
    print(i, n)

a = [1, 2, 3]
b = [10, 20, 30]
print(list(zip(a, b)))           # [(1, 10), (2, 20), (3, 30)]
print(list(map(lambda x: x*2, a)))      # [2, 4, 6]
print(list(filter(lambda x: x%2==1, a)))# [1, 3]
```

---

## itertools — ძლიერი იტერაციული ინსტრუმენტები
```python
from itertools import count, cycle, repeat, chain, islice, takewhile

# უსასრულო მრიცხველი (ფრთხილად!) + islice-ით შეზღუდვა
print(list(islice(count(start=5, step=2), 5)))   # [5, 7, 9, 11, 13]

# გამეორება
print(list(islice(repeat("Hi"), 3)))             # ['Hi', 'Hi', 'Hi']

# ციკლური გაშვება
print(list(islice(cycle("AB"), 5)))              # ['A','B','A','B','A']

# ჯაჭვი
print(list(chain([1,2], [3,4])))                 # [1, 2, 3, 4]

# პირობით შეწყვეტამდე
print(list(takewhile(lambda x: x<10, count(0,3)))) # [0,3,6,9]
```

---

## მეხსიერება: სია vs იტერატორი
- **სია** ინახავს ყველა ელემენტს მეხსიერებაში.
- **იტერატორი/გენერატორი** გამოითვლის ელემენტს „მოყვანისას“.  
დიდ მონაცემებზე/სტრიმებზე ჯობს გენერატორები.

```python
# სიის შემქმნელი comprehension
squares_list = [x*x for x in range(10_000)]  # მეტ მეხსიერებას ხარჯავს

# გენერატორის გამოსახულება
squares_gen = (x*x for x in range(10_000))   # მინიმალური მეხსიერება
```

---

## [1] პრაქტიკული დავალება #4

**ამოცანა:**  
დაწერე მოდულარული პროგრამა, რომელიც:
1) ქმნის **იტერატორს** `EvenRange(start, stop)` — აბრუნებს მხოლოდ ლუწ რიცხვებს [start, stop) დიაპაზონში.  
2) იყენებს **გენერატორს** `chunked(iterable, size)` — აბრუნებს ელემენტებს ჯგუფებად (ლისტებად) მოცემული ზომით.  
3) main ბლოკში `zip` + `enumerate`-ით აჩვენებს ჯგუფებს ინდექსებით.  
4) ანალიზისთვის აჩვენე `list` vs გენერატორის მეხსიერებითი განსხვავება.

**კოდი:**
```python
class EvenRange:
    def __init__(self, start, stop):
        self.current = start if start % 2 == 0 else start + 1
        self.stop = stop
    def __iter__(self):
        return self
    def __next__(self):
        if self.current >= self.stop:
            raise StopIteration
        val = self.current
        self.current += 2
        return val

def chunked(iterable, size):
    buf = []
    for item in iterable:
        buf.append(item)
        if len(buf) == size:
            yield buf
            buf = []
    if buf:
        yield buf

def main():
    er = EvenRange(3, 15)      # 4,6,8,10,12,14
    groups = chunked(er, 3)    # [[4,6,8], [10,12,14]]

    for idx, grp in enumerate(groups, start=1):
        print(f"ჯგუფი {idx}:", grp)

    # მეხსიერების შედარების იდეა (სქემატურად)
    squares_list = [x*x for x in range(1_000_00)]      # დიდი სია
    squares_gen = (x*x for x in range(1_000_00))       # გენერატორი
    print("სიის ზომა (ელემენტების რაოდენობა):", len(squares_list))
    # გენერატორს ზომა არ აქვს წინასწარ – ელემენტები „მოაქვს“ საჭიროებისას
    # print(len(squares_gen))  # არიმისაჭირო/შეუძლებელია პირდაპირ

if __name__ == "__main__":
    main()
```

**რჩევები:**  
- საჭიროებისამებრ `itertools.islice`-ით შეგიძლიათ „დაჭრათ“ უსასრულო/დიდი იტერატორები.  
- `zip_longest` (itertools) გამოგადგებათ არათანაბარი სიგრძის კოლექციების პარალელური იტერაციისას.

---

## განხილვა–ანალიზი
- `EvenRange` გვაჩვენებს iterator პროტოკოლის მინიმალურ იმპლემენტაციას.  
- `chunked` გენერატორი მუშაობს სტრიმულირებადი მოცემულობით და **არ საჭიროებს წინასწარ მთლიან სიის შექმნას**.  
- `enumerate`+`zip`/`chain`-ის კომბინაციები საშუალებას იძლევა ეფექტურად დავამუშავოთ სტრუქტურირებული სტრიმები.
- დიდი მოცულობის მონაცემებზე გენერატორები მეხსიერების მხრივ ბევრად ეფექტიანია, თუმცა თუ ელემენტებზე **მრავალჯერადი წვდომა** გვჭირდება, შესაძლოა სია უკეთესი იყოს.

**დასკვნა:** იტერატორები და გენერატორები Python-ში არის „ზარმაცი გამოთვლების“ საყრდენი — საშუალებას გაძლევთ დაწეროთ სწრაფი, მეხსიერებით ეკონომიური და მკაფიო კოდი.
