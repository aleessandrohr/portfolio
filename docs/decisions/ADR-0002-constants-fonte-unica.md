# ADR-0002: Constants como fonte única de dados

- **Status:** Substituído por [ADR-0008](ADR-0008-organizacao-dados-configs-utils.md)
- **Data:** 2026-11-05
- **Relacionado a:** [plano de redesign](../plans/redesign-portfolio.md), Fase 1

## Contexto
O conteúdo (título, resumo, curso, experiências, projetos) aparecia repetido em vários lugares: componentes, metadados, imagem Open Graph e currículo em PDF. As cópias divergiram: o PDF dizia "Engenharia da Computação" e o site dizia "Ciência e Tecnologia", e o título variava entre "Full Stack" e "Backend". O plano prevê mais três consumidores do mesmo conteúdo: páginas de case, `/curriculo` e terminal.

## Decisão
Todo conteúdo vive em `src/constants/`, descrito por interfaces em `src/types/`. As páginas, os metadados e o terminal leem desses arquivos. `src/lib/knowledge.ts` deriva deles as listas e os objetos do terminal. Componentes recebem os dados por props e não guardam texto de conteúdo.

## Alternativas consideradas
| Opção | Prós | Contras |
|---|---|---|
| Objetos TypeScript em `constants/` (escolhida) | tipados; sem dependência nova; erro de formato aparece no `type-check` | só quem mexe no código edita o conteúdo |
| MDX ou JSON por página | edição mais próxima de texto | mais ferramentas; sem validação de tipo; o terminal precisaria de um conversor |
| CMS externo | edição sem código | custo, dependência e rede para um site de uma pessoa só |
| Texto dentro dos componentes | nada a configurar | é a causa das divergências que motivaram esta decisão |

## Consequências
- Mudar um texto em um lugar muda o site todo, e uma divergência vira erro de tipo.
- Cada novo consumidor precisa ler dos constants. O `knowledge.ts` é o ponto comum.
- Mudar o formato de um dado exige atualizar todos os consumidores, e o TypeScript aponta quais.
- O conteúdo segue as [regras de conteúdo](../standards/content-guidelines.md), porque o repositório é público.
