import type { CSSProperties } from 'react'

type Props = { text: string; offset?: number }

type Letter = { value: string; order: number }
type Chunk = { text: string; letters: Array<Letter> }

const segmenter = new Intl.Segmenter('pt-BR', { granularity: 'grapheme' })

/**
 * Separa o texto em palavras e espaços. Cada grafema recebe uma ordem
 * sequencial (espaços contam), usada no atraso da entrada de cada letra.
 */
const splitIntoChunks = (text: string, offset: number) => {
	const chunks: Array<Chunk> = []
	let order = offset

	for (const part of text.split(/(\s+)/)) {
		const graphemes = Array.from(segmenter.segment(part), item => item.segment)
		const letters: Array<Letter> = []

		for (const value of graphemes) {
			letters.push({ value, order })
			order += 1
		}

		chunks.push({ text: part, letters })
	}

	return chunks
}

export const LetterReveal = ({ text, offset = 0 }: Props) => (
	<>
		<span className="sr-only">{text}</span>
		<span aria-hidden="true">
			{splitIntoChunks(text, offset).map(chunk =>
				chunk.text.trim() ? (
					<span
						key={chunk.letters[0].order}
						className="inline-block whitespace-nowrap"
					>
						{chunk.letters.map(letter => (
							<span
								key={letter.order}
								className="hero-letter inline-block"
								style={{ '--letter-index': letter.order } as CSSProperties}
							>
								{letter.value}
							</span>
						))}
					</span>
				) : (
					chunk.text
				)
			)}
		</span>
	</>
)
