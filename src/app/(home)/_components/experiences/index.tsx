import { TerminalText } from '@/components/terminal-text'
import { terminalNavigation } from '@/configs/terminal'
import type { Experience as ExperienceType } from '@/types/experience'
import { Experience } from './experience'

type Props = { items: ReadonlyArray<ExperienceType> }

export const Experiences = ({ items }: Props) => (
	<section
		data-reveal
		id="experiences"
		aria-labelledby="experience-title"
		className="scroll-mt-28 border-border/70 border-t py-12"
	>
		<h2
			id="experience-title"
			className="mb-8 font-semibold text-2xl tracking-tight"
		>
			<TerminalText command={terminalNavigation.experiences.command}>
				Experiência
			</TerminalText>
		</h2>
		<div className="ml-2 space-y-8 border-border border-l pl-6 sm:pl-8">
			{items.map(item => (
				<Experience key={`${item.title}-${item.start}`} {...item} />
			))}
		</div>
	</section>
)
