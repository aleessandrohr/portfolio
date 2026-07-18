import Image from 'next/image'
import Link from 'next/link'
import { Play } from 'lucide-react'

import { Icon } from '@/components/icon'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import type { Project as ProjectType } from '@/constants/projects'
import { Iframe } from './components/iframe'

type Props = ProjectType

export const Project = ({
	imageUrl,
	title,
	description,
	category,
	links,
	iframeUrl,
}: Props) => (
	<Card className="group relative flex w-full min-w-0 flex-col overflow-hidden border-border/80 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-brand/5 hover:shadow-xl lg:flex-row">
		<aside className="relative min-h-60 overflow-hidden border-border/80 border-b bg-muted/30 p-3 lg:order-2 lg:min-h-full lg:w-[44%] lg:border-b-0 lg:border-l">
			<div className="relative h-full min-h-52 w-full overflow-hidden rounded-xl border border-border/80">
				<Image
					src={imageUrl}
					fill
					alt={title}
					sizes="(min-width: 1024px) 360px, 100vw"
					className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
				/>
			</div>
		</aside>
		<section className="flex min-w-0 flex-1 flex-col">
			<CardHeader className="gap-3 pb-3">
				<CardTitle className="text-2xl leading-tight transition-colors group-hover:text-brand">
					{title}
				</CardTitle>
				<CardDescription className="custom_description text-left">
					{description}
				</CardDescription>
			</CardHeader>
			<CardFooter className="mt-auto flex flex-col items-center gap-3 border-border/80 border-t pt-5 lg:grid lg:grid-cols-2">
				<Dialog>
					<DialogTrigger asChild>
						<Button className="w-full" disabled={!iframeUrl}>
							<Play
								className="mr-2 h-5 w-5 shrink-0"
								aria-hidden="true"
								strokeWidth={1.75}
							/>
							Demonstração
						</Button>
					</DialogTrigger>
					{iframeUrl && (
						<DialogContent className="h-[88vh] max-h-[88vh] w-[92vw] max-w-6xl grid-rows-[auto_1fr] gap-0 overflow-hidden border-brand/30 bg-card p-0 shadow-2xl shadow-brand/10">
							<div className="flex items-center justify-between border-border/80 border-b bg-muted/40 px-4 py-3 sm:px-5">
								<div className="flex min-w-0 items-center gap-3">
									<div className="min-w-0">
										<DialogTitle className="truncate font-semibold text-base">
											{title}
										</DialogTitle>
										<DialogDescription className="truncate text-xs">
											Demonstração · {category}
										</DialogDescription>
									</div>
								</div>
								{links[0] && (
									<Link
										className="mr-8 hidden items-center gap-2 rounded-md px-2 py-1.5 font-medium text-brand text-sm transition-colors hover:bg-brand/10 sm:inline-flex"
										href={links[0]}
										target="_blank"
									>
										Abrir site
										<Icon name="arrow-up-right" className="h-4 w-4" />
									</Link>
								)}
							</div>
							<div className="min-h-0 bg-background p-2 sm:p-3">
								<Iframe title={title} iframeUrl={iframeUrl} />
							</div>
						</DialogContent>
					)}
				</Dialog>
				{links.map(link => (
					<Link
						key={link}
						className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-brand/40 bg-brand/5 px-2 py-2 font-medium text-brand text-sm transition-colors hover:bg-brand/10"
						href={link}
						target="_blank"
					>
						Acessar projeto
						<Icon name="arrow-up-right" className="h-4 w-4" />
					</Link>
				))}
			</CardFooter>
		</section>
	</Card>
)
