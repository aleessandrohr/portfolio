# Plano: novo portfólio (UI/UX, cases, currículo, terminal com LLM)

## Contexto
O site (`aleessandrohr.dev.br`, Next 14 App Router, Tailwind, shadcn, Vercel) hoje é uma página única com resumo, experiências, in.orbit e Letmeask. Não mostra os trabalhos mais sérios (Workspace da Anuntech e Digitaliza Aí, do hackathon) e não tem nada de IA. O site e o PDF também se contradizem no nome do curso.

Objetivo:
- manter a identidade visual (Inter, azul da marca `217 91% 60%`, neutros, temas claro e escuro, cards que acendem em azul no hover);
- deixar a home mais amigável e com informações que valorizem o trabalho (referência 1);
- criar páginas de case para cada projeto;
- criar uma página `/curriculo` igual ao PDF (referência 3);
- criar um modo terminal (referência 2) que mostra os mesmos dados de outra forma;
- colocar dentro do terminal um assistente com LLM (Gemini) que responde só com os dados do site. Ele também vira um case próprio, com métricas reais de uso.

Decisões já tomadas:
- LLM: **Google Gemini**.
- Hospedagem: **Vercel**.
- Curso: **Engenharia da Computação** em todos os lugares.
- Workspace: **só texto, sem prints**.
- Educação: **sem página própria por enquanto**. Ela aparece num card na home e no `/curriculo`.

## Fase 1: uma única fonte de dados
Tudo sai de `src/constants/`: home, cases, currículo, terminal e o contexto da LLM.

- `constants/profile.ts` (novo): nome, título ("Desenvolvedor Full Stack Pleno", editável só aqui), cidade, e-mail, site, links, resumo, frase do hero, status "Aberto a oportunidades" e números do hero. Os números são só os que dá para defender: 2 anos na Anuntech, promoção de Júnior a Pleno, MVP em 4 dias, 5º de 11 no hackathon.
- `constants/skills.ts` (novo): mesmos grupos do PDF (Linguagens, Front-end, Back-end, Banco de Dados, Infra & DevOps, Ferramentas de IA, Outros). Recebe o `skillBadgeStyles` que hoje está em `components/experience.tsx`.
- `constants/projects.ts`: o `Project` ganha `slug`, `featured`, `kind` (`profissional | hackathon | pessoal`), `period`, `role`, `stack` e `case` (`context`, `problem`, `contribution[]`, `solution`, `decisions[]`, `results[]`, `learnings[]`). Também ganha um `diagram?` simples. `imageUrl`, `links` e `iframeUrl` continuam e ficam opcionais. A ordem é:
  1. `workspace`: texto vindo de `experiences.anuntech` (micro frontends com Module Federation, bookmarks, notificações com Socket.io, infraestrutura, promoção). Campos extras (outros módulos, uso de IA no desenvolvimento) ficam opcionais e só aparecem depois de preenchidos.
  2. `digitaliza-ai`: case do hackathon, dentro das [regras de conteúdo](../standards/content-guidelines.md). Sem marca da organizadora, sem link da demo enquanto ela exibir essa marca, sem dados internos e sem afirmar produção.
  3. `inorbit` e `letmeask`: mantêm o que têm hoje, inclusive o `iframeUrl` da demo.
- `constants/educations.ts`: corrigir para Engenharia da Computação, UFMA, 04/2025–04/2028.
- `lib/knowledge.ts` (novo): transforma os constants em texto para o contexto da LLM e em objetos para `cat about.json` no terminal.
- `app/layout.tsx`: corrigir descrição e JSON-LD (curso). Criar `app/sitemap.ts` com as novas rotas.

## Fase 2: layout e home
- `components/site-header.tsx`: substitui `profile.tsx`.
  - Mantém a barra fixa com vidro, o avatar e o Drawer no celular.
  - Os links passam a ser rotas: Início, Projetos, Currículo, Terminal.
  - Ganha um botão `>_` ao lado do `ModeToggle`.
- `components/site-footer.tsx`: links e redes.
- Fonte mono extra com `next/font` (JetBrains Mono), só para o terminal e pequenos detalhes de código.
- Home (`app/page.tsx`), dividida em `components/home/*`:
  1. **Hero:** foto (`/static/assets/profile.png`) com um brilho radial azul e grade de pontos ao fundo, "Olá, eu sou", nome com o sobrenome em azul e título. Abaixo vêm a frase, três botões (Ver projetos, Agendar conversa pelo cal.com, Currículo) e os ícones de redes (`socialMedia`).
  2. **Faixa de números:** os números de `profile.ts`.
  3. **Sobre e stack:** badges por grupo, sem barras de porcentagem.
  4. **Projetos em destaque:** Workspace e Digitaliza Aí em cards grandes, in.orbit e Letmeask menores. Cada card leva a `/projetos/[slug]`. O card reaproveita o atual `components/project/index.tsx`, com o Dialog da demo e o `Iframe`.
  5. **Experiência:** linha do tempo compacta, reaproveitando o `Experience` com uma variante enxuta, e link para o `/curriculo`.
  6. **Educação:** card simples.
  7. **Contato:** bloco com cal.com, LinkedIn e e-mail, e um botão "Pergunte sobre mim" que abre o terminal no modo `chat`.

## Fase 3: páginas de case `app/projetos/[slug]/page.tsx`
- `generateStaticParams` e `generateMetadata` a partir de `projects`.
- Estrutura: cabeçalho (título, tipo, período, papel, stack) → contexto → problema → minha contribuição → solução (com `diagram` em CSS/SVG simples, se houver) → decisões técnicas → resultados → aprendizados → links e demo.
- Seções vazias não aparecem.
- Componente `components/project/case-section.tsx`. Navegação "anterior / próximo" no fim da página.

## Fase 4: `/curriculo`
- `app/curriculo/page.tsx` repete a ordem e o texto do PDF:
  - **Cabeçalho em 3 colunas:** cidade, e-mail e site | nome, título e stack | LinkedIn, GitHub e cal.com.
  - **Seções:** Resumo, Habilidades, Experiência (em linha do tempo na tela), Projetos e Educação.
- Botão "Imprimir / Salvar PDF" (`window.print()`).
- Bloco `@media print` em `globals.css`:
  - folha A4 e fundo branco;
  - sem header, footer nem botões;
  - layout em lista, como no PDF.
- O PDF passa a sair do próprio site.

## Fase 5: modo terminal
- `components/terminal/commands.ts`: registro puro de comandos, testável e sem React, que lê de `lib/knowledge.ts`.
  - `help`, `whoami`, `cat about.json`, `ls [projetos]`, `cat projetos/<slug>` / `open <slug>`, `experiencia`, `educacao`, `skills`
  - `curriculo` (navega), `contato`, `theme <claro|escuro|sistema>` (via `next-themes`), `history`, `clear`
  - `ask <pergunta>` e `chat` / `exit` (Fase 6)
- `components/terminal/terminal.tsx` (client):
  - **Interação:** prompt `~/alessandro $`, histórico com ↑/↓, Tab completa, Esc fecha.
  - **Atalhos clicáveis:** botões de comando, para celular e para quem não é dev.
  - **Acessibilidade:** saída com `aria-live="polite"` e foco no input.
- `components/terminal/terminal-dialog.tsx`: abre por cima da página com o `ui/dialog` atual, pelo botão `>_` ou por Ctrl+`.
- `app/terminal/page.tsx`: versão em tela cheia, para mandar o link direto.

## Fase 6: LLM no terminal (Gemini)
- **Dependências:** `@google/genai`, `@upstash/redis` e `@upstash/ratelimit` (Upstash pelo Marketplace da Vercel).
- **`app/api/ask/route.ts`** (runtime Node), recebe POST `{ messages }`:
  - **Validação:** checa `Origin`, limita a pergunta a ~500 caracteres e o histórico às últimas ~6 trocas.
  - **Rate limit:** por IP com hash (ex.: 10 a cada 10 min e 30 por dia).
  - **Teto de custo:** diário e mensal, num contador no Redis alimentado pelo `usageMetadata` da resposta, com o limite em variável de ambiente. Se estourar, responde 429/503 com um código. O terminal então mostra "assistente indisponível agora, use `help`", e os comandos fixos continuam funcionando.
  - **Chamada ao modelo:** `generateContentStream` com o modelo em `GEMINI_MODEL` (padrão: o Flash-Lite atual), `temperature` ~0.2 e `maxOutputTokens` ~400. A resposta volta em streaming de texto.
- **`lib/llm/prompt.ts`**, regras do assistente do portfólio:
  - responde só com o `KNOWLEDGE` montado em `lib/knowledge.ts`, que vai inteiro no contexto (sem RAG);
  - responde no idioma da pergunta, em pt-BR por padrão;
  - quando não souber, diz que não sabe e sugere `contato`;
  - nunca inventa números, empresas ou resultados;
  - recusa assunto fora do tema e ignora pedidos para mudar de papel;
  - cita as páginas como `[/projetos/slug]`, e o terminal transforma isso em link.
- **`lib/llm/limits.ts`:** junta o rate limit e o teto de custo. Sem as variáveis do Upstash (em desenvolvimento), usa a memória.
- **Métricas para o case:** contadores no Redis (perguntas por dia, tokens, custo estimado, recusas e fallbacks). Guardar o texto das perguntas fica desligado por padrão (`LLM_LOG_QUESTIONS`). Se ligar, guarda por 30 dias e mostra um aviso no banner do `chat`.
- **`.env.example`:** `GEMINI_API_KEY`, `GEMINI_MODEL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `LLM_DAILY_BUDGET_USD`, `LLM_MONTHLY_BUDGET_USD`, `LLM_LOG_QUESTIONS`. A chave fica só no servidor.
- **No terminal:** `ask` faz uma pergunta só e `chat` mantém a conversa até `exit`. A resposta aparece aos poucos, com cursor piscando e botão para cancelar (`AbortController`).

## Pendências de conteúdo (não bloqueiam o código)
- Detalhes adicionais do Workspace: outros módulos e uso de IA no desenvolvimento.
- Prints do Digitaliza Aí sem a marca da organizadora. Até lá o card fica sem imagem.

## Arquivos principais
- **Novos:** `constants/profile.ts`, `constants/skills.ts`, `lib/knowledge.ts`, `components/site-header.tsx`, `components/site-footer.tsx`, `components/home/*`, `components/project/case-section.tsx`, `components/terminal/*`, `lib/llm/*`, `app/projetos/[slug]/page.tsx`, `app/curriculo/page.tsx`, `app/terminal/page.tsx`, `app/api/ask/route.ts`, `app/sitemap.ts`, `.env.example`.
- **Alterados:** `constants/projects.ts`, `constants/educations.ts`, `constants/experiences.ts` (se precisar), `components/project/index.tsx`, `components/experience.tsx`, `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, `tailwind.config.ts`, `package.json`.
- **Removido:** `components/profile.tsx` (substituído pelo `site-header`). `constants/menu-items.ts` passa a guardar as rotas.

## Execução
Um commit por fase, cada fase deixando o site funcionando. Ordem: 1 → 2 → 3 → 4 → 5 → 6. Se o prazo da inscrição apertar: 1 → 5 → 6 primeiro, depois 2–4.

## Verificação
- A cada fase: `bun run check`, `bun run type-check` e `bun run build`, os mesmos passos do CI (`.github/workflows/tests-front.yml`).
- `bun dev`, depois conferir:
  - home, `/projetos/<cada slug>`, `/curriculo` e `/terminal` nos temas claro e escuro, em 375 px e em desktop;
  - a pré-visualização de impressão do `/curriculo` contra o PDF atual, lado a lado;
  - o terminal: todos os comandos, ↑/↓, Tab, Esc, Ctrl+`, atalhos clicáveis e leitor de tela (aria-live).
- A LLM:
  - com `GEMINI_API_KEY`: perguntas sobre os projetos (precisam bater com os constants), uma pergunta sem resposta nos dados (tem que dizer que não sabe) e uma tentativa de prompt injection (tem que recusar);
  - sem a chave: o fallback aparece e os comandos continuam funcionando;
  - rate limit: um loop de `curl` em `/api/ask` até receber 429;
  - teto de custo: baixar `LLM_DAILY_BUDGET_USD` para disparar o fallback.
- Deploy de preview na Vercel com as variáveis do Upstash antes de ir para `master`.
