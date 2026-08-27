/**
 * Caderno de Campo Pedagógico — página editorial assimétrica em papel mineral,
 * tinta azul-marinho e acentos Vermelho Caderno. Leitura clara antes de decoração.
 */
import { useEffect, useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import {
  ArrowDownToLine,
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  FileDown,
  FileText,
  Filter,
  GraduationCap,
  History,
  Info,
  LockKeyhole,
  Menu,
  Medal,
  Pause,
  Play,
  Printer,
  RotateCcw,
  Search,
  Timer,
  Trophy,
  UserRound,
  UsersRound,
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
import { StudentAuthDialog } from "@/components/StudentAuthDialog";
import { questions, areaSummary, type Question } from "@/data/simulado";
import { useAuth } from "@/_core/hooks/useAuth";
import { loadRemoteProgress, saveRemoteProgress } from "@/lib/progressApi";
import { hasInstitutionalTeacherAccess } from "@shared/identityRoles";

type AreaName = (typeof questions)[number]["area"];
type FilterArea = AreaName | "Todas";
type DownloadMode = "caderno" | "gabarito" | "mascara";
type AttemptArea = { short: string; correct: number; answered: number; blank: number; percentage: number };
type Attempt = {
  id: string;
  studentKey: string;
  studentName: string;
  classroomKey: string;
  classroom: string;
  createdAt: string;
  correct: number;
  answered: number;
  percentage: number;
  remainingSeconds: number;
  byArea: AttemptArea[];
  answers: Record<number, string>;
};

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

type TimerPreset = "dia1" | "dia2";

const timerPresets: Record<TimerPreset, { label: string; seconds: number }> = {
  dia1: { label: "1.º dia · 5h30", seconds: 5 * 60 * 60 + 30 * 60 },
  dia2: { label: "2.º dia · 5h", seconds: 5 * 60 * 60 },
};

const MAX_ATTEMPTS = 3;
const ATTEMPTS_STORAGE_KEY = "simulado-enem-attempts-v1";
const PROFILE_STORAGE_KEY = "simulado-enem-profile-v1";
const PROGRESS_STORAGE_KEY = "simulado-enem-progress-v1";

function normalizeIdentity(value: string, fallback: string) {
  return (value.trim() || fallback)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR")
    .replace(/\s+/g, " ");
}

function initialAttempts(): Attempt[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = JSON.parse(window.localStorage.getItem(ATTEMPTS_STORAGE_KEY) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function initialProfile() {
  if (typeof window === "undefined") return { studentName: "", classroom: "", localId: "servidor" };
  try {
    const stored = JSON.parse(window.localStorage.getItem(PROFILE_STORAGE_KEY) || "{}");
    return { studentName: typeof stored.studentName === "string" ? stored.studentName : "", classroom: typeof stored.classroom === "string" ? stored.classroom : "", localId: typeof stored.localId === "string" ? stored.localId : `perfil-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` };
  } catch {
    return { studentName: "", classroom: "", localId: `perfil-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` };
  }
}

function formatDuration(totalSeconds: number) {
  const safeSeconds = Math.max(0, totalSeconds);
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function csvCell(value: string | number) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

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

function QuestionCard({ q, selected, onSelect, revealed, onReveal, canReveal, disabled }: { q: Question; selected?: string; onSelect: (answer: string) => void; revealed: boolean; onReveal: () => void; canReveal: boolean; disabled: boolean }) {
  const meta = areaMeta[q.area as AreaName];
  return (
    <article className="question-card" style={{ "--question-color": meta.color, "--question-pale": meta.pale } as React.CSSProperties}>
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
            <button key={letter} disabled={disabled} className={`alternative ${isSelected ? "selected" : ""} ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`} onClick={() => onSelect(letter)} role="radio" aria-checked={isSelected}>
              <span>{letter}</span><span>{q.alternativas[letter]}</span>
              {isCorrect && <Check size={16} strokeWidth={2.8} />}
            </button>
          );
        })}
      </div>
      <div className="question-footer">
        <span>Referência curricular: <strong>{q.areaCurta}</strong></span>
        {canReveal ? <button className="reveal-button" onClick={onReveal}>{revealed ? `Resposta: ${q.correta}` : "Ver resposta comentada"}</button> : <span className="answer-locked">Finalize a correção para consultar o comentário.</span>}
      </div>
      {revealed && <p className="answer-explanation"><strong>Por quê?</strong> {q.justificativa}</p>}
    </article>
  );
}

export default function Home() {
  const { user, loading, isAuthenticated, login, signup, recover, requiresPasswordReset, completePasswordRecovery, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<"login" | "signup">("login");
  const [activeArea, setActiveArea] = useState<FilterArea>("Todas");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [showKey, setShowKey] = useState(false);
  const profile = useMemo(() => initialProfile(), []);
  const [studentName, setStudentName] = useState(profile.studentName);
  const [classroom, setClassroom] = useState(profile.classroom);
  const [localProfileId] = useState(profile.localId);
  const [submitted, setSubmitted] = useState(false);
  const [timerPreset, setTimerPreset] = useState<TimerPreset>("dia1");
  const [remainingSeconds, setRemainingSeconds] = useState(timerPresets.dia1.seconds);
  const [timerRunning, setTimerRunning] = useState(false);
  const [attempts, setAttempts] = useState<Attempt[]>(initialAttempts);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [progressNotice, setProgressNotice] = useState("");
  const [teacherFilter, setTeacherFilter] = useState("todas");
  const [teacherSort, setTeacherSort] = useState("score");
  const [syncState, setSyncState] = useState<"local" | "syncing" | "cloud" | "error">("local");
  const [remotePayload, setRemotePayload] = useState<string | null>(null);
  const teacherMode = hasInstitutionalTeacherAccess(user);
  const openAuth = (mode: "login" | "signup") => {
    setAuthInitialMode(mode);
    setAuthOpen(true);
  };

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

  useEffect(() => {
    if (!timerRunning || remainingSeconds <= 0) return;
    const interval = window.setInterval(() => setRemainingSeconds((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(interval);
  }, [timerRunning, remainingSeconds]);

  useEffect(() => {
    if (remainingSeconds === 0) setTimerRunning(false);
  }, [remainingSeconds]);

  useEffect(() => {
    window.localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(attempts));
  }, [attempts]);

  useEffect(() => {
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify({ studentName, classroom, localId: localProfileId }));
  }, [studentName, classroom, localProfileId]);

  useEffect(() => {
    try {
      const draft = JSON.parse(window.localStorage.getItem(PROGRESS_STORAGE_KEY) || "null");
      if (draft?.answers) { setAnswers(draft.answers); setRemainingSeconds(draft.remainingSeconds ?? timerPresets.dia1.seconds); setProgressNotice("Progresso anterior restaurado."); }
    } catch { /* ignorar rascunho inválido */ }
  }, []);

  useEffect(() => {
    let active = true;
    if (!isAuthenticated) {
      setRemotePayload(null);
      setSyncState("local");
      return () => { active = false; };
    }
    setSyncState("syncing");
    void loadRemoteProgress()
      .then((result) => {
        if (!active) return;
        setRemotePayload(result.payload);
        setSyncState("cloud");
      })
      .catch(() => {
        if (active) setSyncState("error");
      });
    return () => { active = false; };
  }, [isAuthenticated, user?.id]);

  useEffect(() => {
    if (!remotePayload) return;
    try {
      const synced = JSON.parse(remotePayload);
      if (synced.answers) setAnswers(synced.answers);
      if (typeof synced.remainingSeconds === "number") setRemainingSeconds(synced.remainingSeconds);
      if (typeof synced.studentName === "string") setStudentName(synced.studentName);
      if (typeof synced.classroom === "string") setClassroom(synced.classroom);
      if (Array.isArray(synced.attempts)) setAttempts(synced.attempts);
      setSyncState("cloud");
      setProgressNotice("Progresso sincronizado com sua conta.");
    } catch { /* ignorar dados remotos inválidos */ }
  }, [remotePayload]);

  const areaPerformance = useMemo(() => areaSummary.map((entry) => {
    const areaQuestions = questions.filter((q) => q.area === entry.area);
    const answered = areaQuestions.filter((q) => Boolean(answers[q.numero])).length;
    const correct = areaQuestions.filter((q) => answers[q.numero] === q.correta).length;
    return { ...entry, answered, correct, blank: areaQuestions.length - answered, percentage: Math.round((correct / areaQuestions.length) * 100) };
  }), [answers]);

  const totalAnswered = Object.keys(answers).length;
  const totalCorrect = questions.filter((q) => answers[q.numero] === q.correta).length;
  const overallPercentage = Math.round((totalCorrect / questions.length) * 100);
  const isCriticalTime = remainingSeconds > 0 && remainingSeconds <= 10 * 60;
  const isTimeOver = remainingSeconds === 0;
  const studentKey = user?.id || localProfileId;
  const classroomKey = normalizeIdentity(classroom, "turma-local");
  const studentAttempts = attempts.filter((attempt) => attempt.studentKey === studentKey);
  const attemptsUsed = studentAttempts.length;
  const attemptsRemaining = Math.max(0, MAX_ATTEMPTS - attemptsUsed);
  const maxAttemptsReached = attemptsUsed >= MAX_ATTEMPTS;
  const currentAttemptNumber = Math.min(attemptsUsed + 1, MAX_ATTEMPTS);
  const classAttempts = attempts.filter((attempt) => attempt.classroomKey === classroomKey);
  const uniqueStudentsInClass = new Set(classAttempts.map((attempt) => attempt.studentKey)).size;
  const classAverage = classAttempts.length ? Math.round(classAttempts.reduce((sum, attempt) => sum + attempt.percentage, 0) / classAttempts.length) : 0;
  const anonymousRanking = useMemo(() => {
    const recordsByStudent = new Map<string, Attempt[]>();
    classAttempts.forEach((attempt) => recordsByStudent.set(attempt.studentKey, [...(recordsByStudent.get(attempt.studentKey) || []), attempt]));
    return Array.from(recordsByStudent.values())
      .map((records: Attempt[]) => ({ best: Math.max(...records.map((record: Attempt) => record.percentage)), attempts: records.length }))
      .sort((a, b) => b.best - a.best)
      .map((record, index) => ({ ...record, label: `Participante ${String.fromCharCode(65 + index)}` }));
  }, [classAttempts]);
  const teacherRows = useMemo(() => attempts.filter((attempt) => teacherFilter === "todas" || attempt.classroomKey === teacherFilter).sort((a, b) => teacherSort === "score" ? b.percentage - a.percentage : +new Date(b.createdAt) - +new Date(a.createdAt)), [attempts, teacherFilter, teacherSort]);
  const teacherClassrooms = useMemo(() => Array.from(new Map(attempts.map((attempt) => [attempt.classroomKey, attempt.classroom])).entries()), [attempts]);
  const latestAttempt = studentAttempts[studentAttempts.length - 1];
  const wrongQuestions = useMemo(() => latestAttempt?.answers ? questions.filter((q) => latestAttempt.answers[q.numero] && latestAttempt.answers[q.numero] !== q.correta) : [], [latestAttempt]);
  const performanceMessage = totalAnswered === 0
    ? "Registre suas respostas para iniciar a leitura do desempenho."
    : overallPercentage >= 70 ? "Bom domínio do conjunto. Observe as áreas com menor percentual para orientar a revisão."
      : overallPercentage >= 45 ? "Há uma base de aprendizagem consistente; use os detalhes por área para organizar a próxima revisão."
        : "O resultado mostra pontos concretos para retomar. Priorize uma área por vez e compare as respostas comentadas.";

  const setAnswer = (numero: number, answer: string) => {
    if (submitted || maxAttemptsReached) return;
    setAnswers((current) => ({ ...current, [numero]: answer }));
    setSubmitted(false);
  };
  const reveal = (numero: number) => setRevealed((current) => new Set(current).add(numero));
  const resetTimer = () => {
    if (submitted || maxAttemptsReached) return;
    setTimerRunning(false);
    setRemainingSeconds(timerPresets[timerPreset].seconds);
  };
  const chooseTimerPreset = (preset: TimerPreset) => {
    if (submitted || maxAttemptsReached) return;
    setTimerPreset(preset);
    setTimerRunning(false);
    setRemainingSeconds(timerPresets[preset].seconds);
  };
  const syncProgress = async (payload: { answers: Record<number, string>; remainingSeconds: number; studentName: string; classroom: string; attempts: Attempt[]; savedAt: string }) => {
    if (!isAuthenticated) return;
    setSyncState("syncing");
    try {
      await saveRemoteProgress(JSON.stringify(payload));
      setSyncState("cloud");
      setProgressNotice("Progresso salvo e sincronizado com sua conta.");
    } catch {
      setSyncState("error");
      setProgressNotice("Progresso salvo neste navegador; a sincronização será tentada no próximo salvamento.");
    }
  };
  const finishSimulation = () => {
    if (submitted || maxAttemptsReached || totalAnswered === 0) return;
    const now = new Date().toISOString();
    const record: Attempt = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      studentKey,
      studentName: studentName.trim() || "Estudante local",
      classroomKey,
      classroom: classroom.trim() || "Turma local",
      createdAt: now,
      correct: totalCorrect,
      answered: totalAnswered,
      percentage: overallPercentage,
      remainingSeconds,
      byArea: areaPerformance.map((area) => ({ short: area.short, correct: area.correct, answered: area.answered, blank: area.blank, percentage: area.percentage })),
      answers: { ...answers },
    };
    const updated = [...attempts, record];
    setAttempts(updated);
    if (isAuthenticated) void syncProgress({ answers, remainingSeconds, studentName, classroom, attempts: updated, savedAt: new Date().toISOString() });
    window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
    setSubmitted(true);
    setTimerRunning(false);
    scrollToSection("resultado");
  };
  const beginNextAttempt = () => {
    if (maxAttemptsReached) return;
    setAnswers({});
    setRevealed(new Set());
    setSubmitted(false);
    setTimerRunning(false);
    setRemainingSeconds(timerPresets[timerPreset].seconds);
    setActiveArea("Todas");
    setQuery("");
    setPage(1);
    scrollToSection("questoes");
  };
  const saveProgress = () => {
    const payload = { answers, remainingSeconds, studentName, classroom, attempts, savedAt: new Date().toISOString() };
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(payload));
    if (isAuthenticated) void syncProgress(payload);
    else setProgressNotice("Progresso salvo neste navegador. Entre na sua conta para sincronizá-lo entre dispositivos.");
  };
  const exportAllAttemptsCsv = () => {
    const header = ["Estudante", "Turma", "Data", "Acertos", "Respondidas", "Percentual", "Tempo restante", "Linguagens", "Humanas", "Natureza", "Matemática"];
    const rows = attempts.map((attempt) => {
      const byArea = new Map(attempt.byArea.map((area) => [area.short, area.percentage]));
      return [attempt.studentName, attempt.classroom, new Date(attempt.createdAt).toLocaleString("pt-BR"), attempt.correct, attempt.answered, `${attempt.percentage}%`, formatDuration(attempt.remainingSeconds), byArea.get("Linguagens") ?? "", byArea.get("Humanas") ?? "", byArea.get("Natureza") ?? "", byArea.get("Matemática") ?? ""];
    });
    const content = "\uFEFF" + [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
    const href = URL.createObjectURL(new Blob([content], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a"); link.href = href; link.download = "resultados-simulado-todas-as-turmas.csv"; document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(href);
  };
  const exportPdfReport = () => {
    const reportName = studentName.trim() || "Estudante";
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let y = 20;
    doc.setFillColor(29, 42, 68);
    doc.rect(0, 0, pageWidth, 34, "F");
    doc.setTextColor(255, 250, 242);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(17);
    doc.text("SIMULADO ENEM — RESULTADO INDIVIDUAL", 15, 16);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text("Relatório de desempenho gerado localmente", 15, 23);
    doc.setTextColor(29, 42, 68);
    y = 46;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(reportName, 15, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(91, 102, 117);
    doc.text(`Tentativa ${Math.max(1, attemptsUsed)} de ${MAX_ATTEMPTS} · Gerado em ${new Date().toLocaleDateString("pt-BR")} · Tempo restante: ${formatDuration(remainingSeconds)}`, 15, y + 6);
    doc.setFillColor(244, 237, 227);
    doc.roundedRect(15, y + 15, pageWidth - 30, 28, 2, 2, "F");
    doc.setTextColor(29, 42, 68);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text(`${overallPercentage}%`, 22, y + 33);
    doc.setFontSize(9);
    doc.text("PERCENTUAL GLOBAL DE ACERTOS", 52, y + 27);
    doc.setFontSize(12);
    doc.text(`${totalCorrect} acertos em 100 itens`, 52, y + 34);
    y += 55;
    doc.setFontSize(12);
    doc.text("Desempenho detalhado por área", 15, y);
    y += 8;
    areaPerformance.forEach((area, index) => {
      const meta = areaMeta[area.area as AreaName];
      const hex = meta.color.replace("#", "");
      doc.setFillColor(parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16));
      doc.rect(15, y + index * 8, area.percentage * 1.4, 4, "F");
      doc.setTextColor(29, 42, 68); doc.setFontSize(7.5);
      doc.text(`${area.short} — ${area.percentage}%`, 158, y + 3 + index * 8, { align: "right" });
    });
    y += 38;
    areaPerformance.forEach((area) => {
      if (y > pageHeight - 32) { doc.addPage(); y = 20; }
      const meta = areaMeta[area.area as AreaName];
      const hex = meta.color.replace("#", "");
      doc.setFillColor(parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16));
      doc.rect(15, y - 4, 3, 18, "F");
      doc.setTextColor(29, 42, 68);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.text(area.short, 23, y + 1);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(91, 102, 117);
      doc.text(`${area.correct}/25 acertos · ${area.answered}/25 respondidas · ${area.blank} em branco`, 23, y + 7);
      doc.setTextColor(29, 42, 68);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.text(`${area.percentage}%`, pageWidth - 29, y + 4, { align: "right" });
      y += 23;
    });
    if (y > pageHeight - 36) { doc.addPage(); y = 20; }
    doc.setDrawColor(200, 77, 58);
    doc.setLineWidth(.7);
    doc.line(15, y + 4, pageWidth - 15, y + 4);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(29, 42, 68);
    doc.text("Leitura pedagógica", 15, y + 13);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.6);
    doc.setTextColor(91, 102, 117);
    const observation = doc.splitTextToSize(performanceMessage + " A pontuação representa acertos simples neste simulado; não equivale à nota TRI do ENEM.", pageWidth - 30);
    doc.text(observation, 15, y + 19);
    doc.setFontSize(7.5);
    doc.setTextColor(120, 128, 138);
    doc.text("Simulado ENEM Interativo · Material autoral reformulado para prática pedagógica.", 15, pageHeight - 12);
    const safeName = reportName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase() || "estudante";
    doc.save(`resultado-simulado-enem-${safeName}.pdf`);
  };

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
          <button onClick={() => { scrollToSection("resultado"); setMenuOpen(false); }}>Resultado</button>
          {maxAttemptsReached && <button onClick={() => { scrollToSection("acompanhamento"); setMenuOpen(false); }}>Acompanhamento</button>}
          {teacherMode && <button onClick={() => { scrollToSection("correcao"); setMenuOpen(false); }}>Correção</button>}
          <button onClick={() => { scrollToSection("fontes"); setMenuOpen(false); }}>Fontes</button>
        </nav>
        <div className="top-actions">
          {!loading && (isAuthenticated ? <><span className={`top-timer ${syncState}`}>{syncState === "cloud" ? "✓ Sincronizado" : syncState === "syncing" ? "↻ Sincronizando" : syncState === "error" ? "! Salvo localmente" : "• Sem salvar"}</span><button className="top-timer" onClick={() => void logout()}>Sair da conta</button></> : <button className="top-timer" onClick={() => openAuth("login")}>Acesso aluno</button>)}
          <button className={`top-timer ${isCriticalTime ? "critical" : ""}`} onClick={() => scrollToSection("questoes")} aria-label="Ir para o cronômetro"><Timer size={15} /><span>{formatDuration(remainingSeconds)}</span></button>
          {teacherMode && <Button className="print-button" onClick={printPreview}><Printer size={16} /> Imprimir caderno</Button>}
          <button className="menu-button" aria-label="Abrir menu" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </header>

      <StudentAuthDialog open={authOpen} onOpenChange={setAuthOpen} initialMode={authInitialMode} onLogin={login} onSignup={signup} onRecover={recover} requiresPasswordReset={requiresPasswordReset} onCompletePasswordRecovery={completePasswordRecovery} />

      <main id="inicio">
        <section className="hero-section">
          <div className="hero-content">
            <div className="eyebrow"><span></span> Caderno autoral reformulado · 100 itens</div>
            <h1>Revisão que vira <i>diagnóstico.</i></h1>
            <p>Um caderno de simulado para aplicar, interpretar e corrigir: **25 questões por área**, quatro alternativas e uma estrutura pronta para a sala de aula.</p>
            <div className="hero-actions">
              <Button onClick={() => scrollToSection("questoes")} className="hero-primary">Iniciar simulado <ArrowRight size={17} /></Button>
              {teacherMode && <button className="hero-secondary" onClick={() => downloadFile("mascara")}><ArrowDownToLine size={17} /> Baixar máscara</button>}
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
              <span className="workbook-note">folha de aplicação<br />marque uma opção</span>
              <div className="question-actions"><Button variant="outline" className="download-outline" onClick={() => downloadFile("caderno")}><ArrowDownToLine size={16} /> Baixar caderno</Button>{teacherMode && <Button className="print-button" onClick={printPreview}><Printer size={16} /> Imprimir</Button>}</div>
            </div>
            <section className="student-dashboard" id="resultado" aria-label="Painel de desempenho do estudante">
              <span className="workbook-folio">FOLHA 01 · APLICAÇÃO E ACOMPANHAMENTO</span>
              <div className="student-dashboard-top">
                <div><span className="eyebrow"><span></span> Modo de realização</span><h3>Seu percurso, em tempo real.</h3><p>{isAuthenticated ? "Suas respostas e tentativas podem ser sincronizadas com esta conta. A pontuação é por acerto simples e não corresponde à nota TRI." : "As respostas e tentativas ficam neste navegador até você entrar em uma conta. A pontuação é por acerto simples e não corresponde à nota TRI."}</p></div>
                <div className="student-profile"><label className="student-name"><UserRound size={16} /><span>Nome no relatório</span><input value={studentName} disabled={submitted || maxAttemptsReached} onChange={(event) => setStudentName(event.target.value)} placeholder="Como quer ser identificado?" /></label><label className="student-name classroom-name"><GraduationCap size={16} /><span>Turma local</span><input value={classroom} disabled={submitted || maxAttemptsReached} onChange={(event) => setClassroom(event.target.value)} placeholder="Ex.: 3.º ano A" /></label></div>
              </div>
              <div className={`attempt-limit ${maxAttemptsReached ? "limit-reached" : ""}`}><div><span className="attempt-kicker">LIMITE DE REALIZAÇÃO</span><strong>{attemptsUsed} de {MAX_ATTEMPTS} tentativas concluídas</strong><p>{maxAttemptsReached ? "As três tentativas foram concluídas neste navegador. O ciclo de prática está encerrado." : `Você ainda pode concluir ${attemptsRemaining} ${attemptsRemaining === 1 ? "tentativa" : "tentativas"} com este identificador.`}</p></div><div className="attempt-dots" aria-label={`${attemptsUsed} de ${MAX_ATTEMPTS} tentativas utilizadas`}>{Array.from({ length: MAX_ATTEMPTS }, (_, index) => <span className={index < attemptsUsed ? "used" : ""} key={index}>{index + 1}</span>)}</div></div>
              <div className={`exam-timer ${isCriticalTime ? "critical" : ""} ${isTimeOver ? "finished" : ""}`}>
                <div className="timer-copy"><div><Timer size={19} /><span>CRONÔMETRO DE SIMULAÇÃO</span></div><p>{isTimeOver ? "Tempo encerrado" : isCriticalTime ? "Atenção: últimos 10 minutos" : "Escolha o dia e inicie quando estiver pronto."}</p></div>
                <div className="timer-display" aria-live="polite">{formatDuration(remainingSeconds)}</div>
                <div className="timer-controls"><select value={timerPreset} disabled={submitted || maxAttemptsReached} onChange={(event) => chooseTimerPreset(event.target.value as TimerPreset)} aria-label="Selecionar duração da prova"><option value="dia1">1.º dia · 5h30</option><option value="dia2">2.º dia · 5h</option></select><button onClick={() => setTimerRunning((value) => !value)} disabled={isTimeOver || submitted || maxAttemptsReached} className="timer-start">{timerRunning ? <Pause size={15} /> : <Play size={15} />}{timerRunning ? "Pausar" : "Iniciar"}</button><button onClick={resetTimer} disabled={submitted || maxAttemptsReached} className="timer-reset" aria-label="Reiniciar cronômetro"><RotateCcw size={15} /></button></div>
              </div>
              <div className="live-score">
                <div className="score-orbit" style={{ "--score": `${overallPercentage * 3.6}deg` } as React.CSSProperties}><div><strong>{overallPercentage}%</strong><span>acertos</span></div></div>
                <div className="score-copy"><span className="mini-label">DESEMPENHO GLOBAL · TENTATIVA {currentAttemptNumber}</span><h3>{totalCorrect} de 100 itens corretos</h3><p>{totalAnswered} respostas registradas · {100 - totalAnswered} itens em branco</p><p className="score-message">{maxAttemptsReached ? "Ciclo de três tentativas concluído. Consulte o acompanhamento local abaixo." : performanceMessage}</p></div>
                <div className="score-actions"><Button className="score-finalize" onClick={finishSimulation} disabled={submitted || maxAttemptsReached || totalAnswered === 0}><Trophy size={16} /> {maxAttemptsReached ? "Ciclo concluído" : submitted ? "Resultado registrado" : "Finalizar e corrigir"}</Button><Button variant="outline" className="pdf-button" onClick={saveProgress} disabled={submitted || maxAttemptsReached}><FileDown size={16} /> Salvar progresso</Button><Button variant="outline" className="pdf-button" onClick={exportPdfReport} disabled={!submitted}><FileDown size={16} /> Exportar PDF</Button></div>
              </div>
              {progressNotice && <p className="text-xs px-8 pb-3 text-[#497464] font-bold">{progressNotice}</p>}
              <div className="area-performance-grid">
                {areaPerformance.map((area) => { const meta = areaMeta[area.area as AreaName]; return <div className="area-performance" key={area.area}><div><span style={{ background: meta.color }}></span><p>{area.short}<small>{area.correct}/25 acertos</small></p><strong>{area.percentage}%</strong></div><div className="performance-track"><i style={{ width: `${area.percentage}%`, background: meta.color }}></i></div><small>{area.answered} respondidas · {area.blank} em branco</small></div>; })}
              </div>
              {submitted && <div className="result-ready"><Check size={17} /><p><strong>Resultado registrado.</strong> Consulte as respostas comentadas, analise os percentuais por área e exporte seu relatório personalizado.</p>{!maxAttemptsReached && <button onClick={beginNextAttempt}>Iniciar tentativa {attemptsUsed + 1} <ArrowRight size={14} /></button>}</div>}
              {maxAttemptsReached && <section className="attempts-complete" id="acompanhamento"><div className="attempts-complete-heading"><div><span className="eyebrow"><span></span> Ciclo concluído</span><h3>Três tentativas, agora em <i>perspectiva.</i></h3><p>{isAuthenticated ? "Seu histórico permanece associado a esta conta e pode ser retomado em outro dispositivo." : "Entre em uma conta para manter o histórico deste ciclo disponível em outro dispositivo."}</p></div><div className="complete-lock"><LockKeyhole size={20} /><span>3 / 3</span></div></div><div className="local-insights"><article className="attempt-history"><div className="insight-title"><History size={18} /><div><span>HISTÓRICO DO ESTUDANTE</span><strong>{studentName.trim() || "Estudante local"}</strong></div></div>{studentAttempts.map((attempt, index) => <div className="attempt-row" key={attempt.id}><span>{String(index + 1).padStart(2, "0")}</span><p>{new Date(attempt.createdAt).toLocaleDateString("pt-BR")}<small>{attempt.correct}/100 acertos · {attempt.answered} respondidas</small></p><strong>{attempt.percentage}%</strong></div>)}</article><article className="teacher-panel"><div className="insight-title"><UsersRound size={18} /><div><span>PAINEL DOCENTE LOCAL</span><strong>{classroom.trim() || "Turma local"}</strong></div></div><div className="teacher-metrics"><div><strong>{uniqueStudentsInClass}</strong><span>estudantes</span></div><div><strong>{classAttempts.length}</strong><span>tentativas</span></div><div><strong>{classAverage}%</strong><span>média local</span></div></div><p>Os indicadores agregam registros disponíveis neste dispositivo para a turma atual.</p><button className="csv-export" onClick={exportAllAttemptsCsv}><FileDown size={14} /> Exportar CSV de todas as turmas</button></article><article className="anonymous-ranking"><div className="insight-title"><Medal size={18} /><div><span>RANKING ANÔNIMO LOCAL</span><strong>Melhor resultado por participante</strong></div></div><div className="ranking-list">{anonymousRanking.map((entry, index) => <div key={entry.label}><span>{index + 1}</span><p>{entry.label}<small>{entry.attempts} {entry.attempts === 1 ? "tentativa" : "tentativas"}</small></p><strong>{entry.best}%</strong></div>)}</div></article></div><section className="review-panel"><div className="review-heading"><div><span className="eyebrow"><span></span> Modo de revisão</span><h4>Erros que viram <i>próximo passo.</i></h4><p>Após a terceira tentativa, compare suas respostas incorretas da última realização com o gabarito e a explicação detalhada.</p></div><button onClick={() => setReviewOpen((value) => !value)}>{reviewOpen ? "Ocultar revisão" : `Revisar ${wrongQuestions.length} erros`} <ArrowRight size={15} /></button></div>{reviewOpen && <div className="review-list">{latestAttempt?.answers ? wrongQuestions.map((q) => <article className="review-item" key={q.numero}><p><strong>Questão {String(q.numero).padStart(2, "0")}</strong> · {q.enunciado}</p><div><span>Sua resposta: <b>{latestAttempt.answers[q.numero]}</b></span><span>Correta: <b>{q.correta}</b></span></div><aside><Check size={15} /> <strong>Explicação:</strong> {q.justificativa}</aside></article>) : <p className="review-empty">As tentativas anteriores não registraram as alternativas. A revisão estará disponível nas próximas tentativas concluídas.</p>}</div>}</section></section>}
            </section>
            <div className="filter-panel">
              <div className="filter-icon"><Filter size={18} /></div>
              <div className="area-filters" aria-label="Filtro de áreas"><button className={activeArea === "Todas" ? "active" : ""} onClick={() => setActiveArea("Todas")}>Todas <span>100</span></button>{areaSummary.map((entry) => <button key={entry.area} style={{ "--filter-color": areaMeta[entry.area as AreaName].color, "--filter-pale": areaMeta[entry.area as AreaName].pale } as React.CSSProperties} className={activeArea === entry.area ? "active" : ""} onClick={() => setActiveArea(entry.area as AreaName)}>{entry.short} <span>{entry.count}</span></button>)}</div>
              <label className="search-field"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar tema ou habilidade" /></label>
            </div>
            <div className="results-bar"><p><strong>{filteredQuestions.length}</strong> itens encontrados {activeArea !== "Todas" && <>em <strong>{areaMeta[activeArea].short}</strong></>}</p><span>Página {page} de {totalPages}</span></div>
            <div className="questions-stack">
              {currentQuestions.length ? currentQuestions.map((q) => <QuestionCard key={q.numero} q={q} selected={answers[q.numero]} onSelect={(answer) => setAnswer(q.numero, answer)} revealed={revealed.has(q.numero)} onReveal={() => reveal(q.numero)} canReveal={submitted && teacherMode} disabled={submitted || maxAttemptsReached} />) : <div className="empty-state"><Search size={25} /><h3>Nenhum item encontrado</h3><p>Tente outro termo de busca ou selecione todas as áreas.</p></div>}
            </div>
            {filteredQuestions.length > pageSize && <div className="pagination"><button disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}><ChevronLeft size={17} /> Anterior</button><div>{Array.from({ length: totalPages }, (_, index) => <button key={index} className={page === index + 1 ? "current" : ""} onClick={() => setPage(index + 1)}>{index + 1}</button>)}</div><button disabled={page === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))}>Próxima <ChevronRight size={17} /></button></div>}
          </div>
        </section>

        {teacherMode && <section className="correction-section" id="correcao">
          <div className="correction-copy"><span className="eyebrow light"><span></span> Correção organizada</span><h2>Do cartão-resposta<br />à <i>próxima aula.</i></h2><p>Use a máscara com as quatro alternativas, consulte o gabarito comentado e faça a correção com rastreabilidade por habilidade.</p><div className="correction-buttons"><Button onClick={() => downloadFile("mascara")}><ArrowDownToLine size={16} /> Baixar máscara</Button><Button variant="outline" className="light-outline" onClick={() => downloadFile("gabarito")}><BookOpenCheck size={16} /> Baixar gabarito</Button></div></div>
          <div className="correction-card"><img src="/manus-storage/enem-correction-detail_08ac5859.jpg" alt="Detalhe de uma folha de respostas sendo corrigida" /><div className="correction-card-body"><div><ClipboardCheck size={21} /><span>CHAVE DOCENTE</span></div><h3>100 respostas<br />em uma única matriz.</h3><button onClick={() => setShowKey((value) => !value)}>{showKey ? "Ocultar chave" : "Consultar chave"} <ArrowRight size={16} /></button></div></div>
          {showKey && <div className="answer-key" aria-live="polite"><div className="answer-key-title"><div><span className="mini-label">GABARITO RÁPIDO</span><h3>Chave de correção</h3></div><button onClick={() => setShowKey(false)} aria-label="Fechar chave"><X size={17} /></button></div><div className="answer-key-grid">{questions.map((q) => <div key={q.numero}><span>{String(q.numero).padStart(3, "0")}</span><strong>{q.correta}</strong></div>)}</div></div>}
          <div className="answer-key"><div className="answer-key-title"><div><span className="mini-label">PAINEL DOCENTE</span><h3>Resultados locais</h3></div><div><select value={teacherFilter} onChange={(event) => setTeacherFilter(event.target.value)}><option value="todas">Todas as turmas</option>{teacherClassrooms.map(([key, name]) => <option key={key} value={key}>{name}</option>)}</select><select value={teacherSort} onChange={(event) => setTeacherSort(event.target.value)}><option value="score">Maior pontuação</option><option value="date">Mais recente</option></select></div></div><div className="answer-key-grid">{teacherRows.map((attempt) => <div key={attempt.id}><span>{attempt.studentName} · {attempt.classroom}</span><strong>{attempt.percentage}%</strong></div>)}</div></div>
        </section>}

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

      <footer className="footer"><div className="footer-brand"><img src="/manus-storage/enem-logo-symbol_049e20d0.png" alt="" /><span><strong>SIMULADO</strong><em>ENEM</em></span></div><p>Preparado para revisão, aplicação e correção em contexto escolar.</p>{!teacherMode && <button className="teacher-developer-access" onClick={() => openAuth("login")}><LockKeyhole size={13} /> Acesso ao professor desenvolvedor</button>}<a href="#inicio">Voltar ao topo ↑</a></footer>
    </div>
  );
}
