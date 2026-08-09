# Thank You Note Generator

Create a memorable thank-you note (or birthday, congratulations, and more) in the browser — customize tone, theme, language, and length, then preview, download, or share.

**Live use:** open `index.html` locally, or host this folder on Netlify / GitHub Pages.

## Features

- Idea → customize → animated letter preview → share
- Themes, tones, paragraph count, greetings & closings
- Smart detection for prompts like “happy birthday”
- Languages: English, فارسی, العربية, Español, Français, Deutsch
- Download HTML or text, copy link, email, WhatsApp, print/PDF, save draft

## Files to upload (required)

Upload **only** these when publishing (GitHub, Netlify Drop, etc.):

| File | Purpose |
|------|---------|
| `index.html` | Main page |
| `styles.css` | Layout & letter styles |
| `themes.css` | Theme variants |
| `generator.js` | Note text generation |
| `script.js` | App flow & sharing |
| `i18n.js` | Website translations |
| `README.md` | This file |
| `LICENSE` | License |

## Do **not** upload

- `.netlify/` — local Netlify cache/config
- `.git/` — only if you are using GitHub’s web “upload files” UI and already have a repo elsewhere (Git manages this automatically when you `git push`)
- `node_modules/` — not used by this project
- Editor junk: `.DS_Store`, `Thumbs.db`, `*.log`

Simplest approach: upload the whole project folder **except** `.netlify`.

## Local preview

Open `index.html` in a browser, or:

```bash
npx --yes serve .
```

## License

MIT — see [LICENSE](LICENSE).
