import { dayjs } from '@/lib/dayjs'
import type { MonthYear, Period } from '@/types/period'

const OPEN_END_LABEL = 'Atual'
const MONTH_FORMAT = 'MM/YYYY'
const MONTHS_PER_YEAR = 12
const MONTHS_PER_SEMESTER = 6
const SEMESTERS_PER_YEAR = 2

// Normaliza no primeiro dia para comparar apenas meses completos.
const readMonth = (value: MonthYear | null, now: Date) =>
	(value === null ? dayjs(now) : dayjs(value, MONTH_FORMAT, true)).startOf(
		'month'
	)

const toSemesterIndex = (date: ReturnType<typeof dayjs>) =>
	date.year() * SEMESTERS_PER_YEAR +
	Math.floor(date.month() / MONTHS_PER_SEMESTER)

/** Ordena pelo fim mais recente, com o início como desempate. */
export const sortExperiences = <T extends Period>(
	items: ReadonlyArray<T>,
	now = new Date()
) =>
	[...items].sort(
		(a, b) =>
			readMonth(b.end, now).diff(readMonth(a.end, now), 'month') ||
			readMonth(b.start, now).diff(readMonth(a.start, now), 'month')
	)

/** Formata o intervalo e traduz um vínculo em andamento apenas na apresentação. */
export const formatPeriod = ({ start, end }: Period) =>
	`${start} - ${end ?? OPEN_END_LABEL}`

/** Conta os meses inicial e final, como na duração exibida pelo LinkedIn. */
export const formatDuration = ({ start, end }: Period, now = new Date()) => {
	const total = readMonth(end, now).diff(readMonth(start, now), 'month') + 1
	const years = Math.floor(total / MONTHS_PER_YEAR)
	const months = total % MONTHS_PER_YEAR
	const parts = [
		years > 0 && `${years} ${years === 1 ? 'ano' : 'anos'}`,
		months > 0 && `${months} ${months === 1 ? 'mês' : 'meses'}`,
	]

	return parts.filter(Boolean).join(' ')
}

/** Devolve o semestre atual do curso; fica indefinido fora do intervalo. */
export const getAcademicPeriod = ({ start, end }: Period, now = new Date()) => {
	const current = readMonth(null, now)
	const firstMonth = readMonth(start, now)
	const lastMonth = readMonth(end, now)

	if (current.isBefore(firstMonth) || current.isAfter(lastMonth))
		return undefined

	return toSemesterIndex(current) - toSemesterIndex(firstMonth) + 1
}
