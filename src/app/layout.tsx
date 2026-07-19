import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/theme'

const inter = Inter({ subsets: ['latin'] })
const siteUrl = 'https://aleessandrohr.dev.br'
const title = 'Alessandro Henrique Ramos | Desenvolvedor Full Stack Pleno'
const description =
	'Desenvolvedor Full Stack Pleno com experiência em TypeScript, React.js, Next.js, Node.js, micro frontends, Module Federation, microsserviços e Docker. Graduando em Engenharia da Computação pela UFMA.'

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: title,
		template: '%s | Alessandro Henrique Ramos',
	},
	description,
	applicationName: 'Portfólio de Alessandro Henrique Ramos',
	authors: [{ name: 'Alessandro Henrique Ramos', url: siteUrl }],
	creator: 'Alessandro Henrique Ramos',
	publisher: 'Alessandro Henrique Ramos',
	keywords: [
		'Desenvolvedor Full Stack',
		'TypeScript',
		'React.js',
		'Next.js',
		'Node.js',
		'Micro Frontends',
		'Module Federation',
		'Docker',
		'Desenvolvedor São Luís',
		'Portfólio desenvolvedor',
	],
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
		siteName: 'Portfólio de Alessandro Henrique Ramos',
		locale: 'pt_BR',
		type: 'profile',
		images: [
			{
				url: '/opengraph-image',
				width: 2400,
				height: 1260,
				alt: 'Alessandro Henrique Ramos, Desenvolvedor Full Stack Pleno',
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
		{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
		{ media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
	],
}

const personJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: 'Alessandro Henrique Ramos',
	url: siteUrl,
	jobTitle: 'Desenvolvedor Full Stack Pleno',
	description,
	image: `${siteUrl}/opengraph-image`,
	sameAs: [
		'https://www.linkedin.com/in/aleessandrohr/',
		'https://github.com/aleessandrohr',
	],
	knowsAbout: [
		'TypeScript',
		'React.js',
		'Next.js',
		'Node.js',
		'Module Federation',
		'Docker',
	],
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR" className={inter.className}>
			<body>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
				/>
				<ThemeProvider attribute="class" defaultTheme="system">
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
