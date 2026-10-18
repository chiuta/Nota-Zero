# Punți Nota Zero ↔ aplicații (verificate în cod și în Chromium, 18 octombrie 2026)

Principiu: nicio aplicație nu trimite și nu primește nimic în fundal. Legăturile se deschid doar la click, iar fișierele de aici se importă manual. Nota Zero citește din adresă doar `#capN` și `?cap=` (`1`–`7`, `1b`, `epilog`, `science`); orice alt parametru e ignorat.

## Linkuri adânci (în `serie/index.html`)
| Țintă | Link | Observație |
|---|---|---|
| TerRa | `TerRa/#v=sky&t=2087-05-17T02:35:00Z&ll=59.9139,10.7522&from=nota-zero` | Acceptă orice an; precizie testată doar 1900–2100, peste 2100 ΔT e extrapolat și Pluto nu mai e valid |
| ORARIUM | `orarium/#view=acum&body=luna&t=2087-05-14T22:14:00Z&from=nota-zero` | Fără limită de dată; `22:14` e timp orbital, aproximat ca UTC |
| Nota Zero | `Nota-Zero/#cap5` sau `Nota-Zero/?cap=5` | `?cap=1…7`, `1b` (Interludiu), `epilog`, `science`; hash-ul are prioritate; ținta primește focusul (tastatură, cititor de ecran) |

## Fișiere gata de importat (`punti/import/`)
| Fișier | Aplicație | Cum |
|---|---|---|
| `undava-nota-zero-quiz.json` | Undava | import quiz (9 întrebări din notele științifice) |
| `fabrica-nota-zero.course.json`, `fabrica-intrebari-nota-zero.csv` | Fabrica | curs JSON sau CSV de întrebări |
| `akasha-nota-zero.json` | Akasha | import registre (12 înregistrări; fără `meta`, deci nu schimbă preferința „stele”; înregistrările-caiet poartă data importului, iar data din poveste e în titlu) |
| `clopotel-nota-zero.json` / `.csv` | Clopotel | JSON, CSV sau lipire (9 elemente) |
| `calmwaves-nota-zero.fff.json`, `calmwaves-coduri-varianta.txt` | CalmWaves | import pachet FFF (8 presetări, ca să rămână loc sub limita de 12; celelalte 4 — Kavya, Leila, Zara, Rin — sunt în fișierul de coduri). **Atenție:** din CalmWaves 1.1.2 importul îmbină presetările importate cu cele proprii (același nume = înlocuit, plafon 12). Maparea pe texturi e editorială |
| `asmr-nota-zero.fff.json`, `asmr-linkuri-mix.txt` | ASMR | import pachet FFF (ASMR 1.1.1 îmbină presetările importate cu cele proprii; același nume = înlocuit; plafon 50); `#mix=` cere click pe „Redă mixul” |
| `borderlessmelodies-genuri-nota-muzicii.json` | BorderlessMelodies | import genuri; doar 12-TET, maqam aproximat |
| `zicala-nota-zero.txt` | Zicala | import .txt (2 proverbe: akan, māori) |
| `fascicul-nota-zero.json` | FASCICUL | „Începe ca ecran” → 📂 Sesiune; 9 note (2 epigrafe + 7 note științifice, ≤ 400 caractere, fără suprapuneri) |
| `constelar-nota-zero.json` | Constelar | companion „Zara Voss” (backstory fără repetiții, 4 amintiri permanente); **înlocuiește** companionii existenți (cere confirmare). De la Constelar 1.2.0 importul păstrează limba, providerul și modelul curente |
| `nexus-nota-zero.json` | Nexus | persona „Zara Voss (Nota Zero)”; Nexus adaugă, nu înlocuiește |
| `lexicon-nota-zero.tsv` | Lexicon | import TSV (17 intrări: 7 note științifice + 10 termeni akan din Vol. X–XI); la import se cere licența (decizia e a autorului). Observat: prima interogare după import poate să nu returneze nimic, a doua funcționează |

## Direct, fără fișiere
- ATINGERE: încarcă `carte/Nota-Zero-carte-completa-ro.pdf` sau `.md` (braille sau audio). Din ATINGERE 1.1.1 limba `ro` e detectată corect (punctul median „·” din titluri nu mai votează catalana).
- VoiceAtelier 1.2.0: mostra „Nota Zero — Alexio” (două propoziții din Vol. I) apare în lista de mostre.
- AcademiSearch 4.2.0: `https://chiuta.github.io/AcademiSearch/#q=ekpyrotic%20universe%20Steinhardt%20Turok` precompletează câmpul (nu pornește căutarea); alte exemple: `#q=AdS%2FCFT%20Maldacena`, `#q=holographic%20principle%20Susskind`, `#q=Planck%202018%20cosmological%20parameters`.
- TerRa 1.5.0 / ValeaPlopului1972 1.2.0: `TerRa/#v=2d&ufo=valea-plopului&from=valeaplopului` centrează harta pe cazul Valea Plopului; ValeaPlopului1972 are în meniu linkul înapoi spre TerRa. Textul „primul caz OZN atestat…” din TerRa nu a fost modificat încă (decizie a proprietarului).
- MarkdownAtelier: importă `carte/Nota-Zero-carte-completa-ro.md`.
- AI-Liber / TranslateHub / Nexus / LocalMind (RAG): doar extrase; cer rețea sau model local.

## Infirmate
Aurora, Limpezimea (doar reglaje), Arhiva, Orar (nu citește adresa), Eclipsa-2027, ECLIPSA, HoroScop, CLEPSIDRA, IncredibleCosmos, Pendulul, Nemurirea.

## VEL-MOR
Romanul *VEL-MOR* (*A Șasea Nemurire*, 3 cărți, 9 părți, 41 de capitole, extinde personajul Reflexia din „A cincea nemurire”) trăiește azi doar în conversații și în ediția bilingvă DOCX/PDF; nu există depozit. Punți pregătite: aceleași fișiere-șablon (Akasha/Fabrica pentru cântecele și glosar) se pot genera din textul lui după ce este depus aici.

## Reciprocitate
Linkurile către TerRa și ORARIUM poartă `&from=nota-zero`; TerRa și ORARIUM afișează un buton „← înapoi” doar pentru surse cunoscute (terra, orarium, nota-zero). Orice altă valoare e ignorată.
