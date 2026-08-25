/** Caderno de Campo Pedagógico: dados do simulado ENEM autoral reformulado. */
export type Question = {
  numero: number; area: string; areaCurta: string; habilidade: string; referencia: string;
  enunciado: string; alternativas: { A: string; B: string; C: string; D: string }; correta: string; justificativa: string;
};

export const questions: Question[] = [
  {
    "numero": 1,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "Leitura de campanha",
    "referencia": "Campanhas de cidadania digital",
    "enunciado": "Uma campanha de uma biblioteca traz a frase: “Compartilhe água, não boatos. Confira a fonte antes de repassar.” A escolha do imperativo “Confira” busca",
    "alternativas": {
      "A": "convidar o leitor a abandonar as redes sociais.",
      "B": "orientar uma ação de verificação antes do compartilhamento.",
      "C": "explicar a origem científica de todas as notícias.",
      "D": "substituir a leitura de reportagens por campanhas."
    },
    "correta": "B",
    "justificativa": "O imperativo orienta o leitor a verificar a informação antes de compartilhá-la."
  },
  {
    "numero": 2,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "Variação linguística",
    "referencia": "Oralidade e identidade regional",
    "enunciado": "Em uma entrevista, uma agricultora afirma: “A gente vai chegá cedo na feira, porque o povo gosta de escolhê as frutas.” Nesse contexto, essa fala deve ser compreendida como",
    "alternativas": {
      "A": "prova de incapacidade da entrevistada de se comunicar.",
      "B": "modelo obrigatório para documentos públicos.",
      "C": "marca de variedade linguística associada à situação e ao grupo social.",
      "D": "desvio que impede a compreensão da mensagem."
    },
    "correta": "C",
    "justificativa": "A fala é inteligível e revela uma variedade linguística adequada ao contexto de oralidade."
  },
  {
    "numero": 3,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "Ironia",
    "referencia": "Crônica de costumes",
    "enunciado": "Em uma crônica, lê-se: “A placa dizia ‘fila preferencial’; por isso, todos chegaram antes de quem realmente precisava dela.” O efeito de ironia decorre de",
    "alternativas": {
      "A": "criticar o uso indevido de um direito de prioridade.",
      "B": "elogiar a rapidez das pessoas na fila.",
      "C": "explicar a legislação sobre atendimento.",
      "D": "descrever a organização eficiente do local."
    },
    "correta": "A",
    "justificativa": "A oposição entre o aviso e o comportamento das pessoas cria uma crítica irônica."
  },
  {
    "numero": 4,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "Efeito de sentido verbal",
    "referencia": "Memória e narrativa",
    "enunciado": "No trecho “Quando chovia, o bairro inteiro se reunia na varanda da dona Celina”, o emprego de “chovia” e “se reunia” indica",
    "alternativas": {
      "A": "um acontecimento futuro e incerto.",
      "B": "uma ação única encerrada no passado.",
      "C": "uma ordem dada aos moradores.",
      "D": "um hábito recorrente em um período passado."
    },
    "correta": "D",
    "justificativa": "O pretérito imperfeito indica ações habituais ou durativas no passado."
  },
  {
    "numero": 5,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "Arte brasileira",
    "referencia": "Modernismos e identidades",
    "enunciado": "Um mural urbano combina grafismos indígenas, prédios contemporâneos e personagens de diferentes origens. A obra se aproxima de uma perspectiva que",
    "alternativas": {
      "A": "recusa referências culturais brasileiras.",
      "B": "reelabora elementos da cultura nacional em diálogo com o presente.",
      "C": "defende a separação entre arte popular e arte erudita.",
      "D": "prioriza a cópia fiel de modelos europeus."
    },
    "correta": "B",
    "justificativa": "A combinação de referências locais e contemporâneas valoriza uma identidade cultural plural."
  },
  {
    "numero": 6,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "Leitura multissemiótica",
    "referencia": "Infográficos jornalísticos",
    "enunciado": "Um infográfico sobre descarte de resíduos apresenta ícones de materiais, porcentagens e frases curtas. Sua compreensão depende principalmente de",
    "alternativas": {
      "A": "decorar a ordem dos ícones.",
      "B": "ignorar os números e focar apenas nas cores.",
      "C": "articular informações verbais, numéricas e visuais.",
      "D": "converter todos os dados em um texto literário."
    },
    "correta": "C",
    "justificativa": "O sentido é construído pela integração de diferentes linguagens."
  },
  {
    "numero": 7,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "Publicidade",
    "referencia": "Consumo responsável",
    "enunciado": "Um anúncio de produtos reutilizáveis afirma: “Seu consumo escreve o futuro.” O principal recurso persuasivo é",
    "alternativas": {
      "A": "prometer preço menor que o da concorrência.",
      "B": "atribuir ao consumidor responsabilidade por consequências coletivas.",
      "C": "apresentar dados técnicos sobre produção industrial.",
      "D": "comparar visualmente marcas rivais."
    },
    "correta": "B",
    "justificativa": "A frase associa a escolha de consumo à responsabilidade socioambiental."
  },
  {
    "numero": 8,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "Leitura literária",
    "referencia": "Poesia contemporânea",
    "enunciado": "No poema, o eu lírico afirma: “Meu nome cabe no mar, mas não cabe no rótulo que me deram.” A imagem sugere",
    "alternativas": {
      "A": "recusa a classificações que reduzem a identidade do sujeito.",
      "B": "desejo de abandonar a própria história.",
      "C": "descrição objetiva de um ambiente marítimo.",
      "D": "defesa de regras fixas para a linguagem."
    },
    "correta": "A",
    "justificativa": "A oposição entre mar e rótulo sugere uma identidade ampla, não reduzível a etiquetas."
  },
  {
    "numero": 9,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "Cultura digital",
    "referencia": "Checagem de informações",
    "enunciado": "Uma escola orienta os estudantes a verificar autoria, data e endereço eletrônico antes de divulgar uma notícia. Essa prática contribui para",
    "alternativas": {
      "A": "aumentar o número de mensagens compartilhadas.",
      "B": "eliminar a necessidade de leitura crítica.",
      "C": "transformar opiniões em dados científicos.",
      "D": "avaliar a credibilidade de conteúdos digitais."
    },
    "correta": "D",
    "justificativa": "Os critérios indicados permitem avaliar fontes e reduzir a circulação de desinformação."
  },
  {
    "numero": 10,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "Língua inglesa",
    "referencia": "Leitura de instruções",
    "enunciado": "Em um cartaz em inglês, lê-se: “Wash your hands before meals and after using public transport.” A orientação central do texto é",
    "alternativas": {
      "A": "evitar refeições em espaços públicos.",
      "B": "usar transporte coletivo apenas em dias úteis.",
      "C": "adotar hábitos de higiene em situações cotidianas.",
      "D": "substituir água e sabão por álcool em gel."
    },
    "correta": "C",
    "justificativa": "O texto recomenda higienizar as mãos antes das refeições e após usar transporte coletivo."
  },
  {
    "numero": 11,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "Língua espanhola",
    "referencia": "Serviços públicos",
    "enunciado": "Uma placa informa: “La biblioteca abre de lunes a viernes, de 8 a 18 horas. Préstamos por siete días.” A informação permite concluir que a biblioteca",
    "alternativas": {
      "A": "empresta livros durante uma semana.",
      "B": "funciona somente aos fins de semana.",
      "C": "abre por sete horas diariamente.",
      "D": "realiza empréstimos apenas pela manhã."
    },
    "correta": "A",
    "justificativa": "“Préstamos por siete días” informa o prazo de empréstimo de uma semana."
  },
  {
    "numero": 12,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "Corpo e linguagem",
    "referencia": "Dança e pertencimento",
    "enunciado": "Em uma apresentação, dançarinos formam rodas, alternam passos e convidam o público a acompanhar o ritmo com palmas. A linguagem corporal evidencia",
    "alternativas": {
      "A": "isolamento entre artistas e espectadores.",
      "B": "construção coletiva de participação e pertencimento.",
      "C": "substituição da música por fala formal.",
      "D": "rejeição de tradições populares."
    },
    "correta": "B",
    "justificativa": "A roda e o convite às palmas produzem participação compartilhada."
  },
  {
    "numero": 13,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "Teatro",
    "referencia": "Elementos cênicos",
    "enunciado": "Em uma peça, a iluminação muda de tons claros para sombras azuladas quando a personagem passa a recordar uma perda. Nesse caso, a iluminação contribui para",
    "alternativas": {
      "A": "informar o horário real da encenação.",
      "B": "substituir totalmente a atuação dos intérpretes.",
      "C": "esconder a mudança de cena do público.",
      "D": "criar uma atmosfera emocional ligada à memória."
    },
    "correta": "D",
    "justificativa": "A mudança de luz ajuda a construir o clima emocional da cena."
  },
  {
    "numero": 14,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "Música e cultura",
    "referencia": "Matrizes culturais brasileiras",
    "enunciado": "Uma canção atual mistura batida eletrônica, instrumento de tradição regional e versos sobre a vida no interior. Essa composição demonstra",
    "alternativas": {
      "A": "apagamento de referências culturais locais.",
      "B": "recriação de tradições em diálogo com novas linguagens.",
      "C": "uso obrigatório de apenas um gênero musical.",
      "D": "separação entre cultura urbana e cultura regional."
    },
    "correta": "B",
    "justificativa": "A canção atualiza referências regionais ao combiná-las com recursos contemporâneos."
  },
  {
    "numero": 15,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "Gênero autobiográfico",
    "referencia": "Narrativas de si",
    "enunciado": "Em um texto, a narradora registra: “Guardei o bilhete do primeiro ônibus que peguei sozinha; ele me lembrava que eu podia escolher caminhos.” A marca autobiográfica está na",
    "alternativas": {
      "A": "relato de experiência pessoal em primeira pessoa.",
      "B": "apresentação de dados estatísticos sobre mobilidade.",
      "C": "explicação impessoal de uma rota urbana.",
      "D": "presença de instruções para o leitor."
    },
    "correta": "A",
    "justificativa": "O texto relata uma memória individual narrada em primeira pessoa."
  },
  {
    "numero": 16,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "Patrimônio cultural",
    "referencia": "Saberes tradicionais",
    "enunciado": "A renda de bilro, produzida por artesãs de uma comunidade litorânea, é ensinada entre gerações e identifica o grupo. Ela pode ser reconhecida como patrimônio",
    "alternativas": {
      "A": "genético, por estar ligada a famílias específicas.",
      "B": "natural, por depender da paisagem local.",
      "C": "imaterial, por envolver conhecimento e prática cultural.",
      "D": "arquitetônico, por ocupar um espaço físico."
    },
    "correta": "C",
    "justificativa": "Trata-se de um saber-fazer transmitido e compartilhado socialmente, portanto imaterial."
  },
  {
    "numero": 17,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "Resenha",
    "referencia": "Argumentação crítica",
    "enunciado": "Uma resenha afirma: “O filme evita explicar tudo e confia no espectador; por isso, transforma o silêncio em parte da narrativa.” O trecho apresenta",
    "alternativas": {
      "A": "um resumo cronológico de todas as cenas.",
      "B": "uma avaliação argumentada sobre uma escolha estética.",
      "C": "uma instrução técnica para filmagem.",
      "D": "uma informação sobre bilheteria."
    },
    "correta": "B",
    "justificativa": "O autor avalia e justifica o efeito de uma escolha narrativa do filme."
  },
  {
    "numero": 18,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "Meme",
    "referencia": "Relação verbal e visual",
    "enunciado": "Um meme mostra uma pessoa com muitas abas abertas no computador e a legenda “Eu: vou dormir cedo. Também eu às 2h: só mais uma pesquisa.” O humor resulta da",
    "alternativas": {
      "A": "ausência de relação entre imagem e legenda.",
      "B": "explicação científica sobre o sono.",
      "C": "defesa do uso ilimitado de telas.",
      "D": "contraste entre a intenção declarada e a ação mostrada."
    },
    "correta": "D",
    "justificativa": "A legenda e a imagem contrapõem a intenção de dormir cedo ao comportamento de continuar online."
  },
  {
    "numero": 19,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "Divulgação científica",
    "referencia": "Uso de fontes",
    "enunciado": "Uma reportagem científica inclui a fala de uma pesquisadora e o resultado de um estudo. A citação dessas fontes tem a função de",
    "alternativas": {
      "A": "substituir a interpretação do leitor.",
      "B": "tornar o texto exclusivamente opinativo.",
      "C": "sustentar a informação com vozes e evidências especializadas.",
      "D": "eliminar qualquer necessidade de contexto."
    },
    "correta": "C",
    "justificativa": "As fontes qualificam e sustentam a informação divulgada."
  },
  {
    "numero": 20,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "Norma-padrão",
    "referencia": "Concordância verbal",
    "enunciado": "Para uma ata de reunião, a redação adequada é",
    "alternativas": {
      "A": "Houve problemas na entrega dos materiais.",
      "B": "Houveram problemas na entrega dos materiais.",
      "C": "Faziam dois meses que a entrega atrasou.",
      "D": "Existiu atrasos na entrega dos materiais."
    },
    "correta": "A",
    "justificativa": "O verbo haver, no sentido de existir, é impessoal e fica no singular."
  },
  {
    "numero": 21,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "Foco narrativo",
    "referencia": "Narrador e incerteza",
    "enunciado": "No conto, o narrador afirma: “Talvez ela tivesse voltado. Talvez eu apenas quisesse que isso fosse verdade.” Essas marcas indicam",
    "alternativas": {
      "A": "certeza documental sobre os fatos.",
      "B": "uma perspectiva subjetiva e duvidosa do narrador.",
      "C": "descrição objetiva de uma pesquisa histórica.",
      "D": "ordem dirigida a outra personagem."
    },
    "correta": "B",
    "justificativa": "“Talvez” evidencia incerteza e subjetividade da voz narrativa."
  },
  {
    "numero": 22,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "Texto instrucional",
    "referencia": "Linguagem pública",
    "enunciado": "Um manual de defesa civil orienta: “Em caso de alagamento, desligue a energia e procure um local elevado.” Predomina nesse trecho a função de",
    "alternativas": {
      "A": "entreter com uma situação ficcional.",
      "B": "narrar uma experiência passada.",
      "C": "expressar sentimentos do autor.",
      "D": "orientar procedimentos diante de um risco."
    },
    "correta": "D",
    "justificativa": "O texto dá instruções objetivas para agir em situação de emergência."
  },
  {
    "numero": 23,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "Registro informal",
    "referencia": "Adequação comunicativa",
    "enunciado": "Em uma conversa entre colegas, a expressão “a gente dá um jeito” significa, no contexto,",
    "alternativas": {
      "A": "seguir uma norma jurídica específica.",
      "B": "abandonar uma tarefa sem solução.",
      "C": "encontrar uma solução prática, mesmo sem detalhá-la.",
      "D": "registrar formalmente uma decisão."
    },
    "correta": "C",
    "justificativa": "A expressão informal indica a intenção de resolver uma situação de modo prático."
  },
  {
    "numero": 24,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "E-mail formal",
    "referencia": "Planejamento textual",
    "enunciado": "Para solicitar uma visita técnica a um museu, o assunto de e-mail mais adequado é",
    "alternativas": {
      "A": "Oi, tudo bem?",
      "B": "Solicitação de visita técnica — Escola [nome] — 12 de setembro",
      "C": "Preciso falar com vocês urgente",
      "D": "Museu legal para a turma"
    },
    "correta": "B",
    "justificativa": "O assunto é claro, identificável e informa a finalidade e a data da solicitação."
  },
  {
    "numero": 25,
    "area": "Linguagens, Códigos e suas Tecnologias",
    "areaCurta": "Linguagens",
    "habilidade": "Coesão referencial",
    "referencia": "Leitura de projeto",
    "enunciado": "Leia: “O bairro criou uma horta comunitária. Essa iniciativa reúne moradores, reduz resíduos orgânicos e amplia o acesso a alimentos.” A expressão “Essa iniciativa” retoma",
    "alternativas": {
      "A": "a criação da horta comunitária.",
      "B": "somente os resíduos orgânicos.",
      "C": "a palavra “moradores”.",
      "D": "a falta de alimentos no bairro."
    },
    "correta": "A",
    "justificativa": "O demonstrativo retoma a ação apresentada na frase anterior: criar a horta."
  },
  {
    "numero": 26,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "Colonização",
    "referencia": "Administração colonial",
    "enunciado": "As capitanias hereditárias foram criadas pela Coroa portuguesa no século XVI. Entre seus objetivos estava",
    "alternativas": {
      "A": "garantir independência política imediata às colônias.",
      "B": "abolir a exploração de recursos naturais.",
      "C": "substituir o comércio marítimo por feiras locais.",
      "D": "ocupar e administrar territórios com participação de particulares."
    },
    "correta": "D",
    "justificativa": "As capitanias buscavam ocupar e administrar o território mediante concessões a donatários."
  },
  {
    "numero": 27,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "Povos indígenas",
    "referencia": "Resistências à colonização",
    "enunciado": "Ao estudar a presença indígena na formação do Brasil, uma turma identifica estratégias como deslocamentos, alianças e manutenção de práticas culturais. Essas estratégias revelam",
    "alternativas": {
      "A": "passividade total diante da colonização.",
      "B": "formas diversas de resistência e negociação.",
      "C": "abandono completo de territórios ancestrais.",
      "D": "aceitação uniforme da catequização."
    },
    "correta": "B",
    "justificativa": "Os povos indígenas atuaram de formas variadas, resistindo e negociando em diferentes contextos."
  },
  {
    "numero": 28,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "Abolição e pós-abolição",
    "referencia": "Desigualdade social",
    "enunciado": "A Lei Áurea extinguiu juridicamente a escravidão em 1888, mas não assegurou terra, moradia ou inserção econômica à população liberta. Uma consequência histórica dessa ausência foi",
    "alternativas": {
      "A": "manutenção de desigualdades raciais e socioeconômicas.",
      "B": "distribuição imediata de propriedades rurais.",
      "C": "universalização do voto feminino.",
      "D": "fim de todas as formas de discriminação."
    },
    "correta": "A",
    "justificativa": "A ausência de políticas de integração contribuiu para a persistência de desigualdades."
  },
  {
    "numero": 29,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "Era Vargas",
    "referencia": "Estado e trabalho",
    "enunciado": "A criação de leis trabalhistas e o fortalecimento de órgãos estatais, especialmente a partir de 1930, indicam",
    "alternativas": {
      "A": "descentralização completa do poder político.",
      "B": "retorno ao pacto colonial.",
      "C": "ampliação da intervenção do Estado nas relações de trabalho.",
      "D": "eliminação de conflitos entre trabalhadores e empresários."
    },
    "correta": "C",
    "justificativa": "O período marcou maior atuação estatal na regulamentação do trabalho."
  },
  {
    "numero": 30,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "Redemocratização",
    "referencia": "Movimentos sociais",
    "enunciado": "No final da década de 1970, greves e mobilizações por anistia e eleições diretas ganharam visibilidade. Esses movimentos contribuíram para",
    "alternativas": {
      "A": "restaurar o regime colonial.",
      "B": "impedir a organização da sociedade civil.",
      "C": "substituir a Constituição por decretos militares.",
      "D": "pressionar pela abertura política e por direitos democráticos."
    },
    "correta": "D",
    "justificativa": "As mobilizações fortaleceram a luta pela redemocratização."
  },
  {
    "numero": 31,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "Amazônia",
    "referencia": "Atividades econômicas e ambiente",
    "enunciado": "Em uma região de floresta, a abertura de estradas facilita o escoamento de produtos, mas também pode estimular ocupação desordenada e retirada de vegetação. Esse processo evidencia",
    "alternativas": {
      "A": "separação completa entre economia e ambiente.",
      "B": "redução automática da pressão sobre os recursos.",
      "C": "conflitos entre expansão econômica, território e conservação.",
      "D": "desaparecimento das populações locais em todos os casos."
    },
    "correta": "C",
    "justificativa": "A infraestrutura pode favorecer atividades econômicas e aumentar pressões socioambientais."
  },
  {
    "numero": 32,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "Climatologia urbana",
    "referencia": "Ilhas de calor",
    "enunciado": "Em áreas densamente construídas, a substituição de árvores por asfalto e concreto contribui para temperaturas mais elevadas. Esse fenômeno é intensificado pela",
    "alternativas": {
      "A": "maior reflexão da radiação em áreas vegetadas.",
      "B": "impermeabilização do solo e redução da cobertura vegetal.",
      "C": "diminuição do consumo de energia.",
      "D": "presença exclusiva de rios urbanos."
    },
    "correta": "B",
    "justificativa": "Pavimentação e pouca vegetação favorecem o armazenamento de calor."
  },
  {
    "numero": 33,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "Cartografia",
    "referencia": "Coordenadas geográficas",
    "enunciado": "Uma cidade localizada a 10° S e 45° W encontra-se, respectivamente, nos hemisférios",
    "alternativas": {
      "A": "Norte e Oriental.",
      "B": "Norte e Ocidental.",
      "C": "Sul e Oriental.",
      "D": "Sul e Ocidental."
    },
    "correta": "D",
    "justificativa": "Latitude sul indica Hemisfério Sul; longitude oeste indica Hemisfério Ocidental."
  },
  {
    "numero": 34,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "Urbanização",
    "referencia": "Mobilidade",
    "enunciado": "Uma prefeitura integra linhas de ônibus, ciclovias e trem metropolitano com uma única tarifa. A medida procura principalmente",
    "alternativas": {
      "A": "reduzir a dependência de deslocamentos individuais motorizados.",
      "B": "impedir o acesso de moradores da periferia ao centro.",
      "C": "substituir todo deslocamento a pé.",
      "D": "aumentar o número de estacionamentos centrais."
    },
    "correta": "A",
    "justificativa": "A integração estimula transporte coletivo e alternativas ao automóvel individual."
  },
  {
    "numero": 35,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "Espaço agrário",
    "referencia": "Tecnificação agrícola",
    "enunciado": "A adoção de máquinas, sementes selecionadas e sistemas de irrigação pode elevar a produtividade agrícola. Ao mesmo tempo, esse processo pode",
    "alternativas": {
      "A": "eliminar toda diferença entre pequenas e grandes propriedades.",
      "B": "aprofundar desigualdades quando o acesso à tecnologia é concentrado.",
      "C": "impedir a comercialização de commodities.",
      "D": "tornar desnecessário o trabalho qualificado."
    },
    "correta": "B",
    "justificativa": "A tecnologia pode ampliar produtividade, mas seu acesso desigual tende a aprofundar assimetrias."
  },
  {
    "numero": 36,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "Demografia",
    "referencia": "Transição demográfica",
    "enunciado": "Uma pirâmide etária apresenta base mais estreita que a observada décadas antes e maior participação de adultos e idosos. Esse perfil sugere",
    "alternativas": {
      "A": "aumento imediato da taxa de natalidade.",
      "B": "retorno a uma população exclusivamente rural.",
      "C": "redução da fecundidade e envelhecimento populacional.",
      "D": "desaparecimento de migrações internas."
    },
    "correta": "C",
    "justificativa": "Base estreita e topo relativamente maior indicam menos nascimentos e envelhecimento."
  },
  {
    "numero": 37,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "Cartografia temática",
    "referencia": "Leitura de mapas",
    "enunciado": "Para comparar a incidência de uma doença entre municípios com populações muito diferentes, o indicador mais adequado no mapa é",
    "alternativas": {
      "A": "o número absoluto de casos, sem relação com a população.",
      "B": "a taxa de casos por número de habitantes.",
      "C": "a cor favorita dos moradores.",
      "D": "a ordem alfabética dos municípios."
    },
    "correta": "B",
    "justificativa": "Taxas permitem comparar a ocorrência proporcional entre populações de tamanhos distintos."
  },
  {
    "numero": 38,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "Globalização",
    "referencia": "Redes produtivas",
    "enunciado": "Um celular é projetado em um país, montado em outro e utiliza componentes fabricados em diferentes continentes. Essa organização expressa",
    "alternativas": {
      "A": "isolamento das economias nacionais.",
      "B": "fim das trocas internacionais.",
      "C": "produção artesanal local como regra global.",
      "D": "fragmentação internacional das etapas produtivas."
    },
    "correta": "D",
    "justificativa": "A produção é distribuída entre lugares conectados por cadeias globais."
  },
  {
    "numero": 39,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "Recursos hídricos",
    "referencia": "Bacias hidrográficas",
    "enunciado": "O desmatamento em nascentes pode aumentar a erosão e o transporte de sedimentos para rios situados a jusante. Isso ocorre porque",
    "alternativas": {
      "A": "as águas conectam partes de uma mesma bacia hidrográfica.",
      "B": "cada nascente funciona sem relação com os rios.",
      "C": "sedimentos não são transportados pela água.",
      "D": "a vegetação não interfere no solo."
    },
    "correta": "A",
    "justificativa": "Os cursos d’água conectam áreas a montante e a jusante da bacia."
  },
  {
    "numero": 40,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "Filosofia antiga",
    "referencia": "Diálogo socrático",
    "enunciado": "Ao responder a uma pergunta com novas perguntas, Sócrates buscava levar o interlocutor a examinar suas próprias ideias. Essa prática valoriza",
    "alternativas": {
      "A": "a repetição de respostas prontas.",
      "B": "a investigação crítica por meio do diálogo.",
      "C": "a recusa de qualquer argumento.",
      "D": "a imposição de uma verdade sem debate."
    },
    "correta": "B",
    "justificativa": "O diálogo socrático estimula exame crítico e construção argumentativa."
  },
  {
    "numero": 41,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "Iluminismo",
    "referencia": "Direitos e cidadania",
    "enunciado": "A defesa de que governos devem ser legitimados pelo consentimento dos governados aproxima-se de ideias iluministas porque afirma",
    "alternativas": {
      "A": "origem divina e incontestável de todo poder.",
      "B": "retorno aos privilégios de nascimento.",
      "C": "direitos políticos e limitação do poder arbitrário.",
      "D": "submissão permanente dos cidadãos ao monarca."
    },
    "correta": "C",
    "justificativa": "O Iluminismo valorizou direitos, consentimento e limitação do poder."
  },
  {
    "numero": 42,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "Sociologia",
    "referencia": "Fato social",
    "enunciado": "Regras de trânsito existem antes de cada motorista, exercem pressão sobre sua conduta e são compartilhadas socialmente. Para Durkheim, esse exemplo caracteriza",
    "alternativas": {
      "A": "uma escolha puramente individual.",
      "B": "um instinto biológico imutável.",
      "C": "uma opinião sem efeito coletivo.",
      "D": "um fato social exterior e coercitivo."
    },
    "correta": "D",
    "justificativa": "As regras sociais são exteriores ao indivíduo e orientam sua ação coletivamente."
  },
  {
    "numero": 43,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "Sociologia do trabalho",
    "referencia": "Alienação",
    "enunciado": "Quando trabalhadores não controlam o processo nem o destino do produto de seu trabalho, a situação exemplifica, em Marx,",
    "alternativas": {
      "A": "alienação do trabalho.",
      "B": "democracia direta.",
      "C": "mobilidade social automática.",
      "D": "neutralidade das relações de produção."
    },
    "correta": "A",
    "justificativa": "A separação entre trabalhador, processo e produto é central na noção de alienação."
  },
  {
    "numero": 44,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "Cidadania",
    "referencia": "Participação social",
    "enunciado": "Um conselho municipal reúne moradores, gestores e entidades para discutir prioridades de saúde. Essa experiência fortalece",
    "alternativas": {
      "A": "a concentração exclusiva de decisões em uma pessoa.",
      "B": "a gestão participativa de políticas públicas.",
      "C": "a substituição de eleições por sorteio.",
      "D": "a proibição de controle social."
    },
    "correta": "B",
    "justificativa": "Conselhos ampliam participação e controle social sobre políticas públicas."
  },
  {
    "numero": 45,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "Antropologia",
    "referencia": "Relativismo cultural",
    "enunciado": "Ao analisar uma prática cultural diferente da sua, uma estudante procura compreendê-la no contexto dos valores do próprio grupo, sem classificá-la como superior ou inferior. Essa atitude expressa",
    "alternativas": {
      "A": "etnocentrismo.",
      "B": "determinismo biológico.",
      "C": "relativismo cultural.",
      "D": "racismo científico."
    },
    "correta": "C",
    "justificativa": "O relativismo cultural busca compreender práticas a partir de seus contextos."
  },
  {
    "numero": 46,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "História das mulheres",
    "referencia": "Direitos políticos",
    "enunciado": "As lutas pelo voto feminino no Brasil contribuíram para",
    "alternativas": {
      "A": "ampliar a participação política das mulheres.",
      "B": "restaurar o voto censitário.",
      "C": "impedir candidaturas femininas.",
      "D": "reduzir direitos civis."
    },
    "correta": "A",
    "justificativa": "O sufrágio feminino ampliou direitos de participação política."
  },
  {
    "numero": 47,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "Desigualdade social",
    "referencia": "Acesso a serviços",
    "enunciado": "Durante uma crise sanitária, bairros com menos saneamento, moradias mais adensadas e menor acesso a serviços de saúde enfrentam riscos maiores. A situação evidencia",
    "alternativas": {
      "A": "igualdade automática de exposição aos riscos.",
      "B": "ausência de relação entre território e saúde.",
      "C": "exclusividade de causas individuais.",
      "D": "como desigualdades sociais produzem vulnerabilidades diferenciadas."
    },
    "correta": "D",
    "justificativa": "As condições de moradia e acesso a serviços tornam grupos mais vulneráveis."
  },
  {
    "numero": 48,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "Memória e direitos humanos",
    "referencia": "Patrimônio histórico",
    "enunciado": "A transformação de um antigo local de repressão em espaço de memória e educação tem como finalidade",
    "alternativas": {
      "A": "apagar conflitos do passado.",
      "B": "preservar lembranças e prevenir a repetição de violações.",
      "C": "substituir documentos históricos por ficção.",
      "D": "impedir debates sobre cidadania."
    },
    "correta": "B",
    "justificativa": "Lugares de memória favorecem reflexão sobre violações e direitos."
  },
  {
    "numero": 49,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "Tecnologia e sociedade",
    "referencia": "Algoritmos e informação",
    "enunciado": "Quando uma plataforma recomenda repetidamente conteúdos semelhantes aos que o usuário já consumiu, ela pode",
    "alternativas": {
      "A": "eliminar toda seleção de informações.",
      "B": "garantir contato com todas as perspectivas.",
      "C": "reforçar bolhas informacionais e polarização.",
      "D": "substituir o debate público por dados neutros."
    },
    "correta": "C",
    "justificativa": "Recomendações personalizadas podem restringir a diversidade de pontos de vista."
  },
  {
    "numero": 50,
    "area": "Ciências Humanas e suas Tecnologias",
    "areaCurta": "Ciências Humanas",
    "habilidade": "Direitos territoriais",
    "referencia": "Povos indígenas",
    "enunciado": "A demarcação de terras indígenas é defendida como instrumento de proteção de modos de vida, línguas e vínculos territoriais. Essa defesa se relaciona ao reconhecimento de",
    "alternativas": {
      "A": "direitos coletivos e diversidade cultural.",
      "B": "privilégios individuais sem relação territorial.",
      "C": "eliminação da cidadania indígena.",
      "D": "uso obrigatório de um único idioma."
    },
    "correta": "A",
    "justificativa": "A demarcação protege direitos coletivos e a continuidade cultural de povos indígenas."
  },
  {
    "numero": 51,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Ecologia e clima",
    "referencia": "Efeito estufa",
    "enunciado": "O aumento da concentração de dióxido de carbono na atmosfera intensifica o efeito estufa porque esse gás",
    "alternativas": {
      "A": "reflete toda a luz solar para o espaço.",
      "B": "absorve parte da radiação infravermelha emitida pela superfície.",
      "C": "impede a entrada de oxigênio na atmosfera.",
      "D": "transforma diretamente nitrogênio em calor."
    },
    "correta": "B",
    "justificativa": "O CO₂ absorve radiação infravermelha, contribuindo para a retenção de energia térmica."
  },
  {
    "numero": 52,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Ecologia",
    "referencia": "Bioacumulação",
    "enunciado": "Em uma cadeia alimentar aquática, um pesticida persistente é ingerido por organismos menores e se concentra ao longo dos níveis tróficos. A maior concentração tende a ocorrer",
    "alternativas": {
      "A": "nas algas produtoras, exclusivamente.",
      "B": "na água, antes de qualquer organismo.",
      "C": "em todos os níveis na mesma proporção.",
      "D": "nos predadores do topo da cadeia."
    },
    "correta": "D",
    "justificativa": "Substâncias persistentes podem se biomagnificar até os níveis tróficos superiores."
  },
  {
    "numero": 53,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Imunologia",
    "referencia": "Vacinação",
    "enunciado": "Em uma comunidade com alta cobertura vacinal, até pessoas não vacinadas podem ter menor chance de contato com o agente infeccioso. Isso ocorre porque a vacinação",
    "alternativas": {
      "A": "reduz a circulação do agente entre pessoas suscetíveis.",
      "B": "substitui permanentemente todos os tratamentos.",
      "C": "aumenta a mutação dos vírus.",
      "D": "elimina a necessidade de higiene."
    },
    "correta": "A",
    "justificativa": "A vacinação reduz pessoas suscetíveis e dificulta a transmissão na comunidade."
  },
  {
    "numero": 54,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Biologia celular",
    "referencia": "Fotossíntese",
    "enunciado": "Em um experimento, plantas recebem quantidades crescentes de luz, enquanto temperatura e concentração de CO₂ permanecem constantes. Inicialmente, a taxa de fotossíntese aumenta e depois se estabiliza. A estabilização indica que",
    "alternativas": {
      "A": "a luz deixou de existir.",
      "B": "a planta passou a respirar apenas.",
      "C": "outro fator passou a limitar a taxa do processo.",
      "D": "a clorofila foi transformada em CO₂."
    },
    "correta": "C",
    "justificativa": "Com luz suficiente, outro fator, como CO₂ ou enzimas, passa a limitar a fotossíntese."
  },
  {
    "numero": 55,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Genética",
    "referencia": "Herança recessiva",
    "enunciado": "Um casal sem manifestação de uma doença genética recessiva tem um filho afetado. Considerando apenas esse gene, a explicação mais provável é que",
    "alternativas": {
      "A": "ambos os pais sejam homozigotos dominantes.",
      "B": "ambos os pais sejam heterozigotos portadores.",
      "C": "a doença seja necessariamente dominante.",
      "D": "o filho não tenha recebido genes dos pais."
    },
    "correta": "B",
    "justificativa": "Pais heterozigotos podem transmitir os dois alelos recessivos a um filho."
  },
  {
    "numero": 56,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Fisiologia humana",
    "referencia": "Regulação da água corporal",
    "enunciado": "Após várias horas sem ingerir água, o organismo tende a liberar mais hormônio antidiurético (ADH). Esse aumento favorece",
    "alternativas": {
      "A": "maior perda de água pela urina.",
      "B": "produção de glicose pelos rins.",
      "C": "redução da reabsorção de água.",
      "D": "maior reabsorção de água nos rins."
    },
    "correta": "D",
    "justificativa": "O ADH aumenta a reabsorção de água, ajudando a conservar líquidos."
  },
  {
    "numero": 57,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Bioquímica",
    "referencia": "Enzimas",
    "enunciado": "Uma enzima perde a atividade quando submetida a temperatura muito elevada. Isso pode ocorrer porque o aquecimento",
    "alternativas": {
      "A": "altera a estrutura tridimensional do sítio ativo.",
      "B": "transforma a enzima em DNA.",
      "C": "aumenta indefinidamente a velocidade da reação.",
      "D": "elimina a necessidade de substrato."
    },
    "correta": "A",
    "justificativa": "Temperaturas extremas podem desnaturar a enzima e modificar seu sítio ativo."
  },
  {
    "numero": 58,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Eletroquímica",
    "referencia": "Oxidação",
    "enunciado": "Em uma pilha, uma lâmina de zinco perde massa enquanto fornece elétrons ao circuito. Nessa lâmina ocorre",
    "alternativas": {
      "A": "redução de íons metálicos.",
      "B": "neutralização ácido-base.",
      "C": "oxidação do zinco.",
      "D": "condensação de vapor."
    },
    "correta": "C",
    "justificativa": "Perder elétrons caracteriza oxidação; por isso o zinco metálico se consome."
  },
  {
    "numero": 59,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Química",
    "referencia": "Separação de misturas",
    "enunciado": "Para obter água potável a partir de água salgada em um sistema simples, uma técnica adequada é",
    "alternativas": {
      "A": "filtração em papel.",
      "B": "destilação, com evaporação e condensação da água.",
      "C": "decantação do sal sólido.",
      "D": "peneiração da solução."
    },
    "correta": "B",
    "justificativa": "Na destilação, a água evapora e condensa, separando-se dos sais dissolvidos."
  },
  {
    "numero": 60,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Química ambiental",
    "referencia": "Correção de acidez",
    "enunciado": "Um solo muito ácido pode receber calcário, rico em carbonato de cálcio, para elevar seu pH. Essa prática se explica porque o carbonato atua como",
    "alternativas": {
      "A": "substância básica que neutraliza parte da acidez.",
      "B": "ácido forte que aumenta a concentração de H⁺.",
      "C": "sal inerte sem interação com o solo.",
      "D": "catalisador que produz água sem reagir."
    },
    "correta": "A",
    "justificativa": "O carbonato tem comportamento básico e reduz a acidez do solo."
  },
  {
    "numero": 61,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Química orgânica",
    "referencia": "Combustão",
    "enunciado": "Na combustão completa do etanol, em presença suficiente de oxigênio, os principais produtos são",
    "alternativas": {
      "A": "monóxido de carbono e hidrogênio.",
      "B": "metano e oxigênio.",
      "C": "apenas água líquida.",
      "D": "dióxido de carbono e água."
    },
    "correta": "D",
    "justificativa": "A combustão completa de compostos orgânicos produz CO₂ e H₂O."
  },
  {
    "numero": 62,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Materiais",
    "referencia": "Polímeros",
    "enunciado": "Alguns plásticos podem ser aquecidos, moldados e resfriados repetidas vezes sem alteração química predominante. Esses materiais são classificados como",
    "alternativas": {
      "A": "termoendurecíveis.",
      "B": "termoplásticos.",
      "C": "metais puros.",
      "D": "cerâmicas refratárias."
    },
    "correta": "B",
    "justificativa": "Termoplásticos amolecem com aquecimento e podem ser remodelados."
  },
  {
    "numero": 63,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Eletroquímica",
    "referencia": "Pilhas e corrosão",
    "enunciado": "A ferrugem do ferro é um processo de corrosão em que o metal participa de reações envolvendo perda de elétrons. Logo, o ferro sofre",
    "alternativas": {
      "A": "oxidação.",
      "B": "fusão.",
      "C": "sublimação.",
      "D": "neutralização."
    },
    "correta": "A",
    "justificativa": "A corrosão do ferro envolve sua oxidação, isto é, perda de elétrons."
  },
  {
    "numero": 64,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Física moderna",
    "referencia": "Radioatividade",
    "enunciado": "Em serviços de saúde, materiais radioativos devem ser armazenados em recipientes adequados e manipulados com tempo de exposição reduzido. Essas medidas buscam",
    "alternativas": {
      "A": "aumentar a emissão de radiação.",
      "B": "reduzir a dose de radiação recebida pelas pessoas.",
      "C": "transformar radiação em som.",
      "D": "eliminar a massa dos átomos."
    },
    "correta": "B",
    "justificativa": "Blindagem, distância e menor tempo de exposição reduzem a dose recebida."
  },
  {
    "numero": 65,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Eletricidade",
    "referencia": "Consumo de energia",
    "enunciado": "Um chuveiro de 5,5 kW é usado 20 minutos por dia durante 30 dias. O consumo aproximado de energia, em kWh, é",
    "alternativas": {
      "A": "5,5 kWh.",
      "B": "18,3 kWh.",
      "C": "55 kWh.",
      "D": "165 kWh."
    },
    "correta": "C",
    "justificativa": "5,5 × (20/60) × 30 = 55 kWh."
  },
  {
    "numero": 66,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Termologia",
    "referencia": "Condução térmica",
    "enunciado": "Ao segurar uma colher metálica deixada em uma panela quente, a mão pode sentir calor mesmo sem tocar a chama. O fenômeno principal é",
    "alternativas": {
      "A": "condução de energia térmica pelo metal.",
      "B": "refração da luz no ar.",
      "C": "produção de energia elétrica pela colher.",
      "D": "evaporação do metal."
    },
    "correta": "A",
    "justificativa": "Metais conduzem energia térmica por suas partículas e elétrons livres."
  },
  {
    "numero": 67,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Óptica",
    "referencia": "Lentes corretivas",
    "enunciado": "Uma pessoa míope enxerga objetos próximos com nitidez, mas tem dificuldade para ver objetos distantes. A correção usual utiliza lente",
    "alternativas": {
      "A": "convergente, para aumentar a convergência dos raios.",
      "B": "plana, para não alterar os raios.",
      "C": "cilíndrica, para medir massa.",
      "D": "divergente, para afastar o foco antes de ele atingir a retina."
    },
    "correta": "D",
    "justificativa": "Na miopia, lentes divergentes deslocam o foco para a retina."
  },
  {
    "numero": 68,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Cinemática",
    "referencia": "Velocidade média",
    "enunciado": "Um veículo percorre 180 km em 3 h, mantendo velocidade média constante. Sua velocidade média é",
    "alternativas": {
      "A": "30 km/h.",
      "B": "60 km/h.",
      "C": "90 km/h.",
      "D": "540 km/h."
    },
    "correta": "B",
    "justificativa": "Velocidade média = distância/tempo = 180/3 = 60 km/h."
  },
  {
    "numero": 69,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Eletricidade",
    "referencia": "Lei de Ohm",
    "enunciado": "Um resistor de 6 Ω é ligado a uma fonte de 12 V. A corrente elétrica no resistor vale",
    "alternativas": {
      "A": "2 A.",
      "B": "6 A.",
      "C": "12 A.",
      "D": "72 A."
    },
    "correta": "A",
    "justificativa": "Pela lei de Ohm, I = V/R = 12/6 = 2 A."
  },
  {
    "numero": 70,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Energia",
    "referencia": "Efeito fotovoltaico",
    "enunciado": "Em painéis solares fotovoltaicos, a energia da luz é convertida predominantemente em energia",
    "alternativas": {
      "A": "química armazenada em combustíveis.",
      "B": "nuclear liberada por átomos.",
      "C": "elétrica disponível no circuito.",
      "D": "mecânica do vento."
    },
    "correta": "C",
    "justificativa": "O efeito fotovoltaico transforma energia luminosa em energia elétrica."
  },
  {
    "numero": 71,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Ondulatória",
    "referencia": "Som",
    "enunciado": "Dois sons emitidos por instrumentos diferentes têm a mesma intensidade, mas um é mais agudo que o outro. O som mais agudo possui maior",
    "alternativas": {
      "A": "frequência.",
      "B": "amplitude obrigatoriamente.",
      "C": "velocidade no ar.",
      "D": "comprimento do instrumento, necessariamente."
    },
    "correta": "A",
    "justificativa": "A altura (grave/agudo) do som está associada à frequência."
  },
  {
    "numero": 72,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Hidrostática",
    "referencia": "Pressão em líquidos",
    "enunciado": "Em água de densidade 1000 kg/m³, adotando g = 10 m/s², a pressão adicional a 2 m de profundidade é",
    "alternativas": {
      "A": "2 000 Pa.",
      "B": "20 000 Pa.",
      "C": "50 000 Pa.",
      "D": "200 000 Pa."
    },
    "correta": "B",
    "justificativa": "p = ρgh = 1000 × 10 × 2 = 20 000 Pa."
  },
  {
    "numero": 73,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Propriedades da matéria",
    "referencia": "Densidade",
    "enunciado": "Um objeto de massa 200 g ocupa volume de 250 mL. Como sua densidade é 0,8 g/mL, ele tende a, quando colocado em água de densidade 1,0 g/mL,",
    "alternativas": {
      "A": "afundar rapidamente.",
      "B": "permanecer em qualquer profundidade.",
      "C": "dissolver completamente.",
      "D": "flutuar."
    },
    "correta": "D",
    "justificativa": "Como a densidade do objeto é menor que a da água, ele flutua."
  },
  {
    "numero": 74,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Termologia",
    "referencia": "Dilatação térmica",
    "enunciado": "Juntas de dilatação em pontes e trilhos são instaladas para",
    "alternativas": {
      "A": "permitir variações de comprimento causadas pela temperatura.",
      "B": "impedir toda troca de calor com o ambiente.",
      "C": "aumentar a massa das estruturas.",
      "D": "reduzir a gravidade local."
    },
    "correta": "A",
    "justificativa": "As juntas acomodam dilatação e contração térmicas."
  },
  {
    "numero": 75,
    "area": "Ciências da Natureza e suas Tecnologias",
    "areaCurta": "Ciências da Natureza",
    "habilidade": "Química ambiental",
    "referencia": "Eutrofização",
    "enunciado": "O lançamento excessivo de esgoto rico em nutrientes em lagoas pode favorecer crescimento intenso de algas e reduzir o oxigênio disponível. Esse processo é chamado de",
    "alternativas": {
      "A": "filtração.",
      "B": "eutrofização.",
      "C": "sublimação.",
      "D": "destilação."
    },
    "correta": "B",
    "justificativa": "O excesso de nutrientes provoca proliferação de algas e alterações no oxigênio do ambiente aquático."
  },
  {
    "numero": 76,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Porcentagem",
    "referencia": "Descontos sucessivos",
    "enunciado": "Uma escola adquiriu 240 vouchers de um curso. Em uma campanha, 15% deles serão vendidos com desconto de R$ 30,00 cada. O valor total dos descontos será",
    "alternativas": {
      "A": "R$ 720,00.",
      "B": "R$ 1.080,00.",
      "C": "R$ 2.400,00.",
      "D": "R$ 7.200,00."
    },
    "correta": "B",
    "justificativa": "15% de 240 é 36; 36 × 30 = 1.080."
  },
  {
    "numero": 77,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Média ponderada",
    "referencia": "Avaliação escolar",
    "enunciado": "Uma estudante obteve nota 6 em uma atividade com peso 2 e nota 8 em uma prova com peso 3. Sua média ponderada é",
    "alternativas": {
      "A": "6,8.",
      "B": "7,0.",
      "C": "7,2.",
      "D": "7,5."
    },
    "correta": "C",
    "justificativa": "(6×2 + 8×3)/(2+3) = 36/5 = 7,2."
  },
  {
    "numero": 78,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Grandezas proporcionais",
    "referencia": "Vazão",
    "enunciado": "Uma torneira libera 18 litros de água por minuto. Mantida aberta por 15 minutos, ela libera",
    "alternativas": {
      "A": "270 litros.",
      "B": "120 litros.",
      "C": "33 litros.",
      "D": "3 litros."
    },
    "correta": "A",
    "justificativa": "18 × 15 = 270 litros."
  },
  {
    "numero": 79,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Função afim",
    "referencia": "Modelagem",
    "enunciado": "O custo de uma corrida é dado por C(x) = 2x + 5, em que x é a distância em quilômetros e C é o valor em reais. Para 7 km, o custo será",
    "alternativas": {
      "A": "R$ 12,00.",
      "B": "R$ 14,00.",
      "C": "R$ 17,00.",
      "D": "R$ 19,00."
    },
    "correta": "D",
    "justificativa": "C(7) = 2×7 + 5 = 19."
  },
  {
    "numero": 80,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Porcentagem",
    "referencia": "Desconto simples",
    "enunciado": "Um livro custa R$ 150,00 e entra em promoção com 20% de desconto. O novo preço é",
    "alternativas": {
      "A": "R$ 100,00.",
      "B": "R$ 120,00.",
      "C": "R$ 130,00.",
      "D": "R$ 170,00."
    },
    "correta": "B",
    "justificativa": "20% de 150 é 30; 150 − 30 = 120."
  },
  {
    "numero": 81,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Estatística",
    "referencia": "Mediana",
    "enunciado": "As idades de cinco voluntários são 12, 15, 15, 17 e 21 anos. A mediana dessas idades é",
    "alternativas": {
      "A": "12.",
      "B": "14.",
      "C": "15.",
      "D": "16."
    },
    "correta": "C",
    "justificativa": "Com os dados ordenados, o valor central é 15."
  },
  {
    "numero": 82,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Probabilidade",
    "referencia": "Eventos simples",
    "enunciado": "Uma caixa contém 3 bolas vermelhas, 2 azuis e 5 verdes. Ao retirar uma bola ao acaso, a probabilidade de ela ser vermelha é",
    "alternativas": {
      "A": "3/10.",
      "B": "1/2.",
      "C": "2/5.",
      "D": "5/10."
    },
    "correta": "A",
    "justificativa": "Há 3 bolas vermelhas entre 10 bolas no total."
  },
  {
    "numero": 83,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Geometria espacial",
    "referencia": "Volume de cilindro",
    "enunciado": "Um reservatório cilíndrico tem raio interno de 3 m e altura de 10 m. Usando V = πr²h, seu volume é",
    "alternativas": {
      "A": "30π m³.",
      "B": "60π m³.",
      "C": "80π m³.",
      "D": "90π m³."
    },
    "correta": "D",
    "justificativa": "V = π × 3² × 10 = 90π m³."
  },
  {
    "numero": 84,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Escala",
    "referencia": "Mapas",
    "enunciado": "Em um mapa na escala 1:5 000, uma rua mede 3 cm. O comprimento real aproximado da rua é",
    "alternativas": {
      "A": "15 m.",
      "B": "50 m.",
      "C": "150 m.",
      "D": "1 500 m."
    },
    "correta": "C",
    "justificativa": "3 cm no mapa correspondem a 15 000 cm = 150 m no real."
  },
  {
    "numero": 85,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Geometria plana",
    "referencia": "Área de triângulo",
    "enunciado": "Um canteiro triangular tem base de 18 m e altura de 12 m. Sua área é",
    "alternativas": {
      "A": "54 m².",
      "B": "108 m².",
      "C": "180 m².",
      "D": "216 m²."
    },
    "correta": "B",
    "justificativa": "A = (18×12)/2 = 108 m²."
  },
  {
    "numero": 86,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Álgebra",
    "referencia": "Equação do 1.º grau",
    "enunciado": "A solução da equação 3x + 2 = 20 é",
    "alternativas": {
      "A": "6.",
      "B": "8.",
      "C": "18.",
      "D": "22."
    },
    "correta": "A",
    "justificativa": "3x = 18, portanto x = 6."
  },
  {
    "numero": 87,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Função exponencial",
    "referencia": "Crescimento percentual",
    "enunciado": "Uma aplicação de R$ 800,00 rende 10% ao mês, com juros compostos, durante dois meses. O montante será",
    "alternativas": {
      "A": "R$ 880,00.",
      "B": "R$ 900,00.",
      "C": "R$ 960,00.",
      "D": "R$ 968,00."
    },
    "correta": "D",
    "justificativa": "800 × 1,1² = 800 × 1,21 = 968."
  },
  {
    "numero": 88,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Análise combinatória",
    "referencia": "Formação de duplas",
    "enunciado": "Cinco estudantes se inscreveram para formar uma dupla de apresentação. O número de duplas distintas possíveis é",
    "alternativas": {
      "A": "5.",
      "B": "8.",
      "C": "10.",
      "D": "20."
    },
    "correta": "C",
    "justificativa": "O número de combinações de 5 elementos tomados 2 a 2 é 5×4/2 = 10."
  },
  {
    "numero": 89,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Função afim",
    "referencia": "Variação de temperatura",
    "enunciado": "A temperatura de uma sala era 28 °C e diminuiu 2 °C por hora. Após 6 horas, a temperatura será",
    "alternativas": {
      "A": "10 °C.",
      "B": "16 °C.",
      "C": "20 °C.",
      "D": "26 °C."
    },
    "correta": "B",
    "justificativa": "28 − 2×6 = 16 °C."
  },
  {
    "numero": 90,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Razão e proporção",
    "referencia": "Divisão proporcional",
    "enunciado": "Uma faixa de 50 m será dividida em partes branca e azul na razão 4:6. O comprimento da parte branca será",
    "alternativas": {
      "A": "15 m.",
      "B": "20 m.",
      "C": "25 m.",
      "D": "30 m."
    },
    "correta": "B",
    "justificativa": "A parte branca é 4/(4+6) de 50, isto é, 20 m."
  },
  {
    "numero": 91,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Matemática financeira",
    "referencia": "Consumo de combustível",
    "enunciado": "Um carro percorre 12 km por litro. Em uma viagem de 330 km, com gasolina a R$ 5,80 por litro, o gasto aproximado com combustível será",
    "alternativas": {
      "A": "R$ 137,50.",
      "B": "R$ 159,50.",
      "C": "R$ 191,40.",
      "D": "R$ 275,00."
    },
    "correta": "B",
    "justificativa": "São necessários 330/12 = 27,5 L; 27,5 × 5,80 = 159,50."
  },
  {
    "numero": 92,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Estatística",
    "referencia": "Média aritmética",
    "enunciado": "As vendas diárias de uma pequena feira foram 20, 25, 25 e 30 unidades em quatro dias. A média de unidades vendidas por dia foi",
    "alternativas": {
      "A": "20.",
      "B": "22,5.",
      "C": "24.",
      "D": "25."
    },
    "correta": "D",
    "justificativa": "(20+25+25+30)/4 = 100/4 = 25."
  },
  {
    "numero": 93,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Geometria plana",
    "referencia": "Área de quadrado",
    "enunciado": "Uma placa quadrada possui área de 1,44 m². A medida de seu lado é",
    "alternativas": {
      "A": "0,72 m.",
      "B": "1,20 m.",
      "C": "1,44 m.",
      "D": "2,88 m."
    },
    "correta": "B",
    "justificativa": "O lado é a raiz quadrada de 1,44: 1,2 m."
  },
  {
    "numero": 94,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Geometria espacial",
    "referencia": "Volume de paralelepípedo",
    "enunciado": "Uma caixa retangular mede 2 m de comprimento, 3 m de largura e 5 m de altura. Seu volume é",
    "alternativas": {
      "A": "10 m³.",
      "B": "15 m³.",
      "C": "30 m³.",
      "D": "60 m³."
    },
    "correta": "C",
    "justificativa": "V = 2 × 3 × 5 = 30 m³."
  },
  {
    "numero": 95,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Medidas",
    "referencia": "Conversão de capacidade",
    "enunciado": "Uma jarra contém 2,4 L de suco e serve igualmente 12 copos. Cada copo recebe",
    "alternativas": {
      "A": "200 mL.",
      "B": "240 mL.",
      "C": "288 mL.",
      "D": "2 000 mL."
    },
    "correta": "A",
    "justificativa": "2,4 L = 2 400 mL; 2 400/12 = 200 mL."
  },
  {
    "numero": 96,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Porcentagem",
    "referencia": "Variações sucessivas",
    "enunciado": "Um produto sofre aumento de 10% e, no mês seguinte, desconto de 10% sobre o novo preço. Comparado ao preço inicial, o preço final fica",
    "alternativas": {
      "A": "10% maior.",
      "B": "igual ao inicial.",
      "C": "10% menor.",
      "D": "1% menor."
    },
    "correta": "D",
    "justificativa": "Multiplica-se por 1,10 e depois por 0,90: 0,99 do preço inicial, ou 1% menor."
  },
  {
    "numero": 97,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Sequências",
    "referencia": "Progressão aritmética",
    "enunciado": "Em quatro filas de cadeiras, há respectivamente 12, 14, 16 e 18 lugares. O total de lugares é",
    "alternativas": {
      "A": "48.",
      "B": "60.",
      "C": "64.",
      "D": "72."
    },
    "correta": "B",
    "justificativa": "12 + 14 + 16 + 18 = 60."
  },
  {
    "numero": 98,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Porcentagem",
    "referencia": "Leitura de dados",
    "enunciado": "Em uma turma, 30% dos estudantes estavam ausentes, o que corresponde a 12 estudantes. O total de estudantes da turma é",
    "alternativas": {
      "A": "30.",
      "B": "36.",
      "C": "40.",
      "D": "48."
    },
    "correta": "C",
    "justificativa": "Se 30% = 12, então 100% = 12/0,30 = 40."
  },
  {
    "numero": 99,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Unidades de medida",
    "referencia": "Conversão de comprimento",
    "enunciado": "Uma fita de 0,25 m equivale a",
    "alternativas": {
      "A": "25 cm.",
      "B": "2,5 cm.",
      "C": "250 cm.",
      "D": "2 500 cm."
    },
    "correta": "A",
    "justificativa": "1 m = 100 cm; 0,25 m = 25 cm."
  },
  {
    "numero": 100,
    "area": "Matemática e suas Tecnologias",
    "areaCurta": "Matemática",
    "habilidade": "Probabilidade",
    "referencia": "Lançamento de moedas",
    "enunciado": "Duas moedas equilibradas são lançadas ao mesmo tempo. A probabilidade de sair exatamente uma cara é",
    "alternativas": {
      "A": "1/4.",
      "B": "1/2.",
      "C": "3/4.",
      "D": "1."
    },
    "correta": "B",
    "justificativa": "Os resultados equiprováveis são CC, CK, KC e KK; dois dos quatro têm exatamente uma cara."
  }
];

export const areaSummary = [
  {
    "area": "Linguagens, Códigos e suas Tecnologias",
    "short": "Linguagens",
    "count": 25
  },
  {
    "area": "Ciências Humanas e suas Tecnologias",
    "short": "Ciências Humanas",
    "count": 25
  },
  {
    "area": "Ciências da Natureza e suas Tecnologias",
    "short": "Ciências da Natureza",
    "count": 25
  },
  {
    "area": "Matemática e suas Tecnologias",
    "short": "Matemática",
    "count": 25
  }
];
