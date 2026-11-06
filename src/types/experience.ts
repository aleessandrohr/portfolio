import type { Period } from '@/types/period'

export interface Experience extends Period {
	title: string
	category: string
	organization: string
	details?: ReadonlyArray<string>
	activities: ReadonlyArray<string>
}
