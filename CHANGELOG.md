# Jurnal de modificări — Nota Zero

## 2.2.2 — 2026-11-17

- Compatibilitate cu browsere mai vechi (Chrome/Edge 55+, Firefox 52+, Safari 10.1+/iOS 10.3+): kitul 1.8.0 aduce stratul de compatibilitate (rezerve pentru API-urile care lipsesc în motoarele vechi), iar sintaxa JavaScript mai nouă decât ES2017 a fost înlocuită cu forme echivalente acolo unde exista; expresiile regulate noi și `import()` trec prin rezerve. Fără modificări de funcționalitate intenționate. Verificat cu parser ES2017 și într-un motor vechi simulat, nu pe dispozitive reale.

## 2.2.1 — 2026-11-15

- Nou: butoane de distribuire pe rețele sociale (vertical, pe marginea din stânga; fără scripturi externe, doar linkuri deschise la clic); bara de zoom cu lupă și „potrivire ecran” revine pe marginea din dreapta, centrată pe verticală; corectat afișarea suprapusă la zoom mare (panourile cu înălțimi în vh/vw nu mai ies din ecran).

## 2.2.0 — 2026-11-15

- Nou: accesibilitate pe toate ecranele — butonul „Aa” (mărimea textului, contrast ridicat, fără animații, text lizibil, linkuri subliniate, citire cu voce), săgeata „Înapoi sus” și „Sari la conținut”; fereastra se potrivește mereu ecranului; zoom-ul cu lupă și „potrivire ecran” stau acum pe marginea din stânga (fff-kit 1.6.0).

## 2.1.8 — 2026-11-15

- Nou: texturi fractale hiper-detaliate (fff-texturi 1.1.2) — fundalul și suprafețele mari (carduri, panouri, antete, butoane; filele și dialogurile ascunse la încărcare, când se deschid) primesc un material generat local (WebGL2, fără rețea și fără imagini), care se repetă fără cusătură; culorile aplicației rămân ale ei. Se oprește din dialogul „Transparență” sau cu `?notex=1`.

## 2.1.3 — 2026-11-08
Secțiunea «Note științifice» repetă în cap avertismentul «Ficțiune / speculație; notele nu înlocuiesc surse academice» (cheia existentă foot.fiction, 8 limbi). Testul sim.test.mjs selectează acum `div.sci-item:nth-of-type` (paragraful nou nu mai strică numărătoarea nth-child).

## 2.1.0 — 2026-11-02 (reîmprospătare kit)

- Nou (kit): **Sincronizare între dispozitive** (`FFF.sync`) — în dialogul «Transparență» (clic pe versiune → Copie de siguranță): conectezi două dispozitive direct (WebRTC, cod/QR, fără server și fără cont) și își schimbă datele aplicației; cea mai recentă valoare câștigă, secretele (chei API, parole) nu se trimit, ștergerile nu se propagă. Aplicarea trece prin importul kitului (confirmare, chei permise, rollback).
- Nou (kit): **Istoric local — «mașina timpului»** (`FFF.history`) — instantanee automate ale datelor (IndexedDB, fără secrete), diferență față de starea curentă și restaurare reversibilă; «Șterge datele aplicației» șterge și istoricul.
- Module adăugate: `qr`, `p2p`, `sync`, `history` (+~140 KB). Versiunea aplicației nu se schimbă.

## 2.1.0 — 2026-10-27

Anterior: v2.0.1. Recenzie 2 (2026-10-27).

- Buton nou 📖 în bara de sus: generează și descarcă EPUB 3 pentru limba activă direct din textul paginii (script inline nou `nz-epub`; ZIP „store” scris de mână, fără bibliotecă, fără rețea). Rezultat verificat: ZIP/XML valid, `mimetype` primul, aceleași capitole și titluri ca EPUB-urile din `carte/` (ro, en, de testate). Etichetele noi: RO și EN; fr/it/es/pt/de/hu sunt traduceri automate, neverificate de vorbitori nativi.
- Hash-urile CSP recalculate (`fixcsp`); `app.json`/`fff-info` regenerate.
- README: EN și RO actualizate (butonul din aplicație); fr, it, es, pt, de, hu aduse la versiunea 2.1.0 cu o secțiune scurtă „EPUB” (traducere automată).
- Test nou `tests/epub-in-app.test.mjs`.

Nu s-a implementat: EPUB pentru seria completă de 41 de volume (textul Markdown a fost extras din PDF și ar propaga neregulile de extragere).

## 2.0.1 — 2026-10-27

Anterior: v2.0.0. Recenzie 2026-10-27 (doar texte și fișiere de descărcare; logica aplicației nu s-a schimbat).

- Sinopsis în două fraze și extras din capitolul I (RO și EN), în `README.ro.md` și `README.md`.
- Export EPUB: câte un EPUB 3 pe limbă (`carte/Nota-Zero-poveste-<lang>.epub`, 8 limbi), generat din textul din `index.html` cu `scripts/build_epub.py` (doar biblioteca standard Python, fără rețea). PDF-ul seriei complete există deja în `carte/`.
- README: „Stare: stabil” și „Offline: complet”; observația că `index.md` este o variantă mai veche a povestirii.
- Versiunea din subsol, `fff-info`, `app.json` și `sw.js` aliniată la 2.0.1 (cache nou pentru PWA).

Nu s-a implementat: buton de export în aplicație (ar modifica scripturile inline și hash-urile CSP); EPUB pentru seria completă de 41 de volume (textul Markdown a fost extras din PDF și ar propaga neregulile de extragere); actualizarea celorlalte șase README-uri lingvistice (fr, it, es, pt, de, hu).
