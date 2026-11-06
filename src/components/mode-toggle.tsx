'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

export const ModeToggle = () => {
	const { setTheme } = useTheme()

	return (
		<DropdownMenu modal={false}>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<DropdownMenuTrigger asChild>
							<Button
								aria-label="Mudar tema"
								variant="outline"
								size="icon"
								className="relative shrink-0 rounded-full bg-background/30 hover:bg-brand/10"
							>
								<Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
								<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
							</Button>
						</DropdownMenuTrigger>
					</TooltipTrigger>
					<TooltipContent>Mudar tema</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<DropdownMenuContent align="end" className="glass-surface relative">
				<DropdownMenuItem onClick={() => setTheme('light')}>
					Claro
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					Escuro
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					Sistema
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
