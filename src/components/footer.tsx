import { ArrowUp } from 'lucide-react'
import { TerminalLink } from '@/components/terminal-link'
import { TerminalText } from '@/components/terminal-text'
import { terminalNavigation } from '@/configs/terminal'
import type { Profile } from '@/types/profile'

type Props = { profile: Profile }

export const Footer = ({ profile }: Props) => (
	<footer className="mx-auto flex max-w-5xl items-center justify-between gap-4 border-border/70 border-t px-5 py-6 text-muted-foreground text-sm sm:px-8">
		<p>
			© {new Date().getFullYear()} {profile.fullName}
		</p>
		<TerminalLink
			command={terminalNavigation.home.command}
			href={terminalNavigation.home.href}
			className="inline-flex shrink-0 items-center gap-1.5 font-medium transition-colors hover:text-brand"
		>
			<TerminalText command={terminalNavigation.home.command}>
				Voltar ao topo
			</TerminalText>
			<ArrowUp className="h-4 w-4" aria-hidden="true" />
		</TerminalLink>
	</footer>
)
