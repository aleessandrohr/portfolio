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
**Causa:** o nome passado para `<Icon name>` precisa ser uma chave do mapa `icons` em `components/icon.tsx`. O TypeScript acusa o erro, mas o build não, por causa do `ignoreBuildErrors`.

**Solução:** rode `bun run type-check`. Para um ícone novo, importe-o do `lucide-react` e inclua-o no mapa.

## O servidor de desenvolvimento responde 500 depois de mover ou apagar um arquivo
**Causa:** o webpack do Next 14 guarda em cache a resolução de um import. Se `home-motion.tsx` vira a pasta `home-motion/`, o cache ainda aponta para o arquivo que não existe mais (`Failed to read source code`).

**Solução:** salve qualquer arquivo que importe o caminho afetado (um `touch` basta) para o servidor recompilar. Não encerre nem reinicie o servidor da porta 3000. Só apague `.next` com o servidor parado.

## O desenvolvimento está lento
**Causas já medidas** (build a frio, em cópia isolada, Next 14.2.7):
- ícones carregados por `lucide-react/dynamicIconImports`: cerca de 7 s a mais por build (25,4 s contra 18,0 s). Já corrigido em `components/icon.tsx`;
- webpack: o Next 16 com Turbopack fez o mesmo build em 3,8 s. Ver [ADR-0007](../decisions/ADR-0007-next-16.md).

**Outras causas a verificar:** `.next/cache/webpack` muito grande (centenas de MB) e mais de um `next dev` no mesmo diretório. Os dois dependem de parar o servidor para serem tratados.
