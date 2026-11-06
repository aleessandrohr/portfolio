import type { Project } from '@/types/project'

export const projects = {
	workspace: {
		id: 'workspace',
		title: 'Workspace Anuntech',
		category: 'Plataforma SaaS corporativa',
		description:
			'Arquitetura modular com Module Federation, tendo o módulo de bookmarks como principal ferramenta de produtividade.',
		featured: true,
		kind: 'profissional',
	},
	'digitaliza-ai': {
		id: 'digitaliza-ai',
		title: 'Digitaliza Aí',
		category: 'Hackathon · MVP',
		description:
			'MVP desenvolvido com IA em 4 dias durante hackathon da EQT LAB, conquistando o 5º lugar entre 11 equipes.',
		featured: true,
		kind: 'hackathon',
	},
	'in.orbit': {
		id: 'inorbit',
		title: 'in.orbit',
		category: 'Produtividade pessoal',
		description: 'Aplicação web para rastreamento de metas e hábitos semanais.',
		featured: false,
		kind: 'pessoal',
		imageUrl: '/static/assets/in-orbit.png',
		websiteUrl: 'https://inorbit.aleessandrohr.dev.br',
		demoUrl: 'https://inorbit.aleessandrohr.dev.br/demo',
	},
	letmeask: {
		id: 'letmeask',
		title: 'Letmeask',
		category: 'Comunidade e interação',
		description:
			'Aplicação web para criação e gestão de salas de perguntas e respostas em tempo real.',
		featured: false,
		kind: 'pessoal',
		imageUrl: '/static/assets/letmeask.png',
		websiteUrl: 'https://letmeask.aleessandrohr.dev.br',
	},
} as const satisfies Record<string, Project>
