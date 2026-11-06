'use client'

import Link from 'next/link'
import { type ComponentProps, forwardRef } from 'react'
import { usePortfolioMode } from '@/providers/portfolio-mode'
import { useTerminalSession } from '@/providers/terminal-session'

type Props = ComponentProps<typeof Link> & { command: string }

export const TerminalLink = forwardRef<HTMLAnchorElement, Props>(
	({ command, onClick, ...props }, ref) => {
		const { isTerminal } = usePortfolioMode()
		const { recordCommand } = useTerminalSession()

		return (
			<Link
				ref={ref}
				{...props}
				onClick={event => {
					onClick?.(event)
					if (
						!isTerminal ||
						event.defaultPrevented ||
						event.ctrlKey ||
						event.metaKey ||
						event.shiftKey ||
						event.altKey
					)
						return

					recordCommand(command)
				}}
			/>
		)
	}
)

TerminalLink.displayName = 'TerminalLink'
