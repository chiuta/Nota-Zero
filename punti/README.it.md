# Ponti Nota Zero ↔ applicazioni (verificati nel codice e in Chromium, 18 ottobre 2026)
[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · **Italiano** · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Principio: nessuna applicazione invia o riceve nulla in background. I link si aprono solo al clic e i file qui presenti si importano manualmente. Nota Zero legge dall’indirizzo soltanto `#capN` e `?cap=` (`1`–`7`, `1b`, `epilog`, `science`); qualsiasi altro parametro viene ignorato.

## Link diretti (in `serie/index.html`)
| Destinazione | Link | Osservazione |
|---|---|---|
| TerRa | `TerRa/#v=sky&t=2087-05-17T02:35:00Z&ll=59.9139,10.7522&from=nota-zero` | Accetta qualsiasi anno; precisione testata solo per 1900–2100, oltre il 2100 ΔT è estrapolato e Plutone non è più valido |
| ORARIUM | `orarium/#view=acum&body=luna&t=2087-05-14T22:14:00Z&from=nota-zero` | Nessun limite di data; `22:14` è tempo orbitale, approssimato come UTC |
| Nota Zero | `Nota-Zero/#cap5` oppure `Nota-Zero/?cap=5` | `?cap=1…7`, `1b` (Interludio), `epilog`, `science`; l’hash ha la precedenza; la destinazione riceve il focus (tastiera, lettore di schermo) |

## File pronti da importare (`punti/import/`)
| File | Applicazione | Come |
|---|---|---|
| `undava-nota-zero-quiz.json` | Undava | importazione di quiz (9 domande tratte dalle note scientifiche) |
| `fabrica-nota-zero.course.json`, `fabrica-intrebari-nota-zero.csv` | Fabrica | corso JSON o CSV di domande |
| `akasha-nota-zero.json` | Akasha | importazione di registri (12 voci; senza `meta`, quindi non modifica la preferenza «stelle»; le voci-taccuino portano la data dell’importazione, mentre la data nella storia è nel titolo) |
| `clopotel-nota-zero.json` / `.csv` | Clopotel | JSON, CSV o incolla (9 elementi) |
| `calmwaves-nota-zero.fff.json`, `calmwaves-coduri-varianta.txt` | CalmWaves | importazione di pacchetto FFF (8 preset, per lasciare spazio sotto il limite di 12; gli altri 4 — Kavya, Leila, Zara, Rin — sono nel file dei codici). **Attenzione:** da CalmWaves 1.1.2 l’importazione unisce i preset importati a quelli propri (stesso nome = sostituito, tetto di 12). L’associazione alle texture è editoriale |
| `asmr-nota-zero.fff.json`, `asmr-linkuri-mix.txt` | ASMR | importazione di pacchetto FFF (ASMR 1.1.1 unisce i preset importati a quelli propri; stesso nome = sostituito; tetto di 50); `#mix=` richiede un clic su «Riproduci il mix» |
| `borderlessmelodies-genuri-nota-muzicii.json` | BorderlessMelodies | importazione di generi; solo 12-TET, maqam approssimato |
| `zicala-nota-zero.txt` | Zicala | importazione .txt (2 proverbi: akan, māori) |
| `fascicul-nota-zero.json` | FASCICUL | «Avvia come schermo» → 📂 Sessione; 9 note (2 epigrafi + 7 note scientifiche, ≤ 400 caratteri, senza sovrapposizioni) |
| `constelar-nota-zero.json` | Constelar | compagno «Zara Voss» (storia personale senza ripetizioni, 4 ricordi permanenti); **sostituisce** i compagni esistenti (chiede conferma). Da Constelar 1.2.0 l’importazione mantiene la lingua, il provider e il modello correnti |
| `nexus-nota-zero.json` | Nexus | persona «Zara Voss (Nota Zero)»; Nexus aggiunge, non sostituisce |
| `lexicon-nota-zero.tsv` | Lexicon | importazione TSV (17 voci: 7 note scientifiche + 10 termini akan dai Vol. X–XI); all’importazione viene richiesta la licenza (la decisione spetta all’autore). Osservato: la prima interrogazione dopo l’importazione può non restituire nulla, la seconda funziona |

## Direttamente, senza file
- ATINGERE: carica `carte/Nota-Zero-carte-completa-ro.pdf` oppure `.md` (braille o audio). Da ATINGERE 1.1.1 la lingua `ro` viene rilevata correttamente (il punto mediano «·» nei titoli non vota più per il catalano).
- VoiceAtelier 1.2.0: il campione «Nota Zero — Alexio» (due frasi dal Vol. I) compare nell’elenco dei campioni.
- AcademiSearch 4.2.0: `https://chiuta.github.io/AcademiSearch/#q=ekpyrotic%20universe%20Steinhardt%20Turok` precompila il campo (non avvia la ricerca); altri esempi: `#q=AdS%2FCFT%20Maldacena`, `#q=holographic%20principle%20Susskind`, `#q=Planck%202018%20cosmological%20parameters`.
- TerRa 1.5.0 / ValeaPlopului1972 1.2.0: `TerRa/#v=2d&ufo=valea-plopului&from=valeaplopului` centra la mappa sul caso di Valea Plopului; ValeaPlopului1972 ha nel menu il link di ritorno a TerRa. Il testo «il primo caso UFO attestato…» di TerRa non è ancora stato modificato (decisione del proprietario).
- MarkdownAtelier: importa `carte/Nota-Zero-carte-completa-ro.md`.
- AI-Liber / TranslateHub / Nexus / LocalMind (RAG): solo estratti; richiedono la rete o un modello locale.

## Escluse
Aurora, Limpezimea (solo impostazioni), Arhiva, Orar (non legge l’indirizzo), Eclipsa-2027, ECLIPSA, HoroScop, CLEPSIDRA, IncredibleCosmos, Pendulul, Nemurirea.

## VEL-MOR
Il romanzo *VEL-MOR* (*A Șasea Nemurire*, 3 libri, 9 parti, 41 capitoli, che amplia il personaggio di Reflexia da «A cincea nemurire») vive oggi soltanto nelle conversazioni e nell’edizione bilingue DOCX/PDF; non esiste un repository. Ponti predisposti: gli stessi file modello (Akasha/Fabrica per le canzoni e il glossario) potranno essere generati dal suo testo una volta depositato qui.

## Reciprocità
I link verso TerRa e ORARIUM portano `&from=nota-zero`; TerRa e ORARIUM mostrano un pulsante «← indietro» solo per le fonti note (terra, orarium, nota-zero). Qualsiasi altro valore viene ignorato.
