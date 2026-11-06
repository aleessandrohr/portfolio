# Ambiente de desenvolvimento

## Requisitos
- **Bun:** gerenciador de pacotes e runner do projeto. O lockfile versionado é o `bun.lock`.
- **Node.js 18.17 ou superior:** exigido pelo Next.js 14.
- **Editor com suporte a EditorConfig e Biome.** No VS Code, use a extensão do Biome como formatador.

## Passos
Antes de iniciar um servidor, verifique se o projeto já está disponível em `http://localhost:3000`.

- **Se já houver um servidor do projeto na porta 3000, use essa instância** para desenvolver e validar a interface. Não execute outro `bun dev`, não abra uma porta alternativa e não reinicie nem encerre o servidor existente.
- Inicie `bun dev` somente quando não houver uma instância disponível. Se a porta 3000 estiver ocupada por outro serviço, esclareça a situação antes de iniciar o projeto em outra porta.
- Essas regras também valem para agentes de código. Verifique a página no navegador além de consultar o status HTTP para confirmar que é o projeto correto.

Para preparar uma nova cópia:

```bash
git clone https://github.com/aleessandrohr/portfolio.git
cd portfolio
bun install
bun dev            # somente se não houver servidor do projeto na porta 3000
```

## Scripts (`package.json`)
| Script | Uso |
|---|---|
| `dev` | servidor de desenvolvimento |
| `build` / `start` | build e servidor de produção local |
| `type-check` | `tsc`, a verificação de tipos obrigatória |
| `lint` / `format` / `check` | Biome. Ver [lint-and-format](../standards/lint-and-format.md) |

## Variáveis de ambiente
Nenhuma é necessária. Se algum dia surgirem, ficam em `.env.local`, com um `.env.example` sem valores como referência.
