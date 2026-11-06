// Arte decorativa: não representa commits nem qualquer dado real.
const ROWS = 7
const COLUMNS = 37
const LETTER_WIDTH = 5
const LETTER_GAP = 1

const GLYPHS: Record<string, ReadonlyArray<string>> = {
	A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
	H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
	R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
}

const TEXT = 'AHR'

const TEXT_WIDTH = TEXT.length * LETTER_WIDTH + (TEXT.length - 1) * LETTER_GAP
const TEXT_START = Math.floor((COLUMNS - TEXT_WIDTH) / 2)

// Valor fixo por célula, para o servidor e o cliente renderizarem igual.
const readNoise = (column: number, row: number) =>
	Math.abs(Math.sin(column * 12.9898 + row * 78.233) * 43758.5453) % 1

const isLetterCell = (column: number, row: number) => {
	const offset = column - TEXT_START
	const slot = Math.floor(offset / (LETTER_WIDTH + LETTER_GAP))
	const inLetter = offset % (LETTER_WIDTH + LETTER_GAP) < LETTER_WIDTH

	if (offset < 0 || slot >= TEXT.length || !inLetter) return false

	return GLYPHS[TEXT[slot]][row][offset % (LETTER_WIDTH + LETTER_GAP)] === '1'
}

const buildCells = () =>
	Array.from({ length: COLUMNS * ROWS }, (_, index) => {
		const column = Math.floor(index / ROWS)
		const row = index % ROWS

		if (isLetterCell(column, row)) return 'bg-brand'

		return readNoise(column, row) > 0.82 ? 'bg-brand/20' : 'bg-muted'
	})

const CELLS = buildCells()

type GridProps = { className?: string; gapClassName?: string }

// Só a grade: o destino (hero, projetos, contato) define tamanho, opacidade e máscara.
export const PixelGrid = ({
	className,
	gapClassName = 'gap-[3px]',
}: GridProps) => (
	<div
		aria-hidden="true"
		className={`grid ${gapClassName} ${className ?? ''}`}
		style={{
			gridTemplateColumns: `repeat(${COLUMNS}, minmax(0, 1fr))`,
			gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
			gridAutoFlow: 'column',
		}}
	>
		{CELLS.map((cellClassName, index) => (
			<span
				// biome-ignore lint/suspicious/noArrayIndexKey: a grade é fixa e nunca reordena
				key={index}
				className={`aspect-square rounded-[2px] ${cellClassName}`}
			/>
		))}
	</div>
)
