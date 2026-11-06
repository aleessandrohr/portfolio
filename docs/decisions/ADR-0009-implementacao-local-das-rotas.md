# ADR-0009: Implementação exclusiva junto de cada rota

- **Status:** Substituído por [ADR-0010](ADR-0010-componentes-da-home-por-secao.md)
- **Data:** 2026-11-05
- **Complementa:** [ADR-0008](ADR-0008-organizacao-dados-configs-utils.md)

## Contexto

A home tinha suas seções em `src/components/home/`, enquanto o menu de âncoras estava entre as configurações compartilhadas. Com novas páginas previstas, o autor solicitou reunir a implementação usada apenas pela home dentro de `src/app/`.

## Decisão

- A home fica em `src/app/(home)/page.tsx`. O grupo de rota mantém a URL `/`.
- Seções, elementos decorativos, revelação de letras, carrossel e controlador de movimento ficam em `(home)/_components/`. Helpers específicos permanecem ao lado de seu componente.
- O menu de âncoras fica em `(home)/_configs/menu-items.ts` e os estilos exclusivos em `(home)/home.css`.
- Componentes reutilizáveis, como header, footer, card de projeto e experiência, permanecem em `src/components/`. O layout raiz mantém as responsabilidades globais.
- Conteúdo profissional, contratos de domínio, integrações e utilitários compartilhados permanecem nas pastas definidas pelo ADR-0008.
- Novas rotas são irmãs de `(home)` e podem ter seus próprios detalhes privados. Pastas adicionais surgem quando existe código real para elas.

## Alternativas consideradas

- Manter todas as seções em `src/components/home/`: válido, mas não reúne a implementação com a página, como solicitado pelo autor.
- Usar `app/home/page.tsx`: criaria `/home`, alterando a URL existente.
- Colocar tudo no layout raiz: faria páginas futuras herdarem decisões que hoje são exclusivas da home.

## Consequências

A dependência vai da rota para os módulos compartilhados; componentes globais não importam a implementação privada da home. O conteúdo e o comportamento visual são preservados. Os parênteses e pastas privadas seguem as [convenções do Next.js](https://nextjs.org/docs/14/app/building-your-application/routing/colocation).
