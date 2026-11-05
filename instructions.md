# Instruções: quando consultar cada documento

A documentação fica em [docs/](docs/README.md). Ela não precisa ser lida inteira: **leia só o que a tarefa pede**, pela tabela abaixo. Se a tarefa for pequena e local (corrigir um texto, ajustar uma classe), o [AGENTS.md](AGENTS.md) costuma bastar.

## Como usar
1. Identifique o tipo da tarefa na tabela.
2. Leia os documentos indicados antes de alterar o código. Comece pelo primeiro e só siga para os outros se ele não responder.
3. Se o documento necessário estiver marcado como ⏳ ou ➖ no [roadmap](docs/DOCUMENTATION_ROADMAP.md), use o código atual como referência e, se a tarefa for o gatilho, crie o documento.
4. Se o código e a documentação divergirem, o código é a verdade atual. Corrija o documento e mencione isso ao concluir.

## Mapa tarefa → documentos
| Tarefa | Leia |
|---|---|
| Alterar textos, projetos, experiências ou educação | [standards/content-guidelines](docs/standards/content-guidelines.md), [architecture/data-flow](docs/architecture/data-flow.md) |
| Criar ou alterar componente | [frontend/component-guidelines](docs/frontend/component-guidelines.md), [frontend/design-system](docs/frontend/design-system.md) |
| Estilo, cores, tema, espaçamento | [frontend/styling-guidelines](docs/frontend/styling-guidelines.md), [frontend/design-system](docs/frontend/design-system.md) |
| Layout, fluxo da página, microcopy | [frontend/ui-ux-guidelines](docs/frontend/ui-ux-guidelines.md) |
| Nova página ou rota | [frontend/routing-guidelines](docs/frontend/routing-guidelines.md), [frontend/application-structure](docs/frontend/application-structure.md) |
| Lógica nova (função pura, registro, adaptador) ou dúvida de onde colocar uma regra | [design/software-design](docs/design/software-design.md), [design/design-patterns](docs/design/design-patterns.md) |
| Criar abstração, variante de componente, reaproveitar peça | [design/abstractions-and-composition](docs/design/abstractions-and-composition.md) |
| Erros, fallback, 404, mensagens de falha | [design/error-handling](docs/design/error-handling.md) |
| Estado no cliente, interatividade, `'use client'` | [frontend/state-management](docs/frontend/state-management.md) |
| Acessibilidade, teclado, leitor de tela | [frontend/accessibility](docs/frontend/accessibility.md) |
| Mover arquivos, criar pastas ou módulos | [architecture/module-boundaries](docs/architecture/module-boundaries.md), [standards/file-and-folder-conventions](docs/standards/file-and-folder-conventions.md) |
| Decisão estrutural (nova dependência, novo serviço, mudar padrão) | [architecture/architectural-principles](docs/architecture/architectural-principles.md), [decisions/](docs/decisions/README.md) (registre um ADR) |
| Metadados, SEO, Open Graph | [frontend/routing-guidelines](docs/frontend/routing-guidelines.md) |
| Terminal (Fase 5) | [plans/redesign-portfolio](docs/plans/redesign-portfolio.md) (Fase 5), [design/design-patterns](docs/design/design-patterns.md) (registro de comandos), [frontend/accessibility](docs/frontend/accessibility.md) |
| LLM, `/api/ask`, Gemini, limites (Fase 6) | [plans/redesign-portfolio](docs/plans/redesign-portfolio.md) (Fase 6), [design/error-handling](docs/design/error-handling.md), [standards/security-guidelines](docs/standards/security-guidelines.md) |
| Tipos e TypeScript | [standards/typescript-guidelines](docs/standards/typescript-guidelines.md) |
| Nomes de arquivos, variáveis, componentes | [standards/naming-conventions](docs/standards/naming-conventions.md) |
| Lint ou format falhando | [standards/lint-and-format](docs/standards/lint-and-format.md), [operations/troubleshooting](docs/operations/troubleshooting.md) |
| Segurança (links externos, HTML injetado, segredos) | [standards/security-guidelines](docs/standards/security-guidelines.md) |
| Rodar o projeto, erro local | [operations/development-setup](docs/operations/development-setup.md), [operations/troubleshooting](docs/operations/troubleshooting.md) |
| Build, CI, deploy | [operations/build-and-deployment](docs/operations/build-and-deployment.md) |
| Commit, branch, PR | [development/git-and-commit-conventions](docs/development/git-and-commit-conventions.md) |
| Finalizar qualquer tarefa | [development/definition-of-done](docs/development/definition-of-done.md) |

## O que evitar
- **Ler a pasta `docs/` inteira para uma tarefa pequena.**
- **Duplicar informação que já existe em outro documento.** Aponte para ele.
- **Criar documento novo sem que a tarefa precise dele.** Os documentos planejados e seus gatilhos estão no [roadmap](docs/DOCUMENTATION_ROADMAP.md).
