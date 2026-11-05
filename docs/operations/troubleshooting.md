# Solução de problemas

## O Biome reformatou arquivos que não alterei
**Causa:** alguns arquivos versionados não estão no formato do Biome, e `bun run check` roda no projeto inteiro.

**Solução:** rode o Biome só nos arquivos alterados (`bunx biome check --write <arquivos>`) e desfaça o resto com `git checkout -- <arquivo>`. Para normalizar o projeto inteiro, faça um commit `style` separado. Ver [lint-and-format](../standards/lint-and-format.md).

## O build passou, mas o CI falhou em `type-check`
**Causa:** `next.config.mjs` ignora erros de tipo no build.

**Solução:** rode `bun run type-check` localmente e corrija os erros. Esse é o comando que vale.

## Classes do Tailwind não foram ordenadas
**Causa:** `useSortedClasses` só ordena em `className`, `class`, `cx()` e `clsx()`. Classes dentro de `cn()` não são ordenadas.

**Solução:** é o comportamento esperado. Se quiser a ordenação em `cn()`, adicione `"cn"` em `functions` no `biome.json`.

## O dialog da demonstração não abre pelo link
**Causa:** o hash precisa ser exatamente `#<id>-demo`, e o projeto precisa ter `iframeUrl`.

**Solução:** confira o `id` em `constants/projects.ts`.

## O iframe da demonstração fica carregando ou em branco
**Causa provável:** o site de destino bloqueia o embed (`X-Frame-Options` ou `frame-ancestors`) ou está fora do ar.

**Solução:** permita `aleessandrohr.dev.br` no `frame-ancestors` do projeto de destino. O botão "Abrir site" continua como alternativa.

## Ícone não aparece
**Causa:** o nome passado para `<Icon name>` precisa existir em `lucide-react/dynamicIconImports`. O TypeScript acusa o erro, mas o build não, por causa do `ignoreBuildErrors`.

**Solução:** rode `bun run type-check`.
