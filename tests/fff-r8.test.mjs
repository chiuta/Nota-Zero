// Teste funcții noi (runda 8, 14 octombrie 2026) — Playwright, Chromium headless, rețea blocată.
// Rulare: node tests/fff-r8.test.mjs   (cere /opt/node-tools cu playwright și /opt/pw-browsers/chromium; axe-core opțional prin AXE_PATH)
// [fff-portable] axe-core: FFF_AXE / AXE_PATH, apoi pachetul `axe-core` (npm i -D axe-core). Dacă lipsește: undefined (testele cu axe pică cu mesaj clar).
import {createRequire as __fffCR} from 'node:module';
const __fffAxe = () => process.env.FFF_AXE || process.env.AXE_PATH || (() => { try { return __fffCR(import.meta.url).resolve('axe-core/axe.min.js'); } catch { return undefined; } })();
import {createRequire} from 'module';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const require = createRequire(process.env.PW_ROOT || import.meta.url);
const {chromium} = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const INDEX = path.join(HERE, '..', 'index.html');
const URL_APP = 'file://' + INDEX;
const AXE = process.env.AXE_PATH || __fffAxe();
const sleep = ms => new Promise(r => setTimeout(r, ms));
let pass = 0, fail = 0;
const ok = (cond, name, info) => { if (cond) { pass++; console.log('  ok   ' + name); } else { fail++; console.log('  FAIL ' + name + (info === undefined ? '' : ' ' + JSON.stringify(info).slice(0, 500))); } };
const FLAGS = ['--no-sandbox', '--allow-loopback-in-peer-connection', '--disable-features=WebRtcHideLocalIpsWithMdns'];
const browser = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || process.env.CHROME || undefined, args: FLAGS});
const net = [], errs = [];
async function mk(o = {}) {
  const ctx = await browser.newContext({viewport: {width: o.w || 1280, height: o.h || 800}, acceptDownloads: true, colorScheme: o.scheme || 'dark', reducedMotion: o.reduced ? 'reduce' : 'no-preference', locale: o.locale || 'ro-RO', bypassCSP: !!o.bypassCSP});
  await ctx.route(/^https?:/, r => { net.push(r.request().url()); r.abort(); });
  if (o.init) await ctx.addInitScript(o.init);
  const page = await ctx.newPage();
  page.on('pageerror', e => errs.push('pageerror: ' + e.message));
  page.on('console', m => { const t = m.text(); if (m.type() === 'error' || /Content Security Policy|Refused to/i.test(t)) errs.push('console: ' + t); });
  if (o.goto !== false) await page.goto(o.url || URL_APP);
  return {ctx, page};
}
async function axeRun(page, sel) {
  if (!(await page.evaluate(() => !!window.axe))) await page.evaluate(fs.readFileSync(AXE, 'utf8') + '\n;0');
  return page.evaluate(async s => { const r = await window.axe.run(s ? document.querySelector(s) : document, {resultTypes: ['violations']}); return r.violations.map(v => v.id + ':' + v.nodes.map(n => n.target.join(' ')).slice(0, 3).join(' | ')); }, sel || null);
}
const noHScroll = page => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);
// sintetizator vocal fals: înregistrează textele „citite”
const TTS_MOCK = () => {
  window.__spoken = [];
  class U { constructor(t) { this.text = t; this.voice = null; this.lang = ''; this.rate = 1; } }
  const V = [{name: 'Test RO', lang: 'ro-RO', voiceURI: 'ro', localService: true, default: true}, {name: 'Test EN', lang: 'en-US', voiceURI: 'en', localService: true, default: false}];
  const synth = {getVoices: () => V, speaking: false, addEventListener() {}, removeEventListener() {}, pause() {}, resume() {},
    cancel() { synth.speaking = false; }, speak(u) { synth.speaking = true; setTimeout(() => { window.__spoken.push({text: u.text, lang: u.lang}); synth.speaking = false; if (u.onstart) u.onstart({}); if (u.onend) u.onend({}); }, 5); }};
  Object.defineProperty(window, 'SpeechSynthesisUtterance', {value: U, configurable: true}); Object.defineProperty(window, 'speechSynthesis', {value: synth, configurable: true});
};
console.log('Nota-Zero — teste r8: căutare în text (🔎) + semne de carte și notițe (📝), 8 limbi, 1280/360 px, rețea blocată');
const LANGS = ['ro', 'en', 'fr', 'it', 'es', 'pt', 'de', 'hu'];
const QUERY = {ro: 'membrana', en: 'membrane', fr: 'membrane', it: 'membrana', es: 'membrana', pt: 'membrana', de: 'membran', hu: 'membrán'};
for (const [w, h] of [[1280, 800], [360, 740]]) {
  const {ctx, page} = await mk({w, h, init: TTS_MOCK});
  await page.waitForTimeout(1500);
  ok(await page.evaluate(() => !!(window.FFF && FFF.search && FFF.tts && FFF.bundle && FFF.label && FFF.nzSearch && FFF.nzNotes)), `kit + căutare + notițe încărcate (${w}x${h})`);
  ok(await page.locator('#r8-search-btn').isVisible() && await page.locator('#r8-notes-btn').isVisible(), `butoanele 🔎 și 📝 vizibile ${w}x${h}`);
  ok(await noHScroll(page), `fără depășire orizontală ${w}x${h}`);
  const ax = await axeRun(page); ok(ax.length === 0, `axe 0 violări (start) ${w}x${h}`, ax);
  // --- căutare, în fiecare limbă
  for (const l of LANGS) {
    await page.evaluate(x => window.setLang(x), l); await page.waitForTimeout(120);
    await page.locator('#r8-search-btn').click(); await page.waitForTimeout(150);
    await page.fill('#r8s-q', QUERY[l]); await page.waitForTimeout(500);
    const n = await page.locator('.r8-res button').count();
    ok(n > 0, `căutare „${QUERY[l]}” (${l}) ${w}x${h}: ${n} rezultate`);
    ok(await page.evaluate(() => !/undefined|\[object|\{\{/.test(document.querySelector('dialog.r8-dlg[open]').innerText)), `fără chei brute (${l})`);
    if (l === 'ro') {
      await page.fill('#r8s-q', 'membrană'); await page.waitForTimeout(500);   // diacritice
      ok(await page.locator('.r8-res button').count() > 0, 'diacritice: „membrană” găsește');
      await page.fill('#r8s-q', 'membarna'); await page.waitForTimeout(500);    // greșeală
      ok(await page.locator('.r8-res button').count() > 0, 'greșeală: „membarna” găsește');
      const axs = await axeRun(page); ok(axs.length === 0, `axe 0 violări cu dialogul Căutare ${w}x${h}`, axs);
      ok(await noHScroll(page), `dialog Căutare: fără depășire ${w}x${h}`);
      await page.locator('.r8-res button').first().click(); await page.waitForTimeout(1800);
      ok(await page.locator('.r8-flash').count() === 1, 'salt la pasaj (evidențiere)');
      const vis = await page.evaluate(() => { const r = document.querySelector('.r8-flash').getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; });
      ok(vis, 'pasajul găsit e în ecran');
    } else { await page.keyboard.press('Escape'); await page.waitForTimeout(100); }
  }
  await page.evaluate(() => window.setLang('ro'));
  // --- notițe: selecție, adăugare, persistență, export, copie de siguranță, ștergere
  await page.evaluate(() => { const p = document.querySelector('#cap1 [data-lang-block="ro"] .chapter-body p'); const r = document.createRange(); r.selectNodeContents(p.firstChild); const s = getSelection(); s.removeAllRanges(); s.addRange(r); });
  await page.waitForTimeout(150);
  await page.locator('#r8-notes-btn').click(); await page.waitForTimeout(200);
  ok(await page.locator('#r8n-note').count() === 1, 'dialog notițe cu pasaj selectat');
  await page.fill('#r8n-note', 'Notița mea de test ăîșț');
  await page.locator('#r8n-add').click(); await page.waitForTimeout(150);
  ok(await page.locator('.r8n-list li').count() === 1 && /Notița mea/.test(await page.locator('.r8n-list').innerText()), 'notiță adăugată');
  const axn = await axeRun(page); ok(axn.length === 0, `axe 0 violări cu dialogul Notițe ${w}x${h}`, axn);
  ok(await noHScroll(page), `dialog Notițe: fără depășire ${w}x${h}`);
  const [dl] = await Promise.all([page.waitForEvent('download'), page.locator('#r8n-md').click()]);
  const md = fs.readFileSync(await dl.path(), 'utf8'); ok(/Notița mea de test/.test(md) && /^# /.test(md), 'export Markdown', md.slice(0, 120));
  const b = await page.evaluate(() => JSON.stringify(FFF.bundle.build())); ok(/Notița mea de test/.test(b), 'notița în copia .fff.json');
  await page.keyboard.press('Escape'); await page.waitForTimeout(100);
  await page.reload(); await page.waitForTimeout(1200);
  ok(await page.evaluate(() => FFF.nzNotes.count()) === 1, 'notița persistă după reîncărcare');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.locator('#r8-notes-btn').click(); await page.waitForTimeout(200);
  await page.locator('.r8n-go').first().click(); await page.waitForTimeout(500);
  ok(await page.locator('.r8-flash').count() === 1, 'salt la pasajul notiței');
  await page.locator('#r8-notes-btn').click(); await page.waitForTimeout(200);
  await page.locator('.r8n-del').first().click(); await page.waitForTimeout(150);
  ok(await page.evaluate(() => FFF.nzNotes.count()) === 0, 'notiță ștearsă');
  await page.keyboard.press('Escape');
  // 8 limbi: text UI diferit
  const seen = {};
  for (const l of LANGS) { await page.evaluate(x => window.setLang(x), l); await page.locator('#r8-notes-btn').click(); await page.waitForTimeout(150);
    const t = await page.locator('.r8n-dlg h2').innerText(); seen[l] = t; ok(!/undefined|\[object|\{\{|^title$/.test(t) && t.length > 3, `titlu notițe (${l}): ${t}`);
    ok(await noHScroll(page), `notițe ${l}: fără depășire ${w}`); await page.keyboard.press('Escape'); }
  ok(new Set(Object.values(seen)).size >= 7, 'titluri distincte în 8 limbi', seen);
  // regresie TTS
  await page.evaluate(() => window.setLang('ro')); await page.locator('.chapter-tts').first().click().catch(() => {}); await page.waitForTimeout(400);
  ok(await page.evaluate(() => (window.__spoken || []).length) > 0, 'citirea cu voce rămâne funcțională');
  await ctx.close();
}
ok(errs.length === 0, 'fără pageerror/CSP în tot setul', errs); ok(net.length === 0, '0 cereri de rețea în tot setul', net);
console.log(`\n${pass} ok, ${fail} eșuate`); await browser.close(); process.exit(fail ? 1 : 0);
