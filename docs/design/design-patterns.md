# Padrões de design

## Em uso
### Renderização dirigida por dados
- **Como funciona:** cada coleção é um objeto em `constants/`, e a página converte esse objeto em componentes com `Object.values(...).map(...)`.
- **Para adicionar um item:** basta adicionar uma entrada. A ordem do objeto define a ordem na tela.
- **Exemplos:** `projects` gera `<Project>` e `experiences` gera `<Experience>` em `app/(home)/page.tsx`.

### Objeto validado por tipo (`as const satisfies`)
```ts
export const projects = { ... } as const satisfies Record<string, Project>
```
- O `satisfies` valida cada item contra a interface.
- O `as const` mantém os tipos literais, como as chaves e os nomes de ícone.

### Props espelhando o dado
`type Props = ProjectType`: o componente recebe exatamente os campos do item, e o tipo garante que dado e componente evoluam juntos.

### Mapa de variantes
Use um `Record<chave, valor>` para escolher uma apresentação a partir de um dado. Exemplo atual: `kindIcons[kind]` escolhe o ícone da capa em `app/(home)/_components/projects/project-card/cover.tsx`. Evite cadeias de `if` e `switch` por nome de projeto.

### Estado sincronizado com a URL
O dialog da demonstração abre quando o hash é `#<id>-demo` e escuta `hashchange`, para que o link possa ser compartilhado. Use o mesmo padrão para qualquer estado que valha compartilhar, como `#terminal` no plano.

### Wrapper de provedor
`providers/theme.tsx` envolve o `next-themes` num componente `'use client'`. Isso permite usá-lo a partir do `layout.tsx`, que é Server Component.

### Mapa estático por nome
`<Icon name>` (`components/icon.tsx`) escolhe o ícone num mapa `icons` com os ícones usados (`github`, `linkedin`, `mail`), para dados que guardam o ícone como string (`social-media.ts`). `IconName` sai das chaves do mapa. Para usar um ícone novo por nome, importe-o do `lucide-react` e inclua-o no mapa. Não use `lucide-react/dynamicIconImports` nem `next/dynamic` dentro do render: o primeiro registra um `import()` por ícone da biblioteca e deixa o dev e o build mais lentos, e o segundo cria um componente novo a cada render.

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
	| { type: 'error'; message: string }
```
O `terminal.tsx` interpreta cada caso. Assim, os comandos ficam testáveis e a interface fica num só lugar.

## Anti-padrões
- **Texto de conteúdo dentro de componente.**
- **`if` por nome de item** (`if (project.id === 'x')`). Use um campo no dado.
- **Estado global para algo que é local** ou que cabe na URL.
- **Abstração genérica para um único uso.**
