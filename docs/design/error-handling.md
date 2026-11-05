# Tratamento de erros

Princípio: **nenhuma falha de uma funcionalidade opcional derruba a página**. Quem visita sempre recebe uma mensagem clara e um caminho alternativo. Ver [architectural-principles](../architecture/architectural-principles.md) (degradação elegante).

## Hoje
O site é estático e quase não tem pontos de falha em tempo de execução. Tratamento de erros, na prática, ainda não existe:
- **Sem `error.tsx` nem `not-found.tsx`.** O Next usa as páginas padrão.
- **O iframe da demonstração** (`project/components/iframe.tsx`) só trata o sucesso (`onLoad`). Se o site de destino bloquear o embed, o navegador costuma disparar `onLoad` mesmo assim, mas com a página em branco. Se o site estiver fora do ar, o skeleton pode ficar visível indefinidamente. O botão "Abrir site" no cabeçalho do dialog é a alternativa.
- **Erros de dado** (campo obrigatório faltando, nome de ícone inválido) são pegos pelo `type-check`, e não em tempo de execução. Como o build ignora erros de tipo, o CI é a barreira.

## Planejado

### Páginas (Fases 1 e 3)
| Situação | Tratamento |
|---|---|
| Rota inexistente | `app/not-found.tsx` com o visual do site e links para a home, os projetos e o terminal |
| `/projetos/<slug>` inexistente | `notFound()` dentro da página. Com `generateStaticParams`, use `dynamicParams = false` para gerar 404 no build |
| Erro inesperado de renderização | `app/error.tsx` (client) com uma mensagem curta e um botão "Tentar de novo" (`reset()`) |

### Iframe da demonstração (Fase 2 ou 3)
- **Tempo limite:** após uns 10 s sem `onLoad`, trocar o skeleton por "Não foi possível carregar a demonstração" e mostrar o botão "Abrir site" em destaque.

### Terminal (Fase 5)
| Situação | Resposta na saída |
|---|---|
| Comando desconhecido | `comando não encontrado: <x>. Digite help.` e uma sugestão do comando mais próximo, se houver |
| Argumento inválido | uso correto do comando (`usage`) |
| Projeto inexistente em `cat`/`open` | `projeto não encontrado` e a lista de `ls projetos` |

Os comandos devolvem `{ type: 'error', message }` e nunca lançam exceção. Ver [design-patterns](design-patterns.md).

### `/api/ask` e LLM (Fase 6)
A rota devolve JSON `{ error: { code, message } }` com status HTTP coerente. O terminal mapeia cada `code` para uma mensagem própria:

| `code` | HTTP | Causa | Mensagem no terminal |
|---|---|---|---|
| `invalid_request` | 400 | corpo malformado, pergunta vazia ou longa demais | "Pergunta inválida (até 500 caracteres)." |
| `forbidden_origin` | 403 | `Origin` diferente do site | não aparece para o usuário legítimo |
| `rate_limited` | 429 | limite por IP atingido | "Muitas perguntas seguidas. Tente de novo em alguns minutos." |
| `budget_exceeded` | 503 | teto diário ou mensal atingido | "Assistente indisponível hoje. Use `help` para explorar." |
| `not_configured` | 503 | falta `GEMINI_API_KEY` | igual a `budget_exceeded` |
| `upstream_error` | 502 | falha ou timeout no Gemini | "O assistente não respondeu. Tente de novo." |

Regras:
- **Falhas durante o streaming:** se a conexão cair no meio da resposta, o terminal mantém o texto recebido e acrescenta "(resposta interrompida)".
- **Cancelamento:** o usuário pode interromper com `AbortController` (Ctrl+C ou botão). Isso não é tratado como erro e não deixa mensagem.
- **Tempo limite:** a chamada ao modelo tem um timeout no servidor (~20 s). Estourou, vira `upstream_error`.
- **Falha no limitador:** se o Redis estiver fora, a rota **nega** a pergunta (`budget_exceeded`) em vez de liberar sem limite. Custo descontrolado é pior que indisponibilidade.
- **Registro:** os erros vão para o log do servidor, sem a pergunta completa nem o IP. Ver [security-guidelines](../standards/security-guidelines.md).
- **Mensagens ao usuário:** nunca incluem stack trace, nome de provedor nem detalhes internos.
