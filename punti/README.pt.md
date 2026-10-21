# Pontes Nota Zero ↔ aplicações (verificadas no código e no Chromium, 18 de outubro de 2026)
[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · **Português** · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Princípio: nenhuma aplicação envia nem recebe nada em segundo plano. As ligações abrem-se apenas ao clicar e os ficheiros aqui presentes importam-se manualmente. O Nota Zero lê do endereço apenas `#capN` e `?cap=` (`1`–`7`, `1b`, `epilog`, `science`); qualquer outro parâmetro é ignorado.

## Ligações diretas (em `serie/index.html`)
| Destino | Ligação | Observação |
|---|---|---|
| TerRa | `TerRa/#v=sky&t=2087-05-17T02:35:00Z&ll=59.9139,10.7522&from=nota-zero` | Aceita qualquer ano; precisão testada apenas em 1900–2100, acima de 2100 o ΔT é extrapolado e Plutão deixa de ser válido |
| ORARIUM | `orarium/#view=acum&body=luna&t=2087-05-14T22:14:00Z&from=nota-zero` | Sem limite de data; `22:14` é tempo orbital, aproximado como UTC |
| Nota Zero | `Nota-Zero/#cap5` ou `Nota-Zero/?cap=5` | `?cap=1…7`, `1b` (Interlúdio), `epilog`, `science`; o hash tem prioridade; o destino recebe o foco (teclado, leitor de ecrã) |

## Ficheiros prontos a importar (`punti/import/`)
| Ficheiro | Aplicação | Como |
|---|---|---|
| `undava-nota-zero-quiz.json` | Undava | importação de questionário (9 perguntas das notas científicas) |
| `fabrica-nota-zero.course.json`, `fabrica-intrebari-nota-zero.csv` | Fabrica | curso JSON ou CSV de perguntas |
| `akasha-nota-zero.json` | Akasha | importação de registos (12 entradas; sem `meta`, pelo que não altera a preferência «estrelas»; as entradas-caderno trazem a data da importação, e a data da história está no título) |
| `clopotel-nota-zero.json` / `.csv` | Clopotel | JSON, CSV ou colagem (9 elementos) |
| `calmwaves-nota-zero.fff.json`, `calmwaves-coduri-varianta.txt` | CalmWaves | importação de pacote FFF (8 predefinições, para deixar margem abaixo do limite de 12; as outras 4 — Kavya, Leila, Zara, Rin — estão no ficheiro de códigos). **Atenção:** desde o CalmWaves 1.1.2 a importação junta as predefinições importadas às próprias (mesmo nome = substituído, limite de 12). A atribuição às texturas é editorial |
| `asmr-nota-zero.fff.json`, `asmr-linkuri-mix.txt` | ASMR | importação de pacote FFF (o ASMR 1.1.1 junta as predefinições importadas às próprias; mesmo nome = substituído; limite de 50); `#mix=` exige um clique em «Reproduzir a mistura» |
| `borderlessmelodies-genuri-nota-muzicii.json` | BorderlessMelodies | importação de géneros; apenas 12-TET, maqam aproximado |
| `zicala-nota-zero.txt` | Zicala | importação .txt (2 provérbios: akan, māori) |
| `fascicul-nota-zero.json` | FASCICUL | «Iniciar como ecrã» → 📂 Sessão; 9 notas (2 epígrafes + 7 notas científicas, ≤ 400 caracteres, sem sobreposições) |
| `constelar-nota-zero.json` | Constelar | companheira «Zara Voss» (história pessoal sem repetições, 4 memórias permanentes); **substitui** os companheiros existentes (pede confirmação). Desde o Constelar 1.2.0 a importação mantém o idioma, o fornecedor e o modelo atuais |
| `nexus-nota-zero.json` | Nexus | persona «Zara Voss (Nota Zero)»; o Nexus acrescenta, não substitui |
| `lexicon-nota-zero.tsv` | Lexicon | importação TSV (17 entradas: 7 notas científicas + 10 termos akan dos Vol. X–XI); na importação é pedida a licença (a decisão é do autor). Observado: a primeira consulta após a importação pode não devolver nada, a segunda funciona |

## Diretamente, sem ficheiros
- ATINGERE: carregue `carte/Nota-Zero-carte-completa-ro.pdf` ou `.md` (braille ou áudio). Desde o ATINGERE 1.1.1 o idioma `ro` é detetado corretamente (o ponto médio «·» dos títulos já não vota no catalão).
- VoiceAtelier 1.2.0: a amostra «Nota Zero — Alexio» (duas frases do Vol. I) aparece na lista de amostras.
- AcademiSearch 4.2.0: `https://chiuta.github.io/AcademiSearch/#q=ekpyrotic%20universe%20Steinhardt%20Turok` preenche previamente o campo (não inicia a pesquisa); outros exemplos: `#q=AdS%2FCFT%20Maldacena`, `#q=holographic%20principle%20Susskind`, `#q=Planck%202018%20cosmological%20parameters`.
- TerRa 1.5.0 / ValeaPlopului1972 1.2.0: `TerRa/#v=2d&ufo=valea-plopului&from=valeaplopului` centra o mapa no caso de Valea Plopului; o ValeaPlopului1972 tem no menu a ligação de regresso ao TerRa. O texto «o primeiro caso OVNI atestado…» do TerRa ainda não foi alterado (decisão do proprietário).
- MarkdownAtelier: importe `carte/Nota-Zero-carte-completa-ro.md`.
- AI-Liber / TranslateHub / Nexus / LocalMind (RAG): apenas excertos; exigem rede ou um modelo local.

## Afastadas
Aurora, Limpezimea (apenas definições), Arhiva, Orar (não lê o endereço), Eclipsa-2027, ECLIPSA, HoroScop, CLEPSIDRA, IncredibleCosmos, Pendulul, Nemurirea.

## VEL-MOR
O romance *VEL-MOR* (*A Șasea Nemurire*, 3 livros, 9 partes, 41 capítulos, que amplia a personagem Reflexia de «A cincea nemurire») vive hoje apenas em conversas e na edição bilingue DOCX/PDF; não existe repositório. Pontes preparadas: os mesmos ficheiros-modelo (Akasha/Fabrica para as canções e o glossário) poderão ser gerados a partir do seu texto depois de depositado aqui.

## Reciprocidade
As ligações para o TerRa e o ORARIUM trazem `&from=nota-zero`; o TerRa e o ORARIUM mostram um botão «← voltar» apenas para as fontes conhecidas (terra, orarium, nota-zero). Qualquer outro valor é ignorado.
