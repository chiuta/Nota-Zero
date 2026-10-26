// Nota-Zero 1.2.0 — linkuri științifice spre cosmos. Copiat în Nota-Zero/tests/cosmos-bridge.test.mjs. Rulare: node cosmos-bridge.test.mjs <dirNZ> <dirHorizons> <dirUO3D>
import {createRequire} from "module"; const require = createRequire(process.env.PW_ROOT || import.meta.url); const {chromium} = require("playwright");
import {existsSync as __ex} from "node:fs"; import __pa from "node:path";
const __dirs = (args, defs) => { const out = defs.map((d, i) => { const c = args[i] ? [args[i]] : (Array.isArray(d) ? d : [d]); return c.map((x) => __pa.resolve(process.cwd(), x)).find((x) => __ex(__pa.join(x, "index.html"))); }); if (out.some((x) => !x)) { console.log("SKIP: testul cere și aplicațiile învecinate (" + defs.map((d) => [].concat(d)[0]).join(", ") + ") lângă depozit; în CI singur se omite"); process.exit(0); } return out; }; // [fff-ci]
let fails = 0, passes = 0; const check = (n, c, x) => { c ? (passes++, console.log("  ok  " + n)) : (fails++, console.log("FAIL  " + n + (x !== undefined ? "  -> " + JSON.stringify(x) : ""))); };
const [dN, dH, dU] = __dirs(process.argv.slice(2), [".", "../Horizons.BeyondLimits", "../Universul-Observabil-3D"]);
const b = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || undefined, args: ["--no-sandbox", "--use-gl=swiftshader", "--enable-unsafe-swiftshader"]});
const mk = async w => { const ctx = await b.newContext({viewport: {width: w || 1200, height: 900}}); const net = []; await ctx.route(/^https?:/, r => { net.push(r.request().url()); r.abort(); }); const p = await ctx.newPage(); p.errs = []; p.net = net; p.on("pageerror", e => p.errs.push(String(e))); return p; };
const p = await mk(); await p.goto("file://" + dN + "/index.html"); await p.waitForTimeout(2500);
const links = () => p.evaluate(() => [...document.querySelectorAll(".sci-lnk a")].map(a => ({k: a.dataset.i18n, h: a.getAttribute("href"), t: a.textContent, rel: a.rel, tg: a.target, vis: getComputedStyle(a).visibility})));
let l = await links();
check("3 linkuri (sci.3l, sci.6l, sci.6m)", l.length === 3 && l.map(x => x.k).join() === "sci.3l,sci.6l,sci.6m", l);
check("hrefuri exacte", l[0].h === "https://chiuta.github.io/Horizons.BeyondLimits/#universul-ciclic" && l[1].h === "https://chiuta.github.io/Horizons.BeyondLimits/#radiatia-cosmica-fosila" && l[2].h === "https://chiuta.github.io/Universul-Observabil-3D/?cam=1.8,1.2,380&from=nota-zero", l.map(x => x.h));
check("_blank + noopener", l.every(x => x.tg === "_blank" && /noopener/.test(x.rel)));
check("corp închis: linkurile ascunse din ordinea Tab (visibility:hidden)", l.every(x => x.vis === "hidden"), l.map(x => x.vis));
// deschide sci.6: linkurile devin vizibile
await p.evaluate(() => document.querySelectorAll(".sci-header")[5].click()); await p.waitForTimeout(600);
check("sci.6 deschis: linkurile lui vizibile", (await p.evaluate(() => [...document.querySelectorAll(".sci-item")[5].querySelectorAll(".sci-lnk a")].map(a => getComputedStyle(a).visibility))).every(v => v === "visible"));
check("conținutul sci.6b (innerHTML) nu a distrus linkurile", (await links()).length === 3);
// 3 limbi
const T = {};
for (const lg of ["ro", "en", "fr"]) { await p.evaluate(lg => setLang(lg), lg); await p.waitForTimeout(300); T[lg] = (await links()).map(x => x.t); }
check("texte distincte în ro/en/fr, fără 'undefined', fără chei goale", ["ro", "en", "fr"].every(g => T[g].every(x => x && x.length > 10 && !/undefined|^sci\./.test(x))) && new Set([T.ro[0], T.en[0], T.fr[0]]).size === 3, T);
check("0 erori / 0 rețea", p.errs.length === 0 && p.net.length === 0, [p.errs, p.net]);
// ținte
const q = await mk(); await q.goto("file://" + dH + "/index.html#universul-ciclic"); await q.waitForTimeout(4500);
check("Horizons: #universul-ciclic aduce în vedere scenariul „Universul ciclic”", await q.evaluate(() => { const el = [...document.querySelectorAll(".scenario-card")].find(c => /Universul ciclic|Cyclic Universe/.test(c.textContent)); if (!el) return false; const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; }));
const q2 = await mk(); await q2.goto("file://" + dH + "/index.html#radiatia-cosmica-fosila"); await q2.waitForTimeout(4500);
check("Horizons: #radiatia-cosmica-fosila aduce cardul în vedere", await q2.evaluate(() => { const el = [...document.querySelectorAll(".event-card")].find(c => /Radiația cosmică fosilă|Cosmic Microwave|Relic Radiation/i.test(c.textContent)); if (!el) return false; const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; }));
const q3 = await mk(); await q3.goto("file://" + dU + "/index.html?cam=1.8,1.2,380&from=nota-zero"); await q3.waitForTimeout(5000);
const cm = await q3.evaluate(() => ({t: theta, p: phi, r: camR})).catch(e => String(e));
check("UO-3D: camera aplicată (θ=1.8, φ=1.2, R=380), 0 erori, `from` ignorat", q3.errs.length === 0 && cm.t === 1.8 && cm.p === 1.2 && cm.r === 380, [cm, q3.errs]);
await b.close(); console.log(`\n${passes} reușite, ${fails} eșuate`); process.exit(fails ? 1 : 0);
