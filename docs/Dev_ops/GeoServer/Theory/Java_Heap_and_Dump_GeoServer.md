# Java Heap Memory და Dump — სიღრმისეული განმარტება

> **Java | GeoServer | DevOps | მეხსიერების მართვა**

---

## 📋 შინაარსი

1. [რა არის Heap Memory?](#რა-არის-heap-memory)
2. [JVM მეხსიერების სტრუქტურა](#jvm-მეხსიერების-სტრუქტურა)
3. [Heap-ის შიგნით — Generations](#heap-ის-შიგნით--generations)
4. [Garbage Collector და Heap](#garbage-collector-და-heap)
5. [Heap პარამეტრები — `-Xms` და `-Xmx`](#heap-პარამეტრები)
6. [Memory Dump — რა არის?](#memory-dump--რა-არის)
7. [Dump-ის ტიპები](#dump-ის-ტიპები)
8. [GeoServer და Heap Memory](#geoserver-და-heap-memory)
9. [GeoServer Heap-ის კონფიგურაცია](#geoserver-heap-ის-კონფიგურაცია)
10. [GeoServer Memory Dump — ანალიზი](#geoserver-memory-dump--ანალიზი)
11. [Out of Memory — სიმპტომები და გამოსავალი](#out-of-memory)
12. [Monitoring და ინსტრუმენტები](#monitoring-და-ინსტრუმენტები)

---

## 🧠 რა არის Heap Memory?

**Heap** — JVM-ის (Java Virtual Machine) **გამოყოფილი მეხსიერების არეალი**, სადაც ყველა **ობიექტი და მასივი** ცხოვრობს პროგრამის გაშვებისას.

```
კომპიუტერის RAM
┌──────────────────────────────────────────────────┐
│  OS (Linux/Windows)                              │
│  ┌────────────────────────────────────────────┐  │
│  │  JVM პროცესი (GeoServer / Tomcat)          │  │
│  │  ┌──────────────┐  ┌────────────────────┐  │  │
│  │  │  HEAP        │  │  NON-HEAP          │  │  │
│  │  │  (ობიექტები) │  │  (კოდი, მეტა...)  │  │  │
│  │  └──────────────┘  └────────────────────┘  │  │
│  │  ┌──────────────┐                           │  │
│  │  │  Stack       │  (მეთოდების გამოძახება)   │  │
│  │  └──────────────┘                           │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

### Heap vs Stack — ძირითადი განსხვავება

| | **Heap** | **Stack** |
|--|---------|---------|
| **ინახება** | ობიექტები, კლასის instance-ები | პრიმიტივები, მეთოდის გამოძახების ჩარჩო |
| **სიცოცხლე** | GC-მდე | მეთოდის დასრულებამდე |
| **ზომა** | დიდი (კონფიგურირებადი) | მცირე, ფიქსირებული |
| **სიჩქარე** | შედარებით ნელი | სწრაფი |
| **შეცდომა** | `OutOfMemoryError` | `StackOverflowError` |
| **გამიჯვნა** | გაზიარებულია thread-ებს შორის | თითო thread-ზე ცალკე |

---

## 🏗️ JVM მეხსიერების სტრუქტურა

JVM-ის მეხსიერება **რამდენიმე ნაწილად** იყოფა:

```
┌─────────────────────────────────────────────────────┐
│                    JVM Memory                        │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │                  HEAP                         │   │
│  │  ┌─────────────────┐  ┌────────────────────┐ │   │
│  │  │  Young Generation│  │  Old Generation    │ │   │
│  │  │  ┌────┐ ┌─────┐ │  │  (Tenured Space)   │ │   │
│  │  │  │Eden│ │S0,S1│ │  │  გრძელვადიანი      │ │   │
│  │  │  └────┘ └─────┘ │  │  ობიექტები         │ │   │
│  │  └─────────────────┘  └────────────────────┘ │   │
│  └──────────────────────────────────────────────┘   │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │              NON-HEAP (Metaspace)             │   │
│  │  კლასების მეტამონაცემები, static, კოდი       │   │
│  └──────────────────────────────────────────────┘   │
│                                                     │
│  ┌────────────────┐   ┌──────────────────────────┐  │
│  │  Stack (Threads)│   │  Code Cache (JIT კომ.)   │  │
│  └────────────────┘   └──────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

## 🔬 Heap-ის შიგნით — Generations

Heap შიგნით **"თაობებად"** იყოფა — ეს არის GC-ის ოპტიმიზაციის საფუძველი:

### Young Generation (ახალგაზრდა თაობა)

```
Young Generation
┌──────────────────────────────────────────┐
│                                          │
│   Eden Space          Survivor Spaces    │
│  ┌─────────────┐  ┌──────────┬────────┐ │
│  │ ახალი       │  │  S0      │  S1    │ │
│  │ ობიექტები   │→ │ (გადარჩ.)│(გადარჩ)│ │
│  │ იბადებიან   │  │          │        │ │
│  └─────────────┘  └──────────┴────────┘ │
│         ↓ Minor GC (სწრაფი)             │
└──────────────────────────────────────────┘
```

- **Eden Space** — ყველა ახალი ობიექტი აქ იბადება
- **Survivor S0 / S1** — Minor GC-ს გადარჩენილი ობიექტები
- **Minor GC** — სწრაფი, ხშირი, მხოლოდ Young Generation-ს ასუფთავებს

### Old Generation (Tenured Space)

- ობიექტი, რომელიც **N-ჯერ** გადარჩა Minor GC-ს → Old Generation-ში გადადის
- **Major GC** (Full GC) — ნელი, იშვიათი, მთელ Heap-ს ასუფთავებს
- GeoServer-ის Layer ქეში, Catalog, WMS session ობიექტები — **აქ ცხოვრობს**

### Metaspace (Java 8+)

- კლასების **სტრუქტურა**, static ველები, მეთოდების bytecode
- **Heap-ის ნაწილი არ არის** — OS-ის მეხსიერებიდან პირდაპირ
- Java 7-ში ეძახდნენ **PermGen**-ს (GeoServer-ის ძველ ვერსიებში)

---

## ♻️ Garbage Collector და Heap

**GC** — ავტომატური მეხსიერების მენეჯერი. ასუფთავებს ობიექტებს, რომლებსაც **reference** აღარ ჰყავთ.

```
ობიექტი შეიქმნა → Eden-ში → Minor GC → S0/S1 → Minor GC (N-ჯერ) → Old Gen → Full GC → წაშლა
```

### GC ტიპები Java-ში

| GC | სახელი | გამოყენება | GeoServer-ი |
|----|--------|-----------|------------|
| **Serial GC** | `-XX:+UseSerialGC` | პატარა JVM | ❌ არ გამოიყენება |
| **Parallel GC** | `-XX:+UseParallelGC` | throughput | 🔶 ძველი ვერსიები |
| **G1 GC** | `-XX:+UseG1GC` | დაბალი pause | ✅ Java 9+ default |
| **ZGC** | `-XX:+UseZGC` | <1ms pause | ✅ Java 17+ |
| **Shenandoah** | `-XX:+UseShenandoahGC` | low-latency | ✅ Red Hat JDK |

> 💡 GeoServer 2.24+ + Java 17 → **G1GC ან ZGC** — საუკეთესო კომბინაცია.

### GC Pause — პრობლემა GeoServer-ში

Full GC-ის დროს JVM **ჩერდება** ("Stop-the-World"):

```
WMS GetMap Request → ... → Full GC → ⏸️ JVM 2-30 წამი ჩერდება → Timeout!
```

ამიტომ **სწორი Heap კონფიგურაცია** კრიტიკულია.

---

## ⚙️ Heap პარამეტრები

### `-Xms` და `-Xmx`

```bash
-Xms<ზომა>   # მინიმალური Heap (Starting heap size)
-Xmx<ზომა>   # მაქსიმალური Heap (Maximum heap size)
```

| ერთეული | სიმბოლო | მაგალითი |
|---------|---------|---------|
| Megabyte | `m` | `-Xms512m` |
| Gigabyte | `g` | `-Xmx4g` |

```bash
# GeoServer-ის გაშვება 4GB Heap-ით
java -Xms512m -Xmx4g -jar geoserver.jar

# ან Tomcat-ის CATALINA_OPTS-ში
export CATALINA_OPTS="-Xms1g -Xmx4g -XX:+UseG1GC"
```

### რატომ `-Xms` = `-Xmx`?

```bash
# ✅ პროდუქციაში რეკომენდებული
-Xms4g -Xmx4g
```

- **Heap-ის ზომის ცვლილება** — JVM-ს ნელი ოპერაციაა (OS-ისგან მეხსიერების მოთხოვნა)
- თანაბარი `-Xms` / `-Xmx` → **Heap წინასწარ გამოყოფილია**, ზომა არ იცვლება → სტაბილური

### სხვა მნიშვნელოვანი JVM ფლაგები

```bash
# G1GC — GeoServer-ისთვის (Java 11+)
-XX:+UseG1GC
-XX:MaxGCPauseMillis=200          # მაქს. pause მიზანი (ms)
-XX:G1HeapRegionSize=16m          # Region ზომა

# Metaspace
-XX:MetaspaceSize=256m            # საწყისი
-XX:MaxMetaspaceSize=512m         # მაქსიმუმი

# GC Logging (Java 11+)
-Xlog:gc*:file=/opt/geoserver/logs/gc.log:time,uptime,level,tags

# OOM-ზე ავტომატური Heap Dump
-XX:+HeapDumpOnOutOfMemoryError
-XX:HeapDumpPath=/opt/geoserver/dumps/
```

---

## 💾 Memory Dump — რა არის?

**Memory Dump** (Heap Dump) — JVM-ის **მეხსიერების სრული snapshot**, რომელიც ინახავს:

- ყველა ობიექტს (კლასი, ზომა, reference-ები)
- ყველა Thread-ის მდგომარეობას
- GC Root-ებს (რა ობიექტებია "ცოცხალი")

```
JVM Heap (RAM-ში)          Heap Dump (ფაილი)
┌──────────────┐   dump   ┌──────────────────────┐
│ Object A 4KB │ ───────→ │ heap_dump.hprof       │
│ Object B 2MB │          │ (binary ფორმატი)      │
│ Object C 1KB │          │ ზომა: Heap-ის ≈ 1:1  │
│ ...          │          │ მაგ. 4GB Heap → 4GB  │
└──────────────┘          └──────────────────────┘
```

---

## 📂 Dump-ის ტიპები

### 1. Heap Dump (`.hprof`)

მეხსიერებაში **ყველა ობიექტის** snapshot.

```bash
# ხელით — გაშვებული JVM-იდან (PID საჭიროა)
jmap -dump:format=b,file=/tmp/heap.hprof <PID>

# ან jcmd-ით (Java 9+, რეკომენდებული)
jcmd <PID> GC.heap_dump /tmp/heap.hprof

# ავტომატურად OOM-ზე (JVM ფლაგები)
-XX:+HeapDumpOnOutOfMemoryError
-XX:HeapDumpPath=/opt/geoserver/dumps/heap_dump.hprof
```

### 2. Thread Dump

ყველა **Thread-ის stack trace** — ვინ რას აკეთებს ამ მომენტში.

```bash
# jstack-ით
jstack <PID> > /tmp/thread_dump.txt

# jcmd-ით
jcmd <PID> Thread.print > /tmp/thread_dump.txt

# Kill signal-ით (Linux)
kill -3 <PID>    # → stdout-ში გამოდის
```

```
# Thread Dump-ის მაგალითი
"http-nio-8080-exec-1" #25 daemon prio=5 os_prio=0
   java.lang.Thread.State: WAITING (parking)
        at sun.misc.Unsafe.park(Native Method)
        at org.geoserver.wms.GetMapRequest.execute(GetMapRequest.java:142)
        ...
```

### 3. Core Dump

OS-დონის **სრული პროცესის snapshot** — JVM Crash-ის შემთხვევაში.

```bash
# ავტომატურად JVM Crash-ზე
-XX:+CreateCoredumpOnCrash

# Linux-ზე Crash ფაილი
/proc/sys/kernel/core_pattern
```

### 4. GC Log Dump

**Garbage Collection-ის ისტორია** — Heap-ის ცვლილებები დროში.

```bash
# Java 11+
-Xlog:gc*:file=/logs/gc.log:time,uptime,level,tags:filecount=5,filesize=20m
```

```
# GC Log-ის მაგალითი
[2025-01-15T10:23:41.123+0000] GC(142) Pause Young (Normal) (G1 Evacuation Pause)
[2025-01-15T10:23:41.123+0000] GC(142)   Eden regions: 150→0(150)
[2025-01-15T10:23:41.123+0000] GC(142)   Heap: 2048M(4096M)->1024M(4096M)
[2025-01-15T10:23:41.187+0000] GC(142) Pause Young (Normal) 64ms
```

---

## 🗺️ GeoServer და Heap Memory

GeoServer არის **Java Web Application** — Tomcat-ის ან Jetty-ის შიგნით მუშაობს. ამიტომ Heap-ის მართვა **კრიტიკულია** მის სტაბილურობისთვის.

### GeoServer-ის Heap-ის მომხმარებლები

```
GeoServer Heap
┌──────────────────────────────────────────────────┐
│                                                  │
│  ┌───────────────┐  Feature Cache                │
│  │  Layer Catalog│  (WFS GetFeature შედეგები)    │
│  │  (~50-200MB)  │                               │
│  └───────────────┘  ┌──────────────────────────┐ │
│                     │ GeoWebCache Tile Buffer   │ │
│  ┌───────────────┐  │ (~100MB - 2GB)            │ │
│  │  WMS Rendering│  └──────────────────────────┘ │
│  │  Buffers      │                               │
│  │  (~200-500MB) │  ┌──────────────────────────┐ │
│  └───────────────┘  │ PostGIS Connection Pool   │ │
│                     │ Query Results (~100MB+)   │ │
│  ┌───────────────┐  └──────────────────────────┘ │
│  │  SLD Style    │                               │
│  │  Cache        │  ┌──────────────────────────┐ │
│  │  (~20-100MB)  │  │ HTTP Session Objects      │ │
│  └───────────────┘  │ (მომხმარებლების სესია)    │ │
│                     └──────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

### GeoServer-ის Heap მოთხოვნები

| სცენარი | მინიმუმი | რეკომენდებული |
|---------|---------|--------------|
| Development / ტესტი | 512MB | 1GB |
| მცირე პროდუქცია | 1GB | 2GB |
| საშუალო პროდუქცია | 2GB | 4GB |
| მძიმე დატვირთვა / ბევრი layer | 4GB | 8GB+ |
| GeoServer Cluster (თითო node) | 2GB | 4-8GB |

> ⚠️ **მნიშვნელოვანი:** `-Xmx` **არ უნდა აღემატებოდეს** სერვერის RAM-ის **50-60%-ს** — OS-ს და სხვა პროცესებსაც სჭირდება მეხსიერება.

---

## ⚙️ GeoServer Heap-ის კონფიგურაცია

### Tomcat — `setenv.sh` (Linux)

```bash
# /opt/tomcat/bin/setenv.sh

export JAVA_OPTS="\
  -server \
  -Xms2g \
  -Xmx4g \
  -XX:+UseG1GC \
  -XX:MaxGCPauseMillis=200 \
  -XX:G1HeapRegionSize=16m \
  -XX:MetaspaceSize=256m \
  -XX:MaxMetaspaceSize=512m \
  -XX:+HeapDumpOnOutOfMemoryError \
  -XX:HeapDumpPath=/opt/geoserver/dumps/ \
  -Xlog:gc*:file=/opt/geoserver/logs/gc.log:time,uptime:filecount=5,filesize=20m \
  -DGEOSERVER_DATA_DIR=/opt/geoserver/data_dir"
```

### Tomcat — `setenv.bat` (Windows)

```batch
:: C:\tomcat\bin\setenv.bat

set JAVA_OPTS=-server ^
  -Xms2g ^
  -Xmx4g ^
  -XX:+UseG1GC ^
  -XX:MaxGCPauseMillis=200 ^
  -XX:+HeapDumpOnOutOfMemoryError ^
  -XX:HeapDumpPath=C:\geoserver\dumps\ ^
  -DGEOSERVER_DATA_DIR=C:\geoserver\data_dir
```

### Docker / Podman

```yaml
# docker-compose.yml / podman-compose.yml
services:
  geoserver:
    image: kartoza/geoserver:2.24.0
    environment:
      INITIAL_MEMORY: "2G"
      MAXIMUM_MEMORY: "4G"
      JAVA_OPTS: >-
        -XX:+UseG1GC
        -XX:MaxGCPauseMillis=200
        -XX:+HeapDumpOnOutOfMemoryError
        -XX:HeapDumpPath=/opt/geoserver/dumps/
    volumes:
      - ./dumps:/opt/geoserver/dumps
```

### GeoServer Web UI-დან

```
GeoServer Admin → Server → JVM → Memory Usage
                              → არ არის Heap-ის შეცვლის ვარიანტი
                              → მხოლოდ სანახავია
```

> 💡 Web UI-დან Heap ვერ შეიცვლება — **JVM ფლაგები** სავალდებულოა.

---

## 🔍 GeoServer Memory Dump — ანალიზი

### Heap Dump-ის მიღება გაშვებული GeoServer-იდან

```bash
# 1. GeoServer-ის PID-ის პოვნა
ps aux | grep geoserver
# ან
jps -l | grep -i tomcat

# 2. Heap Dump
jcmd 12345 GC.heap_dump /tmp/geoserver_heap.hprof

# 3. ფაილის ზომის შემოწმება (Heap-ის ≈ ზომა)
ls -lh /tmp/geoserver_heap.hprof
# → 3.8G  (4G Heap-ისთვის)
```

### Heap Dump-ის ანალიზი — Eclipse MAT

**Eclipse Memory Analyzer Tool (MAT)** — ყველაზე გავრცელებული ინსტრუმენტი:

```bash
# MAT-ის გახსნა
./MemoryAnalyzer /tmp/geoserver_heap.hprof
```

**MAT-ში რას ეძებ:**

```
Leak Suspects Report → "One instance of org.geoserver.catalog.impl..."
                         retained: 2.1 GB (52% of heap)

Dominator Tree → ყველაზე დიდი ობიექტები
  → org.geoserver.wms.map.RenderedImageMapResponse  1.2GB
  → org.geowebcache.layer.TileLayerDispatcher       800MB

Histogram → კლასების მიხედვით
  → byte[]              2,450,000 instances   1.8GB
  → char[]                120,000 instances   400MB
  → RenderedImage[]         3,200 instances   600MB
```

### GeoServer-ში ხშირი Memory Leak-ები

```
პრობლემა → მიზეზი → გამოსავალი

1. WMS Rendering Buffer გაჟონვა
   → დიდი GetMap მოთხოვნები (მაღალი რეზოლუცია)
   → შეზღუდე: maxRequestMemory GeoServer კონფ.

2. GeoWebCache Tile Cache
   → Tile-ები Heap-ში ინახება (disk ნაცვლად)
   → გადაიტანე: gwc-gs.xml → diskQuota

3. PostGIS Feature Iterator გაუხურება
   → Transaction/Iterator დახურვის გარეშე
   → try-finally ან try-with-resources

4. SLD Style Rendering
   → რთული SLD + ბევრი layer → Heap სავსეა
   → გაამარტივე SLD, გამოიყენე Scale Denominators

5. Catalog XML Parsing
   → ბევრი ფენა → Catalog ობიექტები Old Gen-ში
   → გამოიყენე PostgreSQL Catalog (JDBCConfig)
```

---

## 🚨 Out of Memory — სიმპტომები და გამოსავალი

### სიმპტომები

```
GeoServer Log:
java.lang.OutOfMemoryError: Java heap space
    at java.awt.image.DataBufferByte.<init>(DataBufferByte.java:75)
    at org.geoserver.wms.map.RenderedImageMapResponse...

ან:
java.lang.OutOfMemoryError: GC overhead limit exceeded
    (GC-ი დროის >98%-ს ხარჯავს, მხოლოდ <2% მეხსიერება თავისუფლდება)

ან:
java.lang.OutOfMemoryError: Metaspace
    (Metaspace სავსეა — კლასების ზედმეტი ჩატვირთვა)
```

### დიაგნოსტიკა

```bash
# 1. GeoServer-ის Log-ის გამოხმაურება
tail -f /opt/geoserver/logs/geoserver.log | grep -i "OutOfMemory\|heap\|GC"

# 2. JVM-ის Heap სტატისტიკა გაშვებისას
jstat -gcutil <PID> 5000
# გამოტანა:
# S0    S1    E     O     M     CCS  YGC  YGCT  FGC  FGCT  CGC  CGCT   GCT
# 0.00  85.3  72.1  91.4  95.2  89.1  142  4.231   8  12.45   -    -   16.68

# O=91.4% → Old Generation 91% სავსეა → Full GC მოახლოება!

# 3. Real-time Heap მონიტორინგი
jcmd <PID> VM.native_memory summary
```

### გამოსავლები

```bash
# ✅ 1. Heap-ის გაზრდა
-Xmx4g → -Xmx8g

# ✅ 2. G1GC-ზე გადასვლა
-XX:+UseG1GC -XX:MaxGCPauseMillis=200

# ✅ 3. GeoWebCache Disk Quota
# gwc-gs.xml:
<diskQuota>
  <enabled>true</enabled>
  <cacheSize>10</cacheSize>
  <cacheMode>Least Frequently Used</cacheMode>
</diskQuota>

# ✅ 4. WMS მოთხოვნების შეზღუდვა
# web.xml ან GeoServer Admin:
maxRequestMemory = 65536  # KB (64MB per request)

# ✅ 5. PostGIS Pagination
# დიდი Layer-ებისთვის: max features = 10000

# ✅ 6. GeoServer Restart Schedule (Cron)
0 3 * * * systemctl restart tomcat  # ყოველ ღამე 03:00-ზე
```

---

## 📊 Monitoring და ინსტრუმენტები

### JVM Built-in ინსტრუმენტები

```bash
# jps — JVM პროცესების სია
jps -l
# → 12345 org.apache.catalina.startup.Bootstrap

# jstat — GC სტატისტიკა (real-time)
jstat -gcutil 12345 2000    # ყოველ 2 წამში

# jmap — Heap ინფო
jmap -heap 12345            # Heap კონფიგურაცია
jmap -histo 12345 | head -30  # კლასების ჰისტოგრამა

# jcmd — ყველაფერი ერთ ადგილას (Java 9+)
jcmd 12345 help             # ბრძანებების სია
jcmd 12345 VM.flags         # JVM ფლაგები
jcmd 12345 GC.run           # GC ხელით გაშვება
jcmd 12345 GC.heap_info     # Heap ინფო
```

### გრაფიკული ინსტრუმენტები

| ინსტრუმენტი | დანიშნულება | გამოყენება |
|------------|------------|-----------|
| **VisualVM** | Real-time Heap + Thread + CPU | Development |
| **Eclipse MAT** | Heap Dump ანალიზი, Leak Suspects | OOM გამოძიება |
| **JConsole** | JMX მონიტორინგი | Basic მონიტორინგი |
| **GCViewer** | GC Log ვიზუალიზაცია | Performance ტუნინგი |
| **Grafana + JMX Exporter** | Production მონიტორინგი | DevOps/SRE |
| **Prometheus JMX** | Metrics scraping | Container გარემო |

### GeoServer + Prometheus (Docker)

```yaml
# docker-compose.yml
services:
  geoserver:
    image: kartoza/geoserver:2.24.0
    environment:
      JAVA_OPTS: >-
        -Xms2g -Xmx4g
        -XX:+UseG1GC
        -javaagent:/opt/jmx_exporter.jar=9090:/opt/jmx_config.yml

  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
```

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'geoserver_jvm'
    static_configs:
      - targets: ['geoserver:9090']
```

**Grafana Dashboard-ზე:**

```
JVM Heap Used       → Alert თუ > 85%
GC Pause Time       → Alert თუ > 500ms
Old Gen Usage       → Alert თუ > 90%
Thread Count        → Alert თუ > 200
```

---

## 📌 შეჯამება

```
HEAP
 └── Young Gen (Eden + S0/S1)   → ახალი ობიექტები, Minor GC
 └── Old Gen (Tenured)          → გრძელვადიანი, Full GC
 └── Metaspace                  → კლასები, static

DUMP
 ├── Heap Dump (.hprof)         → OOM დიაგნოსტიკა, MAT-ით ანალიზი
 ├── Thread Dump (.txt)         → deadlock, performance გამოძიება
 ├── GC Log                     → GC ქცევის ანალიზი დროში
 └── Core Dump                  → JVM Crash-ის გამოძიება

GEOSERVER
 ├── -Xmx         → Heap-ის ზღვარი (RAM-ის max 60%)
 ├── G1GC         → Low-pause GC (Java 11+)
 ├── HeapDumpOnOutOfMemoryError → ავტო-dump OOM-ზე
 ├── GeoWebCache diskQuota      → Tile ქეში Heap-ის გარეთ
 └── maxRequestMemory           → WMS მოთხოვნის შეზღუდვა
```

---

## 📚 გამოყენებული რესურსები

- [Oracle JVM Tuning Guide](https://docs.oracle.com/en/java/javase/17/gctuning/)
- [GeoServer Production Considerations](https://docs.geoserver.org/stable/en/user/production/index.html)
- [Eclipse Memory Analyzer (MAT)](https://eclipse.dev/mat/)
- [GCViewer](https://github.com/chewiebug/GCViewer)
- [Prometheus JMX Exporter](https://github.com/prometheus/jmx_exporter)
