# Roadmap da documentação

Estrutura-alvo da pasta `docs/` e situação de cada documento. Um documento só é criado quando há algo real para registrar. Arquivo vazio ou especulativo atrapalha mais do que ajuda.

**Legenda**
- ✅ **Criado**: existe e descreve o estado atual.
- ⏳ **Planejado**: será escrito quando o gatilho indicado acontecer.
- 🔀 **Incorporado**: o conteúdo vive em outro documento, indicado na tabela.
- ➖ **Não se aplica**: o projeto não tem esse aspecto hoje. Reavaliar se mudar.

As fases citadas são as do [plano de redesign](plans/redesign-portfolio.md).

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
│   ├── application-structure.md           ⏳
│   ├── api-design.md                      ⏳
│   ├── database-guidelines.md             ➖
│   ├── business-logic.md                  ➖
│   ├── authentication-and-authorization.md ➖
│   └── integrations.md                    ⏳
│
├── standards/
│   ├── coding-standards.md                ✅
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
│   ├── environment-configuration.md       ⏳
│   ├── build-and-deployment.md            ✅
│   ├── migrations.md                      ➖
│   └── troubleshooting.md                 ✅
│
└── decisions/
    ├── README.md                          ✅
    └── ADR-0001-template.md               ✅
```

## Pendentes e gatilhos

| Documento | Status | Gatilho / destino |
|---|---|---|
| `frontend/code-organization.md` | 🔀 | Em [frontend/application-structure](frontend/application-structure.md) e [standards/file-and-folder-conventions](standards/file-and-folder-conventions.md). |
| `backend/application-structure.md` | ⏳ | Fase 6. Primeira rota de servidor (`app/api/ask`) e `lib/llm/*`. |
| `backend/api-design.md` | ⏳ | Fase 6. Contrato de `POST /api/ask` (corpo, streaming, códigos de erro). |
| `backend/database-guidelines.md` | ➖ | Não há banco. O Redis da Fase 6 guarda só contadores e limites e entra em `integrations.md`. |
| `backend/business-logic.md` | ➖ | Não há regra de negócio no servidor. As regras de conteúdo ficam em [standards/content-guidelines](standards/content-guidelines.md). |
| `backend/authentication-and-authorization.md` | ➖ | Site público, sem login. A proteção da API (rate limit, origem) entra em `api-design.md` e em [security-guidelines](standards/security-guidelines.md). |
| `backend/integrations.md` | ⏳ | Fase 6. Gemini (`@google/genai`) e Upstash Redis. |
| `standards/code-style.md` | 🔀 | Em [coding-standards](standards/coding-standards.md) e [lint-and-format](standards/lint-and-format.md). |
| `standards/code-quality.md` | 🔀 | Em [coding-standards](standards/coding-standards.md) e [definition-of-done](development/definition-of-done.md). |
| `standards/testing-guidelines.md` | ⏳ | Fase 5, quando `components/terminal/commands.ts` (puro e testável) trouxer o primeiro teste. Hoje não há testes: o CI roda lint, type-check e build. |
| `product/` (pasta) | ➖ | Um portfólio não tem produto com usuários, papéis e regras de negócio. |
| `product/product-overview.md` | ➖ | O público e o objetivo do site estão em [frontend/ui-ux-guidelines](frontend/ui-ux-guidelines.md); a visão de futuro, no [plano](plans/redesign-portfolio.md). |
| `product/business-rules.md` | 🔀 | Em [standards/content-guidelines](standards/content-guidelines.md) (o que pode ser publicado). |
| `product/user-flows.md` | ➖ | Os fluxos atuais são triviais; os planejados estão no [plano](plans/redesign-portfolio.md). |
| `product/permissions-and-roles.md` | ➖ | Não há usuários nem papéis. |
| `operations/environment-configuration.md` | ⏳ | Fase 6, quando surgirem as primeiras variáveis de ambiente (`GEMINI_API_KEY`, Upstash, tetos de custo). Hoje o projeto não usa nenhuma. |
| `operations/migrations.md` | ➖ | Não há banco nem schema. |

## ADRs a registrar
Decisões já tomadas que merecem um ADR em `decisions/`, com o [template](decisions/ADR-0001-template.md):

- ADR-0002: constants como fonte única de dados (home, cases, currículo, terminal, LLM).
- ADR-0003: Gemini como provedor da LLM, com Upstash para limites na Vercel.
- ADR-0004: educação sem página própria, por enquanto.
- ADR-0005: currículo em PDF gerado a partir da página `/curriculo`.

## Manutenção
- **Ao concluir uma fase do plano:** atualizar os documentos afetados e este roadmap.
- **Ao criar um documento planejado:** trocar ⏳ por ✅ e remover a linha da tabela de pendentes.
- **Se o código contradisser um documento:** corrigir o documento no mesmo PR.
