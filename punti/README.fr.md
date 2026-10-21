# Passerelles Nota Zero ↔ applications (vérifiées dans le code et dans Chromium, 18 octobre 2026)
[English](README.md) · [Română](README.ro.md) · **Français** · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Principe : aucune application n’envoie ni ne reçoit quoi que ce soit en arrière-plan. Les liens ne s’ouvrent qu’au clic, et les fichiers présentés ici s’importent manuellement. Nota Zero ne lit dans l’adresse que `#capN` et `?cap=` (`1`–`7`, `1b`, `epilog`, `science`) ; tout autre paramètre est ignoré.

## Liens profonds (dans `serie/index.html`)
| Cible | Lien | Remarque |
|---|---|---|
| TerRa | `TerRa/#v=sky&t=2087-05-17T02:35:00Z&ll=59.9139,10.7522&from=nota-zero` | Accepte n’importe quelle année ; précision testée seulement pour 1900–2100, au-delà de 2100 ΔT est extrapolé et Pluton n’est plus valide |
| ORARIUM | `orarium/#view=acum&body=luna&t=2087-05-14T22:14:00Z&from=nota-zero` | Pas de limite de date ; `22:14` est un temps orbital, approximé en UTC |
| Nota Zero | `Nota-Zero/#cap5` ou `Nota-Zero/?cap=5` | `?cap=1…7`, `1b` (Interlude), `epilog`, `science` ; le hash est prioritaire ; la cible reçoit le focus (clavier, lecteur d’écran) |

## Fichiers prêts à importer (`punti/import/`)
| Fichier | Application | Comment |
|---|---|---|
| `undava-nota-zero-quiz.json` | Undava | import de quiz (9 questions tirées des notes scientifiques) |
| `fabrica-nota-zero.course.json`, `fabrica-intrebari-nota-zero.csv` | Fabrica | cours JSON ou CSV de questions |
| `akasha-nota-zero.json` | Akasha | import de registres (12 entrées ; sans `meta`, donc il ne modifie pas la préférence « étoiles » ; les entrées-carnet portent la date d’import, la date de l’histoire figure dans le titre) |
| `clopotel-nota-zero.json` / `.csv` | Clopotel | JSON, CSV ou collage (9 éléments) |
| `calmwaves-nota-zero.fff.json`, `calmwaves-coduri-varianta.txt` | CalmWaves | import de paquet FFF (8 préréglages, pour laisser de la place sous la limite de 12 ; les 4 autres — Kavya, Leila, Zara, Rin — sont dans le fichier de codes). **Attention :** depuis CalmWaves 1.1.2, l’import fusionne les préréglages importés avec les vôtres (même nom = remplacé, plafond de 12). L’association aux textures est éditoriale |
| `asmr-nota-zero.fff.json`, `asmr-linkuri-mix.txt` | ASMR | import de paquet FFF (ASMR 1.1.1 fusionne les préréglages importés avec les vôtres ; même nom = remplacé ; plafond de 50) ; `#mix=` exige un clic sur « Lire le mix » |
| `borderlessmelodies-genuri-nota-muzicii.json` | BorderlessMelodies | import de genres ; uniquement 12-TET, maqam approximatif |
| `zicala-nota-zero.txt` | Zicala | import .txt (2 proverbes : akan, māori) |
| `fascicul-nota-zero.json` | FASCICUL | « Démarrer comme écran » → 📂 Session ; 9 notes (2 épigraphes + 7 notes scientifiques, ≤ 400 caractères, sans chevauchements) |
| `constelar-nota-zero.json` | Constelar | compagnon « Zara Voss » (histoire personnelle sans répétitions, 4 souvenirs permanents) ; **remplace** les compagnons existants (demande confirmation). Depuis Constelar 1.2.0, l’import conserve la langue, le fournisseur et le modèle actuels |
| `nexus-nota-zero.json` | Nexus | persona « Zara Voss (Nota Zero) » ; Nexus ajoute, il ne remplace pas |
| `lexicon-nota-zero.tsv` | Lexicon | import TSV (17 entrées : 7 notes scientifiques + 10 termes akan des vol. X–XI) ; la licence est demandée à l’import (la décision revient à l’auteur). Constaté : la première requête après l’import peut ne rien renvoyer, la deuxième fonctionne |

## Directement, sans fichiers
- ATINGERE : chargez `carte/Nota-Zero-carte-completa-ro.pdf` ou `.md` (braille ou audio). Depuis ATINGERE 1.1.1, la langue `ro` est détectée correctement (le point médian « · » des titres ne vote plus pour le catalan).
- VoiceAtelier 1.2.0 : l’échantillon « Nota Zero — Alexio » (deux phrases du vol. I) apparaît dans la liste des échantillons.
- AcademiSearch 4.2.0 : `https://chiuta.github.io/AcademiSearch/#q=ekpyrotic%20universe%20Steinhardt%20Turok` pré-remplit le champ (sans lancer la recherche) ; autres exemples : `#q=AdS%2FCFT%20Maldacena`, `#q=holographic%20principle%20Susskind`, `#q=Planck%202018%20cosmological%20parameters`.
- TerRa 1.5.0 / ValeaPlopului1972 1.2.0 : `TerRa/#v=2d&ufo=valea-plopului&from=valeaplopului` centre la carte sur le cas de Valea Plopului ; ValeaPlopului1972 a dans son menu un lien de retour vers TerRa. Le texte « premier cas d’OVNI attesté… » de TerRa n’a pas encore été modifié (décision du propriétaire).
- MarkdownAtelier : importez `carte/Nota-Zero-carte-completa-ro.md`.
- AI-Liber / TranslateHub / Nexus / LocalMind (RAG) : seulement des extraits ; ils exigent un réseau ou un modèle local.

## Écartées
Aurora, Limpezimea (réglages seulement), Arhiva, Orar (ne lit pas l’adresse), Eclipsa-2027, ECLIPSA, HoroScop, CLEPSIDRA, IncredibleCosmos, Pendulul, Nemurirea.

## VEL-MOR
Le roman *VEL-MOR* (*A Șasea Nemurire*, 3 livres, 9 parties, 41 chapitres, qui prolonge le personnage de Reflexia issu de « A cincea nemurire ») n’existe aujourd’hui que dans des conversations et dans l’édition bilingue DOCX/PDF ; il n’y a pas de dépôt. Passerelles préparées : les mêmes fichiers modèles (Akasha/Fabrica pour les chansons et le glossaire) pourront être générés à partir de son texte une fois qu’il sera déposé ici.

## Réciprocité
Les liens vers TerRa et ORARIUM portent `&from=nota-zero` ; TerRa et ORARIUM n’affichent un bouton « ← retour » que pour les sources connues (terra, orarium, nota-zero). Toute autre valeur est ignorée.
