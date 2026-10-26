// Nota Zero 2.0.0 — „note vii”: simulări interactive (corzi vibrante, dimensiuni compactificate, ciocnirea branelor, gravitația care scapă, volum/suprafață).
// Rulare: node tests/sim.test.mjs   (Playwright + Chromium headless, rețea blocată; PW_ROOT / NODE_PATH pentru playwright)
import {createRequire} from 'module';
import path from 'node:path';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
const require = createRequire(process.env.PW_ROOT || import.meta.url);
const {chromium} = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const INDEX = path.join(HERE, '..', 'index.html');
const APP = 'file://' + INDEX;
const AXE = process.env.FFF_AXE || process.env.AXE_PATH;
let pass = 0, fail = 0;
const ok = (c, n, i) => { if (c) { pass++; console.log('  ok   ' + n); } else { fail++; console.log('  FAIL ' + n + (i === undefined ? '' : ' ' + JSON.stringify(i).slice(0, 400))); } };
const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || process.env.CHROME || undefined, args: ['--no-sandbox']});
async function open(o = {}) {
  const ctx = await browser.newContext({viewport: o.vp || {width: 1100, height: 900}, locale: 'ro-RO', reducedMotion: o.rm || 'no-preference', bypassCSP: !!o.bypass});
  const reqs = [], errs = [];
  await ctx.route(/^https?:/, r => { reqs.push(r.request().url()); r.abort(); });
  const page = await ctx.newPage();
  page.on('pageerror', e => errs.push(e.message));
  page.on('console', m => { if (m.type() === 'error' || /Content Security Policy|Refused to/i.test(m.text())) errs.push(m.text()); });
  await page.goto(APP); await page.waitForTimeout(900);
  return {ctx, page, reqs, errs};
}
const chip = (id) => '[data-lang-block].lang-active .nz-chip[data-for="' + id + '"] .nz-open';
const ink = page => page.evaluate(() => { const c = document.querySelector('.nz-sim canvas'); const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 0) n++; return n; });
const raw = fs.readFileSync(INDEX, 'utf8');
console.log('Nota Zero — note vii (simulări)');
{
  const {ctx, page, reqs, errs} = await open();
  ok(!errs.length && !reqs.length, 'pornire: 0 erori, 0 CSP, 0 cereri de rețea', {errs, reqs});
  const cnt = await page.evaluate(() => ({chips: document.querySelectorAll('.nz-chip').length, blocks: [...document.querySelectorAll('[data-lang-block]')].filter(b => b.querySelector('.nz-chip')).length, sci: document.querySelectorAll('.nz-sci-open .nz-open').length, p: document.querySelectorAll('.nz-sim p, .nz-chip p, .nz-sci-open p').length}));
  ok(cnt.chips === 40 && cnt.blocks === 40 && cnt.sci === 5 && cnt.p === 0, 'butoane: 5 simulări × 8 limbi lângă pasaje + 5 în notele științifice; niciun <p> nou (indexul pasajelor rămâne intact)', cnt);
  const where = await page.evaluate(() => [['cap2', 'strings'], ['cap3', 'compact'], ['cap4', 'ek'], ['cap5', 'lk'], ['cap6', 'ho']].map(([a, s]) => { const c = document.querySelector('#' + a + ' [data-lang-block="ro"] .nz-chip[data-for="' + s + '"]'); return a + ':' + c.previousElementSibling.textContent.slice(0, 18); }));
  ok(where.join('|') === 'cap2:O coardă. O singur|cap3:— Am deschis o fer|cap4:Membranele se atin|cap5:Gravitonul vibra ș|cap6:— Ai auzit vreodat', 'butoanele stau imediat după pasajele potrivite', where);
  const same = await page.evaluate(() => ['cap2', 'cap3', 'cap4', 'cap5', 'cap6'].every(a => [...document.querySelectorAll('#' + a + ' [data-lang-block]')].every(b => b.querySelectorAll('.nz-chip').length === 1)));
  ok(same, 'fiecare bloc de limbă are exact un buton per capitol ales');
  const ps = await page.evaluate(() => document.querySelectorAll('#cap2 [data-lang-block="ro"] .chapter-body p').length);
  ok(ps === 12, 'textul poveștii: cap. 2 are în continuare 12 paragrafe', ps);
  // corzi
  await page.locator(chip('strings')).scrollIntoViewIfNeeded();
  await page.click(chip('strings'));
  const o1 = await page.evaluate(() => { const s = document.querySelector('.nz-sim'); const b = document.querySelector('[data-lang-block].lang-active .nz-chip[data-for="strings"]'); return {n: document.querySelectorAll('.nz-sim').length, after: b.nextElementSibling === s, exp: b.querySelector('.nz-open').getAttribute('aria-expanded'), read: s.querySelector('.nz-read').textContent, title: s.querySelector('.nz-ttl').textContent, play: s.querySelector('.nz-pl').getAttribute('aria-pressed')}; });
  ok(o1.n === 1 && o1.after && o1.exp === 'true' && /Modul 3: frecvență 3×/.test(o1.read) && /2 noduri/.test(o1.read) && /Coarda vibrează/.test(o1.title), 'corzi: se deschide lângă pasaj, modul 3 → 2 noduri', o1);
  ok(o1.play === 'true' && await ink(page) > 500, 'corzi: se animă și desenul nu e gol');
  const t1 = await page.evaluate(() => __nzSims.cur().st.t); await page.waitForTimeout(400);
  ok(await page.evaluate(t => __nzSims.cur().st.t > t, t1), 'corzi: timpul avansează (animație)');
  await page.locator('.nz-sim input[type=range]').fill('5');
  ok(/Modul 5: frecvență 5×.*4 noduri/.test(await page.textContent('.nz-sim .nz-read')), 'corzi: n=5 → frecvență 5×, 4 noduri');
  await page.click('.nz-sim .nz-tg');
  ok(/10 noduri/.test(await page.textContent('.nz-sim .nz-read')) && /închisă/.test(await page.textContent('.nz-sim .nz-tg')) && await ink(page) > 300, 'corzi: coardă închisă, n=5 → 10 noduri');
  // o singură simulare deschisă
  await page.locator(chip('compact')).scrollIntoViewIfNeeded(); await page.click(chip('compact'));
  ok(await page.evaluate(() => document.querySelectorAll('.nz-sim').length === 1 && document.querySelector('.nz-sim').getAttribute('data-sim') === 'compact'), 'o singură simulare deschisă la un moment dat');
  await page.locator('.nz-sim input[type=range]').fill('3');
  const far = await page.textContent('.nz-sim .nz-read');
  await page.locator('.nz-sim input[type=range]').fill('25');
  const near = await page.textContent('.nz-sim .nz-read');
  ok(/De departe/.test(far) && /De aproape.*șapte din cele unsprezece/.test(near), 'compactificate: zoom mic → linie, zoom mare → cerc (7 din 11)', {far, near});
  // ciocnirea branelor
  await page.locator(chip('ek')).scrollIntoViewIfNeeded(); await page.click(chip('ek'));
  await page.evaluate(() => __nzSims.cur().setPlay(false));
  const rd = async v => { await page.locator('.nz-sim input[type=range]').fill(String(v)); return page.textContent('.nz-sim .nz-read'); };
  const e1 = await rd(10), e2 = await rd(50), e3 = await rd(90);
  ok(/se apropie/.test(e1) && /Contact.*Big Bang.*linie de contact/.test(e2) && /îndepărtează.*speculativă/.test(e3), 'brane: apropiere → contact (Big Bang) → îndepărtare (ipoteză speculativă)', [e1, e2, e3]);
  const ink50 = await ink(page); await rd(5); ok(await ink(page) !== ink50, 'brane: desenul se schimbă cu faza');
  // gravitația scapă
  await page.locator(chip('lk')).scrollIntoViewIfNeeded(); await page.click(chip('lk'));
  await page.evaluate(() => __nzSims.cur().setPlay(false));
  const l0 = await rd(0), l50 = await rd(50), l100 = await rd(100);
  ok(/0 din 6/.test(l0) && /3 din 6/.test(l50) && /6 din 6/.test(l100) && /ipotetic/.test(l50), 'gravitație: 0 → 3 → 6 coarde închise au plecat; gravitonul rămâne „ipotetic”', [l0, l50, l100]);
  // volum / suprafață
  await page.locator(chip('ho')).scrollIntoViewIfNeeded(); await page.click(chip('ho'));
  const cntRef = R => { let v = 0, s = 0; for (let x = -R; x <= R; x++) for (let y = -R; y <= R; y++) for (let z = -R; z <= R; z++) { const q = x * x + y * y + z * z; if (q <= R * R) { v++; if (q > (R - 1) * (R - 1)) s++; } } return [v, s]; };
  for (const R of [6, 12, 1]) {
    const r = await rd(R); const [v, s] = cntRef(R);
    ok(r.includes('volum: ' + v + ' ') || r.includes('volum: ' + v + '·') || new RegExp('volum: ' + v + '\\b').test(r), 'volum/suprafață R=' + R + ': ' + v + ' celule în volum' + (R === 6 ? ' (925)' : ''), r.slice(0, 80));
    ok(new RegExp('suprafață: ' + s + '\\b').test(r), 'volum/suprafață R=' + R + ': ' + s + ' celule la suprafață');
  }
  ok(cntRef(6)[0] === 925, 'referință: 925 puncte de rețea în sfera cu R=6');
  // Escape + focus
  await page.keyboard.press('Escape');
  ok(await page.evaluate(() => !document.querySelector('.nz-sim') && document.activeElement.classList.contains('nz-open') && document.activeElement.getAttribute('aria-expanded') === 'false'), 'Esc închide simularea și readuce focusul pe buton');
  ok(!errs.length, 'fără erori în consolă', errs);
  await ctx.close();
}
{
  // limbi
  const {ctx, page} = await open();
  await page.locator(chip('strings')).scrollIntoViewIfNeeded(); await page.click(chip('strings'));
  for (const [l, chipTxt, ttl] of [['en', 'Living note · vibrating strings', 'The string vibrates'], ['fr', 'Note vivante · cordes vibrantes', 'La corde vibre'], ['de', 'Lebendige Notiz · schwingende Saiten', 'Die Saite schwingt'], ['hu', 'Élő jegyzet · rezgő húrok', 'A húr rezeg'], ['ro', 'Notă vie · corzi vibrante', 'Coarda vibrează']]) {
    await page.evaluate(x => setLang(x), l); await page.waitForTimeout(250);
    const t = await page.evaluate(() => ({chip: document.querySelector('[data-lang-block].lang-active .nz-chip .nz-open').textContent, ttl: document.querySelector('.nz-sim .nz-ttl') ? document.querySelector('.nz-sim .nz-ttl').textContent : null, aria: document.querySelector('.nz-sim canvas') ? document.querySelector('.nz-sim canvas').getAttribute('aria-label') : null}));
    ok(t.chip === '⟐ ' + chipTxt && (l === 'ro' ? true : t.ttl === '⟐ ' + ttl), 'limba ' + l + ': butonul și panoul deschis sunt traduse', t);
  }
  // fiecare limbă are toate cheile
  const miss = await page.evaluate(() => { const ks = Object.keys(T.ro).filter(k => k.indexOf('sim.') === 0); return ['ro', 'en', 'fr', 'it', 'es', 'pt', 'de', 'hu'].map(l => [l, ks.filter(k => !T[l][k] || (T.ro[k].match(/\{\w+\}/g) || []).sort().join() !== (T[l][k].match(/\{\w+\}/g) || []).sort().join())]).filter(a => a[1].length); });
  ok(miss.length === 0, 'i18n: toate cheile „sim.*” există în cele 8 limbi, cu aceleași {variabile}', miss);
  // secțiunea de note științifice
  await page.evaluate(() => setLang('ro'));
  await page.locator('#science .sci-header').first().scrollIntoViewIfNeeded(); await page.click('#science .sci-item:nth-child(2) .sci-header');
  await page.click('#science .sci-item:nth-child(2) .nz-open');
  const s1 = await page.evaluate(() => { const b = document.querySelector('#science .sci-item:nth-child(2) .sci-body'); return {open: b.classList.contains('open'), sim: !!b.querySelector('.nz-sim'), has: b.classList.contains('has-sim'), id: b.querySelector('.nz-sim') && b.querySelector('.nz-sim').getAttribute('data-sim'), txt: b.querySelector('.nz-open').textContent}; });
  ok(s1.open && s1.sim && s1.has && s1.id === 'strings', 'nota 1 (corzi): simularea se deschide în secțiunea de note', s1);
  await page.click('#science .sci-item:nth-child(3) .sci-header'); await page.waitForTimeout(400);
  ok(await page.evaluate(() => !document.querySelector('.nz-sim')), 'închiderea notei închide și simularea ei');
  ok(await page.evaluate(() => document.querySelectorAll('#science .sci-item:nth-child(7) .nz-open, #science .sci-item:nth-child(8) .nz-open').length === 0), 'notele 6–7 (CMB, necunoscut) nu au simulare: nu s-a inventat niciuna');
  await ctx.close();
}
{
  // mișcare redusă: fără animație, doar cu glisoare
  const {ctx, page} = await open({rm: 'reduce'});
  await page.locator(chip('strings')).scrollIntoViewIfNeeded(); await page.click(chip('strings'));
  const r = await page.evaluate(() => ({pl: document.querySelector('.nz-pl').getAttribute('aria-pressed'), t: __nzSims.cur().st.t, playing: __nzSims.cur().st.playing}));
  await page.waitForTimeout(400);
  ok(r.pl === 'false' && !r.playing && await page.evaluate(t => __nzSims.cur().st.t === t, r.t), 'mișcare redusă: simularea pornește oprită, nu se animă');
  await page.locator('.nz-sim input[type=range]').fill('6');
  ok(/Modul 6/.test(await page.textContent('.nz-sim .nz-read')) && await ink(page) > 500, 'mișcare redusă: glisorul actualizează desenul static');
  await ctx.close();
}
{
  // telefon 360px + accesibilitate
  const {ctx, page} = await open({vp: {width: 360, height: 740}, bypass: true});
  await page.locator(chip('compact')).scrollIntoViewIfNeeded(); await page.click(chip('compact'));
  await page.evaluate(() => __nzSims.cur().setPlay(false));
  const w = await page.evaluate(() => ({sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, cvw: document.querySelector('.nz-sim canvas').getBoundingClientRect().width}));
  ok(w.sw <= w.cw + 1 && w.cvw > 250, 'telefon 360px: fără defilare orizontală, desenul încape', w);
  if (AXE && fs.existsSync(AXE)) {
    await page.addScriptTag({content: fs.readFileSync(AXE, 'utf8')});
    const v = await page.evaluate(async () => { const x = await axe.run('.nz-sim'); return x.violations.map(a => a.id + ':' + a.nodes.length); });
    ok(!v.length, 'axe-core pe panoul simulării: 0 violări', v);
  } else console.log('  skip axe (FFF_AXE nesetat)');
  await ctx.close();
}
await browser.close();
console.log('\n' + pass + ' reușite, ' + fail + ' eșuate'); process.exit(fail ? 1 : 0);
