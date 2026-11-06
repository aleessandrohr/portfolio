import type { Period } from '@/types/period'

export interface Experience extends Period {
	title: string
	category: string
	displayOrder?: number
	organization: string
	details?: ReadonlyArray<string>
	activities: ReadonlyArray<string>
}
