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

## Terminal integrado

- **Modo:** `providers/portfolio-mode.tsx` expõe apenas a preferência de apresentação, sincronizada com `?mode=terminal` e `popstate`.
- **Sessão:** `providers/terminal-session.tsx` reúne comandos, histórico e último resultado em um estado único. Ambos os providers são montados apenas na home; o tema continua independente.
- **Comandos e destinos:** recebidos da página por props; o provider não importa conteúdo de `constants/`.
- **Prompt:** `hero/command-line.tsx` guarda apenas a entrada, o rascunho, a posição no histórico e a intenção de completar. Ajuda, sugestões e feedback são derivados do registro e do último resultado, sem cópias em estado. `command-input.tsx` renderiza o formulário acessível. O histórico guarda até 100 comandos durante a visita e inclui cliques no modo terminal.
- **Ações explícitas:** `recordCommand` registra o comando e resultado; `runCommand` registra e executa a navegação. Links usam o registro e preservam a ação nativa. O contexto de modo não recebe atualizações do histórico; callbacks e valores de contexto têm referências estáveis.

- **Retorno flutuante ao terminal:** `terminal-return.tsx` usa `IntersectionObserver` para observar hero e footer. A área observada desconta a borda inferior real do header sticky por `rootMargin`, atualizada quando o header ou a janela mudam de tamanho. A visibilidade é local; observers e listener de resize são limpos ao sair do modo terminal ou desmontar.
