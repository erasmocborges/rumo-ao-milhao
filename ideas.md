# Direção de Design — Simulado ENEM Interativo

## Três abordagens iniciais

| Tema | Introdução breve | Probabilidade |
| --- | --- | --- |
| **Caderno de Campo Pedagógico** | Uma experiência editorial de estudo, com a textura visual de uma folha de planejamento bem organizada e pequenos sinais gráficos de correção. Equilibra clareza, acolhimento e rigor. | 0,07 |
| **Atlas de Competências** | Uma interface inspirada em cartografia acadêmica, usando rotas, marcos e camadas para apresentar áreas, habilidades e tendências. Valoriza exploração e visão sistêmica. | 0,04 |
| **Laboratório de Questões** | Um painel técnico de avaliação, com contrastes firmes, elementos de régua e cartões de análise. Comunica método, medida e acompanhamento de desempenho. | 0,09 |

## Abordagem escolhida: Caderno de Campo Pedagógico

### Movimento de design

**Editorial educacional contemporâneo**, combinando a sobriedade da tipografia suíça com os sinais materiais de um caderno de planejamento docente. A interface deve parecer cuidadosamente editada, não apenas montada como um painel genérico.

### Princípios centrais

1. **Leitura antes de decoração:** conteúdo, níveis de informação e instruções devem ser imediatamente reconhecíveis.
2. **Rigor visível:** linhas finas, rótulos de metadados e numeração disciplinada fazem a avaliação parecer confiável e utilizável em sala.
3. **Calor controlado:** o papel claro e os acentos terrosos evitam uma aparência burocrática ou fria.
4. **Exploração orientada:** filtros, gráficos e abas auxiliam o professor sem esconder o caderno de questões.

### Filosofia de cor

A base é um **papel mineral claro** para reduzir fadiga visual e sugerir material imprimível. Tinta azul-marinho oferece densidade acadêmica; o vermelho-terra funciona como marca de correção e foco; verde-sálvia e ocre são reservados a áreas do conhecimento e indicadores, sem competir com o conteúdo. A cor de marca é **Vermelho Caderno — #C84D3A**, usada com parcimônia para ações, marcações e detalhes memoráveis.

### Paradigma de layout

Uma composição de **mesa editorial assimétrica**: uma coluna estreita fixa organiza a navegação e os indicadores; um campo de leitura amplo apresenta conteúdo; cartões e gráficos surgem como folhas sobrepostas, alinhados a uma grade de margens e não a um mosaico centralizado. Em telas pequenas, a sequência vira uma pilha de leitura, mantendo a ordem pedagógica.

### Elementos de assinatura

1. Uma régua vertical colorida com marcadores de área e numeração de seção.
2. Pequenos círculos de correção e traços manuais discretos ao lado de métricas e alternativas.
3. Blocos editoriais com cabeçalhos em caixa alta, microtipografia e filetes em azul-marinho.

### Filosofia de interação

As interações devem lembrar o manuseio de material de estudo: abas revelam blocos de conteúdo, filtros reorganizam a leitura e botões de impressão/download parecem ferramentas de preparação de aula. O feedback é direto, breve e com contraste suficiente.

### Animação

Usar entradas discretas em opacidade e deslocamento de 8–12 px, em cascata de 45 ms, apenas para grupos de cartões e seções. Gráficos devem aparecer por crescimento suave ao entrar na área visível. Hover de controles e cartões com elevação mínima; cliques reduzem para 0,97. Todas as animações devem ser desligadas para `prefers-reduced-motion`.

### Sistema tipográfico

**DM Serif Display** para títulos de seção e números de destaque, com **Manrope** para corpo, tabelas e controles. Títulos têm espaçamento negativo leve e escala expressiva; microetiquetas usam caixa alta, peso 700 e tracking ampliado. Não usar Inter.

### Essência de marca

**Um caderno de simulado ENEM pronto para docentes que desejam aplicar, interpretar e corrigir com clareza pedagógica.** Personalidade: criteriosa, acolhedora, objetiva.

### Voz da marca

A comunicação é precisa, encorajadora e orientada à ação; evita promessas vagas ou tom publicitário.

> “100 questões para transformar revisão em diagnóstico.”

> “Selecione uma área, encontre a habilidade e prepare a próxima aula.”

### Wordmark e logo

O símbolo é uma página aberta formada por dois arcos assimétricos, cortada por uma marca de verificação geométrica e quatro pontos alinhados — referência às quatro alternativas. O wordmark usa lettering serifado compacto, em azul-marinho, com um filete vermelho-terra sob “ENEM”.

### Cor de marca

**Vermelho Caderno — #C84D3A**

## Style Decisions

O sistema de régua vertical, numeração, filetes em azul-marinho e metadados editoriais deve atravessar inclusive as áreas funcionais do simulador. Controles, cartões de questões e métricas devem manter aparência de caderno docente imprimível, com papel pautado, marcadores de área, círculos de correção e traços pontuais. A marca com símbolo de página aberta, verificação e sublinhado vermelho em “ENEM” deve ter presença reconhecível no cabeçalho e no rodapé.
