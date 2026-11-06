# TypeScript

## Configuração
- **`strict: true`**, `moduleResolution: bundler`, alias `@/*` → `./src/*` (`tsconfig.json`).
- **`next.config.mjs` usa `typescript.ignoreBuildErrors: true`.** O build **não** barra erro de tipo, então `bun run type-check` (no CI) é a verificação obrigatória.

## Regras
- **Sem `any`.** Use `unknown` e faça o narrowing.
- **Constants com `as const satisfies Record<string, Tipo>`:** valida o formato sem perder os tipos literais.
  ```ts
  export const projects = {
  	inorbit: { ... },
  } as const satisfies Record<string, Project>
  ```
- **`interface` para formatos de dados** (`Experience`, `Project`) e **`type`** para uniões, aliases e `Props`.
- **`import type`** para importar só tipos.
- **Campos opcionais com `?`.** O componente trata a ausência com renderização condicional, sem valores fictícios.
- **Tipos derivados em vez de duplicados:** `keyof typeof icons` gera `IconName` em `components/icon.tsx`, e as props reaproveitam a interface do dado.
- **Coleções de constantes e props:** use `ReadonlyArray<T>` quando o consumidor apenas lê os itens, como atividades, detalhes e habilidades. Arrays locais mutáveis podem usar `Array<T>`.
- **Contratos de domínio separados:** `Education` descreve formação e `Experience` descreve atuação. Ambos compartilham apenas datas por `Period`. `MonthYear` restringe o mês a `01`–`12`, e `null` identifica um vínculo sem término.
- **Dados externos:** se o projeto passar a receber dados de fora, valide tipo e tamanho antes de usar. Não confie em `as`.
