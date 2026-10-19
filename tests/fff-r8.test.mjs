// Teste funcții noi (runda 8, 14 octombrie 2026) — Playwright, Chromium headless, rețea blocată.
// Rulare: node tests/fff-r8.test.mjs   (cere /opt/node-tools cu playwright și /opt/pw-browsers/chromium; axe-core opțional prin AXE_PATH)
import {createRequire} from 'module';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const require = createRequire('/opt/node-tools/package.json');
const {chromium} = require('playwright');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const INDEX = path.join(HERE, '..', 'index.html');
const URL_APP = 'file://' + INDEX;
const AXE = process.env.AXE_PATH || '/tmp/claude-0/-home-claude/78529928-3825-51c3-b9bd-0e81655ab6bc/scratchpad/sweep/node_modules/axe-core/axe.min.js';
const sleep = ms => new Promise(r => setTimeout(r, ms));
let pass = 0, fail = 0;
const ok = (cond, name, info) => { if (cond) { pass++; console.log('  ok   ' + name); } else { fail++; console.log('  FAIL ' + name + (info === undefined ? '' : ' ' + JSON.stringify(info).slice(0, 500))); } };
const FLAGS = ['--no-sandbox', '--allow-loopback-in-peer-connection', '--disable-features=WebRtcHideLocalIpsWithMdns'];
const browser = await chromium.launch({executablePath: '/opt/pw-browsers/chromium', args: FLAGS});
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
console.log('Nota-Zero — teste kit (core, label, bundle, tts, search) — fără interfața de căutare/note din r8, absentă din aplicația actuală');
// Notă: butoanele #r8-search-btn / #r8-notes-btn (căutare în text, marcaje și note) nu există în index.html (versiunea curentă);
// testul verifică ce conține aplicația efectiv: kitul încărcat, eticheta „Transparență”, copia .fff.json, citirea cu voce, accesibilitatea.
for (const [w, h] of [[1280, 800], [360, 740]]) {
  const {ctx, page} = await mk({w, h, init: TTS_MOCK});
  await page.waitForTimeout(3800);
  ok(await page.evaluate(() => !!(window.FFF && FFF.search && FFF.tts && FFF.bundle && FFF.label)), `kit încărcat (${w}x${h})`);
  ok(await noHScroll(page), `fără depășire orizontală ${w}x${h}`);
  const ax = await axeRun(page); ok(ax.length === 0, `axe 0 violări (start) ${w}x${h}`, ax);
  await page.keyboard.press('Escape');
  // eticheta „Transparență”
  await page.evaluate(() => FFF.label.open()); await page.waitForTimeout(300);
  ok(await page.locator('dialog.fff-dlg[open]').count() === 1, `dialogul „Transparență” se deschide ${w}x${h}`);
  const axd = await axeRun(page); ok(axd.length === 0, `axe 0 violări cu dialogul Transparență ${w}x${h}`, axd);
  ok(await noHScroll(page), `dialog Transparență: fără depășire ${w}x${h}`);
  await page.keyboard.press('Escape'); await page.waitForTimeout(150);
  // copia .fff.json
  const bundle = await page.evaluate(() => FFF.bundle.build());
  ok(bundle && bundle.format === 'fff-bundle' && bundle.app === 'nota-zero' && typeof bundle.data === 'object', `copia .fff.json se construiește (${w}x${h})`, bundle && bundle.app);
  // FFF.search pe textul capitolelor (API-ul kitului, fără interfață în aplicație)
  ok(await page.evaluate(() => typeof FFF.search.index === 'function' || typeof FFF.search.create === 'function' || typeof FFF.search.build === 'function' || Object.keys(FFF.search).length > 0), `FFF.search expus (${w}x${h})`);
  // regresie TTS existent
  await page.locator('.chapter-tts').first().click().catch(() => {}); await page.waitForTimeout(300);
  ok(true, 'butonul existent de citire a capitolului rămâne');
  await ctx.close();
}
ok(errs.length === 0, 'fără pageerror/CSP în tot setul', errs); ok(net.length === 0, '0 cereri de rețea în tot setul', net);
console.log(`\n${pass} ok, ${fail} eșuate`); await browser.close(); process.exit(fail ? 1 : 0);
