# Punți Nota Zero ↔ aplicații (verificate în cod și în Chromium, 18 octombrie 2026)

Principiu: nicio aplicație nu trimite și nu primește nimic în fundal. Legăturile se deschid doar la click, iar fișierele de aici se importă manual. Nota Zero nu citește parametri de adresă în afară de `#capN`.

## Linkuri adânci (în `serie/index.html`)
| Țintă | Link | Observație |
|---|---|---|
| TerRa | `TerRa/#v=sky&t=2087-05-17T02:35:00Z&ll=59.9139,10.7522&from=nota-zero` | Acceptă orice an; precizie testată doar 1900–2100, peste 2100 ΔT e extrapolat și Pluto nu mai e valid |
| ORARIUM | `orarium/#view=acum&body=luna&t=2087-05-14T22:14:00Z` | Fără limită de dată |
| Nota Zero | `Nota-Zero/#cap5` sau `Nota-Zero/?cap=5` | `?cap=1…7`, `epilog`, `science`; hash-ul are prioritate |

## Fișiere gata de importat (`punti/import/`)
| Fișier | Aplicație | Cum |
|---|---|---|
| `undava-nota-zero-quiz.json` | Undava | import quiz (9 întrebări din notele științifice) |
| `fabrica-nota-zero.course.json`, `fabrica-intrebari-nota-zero.csv` | Fabrica | curs JSON sau CSV de întrebări |
| `akasha-nota-zero.json` | Akasha | import registre (12 înregistrări; datele invalide cad pe data curentă) |
| `clopotel-nota-zero.json` / `.csv` | Clopotel | JSON, CSV sau lipire (9 elemente) |
| `calmwaves-nota-zero.fff.json`, `calmwaves-coduri-varianta.txt` | CalmWaves | import pachet FFF; maparea pe texturi e editorială |
| `asmr-nota-zero.fff.json`, `asmr-linkuri-mix.txt` | ASMR | import pachet FFF; `#mix=` cere click pe „Redă mixul” |
| `borderlessmelodies-genuri-nota-muzicii.json` | BorderlessMelodies | import genuri; doar 12-TET, maqam aproximat |
| `zicala-nota-zero.txt` | Zicala | import .txt (2 proverbe: akan, māori) |
| `nz-fascicul.json` | FASCICUL | încărcare sesiune (notițe ≤ 400 caractere) |
| `nz-constelar.json` | Constelar | import companion; **înlocuiește** companionii existenți (cere confirmare) |
| `nz-glosar.tsv` | Lexicon | import dicționar TSV (17 intrări) |

## Direct, fără fișiere
- ATINGERE: încarcă `carte/Nota-Zero-carte-completa-ro.pdf` (braille sau audio; setează limba `ro`).
- MarkdownAtelier: importă `carte/Nota-Zero-carte-completa-ro.md`.
- AI-Liber / TranslateHub / Nexus / LocalMind (RAG): doar extrase; cer rețea sau model local.

## Infirmate
Aurora, Limpezimea (doar reglaje), VoiceAtelier, AcademiSearch, Arhiva, Orar (nu citește adresa), Eclipsa-2027, ECLIPSA, HoroScop, CLEPSIDRA, IncredibleCosmos, Pendulul, Nemurirea.

## VEL-MOR
Romanul *VEL-MOR* (*A Șasea Nemurire*, 3 cărți, 9 părți, 41 de capitole, extinde personajul Reflexia din „A cincea nemurire”) trăiește azi doar în conversații și în ediția bilingvă DOCX/PDF; nu există depozit. Punți pregătite: aceleași fișiere-șablon (Akasha/Fabrica pentru cântecele și glosar) se pot genera din textul lui după ce este depus aici.

## Reciprocitate
Linkurile către TerRa și ORARIUM poartă `&from=nota-zero`; TerRa și ORARIUM afișează un buton „← înapoi” doar pentru surse cunoscute (terra, orarium, nota-zero, bolta). Orice altă valoare e ignorată.
