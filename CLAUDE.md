# NegasHosting

Mexican web hosting business — negashosting.com

## Tech Stack

- **Frontend**: React 19 + Vite + Tailwind CSS 4
- **Routing**: react-router-dom (LandingPage at `/`, BuilderPage at `/editor`)
- **Animation**: GSAP, Motion (framer-motion), ReactBits components (OGL, Three.js)
- **Language**: All UI text is in **Spanish**. Keep it in Spanish.

## Project Structure

```
src/
  main.jsx                    # Router setup
  index.css                   # All styles (no CSS modules)
  pages/
    LandingPage.jsx           # Marketing landing page at /
    BuilderPage.jsx           # AI landing page builder at /editor
  components/
    builder/                  # Builder UI components
      BuilderForm.jsx         # Main form — orchestrates all editors
      SectionEditor.jsx       # Content sections
      ButtonEditor.jsx        # CTA buttons
      NavEditor.jsx           # Navigation bar
      ContactEditor.jsx       # Contact info
      WhatsAppEditor.jsx      # WhatsApp floating button
      TypographyEditor.jsx    # Font selection
      FAQEditor.jsx           # FAQ accordion
      FormBuilder.jsx         # Contact form builder
      DeployPanel.jsx         # Publish flow (→ billing → auto-deploy)
      SaveLoadBar.jsx         # Save/load project bar
      ProjectListModal.jsx    # Saved projects modal
      LogoUpload.jsx          # Logo upload with preview
      ProtectedPreview.jsx    # iframe preview with protection
    reactbits/                # ReactBits animated components (copy-paste, not npm)
  hooks/
    useBuilderState.js        # useReducer — ALL builder state & actions
    useBuilderStateWithHistory.js  # Wraps reducer with undo/redo (Ctrl+Z)
  utils/
    generateHTML.js           # Converts builder state → standalone HTML
    generateWithAI.js         # Gemini 2.5 Flash API call (multimodal)
    deployProject.js          # POST to /api/deploy
    projectStorage.js         # localStorage persistence + pending deploy
    exportZip.js              # JSZip export
    protectHTML.js            # Preview HTML protection
  data/
    googleFonts.js            # Curated Google Fonts list
server/
  api/
    index.js                  # Express deploy API (runs on VPS, NOT locally)
    package.json
```

## Commands

```bash
pnpm dev          # Dev server at localhost:5173
pnpm build        # Production build to dist/
pnpm preview      # Preview production build
```

## Architecture Notes

- **Builder state**: Single `useReducer` in `useBuilderState.js`. All state changes go through dispatch actions. Wrapped with undo/redo history in `useBuilderStateWithHistory.js`.
- **AI generation**: Gemini 2.5 Flash via proxy (`/api/gemini` → googleapis). Supports reference images (base64) and logo upload.
- **HTML generation**: `generateHTML.js` produces a complete standalone HTML file with inline CSS/JS. No external dependencies in output.
- **Deploy flow**: User clicks "Publicar y Pagar" → project saved to localStorage → redirect to billing.negashosting.com → on return, auto-deploys via `/api/deploy`.
- **Styles**: Single `index.css` file. Builder uses `.builder-*` class prefix. Landing page uses semantic classes.

## Deploy to Production

```bash
pnpm build
cd dist && tar czf - . | sshpass -p 'PASSWORD' ssh -o StrictHostKeyChecking=no root@69.169.97.158 "tar xzf - -C /home/admin/web/negashosting.com/public_html/"
# Then on server: clean ._* files, fix ownership to admin:admin
```

SCP does not work on this server — always use tar pipe over SSH.

## VPS (69.169.97.158)

- **OS**: Ubuntu 24.04, HestiaCP 1.9.4
- **Deploy API**: Express at `/opt/deploy-api/`, systemd service `deploy-api`, port 3001 behind Nginx proxy
- **DNS**: Cloudflare (wildcard *.negashosting.com → VPS)
- **Billing**: FOSSBilling at billing.negashosting.com

## Key Conventions

- All user-facing text in Spanish
- No TypeScript — plain JSX
- Prefer editing existing files over creating new ones
- CSS in `src/index.css`, not in separate files per component
- ReactBits components are copied into `src/components/reactbits/`, not installed via npm
