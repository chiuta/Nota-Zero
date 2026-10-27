#!/usr/bin/env python3
"""Generează EPUB 3 din textul aflat în index.html (blocurile data-lang-block), pentru fiecare limbă.
Doar biblioteca standard Python; rezultatul este determinist.
Utilizare:  python3 scripts/build_epub.py [director_ieșire]   (implicit: carte/)"""
import re, sys, os, zipfile, html, uuid

LANGS = {'ro': 'Română', 'en': 'English', 'fr': 'Français', 'it': 'Italiano', 'es': 'Español', 'pt': 'Português', 'de': 'Deutsch', 'hu': 'Magyar'}
TITLE = 'Nota Zero'
AUTHOR = 'Alexandru Ionuț Chiuță'
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def blocks(src, lang):
    out = []
    for m in re.finditer(r'<(article|section)\b[^>]*\bid="(cap1|cap1b|cap\d|epilog|science)"[^>]*>', src):
        start = m.end()
        end = src.find('</article>' if m.group(1) == 'article' else '</section>', start)
        body = src[start:end]
        mb = re.search(r'<div data-lang-block="%s"[^>]*>(.*?)(?=<div data-lang-block="|\Z)' % lang, body, re.S)
        if not mb: continue
        out.append((m.group(2), mb.group(1)))
    return out

def clean(h):
    h = re.sub(r'<button\b.*?</button>', '', h, flags=re.S)
    h = re.sub(r'<(svg|canvas|script|style)\b.*?</\1>', '', h, flags=re.S)
    h = re.sub(r'\s(data-[\w-]+|onclick|class|id|style|aria-[\w-]+|tabindex|role)="[^"]*"', '', h)
    h = re.sub(r'<br\s*>', '<br/>', h)
    h = re.sub(r'<(hr|img|input)\b([^>]*[^/])?>', lambda m: '<%s%s/>' % (m.group(1), m.group(2) or ''), h)
    h = h.replace('&nbsp;', '&#160;')
    return h

def balance(h):
    # elimină div-urile de închidere în exces (după curățare)
    depth = 0; res = []
    for t in re.split(r'(</?div\b[^>]*>)', h):
        if t.startswith('</div'):
            if depth == 0: continue
            depth -= 1
        elif t.startswith('<div'): depth += 1
        res.append(t)
    return ''.join(res) + '</div>' * depth

def build(src, lang, outdir):
    chs = blocks(src, lang)
    if not chs: return None
    items = []
    for i, (cid, body) in enumerate(chs):
        t = re.search(r'<h2[^>]*>(.*?)</h2>', body, re.S)
        title = re.sub(r'<[^>]+>', '', t.group(1)).strip() if t else cid
        x = balance(clean(body))
        xhtml = ('<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="%s" lang="%s"><head><meta charset="utf-8"/><title>%s</title>'
                 '<link rel="stylesheet" href="s.css"/></head><body>%s</body></html>') % (lang, lang, html.escape(title), x)
        items.append(('c%02d.xhtml' % i, title, xhtml))
    uid = 'urn:uuid:' + str(uuid.uuid5(uuid.NAMESPACE_URL, 'https://chiuta.github.io/Nota-Zero/' + lang))
    css = 'body{font-family:serif;line-height:1.5}h2{margin:1.2em 0 .6em}.pull-quote,blockquote{font-style:italic;margin:1em 1.5em}'
    nav = '<?xml version="1.0" encoding="utf-8"?>\n<!DOCTYPE html>\n<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops"><head><meta charset="utf-8"/><title>%s</title></head><body><nav epub:type="toc"><ol>%s</ol></nav></body></html>' % (
        TITLE, ''.join('<li><a href="%s">%s</a></li>' % (f, html.escape(t)) for f, t, _ in items))
    opf = ('<?xml version="1.0" encoding="utf-8"?>\n<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="id"><metadata xmlns:dc="http://purl.org/dc/elements/1.1/">'
           '<dc:identifier id="id">%s</dc:identifier><dc:title>%s</dc:title><dc:creator>%s</dc:creator><dc:language>%s</dc:language><dc:date>2026</dc:date>'
           '<meta property="dcterms:modified">2026-10-27T00:00:00Z</meta></metadata><manifest><item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>'
           '<item id="css" href="s.css" media-type="text/css"/>%s</manifest><spine>%s</spine></package>') % (
        uid, TITLE, AUTHOR, lang,
        ''.join('<item id="i%d" href="%s" media-type="application/xhtml+xml"/>' % (i, f) for i, (f, _, _) in enumerate(items)),
        ''.join('<itemref idref="i%d"/>' % i for i in range(len(items))))
    cont = '<?xml version="1.0"?>\n<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container"><rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles></container>'
    path = os.path.join(outdir, 'Nota-Zero-poveste-%s.epub' % lang)
    with zipfile.ZipFile(path, 'w') as z:
        z.writestr(zipfile.ZipInfo('mimetype', (2026, 10, 27, 0, 0, 0)), 'application/epub+zip', zipfile.ZIP_STORED)
        def w(n, d):
            zi = zipfile.ZipInfo(n, (2026, 10, 27, 0, 0, 0)); zi.compress_type = zipfile.ZIP_DEFLATED; z.writestr(zi, d)
        w('META-INF/container.xml', cont); w('OEBPS/content.opf', opf); w('OEBPS/nav.xhtml', nav); w('OEBPS/s.css', css)
        for f, _, x in items: w('OEBPS/' + f, x)
    return path

if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'carte')
    src = open(os.path.join(ROOT, 'index.html'), encoding='utf8').read()
    for l in LANGS:
        print(build(src, l, out))
