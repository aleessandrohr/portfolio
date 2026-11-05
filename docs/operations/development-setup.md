# Ambiente de desenvolvimento

## Requisitos
- **Bun:** gerenciador de pacotes e runner do projeto. O lockfile versionado é o `bun.lock`.
- **Node.js 18.17 ou superior:** exigido pelo Next.js 14.
- **Editor com suporte a EditorConfig e Biome.** No VS Code, use a extensão do Biome como formatador.

## Passos
```bash
git clone https://github.com/aleessandrohr/portfolio.git
cd portfolio
bun install
bun dev            # http://localhost:3000
```

## Scripts (`package.json`)
| Script | Uso |
|---|---|
| `dev` | servidor de desenvolvimento |
| `build` / `start` | build e servidor de produção local |
| `type-check` | `tsc`, a verificação de tipos obrigatória |
| `lint` / `format` / `check` | Biome. Ver [lint-and-format](../standards/lint-and-format.md) |

## Variáveis de ambiente
Hoje nenhuma é necessária. A partir da Fase 6 (LLM), as variáveis ficam em `.env.local`, com o `.env.example` como referência. Essa parte será documentada em `environment-configuration.md` (ver [roadmap](../DOCUMENTATION_ROADMAP.md)).
