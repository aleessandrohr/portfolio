# ADR-0005: Currículo em PDF gerado a partir da página `/curriculo`

- **Status:** Aceito (ainda não implementado)
- **Data:** 2026-11-05
- **Relacionado a:** [plano de redesign](../plans/redesign-portfolio.md), Fase 4

## Contexto
O currículo em PDF é mantido à parte do site, em outro editor. Os dois já divergiram no nome do curso e no título profissional, e cada mudança de conteúdo precisa ser feita duas vezes. A página `/curriculo` terá o mesmo conteúdo e a mesma ordem do PDF.

## Decisão
O PDF passa a ser gerado pelo próprio site. A página `/curriculo` lê os mesmos `constants/` e tem um bloco `@media print` em `globals.css` (folha A4, fundo branco, sem header, footer e botões). Um botão aciona `window.print()` para imprimir ou salvar em PDF.

## Alternativas consideradas
| Opção | Prós | Contras |
|---|---|---|
| Impressão da própria página (escolhida) | uma só fonte; sem dependência nova; sem servidor | o resultado depende do navegador; o CSS de impressão precisa de manutenção |
| PDF mantido à mão em outro editor | controle total do layout | duplicação e divergência, que é o problema original |
| PDF gerado no servidor (navegador headless) | resultado igual em qualquer máquina | dependência pesada e função serverless mais cara |

## Consequências
- Conteúdo do currículo, do site e do terminal sempre iguais.
- A fidelidade ao PDF atual deve ser conferida na pré-visualização de impressão, nos navegadores mais usados.
- Nenhum PDF fica versionado no repositório.
