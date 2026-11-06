'use client'

import { Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { usePortfolioMode } from '@/providers/portfolio-mode'


export const TerminalToggle = () => {
	const { isTerminal, setTerminal } = usePortfolioMode()

	return (
		<TooltipProvider delayDuration={250}>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						type="button"
						role="switch"
						aria-checked={isTerminal}
						aria-label={
							isTerminal ? 'Voltar ao modo visual' : 'Ativar modo Linux'
						}
						onClick={() => setTerminal(!isTerminal)}
						variant="outline"
						className={cn(
							'relative min-h-11 shrink-0 gap-2 overflow-hidden rounded-full border-brand/40 bg-brand/10 px-4 font-mono shadow-sm transition-[border-color,background-color,box-shadow] hover:border-brand/70 hover:bg-brand/15',
							isTerminal
								? 'border-brand/40 bg-brand/10 text-brand'
								: "text-foreground after:pointer-events-none after:absolute after:inset-y-0 after:left-0 after:w-1/2 after:-translate-x-[200%] after:bg-[linear-gradient(110deg,transparent,hsl(var(--brand)/0.3),transparent)] after:content-[''] motion-safe:after:animate-[terminal-invitation_5s_ease-in-out_infinite]"
						)}
					>
						<Terminal className="h-4 w-4 text-brand" aria-hidden="true" />
						Terminal
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom" sideOffset={8}>
					{isTerminal
						? 'Voltar ao modo visual'
						: 'Explore o portfólio por comandos'}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
