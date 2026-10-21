# Nota Zero ↔ alkalmazás-hidak (a kódban és Chromiumban ellenőrizve, 2026. október 18.)
[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · **Magyar**

Alapelv: egyetlen alkalmazás sem küld és nem fogad semmit a háttérben. A linkek csak kattintásra nyílnak meg, az itteni fájlokat pedig kézzel kell importálni. A Nota Zero a címből csak a `#capN` és a `?cap=` paramétert olvassa (`1`–`7`, `1b`, `epilog`, `science`); minden más paramétert figyelmen kívül hagy.

## Mélylinkek (a `serie/index.html` oldalon)
| Cél | Link | Megjegyzés |
|---|---|---|
| TerRa | `TerRa/#v=sky&t=2087-05-17T02:35:00Z&ll=59.9139,10.7522&from=nota-zero` | Bármely évet elfogad; a pontosságot csak 1900–2100 között tesztelték, 2100 fölött a ΔT extrapolált, és a Plútó már nem érvényes |
| ORARIUM | `orarium/#view=acum&body=luna&t=2087-05-14T22:14:00Z&from=nota-zero` | Nincs dátumkorlát; a `22:14` orbitális idő, UTC-nek közelítve |
| Nota Zero | `Nota-Zero/#cap5` vagy `Nota-Zero/?cap=5` | `?cap=1…7`, `1b` (Közjáték), `epilog`, `science`; a hash élvez elsőbbséget; a cél megkapja a fókuszt (billentyűzet, képernyőolvasó) |

## Importra kész fájlok (`punti/import/`)
| Fájl | Alkalmazás | Hogyan |
|---|---|---|
| `undava-nota-zero-quiz.json` | Undava | kvíz importálása (9 kérdés a tudományos jegyzetekből) |
| `fabrica-nota-zero.course.json`, `fabrica-intrebari-nota-zero.csv` | Fabrica | JSON-kurzus vagy kérdések CSV-ben |
| `akasha-nota-zero.json` | Akasha | nyilvántartások importálása (12 bejegyzés; `meta` nélkül, így nem módosítja a „csillagok” beállítást; a jegyzetfüzet-bejegyzések az importálás dátumát viselik, a történetbeli dátum a címben szerepel) |
| `clopotel-nota-zero.json` / `.csv` | Clopotel | JSON, CSV vagy beillesztés (9 elem) |
| `calmwaves-nota-zero.fff.json`, `calmwaves-coduri-varianta.txt` | CalmWaves | FFF-csomag importálása (8 előbeállítás, hogy maradjon hely a 12-es korlát alatt; a másik 4 — Kavya, Leila, Zara, Rin — a kódokat tartalmazó fájlban van). **Figyelem:** a CalmWaves 1.1.2 óta az importálás egyesíti az importált előbeállításokat a sajátokkal (azonos név = felülírva, felső korlát 12). A textúrákhoz rendelés szerkesztői döntés |
| `asmr-nota-zero.fff.json`, `asmr-linkuri-mix.txt` | ASMR | FFF-csomag importálása (az ASMR 1.1.1 egyesíti az importált előbeállításokat a sajátokkal; azonos név = felülírva; felső korlát 50); a `#mix=` megköveteli a „Mix lejátszása” gombra kattintást |
| `borderlessmelodies-genuri-nota-muzicii.json` | BorderlessMelodies | műfajok importálása; csak 12-TET, a maqam közelítő |
| `zicala-nota-zero.txt` | Zicala | .txt importálása (2 közmondás: akan, maori) |
| `fascicul-nota-zero.json` | FASCICUL | „Indítás képernyőként” → 📂 Munkamenet; 9 jegyzet (2 mottó + 7 tudományos jegyzet, ≤ 400 karakter, átfedések nélkül) |
| `constelar-nota-zero.json` | Constelar | „Zara Voss” társ (ismétlések nélküli háttértörténet, 4 tartós emlék); **lecseréli** a meglévő társakat (megerősítést kér). A Constelar 1.2.0 óta az importálás megtartja a jelenlegi nyelvet, szolgáltatót és modellt |
| `nexus-nota-zero.json` | Nexus | „Zara Voss (Nota Zero)” perszóna; a Nexus hozzáad, nem cserél |
| `lexicon-nota-zero.tsv` | Lexicon | TSV importálása (17 bejegyzés: 7 tudományos jegyzet + 10 akan kifejezés a X–XI. kötetből); importáláskor a licencet kéri (a döntés a szerzőé). Megfigyelve: az importálás utáni első lekérdezés esetleg nem ad vissza semmit, a második működik |

## Közvetlenül, fájlok nélkül
- ATINGERE: töltsd be a `carte/Nota-Zero-carte-completa-ro.pdf` vagy a `.md` fájlt (braille vagy hang). Az ATINGERE 1.1.1 óta a `ro` nyelvet helyesen ismeri fel (a címekben lévő középpont „·” már nem szavaz a katalánra).
- VoiceAtelier 1.2.0: a „Nota Zero — Alexio” minta (két mondat az I. kötetből) megjelenik a minták listájában.
- AcademiSearch 4.2.0: a `https://chiuta.github.io/AcademiSearch/#q=ekpyrotic%20universe%20Steinhardt%20Turok` előre kitölti a mezőt (a keresést nem indítja el); további példák: `#q=AdS%2FCFT%20Maldacena`, `#q=holographic%20principle%20Susskind`, `#q=Planck%202018%20cosmological%20parameters`.
- TerRa 1.5.0 / ValeaPlopului1972 1.2.0: a `TerRa/#v=2d&ufo=valea-plopului&from=valeaplopului` a térképet a Valea Plopului-esetre központosítja; a ValeaPlopului1972 menüjében van visszalink a TerRához. A TerRa „az első igazolt UFO-eset…” szövegét még nem módosították (a tulajdonos döntése).
- MarkdownAtelier: importáld a `carte/Nota-Zero-carte-completa-ro.md` fájlt.
- AI-Liber / TranslateHub / Nexus / LocalMind (RAG): csak kivonatok; hálózatot vagy helyi modellt igényelnek.

## Elvetettek
Aurora, Limpezimea (csak beállítások), Arhiva, Orar (nem olvassa a címet), Eclipsa-2027, ECLIPSA, HoroScop, CLEPSIDRA, IncredibleCosmos, Pendulul, Nemurirea.

## VEL-MOR
A *VEL-MOR* regény (*A Șasea Nemurire*, 3 könyv, 9 rész, 41 fejezet, amely az „A cincea nemurire” című műből kiindulva bővíti a Reflexia szereplőt) ma csak beszélgetésekben és a kétnyelvű DOCX/PDF-kiadásban él; adattár nincs hozzá. Előkészített hidak: ugyanezek a sablonfájlok (Akasha/Fabrica a dalokhoz és a szószedethez) előállíthatók a szövegéből, miután ide kerül.

## Kölcsönösség
A TerRához és az ORARIUMhoz vezető linkek `&from=nota-zero` paramétert viselnek; a TerRa és az ORARIUM csak ismert források (terra, orarium, nota-zero) esetén jelenít meg „← vissza” gombot. Bármely más értéket figyelmen kívül hagynak.
