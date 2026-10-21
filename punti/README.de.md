# Brücken Nota Zero ↔ Anwendungen (im Code und in Chromium geprüft, 18. Oktober 2026)
[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · **Deutsch** · [Magyar](README.hu.md)

Prinzip: Keine Anwendung sendet oder empfängt etwas im Hintergrund. Die Links öffnen sich nur per Klick, und die hier liegenden Dateien werden manuell importiert. Nota Zero liest aus der Adresse nur `#capN` und `?cap=` (`1`–`7`, `1b`, `epilog`, `science`); jeder andere Parameter wird ignoriert.

## Deep Links (in `serie/index.html`)
| Ziel | Link | Hinweis |
|---|---|---|
| TerRa | `TerRa/#v=sky&t=2087-05-17T02:35:00Z&ll=59.9139,10.7522&from=nota-zero` | Akzeptiert jedes Jahr; Genauigkeit nur für 1900–2100 getestet, jenseits von 2100 wird ΔT extrapoliert und Pluto ist nicht mehr gültig |
| ORARIUM | `orarium/#view=acum&body=luna&t=2087-05-14T22:14:00Z&from=nota-zero` | Keine Datumsgrenze; `22:14` ist Orbitalzeit, näherungsweise als UTC |
| Nota Zero | `Nota-Zero/#cap5` oder `Nota-Zero/?cap=5` | `?cap=1…7`, `1b` (Zwischenspiel), `epilog`, `science`; der Hash hat Vorrang; das Ziel erhält den Fokus (Tastatur, Screenreader) |

## Importfertige Dateien (`punti/import/`)
| Datei | Anwendung | Wie |
|---|---|---|
| `undava-nota-zero-quiz.json` | Undava | Quiz-Import (9 Fragen aus den wissenschaftlichen Anmerkungen) |
| `fabrica-nota-zero.course.json`, `fabrica-intrebari-nota-zero.csv` | Fabrica | JSON-Kurs oder CSV mit Fragen |
| `akasha-nota-zero.json` | Akasha | Import von Registern (12 Einträge; ohne `meta`, ändert also nicht die Einstellung „Sterne“; die Notizbuch-Einträge tragen das Importdatum, das Datum aus der Geschichte steht im Titel) |
| `clopotel-nota-zero.json` / `.csv` | Clopotel | JSON, CSV oder Einfügen (9 Elemente) |
| `calmwaves-nota-zero.fff.json`, `calmwaves-coduri-varianta.txt` | CalmWaves | Import eines FFF-Pakets (8 Voreinstellungen, damit unter der Grenze von 12 Platz bleibt; die übrigen 4 — Kavya, Leila, Zara, Rin — stehen in der Codedatei). **Achtung:** Seit CalmWaves 1.1.2 führt der Import die importierten Voreinstellungen mit den eigenen zusammen (gleicher Name = ersetzt, Obergrenze 12). Die Zuordnung zu Texturen ist redaktionell |
| `asmr-nota-zero.fff.json`, `asmr-linkuri-mix.txt` | ASMR | Import eines FFF-Pakets (ASMR 1.1.1 führt die importierten Voreinstellungen mit den eigenen zusammen; gleicher Name = ersetzt; Obergrenze 50); `#mix=` erfordert einen Klick auf „Mix abspielen“ |
| `borderlessmelodies-genuri-nota-muzicii.json` | BorderlessMelodies | Import von Genres; nur 12-TET, Maqam angenähert |
| `zicala-nota-zero.txt` | Zicala | .txt-Import (2 Sprichwörter: Akan, Māori) |
| `fascicul-nota-zero.json` | FASCICUL | „Als Bildschirm starten“ → 📂 Sitzung; 9 Notizen (2 Epigraphe + 7 wissenschaftliche Anmerkungen, ≤ 400 Zeichen, ohne Überschneidungen) |
| `constelar-nota-zero.json` | Constelar | Begleiterin „Zara Voss“ (Hintergrundgeschichte ohne Wiederholungen, 4 dauerhafte Erinnerungen); **ersetzt** die vorhandenen Begleiter (fragt nach Bestätigung). Seit Constelar 1.2.0 behält der Import die aktuelle Sprache, den Anbieter und das Modell bei |
| `nexus-nota-zero.json` | Nexus | Persona „Zara Voss (Nota Zero)“; Nexus fügt hinzu, ersetzt nicht |
| `lexicon-nota-zero.tsv` | Lexicon | TSV-Import (17 Einträge: 7 wissenschaftliche Anmerkungen + 10 Akan-Begriffe aus Bd. X–XI); beim Import wird die Lizenz abgefragt (die Entscheidung liegt beim Autor). Beobachtet: Die erste Abfrage nach dem Import liefert unter Umständen nichts, die zweite funktioniert |

## Direkt, ohne Dateien
- ATINGERE: Lade `carte/Nota-Zero-carte-completa-ro.pdf` oder `.md` (Braille oder Audio). Seit ATINGERE 1.1.1 wird die Sprache `ro` korrekt erkannt (der Mittelpunkt „·“ in den Überschriften stimmt nicht mehr für Katalanisch).
- VoiceAtelier 1.2.0: Die Probe „Nota Zero — Alexio“ (zwei Sätze aus Bd. I) erscheint in der Liste der Proben.
- AcademiSearch 4.2.0: `https://chiuta.github.io/AcademiSearch/#q=ekpyrotic%20universe%20Steinhardt%20Turok` füllt das Feld vor (die Suche startet nicht); weitere Beispiele: `#q=AdS%2FCFT%20Maldacena`, `#q=holographic%20principle%20Susskind`, `#q=Planck%202018%20cosmological%20parameters`.
- TerRa 1.5.0 / ValeaPlopului1972 1.2.0: `TerRa/#v=2d&ufo=valea-plopului&from=valeaplopului` zentriert die Karte auf den Fall Valea Plopului; ValeaPlopului1972 hat im Menü den Rücklink zu TerRa. Der Text „der erste belegte UFO-Fall …“ in TerRa wurde noch nicht geändert (Entscheidung des Eigentümers).
- MarkdownAtelier: Importiere `carte/Nota-Zero-carte-completa-ro.md`.
- AI-Liber / TranslateHub / Nexus / LocalMind (RAG): nur Auszüge; sie erfordern ein Netzwerk oder ein lokales Modell.

## Ausgeschlossen
Aurora, Limpezimea (nur Einstellungen), Arhiva, Orar (liest die Adresse nicht), Eclipsa-2027, ECLIPSA, HoroScop, CLEPSIDRA, IncredibleCosmos, Pendulul, Nemurirea.

## VEL-MOR
Der Roman *VEL-MOR* (*A Șasea Nemurire*, 3 Bücher, 9 Teile, 41 Kapitel, der die Figur Reflexia aus „A cincea nemurire“ erweitert) lebt heute nur in Gesprächen und in der zweisprachigen DOCX/PDF-Ausgabe; ein Repository gibt es nicht. Vorbereitete Brücken: Dieselben Vorlagendateien (Akasha/Fabrica für die Lieder und das Glossar) lassen sich aus seinem Text erzeugen, sobald er hier abgelegt ist.

## Gegenseitigkeit
Die Links zu TerRa und ORARIUM tragen `&from=nota-zero`; TerRa und ORARIUM zeigen einen Button „← zurück“ nur für bekannte Quellen (terra, orarium, nota-zero). Jeder andere Wert wird ignoriert.
