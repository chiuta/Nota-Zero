# Nota Zero ↔ app bridges (checked in code and in Chromium, 18 October 2026)
**English** · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Principle: no app sends or receives anything in the background. The links open only on click, and the files here are imported manually. Nota Zero reads only `#capN` and `?cap=` from the address (`1`–`7`, `1b`, `epilog`, `science`); any other parameter is ignored.

## Deep links (in `serie/index.html`)
| Target | Link | Note |
|---|---|---|
| TerRa | `TerRa/#v=sky&t=2087-05-17T02:35:00Z&ll=59.9139,10.7522&from=nota-zero` | Accepts any year; precision tested only for 1900–2100, beyond 2100 ΔT is extrapolated and Pluto is no longer valid |
| ORARIUM | `orarium/#view=acum&body=luna&t=2087-05-14T22:14:00Z&from=nota-zero` | No date limit; `22:14` is orbital time, approximated as UTC |
| Nota Zero | `Nota-Zero/#cap5` or `Nota-Zero/?cap=5` | `?cap=1…7`, `1b` (Interlude), `epilog`, `science`; the hash takes priority; the target receives focus (keyboard, screen reader) |

## Files ready to import (`punti/import/`)
| File | App | How |
|---|---|---|
| `undava-nota-zero-quiz.json` | Undava | quiz import (9 questions from the scientific notes) |
| `fabrica-nota-zero.course.json`, `fabrica-intrebari-nota-zero.csv` | Fabrica | JSON course or CSV of questions |
| `akasha-nota-zero.json` | Akasha | register import (12 entries; no `meta`, so it does not change the “stars” preference; the notebook entries carry the import date, while the in-story date is in the title) |
| `clopotel-nota-zero.json` / `.csv` | Clopotel | JSON, CSV or paste (9 items) |
| `calmwaves-nota-zero.fff.json`, `calmwaves-coduri-varianta.txt` | CalmWaves | FFF package import (8 presets, to leave room under the limit of 12; the other 4 — Kavya, Leila, Zara, Rin — are in the codes file). **Note:** since CalmWaves 1.1.2 the import merges the imported presets with your own (same name = replaced, cap of 12). The mapping onto textures is editorial |
| `asmr-nota-zero.fff.json`, `asmr-linkuri-mix.txt` | ASMR | FFF package import (ASMR 1.1.1 merges the imported presets with your own; same name = replaced; cap of 50); `#mix=` requires a click on “Play the mix” |
| `borderlessmelodies-genuri-nota-muzicii.json` | BorderlessMelodies | genre import; 12-TET only, maqam approximate |
| `zicala-nota-zero.txt` | Zicala | .txt import (2 proverbs: Akan, Māori) |
| `fascicul-nota-zero.json` | FASCICUL | “Start as a screen” → 📂 Session; 9 notes (2 epigraphs + 7 scientific notes, ≤ 400 characters, no overlaps) |
| `constelar-nota-zero.json` | Constelar | “Zara Voss” companion (backstory without repetitions, 4 permanent memories); **replaces** the existing companions (asks for confirmation). Since Constelar 1.2.0 the import keeps the current language, provider and model |
| `nexus-nota-zero.json` | Nexus | persona “Zara Voss (Nota Zero)”; Nexus adds, it does not replace |
| `lexicon-nota-zero.tsv` | Lexicon | TSV import (17 entries: 7 scientific notes + 10 Akan terms from Vol. X–XI); the licence is requested on import (the decision is the author's). Observed: the first query after import may return nothing, the second works |

## Direct, without files
- ATINGERE: load `carte/Nota-Zero-carte-completa-ro.pdf` or `.md` (braille or audio). Since ATINGERE 1.1.1 the `ro` language is detected correctly (the middle dot “·” in the headings no longer votes for Catalan).
- VoiceAtelier 1.2.0: the sample “Nota Zero — Alexio” (two sentences from Vol. I) appears in the list of samples.
- AcademiSearch 4.2.0: `https://chiuta.github.io/AcademiSearch/#q=ekpyrotic%20universe%20Steinhardt%20Turok` pre-fills the field (it does not start the search); other examples: `#q=AdS%2FCFT%20Maldacena`, `#q=holographic%20principle%20Susskind`, `#q=Planck%202018%20cosmological%20parameters`.
- TerRa 1.5.0 / ValeaPlopului1972 1.2.0: `TerRa/#v=2d&ufo=valea-plopului&from=valeaplopului` centres the map on the Valea Plopului case; ValeaPlopului1972 has a link back to TerRa in its menu. The text “the first attested UFO case…” in TerRa has not been changed yet (the owner's decision).
- MarkdownAtelier: import `carte/Nota-Zero-carte-completa-ro.md`.
- AI-Liber / TranslateHub / Nexus / LocalMind (RAG): excerpts only; they require a network or a local model.

## Ruled out
Aurora, Limpezimea (settings only), Arhiva, Orar (does not read the address), Eclipsa-2027, ECLIPSA, HoroScop, CLEPSIDRA, IncredibleCosmos, Pendulul, Nemurirea.

## VEL-MOR
The novel *VEL-MOR* (*A Șasea Nemurire*, 3 books, 9 parts, 41 chapters, extending the character Reflexia from “A cincea nemurire”) lives today only in conversations and in the bilingual DOCX/PDF edition; there is no repository. Prepared bridges: the same template files (Akasha/Fabrica for the songs and glossary) can be generated from its text once it is deposited here.

## Reciprocity
The links to TerRa and ORARIUM carry `&from=nota-zero`; TerRa and ORARIUM show a “← back” button only for known sources (terra, orarium, nota-zero). Any other value is ignored.
