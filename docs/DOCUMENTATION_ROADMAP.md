# Roadmap da documentação

Estrutura-alvo da pasta `docs/` e situação de cada documento. Um documento só é criado quando há algo real para registrar. Arquivo vazio ou especulativo atrapalha mais do que ajuda.

**Legenda**
- ✅ **Criado**: existe e descreve o estado atual.
- ⏳ **Planejado**: será escrito quando o gatilho indicado acontecer.
- 🔀 **Incorporado**: o conteúdo vive em outro documento, indicado na tabela.
- ➖ **Não se aplica**: o projeto não tem esse aspecto hoje. Reavaliar se mudar.

As fases citadas são as do [plano de redesign](plans/redesign-portfolio.md).

**Situação em 06/11/2026:** fases 1 e 2 concluídas. O modo terminal da fase 5 está concluído, integrado ao hero conforme o ADR-0012. Cases ficam em espera até haver mais projetos robustos; a rota `/curriculo` está pronta; o hero e o terminal já levam a ela.

## Estrutura

```
docs/
├── README.md                              ✅
├── DOCUMENTATION_ROADMAP.md               ✅
├── plans/
│   └── redesign-portfolio.md              ✅
│
├── architecture/
│   ├── system-architecture.md             ✅
│   ├── application-architecture.md        ✅
│   ├── architectural-principles.md        ✅
│   ├── module-boundaries.md               ✅
│   └── data-flow.md                       ✅
│
├── design/
│   ├── software-design.md                 ✅
│   ├── design-patterns.md                 ✅
│   ├── abstractions-and-composition.md    ✅
│   └── error-handling.md                  ✅
│
├── frontend/
│   ├── application-structure.md           ✅
│   ├── code-organization.md               🔀
│   ├── component-guidelines.md            ✅
│   ├── routing-guidelines.md              ✅
│   ├── state-management.md                ✅
│   ├── styling-guidelines.md              ✅
│   ├── design-system.md                   ✅
│   ├── accessibility.md                   ✅
│   └── ui-ux-guidelines.md                ✅
│
├── backend/
│   ├── application-structure.md           ➖
│   ├── api-design.md                      ➖
│   ├── database-guidelines.md             ➖
│   ├── business-logic.md                  ➖
│   ├── authentication-and-authorization.md ➖
│   └── integrations.md                    ➖
│
├── standards/
│   ├── coding-standards.md                ✅
│   ├── code-structure.md                  ✅
│   ├── content-guidelines.md              ✅
│   ├── code-style.md                      🔀
│   ├── code-quality.md                    🔀
│   ├── lint-and-format.md                 ✅
│   ├── naming-conventions.md              ✅
│   ├── file-and-folder-conventions.md     ✅
│   ├── typescript-guidelines.md           ✅
│   ├── testing-guidelines.md              ⏳
│   └── security-guidelines.md             ✅
│
├── development/
│   ├── development-workflow.md            ✅
│   ├── definition-of-done.md              ✅
│   └── git-and-commit-conventions.md      ✅
│
├── product/                               ➖
│   ├── product-overview.md                ➖
│   ├── business-rules.md                  🔀
│   ├── user-flows.md                      ➖
│   └── permissions-and-roles.md           ➖
│
├── operations/
│   ├── development-setup.md               ✅
│   ├── environment-configuration.md       ➖
│   ├── build-and-deployment.md            ✅
│   ├── migrations.md                      ➖
│   └── troubleshooting.md                 ✅
│
└── decisions/
    ├── README.md                          ✅
    ├── ADR-0001-template.md               ✅
    └── ADR-0006-motion.md                 ✅
```

## Pendentes e gatilhos

| Documento | Status | Gatilho / destino |
|---|---|---|
| `frontend/code-organization.md` | 🔀 | Em [frontend/application-structure](frontend/application-structure.md) e [standards/file-and-folder-conventions](standards/file-and-folder-conventions.md). |
| `backend/` (pasta) | ➖ | Não há código de servidor próprio. O assistente com LLM, que criaria a primeira rota, foi descartado ([ADR-0003](decisions/ADR-0003-gemini-upstash.md)). Se uma rota surgir, estes documentos passam a ser necessários. |
| `backend/application-structure.md` | ➖ | Sem rotas de servidor. |
| `backend/api-design.md` | ➖ | Sem API própria. |
| `backend/database-guidelines.md` | ➖ | Não há banco. |
| `backend/business-logic.md` | ➖ | Não há regra de negócio no servidor. As regras de conteúdo ficam em [standards/content-guidelines](standards/content-guidelines.md). |
| `backend/authentication-and-authorization.md` | ➖ | Site público, sem login. A falta de autenticação foi o motivo de descartar o assistente com LLM. |
| `backend/integrations.md` | ➖ | Não há integração com serviço externo. |
| `standards/code-style.md` | 🔀 | Em [coding-standards](standards/coding-standards.md) e [lint-and-format](standards/lint-and-format.md). |
| `standards/code-quality.md` | 🔀 | Em [coding-standards](standards/coding-standards.md) e [definition-of-done](development/definition-of-done.md). |
| `standards/testing-guidelines.md` | ⏳ | Quando houver uma suíte de testes versionada. O resolver puro do terminal permite verificações isoladas; o CI continua com lint, type-check e build. |
| `product/` (pasta) | ➖ | Um portfólio não tem produto com usuários, papéis e regras de negócio. |
| `product/product-overview.md` | ➖ | O público e o objetivo do site estão em [frontend/ui-ux-guidelines](frontend/ui-ux-guidelines.md); a visão de futuro, no [plano](plans/redesign-portfolio.md). |
| `product/business-rules.md` | 🔀 | Em [standards/content-guidelines](standards/content-guidelines.md) (o que pode ser publicado). |
| `product/user-flows.md` | ➖ | Os fluxos atuais são triviais; os planejados estão no [plano](plans/redesign-portfolio.md). |
| `product/permissions-and-roles.md` | ➖ | Não há usuários nem papéis. |
| `operations/environment-configuration.md` | ➖ | O projeto não usa variáveis de ambiente. |
| `operations/migrations.md` | ➖ | Não há banco nem schema. |

## ADRs
Todos os registros de decisão estão em [decisions/](decisions/README.md). A sequência vai de 0001 a 0013: o 0001 é o template e os demais seguem o índice do README.

Ao tomar uma nova decisão estrutural, crie o próximo número livre com o [template](decisions/ADR-0001-template.md).

## Manutenção
- **Ao concluir uma fase do plano:** atualizar os documentos afetados e este roadmap.
- **Ao criar um documento planejado:** trocar ⏳ por ✅ e remover a linha da tabela de pendentes.
- **Se o código contradisser um documento:** corrigir o documento no mesmo PR.
