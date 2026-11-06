export interface TerminalOption {
	command: string
	label: string
}

export interface TerminalCommand extends TerminalOption {
	href: string
}

export type TerminalResult =
	| { type: 'navigate'; command: TerminalCommand }
	| { type: 'help' }
	| { type: 'clear' }
	| { type: 'error'; message: string }

export interface TerminalEntry {
	command: string
	result: TerminalResult
}
