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
];
