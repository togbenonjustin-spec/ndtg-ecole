export const school = {
  name: 'Complexe Scolaire Notre-Dame de Toutes Grâces',
  slogan: 'L’excellence au service de la réussite.',
  city: 'Cotonou',
  country: 'Bénin',
  identity:
    'Établissement catholique à identité mariale, présent à Cotonou sur deux sites : Kpondéhou et Ayélawadjè.',
} as const

export const devise = ['Discipline', 'Travail', 'Excellence'] as const

/** Seul endroit où le numéro WhatsApp est écrit. */
export const WHATSAPP_NUMBER = '22960416703'
export const WHATSAPP_QR_URL = 'https://wa.me/qr/25WZN2TQG2FUD1'

/** Vitesse du ruban des lauréats, en pixels par seconde. */
export const laureatsMarqueeSpeed = 70

export const phones = [
  { display: '01 97 34 52 56', tel: '+2290197345256' },
  { display: '01 64 70 70 32', tel: '+2290164707032' },
] as const

export const campuses = [
  {
    id: 'kpondehou',
    name: 'Kpondéhou',
    query: 'Complexe Scolaire Notre-Dame de Toutes Grâces Kpondéhou Cotonou',
  },
  {
    id: 'ayelawadje',
    name: 'Ayélawadjè',
    query: 'Complexe Scolaire Notre-Dame de Toutes Grâces Ayélawadjè Cotonou',
  },
] as const

export const sessionYear = 2026

export const mentions = {
  total: 33,
  tresBien: 3,
  bien: 5,
  assezBien: 25,
} as const

export const ranks = [
  { figure: '1er ex æquo', place: 'du Bénin', detail: 'BAC série B' },
  { figure: '5ᵉ', place: 'du Bénin', detail: 'BAC série B' },
  { figure: '1er', place: 'du Littoral', detail: 'BAC série D' },
] as const

export type Laureate = {
  id: string
  family: string
  given: string
  exam: string
  rank: string | null
  score: string
  scoreValue: number
  photo: string
  width: number
  height: number
  alt: string
  poster: string
  posterWidth: number
  posterHeight: number
  posterAlt: string
}

export const laureates: Laureate[] = [
  {
    id: 'adjibola',
    family: 'ADJIBOLA',
    given: 'Daryll Gilles-Christ',
    exam: 'BAC série D',
    rank: '1er du Littoral',
    score: '17,68',
    scoreValue: 17.68,
    photo: '/images/laureate-adjibola.webp',
    width: 345,
    height: 431,
    alt: 'Portrait de Daryll Gilles-Christ ADJIBOLA, lauréat du BAC série D, session 2026',
    poster: '/images/affiche-adjibola.webp',
    posterWidth: 720,
    posterHeight: 1080,
    posterAlt: 'Affiche de Daryll Gilles-Christ ADJIBOLA, 1er du Littoral au BAC série D, session 2026',
  },
  {
    id: 'bancole',
    family: 'BANCOLE',
    given: 'Lorène Agathe',
    exam: 'BAC série B',
    rank: '5ᵉ du Bénin',
    score: '16,85',
    scoreValue: 16.85,
    photo: '/images/laureate-bancole.webp',
    width: 324,
    height: 405,
    alt: 'Portrait de Lorène Agathe BANCOLE, lauréate du BAC série B, session 2026',
    poster: '/images/affiche-bancole.webp',
    posterWidth: 720,
    posterHeight: 1079,
    posterAlt: 'Affiche de Lorène Agathe BANCOLE, 5ᵉ du Bénin au BAC série B, session 2026',
  },
  {
    id: 'noutai',
    family: 'NOUTAÏ',
    given: 'Charité Hosanna',
    exam: 'BEPC',
    rank: null,
    score: '17,45',
    scoreValue: 17.45,
    photo: '/images/laureate-noutai.webp',
    width: 360,
    height: 450,
    alt: 'Portrait de Charité Hosanna NOUTAÏ, lauréate du BEPC, session 2026',
    poster: '/images/affiche-noutai.webp',
    posterWidth: 720,
    posterHeight: 897,
    posterAlt: 'Affiche de Charité Hosanna NOUTAÏ, moyenne 17,45 au BEPC, session 2026',
  },
  {
    id: 'hounkanrin',
    family: 'HOUNKANRIN',
    given: 'Sèdoto Ornela',
    exam: 'BEPC',
    rank: null,
    score: '17,21',
    scoreValue: 17.21,
    photo: '/images/laureate-ornela.webp',
    width: 312,
    height: 390,
    alt: 'Portrait de Sèdoto Ornela HOUNKANRIN, lauréate du BEPC, session 2026',
    poster: '/images/affiche-ornela.webp',
    posterWidth: 720,
    posterHeight: 1073,
    posterAlt: 'Affiche de Sèdoto Ornela HOUNKANRIN, moyenne 17,21 au BEPC, session 2026',
  },
  {
    id: 'hounton',
    family: 'HOUNTON',
    given: 'Eri Aziel',
    exam: 'BEPC',
    rank: null,
    score: '17,20',
    scoreValue: 17.2,
    photo: '/images/laureate-hounton.webp',
    width: 360,
    height: 450,
    alt: 'Portrait de Eri Aziel HOUNTON, lauréat du BEPC, session 2026',
    poster: '/images/affiche-hounton.webp',
    posterWidth: 720,
    posterHeight: 1079,
    posterAlt: 'Affiche de Eri Aziel HOUNTON, moyenne 17,20 au BEPC, session 2026',
  },
  {
    id: 'soussouni',
    family: 'SOUSSOUNI',
    given: 'Conceptia',
    exam: 'CEP',
    rank: '11ᵉ des filles du Littoral',
    score: '17,38',
    scoreValue: 17.38,
    photo: '/images/laureate-conceptia.webp',
    width: 297,
    height: 371,
    alt: 'Portrait de Conceptia SOUSSOUNI, lauréate du CEP, session 2026',
    poster: '/images/affiche-conceptia.webp',
    posterWidth: 720,
    posterHeight: 1079,
    posterAlt: 'Affiche de Conceptia SOUSSOUNI, 11ᵉ des filles du Littoral au CEP, session 2026',
  },
]

export const messages = {
  general:
    'Bonjour, je souhaite des informations sur les inscriptions au Complexe Scolaire Notre-Dame de Toutes Grâces.',
  enroll:
    'Bonjour, je souhaite inscrire mon enfant au Complexe Scolaire Notre-Dame de Toutes Grâces.',
  results:
    'Bonjour, j’ai vu vos excellents résultats 2026 et je souhaite en savoir plus sur l’admission.',
  primaire:
    'Bonjour, je souhaite inscrire mon enfant au primaire (du CI au CM2). Pouvez-vous m’indiquer la marche à suivre ?',
  cycle1:
    'Bonjour, je souhaite des informations pour une inscription au 1er cycle (de la 6ème à la 3ème).',
  cycle2:
    'Bonjour, je souhaite des informations pour la classe de 2nde, 1ère ou Terminale, séries A, B, C, D ou G2.',
} as const

export const cycles = [
  {
    index: '01',
    title: 'Primaire',
    range: 'CI → CM2',
    text: 'Le primaire accueille les élèves du CI au CM2.',
    levels: ['CI', 'CP', 'CE1', 'CE2', 'CM1', 'CM2'],
    note: null,
    message: messages.primaire,
    cta: 'Écrire pour le primaire',
  },
  {
    index: '02',
    title: '1er cycle',
    range: '6ème → 3ème',
    text: 'Le 1er cycle de l’enseignement secondaire général va de la 6ème à la 3ème.',
    levels: ['6ème', '5ème', '4ème', '3ème'],
    note: null,
    message: messages.cycle1,
    cta: 'Écrire pour le 1er cycle',
  },
  {
    index: '03',
    title: '2nd cycle',
    range: '2nde → Terminale',
    text: 'Le 2nd cycle va de la 2nde à la Terminale. En Terminale, les séries proposées sont A, B, C, D et G2.',
    levels: ['2nde', '1ère', 'Terminale'],
    note: 'Terminale · Séries A, B, C, D, G2',
    message: messages.cycle2,
    cta: 'Écrire pour le 2nd cycle',
  },
] as const

export const grades = [
  'CI',
  'CP',
  'CE1',
  'CE2',
  'CM1',
  'CM2',
  '6ème',
  '5ème',
  '4ème',
  '3ème',
  '2nde',
  '1ère',
  'Terminale',
] as const

export const seriesGrades = ['2nde', '1ère', 'Terminale'] as const
export const seriesOptions = ['A', 'B', 'C', 'D', 'G2', 'Pas encore choisie'] as const
export const relations = ['Père', 'Mère', 'Tuteur / tutrice', 'Autre'] as const
export const statuses = ['Nouvel élève', 'Ancien élève'] as const
export const campusChoices = ['Kpondéhou', 'Ayélawadjè', 'Pas de préférence'] as const

export const hours = {
  morning: 'Début entre 7 h et 8 h, fin entre 12 h et 13 h selon la classe.',
  afternoon: '14 h – 17 h.',
  saturday: 'Travaux dirigés pour les classes de 2nde, 3ème, 1ère et Terminale.',
} as const

export const steps = [
  {
    n: '01',
    title: 'Nous contacter',
    text: 'Par WhatsApp, par téléphone ou avec le formulaire de cette page.',
  },
  {
    n: '02',
    title: 'Échanger avec l’école',
    text: 'Précisez le niveau souhaité et le site : Kpondéhou, Ayélawadjè, ou sans préférence.',
  },
  {
    n: '03',
    title: 'Compléter le dossier',
    text: 'L’école vous indique les pièces à fournir et les modalités adaptées à votre situation.',
  },
  {
    n: '04',
    title: 'Inscription confirmée',
    text: 'L’école confirme la place de votre enfant.',
  },
] as const

export const faq = [
  {
    q: 'Quels niveaux sont proposés ?',
    a: 'Le primaire va du CI au CM2. L’enseignement secondaire général va de la 6ème à la Terminale.',
  },
  {
    q: 'Quelles séries sont proposées en Terminale ?',
    a: 'Les séries proposées en Terminale sont A, B, C, D et G2.',
  },
  {
    q: 'Quels sont les horaires de cours ?',
    a: 'Le matin, les cours commencent à 7 h ou 8 h et se terminent entre 12 h et 13 h selon la classe. Les cours de l’après-midi ont lieu de 14 h à 17 h.',
  },
  {
    q: 'Y a-t-il des cours le samedi ?',
    a: 'Oui. Des travaux dirigés sont organisés le samedi pour les classes de 2nde, 3ème, 1ère et Terminale.',
  },
  {
    q: 'Où se trouvent les sites de l’école ?',
    a: 'Le Complexe Scolaire dispose de deux sites à Cotonou : Kpondéhou et Ayélawadjè. Les boutons Itinéraire ouvrent une recherche de localisation sur Google Maps.',
  },
  {
    q: 'Comment connaître les frais et les pièces du dossier ?',
    a: 'Contactez-nous sur WhatsApp ou par téléphone, nous vous répondons rapidement.',
  },
  {
    q: 'Quels sont les résultats de la session 2026 ?',
    a: 'Le bilan de la session 2026 compte 33 mentions : 3 Très Bien, 5 Bien et 25 Assez Bien. La page présente les classements et les moyennes communiqués.',
  },
] as const

export const campusPhotos = [
  {
    src: '/images/facade-face-1400.webp',
    srcSet: '/images/facade-face-800.webp 800w, /images/facade-face-1400.webp 1400w',
    width: 1400,
    height: 934,
    alt: 'Façade du Complexe Scolaire Notre-Dame de Toutes Grâces à Cotonou',
  },
  {
    src: '/images/facade-entree-1400.webp',
    srcSet: '/images/facade-entree-800.webp 800w, /images/facade-entree-1400.webp 1400w',
    width: 1400,
    height: 934,
    alt: 'Entrée de l’établissement, Complexe Scolaire Notre-Dame de Toutes Grâces à Cotonou',
  },
  {
    src: '/images/facade-cour-1400.webp',
    srcSet: '/images/facade-cour-800.webp 800w, /images/facade-cour-1400.webp 1400w',
    width: 1400,
    height: 934,
    alt: 'Devanture et cour avant du Complexe Scolaire Notre-Dame de Toutes Grâces à Cotonou',
  },
] as const

export const heroImage = {
  webp: '/images/facade-hero-1600.webp',
  srcSet:
    '/images/facade-hero-720.webp 720w, /images/facade-hero-1100.webp 1100w, /images/facade-hero-1600.webp 1600w',
  jpg: '/images/facade-hero-1600.jpg',
  width: 1600,
  height: 900,
  alt: 'Façade du Complexe Scolaire Notre-Dame de Toutes Grâces à Cotonou',
} as const

export const collectivePoster = {
  src: '/images/affiche-collective.webp',
  width: 720,
  height: 1065,
  alt: 'Affiche de la session 2026 : derrière ces performances individuelles, portraits de lauréats en uniforme',
} as const

export const collectiveLine =
  'Derrière ces performances individuelles se cache une réussite collective.'

export const finalLine = 'Et si la prochaine réussite était la vôtre ?'

export const nav = [
  { href: '#resultats', id: 'resultats', label: 'Résultats' },
  { href: '#ecole', id: 'ecole', label: 'L’école' },
  { href: '#classes', id: 'classes', label: 'Classes' },
  { href: '#horaires', id: 'horaires', label: 'Horaires' },
  { href: '#inscription', id: 'inscription', label: 'Inscription' },
  { href: '#contact', id: 'contact', label: 'Contact' },
] as const

export function whatsAppDisplay(): string {
  const n = WHATSAPP_NUMBER
  return `+${n.slice(0, 3)} ${n.slice(3, 5)} ${n.slice(5, 7)} ${n.slice(7, 9)} ${n.slice(9)}`
}

export function mapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
