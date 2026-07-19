import { ImageResponse } from 'next/og'

export const alt = 'Alessandro Henrique Ramos, Desenvolvedor Full Stack Pleno'
export const size = {
	width: 2400,
	height: 1260,
}
export const contentType = 'image/png'

export default function OpenGraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					display: 'flex',
					height: '100%',
					width: '100%',
					flexDirection: 'column',
					justifyContent: 'space-between',
					background: '#0a0a0a',
					color: '#f4f4f5',
					padding: '136px',
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
					<div
						style={{
							display: 'flex',
							height: '36px',
							width: '36px',
							borderRadius: '999px',
							background: '#3b82f6',
						}}
					/>
					<span style={{ fontSize: '48px', letterSpacing: '0.12em' }}>
						PORTFÓLIO
					</span>
				</div>

				<div style={{ display: 'flex', flexDirection: 'column', gap: '44px' }}>
					<span style={{ fontSize: '152px', fontWeight: 700, lineHeight: 1 }}>
						Alessandro Henrique Ramos
					</span>
					<span style={{ color: '#93c5fd', fontSize: '76px', fontWeight: 600 }}>
						Desenvolvedor Full Stack Pleno
					</span>
					<span style={{ color: '#d4d4d8', fontSize: '56px', lineHeight: 1.4 }}>
						TypeScript · React.js · Next.js · Node.js · Micro Frontends · Module Federation · Microsserviços · Docker
					</span>
				</div>

				<div style={{ display: 'flex', justifyContent: 'space-between', color: '#a1a1aa' }}>
					<span style={{ fontSize: '48px' }}>aleessandrohr.dev.br</span>
					<span style={{ fontSize: '48px' }}>UFMA · Engenharia da Computação</span>
				</div>
			</div>
		),
		size,
	)
}
