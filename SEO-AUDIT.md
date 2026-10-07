# CapLink Website — SEO Audit & Implementation Report

**Date:** October 2026
**Scope:** All 12 public pages plus the new 404 page. Plain HTML/CSS/JS static site.
**Design:** unchanged. The colours, typography, components, layout and screenshots are the same as before. The only new visible elements are breadcrumbs, FAQ accordions, explainer cards and related-tool links. All of them reuse existing CapLink components.

> ⚠️ **Placeholder you must replace:** `https://YOUR_PRODUCTION_URL_HERE`
> Run `./scripts/set-site-url.sh https://your-real-url` from the website folder. One command updates every canonical tag, Open Graph/Twitter tag, JSON-LD block, `sitemap.xml`, `robots.txt`, `js/config.js` and the 404 page base path. See [§11](#11-remaining-placeholders).

---

## 0. Audit findings (before changes)

| Area | Finding | Status |
|---|---|---|
| Titles / descriptions | Present and unique, but not aligned with search intent. For example, the Terms description was only 62 characters and the calculator title didn't name any calculators. | ✅ Rewritten per page |
| Canonical | Present but pointed to `YOUR-DOMAIN.com` | ✅ Moved to a single `SITE_URL` placeholder plus a replace script |
| H1 | Exactly one per page ✓. Several H1s didn't describe the page's search topic. | ✅ Updated (Features, Calculators, Decisions, Financial Health, AI Assistant) |
| Heading hierarchy | No skipped levels ✓ | ✅ Kept; new sections follow H2 → H3 |
| Open Graph | Present; `og:image` was a JPG in `/backgrounds/` | ✅ Moved to `assets/seo/caplink-og-image.png`, added `og:locale` and `og:image:alt` |
| Twitter/X | Only `twitter:card` | ✅ Added `twitter:title`, `twitter:description`, `twitter:image` and `twitter:image:alt` |
| Structured data | One basic `MobileApplication` block on the home page only | ✅ Full JSON-LD `@graph` on every indexable page |
| robots.txt / sitemap.xml | Missing | ✅ Created |
| 404 page | Missing | ✅ Created (`noindex`) |
| favicon.ico | Missing (only SVG + PNG) | ✅ Added `favicon.ico`, 192/512 icons and `site.webmanifest` |
| Breadcrumbs | None | ✅ Visible breadcrumbs plus matching `BreadcrumbList` on inner pages |
| FAQ content | None | ✅ Visible FAQs plus matching `FAQPage` on 5 pages |
| Thin content | Calculators, Decisions and AI pages had little explanatory copy | ✅ Added explainer sections and FAQs |
| Internal linking | Good navigation; few contextual cross-links between the calculator, decision, health and AI hubs | ✅ Added contextual "hub" links and descriptive anchors |
| Generic anchors | None found ("click here" / "read more") ✓ | — |
| Image alt text | All images had descriptive alt text ✓ | ✅ Kept; screenshot files renamed descriptively |
| Image performance | WebP + srcset + width/height ✓ | ✅ Added an LCP `preload` for the home hero |
| **LCP** | **Hero content started at `opacity: 0` (scroll-reveal), which delayed LCP** | ✅ Fixed; see §9 |
| Mobile | One overflow found at 320px on Features (long link button) | ✅ Fixed |
| Language / viewport / charset | Present ✓ | ✅ Normalised to `UTF-8` / `initial-scale=1.0` |
| Secrets | No API keys, Supabase keys or tokens anywhere in the site ✓ | — |
| GitHub Pages / Jekyll | Jekyll could process `README.md` / `SEO-AUDIT.md` into public pages | ✅ Added `.nojekyll` |

---

## 1. What changed (summary)

- Unique, intent-led **titles and meta descriptions** on every page, as specified in the brief.
- **Canonical, Open Graph and Twitter/X** tags on every indexable page, written directly in the HTML so nothing depends on JavaScript.
- **JSON-LD structured data**: Organization, WebSite, SoftwareApplication, WebPage subtypes, BreadcrumbList and FAQPage.
- **robots.txt**, **sitemap.xml**, **404.html**, **favicon.ico**, **site.webmanifest** and **.nojekyll** added.
- Visible **breadcrumbs** and **FAQ** sections, plus new **explainer** content on the Calculators and Decisions pages.
- **Contextual internal links** connecting Calculators ⇄ Decisions ⇄ Financial Health ⇄ AI Assistant.
- **Descriptive screenshot filenames** (`caplink-*.webp/.jpg`).
- **LCP fix**: above-the-fold content is no longer hidden by the reveal animation, and the home hero image is preloaded.
- **About page** now has a "Who operates CapLink" section (TechnoOracle, contact email, policy links, plus a statement that the content is educational). This supports E-E-A-T and YMYL trust signals.
- `scripts/set-site-url.sh` replaces the domain placeholder with one command.

## 2. Technical SEO

| Item | Implementation |
|---|---|
| `<!doctype html>`, `<html lang="en">`, `<meta charset="UTF-8">`, viewport | Every page |
| `<meta name="robots">` | `index, follow, max-image-preview:large, max-snippet:-1` on public pages; `noindex, follow` on 404 |
| Canonical | Absolute, self-referencing; home uses `/` (not `/index.html`) |
| Clean URLs | Existing `.html` URLs kept unchanged (no redirects needed) |
| Render-blocking | Only 3 small CSS files. All JS uses `defer`. One inline line sets `html.js`. No third-party requests. |
| Fonts | Self-hosted Poppins (3 weights, Latin + ₹ subset, ~12 KB each), `font-display: swap`, 2 critical weights preloaded |
| `.nojekyll` | Stops GitHub Pages from running Jekyll over the files |
| Search Console | Placeholder comment in every `<head>`: `<!-- GOOGLE SEARCH CONSOLE VERIFICATION CODE GOES HERE -->` |

## 3. Metadata per page

| Page | Title | H1 |
|---|---|---|
| `/` | CapLink — Smart Financial Decisions & Money Tools | Make smarter financial decisions. |
| `/features.html` | CapLink Features — Financial Decisions, Calculators & Insights | Everything you need to make smarter financial decisions. |
| `/calculators.html` | Financial Calculators — SIP, EMI, Gold, Retirement & More \| CapLink | Financial calculators for smarter decisions. |
| `/decisions.html` | Financial Decision Tools — Rent vs Buy, Car Loan & More \| CapLink | Compare before you decide. |
| `/financial-health.html` | Financial Health Check & Score — Understand Your Finances \| CapLink | Know where you stand financially. |
| `/ai-assistant.html` | CapLink Assistant — AI Financial Insights & Education | Your financial questions, explained. |
| `/about.html` | About CapLink — Making Financial Decisions Simpler | Why CapLink? |
| `/contact.html` | Contact CapLink — Questions, Feedback & Support | Let's talk. |
| `/privacy-policy.html` | Privacy Policy — CapLink | Privacy Policy |
| `/terms.html` | Terms of Use — CapLink | Terms of Use |
| `/disclaimer.html` | Financial Disclaimer — CapLink | Financial Disclaimer |
| `/delete-account.html` | Delete Your CapLink Account | Delete Your CapLink Account |
| `/404.html` (noindex) | Page not found — CapLink | Looks like this decision doesn't exist. |

All descriptions follow the brief's wording and are unique; this was verified programmatically.

## 4. Structured data (JSON-LD)

| Page | Types |
|---|---|
| Home | `Organization` (TechnoOracle, email, contactPoint, logo) · `WebSite` · `SoftwareApplication` (CapLink, `FinanceApplication`, Android, featureList) · `WebPage` · `FAQPage` |
| Features, Calculators, Decisions | `Organization` · `WebSite` · `CollectionPage` · `BreadcrumbList` (+ `FAQPage` on Calculators and Decisions) |
| Financial Health, AI Assistant | `Organization` · `WebSite` · `WebPage` · `BreadcrumbList` · `FAQPage` |
| About | `Organization` · `WebSite` · `SoftwareApplication` · `AboutPage` · `BreadcrumbList` |
| Contact | `Organization` · `WebSite` · `ContactPage` · `BreadcrumbList` |
| Privacy, Terms, Disclaimer, Delete Account | `Organization` · `WebSite` · `WebPage` · `BreadcrumbList` |

**Deliberately not included:** `aggregateRating`, `review`, `offers`/price, download counts, awards and `SearchAction` (the site has no search). Nodes are linked by `@id`.

**Verified automatically:**
- Every JSON-LD block parses.
- Every `BreadcrumbList` matches the visible breadcrumb text.
- Every `FAQPage` question and answer appears word-for-word on the page.

**Expectation notes:**
- Google shows **FAQ rich results** only for a small set of authoritative government and health sites, so the FAQ markup mainly helps search engines understand the page. The FAQs themselves are useful visible content.
- **SoftwareApplication** rich results need `offers` plus ratings, which we don't have. The markup is still valid and helps entity understanding. Add `offers` (`price: 0`) only if the app is free, and ratings only from real Play Store data.

## 5. Sitemap

- `sitemap.xml` lists **12 URLs**: all public pages including the legal pages, with `lastmod` 2026-10-08.
- Excluded: `404.html` and all assets.
- The XML has been validated.

## 6. robots.txt

```
User-agent: *
Allow: /
Sitemap: https://YOUR_PRODUCTION_URL_HERE/sitemap.xml
```

Nothing is blocked, including CSS, JS and images.

> **GitHub Pages project sites:** crawlers only read `robots.txt` at the domain root. If the site lives at `https://technooracle-development.github.io/Caplink-Website/`, its robots.txt won't be read, which is harmless because nothing is blocked. Submit the sitemap in Search Console instead. With a custom domain, robots.txt works normally.

## 7. Internal linking

```
Home ──► Features ──► Decisions · Calculators · Financial Health · AI Assistant
Calculators ──► Decisions ("Compare a big decision") · Financial Health ("Understand your broader position") · AI Assistant ("Ask what a result means")
Decisions ──► Calculators ("Use our financial calculators…") · Financial Health ("check your Financial Health")
Financial Health ──► Decisions ("Planning a major purchase?") · Calculators · AI Assistant
AI Assistant ──► Calculators · Financial Health · Disclaimer
About ──► Privacy · Terms · Disclaimer · Delete Account · Contact
Every page ──► header nav (6 hubs) + footer (all pages incl. legal)
```

- The calculator explainer links to each calculator card (`#sip`, `#emi`, …).
- Features links to `decisions.html#afford-title`.
- Anchor text is descriptive, for example "Explore CapLink financial calculators" and "Compare rent vs buy and other decisions".
- Every internal link and fragment was checked: **0 broken**.

## 8. Image SEO

- Screenshots were renamed to descriptive names: `caplink-home-decisions`, `caplink-financial-health`, `caplink-rent-vs-buy-result`, `caplink-caplink-assistant`, `caplink-gold-calculator`, `caplink-quick-calculators`, `caplink-can-i-afford`, `caplink-onboarding`, `caplink-home-health`. Each comes as `.webp` (940w), `-480.webp` and a `.jpg` fallback.
- Every `<img>` has descriptive alt text (0 missing). Decorative SVG icons use `aria-hidden`.
- `width`/`height` are set on every screenshot, so there's no layout shift. Below-the-fold images use `loading="lazy"`. The hero uses `fetchpriority="high"` plus a `<link rel="preload" imagesrcset>`.
- Social image: `assets/seo/caplink-og-image.png` (1200×630). It's built from the real app screenshots, the logo, the headline and the tagline, and makes no claims.

## 9. Performance (measured in Chromium: 4× CPU slowdown, ~16 Mbps, 150 ms RTT)

| Page | LCP before | LCP after | CLS |
|---|---|---|---|
| Home (mobile 390px) | 2.10 s | **0.80 s** | 0.001 |
| Home (desktop 1440px) | 2.75 s | **1.53 s** | 0.0006 |
| Calculators (mobile) | 1.42 s | **0.59 s** | 0 |
| Delete Account (mobile) | 1.44 s | **0.51 s** | 0 |

The fix: scroll-reveal had set hero content to `opacity: 0` until JavaScript revealed it. Above-the-fold content in `.hero` and `.page-hero` is now always opaque and only slides gently. Total JS is about 9 KB, there are no libraries, and the home page transfers about 340 KB in total.

*Lighthouse couldn't be installed in this environment. Run PageSpeed Insights on the live URL after deploying (see §13).*

## 10. Accessibility

- Breadcrumbs use `<nav aria-label="Breadcrumb">` with `aria-current="page"`.
- FAQs use native `<details>`/`<summary>`, so they're keyboard-accessible, and each question is an `<h3>`.
- Checks that still pass: skip link, one H1 per page, no skipped heading levels, visible focus states, mobile menu with `aria-expanded`, Escape to close and focus containment, and `prefers-reduced-motion` respected.
- No horizontal overflow at 320, 390, 768, 1024 or 1440px on any page.

## 11. Remaining placeholders

| Placeholder | Where | How to fix |
|---|---|---|
| `https://YOUR_PRODUCTION_URL_HERE` | Canonicals, OG/Twitter, JSON-LD, sitemap, robots, `js/config.js` | `./scripts/set-site-url.sh https://your-url` |
| `GOOGLE_PLAY_URL: "#"` | `js/config.js` | Paste the Play Store listing URL |
| `<!-- GOOGLE SEARCH CONSOLE VERIFICATION CODE GOES HERE -->` | Every `<head>` | Only if you use the HTML-tag verification method |
| `lastmod` dates | `sitemap.xml` | Update when page content changes |

## 12. Things to configure manually

1. **Decide the production URL.**
   - **GitHub Pages without a custom domain:** most likely `https://technooracle-development.github.io/Caplink-Website`. I couldn't confirm Pages is live from here, so check it under the repo's **Settings → Pages**.
   - **Custom domain (recommended for a finance brand):** add it in **Settings → Pages**. GitHub creates a `CNAME` file.
2. Run `./scripts/set-site-url.sh <url>`, then commit and push.
3. Add the real Google Play URL to `js/config.js` when the listing is live.
4. **Optional, after deciding on privacy and consent requirements:** configure Google Analytics or Google Tag Manager. No analytics or tracking scripts were added. If you add them, update the Privacy Policy (§3 and §10).
5. Add official social profiles (as `sameAs` in the Organization JSON-LD and in the footer) only once they exist. None were invented.

## 13. Google Search Console steps (after deploying)

1. Open **https://search.google.com/search-console**.
2. **Add property.**
   - Custom domain: choose **Domain** and verify with a DNS TXT record.
   - GitHub Pages: choose **URL prefix** and enter the full URL, e.g. `https://technooracle-development.github.io/Caplink-Website/`.
3. **Verify ownership.** For URL-prefix properties, the HTML tag method works: paste the `<meta name="google-site-verification" …>` tag where the placeholder comment is in `index.html`, then push.
4. Go to **Sitemaps** and submit `sitemap.xml` (full URL: `<SITE_URL>/sitemap.xml`).
5. Use **URL Inspection** on the homepage, then **Request indexing**.
6. Repeat URL Inspection for `/calculators.html`, `/decisions.html`, `/financial-health.html`, `/ai-assistant.html`, `/features.html` and `/delete-account.html`.
7. Check **Enhancements**: Breadcrumbs should appear after Google crawls the site. Also check **Page indexing**.
8. Monitor **Performance** (queries, clicks, CTR) weekly at first. Indexing usually takes days to a few weeks. **Nothing is indexed yet**, because this site hasn't been verified or submitted.
9. Optional: do the same in **Bing Webmaster Tools**, which can import from Search Console. Bing also feeds DuckDuckGo.
10. Test the live pages with **PageSpeed Insights** and the **Rich Results Test** (https://search.google.com/test/rich-results).

## 14. Recommended next steps

- **Use a custom domain.** It looks more trustworthy for a finance app, makes robots.txt work at the root, and keeps your URLs if you move off GitHub Pages.
- **Link the Play Store listing to the website** (developer website field), and link back to the listing once it's live. This is a strong, legitimate entity signal.
- **Consider adding standalone guide pages only where you have real expertise to share**, for example "How an EMI is calculated" or "Rent vs buy: what to consider". Each needs genuine depth, not keyword variants.
- Keep `lastmod` and the policy "Last updated" dates accurate.
- Optionally convert fonts to WOFF2 (about 30% smaller) using a machine with `fonttools` and `brotli`.
- Watch Search Console's Core Web Vitals report once there's real traffic.

---

## Final checklist

- [x] Unique title on every page
- [x] Unique meta description on every page
- [x] Self-referencing canonical on every indexable page (placeholder domain)
- [x] Exactly one H1 per page; no skipped heading levels
- [x] Open Graph (title, description, url, type, image, image alt, locale)
- [x] Twitter/X `summary_large_image` metadata
- [x] `lang="en"`, `charset UTF-8`, viewport
- [x] Descriptive alt text on all images; descriptive filenames
- [x] Contextual internal links; descriptive anchors
- [x] 0 broken internal links or fragments; 0 missing assets
- [x] JSON-LD: Organization, WebSite, SoftwareApplication, WebPage types, BreadcrumbList, FAQPage
- [x] Breadcrumb and FAQ schema match visible content
- [x] `sitemap.xml` (12 URLs, valid XML)
- [x] `robots.txt` (allows everything, references the sitemap)
- [x] `404.html` (noindex, on-brand, helpful links)
- [x] favicon.ico, SVG icon, apple-touch-icon, web manifest
- [x] Responsive with no overflow at 320–1440px
- [x] LCP and CLS improved and measured
- [x] No keyword stuffing, hidden text or doorway pages
- [x] No fake reviews, ratings, user numbers, awards, licences or company facts
- [x] No guaranteed-returns or "best/#1" claims; YMYL disclaimers in place
- [x] No secrets or keys in public files
- [ ] **You:** replace `SITE_URL`, deploy, verify in Search Console, submit the sitemap
