import type { TerminalCommand, TerminalOption } from '@/types/terminal'

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
} as const satisfies Record<string, TerminalOption>

export const terminalConfig = {
	placeholder: 'Digite um comando ou help',
	keyboardHint: 'Tab completar · ↑ ↓ histórico',
	unknownCommand: 'Comando não encontrado. Digite help para ver as opções.',
	historyLimit: 100,
} as const
