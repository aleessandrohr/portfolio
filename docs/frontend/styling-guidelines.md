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
  - Exceção existente: as cores dos badges de skill em `components/experience.tsx`, que identificam cada tecnologia.
- **Os dois temas são obrigatórios:** todo elemento novo precisa funcionar no claro e no escuro. Teste os dois.
- **Mobile first:** escreva o estilo base para telas pequenas e use `sm`, `md` e `lg` para ampliar. Existe também o breakpoint extra `xs` (475px).
- **Opacidade em vez de novas cores:** prefira `border-brand/40`, `bg-brand/5` e `bg-muted/30` a criar tokens.
- **Animação discreta:** `transition-*` de 200 a 500 ms e `tailwindcss-animate` para entradas e saídas.
- **Ordem das classes:** o Biome ordena com `useSortedClasses`. Ver [lint-and-format](../standards/lint-and-format.md).

## Impressão (planejado, Fase 4)
O `/curriculo` terá um bloco `@media print` em `globals.css`:
- folha A4 e fundo branco;
- sem header, footer nem botões.

Use `print:hidden` nos elementos que não devem sair no papel.
