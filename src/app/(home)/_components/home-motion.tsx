'use client'

import { inView } from 'motion'
import { useAnimate } from 'motion/react-mini'
import { type ReactNode, useLayoutEffect } from 'react'

type Props = { children: ReactNode }

type Easing = [number, number, number, number]

type MotionTokens = {
	easing: Easing
	revealDuration: number
	revealDistance: string
	revealStagger: number
	heroStagger: number
	letterDuration: number
	letterStagger: number
	letterDistance: string
}

type Animate = ReturnType<typeof useAnimate<HTMLElement>>[1]
type Controls = ReturnType<Animate>

type Entrance = {
	element: HTMLElement
	duration: number
	delay: number
	distance: string
}

type Enter = (entrance: Entrance) => void
type Settle = (element: HTMLElement) => void

const MS_PER_SECOND = 1000

const HERO_SELECTOR = '.hero-letter, .hero-intro'
const SECTION_SELECTOR = '[data-reveal]'
const DESKTOP_QUERY = '(min-width: 768px)'
const BELOW_FOLD_RATIO = 0.92
const IN_VIEW_OPTIONS = { margin: '0px 0px -8% 0px', amount: 'some' } as const

const readText = (style: CSSStyleDeclaration, token: string) =>
	style.getPropertyValue(token).trim()

const readSeconds = (style: CSSStyleDeclaration, token: string) =>
	Number.parseFloat(style.getPropertyValue(token)) / MS_PER_SECOND

const readEasing = (style: CSSStyleDeclaration): Easing => {
	const [x1, y1, x2, y2] = style
		.getPropertyValue('--reveal-easing')
		.replace('cubic-bezier(', '')
		.replace(')', '')
		.split(',')
		.map(Number)

	return [x1, y1, x2, y2]
}

/** Lê um contador inteiro de uma variável CSS; valor ausente ou inválido vira 0. */
const readCount = (style: CSSStyleDeclaration, token: string) =>
	Number(style.getPropertyValue(token)) || 0

/** Lê os tokens de movimento definidos em `globals.css`. */
const readMotionTokens = (root: HTMLElement): MotionTokens => {
	const style = getComputedStyle(root)

	return {
		easing: readEasing(style),
		revealDuration: readSeconds(style, '--reveal-duration'),
		revealDistance: readText(style, '--reveal-distance'),
		revealStagger: readSeconds(style, '--reveal-stagger'),
		heroStagger: readSeconds(style, '--hero-stagger'),
		letterDuration: readSeconds(style, '--hero-letter-duration'),
		letterStagger: readSeconds(style, '--hero-letter-stagger'),
		letterDistance: readText(style, '--hero-letter-distance'),
	}
}

const noop = () => {}

/** O CSS esconde o hero até o Motion assumir; só então ele pode animar a entrada. */
const isHeroHidden = (root: HTMLElement) => {
	const firstLetter = root.querySelector('.hero-letter')

	if (!firstLetter) return false

	return getComputedStyle(firstLetter).visibility === 'hidden'
}

const isBelowFold = (element: HTMLElement) =>
	element.getBoundingClientRect().top >= window.innerHeight * BELOW_FOLD_RATIO

const isSecondInRevealGrid = (element: HTMLElement) => {
	const grid = element.parentElement

	if (!grid?.classList.contains('reveal-grid')) return false

	return Array.from(grid.children).indexOf(element) % 2 === 1
}

const readHashTarget = () => {
	try {
		return document.getElementById(
			decodeURIComponent(window.location.hash.slice(1))
		)
	} catch {
		return null
	}
}

/** Guarda as animações em andamento e permite concluí-las de imediato. */
const createRevealer = (animate: Animate, tokens: MotionTokens) => {
	const running = new Map<HTMLElement, Controls>()

	const settle: Settle = element => {
		const control = running.get(element)

		running.delete(element)
		control?.cancel()
		element.style.removeProperty('opacity')
		element.style.removeProperty('transform')
		element.dataset.motionState = 'visible'
	}

	const enter: Enter = ({ element, duration, delay, distance }) => {
		element.dataset.motionState = 'entering'

		const control = animate(
			element,
			{
				opacity: [0, 1],
				transform: [`translateY(${distance})`, 'translateY(0px)'],
			},
			{ duration, delay, ease: tokens.easing }
		)

		running.set(element, control)

		void control.then(() => {
			if (running.get(element) === control) settle(element)
		})
	}

	return { enter, settle }
}

const getHeroEntrance = (
	element: HTMLElement,
	tokens: MotionTokens
): Entrance => {
	const style = getComputedStyle(element)
	const baseDelay = readCount(style, '--hero-intro-step') * tokens.heroStagger

	if (!element.classList.contains('hero-letter')) {
		return {
			element,
			duration: tokens.revealDuration,
			delay: baseDelay,
			distance: tokens.revealDistance,
		}
	}

	const letterOffset = readCount(style, '--letter-index') * tokens.letterStagger

	return {
		element,
		duration: tokens.letterDuration,
		delay: baseDelay + letterOffset,
		distance: tokens.letterDistance,
	}
}

const enterHero = (
	root: HTMLElement,
	heroElements: Array<HTMLElement>,
	tokens: MotionTokens,
	enter: Enter
) => {
	const hero = root.querySelector('#home')

	if (!hero || hero.getBoundingClientRect().bottom <= 0) return

	for (const element of heroElements) {
		// A foto só existe no desktop; oculta, ela não deve alocar animação.
		if (element.getClientRects().length === 0) continue

		enter(getHeroEntrance(element, tokens))
	}
}

/** Esconde as seções abaixo da tela e as revela quando entram na viewport. */
const observeSections = (
	sections: Array<HTMLElement>,
	tokens: MotionTokens,
	enter: Enter
) => {
	if (!('IntersectionObserver' in window)) return noop

	const pending = sections.filter(isBelowFold)

	for (const element of pending) element.dataset.motionState = 'pending'

	return inView(
		pending,
		target => {
			if (!(target instanceof HTMLElement)) return
			if (target.dataset.motionState !== 'pending') return

			const shouldStagger =
				window.matchMedia(DESKTOP_QUERY).matches && isSecondInRevealGrid(target)

			enter({
				element: target,
				duration: tokens.revealDuration,
				delay: shouldStagger ? tokens.revealStagger : 0,
				distance: tokens.revealDistance,
			})
		},
		IN_VIEW_OPTIONS
	)
}

/**
 * Liga a entrada do hero e a revelação das seções na rolagem.
 * Devolve a função de limpeza, ou `undefined` quando o movimento fica desligado.
 */
const startHomeMotion = (root: HTMLElement, animate: Animate) => {
	// Contexto: precisa ser lido antes de marcar o root como pronto.
	const canEnterHero = isHeroHidden(root)

	root.dataset.motionReady = 'true'

	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
	const print = window.matchMedia('print')
	const isStatic = () => reduced.matches || print.matches

	if (isStatic() || typeof root.animate !== 'function') return undefined

	// Variáveis
	const tokens = readMotionTokens(root)
	const elements = Array.from(
		root.querySelectorAll<HTMLElement>(`${HERO_SELECTOR}, ${SECTION_SELECTOR}`)
	)
	const sections = elements.filter(element =>
		element.hasAttribute('data-reveal')
	)
	const heroElements = elements.filter(
		element => !element.hasAttribute('data-reveal')
	)
	const { enter, settle } = createRevealer(animate, tokens)

	// Entradas
	if (canEnterHero) enterHero(root, heroElements, tokens, enter)

	const stopObserving = observeSections(sections, tokens, enter)

	// Funções de revelação imediata
	const settleAll = () => {
		stopObserving()

		for (const element of elements) settle(element)
	}

	const settleHashTarget = () => {
		const target = readHashTarget()

		if (!target) return

		for (const element of elements) {
			if (element.contains(target) || target.contains(element)) settle(element)
		}
	}

	const settleFocused = (event: FocusEvent) => {
		if (!(event.target instanceof Node)) return

		for (const element of elements) {
			if (element.contains(event.target)) settle(element)
		}
	}

	const settleWhenStatic = () => {
		if (isStatic()) settleAll()
	}

	// Escuta
	settleHashTarget()

	root.addEventListener('focusin', settleFocused)
	window.addEventListener('hashchange', settleHashTarget)
	window.addEventListener('beforeprint', settleAll)
	reduced.addEventListener('change', settleWhenStatic)
	print.addEventListener('change', settleWhenStatic)

	// Limpeza
	return () => {
		settleAll()

		for (const element of elements) element.removeAttribute('data-motion-state')

		root.removeAttribute('data-motion-ready')
		root.removeEventListener('focusin', settleFocused)
		window.removeEventListener('hashchange', settleHashTarget)
		window.removeEventListener('beforeprint', settleAll)
		reduced.removeEventListener('change', settleWhenStatic)
		print.removeEventListener('change', settleWhenStatic)
	}
}

export const HomeMotion = ({ children }: Props) => {
	const [scope, animate] = useAnimate<HTMLElement>()

	useLayoutEffect(() => {
		const root = scope.current

		if (!root) return

		return startHomeMotion(root, animate)
	}, [animate, scope])

	return (
		<main
			ref={scope}
			id="main"
			className="mx-auto w-full max-w-5xl px-5 sm:px-8"
		>
			{children}
		</main>
	)
}
