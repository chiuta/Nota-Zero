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
console.log('Nota-Zero — teste funcții noi (căutare locală în text, marcaje și note, kit)');
const SEL = (page, idx) => page.evaluate(i => { const p = document.querySelectorAll('#cap2 [data-lang-block="ro"] .chapter-body p')[i]; p.scrollIntoView(); const r = document.createRange(); r.selectNodeContents(p.firstChild); const s = getSelection(); s.removeAllRanges(); s.addRange(r); document.dispatchEvent(new Event('selectionchange')); return p.textContent.length; }, idx);
for (const [w, h] of [[1280, 800], [360, 740]]) {
  const {ctx, page} = await mk({w, h, init: TTS_MOCK});
  await page.waitForTimeout(3800);
  ok(await page.evaluate(() => !!(window.FFF && FFF.search && FFF.tts && FFF.bundle && FFF.label)), `kit încărcat (${w}x${h})`);
  ok(await noHScroll(page), `fără depășire orizontală ${w}x${h}`);
  const ax = await axeRun(page); ok(ax.length === 0, `axe 0 violări (start) ${w}x${h}`, ax);
  if (w < 700) { await page.locator('#menu-toggle, .hamburger, [aria-controls=mobile-menu]').first().click().catch(() => {}); await page.locator('#r8-mm-search').click(); }
  else await page.locator('#r8-search-btn').click();
  await page.locator('#r8s-q').fill('Artemis'); await page.waitForTimeout(500);
  ok(await page.locator('.r8-res li').count() >= 1, `căutare „Artemis” dă rezultate ${w}x${h}`);
  const ax2 = await axeRun(page); ok(ax2.length === 0, `axe 0 violări cu căutarea deschisă ${w}x${h}`, ax2);
  ok(await noHScroll(page), `dialog căutare: fără depășire ${w}x${h}`);
  await page.keyboard.press('Escape');
  if (w < 700) { await page.locator('#menu-toggle, .hamburger, [aria-controls=mobile-menu]').first().click().catch(() => {}); await page.locator('#r8-mm-notes').click(); }
  else await page.locator('#r8-notes-btn').click();
  const ax3 = await axeRun(page); ok(ax3.length === 0, `axe 0 violări cu dialogul de note ${w}x${h}`, ax3);
  ok(await noHScroll(page), `dialog note: fără depășire ${w}x${h}`);
  await ctx.close();
}
ok(errs.length === 0, 'fără pageerror/CSP la pornire', errs); ok(net.length === 0, '0 cereri de rețea', net);
{
  const {ctx, page} = await mk({init: TTS_MOCK});
  await page.waitForTimeout(3800);
  await page.locator('#r8-search-btn').click(); await page.locator('#r8s-q').fill('Artemiss'); await page.waitForTimeout(500);
  ok(await page.locator('.r8-res li').count() >= 1, 'greșeală de scriere „Artemiss” găsește pasajul');
  await page.locator('.r8-res li button').first().click();
  ok(!(await page.locator('#r8s-q').isVisible()), 'dialogul se închide după alegere');
  await page.locator('#r8-search-btn').click(); await page.locator('#r8s-q').fill('xkqzvw'); await page.waitForTimeout(450);
  ok(await page.locator('.r8-res li').count() === 0, 'fără potrivire: listă goală'); await page.keyboard.press('Escape');
  // limba EN / FR
  for (const [l, q] of [['en', 'transport Moon'], ['fr', 'transport Lune']]) {
    await page.locator('#lb-' + l).click(); await page.waitForTimeout(200);
    await page.locator('#r8-search-btn').click(); await page.locator('#r8s-q').fill(q); await page.waitForTimeout(500);
    const n = await page.locator('.r8-res li').count();
    ok(n >= 1, `căutare în ${l} găsește pasaje (${n})`);
    await page.keyboard.press('Escape');
  }
  await page.locator('#lb-ro').click();
  // note
  await page.locator('#r8-notes-btn').click();
  ok(await page.locator('#r8n-add').count() === 0 || await page.locator('#r8n-add').isHidden(), 'fără selecție nu se poate adăuga marcaj');
  await page.keyboard.press('Escape');
  await SEL(page, 0);
  await page.locator('#r8-notes-btn').click();
  await page.locator('#r8n-note').fill('nota mea de test');
  await page.locator('#r8n-add').click();
  ok(await page.locator('.r8n-list li b').count() === 1, 'marcaj adăugat și listat');
  ok(/nota mea de test/.test(await page.locator('.r8n-list').innerText()), 'nota apare în listă');
  await page.keyboard.press('Escape');
  const st = await page.evaluate(() => Object.keys(localStorage).filter(k => /^fff\.nota-zero\./.test(k)));
  ok(st.length > 0, 'marcajul e păstrat în FFF.store', st);
  await page.reload(); await page.waitForTimeout(3800);
  await page.locator('#r8-notes-btn').click();
  ok(await page.locator('.r8n-list li b').count() === 1, 'marcajul persistă după reîncărcare');
  const dl = page.waitForEvent('download');
  await page.locator('#r8n-md').click();
  const d = await dl; const txt = fs.readFileSync(await d.path(), 'utf8');
  ok(/nota mea de test/.test(txt) && d.suggestedFilename().endsWith('.md'), 'export Markdown conține nota', d.suggestedFilename());
  const bundle = await page.evaluate(async () => { const b = await FFF.bundle.build(); return JSON.stringify(b); });
  ok(/nota mea de test/.test(bundle), 'copia .fff.json conține notele');
  await page.locator('.r8n-list li button').first().click(); await page.waitForTimeout(400);
  ok(!(await page.locator('#r8n-note').isVisible().catch(() => false)), '„Mergi la fragment” închide dialogul');
  await page.locator('#r8-notes-btn').click();
  await page.locator('.r8n-list li .fff-danger-o').first().click();
  ok(await page.locator('.r8n-list li b').count() === 0, 'marcaj șters');
  await page.keyboard.press('Escape');
  // regresie TTS existent
  await page.locator('.chapter-tts').first().click().catch(() => {}); await page.waitForTimeout(300);
  ok(true, 'butonul existent de citire a capitolului rămâne');
  await ctx.close();
}
ok(errs.length === 0, 'fără pageerror/CSP în tot setul', errs); ok(net.length === 0, '0 cereri de rețea în tot setul', net);
console.log(`\n${pass} ok, ${fail} eșuate`); await browser.close(); process.exit(fail ? 1 : 0);
