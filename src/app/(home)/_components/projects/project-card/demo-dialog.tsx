'use client'

import { ArrowUpRight, Play } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Iframe } from './iframe'
import { actionClassName } from './styles'

type Props = {
	id: string
	title: string
	category: string
	demoUrl: string
	websiteUrl?: string
}

export const DemoDialog = ({
	id,
	title,
	category,
	demoUrl,
	websiteUrl,
}: Props) => {
	const [isOpen, setIsOpen] = useState(false)

	// O hash `#<id>-demo` abre a demonstração e permite compartilhar o link.
	useEffect(() => {
		const syncWithHash = () => {
			setIsOpen(window.location.hash === `#${id}-demo`)
		}

		syncWithHash()

		window.addEventListener('hashchange', syncWithHash)

		return () => window.removeEventListener('hashchange', syncWithHash)
	}, [id])

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<button type="button" className={actionClassName}>
					<Play className="h-4 w-4 shrink-0" aria-hidden="true" />
					Demo
				</button>
			</DialogTrigger>
			<DialogContent className="top-2 left-2 h-[calc(100dvh-1rem)] max-h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] max-w-none translate-x-0 translate-y-0 grid-rows-[auto_1fr] gap-0 overflow-hidden rounded-2xl border-brand/30 bg-card p-0 shadow-2xl shadow-brand/10 sm:top-[50%] sm:left-[50%] sm:h-[88dvh] sm:max-h-[88dvh] sm:w-[92vw] sm:max-w-6xl sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-2xl">
				<div className="flex items-center justify-between border-border/80 border-b bg-muted/40 px-4 py-3 sm:px-5">
					<div className="min-w-0">
						<DialogTitle className="truncate font-semibold text-base">
							{title}
						</DialogTitle>
						<DialogDescription className="truncate text-xs">
							Demonstração · {category}
						</DialogDescription>
					</div>
					{websiteUrl && (
						<Link
							className="mr-8 hidden items-center gap-2 rounded-md px-2 py-1.5 font-medium text-brand text-sm transition-colors hover:bg-brand/10 sm:inline-flex"
							href={websiteUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							Abrir site
							<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
						</Link>
					)}
				</div>
				<div className="min-h-0 bg-background p-2 sm:p-3">
					<Iframe title={title} demoUrl={demoUrl} />
				</div>
			</DialogContent>
		</Dialog>
	)
}
