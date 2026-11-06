# ADR-0003: Gemini como provedor da LLM e Upstash para limites

- **Status:** Rejeitado (nunca foi implementado)
- **Data:** 2026-11-05
- **Relacionado a:** [plano de redesign](../plans/redesign-portfolio.md)

## Contexto
Foi proposto um assistente no terminal que responderia perguntas sobre a trajetória usando só os dados do site. O site é hospedado na Vercel, sem processo persistente, e a API pública seria aberta a qualquer visitante, então seria preciso limitar o uso por visitante e o custo total.

## Proposta original
- **Modelo:** Google Gemini, por `@google/genai`, com temperatura baixa.
- **Limites:** Upstash Redis (pelo Marketplace da Vercel), com limite por IP e teto diário e mensal de custo.
- **Segredos:** chave do Gemini e credenciais do Redis só no servidor.

## Motivo da rejeição
O site não tem autenticação, e sem saber quem usa a API não há como garantir o custo:
- **O limite por IP é fácil de contornar.** Trocar de rede, usar uma VPN ou um proxy dá um IP novo a cada requisição. Em redes com IP compartilhado, o contrário acontece: visitantes legítimos são bloqueados por causa de outros.
- **O teto global só limita o prejuízo.** Quem consome o teto deixa o assistente indisponível para todos, inclusive para recrutadores, que são o público do site.
- **O risco é assimétrico.** O ganho é uma funcionalidade a mais no portfólio; o pior caso é uma conta paga por quem nem visitou o site.

## Alternativas consideradas
| Opção | Resultado |
|---|---|
| Gemini com Upstash (proposta original) | rejeitada pelos motivos acima |
| Groq ou Anthropic no lugar do Gemini | o problema é a falta de autenticação, não o provedor; mesma rejeição |
| Não ter assistente (escolhida) | sem custo, sem segredo, sem API própria |

## Consequências
- O site continua estático, sem rota de servidor, sem variáveis de ambiente e sem dependência nova.
- O terminal (Fase 5) tem só comandos fixos.
- Esta decisão só deve ser reavaliada se houver como identificar o visitante (login, convite ou token assinado) ou se o modelo rodar no navegador, sem custo por uso.
