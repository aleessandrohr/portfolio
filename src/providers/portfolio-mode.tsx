'use client'

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'

type Props = { children: ReactNode }
type ModeContext = {
	isTerminal: boolean
	setTerminal: (value: boolean) => void
}

const PortfolioModeContext = createContext<ModeContext | null>(null)

/** Compartilha apenas o modo de apresentação, sincronizado com a URL. */
export const PortfolioModeProvider = ({ children }: Props) => {
	const [isTerminal, setIsTerminal] = useState(false)

	const setTerminal = useCallback((value: boolean) => {
		const url = new URL(window.location.href)
		if (value) url.searchParams.set('mode', 'terminal')
		else url.searchParams.delete('mode')

		window.history.replaceState(window.history.state, '', url)
		setIsTerminal(value)
	}, [])

	useEffect(() => {
		const syncMode = () =>
			setIsTerminal(
				new URL(window.location.href).searchParams.get('mode') === 'terminal'
			)

		syncMode()
		window.addEventListener('popstate', syncMode)
		return () => window.removeEventListener('popstate', syncMode)
	}, [])

	const value = useMemo(
		() => ({ isTerminal, setTerminal }),
		[isTerminal, setTerminal]
	)

	return (
		<PortfolioModeContext.Provider value={value}>
			{children}
		</PortfolioModeContext.Provider>
	)
}

/** Acessa o modo sem assinar as atualizações de histórico do terminal. */
export const usePortfolioMode = () => {
	const context = useContext(PortfolioModeContext)
	if (!context) throw new Error('PortfolioModeProvider ausente')

	return context
}
