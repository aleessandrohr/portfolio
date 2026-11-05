# Fluxo de dados

## Hoje
```
constants/experiences.ts ─┐
constants/projects.ts ────┼─► app/page.tsx ─► Object.values() ─► <Experience/> <Project/>
constants/educations.ts ──┘
constants/menu-items.ts ──┐
constants/social-media.ts ┴─► components/profile.tsx (navegação e redes)
```

- **Build:** os dados são lidos e as páginas são pré-renderizadas.
- **Cliente:** guarda só estado de interface: tema, dialog aberto e carregamento do iframe. Ver [state-management](../frontend/state-management.md).
- **Ordem na tela:** segue a ordem das chaves no objeto. Para reordenar, mude a ordem no arquivo.

## Para alterar conteúdo
| Quero mudar | Arquivo |
|---|---|
| Experiência profissional | `src/constants/experiences.ts` |
| Projeto (card, links, demo) | `src/constants/projects.ts` e imagem em `public/static/assets/` |
| Educação | `src/constants/educations.ts` |
| Redes sociais | `src/constants/social-media.ts` |
| Itens do menu | `src/constants/menu-items.ts` |
| Resumo, título, metadados | hoje em `src/app/page.tsx` e `src/app/layout.tsx`. Na Fase 1 passam para `constants/profile.ts`. |

Ao mudar o título ou a descrição profissional, revise também `src/app/opengraph-image.tsx` e o JSON-LD em `layout.tsx`. Esses textos ainda são duplicados.

## Planejado ([plano](../plans/redesign-portfolio.md))
```
constants/* ──► lib/knowledge.ts ─┬─► home, /projetos/[slug], /curriculo
                                  ├─► terminal (comandos fixos)
                                  └─► /api/ask ─► prompt do Gemini ─► terminal (streaming)
```
A Fase 1 elimina as duplicações listadas acima: título, resumo e curso passam a ter uma única origem.
