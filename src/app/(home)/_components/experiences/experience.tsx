import type { Experience as ExperienceType } from '@/types/experience'
import { formatDuration, formatPeriod } from '@/utils/experience-timeline'

export const Experience = ({
	start,
	end,
	title,
	category,
	organization,
	details = [],
	activities,
}: ExperienceType) => (
	<article className="relative">
		<span
			className="absolute top-1.5 -left-[1.8rem] h-2.5 w-2.5 rounded-full bg-brand ring-4 ring-background sm:-left-[2.3rem]"
			aria-hidden="true"
		/>
		<div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
			<div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
				<h3 className="font-semibold text-lg">{title}</h3>
				{category && (
					<span className="rounded-full border border-brand/25 bg-brand/5 px-2 py-0.5 font-medium text-brand text-xs">
						{category}
					</span>
				)}
			</div>
			<p className="shrink-0 font-mono text-[13px] text-muted-foreground tabular-nums leading-5">
				{formatPeriod({ start, end })} · {formatDuration({ start, end })}
			</p>
		</div>
		<p className="mt-1 text-muted-foreground text-sm">
			{[organization, ...details].join(' | ')}
		</p>
		<ul className="mt-3 max-w-3xl list-disc space-y-2 pl-4 text-muted-foreground text-sm leading-relaxed">
			{activities.map(item => (
				<li key={item}>{item}</li>
			))}
		</ul>
	</article>
)
