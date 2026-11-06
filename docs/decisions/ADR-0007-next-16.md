# ADR-0007: Atualizar o Next.js de 14.2.7 para 16 (Turbopack)

- **Status:** Proposto
- **Data:** 2026-11-05
- **Relacionado a:** lentidão no desenvolvimento e no build; [troubleshooting](../operations/troubleshooting.md)

## Contexto
O desenvolvimento ficou lento: o `next dev` chega a 90% de CPU e 1,6 GB de RAM, o cache do webpack passa de 240 MB e o Fast Refresh falha em alguns casos. O projeto usa Next 14.2.7 (webpack), React 18.3.1 e Node 20.20. A versão estável mais recente do Next é a 16.4.5, que exige Node 20.9 ou superior e aceita React 18.2 ou 19.

Parte da lentidão vinha do código e já foi corrigida: o `components/icon.tsx` importava `lucide-react/dynamicIconImports` (um `import()` por ícone da biblioteca inteira, para desenhar 3 ícones) e chamava `dynamic()` dentro do render, o que recria o componente a cada render. O restante é o custo do webpack.

## Decisão
Atualizar para o Next 16 e usar o Turbopack, que é o bundler padrão dessa versão. Manter o React 18 por ora. A atualização acontece com o servidor de desenvolvimento parado, porque troca o `node_modules`.

## Medição
Build de produção a frio, em cópias isoladas do projeto fora do repositório, em 05/11/2026. O servidor de desenvolvimento do usuário e outros processos estavam ativos durante a medição, então os valores têm ruído de alguns segundos.

| Cenário | Tempo |
|---|---|
| Next 14.2.7, ícone dinâmico, `transpilePackages` | 25,4 s |
| Next 14.2.7, ícone estático, `transpilePackages` | 18,0 s |
| Next 14.2.7, ícone estático, sem `transpilePackages` | 20,8 s |
| Next 16.4.5 (Turbopack), ícone estático | 3,8 s |

- O ícone estático reduziu cerca de 7 s, e o resultado do Next 16 é cerca de 5 vezes mais rápido que o melhor cenário do Next 14.
- Remover `transpilePackages` **não** trouxe ganho mensurável no build: a diferença de 2,8 s a favor do cenário com a opção está dentro do ruído. Ela só deve sair por ser um resquício sem função, não por desempenho.
- Foi medido o **build**, não o `next dev`. O ganho no desenvolvimento (inicialização e Fast Refresh) é esperado, pois o Turbopack também é o padrão do `next dev` no Next 16, mas ainda não foi medido neste projeto.
- Todas as rotas compilaram no Next 16 (`/`, `/_not-found`, `/icon.svg`, `/opengraph-image`, `/sitemap.xml`).

## Alternativas consideradas
| Opção | Prós | Contras |
|---|---|---|
| Next 16 + Turbopack (escolhida) | maior ganho medido; versão com suporte; bundler padrão | mudança de versão maior; avisos de React 18 |
| Ficar no Next 14 e limpar o cache | sem mudança de dependência | não resolve o custo do webpack; a 14 deixa de receber correções |
| Next 14.2.35 (última 14.x) | atualização pequena | mantém o webpack, e a lentidão continua |
| Next 16 + React 19 | sem aviso de depreciação | exige revisar Radix, vaul e `next-themes` ao mesmo tempo; pode ficar para depois |

## Consequências
- **Mudanças automáticas no `tsconfig.json`** ao primeiro build: `target: ES2017`, `jsx: react-jsx` e `.next/dev/types/**/*.ts` em `include`. Devem ser revisadas e versionadas.
- **Aviso permanente:** "React 18 support is deprecated in Next.js 16 and will be removed in Next.js 17". A migração para o React 19 vira tarefa futura.
- **`next.config.mjs`:** remover `eslint` (a chave não existe mais; o projeto usa Biome) e `transpilePackages`.
- **`.next` antigo é descartado:** apague a pasta com o servidor parado.
- **Verificar depois da atualização:** `next-themes` (importa tipos de `next-themes/dist/types`), `vaul`, o Dialog e o Drawer, a imagem Open Graph e o `sitemap`.
- **Reversão:** restaurar `package.json` e `bun.lock` pelo git e rodar `bun install`.

## Ações
1. O usuário para o servidor de desenvolvimento.
2. `bun add next@latest`, remover `eslint` e `transpilePackages` de `next.config.mjs`, apagar `.next`.
3. Rodar `bun run type-check`, `bunx biome check` nos arquivos alterados e o build.
4. Subir o servidor e conferir a página no navegador.
5. Atualizar [build-and-deployment](../operations/build-and-deployment.md), [development-setup](../operations/development-setup.md) e marcar este ADR como **Aceito**.
