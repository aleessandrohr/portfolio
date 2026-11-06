# Build e deploy

## Build
- `bun run build` executa `next build`.
- Se houver um servidor de desenvolvimento ativo, preserve a instância da porta 3000, conforme [ambiente de desenvolvimento](development-setup.md). Não execute `next build` no mesmo diretório de saída (`.next`) usado por ela. Valide o build em uma cópia temporária isolada do projeto, sem copiar `.env*`, `.git`, `.next` ou `node_modules`; use as dependências locais por link simbólico. Não inicie outro servidor para essa validação.
- **`next.config.mjs`:**
  - `typescript.ignoreBuildErrors: true`: erro de tipo não falha o build, e quem barra é o `type-check`;
  - `eslint.ignoreDuringBuilds: true`: o projeto usa Biome, não ESLint;
  - `transpilePackages: ['lucide-react']`: resquício do import dinâmico de ícones, que não existe mais em `components/icon.tsx`. A remoção está prevista junto da atualização do Next ([ADR-0007](../decisions/ADR-0007-next-16.md)).

## CI (`.github/workflows/tests-front.yml`)
Roda em push e em PR para a `master`:
1. `yarn` (instala dependências)
2. `yarn lint` (Biome)
3. `yarn type-check`
4. `yarn build`

**Inconsistência conhecida:** o CI usa `yarn`, mas o lockfile do projeto é o `bun.lock` e não existe `yarn.lock`. A instalação no CI, portanto, não é reproduzível. A correção sugerida é trocar por `oven-sh/setup-bun` e `bun install --frozen-lockfile`, num commit `chore(ci)`.

## Deploy (Vercel)
- **Produção:** merge na `master`.
- **Preview:** cada PR.
- **Domínio:** `aleessandrohr.dev.br`. As demonstrações ficam em subdomínios (`inorbit.`, `letmeask.`), que são projetos separados.
- **Variáveis de ambiente:** nenhuma hoje. Se surgirem, configure no painel da Vercel, separadas por ambiente (Production e Preview).

## Antes de publicar
Siga a [definição de pronto](../development/definition-of-done.md) e confira o preview da Vercel no celular e no desktop.
