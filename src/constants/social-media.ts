import type { DynamicIconImports } from '@/components/icon'

interface SocialMedia {
	href: string
	name: string
	icon: DynamicIconImports
}

export const socialMedia = {
	linkedin: {
		href: 'https://www.linkedin.com/in/aleessandrohr/',
		name: 'LinkedIn',
		icon: 'linkedin',
	},
	github: {
		href: 'https://github.com/aleessandrohr',
		name: 'Github',
		icon: 'github',
	},
	cal: {
		href: 'https://cal.com/aleessandrohr',
		name: 'Reunião',
		icon: 'calendar-clock',
	},
} as const satisfies Record<string, SocialMedia>
