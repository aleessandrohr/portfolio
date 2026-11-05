# Segurança

## Hoje
- **HTML injetado:** o único `dangerouslySetInnerHTML` é o JSON-LD em `layout.tsx`. O conteúdo é estático e serializado com `.replace(/</g, '\\u003c')` para impedir o fechamento da tag `<script>`. Qualquer novo uso precisa do mesmo escape e de um `biome-ignore` com a justificativa.
- **Links externos:** abrem com `target="_blank"`. Os navegadores atuais aplicam `noopener` por padrão nesse caso. Mesmo assim, em links para domínios de terceiros, prefira declarar `rel="noopener noreferrer"`.
- **Iframes:** só de domínios próprios (`*.aleessandrohr.dev.br`). Não embuta sites de terceiros.
- **Dados pessoais e de terceiros:** o repositório é público. O que pode e o que não pode ser publicado está em [content-guidelines](content-guidelines.md).

## Segredos
- **Nunca versionar:** `.env*.local` já está no `.gitignore`. Só `.env.example`, sem valores, é versionado.
- **Nunca usar `NEXT_PUBLIC_` em chaves:** isso envia o valor ao navegador.
- **Módulos que leem segredos importam `server-only`.**

## LLM e `/api/ask` (planejado, Fase 6)
- **Abuso:** rate limit por IP, com o IP guardado como hash e nunca em claro, e teto diário e mensal de custo.
- **Validação:** checar o cabeçalho `Origin`, limitar o tamanho da pergunta e do histórico e rejeitar corpo malformado.
- **Prompt injection:** o modelo não tem ferramentas nem acesso à internet. O prompt manda responder só com os dados do portfólio e ignorar pedidos de troca de papel. A saída é tratada como texto: o terminal renderiza só os links internos reconhecidos (`/projetos/...`) e **nunca** usa a saída como HTML.
- **Privacidade:** guardar o texto das perguntas fica desligado por padrão. Se for ligado, os dados expiram (TTL) e o usuário é avisado.
