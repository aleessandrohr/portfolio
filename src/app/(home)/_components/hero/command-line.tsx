'use client'

import { type KeyboardEvent, useRef, useState } from 'react'
import { terminalBuiltins, terminalConfig } from '@/configs/terminal'
import { usePortfolioMode } from '@/providers/portfolio-mode'
import { useTerminalSession } from '@/providers/terminal-session'
import {
	completeTerminalCommand,
	getTerminalOptions,
} from '@/utils/terminal-commands'

import { CommandInput } from './command-input'

type PromptState = {
	input: string
	draft: string
	historyIndex: number | null
	completionRequested: boolean
}

const INITIAL_PROMPT: PromptState = {
	input: '',
	draft: '',
	historyIndex: null,
	completionRequested: false,
}

const getHistoryState = (
	state: PromptState,
	history: ReadonlyArray<string>,
	direction: 'ArrowUp' | 'ArrowDown'
): PromptState => {
	const draft = state.historyIndex === null ? state.input : state.draft
	const index =
		direction === 'ArrowUp'
			? Math.max(0, (state.historyIndex ?? history.length) - 1)
			: Math.min(history.length, (state.historyIndex ?? history.length) + 1)

	return {
		input: index === history.length ? draft : history[index],
		draft,
		historyIndex: index === history.length ? null : index,
		completionRequested: false,
	}
}

export const CommandLine = () => {
	const { isTerminal } = usePortfolioMode()
	const { commands, history, lastEntry, runCommand } = useTerminalSession()
	const [prompt, setPrompt] = useState(INITIAL_PROMPT)
	const inputRef = useRef<HTMLInputElement>(null)

	const { input, historyIndex, completionRequested } = prompt
	const options = getTerminalOptions(commands)
	const suggestions = completionRequested
		? completeTerminalCommand(input, commands)
		: []
	const isHelpVisible = lastEntry?.result.type === 'help'
	const choices = isHelpVisible
		? options.filter(option => option.command !== terminalBuiltins.help.command)
		: options.filter(option => suggestions.includes(option.command))
	const feedback =
		lastEntry?.result.type === 'error'
			? lastEntry.result.message
			: lastEntry
				? `$ ${lastEntry.command}`
				: ''

	const execute = (command: string) => {
		if (!command.trim()) return

		const result = runCommand(command)
		setPrompt(INITIAL_PROMPT)
		if (result.type !== 'navigate')
			inputRef.current?.focus({ preventScroll: true })
	}

	const completeInput = () => {
		const matches = completeTerminalCommand(input, commands)
		if (matches.length === 0) return false

		setPrompt(previous => ({
			...previous,
			input: matches.length === 1 ? matches[0] : previous.input,
			completionRequested: matches.length > 1,
		}))
		return true
	}

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		const hasModifier = event.ctrlKey || event.metaKey || event.altKey
		if (event.nativeEvent.isComposing || hasModifier) return

		if (event.key === 'Tab' && !event.shiftKey && input.trim()) {
			if (completeInput()) event.preventDefault()
			return
		}

		const isHistoryKey = event.key === 'ArrowUp' || event.key === 'ArrowDown'
		const canReadHistory =
			history.length > 0 && (event.key !== 'ArrowDown' || historyIndex !== null)
		if (!isHistoryKey || !canReadHistory) return

		event.preventDefault()
		const direction = event.key === 'ArrowUp' ? 'ArrowUp' : 'ArrowDown'
		setPrompt(previous => getHistoryState(previous, history, direction))
	}

	if (!isTerminal) return null

	return (
		<div className="mt-6 w-full min-w-0 max-w-xl font-mono">
			<CommandInput
				value={input}
				inputRef={inputRef}
				onChange={value => setPrompt({ ...INITIAL_PROMPT, input: value })}
				onKeyDown={handleKeyDown}
				onSubmit={() => execute(input)}
			/>
			<p id="command-hints" className="mt-2 text-muted-foreground text-xs">
				{terminalConfig.keyboardHint}
			</p>
			<p
				id="command-feedback"
				role="status"
				aria-live="polite"
				className="mt-2 break-words text-muted-foreground text-xs"
			>
				{feedback}
			</p>
			{choices.length > 0 && (
				<div className="mt-3 flex flex-wrap gap-1">
					{choices.map(option => (
						<button
							key={option.command}
							title={option.label}
							type="button"
							onClick={() => execute(option.command)}
							className="min-h-11 rounded-sm px-2 text-left text-brand text-xs hover:bg-brand/10"
						>
							{option.command}
						</button>
					))}
				</div>
			)}
		</div>
	)
}
