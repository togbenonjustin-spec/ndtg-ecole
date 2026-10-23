import { useEffect, useState } from 'react'
import { Footer, Header, JsonLd, Legal, WhatsAppFab } from './components/Chrome'
import { Home } from './components/Home'
import { mountMotion, scrollToHash } from './motion'

export default function App() {
  const [progress, setProgress] = useState(0)
  const [legal, setLegal] = useState(() => window.location.hash === '#mentions')

  useEffect(() => {
    const sync = () => {
      const isLegal = window.location.hash === '#mentions'
      setLegal(isLegal)
      if (isLegal) window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  useEffect(() => {
    const stop = mountMotion()
    if (!legal && window.location.hash && window.location.hash !== '#mentions') {
      window.setTimeout(() => scrollToHash(window.location.hash), 60)
    }
    return stop
  }, [legal])

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [legal])

  return (
    <>
      <a className="skip" href="#contenu">
        Aller au contenu
      </a>
      <div className="progress" style={{ width: `${progress}%` }} />
      <Header solid={legal} />
      {legal ? <Legal /> : <Home />}
      <Footer />
      <WhatsAppFab />
      <JsonLd />
    </>
  )
}
