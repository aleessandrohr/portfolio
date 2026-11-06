import type {
	TerminalCommand,
	TerminalOption,
	TerminalThemeCommand,
} from '@/types/terminal'

export const terminalNavigation = {
	home: { command: 'cd ~', label: 'Início', href: '#home' },
	about: { command: 'cd ~/sobre', label: 'Sobre', href: '#about' },
	projects: { command: 'cd ~/projetos', label: 'Projetos', href: '#projects' },
	experiences: {
		command: 'cd ~/experiencia',
		label: 'Experiência',
		href: '#experiences',
	},
	education: {
		command: 'cd ~/educacao',
		label: 'Educação',
		href: '#education',
	},
	contact: { command: 'cd ~/contato', label: 'Contato', href: '#contact' },
} as const satisfies Record<string, TerminalCommand>

export const terminalBuiltins = {
	help: { command: 'help', label: 'Ajuda' },
	clear: { command: 'clear', label: 'Limpar resposta' },
	history: { command: 'history', label: 'Comandos executados' },
} as const satisfies Record<string, TerminalOption>

export const terminalThemes = [
	{ command: 'theme dark', label: 'Tema escuro', theme: 'dark' },
	{ command: 'theme light', label: 'Tema claro', theme: 'light' },
	{ command: 'theme system', label: 'Tema do sistema', theme: 'system' },
] as const satisfies ReadonlyArray<TerminalThemeCommand>

export const terminalConfig = {
	placeholder: 'Digite um comando ou help',
	keyboardHint: 'Tab completar · ↑ ↓ histórico',
	unknownCommand: 'Comando não encontrado. Digite help para ver as opções.',
	historyLimit: 100,
	emptyHistory: 'Nenhum comando executado ainda.',
} as const
