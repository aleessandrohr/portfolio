'use client'

import { useState } from 'react'
import { Loading } from '@/components/ui/loading'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
	title: string
	iframeUrl?: string
}

export const Iframe = ({ title, iframeUrl }: Props) => {
	const [loading, setLoading] = useState(true)

	return (
		<>
			{loading && (
				<Skeleton className="z-index-0 flex h-full w-full items-center justify-center rounded-lg shadow-lg">
					<Loading>Carregando</Loading>
				</Skeleton>
			)}
			<iframe
				src={iframeUrl}
				title={title}
				className="absolute top-0 right-0 bottom-0 left-0 z-index-40 h-full w-full rounded-lg"
				loading="lazy"
				onLoad={() => setLoading(false)}
			/>
		</>
	)
}
