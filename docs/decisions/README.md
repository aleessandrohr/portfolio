# Registros de decisão (ADRs)

Um ADR registra uma decisão de arquitetura ou de produto que afeta o projeto por bastante tempo: o contexto, a decisão e as consequências. Assim, quem chega depois entende *por que* as coisas são como são.

## Quando escrever
- Adicionar uma dependência ou um serviço externo que mude a arquitetura (ex.: um bundler novo ou um serviço de hospedagem).
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
| [0002](ADR-0002-constants-fonte-unica.md) | Constants como fonte única de dados | Substituído por ADR-0008 |
| [0003](ADR-0003-gemini-upstash.md) | Gemini como provedor da LLM e Upstash para limites | Rejeitado |
| [0004](ADR-0004-educacao-sem-pagina.md) | Educação sem página própria | Aceito |
| [0005](ADR-0005-curriculo-pdf-gerado-pelo-site.md) | Currículo em PDF gerado a partir de `/curriculo` | Aceito (ainda não implementado) |
| [0006](ADR-0006-motion.md) | Motion para entradas e revelação da home | Aceito |
| [0007](ADR-0007-next-16.md) | Atualizar o Next.js para a versão 16 (Turbopack) | Proposto |
| [0008](ADR-0008-organizacao-dados-configs-utils.md) | Separar conteúdo, configurações, integrações e utilitários | Aceito |
| [0009](ADR-0009-implementacao-local-das-rotas.md) | Implementação exclusiva junto de cada rota | Substituído por ADR-0010 |
| [0010](ADR-0010-componentes-da-home-por-secao.md) | Componentes da home agrupados por seção | Aceito |
| [0011](ADR-0011-modelos-das-constantes.md) | Contratos de conteúdo por domínio | Aceito |
| [0012](ADR-0012-terminal-integrado-ao-hero.md) | Terminal integrado ao hero | Aceito |

ADRs a escrever estão listados no [roadmap](../DOCUMENTATION_ROADMAP.md#adrs-a-registrar).
