'use client'

import { Menu } from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'
import { TerminalLink } from '@/components/terminal-link'
import { TerminalText } from '@/components/terminal-text'
import { TerminalToggle } from '@/components/terminal-toggle'
import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { menuItems } from '@/configs/menu-items'
import { cn } from '@/lib/utils'
import { usePortfolioMode } from '@/providers/portfolio-mode'
import type { MenuItem } from '@/types/menu-item'

type MenuProps = { menuItems: ReadonlyArray<MenuItem>; isTerminal: boolean }

const DesktopNav = ({ menuItems, isTerminal }: MenuProps) => (
	<nav
		aria-label="Navegação principal"
		className={cn(
			'ml-auto hidden shrink-0 items-center gap-1',
			isTerminal ? 'lg:flex' : 'md:flex'
		)}
	>
		{menuItems.map(item => (
			<TerminalLink
				key={item.href}
				command={item.command}
				href={item.href}
				className="whitespace-nowrap rounded-md px-3 py-2 font-medium text-muted-foreground text-sm transition-colors hover:bg-brand/10 hover:text-brand"
			>
				<TerminalText command={item.command}>{item.value}</TerminalText>
			</TerminalLink>
		))}
	</nav>
)

const MobileMenu = ({ menuItems, isTerminal }: MenuProps) => (
	<Drawer>
		<DrawerTrigger asChild>
			<Button
				size="icon"
				variant="outline"
				aria-label="Abrir menu"
				className={cn(
					'rounded-full bg-background/30',
					isTerminal ? 'lg:hidden' : 'md:hidden'
				)}
			>
				<Menu className="h-5 w-5" aria-hidden="true" />
			</Button>
		</DrawerTrigger>
		<DrawerContent
			className={cn(
				'glass-surface rounded-t-2xl',
				isTerminal ? 'lg:hidden' : 'md:hidden'
			)}
		>
			<DrawerHeader className="text-left">
				<DrawerTitle>Navegação</DrawerTitle>
				<DrawerDescription>Acesse as seções do portfólio.</DrawerDescription>
			</DrawerHeader>
			<nav aria-label="Navegação no celular" className="grid gap-2 p-4 pt-0">
				{menuItems.map(item => (
					<DrawerClose asChild key={item.href}>
						<TerminalLink
							command={item.command}
							href={item.href}
							className="rounded-md px-4 py-3 font-medium transition-colors hover:bg-brand/10 hover:text-brand"
						>
							<TerminalText command={item.command}>{item.value}</TerminalText>
						</TerminalLink>
					</DrawerClose>
				))}
			</nav>
		</DrawerContent>
	</Drawer>
)

export const Header = () => {
	const { isTerminal } = usePortfolioMode()

	return (
		<header className="glass-surface sticky top-3 z-40 mx-auto mt-3 w-[calc(100%-2rem)] max-w-5xl rounded-xl border sm:w-[calc(100%-3rem)]">
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-background focus:p-3"
			>
				Ir para o conteúdo
			</a>
			<div className="mx-auto flex min-h-20 w-full min-w-0 max-w-5xl items-center gap-2 px-4 py-3 sm:gap-5 sm:px-8">
				<TerminalToggle />
				<DesktopNav menuItems={menuItems} isTerminal={isTerminal} />
				<div
					className={cn(
						'ml-auto flex shrink-0 items-center gap-2',
						isTerminal ? 'lg:ml-0' : 'md:ml-0'
					)}
				>
					<ModeToggle />
					<MobileMenu menuItems={menuItems} isTerminal={isTerminal} />
				</div>
			</div>
		</header>
	)
}
