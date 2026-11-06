import {
	terminalBuiltins,
	terminalConfig,
	terminalNavigation,
	terminalResume,
	terminalThemes,
} from '@/configs/terminal'
import type { Profile } from '@/types/profile'
import type { Project } from '@/types/project'
import type {
	TerminalCommand,
	TerminalOption,
	TerminalOutput,
	TerminalResult,
} from '@/types/terminal'

/** Formata os comandos usados tanto nos links quanto no registro. */
export const getOpenCommand = (target: string) => `xdg-open ${target}`
export const getDemoCommand = (projectId: string) => `demo ${projectId}`

/** Normaliza a entrada executada e a entrada registrada no histórico. */
export const normalizeTerminalInput = (input: string) =>
	input.trim().replace(/\s+/g, ' ')

/** Reúne os destinos e comandos locais para ajuda e autocompletar. */
export const getTerminalOptions = (
	commands: ReadonlyArray<TerminalCommand>,
	outputs: ReadonlyArray<TerminalOutput>
): ReadonlyArray<TerminalOption> => [
	...commands,
	...outputs,
	...terminalThemes,
	...Object.values(terminalBuiltins),
]

const getProjectCommands = (project: Project): TerminalCommand[] => {
	const commands: TerminalCommand[] = []
	if (project.websiteUrl) {
		commands.push({
			command: getOpenCommand(project.id),
			label: project.title,
			href: project.websiteUrl,
		})
	}
	if (project.demoUrl) {
		commands.push({
			command: getDemoCommand(project.id),
			label: `Demo ${project.title}`,
			href: `#${project.id}-demo`,
		})
	}

	return commands
}

/** Deriva os comandos dos destinos já disponíveis na home. */
export const buildTerminalCommands = (
	profile: Profile,
	projects: ReadonlyArray<Project>
): ReadonlyArray<TerminalCommand> => [
	...Object.values(terminalNavigation),
	terminalResume,
	...Object.entries(profile.links).map(([name, link]) => ({
		command: getOpenCommand(name),
		label: link.label,
		href: link.href,
	})),
	{
		command: getOpenCommand('email'),
		label: 'Enviar e-mail',
		href: `mailto:${profile.email}`,
	},
	...projects.flatMap(getProjectCommands),
]

/** Deriva as respostas de texto a partir do perfil, da navegação e dos projetos. */
export const buildTerminalOutputs = (
	profile: Profile,
	projects: ReadonlyArray<Project>
): ReadonlyArray<TerminalOutput> => [
	{
		command: 'ls',
		label: 'Listar seções',
		lines: [
			Object.values(terminalNavigation)
				.filter(item => item.href !== terminalNavigation.home.href)
				.map(item => `${item.command.replace('cd ~/', '')}/`)
				.join('  '),
		],
	},
	{
		command: 'ls projetos',
		label: 'Listar projetos',
		lines: [projects.map(project => project.id).join('  ')],
	},
	{
		command: 'whoami',
		label: 'Quem sou eu',
		lines: [profile.fullName, profile.role, profile.location],
	},
	{ command: 'cat sobre', label: 'Ler o resumo', lines: [profile.summary] },
]

/** Resolve apenas os destinos cadastrados para os links do site. */
export const resolveTerminalCommand = (
	input: string,
	commands: ReadonlyArray<TerminalCommand>,
	outputs: ReadonlyArray<TerminalOutput>
): TerminalResult => {
	const normalized = normalizeTerminalInput(input)
	if (normalized === terminalBuiltins.help.command) return { type: 'help' }
	if (normalized === terminalBuiltins.clear.command) return { type: 'clear' }
	if (normalized === terminalBuiltins.history.command)
		return { type: 'history' }

	const output = outputs.find(item => item.command === normalized)
	if (output) return { type: 'output', lines: output.lines }

	const theme = terminalThemes.find(item => item.command === normalized)
	if (theme) return { type: 'theme', command: theme }

	const command = commands.find(item => item.command === normalized)
	if (command) return { type: 'navigate', command }

	return { type: 'error', message: terminalConfig.unknownCommand }
}

/** Completa somente comandos existentes, sem sugerir rotas indisponíveis. */
export const completeTerminalCommand = (
	input: string,
	commands: ReadonlyArray<TerminalCommand>,
	outputs: ReadonlyArray<TerminalOutput>
) => {
	const prefix = input.trimStart().replace(/\s+/g, ' ')

	return getTerminalOptions(commands, outputs)
		.filter(option => option.command.startsWith(prefix))
		.map(option => option.command)
}
