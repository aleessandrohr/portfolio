# Acessibilidade

Meta: WCAG 2.1 AA.

## Já aplicado
- **`<html lang="pt-BR">`**, em `layout.tsx`.
- **Botões só com ícone têm `aria-label`**, como "Abrir menu" e os ícones de redes, e contam com `Tooltip`.
- **Ícones decorativos têm `aria-hidden="true"`**, como o `Play` da demonstração.
- **Imagens têm `alt`**, com o nome do projeto ou da pessoa.
- **Dialogs e drawers** (Radix/vaul) trazem foco preso, Esc para fechar, `DialogTitle` e `DialogDescription`.
- **Iframes têm `title`.**

## Regras para código novo
- **Teclado:** todo controle precisa ser alcançável por Tab e ter foco visível (`ring` usa o azul da marca). Não remova `outline` sem substituto.
- **Contraste:** texto `muted-foreground` só sobre `background` ou `card`. Verifique o contraste do azul `--brand` em texto pequeno no tema claro.
- **Semântica:** use `<nav>`, `<main>` e `<section>` com títulos `h2` e `h3` em ordem. Use `<a>` para navegar e `<button>` para ação.
- **Movimento:** respeite `prefers-reduced-motion` em animações novas (`motion-safe:` e `motion-reduce:`).
- **Toque:** alvos com pelo menos 40 a 44 px no celular.

## Terminal (planejado, Fase 5)
- **Saída:** fica numa região `aria-live="polite"`. Respostas da LLM em streaming só são anunciadas quando completam.
- **Input:** tem `<label>` visível ou `aria-label`.
- **Foco:** volta para o input após cada comando.
- **Esc:** fecha o terminal quando aberto como dialog.
- **Atalhos clicáveis:** todos os comandos também podem ser acionados por botões, para quem não usa teclado ou não conhece os comandos.
- **Atalho global (Ctrl+`):** não pode capturar teclas quando o foco está num campo de texto.
