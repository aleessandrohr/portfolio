# ADR-0011: Contratos de conteúdo por domínio

- **Status:** Aceito
- **Data:** 2026-11-05

## Contexto

Após a remoção de dados sem consumidor, o autor solicitou revisar a estrutura dos objetos restantes. Educação usava o tipo de experiência; o subtítulo de experiências misturava organização e detalhes; duas coleções eram unidas para produzir a mesma linha do tempo; links de projetos dependiam de posições em arrays.

## Decisão

- Manter coleções por chave com `as const satisfies`, sem introduzir um agregador.
- Separar `Education` (`course`, `institution`, datas e descrição) de `Experience` (título, categoria, organização, detalhes opcionais, datas e atividades).
- Compartilhar somente as datas pelo contrato `Period`, com mês tipado por `MonthYear` e `end: null` para vínculos em andamento. O texto “Atual” pertence à apresentação por `formatPeriod`.
- Reunir todas as atuações em `experiences`; a categoria diferencia tecnologia, docência e gestão, e a ordenação permanece por data.
- Nomear as URLs de projeto como `websiteUrl` e `demoUrl`, ambas opcionais, conforme os consumidores atuais.
- Usar `profile.displayName` para o nome de apresentação, preservando `fullName` para a identidade completa.
- Representar coleções consumidas apenas por leitura com `ReadonlyArray`.

## Alternativas consideradas

- Transformar todas as coleções em arrays: simplificaria algumas listas, mas perderia o acesso direto por chave, já usado pela formação nos metadados.
- Usar um tipo genérico com título e subtítulo para todas as seções: mantém a aparência atual, mas mistura significados e obriga a adaptar texto dentro dos dados.
- Introduzir entidades, relações e normalizadores: acrescenta uma camada sem necessidade para o tamanho atual do conteúdo.

## Consequências

Componentes e metadados passam a usar nomes de campos específicos do domínio. O conteúdo e a apresentação são preservados. Vínculos em andamento deixam de depender de um texto em português no cálculo de datas. A modelagem guarda apenas os campos que já têm consumidor; detalhes adicionais entram quando houver uma necessidade concreta.
