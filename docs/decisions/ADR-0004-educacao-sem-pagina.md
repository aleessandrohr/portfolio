# ADR-0004: Educação sem página própria

- **Status:** Aceito
- **Data:** 2026-11-05
- **Relacionado a:** [plano de redesign](../plans/redesign-portfolio.md)

## Contexto
O plano prevê uma página por projeto. A dúvida era se a educação deveria ter o mesmo tratamento. Hoje há uma única graduação, em andamento, e nenhum conteúdo próprio além do curso e do período.

## Decisão
A educação não tem página própria por enquanto. Ela aparece como uma seção da home e em `/curriculo`, a partir de `constants/educations.ts`.

## Alternativas consideradas
| Opção | Prós | Contras |
|---|---|---|
| Seção na home e no currículo (escolhida) | proporcional ao conteúdo; sem página vazia | menos espaço para detalhar |
| Página `/educacao` | simetria com os projetos | ficaria quase vazia, o que passa a impressão oposta à desejada |

## Consequências
- Menos rotas para manter.
- A decisão deve ser revista se surgir conteúdo próprio, como pesquisa, extensão, monitoria ou disciplinas com projetos relevantes.
- Projetos feitos fora da graduação, como o hackathon, ficam em Projetos, não em Educação.
