# Estado

Não há store global. O estado é pequeno e fica no componente que o usa.

| Estado | Onde | Como |
|---|---|---|
| Tema (claro, escuro, sistema) | `providers/theme.tsx`, `mode-toggle.tsx` | `next-themes`, com a classe `dark` no `<html>` |
| Dialog da demonstração aberto | `app/(home)/_components/projects/project-card/demo-dialog.tsx` | `useState` sincronizado com `window.location.hash` |
| Carregamento do iframe | `app/(home)/_components/projects/project-card/iframe.tsx` | `useState` + `onLoad` |
| Hero e revelação por rolagem | `app/(home)/_components/home-motion.tsx` | `useAnimate` compacto, `inView`, controles locais e estados `pending/entering/visible` no DOM; limpeza ao concluir/desmontar |
| Drawer do menu mobile | `components/header.tsx` | estado interno do `Drawer` (vaul) |

## Regras
- **Prefira a URL** para estado que vale compartilhar, como o hash da demonstração.
- **Prefira `useState` local.** Só crie um provider quando dois componentes distantes precisarem do mesmo estado.
- **Não duplique dados de `constants/` em estado.** Eles são estáticos.

## Planejado ([plano](../plans/redesign-portfolio.md), Fase 5)
- **Terminal:** histórico de comandos e linhas de saída, locais em `components/terminal/terminal.tsx`.
- **Abertura do terminal pelo header e pela home:** exige um estado compartilhado. Use um provider leve, como `TerminalProvider`, ou o hash `#terminal`, seguindo o mesmo padrão da demonstração.
