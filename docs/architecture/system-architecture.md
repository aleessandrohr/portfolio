# Arquitetura do sistema

## Hoje
Site estático gerado pelo Next.js e servido pela Vercel. Não há banco, autenticação nem API própria.

```
Navegador ──► Vercel (Next.js 14, App Router)
               ├─ páginas pré-renderizadas (/)
               ├─ /opengraph-image (gerada com next/og)
               └─ /static/assets/* (imagens em public/)

Dependências externas no navegador:
  - Google Fonts via next/font (Inter, embutida no build)
  - iframes de demonstração (ex.: inorbit.aleessandrohr.dev.br/demo)
  - links externos: LinkedIn, GitHub e sites dos projetos; contato por links `mailto:`
```

| Peça | Tecnologia | Onde está |
|---|---|---|
| Framework | Next.js 14.2 (App Router), React 18 | `package.json`, `src/app/` |
| Estilo | Tailwind CSS 3, variáveis CSS, shadcn/ui | `tailwind.config.ts`, `src/app/globals.css`, `src/components/ui/` |
| Tema | `next-themes` (classe `dark`) | `src/providers/theme.tsx` |
| Hospedagem | Vercel | — |
| CI | GitHub Actions (lint, type-check, build) | `.github/workflows/tests-front.yml` |

## Sem API própria
O site não tem rota de servidor, banco nem variáveis de ambiente. Um assistente com LLM foi avaliado e descartado porque, sem autenticação, não há como limitar o custo ([ADR-0003](../decisions/ADR-0003-gemini-upstash.md)).
