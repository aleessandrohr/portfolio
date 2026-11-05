# Padrões de código

Este documento reúne estilo e qualidade de código (`code-style` e `code-quality` estão incorporados aqui). As regras de formatação são aplicadas pelo Biome. Ver [lint-and-format](lint-and-format.md).

## Estilo
- **Formatação:** tabs, aspas simples, sem ponto e vírgula, vírgula final no padrão `es5` e linhas de até 80 colunas. Tudo isso é aplicado automaticamente.
- **Funções:** arrow functions para componentes e funções exportadas. `function` só onde o Next exige ou já é o padrão, como `RootLayout` e `OpenGraphImage`.
- **Retorno direto:** use `() => (<JSX/>)` quando o componente não tem lógica antes do retorno.
- **Imports:** são organizados pelo Biome. Use o alias `@/` para tudo que está em `src/`. Imports relativos só para subcomponentes privados (`./components/iframe`).
- **Comentários:** raros. Explique o *porquê*, não o *o quê*. Um `biome-ignore` sempre leva a justificativa, como o do JSON-LD em `layout.tsx`.
- **Texto visível ao usuário:** em português. Identificadores no código, em inglês.

## Qualidade
- **Simples primeiro:** sem abstração antes do segundo uso real.
- **Sem código morto:** remova imports, props e arquivos que deixaram de ser usados.
- **Dados fora da lógica:** conteúdo em `constants/` e componente só renderiza. Ver [architectural-principles](../architecture/architectural-principles.md).
- **Tipos estritos:** sem `any`. Ver [typescript-guidelines](typescript-guidelines.md).
- **Diffs focados:** não misture refatoração ou reformatação de arquivos não relacionados com a mudança da tarefa.
- **Efeitos com limpeza:** `useEffect` que adiciona listener remove o listener no retorno, como o `hashchange` em `components/project/index.tsx`.
