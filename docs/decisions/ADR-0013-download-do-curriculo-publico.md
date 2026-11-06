# ADR-0013: Download direto do currículo público

- **Status:** Aceito
- **Data:** 2026-11-06
- **Substitui:** [ADR-0005](ADR-0005-curriculo-pdf-gerado-pelo-site.md)

## Contexto

O autor solicitou que a ação de baixar PDF entregue diretamente o arquivo já existente em `public`, em vez de abrir a impressão do navegador.

## Decisão

A página `/curriculo` mantém o conteúdo renderizado a partir das constantes. O botão “Baixar PDF” usa um link nativo com `download` para `public/Resumo de Alessandro Henrique Ramos.pdf`. O endereço fica em `profile.resumePdfUrl` e chega ao componente por props.

## Consequências

- O download dispensa JavaScript e preserva o arquivo existente.
- A página e o PDF são fontes editáveis distintas; atualizar a página não regenera o arquivo.
- O CSS de impressão permanece disponível para impressão manual, sem ser a ação do botão.
