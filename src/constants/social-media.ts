import { profile } from '@/constants/profile'
import type { SocialMedia } from '@/types/social-media'

export const socialMedia = {
	linkedin: {
		href: profile.links.linkedin.href,
		name: 'LinkedIn',
		icon: 'linkedin',
	},
	github: {
		href: profile.links.github.href,
		name: 'Github',
		icon: 'github',
	},
	email: {
		href: `mailto:${profile.email}`,
		name: 'E-mail',
		icon: 'mail',
	},
} as const satisfies Record<string, SocialMedia>
