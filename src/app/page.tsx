import { Experience } from "@/components/experience";
import { Profile } from "@/components/profile";
import { Project } from "@/components/project";
import { education } from "@/constants/educations";
import { experiences } from "@/constants/experiences";
import { projects } from "@/constants/projects";

const experiencesArray = [...Object.values(experiences)];
const projectsArray = [...Object.values(projects)];
const educationArray = [...Object.values(education)];

const Home = () => {
	return (
		<div className="custom_container flex flex-col items-center justify-center gap-8 md:h-dvh md:flex-row md:items-start md:justify-start md:gap-0 md:p-0">
			<aside className="md:h-dvh md:rounded-r-lg">
				<Profile />
			</aside>
			<main className="md:custom_container flex w-full flex-col md:h-dvh md:overflow-y-auto md:py-0">
				<div className="relative flex w-full max-w-screen-sm flex-col gap-8 self-end py-4">
					<section id="resume" className="flex flex-col gap-4">
						<h2 className="custom_title sticky top-0 border-border border-b border-solid bg-background py-2">
							Resumo
						</h2>
						<p className="custom_description flex flex-col gap-1">
							<span>
								Desenvolvedor FullStack com experiência em TypeScript, atuando
								no front-end com React e Next.js e no back-end com Node.js,
								trabalhando com bancos SQL e NoSQL em ambientes conteinerizados
								com Docker. Graduando em Ciência e Tecnologia pela UFMA.
							</span>
							<span>
								Na Anuntech, contribuo para o desenvolvimento do Workspace — uma
								plataforma SaaS que entrega soluções personalizadas para
								empresas, construída com Module Federation para suportar uma
								arquitetura modular e escalável.
							</span>
						</p>
					</section>
					<section id="experiences" className="flex flex-col gap-4">
						<h2 className="custom_title sticky top-0 border-border border-b border-solid bg-background py-2">
							Experiências
						</h2>
						{experiencesArray.map(({ subtitle, ...props }) => (
							<Experience key={subtitle} {...props} subtitle={subtitle} />
						))}
					</section>
					<section id="projects" className="flex flex-col gap-4">
						<h2 className="custom_title sticky top-0 border-border border-b border-solid bg-background py-2">
							Projetos
						</h2>
						{projectsArray.map(({ title, ...props }) => (
							<Project key={title} {...props} title={title} />
						))}
					</section>
					<section id="education" className="flex flex-col gap-4">
						<h2 className="custom_title sticky top-0 border-border border-b border-solid bg-background py-2">
							Educação
						</h2>
						{educationArray.map(({ title, ...props }) => (
							<Experience key={title} {...props} title={title} />
						))}
					</section>
				</div>
			</main>
		</div>
	);
};

export default Home;
