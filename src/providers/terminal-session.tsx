'use client'

import { useTheme } from 'next-themes'
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react'
import { terminalConfig } from '@/configs/terminal'
import type {
	TerminalCommand,
	TerminalEntry,
	TerminalOutput,
	TerminalResult,
} from '@/types/terminal'
import {
	normalizeTerminalInput,
	resolveTerminalCommand,
} from '@/utils/terminal-commands'

type Props = {
	children: ReactNode
	commands: ReadonlyArray<TerminalCommand>
	outputs: ReadonlyArray<TerminalOutput>
}
type Session = {
	history: ReadonlyArray<string>
	lastEntry: TerminalEntry | null
}
type SessionContext = Session & {
	commands: ReadonlyArray<TerminalCommand>
	outputs: ReadonlyArray<TerminalOutput>
	recordCommand: (input: string) => TerminalResult
	runCommand: (input: string) => TerminalResult
}

const INITIAL_SESSION: Session = { history: [], lastEntry: null }
const TerminalSessionContext = createContext<SessionContext | null>(null)

/** Mantém o resultado e o histórico de cliques e comandos em uma única sessão. */
export const TerminalSessionProvider = ({
	children,
	commands,
	outputs,
}: Props) => {
	const { setTheme } = useTheme()
	const [session, setSession] = useState(INITIAL_SESSION)

	const recordCommand = useCallback(
		(input: string) => {
			const command = normalizeTerminalInput(input)
			const result = resolveTerminalCommand(command, commands, outputs)
			if (!command) return result

			setSession(previous => {
				const history = [...previous.history, command].slice(
					-terminalConfig.historyLimit
				)
				const shown: TerminalResult =
					result.type === 'history'
						? {
								type: 'output',
								lines: history.map((item, index) => `${index + 1}  ${item}`),
							}
						: result

				return {
					history,
					lastEntry:
						result.type === 'clear' ? null : { command, result: shown },
				}
			})
			return result
		},
		[commands, outputs]
	)

	const runCommand = useCallback(
		(input: string) => {
			const result = recordCommand(input)
			if (result.type === 'theme') setTheme(result.command.theme)
			if (result.type !== 'navigate') return result

			const { href } = result.command
			if (href.startsWith('#') || href.startsWith('mailto:'))
				window.location.href = href
			else window.open(href, '_blank', 'noopener,noreferrer')

			return result
		},
		[recordCommand, setTheme]
	)

	const value = useMemo(
		() => ({ ...session, commands, outputs, recordCommand, runCommand }),
		[session, commands, outputs, recordCommand, runCommand]
	)

	return (
		<TerminalSessionContext.Provider value={value}>
			{children}
		</TerminalSessionContext.Provider>
	)
}

/** Acessa os comandos e o resultado compartilhado entre links e prompt. */
export const useTerminalSession = () => {
	const context = useContext(TerminalSessionContext)
	if (!context) throw new Error('TerminalSessionProvider ausente')

	return context
}
