# Fluxo de desenvolvimento

1. **Branch a partir da `master`:** `feat/...`, `fix/...`, `docs/...`, `chore/...`. Ver [git-and-commit-conventions](git-and-commit-conventions.md).
2. **Entender a tarefa:**
   - consulte os documentos indicados em [instructions.md](../../instructions.md);
   - se a tarefa fizer parte de um plano em `docs/plans/`, siga a fase correspondente.
3. **Implementar em passos pequenos:** cada commit deixa o site funcionando.
4. **Verificar localmente:**
   ```bash
   bun run type-check
   bunx biome check <arquivos alterados>
   bun run build
   bun dev   # conferir no navegador: temas claro/escuro, mobile e desktop
   ```
5. **Atualizar a documentação afetada** e, se for o caso, o [roadmap](../DOCUMENTATION_ROADMAP.md).
6. **Abrir PR para a `master`** usando o template em `.github/PULL_REQUEST_TEMPLATE.md`. O CI (`tests-front`) precisa passar.
7. **Deploy:** a Vercel gera um preview por PR e publica em produção ao fazer merge na `master`. Ver [build-and-deployment](../operations/build-and-deployment.md).

## Mudanças de conteúdo
Para alterar texto, projeto ou experiência, basta editar `src/constants/` (ver [data-flow](../architecture/data-flow.md)), conferir as [regras de conteúdo](../standards/content-guidelines.md) e seguir os passos 4 a 7.

## Decisões estruturais
Nova dependência, novo serviço externo ou mudança de padrão pedem um [ADR](../decisions/README.md) antes ou junto do PR.
