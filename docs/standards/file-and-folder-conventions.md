# Arquivos e pastas

A estrutura e o lugar de cada coisa estão descritos em [frontend/application-structure](../frontend/application-structure.md). Este documento cobre as regras de organização (`code-organization` está incorporado aqui).

## Regras
- **Um componente exportado por arquivo.** Subcomponentes pequenos e privados podem ficar no mesmo arquivo. Se crescerem, vão para `<domínio>/components/`.
- **Pasta só quando houver mais de um arquivo:** `experience.tsx` é um arquivo solto; `project/` é uma pasta porque tem `components/iframe.tsx`.
- **Agrupe por domínio, não por tipo:** `components/terminal/{terminal.tsx, commands.ts, terminal-dialog.tsx}`, e não `hooks/`, `types/` e `utils/` espalhados.
- **Tipos ficam junto do dado:** a interface `Project` está em `constants/projects.ts`. Não crie `types/` global.
- **Arquivos especiais do Next** (`page.tsx`, `layout.tsx`, `route.ts`, `opengraph-image.tsx`, `sitemap.ts`) seguem os nomes exigidos pelo framework.
- **Assets:** `public/static/assets/<nome-do-projeto>.png`, em kebab-case. Nada de imagem dentro de `src/`.
- **Documentação:** em `docs/`, seguindo o [roadmap](../DOCUMENTATION_ROADMAP.md). Planos de trabalho ficam em `docs/plans/`.
- **Não versionar:** `.env*.local`, `.next/`, `node_modules/`, `*.tsbuildinfo` e dados pessoais. Ver `.gitignore`.
