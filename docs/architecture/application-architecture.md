# Arquitetura da aplicação

A aplicação tem três camadas, e as dependências só apontam para baixo:

```
app/          rotas: montam a página com componentes e dados
  │
components/   renderizam dados recebidos por props
  │
constants/    dados do conteúdo (perfil, experiências, projetos, educação)
lib/          utilitários sem dependência de UI (ex.: cn)
```

## Camadas
- **`src/constants/`:** a fonte do conteúdo. Cada arquivo exporta um tipo (`interface`) e um objeto `as const satisfies Record<string, Tipo>`. A chave do objeto identifica o item.
- **`src/components/`:** componentes de apresentação. Recebem os campos do item como props, com o tipo do constant (`type Props = ExperienceType`). `components/ui/` guarda as primitivas do shadcn.
- **`src/app/`:** páginas e metadados. `page.tsx` converte os objetos com `Object.values(...)` e usa `.map` para gerar a lista de componentes.
- **`src/providers/`:** contexto global no cliente (hoje só o tema).
- **`src/lib/`:** funções puras compartilhadas.

## Servidor × cliente
- **Por padrão, tudo é Server Component.**
- **`'use client'` só onde há interação:**
  - `components/project/index.tsx`: dialog da demonstração sincronizado com o hash da URL;
  - `components/project/components/iframe.tsx`: estado de carregamento;
  - `components/mode-toggle.tsx`;
  - `providers/theme.tsx`.

## Padrões e composição
Os padrões usados dentro das camadas estão em [design/design-patterns](../design/design-patterns.md). A forma como as peças se compõem está em [design/abstractions-and-composition](../design/abstractions-and-composition.md).

## Planejado ([plano](../plans/redesign-portfolio.md))
- **`lib/knowledge.ts` (Fase 1):** deriva dos constants o texto usado pela LLM e os objetos usados pelo terminal.
- **`components/terminal/commands.ts` (Fase 5):** registro de comandos sem React.
- **`app/api/ask/route.ts` e `lib/llm/*` (Fase 6):** primeira camada de servidor.
