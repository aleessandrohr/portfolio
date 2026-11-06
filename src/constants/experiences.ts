import type { Experience } from '@/types/experience'

export const experiences = {
	anuntech: {
		title: 'Desenvolvedor Full Stack Pleno',
		category: 'Tecnologia',
		organization: 'Anuntech',
		details: ['Tempo integral', 'Remoto', 'São Paulo'],
		start: '07/2024',
		end: '06/2026',
		activities: [
			'Fui promovido de Desenvolvedor Front-end Júnior para Desenvolvedor Full Stack Pleno em 01/2025, ampliando meu escopo de atuação em produto, arquitetura e infraestrutura.',
			'Atuei no desenvolvimento e manutenção do Workspace, plataforma SaaS corporativa com arquitetura modular de micro frontends em React.js e Module Federation, integrada a microsserviços em Node.js e PostgreSQL.',
			'Implementei o módulo de bookmarks, principal ferramenta de produtividade do Workspace, com foco em organização de atalhos e navegação personalizada.',
			'Desenvolvi o módulo de notificações em tempo real com Socket.io, permitindo a comunicação de eventos entre membros conectados à plataforma.',
			'Atuei na operação da infraestrutura com Docker, Portainer, Cloudflare e Caddy.',
		],
	},
	techmmunity: {
		title: 'Desenvolvedor Front-end Júnior',
		category: 'Tecnologia',
		organization: 'Techmmunity',
		start: '04/2021',
		end: '06/2021',
		activities: [
			'Desenvolvi landing pages responsivas com React.js, Next.js e TypeScript, estruturando interfaces para diferentes dispositivos.',
			'Implementei internacionalização (i18n), viabilizando suporte a múltiplos idiomas.',
		],
	},
	tutor: {
		title: 'Tutor de apoio acadêmico',
		category: 'Docência',
		organization: 'UFMA - Universidade Federal do Maranhão',
		details: ['Autônomo', 'São Luís, MA'],
		start: '09/2025',
		end: null,
		activities: [
			'Orientação e acompanhamento acadêmico individualizado, com adaptação de conteúdo, organização de estudos e suporte contínuo para favorecer aprendizado e autonomia.',
		],
	},
	subsindico: {
		title: 'Subsíndico',
		category: 'Gestão',
		organization: 'Condomínio residencial',
		details: ['São Luís, MA'],
		start: '04/2026',
		end: null,
		activities: [
			'Gestão condominial e controle financeiro, com organização das rotinas administrativas, acompanhamento de demandas e automação do envio de boletos com IA.',
		],
	},
} as const satisfies Record<string, Experience>
