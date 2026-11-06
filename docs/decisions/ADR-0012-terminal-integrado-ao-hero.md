# ADR-0012: Terminal integrado ao hero

- **Status:** Aceito
- **Data:** 2026-11-06
- **Relacionado a:** [plano de redesign](../plans/redesign-portfolio.md), Fase 5

## Contexto

O plano anterior previa um terminal em dialog e uma rota própria. Durante a implementação, o autor definiu que a tela inicial deve permanecer com seu visual aprovado, acrescentando um prompt no hero para navegar até partes do site. Os botões devem oferecer as mesmas ações, com rótulos de comandos no modo terminal.

## Decisão

Preservar a estrutura da home e alternar apenas os rótulos de interface e a presença do prompt. O modo é compartilhável por `?mode=terminal` e independente do tema. Conteúdo profissional continua vindo de `src/constants/` por props.

A página fornece uma lista tipada de comandos e destinos existentes. Um resolver puro em `utils/terminal-commands.ts` é usado pelo provider cliente; os links nativos registram o comando e preservam seu comportamento. O provider envolve apenas a home, pois header, hero, projetos e contato compartilham esse estado.

## Alternativas consideradas

| Opção | Benefícios | Custos |
|---|---|---|
| Prompt no hero (escolhida) | Preserva a identidade e a navegação; botões e input usam os mesmos destinos | Exige sincronizar rótulos e histórico entre componentes |
| Terminal em dialog ou página própria | Isola a experiência textual | Acrescenta uma interface que o autor não deseja |
| Simular um desktop ou sistema de arquivos | Aproxima uma metáfora de sistema operacional | Complexidade sem necessidade para navegar pelo portfólio |

## Consequências

- As seções e a apresentação visual permanecem montadas no servidor.
- O código exclusivo do prompt fica junto do hero. Controles usados em várias seções ficam em `components/`.
- `configs/` define navegação; `types/` define o contrato; `utils/` resolve comandos; `providers/` executa efeitos de interface com dados recebidos por props.
- Não há nova rota, dependência, serviço, segredo ou execução de comandos do sistema.
- Cases continuam em espera; currículo/PDF fica para depois da fase 5.
