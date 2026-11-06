import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { educations } from '@/constants/educations'
import { experiences } from '@/constants/experiences'
import { profile } from '@/constants/profile'
import { projects } from '@/constants/projects'
import { skills } from '@/constants/skills'
import { socialMedia } from '@/constants/social-media'
import { PortfolioModeProvider } from '@/providers/portfolio-mode'
import { TerminalSessionProvider } from '@/providers/terminal-session'
import { sortExperiences } from '@/utils/experience-timeline'
import {
	buildTerminalCommands,
	buildTerminalOutputs,
} from '@/utils/terminal-commands'
import { About } from './_components/about'
import { Contact } from './_components/contact'
import { Education } from './_components/education'
import { Experiences } from './_components/experiences'
import { Hero } from './_components/hero'
import { HomeMotion } from './_components/home-motion'
import { Projects } from './_components/projects'
import { TerminalReturn } from './_components/terminal-return'

export default function Home() {
	const projectList = Object.values(projects)
	const commands = buildTerminalCommands(profile, projectList)
	const outputs = buildTerminalOutputs(profile, projectList)

	return (
		<PortfolioModeProvider>
			<TerminalSessionProvider commands={commands} outputs={outputs}>
				<Header name={profile.displayName.split(' ')[0]} />
				<HomeMotion>
					<Hero profile={profile} socialMedia={Object.values(socialMedia)} />
					<About summary={profile.summary} skills={Object.values(skills)} />
					<Projects projects={Object.values(projects)} />
					<Experiences items={sortExperiences(Object.values(experiences))} />
					<Education items={Object.values(educations)} />
					<Contact profile={profile} />
				</HomeMotion>
				<Footer profile={profile} />
				<TerminalReturn />
			</TerminalSessionProvider>
		</PortfolioModeProvider>
	)
}
