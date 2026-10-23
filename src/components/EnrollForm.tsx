import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  campusChoices,
  grades,
  messages,
  phones,
  relations,
  seriesGrades,
  seriesOptions,
  statuses,
  whatsAppDisplay,
} from '../content'
import { buildEnrollmentMessage, buildWhatsAppUrl, isBeninPhone } from '../whatsapp'
import type { Enrollment } from '../whatsapp'

const empty: Enrollment = {
  parentName: '',
  phone: '',
  relation: '',
  studentName: '',
  birthDate: '',
  grade: '',
  series: '',
  previousSchool: '',
  status: '',
  campus: '',
  message: '',
}

type Errors = Partial<Record<keyof Enrollment, string>>

function needsSeries(grade: string) {
  return (seriesGrades as readonly string[]).includes(grade)
}

export function EnrollForm() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<Enrollment>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [planB, setPlanB] = useState(false)
  const [copied, setCopied] = useState(false)

  function set<K extends keyof Enrollment>(key: K, value: Enrollment[K]) {
    setData((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'grade' && !needsSeries(String(value))) next.series = ''
      return next
    })
  }

  function validate(current: number): Errors {
    const next: Errors = {}
    if (current === 1) {
      if (!data.parentName.trim()) next.parentName = 'Indiquez le nom et les prénoms.'
      if (!isBeninPhone(data.phone)) next.phone = 'Indiquez un numéro valide : 01 XX XX XX XX ou +229…'
      if (!data.relation) next.relation = 'Choisissez le lien avec l’élève.'
    }
    if (current === 2) {
      if (!data.studentName.trim()) next.studentName = 'Indiquez le nom et les prénoms de l’élève.'
      if (!data.grade) next.grade = 'Choisissez la classe demandée.'
      if (needsSeries(data.grade) && !data.series) next.series = 'Choisissez une série, ou « Pas encore choisie ».'
      if (!data.status) next.status = 'Indiquez si l’élève est nouveau ou ancien.'
    }
    if (current === 3) {
      if (!data.campus) next.campus = 'Choisissez un site, ou « Pas de préférence ».'
    }
    return next
  }

  function focusFirst(next: Errors) {
    const key = Object.keys(next)[0]
    if (!key) return
    document.getElementById(`field-${key}`)?.focus()
  }

  function onContinue(event: FormEvent) {
    event.preventDefault()
    const next = validate(step)
    setErrors(next)
    if (Object.keys(next).length) {
      focusFirst(next)
      return
    }
    setStep((s) => Math.min(4, s + 1))
  }

  const preview = buildEnrollmentMessage(data)

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(preview)
      setCopied(true)
    } catch {
      const area = document.getElementById('message-copie') as HTMLTextAreaElement | null
      area?.focus()
      area?.select()
      setCopied(false)
    }
  }

  function send(event: FormEvent) {
    event.preventDefault()
    const url = buildWhatsAppUrl(preview)
    setPlanB(true)
    window.location.href = url
  }

  const progress = step === 1 ? 33 : step === 2 ? 66 : 100
  const titles = ['Le parent', 'L’élève', 'Le site', 'Vérification']

  return (
    <div className="form-layout">
      <div>
        <p className="kicker">Inscription</p>
        <h2>Demande d’inscription</h2>
        <p className="lead">
          Remplissez le formulaire. Il prépare un message WhatsApp pour le {whatsAppDisplay()}. Rien n’est
          envoyé avant votre confirmation dans WhatsApp.
        </p>
        <div className="phones">
          {phones.map((phone) => (
            <a key={phone.tel} href={`tel:${phone.tel}`}>
              Appeler l’école · {phone.display}
            </a>
          ))}
          <a href={buildWhatsAppUrl(messages.general)}>Écrire sur WhatsApp · {whatsAppDisplay()}</a>
        </div>
      </div>
      <form className="form-card" onSubmit={step < 4 ? onContinue : send} noValidate>
        <p className="step-label">
          Étape {Math.min(step, 3)} sur 3 · {titles[step - 1]}
        </p>
        <div className="form-progress" role="progressbar" aria-valuemin={1} aria-valuemax={3} aria-valuenow={Math.min(step, 3)}>
          <span style={{ width: `${progress}%` }} />
        </div>

        {step === 1 && (
          <div className="fields">
            <label>
              Nom et prénoms du parent ou tuteur
              <input
                id="field-parentName"
                value={data.parentName}
                autoComplete="name"
                onChange={(e) => set('parentName', e.target.value)}
                required
              />
              {errors.parentName && <span className="error">{errors.parentName}</span>}
            </label>
            <label>
              Téléphone / WhatsApp
              <input
                id="field-phone"
                value={data.phone}
                inputMode="tel"
                autoComplete="tel"
                placeholder="01 XX XX XX XX"
                onChange={(e) => set('phone', e.target.value)}
                required
              />
              <span className="hint">Format accepté : 01 XX XX XX XX ou +229 01 XX XX XX XX.</span>
              {errors.phone && <span className="error">{errors.phone}</span>}
            </label>
            <label>
              Lien avec l’élève
              <select id="field-relation" value={data.relation} onChange={(e) => set('relation', e.target.value)} required>
                <option value="">Choisir…</option>
                {relations.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              {errors.relation && <span className="error">{errors.relation}</span>}
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="fields">
            <label>
              Nom et prénoms de l’élève
              <input id="field-studentName" value={data.studentName} onChange={(e) => set('studentName', e.target.value)} required />
              {errors.studentName && <span className="error">{errors.studentName}</span>}
            </label>
            <label>
              Date de naissance <span className="hint">optionnel</span>
              <input id="field-birthDate" type="date" value={data.birthDate} onChange={(e) => set('birthDate', e.target.value)} />
            </label>
            <label>
              Classe demandée
              <select id="field-grade" value={data.grade} onChange={(e) => set('grade', e.target.value)} required>
                <option value="">Choisir…</option>
                {grades.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              {errors.grade && <span className="error">{errors.grade}</span>}
            </label>
            {needsSeries(data.grade) && (
              <label>
                Série
                <select id="field-series" value={data.series} onChange={(e) => set('series', e.target.value)} required>
                  <option value="">Choisir…</option>
                  {seriesOptions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
                {errors.series && <span className="error">{errors.series}</span>}
              </label>
            )}
            <label>
              École d’origine <span className="hint">optionnel</span>
              <input value={data.previousSchool} onChange={(e) => set('previousSchool', e.target.value)} />
            </label>
            <label>
              Nouvel ou ancien élève
              <select id="field-status" value={data.status} onChange={(e) => set('status', e.target.value)} required>
                <option value="">Choisir…</option>
                {statuses.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              {errors.status && <span className="error">{errors.status}</span>}
            </label>
          </div>
        )}

        {step === 3 && (
          <div className="fields">
            <label>
              Site souhaité
              <select id="field-campus" value={data.campus} onChange={(e) => set('campus', e.target.value)} required>
                <option value="">Choisir…</option>
                {campusChoices.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              {errors.campus && <span className="error">{errors.campus}</span>}
            </label>
            <label>
              Message <span className="hint">optionnel</span>
              <textarea value={data.message} maxLength={600} onChange={(e) => set('message', e.target.value)} />
            </label>
          </div>
        )}

        {step === 4 && (
          <dl className="recap">
            <div>
              <dt>Parent / tuteur</dt>
              <dd>
                {data.parentName} · {data.relation} · {data.phone}
              </dd>
            </div>
            <div>
              <dt>Élève</dt>
              <dd>
                {data.studentName} · {data.grade}
                {data.series ? ` · série ${data.series}` : ''} · {data.status}
              </dd>
            </div>
            <div>
              <dt>Site souhaité</dt>
              <dd>{data.campus}</dd>
            </div>
            {data.message.trim() && (
              <div>
                <dt>Message</dt>
                <dd>{data.message.trim()}</dd>
              </div>
            )}
            <label>
              Message qui sera préparé
              <textarea id="message-copie" readOnly value={preview} />
            </label>
          </dl>
        )}

        <div className="form-actions">
          {step > 1 && (
            <button className="btn btn-line" type="button" onClick={() => setStep((s) => s - 1)}>
              Retour
            </button>
          )}
          {step < 4 ? (
            <button className="btn btn-primary" type="submit">
              Continuer
            </button>
          ) : (
            <>
              <button className="btn btn-primary" type="submit">
                Envoyer sur WhatsApp
              </button>
              <button className="btn btn-line" type="button" onClick={() => void copyMessage()}>
                {copied ? 'Message copié' : 'Copier le message'}
              </button>
            </>
          )}
        </div>
        {planB && (
          <p className="planb">
            Si WhatsApp ne s’ouvre pas, touchez « Copier le message », ouvrez WhatsApp et collez-le dans la
            discussion avec le {whatsAppDisplay()}.
          </p>
        )}
      </form>
    </div>
  )
}
