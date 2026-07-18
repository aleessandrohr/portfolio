import { Icon } from '@/components/icon'
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
	Vite: 'border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300',
	'Context API':
		'border-indigo-500/30 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300',
	'React Query':
		'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300',
	'TanStack Router':
		'border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-300',
	'Tailwind CSS':
		'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300',
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
	<Card className="flex w-full flex-col gap-2 md:flex-row">
		<aside className="flex p-6 pb-0 font-light text-sm">
			<div className="flex items-center justify-start self-start font-medium">
				<span>{start}</span>
				<Icon name="minus" />
				<span>{end}</span>
			</div>
		</aside>
		<section>
			<CardHeader>
				<CardTitle className="flex flex-col gap-1">
					<span className="text-xl">{title}</span>
					<span className="text-base">{subtitle}</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="custom_description flex flex-col gap-2">
					{Array.isArray(description)
						? description.map(item => <p key={item}>{item}</p>)
						: description}
				</div>
			</CardContent>
			{skills && (
				<CardFooter>
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
		</section>
	</Card>
)
