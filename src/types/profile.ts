export interface ProfileLink {
	label: string
	href: string
}

export interface Profile {
	displayName: string
	photo: { src: string; alt: string }
	fullName: string
	role: string
	resumeStack: string
	resumePdfUrl: string
	location: string
	email: string
	siteUrl: string
	heroPhrase: string
	summary: string
	seoDescription: string
	links: Record<'linkedin' | 'github', ProfileLink>
}
