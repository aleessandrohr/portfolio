'use client'

import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
	type FocusEvent,
	type ReactNode,
	useEffect,
	useRef,
	useState,
} from 'react'
import { Button } from '@/components/ui/button'
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from '@/components/ui/carousel'

type Slide = { id: string; content: ReactNode }

type Props = {
	heading: ReactNode
	label: string
	slides: ReadonlyArray<Slide>
}

const AUTOPLAY_DELAY_MS = 2000
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

// O foco visual só vale com mouse: em telas de toque o hover ficaria preso.
const slideClassName =
	'flex h-full transition-[opacity,transform] duration-300 motion-reduce:transition-none [@media(hover:hover)]:group-hover/carousel:opacity-60 [@media(hover:hover)]:hover:!opacity-100 [@media(hover:hover)]:motion-safe:hover:scale-[1.03]'

export const ProjectsCarousel = ({ heading, label, slides }: Props) => {
	const [api, setApi] = useState<CarouselApi>()
	const [isHovered, setIsHovered] = useState(false)
	const [hasFocus, setHasFocus] = useState(false)
	// Indefinido até ler a preferência: sem rotação e sem setas nesse intervalo.
	const [reducedMotion, setReducedMotion] = useState<boolean>()

	const autoplay = useRef(
		Autoplay({
			delay: AUTOPLAY_DELAY_MS,
			playOnInit: false,
			stopOnInteraction: false,
			stopOnMouseEnter: false,
			stopOnFocusIn: false,
		})
	)

	const shouldPlay = reducedMotion === false && !(isHovered || hasFocus)

	// Preferência do sistema por menos movimento
	useEffect(() => {
		const query = window.matchMedia(REDUCED_MOTION_QUERY)
		const syncPreference = () => setReducedMotion(query.matches)

		syncPreference()

		query.addEventListener('change', syncPreference)

		return () => query.removeEventListener('change', syncPreference)
	}, [])

	// Liga ou desliga a rotação conforme o estado
	useEffect(() => {
		if (!api) return

		if (shouldPlay) autoplay.current.play()
		else autoplay.current.stop()
	}, [api, shouldPlay])

	const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
		if (event.currentTarget.contains(event.relatedTarget)) return

		setHasFocus(false)
	}

	return (
		<div>
			<div className="flex items-end justify-between gap-4">
				{heading}
				{/* Sem rotação (movimento reduzido), as setas são o único caminho com mouse. */}
				{reducedMotion && (
					<div className="flex items-center gap-2">
						<Button
							type="button"
							variant="outline"
							size="icon"
							className="rounded-full bg-background/30"
							aria-label="Projeto anterior"
							onClick={() => api?.scrollPrev()}
						>
							<ChevronLeft className="h-4 w-4" aria-hidden="true" />
						</Button>
						<Button
							type="button"
							variant="outline"
							size="icon"
							className="rounded-full bg-background/30"
							aria-label="Próximo projeto"
							onClick={() => api?.scrollNext()}
						>
							<ChevronRight className="h-4 w-4" aria-hidden="true" />
						</Button>
					</div>
				)}
			</div>
			<Carousel
				setApi={setApi}
				plugins={[autoplay.current]}
				opts={{ align: 'start', loop: true }}
				aria-label={label}
				className="group/carousel -mx-3 mt-6"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				onFocusCapture={() => setHasFocus(true)}
				onBlurCapture={handleBlur}
			>
				<CarouselContent className="ml-0 py-6">
					{slides.map((slide, index) => (
						<CarouselItem
							key={slide.id}
							aria-label={`${index + 1} de ${slides.length}`}
							className="basis-[85%] px-3 sm:basis-1/2 lg:basis-1/3"
						>
							<div className={slideClassName}>{slide.content}</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	)
}
