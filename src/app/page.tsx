import { Experience } from '@/components/experience'
import { Profile } from '@/components/profile'
import { Project } from '@/components/project'
import { education } from '@/constants/educations'
import { experiences } from '@/constants/experiences'
import { projects } from '@/constants/projects'

const experiencesArray = [...Object.values(experiences)]
const projectsArray = [...Object.values(projects)]
const educationArray = [...Object.values(education)]

const Home = () => {
	return (
		<div className="custom_container flex flex-col items-center justify-center gap-8 md:h-dvh md:flex-row md:items-start md:justify-start md:gap-0 md:p-0">
			<aside className="md:h-dvh md:rounded-r-lg">
				<Profile />
			</aside>
			<main className="md:custom_container flex w-full min-w-0 flex-col md:h-dvh md:overflow-y-auto md:py-0">
				<div className="relative flex w-full max-w-screen-sm flex-col gap-8 self-end py-4">
					<section id="resume" className="flex flex-col gap-4">
						<h2 className="custom_title sticky top-0 border-brand/50 border-b border-solid bg-background py-2">
							Resumo
						</h2>
						<p className="custom_description flex flex-col gap-2">
							Desenvolvedor Full Stack Pleno com experiência em TypeScript,
							React.js, Next.js e Node.js, com atuação em plataformas SaaS,
							arquitetura de micro frontends com Module Federation, integração
							com microsserviços e infraestrutura com Docker. Graduando em
							Engenharia da Computação pela UFMA, atualmente no 4º período.
						</p>
					</section>
					<section id="experiences" className="flex flex-col gap-4">
						<h2 className="custom_title sticky top-0 border-brand/50 border-b border-solid bg-background py-2">
							Experiências
						</h2>
						{experiencesArray.map(({ subtitle, ...props }) => (
							<Experience key={subtitle} {...props} subtitle={subtitle} />
						))}
					</section>
					<section id="projects" className="flex flex-col gap-4">
						<h2 className="custom_title sticky top-0 border-brand/50 border-b border-solid bg-background py-2">
							Projetos
						</h2>
						{projectsArray.map(({ title, ...props }) => (
							<Project key={title} {...props} title={title} />
						))}
					</section>
					<section id="education" className="flex flex-col gap-4">
						<h2 className="custom_title sticky top-0 border-brand/50 border-b border-solid bg-background py-2">
							Educação
						</h2>
						{educationArray.map(({ title, ...props }) => (
							<Experience key={title} {...props} title={title} />
						))}
					</section>
				</div>
			</main>
		</div>
	)
}

export default Home
