import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Props = { href: string }

export const DownloadButton = ({ href }: Props) => (
	<Button
		asChild
		className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90"
	>
		<a href={href} download>
			<Download className="mr-2 h-4 w-4" aria-hidden="true" />
			Baixar PDF
		</a>
	</Button>
)
