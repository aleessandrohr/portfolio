import {
	Github,
	Linkedin,
	type LucideIcon,
	type LucideProps,
	Mail,
} from 'lucide-react'

const icons = {
	github: Github,
	linkedin: Linkedin,
	mail: Mail,
} as const satisfies Record<string, LucideIcon>

export type IconName = keyof typeof icons

type Props = LucideProps & { name: IconName }

export const Icon = ({ name, ...props }: Props) => {
	const Component = icons[name]

	return <Component {...props} />
}
