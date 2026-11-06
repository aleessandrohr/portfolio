import { terminalNavigation } from '@/configs/terminal'
import type { MenuItem } from '@/types/menu-item'

export const menuItems = Object.values(terminalNavigation)
	.filter(item => item.href !== '#home')
	.map(item => ({
		href: item.href,
		value: item.label,
		command: item.command,
	})) satisfies ReadonlyArray<MenuItem>
