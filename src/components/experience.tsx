import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import type { Experience as ExperienceType } from '@/constants/experiences'

type Props = ExperienceType

const skillBadgeStyles: Record<string, string> = {
	JavaScript:
		'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
	TypeScript:
		'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300',
	'React.js':
		'border-cyan-500/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
	'Next.js':
		'border-zinc-500/30 bg-zinc-500/10 text-zinc-700 dark:text-zinc-200',
	'Module Federation':
		'border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300',
	'Node.js':
		'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
	Fastify:
		'border-stone-500/30 bg-stone-500/10 text-stone-700 dark:text-stone-300',
	PostgreSQL:
		'border-blue-600/30 bg-blue-600/10 text-blue-800 dark:text-blue-300',
	Drizzle: 'border-lime-500/30 bg-lime-500/10 text-lime-700 dark:text-lime-300',
	'Socket.io':
		'border-slate-500/30 bg-slate-500/10 text-slate-700 dark:text-slate-300',
	Docker: 'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-300',
	Portainer:
		'border-indigo-500/30 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300',
	Cloudflare:
		'border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-300',
	Caddy: 'border-teal-500/30 bg-teal-500/10 text-teal-700 dark:text-teal-300',
	i18n: 'border-pink-500/30 bg-pink-500/10 text-pink-700 dark:text-pink-300',
}

const defaultSkillBadgeStyle = 'border-brand/30 bg-brand/10 text-brand'

export const Experience = ({
	start,
	end,
	title,
	subtitle,
	description,
	skills,
}: Props) => (
	<Card className="group relative w-full overflow-hidden border-border/80 transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-brand/5 hover:shadow-xl">
		<CardHeader className="gap-4 space-y-0 pb-4">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
				<div className="min-w-0">
					<CardTitle className="text-2xl leading-tight transition-colors group-hover:text-brand">
						{title}
					</CardTitle>
					<p className="mt-2 font-medium text-muted-foreground text-sm">
						{subtitle}
					</p>
				</div>
				<span className="self-start whitespace-nowrap rounded-full border border-brand/25 bg-brand/5 px-3 py-1.5 font-medium text-brand text-xs">
					{start} — {end}
				</span>
			</div>
		</CardHeader>
		<CardContent className="pb-5">
			<div className="custom_description flex flex-col gap-3 text-left">
				{Array.isArray(description)
					? description.map(item => <p key={item}>{item}</p>)
					: description}
			</div>
		</CardContent>
		{skills && (
			<CardFooter className="border-border/80 border-t pt-5">
				<div className="flex flex-col gap-3">
					<strong className="text-brand text-sm">Habilidades</strong>
					<div className="flex flex-wrap gap-2">
						{skills.map(skill => (
							<span
								className={`rounded-full border px-2.5 py-1 font-medium text-xs shadow-sm transition-transform duration-200 hover:-translate-y-0.5 ${skillBadgeStyles[skill] ?? defaultSkillBadgeStyle}`}
								key={skill}
							>
								{skill}
							</span>
						))}
					</div>
				</div>
			</CardFooter>
		)}
	</Card>
)
