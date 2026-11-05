# Estado

Não há store global. O estado é pequeno e fica no componente que o usa.

| Estado | Onde | Como |
|---|---|---|
| Tema (claro, escuro, sistema) | `providers/theme.tsx`, `mode-toggle.tsx` | `next-themes`, com a classe `dark` no `<html>` |
| Dialog da demonstração aberto | `components/project/index.tsx` | `useState` sincronizado com `window.location.hash` |
| Carregamento do iframe | `components/project/components/iframe.tsx` | `useState` + `onLoad` |
| Drawer do menu mobile | `components/profile.tsx` | estado interno do `Drawer` (vaul) |

## Regras
- **Prefira a URL** para estado que vale compartilhar, como o hash da demonstração.
- **Prefira `useState` local.** Só crie um provider quando dois componentes distantes precisarem do mesmo estado.
- **Não duplique dados de `constants/` em estado.** Eles são estáticos.

## Planejado ([plano](../plans/redesign-portfolio.md), Fases 5 e 6)
- **Terminal:** histórico de comandos, linhas de saída, modo (`comando` ou `chat`) e pedido em andamento, todos locais em `components/terminal/terminal.tsx`.
- **Abertura do terminal pelo header e pela home:** exige um estado compartilhado. Use um provider leve, como `TerminalProvider`, ou o hash `#terminal`, seguindo o mesmo padrão da demonstração.
- **Streaming da LLM:** `fetch` com `AbortController` guardado em `useRef`. Nada de bibliotecas de cache para uma única chamada.
