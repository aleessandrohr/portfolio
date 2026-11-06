# Rotas

## Hoje
- **Rotas:** só `/` (`src/app/(home)/page.tsx`) e `/opengraph-image`, além do sitemap em `/sitemap.xml`.
- **Navegação por âncoras:** o menu (`configs/menu-items.ts`) leva às seções `#about`, `#projects`, `#experiences`, `#education` e `#contact`. As seções usam `scroll-mt-28` para não ficar atrás da barra fixa.
- **Hash da demonstração:** `#<id>-demo` (ex.: `#inorbit-demo`) abre o dialog da demonstração do projeto. É um link compartilhável. A sincronização fica em `app/(home)/_components/projects/project-card/demo-dialog.tsx`, com o evento `hashchange`.

A home fica no grupo `(home)`, que não altera a URL `/`. A pasta `_components` é privada. O menu pertence ao header global e fica em `src/configs/menu-items.ts`. As futuras rotas ficam em pastas irmãs, sem importar a implementação privada da home.

O modo terminal usa `/?mode=terminal` e mantém as mesmas seções da home. Não cria uma rota `/terminal`; o sitemap e a URL canônica permanecem os da home.

## Metadados e SEO
- **Metadados globais:** ficam em `src/app/layout.tsx`, no `metadata`, com `title.template` igual a `'%s | Alessandro Henrique Ramos'`.
- **Palavras-chave:** ficam em `constants/seo.ts`, reunindo temas de atuação, termos sobre IA e as tecnologias de `constants/skills.ts`. Nome e cargo vêm de `constants/profile.ts`.
- **Páginas novas:** exportam `metadata` ou `generateMetadata` só com `title`, `description` e `alternates.canonical`. O resto vem do layout.
- **Favicon:** `public/icon.svg`, com símbolo de terminal, azul da marca e neutros do tema escuro. O `metadata.icons` do layout aponta para `/icon.svg`; não há outro ícone em `src/app/`.
- **Dados estruturados:** o JSON-LD `Person` fica em `layout.tsx`, serializado com escape de `<` (ver [security-guidelines](../standards/security-guidelines.md)).
- **Conhecimentos no JSON-LD:** `knowsAbout` usa `seoTopics` de `constants/seo.ts`, compartilhado com as palavras-chave. Nome, cargo e termos de localização ficam apenas nas palavras-chave.
- **Imagem OG:** `src/app/opengraph-image.tsx`, gerada em 1200 × 630 com nome, cargo, frase do hero, foto, domínio e curso derivados das constantes. Usa Inter no conteúdo e JetBrains Mono no rodapé, com arquivos locais e licenças em `src/app/_assets/fonts/`, sem buscar fontes ou fotos pela rede durante a geração. Dimensões e espelho dos tokens do tema escuro ficam em `configs/open-graph.ts`; o layout reutiliza as dimensões nos metadados. O `ImageResponse` não herda CSS nem as fontes configuradas por `next/font` no layout.

## Planejado ([plano](../plans/redesign-portfolio.md))
| Rota | Fase | Observação |
|---|---|---|
| `/projetos/[slug]` | 3 | `generateStaticParams` a partir de `projects`, `generateMetadata` por projeto |
| `/curriculo` | 4 | página com CSS de impressão |


Regras para rotas novas:
- **Nome em português**, minúsculo e com hífen (`/projetos`, `/curriculo`).
- **Pré-renderizada**, a não ser que dependa de requisição.
- **Entra em `sitemap.ts` e no menu**, se for navegável.

## Links externos
- **Sempre em nova aba:** todo link para fora do site usa `target="_blank"` e `rel="noopener noreferrer"`, para o visitante não perder a página. `mailto:` e âncoras `#` ficam na mesma aba.
- **Sinalização:** o link mostra uma seta `↗` quando o texto permite e inclui `(abre em nova aba)` em texto só para leitores de tela (`sr-only`, ou no `aria-label` dos botões de ícone).
