# Documentação do portfólio

Documentação técnica e de produto do site [aleessandrohr.dev.br](https://aleessandrohr.dev.br). O que existe, o que está planejado e o que não se aplica estão em [DOCUMENTATION_ROADMAP.md](DOCUMENTATION_ROADMAP.md).

## Por onde começar
- **Público e objetivo do site:** [frontend/ui-ux-guidelines.md](frontend/ui-ux-guidelines.md)
- **Como o sistema funciona:** [architecture/system-architecture.md](architecture/system-architecture.md)
- **Rodar localmente:** [operations/development-setup.md](operations/development-setup.md)
- **Plano em andamento:** [plans/redesign-portfolio.md](plans/redesign-portfolio.md)

## Seções
| Pasta | Conteúdo |
|---|---|
| [architecture/](architecture/) | Sistema, aplicação, princípios, limites entre módulos, fluxo de dados |
| [design/](design/) | Design de software: padrões, abstrações e composição, tratamento de erros |
| [frontend/](frontend/) | Estrutura, componentes, rotas, estado, estilo, design system, acessibilidade, UI/UX |
| `backend/` | Rotas de servidor e integrações (planejado, Fase 6, ver [roadmap](DOCUMENTATION_ROADMAP.md)) |
| [standards/](standards/) | Padrões de código, conteúdo, lint, nomes, pastas, TypeScript, segurança |
| [development/](development/) | Fluxo de trabalho, definição de pronto, git e commits |
| [operations/](operations/) | Setup, build e deploy, solução de problemas |
| [decisions/](decisions/) | Registros de decisão de arquitetura (ADRs) |
| [plans/](plans/) | Planos de trabalho em andamento |

## Convenções desta pasta
- **Idioma:** português; termos técnicos ficam em inglês quando é o uso comum (route handler, props, hook).
- **Atual × planejado:** cada documento separa o estado atual do que está planejado. O planejado sempre aponta a fase do plano.
- **Sem duplicação:** cada informação vive em um lugar só; os outros documentos apontam para ele.
- **Sem dados sensíveis:** o repositório é público. Nada de dados pessoais, segredos ou informação não pública de terceiros (ver [content-guidelines](standards/content-guidelines.md)).
