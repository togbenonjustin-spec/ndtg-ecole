# Complexe Scolaire Notre-Dame de Toutes Grâces

Site statique de l’école (Cotonou). Une page d’accueil, plus les mentions légales. Tout le contenu éditable est dans `src/content.ts`.

## Modifier le site

- Résultats, noms, moyennes, horaires, textes, FAQ : `src/content.ts`
- Numéro WhatsApp : `WHATSAPP_NUMBER` dans `src/content.ts` (ne pas le recopier ailleurs)
- Lien QR : `WHATSAPP_QR_URL` dans le même fichier
- Vitesse du ruban des lauréats : `laureatsMarqueeSpeed` (pixels par seconde)
- Photos : remplacer les fichiers dans `public/images/`, en gardant les mêmes noms, ou mettre à jour les chemins dans `content.ts`
- Logo : `public/images/logo-256.png` et les autres tailles (`logo-64.png`, `logo-128.png`, `logo-512.png`, `icon-192.png`, `icon-512.png`)

Le dépôt GitHub est privé : il contient des portraits d’élèves. Ne le passe pas en public sans l’accord des familles.

Adresse : https://github.com/togbenonjustin-spec/ndtg-ecole

## Animations

Deux outils, deux rôles, pour qu’ils ne se mélangent pas :

- Lenis lisse seulement le défilement à la souris, sur ordinateur. Il ne prend pas le doigt sur téléphone, pour que le bouton WhatsApp reste fixe.
- GSAP anime les apparitions, les compteurs et la barre des mentions. Il est prévenu par Lenis, donc les deux suivent la même horloge.
- Le ruban des lauréats reste une animation CSS à part. GSAP ne le touche pas.

Si le visiteur demande moins d’animations dans son téléphone, tout reste visible et calme.

## Lancer en local

```bash
npm install
npm run dev
```

Le serveur écoute sur le port 5173.

## Déployer

Le site est un export statique.

```bash
npm run build
```

Le dossier `dist/` se dépose sur Netlify, Vercel, Cloudflare Pages ou GitHub Pages. Avant la mise en ligne, remplacez l’image de partage par une URL absolue (`og:image`) une fois le domaine connu, et ajoutez ce domaine dans `robots.txt`.

## Fiche Google Business

- Nom : Complexe Scolaire Notre-Dame de Toutes Grâces
- Catégorie : École privée
- Deux fiches ou deux adresses si possible : Kpondéhou et Ayélawadjè, Cotonou
- Téléphones : 01 97 34 52 56 et 01 64 70 70 32
- Site web : l’adresse définitive du site
- Bouton : WhatsApp, +229 60 41 67 03
- Horaires : semaine 7 h – 17 h (matin selon la classe), samedi réservé aux travaux dirigés de 2nde, 3ème, 1ère et Terminale
- Photos : façade, logo, résultats 2026

## Images

| Fichier reçu | Emplacement |
| --- | --- |
| Logo (médaillon) | En-tête, hero, filigrane, pied de page, favicon, image de partage, cartes des sites |
| IMG-20261022-WA0040.jpg | Hero et galerie (façade de face) |
| IMG-20261022-WA0034.jpg | Galerie (entrée) |
| IMG-20261022-WA0038.jpg | Galerie (devanture) |
| Affiche ADJIBOLA | Portrait du ruban et de la grille, affiche |
| Affiche BANCOLE | Portrait et affiche |
| noutai-charite-360.jpg | Portrait |
| Affiche NOUTAÏ | Affiche |
| Affiche HOUNKANRIN | Portrait et affiche |
| hounton-eri-360.jpg | Portrait |
| Affiche HOUNTON | Affiche |
| Affiche SOUSSOUNI | Portrait et affiche |
| Affiche « Derrière ces performances… » | Section collective |

Non affichées, volontairement :

- Façade retouchée avec une enseigne « lycée » et un nom différent de l’officiel : le mot est interdit, et ce n’est pas la façade réelle.
- Capture Facebook d’un tiers (« les images peuvent être protégées ») : non utilisée.
- Capture de story, trop petite et floue.
- `reussite-collective-320.webp` et `bancole-lorene-180.webp` : doublons trop petits des fichiers déjà utilisés.

Aucune photo distincte d’Ayélawadjè n’a été fournie. Les cartes des deux sites n’attribuent donc pas la façade à un quartier. Le bouton Itinéraire ouvre Google Maps.

## Résumé

Le site a été reconstruit à partir du brief et des images fournies, sans recopier l’ancien site en ligne. Il présente les résultats 2026, les six lauréats, les niveaux du CI à la Terminale, les deux sites, les horaires, un formulaire qui prépare un message WhatsApp, et les contacts. Le numéro WhatsApp et les chiffres sont centralisés dans un seul fichier.
