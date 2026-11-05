# Registros de decisão (ADRs)

Um ADR registra uma decisão de arquitetura ou de produto que afeta o projeto por bastante tempo: o contexto, a decisão e as consequências. Assim, quem chega depois entende *por que* as coisas são como são.

## Quando escrever
- Adicionar uma dependência ou um serviço externo que mude a arquitetura (ex.: provedor de LLM, Redis).
- Mudar um padrão estabelecido (ex.: onde ficam os dados, como as rotas são geradas).
- Escolher entre alternativas com trade-off real, quando a escolha não for óbvia pelo código.

Não escreva um ADR para escolhas triviais ou facilmente reversíveis.

## Como escrever
1. Copie o [template](ADR-0001-template.md) para `ADR-NNNN-titulo-curto.md`, com o próximo número livre.
2. Comece com o status **Proposto**. Passe para **Aceito** quando a decisão valer.
3. Não reescreva um ADR aceito. Se a decisão mudar, crie outro e marque o antigo como **Substituído por ADR-NNNN**.

## Índice
| ADR | Título | Status |
|---|---|---|
| [0001](ADR-0001-template.md) | Template | — |

ADRs a escrever estão listados no [roadmap](../DOCUMENTATION_ROADMAP.md#adrs-a-registrar).
