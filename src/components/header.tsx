import { Menu, Terminal } from 'lucide-react'
import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'
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
import type { MenuItem } from '@/types/menu-item'

type Props = { name: string }

type MenuProps = { menuItems: ReadonlyArray<MenuItem> }

const TerminalSwitch = ({ name }: { name: string }) => (
	<span className="inline-flex shrink-0" title="Terminal em breve">
		<Button
			type="button"
			role="switch"
			aria-checked={false}
			aria-label={`${name}: modo terminal (em breve)`}
			disabled
			variant="outline"
			className="gap-2 rounded-full border-border/70 bg-background/30 px-4 font-mono disabled:opacity-70"
		>
			<Terminal className="h-4 w-4" aria-hidden="true" />
			{name}
		</Button>
	</span>
)

const DesktopNav = ({ menuItems }: MenuProps) => (
	<nav
		aria-label="Navegação principal"
		className="ml-auto hidden shrink-0 items-center gap-1 md:flex"
	>
		{menuItems.map(item => (
			<Link
				key={item.href}
				href={item.href}
				className="whitespace-nowrap rounded-md px-3 py-2 font-medium text-muted-foreground text-sm transition-colors hover:bg-brand/10 hover:text-brand"
			>
				{item.value}
			</Link>
		))}
	</nav>
)

const MobileMenu = ({ menuItems }: MenuProps) => (
	<Drawer>
		<DrawerTrigger asChild>
			<Button
				size="icon"
				variant="outline"
				aria-label="Abrir menu"
				className="rounded-full bg-background/30 md:hidden"
			>
				<Menu className="h-5 w-5" aria-hidden="true" />
			</Button>
		</DrawerTrigger>
		<DrawerContent className="glass-surface rounded-t-2xl md:hidden">
			<DrawerHeader className="text-left">
				<DrawerTitle>Navegação</DrawerTitle>
				<DrawerDescription>Acesse as seções do portfólio.</DrawerDescription>
			</DrawerHeader>
			<nav aria-label="Navegação no celular" className="grid gap-2 p-4 pt-0">
				{menuItems.map(item => (
					<DrawerClose asChild key={item.href}>
						<Link
							href={item.href}
							className="rounded-md px-4 py-3 font-medium transition-colors hover:bg-brand/10 hover:text-brand"
						>
							{item.value}
						</Link>
					</DrawerClose>
				))}
			</nav>
		</DrawerContent>
	</Drawer>
)

export const Header = ({ name }: Props) => (
	<header className="glass-surface sticky top-3 z-40 mx-auto mt-3 w-[calc(100%-2rem)] max-w-5xl rounded-xl border sm:w-[calc(100%-3rem)]">
		<a
			href="#main"
			className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-background focus:p-3"
		>
			Ir para o conteúdo
		</a>
		<div className="mx-auto flex min-h-20 w-full min-w-0 max-w-5xl items-center gap-2 px-4 py-3 sm:gap-5 sm:px-8">
			<TerminalSwitch name={name} />
			<DesktopNav menuItems={menuItems} />
			<div className="ml-auto flex shrink-0 items-center gap-2 md:ml-0">
				<ModeToggle />
				<MobileMenu menuItems={menuItems} />
			</div>
		</div>
	</header>
)
