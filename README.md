# HLC Développement preview

Static React single-page preview for HLC Développement with bilingual (FR/EN) content, hero carousel, detailed track record modals, pipeline overview, and contact section.

## Aperçu local / Development

1. Installez les dépendances :

   ```bash
   npm install
   ```

2. Lancez le serveur de développement :

   ```bash
   npm run dev
   ```

3. Ouvrez le navigateur sur l’URL indiquée par Vite (par défaut <http://localhost:5173>) pour voir l’aperçu en direct.

### Mode preview (build statique)

Pour tester le build de production localement :

```bash
npm run build
npm run preview
```

Ensuite, ouvrez le lien indiqué (également sur le port 4173 par défaut).

The site uses Tailwind via CDN for styling during local development. Adjust the image and asset URLs in `src/App.jsx` when production assets are available.
