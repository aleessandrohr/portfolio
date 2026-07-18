export interface Project {
	imageUrl: string
	title: string
	description: string
	links: Array<string>
	iframeUrl?: string
}

export const projects = {
	'in.orbit': {
		imageUrl: '/static/assets/in-orbit.png',
		title: 'in.orbit',
		description:
			'Adicione atividades que te fazem bem e que você quer continuar praticando toda semana.',
		links: ['https://inorbit.aleessandrohr.dev.br'],
		iframeUrl: 'https://inorbit.aleessandrohr.dev.br',
	},
	letmeask: {
		imageUrl: '/static/assets/letmeask.png',
		title: 'Letmeask',
		description:
			'Letmeask é perfeito para criadores de conteúdos poderem criar salas de Q&A com o seu público, de uma forma muito organizada e democrática.',
		links: ['https://letmeask.aleessandrohr.dev.br'],
		iframeUrl: 'https://letmeask.aleessandrohr.dev.br',
	},
	coldCraft: {
		imageUrl: '/static/assets/cold-craft.png',
		title: 'Cold Craft',
		description: 'Se cadastre no ColdCraft Summit 2025.',
		links: ['https://coldcraft.aleessandrohr.dev.br'],
		iframeUrl: 'https://coldcraft.aleessandrohr.dev.br',
	},
	githubClone: {
		imageUrl: '/static/assets/github-clone.png',
		title: 'Github Clone',
		description: 'Clone do Github escrito em TypeScript e React',
		links: ['https://githubclone.aleessandrohr.dev.br'],
		iframeUrl: 'https://githubclone.aleessandrohr.dev.br',
	},

	netflixCopy: {
		imageUrl: '/static/assets/netflix-copy.png',
		title: 'Netflix Copy',
		description:
			'Uma cópia da interface do Netflix escrito em JavaScript e React.',
		links: ['https://netflixcopy.aleessandrohr.dev.br'],
		iframeUrl: 'https://netflixcopy.aleessandrohr.dev.br',
	},
	// stopWatch: {
	// 	imageUrl: "/static/assets/stop-watch.png",
	// 	title: "Stop Watch",
	// 	description: "Um cronômetro simples escrito em TypeScript e React.",
	// 	links: ["https://stopwatch.aleessandrohr.dev.br"],
	// 	iframeUrl: "https://stopwatch.aleessandrohr.dev.br",
	// },
	// myFirstGameWithCanvas: {
	// 	imageUrl: "/static/assets/my-first-game-with-canvas.png",
	// 	title: "My First Game With Canvas",
	// 	description: "Um jogo simples escrito em TypeScript e Canvas.",
	// 	links: ["https://game.aleessandrohr.dev.br"],
	// 	iframeUrl: "https://game.aleessandrohr.dev.br",
	// },
	techmmunityLandingPage: {
		imageUrl: '/static/assets/techmmunity-landing-page.png',
		title: 'Techmmunity | Landing Page',
		description: 'A Landing Page.',
		links: ['https://techmmunity.github.io'],
		iframeUrl: 'https://techmmunity.github.io',
	},
} as const satisfies Record<string, Project>
