'use client'

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
	TerminalResult,
} from '@/types/terminal'
import {
	normalizeTerminalInput,
	resolveTerminalCommand,
} from '@/utils/terminal-commands'

type Props = { children: ReactNode; commands: ReadonlyArray<TerminalCommand> }
type Session = {
	history: ReadonlyArray<string>
	lastEntry: TerminalEntry | null
}
type SessionContext = Session & {
	commands: ReadonlyArray<TerminalCommand>
	recordCommand: (input: string) => TerminalResult
	runCommand: (input: string) => TerminalResult
}

const INITIAL_SESSION: Session = { history: [], lastEntry: null }
const TerminalSessionContext = createContext<SessionContext | null>(null)

/** Mantém o resultado e o histórico de cliques e comandos em uma única sessão. */
export const TerminalSessionProvider = ({ children, commands }: Props) => {
	const [session, setSession] = useState(INITIAL_SESSION)

	const recordCommand = useCallback(
		(input: string) => {
			const command = normalizeTerminalInput(input)
			const result = resolveTerminalCommand(command, commands)
			if (!command) return result

			setSession(previous => ({
				history: [...previous.history, command].slice(
					-terminalConfig.historyLimit
				),
				lastEntry: result.type === 'clear' ? null : { command, result },
			}))
			return result
		},
		[commands]
	)

	const runCommand = useCallback(
		(input: string) => {
			const result = recordCommand(input)
			if (result.type !== 'navigate') return result

			const { href } = result.command
			if (href.startsWith('#') || href.startsWith('mailto:'))
				window.location.href = href
			else window.open(href, '_blank', 'noopener,noreferrer')

			return result
		},
		[recordCommand]
	)

	const value = useMemo(
		() => ({ ...session, commands, recordCommand, runCommand }),
		[session, commands, recordCommand, runCommand]
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
