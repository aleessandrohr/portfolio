import { TerminalText } from '@/components/terminal-text'
import { terminalNavigation } from '@/configs/terminal'
import type { Project as ProjectType } from '@/types/project'
import { ProjectsCarousel } from './carousel'
import { ProjectCard } from './project-card'

type Props = { projects: ReadonlyArray<ProjectType> }

export const Projects = ({ projects }: Props) => {
	const featured = projects.filter(project => project.featured)
	const others = projects.filter(project => !project.featured)
	const slides = [...featured, ...others].map(project => ({
		id: project.id,
		content: <ProjectCard {...project} />,
	}))

	return (
		<section
			id="projects"
			aria-labelledby="projects-title"
			className="scroll-mt-28 border-border/70 border-t py-12"
		>
			<div data-reveal>
				<ProjectsCarousel
					label="Projetos"
					slides={slides}
					heading={
						<h2
							id="projects-title"
							className="font-semibold text-2xl tracking-tight"
						>
							<TerminalText command={terminalNavigation.projects.command}>
								Projetos
							</TerminalText>
						</h2>
					}
				/>
			</div>
		</section>
	)
}
