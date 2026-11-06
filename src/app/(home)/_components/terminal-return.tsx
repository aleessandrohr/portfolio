'use client'

import { Terminal } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { terminalNavigation } from '@/configs/terminal'
import { usePortfolioMode } from '@/providers/portfolio-mode'
import { useTerminalSession } from '@/providers/terminal-session'

/** Ignora a faixa da viewport coberta pelo header sticky. */
const createVisibilityObserver = (
	sections: ReadonlyArray<Element>,
	topInset: number,
	onChange: (isBetweenSections: boolean) => void
) => {
	const visibleSections = new Set<Element>()
	const observer = new IntersectionObserver(
		entries => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					visibleSections.add(entry.target)
				} else {
					visibleSections.delete(entry.target)
				}
			}
			onChange(visibleSections.size === 0)
		},
		{ rootMargin: `-${topInset}px 0px 0px 0px` }
	)

	for (const section of sections) observer.observe(section)
	return observer
}

export const TerminalReturn = () => {
	const { isTerminal } = usePortfolioMode()
	const { runCommand } = useTerminalSession()
	const [isBetweenSections, setIsBetweenSections] = useState(false)

	useEffect(() => {
		setIsBetweenSections(false)
		if (!isTerminal || !('IntersectionObserver' in window)) return

		const hero = document.getElementById('home')
		const footer = document.querySelector('footer')
		const header = document.querySelector('header')
		if (!hero || !footer || !header) return

		let observer: IntersectionObserver | undefined
		let topInset = -1
		const syncHeaderInset = () => {
			const nextInset = Math.max(
				0,
				Math.ceil(header.getBoundingClientRect().bottom)
			)
			if (nextInset === topInset) return

			topInset = nextInset
			observer?.disconnect()
			observer = createVisibilityObserver(
				[hero, footer],
				topInset,
				setIsBetweenSections
			)
		}
		const resizeObserver =
			'ResizeObserver' in window
				? new ResizeObserver(syncHeaderInset)
				: undefined

		syncHeaderInset()
		resizeObserver?.observe(header)
		window.addEventListener('resize', syncHeaderInset)
		return () => {
			observer?.disconnect()
			resizeObserver?.disconnect()
			window.removeEventListener('resize', syncHeaderInset)
		}
	}, [isTerminal])

	const returnToTerminal = () => {
		const input = document.getElementById('hero-command')
		if (!input) return

		runCommand(terminalNavigation.home.command)
		input.focus({ preventScroll: true })
		input.scrollIntoView({ block: 'center' })
	}

	if (!isTerminal || !isBetweenSections) return null

	return (
		<div className="pointer-events-none fixed inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-30 mx-auto flex max-w-5xl justify-end px-5 sm:px-8">
			<Button
				type="button"
				variant="outline"
				size="icon"
				aria-label="Voltar ao terminal"
				title="Voltar ao terminal"
				onClick={returnToTerminal}
				className="pointer-events-auto h-12 w-12 rounded-full border-border/80 bg-card text-muted-foreground shadow-lg transition-colors hover:border-brand/50 hover:bg-card hover:text-brand"
			>
				<Terminal className="h-5 w-5" aria-hidden="true" />
			</Button>
		</div>
	)
}
