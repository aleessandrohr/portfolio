import Image from 'next/image'
import Link from 'next/link'
import { Menu } from 'lucide-react'

import { Icon } from '@/components/icon'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { menuItems } from '@/constants/menu-items'
import { socialMedia } from '@/constants/social-media'

const socialMediaArray = Object.values(socialMedia)

export const Profile = () => (
	<Drawer>
		<nav className="sticky top-3 isolate z-40 w-full overflow-hidden rounded-xl border border-white/10 bg-background/60 p-3 shadow-[0_8px_32px_rgba(0,0,0,0.18)] backdrop-blur-2xl before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-transparent">
		<div className="relative z-10 flex min-w-0 items-center gap-3">
			<Image
				src="/static/assets/profile.jpg"
				alt="Alessandro Henrique Ramos"
				width={96}
				height={96}
				className="h-11 w-11 shrink-0 rounded-full border-2 border-brand/40 object-cover"
			/>
			<div className="min-w-0 flex-1">
				<p className="truncate font-semibold text-sm">Alessandro Henrique Ramos</p>
				<p className="truncate text-muted-foreground text-xs">
					Desenvolvedor Full Stack Pleno
				</p>
			</div>
			<div className="hidden lg:block">
				<ModeToggle />
			</div>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<DrawerTrigger asChild>
							<Button
								aria-label="Abrir menu"
								className="shrink-0 lg:hidden"
								size="icon"
								variant="outline"
							>
								<Menu className="h-5 w-5" />
							</Button>
						</DrawerTrigger>
					</TooltipTrigger>
					<TooltipContent>Menu</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
		<div className="relative z-10 mt-3 hidden items-center justify-between gap-3 border-white/10 border-t pt-2 lg:flex">
			<div className="flex min-w-0 gap-1 overflow-x-auto">
				{menuItems.map(({ href, value }) => (
					<Link
						className="whitespace-nowrap rounded-md px-3 py-2 font-medium text-muted-foreground text-sm transition-colors hover:bg-brand/10 hover:text-brand"
						href={href}
						key={value}
					>
						{value}
					</Link>
				))}
			</div>
			<div className="hidden shrink-0 gap-1 lg:flex">
				{socialMediaArray.map(({ href, name, icon }) => (
					<TooltipProvider key={name}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									asChild
									className="h-9 w-9 hover:bg-brand/10 hover:text-brand"
									size="icon"
									variant="ghost"
								>
									<Link href={href} aria-label={name} target="_blank">
										<Icon name={icon} className="h-4 w-4" />
									</Link>
								</Button>
							</TooltipTrigger>
							<TooltipContent>{name}</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				))}
			</div>
		</div>
		</nav>

			<DrawerContent className="border-brand/30 bg-background/95 backdrop-blur-2xl lg:hidden">
				<DrawerHeader className="text-left">
					<DrawerTitle>Navegação</DrawerTitle>
					<DrawerDescription>
						Acesse rapidamente as seções do portfólio.
					</DrawerDescription>
				</DrawerHeader>
				<div className="grid gap-2 p-4 pt-0">
					{menuItems.map(({ href, value }) => (
						<DrawerClose asChild key={value}>
							<Link
								className="rounded-lg border border-border/80 px-4 py-3 font-medium text-foreground transition-colors hover:border-brand/40 hover:bg-brand/10 hover:text-brand"
								href={href}
							>
								{value}
							</Link>
						</DrawerClose>
					))}
				</div>
				<DrawerFooter className="border-border/80 border-t pt-4">
					<div className="flex items-center justify-between gap-3">
						<div className="flex gap-2">
							{socialMediaArray.map(({ href, name, icon }) => (
								<TooltipProvider key={name}>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button asChild size="icon" variant="outline">
												<Link href={href} aria-label={name} target="_blank">
													<Icon name={icon} />
												</Link>
											</Button>
										</TooltipTrigger>
										<TooltipContent>{name}</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							))}
						</div>
						<ModeToggle />
					</div>
				</DrawerFooter>
			</DrawerContent>
	</Drawer>
)
