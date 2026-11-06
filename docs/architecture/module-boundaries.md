# Limites entre módulos

## Quem pode importar quem
| Módulo | Pode importar | Não pode importar |
|---|---|---|
| `app/` (páginas e layouts) | `components/`, `constants/`, `configs/`, `utils/`, `lib/`, `providers/`, `types/` | — |
| `app/<rota>/_components/` | componentes compartilhados, `utils/`, `lib/`, `types/` e configurações; conteúdo via props | implementação privada de outras rotas |
| `components/` (domínio) | `components/ui/`, `utils/`, `lib/`, `types/` e configurações em `configs/` | `app/` (páginas e layouts) |
| `components/ui/` | `lib/utils` | qualquer coisa de domínio (`constants/`, `types/`, componentes de domínio) |
| `constants/` | `types/` e outros constants, sem ciclos | componentes, `app/` |
| `configs/` | `types/`, outras configurações sem ciclos | componentes, conteúdo de domínio, `app/` |
| `lib/` | bibliotecas externas | componentes, `app/`, conteúdo de domínio |
| `utils/` | `lib/`, `types/`, `configs/` | componentes, `app/` |
| `types/` | tipos de `components/icon` (`IconName`) | valores de runtime, `constants/`, componentes, `app/` |
| `providers/` | bibliotecas externas | `constants/`, componentes de domínio |

Exceção existente: `types/social-media.ts` importa o **tipo** `IconName` de `components/icon`. Importar tipo é aceitável. Importar valor de componente não é.

## Regras
- **Implementação local fica na rota:** a home usa `app/(home)/_components/`, agrupados por seção. Header e footer são globais, e o menu do header fica em `src/configs/`. Cards de projeto e experiência são locais à home. Código compartilhado não importa essas pastas. Extraia para `src/components/`, `src/configs/` ou `src/utils/` quando houver uso real por mais de uma página.
- **Componentes de domínio recebem dados por props.** Não importam o objeto de constants diretamente. Assim, o mesmo componente serve para listas diferentes.
- **`components/ui/` é terceirizado (shadcn).** Ajuste por composição ou por `className`, não editando o arquivo.
- **O registro de comandos do terminal (Fase 5) não importa React.** A camada visual consome o registro, nunca o contrário.
