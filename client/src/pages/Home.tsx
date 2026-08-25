/**
 * Caderno de Campo Pedagógico — página editorial assimétrica em papel mineral,
 * tinta azul-marinho e acentos Vermelho Caderno. Leitura clara antes de decoração.
 */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  FileText,
  Filter,
  GraduationCap,
  Info,
  Menu,
  Printer,
  Search,
  X,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { questions, areaSummary, type Question } from "@/data/simulado";

type AreaName = (typeof questions)[number]["area"];
type FilterArea = AreaName | "Todas";
type DownloadMode = "caderno" | "gabarito" | "mascara";

const areaMeta: Record<AreaName, { short: string; color: string; pale: string; bar: string; index: string }> = {
  "Linguagens, Códigos e suas Tecnologias": { short: "Linguagens", color: "#C84D3A", pale: "#F5E1D9", bar: "#C84D3A", index: "01" },
  "Ciências Humanas e suas Tecnologias": { short: "Humanas", color: "#8A6B2D", pale: "#F1E8CC", bar: "#B28A3A", index: "02" },
  "Ciências da Natureza e suas Tecnologias": { short: "Natureza", color: "#497464", pale: "#DDEBE5", bar: "#5D8C78", index: "03" },
  "Matemática e suas Tecnologias": { short: "Matemática", color: "#1D4C72", pale: "#DDE8F1", bar: "#3B709D", index: "04" },
};

const chartColors = ["#C84D3A", "#B28A3A", "#5D8C78", "#3B709D"];
const operationData = [
  { name: "Leitura e argumentação", value: 32 },
  { name: "Modelagem e cálculo", value: 25 },
  { name: "Análise de fenômenos", value: 25 },
  { name: "Contexto histórico-social", value: 18 },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function markdownFor(mode: DownloadMode) {
  const documentTitle = {
    caderno: "SIMULADO ENEM — Caderno de Questões",
    gabarito: "SIMULADO ENEM — Gabarito Comentado",
    mascara: "SIMULADO ENEM — Folha de Respostas e Máscara de Correção",
  }[mode];
  const header = `# ${documentTitle}\n\nEscola: ________________________________________________________________\nProfessor(a): ___________________________________________________________\nEstudante: _____________________________________________________________\nTurma: ____________________    Data: ____ / ____ / ______\n\n`;

  if (mode === "caderno") {
    return header + `> Material autoral reformulado, elaborado a partir de habilidades, temas e estruturas recorrentes em provas oficiais do ENEM.\n\n` + questions.map((q) => `## Questão ${String(q.numero).padStart(2, "0")} — ${q.areaCurta}\n\n${q.enunciado}\n\nA. ${q.alternativas.A}\n\nB. ${q.alternativas.B}\n\nC. ${q.alternativas.C}\n\nD. ${q.alternativas.D}\n`).join("\n---\n\n");
  }
  if (mode === "gabarito") {
    return header + questions.map((q) => `| ${String(q.numero).padStart(3, "0")} | **${q.correta}** | ${q.habilidade} | ${q.justificativa} |`).join("\n").replace(/^/, "| Questão | Resposta | Habilidade | Justificativa |\n| ---: | :---: | --- | --- |\n");
  }
  return header + `## Cartão-resposta\n\n| Questão | A | B | C | D |\n| ---: | :---: | :---: | :---: | :---: |\n${questions.map((q) => `| ${String(q.numero).padStart(3, "0")} | ○ | ○ | ○ | ○ |`).join("\n")}\n\n---\n\n## Chave de correção\n\n| Questão | Resposta |\n| ---: | :---: |\n${questions.map((q) => `| ${String(q.numero).padStart(3, "0")} | **${q.correta}** |`).join("\n")}`;
}

function downloadFile(mode: DownloadMode) {
  const blob = new Blob([markdownFor(mode)], { type: "text/markdown;charset=utf-8" });
  const href = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = `simulado-enem-${mode}.md`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(href);
}

function printPreview() {
  const printable = markdownFor("caderno")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^> (.*)$/gm, "<blockquote>$1</blockquote>")
    .replace(/^([ABCD])\. (.*)$/gm, "<p><strong>$1.</strong> $2</p>")
    .replace(/\n---\n/g, "<hr>")
    .replace(/\n\n/g, "<br><br>");
  const printWindow = window.open("", "_blank", "noopener,noreferrer");
  if (!printWindow) return;
  printWindow.document.write(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Simulado ENEM — Caderno</title><style>body{font-family:Arial,sans-serif;color:#1D2A44;max-width:760px;margin:36px auto;line-height:1.5}h1{font-size:25px;border-bottom:3px solid #C84D3A;padding-bottom:9px}h2{font-size:18px;break-after:avoid;margin-top:28px}p{margin:8px 0}blockquote{border-left:4px solid #C84D3A;margin:14px 0;padding-left:12px;color:#475569}hr{border:0;border-top:1px solid #cbd5e1;margin:20px 0}@media print{body{margin:15mm}h2{page-break-after:avoid}}</style></head><body>${printable}</body></html>`);
  printWindow.document.close();
  printWindow.focus();
  window.setTimeout(() => printWindow.print(), 300);
}

function QuestionCard({ q, selected, onSelect, revealed, onReveal }: { q: Question; selected?: string; onSelect: (answer: string) => void; revealed: boolean; onReveal: () => void }) {
  const meta = areaMeta[q.area as AreaName];
  return (
    <article className="question-card">
      <div className="question-meta">
        <span className="question-number">{String(q.numero).padStart(2, "0")}</span>
        <span className="topic-chip" style={{ backgroundColor: meta.pale, color: meta.color }}>{q.habilidade}</span>
        <span className="question-reference">{q.referencia}</span>
      </div>
      <p className="question-stem">{q.enunciado}</p>
      <div className="alternatives" role="radiogroup" aria-label={`Alternativas da questão ${q.numero}`}>
        {(["A", "B", "C", "D"] as const).map((letter) => {
          const isSelected = selected === letter;
          const isCorrect = revealed && q.correta === letter;
          const isWrong = revealed && isSelected && q.correta !== letter;
          return (
            <button key={letter} className={`alternative ${isSelected ? "selected" : ""} ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`} onClick={() => onSelect(letter)} role="radio" aria-checked={isSelected}>
              <span>{letter}</span><span>{q.alternativas[letter]}</span>
              {isCorrect && <Check size={16} strokeWidth={2.8} />}
            </button>
          );
        })}
      </div>
      <div className="question-footer">
        <span>Referência curricular: <strong>{q.areaCurta}</strong></span>
        <button className="reveal-button" onClick={onReveal}>{revealed ? `Resposta: ${q.correta}` : "Revelar gabarito"}</button>
      </div>
      {revealed && <p className="answer-explanation"><strong>Por quê?</strong> {q.justificativa}</p>}
    </article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeArea, setActiveArea] = useState<FilterArea>("Todas");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [showKey, setShowKey] = useState(false);

  const filteredQuestions = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("pt-BR");
    return questions.filter((q) => {
      const matchArea = activeArea === "Todas" || q.area === activeArea;
      const searchable = `${q.enunciado} ${q.habilidade} ${q.referencia}`.toLocaleLowerCase("pt-BR");
      return matchArea && (!needle || searchable.includes(needle));
    });
  }, [activeArea, query]);

  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / pageSize));
  const currentQuestions = filteredQuestions.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => setPage(1), [activeArea, query]);

  const setAnswer = (numero: number, answer: string) => setAnswers((current) => ({ ...current, [numero]: answer }));
  const reveal = (numero: number) => setRevealed((current) => new Set(current).add(numero));

  return (
    <div className="min-h-screen bg-[#F7F3EC] text-[#1D2A44]">
      <header className="topbar">
        <a href="#inicio" className="brand" aria-label="Ir para o início">
          <img src="/manus-storage/enem-logo-symbol_049e20d0.png" alt="Símbolo do Simulado ENEM" className="brand-mark" />
          <span className="brand-word"><strong>SIMULADO</strong><em>ENEM</em></span>
        </a>
        <nav className={`main-nav ${menuOpen ? "open" : ""}`} aria-label="Navegação principal">
          <button onClick={() => { scrollToSection("matriz"); setMenuOpen(false); }}>Matriz</button>
          <button onClick={() => { scrollToSection("questoes"); setMenuOpen(false); }}>Questões</button>
          <button onClick={() => { scrollToSection("correcao"); setMenuOpen(false); }}>Correção</button>
          <button onClick={() => { scrollToSection("fontes"); setMenuOpen(false); }}>Fontes</button>
        </nav>
        <div className="top-actions">
          <Button className="print-button" onClick={printPreview}><Printer size={16} /> Imprimir caderno</Button>
          <button className="menu-button" aria-label="Abrir menu" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </header>

      <main id="inicio">
        <section className="hero-section">
          <div className="hero-content">
            <div className="eyebrow"><span></span> Caderno autoral reformulado · 100 itens</div>
            <h1>Revisão que vira <i>diagnóstico.</i></h1>
            <p>Um caderno de simulado para aplicar, interpretar e corrigir: **25 questões por área**, quatro alternativas e uma estrutura pronta para a sala de aula.</p>
            <div className="hero-actions">
              <Button onClick={() => scrollToSection("questoes")} className="hero-primary">Explorar questões <ArrowRight size={17} /></Button>
              <button className="hero-secondary" onClick={() => downloadFile("mascara")}><ArrowDownToLine size={17} /> Baixar máscara</button>
            </div>
            <div className="hero-note"><Info size={15} /> Itens autorais inspirados em habilidades e temas de provas oficiais; não são reproduções literais.</div>
          </div>
          <div className="hero-image-wrap" aria-hidden="true">
            <img src="/manus-storage/enem-hero-editorial_3a0438a3.jpg" alt="" className="hero-image" />
            <div className="hero-stamp"><strong>4</strong><span>alternativas<br />por item</span></div>
          </div>
        </section>

        <section className="rail-layout" id="matriz">
          <aside className="section-rail">
            <span className="rail-index">01</span>
            <span className="rail-line"></span>
            <p>Mapa<br />do caderno</p>
          </aside>
          <div className="section-body matrix-layout">
            <div className="section-intro">
              <div><span className="eyebrow"><span></span> Matriz de composição</span><h2>Quatro áreas.<br /><i>Uma leitura equilibrada.</i></h2></div>
              <p>O ENEM reúne quatro áreas com 45 itens cada. Neste recorte de 100 questões, a divisão proporcional resulta em 25 itens por área.[<a href="#fontes">1</a>]</p>
            </div>
            <div className="stat-strip">
              <div><strong>100</strong><span>questões</span></div>
              <div><strong>25</strong><span>por área</span></div>
              <div><strong>4</strong><span>alternativas</span></div>
              <div><strong>2</strong><span>blocos de aplicação</span></div>
            </div>
            <div className="chart-card bar-card">
              <div className="card-heading"><div><span className="mini-label">DISTRIBUIÇÃO</span><h3>Itens por área de conhecimento</h3></div><BarChart3 size={19} /></div>
              <div className="chart-visual">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={areaSummary} layout="vertical" margin={{ top: 6, right: 24, left: 2, bottom: 2 }}>
                    <XAxis type="number" domain={[0, 28]} hide />
                    <YAxis dataKey="short" type="category" width={92} tick={{ fill: "#435064", fontSize: 12, fontFamily: "Manrope" }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: "#EAE3D6" }} contentStyle={{ borderRadius: 0, border: "1px solid #D9D0C1", boxShadow: "none", fontFamily: "Manrope", fontSize: 12 }} formatter={(value) => [`${value} questões`, "Quantidade"]} />
                    <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={20}>{areaSummary.map((entry, index) => <Cell key={entry.short} fill={chartColors[index]} />)}</Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="chart-caption">Passe o cursor pelas barras para consultar a distribuição proporcional.</p>
            </div>
            <div className="chart-card pie-card">
              <div className="card-heading"><div><span className="mini-label">OPERAÇÕES PRIORIZADAS</span><h3>Como o caderno mobiliza competências</h3></div></div>
              <div className="pie-with-legend">
                <div className="pie-visual"><ResponsiveContainer width="100%" height="100%"><PieChart><Tooltip contentStyle={{ borderRadius: 0, border: "1px solid #D9D0C1", boxShadow: "none", fontFamily: "Manrope", fontSize: 12 }} formatter={(value) => [`${value} itens`, ""]} /><Pie data={operationData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={78} paddingAngle={3} stroke="none">{operationData.map((entry, index) => <Cell key={entry.name} fill={chartColors[index]} />)}</Pie></PieChart></ResponsiveContainer></div>
                <div className="legend-list">{operationData.map((entry, index) => <div key={entry.name}><span style={{ background: chartColors[index] }}></span><p>{entry.name}<strong>{entry.value}%</strong></p></div>)}</div>
              </div>
              <p className="chart-caption">Classificação editorial dos itens do próprio simulado, para apoiar a revisão por operação cognitiva.</p>
            </div>
          </div>
        </section>

        <section className="area-section">
          <div className="area-heading"><span className="eyebrow"><span></span> Percurso de estudo</span><h2>Selecione uma área e encontre<br /><i>o tipo de desafio.</i></h2></div>
          <div className="area-cards">
            {areaSummary.map((entry) => {
              const longName = entry.area as AreaName;
              const meta = areaMeta[longName];
              return <button key={entry.area} className="area-card" style={{ "--area-color": meta.color, "--area-pale": meta.pale } as React.CSSProperties} onClick={() => { setActiveArea(longName); scrollToSection("questoes"); }}>
                <div><span className="area-index">{meta.index}</span><span className="area-count">{entry.count} itens</span></div>
                <h3>{entry.short}</h3><p>{longName.replace(" e suas Tecnologias", "")}</p><span className="area-arrow"><ArrowRight size={17} /></span>
              </button>;
            })}
          </div>
        </section>

        <section className="method-section">
          <div className="method-image"><img src="/manus-storage/enem-skills-collage_6f192fac.jpg" alt="Colagem abstrata que representa quatro campos do conhecimento" /></div>
          <div className="method-copy">
            <span className="eyebrow"><span></span> Como foi elaborado</span>
            <h2>Uma compilação para <i>ensinar</i>, não para copiar.</h2>
            <p>Os itens foram escritos do zero, a partir da Matriz de Referência e da observação de contextos, habilidades e formatos recorrentes nos cadernos oficiais. A opção por quatro alternativas é uma adaptação solicitada para este simulado.</p>
            <div className="method-points"><p><Check size={16} /> 100 itens inéditos e contextualizados</p><p><Check size={16} /> Habilidade, tema e justificativa por questão</p><p><Check size={16} /> Caderno, gabarito e máscara em separado</p></div>
            <button className="text-button" onClick={() => scrollToSection("fontes")}>Ver referências oficiais <ArrowRight size={16} /></button>
          </div>
        </section>

        <section className="rail-layout question-section" id="questoes">
          <aside className="section-rail"><span className="rail-index">02</span><span className="rail-line"></span><p>Banco<br />de questões</p></aside>
          <div className="section-body">
            <div className="question-header">
              <div><span className="eyebrow"><span></span> Leitura ativa</span><h2>Banco de questões<br /><i>para explorar.</i></h2></div>
              <div className="question-actions"><Button variant="outline" className="download-outline" onClick={() => downloadFile("caderno")}><ArrowDownToLine size={16} /> Baixar caderno</Button><Button className="print-button" onClick={printPreview}><Printer size={16} /> Imprimir</Button></div>
            </div>
            <div className="filter-panel">
              <div className="filter-icon"><Filter size={18} /></div>
              <div className="area-filters" aria-label="Filtro de áreas"><button className={activeArea === "Todas" ? "active" : ""} onClick={() => setActiveArea("Todas")}>Todas <span>100</span></button>{areaSummary.map((entry) => <button key={entry.area} className={activeArea === entry.area ? "active" : ""} onClick={() => setActiveArea(entry.area as AreaName)}>{entry.short} <span>{entry.count}</span></button>)}</div>
              <label className="search-field"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar tema ou habilidade" /></label>
            </div>
            <div className="results-bar"><p><strong>{filteredQuestions.length}</strong> itens encontrados {activeArea !== "Todas" && <>em <strong>{areaMeta[activeArea].short}</strong></>}</p><span>Página {page} de {totalPages}</span></div>
            <div className="questions-stack">
              {currentQuestions.length ? currentQuestions.map((q) => <QuestionCard key={q.numero} q={q} selected={answers[q.numero]} onSelect={(answer) => setAnswer(q.numero, answer)} revealed={revealed.has(q.numero)} onReveal={() => reveal(q.numero)} />) : <div className="empty-state"><Search size={25} /><h3>Nenhum item encontrado</h3><p>Tente outro termo de busca ou selecione todas as áreas.</p></div>}
            </div>
            {filteredQuestions.length > pageSize && <div className="pagination"><button disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}><ChevronLeft size={17} /> Anterior</button><div>{Array.from({ length: totalPages }, (_, index) => <button key={index} className={page === index + 1 ? "current" : ""} onClick={() => setPage(index + 1)}>{index + 1}</button>)}</div><button disabled={page === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))}>Próxima <ChevronRight size={17} /></button></div>}
          </div>
        </section>

        <section className="correction-section" id="correcao">
          <div className="correction-copy"><span className="eyebrow light"><span></span> Correção organizada</span><h2>Do cartão-resposta<br />à <i>próxima aula.</i></h2><p>Use a máscara com as quatro alternativas, consulte o gabarito comentado e faça a correção com rastreabilidade por habilidade.</p><div className="correction-buttons"><Button onClick={() => downloadFile("mascara")}><ArrowDownToLine size={16} /> Baixar máscara</Button><Button variant="outline" className="light-outline" onClick={() => downloadFile("gabarito")}><BookOpenCheck size={16} /> Baixar gabarito</Button></div></div>
          <div className="correction-card"><img src="/manus-storage/enem-correction-detail_08ac5859.jpg" alt="Detalhe de uma folha de respostas sendo corrigida" /><div className="correction-card-body"><div><ClipboardCheck size={21} /><span>CHAVE DOCENTE</span></div><h3>100 respostas<br />em uma única matriz.</h3><button onClick={() => setShowKey((value) => !value)}>{showKey ? "Ocultar chave" : "Consultar chave"} <ArrowRight size={16} /></button></div></div>
          {showKey && <div className="answer-key" aria-live="polite"><div className="answer-key-title"><div><span className="mini-label">GABARITO RÁPIDO</span><h3>Chave de correção</h3></div><button onClick={() => setShowKey(false)} aria-label="Fechar chave"><X size={17} /></button></div><div className="answer-key-grid">{questions.map((q) => <div key={q.numero}><span>{String(q.numero).padStart(3, "0")}</span><strong>{q.correta}</strong></div>)}</div></div>}
        </section>

        <section className="sources-section" id="fontes">
          <div className="sources-title"><span className="eyebrow"><span></span> Transparência editorial</span><h2>Fontes e<br /><i>delimitação.</i></h2></div>
          <div className="sources-list">
            <a href="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos" target="_blank" rel="noreferrer"><span>[1]</span><div><strong>Provas e Gabaritos do ENEM — Inep</strong><p>Estrutura das quatro provas objetivas e acesso aos cadernos oficiais desde 2009.</p></div><ArrowRight size={17} /></a>
            <a href="https://download.inep.gov.br/download/enem/matriz_referencia.pdf" target="_blank" rel="noreferrer"><span>[2]</span><div><strong>Matriz de Referência do ENEM — Inep</strong><p>Eixos cognitivos, competências e habilidades que orientam a elaboração dos itens.</p></div><ArrowRight size={17} /></a>
            <a href="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos/2024" target="_blank" rel="noreferrer"><span>[3]</span><div><strong>Cadernos e gabaritos de 2024 — Inep</strong><p>Referência recente de organização da aplicação regular em primeiro e segundo dias.</p></div><ArrowRight size={17} /></a>
            <a href="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos/2022" target="_blank" rel="noreferrer"><span>[4]</span><div><strong>Cadernos e gabaritos de 2022 — Inep</strong><p>Referência histórica complementar para a continuidade da estrutura dos cadernos.</p></div><ArrowRight size={17} /></a>
          </div>
          <div className="disclaimer"><Info size={17} /><p><strong>Nota de uso.</strong> Este material não é uma prova oficial do Inep nem reproduz integralmente questões de anos anteriores. É um simulado autoral, com adaptação de quatro alternativas, elaborado para prática pedagógica a partir de referências públicas.</p></div>
        </section>
      </main>

      <footer className="footer"><div className="footer-brand"><img src="/manus-storage/enem-logo-symbol_049e20d0.png" alt="" /><span><strong>SIMULADO</strong><em>ENEM</em></span></div><p>Preparado para revisão, aplicação e correção em contexto escolar.</p><a href="#inicio">Voltar ao topo ↑</a></footer>
    </div>
  );
}
