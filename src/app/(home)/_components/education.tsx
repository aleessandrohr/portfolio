import { GraduationCap } from 'lucide-react'
import type { Education as EducationType } from '@/types/education'
import { formatPeriod, getAcademicPeriod } from '@/utils/experience-timeline'

type Props = { items: ReadonlyArray<EducationType> }

export const Education = ({ items }: Props) => (
	<section
		data-reveal
		id="education"
		aria-labelledby="education-title"
		className="scroll-mt-28 border-border/70 border-t py-10"
	>
		<h2
			id="education-title"
			className="mb-6 font-semibold text-2xl tracking-tight"
		>
			Educação
		</h2>
		{items.map(item => (
			<article
				key={item.course}
				className="flex items-center gap-4 rounded-2xl border border-border/80 bg-card p-5 shadow-sm dark:shadow-none"
			>
				<span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
					<GraduationCap className="h-6 w-6" aria-hidden="true" />
				</span>
				<div className="min-w-0 flex-1">
					<div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
						<h3 className="font-semibold text-lg">{item.course}</h3>
						<p className="shrink-0 font-mono text-[13px] text-muted-foreground tabular-nums leading-5">
							{formatPeriod(item)}
						</p>
					</div>
					<p className="mt-1 text-muted-foreground text-sm">
						{item.institution}
					</p>
					<p className="mt-1 text-muted-foreground text-sm">
						{getAcademicPeriod(item) &&
							`${getAcademicPeriod(item)}º período · `}
						{item.description}
					</p>
				</div>
			</article>
		))}
	</section>
)
