# Segurança

## Hoje
- **HTML injetado:** o único `dangerouslySetInnerHTML` é o JSON-LD em `layout.tsx`. O conteúdo é estático e serializado com `.replace(/</g, '\\u003c')` para impedir o fechamento da tag `<script>`. Qualquer novo uso precisa do mesmo escape e de um `biome-ignore` com a justificativa.
- **Links externos:** abrem com `target="_blank"`. Os navegadores atuais aplicam `noopener` por padrão nesse caso. Mesmo assim, em links para domínios de terceiros, prefira declarar `rel="noopener noreferrer"`.
- **Iframes:** só de domínios próprios (`*.aleessandrohr.dev.br`). Não embuta sites de terceiros.
- **Sem API própria nem autenticação:** o site é estático e não expõe nenhum recurso que gere custo. Por isso um assistente com LLM foi descartado ([ADR-0003](../decisions/ADR-0003-gemini-upstash.md)). Antes de criar um endpoint, registre um ADR e trate abuso e custo.
- **Dados pessoais e de terceiros:** o repositório é público. O que pode e o que não pode ser publicado está em [content-guidelines](content-guidelines.md).

## Segredos
- **Nunca versionar:** `.env*.local` já está no `.gitignore`. Só `.env.example`, sem valores, é versionado.
- **Nunca usar `NEXT_PUBLIC_` em chaves:** isso envia o valor ao navegador.
- **Módulos que leem segredos importam `server-only`.**

