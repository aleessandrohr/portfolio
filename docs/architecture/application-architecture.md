# Arquitetura da aplicação

A aplicação tem três camadas, e as dependências só apontam para baixo:

```
app/          rotas: montam a página com componentes e dados
  │
components/   renderizam dados recebidos por props
  │
constants/    dados do conteúdo (perfil, experiências, projetos, educação)
types/        contratos e interfaces de domínio por arquivo
configs/      configuração de navegação e apresentação
lib/          integração com bibliotecas (Day.js, clsx/tailwind-merge)
utils/        funções puras compartilhadas (ex.: experience-timeline)
```

## Camadas
- **`src/types/`:** contratos de domínio (`Profile`, `Experience`, `Education`, `Period`, `Project`, `SkillGroup`, `SocialMedia`, `MenuItem`), separados em um arquivo por domínio.
- **`src/constants/`:** a fonte do conteúdo. Cada arquivo importa seu tipo de `src/types/` e exporta um objeto `as const satisfies`. A chave do objeto identifica o item.
- **`src/components/`:** componentes de apresentação. Recebem os campos do item como props, com o tipo de `src/types/` (`type Props = ExperienceType`). `components/ui/` guarda as primitivas do shadcn.
- **`src/app/`:** páginas, layouts, metadados e implementações privadas de cada rota. A home fica em `(home)/page.tsx`, com `_components/` agrupados por seção. `page.tsx` converte os objetos com `Object.values(...)` e usa `.map` para gerar a lista de componentes.
- **`src/providers/`:** contexto global no cliente (hoje só o tema).
- **`src/configs/`:** configurações compartilhadas, como o menu usado pelo header em `menu-items.ts`. Não guarda informações profissionais.
- **`src/lib/`:** configuração e integração de bibliotecas. `dayjs.ts` registra o locale pt-BR e o plugin `customParseFormat`; `utils.ts` mantém o `cn()` usado pelo shadcn.
- **`src/utils/`:** funções puras de domínio. `experience-timeline.ts` usa o Day.js configurado, preservando datas `MM/YYYY`, duração inclusiva e semestres civis.

## Servidor × cliente
- **Por padrão, tudo é Server Component.**
- **`'use client'` só onde há interação:**
  - `app/(home)/_components/projects/project-card/demo-dialog.tsx`: dialog da demonstração sincronizado com o hash da URL;
  - `app/(home)/_components/projects/project-card/iframe.tsx`: estado de carregamento;
  - `components/mode-toggle.tsx`;
  - `app/(home)/_components/home-motion.tsx`: escopo cliente para Motion; recebe seções já renderizadas no servidor como `children`;
  - `providers/theme.tsx`.

## Padrões e composição
Os padrões usados dentro das camadas estão em [design/design-patterns](../design/design-patterns.md). A forma como as peças se compõem está em [design/abstractions-and-composition](../design/abstractions-and-composition.md).

## Planejado ([plano](../plans/redesign-portfolio.md))
- **`components/terminal/commands.ts` (Fase 5):** registro de comandos sem React.
