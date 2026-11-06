# Convenções de nomes

| Elemento | Convenção | Exemplo |
|---|---|---|
| Arquivo de componente | kebab-case | `mode-toggle.tsx`, `header.tsx` |
| Pasta de componente com subpartes | kebab-case + `index.tsx` | `project/index.tsx` |
| Componente | PascalCase, exportação nomeada | `ModeToggle`, `Project` |
| Arquivo de constants | kebab-case, plural | `experiences.ts`, `social-media.ts` |
| Objeto de constants | camelCase, plural | `experiences`, `socialMedia`, `menuItems` |
| Chave de item em constants | identificador curto e estável | `anuntech`, `letmeask`, `'in.orbit'` |
| Interface do item | PascalCase, singular | `Experience`, `Project` |
| Props | `Props` (local ao arquivo) | `type Props = ProjectType` |
| Import de tipo que colide com componente | sufixo `Type` | `import type { Project as ProjectType }` |
| Array derivado do objeto | sufixo `Array` | `projectsArray`, `socialMediaArray` |
| Booleano | `is`/`has` | `isDemoOpen`, `loading` (existente) |
| Handler | `handle...` ou verbo | `syncDemoWithHash` |
| `id` e `slug` de projeto | minúsculo, sem espaço, estável (usado em URL e hash) | `inorbit`, `digitaliza-ai` |
| Rota | português, minúsculo, hífen | `/projetos`, `/curriculo` |
| Variável de ambiente | MAIÚSCULAS com `_` | `SITE_URL` |

O `id` e o `slug` não mudam depois de publicados: links compartilhados (`#inorbit-demo`, `/projetos/<slug>`) dependem deles.
