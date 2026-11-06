import type { MonthYear, Period } from '@/types/period'

export interface Education extends Period {
	course: string
	institution: string
	end: MonthYear
	description: string
}
