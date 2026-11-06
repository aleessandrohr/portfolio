import { ArrowUp } from 'lucide-react'
import Link from 'next/link'
import type { Profile } from '@/types/profile'

type Props = { profile: Profile }

export const Footer = ({ profile }: Props) => (
	<footer className="mx-auto flex max-w-5xl items-center justify-between gap-4 border-border/70 border-t px-5 py-6 text-muted-foreground text-sm sm:px-8">
		<p>
			© {new Date().getFullYear()} {profile.fullName}
		</p>
		<Link
			href="#home"
			className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-brand"
		>
			Voltar ao topo
			<ArrowUp className="h-4 w-4" aria-hidden="true" />
		</Link>
	</footer>
)
