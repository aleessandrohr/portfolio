import { ArrowLeft, GraduationCap, MapPin } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Icon } from '@/components/icon'
import { educations } from '@/constants/educations'
import { experiences } from '@/constants/experiences'
import { profile } from '@/constants/profile'
import { projects } from '@/constants/projects'
import { skills } from '@/constants/skills'
import { socialMedia } from '@/constants/social-media'
import type { Experience } from '@/types/experience'
import type { Project } from '@/types/project'
import { formatPeriod, sortExperiences } from '@/utils/experience-timeline'
import { DownloadButton } from './_components/download-button'
import { ExperienceItem } from './_components/experience-item'
import { ExternalLink } from './_components/external-link'
import { Section } from './_components/section'
import { WaveDivider } from './_components/wave-divider'

export const metadata: Metadata = {
	title: { absolute: `${profile.fullName} - Currículo` },
	description: `Currículo de ${profile.fullName}, ${profile.role}.`,
	alternates: { canonical: '/curriculo' },
}

const badgeClassName =
	'whitespace-nowrap rounded-sm border border-border/60 bg-muted/50 px-2 py-0.5 font-mono text-muted-foreground text-xs leading-5'
const experienceItems: ReadonlyArray<Experience> = sortExperiences(
	Object.values(experiences)
)
const projectItems: ReadonlyArray<Project> = Object.values(projects)

export default function Resume() {
	return (
		<main
			id="main"
			className="mx-auto max-w-3xl px-5 py-8 sm:px-8 print:max-w-none print:p-0"
		>
			<div className="mb-12 flex flex-wrap items-center justify-between gap-3 print:hidden">
				<Link
					href="/"
					className="inline-flex items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-brand"
				>
					<ArrowLeft className="h-4 w-4" aria-hidden="true" />
					Voltar ao site
				</Link>
				<DownloadButton href={profile.resumePdfUrl} />
			</div>

			<header>
				<h1 className="font-semibold text-4xl tracking-tight sm:text-5xl print:text-3xl">
					{profile.fullName}
				</h1>
				<p className="mt-2 font-semibold text-brand text-xl print:mt-1 print:text-base">
					{profile.role}
				</p>
				<p className="mt-4 text-muted-foreground leading-relaxed print:mt-2 print:text-foreground print:text-xs">
					{profile.summary}
				</p>
				<WaveDivider />
				<ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm print:mt-2 print:text-xs">
					<li className="inline-flex items-center gap-2 text-muted-foreground">
						<MapPin className="h-4 w-4" aria-hidden="true" />
						{profile.location}
					</li>
					{Object.values(socialMedia).map(item => (
						<li key={item.name}>
							<ExternalLink
								href={item.href}
								className="inline-flex items-center gap-2 hover:text-brand"
							>
								<Icon name={item.icon} className="h-4 w-4" aria-hidden="true" />
								{item.href.startsWith('mailto:') ? profile.email : item.name}
							</ExternalLink>
						</li>
					))}
				</ul>
			</header>

			<Section id="resume-skills" title="Habilidades">
				<dl className="divide-y divide-border/60 print:divide-y-0">
					{Object.values(skills).map(group => (
						<div
							key={group.category}
							className="grid gap-2 py-3 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-4 print:grid-cols-[7rem_minmax(0,1fr)] print:gap-2 print:py-0.5 print:text-xs"
						>
							<dt className="font-medium text-sm print:text-xs">
								{group.category}
							</dt>
							<dd className="flex flex-wrap gap-1.5 print:block print:text-xs">
								{group.items.map(skill => (
									<span
										key={skill}
										className={`${badgeClassName} print:hidden`}
									>
										{skill}
									</span>
								))}
								<span className="hidden print:inline">
									{group.items.join(', ')}
								</span>
							</dd>
						</div>
					))}
				</dl>
			</Section>

			<Section id="resume-experience" title="Experiência">
				<div className="ml-2 space-y-8 border-border border-l pl-6 sm:pl-8 print:ml-0 print:space-y-3 print:border-0 print:pl-0">
					{experienceItems.map(item => (
						<ExperienceItem key={`${item.title}-${item.start}`} {...item} />
					))}
				</div>
			</Section>

			<Section id="resume-projects" title="Projetos">
				<ul className="space-y-3 print:space-y-1.5">
					{projectItems.map(project => (
						<li
							key={project.id}
							className="break-inside-avoid-page text-sm print:text-xs"
						>
							<p className="font-semibold">
								{project.websiteUrl ? (
									<ExternalLink href={project.websiteUrl}>
										{project.title}
									</ExternalLink>
								) : (
									project.title
								)}
								<span className="font-normal text-muted-foreground">
									{' · '}
									{project.category}
								</span>
							</p>
							<p className="mt-0.5 text-muted-foreground leading-relaxed">
								{project.description}
							</p>
						</li>
					))}
				</ul>
			</Section>

			<Section id="resume-education" title="Educação">
				{Object.values(educations).map(item => (
					<article
						key={item.course}
						className="flex break-inside-avoid-page items-center gap-4"
					>
						<span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand print:hidden">
							<GraduationCap className="h-6 w-6" aria-hidden="true" />
						</span>
						<div className="min-w-0 flex-1">
							<div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
								<h3 className="font-semibold text-lg print:text-sm">
									{item.course}
								</h3>
								<p className="shrink-0 font-mono text-[13px] text-muted-foreground tabular-nums leading-5">
									{formatPeriod(item)}
								</p>
							</div>
							<p className="mt-1 text-muted-foreground text-sm print:mt-0 print:text-xs">
								{item.institution} · {item.description}
							</p>
						</div>
					</article>
				))}
			</Section>
		</main>
	)
}
