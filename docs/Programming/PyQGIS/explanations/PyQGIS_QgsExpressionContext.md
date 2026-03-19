# QgsExpressionContext PyQGIS-ში

**QgsExpressionContext** არის PyQGIS-ის კლასი, რომელიც განსაზღვრავს **გამოსახულებების (expressions) გაშვების კონტექსტს** — ანუ პასუხობს კითხვაზე: "ეს expression რომ გაეშვას, რა ცვლადები და მნიშვნელობები უნდა ხელმისაწვდომი იყოს?"

---

## 🔑 ძირითადი იდეა

`QgsExpressionContext` შეიცავს **scope-ების** (`QgsExpressionContextScope`) სტეკს, სადაც თითოეული scope განსაზღვრავს ცვლადების ნაკრებს.

ეს კლასი გამოიყენება:

- `QgsExpression`-ის გაშვებისას — კონტექსტი "ეუბნება" expression-ს, რა მნიშვნელობები გამოიყენოს
- Feature-ების ატრიბუტებზე წვდომისას expression-ში
- პროექტის, layer-ის ან feature-ის ცვლადებზე წვდომისას
- Custom ცვლადების გადაცემისას expression-ში

---

## 📦 იმპორტი

```python
from qgis.core import (
    QgsExpressionContext,
    QgsExpressionContextScope,
    QgsExpressionContextUtils,
    QgsExpression,
    QgsFeatureRequest
)
```

---

## 🧱 კონტექსტის სტრუქტურა

`QgsExpressionContext` სტეკია — scope-ები ერთ-მეორეზე იდება:

```
┌─────────────────────────────────────────┐
│  QgsExpressionContext (სტეკი)            │
├─────────────────────────────────────────┤
│  scope 3 → Custom ცვლადები             │  ← ყველაზე მაღალი პრიორიტეტი
│  scope 2 → Feature ატრიბუტები          │
│  scope 1 → Layer ცვლადები              │
│  scope 0 → პროექტის ცვლადები           │  ← ყველაზე დაბალი პრიორიტეტი
└─────────────────────────────────────────┘
```

📌 თუ ერთი და იგივე სახელის ცვლადი მრავალ scope-შია, **ყველაზე ზედა scope-ი** "იმარჯვებს".

---

## ▶️ მარტივი გამოყენება — `QgsExpressionContextUtils`

`QgsExpressionContextUtils` გვაძლევს მზა helper მეთოდებს, რომლებიც სტანდარტულ scope-ებს ქმნიან:

```python
from qgis.core import QgsExpressionContext, QgsExpressionContextUtils, QgsProject

# პროექტის კონტექსტი
context = QgsExpressionContextUtils.projectScope(QgsProject.instance())

# Layer-ის კონტექსტი
layer = iface.activeLayer()
context = QgsExpressionContextUtils.layerScope(layer)

# Global კონტექსტი (QGIS-ის გლობალური ცვლადები)
context = QgsExpressionContextUtils.globalScope()
```

---

## 🔗 სრული კონტექსტი — ყველა scope ერთად

პრაქტიკაში ყველა scope ერთ კონტექსტში გაერთიანდება:

```python
from qgis.core import (
    QgsExpressionContext,
    QgsExpressionContextUtils,
    QgsProject
)

layer = iface.activeLayer()

context = QgsExpressionContext()
context.appendScopes(
    QgsExpressionContextUtils.globalProjectLayerScopes(layer)
)

# ან ხელით:
context.appendScope(QgsExpressionContextUtils.globalScope())
context.appendScope(QgsExpressionContextUtils.projectScope(QgsProject.instance()))
context.appendScope(QgsExpressionContextUtils.layerScope(layer))
```

📌 `globalProjectLayerScopes()` — მოხერხებული shortcut, ყველა სტანდარტულ scope-ს ერთდროულად ამატებს.

---

## ➕ Feature-ის მიბმა კონტექსტზე

Expression-ში `@feature` ან field-ის სახელებით წვდომისთვის:

```python
from qgis.core import QgsExpression, QgsExpressionContext, QgsExpressionContextUtils

layer = iface.activeLayer()

context = QgsExpressionContext()
context.appendScopes(
    QgsExpressionContextUtils.globalProjectLayerScopes(layer)
)

expr = QgsExpression('"area" * 2')  # ველი სახელად "area"

for feature in layer.getFeatures():
    context.setFeature(feature)     # ← feature-ი მიება კონტექსტს
    result = expr.evaluate(context)
    print(f"Feature {feature.id()}: {result}")
```

---

## 🔧 Custom ცვლადების დამატება

```python
from qgis.core import (
    QgsExpressionContext,
    QgsExpressionContextScope,
    QgsExpressionContextUtils
)

# ახალი scope
custom_scope = QgsExpressionContextScope()

# ცვლადების დამატება
custom_scope.setVariable('my_city',     'თბილისი')
custom_scope.setVariable('my_factor',   1.5)
custom_scope.setVariable('project_year', 2025)

# კონტექსტში ჩამატება
context = QgsExpressionContext()
context.appendScope(custom_scope)

# Expression-ში გამოყენება: @my_city, @my_factor
expr = QgsExpression("@my_factor * 100")
result = expr.evaluate(context)
print(result)  # → 150.0
```

📌 Custom ცვლადებს expression-ში `@` პრეფიქსით მიმართავ: `@my_city`.

---

## 🔍 კონტექსტში ცვლადის ძიება

```python
# ცვლადის მნიშვნელობის წაკითხვა
value = context.variable('my_city')
print(value)  # → 'თბილისი'

# ყველა ხელმისაწვდომი ცვლადი
all_vars = context.variableNames()
print(all_vars)
# → ['my_city', 'my_factor', 'project_year', 'layer_name', ...]
```

---

## 📋 პრაქტიკული მაგალითი — ფილტრაცია Expression-ით

```python
from qgis.core import (
    QgsExpression,
    QgsExpressionContext,
    QgsExpressionContextUtils,
    QgsFeatureRequest
)

layer = iface.activeLayer()

# კონტექსტი
context = QgsExpressionContext()
context.appendScopes(
    QgsExpressionContextUtils.globalProjectLayerScopes(layer)
)

# Expression
expr = QgsExpression('"population" > 50000 AND "region" = \'კახეთი\'')

if expr.hasParserError():
    print("❌ Expression შეცდომა:", expr.parserErrorString())
else:
    for feature in layer.getFeatures():
        context.setFeature(feature)
        if expr.evaluate(context):
            print(f"✅ {feature['name']} — {feature['population']}")
```

---

## 📋 პრაქტიკული მაგალითი — ახალი ველის გაანგარიშება

```python
from qgis.core import (
    QgsExpression,
    QgsExpressionContext,
    QgsExpressionContextUtils
)

layer = iface.activeLayer()

context = QgsExpressionContext()
context.appendScopes(
    QgsExpressionContextUtils.globalProjectLayerScopes(layer)
)

# ფართობის გაანგარიშება კვადრატულ მეტრებში → ჰექტარებში
expr = QgsExpression('$area / 10000')

layer.startEditing()
for feature in layer.getFeatures():
    context.setFeature(feature)
    hectares = expr.evaluate(context)
    layer.changeAttributeValue(feature.id(), layer.fields().indexFromName('area_ha'), round(hectares, 4))

layer.commitChanges()
print("✅ ველი განახლდა")
```

---

## 🌐 პროექტის ცვლადების წაყენება/წაკითხვა

```python
from qgis.core import QgsExpressionContextUtils, QgsProject

project = QgsProject.instance()

# ცვლადის დაყენება პროექტზე
QgsExpressionContextUtils.setProjectVariable(project, 'company_name', 'GGTC')
QgsExpressionContextUtils.setProjectVariable(project, 'year',         2025)

# ამოკითხვა
val = QgsExpressionContextUtils.projectScope(project).variable('company_name')
print(val)  # → 'GGTC'

# QGIS Expression-ში: @company_name, @year
```

---

## 🛠 Layer-ის ცვლადების წაყენება

```python
from qgis.core import QgsExpressionContextUtils

layer = iface.activeLayer()

# ცვლადის მიბმა layer-ზე
QgsExpressionContextUtils.setLayerVariable(layer, 'layer_source', 'PostGIS')
QgsExpressionContextUtils.setLayerVariable(layer, 'update_date',  '2025-01-15')

# ამოკითხვა
val = QgsExpressionContextUtils.layerScope(layer).variable('layer_source')
print(val)  # → 'PostGIS'
```

---

## ⚡ შეცდომების დამუშავება

```python
expr = QgsExpression('"nonexistent_field" + 1')

# Parser შეცდომა (სინტაქსი)
if expr.hasParserError():
    print("❌ Parser შეცდომა:", expr.parserErrorString())

# Eval შეცდომა (გაშვებისას)
result = expr.evaluate(context)
if expr.hasEvalError():
    print("❌ Eval შეცდომა:", expr.evalErrorString())
else:
    print("✅ შედეგი:", result)
```

---

## 📊 `QgsExpressionContextUtils` — მეთოდების შეჯამება

| მეთოდი | დანიშნულება |
|--------|------------|
| `globalScope()` | QGIS-ის გლობალური ცვლადები |
| `projectScope(project)` | პროექტის ცვლადები |
| `layerScope(layer)` | Layer-ის ცვლადები |
| `featureBasedContext(feat, fields)` | Feature-ზე დაფუძნებული კონტექსტი |
| `globalProjectLayerScopes(layer)` | სამივე ერთად (shortcut) |
| `setProjectVariable(project, name, value)` | პროექტის ცვლადის დაყენება |
| `setLayerVariable(layer, name, value)` | Layer-ის ცვლადის დაყენება |

---

## 📌 შეჯამება

- **`QgsExpressionContext`** — scope-ების სტეკი, რომელიც Expression-ს "ეუბნება" რა ცვლადები გამოიყენოს
- **`QgsExpressionContextScope`** — ერთი ცვლადების ნაკრები
- **`QgsExpressionContextUtils`** — helper კლასი მზა scope-ების შესაქმნელად
- `context.setFeature(feat)` — feature-ი მიება კონტექსტს field-ებზე წვდომისთვის
- `context.variable('name')` — ცვლადის წაკითხვა
- Custom ცვლადებს expression-ში `@` პრეფიქსით მიმართავ

👉 ყოველ ჯერზე, როდესაც `QgsExpression`-ს გარდა მისი **შედეგები** გჭირდება — `QgsExpressionContext` შენი სავალდებულო ინსტრუმენტია.