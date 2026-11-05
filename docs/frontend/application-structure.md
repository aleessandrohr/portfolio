# Estrutura da aplicação (frontend)

```
src/
├── app/
│   ├── layout.tsx            # <html>, fonte Inter, metadados, JSON-LD, ThemeProvider
│   ├── page.tsx              # home: Resumo, Experiências, Projetos, Educação
│   ├── opengraph-image.tsx   # imagem OG gerada com next/og
│   └── globals.css           # tokens (variáveis CSS), scrollbar
├── components/
│   ├── ui/                   # primitivas shadcn (button, card, dialog, drawer, ...)
│   ├── project/
│   │   ├── index.tsx         # card de projeto + dialog de demonstração
│   │   └── components/iframe.tsx
│   ├── experience.tsx        # card de experiência/educação + badges de skill
│   ├── profile.tsx           # barra de navegação fixa + drawer mobile
│   ├── mode-toggle.tsx       # seletor de tema
│   └── icon.tsx              # ícone lucide por nome (import dinâmico)
├── constants/                # conteúdo (ver architecture/data-flow.md)
├── lib/utils.ts              # cn()
└── providers/theme.tsx       # next-themes
public/static/assets/         # imagens de projetos e foto de perfil
```

## Onde colocar código novo
| Tipo | Lugar |
|---|---|
| Página ou rota | `src/app/<rota>/page.tsx` |
| Componente usado em uma só área | `src/components/<domínio>/` |
| Subcomponente privado de um componente | `src/components/<domínio>/components/` |
| Primitiva genérica do shadcn | `src/components/ui/` (via CLI do shadcn) |
| Dado de conteúdo | `src/constants/` |
| Função pura compartilhada | `src/lib/` |
| Imagem | `public/static/assets/` |

## Planejado ([plano](../plans/redesign-portfolio.md))
- `components/home/*`, `components/site-header.tsx` (substitui `profile.tsx`) e `components/site-footer.tsx`, na Fase 2.
- `app/projetos/[slug]/` (Fase 3), `app/curriculo/` (Fase 4) e `app/terminal/` mais `components/terminal/*` (Fase 5).
- `constants/profile.ts`, `constants/skills.ts` e `lib/knowledge.ts`, na Fase 1.
