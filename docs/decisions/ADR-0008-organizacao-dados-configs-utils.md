# ADR-0008: Separar conteúdo, configurações, integrações e utilitários

- **Status:** Aceito
- **Data:** 2026-11-05
- **Substitui:** [ADR-0002](ADR-0002-constants-fonte-unica.md)

## Contexto

A fonte única de conteúdo continua necessária, mas configurações de navegação e apresentação estavam misturadas com informações profissionais. O agregador `knowledge` não tem consumidores e deixou de ser necessário. A lógica de datas precisa usar Day.js, conforme a decisão do autor.

## Decisão

- `src/constants/` permanece como fonte única de conteúdo tipado, com contratos em `src/types/`. Páginas e metadados leem esses dados e os fornecem aos componentes por props.
- `src/configs/` guarda configurações compartilhadas: menu e estilos dos badges. Constantes exclusivas de um componente permanecem locais.
- `src/lib/` configura integrações externas. `dayjs.ts` registra o locale pt-BR e `customParseFormat`. Todo uso de Day.js importa desse módulo. `lib/utils.ts` mantém a integração `cn()` com clsx/tailwind-merge para compatibilidade com o shadcn.
- `src/utils/experience-timeline.ts` concentra ordenação, duração inclusiva em meses e cálculo de semestres civis. Mantém o parâmetro opcional `now: Date` para resultados verificáveis.
- O agregador `knowledge` é removido. Consumidores futuros leem os dados necessários diretamente, sem uma camada antecipada para o terminal.

## Alternativas consideradas

- Manter configurações dentro de `constants/`: mantém poucos diretórios, mas mistura apresentação com conteúdo profissional.
- Manter a aritmética manual de datas: evita uma dependência, mas não atende à centralização em Day.js solicitada pelo autor.
- Mover também o `cn()` para `utils/`: exigiria alterar imports das primitivas shadcn, sem benefício para esta mudança.

## Consequências

- Imports e documentação passam a distinguir os papéis de cada pasta.
- Day.js é uma dependência de runtime; o plugin permite a leitura estrita de `MM/YYYY`, conforme a [documentação oficial](https://day.js.org/docs/en/parse/string-format).
- A contagem de meses e a ordenação mantêm o comportamento anterior para os dados válidos do projeto; não há mudança de layout ou conteúdo.
- As datas continuam sendo calculadas na pré-renderização, sem atualização automática no navegador.
