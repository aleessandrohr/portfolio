import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { openGraphConfig } from '@/configs/open-graph'
import { educations } from '@/constants/educations'
import { profile } from '@/constants/profile'
import { seoKeywords, seoTopics } from '@/constants/seo'
import { ThemeProvider } from '@/providers/theme'

const inter = Inter({ subsets: ['latin'] })
const mono = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
	display: 'swap',
})
const siteUrl = profile.siteUrl
const title = `${profile.fullName} | ${profile.role}`
const description = profile.seoDescription

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: title,
		template: `%s | ${profile.fullName}`,
	},
	description,
	applicationName: `Portfólio de ${profile.fullName}`,
	authors: [{ name: profile.fullName, url: siteUrl }],
	creator: profile.fullName,
	publisher: profile.fullName,
	keywords: seoKeywords,
	icons: {
		icon: [{ url: '/icon.svg', type: 'image/svg+xml', sizes: 'any' }],
	},
	category: 'technology',
	classification: 'Portfólio profissional de desenvolvimento de software',
	alternates: {
		canonical: '/',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
			'max-video-preview': -1,
		},
	},
	openGraph: {
		title,
		description,
		url: '/',
		siteName: `Portfólio de ${profile.fullName}`,
		locale: 'pt_BR',
		type: 'profile',
		images: [
			{
				url: '/opengraph-image',
				...openGraphConfig.size,
				alt: `${profile.fullName}, ${profile.role}`,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title,
		description,
		images: ['/opengraph-image'],
	},
}

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#f9f9f9' },
		{ media: '(prefers-color-scheme: dark)', color: '#131313' },
	],
}

const personJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: profile.fullName,
	url: siteUrl,
	jobTitle: profile.role,
	description,
	image: `${siteUrl}/opengraph-image`,
	alumniOf: {
		'@type': 'CollegeOrUniversity',
		name: educations.ufma.institution,
	},
	sameAs: [profile.links.linkedin.href, profile.links.github.href],
	knowsAbout: seoTopics,
}

const personJsonLdString = JSON.stringify(personJsonLd).replace(/</g, '\\u003c')

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="pt-BR"
			className={`${inter.className} ${mono.variable} overflow-x-clip`}
			suppressHydrationWarning
		>
			<body className="overflow-x-clip">
				<script
					type="application/ld+json"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: The static JSON-LD is serialized locally and escaped to prevent script-tag injection.
					dangerouslySetInnerHTML={{ __html: personJsonLdString }}
				/>
				<ThemeProvider attribute="class" defaultTheme="system">
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
