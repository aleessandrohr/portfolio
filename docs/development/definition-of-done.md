# Definição de pronto

Uma tarefa está pronta quando todos os itens que se aplicam a ela estão cumpridos.

## Sempre
- [ ] `bun run type-check` passa. O build ignora erros de tipo, então essa é a verificação real.
- [ ] `bunx biome check` passa nos arquivos alterados, e o diff não reformata arquivos não relacionados.
- [ ] `bun run build` passa.
- [ ] Sem `console.log`, código morto ou import sem uso.
- [ ] A documentação afetada está atualizada.

## Mudança visual
- [ ] Conferida nos temas claro e escuro.
- [ ] Conferida em celular (~375 px) e desktop.
- [ ] Usa apenas os tokens do [design system](../frontend/design-system.md).
- [ ] Teclado e foco funcionam e botões só com ícone têm `aria-label`. Ver [accessibility](../frontend/accessibility.md).

## Mudança de conteúdo
- [ ] O texto está em `src/constants/`, não no componente.
- [ ] Segue as [regras de conteúdo](../standards/content-guidelines.md): números verificáveis e nada de informação não pública de terceiros.
- [ ] Se mudou título, resumo ou curso, os metadados (`layout.tsx`, `opengraph-image.tsx`) também foram revisados.

## Rota nova
- [ ] Tem `metadata` ou `generateMetadata`.
- [ ] Entrou no menu e no sitemap, quando for navegável.

## Servidor ou LLM (Fase 6)
- [ ] Segredos só no servidor e documentados em `.env.example`.
- [ ] Rate limit e teto de custo testados.
- [ ] Fallback testado com a API indisponível.
