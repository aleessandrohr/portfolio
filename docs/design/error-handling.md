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

### Terminal integrado

Comandos ou argumentos não cadastrados devolvem `{ type: 'error', message }`, sem lançar exceção. A mensagem orienta a executar `help`; a ajuda contém apenas comandos e destinos existentes. Projetos sem site ou demonstração não geram comandos para esses links. O input nunca interpreta código ou comandos do sistema.
