import type { Experience } from './experiences'

export const education = {
	ufma: {
		start: '04/2025',
		end: '04/2028',
		title: 'Universidade Federal do Maranhão (UFMA)',
		subtitle: 'Ciência e Tecnologia',
		description: ['Graduação em Engenharia de Computação.'],
	},
} as const satisfies Record<string, Experience>
