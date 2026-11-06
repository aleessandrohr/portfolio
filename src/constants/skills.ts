import type { SkillGroup } from '@/types/skill'

export const skills = {
	languages: { category: 'Linguagens', items: ['TypeScript', 'JavaScript', 'Python'] },
	frontend: {
		category: 'Front-end',
		items: ['React.js', 'Next.js', 'Module Federation'],
	},
	backend: {
		category: 'Back-end',
		items: ['Node.js', 'Express.js', 'Fastify', 'Prisma ORM', 'Drizzle ORM'],
	},
	Mobile: {
		category: 'Mobile',
		items: ['React Native', 'Expo'],
	},
	database: { category: 'Banco de Dados', items: ['PostgreSQL', 'MongoDB'] },
	devops: {
		category: 'Infra & DevOps',
		items: ['Docker', 'Portainer', 'Cloudflare', 'Caddy'],
	},
	ai: {
		category: 'IA',
		items: ['Claude Code', 'Codex', 'Antigravity', 'Google AI Studio'],
	},
	other: { category: 'Outros', items: ['Git', 'i18n', 'Socket.io'] },
} as const satisfies Record<string, SkillGroup>
