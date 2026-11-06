# Plano: novo portfólio (UI/UX, cases, currículo e terminal)

## Situação do plano
Atualizado em **05/11/2026**: fases **1 e 2 concluídas**, com escopo consolidado durante a renovação guiada. As fases 3, 4 e 5 continuam planejadas; páginas de case, currículo e terminal funcional não fazem parte da entrega concluída.

| Fase | Situação |
|---|---|
| 1 — Fonte única de dados | Concluída |
| 2 — Layout e home | Concluída |
| 3 — Páginas de case | Planejada |
| 4 — Currículo e PDF | Planejada |
| 5 — Modo terminal | Planejada |

## Contexto inicial
No início do plano, o site (`aleessandrohr.dev.br`, Next 14 App Router, Tailwind, shadcn, Vercel) era uma página única com resumo, experiências, in.orbit e Letmeask. Faltavam Workspace, Digitaliza Aí e a atuação com IA. O site e o PDF também divergiam no nome do curso. A base de dados e a home foram atualizadas nas fases 1 e 2.

Objetivo:
- manter a identidade visual (Inter, JetBrains Mono em detalhes técnicos, azul da marca com luminosidade por tema, neutros, temas claro e escuro, cards que acendem em azul no hover);
- deixar a home mais amigável e com informações que valorizem o trabalho (referência 1);
- criar páginas de case para cada projeto;
- criar uma página `/curriculo` igual ao PDF (referência 3);
- criar um modo terminal (referência 2) que mostra os mesmos dados de outra forma.

Decisões já tomadas:
- Hospedagem: **Vercel**.
- Assistente com LLM: **descartado**. O site não tem autenticação, então não há como limitar o custo com segurança. Ver [ADR-0003](../decisions/ADR-0003-gemini-upstash.md).
- Curso: **Engenharia da Computação** em todos os lugares.
- Workspace: **só texto, sem prints**.
- Educação: **sem página própria por enquanto**. Ela aparece num card na home e no `/curriculo`.

## Fase 1: uma única fonte de dados
**Concluída em 05/11/2026.** A home e os metadados consomem `src/constants/`; cases, currículo e terminal reutilizarão essa base quando forem implementados.

- `constants/profile.ts` (novo): nome, título ("Desenvolvedor Full Stack Pleno", editável só aqui), foto, cidade, e-mail, site, links, resumo, frase do hero e descrição para SEO. Campos sem consumidor, como status, stack de destaque e highlights, foram removidos. Na revisão da Fase 2, a faixa de números foi removida da home; esses fatos aparecem contextualizados em experiências e projetos: 2 anos na Anuntech, promoção de Júnior a Pleno, MVP em 4 dias, 5º de 11 no hackathon.
- `constants/skills.ts`: grupos de Linguagens, Front-end, Back-end, Mobile, Banco de Dados, Infra & DevOps, IA e Outros. A interface usa badges neutros, sem mapa de cores por tecnologia.
- `constants/projects.ts`: o contrato atual contém apenas os campos usados pelos cards: `id`, `title`, `description`, `category`, `featured`, `kind` e, quando existem, `imageUrl`, `websiteUrl` e `demoUrl`. Slug, período, papel, stack, case, diagrama e seleção para currículo serão definidos quando houver consumidores nas fases seguintes. A ordem é:
  1. `workspace`: texto vindo de `experiences.anuntech` (micro frontends com Module Federation, bookmarks, notificações com Socket.io, infraestrutura, promoção). Novas informações só entram quando tiverem um consumidor e conteúdo confirmado.
  2. `digitaliza-ai`: case do hackathon, dentro das [regras de conteúdo](../standards/content-guidelines.md). Sem marca da organizadora, sem link da demo enquanto ela exibir essa marca, sem dados internos e sem afirmar produção.
  3. `inorbit` e `letmeask`: mantêm o que têm hoje, inclusive o `demoUrl` da demo.
- `constants/educations.ts`: exporta `educations`, com contrato próprio `Education` (`course`, `institution`, datas e descrição). Formação atual: Engenharia da Computação, UFMA, 04/2025–04/2028.
- `constants/experiences.ts`: exporta uma coleção `experiences`, com organização e detalhes separados, atividades em lista e `end: null` para vínculos em andamento.
- As visões leem diretamente os dados de `constants/`. Configurações compartilhadas ficam em `configs/`, integrações em `lib/` e funções puras em `utils/` (ver ADR-0008).
- `constants/seo.ts`: temas de atuação compartilhados entre keywords e `knowsAbout`, com tecnologias derivadas de `skills.ts`.
- `app/layout.tsx`: descrição, curso, keywords e JSON-LD atualizados. `app/sitemap.ts` contém a home; novas páginas entram quando forem implementadas.

## Fase 2: layout e home
**Concluída em 05/11/2026.** Escopo entregue:

- `components/header.tsx`: substitui `profile.tsx`.
  - Barra sticky de vidro, arredondada e com margens, conteúdo em uma linha no desktop e Drawer no celular. Foto e cargo ficam no hero.
  - Navegação por âncoras: Sobre, Projetos, Experiência, Educação e Contato. Links para futuras páginas serão incluídos nas fases correspondentes.
  - Controle `>_ Alessandro`, em mono, com semântica de switch desativado e indicação de terminal em breve, além do `ModeToggle`.
- `components/footer.tsx`: identificação, ano e link para o topo. Contatos e redes ficam nas seções da home.
- Inter como fonte principal e JetBrains Mono, via `next/font`, no controle de terminal, badges, períodos e endereço do GitHub. Ver [design system](../frontend/design-system.md).
- Temas claro e escuro refinados: base grafite no escuro; fundo cinza claro e cards brancos no claro; azul com luminosidade por tema, vidro seletivo e raios por função.
- Animações com Motion: hero ocupa a primeira tela, textos principais aparecem letra a letra e as seções têm entrada progressiva. Respeita movimento reduzido e mantém o conteúdo acessível sem JavaScript.
- Open Graph em 1200 × 630, com dados atuais, foto e fontes locais; favicon de terminal em `public/icon.svg`, referenciado pelo layout.
- Home (`app/(home)/page.tsx`), dividida em `app/(home)/_components/*`:
  1. **Hero:** foto (`/static/assets/profile.png`) com brilho radial azul e grade ao fundo, "Olá, eu sou", nome com sobrenome em azul, cargo e frase. Ações: Ver projetos e Enviar e-mail, além dos ícones de redes (`socialMedia`). A ação de currículo fica para a fase 4.
  2. **Sobre e habilidades:** Sobre ocupa 50% e Habilidades 50% no desktop; no celular, ficam empilhados. Um único bloco reúne os grupos técnicos em badges. Os dados vêm de `profile.ts` e de `skills` em `skills.ts`. A coleção interpessoal não era renderizada e foi removida na limpeza de dados sem uso. Sem painel interativo ou barras de porcentagem.
  3. **Projetos:** carrossel (shadcn com Embla), com três cards no desktop, dois no tablet e um card com parte do próximo no celular. Workspace e Digitaliza Aí aparecem primeiro, com capas neutras, seguidos por in.orbit e Letmeask. Avança a cada 2 s, pausa com mouse ou foco e respeita movimento reduzido. Os cards usam site e demo quando disponíveis; links para cases ficam para a fase 3. Detalhes em [ui-ux-guidelines](../frontend/ui-ux-guidelines.md).
  4. **Experiência:** linha do tempo compacta, usando o `Experience`, com todas as atividades visíveis, sem expandir. O link para currículo fica para a fase 4.
     Tutor e subsíndico entram na mesma linha do tempo, ordenada por data (`utils/experience-timeline.ts`), com rótulo de categoria e duração; o nome do condomínio fica omitido por ser repositório público.
  5. **Educação:** card simples.
  6. **Contato:** cartão no estilo de perfil do GitHub: foto e link do perfil no topo, grade decorativa com as iniciais (`app/(home)/_components/pixel-grid.tsx`, não representa commits), e embaixo, centralizados, nome, cargo, e-mail, LinkedIn, localização (sem telefone) e botão de e-mail. No hero, a grade fica atrás do conteúdo, no centro, desfocada e quase transparente no desktop, e no pé da tela no celular, junto com um brilho azul suave no hero do celular. Item "Contato" no menu do header.

## Fase 3: páginas de case `app/projetos/[slug]/page.tsx`
- Antes de implementar os cases, acrescentar a `projects` e ao tipo `Project` somente os campos que essa página utilizar. Os dados de case e diagrama antecipados foram removidos da versão atual por não terem consumidor.
- `generateStaticParams` e `generateMetadata` a partir de `projects`.
- Estrutura: cabeçalho (título, tipo, período, papel, stack) → contexto → problema → minha contribuição → solução (com `diagram` em CSS/SVG simples, se houver) → decisões técnicas → resultados → aprendizados → links e demo.
- Seções vazias não aparecem.
- Componente `app/projetos/[slug]/_components/case-section.tsx`. Navegação "anterior / próximo" no fim da página.

## Fase 4: `/curriculo`
- `app/curriculo/page.tsx` repete a ordem e o texto do PDF:
  - **Cabeçalho em 3 colunas:** cidade, e-mail e site | nome, título e stack | LinkedIn e GitHub.
  - **Seções:** Resumo, Habilidades, Experiência (em linha do tempo na tela), Projetos e Educação.
- Botão "Imprimir / Salvar PDF" (`window.print()`).
- Bloco `@media print` em `globals.css`:
  - folha A4 e fundo branco;
  - sem header, footer nem botões;
  - layout em lista, como no PDF.
- O PDF passa a sair do próprio site.

## Fase 5: modo terminal
- `components/terminal/commands.ts`: registro puro de comandos, testável e sem React, que recebe os dados de `constants/`.
  - `help`, `whoami`, `cat about.json`, `ls [projetos]`, `cat projetos/<slug>` / `open <slug>`, `experiencia`, `educacao`, `skills`
  - `curriculo` (navega), `contato`, `theme <claro|escuro|sistema>` (via `next-themes`), `history`, `clear`
- `components/terminal/terminal.tsx` (client):
  - **Interação:** prompt `~/alessandro $`, histórico com ↑/↓, Tab completa, Esc fecha.
  - **Atalhos clicáveis:** botões de comando, para celular e para quem não é dev.
  - **Acessibilidade:** saída com `aria-live="polite"` e foco no input.
- `components/terminal/terminal-dialog.tsx`: abre por cima da página com o `ui/dialog` atual, pelo botão `>_` ou por Ctrl+`.
- `app/terminal/page.tsx`: versão em tela cheia, para mandar o link direto.

## Pendências de conteúdo (não bloqueiam o código)
- Detalhes adicionais do Workspace: outros módulos e uso de IA no desenvolvimento.
- Workspace e Digitaliza Aí permanecem sem imagem e sem link de site no estado atual. Uma futura imagem do Digitaliza Aí deve respeitar as regras de marca de terceiros.

## Arquivos principais
- **Novos:** `constants/profile.ts`, `constants/skills.ts`, `configs/menu-items.ts`, `lib/dayjs.ts`, `utils/experience-timeline.ts`, `components/header.tsx`, `components/footer.tsx`, `app/(home)/_components/*`, `app/projetos/[slug]/_components/case-section.tsx`, `components/terminal/*`, `app/projetos/[slug]/page.tsx`, `app/curriculo/page.tsx`, `app/terminal/page.tsx`, `app/sitemap.ts`.
- **Alterados:** `constants/projects.ts`, `constants/educations.ts`, `constants/experiences.ts` (se precisar), `app/(home)/_components/projects/project-card/index.tsx`, `app/(home)/_components/experiences/experience.tsx`, `app/(home)/page.tsx`, `app/layout.tsx`, `app/globals.css`, `tailwind.config.ts`, `package.json`.
- **Removido:** `components/profile.tsx` (substituído pelo `header`). `configs/menu-items.ts` guarda a navegação; o agregador `knowledge` foi removido.

## Execução
As fases 1 e 2 foram implementadas em conjunto durante a renovação guiada e estão concluídas. Cada próxima fase deve deixar o site funcionando. Ordem restante: 3 → 4 → 5.

## Verificação
- A cada fase: Biome apenas nos arquivos alterados, `bun run type-check` e `bun run build`, seguindo a [definição de pronto](../development/definition-of-done.md). Com servidor ativo, o build deve rodar em cópia isolada.
- Reutilizar o servidor existente na porta 3000; iniciar `bun dev` apenas se não houver uma instância do projeto. Conferir as rotas já implementadas; as verificações abaixo de cases, currículo e terminal se aplicam às fases futuras:
  - home, `/projetos/<cada slug>`, `/curriculo` e `/terminal` nos temas claro e escuro, em 375 px e em desktop;
  - a pré-visualização de impressão do `/curriculo` contra o PDF atual, lado a lado;
  - o terminal: todos os comandos, ↑/↓, Tab, Esc, Ctrl+`, atalhos clicáveis e leitor de tela (aria-live).
- Deploy de preview na Vercel antes de ir para `master`.
