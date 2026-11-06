import type { ReactNode } from 'react'

type Props = { id: string; title: string; children: ReactNode }

export const Section = ({ id, title, children }: Props) => (
	<section aria-labelledby={id} className="mt-12 print:mt-5">
		<h2
			id={id}
			className="font-semibold text-2xl tracking-tight print:break-after-avoid print:border-brand/60 print:border-b print:pb-1 print:text-brand print:text-lg"
		>
			{title}
		</h2>
		<div className="mt-5 print:mt-2">{children}</div>
	</section>
)
