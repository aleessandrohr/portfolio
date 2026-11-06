import { profile } from './profile'
import { skills } from './skills'

export const seoTopics = [
	'Desenvolvimento de software',
	'Desenvolvimento web',
	'Desenvolvimento mobile',
	'Arquitetura de sistemas',
	'Micro frontends',
	'Microsserviços',
	'Plataformas SaaS',
	'Infraestrutura e DevOps',
	'Inteligência artificial',
	'Soluções com IA',
	'Desenvolvimento de software com IA',
	'Automação com IA',
	'Engenharia da Computação',
	...Object.values(skills).flatMap(group => group.items),
]

export const seoKeywords = [
	profile.fullName,
	profile.role,
	...seoTopics,
	'Desenvolvedor São Luís',
	'Portfólio de desenvolvedor',
]
