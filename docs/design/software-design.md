# Design de software

Como o código é pensado *por dentro* dos módulos. A divisão em camadas e o que pode importar o quê estão em [architecture/](../architecture/application-architecture.md). Este documento trata das decisões de design de cada peça.

## Ideias centrais
1. **Dados separados de comportamento.**
   - Conteúdo é dado puro, em `src/constants/`.
   - Comportamento (renderizar, executar comando, responder pela LLM) é uma função sobre esses dados.
   - Isso permite mostrar o mesmo conteúdo de quatro formas: home, case, currículo e terminal.
2. **Funções puras no núcleo, efeitos na borda.**
   - Transformar dados é sempre puro: montar o texto da LLM, executar um comando, filtrar projetos.
   - Efeitos ficam nas bordas: `fetch`, `window`, `localStorage`, `next-themes` e navegação.
   - O núcleo puro é testável sem navegador.
3. **Tipos descrevem o domínio.** Interfaces como `Project` e `Experience` são o contrato entre o dado e quem o usa. Uma mudança de formato aparece como erro de tipo em todos os consumidores.
4. **Opcional é explícito.**
   - Um campo que pode faltar é `?` no tipo.
   - O consumidor decide o que fazer na ausência: não renderizar ou usar um fallback.
   - Nunca preencha o dado com valor fictício.
5. **Abstração só no segundo uso.** Um componente, hook ou helper novo surge quando um segundo caso real precisa dele, não antes.

## Hoje
O núcleo é pequeno: objetos em `constants/` e componentes que os renderizam. A única lógica fora da renderização é a sincronização do dialog da demonstração com o hash da URL (`components/project/index.tsx`).

## Planejado ([plano](../plans/redesign-portfolio.md))
| Peça | Fase | Natureza | Depende de |
|---|---|---|---|
| `lib/knowledge.ts` | 1 | pura: constants → texto e objetos | `constants/*` |
| `components/terminal/commands.ts` | 5 | pura: `(entrada, contexto) → resultado` | `lib/knowledge.ts` |
| `components/terminal/terminal.tsx` | 5 | efeitos: teclado, foco, tema, navegação, `fetch` | `commands.ts` |
| `lib/llm/prompt.ts` | 6 | pura: dados + histórico → mensagens do modelo | `lib/knowledge.ts` |
| `lib/llm/limits.ts` | 6 | efeitos: Redis ou memória | Upstash |
| `app/api/ask/route.ts` | 6 | orquestra: valida → limita → chama → transmite | `lib/llm/*` |

Os padrões usados nessas peças estão em [design-patterns](design-patterns.md); como elas se compõem, em [abstractions-and-composition](abstractions-and-composition.md); e como falham, em [error-handling](error-handling.md).
