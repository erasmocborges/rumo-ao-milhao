import { readFileSync, writeFileSync } from 'node:fs';

const root = '/home/ubuntu/simulado-enem-interativo';
const caderno = readFileSync(`${root}/caderno_simulado_enem.md`, 'utf8');
const gabarito = readFileSync(`${root}/gabarito_simulado_enem.md`, 'utf8');
const mask = readFileSync(`${root}/mascara_correcao.md`, 'utf8');

const questionMatches = [...caderno.matchAll(/^### Questão (\d{2,3}) —/gm)];
const gabaritoMatches = [...gabarito.matchAll(/^\| (\d{1,3}) \| \*\*([ABCD])\*\*/gm)];
const maskMatches = [...mask.matchAll(/^\| (\d{3}) \| \*\*([ABCD])\*\*/gm)];
const areaHeaders = [...caderno.matchAll(/^## (Linguagens, Códigos e suas Tecnologias|Ciências Humanas e suas Tecnologias|Ciências da Natureza e suas Tecnologias|Matemática e suas Tecnologias)$/gm)].map((x) => x[1]);
const answers = Object.fromEntries(['A', 'B', 'C', 'D'].map((letter) => [letter, gabaritoMatches.filter((m) => m[2] === letter).length]));
const expected = Array.from({ length: 100 }, (_, index) => index + 1);
const questionIds = questionMatches.map((m) => Number(m[1]));
const answerIds = gabaritoMatches.map((m) => Number(m[1]));
const maskIds = maskMatches.map((m) => Number(m[1]));
const isExact = (values) => values.length === 100 && values.every((value, index) => value === expected[index]);
const checks = [
  ['100 questões no caderno', questionMatches.length === 100],
  ['Numeração contínua no caderno', isExact(questionIds)],
  ['100 linhas de gabarito', gabaritoMatches.length === 100],
  ['Numeração contínua no gabarito', isExact(answerIds)],
  ['100 linhas na máscara', maskMatches.length === 100],
  ['Numeração contínua na máscara', isExact(maskIds)],
  ['Quatro áreas identificadas', areaHeaders.length === 4],
];
if (checks.some(([, passed]) => !passed)) throw new Error(`Falha de validação: ${checks.filter(([, passed]) => !passed).map(([name]) => name).join('; ')}`);

const report = `# Relatório de Validação do Simulado\n\n| Critério | Resultado |\n| --- | --- |\n${checks.map(([name, passed]) => `| ${name} | ${passed ? 'Conforme' : 'Falha'} |`).join('\n')}\n\n## Distribuição de respostas\n\n| Alternativa correta | Quantidade | Participação |\n| :---: | ---: | ---: |\n${Object.entries(answers).map(([letter, count]) => `| ${letter} | ${count} | ${(count).toFixed(0)}% |`).join('\n')}\n\n> O equilíbrio entre alternativas foi verificado como controle editorial. A distribuição não é usada como critério pedagógico isolado; cada resposta foi definida pela consistência conceitual do item.\n`;
writeFileSync(`${root}/relatorio_validacao.md`, report, 'utf8');
console.log(JSON.stringify({ perguntas: questionMatches.length, gabarito: gabaritoMatches.length, mascara: maskMatches.length, respostas: answers }, null, 2));
