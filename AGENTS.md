# AGENTS.md

Guia para agentes de código (Claude Code, Codex, Cursor) neste repositório.

## Projeto
Portfólio pessoal de Alessandro Henrique Ramos, em [aleessandrohr.dev.br](https://aleessandrohr.dev.br). Usa Next.js 14 (App Router), React 18, TypeScript estrito, Tailwind CSS e componentes shadcn/ui, com hospedagem na Vercel. O conteúdo é em português (pt-BR).

Leia [instructions.md](instructions.md) para saber quais documentos de `docs/` consultar em cada tipo de tarefa.

## Comandos
```bash
bun install          # dependências (lockfile: bun.lock)
bun dev              # somente se não houver servidor do projeto em http://localhost:3000
bun run type-check   # tsc: é o que barra erro de tipo (o build ignora)
bun run build        # build de produção
bunx biome check <arquivos>          # lint e format, só nos arquivos alterados
bunx biome check --write <arquivos>  # aplica as correções nesses arquivos
```

## Regras que valem sempre
1. **Conteúdo fica em `src/constants/`; configurações em `src/configs/`, integrações de bibliotecas em `src/lib/` e utilitários puros em `src/utils/`.** Componentes e páginas só renderizam. Não escreva textos de conteúdo dentro de componentes. Detalhes em [docs/architecture/architectural-principles.md](docs/architecture/architectural-principles.md).
2. **Conteúdo honesto.** Não invente números, resultados, clientes ou tecnologias. Não publique informação não pública de terceiros (empresas, eventos) nem dados pessoais além dos que já estão no currículo público. O repositório é público. Regras em [docs/standards/content-guidelines.md](docs/standards/content-guidelines.md).
3. **Identidade visual.** Mantenha os tokens existentes: Inter, azul `--brand` e neutros, temas claro e escuro. Não introduza cores fixas fora do design system. Detalhes em [docs/frontend/design-system.md](docs/frontend/design-system.md).
4. **Estrutura do código.** Siga a ordem e os blocos de [docs/standards/code-structure.md](docs/standards/code-structure.md): arquivo (imports, tipos, constantes, helpers, componente) e função (contexto, variáveis, guardas, laços, efeitos, limpeza).
5. **Biome só nos arquivos alterados.** Rodar `biome check --write` em `src/` inteiro reformata arquivos que você não tocou.
6. **Componentes de `src/components/ui/` vêm do shadcn** e ficam fora do Biome. Evite editá-los; prefira compor por cima.
7. **Segredos só no servidor.** Nunca use `NEXT_PUBLIC_` para chaves e nunca faça commit de `.env*`.
8. **Antes de concluir:** siga a [definição de pronto](docs/development/definition-of-done.md). No mínimo, type-check, Biome nos arquivos alterados e build passando.
9. **Docs acompanham o código.** Se a mudança contradiz um documento, atualize o documento no mesmo commit.
10. **Commit e push só quando pedirem.** Siga [docs/development/git-and-commit-conventions.md](docs/development/git-and-commit-conventions.md).
11. **Reutilize o servidor existente na porta 3000.** Verifique a instância antes de iniciar `bun dev`. Se o projeto já estiver rodando, use essa instância; não abra outra porta, não reinicie nem encerre o servidor do usuário. Veja [docs/operations/development-setup.md](docs/operations/development-setup.md). Para validar o build sem disputar `.next`, siga [docs/operations/build-and-deployment.md](docs/operations/build-and-deployment.md).
12. **Implementação exclusiva fica junto da rota.** A home fica em `src/app/(home)/`, com `_components/` agrupados por seção. Componentes compartilhados não importam detalhes privados de rotas. Veja [docs/frontend/application-structure.md](docs/frontend/application-structure.md).
