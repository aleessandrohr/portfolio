import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Project as ProjectType } from '@/types/project'
import { Cover } from './cover'
import { DemoDialog } from './demo-dialog'
import { actionClassName } from './styles'

type Props = ProjectType

export const ProjectCard = ({
	id,
	imageUrl,
	title,
	description,
	category,
	featured,
	kind,
	websiteUrl,
	demoUrl,
}: Props) => {
	const hasActions = Boolean(demoUrl || websiteUrl)

	return (
		<Card
			id={id}
			className={cn(
				'group relative flex w-full min-w-0 scroll-mt-28 flex-col overflow-hidden border-border/80 transition-all duration-300 hover:border-brand/50 hover:shadow-brand/5 hover:shadow-xl motion-safe:hover:-translate-y-1',
				featured ? 'bg-brand/[0.025]' : 'bg-card'
			)}
		>
			{demoUrl && (
				<span
					id={`${id}-demo`}
					className="pointer-events-none absolute inset-x-0 top-0 h-px scroll-mt-24"
					aria-hidden="true"
				/>
			)}
			<div className="p-3 pb-0">
				<Cover title={title} kind={kind} imageUrl={imageUrl} />
			</div>
			<CardHeader className="gap-1.5 p-5">
				<p className="font-medium text-brand text-xs">{category}</p>
				<CardTitle className="text-xl leading-tight transition-colors group-hover:text-brand">
					{title}
				</CardTitle>
				<CardDescription className="line-clamp-4 pt-1 text-left text-sm">
					{description}
				</CardDescription>
			</CardHeader>
			{hasActions && (
				<CardFooter className="mt-auto min-h-12 flex-wrap gap-1 border-border/80 border-t px-2 py-2">
					{demoUrl && (
						<DemoDialog
							id={id}
							title={title}
							category={category}
							demoUrl={demoUrl}
							websiteUrl={websiteUrl}
						/>
					)}
					{websiteUrl && (
						<Link
							className={actionClassName}
							href={websiteUrl}
							target="_blank"
							rel="noopener noreferrer"
						>
							Site
							<span className="sr-only">(abre em nova aba)</span>
							<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
						</Link>
					)}
				</CardFooter>
			)}
		</Card>
	)
}
