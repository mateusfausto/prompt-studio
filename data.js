// Base de dados dos templates de prompt.
// Cada item: id, role (design | dev | po | pm), title, tag (subcategoria curta),
// description (resumo de 1 linha) e prompt (texto completo do template).

const ROLES = {
  design: { label: "Design", icon: "palette", full: "Designers" },
  dev: { label: "Dev", icon: "code", full: "Desenvolvedores" },
  po: { label: "Product Owner", icon: "flag", full: "Product Owners" },
  pm: { label: "Gerência de Projetos", icon: "assignment", full: "Gerentes de Projeto" },
};

const PROMPTS = [
  // ---------------------------------------------------------------- DESIGN
  {
    id: "d1",
    role: "design",
    tag: "Pesquisa",
    title: "Gerar personas a partir de pesquisa",
    description: "Transforma entrevistas e dados brutos em 2-3 personas acionáveis.",
    prompt: `Você é um pesquisador(a) de UX sênior. A partir das notas de pesquisa abaixo, crie de 2 a 3 personas para o produto [NOME DO PRODUTO].

Notas de pesquisa / entrevistas:
[COLE AQUI SUAS NOTAS, TRANSCRIÇÕES OU DADOS DE PESQUISA]

Para cada persona, estruture a resposta em:
1. Nome fictício e frase de identidade (uma citação que resuma sua motivação principal)
2. Contexto: cargo/papel, nível de familiaridade com tecnologia, ambiente de uso
3. Objetivos (o que a pessoa quer alcançar)
4. Frustrações e bloqueios atuais
5. Comportamentos observados nos dados fornecidos (cite trechos das notas quando possível)
6. Oportunidades de design derivadas dessa persona

Regras:
- Baseie-se apenas em padrões que aparecem nas notas fornecidas; não invente dados demográficos irrelevantes.
- Se os dados forem insuficientes para alguma seção, sinalize isso explicitamente em vez de inventar.
- Finalize com uma tabela comparativa das personas por objetivo x frustração.`,
  },
  {
    id: "d2",
    role: "design",
    tag: "Avaliação",
    title: "Auditoria de heurísticas de Nielsen",
    description: "Avalia uma tela ou fluxo aplicando as 10 heurísticas de usabilidade.",
    prompt: `Atue como especialista em usabilidade. Vou descrever uma tela/fluxo do produto [NOME DO PRODUTO] e você deve realizar uma auditoria heurística completa usando as 10 heurísticas de Nielsen.

Descrição da tela ou fluxo (ou cole prints descritos em texto):
[DESCREVA A TELA, OS PASSOS DO FLUXO E O OBJETIVO DO USUÁRIO NESTA TELA]

Para cada uma das 10 heurísticas (visibilidade do status do sistema, correspondência com o mundo real, controle e liberdade do usuário, consistência e padrões, prevenção de erros, reconhecimento em vez de memorização, flexibilidade e eficiência, design estético e minimalista, ajuda a reconhecer/diagnosticar/recuperar de erros, ajuda e documentação):
- Diga se ela é atendida, parcialmente atendida ou violada
- Justifique com base no que foi descrito
- Se violada, atribua severidade de 0 (não é problema) a 4 (catástrofe de usabilidade)
- Sugira uma correção objetiva

Finalize com um ranking das 3 violações mais críticas para corrigir primeiro.`,
  },
  {
    id: "d3",
    role: "design",
    tag: "Fluxo",
    title: "Criar user flow a partir de requisitos",
    description: "Converte requisitos funcionais em um fluxo de telas passo a passo.",
    prompt: `Você é designer de produto. Com base nos requisitos abaixo, desenhe (em texto estruturado, pronto para eu recriar no Figma/FigJam) o user flow completo da funcionalidade [NOME DA FUNCIONALIDADE].

Requisitos funcionais:
[LISTE OS REQUISITOS OU COLE A HISTÓRIA DE USUÁRIO]

Persona principal e objetivo dela: [DESCREVA A PERSONA E O QUE ELA QUER ALCANÇAR]

Estruture a resposta assim:
1. Ponto de entrada (de onde o usuário chega até este fluxo)
2. Sequência numerada de telas/etapas, cada uma com: nome da tela, objetivo da tela, ações disponíveis, e para onde cada ação leva
3. Pontos de decisão/ramificação (condicionais "se X então Y")
4. Estados de exceção: o que acontece em erro, dados vazios, sem permissão, sem conexão
5. Ponto de saída/conclusão do fluxo

Aponte, ao final, qualquer requisito ambíguo que impediu uma decisão de fluxo e pergunte o que for necessário para resolver.`,
  },
  {
    id: "d4",
    role: "design",
    tag: "Redação",
    title: "Microcopy para estados de erro e vazio",
    description: "Escreve textos de interface para erros, vazios e confirmações.",
    prompt: `Atue como UX Writer. Preciso de microcopy para os seguintes estados de interface do produto [NOME DO PRODUTO], cujo tom de voz é: [DESCREVA O TOM DE VOZ DA MARCA, ex: direto, acolhedor, técnico].

Estados que precisam de texto:
[LISTE OS ESTADOS, ex: "erro ao salvar por falta de conexão", "lista de tarefas vazia pela primeira vez", "sucesso ao enviar formulário", "sessão expirada"]

Para cada estado, entregue 2 variações e explique a diferença de abordagem entre elas. Cada texto deve ter:
- Título curto (máx. 6 palavras)
- Corpo (máx. 20 palavras) explicando o que aconteceu em linguagem simples, sem jargão técnico
- Chamada para ação clara (o próximo passo do usuário)

Regras:
- Nunca culpe o usuário pelo erro.
- Erros de sistema devem indicar o que fazer, não apenas o que deu errado.
- Estados vazios devem convidar a uma ação, não apenas informar ausência de dados.
- Mantenha consistência de terminologia entre todos os textos (mesma palavra para a mesma ação em todos os estados).`,
  },
  {
    id: "d5",
    role: "design",
    tag: "Comunicação",
    title: "Justificativa de decisão de design (rationale)",
    description: "Redige a defesa estruturada de uma escolha de design para stakeholders.",
    prompt: `Você é designer de produto preparando uma justificativa de design para apresentar a stakeholders não-designers (ex: liderança, engenharia, vendas).

Decisão de design tomada: [DESCREVA A DECISÃO, ex: "substituir o modal de confirmação por um toast com opção de desfazer"]
Alternativas consideradas: [LISTE OUTRAS OPÇÕES AVALIADAS]
Contexto de negócio/produto: [MÉTRICAS, PRAZOS OU RESTRIÇÕES RELEVANTES]

Escreva um documento curto (formato "design rationale") com:
1. Problema que motivou a decisão (1 parágrafo, sem jargão de UX)
2. As opções consideradas e por que cada uma foi descartada ou aceita, em uma tabela com colunas: Opção | Prós | Contras | Motivo da decisão
3. A decisão final e como ela resolve o problema
4. Riscos conhecidos da decisão escolhida e como serão mitigados ou monitorados
5. Métrica que será usada para validar se a decisão foi acertada

Use linguagem objetiva e evite termos técnicos de design sem explicação, pois o público não é especialista.`,
  },
  {
    id: "d6",
    role: "design",
    tag: "Acessibilidade",
    title: "Checklist de acessibilidade (WCAG) de uma tela",
    description: "Gera um checklist de verificação de acessibilidade aplicado a uma tela específica.",
    prompt: `Atue como especialista em acessibilidade digital (WCAG 2.2, nível AA). Vou descrever uma tela e você deve gerar um checklist de verificação específico para ela, não um checklist genérico.

Descrição da tela e seus componentes (textos, imagens, formulários, botões, cores usadas):
[DESCREVA A TELA EM DETALHES, incluindo componentes interativos e paleta de cores se souber os hex]

Gere o checklist agrupado por categoria (Perceptível, Operável, Compreensível, Robusto), e para cada item relevante à tela descrita:
- Critério da WCAG aplicável (número e nome)
- O que verificar especificamente nesta tela (não genérico)
- Como testar (ex: "usar navegação por Tab", "rodar contraste no componente X")
- Nível de prioridade para correção (Alta/Média/Baixa)

Ignore critérios que claramente não se aplicam ao tipo de tela descrito e diga por quê foram ignorados.`,
  },
  {
    id: "d7",
    role: "design",
    tag: "Pesquisa",
    title: "Roteiro de teste de usabilidade moderado",
    description: "Cria roteiro completo para conduzir um teste de usabilidade com participantes.",
    prompt: `Você é pesquisador(a) de UX. Crie um roteiro completo de teste de usabilidade moderado (presencial ou remoto) para validar [NOME DA FUNCIONALIDADE OU PROTÓTIPO].

Objetivo da pesquisa: [O QUE VOCÊ QUER APRENDER OU VALIDAR]
Perfil dos participantes: [DESCREVA O PERFIL, quantidade de sessões planejadas]
Protótipo/produto disponível: [DESCREVA O QUE OS PARTICIPANTES VERÃO]

Estruture o roteiro com:
1. Introdução para o participante (script de boas-vindas e consentimento, 1 parágrafo)
2. Perguntas de aquecimento (2-3, sobre contexto e hábitos do participante)
3. Tarefas a serem executadas no protótipo, cada uma com: cenário lido ao participante, o que observar durante a tarefa, e uma métrica de sucesso objetiva
4. Perguntas de sondagem para usar após cada tarefa ("think aloud")
5. Perguntas finais de fechamento e escala de satisfação (ex: SUS ou SEQ)
6. Um modelo de tabela para anotar observações por participante e por tarefa

Aponte quais tarefas podem gerar viés na formulação e sugira uma redação neutra.`,
  },
  {
    id: "d8",
    role: "design",
    tag: "Design System",
    title: "Extrair tokens de design a partir de referência visual",
    description: "Converte uma referência visual em uma proposta estruturada de design tokens.",
    prompt: `Atue como designer de sistemas (design systems). A partir da descrição visual abaixo de uma referência (print, site ou identidade visual), proponha um conjunto inicial de design tokens.

Descrição da referência visual (cores observadas, tipografia, espaçamentos, estilo de cantos e sombras):
[DESCREVA A REFERÊNCIA EM DETALHES OU COLE OS VALORES QUE JÁ IDENTIFICOU]

Entregue:
1. Paleta de cores nomeada semanticamente (primary, secondary, surface, on-surface, error, etc.) com valores hex estimados e função de uso de cada uma
2. Escala tipográfica (display, headline, title, body, label) com tamanho, peso e altura de linha sugeridos
3. Escala de espaçamento (ex: 4/8/12/16/24/32px) e onde aplicar cada valor
4. Tokens de forma (raio de borda) e elevação (sombras) com 3 a 4 níveis
5. Nomenclatura sugerida para os tokens em formato JSON, pronta para uso em código (ex: color.primary.default)

Sinalize qualquer suposição feita por falta de informação visual precisa.`,
  },
  {
    id: "d9",
    role: "design",
    tag: "Handoff",
    title: "Handoff de design para desenvolvimento",
    description: "Prepara a especificação completa de uma tela para a engenharia implementar.",
    prompt: `Você é designer de produto preparando o handoff de uma tela para a equipe de engenharia implementar a funcionalidade [NOME DA FUNCIONALIDADE].

Descrição da tela e seus componentes: [DESCREVA A TELA, COMPONENTES, ESTADOS (padrão, hover, foco, desabilitado, erro) E COMPORTAMENTOS]
Design tokens/design system já usados no produto, se houver: [LISTE OU DESCREVA]

Gere a especificação de handoff em Markdown com:
1. Visão geral da tela e o objetivo do usuário nela
2. Lista de componentes usados, indicando quais já existem no design system e quais são novos
3. Especificação de cada estado interativo (padrão, hover, foco, ativo, desabilitado, carregando, erro) e o que muda visualmente em cada um
4. Comportamento responsivo: o que muda entre mobile, tablet e desktop
5. Regras de conteúdo dinâmico (o que acontece com textos muito longos, listas vazias, contadores grandes)
6. Anotações de acessibilidade (ordem de foco, textos alternativos, contraste mínimo)
7. Perguntas em aberto que a engenharia precisa esclarecer antes de implementar

Escreva como se a engenharia não tivesse acesso ao arquivo de design original, apenas a este documento.`,
  },
  {
    id: "d10",
    role: "design",
    tag: "Pesquisa",
    title: "Roteiro de card sorting / tree testing",
    description: "Planeja um estudo de organização de informação (arquitetura da informação).",
    prompt: `Atue como pesquisador(a) de UX especializado em arquitetura da informação. Preciso validar a organização de [NOME DA ÁREA, ex: "menu de navegação", "categorias do catálogo"] usando um estudo de [card sorting ABERTO/FECHADO ou tree testing — escolha um ou peça sugestão].

Itens/categorias que farão parte do estudo: [LISTE OS ITENS OU CATEGORIAS A TESTAR]
Perfil dos participantes e quantidade planejada: [DESCREVA]
Hipótese atual de organização, se houver: [DESCREVA A ESTRUTURA ATUAL OU PROPOSTA]

Entregue:
1. Justificativa de por que esse método (card sorting ou tree testing) é o mais adequado para a pergunta que você quer responder
2. Lista final de itens/categorias a usar no estudo, sinalizando itens ambíguos que podem confundir o participante
3. Instruções a serem lidas para o participante antes do estudo
4. Tarefas específicas (no caso de tree testing) com o "caminho correto" esperado para cada uma
5. Como analisar os resultados (ex: matriz de similaridade, taxa de sucesso por tarefa, tempo até a decisão)
6. Critério de decisão: o que os resultados precisam mostrar para validar ou refutar a estrutura atual`,
  },
  {
    id: "d11",
    role: "design",
    tag: "Pesquisa",
    title: "Benchmark competitivo de UX",
    description: "Compara a experiência do produto com concorrentes em um fluxo específico.",
    prompt: `Você é designer de produto conduzindo um benchmark competitivo de UX. O foco da análise é o fluxo de [NOME DO FLUXO, ex: "checkout", "onboarding", "busca"].

Concorrentes/produtos de referência a analisar: [LISTE OS PRODUTOS, incluindo os que não são concorrentes diretos mas têm um fluxo de referência]
Nosso produto e o que já sabemos sobre os pontos fracos do fluxo atual: [DESCREVA]

Para cada concorrente analisado, estruture:
1. Como o fluxo se inicia (ponto de entrada) e quantos passos até a conclusão
2. Padrões de interação notáveis (o que é diferente do nosso produto)
3. Pontos fortes que valem a pena considerar adotar
4. Pontos fracos que devemos evitar repetir

Ao final, monte uma tabela comparativa (Critério x Concorrente x Nosso produto) para critérios como: número de passos, clareza de progresso, tratamento de erros, e qualquer critério relevante ao fluxo analisado. Finalize com 3 recomendações objetivas para o nosso produto, cada uma justificada pelo que foi observado.`,
  },
  {
    id: "d12",
    role: "design",
    tag: "Fluxo",
    title: "Wireframes de baixa fidelidade a partir de requisitos",
    description: "Descreve wireframes textuais de baixa fidelidade prontos para esboçar.",
    prompt: `Atue como designer de produto na fase inicial de exploração. A partir dos requisitos abaixo, descreva wireframes de baixa fidelidade (em texto estruturado, sem preocupação visual, pronto para eu esboçar rapidamente em papel ou Figma) para a tela/fluxo de [NOME DA FUNCIONALIDADE].

Requisitos e objetivo do usuário: [LISTE OS REQUISITOS E O QUE O USUÁRIO PRECISA CONSEGUIR FAZER]
Restrições de layout (plataforma, tamanho de tela): [DESCREVA]

Para cada tela do fluxo, descreva:
1. Nome da tela e sua função
2. Divisão do layout em blocos (ex: "cabeçalho com título e ação primária", "lista de itens em cards", "rodapé fixo com botão de confirmar")
3. Hierarquia de prioridade dos elementos (o que deve chamar mais atenção primeiro)
4. Conteúdo mínimo necessário em cada bloco (sem se preocupar com texto final, apenas placeholders funcionais)
5. Pontos de interação (o que é clicável/tocável) e para onde levam

Não sugira cores, tipografia ou componentes visuais definitivos — o objetivo desta etapa é validar apenas estrutura e prioridade de conteúdo.`,
  },
  {
    id: "d13",
    role: "design",
    tag: "Pesquisa",
    title: "Pesquisa de satisfação pós-lançamento (CSAT/NPS)",
    description: "Cria um questionário de satisfação para medir a recepção de uma feature.",
    prompt: `Você é pesquisador(a) de UX criando uma pesquisa de satisfação para medir a recepção da feature [NOME DA FEATURE], recém-lançada.

Objetivo da medição: [ex: "validar se a feature resolveu o problema original", "comparar satisfação antes/depois"]
Onde a pesquisa será exibida (in-app, e-mail, etc.) e limite de tempo de resposta desejado: [DESCREVA]

Monte a pesquisa com:
1. Métrica principal escolhida (CSAT, NPS ou CES — Customer Effort Score) e por que ela é a mais adequada para este objetivo
2. A pergunta quantitativa principal, redigida de forma neutra (sem induzir resposta positiva)
3. Uma pergunta aberta de acompanhamento para capturar o "porquê" da nota dada
4. Critério de segmentação da resposta (ex: perguntar só a quem usou a feature ao menos uma vez)
5. Como calcular e interpretar o resultado (ex: fórmula do NPS, faixas de referência)
6. Um plano simples de como os resultados serão cruzados com dados de uso (ex: notas baixas x abandono da feature)

Mantenha o texto da pesquisa curto o bastante para ser respondido em menos de 30 segundos.`,
  },
  {
    id: "d14",
    role: "design",
    tag: "Fluxo",
    title: "Storyboard de onboarding de novos usuários",
    description: "Desenha a narrativa de primeiro uso do produto, passo a passo.",
    prompt: `Atue como designer de produto criando o storyboard do onboarding (primeira experiência) do produto [NOME DO PRODUTO] para o perfil de usuário [DESCREVA A PERSONA, ex: "usuário sem experiência prévia com ferramentas similares"].

Objetivo do onboarding (o que o usuário precisa entender/fazer para chegar ao "momento aha"): [DESCREVA]
Restrições (tempo médio que o usuário tolera antes de abandonar, número máximo de passos desejado): [DESCREVA]

Monte o storyboard com:
1. Cena de abertura: o estado emocional e a expectativa do usuário ao abrir o produto pela primeira vez
2. Sequência numerada de passos do onboarding, cada um com: o que é mostrado, a ação esperada do usuário, e o objetivo pedagógico daquele passo específico
3. O "momento aha" identificado claramente: em qual passo o usuário percebe o valor do produto
4. Pontos de possível abandono (onde o usuário pode desistir) e uma estratégia para reduzir esse risco em cada um
5. O que acontece após o onboarding (a primeira tela "real" que o usuário vê)

Evite sobrecarregar o onboarding com explicações de funcionalidades que não são essenciais para o primeiro sucesso do usuário.`,
  },
  {
    id: "d15",
    role: "design",
    tag: "Avaliação",
    title: "Design QA — consistência visual entre telas",
    description: "Audita um conjunto de telas já implementadas em busca de inconsistências.",
    prompt: `Você é designer responsável por Design QA (garantia de qualidade visual) antes do lançamento. Vou descrever um conjunto de telas já implementadas do produto [NOME DO PRODUTO] e você deve apontar inconsistências em relação ao design original e ao design system.

Descrição das telas implementadas (ou liste divergências que você já notou ao comparar com o design original): [DESCREVA AS TELAS E QUALQUER DIFERENÇA JÁ PERCEBIDA]
Padrões do design system que devem ser seguidos (cores, tipografia, espaçamento, componentes): [DESCREVA OU COLE OS TOKENS]

Organize a auditoria em uma tabela: Tela | Elemento | O que foi implementado | O que deveria ser (segundo o design/design system) | Severidade (Crítico/Médio/Cosmético)

Considere inconsistências de: cores fora da paleta, espaçamentos incorretos, tipografia com tamanho/peso errado, componentes reimplementados em vez de reutilizados, e estados (hover/foco/erro) ausentes ou diferentes do especificado.

Finalize com uma lista priorizada do que deve ser corrigido antes do lançamento versus o que pode ser tratado como débito visual posterior.`,
  },
  {
    id: "d16",
    role: "design",
    tag: "Redação",
    title: "Copy para landing page",
    description: "Escreve a estrutura e os textos de uma página de vendas/apresentação de produto.",
    prompt: `Atue como UX Writer/copywriter de produto. Escreva o copy completo de uma landing page para [NOME DO PRODUTO/FEATURE], direcionada ao público [DESCREVA O PÚBLICO-ALVO].

Principal benefício/proposta de valor: [DESCREVA EM 1-2 FRASES]
Principais funcionalidades ou diferenciais a destacar: [LISTE]
Objeção mais comum que o público tem antes de se converter: [DESCREVA, SE SOUBER]
Ação que a página deve gerar (CTA principal): [ex: "iniciar teste grátis", "agendar demonstração"]

Estruture o copy por seção, na ordem em que aparecerão na página:
1. Headline principal (máx. 12 palavras) e subheadline de apoio (máx. 20 palavras)
2. 3 blocos de benefícios (não apenas funcionalidades), cada um com um título curto e uma frase de apoio
3. Uma seção de prova social genérica (ex: "onde inserir depoimentos/números", sem inventar dados ou citações reais)
4. Seção de tratamento da objeção principal
5. CTA final, com o texto do botão e uma frase de reforço acima dele

Use linguagem orientada a benefício (o que o usuário ganha), não apenas a funcionalidades, e evite superlativos genéricos sem sustentação (ex: "o melhor do mercado").`,
  },
  {
    id: "d17",
    role: "design",
    tag: "Comunicação",
    title: "Roteiro de workshop de co-criação (design sprint)",
    description: "Planeja uma dinâmica colaborativa para gerar e priorizar ideias com o time.",
    prompt: `Você é designer facilitando um workshop de co-criação para gerar soluções para o problema: [DESCREVA O PROBLEMA/DESAFIO A SER EXPLORADO].

Participantes (papéis, não nomes) e tempo total disponível: [DESCREVA, ex: "1 PO, 2 devs, 1 designer, 3h"]
Contexto que os participantes já têm sobre o problema: [DESCREVA O QUE JÁ FOI COMPARTILHADO ANTES DO WORKSHOP]

Monte o roteiro com:
1. Objetivo claro do workshop (o que precisa existir ao final: uma decisão, um conjunto de ideias priorizadas, um protótipo conceitual)
2. Agenda com blocos de tempo (ex: alinhamento do problema, geração individual de ideias — "crazy 8s" ou similar, compartilhamento, votação, refinamento da ideia vencedora)
3. Para cada bloco: a instrução exata a ser lida ao grupo e o tempo alocado
4. Método de votação/priorização das ideias geradas (ex: dot voting) e como lidar com empates
5. Formato do output final e quem fica responsável por documentá-lo
6. Riscos comuns de facilitação (ex: uma pessoa dominar a discussão) e como mitigá-los`,
  },
  {
    id: "d18",
    role: "design",
    tag: "Design System",
    title: "Especificação de motion/animação de uma interação",
    description: "Detalha o comportamento de uma animação de interface para implementação.",
    prompt: `Atue como designer de interação especificando o motion design de [NOME DA INTERAÇÃO, ex: "abertura de um modal", "transição entre abas", "feedback de like em um botão"].

Contexto de uso e o que a animação deve comunicar (ex: continuidade espacial, feedback de sucesso, hierarquia de atenção): [DESCREVA]
Restrições técnicas conhecidas (framework/biblioteca de animação disponível, requisitos de performance): [DESCREVA, SE HOUVER]

Entregue a especificação com:
1. Objetivo da animação em uma frase (o "porquê", não só o "o quê")
2. Propriedades animadas (posição, opacidade, escala, cor) e seus valores de início e fim
3. Duração sugerida em milissegundos e curva de easing (ex: ease-out, spring) com justificativa de por que essa curva serve ao objetivo
4. Sequenciamento, se houver múltiplos elementos animando (o que anima primeiro, o que segue, com que atraso)
5. Comportamento em "prefers-reduced-motion" (o que muda para usuários que preferem menos movimento)
6. Critério para saber se a animação está "rápida demais" ou "lenta demais" ao testar`,
  },
  {
    id: "d19",
    role: "design",
    tag: "Acessibilidade",
    title: "Revisão de design para internacionalização/localização",
    description: "Avalia se um layout suporta tradução para outros idiomas sem quebrar.",
    prompt: `Você é designer revisando se a tela [NOME DA TELA] suporta internacionalização (i18n) para os idiomas [LISTE OS IDIOMAS ALVO, ex: "inglês, espanhol, alemão, árabe"].

Descrição da tela, com os textos atuais e o espaço disponível para cada um: [DESCREVA A TELA E OS TEXTOS-CHAVE]

Avalie e reporte:
1. Textos com risco de expansão (idiomas como alemão costumam ser 20-35% mais longos que o português/inglês): quais elementos podem quebrar layout ou truncar de forma ruim
2. Se algum idioma alvo é RTL (da direita para a esquerda, ex: árabe/hebraico) e o que precisaria ser espelhado no layout (ordem de elementos, ícones direcionais, alinhamento)
3. Elementos visuais que dependem de cultura e podem não traduzir bem (ícones, cores com significado cultural específico, formatos de data/número/moeda)
4. Textos concatenados dinamicamente no código (ex: "Você tem " + count + " itens") que podem gerar frases gramaticalmente erradas em outros idiomas
5. Recomendações objetivas de ajuste de layout para acomodar a variação de tamanho de texto entre idiomas`,
  },
  {
    id: "d20",
    role: "design",
    tag: "Avaliação",
    title: "Proposta de variantes para teste A/B de UI",
    description: "Estrutura hipóteses e variantes visuais para validar uma mudança de interface.",
    prompt: `Atue como designer de produto propondo um teste A/B para validar uma mudança de interface em [NOME DA TELA/ELEMENTO].

Problema ou oportunidade que motiva o teste: [DESCREVA]
Métrica que se espera impactar: [DESCREVA A MÉTRICA, ex: "taxa de conclusão do checkout"]
Restrições de tráfego/tempo disponível para rodar o teste: [DESCREVA, SE SOUBER]

Entregue:
1. Hipótese do teste no formato "Se mudarmos [X], então [métrica] vai [aumentar/diminuir], porque [racional baseado em princípio de UX ou dado existente]"
2. Descrição da variante de controle (A) e de 1 a 2 variantes de teste (B/C), cada uma com o que muda especificamente na interface
3. Métrica primária de sucesso e ao menos uma métrica de guarda (guardrail) para garantir que a mudança não piora outra parte da experiência
4. Critério de significância/tamanho de amostra necessário, em termos conceituais (não é preciso calcular o número exato, mas explicar o raciocínio)
5. Risco de viés de novidade (o usuário reagir apenas por ser diferente) e como diferenciar isso de um ganho real
6. Critério de decisão: o que os resultados precisam mostrar para adotar a variante vencedora definitivamente`,
  },

    {
    id: "d21",
    role: "design",
    tag: "Pesquisa",
    title: "Guia de entrevistas de desk research",
    description: "Estrutura um guia para levantamento de dados secundários e pesquisa de mesa.",
    prompt: `Você é um(a) pesquisador(a) de UX sênior. Crie um guia de Desk Research (Pesquisa de Mesa) estruturado para investigar o tema: [DESCREVA O TEMA OU MERCADO A INVESTIGAR].

Objetivo da investigação: [O QUE VOCÊ PRECISA ENTENDER, ex: comportamentos de usuários de aplicativos de entrega, concorrentes diretos]
Fontes de informação disponíveis ou sugeridas: [LISTE FONTES, ex: relatórios de mercado, reclamações no Reclame Aqui, avaliações na App Store]

Estruture o guia de desk research em:
1. Questões de pesquisa principais (3 a 5 perguntas que norteiam o estudo)
2. Matriz de fontes e objetivos (tabela relacionando o que procurar em cada fonte)
3. Protocolo de coleta de dados (como registrar os achados, categorizar por tags e evitar viés de confirmação)
4. Template de síntese de descobertas (estrutura para consolidar aprendizados: Tendências de Comportamento, Dores Comuns, Soluções de Concorrentes)
5. Próximos passos (como traduzir os aprendizados do desk research em insumos para a pesquisa qualitativa primária)

Evite inventar fatos ou dados estatísticos; foque em como a pesquisa deve ser conduzida estruturadamente.`,
  },
  {
    id: "d22",
    role: "design",
    tag: "Fluxo",
    title: "Mapeamento de arquitetura de informação e sitemap",
    description: "Cria a árvore de navegação e taxonomia de pastas/telas do produto.",
    prompt: `Você é designer de produto especializado em arquitetura da informação. Com base no escopo do produto [NOME DO PRODUTO] descrito abaixo, projete o sitemap e a estrutura de navegação do sistema.

Descrição do produto e principais funcionalidades:
[DESCREVA AS FUNCIONALIDADES E SEÇÕES DO PRODUTO]

Público-alvo principal: [DESCREVA O PÚBLICO]

Entregue:
1. Árvore hierárquica do sitemap (Menu Principal, submenus e telas internas estruturadas em marcadores indentados)
2. Taxonomia sugerida (nomes dos botões, menus e categorias principais de forma clara e intuitiva para o usuário, evitando jargões técnicos)
3. Regras de navegação globais (ex: comportamento da barra lateral ou barra de navegação no desktop e no mobile)
4. Mapeamento de relacionamentos cruzados (como o usuário transita rapidamente de uma seção complexa para outra sem precisar voltar ao início)
5. Próximos passos sugeridos para testar essa arquitetura com usuários (ex: roteiro rápido de teste de card sorting fechado)`,
  },
  {
    id: "d23",
    role: "design",
    tag: "Redação",
    title: "Redação de e-mails transacionais de produto",
    description: "Escreve o copy de e-mails automáticos como boas-vindas e reset de senha.",
    prompt: `Atue como UX Writer. Crie o copy completo dos seguintes e-mails transacionais para o produto [NOME DO PRODUTO], cujo tom de voz é [TON DE VOZ DA MARCA].

E-mails a serem redigidos:
[LISTE OS E-MAILS, ex: "Boas-vindas após cadastro", "Confirmação de alteração de senha", "Alerta de segurança por login em dispositivo novo"]

Para cada e-mail, entregue:
1. Linha de assunto atraente e curta (máx. 8 palavras)
2. Texto de pré-cabeçalho (preheader)
3. Corpo do e-mail estruturado (com indicação clara de onde colocar placeholders dinâmicos, ex: [NOME])
4. Chamada para Ação (texto do botão principal)
5. Texto de rodapé (informações de suporte e opção de cancelamento de alertas, se aplicável)

Regras:
- Mantenha a redação focada no benefício e na segurança do usuário.
- O texto deve ser conciso e fácil de ler rapidamente no mobile.
- Use gatilhos que guiem o usuário ao próximo passo natural no produto.`,
  },
  {
    id: "d24",
    role: "design",
    tag: "Design System",
    title: "Definição de estados de componentes complexos",
    description: "Detalha comportamentos de componentes interativos como Autocomplete e Combobox.",
    prompt: `Você é designer de interação trabalhando no design system de um produto. Descreva o comportamento e os estados interativos detalhados para o componente [NOME DO COMPONENTE, ex: Autocomplete / Combobox / Datepicker].

Contexto e restrições de uso: [DESCREVA O COMPONENTE E ONDE ELE É USADO]

Gere a especificação técnica dos seguintes estados do componente:
1. Default (estado padrão inicial)
2. Hover (cursor do mouse sobre o elemento)
3. Focus (foco de navegação por teclado ou clique)
4. Active/Selected (quando uma opção foi escolhida ou o campo está ativo)
5. Loading (processando dados assíncronos)
6. Disabled (desabilitado)
7. Error (validação inválida)

Para cada estado, detalhe:
- Mudanças visuais sugeridas (bordas, cores de fundo, sombras, ícones)
- Comportamento de foco de teclado (teclas Tab, ArrowUp/Down, Enter, Esc, Space)
- Regras de acessibilidade WAI-ARIA sugeridas (ex: role, aria-expanded, aria-controls)`,
  },
  {
    id: "d25",
    role: "design",
    tag: "Pesquisa",
    title: "Roteiro de teste de usabilidade não-moderado",
    description: "Estrutura as instruções e perguntas para testes assíncronos em plataformas.",
    prompt: `Atue como pesquisador(a) de UX. Crie um roteiro de teste de usabilidade não-moderado (assíncrono, para plataformas como Maze, Useberry ou Loop11) para validar o fluxo de [NOME DO FLUXO/TELA].

Objetivo do teste: [O QUE VOCÊ DESEJA VALIDAR]
Protótipo disponível (descreva a interface): [DESCREVA O PROTÓTIPO]

Estruture o roteiro com:
1. Mensagem inicial de instruções e calibração de expectativas (o que o usuário deve saber antes de iniciar o teste no próprio ritmo)
2. Tarefa 1 (Cenário situacional + instrução de ação curta e clara)
3. Perguntas de acompanhamento da Tarefa 1 (ex: escala de esforço Single Subjective Difficulty ou pergunta de múltipla escolha sobre clareza)
4. Tarefa 2 (Cenário e instrução)
5. Perguntas de acompanhamento da Tarefa 2
6. Questionário pós-teste curto (3 a 5 perguntas de opinião, como sentimentos de facilidade, utilidade e intenção de uso)

Mantenha as tarefas escritas de forma a não induzir o caminho correto (ex: use "encontre uma forma de entrar em contato" em vez de "clique no menu suporte e depois no botão chat").`,
  },
  {
    id: "d26",
    role: "design",
    tag: "Avaliação",
    title: "Avaliação de carga cognitiva em interfaces complexas",
    description: "Analisa uma tela complexa e sugere reduções de esforço mental para o usuário.",
    prompt: `Atue como designer de produto especialista em psicologia cognitiva aplicada a interfaces. Analise a tela complexa do produto [NOME DO PRODUTO] com base nos princípios de carga cognitiva (carga intrínseca, extrínseca e germânica).

Descrição da tela, elementos de UI e dados exibidos:
[DESCREVA A TELA, QUANTIDADE DE BOTÕES, ENTRADAS, GRÁFICOS E TABELAS]

Objetivo principal do usuário nesta tela: [O QUE O USUÁRIO QUER FAZER]

Forneça um relatório contendo:
1. Diagnóstico de carga extrínseca (quais elementos visuais causam distração ou ruído desnecessário)
2. Avaliação de memória de trabalho (a tela exige que o usuário guarde informações de passos anteriores? Como isso pode ser mitigado?)
3. Aplicação das Leis da Gestalt (proximidade, semelhança, fechamento, continuidade) para avaliar o agrupamento dos dados
4. Plano de simplificação progressiva (passo a passo para reduzir o ruído visual, mantendo as funcionalidades essenciais por meio de accordion, abas ou revelação progressiva)
5. Proposta visual antes/depois descrita em blocos estruturados`,
  },
  {
    id: "d27",
    role: "design",
    tag: "Comunicação",
    title: "Apresentação para Design Critique (Design Crit)",
    description: "Estrutura a apresentação e os focos de feedback para uma sessão com outros designers.",
    prompt: `Você é designer de produto preparando uma sessão de Design Critique (Design Crit) para apresentar uma solução em andamento e coletar feedback útil de outros designers e stakeholders.

Solução de design desenvolvida: [DESCREVA O FLUXO OU TELA, ex: novo fluxo de pagamento]
Histórico e dores que motivaram essa solução: [DESCREVA O CONTEXTO]
Dúvidas ou pontos onde você deseja focar a crítica: [LISTE, ex: legibilidade do extrato, clareza das opções de parcelamento]

Monte a estrutura da sua apresentação com:
1. Declaração do problema (o que estamos resolvendo, para quem e quais dados sustentam isso)
2. Restrições do projeto (limitações técnicas, prazos ou regras de negócio consideradas no design)
3. Apresentação das alternativas descartadas e o motivo do descarte
4. Apresentação da solução proposta (passo a passo do fluxo principal)
5. Questões direcionadoras de feedback (diga explicitamente aos participantes que tipo de crítica ajudará e quais tópicos estão fora de escopo no momento)
6. Estrutura de anotação de feedback sugerida (uma tabela com colunas: Crítica/Observação | Sugestão | Ação Futura)`,
  },
  {
    id: "d28",
    role: "design",
    tag: "Design System",
    title: "Guia de contribuição e governança de Design System",
    description: "Cria o fluxo para designers e devs proporem novos componentes ao sistema.",
    prompt: `Atue como designer de sistemas (Design System Product Manager). Desenhe o fluxo de governança e processo de contribuição de novos componentes e padrões no Design System do produto [NOME DO PRODUTO].

Contexto do time (tamanho da equipe de produto, ferramentas utilizadas): [DESCREVA, ex: 3 times de produto, usando Figma e React]

Crie um guia estruturado contendo:
1. Árvore de decisão de contribuição (fluxograma textual respondendo a perguntas como: "Isso já existe?", "É um componente global ou específico?", "Precisa de novas variantes?")
2. Processo de submissão passo a passo (como propor um novo componente: documentação necessária, design de estados no Figma, validação de acessibilidade)
3. Papéis e responsabilidades na governança (quem revisa, quem desenvolve no código, quem aprova e publica no npm/Figma library)
4. SLA de revisão e feedback das propostas
5. Modelo de solicitação de novo componente (checklist do que o proponente precisa entregar)`,
  },
  {
    id: "d29",
    role: "design",
    tag: "Acessibilidade",
    title: "Especificação de leitor de tela (Screen Reader Specs)",
    description: "Gera a lista de aria-labels, roles e ordem de navegação por voz de uma tela.",
    prompt: `Você é especialista em acessibilidade digital. Crie a especificação de leitura de tela e interação por áudio para a tela descrita abaixo, visando o correto funcionamento para usuários de leitores de tela (ex: NVDA, JAWS, VoiceOver).

Descrição da tela e elementos interativos:
[DESCREVA A TELA, SEUS BOTÕES, CAMPOS DE ENTRADA, IMAGENS E ESTRUTURA DE TEXTO]

Entregue a especificação em tabela com as seguintes colunas:
Elemento Visual | Ordem de Foco (Tab Index) | Role W3C/ARIA sugerido | aria-label / Texto falado pelo leitor | Estado inicial e dinâmico anunciado (ex: "expandido", "selecionado") | Atalho/Interação de Teclado associada

Inclua orientações adicionais de:
1. Gerenciamento de alertas em tempo real (aria-live region) se houver atualizações assíncronas
2. Tratamento de imagens decorativas versus imagens informativas
3. Ordem lógica de leitura sequencial (evitando que o leitor de tela leia o rodapé antes da barra de navegação principal)`,
  },
  {
    id: "d30",
    role: "design",
    tag: "Fluxo",
    title: "Design de dashboard e visualização de dados",
    description: "Planeja a disposição de gráficos, filtros e cartões de dados para decisões rápidas.",
    prompt: `Atue como designer de produto especialista em visualização de dados e dashboards. Crie o wireframe e a arquitetura de informação detalhada de um dashboard para [NOME DO PRODUTO OU PERFIL DO USUÁRIO, ex: gerentes de logística, investidores pessoa física].

Métricas e dados críticos que o usuário precisa acompanhar:
[LISTE AS MÉTRICAS PRINCIPAIS E OS DADOS RELEVANTES]

Ações mais comuns que o usuário toma a partir desse painel: [LISTE AS AÇÕES, ex: filtrar por data, exportar PDF, pausar operação]

Gere a especificação do painel estruturada em:
1. Hierarquia visual de leitura (F-pattern ou Z-pattern aplicado, indicando o que o usuário deve ver no primeiro quadrante superior esquerdo até a base)
2. Divisão do layout em blocos funcionais (ex: cabeçalho de filtros, linha de KPIs rápidos, gráficos de tendência principal, tabela de detalhes)
3. Escolha do tipo de visualização ideal para cada dado (ex: gráfico de linha para séries temporais, barra para comparações, donut para proporções) e a justificativa das escolhas
4. Estados dinâmicos do dashboard (comportamento sob carregamento, sem dados de filtros selecionados, erro de busca e paginação de tabelas)
5. Layout adaptativo para telas menores (mobile responsive)`,
  },
  {
    id: "d31",
    role: "design",
    tag: "Pesquisa",
    title: "Análise de heatmap e gravação de sessões",
    description: "Interpreta dados qualitativos do Hotjar/Clarity e propõe melhorias.",
    prompt: `Você é pesquisador(a) de UX sênior analisando dados de uso real de uma tela por meio de gravações de sessões e mapas de calor (click/scroll maps).

Objetivo da tela analisada: [O QUE A TELA FAZ, ex: checkout do e-commerce]
Observações coletadas nos heatmaps/gravações:
[DESCREVA OS ACHADOS, ex: "muitos cliques em elementos não-clicáveis", "usuários rolam até 40% da página e desistem", "rage clicks no botão de enviar cupom"]

Estruture um relatório técnico de análise de comportamento contendo:
1. Identificação de atritos (por que os problemas relatados acontecem? ex: ilusão de final de página, lentidão de validação, problemas de contraste)
2. Impacto de conversão ou usabilidade (classifique cada dor em severidade de usabilidade)
3. Propostas de redesign de componentes (ajustes visuais simples e mudanças estruturais de fluxo baseadas nas observações)
4. Plano de testes rápidos (como validar se as correções surtiram efeito)
5. Tabela comparativa: Problema Observado | Causa Provável | Solução Recomendada`,
  },
  {
    id: "d32",
    role: "design",
    tag: "Redação",
    title: "Criação de guia rápido de tom e voz",
    description: "Define regras práticas de escrita e comunicação para designers do time.",
    prompt: `Atue como UX Writer sênior. Crie um guia prático de tom e voz para a redação de telas e comunicação de produto da marca/plataforma [NOME DO PRODUTO].

Identidade e valores centrais da marca: [DESCREVA A PERSONALIDADE DA MARCA, ex: tecnológica, acolhedora, precisa]
Exemplos de termos comuns no produto hoje: [LISTE ALGUNS TERMOS]

Estruture o guia em:
1. Diretrizes de personalidade do tom (ex: "Somos prestativos, mas não invasivos; somos técnicos, mas explicamos os termos")
2. Tabela de dimensões de tom (engraçado vs. sério, formal vs. casual, respeitoso vs. irreverente, entusiasmado vs. direto, com exemplos práticos)
3. Regras de pontuação, capitalização e formatação (ex: uso de caixa alta em botões, exclamações, uso de negritos)
4. Exemplos "Antes vs. Depois" aplicados a mensagens de erro, telas vazias e alertas de segurança
5. Dicionário de termos recomendados e termos a evitar (ex: usar "Excluir" em vez de "Deletar", "Entrar" em vez de "Logar")`,
  },
  {
    id: "d33",
    role: "design",
    tag: "Avaliação",
    title: "Auditoria de Dark Patterns (Padrões Deceptivos)",
    description: "Varre o fluxo em busca de truques que induzem o usuário a escolhas indesejada.",
    prompt: `Você é especialista em ética em design e UX/UI. Faça uma auditoria ética de interface em busca de "dark patterns" (padrões deceptivos/manipulativos) no fluxo de [NOME DO FLUXO, ex: cancelamento de assinatura, assinatura de serviço recorrente].

Descrição detalhada de como funciona o fluxo atual (telas, textos dos botões, marcações automáticas, cores):
[DESCREVA O FLUXO]

Analise a interface contra os padrões deceptivos conhecidos (ex: Roach Motel, Confirmshaming, Sneak into Basket, Hidden Costs, Forced Action):
1. Identificação de padrões deceptivos presentes no fluxo (indique quais telas/componentes cometem violações éticas)
2. Justificativa do risco para a reputação da marca e fidelidade do cliente no longo prazo
3. Propostas de redesign ético (como alcançar o mesmo objetivo de negócio de forma honesta, respeitando o controle e a transparência do usuário)
4. Comparativo visual/textual antes (manipulativo) vs. depois (ético) para as telas avaliadas`,
  },
  {
    id: "d34",
    role: "design",
    tag: "Fluxo",
    title: "Fluxo de cancelamento e retenção (Cancel Flow)",
    description: "Desenha a jornada e os diálogos para reter clientes que tentam cancelar.",
    prompt: `Você é designer de produto focado em métricas de retenção e experiência de cliente (CX). Desenhe o fluxo completo de cancelamento do produto [NOME DO PRODUTO] com o objetivo de ouvir o cliente, oferecer alternativas úteis para retê-lo e, caso ele insista, tornar a saída limpa e amigável.

Motivo principal de cancelamento dos clientes (se souber): [DESCREVA OS MOTIVOS COMUNS, ex: preço alto, falta de uso]
Alternativas de retenção que a empresa pode oferecer (ex: pausar assinatura por 3 meses, desconto temporário, trocar por plano menor): [LISTE AS OPÇÕES DISPONÍVEIS]

Gere a especificação do fluxo contendo:
1. Sequência lógica de telas do fluxo de cancelamento (do clique inicial em "cancelar" até a tela de confirmação de sucesso)
2. Pesquisa rápida de saída (perguntas curtas para entender a causa da saída do usuário)
3. Oferta de retenção inteligente (como e quando propor as alternativas com base no motivo selecionado na pesquisa, de forma contextual)
4. Copy de cada diálogo e botões, garantindo que o usuário entenda o que perderá ao cancelar sem usar de manipulação (confirmshaming)
5. Instruções claras sobre o estado financeiro pós-cancelamento (ex: "Seu acesso continuará ativo até o dia XX/XX")`,
  },
  {
    id: "d35",
    role: "design",
    tag: "Design System",
    title: "Especificação de modal acessível WCAG AA",
    description: "Especifica comportamentos de teclado e foco para caixas de diálogo modais.",
    prompt: `Atue como designer de interação focado em acessibilidade web. Crie a especificação de comportamento de foco e navegação de teclado para o componente "Modal Dialog" (caixa de diálogo sobreposta), atendendo aos critérios da WCAG 2.2 no nível AA.

Estruture a especificação em:
1. Comportamento ao abrir o modal (onde colocar o foco inicial, comportamento do fundo da página - inert/aria-hidden)
2. Armadilha de foco (Focus Trap): como garantir que o foco do teclado (Tab / Shift+Tab) permaneça estritamente dentro do modal enquanto ele estiver aberto, sem vazar para a página atrás dele
3. Comportamento ao fechar o modal (como fechar via tecla Esc, clique no overlay de fundo e botão de fechar, e para onde o foco de teclado deve retornar na página principal)
4. Marcações ARIA necessárias para o HTML do modal (role="dialog", aria-modal="true", aria-labelledby, aria-describedby)
5. Comportamento responsivo (redimensionamento do modal para mobile, tratamento de rolagem interna se o conteúdo do modal for maior que a tela)`,
  },
  {
    id: "d36",
    role: "design",
    tag: "Pesquisa",
    title: "Roteiro e análise de Teste dos 5 Segundos",
    description: "Mede a primeira impressão e compreensão de uma nova interface pelo usuário.",
    prompt: `Você é pesquisador(a) de UX. Desenhe o plano, roteiro e método de análise de um Teste dos 5 Segundos (5-Second Test) para avaliar a clareza e o impacto da nova tela [NOME DA TELA, ex: home de investimentos, dashboard financeiro].

Objetivo da tela: [O QUE O USUÁRIO DEVE COMPREENDER IMEDIATAMENTE]
Imagem ou descrição da interface: [DESCREVA A TELA VISUALMENTE]

Entregue:
1. Introdução de calibragem para o participante do teste
2. Pergunta de aquecimento inicial
3. As 3 perguntas que serão feitas após a exposição de 5 segundos da tela (ex: "Qual o tema principal desta tela?", "O que você pode fazer nesta página?", "Qual marca ou produto estava visível?")
4. Tabela modelo para consolidação dos resultados quantitativos e qualitativos da compreensão da marca e do valor do produto
5. Critério de validação do teste: qual percentual de respostas corretas ou próximas define que o design cumpriu o papel de clareza imediata`,
  },
  {
    id: "d37",
    role: "design",
    tag: "Comunicação",
    title: "Protótipo em texto para validação conceitual rápida",
    description: "Descreve um protótipo conceitual para validar ideias sem desenhar telas.",
    prompt: `Atue como designer de produto especializado em design enxuto (Lean UX). Escreva um "protótipo em texto" detalhado para validar o conceito de [NOME DA FEATURE OU IDEIA] com usuários reais, sem a necessidade de gastar tempo criando layouts visuais.

Problema a ser validado: [DESCREVA O PROBLEMA DO USUÁRIO]
Como a feature idealizada resolve o problema: [DESCREVA O CONCEITO]

Gere um roteiro que descreva a jornada do protótipo conceitual em blocos de texto interativos, onde cada bloco simula uma etapa que eu lerei ou enviarei para o usuário em um chat/entrevista:
1. Ponto de contato inicial (simulando uma notificação ou banner no produto)
2. Descrição funcional do passo 1 (explicando o que o usuário vê e quais opções de escolha ele tem em texto)
3. Descrição funcional do passo 2 (o que o sistema retorna após a escolha)
4. Descrição funcional da conclusão (resultado final do uso)
5. Questões estruturadas para fazer ao usuário após ele "vivenciar" este protótipo textual (ex: "Como você imaginou essa tela?", "O que você esperava que acontecesse no passo X?")`,
  },
  {
    id: "d38",
    role: "design",
    tag: "Acessibilidade",
    title: "Checklist de contraste de cores para gráficos",
    description: "Garante que dados visuais sejam legíveis para pessoas com daltonismo ou baixa visão.",
    prompt: `Você é especialista em design acessível e visualização de dados. Crie um checklist de verificação de contraste e legibilidade cromática aplicado a um conjunto de gráficos estatísticos do produto [NOME DO PRODUTO].

Paleta de cores atual sugerida para os gráficos (indique os valores Hex se houver):
[LISTE AS CORES, ex: vermelho #FF0000, verde #00FF00, azul #0000FF]

Tipos de gráficos utilizados: [ex: gráfico de pizza com 5 categorias, gráfico de barras empilhadas]

Entregue um checklist de conformidade contendo:
1. Análise de contraste mínimo da relação de cores adjacentes em gráficos de dados (atendendo ao critério WCAG 1.4.11 de contraste de elementos não-textuais, com mínimo de 3:1)
2. Diretrizes de legibilidade para daltonismo (Protanopia, Deuteranopia, Tritanopia), indicando o uso complementar de texturas, padrões de linhas, rótulos textuais diretos e bordas delimitadoras para separar as fatias/barras
3. Tabela com simulação de leitura: Cor A (Hex) x Cor B (Hex) | Contraste Calculado/Estimado | Passa/Não Passa (3:1) | Ação de correção recomendada se falhar
4. Critérios de fontes e tipografia em legendas e eixos de gráficos (contraste mínimo de 4.5:1 para textos pequenos)`,
  },
  {
    id: "d39",
    role: "design",
    tag: "Fluxo",
    title: "Fluxo de login e verificação com 2FA",
    description: "Desenha a autenticação segura do usuário com etapas de segundo fator de forma amigável.",
    prompt: `Atue como designer de produto especializado em segurança e usabilidade. Desenhe o user flow e a especificação detalhada de telas para o fluxo de cadastro e login com segundo fator de autenticação (2FA/MFA) por [SMS, E-mail ou App Autenticador].

Contexto do produto e nível de familiaridade técnica do usuário: [DESCREVA O PRODUTO E O USUÁRIO]

Gere a especificação do fluxo contendo:
1. Etapa de configuração do 2FA (onboarding de segurança: explicação simples do benefício, escolha do canal, envio do código e digitação do código)
2. Etapa de login recorrente com 2FA (tela de senha seguida de tela de digitação do código de segurança com opção de "confiar neste dispositivo por 30 dias")
3. Estados de erro e exceções detalhados (código expirado, código incorreto, erro de envio, "não recebi o código", perda total do dispositivo de autenticação)
4. Copy de todos os textos informativos e botões do fluxo, mantendo o tom seguro e livre de atritos
5. Recomendações de acessibilidade para a entrada de dados (ex: uso de campo numérico otimizado no teclado mobile, leitura do código de segurança de uma vez por leitores de tela)`,
  },
  {
    id: "d40",
    role: "design",
    tag: "Pesquisa",
    title: "Roteiro de grupo focal virtual",
    description: "Planeja uma discussão em grupo online para explorar necessidades e percepções.",
    prompt: `Você é pesquisador(a) de UX. Desenhe um roteiro detalhado para facilitação de um grupo focal virtual de [DURAÇÃO] minutos, reunindo de 5 a 8 participantes do perfil [DESCREVA O PERFIL DOS PARTICIPANTES] para debater o tema: [DESCREVA O TEMA DO GRUPO FOCAL].

Objetivo da dinâmica: [O QUE A EQUIPE DE PRODUTO PRECISA COLETAR DE INSIGHTS]

Estruture o roteiro em:
1. Planejamento pré-sessão (regras de recrutamento, termos de consentimento, ferramenta a usar e papel do co-facilitador)
2. Bloco de introdução e quebra-gelo (10% do tempo: explicação das regras de convivência, garantia de que não há resposta errada)
3. Bloco de tópicos principais (60% do tempo: perguntas abertas divididas por blocos temáticos, com indicação de perguntas de sondagem para o facilitador mediar em caso de silêncio do grupo)
4. Dinâmica interativa curta (20% do tempo: atividade em quadro colaborativo em texto, ex: ordenar dores mais prioritárias)
5. Bloco de fechamento e agradecimentos (10% do tempo)
6. Dicas de mediação (como lidar com participantes monopolizadores e como incentivar a participação dos mais quietos)`,
  },

// -------------------------------------------------------------------- DEV
  {
    id: "e1",
    role: "dev",
    tag: "Qualidade",
    title: "Revisão de código estruturada",
    description: "Faz code review completo com foco em legibilidade, riscos e testes.",
    prompt: `Atue como um(a) engenheiro(a) sênior fazendo code review. Revise o código abaixo, escrito em [LINGUAGEM/FRAMEWORK], que implementa: [DESCREVA O QUE O CÓDIGO FAZ].

Código:
[COLE O DIFF OU O TRECHO DE CÓDIGO]

Contexto adicional (convenções do time, restrições de performance, se houver): [CONTEXTO]

Organize o review em:
1. Resumo geral (aprovaria, aprovaria com ressalvas, ou pediria mudanças — e por quê)
2. Problemas bloqueantes (bugs, falhas de segurança, quebra de contrato de API), com trecho citado e sugestão de correção
3. Melhorias não-bloqueantes (legibilidade, nomes, duplicação, complexidade)
4. Cobertura de testes: cenários que parecem não estar cobertos
5. Perguntas para o autor sobre decisões que não ficaram claras

Seja direto e específico, citando a linha ou trecho relevante. Não reescreva o arquivo inteiro, apenas os trechos necessários.`,
  },
  {
    id: "e2",
    role: "dev",
    tag: "Testes",
    title: "Plano de testes unitários para uma função/módulo",
    description: "Gera casos de teste (felizes, de borda e de erro) para uma função.",
    prompt: `Você é engenheiro(a) de qualidade de software. Gere um plano de testes unitários para a função/módulo abaixo, escrita em [LINGUAGEM] usando [FRAMEWORK DE TESTES, ex: Jest, PyTest, JUnit].

Código da função/módulo:
[COLE O CÓDIGO]

Regras de negócio relevantes que a função deve respeitar: [DESCREVA, SE HOUVER]

Entregue:
1. Lista de casos de teste organizados em: caminho feliz, casos de borda (valores limites, vazios, nulos), e casos de erro/exceção
2. Para cada caso: entrada, saída esperada e o motivo do caso ser relevante
3. Identificação de dependências externas que precisarão de mock/stub
4. O código dos testes já implementado no framework indicado, com nomes de teste descritivos
5. Uma nota sobre qualquer ambiguidade nas regras de negócio que impediu definir o resultado esperado de algum caso`,
  },
  {
    id: "e3",
    role: "dev",
    tag: "Documentação",
    title: "Documentação técnica de endpoint de API",
    description: "Gera documentação completa de um endpoint no padrão OpenAPI/Markdown.",
    prompt: `Atue como engenheiro(a) responsável pela documentação técnica. Documente o endpoint abaixo da API [NOME DO SERVIÇO].

Detalhes do endpoint (método, rota, parâmetros, corpo de requisição, código-fonte do handler se disponível):
[COLE OS DETALHES OU O CÓDIGO DO ENDPOINT]

Gere a documentação em Markdown com:
1. Resumo de uma linha do que o endpoint faz
2. Método e rota completa
3. Parâmetros de path, query e headers, em tabela (nome, tipo, obrigatório, descrição)
4. Corpo da requisição (schema com tipos e exemplo em JSON)
5. Respostas possíveis com códigos de status, schema e exemplo de cada uma (sucesso e principais erros)
6. Regras de autenticação/autorização necessárias
7. Um exemplo de chamada via cURL

Se algum comportamento (ex: rate limit, paginação, idempotência) não estiver claro no código fornecido, marque como "[A CONFIRMAR]" em vez de presumir.`,
  },
  {
    id: "e4",
    role: "dev",
    tag: "Depuração",
    title: "Diagnóstico de bug a partir de stack trace",
    description: "Investiga a causa raiz de um erro a partir de logs e stack trace.",
    prompt: `Você é engenheiro(a) especialista em depuração. Ajude-me a encontrar a causa raiz do erro abaixo.

Stack trace / log de erro:
[COLE O STACK TRACE OU LOG COMPLETO]

Código relevante (arquivo(s) envolvido(s)):
[COLE O(S) TRECHO(S) DE CÓDIGO RELACIONADOS AO ERRO]

O que eu esperava que acontecesse: [DESCREVA O COMPORTAMENTO ESPERADO]
O que está acontecendo de fato: [DESCREVA O COMPORTAMENTO OBSERVADO]
Passos para reproduzir, se souber: [DESCREVA]

Estruture sua resposta em:
1. Hipóteses ordenadas da mais para a menos provável, com o raciocínio de cada uma baseado no stack trace e no código
2. Para a hipótese mais provável, explique exatamente qual linha/trecho causa o problema e por quê
3. Correção proposta (trecho de código, não o arquivo inteiro)
4. Sugestão de teste que comprovaria a correção
5. Se faltar informação para confirmar a causa raiz, liste exatamente quais logs/dados adicionais eu deveria coletar`,
  },
  {
    id: "e5",
    role: "dev",
    tag: "Refatoração",
    title: "Refatoração segura de código legado",
    description: "Planeja uma refatoração incremental sem quebrar o comportamento existente.",
    prompt: `Atue como engenheiro(a) sênior especializado em código legado. Preciso refatorar o código abaixo sem alterar seu comportamento externo observável.

Código atual (linguagem: [LINGUAGEM]):
[COLE O CÓDIGO]

Motivo da refatoração: [ex: "reduzir complexidade ciclomática", "remover duplicação", "preparar para nova feature X"]
Cobertura de testes existente hoje: [DESCREVA, ex: "nenhuma", "parcial nos casos felizes"]

Entregue:
1. Lista dos "code smells" identificados, cada um citando o trecho específico
2. Um plano de refatoração em passos pequenos e seguros, na ordem em que devem ser aplicados, explicando por que essa ordem minimiza risco
3. Para cada passo, quais testes (existentes ou novos) garantiriam que o comportamento não mudou
4. O código já refatorado, passo a passo (não apenas o resultado final de uma vez)
5. Riscos remanescentes que a refatoração não elimina e que merecem atenção manual`,
  },
  {
    id: "e6",
    role: "dev",
    tag: "Arquitetura",
    title: "RFC / ADR de nova feature",
    description: "Redige um documento de decisão de arquitetura (ADR/RFC) para uma nova feature.",
    prompt: `Você é engenheiro(a) de software redigindo um ADR (Architecture Decision Record) / RFC técnico para revisão do time.

Feature ou mudança proposta: [DESCREVA A FEATURE/MUDANÇA]
Contexto do sistema atual: [DESCREVA A ARQUITETURA/STACK EXISTENTE RELEVANTE]
Restrições (prazo, custo, compatibilidade, equipe): [LISTE AS RESTRIÇÕES]

Estruture o documento em:
1. Título e status (proposto/em revisão)
2. Contexto e problema a ser resolvido
3. Opções consideradas (no mínimo 2, incluindo "não fazer nada"), cada uma com: descrição, prós, contras e impacto de custo/complexidade
4. Decisão recomendada e justificativa objetiva
5. Consequências: o que fica mais fácil, o que fica mais difícil, débito técnico assumido conscientemente
6. Plano de migração/rollout, incluindo rollback caso algo dê errado
7. Perguntas em aberto para os revisores decidirem

Mantenha linguagem técnica precisa e evite recomendar uma tecnologia só por popularidade; justifique com os requisitos apresentados.`,
  },
  {
    id: "e7",
    role: "dev",
    tag: "Colaboração",
    title: "Mensagem de commit e descrição de PR",
    description: "Gera commit no padrão convencional e descrição de pull request completa.",
    prompt: `Atue como engenheiro(a) revisando meu próprio trabalho antes de abrir um pull request. Com base no diff abaixo, gere a mensagem de commit e a descrição do PR.

Diff das alterações:
[COLE O DIFF OU RESUMO DAS ALTERAÇÕES]

Ticket/issue relacionado: [NÚMERO/LINK, SE HOUVER]
Tipo de mudança: [feature / fix / refactor / chore / docs]

Gere:
1. Mensagem de commit no padrão Conventional Commits (tipo(escopo): descrição curta no imperativo, seguida de corpo explicando o "porquê" quando necessário)
2. Descrição de PR em Markdown com as seções: **O que mudou**, **Por que**, **Como testar** (passos reproduzíveis), **Riscos/impacto** e **Checklist** (ex: testes adicionados, documentação atualizada, sem breaking changes ou breaking changes sinalizado)
3. Uma sugestão de título de PR curto e descritivo

Não invente funcionalidades que não estejam evidentes no diff fornecido.`,
  },
  {
    id: "e8",
    role: "dev",
    tag: "Performance",
    title: "Análise de gargalos de performance",
    description: "Investiga lentidão em um trecho de código ou consulta a partir de evidências.",
    prompt: `Você é engenheiro(a) especialista em performance. Analise o problema de lentidão descrito abaixo.

Código, query ou trecho suspeito:
[COLE O CÓDIGO, QUERY SQL, OU DESCRIÇÃO DO FLUXO]

Evidências de performance (tempos medidos, resultado de profiling, plano de execução da query, volume de dados):
[COLE OS DADOS DISPONÍVEIS]

Ambiente relevante (banco de dados, infraestrutura, escala de tráfego): [DESCREVA]

Estruture a resposta em:
1. Hipóteses de causa do gargalo, ordenadas por probabilidade, cada uma referenciando a evidência que a sustenta
2. Para a hipótese principal, explicação técnica de por que ela causa lentidão neste contexto específico
3. Recomendações de otimização, cada uma com o ganho esperado e o trade-off envolvido (ex: mais memória, mais complexidade, cache desatualizado)
4. Como validar a melhoria depois de aplicada (métrica e método de medição)
5. Se os dados fornecidos forem insuficientes para confirmar a causa, liste exatamente quais métricas ou logs adicionais coletar antes de otimizar às cegas`,
  },
  {
    id: "e9",
    role: "dev",
    tag: "Banco de dados",
    title: "Plano de migração de schema de banco de dados",
    description: "Planeja uma migração de banco de dados segura e reversível.",
    prompt: `Você é engenheiro(a) responsável pela camada de dados. Planeje a migração de schema abaixo para o banco [TIPO DE BANCO, ex: PostgreSQL, MySQL, MongoDB].

Mudança necessária: [DESCREVA, ex: "adicionar coluna obrigatória", "dividir uma tabela em duas", "renomear uma coleção"]
Schema atual relevante: [COLE O SCHEMA OU DESCRIÇÃO DAS TABELAS/COLEÇÕES ENVOLVIDAS]
Volume de dados e restrição de downtime aceitável: [DESCREVA, ex: "10M de linhas, zero downtime permitido"]

Entregue:
1. Passos da migração em ordem seguro, considerando compatibilidade com o código antigo durante o deploy (ex: expand/contract pattern)
2. Script de migração (linguagem/ferramenta: [FERRAMENTA, ex: Flyway, Prisma Migrate, Alembic]), incluindo o script de rollback
3. Estratégia para lidar com dados já existentes que não atendem à nova regra (ex: valores nulos numa coluna que ficará obrigatória)
4. Plano de validação pós-migração (como confirmar que os dados estão íntegros)
5. Sinalização explícita de qualquer etapa que exija bloqueio de tabela/coleção e o impacto esperado em produção`,
  },
  {
    id: "e10",
    role: "dev",
    tag: "Segurança",
    title: "Threat modeling de uma feature",
    description: "Identifica riscos de segurança de uma nova funcionalidade antes de implementar.",
    prompt: `Atue como engenheiro(a) de segurança de aplicações realizando threat modeling (modelagem de ameaças) da feature [NOME DA FEATURE], usando como referência as categorias do STRIDE (Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege).

Descrição técnica da feature (fluxo de dados, quem acessa, onde os dados são armazenados): [DESCREVA]
Dados sensíveis envolvidos, se houver: [DESCREVA, ex: "dados de pagamento", "dados de saúde", "nenhum dado sensível"]

Para cada categoria do STRIDE que se aplica a esta feature:
1. Descreva um cenário de ataque concreto e plausível, específico para esta feature (não genérico)
2. Avalie a probabilidade e o impacto (Baixo/Médio/Alto)
3. Proponha uma mitigação técnica específica

Ao final, entregue:
- Uma lista priorizada das 3 ameaças mais críticas a tratar antes do lançamento
- Perguntas que precisam ser respondidas pelo time antes de considerar a feature segura para produção`,
  },
  {
    id: "e11",
    role: "dev",
    tag: "DevOps",
    title: "Configuração de pipeline de CI/CD",
    description: "Desenha um pipeline de integração e entrega contínua para um projeto.",
    prompt: `Você é engenheiro(a) de DevOps configurando o pipeline de CI/CD do projeto [NOME DO PROJETO], usando [FERRAMENTA, ex: GitHub Actions, GitLab CI, Jenkins].

Stack do projeto: [LINGUAGEM, FRAMEWORK, GERENCIADOR DE PACOTES]
Ambientes existentes (dev, staging, produção) e forma de deploy de cada um: [DESCREVA]
Requisitos específicos (ex: rodar testes, lint, build de imagem Docker, aprovação manual antes de produção): [LISTE]

Entregue:
1. Diagrama textual dos estágios do pipeline, na ordem de execução (ex: lint → testes unitários → build → testes de integração → deploy staging → aprovação manual → deploy produção)
2. O arquivo de configuração completo do pipeline na ferramenta indicada, com comentários explicando cada estágio
3. Estratégia de cache de dependências para acelerar o pipeline
4. Como lidar com secrets/variáveis sensíveis de forma segura
5. Critério de rollback automático em caso de falha no deploy
6. Sugestão de gatilhos (quais branches/eventos disparam quais estágios)`,
  },
  {
    id: "e12",
    role: "dev",
    tag: "Testes",
    title: "Testes de integração e end-to-end",
    description: "Planeja e implementa testes que cobrem múltiplos componentes/sistema completo.",
    prompt: `Atue como engenheiro(a) de qualidade. Preciso de um plano e implementação de testes de integração/end-to-end para o fluxo [NOME DO FLUXO, ex: "login e checkout completo"], usando [FERRAMENTA, ex: Playwright, Cypress, Selenium, Postman/Newman para APIs].

Descrição do fluxo e sistemas envolvidos (frontend, backend, serviços externos): [DESCREVA]
Ambiente de teste disponível (URLs, dados de teste, usuários de teste): [DESCREVA]

Entregue:
1. Lista dos cenários que devem ser cobertos por teste end-to-end (apenas os caminhos críticos de negócio, não duplicando o que já é coberto por testes unitários)
2. Estratégia de dados de teste (como garantir que o teste seja repetível sem depender de estado deixado por execuções anteriores)
3. Código dos testes na ferramenta indicada, incluindo setup e teardown
4. Como lidar com dependências externas instáveis (ex: mock de serviço de pagamento em ambiente de teste)
5. Critério para rodar esses testes no pipeline de CI (em toda PR, ou só antes de deploy em produção) e justificativa do tempo de execução esperado`,
  },
  {
    id: "e13",
    role: "dev",
    tag: "Depuração",
    title: "Diagnóstico de vazamento de memória",
    description: "Investiga crescimento anormal de uso de memória em uma aplicação.",
    prompt: `Você é engenheiro(a) especialista em performance investigando um possível vazamento de memória na aplicação [NOME DA APLICAÇÃO], escrita em [LINGUAGEM/RUNTIME].

Sintomas observados (crescimento de memória ao longo do tempo, frequência de restart/OOM, ambiente onde ocorre): [DESCREVA]
Dados de profiling disponíveis (heap dump, snapshot de memória, gráfico de uso ao longo do tempo): [COLE OU DESCREVA O QUE TEM DISPONÍVEL]
Trechos de código suspeitos, se houver: [COLE, SE HOUVER]

Estruture a investigação em:
1. Hipóteses de causa comuns para a linguagem/runtime informado (ex: listeners não removidos, closures retendo referências, cache sem limite, conexões não fechadas), avaliando quais são plausíveis dado o que foi descrito
2. Para a hipótese mais provável, explique o mecanismo técnico exato de como a memória está sendo retida
3. Como confirmar a hipótese com uma ferramenta de profiling específica (nomeie a ferramenta adequada à linguagem)
4. Correção proposta, com o trecho de código ajustado
5. Como validar que o vazamento foi resolvido (o que observar após a correção em produção/staging)
6. Se os dados fornecidos forem insuficientes, liste exatamente qual profiling adicional coletar`,
  },
  {
    id: "e14",
    role: "dev",
    tag: "Banco de dados",
    title: "Design de schema de banco de dados relacional",
    description: "Modela as tabelas e relacionamentos para uma nova funcionalidade.",
    prompt: `Atue como engenheiro(a) de banco de dados desenhando o schema relacional para suportar a funcionalidade [NOME DA FUNCIONALIDADE].

Requisitos funcionais e regras de negócio relevantes: [DESCREVA O QUE PRECISA SER ARMAZENADO E AS REGRAS, ex: "um pedido pode ter vários itens", "um usuário pode ter vários endereços, um marcado como padrão"]
Volume esperado de dados e padrões de consulta mais frequentes: [DESCREVA, ex: "leitura intensa por usuário, poucas escritas"]
Banco de dados alvo: [ex: PostgreSQL, MySQL]

Entregue:
1. As tabelas propostas, cada uma com colunas, tipos de dado e restrições (chave primária, chaves estrangeiras, not null, unique, valores padrão)
2. Diagrama textual dos relacionamentos entre as tabelas (1:1, 1:N, N:N) e as tabelas de junção necessárias
3. Índices recomendados, com justificativa baseada nos padrões de consulta informados
4. Script SQL de criação (DDL) completo
5. Trade-offs de normalização feitos conscientemente (ex: onde optou-se por desnormalizar por performance) e por quê
6. Perguntas em aberto sobre regras de negócio que impediram uma modelagem mais precisa`,
  },
  {
    id: "e15",
    role: "dev",
    tag: "Arquitetura",
    title: "Estratégia de feature flag e rollout gradual",
    description: "Planeja o lançamento controlado de uma funcionalidade usando feature flags.",
    prompt: `Você é engenheiro(a) planejando o rollout da feature [NOME DA FEATURE] usando feature flags, na ferramenta [FERRAMENTA, ex: LaunchDarkly, Unleash, flag caseiro no banco de dados].

Nível de risco da feature (impacto se algo der errado): [DESCREVA]
Segmentos de usuário disponíveis para rollout gradual (ex: internos, beta testers, % aleatório, por região): [DESCREVA]

Entregue:
1. Estrutura da flag (nome, tipo — booleana, percentual, ou multivariante — e valores possíveis)
2. Plano de rollout em estágios, com critério objetivo para avançar de um estágio para o próximo (ex: "sem aumento de taxa de erro em 24h com 5% dos usuários")
3. Métricas de guarda (guardrail) a monitorar durante o rollout, e o limiar que dispararia um rollback
4. Plano de rollback (como desativar a flag rapidamente e o que acontece com usuários que já usaram a feature)
5. Estratégia de limpeza da flag após o rollout completo (evitar acúmulo de "flag debt" no código)
6. Riscos de manter múltiplas flags ativas simultaneamente que possam interagir entre si`,
  },
  {
    id: "e16",
    role: "dev",
    tag: "Colaboração",
    title: "Onboarding técnico de novo(a) desenvolvedor(a)",
    description: "Cria um guia de primeiros dias para um novo membro do time entender o repositório.",
    prompt: `Atue como engenheiro(a) sênior responsável por integrar um(a) novo(a) desenvolvedor(a) ao time. Crie um guia de onboarding técnico para o repositório/projeto [NOME DO PROJETO].

Stack e arquitetura geral do projeto: [DESCREVA A STACK, PRINCIPAIS PASTAS/MÓDULOS E COMO ELES SE RELACIONAM]
Ferramentas e acessos necessários (ex: banco de dados local, variáveis de ambiente, contas de serviço): [LISTE]
Convenções do time (padrão de commits, processo de PR, ferramentas de qualidade): [DESCREVA]

Gere o guia em Markdown com:
1. Visão geral da arquitetura em 1 parágrafo (o "mapa mental" antes de mergulhar no código)
2. Passo a passo para rodar o projeto localmente, do zero, incluindo troubleshooting dos erros mais comuns nesse setup
3. Estrutura de pastas explicada, indicando onde ficam as partes mais importantes do código
4. Convenções de código e processo de contribuição (como abrir um PR, quem revisa, o que é bloqueante)
5. Uma primeira tarefa sugerida de baixo risco para a pessoa se familiarizar com o fluxo de ponta a ponta (código → PR → deploy)
6. Uma lista de "perguntas frequentes de quem chega" com respostas objetivas`,
  },
  {
    id: "e17",
    role: "dev",
    tag: "Performance",
    title: "Plano de teste de carga/estresse",
    description: "Planeja um teste de carga para validar a capacidade de um serviço.",
    prompt: `Você é engenheiro(a) de performance planejando um teste de carga para o serviço/endpoint [NOME DO SERVIÇO OU ENDPOINT], usando a ferramenta [FERRAMENTA, ex: k6, JMeter, Locust].

Capacidade que se quer validar (ex: "suportar 500 requisições/segundo", "aguentar o pico do Black Friday"): [DESCREVA A META]
Infraestrutura atual e comportamento esperado sob carga normal: [DESCREVA]

Entregue:
1. Tipos de teste recomendados para este objetivo (ex: teste de carga constante, teste de pico/spike, teste de resistência/soak) e por que cada um é relevante aqui
2. Cenário de teste detalhado: quais endpoints/fluxos serão exercitados, em qual proporção, e com quais dados
3. Script de teste na ferramenta indicada, com os parâmetros de carga (usuários virtuais, duração, rampa de subida)
4. Métricas a observar durante o teste (latência p50/p95/p99, taxa de erro, uso de CPU/memória) e os limiares que definiriam falha
5. Riscos de rodar o teste (ex: impacto em serviços compartilhados, custo de infraestrutura) e como mitigá-los
6. Como interpretar o resultado final e decidir se a capacidade-alvo foi atingida`,
  },
  {
    id: "e18",
    role: "dev",
    tag: "Segurança",
    title: "Auditoria de dependências e vulnerabilidades",
    description: "Revisa as dependências de um projeto em busca de vulnerabilidades conhecidas.",
    prompt: `Atue como engenheiro(a) de segurança revisando as dependências do projeto [NOME DO PROJETO], que usa [LINGUAGEM/GERENCIADOR DE PACOTES, ex: npm, pip, Maven].

Lista de dependências e versões (ou cole o arquivo de manifesto, ex: package.json, requirements.txt): [COLE A LISTA]
Resultado de alguma ferramenta de scan já rodada, se houver (ex: npm audit, Snyk, Dependabot): [COLE, SE HOUVER]

Entregue:
1. Triagem das vulnerabilidades relatadas por severidade (Crítica/Alta/Média/Baixa), citando a dependência e a versão afetada
2. Para cada vulnerabilidade crítica ou alta, explique o vetor de ataque em termos simples (como ela poderia ser explorada neste projeto especificamente)
3. Recomendação de correção (atualizar para qual versão, ou mitigação temporária se não houver correção disponível ainda)
4. Dependências desatualizadas mas sem vulnerabilidade conhecida, que merecem atualização preventiva
5. Sugestão de processo contínuo para evitar acúmulo de dependências vulneráveis (ex: scan automático no CI, política de atualização periódica)

Não presuma que uma vulnerabilidade é inofensiva só por ter severidade baixa reportada; avalie o contexto de uso da dependência no projeto.`,
  },
  {
    id: "e19",
    role: "dev",
    tag: "Arquitetura",
    title: "Revisão de design de contrato de API",
    description: "Avalia o design de uma API antes da implementação, focando em consistência e evolução.",
    prompt: `Você é engenheiro(a) sênior revisando o design de uma API antes de ela ser implementada. Avalie o contrato proposto abaixo para o recurso [NOME DO RECURSO].

Contrato proposto (rotas, verbos HTTP, formato de request/response, ou especificação OpenAPI): [COLE O CONTRATO PROPOSTO]
Padrões de API já usados em outras partes do sistema, se houver: [DESCREVA, PARA AVALIAR CONSISTÊNCIA]

Revise e aponte:
1. Aderência a convenções REST (uso correto de verbos e status HTTP, nomenclatura de recursos no plural, hierarquia de rotas)
2. Consistência com os padrões já existentes no sistema (nomenclatura de campos, formato de datas, paginação, tratamento de erros)
3. Capacidade de evolução: o contrato permite adicionar campos/funcionalidades no futuro sem quebrar clientes existentes?
4. Casos de erro não cobertos no contrato proposto (ex: recurso não encontrado, conflito, validação)
5. Riscos de sobre-exposição de dados (campos retornados que talvez não devessem ser públicos)
6. Sugestão de contrato revisado, apenas nos pontos que precisam mudar`,
  },
  {
    id: "e20",
    role: "dev",
    tag: "Observabilidade",
    title: "Plano de observabilidade de um serviço",
    description: "Define logs, métricas e alertas necessários para operar um serviço em produção.",
    prompt: `Atue como engenheiro(a) de confiabilidade (SRE) definindo o plano de observabilidade do serviço [NOME DO SERVIÇO], que roda em [INFRAESTRUTURA/STACK].

Funções críticas do serviço (o que ele faz e por que sua falha importa): [DESCREVA]
Ferramentas de observabilidade já disponíveis no time (ex: Datadog, Grafana/Prometheus, CloudWatch): [DESCREVA]

Entregue:
1. Métricas essenciais a expor (os "quatro sinais de ouro": latência, tráfego, erros, saturação), especificando o que cada uma significa para este serviço em particular
2. Logs estruturados necessários, indicando quais eventos devem ser logados (nível: info/warn/error) e quais campos cada log deve conter para ser útil na investigação
3. Alertas recomendados, cada um com: condição de disparo, severidade, e para onde o alerta deve ir (ex: canal de time vs. plantão)
4. Um SLO (objetivo de nível de serviço) sugerido para a métrica mais crítica, com justificativa do valor escolhido
5. O que um painel (dashboard) inicial deste serviço deveria mostrar, priorizando o que ajuda a diagnosticar um incidente rapidamente
6. O que evitar: ruído de alertas que não são acionáveis (alert fatigue)`,
  },

    {
    id: "e21",
    role: "dev",
    tag: "Banco de dados",
    title: "Query SQL otimizada e análise de plano de execução",
    description: "Identifica gargalos em queries SQL analisando o plano de execução (EXPLAIN).",
    prompt: `Você é engenheiro(a) de banco de dados especialista em performance de SQL. Analise a query abaixo e ajude-me a otimizá-la a partir do plano de execução (EXPLAIN) fornecido.

Query atual:
[COLE A QUERY SQL]

Plano de execução / Output de EXPLAIN (se disponível):
[COLE O EXPLAIN / EXPLAIN ANALYZE OU COMENTE O SINTOMA, ex: Table scan na tabela de usuários]

Schema das tabelas envolvidas e índices existentes:
[DESCREVA AS TABELAS, TIPOS DE COLUNAS E ÍNDICES CRIADOS]

Entregue:
1. Diagnóstico do gargalo (ex: index scan ausente, hash join custoso, ordenação em disco - filesort)
2. Query SQL refatorada e otimizada
3. Sugestão de novos índices a serem criados (com script DDL)
4. Análise de impacto e trade-offs da otimização proposta (ex: custo adicional de escrita vs ganho na leitura)
5. Como simular a query localmente com dados dummy para confirmar se houve ganho de performance`,
  },
  {
    id: "e22",
    role: "dev",
    tag: "Arquitetura",
    title: "Estratégia de migração de monólito para microsserviços",
    description: "Planeja o fatiamento de um sistema usando a estratégia Strangler Fig Pattern.",
    prompt: `Atue como arquiteto(a) de software sênior. Planeje a migração gradual de parte de uma aplicação monolítica para um microsserviço independente usando o padrão Strangler Fig (padrão estrangulador).

Descrição do sistema monolítico atual: [DESCREVA A STACK, BANCO DE DADOS E TECNOLOGIAS]
Módulo ou funcionalidade que será migrado primeiro: [DESCREVA O MÓDULO, ex: processamento de pagamentos]
Restrições de negócios (tempo de downtime aceitável, regras de integridade de dados): [LISTE]

Gere a arquitetura e o plano de migração contendo:
1. Diagrama de arquitetura textual mostrando a convivência do monólito, o novo microsserviço e a camada de roteamento/API Gateway
2. Plano de transição em etapas de deploy seguro, garantindo reversibilidade em cada passo
3. Estratégia de sincronização de banco de dados (ex: leitura dupla, sincronização assíncrona por eventos ou banco compartilhado temporariamente)
4. Como tratar a integridade de dados em caso de falhas na fase híbrida da migração
5. Estratégia de fallback automático para o monólito se o novo serviço apresentar instabilidade`,
  },
  {
    id: "e23",
    role: "dev",
    tag: "DevOps",
    title: "Infraestrutura como Código (IaC) com Terraform",
    description: "Cria arquivos de configuração do Terraform para provisionar infraestrutura de nuvem.",
    prompt: `Você é engenheiro(a) de DevOps especialista em Terraform/OpenTofu. Crie as configurações de Infraestrutura como Código (IaC) para provisionar o ambiente abaixo na nuvem [AWS/Azure/GCP].

Recursos a serem provisionados:
[DESCREVA OS RECURSOS, ex: cluster ECS com Fargate, banco de dados RDS PostgreSQL, VPC com subnets públicas e privadas, Load Balancer]

Restrições de segurança e alta disponibilidade: [LISTE, ex: banco não acessível via internet pública, tráfego HTTPS apenas]

Entregue:
1. Estrutura de arquivos recomendada para o projeto do Terraform (ex: main.tf, variables.tf, outputs.tf, providers.tf)
2. Código Terraform completo, modularizado e comentado, utilizando boas práticas de tags e nomenclatura
3. Configuração de backend remoto seguro para armazenamento do state file
4. Variáveis configuráveis sugeridas para tornar o código reaproveitável entre ambientes (Dev, Staging, Prod)
5. Plano de destruição/recriação rápida e segura em caso de erros no deploy`,
  },
  {
    id: "e24",
    role: "dev",
    tag: "Segurança",
    title: "Plano de remediação de ameaças OWASP Top 10",
    description: "Identifica e corrige vulnerabilidades de código listadas nas ameaças do OWASP.",
    prompt: `Atue como engenheiro(a) de segurança de código de aplicação. Analise o código abaixo escrito em [LINGUAGEM/FRAMEWORK] que apresenta uma possível vulnerabilidade relacionada ao OWASP Top 10.

Código vulnerável:
[COLE O CÓDIGO SUSPEITO]

Tipo de vulnerabilidade ou sintoma percebido: [ex: Injeção SQL, XSS, Broken Object Level Authorization]

Entregue:
1. Diagnóstico do ataque: como um invasor exploraria esse código para comprometer o sistema
2. Código refatorado de forma segura, com o mecanismo de validação, sanitização ou autorização implementado
3. Teste automatizado (unitário ou de segurança) que comprove que a falha foi sanada (cenário exploit falha)
4. Medidas de segurança complementares no nível da aplicação/infraestrutura (ex: headers de segurança HTTP, CORS, WAF)
5. Boas práticas a serem seguidas no dia a dia pelo time de desenvolvimento para evitar a reintrodução desse tipo de falha`,
  },
  {
    id: "e25",
    role: "dev",
    tag: "Qualidade",
    title: "Configuração de guia de estilo e regras de Linter",
    description: "Gera arquivos de configuração para ESLint, Prettier ou similares com regras do time.",
    prompt: `Você é engenheiro(a) de software focado em qualidade de código. Crie os arquivos de configuração de guias de estilo (linters, formatadores e analisadores estáticos) para o projeto em [LINGUAGEM/FRAMEWORK].

Ferramentas a configurar: [ex: ESLint + Prettier em projeto React, ou Ruff/Flake8/Black em Python]
Convenções ou preferências de estilo acordadas no time: [LISTE, ex: aspas simples, ponto e vírgula obrigatório, limite de tamanho de arquivo]

Entregue:
1. O conteúdo completo do arquivo de configuração do linter (ex: .eslintrc.json, pyproject.toml)
2. O conteúdo do arquivo do formatador (ex: .prettierrc)
3. Configurações complementares recomendadas para integrar com o VS Code/IDE dos devs (ex: settings.json, .editorconfig)
4. Script npm/Makefile pronto para rodar a checagem localmente
5. Dica de hook de git (usando Husky e lint-staged, por exemplo) para bloquear commits que não atendam às regras de formatação`,
  },
  {
    id: "e26",
    role: "dev",
    tag: "Testes",
    title: "Plano de testes de regressão automatizados",
    description: "Cria a estratégia de testes para evitar que alterações quebrem funcionalidades antigas.",
    prompt: `Atue como engenheiro(a) de qualidade (QA) sênior. Crie uma estratégia de testes de regressão automatizados para o sistema [NOME DO SISTEMA].

Áreas do sistema mais suscetíveis a quebras ou mais críticas de negócio: [LISTE AS ÁREAS]
Ferramentas de automação de testes disponíveis: [ex: Playwright, Cypress, Selenium, Postman]

Gere o plano contendo:
1. Escopo dos testes de regressão: o que deve ser testado automaticamente a cada mudança de código (caminhos críticos de negócio)
2. Estratégia de execução: quando rodar (a cada PR no CI, diariamente na madrugada, ou antes de deploys em produção)
3. Estratégia de massa de dados estável para os testes de regressão (como evitar que testes falhem por dados variáveis)
4. Script de exemplo para uma funcionalidade crítica no framework selecionado
5. Processo de triagem em caso de testes de regressão falhos ("flaky tests"): como distinguir bugs reais de falhas de ambiente`,
  },
  {
    id: "e27",
    role: "dev",
    tag: "Arquitetura",
    title: "Design de sistema de filas e mensageria assíncrona",
    description: "Modela o processamento de tarefas em segundo plano usando RabbitMQ, Kafka ou SQS.",
    prompt: `Você é engenheiro(a) de software arquiteto. Projete a arquitetura de processamento assíncrono para resolver o problema de comunicação e escalabilidade descrito abaixo.

Problema a resolver: [DESCREVA O PROBLEMA, ex: processar upload de arquivos e gerar relatórios em PDF pesados sem travar a requisição HTTP do usuário]
Tecnologias de mensageria sugeridas: [ex: RabbitMQ com Workers em Node, Amazon SQS com AWS Lambda, Apache Kafka]

Entregue o design técnico com:
1. Diagrama de fluxo de dados (textual/ASCII) cobrindo Produtor -> Queue/Broker -> Consumidor/Worker
2. Desenho do payload das mensagens que trafegarão nas filas (schema JSON estruturado)
3. Estratégia de resiliência e tratamento de erros (Dead Letter Queue - DLQ, tentativas de reprocessamento - retry com backoff exponencial)
4. Estratégia para garantir idempotência do processamento no consumidor (evitar processar o mesmo evento duas vezes em duplicidade)
5. Métricas e alertas necessários para monitorar a saúde da fila (latência da fila, contagem de mensagens na DLQ, saturação de workers)`,
  },
  {
    id: "e28",
    role: "dev",
    tag: "Depuração",
    title: "Diagnóstico de picos de uso de CPU (CPU Spikes)",
    description: "Investiga travamentos e processamento elevado de CPU em aplicações em produção.",
    prompt: `Você é engenheiro(a) especialista em performance e infraestrutura. Ajude-me a diagnosticar a causa de picos repentinos de consumo de CPU (CPU Spikes) na aplicação [NOME DA APLICAÇÃO] em ambiente de produção.

Linguagem/Runtime: [ex: Node.js, Java, Python, Go]
Sintomas do problema (frequência, tempo de resposta alto, timeout de requests, logs de erro paralelos): [DESCREVA]
Evidências obtidas (métricas de CPU, APM, ou profiles recentes): [COLE OS DADOS]

Apresente um plano de diagnóstico estruturado contendo:
1. Hipóteses de causas comuns na linguagem/runtime indicada (ex: loop infinito síncrono, garbage collection intensa, concorrência mal tratada, parsing ineficiente de JSON muito grande)
2. Comandos de terminal ou ferramentas recomendadas para coletar dados em tempo real (ex: htop, perf, pprof, thread dumps)
3. Instruções detalhadas de como ler um profile de CPU (flame graphs) para identificar a função gargalo
4. Correção sugerida para o problema mais provável identificado na sua análise
5. Estratégia preventiva (configurações de rate limit, timeouts de requests, ou limites de recursos em contêineres)`,
  },
  {
    id: "e29",
    role: "dev",
    tag: "DevOps",
    title: "Dockerfile otimizado para produção",
    description: "Cria Dockerfiles seguros, rápidos e com menor tamanho de imagem usando boas práticas.",
    prompt: `Atue como engenheiro(a) DevOps. Escreva o Dockerfile de produção para a aplicação descrita abaixo, focando em segurança (usuário não-root), menor tamanho final da imagem (multi-stage builds) e velocidade de cache das camadas.

Stack da aplicação: [LINGUAGEM, FRAMEWORK, GERENCIADOR DE PACOTES, ex: Node.js com NestJS e pnpm]
Requisitos de execução (arquivos que devem ser copiados, portas expostas, variáveis de ambiente necessárias): [DESCREVA]

Entregue:
1. O Dockerfile completo comentado linha a linha explicativa das decisões
2. Arquivo .dockerignore sugerido para o projeto
3. Justificativa da imagem base de produção escolhida (ex: alpine, distroless, slim)
4. Como configurar o container para rodar sob privilégios limitados (não-root)
5. Instruções para construir (build) e rodar localmente a imagem criada`,
  },
  {
    id: "e30",
    role: "dev",
    tag: "Documentação",
    title: "Guia de arquitetura de software (C4 Model)",
    description: "Documenta a arquitetura de um sistema nos níveis de contexto, contêiner e componentes.",
    prompt: `Você é arquiteto(a) de software. Documente a arquitetura da aplicação [NOME DO SISTEMA] utilizando o framework C4 Model.

Visão geral do sistema e sua finalidade: [DESCREVA O SISTEMA E QUEM SÃO OS USUÁRIOS]
Integrações com sistemas externos e serviços de terceiros: [LISTE, ex: gateway de pagamento, Salesforce]

Forneça os diagramas e descrições textuais nos seguintes níveis:
1. **Nível 1 - Contexto de Sistema**: Diagrama textual descrevendo a fronteira da aplicação com os usuários humanos e integrações de alto nível
2. **Nível 2 - Contêineres**: Mapeamento dos contêineres de código e dados (Frontend SPA, Backend API, Banco de Dados, Workers) com as tecnologias utilizadas e protocolos de comunicação (HTTPS, gRPC, AMQP)
3. **Nível 3 - Componentes**: Foco no detalhamento dos principais componentes internos da API (ex: Controllers, Services, Repositories, Queue Consumers)
4. Tecnologias recomendadas para desenhar ou manter essa arquitetura documentada no time (ex: Structurizr, Mermaid.js)`,
  },
  {
    id: "e31",
    role: "dev",
    tag: "Refatoração",
    title: "Redução de débito técnico e acoplamento",
    description: "Revisa código acoplado e propõe a separação de responsabilidades (SOLID).",
    prompt: `Atue como engenheiro(a) sênior especialista em design de código. Analise o arquivo de código abaixo que possui alto acoplamento e múltiplas responsabilidades (violação do Single Responsibility Principle do SOLID) e guie-me em sua refatoração.

Código atual:
[COLE O CÓDIGO DO MÓDULO/CLASSE]

Linguagem: [LINGUAGEM]

Entregue:
1. Análise dos problemas de arquitetura do código fornecido (acoplamento excessivo, dependências difíceis de mockar nos testes, etc.)
2. Proposta de nova estrutura (divisão em classes, interfaces ou funções separadas de acordo com SOLID)
3. Código refatorado completo e modularizado
4. Exemplo de como testar os novos módulos isoladamente por meio de mocks/stubs das dependências criadas`,
  },
  {
    id: "e32",
    role: "dev",
    tag: "Testes",
    title: "Plano e testes de mutação (Mutation Testing)",
    description: "Configura testes de mutação para avaliar a real eficácia das asserções dos testes unitários.",
    prompt: `Você é engenheiro(a) de qualidade especialista em testes de mutação. Explique e configure um plano de testes de mutação para a nossa suite de testes existente.

Linguagem/Framework de teste do projeto: [ex: JavaScript/Jest, Java/JUnit, Python/pytest]
Ferramenta de mutação sugerida ou desejada: [ex: Stryker Mutator, Pitest, Mutmut]
Código ou contexto do módulo crítico a testar: [COLE O CÓDIGO OU DESCREVA]

Entregue:
1. Conceito rápido de testes de mutação adaptado para o time entender (explicando mutantes, sobreviventes e taxa de mutação)
2. Arquivo de configuração completo da ferramenta de mutação no projeto
3. Instruções de execução local da análise e leitura do relatório final gerado
4. Como identificar asserções de teste fracas ou testes unitários falsos-positivos a partir do relatório
5. Trade-offs de performance (como configurar exclusão de arquivos e limitação de threads para evitar testes extremamente lentos)`,
  },
  {
    id: "e33",
    role: "dev",
    tag: "Banco de dados",
    title: "Design de schema de banco de dados NoSQL",
    description: "Modela dados para bancos não-relacionais como MongoDB ou DynamoDB com foco em padrões de acesso.",
    prompt: `Você é engenheiro(a) especialista em bancos de dados NoSQL. Desenhe a modelagem de dados (schema) para suportar a funcionalidade [NOME DA FEATURE] usando o banco [MongoDB / DynamoDB / Redis].

Requisitos e padrões de escrita e leitura de dados esperados:
[DESCREVA OS FLUXOS, ex: cadastrar post, listar comentários de um post ordenados por data]

Volume estimado de acessos e crescimento dos dados: [DESCREVA]

Entregue:
1. Proposta de estrutura de dados (documento JSON para MongoDB ou chaves de partição/classificação para DynamoDB)
2. Justificativa da escolha de embedding (aninhamento) vs referencing (referenciamento) para os dados relacionados no caso do MongoDB
3. Estratégia de indexação secundária baseada no comportamento de consulta do usuário
4. Trade-offs de consistência eventual comuns ao banco escolhido e como lidar com eles no código backend`,
  },
  {
    id: "e34",
    role: "dev",
    tag: "Observabilidade",
    title: "Rastreamento distribuído com OpenTelemetry",
    description: "Implementa logs e traces distribuídos para rastrear requisições entre microsserviços.",
    prompt: `Atue como especialista em confiabilidade de sistemas (SRE). Crie um plano de instrumentação e código de exemplo para configurar Rastreamento Distribuído (Distributed Tracing) na aplicação utilizando o padrão aberto OpenTelemetry.

Linguagem/Framework da aplicação backend: [ex: Node.js/Express, Python/FastAPI, Go]
Destino dos traces/Coletor configurado: [ex: Jaeger, Dynatrace, Datadog, Grafana Tempo]

Entregue:
1. Arquivos de inicialização do SDK do OpenTelemetry na aplicação
2. Como injetar e propagar cabeçalhos de contexto de trace (W3C Trace Context) em chamadas HTTP/gRPC enviadas a outros serviços
3. Exemplo de criação de Span manual para rastrear um método crítico de banco de dados ou processamento interno
4. Como associar logs da aplicação com o ID do Trace ativo (Log Correlation)
5. Verificação pós-implementação: como verificar se os traces estão chegando com sucesso no coletor destino`,
  },
  {
    id: "e35",
    role: "dev",
    tag: "Arquitetura",
    title: "Estratégia de cache e invalidação distribuída",
    description: "Desenha a estratégia de cache em memória utilizando Redis para otimizar leituras lentas.",
    prompt: `Você é engenheiro(a) de software focado em performance de sistemas. Projete a estratégia de cache em memória usando Redis para a funcionalidade lenta descrita abaixo.

Fluxo lento que exige otimização (descrição do gargalo, volume de leitura/escrita): [ex: catálogo de produtos, busca CEP]
Tecnologia do backend: [LINGUAGEM/FRAMEWORK]

Gere a especificação técnica da estratégia com:
1. Padrão de cache recomendado (Cache-Aside, Write-Through, Write-Behind) com justificativa do trade-off
2. Estrutura e nomenclatura de chaves no Redis (ex: prefixo, namespaces) e tipo de dado (strings, hashes, sorted sets)
3. Política de expiração (TTL - Time to Live) adequada para este caso de negócio
4. Estratégia de invalidação de cache (como garantir que alterações nos dados limpem a chave correta no Redis)
5. Tratamento de indisponibilidade do Redis: como garantir que a aplicação continue funcionando (fallback para banco de dados) caso o servidor de cache caia`,
  },
  {
    id: "e36",
    role: "dev",
    tag: "Segurança",
    title: "Implementação de fluxo OAuth2 e segurança JWT",
    description: "Gera a lógica de autenticação segura utilizando JSON Web Tokens e fluxo OAuth2.",
    prompt: `Atue como desenvolvedor(a) focado em segurança de software. Desenhe a lógica e o código de autenticação para proteger recursos de API utilizando JWT (JSON Web Tokens) e autenticação de segundo plano.

Linguagem/Backend do projeto: [LINGUAGEM]
Fluxo de credenciais desejado: [ex: Authorization Code Flow com PKCE para apps frontend, Client Credentials para integrações M2M]

Gere a especificação técnica contendo:
1. Estrutura do payload do JWT sugerida (claims padrões como sub, exp, iat, iss e claims personalizadas como escopos/roles)
2. Estratégia de assinatura segura de chaves usando chaves assimétricas (RS256 com endpoint JWKS)
3. Código de middleware de validação do token JWT nas requisições protegidas
4. Lógica de Refresh Tokens para permitir reautenticação silenciosa sem exigir senha a todo momento, detalhando a segurança contra roubo de tokens (refresh token rotation)
5. Checklist de segurança de armazenamento de tokens no cliente frontend`,
  },
  {
    id: "e37",
    role: "dev",
    tag: "DevOps",
    title: "Script e automação de deploy Canary",
    description: "Cria arquivos de configuração de deploy Canary para direcionar tráfego gradualmente.",
    prompt: `Você é engenheiro(a) DevOps. Configure uma estratégia de deploy Canary na nuvem [AWS/Azure/GCP] para o serviço [NOME DO SERVIÇO], roteando tráfego aos poucos para as versões novas antes de substituir as antigas por completo.

Orquestrador/Tecnologia utilizada: [ex: Kubernetes com Istio, AWS ECS com Route 53 weight routing]
Rampa de velocidade de rollout sugerida: [ex: 5% -> 25% -> 50% -> 100% de tráfego]

Entregue:
1. Arquivo de configuração ou regras de roteamento necessárias (ex: VirtualService do Istio, ou definição de deploy Canary em Kubernetes)
2. Métricas-chave de sucesso que decidem a progressão (taxa de erro http 5xx da nova versão, latência média, erros de timeout)
3. Script ou automação de acompanhamento do rollout (ex: comando cli de health check)
4. Lógica de rollback automático (como desfazer o redirecionamento de tráfego instantaneamente ao detectar erros acima de X%)
5. Recomendações sobre gerenciamento de sessões de usuários persistentes (sticky sessions) durante o deploy híbrido`,
  },
  {
    id: "e38",
    role: "dev",
    tag: "Qualidade",
    title: "Guia de revisão de código focado em segurança",
    description: "Cria regras de verificação manual para revisores identificarem brechas de segurança no código.",
    prompt: `Atue como analista sênior de segurança de código (AppSec). Crie um guia prático de Code Review focado em Segurança (Security Code Review Checklist) para auxiliar os revisores do time de desenvolvimento de [LINGUAGEM/TECNOLOGIA PRINCIPAL DO PROJETO].

Estruture o guia em categorias claras:
1. Validação de Entradas e Sanitização (verificações contra SQL Injection, Command Injection, XSS, Path Traversal)
2. Autenticação e Gestão de Sessão (geração correta de tokens, expiração, regras de hash de senhas)
3. Autorização (Broken Function/Object Level Authorization - garantir que o ID do recurso pertence ao usuário logado)
4. Vazamento de Dados Sensíveis (exposição incorreta de PII - dados pessoais, logs contendo senhas ou tokens em texto aberto)
5. Criptografia e Configurações Seguras (uso de algoritmos modernos de criptografia, HTTPS forçado, desativação de debug em produção)

Forneça exemplos práticos de código inseguro vs. código corrigido para cada categoria.`,
  },
  {
    id: "e39",
    role: "dev",
    tag: "Depuração",
    title: "Diagnóstico e resolução de Race Conditions",
    description: "Investiga inconsistências de dados causadas por concorrência e condições de corrida.",
    prompt: `Você é engenheiro(a) especialista em sistemas concorrentes e depuração de código complexo. Ajude-me a diagnosticar e resolver uma condição de corrida (Race Condition) no código abaixo.

Linguagem de programação: [ex: Node.js, Go, Python, Java]
Código relevante:
[COLE O CÓDIGO SUSPEITO]

Sintoma do problema (inconsistência de valores em transações, saldos, ou cadastros duplicados sob carga concorrente):
[DESCREVA OS DETALHES DO SINTOMA]

Entregue:
1. Explicação técnica passo a passo de como a condição de corrida ocorre (fluxo de concorrência que gera o erro)
2. Estratégia de solução ideal (ex: travas otimistas - optimistic locking, travas pessimistas - pessimistic locking/transactions no banco, uso de semáforos, Mutex local ou travas distribuídas com Redis)
3. Código corrigido implementando a solução escolhida
4. Plano de testes unitários concorrentes para verificar a fix e garantir que o comportamento não volte a ocorrer`,
  },
  {
    id: "e40",
    role: "dev",
    tag: "Documentação",
    title: "Guia de integração de SDK / APIs externas",
    description: "Cria documentação técnica completa para desenvolvedores que consumirão nossa API.",
    prompt: `Atue como engenheiro(a) de documentação de desenvolvedor (Developer Advocate). Crie um guia de integração técnica completo para guiar desenvolvedores externos a integrarem com a nossa API / SDK de [NOME DO RECURSO OU PRODUTO].

Endpoints e recursos centrais que o cliente deve usar:
[LISTE AS ROTAS E COMPORTAMENTOS DA API]

Tecnologia da API: [ex: REST JSON, GraphQL, gRPC]

Gere a documentação em Markdown contendo:
1. Passo a passo inicial de autenticação de chamadas externas (como obter a API Key e passá-la nas requisições)
2. Fluxo rápido de "Hello World" (a requisição mais simples para testar a comunicação com sucesso)
3. Guia das rotas principais com exemplos detalhados de requisição e resposta (cURL e exemplos em JavaScript/Python)
4. Tratamento padrão de erros da nossa API (lista de códigos de erro retornados e o significado de cada um)
5. Limitações técnicas da integração (Rate limits, timeout padrão e paginação de dados)`,
  },

// --------------------------------------------------------------------- PO
  {
    id: "p1",
    role: "po",
    tag: "Backlog",
    title: "User story com critérios de aceite (INVEST)",
    description: "Escreve histórias de usuário completas seguindo o critério INVEST.",
    prompt: `Atue como Product Owner experiente. Escreva uma user story completa para a necessidade abaixo, seguindo o critério INVEST (Independente, Negociável, Valiosa, Estimável, Pequena, Testável).

Necessidade/ideia bruta: [DESCREVA A NECESSIDADE OU PEDIDO RECEBIDO]
Persona/usuário-alvo: [DESCREVA QUEM SE BENEFICIA]
Contexto de negócio (por que isso importa agora): [CONTEXTO]

Entregue:
1. A história no formato "Como [persona], quero [ação], para que [benefício]"
2. Critérios de aceite no formato Gherkin (Dado/Quando/Então), cobrindo caminho feliz e ao menos 2 exceções relevantes
3. Escopo explícito do que NÃO está incluso nesta história (para evitar ambiguidade de escopo)
4. Dependências técnicas ou de outras áreas que a equipe precisa validar antes de estimar
5. Uma nota avaliando se a história atende ao critério "Pequena" (cabe em uma sprint) e, se não, uma sugestão de como dividi-la (slicing)`,
  },
  {
    id: "p2",
    role: "po",
    tag: "Priorização",
    title: "Priorização de backlog (RICE / MoSCoW)",
    description: "Ajuda a priorizar um conjunto de itens de backlog com critérios objetivos.",
    prompt: `Você é Product Owner responsável por priorizar o backlog do trimestre. Avalie os itens abaixo usando o framework [RICE ou MoSCoW — escolha um] e me entregue uma priorização justificada.

Itens do backlog (nome e descrição breve de cada um):
[LISTE OS ITENS, um por linha]

Contexto de negócio e restrições (metas do trimestre, capacidade do time, prazos externos): [CONTEXTO]

Para o framework RICE, estime e justifique por item: Reach (alcance), Impact (impacto), Confidence (confiança) e Effort (esforço), depois calcule o score. Para MoSCoW, classifique cada item em Must/Should/Could/Won't com justificativa.

Entregue:
1. Tabela completa com a pontuação/classificação de cada item
2. Ranking final sugerido
3. Os 2 itens mais controversos de priorizar e por quê (trade-offs envolvidos)
4. Perguntas que eu deveria responder para reduzir a incerteza nas estimativas mais frágeis`,
  },
  {
    id: "p3",
    role: "po",
    tag: "Documentação",
    title: "PRD (Product Requirements Document)",
    description: "Redige um documento de requisitos de produto completo para uma nova feature.",
    prompt: `Atue como Product Owner/Product Manager redigindo um PRD para a feature [NOME DA FEATURE].

Problema a resolver: [DESCREVA O PROBLEMA DO USUÁRIO OU DE NEGÓCIO]
Objetivo de negócio e métrica de sucesso desejada: [OBJETIVO E MÉTRICA]
Usuários afetados: [DESCREVA]
Restrições conhecidas (prazo, técnicas, legais): [LISTE]

Estruture o PRD com as seções:
1. Resumo executivo (3-4 linhas)
2. Problema e evidências que o sustentam (dados, pesquisas, tickets de suporte)
3. Objetivos e métricas de sucesso (o que muda, e como será medido)
4. Escopo: o que está incluso e o que está explicitamente fora (v1 vs. futuro)
5. Requisitos funcionais, numerados e testáveis
6. Requisitos não-funcionais relevantes (performance, segurança, acessibilidade)
7. Riscos e perguntas em aberto
8. Critérios de lançamento (definition of done do ponto de vista de produto)

Use linguagem objetiva, evite recursos de solução técnica (isso cabe à engenharia) e foque no "o quê" e "por quê", não no "como".`,
  },
  {
    id: "p4",
    role: "po",
    tag: "Métricas",
    title: "Interpretação de métricas de produto",
    description: "Analisa um conjunto de métricas/dashboard e extrai insights acionáveis.",
    prompt: `Você é Product Owner analisando métricas de produto para tomar uma decisão. Abaixo estão os dados disponíveis do produto/feature [NOME].

Métricas e período analisado:
[COLE OS NÚMEROS, TABELA OU DESCRIÇÃO DO DASHBOARD, incluindo período de comparação]

Hipótese ou pergunta de negócio que motivou a análise: [PERGUNTA QUE VOCÊ QUER RESPONDER]
Eventos relevantes no período (lançamentos, campanhas, incidentes): [LISTE, SE HOUVER]

Entregue:
1. Leitura objetiva dos números (o que subiu, caiu ou ficou estável, com magnitude)
2. Possíveis explicações para as variações, relacionando com os eventos do período quando plausível, e sinalizando quando a causa não pode ser confirmada apenas com esses dados
3. Se a métrica responde à pergunta de negócio original, e por quê (ou por que não)
4. Recomendação de próxima ação (investigar mais, agir agora, ou monitorar)
5. Um alerta sobre qualquer viés ou limitação nos dados fornecidos que possa distorcer a conclusão`,
  },
  {
    id: "p5",
    role: "po",
    tag: "Discovery",
    title: "Roteiro de discovery para nova feature",
    description: "Planeja o processo de descoberta antes de comprometer time com uma solução.",
    prompt: `Atue como Product Owner conduzindo a fase de discovery antes de qualquer compromisso de build. O tema a investigar é: [DESCREVA A OPORTUNIDADE OU PROBLEMA A EXPLORAR]

Informação já disponível (dados, feedback de clientes, hipóteses do time): [LISTE O QUE JÁ SE SABE]
Tempo/orçamento disponível para o discovery: [PRAZO]

Monte um plano de discovery com:
1. Pergunta central de discovery, reescrita de forma testável (não "vamos construir X", mas "vamos descobrir se Y é verdade")
2. Hipóteses a validar, cada uma com o risco associado (risco de valor, usabilidade, viabilidade ou negócio)
3. Métodos de investigação recomendados para cada hipótese (ex: entrevistas, protótipo de teste, análise de dados existentes, teste A/B) e por que esse método é o mais rápido/barato para essa hipótese específica
4. Critério de decisão: o que os resultados precisam mostrar para o time seguir, pivotar ou abandonar a ideia
5. Um cronograma sugerido dentro do prazo informado

Evite propor soluções de produto nesta etapa; o foco é validar problema e direção, não desenhar a feature final.`,
  },
  {
    id: "p6",
    role: "po",
    tag: "Comunicação",
    title: "Release notes / changelog para usuários",
    description: "Traduz mudanças técnicas em notas de versão claras para o usuário final.",
    prompt: `Você é Product Owner escrevendo as release notes de uma nova versão do produto [NOME DO PRODUTO], para serem lidas por usuários finais (não técnicos).

Lista de mudanças técnicas desta versão:
[COLE A LISTA DE FEATURES, CORREÇÕES E MUDANÇAS, mesmo em linguagem técnica]

Tom de voz do produto: [DESCREVA, ex: "profissional e direto", "amigável e descontraído"]

Gere:
1. Um título de destaque para a versão (o item de maior valor percebido pelo usuário)
2. Seções separadas: "Novidades", "Melhorias" e "Correções", cada item traduzido para o benefício percebido pelo usuário, não para a implementação técnica
3. Para cada item, uma frase curta explicando o que o usuário ganha, sem jargão técnico
4. Uma versão resumida (2-3 linhas) para ser usada em notificação push ou e-mail
5. Sinalização de quais itens técnicos da lista original não geram nenhum benefício visível ao usuário e por isso podem ser omitidos das notas públicas`,
  },
  {
    id: "p7",
    role: "po",
    tag: "Pesquisa",
    title: "Mapeamento de jornada do cliente",
    description: "Constrói um customer journey map estruturado a partir de dados de uso.",
    prompt: `Atue como Product Owner mapeando a jornada do cliente para o processo de [DESCREVA O PROCESSO, ex: "assinatura de um plano pago"].

Persona considerada: [DESCREVA A PERSONA]
Dados e observações disponíveis (analytics, entrevistas, tickets de suporte): [COLE OU RESUMA OS DADOS]

Construa a jornada em formato de tabela com as colunas:
Etapa | Ação do cliente | Pensamento/expectativa | Emoção | Ponto de contato (touchpoint) | Problema/oportunidade identificada | Métrica relacionada (se houver)

Cubra desde a etapa de conscientização até a etapa de pós-uso/fidelização, sem pular etapas intermediárias relevantes ao processo descrito.

Ao final, liste:
1. Os 3 pontos de maior fricção identificados na jornada, ordenados por impacto
2. Uma oportunidade de melhoria para cada um desses pontos
3. Qualquer etapa da jornada em que faltaram dados para uma análise confiável`,
  },
  {
    id: "p8",
    role: "po",
    tag: "Comunicação",
    title: "Pitch de feature para stakeholders (business case)",
    description: "Estrutura um business case convincente para conseguir aprovação/investimento.",
    prompt: `Você é Product Owner preparando um pitch para conseguir aprovação e recursos para a feature/iniciativa [NOME DA INICIATIVA] junto a stakeholders executivos.

Problema de negócio: [DESCREVA]
Solução proposta (visão geral, sem detalhe técnico): [DESCREVA]
Investimento estimado (tempo de time, custo, se souber): [ESTIME]
Retorno esperado (métrica de negócio impactada): [DESCREVA]

Estruture o pitch em:
1. Uma frase de abertura que capture o problema em termos de impacto de negócio (não de produto)
2. O tamanho da oportunidade, com números ou estimativas (mesmo que aproximadas, sinalizando o nível de confiança)
3. A solução proposta em alto nível e por que ela é a aposta certa agora
4. Investimento necessário versus retorno esperado, em linguagem que um executivo financeiro entenda
5. Riscos de fazer e riscos de não fazer
6. Pedido claro e específico do que você precisa da audiência (aprovação, verba, pessoas, prazo)

Mantenha o texto enxuto, pensado para uma apresentação de no máximo 5 minutos.`,
  },
  {
    id: "p9",
    role: "po",
    tag: "Pesquisa",
    title: "Análise de concorrência de produto",
    description: "Compara o produto com concorrentes em termos de posicionamento e funcionalidades.",
    prompt: `Atue como Product Owner conduzindo uma análise competitiva do produto [NOME DO PRODUTO] frente aos concorrentes [LISTE OS CONCORRENTES].

Informações já disponíveis sobre cada concorrente (site, materiais públicos, avaliações de usuários): [DESCREVA OU COLE O QUE JÁ FOI LEVANTADO]
Foco da análise (ex: funcionalidades, precificação, posicionamento de marca): [DESCREVA]

Entregue:
1. Tabela comparativa de funcionalidades: Funcionalidade | Nosso produto | Concorrente A | Concorrente B (indicando presente/ausente/parcial)
2. Posicionamento de cada concorrente (a promessa central de cada um, em uma frase)
3. Gaps identificados: o que os concorrentes oferecem e nós não, e o que nós oferecemos e eles não
4. Riscos competitivos mais urgentes (onde estamos mais vulneráveis)
5. Oportunidades de diferenciação que a análise sugere
6. Limitações desta análise (o que não pôde ser avaliado apenas com informação pública)

Baseie-se apenas nas informações fornecidas; não presuma funcionalidades de concorrentes que não foram descritas.`,
  },
  {
    id: "p10",
    role: "po",
    tag: "Pesquisa",
    title: "Roteiro de entrevista com clientes",
    description: "Planeja uma entrevista de descoberta com clientes atuais ou potenciais.",
    prompt: `Você é Product Owner preparando uma entrevista com clientes para entender melhor [TEMA/PROBLEMA A INVESTIGAR].

Perfil do entrevistado: [DESCREVA, ex: "cliente que cancelou nos últimos 30 dias", "usuário power user"]
O que você já sabe ou suspeita sobre o tema: [DESCREVA AS HIPÓTESES ATUAIS]
Tempo disponível para a entrevista: [DURAÇÃO]

Monte o roteiro com:
1. Abertura para deixar o entrevistado à vontade (sem induzir respostas sobre o tema principal ainda)
2. Perguntas abertas sobre o contexto e comportamento atual do entrevistado relacionado ao tema (perguntas de "o que você faz hoje", não "o que você acha da nossa ideia")
3. Perguntas que investigam o problema sem sugerir a solução que você já tem em mente
4. Perguntas de aprofundamento ("me conta mais sobre isso", "por que isso é importante para você") para usar conforme a conversa evoluir
5. Fechamento e pergunta final aberta para capturar algo que não foi perguntado
6. Uma lista do que evitar (perguntas hipotéticas do tipo "você usaria se...", perguntas que sugerem a resposta certa)

Marque quais perguntas são as mais importantes caso o tempo acabe antes do roteiro completo.`,
  },
  {
    id: "p11",
    role: "po",
    tag: "Planejamento",
    title: "Definição de OKRs de produto",
    description: "Estrutura objetivos e resultados-chave para o time de produto em um ciclo.",
    prompt: `Atue como Product Owner definindo os OKRs (Objectives and Key Results) do produto [NOME DO PRODUTO] para o ciclo [PERÍODO, ex: "Q3 2026"].

Estratégia/prioridade da empresa neste período: [DESCREVA O CONTEXTO ESTRATÉGICO MAIOR]
Problemas ou oportunidades identificados que o time de produto pode endereçar: [LISTE]

Entregue:
1. De 1 a 2 Objetivos (qualitativos, inspiradores, alinhados à estratégia maior — não uma lista de tarefas)
2. Para cada Objetivo, de 2 a 4 Key Results (quantitativos, mensuráveis, com prazo dentro do ciclo), evitando confundir Key Result com tarefa (ex: "lançar a feature X" não é um KR válido, mas "aumentar a taxa de ativação de 20% para 30%" é)
3. Para cada KR, uma linha de base atual (ou "[A LEVANTAR]" se não disponível) e a meta
4. Iniciativas candidatas que poderiam mover cada KR (sem se comprometer ainda com todas)
5. Um alerta sobre qualquer KR que pareça estar fora do controle direto do time de produto (métricas vaidosas ou dependentes demais de outras áreas)`,
  },
  {
    id: "p12",
    role: "po",
    tag: "Métricas",
    title: "Plano de teste A/B (hipótese e métrica)",
    description: "Estrutura um experimento controlado do ponto de vista de produto/negócio.",
    prompt: `Você é Product Owner planejando um teste A/B para validar a mudança [DESCREVA A MUDANÇA PROPOSTA] no produto [NOME DO PRODUTO].

Problema/oportunidade que motiva o teste: [DESCREVA]
Métrica de negócio que se espera impactar: [DESCREVA]
Tráfego/base de usuários disponível para o teste: [DESCREVA A ORDEM DE GRANDEZA]

Entregue:
1. Hipótese de negócio no formato "Se [mudança], então [métrica] muda em [direção], porque [racional]"
2. Métrica primária (a que decide o teste) e métricas secundárias/guarda (para garantir que não haverá efeito colateral negativo em outra parte do funil)
3. Público-alvo do teste e critério de segmentação (todos os usuários, ou um segmento específico, e por quê)
4. Duração estimada do teste e o principal fator que define esse tempo (ex: necessidade de capturar um ciclo completo de uso)
5. Critério de decisão pré-definido: que resultado leva a "adotar", "descartar" ou "iterar"
6. Riscos de interpretação (ex: sazonalidade, efeito de novidade) que podem distorcer a leitura do resultado`,
  },
  {
    id: "p13",
    role: "po",
    tag: "Planejamento",
    title: "Roadmap trimestral de produto",
    description: "Organiza iniciativas de produto em um roadmap comunicável a diferentes públicos.",
    prompt: `Atue como Product Owner montando o roadmap do produto [NOME DO PRODUTO] para o trimestre [PERÍODO].

Iniciativas candidatas e por que cada uma importa: [LISTE AS INICIATIVAS COM UMA BREVE JUSTIFICATIVA]
Objetivos estratégicos do período (OKRs ou metas): [DESCREVA]
Restrições de capacidade da equipe: [DESCREVA]

Entregue:
1. O roadmap organizado por tema/objetivo estratégico (não por lista solta de features), mostrando como cada iniciativa se conecta a um objetivo
2. Para cada iniciativa: status esperado ao longo do trimestre (ex: "Agora / A seguir / Depois", evitando datas exatas se ainda houver incerteza)
3. Uma versão do roadmap em linguagem para stakeholders executivos (foco em valor de negócio, sem jargão técnico)
4. Uma versão para o time técnico (com mais contexto de escopo e dependências)
5. O que está explicitamente fora do roadmap deste trimestre e por quê (para gerenciar expectativas)
6. Riscos que podem forçar uma repriorização no meio do trimestre`,
  },
  {
    id: "p14",
    role: "po",
    tag: "Métricas",
    title: "Análise de churn/retenção",
    description: "Investiga por que usuários estão cancelando ou abandonando o produto.",
    prompt: `Você é Product Owner investigando o churn (cancelamento/abandono) do produto [NOME DO PRODUTO].

Dados disponíveis sobre o churn (taxa atual, tendência, segmentos com maior churn, motivos declarados em pesquisas de cancelamento): [COLE OS DADOS DISPONÍVEIS]
Mudanças recentes no produto ou mercado que possam estar relacionadas: [LISTE, SE HOUVER]

Entregue:
1. Leitura objetiva dos dados (quem está saindo mais, quando no ciclo de vida do cliente o churn é mais concentrado)
2. Hipóteses de causa, categorizadas em: problema de produto (não entrega valor), problema de onboarding (usuário não chegou a usar o valor central), problema de preço, e fatores externos — sinalizando quais têm mais evidência nos dados fornecidos
3. Para a hipótese mais sustentada pelos dados, uma sugestão de investigação adicional para confirmá-la (ex: entrevistas com clientes que cancelaram)
4. Ações de curto prazo que poderiam reduzir o churn nesse segmento, mesmo antes de uma solução definitiva
5. Uma métrica "leading indicator" (indicador antecedente) que poderia alertar sobre risco de churn antes que ele aconteça

Não atribua o churn a uma única causa sem evidência suficiente nos dados fornecidos; apresente as hipóteses com o nível de confiança adequado.`,
  },
  {
    id: "p15",
    role: "po",
    tag: "Documentação",
    title: "FAQ / central de ajuda para nova feature",
    description: "Antecipa dúvidas de usuários e cria conteúdo de suporte para uma feature nova.",
    prompt: `Atue como Product Owner preparando o conteúdo de suporte (FAQ/central de ajuda) para o lançamento da feature [NOME DA FEATURE].

O que a feature faz e para quem ela é útil: [DESCREVA]
Dúvidas que a equipe de suporte ou o time de produto já antecipa: [LISTE, SE HOUVER]
Limitações conhecidas da feature na versão atual: [LISTE]

Gere:
1. De 8 a 12 perguntas frequentes antecipadas, cobrindo: como usar, o que fazer se algo der errado, limitações conhecidas, e diferenças em relação ao que existia antes (se for uma substituição de algo)
2. Resposta objetiva para cada pergunta, em linguagem simples, sem jargão técnico
3. Uma seção de "problemas conhecidos" para as limitações da versão atual, com o que fazer enquanto isso (workaround, se houver)
4. Sugestão de onde cada resposta deveria viver (central de ajuda, tooltip no produto, e-mail de lançamento) considerando o quão crítica é a dúvida

Evite prometer prazos de correção de limitações que ainda não foram confirmados pela engenharia.`,
  },
  {
    id: "p16",
    role: "po",
    tag: "Discovery",
    title: "Brief de validação de novo segmento de mercado",
    description: "Estrutura a investigação inicial antes de perseguir um novo público-alvo.",
    prompt: `Você é Product Owner avaliando se vale a pena perseguir o segmento [DESCREVA O NOVO SEGMENTO/PÚBLICO] com o produto [NOME DO PRODUTO].

Motivação para considerar esse segmento (sinal de demanda, pedido de vendas, tendência de mercado): [DESCREVA]
O que já se sabe sobre as necessidades desse segmento: [DESCREVA, OU DIGA QUE AINDA NÃO SE SABE]

Monte o brief de validação com:
1. Perguntas centrais que precisam ser respondidas antes de investir no segmento (ex: "o problema que resolvemos hoje também é prioritário para esse público?", "eles pagariam pelo que oferecemos hoje ou precisaríamos de algo diferente?")
2. Sinais que indicariam que vale a pena seguir (critério de "sim") versus sinais de que não é o momento (critério de "não")
3. Método de validação de menor custo/mais rápido para responder essas perguntas (ex: entrevistas, landing page de teste, piloto com poucos clientes) antes de qualquer investimento de engenharia
4. Riscos de distração: como esse novo segmento pode competir por atenção/recursos com o público atual
5. Um critério objetivo de "go/no-go" ao final da validação`,
  },
  {
    id: "p17",
    role: "po",
    tag: "Lançamento",
    title: "Checklist de prontidão para lançamento (launch readiness)",
    description: "Verifica se todas as frentes estão prontas antes de lançar uma feature.",
    prompt: `Atue como Product Owner responsável pelo lançamento da feature [NOME DA FEATURE]. Monte um checklist de prontidão de lançamento (launch readiness) cobrindo todas as frentes envolvidas.

Escopo da feature e público que será impactado (todos os usuários, ou lançamento gradual): [DESCREVA]
Equipes envolvidas no lançamento (produto, engenharia, suporte, marketing, vendas, jurídico): [LISTE AS QUE SE APLICAM]

Gere o checklist organizado por frente:
1. Produto: critérios de aceite validados, métricas de sucesso instrumentadas, plano de rollback definido
2. Engenharia: testes concluídos, monitoramento/alertas configurados, plano de rollout técnico (gradual ou total)
3. Suporte ao cliente: equipe treinada, FAQ/central de ajuda publicada, canal de escalonamento de bugs definido
4. Marketing/comunicação: release notes prontas, comunicação interna e externa alinhada
5. Jurídico/compliance, se aplicável: revisão de termos de uso, privacidade ou regulação necessária

Para cada item, inclua uma coluna de responsável e status (Pendente/Em andamento/Concluído). Finalize com os itens que são bloqueantes para o lançamento versus os que podem ser resolvidos logo depois.`,
  },
  {
    id: "p18",
    role: "po",
    tag: "Pesquisa",
    title: "Análise de feedback qualitativo (suporte e reviews)",
    description: "Sintetiza um volume grande de feedback não estruturado em insights acionáveis.",
    prompt: `Você é Product Owner analisando um volume de feedback qualitativo (tickets de suporte, reviews de loja de app, comentários de pesquisa) sobre o produto [NOME DO PRODUTO].

Feedback bruto disponível:
[COLE OS TICKETS, REVIEWS OU COMENTÁRIOS — quanto mais, melhor a síntese]

Período e contexto do feedback (ex: "reviews dos últimos 2 meses, após o lançamento da versão X"): [DESCREVA]

Entregue:
1. Os temas recorrentes identificados, agrupados por categoria (ex: bug, pedido de funcionalidade, elogio, confusão de uso, problema de suporte/atendimento)
2. Para cada tema, a frequência aproximada (quantos comentários se relacionam a ele) e 1-2 exemplos parafraseados (sem citar literalmente o texto original)
3. Os 3 temas que mais aparecem e que representam maior risco ou oportunidade
4. Uma recomendação de ação para cada um dos 3 temas priorizados
5. Sinalização de qualquer viés na amostra (ex: "reviews tendem a vir mais de usuários insatisfeitos", "feedback de suporte reflete só quem teve problema") que deve ser considerado ao interpretar os resultados`,
  },
  {
    id: "p19",
    role: "po",
    tag: "Estratégia",
    title: "Plano de precificação de novo plano/produto",
    description: "Estrutura a lógica de precificação de uma nova oferta.",
    prompt: `Atue como Product Owner definindo a estratégia de precificação para [NOME DO NOVO PLANO/PRODUTO/FEATURE PAGA].

Valor entregue por essa oferta (o que o cliente ganha): [DESCREVA]
Planos/preços já existentes no produto, se houver: [DESCREVA]
Informação sobre concorrentes ou benchmarks de mercado, se disponível: [DESCREVA, SE HOUVER]
Público-alvo desta oferta: [DESCREVA]

Entregue:
1. Modelo de precificação recomendado (ex: por usuário, por uso, tiers fixos, freemium) com a justificativa de por que ele se encaixa no valor entregue e no público-alvo
2. Estrutura de tiers/planos proposta, se aplicável, com o que diferencia cada nível
3. Como essa nova oferta se posiciona em relação aos planos existentes (evitando canibalização, ou tornando isso uma decisão consciente)
4. Riscos de precificação (deixar dinheiro na mesa vs. afastar clientes) e como o time poderia testar isso antes de comprometer o preço final
5. Métrica que indicaria se o preço escolhido está certo depois do lançamento (ex: taxa de conversão no checkout, elasticidade percebida)

Não invente dados de concorrentes ou de mercado que não foram fornecidos; sinalize quando uma suposição precisa ser validada.`,
  },
  {
    id: "p20",
    role: "po",
    tag: "Comunicação",
    title: "Comunicação de descontinuação de feature (sunset)",
    description: "Planeja o anúncio da descontinuação de uma funcionalidade ou produto.",
    prompt: `Você é Product Owner responsável por comunicar a descontinuação (sunset) de [NOME DA FEATURE/PRODUTO].

Motivo da descontinuação: [DESCREVA, ex: "baixo uso", "substituída por outra solução", "mudança estratégica"]
Quem será impactado e como: [DESCREVA O PÚBLICO E O IMPACTO PRÁTICO]
Alternativa oferecida, se houver: [DESCREVA, ex: "migração automática para o novo plano", "exportação de dados antes do encerramento"]
Prazo até o desligamento definitivo: [DATA OU PERÍODO]

Entregue:
1. Cronograma de comunicação (quando anunciar, quantos lembretes antes do desligamento, e por quais canais)
2. Texto do anúncio principal, com: o que está mudando, por que, o que o usuário precisa fazer (se algo), e até quando
3. Uma versão mais detalhada para a central de ajuda, incluindo perguntas frequentes antecipadas sobre a descontinuação
4. Orientação para a equipe de suporte sobre como responder a reclamações relacionadas
5. Um plano de contingência caso um segmento importante de clientes reaja muito negativamente (ex: estender o prazo para casos específicos)

Mantenha o tom respeitoso e direto, evitando linguagem que pareça esconder a notícia em meio a outros anúncios positivos.`,
  },

    {
    id: "p21",
    role: "po",
    tag: "Discovery",
    title: "Matriz CSD (Certezas, Suposições e Dúvidas)",
    description: "Organiza o conhecimento inicial do time antes de começar a investigar um problema.",
    prompt: `Atue como Product Owner facilitando a criação de uma Matriz CSD (Certezas, Suposições e Dúvidas) para alinhar o entendimento do time sobre o desafio: [DESCREVA O DESAFIO/INICIATIVA].

Informações de mercado ou dados preliminares que você já possui sobre o desafio:
[COLE OU RESUMA OS DADOS]

Entregue a matriz estruturada em três seções bem definidas:
1. **Certezas**: Fatos consolidados sustentados por dados qualitativos ou quantitativos (não meras opiniões)
2. **Suposições**: Hipóteses de comportamento ou viabilidade que o time acredita serem verdadeiras, mas que ainda não possuem validação robusta
3. **Dúvidas**: Perguntas sem resposta de negócio, design ou técnicas
4. **Plano de validação**: Para cada Suposição e Dúvida prioritária, sugira um plano de ação enxuto (ex: pesquisa com suporte, consulta com engenharia, entrevista com usuários) para transformá-las em Certezas`,
  },
  {
    id: "p22",
    role: "po",
    tag: "Backlog",
    title: "Escrita de Épicos de Produto",
    description: "Escreve a estrutura de alto nível de uma grande funcionalidade (Épico) para divisão posterior.",
    prompt: `Você é Product Owner experiente. Escreva a especificação em nível de Épico para a grande funcionalidade: [NOME DO ÉPICO/FUNCIONALIDADE].

Visão de negócios e dor do cliente a ser resolvida: [DESCREVA A DOR E A OPORTUNIDADE]
Stack tecnológica geral, se houver impacto: [DESCREVA]

Gere a documentação do Épico contendo:
1. Objetivo do Épico (o "porquê" de forma inspiradora e focada no usuário)
2. Personas impactadas
3. Requisitos macro (uma lista de 6 a 10 histórias de usuário de alto nível candidatas a fazer parte desse Épico)
4. Benefícios de negócio esperados (métricas macro que devem ser monitoradas)
5. Sugestão inicial de fatiamento (slicing) do Épico em 2 ou 3 entregas menores e incrementais (Releases/Fases)`,
  },
  {
    id: "p23",
    role: "po",
    tag: "Métricas",
    title: "Definição de North Star Metric e Input Metrics",
    description: "Estrutura a árvore de métricas de produto para alinhar as ações com o sucesso do negócio.",
    prompt: `Você é Product Manager especialista em métricas e growth de produto. Projete o framework de North Star Metric (Métrica Estrela Guia) e as Input Metrics (Métricas de Entrada) para o produto [NOME DO PRODUTO].

Modelo de negócios do produto (ex: SaaS B2B com plano de assinatura anual, Marketplace de e-commerce, App móvel freemium com anúncios): [DESCREVA]
Principais comportamentos de valor do usuário: [DESCREVA]

Entregue:
1. Proposta de North Star Metric (NSM) com justificativa de como ela captura tanto o valor real entregue ao cliente quanto o crescimento sustentável de negócio
2. A árvore de Input Metrics (3 a 4 métricas que influenciam diretamente a NSM, cobrindo dimensões como: Frequência/Engajamento, Largura/Adoção e Profundidade/Uso de Features)
3. Lógica de monitoramento (como cada input metric será medida qualitativa ou quantitativamente)
4. Iniciativas candidatas do time para mover cada uma das Input Metrics
5. Anti-métricas de produto associadas (métricas que não devemos piorar ao otimizar a NSM)`,
  },
  {
    id: "p24",
    role: "po",
    tag: "Estratégia",
    title: "Elaboração de Lean Canvas de novo produto",
    description: "Estrutura o modelo de negócio simplificado de uma ideia ou novo produto em uma única página.",
    prompt: `Atue como Product Manager sênior. Crie o Lean Canvas estruturado para validar a proposta de novo produto/serviço: [NOME DO NOVO PRODUTO/IDEIA].

O problema principal identificado no mercado: [DESCREVA O PROBLEMA]
Quem são os clientes potenciais primários: [DESCREVA]
Diferenciais que o time visualiza hoje: [DESCREVA]

Preencha os 9 blocos do Lean Canvas em texto estruturado:
1. Problema (os 3 problemas principais dos clientes + alternativas existentes de mercado)
2. Segmento de Clientes (perfil alvo + pioneiros/early adopters)
3. Proposta de Valor Única (a mensagem clara que mostra por que a solução é diferente e vale a atenção)
4. Solução (as 3 principais características da feature proposta que resolvem o problema)
5. Canais (como o produto chegará aos clientes)
6. Fontes de Receita (modelo de monetização)
7. Estrutura de Custos (principais custos de desenvolvimento, marketing e infraestrutura)
8. Métricas-Chave (métricas que validam o valor do produto)
9. Vantagem Injusta (o que não pode ser facilmente copiado ou comprado pelos concorrentes)`,
  },
  {
    id: "p25",
    role: "po",
    tag: "Priorização",
    title: "Estratégia de Story Mapping (Mapeamento de Histórias)",
    description: "Organiza o backlog de forma visual baseada nas etapas da jornada do usuário.",
    prompt: `Você é Product Owner facilitando uma sessão de User Story Mapping para estruturar e fatiar o backlog da funcionalidade/produto [NOME DA FEATURE].

Etapas macro da jornada que o usuário realiza:
[LISTE AS ETAPAS DA JORNADA, ex: "Pesquisar produto", "Adicionar ao carrinho", "Realizar pagamento", "Receber confirmação"]

Gere o Story Map detalhado em Markdown contendo:
1. Backbone (as etapas principais da jornada organizadas horizontalmente)
2. Walking Skeleton (as histórias mínimas necessárias abaixo de cada etapa para fazer o fluxo completo funcionar na v1 - MVP)
3. Release 1 (histórias que farão parte do primeiro incremento de valor comercial utilizável)
4. Release 2 (melhorias visuais, automações e fluxos alternativos de otimização)
5. Regras de fatiamento adotadas e riscos técnicos mitigados no processo`,
  },
  {
    id: "p26",
    role: "po",
    tag: "Discovery",
    title: "Formulação de hipóteses de Product Market Fit",
    description: "Cria experimentos de validação de valor para descobrir se há mercado real para a solução.",
    prompt: `Atue como Product Manager especialista em validação de produtos. Crie um plano de validação de valor e hipóteses de Product Market Fit (PMF) para [NOME DO PRODUTO OU FEATURE].

Problema que o produto se propõe a resolver: [DESCREVA]
A proposta de solução simplificada: [DESCREVA]

Entregue:
1. Hipótese central de valor no formato: "Acreditamos que [público] tem a dor de [problema] e usará [solução] com frequência X"
2. Experimento de menor custo para testar essa hipótese sem construir o produto final (ex: concierge, teste da cortina de fumaça com landing page paga, mágico de oz)
3. Métricas qualitativas e quantitativas de validação (ex: taxa de conversão na landing page, NPS inicial, frequência de uso do teste concierge)
4. Critério de sucesso claro para avançar com o desenvolvimento (ex: obter mais de X% de conversão ou Y% de retenção semanal em X semanas)
5. Alternativas de pivotagem rápida se a hipótese inicial for refutada`,
  },
  {
    id: "p27",
    role: "po",
    tag: "Comunicação",
    title: "Roteiro de alinhamento de visão de produto com o time técnico",
    description: "Prepara a apresentação e alinhamento de objetivos comerciais para a equipe de engenharia.",
    prompt: `Você é Product Owner preparando o kickoff e o alinhamento estratégico de um novo ciclo de produto com a equipe de engenharia e QA.

Iniciativa estratégica ou tema do trimestre: [DESCREVA A INICIATIVA, ex: migração de checkout e redução de bounce rate]
Métricas de negócio críticas a serem atingidas: [LISTE AS METAS]

Crie o roteiro da reunião de alinhamento com os seguintes tópicos:
1. Contexto de negócio (qual é a dor real de mercado, depoimentos de clientes sobre o problema ou dados de conversão perdidos)
2. Visão de sucesso (o que acontecerá com o produto quando essa entrega estiver concluída de forma brilhante)
3. Métrica de impacto principal do time e como o esforço técnico deles se traduz nesse ganho comercial (o "porquê de estarmos construindo isso")
4. Principais restrições e escopo do MVP de forma clara
5. Roteiro de perguntas abertas para o time sugerir alternativas de implementação mais simples/baratas, incentivando a co-criação técnica`,
  },
  {
    id: "p28",
    role: "po",
    tag: "Pesquisa",
    title: "Estudo de usuários inativos e plano de reativação",
    description: "Investiga por que usuários deixaram de interagir e planeja estratégias de engajamento.",
    prompt: `Atue como Product Owner responsável por reter e engajar a base de clientes. Desenhe uma investigação de usuários inativos (que não entram no sistema há mais de X dias) do produto [NOME DO PRODUTO].

Perfil geral do produto e frequência normal de uso esperada: [DESCREVA, ex: uso diário para gestão de vendas, uso mensal para fechamento fiscal]
Taxa de inatividade observada recentemente: [DESCREVA OS NÚMEROS DISPONÍVEIS]

Gere a estratégia de investigação e reativação:
1. Definição clara de inatividade para este caso de negócio (ex: sem login nos últimos 45 dias)
2. Roteiro rápido de entrevista focado em usuários inativos para entender a perda de valor
3. Hipóteses prováveis de abandono e possíveis ações de produto para endereçar cada uma (ex: e-mail de alerta de dados não preenchidos, simplificação do primeiro acesso)
4. Proposta de campanha de reativação pontual baseada em ganchos de valor reais (não em promoções vazias)
5. Métricas de sucesso do esforço de reativação (taxa de conversão de retorno, retenção do usuário reativado por mais de 30 dias)`,
  },
  {
    id: "p29",
    role: "po",
    tag: "Lançamento",
    title: "Estratégia de Beta fechado e recrutamento de clientes",
    description: "Estrutura as fases de teste controlado com usuários beta antes do lançamento oficial.",
    prompt: `Você é Product Owner planejando o lançamento de uma funcionalidade inovadora [NOME DA FEATURE] por meio de um programa de Beta Fechado (Closed Beta).

Público-alvo ideal da feature: [DESCREVA]
Objetivos centrais da fase Beta (ex: testar performance técnica, validar usabilidade do fluxo, recolher depoimentos iniciais): [LISTE]

Entregue o plano estratégico do Beta contendo:
1. Critério de seleção dos participantes (tamanho da amostra, perfil demográfico ou comportamental, nível de engajamento atual no produto)
2. Roteiro e canais de recrutamento (copy curto para convidar os usuários selecionados por e-mail ou in-app)
3. Regras de engajamento do programa (como o usuário reporta bugs, como envia feedback geral, frequência de contato do time de produto)
4. Critério de prontidão técnica e de usabilidade para encerrar a fase Beta e avançar para o lançamento geral (General Availability)
5. Modelo rápido de e-mail de agradecimento ao fim do programa Beta`,
  },
  {
    id: "p30",
    role: "po",
    tag: "Documentação",
    title: "Especificação de regras de negócio e tabelas de decisão",
    description: "Detalha a lógica de regras complexas em formato estruturado para o time de engenharia.",
    prompt: `Atue como Product Owner detalhista. Transforme as diretrizes de negócio informais abaixo em uma especificação técnica formal de regras de negócio com tabela de decisão para guiar os desenvolvedores e analistas de teste.

Diretrizes brutas de negócio (ex: regras de aprovação de crédito baseadas em score e idade, ou cálculo de cupom de desconto):
[COLE AS DIRETRIZES BRUTAS]

Gere a especificação técnica em Markdown contendo:
1. Definições de termos e variáveis envolvidas (o que é cada campo, tipos de valores válidos)
2. Regras de negócio individuais escritas em sentenças assertivas numeradas (ex: "RN01: Usuários com score abaixo de X devem ser rejeitados automaticamente")
3. Tabela de Decisão lógica (cruzando as condições de entrada para definir a ação de saída esperada em cada cenário possível)
4. Estados de exceção ou indefinições lógicas a serem validadas
5. Cenários de teste recomendados para validar a correta implementação da regra no código`,
  },
  {
    id: "p31",
    role: "po",
    tag: "Priorização",
    title: "Priorização rápida por Matriz Impacto x Esforço",
    description: "Classifica ideias e features de forma ágil em um quadrante 2x2 para definir o backlog.",
    prompt: `Você é Product Owner responsável por filtrar uma lista longa de ideias e pedidos de funcionalidades. Organize a lista abaixo em uma matriz de priorização Impacto vs Esforço.

Lista de ideias a priorizar:
[LISTE AS IDEIAS OU PEDIDOS, um por linha]

Contexto de negócio (o que é mais crítico hoje, ex: reduzir cancelamentos, acelerar aquisição): [CONTEXTO]

Para cada ideia da lista, avalie e explique de forma qualitativa:
1. Impacto estimado (Alto/Baixo) em relação ao contexto de negócio
2. Esforço estimado (Alto/Baixo) de desenvolvimento técnico
3. Classificação no quadrante correspondente:
   - **Quick Wins / Ganhos Rápidos** (Alto Impacto e Baixo Esforço)
   - **Projetos Estratégicos** (Alto Impacto e Alto Esforço)
   - **Tarefas de Baixo Valor / Preenchimento de Backlog** (Baixo Impacto e Baixo Esforço)
   - **Cura de Vaidade / Descartar** (Baixo Impacto e Alto Esforço)
4. Recomendações de quais quick wins iniciar imediatamente e quais projetos complexos fatiar`,
  },
  {
    id: "p32",
    role: "po",
    tag: "Métricas",
    title: "Análise de funil de conversão e gargalos",
    description: "Mapeia as taxas de abandono em cada etapa do fluxo do usuário e propõe melhorias.",
    prompt: `Atue como Product Owner especialista em análise de dados. Analise o funil de conversão abaixo do processo de [NOME DO PROCESSO, ex: fluxo de compra, ativação de conta].

Taxas e dados quantitativos de cada etapa do funil (número de usuários ou percentuais):
[COLE OS NÚMEROS DO FUNIL]

Dores ou hipóteses já conhecidas sobre o fluxo: [LISTE]

Gere a análise contendo:
1. Identificação do principal ponto de gargalo (etapa com maior queda percentual de conversão/drop-off)
2. Diagnóstico de hipóteses do porquê os usuários estão abandonando o fluxo nessa etapa específica (erros de usabilidade, excesso de campos, problemas técnicos, falta de proposta de valor)
3. Plano de ação com propostas práticas de melhorias de produto de curto e médio prazo
4. Métrica secundária a monitorar para garantir que a mudança não prejudique a qualidade das conversões (ex: taxa de estorno, chamados no suporte)`,
  },
  {
    id: "p33",
    role: "po",
    tag: "Discovery",
    title: "Planejamento de MVP e Prova de Conceito (PoC)",
    description: "Estrutura a menor entrega funcional possível para validar a aceitação do mercado.",
    prompt: `Você é Product Manager especialista em MVP (Minimum Viable Product). Planeje a estratégia de Mínimo Produto Viável e a Prova de Conceito para validar a proposta de valor de: [DESCREVA A IDEIA OU FUNCIONALIDADE].

O que a solução faz em sua versão ideal completa: [DESCREVA]
O que você precisa aprender com essa validação: [OBJETIVO DE APRENDIZADO]

Entregue o plano de validação enxuto estruturado em:
1. Escopo da Prova de Conceito (PoC) técnica ou de valor (menor protótipo funcional para testar viabilidade em poucos dias)
2. Definição do Escopo do MVP (o conjunto mínimo de funcionalidades essenciais para que o usuário resolva a dor na vida real)
3. O que fica explicitamente de fora do MVP (e que será construído apenas após a validação inicial)
4. Canais e estratégias de aquisição dos primeiros usuários para testar o MVP
5. Métricas de engajamento iniciais que definirão o sucesso do experimento e o prosseguimento da iniciativa`,
  },
  {
    id: "p34",
    role: "po",
    tag: "Comunicação",
    title: "Guia de posicionamento de produto para Vendas e Suporte",
    description: "Traduz as novidades técnicas do produto em argumentos de valor para as áreas de atendimento.",
    prompt: `Atue como Product Owner/Product Marketing Manager. Crie um guia de posicionamento interno e alinhamento comercial sobre o lançamento da feature/produto [NOME DA FEATURE] direcionado aos times de Vendas, Customer Success (CS) e Suporte.

O que a feature faz e os problemas que resolve: [DESCREVA]
Principais diferenciais competitivos: [LISTE]

Gere o guia em Markdown contendo:
1. Resumo de elevador (elevator pitch - como explicar a feature em 30 segundos para um cliente em potencial)
2. Tabela de Dores do Cliente vs. Como Resolver (para guiar conversas de vendas)
3. Lista de Objeções Comuns do cliente (ex: "é seguro?", "quanto custa?") com as respostas sugeridas e alinhadas
4. Orientações específicas para o Suporte (limitações da feature, o que fazer se o cliente reclamar de comportamento X)
5. Mensagem de comunicação padrão pronta para copiar e compartilhar nos canais internos do time`,
  },
  {
    id: "p35",
    role: "po",
    tag: "Estratégia",
    title: "Análise SWOT aplicada a produto",
    description: "Avalia forças, fraquezas, oportunidades e ameaças do produto no cenário atual.",
    prompt: `Você é Product Manager sênior conduzindo um planejamento estratégico de produto. Realize uma análise SWOT (Matriz FOFA - Forças, Oportunidades, Fraquezas e Ameaças) para o produto [NOME DO PRODUTO].

Contexto do produto e concorrência direta no mercado atual: [DESCREVA O MOMENTO DO PRODUTO]

Gere a análise SWOT detalhada em:
1. **Forças (Internal Strengths)**: Vantagens internas competitivas, tecnologias exclusivas, competências do time
2. **Fraquezas (Internal Weaknesses)**: Limitações do produto hoje, débitos técnicos recorrentes, lentidão operacional
3. **Oportunidades (External Opportunities)**: Tendências de mercado, mudanças regulatórias úteis, novos canais de aquisição negligenciados por concorrentes
4. **Ameaças (External Threats)**: Ações agressivas de concorrentes, mudanças bruscas de comportamento de consumo, riscos macroeconômicos
5. **Plano de Ação Cruzada**: Ações recomendadas utilizando as Forças para maximizar as Oportunidades e planos de mitigação das Fraquezas frente às Ameaças mapeadas`,
  },
  {
    id: "p36",
    role: "po",
    tag: "Lançamento",
    title: "Planejamento de plano de Go-To-Market (GTM) enxuto",
    description: "Estrutura as etapas de marketing, vendas e comunicação para o lançamento de novas features.",
    prompt: `Atue como Product Marketing Manager (PMM). Monte um plano enxuto de Go-To-Market (GTM) para o lançamento da funcionalidade/produto [NOME].

Objetivo estratégico do lançamento: [DESCREVA]
Público-alvo prioritário para a adoção inicial: [DESCREVA]

Estruture o plano de GTM em:
1. Posicionamento de produto e proposta de valor (mensagens-chave diferenciadoras para a campanha de lançamento)
2. Canais de comunicação selecionados (ex: banners in-app, e-mail marketing segmentado, mídias sociais, blog posts de engenharia)
3. Cronograma do lançamento (Fases: Pré-lançamento para alinhamento interno, Lançamento para base beta, Lançamento geral e Pós-lançamento para mensuração de adoção)
4. Alinhamento de canais de suporte e feedback do cliente durante o lançamento
5. Métricas de conversão e taxa de adoção que medirão a eficácia real do plano de GTM`,
  },
  {
    id: "p37",
    role: "po",
    tag: "Métricas",
    title: "Definição de dashboard de acompanhamento de feature",
    description: "Mapeia as visualizações e métricas necessárias para monitorar o sucesso pós-lançamento.",
    prompt: `Você é Product Owner planejando a instrumentação de métricas após o lançamento da funcionalidade [NOME DA FEATURE].

O que a feature faz e os objetivos de negócio esperados: [DESCREVA]
Ferramentas de analytics integradas ao produto (ex: Amplitude, Mixpanel, Google Analytics): [DESCREVA]

Gere a especificação técnica do dashboard de produto contendo:
1. Os 4 principais gráficos/visualizações necessários no painel (ex: taxa de uso ativo diário, tempo de sessão no fluxo, taxa de conclusão de tarefa, funil de conclusão)
2. Métricas de engajamento detalhadas (frequência de uso por usuário, distribuição de eventos por perfil)
3. Segmentações recomendadas para análise dos dados (ex: por plano de conta, por dispositivo, por tempo de casa do usuário)
4. Métrica de guarda a ser adicionada no dashboard para monitorar efeitos colaterais
5. Regras de taggabilidade (especificação dos eventos e propriedades a serem disparados no código, ex: event_name="click_checkout" com property "payment_method")`,
  },
  {
    id: "p38",
    role: "po",
    tag: "Discovery",
    title: "Plano de mitigação de riscos de produto",
    description: "Identifica riscos de valor, viabilidade, usabilidade e negócio e planeja mitigações.",
    prompt: `Você é Product Manager especialista em redução de riscos de produto (framework Marty Cagan). Avalie a iniciativa [NOME DA INICIATIVA/FEATURE] contra as 4 grandes categorias de risco de produto.

Descrição da funcionalidade idealizada e como o usuário se beneficia:
[DESCREVA A FUNCIONALIDADE]

Estruture o plano de análise e mitigação contendo:
1. **Risco de Valor** (O usuário vai comprar ou escolher usar isso? Mitigações propostas: testes conceituais, testes de fumaça)
2. **Risco de Usabilidade** (O usuário consegue entender como usar? Mitigações propostas: prototipagem de alta fidelidade, testes de usabilidade)
3. **Risco de Viabilidade Técnica** (Nossos engenheiros conseguem construir com a stack atual e no prazo? Mitigações propostas: spikes técnicos com arquitetura, provas de conceito de engenharia)
4. **Risco de Viabilidade de Negócio** (Essa solução funciona para as outras áreas da nossa empresa - financeiro, jurídico, suporte? Mitigações propostas: validação com stakeholders e conformidade de termos legais)
5. Matriz priorizada dos riscos identificados com o plano de ação imediato para cada um antes do início do desenvolvimento`,
  },
  {
    id: "p39",
    role: "po",
    tag: "Backlog",
    title: "Fatiamento de histórias de usuário (Slicing)",
    description: "Divide histórias de usuário complexas em entregáveis pequenos e testáveis de menor esforço.",
    prompt: `Você é Product Owner especialista em fatiamento (slicing) de histórias de usuário. Ajude-me a dividir a funcionalidade complexa abaixo em histórias menores, de baixo risco e que agreguem valor de forma incremental.

História complexa original (ou requisitos brutos):
[DESCREVA A HISTÓRIA ORIGINAL QUE PARECE GRANDE DEMAIS PARA UMA SPRINT]

Linguagem geral ou restrições técnicas já identificadas: [LISTE, SE HOUVER]

Utilize as estratégias clássicas de fatiamento (slicing por fluxo de usuário, por caminhos de erro vs feliz, por dados de entrada, ou por complexidade de regras):
1. Análise da complexidade da história original
2. Divisão em 3 a 5 histórias menores e independentes, escritas no formato padrão ("Como... quero... para...")
3. Critérios de aceitação simplificados para cada uma das novas histórias fatiadas
4. Como estruturar a sequência de desenvolvimento dessas histórias menores para que o progresso seja demonstrado em funcionamento a cada sprint`,
  },
  {
    id: "p40",
    role: "po",
    tag: "Estratégia",
    title: "Análise de viabilidade de internacionalização (i18n)",
    description: "Avalia os impactos de tradução, formatação e localização no produto para o mercado externo.",
    prompt: `Atue como Product Manager especialista em localização (L10n) e internacionalização (i18n). Crie um brief estratégico de viabilidade para preparar o produto [NOME DO PRODUTO] para expansão para o mercado dos seguintes países: [LISTE OS PAÍSES ALVO].

Mercado atual do produto e fluxo principal hoje: [DESCREVA]

Gere a análise estratégica detalhando:
1. Requisitos de i18n técnico (suporte a múltiplos idiomas no código, formatação dinâmica de moedas locais, fuso horário, datas e formatos de números)
2. Necessidades de localização cultural (adaptação de terminologias de mercado, formas de pagamento locais preferidas nos países alvos)
3. Desafios de atendimento ao cliente e suporte regulatório (leis de privacidade equivalentes como GDPR, infraestrutura de atendimento em outro idioma)
4. Mapeamento de concorrência local nas regiões selecionadas e diferenciais necessários para competir
5. Plano de lançamento em fases de validação linguística e cultural`,
  },

// --------------------------------------------------------------------- PM
  {
    id: "m1",
    role: "pm",
    tag: "Planejamento",
    title: "Cronograma / EAP (WBS) de projeto",
    description: "Quebra um projeto em uma estrutura analítica de trabalho com prazos.",
    prompt: `Atue como Gerente de Projetos experiente. Crie a Estrutura Analítica do Projeto (EAP/WBS) para o projeto [NOME DO PROJETO].

Escopo geral do projeto: [DESCREVA O OBJETIVO E ENTREGÁVEIS PRINCIPAIS]
Prazo final desejado: [DATA OU DURAÇÃO]
Equipe e recursos disponíveis: [DESCREVA PAPÉIS E QUANTIDADE DE PESSOAS]
Restrições conhecidas: [LISTE, ex: dependências externas, feriados, datas fixas]

Entregue:
1. A EAP em formato hierárquico (Fase > Entregável > Tarefa), numerada
2. Para cada tarefa: responsável sugerido (por papel, não nome), duração estimada e dependências (o que precisa terminar antes)
3. Marcos (milestones) principais do projeto com datas sugeridas
4. O caminho crítico identificado (sequência de tarefas que definem o prazo final)
5. Alertas sobre qualquer tarefa com prazo apertado dado o total de recursos informado

Apresente também um resumo em formato de tabela pronta para eu importar em uma ferramenta de gestão de projetos.`,
  },
  {
    id: "m2",
    role: "pm",
    tag: "Comunicação",
    title: "Ata de reunião com action items",
    description: "Transforma anotações soltas de reunião em uma ata estruturada e acionável.",
    prompt: `Você é Gerente de Projetos responsável por documentar reuniões. Transforme as anotações abaixo em uma ata de reunião clara e acionável.

Anotações brutas da reunião (podem estar desorganizadas):
[COLE SUAS ANOTAÇÕES, transcrição ou lista de tópicos discutidos]

Participantes: [LISTE OS NOMES/PAPÉIS]
Data e objetivo da reunião: [DATA E OBJETIVO]

Estruture a ata com:
1. Resumo executivo (2-3 linhas sobre o que foi decidido no geral)
2. Pauta discutida (tópicos, na ordem em que foram tratados)
3. Decisões tomadas, cada uma citando quem decidiu e o racional quando disponível nas notas
4. Ação items em tabela: Ação | Responsável | Prazo | Status inicial — extraídos apenas do que foi efetivamente mencionado, sem inventar responsáveis
5. Pontos em aberto que ficaram sem decisão e precisam de acompanhamento
6. Data sugerida para o follow-up, se aplicável

Se as anotações não deixarem claro quem ficou responsável por uma ação, marque como "[A DEFINIR]" em vez de presumir um nome.`,
  },
  {
    id: "m3",
    role: "pm",
    tag: "Reporte",
    title: "Relatório de status semanal de projeto",
    description: "Gera um status report claro para stakeholders a partir dos dados da semana.",
    prompt: `Atue como Gerente de Projetos preparando o relatório de status semanal do projeto [NOME DO PROJETO] para stakeholders.

Situação desta semana (progresso, bloqueios, riscos, decisões pendentes):
[DESCREVA O QUE ACONTECEU NA SEMANA]

Status do cronograma (no prazo, atrasado, adiantado) e do orçamento, se aplicável: [DESCREVA]
Público que vai ler o relatório (executivo, técnico, cliente): [DESCREVA]

Gere um relatório de status com:
1. Indicador geral do projeto (verde/amarelo/vermelho) com justificativa objetiva de 1 linha
2. Principais entregas concluídas na semana
3. Principais atividades planejadas para a próxima semana
4. Riscos e bloqueios ativos, cada um com impacto, plano de mitigação e responsável
5. Decisões que precisam da audiência para destravar o projeto
6. Uma versão resumida de 3 linhas para ser lida em 15 segundos, no topo do relatório

Ajuste o nível de detalhe técnico conforme o público informado.`,
  },
  {
    id: "m4",
    role: "pm",
    tag: "Riscos",
    title: "Registro de riscos e plano de mitigação",
    description: "Estrutura um registro de riscos (risk register) completo do projeto.",
    prompt: `Você é Gerente de Projetos responsável pela gestão de riscos. Com base no contexto abaixo, monte o registro de riscos do projeto [NOME DO PROJETO].

Descrição do projeto e contexto (escopo, prazo, equipe, dependências externas): [DESCREVA]
Riscos já identificados informalmente pelo time, se houver: [LISTE]

Para cada risco (identifique ao menos 6, cobrindo dimensões diferentes: técnica, de escopo, de pessoas, de fornecedor externo, de prazo e financeira), entregue em formato de tabela:
Risco | Categoria | Probabilidade (Baixa/Média/Alta) | Impacto (Baixo/Médio/Alto) | Score (Probabilidade x Impacto) | Gatilho de alerta (o que indicaria que o risco está se materializando) | Ação de mitigação preventiva | Plano de contingência caso ocorra | Responsável por monitorar

Ao final:
1. Ordene os riscos do maior para o menor score
2. Destaque os 2 riscos que merecem atenção da liderança imediatamente
3. Sugira a frequência ideal de revisão deste registro dado o perfil do projeto`,
  },
  {
    id: "m5",
    role: "pm",
    tag: "Comunicação",
    title: "Comunicação de atraso/replanejamento",
    description: "Redige uma comunicação transparente sobre atraso ou mudança de prazo.",
    prompt: `Atue como Gerente de Projetos redigindo uma comunicação para stakeholders sobre um atraso ou replanejamento no projeto [NOME DO PROJETO].

O que causou o atraso/mudança: [DESCREVA O MOTIVO REAL]
Impacto no prazo/escopo/custo: [DESCREVA O NOVO CENÁRIO]
O que já está sendo feito para mitigar: [DESCREVA AS AÇÕES EM ANDAMENTO]
Público que receberá a comunicação (cliente externo, diretoria, equipe): [DESCREVA]

Escreva a comunicação com:
1. Abertura direta que já indica o fato principal (o atraso/mudança), sem enrolação nem excesso de justificativa antes do fato
2. Explicação objetiva da causa, sem transferir culpa a uma pessoa específica
3. Novo prazo/plano proposto e o que ele significa na prática para a audiência
4. Ações de mitigação em curso para reduzir o impacto ou evitar recorrência
5. Um próximo ponto de checkpoint/atualização com data definida
6. Tom apropriado ao público (mais formal para cliente externo, mais direto para a equipe interna)

Evite linguagem defensiva; o objetivo é transparência e confiança, não justificativa excessiva.`,
  },
  {
    id: "m6",
    role: "pm",
    tag: "Cerimônias ágeis",
    title: "Roteiro de retrospectiva de sprint",
    description: "Planeja uma retrospectiva ágil com dinâmica e perguntas orientadoras.",
    prompt: `Você é Gerente de Projetos/Scrum Master facilitando a retrospectiva da Sprint [NÚMERO/PERÍODO] do time [NOME DO TIME].

Contexto da sprint (eventos marcantes, entregas, imprevistos): [DESCREVA O QUE ACONTECEU NA SPRINT]
Formato preferido de dinâmica: [ex: "Start/Stop/Continue", "Mad Sad Glad", "4Ls" — ou peça uma sugestão]
Tempo disponível para a reunião: [DURAÇÃO]

Monte o roteiro com:
1. Abertura (1-2 min): como criar segurança psicológica para feedback honesto
2. Dinâmica escolhida, com o passo a passo de como conduzi-la e o tempo sugerido para cada etapa
3. Perguntas orientadoras específicas para o contexto desta sprint (não genéricas), baseadas nos eventos mencionados
4. Método de priorização dos pontos levantados (ex: votação por pontos) para escolher no que agir
5. Modelo de action items a preencher ao final: Ação | Responsável | Como saberemos que funcionou
6. Fechamento sugerido (como encerrar de forma positiva e reforçar os combinados)`,
  },
  {
    id: "m7",
    role: "pm",
    tag: "Planejamento",
    title: "Plano de comunicação do projeto (RACI)",
    description: "Define papéis, responsabilidades e canais de comunicação do projeto.",
    prompt: `Atue como Gerente de Projetos estruturando o plano de comunicação e a matriz RACI do projeto [NOME DO PROJETO].

Principais entregáveis/decisões do projeto: [LISTE OS PRINCIPAIS ENTREGÁVEIS OU DECISÕES-CHAVE]
Papéis envolvidos (equipe, stakeholders, cliente, fornecedores): [LISTE OS PAPÉIS]

Entregue:
1. Matriz RACI (Responsável, Aprovador, Consultado, Informado) em tabela, cruzando cada entregável/decisão-chave com cada papel envolvido
2. Plano de comunicação: para cada tipo de informação (status, riscos, decisões, mudanças de escopo), defina canal (e-mail, reunião, dashboard), frequência e audiência
3. Regras de escalonamento: em que situação um problema deve subir de nível e para quem
4. Um calendário sugerido dos rituais de comunicação recorrentes (dailies, status semanal, comitê mensal etc.), conforme o porte do projeto

Sinalize qualquer papel que apareça como Responsável e Aprovador ao mesmo tempo na mesma linha, pois isso costuma indicar risco de falta de checagem independente.`,
  },
  {
    id: "m8",
    role: "pm",
    tag: "Encerramento",
    title: "Post-mortem / lições aprendidas de projeto",
    description: "Conduz uma análise pós-projeto estruturada e sem caça às bruxas.",
    prompt: `Você é Gerente de Projetos conduzindo o post-mortem (lições aprendidas) do projeto [NOME DO PROJETO], recém-concluído ou encerrado.

Resumo do que aconteceu (prazo original x real, escopo original x entregue, principais eventos): [DESCREVA]
Dados/feedback já coletados da equipe, se houver: [COLE, SE HOUVER]

Estruture o documento de post-mortem com:
1. Linha do tempo resumida do projeto (principais marcos, decisões e desvios em relação ao plano original)
2. O que funcionou bem, e por quê (para repetir em projetos futuros)
3. O que não funcionou, analisado por causa raiz (não apenas o sintoma), evitando atribuir falha a uma pessoa específica e focando em processo e contexto
4. Métricas finais do projeto comparadas ao planejado (prazo, escopo, custo, qualidade)
5. Lições aprendidas acionáveis, cada uma reescrita como uma mudança concreta de processo para o próximo projeto (não apenas "ter mais cuidado")
6. Reconhecimento explícito ao time pelo trabalho realizado

Mantenha tom construtivo e orientado a aprendizado, nunca a culpabilização individual.`,
  },
  {
    id: "m9",
    role: "pm",
    tag: "Planejamento",
    title: "Termo de abertura de projeto (project charter)",
    description: "Redige o documento formal que autoriza e enquadra o início de um projeto.",
    prompt: `Atue como Gerente de Projetos redigindo o termo de abertura (project charter) do projeto [NOME DO PROJETO].

Motivação/problema de negócio que originou o projeto: [DESCREVA]
Patrocinador(a) e principais stakeholders: [LISTE]
Restrições já conhecidas (prazo, orçamento, escopo mínimo): [DESCREVA]

Estruture o termo de abertura com:
1. Justificativa do projeto (por que ele existe, conectado a um objetivo de negócio)
2. Objetivos do projeto, escritos de forma específica e mensurável
3. Escopo de alto nível: o que está incluso e o que está explicitamente fora
4. Principais entregáveis
5. Marcos macro e prazo estimado
6. Orçamento estimado, se aplicável
7. Principais riscos já identificados nesta fase inicial
8. Papéis e responsabilidades de alto nível (patrocinador, gerente de projeto, principais áreas envolvidas)
9. Critérios de sucesso do projeto

Mantenha o documento em nível estratégico (1-2 páginas); detalhamento operacional fica para o plano de projeto.`,
  },
  {
    id: "m10",
    role: "pm",
    tag: "Stakeholders",
    title: "Mapeamento de stakeholders (poder x interesse)",
    description: "Identifica e classifica as partes interessadas para direcionar o esforço de engajamento.",
    prompt: `Você é Gerente de Projetos mapeando os stakeholders do projeto [NOME DO PROJETO] para direcionar o esforço de comunicação e engajamento.

Lista de stakeholders identificados (pessoas, áreas ou grupos que afetam ou são afetados pelo projeto): [LISTE]
Contexto de cada um (o que esperam do projeto, historico de engajamento em projetos anteriores, se souber): [DESCREVA]

Entregue:
1. Classificação de cada stakeholder na matriz Poder x Interesse (Alto/Baixo em cada eixo), com justificativa
2. Estratégia de engajamento recomendada para cada quadrante da matriz (ex: "gerenciar de perto", "manter satisfeito", "manter informado", "monitorar")
3. Para os stakeholders de Alto Poder, uma recomendação específica de frequência e formato de comunicação
4. Riscos de relacionamento identificados (ex: stakeholder historicamente resistente, expectativas desalinhadas) e como mitigá-los
5. Um stakeholder que pode estar sendo subestimado no mapeamento atual e por que vale a pena reconsiderar sua classificação`,
  },
  {
    id: "m11",
    role: "pm",
    tag: "Planejamento",
    title: "Planejamento de orçamento de projeto",
    description: "Estrutura a estimativa de custos e o acompanhamento orçamentário do projeto.",
    prompt: `Atue como Gerente de Projetos responsável pelo planejamento orçamentário do projeto [NOME DO PROJETO].

Escopo e principais entregáveis do projeto: [DESCREVA]
Recursos envolvidos (pessoas, ferramentas, fornecedores externos) e duração estimada: [DESCREVA]
Orçamento total disponível, se já definido: [VALOR OU "A DEFINIR"]

Entregue:
1. Estrutura de custos por categoria (ex: pessoas/horas, ferramentas e licenças, fornecedores externos, contingência), com a lógica de estimativa de cada categoria
2. Uma reserva de contingência sugerida (percentual) com justificativa baseada no nível de incerteza do projeto
3. Distribuição do orçamento ao longo do tempo (por fase ou por mês), destacando os períodos de maior desembolso
4. Indicadores para acompanhar a saúde orçamentária durante a execução (ex: valor agregado, CPI — Cost Performance Index — se aplicável ao porte do projeto)
5. Critério para quando escalar um estouro de orçamento para o patrocinador
6. Premissas assumidas na estimativa que, se mudarem, exigiriam revisão do orçamento`,
  },
  {
    id: "m12",
    role: "pm",
    tag: "Cerimônias ágeis",
    title: "Roteiro de reunião de kickoff de projeto",
    description: "Planeja a reunião de abertura que alinha todo o time ao início do projeto.",
    prompt: `Você é Gerente de Projetos planejando a reunião de kickoff do projeto [NOME DO PROJETO].

Participantes (papéis) e tempo disponível para a reunião: [DESCREVA]
Informações já definidas sobre o projeto (objetivo, escopo, prazo, papéis): [DESCREVA OU REFERENCIE O TERMO DE ABERTURA]

Monte o roteiro com:
1. Objetivo da reunião (o que todos precisam sair entendendo e alinhados)
2. Agenda com blocos de tempo: abertura e contexto de negócio, apresentação de objetivos e escopo, papéis e responsabilidades, cronograma macro e marcos, riscos conhecidos, e espaço para perguntas
3. Para cada bloco, quem apresenta e os pontos-chave a cobrir
4. Como conduzir a rodada de perguntas para evitar que só as vozes mais assertivas do time se manifestem
5. O que deve ficar registrado como output da reunião (ex: dúvidas em aberto, ajustes de escopo levantados)
6. Uma mensagem de fechamento que reforce o senso de propósito compartilhado do time`,
  },
  {
    id: "m13",
    role: "pm",
    tag: "Planejamento",
    title: "Gestão de dependências entre times/projetos",
    description: "Mapeia e acompanha dependências externas que podem impactar o cronograma.",
    prompt: `Atue como Gerente de Projetos mapeando as dependências externas do projeto [NOME DO PROJETO] com outros times ou projetos.

Entregáveis do seu projeto que dependem de outras áreas, ou que outras áreas dependem do seu: [DESCREVA]
Times/projetos envolvidos: [LISTE]

Entregue:
1. Tabela de dependências: O que é necessário | De quem/qual time | Data necessária | Status atual | Risco se atrasar
2. Classificação de cada dependência como "bloqueante" (impede o progresso se não for entregue) ou "não-bloqueante" (atrasa mas não impede)
3. Para cada dependência bloqueante, um plano de contingência caso o prazo não seja cumprido pela outra parte
4. Cadência sugerida de acompanhamento dessas dependências (ex: checkpoint semanal com os pontos focais de cada time)
5. Como escalar uma dependência em risco antes que ela vire um bloqueio real, incluindo para quem escalar
6. Riscos de dependências circulares (dois times esperando um pelo outro) e como identificá-los`,
  },
  {
    id: "m14",
    role: "pm",
    tag: "Fornecedores",
    title: "Plano de onboarding de fornecedor terceirizado",
    description: "Estrutura a integração de um fornecedor/parceiro externo ao projeto.",
    prompt: `Você é Gerente de Projetos responsável por integrar o fornecedor/parceiro [NOME DO FORNECEDOR] ao projeto [NOME DO PROJETO].

Escopo contratado com o fornecedor: [DESCREVA O QUE FOI CONTRATADO]
Nível de acesso que o fornecedor precisará (sistemas, dados, ambientes): [DESCREVA]
Duração do contrato/engajamento: [PERÍODO]

Entregue:
1. Checklist de onboarding: acessos a provisionar, documentação a compartilhar, e apresentações necessárias (equipe, processo, ferramentas)
2. Marco de "primeira entrega" de baixo risco para validar que o fornecedor entendeu o escopo antes de assumir tarefas críticas
3. Acordo de nível de serviço (SLA) ou expectativas de qualidade/prazo a formalizar, se ainda não definidos
4. Cadência de acompanhamento recomendada (reuniões de status, formato de reporte do fornecedor)
5. Critérios objetivos para avaliar a performance do fornecedor ao longo do projeto
6. Plano de saída/transição de conhecimento para o fim do contrato, definido desde o início`,
  },
  {
    id: "m15",
    role: "pm",
    tag: "Negociação",
    title: "Negociação de prazo/escopo com o cliente",
    description: "Prepara uma negociação estruturada quando prazo, escopo e recursos não fecham a conta.",
    prompt: `Atue como Gerente de Projetos se preparando para negociar com o cliente/patrocinador do projeto [NOME DO PROJETO], já que o prazo, o escopo e os recursos atuais não são compatíveis entre si.

Situação atual (o que foi prometido, o que é realista, e por que há o descompasso): [DESCREVA]
Restrições reais da equipe (capacidade, dependências, riscos técnicos): [DESCREVA]
O que é mais importante para o cliente, se souber (prazo fixo, escopo completo, ou orçamento): [DESCREVA]

Prepare a negociação com:
1. Um resumo objetivo da situação para abrir a conversa, sem parecer uma desculpa
2. Ao menos 3 opções concretas de trade-off (ex: "reduzir escopo para a data original", "manter escopo com nova data", "manter ambos com recursos adicionais"), cada uma com prós, contras e o que o cliente ganha/perde
3. Uma recomendação de qual opção o time considera mais equilibrada, e por quê
4. Argumentos preparados para as objeções mais prováveis do cliente a cada opção
5. O que você precisa que o cliente decida ao final da conversa, e até quando essa decisão precisa ser tomada para não gerar mais atraso
6. Tom recomendado para a conversa (colaborativo, apresentando dados, não indo à defensiva)`,
  },
  {
    id: "m16",
    role: "pm",
    tag: "Cerimônias ágeis",
    title: "Roteiro de daily/standup eficaz",
    description: "Estrutura ou diagnostica reuniões diárias de acompanhamento do time.",
    prompt: `Você é Gerente de Projetos/Scrum Master responsável por tornar as reuniões diárias (daily/standup) do time [NOME DO TIME] mais eficazes.

Situação atual das dailies (duração real, o que costuma acontecer, problemas percebidos, ex: "vira status report para o gerente", "sempre estoura o tempo"): [DESCREVA]
Tamanho do time e formato (presencial, remoto, híbrido): [DESCREVA]

Entregue:
1. Diagnóstico do que está causando a ineficácia atual, com base no que foi descrito
2. Estrutura recomendada da daily (as perguntas ou o formato, ex: baseado no quadro/board em vez de pessoa por pessoa) e por que esse formato resolve o problema identificado
3. Regras claras de tempo (duração alvo e o que fazer quando uma discussão precisa se estender — "parking lot" para depois)
4. Papel do facilitador durante a reunião (o que fazer quando alguém trava a conversa em detalhes técnicos, ou quando ninguém fala)
5. Como adaptar o formato para times remotos/híbridos sem perder a eficácia
6. Um sinal de alerta (o que observar) que indicaria que a daily virou apenas um ritual sem valor real, para revisar o formato novamente`,
  },
  {
    id: "m17",
    role: "pm",
    tag: "Qualidade",
    title: "Plano de gestão da qualidade do projeto",
    description: "Define como a qualidade dos entregáveis será garantida ao longo do projeto.",
    prompt: `Atue como Gerente de Projetos definindo o plano de gestão da qualidade do projeto [NOME DO PROJETO].

Principais entregáveis do projeto: [LISTE]
Critérios de qualidade já exigidos (por contrato, por norma, ou por padrão interno): [DESCREVA, SE HOUVER]
Histórico de problemas de qualidade em projetos anteriores semelhantes, se houver: [DESCREVA]

Entregue:
1. Padrões de qualidade definidos para cada entregável principal (o que torna esse entregável "aceitável")
2. Atividades de garantia da qualidade (prevenção) a serem feitas durante o projeto, não apenas ao final
3. Atividades de controle da qualidade (verificação) e em qual momento do cronograma cada uma acontece
4. Papéis responsáveis por aprovar a qualidade de cada entregável antes de considerá-lo concluído
5. Processo para tratar um entregável que não atende ao padrão de qualidade definido (retrabalho, critério de aceitação de exceção)
6. Métricas de qualidade a acompanhar ao longo do projeto (ex: taxa de retrabalho, número de defeitos encontrados por fase)`,
  },
  {
    id: "m18",
    role: "pm",
    tag: "Planejamento",
    title: "Análise de capacidade e alocação da equipe",
    description: "Avalia se a equipe tem capacidade para o volume de trabalho planejado.",
    prompt: `Você é Gerente de Projetos avaliando a capacidade da equipe para o volume de trabalho planejado no período [PERÍODO].

Equipe disponível (papéis, quantidade de pessoas, e percentual de dedicação a este projeto se não for 100%): [DESCREVA]
Volume de trabalho planejado (lista de entregáveis/tarefas com estimativas, se houver): [DESCREVA OU COLE]
Ausências ou restrições conhecidas no período (férias, feriados, outros compromissos): [LISTE]

Entregue:
1. Cálculo da capacidade real disponível por papel/pessoa no período, descontando ausências e dedicação parcial
2. Comparação entre capacidade disponível e volume de trabalho planejado, identificando papéis com sobrealocação ou ociosidade
3. Riscos concretos de sobrecarga (não apenas "o time está ocupado", mas onde exatamente o gargalo está)
4. Opções para resolver um desbalanceamento identificado (redistribuir tarefas, ajustar prazo, trazer recurso adicional, reduzir escopo)
5. Uma recomendação de qual opção parece mais viável dado o contexto descrito
6. Um alerta sobre dependência excessiva de uma única pessoa em algum papel crítico (risco de "bus factor")`,
  },
  {
    id: "m19",
    role: "pm",
    tag: "Mudanças",
    title: "Solicitação e gestão de mudança de escopo",
    description: "Formaliza e avalia o impacto de uma mudança solicitada durante o projeto.",
    prompt: `Atue como Gerente de Projetos avaliando uma solicitação de mudança de escopo no projeto [NOME DO PROJETO].

Mudança solicitada: [DESCREVA O QUE ESTÁ SENDO PEDIDO]
Quem solicitou e a justificativa apresentada: [DESCREVA]
Escopo, prazo e orçamento originais do projeto: [DESCREVA]

Estruture a análise de impacto (change request) com:
1. Descrição objetiva da mudança solicitada e sua motivação
2. Impacto no escopo (o que muda em relação ao originalmente combinado)
3. Impacto no cronograma (novo prazo estimado, ou o que precisaria ser cortado para manter o prazo original)
4. Impacto no orçamento/recursos, se aplicável
5. Impacto no risco geral do projeto (a mudança introduz novos riscos?)
6. Recomendação: aceitar, aceitar com ajuste de prazo/orçamento, rejeitar, ou adiar para uma fase futura — com justificativa
7. Quem precisa aprovar essa mudança antes de ela ser incorporada ao plano

Não incorpore a mudança ao planejamento automaticamente; o objetivo deste documento é subsidiar uma decisão formal.`,
  },
  {
    id: "m20",
    role: "pm",
    tag: "Encerramento",
    title: "Apresentação de encerramento de projeto",
    description: "Prepara a apresentação final de entrega e fechamento do projeto para stakeholders.",
    prompt: `Você é Gerente de Projetos preparando a apresentação de encerramento do projeto [NOME DO PROJETO] para os stakeholders.

Resultado final do projeto (o que foi entregue, comparado ao planejado originalmente): [DESCREVA]
Métricas de sucesso definidas no início do projeto e o resultado alcançado em cada uma: [DESCREVA]
Próximos passos após o encerramento (quem assume a operação/manutenção do que foi entregue): [DESCREVA]

Estruture a apresentação com:
1. Abertura com o objetivo original do projeto, para relembrar a audiência do "porquê"
2. Resumo dos principais entregáveis, com destaque visual para o que gerou mais valor
3. Comparação objetiva entre planejado e realizado (prazo, escopo, orçamento), com explicação honesta de desvios relevantes
4. Principais aprendizados do projeto, em tom construtivo
5. Reconhecimento da equipe e dos parceiros envolvidos
6. Transição clara: quem é responsável pelo que foi entregue a partir de agora, e o que a audiência precisa saber para esse período pós-projeto
7. Uma pergunta final aberta para a audiência, convidando feedback sobre o processo do projeto em si`,
  },

  {
    id: "m21",
    role: "pm",
    tag: "Planejamento",
    title: "Planejamento de Release Planning",
    description: "Estrutura as entregas de longo prazo organizando sprints em uma release consistente.",
    prompt: `Você é Gerente de Projetos especialista em metodologias ágeis em escala. Crie o plano estratégico de Release Planning (Planejamento de Versão/Release) para o produto [NOME DO PRODUTO] cobrindo as próximas sprints.

Iniciativas mapeadas para o ciclo: [LISTE AS INICIATIVAS]
Duração da sprint (ex: 2 semanas) e capacidade estimada do time: [DESCREVA]
Marcos contratuais ou datas fixas importantes: [DESCREVA]

Gere o planejamento estruturado contendo:
1. Cronograma macro das sprints estimadas para a release (ex: Sprint 1 a Sprint 6)
2. Escopo sugerido de entrega por sprint, considerando dependências técnicas entre as tarefas
3. Plano de mitigação de capacidade (como reagir se a velocidade média do time cair X%)
4. Regras de congelamento de escopo (Code Freeze) e homologação necessárias antes do deploy em produção
5. Modelo de comunicação semanal do progresso da release para as outras áreas da empresa`,
  },
  {
    id: "m22",
    role: "pm",
    tag: "Cerimônias ágeis",
    title: "Roteiro de Sprint Planning (Planejamento de Sprint)",
    description: "Estrutura a reunião de planejamento com foco em metas de valor e divisão de tarefas.",
    prompt: `Atue como Scrum Master / Agile Project Manager. Crie o roteiro detalhado para conduzir a reunião de Sprint Planning (Planejamento da Sprint) do time [NOME DO TIME] com duração máxima de [DURAÇÃO] horas.

Backlog de produto priorizado e capacidade estimada do time para a sprint: [DESCREVA]
Meta do trimestre relacionada a essa sprint: [DESCREVA]

Monte o roteiro contendo:
1. Rito de abertura (revisão da meta do trimestre e da velocidade do time na sprint anterior para calibração)
2. Agenda dividida em Blocos de Tempo (Parte 1: O quê - alinhamento da meta da sprint com o PO; Parte 2: Como - quebra técnica e estimativas dos devs)
3. Perguntas orientadoras para ajudar o time a definir a Meta da Sprint de forma clara (que responda "qual valor entregaremos no fim das 2 semanas?")
4. Critérios para validar a alocação e evitar a sobrecarga de trabalho do time antes do início da sprint
5. Resumo das tarefas e acordos que devem ser compartilhados nos canais do time após a reunião`,
  },
  {
    id: "m23",
    role: "pm",
    tag: "Comunicação",
    title: "Relatório de Status Mensal para Diretoria (Steering Committee)",
    description: "Gera relatórios consolidados e com foco financeiro e estratégico para a liderança.",
    prompt: `Atue como Gerente de Projetos sênior preparando o relatório de status mensal (Steering Committee Report) do projeto [NOME DO PROJETO] para a diretoria e patrocinadores.

Resumo dos principais acontecimentos e métricas financeiras/operacionais do mês:
[DESCREVA OS ACONTECIMENTOS DO MÊS, ex: projeto consumiu 60% do orçamento, entrega atrasada por problemas com fornecedor]

Status geral do projeto (Semáforo: Verde, Amarelo, Vermelho) e progresso atual: [STATUS]

Escreva o relatório executivo contendo:
1. Resumo executivo de 1 parágrafo (foco na saúde estratégica e retorno do investimento do projeto)
2. Visão de marcos do projeto: Planejado vs. Realizado no mês
3. Resumo financeiro de custos (orçamento planejado vs. real, projeção de gastos até o fim do projeto)
4. Gestão de riscos críticos que exigem decisão da liderança (impactos de prazos, necessidade de recursos adicionais)
5. Ações estratégicas aprovadas para o próximo mês
6. Tom formal, claro e focado nas decisões necessárias`,
  },
  {
    id: "m24",
    role: "pm",
    tag: "Métricas",
    title: "Análise de métricas de fluxo Kanban",
    description: "Avalia tempos de entrega (Lead/Cycle Time) e vazão para otimizar processos.",
    prompt: `Você é Agile Coach / Gerente de Projetos especialista em métricas de fluxo. Analise os dados de fluxo de trabalho do time listados abaixo para identificar gargalos e propor melhorias de processo.

Métricas de fluxo coletadas (Lead Time médio, Cycle Time por etapa, Throughput/Vazão por semana, CFD - Cumulative Flow Diagram se disponível):
[COLE OU DESCREVA OS NÚMEROS E GRÁFICOS DO FLUXO]

Entregue:
1. Diagnóstico do fluxo (etapas em que as tarefas passam mais tempo aguardando - filas, sobrecarga de trabalho em progresso - WIP)
2. Análise de previsibilidade do time baseado no histórico de cycle time (ex: probabilidade de entrega em X dias)
3. Proposta prática para redução do cycle time (redefinição de limites de WIP, regras de desimpedimento de blocos)
4. Como utilizar o CFD para monitorar a estabilidade do fluxo de trabalho do time nas próximas semanas
5. Plano de acompanhamento das melhorias com o time na retrospectiva`,
  },
  {
    id: "m25",
    role: "pm",
    tag: "Riscos",
    title: "Plano de recuperação de projeto crítico (Troubled Project Recovery)",
    description: "Estrutura as ações imediatas para reorganizar escopo, prazos e equipe em projetos atrasados.",
    prompt: `Atue como Gerente de Crise / Gerente de Projetos sênior. Crie um plano de recuperação emergencial (Troubled Project Recovery Plan) para o projeto [NOME DO PROJETO] que está com atrasos severos, estouro de orçamento ou insatisfação grave do cliente.

Situação atual de colapso do projeto (principais motivos do atraso, conflitos internos, dados de desvio do plano original):
[DESCREVA A CRISE DO PROJETO]

Restrições inegociáveis para o sucesso (data limite rígida, orçamento máximo restante): [DESCREVA]

Gere o plano de recuperação contendo:
1. Diagnóstico rápido de causa raiz (por que o projeto chegou ao estado atual de crise)
2. Ações de contenção de curto prazo (primeiros 7 dias: pausar desenvolvimento supérfluo, redefinir acordos, limpar pendências críticas)
3. Plano de renegociação de escopo (fatiamento agressivo para a entrega de um incremento mínimo aceitável - MVP de crise)
4. Plano de comunicação em crise (cadência diária de atualização para stakeholders para recuperar a confiança)
5. Reestruturação de papéis e responsabilidades temporários da equipe para a fase de recuperação`,
  },
  {
    id: "m26",
    role: "pm",
    tag: "Planejamento",
    title: "Definição de Acordo de Trabalho do time (Working Agreement)",
    description: "Facilita a definição de regras de convivência, comunicação e rotinas entre os membros da equipe.",
    prompt: `Você é Scrum Master / Agile Project Manager. Crie um guia estruturado para facilitar a elaboração de um Acordo de Trabalho (Working Agreement) para o time [NOME DO TIME].

Desafios de comunicação ou alinhamento atuais percebidos na rotina: [DESCREVA, ex: reuniões fora do horário, mensagens espalhadas em múltiplos apps, código sem padrão]
Formato de trabalho da equipe: [ex: remoto assíncrono, híbrido flexível, presencial]

Gere a facilitação e a estrutura do acordo contendo:
1. Roteiro da dinâmica de cocriação do acordo com o time (perguntas que provocam debates construtivos)
2. Template com as seções centrais do Working Agreement:
   - Canais de Comunicação (o que se fala no Slack, o que vai por e-mail, ferramentas oficiais)
   - Horários e Disponibilidade (regras de sincronismo, janela de reuniões recomendada, direito ao desligamento)
   - Dinâmicas de Reunião (regras de pontualidade, câmera aberta, pautas antecipadas)
   - Processo de Desenvolvimento (responsabilidades de código, revisões de PR e QA)
3. Como revisar e atualizar o acordo periodicamente nas retrospectivas`,
  },
  {
    id: "m27",
    role: "pm",
    tag: "Negociação",
    title: "Mediação e resolução de conflitos na equipe",
    description: "Planeja abordagens estruturadas para resolver atritos e desentendimentos entre membros do time.",
    prompt: `Você é Gerente de Projetos focado em liderança de pessoas e facilitação. Ajude-me a mediar um conflito ativo na equipe de projeto que está afetando o clima de trabalho e a produtividade.

Descrição do conflito (quem está envolvido - por papel, ex: dev vs designer, e o tema do desentendimento):
[DESCREVA O CONFLITO E OS PONTOS DE VISTA DE CADA PARTE]

Impacto do conflito no andamento do projeto: [DESCREVA]

Prepare um roteiro detalhado para a mediação:
1. Análise neutra do conflito (separando os fatos objetivos das opiniões e sentimentos envolvidos)
2. Estratégia de reunião individual de alinhamento com cada parte envolvida antes da mediação conjunta
3. Pauta e roteiro para a sessão de mediação conjunta (regras de respeito mútuo, dinâmica de escuta ativa)
4. Busca de pontos em comum e geração colaborativa de acordos/soluções
5. Plano de acompanhamento do clima do time pós-mediação para evitar reincidências`,
  },
  {
    id: "m28",
    role: "pm",
    tag: "Cerimônias ágeis",
    title: "Roteiro de Sprint Review e Demonstração",
    description: "Planeja a demonstração das entregas da sprint focando na coleta de feedbacks dos usuários/clientes.",
    prompt: `Você é Scrum Master / Agile Project Manager. Projete um roteiro detalhado para a realização de uma Sprint Review (Revisão da Sprint) e Demo do time [NOME DO TIME].

Principais entregáveis concluídos na sprint que serão demonstrados:
[LISTE AS ENTREGAS]
Participantes esperados na reunião (clientes finais, diretores, time interno): [DESCREVA]

Monte o roteiro de revisão contendo:
1. Objetivo da reunião (esclarecer que não é apenas um status report técnico, mas sim validação de valor com stakeholders)
2. Cronograma de apresentação de [DURAÇÃO] minutos (abertura de métricas da sprint, demonstração prática do produto rodando, coleta de feedbacks e próximos passos do roadmap)
3. Estratégia de demonstração prática (quem demonstra, como preparar o ambiente de demo antes para evitar erros na hora, foco no fluxo do usuário e não nas linhas de código)
4. Métodos para capturar feedbacks honestos dos participantes (perguntas direcionadas sobre usabilidade e utilidade da feature demonstrada)
5. Modelo de registro dos feedbacks coletados para o backlog do PO`,
  },
  {
    id: "m29",
    role: "pm",
    tag: "Planejamento",
    title: "Definição de DoR (Definition of Ready) e DoD (Definition of Done)",
    description: "Estrutura as condições necessárias para iniciar e concluir itens de backlog com qualidade.",
    prompt: `Atue como Agile Project Manager / Scrum Master. Crie o guia de definição de critérios de pronto (Definition of Ready - DoR e Definition of Done - DoD) para o time de desenvolvimento do produto [NOME DO PRODUTO].

Contexto do time (recorrência de problemas com histórias mal descritas ou código entregue incompleto): [DESCREVA]

Gere a especificação detalhada de:
1. **Definition of Ready (DoR)**: Checklist de critérios que um item de backlog precisa ter para ser puxado para a Sprint (ex: critérios de aceite descritos, wireframe anexado, dependências mapeadas, estimativa técnica inicial feita)
2. **Definition of Done (DoD)**: Checklist de critérios que um item precisa cumprir para ser considerado concluído no fim da sprint (ex: testes de unidade passando, revisão de código aprovada por 2 pessoas, deploy em staging, sem lints ativos, documentação técnica da API atualizada)
3. Processo de validação: como o time garante a aplicação desses checklists no fluxo diário (Kanban board) sem burocratizar demais o trabalho`,
  },
  {
    id: "m30",
    role: "pm",
    tag: "Stakeholders",
    title: "Plano de gerenciamento de expectativas de stakeholders difíceis",
    description: "Estrutura planos de ação para lidar com stakeholders resistentes ou desalinhados com o projeto.",
    prompt: `Você é Gerente de Projetos sênior focado em gestão de partes interessadas. Desenhe um plano estratégico de relacionamento e gerenciamento de expectativas para lidar com um stakeholder influente e com perfil difícil.

Perfil do stakeholder e seu papel no projeto (ex: diretor resistente à mudança ágil, cliente externo microgerenciador):
[DESCREVA O COMPORTAMENTO E O PAPEL DO STAKEHOLDER]

Impacto de suas atitudes na equipe de projeto: [DESCREVA]

Gere o plano estratégico contendo:
1. Análise da causa raiz do comportamento difícil do stakeholder (ex: insegurança por falta de visibilidade, histórico de projetos falhos passados, cobrança excessiva externa)
2. Estratégia de engajamento personalizada (ex: como alinhar os canais de contato preferidos por ele, nível de detalhamento dos relatórios a enviar)
3. Roteiro rápido de conversa para uma reunião de alinhamento individual focada em estabelecer limites de atuação saudáveis
4. Plano de contingência de escalonamento se o stakeholder bloquear processos críticos do projeto deliberadamente
5. Critérios para medir se a relação melhorou nas semanas seguintes`,
  },
  {
    id: "m31",
    role: "pm",
    tag: "Planejamento",
    title: "Plano de transição operacional e suporte (Hypercare)",
    description: "Planeja o período de assistência intensiva e o handover pós-lançamento de grandes funcionalidades.",
    prompt: `Atue como Gerente de Projetos de TI / Implantação. Crie o plano de transição operacional, encerramento de deploy e suporte pós-implantação (período de Hypercare) para a grande entrega do sistema [NOME DO SISTEMA].

Escopo do sistema implementado e data do deploy: [DESCREVA]
Equipes envolvidas no suporte técnico pós-deploy (suporte N1, N2, N3, engenharia do time de projeto): [LISTE]

Gere o plano de transição estruturado contendo:
1. Definição do período de Hypercare (duração sugerida, ex: 15 dias, e critérios de início e fim)
2. Protocolo de tratamento de incidentes durante a fase crítica (tempo de resposta SLA reduzido, prioridades urgentes)
3. Matriz de escalonamento rápido para incidentes críticos (quem acionar a qualquer hora em caso de falha sistêmica severa)
4. Roteiro e checklist para o Handover operacional (transferência de responsabilidades e documentação técnica para o time de suporte recorrente)
5. Critérios para considerar o Hypercare concluído com sucesso e desmobilizar a equipe de projeto`,
  },
  {
    id: "m32",
    role: "pm",
    tag: "Métricas",
    title: "Análise de Burndown e Burnup de Releases",
    description: "Avalia o ritmo de entregas das sprints para projetar a data provável de término da release.",
    prompt: `Você é Gerente de Projetos especialista em previsibilidade ágil. Analise as métricas de entrega e o progresso das sprints atuais da nossa release para projetar o encerramento do projeto.

Duração média das sprints, total de pontos planejados para a Release, e pontos entregues por sprint até o momento:
[COLE OU DESCREVA OS DADOS DE ENTREGAS DAS SPRINTS]

Desvios ou escopo novo adicionado no meio do caminho: [DESCREVA]

Entregue:
1. Análise objetiva do gráfico de Burndown/Burnup sugerido pelos dados (taxa de queima de pontos média, desvios notáveis)
2. Projeção de data provável de conclusão do escopo da release baseado em velocidade otimista, pessimista e média do time (análise estatística simples baseada nos dados)
3. Avaliação do impacto de alteração de escopo (novos pontos introduzidos que afetam a data prometida)
4. Recomendações de plano de ação para alinhar a data de encerramento com as expectativas de negócio (ex: repriorização com PO, renegociação de prazo)
5. Modelo de relatório curto de progresso para stakeholders`,
  },
  {
    id: "m33",
    role: "pm",
    tag: "Mudanças",
    title: "Plano de Gestão de Mudança Organizacional (Change Management)",
    description: "Estrutura as ações para preparar e apoiar os colaboradores na adoção de um novo sistema/processo.",
    prompt: `Atue como Gerente de Projetos especialista em Gestão de Mudanças (Change Management / Framework Prosci ADKAR). Crie o plano estratégico de gestão de mudança para a implantação do novo processo/sistema: [DESCREVA O NOVO SISTEMA OU PROCESSO ORGANIZACIONAL].

Público interno impactado (quantas pessoas, nível de resistência esperado): [DESCREVA]
Objetivo principal da mudança: [DESCREVA O GANHO PARA A EMPRESA]

Gere o plano de gestão de mudança contendo:
1. Análise dos impactos da mudança por segmento de público (quem perde o que, quem ganha o que)
2. Estratégia para gerar Consciência (Awareness) e Desejo (Desire) na equipe sobre a necessidade da mudança
3. Plano de Capacitação e Treinamento técnico (como as pessoas adquirirão o Conhecimento e a Habilidade de uso do novo sistema)
4. Plano de Sustentação da mudança (ações pós-implantação para garantir que as pessoas não voltem aos processos antigos)
5. Principais líderes influenciadores a serem engajados como patrocinadores da mudança nas áreas`,
  },
  {
    id: "m34",
    role: "pm",
    tag: "Fornecedores",
    title: "Roteiro de solicitação de proposta (RFP)",
    description: "Estrutura o documento de especificações técnicas para obter orçamentos de fornecedores de software.",
    prompt: `Você é Gerente de Projetos experiente em contratação de serviços terceirizados. Crie a estrutura de um documento de Solicitação de Proposta (RFP - Request for Proposal) para selecionar fornecedores parceiros que desenvolverão o projeto: [NOME DO PROJETO / ESCOPO].

Requisitos gerais do sistema a ser contratado: [DESCREVA OS REQUISITOS]
Prazos macro contratuais desejados: [DESCREVA]

Gere a estrutura da RFP contendo as seguintes seções em Markdown:
1. Introdução e Contexto da Nossa Empresa (finalidade do documento)
2. Escopo Técnico e Requisitos do Projeto detalhados (funcionalidades mínimas exigidas, integrações necessárias)
3. Requisitos Não-Funcionais obrigatórios (segurança, performance de APIs, acordos de SLA mínimos de atendimento do fornecedor)
4. Instruções de Submissão da Proposta (formato do documento de resposta, cronograma de envio das propostas, data limite de dúvidas)
5. Critérios de Avaliação e Escolha técnica das propostas recebidas (peso de preço, experiência de mercado do parceiro, qualidade técnica do time sugerido)
6. Termos e condições gerais de contratação preliminares`,
  },
  {
    id: "m35",
    role: "pm",
    tag: "Planejamento",
    title: "Planejamento de Sprint Zero",
    description: "Estrutura as atividades iniciais de infraestrutura, setup técnico e design antes do desenvolvimento de features.",
    prompt: `Você é Scrum Master / Agile Project Manager. Desenhe o plano de atividades e alinhamentos para a fase de "Sprint Zero" (fase inicial de preparação técnica e de processos) do novo projeto [NOME DO PROJETO].

Stack tecnológica principal e tamanho do time: [DESCREVA]
Duração da Sprint Zero (ex: 2 semanas): [DURAÇÃO]

Gere o planejamento da Sprint Zero estruturado em:
1. Objetivos centrais da Sprint Zero (o que precisa estar funcionando antes de iniciarmos as sprints normais de entrega de features, ex: setup de ambientes local/staging, regras de lint, repositórios git, sitemap básico, acordos de DoR/DoD)
2. Escopo de atividades por papel da equipe durante as duas semanas (Engenharia, DevOps, Design, PO, PM)
3. Cronograma de reuniões e cerimônias de calibração que acontecerão nesta fase de aquecimento
4. Riscos técnicos mapeados que devem ser atacados prioritariamente na Sprint Zero (ex: validação de API de terceiros, liberação de acessos a servidores)
5. Critérios de saída da Sprint Zero para iniciar com segurança a Sprint 1 de desenvolvimento de histórias`,
  },
  {
    id: "m36",
    role: "pm",
    tag: "Qualidade",
    title: "Checklist de auditoria de processos de projeto",
    description: "Gera verificação metodológica para avaliar a conformidade de práticas de gerenciamento do time.",
    prompt: `Atue como Gerente de Escritório de Projetos (PMO) focado em qualidade metodológica. Crie um checklist de auditoria de conformidade de processos de gerenciamento de projetos aplicável a um projeto em andamento.

Metodologia oficial que o projeto deveria seguir (ex: PMBOK híbrido, Scrum puro): [METODOLOGIA]
Problemas de organização ou desvios de processo observados informalmente: [DESCREVA]

Gere o checklist estruturado em seções de verificação:
1. Gestão de Escopo e Requisitos (presença de termo de abertura, PRD assinado, histórias de usuário com critérios de aceite adequados)
2. Gestão de Cronograma e Entregas (quadro Kanban atualizado, datas de marcos controladas, sprint reviews acontecendo recorrentemente)
3. Gestão de Comunicação e Riscos (registro de riscos atualizado, atas de reuniões salvas, status reports regulares)
4. Gestão de Qualidade e Testes (presença de plano de testes, DoD sendo seguido pelos desenvolvedores, ambiente de homologação estável)
5. Plano de ação corretiva sugerido para itens do checklist marcados em não-conformidade`,
  },
  {
    id: "m37",
    role: "pm",
    tag: "Cerimônias ágeis",
    title: "Roteiro de Reunião de Refinamento de Backlog",
    description: "Planeja o rito de refinamento e estimativa de histórias futuras com o time técnico.",
    prompt: `Você é Scrum Master / Agile Project Manager. Crie o roteiro e planejamento detalhados para conduzir a Reunião de Refinamento de Backlog (Backlog Refinement) do time de produto [NOME DO TIME].

Objetivo da reunião (ex: refinar histórias para as próximas duas sprints, estimar complexidade de itens novos): [DESCREVA]
Tamanho e perfil da equipe participante: [DESCREVA]

Monte o roteiro contendo:
1. Regras básicas da dinâmica (máximo de tempo gasto por história para evitar debates intermináveis - timeboxing)
2. Agenda sugerida para a reunião de [DURAÇÃO] minutos (apresentação do PO, quebra em tarefas se necessário, esclarecimento de dúvidas e estimativas usando planning poker ou t-shirt sizing)
3. Questões direcionadoras para os devs usarem na revisão de cada história antes de estimar (ex: "temos alguma dependência?", "o critério de aceitação está claro?", "o DoD cobre esse item?")
4. Como agir em caso de discordância severa de estimativa entre os desenvolvedores (dinâmica de rodadas de justificativa curta)
5. Output esperado ao final da reunião (backlog ordenado, estimado e com histórias no padrão DoR)`,
  },
  {
    id: "m38",
    role: "pm",
    tag: "Stakeholders",
    title: "Comunicação de encerramento e agradecimento de projeto",
    description: "Redige a comunicação formal de entrega concluída para parceiros e patrocinadores.",
    prompt: `Atue como Gerente de Projetos. Escreva uma comunicação formal de conclusão e entrega de sucesso do projeto [NOME DO PROJETO] para ser enviada a todos os stakeholders, patrocinadores e equipe participante.

Principais metas e objetivos estratégicos alcançados pelo projeto: [DESCREVA]
Equipes internas ou pessoas chave a serem destacadas pelo esforço extra: [LISTE]
Tom de voz da organização: [ex: formal executivo, celebrativo alegre]

Gere a mensagem contendo:
1. Linha de assunto atrativa e informativa de conclusão do projeto
2. Mensagem principal com a notícia de entrega oficial e início de uso/operação dos entregáveis
3. Destaque dos resultados e benefícios gerados (métrica de sucesso alcançada)
4. Bloco especial de agradecimento detalhado nomeando as áreas envolvidas e o time técnico de desenvolvimento
5. Próximos checkpoints pós-projeto ou encerramento das comunicações recorrentes
6. Tom adequado ao tom de voz informado da organização`,
  },
  {
    id: "m39",
    role: "pm",
    tag: "Riscos",
    title: "Análise de cenário E-Se (What-If Scenario Analysis)",
    description: "Simula o impacto de desvios e atrasos hipotéticos no cronograma e orçamentos do projeto.",
    prompt: `Você é Gerente de Projetos especialista em análise quantitativa de riscos. Conduza uma Análise de Cenários "E-Se" (What-If Scenario Analysis) para avaliar o impacto de desvios hipotéticos de cronograma e orçamento no projeto [NOME DO PROJETOS].

Cenários de risco hipotéticos que tiram o sono do gerente (ex: perda do principal desenvolvedor no meio do projeto, atraso de 1 mês na liberação da API do parceiro externo):
[DESCREVA OS CENÁRIOS PREOCUPANTES]

Cronograma geral planejado e restrições críticas do projeto: [DESCREVA]

Gere o relatório contendo para cada cenário de risco:
1. Impacto direto estimado no cronograma (dias de atraso no caminho crítico)
2. Impacto financeiro no orçamento (custos adicionais de horas extras ou penalidades de contrato)
3. Probabilidade do cenário se materializar baseado no contexto do projeto
4. Ação imediata de contingência a ser preparada preventivamente caso o cenário se confirme (Plano B)
5. Tabela comparativa consolidada: Cenário | Impacto no Prazo | Custo Estimado | Ação de Contingência`,
  },
  {
    id: "m40",
    role: "pm",
    tag: "Encerramento",
    title: "Termo de Aceite Formal do projeto (Sign-off)",
    description: "Cria o documento contratual de entrega final e encerramento para coleta de assinaturas dos patrocinadores.",
    prompt: `Atue como Gerente de Projetos sênior. Crie o Termo de Aceite Formal de Projeto (Project Sign-off Document) para marcar a conclusão oficial das obrigações do projeto [NOME DO PROJETO] e obter a assinatura formal de aprovação do patrocinador/cliente.

Objetivos originais do projeto contratados e o que de fato foi entregue e homologado:
[DESCREVA OS ENTREGÁVEIS FINAIS]

Patrocinador do projeto (nome ou cargo) e partes interessadas que devem assinar: [LISTE]

Gere o documento de Sign-off contendo:
1. Cabeçalho formal com identificação do projeto, datas, patrocinador e gerente de projetos
2. Declaração formal de aceitação da entrega dos escopos descritos
3. Tabela com resumo de entregáveis homologados com o respectivo status de aceite do cliente (Aceito / Aceito com ressalvas / Pendente)
4. Detalhamento de qualquer ressalva ou pendência de menor criticidade que será tratada fora do escopo do projeto principal (garantia ou pós-projeto)
5. Cláusula de transferência de propriedade operacional e encerramento de responsabilidades da equipe de projeto
6. Campo de assinatura com nome, cargo e data dos aprovadores`,
  },
];
