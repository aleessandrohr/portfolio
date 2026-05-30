export interface Experience {
	start: string;
	end: string;
	title: string;
	subtitle: string;
	description: string | Array<string>;
	skills?: Array<string>;
}

export const experiences = {
	anuntechv2: {
		start: "01/2025",
		end: "Presente",
		title: "Desenvolvedor FullStack Pleno",
		subtitle: "Anuntech | Integral | Remota",
		description: [
			"Desenvolvo e mantenho o Workspace, plataforma SaaS corporativa construída com React.js, Vite e Module Federation, suportando múltiplos micro frontends independentes.",
			"Implementei o módulo Bookmarks, focado em organização, atalhos e navegação personalizada dentro da plataforma.",
			"Participo de decisões de arquitetura, manutenção da base de código e evolução contínua do ecossistema.",
			"Gerencio infraestrutura de containers com Docker e Portainer, configuração de DNS via Cloudflare e proxy reverso com Caddy.",
		],
		skills: [
			"JavaScript",
			"TypeScript",
			"React.js",
			"Next.js",
			"Vite",
			"Context API",
			"React Query",
			"TanStack Router",
			"Tailwind CSS",
			"Module Federation",
			"Node.js",
			"Fastify",
			"PostgreSQL",
			"Drizzle",
			"Docker",
			"Portainer",
			"Cloudflare",
			"Caddy",
		],
	},
	anuntech: {
		start: "07/2024",
		end: "12/2024",
		title: "Desenvolvedor Front-end Júnior",
		subtitle: "Anuntech | Meio período | Remota",
		description: [
			"Iniciei minha trajetória profissional na Anuntech como Desenvolvedor Front-end Júnior, trabalhando com interfaces e evolução de features em um ambiente colaborativo.",
			"Nesse período, aprofundei meus conhecimentos em JavaScript, TypeScript, React e Next.js, desenvolvendo interfaces e evoluindo minha base em front-end.",
			"Também tive contato com tecnologias como Golang, Templ e HTMX, ampliando minha visão além do ecossistema principal da stack.",
		],
		skills: [
			"JavaScript",
			"TypeScript",
			"React.js",
			"Next.js",
			"Templ",
			"HTMX",
			"Golang",
		],
	},
	techmmunity: {
		start: "04/2021",
		end: "06/2021",
		title: "Desenvolvedor Front-end Júnior",
		subtitle: "Techmmunity",
		description:
			["Desenvolvi landing pages responsivas com React.js, Next.js e TypeScript, aplicando internacionalização (i18n) para suporte a múltiplos idiomas.",
			"Atuei sob mentoria de desenvolvedor Sênior FullStack em ambiente remoto, desenvolvendo boas práticas de componentes e estrutura de projeto."],
		skills: ["JavaScript", "TypeScript", "React.js", "Next.js", "i18n"],
	},
} as const satisfies Record<string, Experience>;
