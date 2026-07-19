export interface Experience {
	start: string
	end: string
	title: string
	subtitle: string
	description: string | Array<string>
	skills?: Array<string>
}

export const experiences = {
	anuntech: {
		start: '07/2024',
		end: '06/2026',
		title: 'Desenvolvedor Full Stack Pleno',
		subtitle: 'Anuntech | Integral | Remota | São Paulo',
		description: [
			'Atuei no desenvolvimento e manutenção do Workspace, plataforma SaaS corporativa com arquitetura de micro frontends em React.js e Module Federation, integrada a microsserviços em Node.js e PostgreSQL.',
			'Implementei o módulo Bookmarks, principal ferramenta de organização do Workspace, com foco em atalhos, navegação personalizada e produtividade.',
			'Desenvolvi o módulo de notificações em tempo real com Socket.io, permitindo a comunicação de eventos entre membros conectados à plataforma.',
			'Atuei na operação da infraestrutura com Docker, Portainer, Cloudflare e Caddy.',
			'Fui promovido de Desenvolvedor Front-end Júnior para Desenvolvedor FullStack Pleno, ampliando meu escopo de atuação em produto, arquitetura e infraestrutura.',
		],
		skills: [
			'JavaScript',
			'TypeScript',
			'React.js',
			'Next.js',
			'Module Federation',
			'Node.js',
			'Fastify',
			'PostgreSQL',
			'Drizzle',
			'Socket.io',
			'Docker',
			'Portainer',
			'Cloudflare',
			'Caddy',
		],
	},
	techmmunity: {
		start: '04/2021',
		end: '06/2021',
		title: 'Desenvolvedor Front-end Júnior',
		subtitle: 'Techmmunity',
		description: [
			'Desenvolvi landing pages responsivas com React.js, Next.js e TypeScript, aplicando internacionalização (i18n) para suporte a múltiplos idiomas.',
			'Atuei sob mentoria de desenvolvedor Sênior FullStack em ambiente remoto, desenvolvendo boas práticas de componentes e estrutura de projeto.',
		],
		skills: ['JavaScript', 'TypeScript', 'React.js', 'Next.js', 'i18n'],
	},
} as const satisfies Record<string, Experience>
