import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  WHATSAPP_QR_URL,
  campuses,
  devise,
  faq,
  mapsUrl,
  messages,
  nav,
  phones,
  school,
  whatsAppDisplay,
} from '../content'
import { buildWhatsAppUrl } from '../whatsapp'

export function Header({ solid }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const nodes = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!nodes.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0.1, 0.3] },
    )
    nodes.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isSolid = Boolean(solid || scrolled || open)

  return (
    <>
      <header className={`header${isSolid ? ' is-solid' : ''}${open ? ' is-open' : ''}`}>
        <div className="header-inner">
          <a className="brand" href="#top" onClick={() => setOpen(false)}>
            <img src="/images/logo-128.png" alt="" width={42} height={42} />
            <span className="brand-name">{school.name}</span>
          </a>
          <nav className="nav" aria-label="Sections">
            {nav.map((item) => (
              <a key={item.id} href={item.href} className={active === item.id ? 'is-active' : undefined}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="btn btn-primary header-cta" href={buildWhatsAppUrl(messages.enroll)}>
            Inscrire mon enfant
          </a>
          <button
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      <div id="menu-mobile" className={`mobile-menu${open ? ' is-open' : ''}`} hidden={!open}>
        {nav.map((item) => (
          <a key={item.id} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a className="btn btn-primary" href={buildWhatsAppUrl(messages.enroll)} onClick={() => setOpen(false)}>
          Inscrire mon enfant
        </a>
      </div>
    </>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wax" aria-hidden="true" />
      <div className="wrap footer-grid">
        <div>
          <img className="logo" src="/images/logo-256.png" alt="" width={112} height={112} />
          <p className="devise-line">{devise.join(' · ')}</p>
          <h2>{school.name}</h2>
          <p style={{ marginTop: 8, color: 'rgba(255,255,255,0.8)' }}>
            {school.city} · {school.country}
          </p>
        </div>
        <div className="footer-links">
          <strong>Les deux sites</strong>
          {campuses.map((site) => (
            <a key={site.id} href={mapsUrl(site.query)} target="_blank" rel="noreferrer">
              {site.name} · {school.city}
            </a>
          ))}
          {phones.map((phone) => (
            <a key={phone.tel} href={`tel:${phone.tel}`}>
              {phone.display}
            </a>
          ))}
        </div>
        <div className="footer-links">
          <strong>WhatsApp</strong>
          <a href={buildWhatsAppUrl(messages.general)}>Écrire sur WhatsApp · {whatsAppDisplay()}</a>
          <a href={WHATSAPP_QR_URL}>Ouvrir la discussion</a>
          <a href="#mentions">Mentions légales et confidentialité</a>
        </div>
      </div>
      <div className="wrap legal-note">
        {school.name} · {school.city}, {school.country}
      </div>
    </footer>
  )
}

export function WhatsAppFab() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 1500)
    return () => window.clearTimeout(id)
  }, [])
  return createPortal(
    <a
      className={`wa-fab${ready ? ' is-in' : ''}`}
      href={buildWhatsAppUrl(messages.general)}
      aria-label="Écrire sur WhatsApp"
    >
      <ChatIcon />
      <span>Écrire sur WhatsApp</span>
    </a>,
    document.body,
  )
}

export function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3.2A8.7 8.7 0 0 0 4.7 16.5L3.5 20.6l4.2-1.1A8.8 8.8 0 1 0 12 3.2Zm4.7 12.3c-.2.6-1.1 1.1-1.6 1.1-.4.1-1 .1-3.2-.7-2.7-1-4.4-3.6-4.5-3.8-.2-.2-1.2-1.6-1.2-3.1s.8-2.2 1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5.2.6.7 1.9.8 2 .1.2 0 .4-.1.5l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.6-.7c.2-.2.3-.2.6-.1l1.8.8c.3.1.5.2.5.4 0 .2 0 .8-.3 1.1Z"
      />
    </svg>
  )
}

export function Legal() {
  return (
    <main className="legal" id="contenu">
      <div className="wrap">
        <p className="kicker">Informations</p>
        <h1>Mentions légales et confidentialité</h1>
        <h2>Éditeur</h2>
        <p>
          {school.name}, établissement situé à {school.city}, {school.country}, sur les sites de Kpondéhou et
          d’Ayélawadjè.
        </p>
        <p>
          Téléphone :{' '}
          {phones.map((phone, i) => (
            <span key={phone.tel}>
              {i > 0 ? ' · ' : ''}
              <a href={`tel:${phone.tel}`}>{phone.display}</a>
            </span>
          ))}
        </p>
        <p>
          WhatsApp : <a href={buildWhatsAppUrl(messages.general)}>{whatsAppDisplay()}</a>
        </p>
        <h2>Formulaire d’inscription</h2>
        <p>
          Le formulaire prépare un message WhatsApp. Les réponses restent dans votre navigateur. Rien n’est
          transmis à un serveur du site. Le message n’est envoyé qu’après votre confirmation dans WhatsApp, au
          numéro {whatsAppDisplay()}.
        </p>
        <h2>Photos et noms des lauréats</h2>
        <p>
          Les noms et portraits des lauréats de la session 2026 sont publiés par l’école, avec l’autorisation des
          familles.
        </p>
        <h2>Cookies</h2>
        <p>Ce site ne dépose pas de cookie de suivi et n’ouvre pas de compte visiteur.</p>
        <p style={{ marginTop: 28 }}>
          <a className="btn btn-line" href="#top">
            Retour à l’accueil
          </a>
        </p>
      </div>
    </main>
  )
}

export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'School',
    name: school.name,
    slogan: school.slogan,
    description: school.identity,
    address: {
      '@type': 'PostalAddress',
      addressLocality: school.city,
      addressCountry: 'BJ',
    },
    location: campuses.map((site) => ({
      '@type': 'Place',
      name: `${site.name}, ${school.city}, ${school.country}`,
    })),
    telephone: phones.map((phone) => phone.tel),
    areaServed: { '@type': 'City', name: school.city },
  }
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
    </>
  )
}
