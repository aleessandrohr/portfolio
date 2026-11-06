import type { MenuItem } from '@/types/menu-item'

export const menuItems = [
	{
		href: '#about',
		value: 'Sobre',
	},
	{
		href: '#projects',
		value: 'Projetos',
	},
	{
		href: '#experiences',
		value: 'Experiência',
	},
	{
		href: '#education',
		value: 'Educação',
	},
	{
		href: '#contact',
		value: 'Contato',
	},
] as const satisfies ReadonlyArray<MenuItem>
