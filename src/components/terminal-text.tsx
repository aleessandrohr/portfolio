'use client'

import type { ReactNode } from 'react'
import { usePortfolioMode } from '@/providers/portfolio-mode'

type Props = { children: ReactNode; command: string }

export const TerminalText = ({ children, command }: Props) => {
	const { isTerminal } = usePortfolioMode()

	return isTerminal ? <span className="font-mono">{command}</span> : children
}
