# Git e commits

## Branches
- **`master`:** branch principal, com deploy em produção. O CI roda em push e em PR para ela.
- **Branches de trabalho:** `<tipo>/<descrição-curta>` em kebab-case.
  - Exemplos: `feat/redesign-portfolio`, `fix/demo-dialog-hash`, `docs/architecture`.

## Commits
Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/). O histórico mais antigo é misto (`update`, `teste`); daqui em diante, use o padrão abaixo.

```
<tipo>(<escopo opcional>): <resumo no imperativo, minúsculo>
```

| Tipo | Quando |
|---|---|
| `feat` | funcionalidade ou conteúdo novo |
| `fix` | correção de bug |
| `docs` | apenas documentação |
| `style` | formatação, sem mudar comportamento |
| `refactor` | reestruturação, sem mudar comportamento |
| `chore` | dependências, configuração, CI |
| `content` | ajuste de texto ou dados em `constants/` |

Exemplos:
- `feat(terminal): add command registry`
- `content: update anuntech experience`
- `docs: add architecture docs`

Regras:
- **Um assunto por commit:** formatação geral vai num commit `style` separado.
- **Mensagem em inglês ou em português,** mas mantenha a mesma língua dentro de um PR.
- **Nunca commitar segredos,** `.env*.local` ou dados pessoais.

## Pull requests
- Use o template `.github/PULL_REQUEST_TEMPLATE.md`: descrição, tipo e breaking change.
- Inclua prints para mudanças visuais, nos temas claro e escuro.
- O dono do código é `@aleessandrohr` (`.github/CODEOWNERS`).
