export interface TerminalOption {
	command: string
	label: string
}

export interface TerminalCommand extends TerminalOption {
	href: string
}

export interface TerminalOutput extends TerminalOption {
	lines: ReadonlyArray<string>
}

export interface TerminalThemeCommand extends TerminalOption {
	theme: 'light' | 'dark' | 'system'
}

export type TerminalResult =
	| { type: 'output'; lines: ReadonlyArray<string> }
	| { type: 'theme'; command: TerminalThemeCommand }
	| { type: 'history' }
	| { type: 'navigate'; command: TerminalCommand }
	| { type: 'help' }
	| { type: 'clear' }
	| { type: 'error'; message: string }

export interface TerminalEntry {
	command: string
	result: TerminalResult
}
