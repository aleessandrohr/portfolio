import { TerminalText } from '@/components/terminal-text'
import { terminalNavigation } from '@/configs/terminal'
import type { SkillGroup } from '@/types/skill'

type Props = {
	summary: string
	skills: ReadonlyArray<SkillGroup>
}

const badgeClassName =
	'whitespace-nowrap rounded-sm border border-border/60 bg-muted/50 px-2 py-0.5 font-mono text-muted-foreground text-xs leading-5'

export const About = ({ summary, skills }: Props) => (
	<section
		id="about"
		aria-labelledby="about-title"
		className="grid scroll-mt-28 gap-8 border-border/70 border-t py-12 md:grid-cols-2"
	>
		<div data-reveal className="min-w-0">
			<h2 id="about-title" className="font-semibold text-2xl tracking-tight">
				<TerminalText command={terminalNavigation.about.command}>
					Sobre
				</TerminalText>
			</h2>
			<p className="mt-5 hyphens-auto text-justify text-[15px] text-muted-foreground leading-relaxed">
				{summary}
			</p>
		</div>
		<section data-reveal className="min-w-0" aria-labelledby="skills-title">
			<h3 id="skills-title" className="font-semibold text-2xl tracking-tight">
				Habilidades
			</h3>
			<dl className="mt-4 divide-y divide-border/60">
				{skills.map(group => (
					<div
						key={group.category}
						className="grid gap-2 py-3 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-4"
					>
						<dt className="font-medium text-sm">{group.category}</dt>
						<dd className="flex min-w-0 flex-wrap items-start gap-1.5">
							{group.items.map(skill => (
								<span key={skill} className={badgeClassName}>
									{skill}
								</span>
							))}
						</dd>
					</div>
				))}
			</dl>
		</section>
	</section>
)
