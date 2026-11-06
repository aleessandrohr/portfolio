import { ArrowUpRight, Linkedin, Mail, MapPin, Send } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { Profile } from '@/types/profile'
import { PixelGrid } from './pixel-grid'

type Props = { profile: Profile }

type Item = { label: string; value: string; icon: typeof Mail; href?: string }

const buildItems = (profile: Profile): Array<Item> => [
	{
		label: 'E-mail',
		value: profile.email,
		icon: Mail,
		href: `mailto:${profile.email}`,
	},
	{
		label: 'LinkedIn',
		value: profile.links.linkedin.label,
		icon: Linkedin,
		href: profile.links.linkedin.href,
	},
	{ label: 'Localização', value: profile.location, icon: MapPin },
]

export const Contact = ({ profile }: Props) => (
	<section
		data-reveal
		id="contact"
		aria-labelledby="contact-title"
		className="scroll-mt-28 border-border/70 border-t py-12"
	>
		<h2
			id="contact-title"
			className="mb-6 font-semibold text-2xl tracking-tight"
		>
			Contato
		</h2>
		<div className="relative rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm sm:p-8 dark:shadow-none">
			<Link
				href={profile.links.github.href}
				target="_blank"
				rel="noopener noreferrer"
				className="group inline-flex max-w-full items-center gap-3 font-medium font-mono text-[13px] leading-5 transition-colors hover:text-brand"
			>
				<Image
					src={profile.photo.src}
					alt=""
					width={32}
					height={32}
					className="h-8 w-8 shrink-0 rounded-full border border-border/70 object-cover object-[50%_25%]"
				/>
				<span className="min-w-0 break-all">{profile.links.github.label}</span>
				<span className="sr-only">(abre em nova aba)</span>
				<ArrowUpRight
					className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand"
					aria-hidden="true"
				/>
			</Link>
			<PixelGrid className="mt-6" gapClassName="gap-[2px]" />
			<div className="mt-8 flex flex-col items-center gap-5 text-center">
				<div>
					<p className="font-semibold text-lg">{profile.fullName}</p>
					<p className="mt-1 text-muted-foreground text-sm">{profile.role}</p>
				</div>
				<dl className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
					{buildItems(profile).map(({ label, value, icon: Icon, href }) => (
						<div key={label} className="flex items-center gap-2">
							<dt className="sr-only">{label}</dt>
							<Icon
								className="h-4 w-4 shrink-0 text-brand"
								aria-hidden="true"
							/>
							<dd>
								{href ? (
									<Link
										href={href}
										target={href.startsWith('mailto:') ? undefined : '_blank'}
										rel="noopener noreferrer"
										className="transition-colors hover:text-brand"
									>
										{value}
										{!href.startsWith('mailto:') && (
											<>
												<span className="sr-only">(abre em nova aba)</span>
												<ArrowUpRight
													className="ml-1 inline h-3.5 w-3.5 text-muted-foreground"
													aria-hidden="true"
												/>
											</>
										)}
									</Link>
								) : (
									value
								)}
							</dd>
						</div>
					))}
				</dl>
				<Button
					asChild
					className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90"
				>
					<Link href={`mailto:${profile.email}`}>
						Enviar e-mail
						<Send className="ml-2 h-4 w-4" aria-hidden="true" />
					</Link>
				</Button>
			</div>
		</div>
	</section>
)
