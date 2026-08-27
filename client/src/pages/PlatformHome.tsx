import { ArrowRight, BookOpen, FileText, GraduationCap, PenLine, School } from "lucide-react";
import { Link } from "wouter";

const pathways = [
  { href: "/estudante", icon: GraduationCap, eyebrow: "QUERO APRENDER", title: "Sou estudante", copy: "Pratique com simulados, resolva listas e acompanhe seus avanços em um percurso feito para a sua série.", action: "Explorar atividades", tone: "student" },
  { href: "/professor", icon: School, eyebrow: "QUERO ENSINAR", title: "Sou professor(a)", copy: "Encontre modelos editáveis, propostas prontas e materiais organizados para preparar suas aulas com mais tempo e intenção.", action: "Conhecer materiais", tone: "teacher" },
] as const;

const categories = ["Números e Álgebra", "Geometria", "Grandezas e Medidas", "Probabilidade e Estatística"];

export default function PlatformHome() {
  return (
    <div className="platform-page">
      <header className="platform-topbar">
        <Link href="/" className="platform-brand" aria-label="Ir para o início"><span className="platform-brand-mark">M</span><span><strong>ME AJUDA,</strong><em>prof Erasmo!</em></span></Link>
        <nav aria-label="Navegação da plataforma"><Link href="/estudante">Estudantes</Link><Link href="/professor">Professores</Link><Link href="/simulado-enem">Simulado ENEM</Link></nav>
      </header>

      <main>
        <section className="platform-hero">
          <div className="platform-hero-copy"><span className="platform-kicker"><i></i> Educação que acolhe e organiza</span><h1>Me ajuda,<br /><em>prof Erasmo!</em></h1><p>Atividades, simulados e materiais para ensinar e aprender. Um espaço para transformar dúvidas em percurso e planejamento em aula vivida.</p><div className="platform-hero-tags"><span><BookOpen size={15} /> Prática com propósito</span><span><PenLine size={15} /> Materiais editáveis</span></div></div>
          <div className="platform-hero-panel"><span className="panel-folio">CADERNO DE APOIO · 01</span><div className="math-thought" aria-label="Cálculos e fórmulas em movimento"><span className="math-formula formula-one">x² + y²</span><span className="math-formula formula-two">πr²</span><span className="math-formula formula-three">P(A) = ½</span><span className="math-formula formula-four">3a − 2 = 10</span><span className="math-symbol">?</span></div><div className="panel-quote"><span>“</span><p>Quem aprende precisa de caminhos. Quem ensina, de tempo para criar.</p></div><div className="panel-numbers"><div><strong>2</strong><span>percursos<br />principais</span></div><div><strong>4</strong><span>frentes de<br />Matemática</span></div><div><strong>∞</strong><span>possibilidades<br />de aprender</span></div></div></div>
        </section>

        <section className="pathway-section" aria-labelledby="escolha-seu-percurso"><div className="section-label"><span>POR ONDE COMEÇAR</span><p>Escolha seu ponto de partida</p></div><h2 id="escolha-seu-percurso">A mesma vontade de avançar.<br /><em>Dois jeitos de chegar lá.</em></h2><div className="pathway-grid">{pathways.map((pathway) => { const Icon = pathway.icon; return <article className={`pathway-card ${pathway.tone}`} key={pathway.href}><div className="pathway-icon"><Icon size={25} /></div><span>{pathway.eyebrow}</span><h3>{pathway.title}</h3><p>{pathway.copy}</p><Link href={pathway.href}>{pathway.action} <ArrowRight size={16} /></Link></article>; })}</div></section>

        <section className="platform-categories"><div><span className="platform-kicker"><i></i> Organização pedagógica</span><h2>Conteúdos que conversam<br />com cada <em>etapa.</em></h2><p>Os catálogos são organizados por ano ou série e ajudam a localizar rapidamente o foco de cada atividade.</p></div><div className="category-list">{categories.map((category, index) => <div key={category}><span>{String(index + 1).padStart(2, "0")}</span><p>{category}</p><ArrowRight size={16} /></div>)}</div></section>
      </main>

      <footer className="platform-footer"><p><strong>Me ajuda, prof Erasmo!</strong> · Atividades, simulados e materiais para ensinar e aprender.</p><Link href="/simulado-enem">Abrir Simulado ENEM <ArrowRight size={14} /></Link></footer>
    </div>
  );
}
