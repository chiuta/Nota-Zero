// Nota Zero 2.1.0 — export EPUB direct din aplicație (buton 📖): ZIP valid, mimetype primul, XML bine format, aceleași capitole ca în carte/*.epub.
// Rulare: node tests/epub-in-app.test.mjs   (Playwright, Chromium, rețea blocată)
import {createRequire} from 'module';
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const require = createRequire(process.env.PW_ROOT || import.meta.url);
const {chromium} = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url)), ROOT = path.join(HERE, '..');
const APP = 'file://' + path.join(ROOT, 'index.html');
let pass = 0, fail = 0;
const ok = (c, n, i) => { if (c) { pass++; console.log('  ok   ' + n); } else { fail++; console.log('  FAIL ' + n + (i === undefined ? '' : ' ' + JSON.stringify(i).slice(0, 400))); } };
const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || process.env.CHROME || undefined, args: ['--no-sandbox']});
const ctx = await browser.newContext({viewport: {width: 1280, height: 800}, locale: 'ro-RO', acceptDownloads: true});
const net = []; await ctx.route(/^https?:/, r => { net.push(r.request().url()); r.abort(); });
const page = await ctx.newPage(), errs = [];
page.on('pageerror', e => errs.push(e.message));
page.on('console', m => { if (m.type() === 'error' || /Content Security Policy|Refused to/i.test(m.text())) errs.push(m.text()); });
await page.goto(APP); await page.waitForTimeout(1500);
ok(await page.locator('#nz-epub-btn').count() === 1, 'butonul EPUB există');
ok(!!(await page.getAttribute('#nz-epub-btn', 'aria-label')), 'buton cu etichetă accesibilă');
const tmp = fs.mkdtempSync('/tmp/nzepub-');
const py = `
import zipfile,sys,re
from xml.dom import minidom
z=zipfile.ZipFile(sys.argv[1]); n=z.namelist()
assert n[0]=='mimetype' and z.getinfo('mimetype').compress_type==0 and z.read('mimetype')==b'application/epub+zip','mimetype'
assert z.testzip() is None
for f in n:
    if f.endswith(('.xhtml','.opf','.xml')): minidom.parseString(z.read(f))
nav=z.read('OEBPS/nav.xhtml').decode()
print(len(re.findall('<li>',nav)), sum(len(z.read(f)) for f in n if f.endswith('.xhtml')))
print('|'.join(re.findall(r'<a href="[^"]+">(.*?)</a>',nav)))
`;
for (const lang of ['ro', 'en', 'de']) {
  if (lang !== 'ro') { await page.evaluate(l => window.setLang && window.setLang(l), lang); await page.waitForTimeout(400); }
  const [dl] = await Promise.all([page.waitForEvent('download'), page.click('#nz-epub-btn')]);
  const f = path.join(tmp, dl.suggestedFilename()); await dl.saveAs(f);
  ok(dl.suggestedFilename() === `Nota-Zero-poveste-${lang}.epub`, `${lang}: nume fișier`, dl.suggestedFilename());
  let out = ''; try { out = execFileSync('python3', ['-I', '-c', py, f], {encoding: 'utf8'}).trim().split('\n'); } catch (e) { out = ['ERR ' + (e.stderr || e.message)]; }
  ok(/^\d+ \d+$/.test(out[0]), `${lang}: ZIP/XML valid, mimetype primul și nestocat comprimat`, out);
  const ref = path.join(ROOT, 'carte', `Nota-Zero-poveste-${lang}.epub`);
  const refOut = execFileSync('python3', ['-I', '-c', py, ref], {encoding: 'utf8'}).trim().split('\n');
  ok(out[0] && refOut[0] && out[0].split(' ')[0] === refOut[0].split(' ')[0], `${lang}: același număr de capitole ca în carte/ (${refOut[0].split(' ')[0]})`, [out[0], refOut[0]]);
  ok(out[1] === refOut[1], `${lang}: aceleași titluri de capitol ca în carte/`, [out[1], refOut[1]]);
}
ok(net.length === 0, 'nicio cerere de rețea', net);
ok(errs.length === 0, 'fără erori JS/CSP', errs);
await browser.close();
console.log(`\nepub-in-app: ${pass} reușite, ${fail} eșuate`); process.exit(fail ? 1 : 0);
