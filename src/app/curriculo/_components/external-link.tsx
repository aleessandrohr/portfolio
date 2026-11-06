import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export const ExternalLink = ({
	children,
	className,
	...props
}: Omit<ComponentProps<'a'>, 'target' | 'rel'>) => (
	<a
		{...props}
		target="_blank"
		rel="noopener noreferrer"
		className={cn(
			'underline-offset-4 hover:text-brand hover:underline',
			className
		)}
	>
		{children}
		<span className="sr-only"> (abre em nova aba)</span>
	</a>
)
