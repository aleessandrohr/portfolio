import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Icon } from '@/components/icon'
import { TerminalLink } from '@/components/terminal-link'
import { TerminalText } from '@/components/terminal-text'
import { Button } from '@/components/ui/button'
import { terminalNavigation, terminalResume } from '@/configs/terminal'
import type { Profile } from '@/types/profile'
import type { SocialMedia } from '@/types/social-media'
import { getOpenCommand } from '@/utils/terminal-commands'
import { PixelGrid } from '../pixel-grid'
import { CommandLine } from './command-line'
import { LetterReveal } from './letter-reveal'

type Props = { profile: Profile; socialMedia: ReadonlyArray<SocialMedia> }

export const Hero = ({ profile, socialMedia }: Props) => {
	const [firstName, ...lastName] = profile.displayName.split(' ')

	return (
		<section
			id="home"
			aria-labelledby="hero-title"
			className="relative flex min-h-[calc(100svh_-_var(--site-header-height)_-_var(--site-header-offset))] scroll-mt-28 flex-col justify-center py-12 sm:py-16"
		>
			<div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
				<PixelGrid
					className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 scale-[1.9] opacity-[0.10] blur-[2px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_78%)] md:scale-100 md:opacity-[0.07] md:blur-[3px] dark:opacity-[0.2] md:dark:opacity-[0.14]"
					gapClassName="gap-1"
				/>
			</div>
			<div className="grid min-w-0 items-center gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
				<div className="min-w-0">
					<div className="hero-intro relative mb-5 h-20 w-20 [--hero-intro-step:1] md:hidden">
						<span
							aria-hidden="true"
							className="absolute -inset-8 rounded-full bg-[radial-gradient(closest-side,hsl(var(--brand)/0.28),transparent)] opacity-50 dark:opacity-100"
						/>
						<Image
							src={profile.photo.src}
							alt={profile.photo.alt}
							width={80}
							height={80}
							sizes="80px"
							className="relative aspect-square h-20 w-20 rounded-full border border-brand/30 object-cover object-[50%_25%] shadow-[0_0_40px_-10px_hsl(var(--brand)/0.18)] ring-2 ring-brand/10 ring-offset-4 ring-offset-background dark:shadow-[0_0_40px_-10px_hsl(var(--brand)/0.5)]"
						/>
					</div>
					<p className="mb-3 text-lg text-muted-foreground">
						<LetterReveal text="Olá, eu sou" />
					</p>
					<h1
						id="hero-title"
						className="font-semibold text-5xl leading-[1.04] tracking-tight [--hero-intro-step:1] sm:text-6xl lg:text-7xl"
					>
						<LetterReveal text={firstName} />
						<br />
						<span className="text-brand">
							<LetterReveal
								text={lastName.join(' ')}
								offset={firstName.length + 1}
							/>
						</span>
					</h1>
					<div className="mt-5">
						<p className="font-semibold text-xl tracking-tight [--hero-intro-step:2] sm:text-2xl">
							<LetterReveal text={profile.role} />
						</p>
						<p className="hero-intro mt-4 max-w-xl text-base text-muted-foreground leading-relaxed [--hero-intro-step:2]">
							{profile.heroPhrase}
						</p>
					</div>
					<div className="hero-intro mt-7 [--hero-intro-step:3]">
						<div className="flex flex-wrap gap-3">
							<Button
								asChild
								className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90"
							>
								<TerminalLink
									command={terminalNavigation.projects.command}
									href={terminalNavigation.projects.href}
								>
									<TerminalText command={terminalNavigation.projects.command}>
										Ver projetos
									</TerminalText>
									<ArrowRight className="ml-2 h-4 w-4" />
								</TerminalLink>
							</Button>
							<Button asChild variant="outline" className="rounded-full">
								<TerminalLink
									command={terminalResume.command}
									href={terminalResume.href}
								>
									<TerminalText command={terminalResume.command}>
										{terminalResume.label}
									</TerminalText>
									<ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
								</TerminalLink>
							</Button>
						</div>
						<div className="mt-5 flex items-center gap-1">
							{socialMedia.map(item => (
								<Button
									key={item.name}
									asChild
									variant="ghost"
									size="icon"
									className="rounded-full text-muted-foreground hover:text-brand"
								>
									<TerminalLink
										command={getOpenCommand(
											item.href.startsWith('mailto:') ? 'email' : item.icon
										)}
										href={item.href}
										target={
											item.href.startsWith('mailto:') ? undefined : '_blank'
										}
										rel="noopener noreferrer"
										aria-label={
											item.href.startsWith('mailto:')
												? item.name
												: `${item.name} (abre em nova aba)`
										}
										title={item.name}
									>
										<Icon name={item.icon} className="h-5 w-5" />
									</TerminalLink>
								</Button>
							))}
						</div>
						<CommandLine />
					</div>
				</div>
				<div className="hero-intro relative mx-auto hidden w-full max-w-72 [--hero-intro-step:1] before:absolute before:-inset-6 before:bg-[radial-gradient(circle,hsl(var(--brand)/0.12),transparent_70%)] before:opacity-50 before:content-[''] after:absolute after:-top-4 after:-right-4 after:h-24 after:w-24 after:bg-[length:12px_12px] after:bg-[radial-gradient(hsl(var(--brand)/0.4)_1px,transparent_1px)] after:content-[''] md:block dark:before:opacity-100">
					<span
						aria-hidden="true"
						className="absolute -inset-20 -z-10 rounded-full bg-[radial-gradient(closest-side,hsl(var(--brand)/0.28),transparent)] opacity-50 dark:opacity-100"
					/>
					<Image
						src={profile.photo.src}
						alt={profile.photo.alt}
						width={320}
						height={320}
						priority
						sizes="288px"
						className="relative z-10 aspect-square rounded-full border border-brand/30 object-cover object-[50%_25%] shadow-[0_0_70px_-12px_hsl(var(--brand)/0.18)] ring-4 ring-brand/10 ring-offset-8 ring-offset-background dark:shadow-[0_0_70px_-12px_hsl(var(--brand)/0.5)]"
					/>
				</div>
			</div>
		</section>
	)
}
