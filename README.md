# CapLink Website

The public marketing and legal website for **CapLink — Smart financial decisions**, published by TechnoOracle.

Plain HTML5 + CSS3 + vanilla JavaScript. No framework, no build step, no backend. Deploy the folder as-is to any static host (Netlify, Vercel static, GitHub Pages, Cloudflare Pages, Firebase Hosting, S3, etc.).

> **Internal note:** Legal pages should be reviewed by qualified legal counsel before production publication.
>
> **SEO:** see [SEO-AUDIT.md](SEO-AUDIT.md) for the full SEO setup, placeholders and Google Search Console steps.

---

## Structure

```
caplink-website/
├── index.html              Home
├── features.html           Feature tour (7 features)
├── calculators.html        Calculator directory with category filter
├── decisions.html          Decision / comparison tools + "Can I Afford?"
├── financial-health.html   Financial Health score explainer
├── ai-assistant.html       CapLink Assistant + AI disclaimer
├── about.html              Mission / what CapLink is and isn't
├── contact.html            mailto-based contact (no fake form)
├── privacy-policy.html     Privacy Policy
├── terms.html              Terms of Use
├── disclaimer.html         Financial Disclaimer
├── delete-account.html     Account deletion instructions (Play Store requirement)
├── 404.html                Not-found page (noindex)
├── robots.txt / sitemap.xml
├── favicon.ico, site.webmanifest, .nojekyll
├── scripts/set-site-url.sh Replaces the SITE_URL placeholder everywhere
├── SEO-AUDIT.md            SEO report + Search Console steps
├── css/
│   ├── styles.css          Design tokens, layout, components
│   ├── animations.css      Scroll reveal, floating phones, glow (honours prefers-reduced-motion)
│   └── responsive.css      Breakpoints: 1800 / 1440 / 1180 / 1024 / 860 / 640 / 400 / 340
├── js/
│   ├── config.js           ← CENTRAL CONFIG (email, store links, dates)
│   ├── navigation.js       Sticky header, accessible mobile menu, legal TOC highlight
│   ├── animations.js       IntersectionObserver scroll reveal
│   └── main.js             Applies config, store-link placeholders, calculator filter
└── assets/
    ├── logo/               caplink-mark.svg, caplink-logo.svg
    ├── screenshots/        App screenshots, caplink-*.webp (480w + 940w) + JPG fallback
    ├── seo/                caplink-og-image.png (1200×630 social preview)
    ├── illustrations/      (empty — drop 3D illustrations here if you add them)
    ├── icons/              favicon-32.png, apple-touch-icon.png
    └── fonts/              Self-hosted Poppins (400/500/700, Latin + ₹ subset)
```

---

## Updating configuration

All values likely to change live in **`js/config.js`**:

```js
APP_NAME: "CapLink",
TAGLINE: "Smart financial decisions",
COMPANY_NAME: "TechnoOracle",
CONTACT_EMAIL: "technooracleinfo@gmail.com",
GOOGLE_PLAY_URL: "#",          // replace with the Play Store listing URL
IOS_URL: "#",
PRIVACY_LAST_UPDATED: "October 2026",
TERMS_LAST_UPDATED: "October 2026",
DISCLAIMER_LAST_UPDATED: "October 2026",
COPYRIGHT_YEAR: "2026"
```

Elements opt in with `data-config="KEY"` (text, and `mailto:` for the email) or `data-config-href="GOOGLE_PLAY_URL"` (store links). When the page loads, `main.js` fills every one of them from `config.js`.

**No-JavaScript fallback:** the HTML also contains the current values so the site is complete without JS and readable by search engines. If you change the email or dates permanently, also run a find-and-replace across `*.html` so the fallback matches, e.g.:

```bash
grep -rl "technooracleinfo@gmail.com" --include=*.html . | xargs sed -i '' 's/technooracleinfo@gmail.com/new@email.com/g'   # macOS
```

### Store links

While `GOOGLE_PLAY_URL` is `"#"`, the **Download on Google Play** button stays on the page and shows a short "link coming soon" note when clicked instead of navigating. Set the real URL in `config.js` and the button opens the listing in a new tab. "Coming soon on iOS" is a non-interactive badge; turn it into a link when the iOS app ships.

### Production URL (do before launch)

Canonical, Open Graph, JSON-LD, `sitemap.xml` and `robots.txt` use the placeholder `https://YOUR_PRODUCTION_URL_HERE`. Replace it everywhere with one command:

```bash
./scripts/set-site-url.sh https://your-real-url        # no trailing slash
# e.g. ./scripts/set-site-url.sh https://technooracle-development.github.io/Caplink-Website
```

---

## Things to confirm against the app

These are written carefully, but please check them against the current app build:

1. **Delete Account page** (`delete-account.html`) — this is the public URL to give Google Play Console as the account-deletion link. Steps: Open CapLink → Profile → account/settings section → Delete Account → confirm. Step 3 is worded generically because the exact menu label wasn't verified; edit steps 02–03 if needed (look for the `CONFIGURABLE` comment). Email fallback uses subject "CapLink Account Deletion Request".
2. **Saved Calculations** (`features.html` #06) uses an illustrative mini-UI with the caption "Illustration — actual app layout may differ". Swap in a real screenshot when available.
3. **Privacy Policy service providers** — the policy names only Supabase and mentions AI/analytics/hosting providers "where applicable". If you add analytics (e.g. Firebase, Mixpanel) or name your AI provider, update sections 3, 8 and 10.
4. **Children's privacy** — no minimum age is stated. Add one once your app policy / Play Console target audience is settled.
5. **Governing law / jurisdiction** is intentionally not included in the Terms; add with legal counsel.
6. **Example numbers** — the 69/100 score card and its stats are illustrative and labelled "Example only". Screenshots show sample app data.

---

## Content rules followed

- No invented users, downloads, ratings, revenue, funding, partners, awards, licences, certifications, addresses or phone numbers.
- No "100% secure", "risk-free" or guaranteed returns/savings language. Security copy: *"We use industry-standard security practices and trusted infrastructure to help protect your information."*
- CapLink is described as education / calculation / decision-support — not a bank, broker, adviser, lender, insurer or tax authority.
- AI is described as "AI-powered financial guidance for awareness and planning" with a prominent disclaimer.
- Clear statements: no bank account connection, no transaction access, no OTPs / card numbers / CVV / UPI PIN; financial information is entered manually by the user.

---

## Accessibility & performance

- Semantic landmarks, one `h1` per page, skip link, visible `:focus-visible` rings, `aria-current` on nav, `aria-expanded` mobile menu with Escape-to-close and focus containment.
- All screenshots have descriptive `alt` text; decorative SVGs are `aria-hidden`.
- `prefers-reduced-motion` disables floating, reveal and dash animations.
- Content is visible without JavaScript (reveal animations only apply once `html.js` is set).
- Screenshots: responsive `srcset` (480w/940w WebP + JPG fallback), explicit width/height (no layout shift), `loading="lazy"` below the fold; hero image uses `fetchpriority="high"`.
- No third-party requests: fonts are self-hosted, no analytics, no CDNs. Total JS ≈ 9 KB unminified.

## Fonts

Poppins by Indian Type Foundry, licensed under the SIL Open Font License 1.1 (https://openfontlicense.org). Subset to Latin + ₹ for size.

## Local preview

```bash
cd caplink-website
python3 -m http.server 8080
# open http://localhost:8080
```
