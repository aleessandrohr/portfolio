import {
	terminalBuiltins,
	terminalConfig,
	terminalNavigation,
} from '@/configs/terminal'
import type { Profile } from '@/types/profile'
import type { Project } from '@/types/project'
import type {
	TerminalCommand,
	TerminalOption,
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
	commands: ReadonlyArray<TerminalCommand>
): ReadonlyArray<TerminalOption> => [
	...commands,
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

/** Resolve apenas os destinos cadastrados para os links do site. */
export const resolveTerminalCommand = (
	input: string,
	commands: ReadonlyArray<TerminalCommand>
): TerminalResult => {
	const normalized = normalizeTerminalInput(input)
	if (normalized === terminalBuiltins.help.command) return { type: 'help' }
	if (normalized === terminalBuiltins.clear.command) return { type: 'clear' }

	const command = commands.find(item => item.command === normalized)
	if (command) return { type: 'navigate', command }

	return { type: 'error', message: terminalConfig.unknownCommand }
}

/** Completa somente comandos existentes, sem sugerir rotas indisponíveis. */
export const completeTerminalCommand = (
	input: string,
	commands: ReadonlyArray<TerminalCommand>
) => {
	const prefix = input.trimStart().replace(/\s+/g, ' ')

	return getTerminalOptions(commands)
		.filter(option => option.command.startsWith(prefix))
		.map(option => option.command)
}
