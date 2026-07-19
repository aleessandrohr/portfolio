import { ImageResponse } from 'next/og'

export const alt = 'Alessandro Henrique Ramos, Desenvolvedor Full Stack Pleno'
export const size = {
	width: 1200,
	height: 630,
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
					padding: '68px',
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
					<div
						style={{
							display: 'flex',
							height: '18px',
							width: '18px',
							borderRadius: '999px',
							background: '#3b82f6',
						}}
					/>
					<span style={{ fontSize: '24px', letterSpacing: '0.12em' }}>
						PORTFÓLIO • FULL STACK
					</span>
				</div>

				<div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
					<span style={{ fontSize: '76px', fontWeight: 700, lineHeight: 1 }}>
						Alessandro Henrique Ramos
					</span>
					<span style={{ color: '#93c5fd', fontSize: '38px', fontWeight: 600 }}>
						Desenvolvedor Full Stack Pleno
					</span>
					<span style={{ color: '#d4d4d8', fontSize: '28px', lineHeight: 1.4 }}>
						TypeScript · React.js · Next.js · Node.js · Micro Frontends · Docker
					</span>
				</div>

				<div style={{ display: 'flex', justifyContent: 'space-between', color: '#a1a1aa' }}>
					<span style={{ fontSize: '24px' }}>aleessandrohr.dev.br</span>
					<span style={{ fontSize: '24px' }}>UFMA · Engenharia da Computação</span>
				</div>
			</div>
		),
		size,
	)
}
