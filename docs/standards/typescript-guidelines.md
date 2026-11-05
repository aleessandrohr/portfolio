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
- **Tipos derivados em vez de duplicados:** `keyof typeof dynamicIconImports` gera `DynamicIconImports`, e as props reaproveitam a interface do dado.
- **Arrays:** o projeto usa `Array<string>`. Mantenha o padrão.
- **Dados externos (Fase 6):** valide o corpo das requisições em `/api/ask` antes de usar, verificando tipo e tamanho. Não confie em `as`.
