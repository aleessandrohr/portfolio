import { ArrowRight, Terminal } from 'lucide-react'
import type { KeyboardEventHandler, Ref } from 'react'
import { terminalConfig } from '@/configs/terminal'

type Props = {
	value: string
	inputRef: Ref<HTMLInputElement>
	onChange: (value: string) => void
	onKeyDown: KeyboardEventHandler<HTMLInputElement>
	onSubmit: () => void
}

export const CommandInput = ({
	value,
	inputRef,
	onChange,
	onKeyDown,
	onSubmit,
}: Props) => (
	<form
		onSubmit={event => {
			event.preventDefault()
			onSubmit()
		}}
		className="flex min-w-0 items-center gap-3 rounded-md border border-brand/30 bg-card/80 pl-4 focus-within:ring-2 focus-within:ring-ring"
	>
		<label
			htmlFor="hero-command"
			className="flex shrink-0 items-center gap-2 text-brand"
		>
			<Terminal className="h-4 w-4" aria-hidden="true" />
			<span aria-hidden="true">~ $</span>
			<span className="sr-only">Comando do terminal</span>
		</label>
		<input
			id="hero-command"
			ref={inputRef}
			value={value}
			onChange={event => onChange(event.target.value)}
			onKeyDown={onKeyDown}
			placeholder={terminalConfig.placeholder}
			autoComplete="off"
			autoCapitalize="off"
			spellCheck={false}
			enterKeyHint="go"
			maxLength={200}
			className="min-w-0 flex-1 bg-transparent py-3 text-base outline-none placeholder:text-muted-foreground sm:text-sm"
			aria-describedby="command-hints command-feedback"
		/>
		<button
			type="submit"
			aria-label="Executar comando"
			className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md text-brand transition-colors hover:bg-brand/10"
		>
			<ArrowRight className="h-4 w-4" aria-hidden="true" />
		</button>
	</form>
)
