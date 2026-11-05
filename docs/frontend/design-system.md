# Design system

A identidade visual deve ser **preservada** em qualquer redesign: o que muda é layout e conteúdo, não a paleta.

## Tokens
| Token | Claro | Escuro | Uso |
|---|---|---|---|
| `--brand` | `217 91% 60%` | `217 91% 60%` | cor de destaque: títulos de seção, links, hover, foco, scrollbar |
| `--background` | `0 0% 100%` | `0 0% 3.9%` | fundo da página |
| `--card` | `0 0% 100%` | `0 0% 6.5%` | fundo de cards |
| `--muted-foreground` | `0 0% 45.1%` | `0 0% 68%` | texto secundário |
| `--border` | `0 0% 89.8%` | `0 0% 14.5%` | bordas |
| `--ring` | `217 91% 60%` | `217 91% 60%` | anel de foco |
| `--radius` | `0.5rem` | — | base dos raios (`lg`, `md`, `sm`) |

A fonte completa dos tokens fica em `src/app/globals.css`, e o mapeamento para Tailwind em `tailwind.config.ts`.

## Tipografia
- **Fonte:** Inter, via `next/font/google` em `layout.tsx`. Uma fonte mono (JetBrains Mono) está planejada só para o terminal e detalhes de código (Fase 2).
- **Títulos de seção:** `custom_title` (`text-xl`, peso médio, azul), com sublinhado `border-brand/50`.
- **Título de card:** `text-2xl`, que fica azul no hover.
- **Corpo:** `custom_description`.

## Componentes base
- **Primitivas do shadcn/ui** em `src/components/ui/`, estilo `default` e cor base `neutral`:
  - `Button`, `Card`, `Dialog`, `Drawer`, `DropdownMenu`, `Separator`, `Skeleton`, `Tooltip`, `Loading`.
- **Para adicionar uma primitiva**, use a CLI do shadcn (`bunx shadcn@latest add <nome>`). Não copie código à mão.

## Padrões visuais recorrentes
- **Card interativo:** `border-border/80`, no hover `-translate-y-1`, `border-brand/50` e `shadow-xl shadow-brand/5`.
- **Pílula de destaque:** `rounded-full border border-brand/25 bg-brand/5 text-brand text-xs`, usada no período das experiências.
- **Link de ação:** `border border-brand/40 bg-brand/5 text-brand`, que no hover vai para `bg-brand/10`.
- **Barra com vidro:** `bg-background/60 backdrop-blur-2xl border-white/10`, na navegação fixa.
- **Badges de tecnologia:** cada tecnologia tem uma cor, definida em `skillBadgeStyles` (`components/experience.tsx`). Tecnologia sem cor própria usa o padrão `brand`. Na Fase 1 esse mapa passa para `constants/skills.ts`.

## O que não fazer
- **Introduzir uma segunda cor de destaque.**
- **Barras de porcentagem para skills.**
- **Gradientes fortes e cores saturadas fora do azul da marca.** Um brilho radial azul discreto no hero está previsto no plano.
