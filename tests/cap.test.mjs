// Nota Zero — teste pentru ?cap= (1–7, 1b, epilog, science), prioritatea hash-ului, focus, valori ostile;
// plus verificări statice ale etichetelor punților din serie/index.html și ale corecturii „Pământ sus pe cerul selenar”.
// Rulare: node tests/cap.test.mjs   (playwright din /opt/node-tools sau PW_ROOT=/home/claude/pw/package.json)
import {createRequire} from 'module';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const require = createRequire(process.env.PW_ROOT || '/opt/node-tools/package.json');
const {chromium} = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..');
const APP = 'file://' + path.join(ROOT, 'index.html');
let pass = 0, fail = 0;
const ok = (c, n, i) => { if (c) { pass++; console.log('  ok   ' + n); } else { fail++; console.log('  FAIL ' + n + (i === undefined ? '' : ' ' + JSON.stringify(i).slice(0, 300))); } };
const browser = await chromium.launch({executablePath: process.env.CHROME || '/opt/pw-browsers/chromium', args: ['--no-sandbox']});
async function open(qs, hash = '') {
  const ctx = await browser.newContext({viewport: {width: 1280, height: 800}, locale: 'ro-RO'});
  await ctx.route(/^https?:/, r => r.abort());
  const page = await ctx.newPage(), errs = [];
  page.on('pageerror', e => errs.push(e.message));
  page.on('console', m => { if (/Content Security Policy|Refused to/i.test(m.text())) errs.push(m.text()); });
  await page.goto(APP + qs + hash); await page.waitForTimeout(1500);
  return {ctx, page, errs};
}
console.log('Nota Zero — ?cap=');
for (const [q, id] of [['1', 'cap1'], ['3', 'cap3'], ['7', 'cap7'], ['1b', 'cap1b'], ['epilog', 'epilog'], ['science', 'science']]) {
  const {ctx, page, errs} = await open('?cap=' + q);
  const r = await page.evaluate(i => { const e = document.getElementById(i); const b = e.getBoundingClientRect(); return {hash: location.hash, top: Math.round(b.top), focused: document.activeElement === e}; }, id);
  ok(r.hash === '#' + id, `?cap=${q} → #${id}`, r);
  ok(Math.abs(r.top) < 200, `?cap=${q}: ținta e în fereastră`, r);
  ok(r.focused, `?cap=${q}: ținta primește focusul`, r);
  ok(errs.length === 0, `?cap=${q}: fără erori/CSP`, errs);
  await ctx.close();
}
for (const bad of ['0', '8', '1c', '11', 'EPILOG', '<script>', '__proto__', '1b%00', '']) {
  const {ctx, page, errs} = await open('?cap=' + encodeURIComponent(bad));
  ok(await page.evaluate(() => location.hash) === '' && errs.length === 0, `?cap=${bad} ignorat`, errs);
  await ctx.close();
}
{
  const {ctx, page} = await open('?cap=3', '#cap5');
  ok(await page.evaluate(() => location.hash) === '#cap5', 'hash-ul are prioritate față de ?cap=');
  await ctx.close();
}
console.log('Verificări statice (serie/, carte/)');
const serie = fs.readFileSync(path.join(ROOT, 'serie', 'index.html'), 'utf8');
ok(!/blocnotesului lui Emil/.test(serie), 'blocnotesul e al Zarei, nu al lui Emil');
ok(/blocnotesului Zarei/.test(serie) && /timp orbital/.test(serie), 'etichetă 22:14 = timp orbital');
ok(!/cerul din epilogul Vol\. I</.test(serie) && /ilustrativ/.test(serie), 'etichetă Oslo 2087 marcată ilustrativ');
ok(!/href="\.\.\/punti\/README\.md"/.test(serie) && /github\.com\/chiuta\/Nota-Zero\/blob\/main\/punti\/README\.md/.test(serie), 'link README → GitHub blob');
const zara = fs.readFileSync(path.join(ROOT, 'serie', 'vol-01-05-zara.html'), 'utf8');
ok(!/Pământ pe orizontul selenar/.test(zara) && !/deasupra orizontului selenar/.test(zara) && /sus pe cerul selenar/.test(zara), 'Pământul sus pe cerul selenar (nu pe orizont)');
const carte = fs.readFileSync(path.join(ROOT, 'carte', 'Nota-Zero-carte-completa-ro.md'), 'utf8');
ok(!/Pământ pe orizontul selenar/.test(carte), 'cartea .md corectată');
const arh = fs.readFileSync(path.join(ROOT, 'serie', 'arhiva-initiala', 'vol-02-03-nota-unu-nota-finala.html'), 'utf8');
ok(/class="ed-arh"/.test(arh), 'arhiva are nota editorială despre Pământ');
await browser.close();
console.log(`\n${pass} reușite, ${fail} eșuate`);
process.exit(fail ? 1 : 0);
