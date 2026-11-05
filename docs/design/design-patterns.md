# Padrões de design

## Em uso
### Renderização dirigida por dados
- **Como funciona:** cada coleção é um objeto em `constants/`, e a página converte esse objeto em componentes com `Object.values(...).map(...)`.
- **Para adicionar um item:** basta adicionar uma entrada. A ordem do objeto define a ordem na tela.
- **Exemplos:** `projects` gera `<Project>` e `experiences` gera `<Experience>` em `app/page.tsx`.

### Objeto validado por tipo (`as const satisfies`)
```ts
export const projects = { ... } as const satisfies Record<string, Project>
```
- O `satisfies` valida cada item contra a interface.
- O `as const` mantém os tipos literais, como as chaves e os nomes de ícone.

### Props espelhando o dado
`type Props = ProjectType`: o componente recebe exatamente os campos do item, e o tipo garante que dado e componente evoluam juntos.

### Mapa de variantes
Use um `Record<chave, classes>` com um valor padrão para escolher estilo a partir de um dado. Exemplo: `skillBadgeStyles[skill] ?? defaultSkillBadgeStyle`, em `components/experience.tsx`. Evite cadeias de `if` e `switch` para estilo.

### Estado sincronizado com a URL
O dialog da demonstração abre quando o hash é `#<id>-demo` e escuta `hashchange`, para que o link possa ser compartilhado. Use o mesmo padrão para qualquer estado que valha compartilhar, como `#terminal` no plano.

### Wrapper de provedor
`providers/theme.tsx` envolve o `next-themes` num componente `'use client'`. Isso permite usá-lo a partir do `layout.tsx`, que é Server Component.

### Carregamento por nome
`<Icon name>` (`components/icon.tsx`) importa o ícone do lucide pelo nome, com `next/dynamic`, para dados que guardam ícones como string (`social-media.ts`).

## Planejados
### Registro de comandos (Fase 5)
Os comandos do terminal formam uma tabela, não uma cadeia de `if`:
```ts
interface Command {
	name: string
	aliases?: Array<string>
	summary: string                      // aparece no `help`
	usage?: string
	complete?: (arg: string) => Array<string>  // Tab
	run: (args: Array<string>, ctx: CommandContext) => CommandResult
}
```
- **Adicionar um comando** é adicionar uma entrada. `help` e o Tab completion leem a mesma tabela.
- **`run` é puro:** recebe um `CommandContext` com os dados e devolve uma descrição do resultado. Não executa efeitos.

### Resultado descritivo (Fase 5)
O comando não executa efeitos; ele devolve o que o terminal deve fazer:
```ts
type CommandResult =
	| { type: 'output'; lines: Array<OutputLine> }
	| { type: 'navigate'; href: string }
	| { type: 'theme'; value: 'light' | 'dark' | 'system' }
	| { type: 'clear' }
	| { type: 'ask'; question: string }
	| { type: 'mode'; value: 'command' | 'chat' }
	| { type: 'error'; message: string }
```
O `terminal.tsx` interpreta cada caso. Assim, os comandos ficam testáveis e a interface fica num só lugar.

### Adaptador de armazenamento (Fase 6)
`lib/llm/limits.ts` expõe uma interface única (`check`, `consume`) com duas implementações: Upstash Redis em produção e memória em desenvolvimento. A escolha é feita pela presença das variáveis de ambiente. O resto do código não sabe qual está em uso.

### Pipeline da rota (Fase 6)
`/api/ask` executa etapas em sequência, e cada uma pode encerrar a requisição com um erro tipado:

```
validar → limitar (rate limit, teto) → montar prompt → chamar o modelo → transmitir → registrar uso
```

Ver [error-handling](error-handling.md).

## Anti-padrões
- **Texto de conteúdo dentro de componente.**
- **`if` por nome de item** (`if (project.id === 'x')`). Use um campo no dado.
- **Estado global para algo que é local** ou que cabe na URL.
- **Abstração genérica para um único uso.**
