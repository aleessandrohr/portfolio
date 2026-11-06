import type { Education } from '@/types/education'

export const educations = {
	ufma: {
		course: 'Engenharia da Computação',
		institution: 'Universidade Federal do Maranhão (UFMA)',
		start: '04/2025',
		end: '06/2028',
		description: 'Em andamento, com conclusão prevista para 04/2028.',
	},
} as const satisfies Record<string, Education>
