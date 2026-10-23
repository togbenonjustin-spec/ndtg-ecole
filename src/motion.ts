import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

/**
 * Un seul chef d'orchestre.
 * Lenis lisse le défilement à la molette, et prévient GSAP à chaque pas.
 * GSAP anime les apparitions, les compteurs et la barre.
 * Le ruban des lauréats reste en CSS : ce n'est pas un effet de scroll,
 * donc GSAP ne le touche jamais.
 * Sur téléphone, Lenis ne prend pas le doigt : le scroll natif reste,
 * pour que le bouton WhatsApp fixe ne saute pas.
 */

let lenis: Lenis | null = null
let stopCurrent: (() => void) | null = null

function headerOffset(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--header')
  const value = Number.parseInt(raw, 10)
  return Number.isFinite(value) ? value : 72
}

export function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, '')
  if (!id) return
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, { offset: -headerOffset() })
    return
  }
  el.scrollIntoView()
}

export function mountMotion(): () => void {
  stopCurrent?.()

  document.documentElement.classList.add('js-ready')
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    document.documentElement.classList.add('is-reduced')
    const noop = () => {}
    stopCurrent = noop
    return noop
  }

  const instance = new Lenis({
    autoRaf: false,
    smoothWheel: true,
    syncTouch: false,
    duration: 1.05,
    anchors: false,
    stopInertiaOnNavigate: true,
  })
  lenis = instance

  const onLenisScroll = () => {
    ScrollTrigger.update()
  }
  instance.on('scroll', onLenisScroll)

  const tick = (time: number) => {
    instance.raf(time * 1000)
  }
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  const onClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const link = (event.target as Element | null)?.closest('a[href^="#"]')
    if (!(link instanceof HTMLAnchorElement)) return
    const href = link.getAttribute('href')
    if (!href || href === '#mentions') return
    const el = document.querySelector(href)
    if (!(el instanceof HTMLElement)) return
    event.preventDefault()
    instance.scrollTo(el, { offset: -headerOffset() })
  }
  document.addEventListener('click', onClick)

  const ctx = gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
      if (el.closest('.marquee')) return
      const index = Number.parseInt(getComputedStyle(el).getPropertyValue('--i'), 10)
      const stagger = Number.isFinite(index) ? Math.min(index, 3) * 0.07 : 0
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          delay: stagger,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        },
      )
    })

    gsap.utils.toArray<HTMLElement>('.bar-fill').forEach((el) => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: 'power3.out',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
        },
      )
    })

    gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
      const target = Number(el.dataset.count)
      if (!Number.isFinite(target)) return
      const state = { n: 0 }
      gsap.to(state, {
        n: target,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
        onStart: () => {
          el.textContent = '0'
        },
        onUpdate: () => {
          el.textContent = String(Math.round(state.n))
        },
        onComplete: () => {
          el.textContent = String(target)
        },
      })
    })
  })

  window.setTimeout(() => ScrollTrigger.refresh(), 150)

  const stop = () => {
    document.removeEventListener('click', onClick)
    ctx.revert()
    gsap.ticker.remove(tick)
    instance.destroy()
    if (lenis === instance) lenis = null
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    if (stopCurrent === stop) stopCurrent = null
  }
  stopCurrent = stop
  return stop
}
