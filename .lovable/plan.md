# Maryam Alblushi — Dubai Real Estate Advisory Site

A premium, mobile-first, fully RTL bilingual marketing site (Persian default, Arabic secondary) optimized for WhatsApp/consultation lead generation. English is dropped from the build per the visual brief (FA/AR switcher only); EN copy from the content source is held in reserve and not shipped.

## Scope

- Languages: `/fa` (default, redirect from `/`) and `/ar`. Full RTL on both. Language switcher in nav.
- No backend in v1: lead form posts to a TanStack server function that builds a WhatsApp deep link and returns success (no DB, no email). Lovable Cloud can be added later if persistence is needed.
- Placeholder imagery (Dubai skyline, villas, interiors) via generated assets in `src/assets/`.
- Placeholders for RERA BRN (62593), prices, projects, testimonials — all clearly editable in one content file per language.

## Routes (file-based, TanStack Start)

```
src/routes/
  __root.tsx                 shell, fonts, RTL <html dir="rtl" lang="fa|ar">
  index.tsx                  redirects to /fa
  $lang.tsx                  layout: validates lang, sets dir/lang, renders Header/Footer/StickyCTA + <Outlet/>
  $lang.index.tsx            Home (all 12 sections)
  $lang.projects.tsx         Projects listing + filters
  $lang.dubai-residency-property.tsx   Residency-by-property guide
  $lang.about.tsx            About Maryam
  $lang.blog.tsx             Blog index (preview cards, static)
  $lang.faq.tsx              Full FAQ
  $lang.contact.tsx          Contact + lead form
  api/lead.ts                Server route: validate + return WhatsApp deep link
```

Each route sets its own `head()` with FA or AR title/description, OG tags, canonical, and `hreflang` alternates between `/fa/...` and `/ar/...`. JSON-LD `RealEstateAgent` schema injected on home + about.

## Content architecture

- `src/content/fa.ts` and `src/content/ar.ts` — single source of truth per locale (hero, trust bar, goal cards, projects, residency steps, how-it-works, about, testimonials, lead magnet, FAQ, blog stubs, footer, nav labels, form labels, WhatsApp prefilled messages).
- `src/lib/i18n.ts` — `useT()` hook reading from current `$lang` param; type-safe keys.
- `src/lib/whatsapp.ts` — builds `https://wa.me/<number>?text=<encoded>` with per-section prefilled message.

## Design system (`src/styles.css`)

Tokens (oklch) added:
- `--background` warm sand/beige, `--surface` ivory, `--foreground` charcoal
- `--primary` deep teal, `--primary-foreground` ivory
- `--accent` warm gold/sand, `--contrast` near-black for dramatic sections
- `--ring`, `--border` soft warm neutrals
- Radii: large rounded (`--radius: 1.25rem`) for the framed container and cards
- Shadows: `--shadow-soft`, `--shadow-card`

Typography:
- Serif display (Playfair Display) for H1/H2; sans (Inter for AR/EN fallback, Vazirmatn for FA, Noto Kufi Arabic for AR) for body.
- Loaded via Google Fonts in `__root.tsx` `head.links`.
- Font stack chosen per active locale.

## Components (`src/components/site/`)

- `Header.tsx` — pill nav floating in framed container; FA/AR switcher; WhatsApp icon button.
- `Hero.tsx` — cinematic image, oversized serif headline, subtitle, two pill CTAs with circular arrow icon, overlay trust/stat chips (RERA BRN, Dubai UAE, FA/AR support, Property+Residency).
- `TrustBar.tsx`
- `GoalCards.tsx` — 5 cards (residency, investment, villas, apartments, land).
- `FeaturedProjects.tsx` — carousel of rounded image cards with badges (Villa/Apartment/Land/Dubai/Sharjah/Installment/Residency Eligible) and "Get current price" CTA → WhatsApp.
- `ProjectsGrid.tsx` + `ProjectFilters.tsx` (search params via zod adapter: `type`, `city`, `payment`).
- `ResidencySteps.tsx` — numbered steps + disclaimer.
- `HowItWorks.tsx` — 6 steps.
- `AboutMaryam.tsx` — black contrast section, portrait placeholder, BRN badge.
- `Testimonials.tsx` — quote cards + video placeholder.
- `LeadMagnet.tsx` — premium rounded card form (name, WhatsApp, country, budget, goal, language).
- `FAQ.tsx` — shadcn Accordion.
- `BlogPreview.tsx` — 6 SEO article cards (static stubs linking to `/[lang]/blog`).
- `FinalCTA.tsx` + `Footer.tsx`.
- `StickyMobileBar.tsx` — WhatsApp / Call / Consultation, mobile only.
- `LangSwitcher.tsx` — swaps `$lang` param while preserving path.

Animations: `framer-motion` fade-up on scroll, hover lift on cards, slow image zoom on hero, arrow nudge on button hover. Restrained, no excess.

## Forms & lead handling

- Client: `react-hook-form` + `zod` schema (name 1–100, WhatsApp regex, country 1–60, budget enum, goal enum, lang enum).
- Submit calls `createServerFn` `submitLead` which re-validates with zod and returns `{ ok: true, whatsappUrl }`.
- Success state: replaces form with confirmation card + "Continue on WhatsApp" button (deep link with prefilled FA/AR message including the submitted info).
- No persistence in v1.

## SEO

- Per-route `head()`: localized title (<60), description (<160), OG, Twitter, canonical, `hreflang` x-default → `/fa`.
- One `<h1>` per page, semantic landmarks (`header/main/nav/footer/section` with aria-labels).
- `RealEstateAgent` JSON-LD on home + about (name, areaServed: Dubai/UAE, languages, sameAs Instagram).
- Lazy-loaded images with width/height set; modern formats; preconnect to fonts.

## Sticky WhatsApp CTA

Visible on mobile (bottom bar) and as floating button on desktop with refined gold-on-teal styling. Number stored in `src/lib/contact.ts` as a placeholder constant for easy edit.

## Out of scope (v1)

- English routes (FA/AR only per visual brief)
- Real CMS / database persistence
- Real testimonials, real project data, real BRN photo
- Auth, payments

## Technical notes

- TanStack Start file-based routing; no React Router DOM, no `_app` folder.
- `<html dir>` and `<html lang>` set dynamically in `__root` shell using the active route's `$lang` (default `fa`).
- Tailwind v4 tokens in `src/styles.css`; no inline color classes — semantic tokens only.
- `bun add framer-motion react-hook-form @hookform/resolvers zod @tanstack/zod-adapter` (zod likely already present).
- Hero + section imagery generated once into `src/assets/` and imported.

After approval I'll build everything in one pass, then QA the preview at mobile and desktop widths.
