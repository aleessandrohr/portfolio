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
- **Movimento automático:** conteúdo que se move sozinho deve parar com o mouse e com o foco por teclado e respeitar `prefers-reduced-motion`. O carrossel de projetos (`home/projects-carousel.tsx`) não tem botão de pausa, por decisão de design. A WCAG 2.2.2 pede um mecanismo de pausa para movimento que dura mais de 5 s; a pausa por mouse e foco cobre só parte dos casos, e quem usa apenas toque não tem como parar a rotação.

## Terminal integrado ao hero

- O controle do header é um switch, com estado anunciado e nome acessível para ativar o modo ou voltar ao visual.
- O input tem label, foco visível e instruções associadas por `aria-describedby`.
- Feedback e erros ficam em `role="status"`, com `aria-live="polite"`.
- ↑/↓ percorrem o histórico; Tab completa somente quando há sugestão para o texto digitado. Shift+Tab e Tab sem correspondência mantêm a navegação de foco.
- Ajuda e sugestões são botões com área de toque de pelo menos 44 px. Os links da página permanecem como alternativa ao input.
- A navegação usa as mesmas âncoras, `scroll-mt` e tratamento de foco/hash do site. Movimento reduzido permanece respeitado.
