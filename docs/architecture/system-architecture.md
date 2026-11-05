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
  - links externos: LinkedIn, GitHub, cal.com, sites dos projetos
```

| Peça | Tecnologia | Onde está |
|---|---|---|
| Framework | Next.js 14.2 (App Router), React 18 | `package.json`, `src/app/` |
| Estilo | Tailwind CSS 3, variáveis CSS, shadcn/ui | `tailwind.config.ts`, `src/app/globals.css`, `src/components/ui/` |
| Tema | `next-themes` (classe `dark`) | `src/providers/theme.tsx` |
| Hospedagem | Vercel | — |
| CI | GitHub Actions (lint, type-check, build) | `.github/workflows/tests-front.yml` |

## Planejado ([plano](../plans/redesign-portfolio.md), Fase 6)
O assistente com LLM no terminal acrescenta a primeira rota de servidor:

```
Terminal (cliente) ──POST──► /api/ask (route handler, runtime Node)
                               ├─ Upstash Redis: rate limit e teto de custo
                               └─ Gemini API (@google/genai): resposta em streaming
```

- A chave do Gemini e as credenciais do Redis ficam só no servidor (variáveis de ambiente da Vercel).
- Se o Redis faltar ou o teto de custo estourar, a API recusa e o terminal volta aos comandos fixos. O resto do site não depende da API.
