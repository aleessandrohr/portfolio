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
		title: "Desenvolvedor Front-end Pleno",
		subtitle: "Anuntech | Integral | Remota",
		description: [
			"Em 2025, após um breve intervalo dedicado ao Exame Nacional do Ensino Médio (ENEM), iniciei minha graduação em Ciência e Tecnologia na Universidade Federal do Maranhão (UFMA) e, nesse período, retornei à Anuntech. Essa experiência tem ampliado meus conhecimentos técnicos e, sobretudo, minhas habilidades de trabalho em equipe — essenciais para o desenvolvimento e a entrega de projetos reais em ambiente de produção.",
			"Entre esses projetos, destaca-se o Workspace, um aplicativo corporativo desenvolvido para centralizar ferramentas essenciais à gestão empresarial e ao dia a dia dos colaboradores. O app integra diversas outras soluções desenvolvidas pela Anuntech, como o Finexa, voltado à análise financeira corporativa, e o Bookmarks, voltado para a organização do Workspace através de atalhos e espaços.",
			"Atualmente, atuo como Desenvolvedor Front‑end, contribuindo para o aprimoramento do Workspace, o desenvolvimento do Finexa, que oferece recursos de extratos e dashboards, proporcionando uma visão ampla e estratégica das finanças empresariais, e o Bookmarks com gerenciamento de atalhos  e pastas que são integrados ao Workspace via Module Federation.",
		],
		skills: [
			"Desenvolvimento web",
			"Desenvolvimento de front-end",
			"JavaScript",
			"TypeScript",
			"React.js",
			"Next.js",
			"Vite",
			"Tailwind CSS",
			"Biome",
			"Module Federation",
		],
	},
	anuntech: {
		start: "07/2024",
		end: "08/2024",
		title: "Desenvolvedor Front-end",
		subtitle: "Anuntech | Meio período | Remota",
		description:
			"Na Anuntech, iniciei minha trajetória como Desenvolvedor Front-end, aplicando meus conhecimentos e explorando novas tecnologias em um ambiente colaborativo e dinâmico. Essa experiência foi essencial para o meu crescimento profissional, permitindo-me aprimorar habilidades em JavaScript, TypeScript, React e Next.js, além de adquirir novos conhecimentos em tecnologias como Golang, Templ e HTMX. Trabalhar em um ambiente profissional consolidou minha base técnica e acelerou meu desenvolvimento prático na criação de aplicações reais, escaláveis e desenvolvidas de forma colaborativa.",
		skills: [
			"Desenvolvimento web",
			"Desenvolvimento de front-end",
			"JavaScript",
			"TypeScript",
			"React.js",
			"Next.js",
			"Tailwind CSS",
			"ESLint",
			"Golang",
			"Templ",
			"HTMX",
		],
	},
	techmmunity: {
		start: "04/2021",
		end: "06/2024",
		title: "Desenvolvedor Front-end",
		subtitle: "Techmmunity | Aprendiz | Remota",
		description:
			"Na Anuntech, iniciei minha trajetória como Desenvolvedor Front-end, aplicando meus conhecimentos e explorando novas tecnologias em um ambiente colaborativo e dinâmico. Essa experiência foi essencial para o meu crescimento profissional, permitindo-me aprimorar habilidades em JavaScript, TypeScript, React e Next.js, além de adquirir novos conhecimentos em tecnologias como Golang, Templ e HTMX. Trabalhar em um ambiente profissional consolidou minha base técnica e acelerou meu desenvolvimento prático na criação de aplicações reais, escaláveis e desenvolvidas de forma colaborativa.",
		skills: [
			"Desenvolvimento web",
			"Desenvolvimento de front-end",
			"JavaScript",
			"TypeScript",
			"React.js",
			"Next.js",
			"Styled-components",
			"ESLint",
			"i18n",
		],
	},
} as const satisfies Record<string, Experience>;
