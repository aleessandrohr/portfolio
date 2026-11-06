import type { Profile } from '@/types/profile'

export const profile = {
	displayName: 'Alessandro H. Ramos',
	photo: {
		src: '/static/assets/profile.png',
		alt: 'Foto de Alessandro Ramos',
	},
	fullName: 'Alessandro Henrique Ramos',
	role: 'Desenvolvedor Full Stack Pleno',
	location: 'São Luís, Maranhão, Brasil',
	email: 'alessandro.henri.r@gmail.com',
	siteUrl: 'https://aleessandrohr.dev.br',
	heroPhrase:
		'Desenvolvo aplicações com TypeScript, React.js e Node.js, com atuação em arquitetura de sistemas, infraestrutura e soluções com IA.',
	summary:
		'Desenvolvedor Full Stack Pleno com atuação em TypeScript, especializado em front-end com React.js e Next.js e back-end com Node.js e PostgreSQL. Experiência no desenvolvimento de software com arquitetura de micro frontends em Module Federation, integração com microsserviços, atuação em infraestrutura e soluções com IA. Graduando em Engenharia da Computação pela UFMA.',
	seoDescription:
		'Desenvolvedor Full Stack Pleno com atuação em TypeScript, React.js, Next.js, Node.js e PostgreSQL, arquitetura de micro frontends em Module Federation, microsserviços, infraestrutura e soluções com IA. Graduando em Engenharia da Computação pela UFMA.',
	links: {
		linkedin: {
			label: 'linkedin.com/in/aleessandrohr',
			href: 'https://www.linkedin.com/in/aleessandrohr/',
		},
		github: {
			label: 'github.com/aleessandrohr',
			href: 'https://github.com/aleessandrohr',
		},
	},
} as const satisfies Profile
