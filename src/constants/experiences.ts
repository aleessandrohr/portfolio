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
			"Atuo no desenvolvimento do Workspace, um aplicativo corporativo que centraliza ferramentas de gestão empresarial e integra soluções desenvolvidas pela Anuntech. A plataforma é construída com Module Federation, permitindo que cada solução seja desenvolvida e entregue de forma independente dentro do ecossistema.",
			"Entre essas soluções, contribuo para o Bookmarks — que organiza o Workspace através de atalhos e pastas personalizáveis, integrando-se diretamente ao ambiente dos colaboradores.",
			"Além do crescimento técnico em front-end, back-end e infraestrutura, esse ambiente tem desenvolvido minha capacidade de tomar decisões de arquitetura, comunicar soluções e atuar com autonomia em um produto com clientes ativos.",
		],
		skills: [
			"JavaScript",
			"TypeScript",
			"React.js",
			"Next.js",
			"Module Federation",
			"Node.js",
			"PostgreSQL",
			"Docker",
		],
	},
	anuntech: {
		start: "07/2024",
		end: "08/2024",
		title: "Desenvolvedor Front-end Júnior",
		subtitle: "Anuntech | Meio período | Remota",
		description: [
			"Iniciei minha trajetória profissional na Anuntech como Desenvolvedor Front-end Júnior, atuando em um ambiente colaborativo que acelerou minha evolução técnica de forma prática.",
			"Nesse período, aprofundei meus conhecimentos em JavaScript, TypeScript, React e Next.js, e explorei tecnologias como Golang, Templ e HTMX — expandindo minha visão além do front-end desde o início da carreira.",
		],
		skills: [
			"JavaScript",
			"TypeScript",
			"React.js",
			"Next.js",
			"Golang",
			"Templ",
			"HTMX",
		],
	},
	techmmunity: {
		start: "04/2021",
		end: "06/2021",
		title: "Desenvolvedor Front-end Júnior",
		subtitle: "Techmmunity | Aprendiz | Remota",
		description:
			"Primeiro contato profissional com desenvolvimento web. Com orientação de um desenvolvedor sênior fullstack, apliquei JavaScript, TypeScript, React e Next.js desenvolvendo landing pages.",
		skills: ["JavaScript", "TypeScript", "React.js", "Next.js", "i18n"],
	},
} as const satisfies Record<string, Experience>;
