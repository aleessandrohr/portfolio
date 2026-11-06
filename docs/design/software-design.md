# Design de software

Como o código é pensado *por dentro* dos módulos. A divisão em camadas e o que pode importar o quê estão em [architecture/](../architecture/application-architecture.md). Este documento trata das decisões de design de cada peça.

## Ideias centrais
1. **Dados separados de comportamento.**
   - Conteúdo é dado puro, em `src/constants/`.
   - Comportamento (renderizar, executar comando) é uma função sobre esses dados.
   - Isso permite mostrar o mesmo conteúdo de quatro formas: home, case, currículo e terminal.
2. **Funções puras no núcleo, efeitos na borda.**
   - Transformar dados é sempre puro: executar um comando, filtrar projetos.
   - Efeitos ficam nas bordas: `fetch`, `window`, `localStorage`, `next-themes` e navegação.
   - O núcleo puro é testável sem navegador.
3. **Tipos descrevem o domínio.** Interfaces como `Project` e `Experience` são o contrato entre o dado e quem o usa. Uma mudança de formato aparece como erro de tipo em todos os consumidores.
4. **Opcional é explícito.**
   - Um campo que pode faltar é `?` no tipo.
   - O consumidor decide o que fazer na ausência: não renderizar ou usar um fallback.
   - Nunca preencha o dado com valor fictício.
5. **Abstração só no segundo uso.** Um componente, hook ou helper novo surge quando um segundo caso real precisa dele, não antes.

## Hoje
O núcleo é pequeno: objetos em `constants/` e componentes que os renderizam. Os utilitários de datas ficam em `utils/experience-timeline.ts`. Na home, `home-motion.tsx` coordena animações, o carrossel controla a rotação e `projects/project-card/demo-dialog.tsx` sincroniza o dialog com o hash da URL.

## Peças implementadas
| Peça | Fase | Natureza | Depende de |
|---|---|---|---|
| `utils/experience-timeline.ts` | 2 | pura: datas → ordem, duração e período acadêmico | `lib/dayjs.ts`, `types/period.ts` |
| `utils/terminal-commands.ts` | 5 | pura: `(entrada, comandos) → resultado` | destinos fornecidos pela página |
| `app/(home)/_components/hero/command-line.tsx` | 5 | input, teclado, ajuda e feedback | provider e resolver puro |

Os padrões usados nessas peças estão em [design-patterns](design-patterns.md); como elas se compõem, em [abstractions-and-composition](abstractions-and-composition.md); e como falham, em [error-handling](error-handling.md).
