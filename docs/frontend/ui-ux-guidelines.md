# UI e UX

## Público e objetivo
O público principal são recrutadores e líderes técnicos. Eles costumam decidir em menos de um minuto se vale continuar lendo. A página precisa responder rápido: **quem é, o que faz, o que já entregou e como falar com ele**.

| Público | O que procura | O que o site precisa entregar |
|---|---|---|
| Recrutadores | perfil, experiência, contato | resumo claro, currículo enxuto, contato em um clique |
| Líderes técnicos | profundidade técnica, decisões | páginas de case com arquitetura, contribuição e resultados |
| Desenvolvedores | curiosidade, código | modo terminal, GitHub, demonstrações |

Fora do escopo: blog, depoimentos, área logada, formulário de contato com backend e vários idiomas.

## Princípios
1. **Valor antes de detalhe:** o topo mostra nome, título, uma frase de proposta e as ações principais. O detalhe fica nas páginas de case.
2. **Prova em vez de adjetivo:** prefira um fato verificável ("MVP do zero ao ar em 4 dias") a uma qualidade ("apaixonado por tecnologia").
3. **Números só se defensáveis:** nada de "50+ projetos" ou "30+ clientes". Ver [content-guidelines](../standards/content-guidelines.md).
4. **Uma ação principal por bloco:** o botão principal fica preenchido (`Button` padrão) e o secundário em contorno (`variant="outline"`).
5. **Escaneável:** frases curtas, listas no lugar de parágrafos longos e títulos que dizem o conteúdo.
6. **Dois caminhos para os mesmos dados:** o site visual para todos e o terminal para quem é dev. Os dois mostram o mesmo conteúdo (Fase 5).

## Microcopy
- **Português, tom direto e amigável, em primeira pessoa** ("Construí", "Implementei").
- **Botões dizem a ação:** "Ver projetos", "Agendar conversa", "Abrir site". Evite "Clique aqui".
- **Estados vazios e de erro explicam o que fazer,** por exemplo: "Assistente indisponível agora. Use `help` para ver os comandos."
- **Datas:** `MM/AAAA` nos cards; "Jul 2024–Jun 2026" no currículo, igual ao PDF.

## Layout
- **Largura do conteúdo:** até `max-w-4xl`, centralizado, dentro de `custom_container`.
- **Navegação:** fixa no topo, com drawer no celular.
- **Seções:** separadas por título com sublinhado azul e espaçamento `gap-8`.

## Planejado ([plano](../plans/redesign-portfolio.md), Fase 2)
Ordem da home:
1. Hero
2. Faixa de números
3. Sobre e stack
4. Projetos em destaque
5. Experiência
6. Educação
7. Contato

Depoimentos e blog ficam de fora até existir conteúdo real.
