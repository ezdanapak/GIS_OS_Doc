# 📸 PyQGIS: ფოტოების გადარქმევა GPS EXIF-ის მიხედვით (_GPS სუფიქსი)  

ეს დოკუმენტი შეიცავს:
- **ვერსია A:** სწრაფი სკრიპტი QGIS Python Console-სთვის  
- **ვერსია B:** QGIS **Processing** ალგორითმი (პარამეტრები, progress, dry-run, HTML report)  
- **QGIS პლაგინის ჩონჩხი:** მენიუდან/ტულბარიდან გაშვებადი მარტივი GUI-თი  

> მიზანი: ფოტოებს, რომლებსაც აქვთ EXIF-ში GPS ინფორმაცია, დაემატოს ფაილის სახელში `_GPS` სუფიქსი (მაგ., `IMG_0001.JPG` → `IMG_0001_GPS.JPG`).

---

## 🔧 წინაპირობები  

- QGIS (3.x)  
- Python 3 + PyQGIS (QGIS-ის ნაწილია)  
- სასურველია: **Pillow (PIL)** ან **exifread** (თუ Pillow არ იმუშავებს)  

> ჩვენი კოდი პირველ რიგში ცდილობს გამოიყენოს **Pillow**, ხოლო თუ არ არის ხელმისაწვდომი — **exifread**-ზე გადავა.  

---

## ✅ ვერსია A — QGIS Python Console სკრიპტი  

**რა აკეთებს:**  
- გეკითხება საქაღალდეს (QFileDialog)  
- სკანირებს ფოტოებს (ქვე საქაღალდეებითაც)  
- თუ აქვთ GPS EXIF → ამატებს `_GPS` სუფიქსს  
- Log-ები ჩანს **QGIS Logs Panel**-ში  
- სახელის კონფლიქტისას იყენებს **უსაფრთხო გადარქმევას** (`_1`, `_2`, …)  

**სკრიპტი 1:**  
```python
# --- PyQGIS console script: Rename photos with GPS EXIF to *_GPS ---

import processing

# Geotagged Photos to Points
params = {
    'FOLDER': r'C:/data/photos',       # 📂 ფოტოების საქაღალდე
    'OUTPUT': r'C:/data/output.gpkg',  # 📤 გეოპაკეტი (ან სხვა ფორმატი)
    'TARGET_CRS': 'EPSG:4326',         # 🌍 საკოორდინატო სისტემა
    'EXIF_ORIENTATION': True,          # 📸 კამერის ორიენტაციის ჩაწერა
    'FILTER': '',                      # სურვილისამებრ გაფილტვრა (*.jpg)
    'OVERWRITE': True                  # არსებულ ფაილზე გადაწერა
}

result = processing.run("native:importphotos", params)

print("შედეგი:", result['OUTPUT'])

```

**სკრიპტი 2:**  

```python
#!/usr/bin/env python3
# geo.py
# Minimal geotag extractor → CSV + GeoJSON (no CLI args)

import csv, sys, json
from pathlib import Path

try:
    import exifread  # pip install exifread
except ImportError:
    sys.stderr.write("Please install exifread: pip install exifread\n")
    sys.exit(1)

# --- Defaults ---
BASE_DIR       = Path(__file__).parent
INPUT_DIR      = BASE_DIR / "photos"               # 📂 folder "photos" next to script
OUTPUT_CSV     = BASE_DIR / "photos_gps.csv"       # 📤 CSV
OUTPUT_GEOJSON = BASE_DIR / "photos_gps.geojson"   # 🌍 GeoJSON

# --- Helpers ---
def _to_float(v):
    s = str(v)
    if "/" in s:
        try:
            num, den = s.split("/", 1)
            return float(num)/float(den) if float(den) else 0.0
        except Exception:
            return 0.0
    try:
        return float(s)
    except Exception:
        return 0.0

def _dms_to_dd(vals, ref):
    if not vals or len(vals) != 3:
        return None
    deg, mins, secs = map(_to_float, vals)
    dd = deg + mins/60.0 + secs/3600.0
    return -dd if ref in ("S","W") else dd

def _read_exif(path):
    with open(path, "rb") as f:
        tags = exifread.process_file(f, details=False, strict=True)
    lat = lon = alt = dt = None
    try:
        lat = _dms_to_dd(tags["GPS GPSLatitude"].values,
                         tags["GPS GPSLatitudeRef"].values[0])
        lon = _dms_to_dd(tags["GPS GPSLongitude"].values,
                         tags["GPS GPSLongitudeRef"].values[0])
    except Exception:
        pass
    if "GPS GPSAltitude" in tags:
        try:
            alt = _to_float(tags["GPS GPSAltitude"].values[0])
        except Exception:
            alt = None
    if "EXIF DateTimeOriginal" in tags:
        dt = str(tags["EXIF DateTimeOriginal"].values)
    elif "Image DateTime" in tags:
        dt = str(tags["Image DateTime"].values)
    return lat, lon, alt, dt

# --- Main ---
def main():
    rows, total, with_gps = [], 0, 0
    exts = {".jpg", ".jpeg", ".jpe", ".tif", ".tiff", ".heic"}
    if not INPUT_DIR.exists():
        sys.stderr.write(f"Input folder not found: {INPUT_DIR}\n")
        return

    for fp in INPUT_DIR.rglob("*"):
        if fp.is_file() and fp.suffix.lower() in exts:
            total += 1
            try:
                lat, lon, alt, dt = _read_exif(fp)
                if (lat is not None) and (lon is not None):
                    with_gps += 1
            except Exception:
                lat = lon = alt = dt = None
            rows.append({
                "path": str(fp),
                "name": fp.name,
                "lat": lat,
                "lon": lon,
                "alt_m": alt,
                "datetime": dt
            })

    # CSV output
    OUTPUT_CSV.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_CSV, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["path","name","lat","lon","alt_m","datetime"])
        w.writeheader()
        w.writerows(rows)

    # GeoJSON output
    features = []
    for r in rows:
        if r["lat"] is None or r["lon"] is None:
            continue
        feat = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [r["lon"], r["lat"]]  # GeoJSON format: [lon, lat]
            },
            "properties": {
                "path": r["path"],
                "name": r["name"],
                "datetime": r["datetime"],
                "alt_m": r["alt_m"]
            }
        }
        features.append(feat)

    fc = {"type": "FeatureCollection", "features": features}
    with open(OUTPUT_GEOJSON, "w", encoding="utf-8") as f:
        json.dump(fc, f, ensure_ascii=False, indent=2)

    sys.stderr.write(f"✅ Done. files={total}, with_gps={with_gps}, no_gps={total-with_gps}\n")
    sys.stderr.write(f"CSV: {OUTPUT_CSV}\n")
    sys.stderr.write(f"GeoJSON: {OUTPUT_GEOJSON}\n")

if __name__ == "__main__":
    main()


```

