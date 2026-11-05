# Build e deploy

## Build
- `bun run build` executa `next build`.
- **`next.config.mjs`:**
  - `typescript.ignoreBuildErrors: true`: erro de tipo não falha o build, e quem barra é o `type-check`;
  - `eslint.ignoreDuringBuilds: true`: o projeto usa Biome, não ESLint;
  - `transpilePackages: ['lucide-react']`: exigido pelo import dinâmico de ícones em `components/icon.tsx`.

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
- **Variáveis de ambiente (a partir da Fase 6):** configuradas no painel da Vercel, separadas por ambiente (Production e Preview). O Upstash Redis pode ser ligado pelo Marketplace da Vercel, que injeta as variáveis automaticamente.

## Antes de publicar
Siga a [definição de pronto](../development/definition-of-done.md) e confira o preview da Vercel no celular e no desktop.
