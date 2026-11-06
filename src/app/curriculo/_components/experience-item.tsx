import type { Experience } from '@/types/experience'
import { formatDuration, formatPeriod } from '@/utils/experience-timeline'

export const ExperienceItem = ({
	start,
	end,
	title,
	category,
	organization,
	details = [],
	activities,
}: Experience) => (
	<article className="relative break-inside-avoid-page">
		<span
			aria-hidden="true"
			className="absolute top-1.5 -left-[1.8rem] h-2.5 w-2.5 rounded-full bg-brand ring-4 ring-background sm:-left-[2.3rem] print:hidden"
		/>
		<div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
			<div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
				<h3 className="font-semibold text-lg print:text-sm">{title}</h3>
				<span className="rounded-full border border-brand/25 bg-brand/5 px-2 py-0.5 font-medium text-brand text-xs print:hidden">
					{category}
				</span>
			</div>
			<p className="shrink-0 font-mono text-[13px] text-muted-foreground tabular-nums leading-5 print:text-xs">
				{formatPeriod({ start, end })} · {formatDuration({ start, end })}
			</p>
		</div>
		<p className="mt-1 text-muted-foreground text-sm print:mt-0 print:text-xs">
			{[organization, ...details].join(' · ')}
		</p>
		<ul className="mt-3 list-disc space-y-1.5 pl-4 text-muted-foreground text-sm leading-relaxed print:mt-1 print:space-y-0.5 print:text-foreground print:text-xs">
			{activities.map(activity => (
				<li key={activity}>{activity}</li>
			))}
		</ul>
	</article>
)
