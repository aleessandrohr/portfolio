export interface Project {
	imageUrl: string
	title: string
	description: string
	category: string
	links: Array<string>
	iframeUrl?: string
}

export const projects = {
	'in.orbit': {
		imageUrl: '/static/assets/in-orbit.png',
		title: 'in.orbit',
		category: 'Produtividade pessoal',
		description: 'Aplicação web para rastreamento de metas e hábitos semanais.',
		links: ['https://inorbit.aleessandrohr.dev.br'],
		iframeUrl: 'https://inorbit.aleessandrohr.dev.br/demo',
	},
	letmeask: {
		imageUrl: '/static/assets/letmeask.png',
		title: 'Letmeask',
		category: 'Comunidade e interação',
		description:
			'Aplicação web para criação e gestão de salas de perguntas e respostas em tempo real.',
		links: ['https://letmeask.aleessandrohr.dev.br'],
	},
} as const satisfies Record<string, Project>
