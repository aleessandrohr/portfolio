import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { openGraphConfig } from '@/configs/open-graph'
import { educations } from '@/constants/educations'
import { profile } from '@/constants/profile'

export const alt = `${profile.displayName}, ${profile.role}`
export const size = openGraphConfig.size
export const contentType = 'image/png'

const { colors } = openGraphConfig
const [firstName, ...lastName] = profile.displayName.split(' ')
const hostname = new URL(profile.siteUrl).hostname

export default async function OpenGraphImage() {
	const [regular, semibold, mono, photo] = await Promise.all([
		readFile(join(process.cwd(), 'src/app/_assets/fonts/inter-regular.ttf')),
		readFile(join(process.cwd(), 'src/app/_assets/fonts/inter-semibold.ttf')),
		readFile(
			join(process.cwd(), 'src/app/_assets/fonts/jetbrains-mono-regular.ttf')
		),
		readFile(join(process.cwd(), 'public', profile.photo.src)),
	])

	return new ImageResponse(
		<div
			style={{
				display: 'flex',
				width: '100%',
				height: '100%',
				flexDirection: 'column',
				padding: '56px',
				background: colors.background,
				color: colors.foreground,
				fontFamily: 'Inter',
			}}
		>
			<div
				style={{
					display: 'flex',
					flex: 1,
					alignItems: 'center',
					justifyContent: 'space-between',
					gap: '48px',
					paddingBottom: '36px',
				}}
			>
				<div
					style={{ display: 'flex', flexDirection: 'column', width: '760px' }}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							fontSize: '82px',
							fontWeight: 600,
							lineHeight: 1.06,
							letterSpacing: '-4px',
						}}
					>
						<span>{firstName}</span>
						<span style={{ color: colors.brand }}>{lastName.join(' ')}</span>
					</div>
					<span
						style={{ marginTop: '22px', fontSize: '32px', fontWeight: 600 }}
					>
						{profile.role}
					</span>
					<p
						style={{
							margin: '20px 0 0',
							color: colors.muted,
							fontSize: '26px',
							lineHeight: 1.45,
						}}
					>
						{profile.heroPhrase}
					</p>
				</div>
				<div
					style={{
						display: 'flex',
						flexShrink: 0,
						padding: '8px',
						border: `2px solid ${colors.brand}`,
						borderRadius: '999px',
					}}
				>
					{/* biome-ignore lint/performance/noImgElement: ImageResponse rasteriza a imagem local, sem renderização no navegador. */}
					<img
						src={`data:image/png;base64,${photo.toString('base64')}`}
						alt={profile.photo.alt}
						width={216}
						height={216}
						style={{
							borderRadius: '999px',
							objectFit: 'cover',
							objectPosition: '50% 25%',
						}}
					/>
				</div>
			</div>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					paddingTop: '24px',
					borderTop: `1px solid ${colors.border}`,
					fontFamily: 'JetBrains Mono',
					fontSize: '20px',
					color: colors.muted,
				}}
			>
				<span>{hostname}</span>
				<span style={{ fontSize: '18px' }}>{educations.ufma.course}</span>
			</div>
		</div>,
		{
			...size,
			fonts: [
				{ name: 'Inter', data: regular, weight: 400, style: 'normal' },
				{ name: 'Inter', data: semibold, weight: 600, style: 'normal' },
				{ name: 'JetBrains Mono', data: mono, weight: 400, style: 'normal' },
			],
		}
	)
}
