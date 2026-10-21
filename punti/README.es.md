# Puentes Nota Zero ↔ aplicaciones (verificados en el código y en Chromium, 18 de octubre de 2026)
[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · **Español** · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Principio: ninguna aplicación envía ni recibe nada en segundo plano. Los enlaces se abren solo al hacer clic y los archivos de aquí se importan manualmente. Nota Zero lee de la dirección únicamente `#capN` y `?cap=` (`1`–`7`, `1b`, `epilog`, `science`); cualquier otro parámetro se ignora.

## Enlaces profundos (en `serie/index.html`)
| Destino | Enlace | Observación |
|---|---|---|
| TerRa | `TerRa/#v=sky&t=2087-05-17T02:35:00Z&ll=59.9139,10.7522&from=nota-zero` | Acepta cualquier año; precisión probada solo en 1900–2100, por encima de 2100 ΔT se extrapola y Plutón deja de ser válido |
| ORARIUM | `orarium/#view=acum&body=luna&t=2087-05-14T22:14:00Z&from=nota-zero` | Sin límite de fecha; `22:14` es tiempo orbital, aproximado como UTC |
| Nota Zero | `Nota-Zero/#cap5` o `Nota-Zero/?cap=5` | `?cap=1…7`, `1b` (Interludio), `epilog`, `science`; el hash tiene prioridad; el destino recibe el foco (teclado, lector de pantalla) |

## Archivos listos para importar (`punti/import/`)
| Archivo | Aplicación | Cómo |
|---|---|---|
| `undava-nota-zero-quiz.json` | Undava | importación de cuestionario (9 preguntas de las notas científicas) |
| `fabrica-nota-zero.course.json`, `fabrica-intrebari-nota-zero.csv` | Fabrica | curso JSON o CSV de preguntas |
| `akasha-nota-zero.json` | Akasha | importación de registros (12 entradas; sin `meta`, por lo que no cambia la preferencia «estrellas»; las entradas-cuaderno llevan la fecha de la importación, y la fecha de la historia está en el título) |
| `clopotel-nota-zero.json` / `.csv` | Clopotel | JSON, CSV o pegado (9 elementos) |
| `calmwaves-nota-zero.fff.json`, `calmwaves-coduri-varianta.txt` | CalmWaves | importación de paquete FFF (8 ajustes preestablecidos, para dejar margen bajo el límite de 12; los otros 4 — Kavya, Leila, Zara, Rin — están en el archivo de códigos). **Atención:** desde CalmWaves 1.1.2 la importación combina los ajustes importados con los propios (mismo nombre = sustituido, tope de 12). La asignación a texturas es editorial |
| `asmr-nota-zero.fff.json`, `asmr-linkuri-mix.txt` | ASMR | importación de paquete FFF (ASMR 1.1.1 combina los ajustes importados con los propios; mismo nombre = sustituido; tope de 50); `#mix=` exige hacer clic en «Reproducir la mezcla» |
| `borderlessmelodies-genuri-nota-muzicii.json` | BorderlessMelodies | importación de géneros; solo 12-TET, maqam aproximado |
| `zicala-nota-zero.txt` | Zicala | importación .txt (2 proverbios: akan, māori) |
| `fascicul-nota-zero.json` | FASCICUL | «Empezar como pantalla» → 📂 Sesión; 9 notas (2 epígrafes + 7 notas científicas, ≤ 400 caracteres, sin solapamientos) |
| `constelar-nota-zero.json` | Constelar | compañera «Zara Voss» (historia personal sin repeticiones, 4 recuerdos permanentes); **sustituye** a los compañeros existentes (pide confirmación). Desde Constelar 1.2.0 la importación conserva el idioma, el proveedor y el modelo actuales |
| `nexus-nota-zero.json` | Nexus | persona «Zara Voss (Nota Zero)»; Nexus añade, no sustituye |
| `lexicon-nota-zero.tsv` | Lexicon | importación TSV (17 entradas: 7 notas científicas + 10 términos akan de los Vol. X–XI); al importar se solicita la licencia (la decisión es del autor). Observado: la primera consulta tras la importación puede no devolver nada, la segunda funciona |

## Directamente, sin archivos
- ATINGERE: carga `carte/Nota-Zero-carte-completa-ro.pdf` o `.md` (braille o audio). Desde ATINGERE 1.1.1 el idioma `ro` se detecta correctamente (el punto medio «·» de los títulos ya no vota por el catalán).
- VoiceAtelier 1.2.0: la muestra «Nota Zero — Alexio» (dos frases del Vol. I) aparece en la lista de muestras.
- AcademiSearch 4.2.0: `https://chiuta.github.io/AcademiSearch/#q=ekpyrotic%20universe%20Steinhardt%20Turok` rellena previamente el campo (no inicia la búsqueda); otros ejemplos: `#q=AdS%2FCFT%20Maldacena`, `#q=holographic%20principle%20Susskind`, `#q=Planck%202018%20cosmological%20parameters`.
- TerRa 1.5.0 / ValeaPlopului1972 1.2.0: `TerRa/#v=2d&ufo=valea-plopului&from=valeaplopului` centra el mapa en el caso de Valea Plopului; ValeaPlopului1972 tiene en el menú el enlace de vuelta a TerRa. El texto «el primer caso OVNI atestiguado…» de TerRa aún no se ha modificado (decisión del propietario).
- MarkdownAtelier: importa `carte/Nota-Zero-carte-completa-ro.md`.
- AI-Liber / TranslateHub / Nexus / LocalMind (RAG): solo extractos; requieren red o un modelo local.

## Descartadas
Aurora, Limpezimea (solo ajustes), Arhiva, Orar (no lee la dirección), Eclipsa-2027, ECLIPSA, HoroScop, CLEPSIDRA, IncredibleCosmos, Pendulul, Nemurirea.

## VEL-MOR
La novela *VEL-MOR* (*A Șasea Nemurire*, 3 libros, 9 partes, 41 capítulos, que amplía el personaje de Reflexia de «A cincea nemurire») vive hoy solo en conversaciones y en la edición bilingüe DOCX/PDF; no existe un repositorio. Puentes preparados: los mismos archivos plantilla (Akasha/Fabrica para las canciones y el glosario) podrán generarse a partir de su texto una vez depositado aquí.

## Reciprocidad
Los enlaces a TerRa y ORARIUM llevan `&from=nota-zero`; TerRa y ORARIUM muestran un botón «← volver» solo para las fuentes conocidas (terra, orarium, nota-zero). Cualquier otro valor se ignora.
