# Estilo

## Ferramentas
- **Tailwind CSS 3:** é a forma padrão de estilizar. Não há CSS Modules nem styled-components.
- **Variáveis CSS:** ficam em `src/app/globals.css`, com `:root` para o tema claro e `.dark` para o escuro. Os valores são HSL sem `hsl()`, para permitir opacidade (`bg-brand/10`).
- **`cn()` (`lib/utils.ts`):** use para combinar classes condicionais.
- **Classes de componente:** definidas como plugin em `tailwind.config.ts`.
  - `custom_container`: largura máxima `xl` e padding.
  - `custom_title`: título de seção em azul.
  - `custom_description`: texto justificado em `muted-foreground`.

## Regras
- **Use as cores semânticas:** `background`, `foreground`, `card`, `muted`, `border`, `brand`, `primary`, entre outras. Não use cor fixa (`#...`, `blue-500`) em elementos de interface.
- **Os dois temas são obrigatórios:** todo elemento novo precisa funcionar no claro e no escuro. Teste os dois.
- **Mobile first:** escreva o estilo base para telas pequenas e use `sm`, `md` e `lg` para ampliar. Existe também o breakpoint extra `xs` (475px).
- **Opacidade em vez de novas cores:** prefira `border-brand/40`, `bg-brand/5` e `bg-muted/30` a criar tokens.
- **Raios por função:** use a escala de 6, 8, 12, 20, 28 e 32 px definida em `globals.css`, via `rounded-xs/sm/md/lg/xl/2xl`. Reserve `rounded-full` para ações de destaque, ícones e avatares. Em imagens e containers aninhados, considere raio externo menos padding. Não introduza novos valores de raio fixos sem rever a escala do [design system](design-system.md).
- **Animação discreta:** `transition-*` de 200 a 500 ms e `tailwindcss-animate` para entradas e saídas.
- **Ordem das classes:** o Biome ordena com `useSortedClasses`. Ver [lint-and-format](../standards/lint-and-format.md).

## Impressão (planejado, Fase 4)
O `/curriculo` terá um bloco `@media print` em `globals.css`:
- folha A4 e fundo branco;
- sem header, footer nem botões.

Use `print:hidden` nos elementos que não devem sair no papel.

## Sem scroll horizontal
- **A página nunca rola na horizontal.** O `layout.tsx` envolve o conteúdo num `div` com `overflow-x-clip` como rede de segurança, e o elemento que ultrapassa a largura deve ser contido na origem (ex.: a grade decorativa do hero fica dentro de um contêiner com `overflow-hidden`). **Não coloque `overflow` em `html` nem em `body`:** o bloqueio de rolagem dos menus modais (dropdown de tema, drawer) aplica `overflow: hidden` no `body`, e com `html` também restrito o `body` vira contêiner de rolagem, o header `sticky` sai da tela e a posição pula.
- **Verificação:** compare `document.documentElement.scrollWidth` com `innerWidth` em 320, 360, 390, 414, 600, 768, 1024, 1280 e 1536 px, nos temas claro e escuro. Elementos com `blur`, `scale` ou margens negativas são os suspeitos mais comuns.
- **Menus abertos com a página rolada:** teste o dropdown de tema e o drawer do celular depois de rolar (ex.: 1500 px). O header deve continuar em `top: 12px` e `scrollY` não pode mudar.

## Estilos da home

Layout, altura do hero, pseudo-elementos decorativos e apresentação das letras usam classes Tailwind nos componentes. Não há `home.css`. Tokens e as regras de preparação das animações, impressão e movimento reduzido ficam em `globals.css`: elas garantem conteúdo visível sem JavaScript, com hidratação lenta ou com preferência por menos movimento. As animações continuam sob controle do Motion, sem duplicar a sequência em CSS.
