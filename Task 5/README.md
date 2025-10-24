# Task 5 – Website Quality Improvements

This Task upgrades Performance, Accessibility, and SEO for the multi‑page blog (Task 4) and ships a ready‑to‑audit version.

## What changed
- **Performance**: WebP-ready markup, lazy images (`loading="lazy"`), `decoding="async"`, explicit `width`/`height`, minified CSS/JS, `defer` scripts.
- **Accessibility**: Semantic landmarks (`header`, `nav`, `main`, `footer`), skip link, labels, `aria-live` for search and form status, focus styles, proper heading order.
- **SEO**: Unique titles + descriptions, canonical URLs, favicon, Open Graph/Twitter cards, `robots.txt`, `sitemap.xml`.
- **Best Practices**: `prefers-reduced-motion` support, preconnect for fonts, consistent alt text.

## Files
- `index.html`, `blog.html`, `contact.html`, `post-1.html` … `post-4.html`
- `assets/css/styles.min.css` (minified)
- `assets/js/main.min.js` (minified)
- `assets/favicon.svg`
- `robots.txt` and `sitemap.xml`
- `screenshots/` (place Lighthouse reports here)
- `CACHE_HEADERS_EXAMPLES.txt` (optional caching for Apache/Netlify)

## How to run locally
- Open `index.html` in a browser.
- Ensure paths remain relative (`assets/...`).

## Lighthouse – Run BEFORE and AFTER
1. Open Chrome → DevTools → Lighthouse.
2. Select Mobile and Desktop, categories: Performance, Accessibility, Best Practices, SEO.
3. Click Analyze and save screenshots to `screenshots/before-*`.
4. Use the optimized Task 5 build (this folder), hard‑reload (disable cache), run again.
5. Save to `screenshots/after-*`.

### Suggested score deltas (typical)
- Performance: **+20–35**
- Accessibility: **+5–15**
- Best Practices: **+5–10**
- SEO: **+10–25**

## 5–10 line summary (paste into your submission)
- Optimized images via lazy‑loading and async decoding, with explicit dimensions to reduce layout shifts.
- Minified and deferred CSS/JS, preserving a fast first render and reducing network cost.
- Removed render‑blocking patterns and prepared for WebP sources if local assets are added later.
- Improved semantics with `<header>`, `<nav>`, `<main>`, `<footer>` and a global skip link for keyboard users.
- Ensured proper heading order and added robust form labels with `aria-live` status for feedback.
- Added color‑contrast friendly palette and respected `prefers-reduced-motion` for motion sensitivity.
- Strengthened SEO using unique titles, descriptions, canonical URLs, favicons, and social meta.
- Added `robots.txt` and `sitemap.xml` to help crawlers discover and preview pages.
- Provided optional long‑lived caching headers for static assets to speed up repeat visits.

## Notes
- Replace the canonical base `https://www.maincrafts.com/` if you deploy to another domain.
- If you add local images, prefer `.webp` and update `<picture>` sources.
