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

**სკრიპტი:**  
```python
# --- PyQGIS console script: Rename photos with GPS EXIF to *_GPS ---

import os
import sys

from qgis.PyQt.QtWidgets import QFileDialog
from qgis.core import QgsMessageLog, Qgis

# Try Pillow first (ships with many QGIS builds); fallback to exifread
try:
    from PIL import Image
    from PIL.ExifTags import TAGS, GPSTAGS
    PIL_OK = True
except Exception:
    PIL_OK = False
    try:
        import exifread
    except Exception:
        exifread = None

def log(msg, level=Qgis.Info):
    QgsMessageLog.logMessage(str(msg), 'EXIF-GPS', level)

def exif_with_pillow(fp):
    data = {}
    try:
        with Image.open(fp) as img:
            info = img._getexif() or {}
        for tag, val in info.items():
            name = TAGS.get(tag, tag)
            if name == 'GPSInfo':
                gps = {}
                for k, v in val.items():
                    gps_name = GPSTAGS.get(k, k)
                    gps[gps_name] = v
                data['GPSInfo'] = gps
            else:
                data[name] = val
    except Exception as e:
        log(f'Pillow read error: {e}', Qgis.Warning)
    return data

def exif_with_exifread(fp):
    data = {}
    try:
        with open(fp, 'rb') as f:
            tags = exifread.process_file(f, details=False)
        gps = {}
        for k, v in tags.items():
            if k.startswith('GPS '):
                gps[k.replace('GPS ', '')] = str(v)
        if gps:
            data['GPSInfo'] = gps
    except Exception as e:
        log(f'exifread error: {e}', Qgis.Warning)
    return data

def has_gps(exif):
    return bool(exif.get('GPSInfo'))

def safe_rename(src, dst):
    if not os.path.exists(dst):
        os.rename(src, dst)
        return dst
    base, ext = os.path.splitext(dst)
    i = 1
    while True:
        candidate = f"{base}_{i}{ext}"
        if not os.path.exists(candidate):
            os.rename(src, candidate)
            return candidate
        i += 1

def process_folder(folder, suffix='_GPS', recurse=True, exts=('.jpg','.jpeg','.tif','.tiff','.png','.heic','.heif','.webp')):
    total = 0
    renamed = 0
    walker = os.walk(folder) if recurse else [(folder, [], os.listdir(folder))]
    for root, _, files in walker:
        for fn in files:
            if not fn.lower().endswith(exts):
                continue
            fp = os.path.join(root, fn)
            if not os.path.isfile(fp):
                continue
            total += 1
            exif = exif_with_pillow(fp) if PIL_OK else (exif_with_exifread(fp) if exifread else {})
            if not exif:
                log(f'No EXIF or unreadable: {fp}', Qgis.Warning)
            if has_gps(exif):
                name, ext = os.path.splitext(fn)
                if not name.endswith(suffix):
                    new_name = f"{name}{suffix}{ext}"
                    new_path = os.path.join(root, new_name)
                    try:
                        final_path = safe_rename(fp, new_path)
                        renamed += 1
                        log(f"Renamed: {fn} → {os.path.basename(final_path)}")
                    except Exception as e:
                        log(f"Rename failed for {fp}: {e}", Qgis.Critical)
            else:
                log(f"No GPS: {fp}")
    log(f"Done. Files scanned: {total} | Renamed: {renamed}", Qgis.Success)

folder = QFileDialog.getExistingDirectory(None, "Select folder with photos")
if folder:
    process_folder(folder, suffix='_GPS', recurse=True)
else:
    log("Cancelled by user.", Qgis.Info)
```

---

## 🧰 ვერსია B — Processing ალგორითმი (UI პარამეტრებით)  

**ფუნქციონალი:** Folder, Suffix, Recurse, Extensions, Dry-run, Progress, HTML Report.  
**როგორ ჩავრთოთ:** Processing Toolbox → Scripts → Create New Script → ჩასვით კოდი → შეინახეთ.  

**სკრიპტი:**  
```python
# -*- coding: utf-8 -*-
"""QGIS Processing algorithm: rename photos with GPS EXIF (_GPS suffix), w/ HTML report."""

import os, sys
from qgis.core import (
    QgsProcessing, QgsProcessingAlgorithm, QgsProcessingParameterFolder,
    QgsProcessingParameterString, QgsProcessingParameterBoolean,
    QgsProcessingOutputHtml, QgsProcessingException
)
from qgis.PyQt.QtCore import QCoreApplication

try:
    from PIL import Image
    from PIL.ExifTags import TAGS, GPSTAGS
    PIL_OK = True
except Exception:
    PIL_OK = False
    try:
        import exifread
    except Exception:
        exifread = None

class RenamePhotosWithGps(QgsProcessingAlgorithm):
    PARAM_FOLDER = 'FOLDER'
    PARAM_SUFFIX = 'SUFFIX'
    PARAM_RECURSE = 'RECURSE'
    PARAM_EXTS = 'EXTS'
    PARAM_DRYRUN = 'DRYRUN'
    OUTPUT_REPORT = 'REPORT'

    def tr(self, text):
        return QCoreApplication.translate('RenamePhotosWithGps', text)
    def createInstance(self): return RenamePhotosWithGps()
    def name(self): return 'rename_photos_with_gps_suffix'
    def displayName(self): return self.tr('Rename photos with GPS EXIF (append suffix)')
    def group(self): return self.tr('Photos / EXIF')
    def groupId(self): return 'photos_exif'
    def shortHelpString(self): return self.tr('Scan a folder, if EXIF has GPS → append suffix (default: _GPS). HTML report, dry-run.')

    def initAlgorithm(self, config=None):
        self.addParameter(QgsProcessingParameterFolder(self.PARAM_FOLDER, self.tr('Folder with images')))
        self.addParameter(QgsProcessingParameterString(self.PARAM_SUFFIX, self.tr('Suffix to append'), defaultValue='_GPS'))
        self.addParameter(QgsProcessingParameterBoolean(self.PARAM_RECURSE, self.tr('Recurse into subfolders'), defaultValue=True))
        self.addParameter(QgsProcessingParameterString(self.PARAM_EXTS, self.tr('Extensions (comma-separated, lower-case)'), defaultValue='jpg,jpeg,tif,tiff,png,heic,heif,webp'))
        self.addParameter(QgsProcessingParameterBoolean(self.PARAM_DRYRUN, self.tr('Dry-run (no rename, only report)'), defaultValue=False))
        self.addOutput(QgsProcessingOutputHtml(self.OUTPUT_REPORT, self.tr('HTML report')))

    def exif_with_pillow(self, fp):
        data = {}
        try:
            with Image.open(fp) as img:
                info = img._getexif() or {}
            for tag, val in info.items():
                name = TAGS.get(tag, tag)
                if name == 'GPSInfo':
                    gps = { GPSTAGS.get(k, k): v for k, v in val.items() }
                    data['GPSInfo'] = gps
                else:
                    data[name] = val
        except Exception:
            pass
        return data

    def exif_with_exifread(self, fp):
        data = {}
        try:
            with open(fp, 'rb') as f:
                tags = exifread.process_file(f, details=False)
            gps = {}
            for k, v in tags.items():
                if k.startswith('GPS '):
                    gps[k.replace('GPS ', '')] = str(v)
            if gps: data['GPSInfo'] = gps
        except Exception:
            pass
        return data

    def has_gps(self, exif): return bool(exif.get('GPSInfo'))

    def safe_new_path(self, dst):
        if not os.path.exists(dst): return dst
        base, ext = os.path.splitext(dst); i = 1
        while True:
            c = f"{base}_{i}{ext}"
            if not os.path.exists(c): return c
            i += 1

    def processAlgorithm(self, parameters, context, feedback):
        folder = self.parameterAsString(parameters, self.PARAM_FOLDER, context)
        suffix = self.parameterAsString(parameters, self.PARAM_SUFFIX, context) or '_GPS'
        recurse = self.parameterAsBool(parameters, self.PARAM_RECURSE, context)
        exts = self.parameterAsString(parameters, self.PARAM_EXTS, context).lower().split(',')
        dryrun = self.parameterAsBool(parameters, self.PARAM_DRYRUN, context)

        if not os.path.isdir(folder): raise QgsProcessingException(self.tr('Folder does not exist.'))

        files = []
        if recurse:
            for root, _, fns in os.walk(folder):
                for fn in fns:
                    if fn.lower().endswith(tuple('.'+e.strip() for e in exts)):
                        files.append(os.path.join(root, fn))
        else:
            for fn in os.listdir(folder):
                fp = os.path.join(folder, fn)
                if os.path.isfile(fp) and fn.lower().endswith(tuple('.'+e.strip() for e in exts)):
                    files.append(fp)

        total, renamed = len(files), 0
        rows = []
        for i, fp in enumerate(files):
            if feedback.isCanceled(): break
            feedback.setProgress(int((i+1)/max(1,total)*100))
            fn = os.path.basename(fp)
            exif = self.exif_with_pillow(fp) if PIL_OK else (self.exif_with_exifread(fp) if 'exifread' in globals() and exifread else {})
            if self.has_gps(exif):
                name, ext = os.path.splitext(fn)
                if not name.endswith(suffix):
                    new_name = f"{name}{suffix}{ext}"
                    new_path = self.safe_new_path(os.path.join(os.path.dirname(fp), new_name))
                    if not dryrun:
                        try:
                            os.rename(fp, new_path); renamed += 1
                            rows.append((fn, os.path.basename(new_path), 'renamed'))
                        except Exception as e:
                            rows.append((fn, fn, f'ERROR: {e}'))
                    else:
                        rows.append((fn, os.path.basename(new_path), 'dry-run'))
                else:
                    rows.append((fn, fn, 'already suffixed'))
            else:
                rows.append((fn, fn, 'no GPS'))

        html = ["<h2>Rename Photos with GPS EXIF — Report</h2>",
                f"<p>Folder: <code>{folder}</code></p>",
                f"<p>Total: <b>{total}</b> | Renamed: <b>{renamed}</b> | Dry-run: <b>{dryrun}</b></p>",
                "<table border='1' cellpadding='4' cellspacing='0'>",
                "<tr><th>Original</th><th>Result</th><th>Status</th></tr>"]
        for a,b,s in rows: html.append(f"<tr><td>{a}</td><td>{b}</td><td>{s}</td></tr>")
        html.append("</table>")
        report_path = os.path.join(folder, "rename_gps_report.html")
        with open(report_path, 'w', encoding='utf-8') as f: f.write('\n'.join(html))
        feedback.pushInfo(f"Report: {report_path}")
        return { self.OUTPUT_REPORT: report_path }
```

---

## 🧩 QGIS პლაგინის ჩონჩხი — *Exif GPS Renamer*  

**რა აკეთებს:**  
- ამატებს მენიუს/ტულბარში ღილაკს **Rename Photos with GPS**  
- მომხმარებელი ირჩევს საქაღალდეს → ხდება სკანირება და `_GPS` სუფიქსით გადარქმევა  
- ლოგები QGIS Logs Panel-ში; Summary popup დასრულებისას  

### ინსტალაცია (Manual)  
1) ჩამოტვირთეთ ZIP (ქვემოთ ლინკი)  
2) QGIS → `Plugins` → `Manage and Install Plugins…` → `Install from ZIP`  
3) აირჩიეთ ZIP და დააინსტალირეთ  
4) გაუშვით `Plugins` მენიუდან ან ტულბარიდან  




import os
from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS

def get_exif_data(image):
    exif_data = {}
    try:
        info = image._getexif()
        if not info:
            return exif_data

        for tag, value in info.items():
            tag_name = TAGS.get(tag, tag)
            if tag_name == "GPSInfo":
                gps_data = {}
                for key in value:
                    gps_tag = GPSTAGS.get(key, key)
                    gps_data[gps_tag] = value[key]
                exif_data["GPSInfo"] = gps_data
            else:
                exif_data[tag_name] = value
    except Exception as e:
        print(f"Error reading EXIF data: {e}")
    return exif_data

def has_gps_info(exif_data):
    return "GPSInfo" in exif_data and exif_data["GPSInfo"]

def rename_with_gps_suffix(directory):
    for filename in os.listdir(directory):
        filepath = os.path.join(directory, filename)

        if not os.path.isfile(filepath):
            continue

        try:
            with Image.open(filepath) as img:
                exif_data = get_exif_data(img)
                if has_gps_info(exif_data):
                    name, ext = os.path.splitext(filename)
                    if not name.endswith("_GPS"):
                        new_name = f"{name}_GPS{ext}"
                        new_path = os.path.join(directory, new_name)
                        os.rename(filepath, new_path)
                        print(f"Renamed to: {new_name}")
        except Exception as e:
            print(f"Skipping {filename}: {e}")

# Example usage
folder_path = "path_to_your_folder"  # Replace with your actual folder path
rename_with_gps_suffix(folder_path)
