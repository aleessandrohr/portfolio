# ADR-0010: Componentes da home agrupados por seção

- **Status:** Aceito
- **Data:** 2026-11-05
- **Substitui:** [ADR-0009](ADR-0009-implementacao-local-das-rotas.md)

## Contexto

O autor revisou a primeira organização local da home. O menu é uma configuração do header global. Os cards de projeto e experiência são usados apenas na home. A divisão do movimento em três arquivos e a criação de um CSS da página acrescentaram separações que o autor não deseja.

## Decisão

- Preservar `(home)/page.tsx` e sua URL `/`.
- Agrupar componentes locais por seção: `hero/`, `projects/` e `experiences/`. Educação, Sobre e Contato ficam em arquivos próprios. A grade decorativa fica na raiz local, pois é usada por hero e contato.
- Mover os cards de projeto e experiência para suas respectivas seções. Eliminar o wrapper `Trajectory` e compor Educação e Experiências diretamente na página.
- Usar `components/header.tsx` e `components/footer.tsx`, com exports `Header` e `Footer`. O header importa sua navegação de `configs/menu-items.ts`.
- Consolidar o movimento em `home-motion.tsx`, com helpers privados e um único componente exportado.
- Usar Tailwind para altura, layout, decoração e apresentação das letras. Remover `home.css`; preservar em `globals.css` as regras que garantem a visibilidade durante a hidratação, sem JavaScript, na impressão e com movimento reduzido.
- Preservar conteúdo, tipos e utilitários compartilhados conforme o ADR-0008.

## Consequências

As pastas representam as seções atuais da página, sem antecipar reutilização de cards por páginas futuras. O arquivo de movimento concentra mais código, mas evita navegar entre três arquivos para acompanhar uma única funcionalidade. Regras de estilo que coordenam a preparação antes do JavaScript continuam globais; o Motion permanece responsável pela animação.
