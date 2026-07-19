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
		<div className="custom_container flex min-h-dvh flex-col gap-6">
			<Profile />
			<main className="flex w-full min-w-0 flex-col">
				<div className="relative flex w-full max-w-4xl flex-col gap-8 self-center pt-4 pb-24 lg:py-4">
					<section id="resume" className="flex scroll-mt-24 flex-col gap-4 lg:scroll-mt-40">
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
					<section id="experiences" className="flex scroll-mt-24 flex-col gap-4 lg:scroll-mt-40">
						<h2 className="custom_title sticky top-0 border-brand/50 border-b border-solid bg-background py-2">
							Experiências
						</h2>
						{experiencesArray.map(({ subtitle, ...props }) => (
							<Experience key={subtitle} {...props} subtitle={subtitle} />
						))}
					</section>
					<section id="projects" className="flex scroll-mt-24 flex-col gap-4 lg:scroll-mt-40">
						<h2 className="custom_title sticky top-0 border-brand/50 border-b border-solid bg-background py-2">
							Projetos
						</h2>
						{projectsArray.map(({ title, ...props }) => (
							<Project key={title} {...props} title={title} />
						))}
					</section>
					<section id="education" className="flex scroll-mt-24 flex-col gap-4 lg:scroll-mt-40">
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
