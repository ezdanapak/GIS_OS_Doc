მოდული 1 – Fedora Server: საძირკველი და უსაფრთხოება
Fedora Server Edition-ის ინსტალაცია (Physical/Virtual)

Dnf პაკეტების მენეჯერი და სისტემური განახლებები

Sudoers და მომხმარებლების იერარქია (GIS Admin მოდელი)

SSH Hardening: Key-based access, პორტის შეცვლა, root login-ის აკრძალვა

Firewalld: ზონების მართვა და პორტების მკაცრი კონტროლი

SELinux: GIS სერვისების უსაფრთხოების კონტექსტები (Enforcing mode)

Fail2Ban ინტეგრაცია Fedora-სთან

მოდული 2 – Podman: კონტეინერიზაციის ახალი ერა
Rootless Podman: უსაფრთხოება Root პრივილეგიების გარეშე

Podman-Compose-ის ინსტალაცია და გამართვა

Storage Volumes: მონაცემების შენარჩუნება (PostGIS და GeoServer მონაცემები)

Container Networking: იზოლირებული ქსელები სერვისებს შორის

Auto-start: კონტეინერების მართვა Systemd-ის მეშვეობით (Quadlets)

Resource Limits: CPU და RAM შეზღუდვა კონტეინერებზე

მოდული 3 – GIS Backend & Database (Production-Ready)
PostGIS (PostgreSQL): ოპტიმიზებული GIS მონაცემთა ბაზა

GeoServer კონტეინერიზაცია (Tomcat tuning, Java memory limits)

Environment Variables: GeoServer-ის კონფიგურაცია ფაილებში ძრომიალის გარეშე

Web.xml Tuning: CSRF დაცვის მართვა და Proxy Base URL-ის გაწერა

MVT (Vector Tiles): ვექტორული შრეების ოპტიმიზაცია წამიერი განახლებისთვის

REST API: GeoServer-ის მართვა სკრიპტებით (Layer creation, Styling)

მოდული 4 – Acceleration & Caching (MapProxy)
MapProxy არქიტექტურა: YAML კონფიგურაციის სტრუქტურა

Caching Strategies: როდის გამოვიყენოთ ქეში და როდის Direct WMS

Seed & Cleanup: ქეშის ავტომატური განახლების ციკლი

Security: შრეებზე წვდომის შეზღუდვა MapProxy-ს დონეზე

Performance: მრავალბირთვიანი დამუშავება (Waitress/Gunicorn)

მოდული 5 – Edge Gateway & Connectivity (Caddy + Cloudflare)
Caddy Server: ავტომატური HTTPS და Reverse Proxy

Caddyfile სტრუქტურა: Header manipulation (CSP, CORS)

Cloudflare Tunnel (cloudflared): სერვერის გატანა ინტერნეტში პორტების გახსნის გარეშე

WAF (Web Application Firewall): ბოტების და SQL ინიექციების ბლოკირება Cloudflare-ზე

Zero Trust Access: ადმინ პანელზე წვდომის შეზღუდვა გუნდის წევრებისთვის

მოდული 6 – Frontend & JS Frameworks (The Presentation Layer)
Stateless Frontend: Leaflet / OpenLayers / MapStore ინტეგრაცია

Proxy Authentication: როგორ მივაწოდოთ დაცული შრეები საჯარო რუკას

Dynamic Data Rendering: WebSockets ან Long-polling წამიერი განახლებისთვის

Build Pipeline: მინიმალისტური Frontend აპლიკაციის კონტეინერიზაცია

მოდული 7 – Ansible: Infrastructure as Code (GIS Automation)
Inventory Management: კომპანია A, კომპანია B (Staging/Prod)

Roles: fedora_base, podman_setup, geoserver_deploy, caddy_config

Secrets Management: Ansible Vault პაროლების და სერტიფიკატებისთვის

One-Click Deployment: სუფთა სერვერიდან მზა GIS პორტალამდე 5 წუთში

Continuous Configuration: პარამეტრების განახლება ყველა კლიენტთან ერთდროულად

მოდული 8 – Monitoring, Logging & Disaster Recovery
Netdata / Prometheus + Grafana: ვიზუალური მონიტორინგი

Uptime Kuma: სერვისების სტატუსი და Telegram Alerting

Centralized Logging: კონტეინერების ლოგების ანალიზი

Backup Strategy: pg_dump ავტომატიზაცია და ფაილური სისტემის სინქრონიზაცია (Rclone)

Recovery Drill: სისტემის აღდგენა ნულიდან სარეზერვო ასლით

მოდული 9 – Business & Architecture Strategy
Pilot Project Design: როგორ დავიწყოთ მცირედით და გავიზარდოთ

SLA & Scalability: ჰორიზონტალური სკალირების დაგეგმვა (Load Balancing)

Cost Optimization: რესურსების გათვლა კლიენტისთვის (CPU/RAM/Storage)

Documentation: სისტემის პასპორტი და მომხმარებლის სახელმძღვანელო


მოდული 1 – Fedora Server: საძირკველი და უსაფრთხოება
Fedora Server Edition-ის ინსტალაცია (Physical/Virtual)

Dnf პაკეტების მენეჯერი და სისტემური განახლებები

Sudoers და მომხმარებლების იერარქია (GIS Admin მოდელი)

SSH Hardening: Key-based access, პორტის შეცვლა, root login-ის აკრძალვა

Firewalld: ზონების მართვა და პორტების მკაცრი კონტროლი

SELinux: GIS სერვისების უსაფრთხოების კონტექსტები (Enforcing mode)

Fail2Ban ინტეგრაცია Fedora-სთან

მოდული 2 – Podman: კონტეინერიზაციის ახალი ერა
Rootless Podman: უსაფრთხოება Root პრივილეგიების გარეშე

Podman-Compose-ის ინსტალაცია და გამართვა

Storage Volumes: მონაცემების შენარჩუნება (PostGIS და GeoServer მონაცემები)

Container Networking: იზოლირებული ქსელები სერვისებს შორის

Auto-start: კონტეინერების მართვა Systemd-ის მეშვეობით (Quadlets)

Resource Limits: CPU და RAM შეზღუდვა კონტეინერებზე

მოდული 3 – GIS Backend & Database (Production-Ready)
PostGIS (PostgreSQL): ოპტიმიზებული GIS მონაცემთა ბაზა

GeoServer კონტეინერიზაცია (Tomcat tuning, Java memory limits)

Environment Variables: GeoServer-ის კონფიგურაცია ფაილებში ძრომიალის გარეშე

Web.xml Tuning: CSRF დაცვის მართვა და Proxy Base URL-ის გაწერა

MVT (Vector Tiles): ვექტორული შრეების ოპტიმიზაცია წამიერი განახლებისთვის

REST API: GeoServer-ის მართვა სკრიპტებით (Layer creation, Styling)

მოდული 4 – Acceleration & Caching (MapProxy)
MapProxy არქიტექტურა: YAML კონფიგურაციის სტრუქტურა

Caching Strategies: როდის გამოვიყენოთ ქეში და როდის Direct WMS

Seed & Cleanup: ქეშის ავტომატური განახლების ციკლი

Security: შრეებზე წვდომის შეზღუდვა MapProxy-ს დონეზე

Performance: მრავალბირთვიანი დამუშავება (Waitress/Gunicorn)

მოდული 5 – Edge Gateway & Connectivity (Caddy + Cloudflare)
Caddy Server: ავტომატური HTTPS და Reverse Proxy

Caddyfile სტრუქტურა: Header manipulation (CSP, CORS)

Cloudflare Tunnel (cloudflared): სერვერის გატანა ინტერნეტში პორტების გახსნის გარეშე

WAF (Web Application Firewall): ბოტების და SQL ინიექციების ბლოკირება Cloudflare-ზე

Zero Trust Access: ადმინ პანელზე წვდომის შეზღუდვა გუნდის წევრებისთვის

მოდული 6 – Frontend & JS Frameworks (The Presentation Layer)
Stateless Frontend: Leaflet / OpenLayers / MapStore ინტეგრაცია

Proxy Authentication: როგორ მივაწოდოთ დაცული შრეები საჯარო რუკას

Dynamic Data Rendering: WebSockets ან Long-polling წამიერი განახლებისთვის

Build Pipeline: მინიმალისტური Frontend აპლიკაციის კონტეინერიზაცია

მოდული 7 – Ansible: Infrastructure as Code (GIS Automation)
Inventory Management: კომპანია A, კომპანია B (Staging/Prod)

Roles: fedora_base, podman_setup, geoserver_deploy, caddy_config

Secrets Management: Ansible Vault პაროლების და სერტიფიკატებისთვის

One-Click Deployment: სუფთა სერვერიდან მზა GIS პორტალამდე 5 წუთში

Continuous Configuration: პარამეტრების განახლება ყველა კლიენტთან ერთდროულად

მოდული 8 – Monitoring, Logging & Disaster Recovery
Netdata / Prometheus + Grafana: ვიზუალური მონიტორინგი

Uptime Kuma: სერვისების სტატუსი და Telegram Alerting

Centralized Logging: კონტეინერების ლოგების ანალიზი

Backup Strategy: pg_dump ავტომატიზაცია და ფაილური სისტემის სინქრონიზაცია (Rclone)

Recovery Drill: სისტემის აღდგენა ნულიდან სარეზერვო ასლით

მოდული 9 – Business & Architecture Strategy
Pilot Project Design: როგორ დავიწყოთ მცირედით და გავიზარდოთ

SLA & Scalability: ჰორიზონტალური სკალირების დაგეგმვა (Load Balancing)

Cost Optimization: რესურსების გათვლა კლიენტისთვის (CPU/RAM/Storage)

Documentation: სისტემის პასპორტი და მომხმარებლის სახელმძღვანელო