import type { CSSProperties } from 'react'
import {
  campusPhotos,
  campuses,
  collectiveLine,
  collectivePoster,
  cycles,
  devise,
  faq,
  finalLine,
  heroImage,
  hours,
  laureates,
  phones,
  laureatsMarqueeSpeed,
  mapsUrl,
  mentions,
  messages,
  ranks,
  school,
  sessionYear,
  steps,
  whatsAppDisplay,
  WHATSAPP_QR_URL,
} from '../content'
import { buildWhatsAppUrl } from '../whatsapp'
import { EnrollForm } from './EnrollForm'

function LaureateCard({
  person,
}: {
  person: (typeof laureates)[number]
}) {
  return (
    <article className="laureate-card">
      <img src={person.photo} width={person.width} height={person.height} alt={person.alt} />
      <div className="card-body">
        <p className="exam-line">
          {person.exam} · {sessionYear}
        </p>
        <h3>
          {person.given}
          <span className="family">{person.family}</span>
        </h3>
        <p className="score-line">
          {person.score}/20
        </p>
        {person.rank && <p className="rank-line">{person.rank}</p>}
      </div>
    </article>
  )
}

export function Home() {
  const setWidth = laureates.length * (272 + 20)
  const duration = setWidth / laureatsMarqueeSpeed
  const loop = [...laureates, ...laureates]

  return (
    <main id="contenu">
      <section className="hero" id="top">
        <picture>
          <source srcSet={heroImage.srcSet} type="image/webp" sizes="100vw" />
          <img
            className="hero-img"
            src={heroImage.jpg}
            width={heroImage.width}
            height={heroImage.height}
            alt={heroImage.alt}
            fetchPriority="high"
          />
        </picture>
        <div className="hero-veil" />
        <img className="hero-watermark" src="/images/logo-512.png" alt="" width={512} height={512} />
        <div className="hero-inner">
          <img className="hero-logo" src="/images/logo-256.png" alt="" width={84} height={84} />
          <p className="kicker" style={{ color: '#fff' }}>
            {school.city} · {school.country}
          </p>
          <div className="gold-rule" />
          <h1>{school.slogan}</h1>
          <p className="hero-sub">
            {school.name} · {school.city} · Du CI à la Terminale
          </p>
          <div className="hero-actions">
            <a className="btn btn-light" href={buildWhatsAppUrl(messages.general)}>
              Écrire sur WhatsApp
            </a>
            <a className="btn btn-ghost" href="#resultats">
              Voir nos résultats
            </a>
          </div>
        </div>
        <div className="hero-banner">
          <p>Les inscriptions ont démarré : du CI au CM2 et de la 6ème à la Terminale</p>
        </div>
      </section>

      <section className="section section-pearl" id="resultats">
        <div className="wrap">
          <p className="kicker">Session {sessionYear}</p>
          <h2>Nos résultats {sessionYear}</h2>
          <p className="lead">
            {mentions.total} mentions : {mentions.tresBien} Très Bien, {mentions.bien} Bien et {mentions.assezBien}{' '}
            Assez Bien.
          </p>
          <div className="stats">
            <div className="reveal" style={{ '--i': 0 } as CSSProperties}>
              <div className="stat-num" data-count={mentions.total} aria-label={`${mentions.total} mentions`}>
                {mentions.total}
              </div>
              <p className="stat-label">mentions au total</p>
            </div>
            <div className="reveal" style={{ '--i': 1 } as CSSProperties}>
              <div className="stat-num" data-count={mentions.tresBien} aria-label={`${mentions.tresBien} Très Bien`}>
                {mentions.tresBien}
              </div>
              <p className="stat-label">Très Bien</p>
            </div>
            <div className="reveal" style={{ '--i': 2 } as CSSProperties}>
              <div className="stat-num" data-count={mentions.bien} aria-label={`${mentions.bien} Bien`}>
                {mentions.bien}
              </div>
              <p className="stat-label">Bien</p>
            </div>
            <div className="reveal" style={{ '--i': 3 } as CSSProperties}>
              <div className="stat-num" data-count={mentions.assezBien} aria-label={`${mentions.assezBien} Assez Bien`}>
                {mentions.assezBien}
              </div>
              <p className="stat-label">Assez Bien</p>
            </div>
          </div>
          <div className="bar-wrap">
            <div
              className="bar"
              role="img"
              aria-label={`${mentions.total} mentions : ${mentions.tresBien} Très Bien, ${mentions.bien} Bien, ${mentions.assezBien} Assez Bien`}
            >
              <div className="bar-fill">
                <span className="seg-tb" />
                <span className="seg-b" />
                <span className="seg-ab" />
              </div>
            </div>
            <div className="legend">
              <span><span className="swatch tb" /> {mentions.tresBien} Très Bien</span>
              <span><span className="swatch b" /> {mentions.bien} Bien</span>
              <span><span className="swatch ab" /> {mentions.assezBien} Assez Bien</span>
            </div>
          </div>
          <div className="ranks">
            {ranks.map((rank) => (
              <article className="rank-card" key={rank.figure + rank.detail}>
                <p className="rank-figure">{rank.figure}</p>
                <p className="rank-place">{rank.place}</p>
                <p className="rank-detail">{rank.detail}</p>
              </article>
            ))}
          </div>
          <div className="score-row">
            {laureates.map((person) => (
              <article className="score-card" key={person.id}>
                <p className="num">
                  {person.score}
                  <span>/20</span>
                </p>
                <div className="underline" />
                <p className="who">
                  {person.given} {person.family}
                </p>
                <p className="exam">
                  {person.exam}
                  {person.rank ? ` · ${person.rank}` : ''}
                </p>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 22 }}>
            <a className="btn btn-line" href={buildWhatsAppUrl(messages.results)}>
              Écrire au sujet des résultats
            </a>
          </div>
        </div>
      </section>

      <section className="section section-sky" id="laureats">
        <div className="wrap">
          <p className="kicker">Session {sessionYear}</p>
          <h2>Nos lauréats</h2>
          <p className="lead">Ils défilent tout seuls ci-dessous. La grille complète suit, pour ne rien manquer.</p>
        </div>
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track" style={{ '--marquee-duration': `${duration}s` } as CSSProperties}>
            {loop.map((person, index) => (
              <LaureateCard key={`${person.id}-${index}`} person={person} />
            ))}
          </div>
        </div>
        <div className="wrap">
          <div className="laureate-grid">
            {laureates.map((person) => (
              <article className="grid-card reveal" key={person.id}>
                <img src={person.photo} width={person.width} height={person.height} alt={person.alt} loading="lazy" />
                <div className="card-body">
                  <p className="exam-line">
                    {person.exam} · {sessionYear}
                  </p>
                  <h3>
                    {person.given}
                    <span className="family">{person.family}</span>
                  </h3>
                  <p className="score-line">{person.score}/20</p>
                  {person.rank && <p className="rank-line">{person.rank}</p>}
                </div>
              </article>
            ))}
          </div>
          <h3 className="serif" style={{ fontSize: '1.8rem', marginTop: 48 }}>
            Affiches de la session {sessionYear}
          </h3>
          <div className="poster-grid">
            {laureates.map((person) => (
              <img
                key={person.id}
                src={person.poster}
                width={person.posterWidth}
                height={person.posterHeight}
                alt={person.posterAlt}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-night">
        <div className="wrap collective">
          <h2 className="quote">{collectiveLine}</h2>
          <img
            src={collectivePoster.src}
            width={collectivePoster.width}
            height={collectivePoster.height}
            alt={collectivePoster.alt}
            loading="lazy"
          />
        </div>
      </section>

      <section className="section section-white" id="ecole">
        <div className="wrap school-grid">
          <div className="prose">
            <p className="kicker">L’école</p>
            <h2>Une école catholique au cœur de Cotonou.</h2>
            <p className="lead">{school.identity}</p>
            <p style={{ marginTop: 14 }}>
              Le parcours va du CI à la Terminale : primaire, puis enseignement secondaire général, du 1er cycle au
              2nd cycle.
            </p>
            <div className="devise">
              {devise.map((word) => (
                <p className="devise-item" key={word}>
                  {word}
                </p>
              ))}
            </div>
          </div>
          <img
            className="school-photo"
            src={campusPhotos[0].src}
            srcSet={campusPhotos[0].srcSet}
            sizes="(min-width: 720px) 46vw, 100vw"
            width={campusPhotos[0].width}
            height={campusPhotos[0].height}
            alt={campusPhotos[0].alt}
            loading="lazy"
          />
        </div>
      </section>

      <section className="section section-sky" id="classes">
        <div className="wrap">
          <p className="kicker">Les classes de l’école</p>
          <h2>Du CI à la Terminale</h2>
          <p className="lead">Les trois étapes sont affichées ci-dessous, sans rien à ouvrir.</p>
          <div className="cycle-grid">
            {cycles.map((cycle) => (
              <article className="cycle-card" key={cycle.index}>
                <p className="step-n">{cycle.index}</p>
                <p className="range">{cycle.range}</p>
                <h3>{cycle.title}</h3>
                <p style={{ marginTop: 10 }}>{cycle.text}</p>
                <div className="chips">
                  {cycle.levels.map((level) => (
                    <span className="chip" key={level}>
                      {level}
                    </span>
                  ))}
                </div>
                {cycle.note && <p className="note">{cycle.note}</p>}
                <a className="btn btn-primary btn-block" href={buildWhatsAppUrl(cycle.message)}>
                  {cycle.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white" id="sites">
        <div className="wrap">
          <p className="kicker">Nous trouver</p>
          <h2>Nos deux sites</h2>
          <p className="lead">Une même école, deux adresses à Cotonou. Touchez « Itinéraire » pour ouvrir le trajet.</p>
          <div className="site-grid">
            {campuses.map((site) => (
              <article className="site-card" key={site.id}>
                <div>
                  <h3>{site.name}</h3>
                  <p>
                    {school.city} · {school.country}
                  </p>
                </div>
                <a className="btn btn-line" href={mapsUrl(site.query)} target="_blank" rel="noreferrer">
                  Itinéraire
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-sky" id="vie">
        <div className="wrap">
          <p className="kicker">L’établissement</p>
          <h2>La vie à l’école</h2>
          <div className="photo-grid">
            {campusPhotos.map((photo) => (
              <img
                key={photo.src}
                src={photo.src}
                srcSet={photo.srcSet}
                sizes="(min-width: 720px) 50vw, 100vw"
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white" id="horaires">
        <div className="wrap hours-grid">
          <div>
            <p className="kicker">Organisation</p>
            <h2>Les horaires</h2>
            <p className="lead">En semaine, puis les travaux dirigés du samedi.</p>
          </div>
          <div className="schedule">
            <div className="slot">
              <strong>Matin</strong>
              <p>{hours.morning}</p>
            </div>
            <div className="slot">
              <strong>Après-midi</strong>
              <p>{hours.afternoon}</p>
            </div>
            <div className="slot">
              <strong>Samedi</strong>
              <p>{hours.saturday}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-sky" id="inscription">
        <div className="wrap">
          <p className="kicker">Admissions</p>
          <h2>Comment inscrire votre enfant</h2>
          <p className="lead">Quatre étapes, toutes affichées ici.</p>
          <div className="steps">
            {steps.map((step) => (
              <article className="step" key={step.n}>
                <p className="step-n">{step.n}</p>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white" id="faq">
        <div className="wrap">
          <p className="kicker">Questions fréquentes</p>
          <h2>Vos questions, nos réponses.</h2>
          <div className="faq">
            {faq.map((item) => (
              <article className="faq-item" key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
                {item.q.startsWith('Comment connaître') && (
                  <a className="btn btn-primary" href={buildWhatsAppUrl(messages.general)}>
                    Écrire sur WhatsApp
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-pearl" id="formulaire">
        <div className="wrap">
          <EnrollForm />
        </div>
      </section>

      <section className="section section-night" id="contact">
        <div className="wrap cta-grid">
          <div>
            <h2 className="quote">{finalLine}</h2>
            <p className="lead">Échangez avec l’école sur les niveaux, les sites et les modalités d’inscription.</p>
            <div className="hero-actions">
              <a className="btn btn-light" href={buildWhatsAppUrl(messages.general)}>
                Écrire sur WhatsApp
              </a>
              {phones.map((phone) => (
                <a className="btn btn-ghost" key={phone.tel} href={`tel:${phone.tel}`}>
                  Appeler · {phone.display}
                </a>
              ))}
            </div>
          </div>
          <div className="qr-block">
            <img src="/images/whatsapp-qr.svg" width={148} height={148} alt="" />
            <p>Scannez pour nous écrire sur WhatsApp · {whatsAppDisplay()}</p>
            <a href={WHATSAPP_QR_URL}>Ouvrir la discussion</a>
          </div>
        </div>
      </section>
    </main>
  )
}
