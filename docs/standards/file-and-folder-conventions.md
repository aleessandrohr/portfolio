# Arquivos e pastas

A estrutura e o lugar de cada coisa estão descritos em [frontend/application-structure](../frontend/application-structure.md). Este documento cobre as regras de organização (`code-organization` está incorporado aqui).

## Regras
- **Código exclusivo de página fica junto da rota:** use `(home)/_components/` na home, agrupando hero, projetos e experiências com os componentes próprios de cada seção; os parênteses não alteram a URL e o prefixo `_` marca detalhes privados. Helpers exclusivos de um componente ficam junto dele. Conteúdo profissional continua em `src/constants/`.
- **Um componente exportado por arquivo.** Subcomponentes pequenos e privados podem ficar no mesmo arquivo. Se crescerem, vão para `<domínio>/components/`.
- **Pasta só quando houver mais de um arquivo:** `about.tsx` é um arquivo solto; `hero/` é uma pasta porque reúne a seção e `letter-reveal.tsx`.
- **Pastas compartilhadas:** conteúdo em `src/constants/`, configurações em `src/configs/`, integrações de bibliotecas em `src/lib/` e utilitários puros em `src/utils/`. Constantes e helpers exclusivos de um componente permanecem no domínio.
- **Agrupe por domínio, não por tipo:** `app/(home)/_components/hero/{index.tsx, letter-reveal.tsx, command-line.tsx}`, e não `hooks/`, `types/` e `utils/` espalhados.
- **Tipos de domínio ficam em `src/types/`:** um arquivo por domínio (`src/types/project.ts`, `src/types/experience.ts`, `src/types/profile.ts`, etc.). Tipos exclusivos de UI (`type Props`) permanecem locais ao componente.
- **Arquivos especiais do Next** (`page.tsx`, `layout.tsx`, `route.ts`, `opengraph-image.tsx`, `sitemap.ts`) seguem os nomes exigidos pelo framework.
- **Assets:** `public/static/assets/<nome-do-projeto>.png`, em kebab-case. Nada de imagem dentro de `src/`.
- **Documentação:** em `docs/`, seguindo o [roadmap](../DOCUMENTATION_ROADMAP.md). Planos de trabalho ficam em `docs/plans/`.
- **Não versionar:** `.env*.local`, `.next/`, `node_modules/`, `*.tsbuildinfo` e dados pessoais. Ver `.gitignore`.
