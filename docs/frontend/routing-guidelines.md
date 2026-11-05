# Rotas

## Hoje
- **Rotas:** só `/` (`src/app/page.tsx`) e `/opengraph-image`.
- **Navegação por âncoras:** o menu (`constants/menu-items.ts`) leva às seções `#resume`, `#experiences`, `#projects` e `#education`. As seções usam `scroll-mt-24 lg:scroll-mt-40` para não ficar atrás da barra fixa.
- **Hash da demonstração:** `#<id>-demo` (ex.: `#inorbit-demo`) abre o dialog da demonstração do projeto. É um link compartilhável. A sincronização fica em `components/project/index.tsx`, com o evento `hashchange`.

## Metadados e SEO
- **Metadados globais:** ficam em `src/app/layout.tsx`, no `metadata`, com `title.template` igual a `'%s | Alessandro Henrique Ramos'`.
- **Páginas novas:** exportam `metadata` ou `generateMetadata` só com `title`, `description` e `alternates.canonical`. O resto vem do layout.
- **Dados estruturados:** o JSON-LD `Person` fica em `layout.tsx`, serializado com escape de `<` (ver [security-guidelines](../standards/security-guidelines.md)).
- **Imagem OG:** `src/app/opengraph-image.tsx`.

## Planejado ([plano](../plans/redesign-portfolio.md))
| Rota | Fase | Observação |
|---|---|---|
| `/projetos/[slug]` | 3 | `generateStaticParams` a partir de `projects`, `generateMetadata` por projeto |
| `/curriculo` | 4 | página com CSS de impressão |
| `/terminal` | 5 | terminal em tela cheia |
| `/api/ask` | 6 | route handler `POST`, runtime Node |
| `/sitemap.xml` | 1 | `src/app/sitemap.ts` |

Regras para rotas novas:
- **Nome em português**, minúsculo e com hífen (`/projetos`, `/curriculo`).
- **Pré-renderizada**, a não ser que dependa de requisição.
- **Entra em `sitemap.ts` e no menu**, se for navegável.
