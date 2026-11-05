# Limites entre módulos

## Quem pode importar quem
| Módulo | Pode importar | Não pode importar |
|---|---|---|
| `app/` | `components/`, `constants/`, `lib/`, `providers/` | — |
| `components/` (domínio) | `components/ui/`, `lib/`, **tipos** de `constants/` | `app/` |
| `components/ui/` | `lib/utils` | qualquer coisa de domínio (`constants/`, componentes de domínio) |
| `constants/` | outros `constants/` (tipos), tipos de `components/icon` | componentes, `app/` |
| `lib/` | `constants/` (para derivar dados, ex.: `knowledge.ts`) | componentes, `app/` |
| `providers/` | bibliotecas externas | `constants/`, componentes de domínio |

Exceção existente: `constants/social-media.ts` importa o **tipo** `DynamicIconImports` de `components/icon`. Importar tipo é aceitável. Importar valor de componente não é.

## Regras
- **Componentes de domínio recebem dados por props.** Não importam o objeto de constants diretamente. Assim, o mesmo componente serve para listas diferentes.
- **`components/ui/` é terceirizado (shadcn).** Ajuste por composição ou por `className`, não editando o arquivo.
- **Código de servidor (Fase 6) fica em `app/api/` e `lib/llm/`.** Nunca é importado por um componente `'use client'`. Use `import 'server-only'` nos módulos que leem segredos.
- **O registro de comandos do terminal (Fase 5) não importa React.** A camada visual consome o registro, nunca o contrário.
