<div align="center">

# 🗺️ GIS_OS_Doc

**ღია კოდის გეოინფორმაციული სისტემების (GIS) ქართული დოკუმენტაცია**
**Georgian-language documentation for Open-Source GIS**

🌐 **[osdoc.qgis.ge](https://osdoc.qgis.ge/)**

[![Docs](https://img.shields.io/badge/docs-osdoc.qgis.ge-green)](https://osdoc.qgis.ge/)
[![MkDocs Material](https://img.shields.io/badge/built%20with-MkDocs%20Material-blue)](https://squidfunk.github.io/mkdocs-material/)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-orange)](LICENSE)

</div>

---

## 🇬🇪 ქართული

**GIS_OS_Doc** არის ღია კოდის (Open-Source) გეოინფორმაციული სისტემების **ქართულენოვანი დოკუმენტაცია**. პროექტი მიზნად ისახავს GIS-ის, QGIS-ის, PostGIS-ის, GeoServer-ისა და პროგრამირების (Python, PyQGIS) სწავლას ქართულ ენაზე — როგორც დამწყებთათვის, ისე პროფესიონალებისთვის.

### 📚 რას მოიცავს

- **GIS საბაზისო** — თეორია (გეოიდი, დატუმი, პროექცია), ვექტორი და რასტრი, გეომონაცემთა ბაზები, პრაქტიკული დავალებები QGIS-ში.
- **პერს. მონაცემთა დაცვა** — GDPR და პერსონალურ მონაცემთა დაცვა GIS-ში.
- **Enterprise GIS** — GIS ორგანიზაციებში, ინფრასტრუქტურა, მონაცემთა მართვა, Web GIS.
- **არაფორმალური განათლება** — GIS მოსწავლეებისთვის და სწავლების მეთოდიკა.
- **პროგრამირება** — Python, PyQGIS, სივრცული პითონი, PostgreSQL & PostGIS.
- **Dev Ops** — QGIS, GeoServer, MapStore, Web Server.
- **Google Earth** — Earth და Earth Engine.

### 🚀 ლოკალურად გაშვება

```bash
# დამოკიდებულებების დაყენება
pip install mkdocs-material mkdocs-jupyter

# ლოკალური სერვერის გაშვება (http://127.0.0.1:8000)
mkdocs serve

# სტატიკური საიტის აწყობა
mkdocs build
```

### 🤝 კონტრიბუცია

წვლილის შეტანა მისასალმებელია! იხილეთ [CONTRIBUTING.md](CONTRIBUTING.md) და [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). დოკუმენტაცია იწერება **Markdown**-ში `docs/` საქაღალდეში, ნავიგაცია კი განისაზღვრება [`mkdocs.yml`](mkdocs.yml)-ში.

---

## 🇬🇧 English

**GIS_OS_Doc** is **Georgian-language (KA) documentation** for Open-Source Geographic Information Systems. The project aims to teach GIS, QGIS, PostGIS, GeoServer, and programming (Python, PyQGIS) in Georgian — for beginners and professionals alike.

### 📚 Contents

- **GIS Basics** — theory (geoid, datum, projections), vector & raster, geodatabases, and hands-on QGIS labs.
- **Personal Data Protection** — GDPR and personal data protection in GIS.
- **Enterprise GIS** — GIS in organizations, infrastructure, data management, Web GIS.
- **Non-formal education** — GIS for pupils and teaching methodology.
- **Programming** — Python, PyQGIS, spatial Python, PostgreSQL & PostGIS.
- **Dev Ops** — QGIS, GeoServer, MapStore, Web Server.
- **Google Earth** — Earth and Earth Engine.

### 🚀 Run locally

```bash
# Install dependencies
pip install mkdocs-material mkdocs-jupyter

# Start the local dev server (http://127.0.0.1:8000)
mkdocs serve

# Build the static site
mkdocs build
```

### 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Documentation is written in **Markdown** under the `docs/` folder, and navigation is defined in [`mkdocs.yml`](mkdocs.yml).

---

## 🛠️ Tech stack

- **[MkDocs](https://www.mkdocs.org/)** + **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)**
- **[mkdocs-jupyter](https://github.com/danielfrg/mkdocs-jupyter)** — Jupyter notebooks in docs
- Deployed automatically to **GitHub Pages** via GitHub Actions ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) on every push to `main`.

## 📄 License

Licensed under the **[GNU AGPL-3.0](LICENSE)**. © 2026 Giorgi Kapanadze.
