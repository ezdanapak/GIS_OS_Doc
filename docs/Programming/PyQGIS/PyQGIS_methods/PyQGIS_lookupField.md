# `lookupField()` PyQGIS-ში

**`lookupField()`** — ვექტორული ფენის (`QgsVectorLayer`) ატრიბუტების ცხრილში კონკრეტული **სვეტის (ველის) ინდექსის** მოსაძებნად გამოიყენება მისი **სახელის** მიხედვით.

---

## 🔑 ძირითადი იდეა

QGIS-ის ფუნქციების უმეტესობა ველთან მუშაობისას ითხოვს არა მის სახელს (მაგ: `"population"`), არამედ მის **რიგით ნომერს** (მაგ: `0`, `1`, `2`...). `lookupField()` კი სახელიდან ინდექსზე გადამყვანი "ხიდია":

```
layer.lookupField("population")
        │
        ▼
    "population" ──►  2   ✅  ნაპოვნია
    "არასწორი"   ──► -1   ❌  ვერ მოიძებნა
```

---

## ⚙️ ძირითადი მახასიათებლები

| მახასიათებელი | აღწერა |
|---------------|--------|
| **რას აბრუნებს** | მთელ რიცხვს (`int`) — ველის ინდექსს |
| **თუ ველი ვერ მოიძებნა** | აბრუნებს `-1`-ს |
| **რეგისტრის მიმართ** | არ არის მგრძნობიარე (case-insensitive) |
| **სად არის განსაზღვრული** | `QgsVectorLayer` და `QgsFields` კლასებში |

---

## ▶️ მარტივი გამოყენება

წარმოვიდგინოთ, რომ გვაქვს ფენა და გვინდა გავიგოთ, რა ინდექსი აქვს სვეტს სახელად `"population"`, რათა შემდეგ ამ სვეტში მონაცემები შევცვალოთ.

```python
# დავუშვათ, layer არის შენი აქტიური ვექტორული ფენა
layer = iface.activeLayer()

# ვეძებთ ველის ინდექსს სახელის მიხედვით
field_name = "population"
field_index = layer.lookupField(field_name)

if field_index != -1:
    print(f"ველის '{field_name}' ინდექსია: {field_index}")

    # მაგალითად, პირველი ობიექტის ამ მნიშვნელობის წაკითხვა:
    feature = next(layer.getFeatures())
    print(f"მნიშვნელობა: {feature[field_index]}")
else:
    print(f"❌ ველი სახელწოდებით '{field_name}' ვერ მოიძებნა!")
```

---

## 💡 რატომ ვიყენებთ?

თუ პირდაპირ დაწერ `feature[2]`, შენი კოდი **გაფუჭდება** იმ შემთხვევაში, თუ ვინმე ცხრილში ახალ სვეტს ჩაამატებს ან წაშლის. `lookupField()` კი **ყოველთვის სწორ ინდექსს მოგცემს**, მიუხედავად იმისა, თუ მერამდენეა ის სვეტი სიაში.

```
❌ არასაიმედო                          ✅ საიმედო
──────────────                         ──────────────
value = feature[2]                     idx = layer.lookupField("population")
     │                                 value = feature[idx]
     ▼                                      │
სვეტის რიგითობის                            ▼
ცვლილებისას — ბაგი                    ყოველთვის სწორი, სქემის
                                      ცვლილებების მიუხედავად
```

> 📌 **წესი:** ყოველთვის გამოიყენე `lookupField()` — **არასოდეს** არ დაუწერო ინდექსი "მყარად" (hardcoded).

---

## 🛠 პრაქტიკული მაგალითი — `changeAttributeValues`-თან ერთად

`lookupField()` განსაკუთრებით სასარგებლოა ატრიბუტების **მასიური განახლებისას**:

```python
from qgis.core import QgsVectorLayer

layer = iface.activeLayer()

# ვიღებთ ინდექსს სახელის მიხედვით
pop_idx = layer.lookupField("population")

if pop_idx == -1:
    print("❌ ველი 'population' ვერ მოიძებნა")
else:
    # რედაქტირების რეჟიმი
    layer.startEditing()

    # მასიური განახლება changeAttributeValues-ით
    updates = {}
    for feat in layer.getFeatures():
        # ორჯერ ვზრდით ყოველი ობიექტის მოსახლეობას
        updates[feat.id()] = {pop_idx: feat[pop_idx] * 2}

    layer.dataProvider().changeAttributeValues(updates)
    layer.commitChanges()

    print(f"✅ {len(updates)} ობიექტი განახლდა")
```

---

## 🔍 შემოწმებითი პატერნი (Defensive pattern)

```python
def get_field_index(layer, field_name):
    """უსაფრთხოდ აბრუნებს ველის ინდექსს — ან აყენებს შეცდომას."""
    idx = layer.lookupField(field_name)
    if idx == -1:
        available = [f.name() for f in layer.fields()]
        raise ValueError(
            f"ველი '{field_name}' ვერ მოიძებნა. "
            f"ხელმისაწვდომი ველები: {available}"
        )
    return idx


# გამოყენება
try:
    idx = get_field_index(layer, "population")
    print(f"✅ ინდექსი: {idx}")
except ValueError as e:
    print(f"❌ {e}")
```

---

## 📌 შეჯამება

- **`lookupField(field_name)`** — ველის **ინდექსს** ბრუნდება სახელის მიხედვით
- აბრუნებს `-1`-ს, თუ ველი ვერ მოიძებნა — **ყოველთვის შეამოწმე!**
- ხდის კოდს **საიმედოს** — ატრიბუტების სქემის ცვლილებისას არ ფუჭდება
- გამოიყენება `changeAttributeValues()`, `updateFeature()` და სხვა ინდექსზე დაფუძნებულ ოპერაციებთან ერთად
- საუკეთესო პრაქტიკა: **არასდროს** გამოიყენო hardcoded ინდექსი — ყოველთვის გადაიყვანე სახელიდან

👉 **წესი:** სანამ ატრიბუტს ინდექსით შეეხები — **პირველი ნაბიჯი** ყოველთვის `lookupField()`.
