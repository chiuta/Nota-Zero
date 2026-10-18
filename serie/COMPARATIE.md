# Comparație: ediția finală și seria completă (18 octombrie 2026)

Surse: `nota_zero_serie_completa_final.zip` (21 de fișiere, în `serie/`) și `seria-nota-zero-completa.zip` (în `serie/arhiva-initiala/`).
Metodă: fiecare paragraf de cel puțin 15 cuvinte din seria completă a fost căutat în ediția finală, după secvențe de câte 4 cuvinte; un paragraf cu sub 50% potrivire a fost socotit lipsă.

## Rezultat

| Volume | Paragrafe în seria completă | Lipsă în ediția finală |
| --- | --- | --- |
| VI–XLI (36 de volume) | 1.400 aprox. | 3, toate trei de câte 15–16 cuvinte (titluri și legături) |
| II–III (Nota Unu, Nota Finală) | 105 | 49 (circa 2.200 de cuvinte) |
| IV–V (Nota Vieții, Nota Conștiinței) | 94 | 58 (circa 2.700 de cuvinte) |
| I (Nota Zero) | 346 | conține și variantele EN/FR; textul românesc este în `index.html` din rădăcina depozitului |

Volumele VI–XLI din ediția finală conțin deci tot textul seriei, plus intervențiile ediției finale.

## Ce s-a găsit în ediția finală (fișierul `vol-01-05-zara.html`)

Secțiunile II–V erau rezumate prescurtate, cu fragmente rupte (de exemplu „Această carte este continuarea directă a lui” fără continuare, „— existau răspunsuri parțiale pentru asta. Ci de ce”). Lipseau, printre altele: pasajul cu Freeman Dyson, cosmologia ekpyrotică ciclică, moartea lui Emil, conferința despre fine-tuning, problema dificilă a conștiinței (Chalmers), paradoxul informației (Hawking), moartea Zarei și notele științifice ale celor patru cărți. Titlul paginii conținea și etichete HTML.

## Ce s-a făcut

- `serie/vol-01-05-zara.html`: secțiunile I și Interludiul Emil au rămas din ediția finală; în locul rezumatelor II–V s-a pus textul integral al cărților II–V din seria completă, cu stilul lor propriu (CSS izolat în `.s23` și `.s45`). Rămâne la sfârșit nota de arhivă din ediția finală. După îmbinare, 0 din cele 199 de paragrafe ale cărților II–V nu mai au potrivire.
- Titlul paginii a fost curățat de etichete HTML (la toate fișierele din `serie/`).
- Fonturile Google (`@import` și `<link>`) au fost scoase din toate paginile adăugate, în acord cu „fără dependențe externe”; paginile folosesc fonturi serif de sistem.
- `serie/arhiva-initiala/`: seria inițială fără volumul I (volumul I este `index.html` din rădăcină) și cele 10 analize critice.
- `serie/suplimentare/`: Nota Muzicii (Vol. XVII-A), cele zece scene, recenzia din 2400 și ghidul de implementare, recuperate din conversația de implementare din mai 2026.
- `carte/Nota-Zero-carte-completa-ro.pdf`: cartea completă în română, 478 de pagini.

## Rămas de verificat

- Cele 18 fișiere `vol-06…41` din ediția finală nu au fost modificate; diferențele față de seria completă (rescrieri, scene noi) nu au fost judecate literar, doar acoperite ca text.
- Textele noi din ediția finală (scene adăugate în rundele de revizie) nu au fost comparate invers cu seria; ele se păstrează.

## PDF-ul cărții (adăugat ulterior)

Tot textul din `carte/Nota-Zero-carte-completa-ro.pdf` a fost extras în `carte/Nota-Zero-carte-completa-ro.md` (aprox. 93.000 de cuvinte, 21 de volume-fișier, cuprins inclus). Față de paginile HTML din depozit, circa 4% din secvențele de 5 cuvinte ale PDF-ului nu s-au regăsit; cea mai mare parte sunt rupturi de pagină și cuvinte despărțite de textul justificat, dar câteva pasaje (de exemplu din cărțile V, IX și XXI) par să existe doar în PDF sau în altă formulare. Ele sunt acum în fișierul Markdown.

## Reparația volumelor VI–XLI (18 octombrie 2026, seara)

Verificarea a arătat că fișierele `vol-06…41` din ediția finală aveau structura distrusă: etichetele de paragraf, titlurile de capitol, citatele și stilurile se pierduseră, iar textul era un șir de linii goale, cu fragmente de titluri amestecate printre paragrafe. Textul, însă, era în mare parte prezent.

Reparația: cele 18 fișiere au fost reconstruite pe scheletul HTML curat al seriei inițiale (copertă, capitole, citate, note științifice, animații de fundal locale). Adaosurile reale ale ediției finale au fost reintroduse: blocurile de caiet („strat brut”), notele și blocurile cu tradiția Akan din Vol. X–XI (Akosua, okra, sunsum, sankofa, anansesem), scenele și mesajele din Kaito, Yuki și Priya, plus două note științifice din Vol. II–V. Verificare: din paragrafele de minimum 10 cuvinte ale vechilor fișiere nu mai lipsesc decât titlurile și liniile de antet. Navigarea dintre volume și linkul rupt din `aparat-critic.html` au fost reparate; titlurile paginilor nu mai conțin etichete HTML.
