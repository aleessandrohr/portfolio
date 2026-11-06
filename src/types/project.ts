export type ProjectKind = 'profissional' | 'hackathon' | 'pessoal'

export interface Project {
	id: string
	title: string
	description: string
	category: string
	featured: boolean
	kind: ProjectKind
	imageUrl?: string
	websiteUrl?: string
	demoUrl?: string
}
