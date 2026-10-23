import { WHATSAPP_NUMBER, school, sessionYear } from './content'

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function isBeninPhone(value: string): boolean {
  const n = value.replace(/[\s.\-()]/g, '')
  return /^01\d{8}$/.test(n) || /^\+22901\d{8}$/.test(n) || /^0022901\d{8}$/.test(n) || /^\+229\d{8}$/.test(n)
}

export type Enrollment = {
  parentName: string
  phone: string
  relation: string
  studentName: string
  birthDate: string
  grade: string
  series: string
  previousSchool: string
  status: string
  campus: string
  message: string
}

export function formatBirthDate(iso: string): string {
  const [y, m, d] = iso.split('-')
  if (!y || !m || !d) return iso
  return `${d}/${m}/${y}`
}

export function buildEnrollmentMessage(data: Enrollment): string {
  const lines = [
    `*DEMANDE D'INSCRIPTION - ${sessionYear}*`,
    school.name,
    '',
    '*Parent / Tuteur*',
    `Nom : ${data.parentName.trim()}`,
    `Téléphone : ${data.phone.trim()}`,
    `Lien avec l'élève : ${data.relation}`,
    '',
    '*Élève*',
    `Nom et prénoms : ${data.studentName.trim()}`,
  ]
  if (data.birthDate) lines.push(`Date de naissance : ${formatBirthDate(data.birthDate)}`)
  lines.push(`Classe demandée : ${data.grade}`)
  if (data.series) lines.push(`Série : ${data.series}`)
  if (data.previousSchool.trim()) lines.push(`École d'origine : ${data.previousSchool.trim()}`)
  lines.push(`Statut : ${data.status}`)
  lines.push('', `*Site souhaité* : ${data.campus}`)
  const note = data.message.trim()
  if (note) {
    lines.push('', '*Message* :', note)
  }
  lines.push('', "Envoyé depuis le site de l'école.")
  let text = lines.join('\n')
  if (text.length > 1450 && note) {
    const overhead = text.length - note.length
    const room = Math.max(0, 1400 - overhead)
    const cut = note.slice(0, room).trimEnd()
    text = text.replace(note, `${cut}…`)
  }
  return text
}
