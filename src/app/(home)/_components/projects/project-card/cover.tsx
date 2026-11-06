import { Code2, Layers, type LucideIcon, Trophy } from 'lucide-react'
import Image from 'next/image'
import type { ProjectKind } from '@/types/project'

type Props = {
	title: string
	kind: ProjectKind
	imageUrl?: string
}

const kindIcons = {
	profissional: Layers,
	hackathon: Trophy,
	pessoal: Code2,
} as const satisfies Record<ProjectKind, LucideIcon>

const frameClassName =
	'relative flex h-36 items-center justify-center overflow-hidden rounded-sm border border-border/80'

/** Print do projeto; sem print, um fundo neutro com o ícone do tipo de projeto. */
export const Cover = ({ title, kind, imageUrl }: Props) => {
	if (imageUrl) {
		return (
			<div className={frameClassName}>
				<Image
					src={imageUrl}
					fill
					alt={title}
					sizes="(min-width: 1024px) 300px, (min-width: 640px) 340px, 85vw"
					className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
				/>
			</div>
		)
	}

	const KindIcon = kindIcons[kind]

	return (
		<div
			className={`${frameClassName} bg-gradient-to-br from-brand/15 via-muted/40 to-muted/10`}
			aria-hidden="true"
		>
			<KindIcon className="h-10 w-10 text-brand/70" strokeWidth={1.5} />
		</div>
	)
}
