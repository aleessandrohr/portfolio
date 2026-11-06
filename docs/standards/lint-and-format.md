# Lint e format

Ferramenta única: **Biome 2** (`biome.json`). Não há ESLint nem Prettier. Por isso `next.config.mjs` tem `eslint.ignoreDuringBuilds`.

## Configuração
- **Formatação:** tabs (largura 2), `lineWidth` 80, LF, aspas simples, JSX com aspas duplas, sem ponto e vírgula, `arrowParentheses: asNeeded` e `trailingCommas: es5`.
- **Linter:** preset `recommended`, mais `nursery/useSortedClasses`, que ordena as classes do Tailwind em `className`, `class`, `cx()` e `clsx()`.
  - Classes passadas para `cn()` **não** são ordenadas, porque `cn` não está na lista `functions`.
- **Escopo:** só `src/**/*.{ts,tsx,js,jsx}`, sem `src/components/ui/**`, que é o código do shadcn.
- **Organização de imports:** ativada (`assist.actions.source.organizeImports`).
- **`.editorconfig`:** espelha as mesmas regras (tabs, LF, UTF-8, newline final). Em `.yml` usa espaços.

## Comandos
| Comando | O que faz |
|---|---|
| `bun run lint` | `biome lint --write .` (corrige o que for seguro) |
| `bun run format` | `biome format --write .` |
| `bun run check` | `biome check --write .` (lint, format e imports) |
| `bunx biome check <arquivos>` | verifica só os arquivos indicados, sem alterar |

## Cuidado
Alguns arquivos versionados ainda não estão no formato do Biome, como `components/profile.tsx` e `app/opengraph-image.tsx`. Rodar `check --write` no projeto inteiro reformata esses arquivos e mistura ruído no diff.
- **No dia a dia:** rode o Biome só nos arquivos que você alterou.
- **Para normalizar tudo:** faça um commit separado, só de formatação (`style: format with biome`).
