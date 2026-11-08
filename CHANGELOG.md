# Jurnal de modificări — Nota Zero

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
