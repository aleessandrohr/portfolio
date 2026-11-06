'use client'

import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
	title: string
	demoUrl: string
}

export const Iframe = ({ title, demoUrl }: Props) => {
	const [loading, setLoading] = useState(true)

	return (
		<div className="relative h-full w-full overflow-hidden rounded-lg border border-border bg-background">
			{loading && (
				<Skeleton className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-none bg-muted/80">
					<span className="h-9 w-9 animate-spin rounded-full border-2 border-brand/20 border-t-brand" />
					<div className="text-center">
						<p className="font-medium text-foreground text-sm">
							Preparando demonstração
						</p>
						<p className="mt-1 text-muted-foreground text-xs">
							Carregando {title}
						</p>
					</div>
				</Skeleton>
			)}
			<iframe
				src={demoUrl}
				title={title}
				className={`h-full w-full border-0 transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
				loading="lazy"
				onLoad={() => setLoading(false)}
			/>
		</div>
	)
}
