# IddiLabs Website — Architecture & Specification

Owner: Matteo Capacci
Stack: Next.js 15 (App Router), React 19, Tailwind CSS 4, shadcn/ui, Lucide, Framer Motion, Vercel
Scope: Single‑brand landing site + projects showcase. No custom backend initially.

---

## 1) Positioning & Messaging (clear, non‑developer identity)

**One‑liner**: “IddiLabs — a Risk Manager tinkering with AI to build small, useful tools and workflows.”
**Tagline options**:

* Practical AI experiments for compliance & operations.
* From spreadsheets to smart workflows — tiny tools, real impact.
* Risk & Controls meets modern web.

**Tone**: grounded, curious, non‑commercial. Emphasize learning-in-public and demos, not selling.

**Primary CTA**: “Explore Projects” + secondary “Contact Matteo”.

---

## 2) Audience & Goals

* **Audience**: hiring managers, peers in Risk/Controls, compliance folks, tech‑curious expats in Luxembourg.
* **Goals**:

  1. Credibility: show AI proficiency applied to real problems.
  2. Clarity: what Matteo builds, why, and how.
  3. Fast navigation to live demos and GitHub.

**Non‑Goals**: lead capture popups, paid services, complex CMS.

---

## 3) Information Architecture (IA)

```
/
├─ / (home)
│  ├─ Hero
│  ├─ About Me
│  ├─ Why IddiLabs
│  ├─ Projects (grid, filters)
│  ├─ Contact
│  └─ Footer
├─ /projects
│  ├─ index (all projects + filters/pills)
│  └─ /[slug] (project detail)
├─ /about (optional long‑form bio + philosophy)
├─ /uses (tooling & stack page; optional)
├─ /contact (standalone form)
├─ /legal
│  ├─ /imprint (Lux requirements)
│  └─ /privacy
└─ /sitemap.xml, /robots.txt
```

**Navigation (top)**: Projects, About, Contact. CTA button “Explore Projects”.

---

## 4) Home Page Wireframe (ASCII)

```
[ NAVBAR ]  IddiLabs | Projects | About | Contact          (Theme toggle)
-----------------------------------------------------------------------
[ HERO ]   Headline: Risk Manager building tiny AI tools
           Subtext: Practical experiments for ops & compliance.
           [Explore Projects]  [Contact]
           (Badge row: AI • Risk & Controls • Luxembourg)

[ ABOUT ME ]  Photo (simple avatar) | Short bio | "What I do" bullets

[ WHY IDDILABS ]  3-4 cards: Learning-in-public • Privacy-first demos •
                  Real problems • Open-source where possible

[ PROJECTS ]  Filter pills (Topic, Year, Status)  
              Grid of cards (image/emoji, title, short pitch, tags, links)

[ CONTACT ]   Simple form (name, email, message) + social links row

[ FOOTER ]    © IddiLabs • GitHub • LinkedIn • Imprint • Privacy
```

---

## 5) Route & File Map (App Router — **no code**, structure only)

```
app/
  layout.tsx              (global shell: navbar, footer, theme)
  page.tsx                (home)
  about/page.tsx
  contact/page.tsx
  projects/
    page.tsx              (list)
    [slug]/page.tsx       (detail)
  legal/
    imprint/page.tsx
    privacy/page.tsx
  api/contact/route.ts    (Brevo contact form handler)
  api/waitlist/route.ts   (Brevo project waitlist handler)

components/
  site/
    navbar.tsx
    footer.tsx
    section.tsx           (wrapper w/ max-w, spacing)
    section-heading.tsx
    badge-list.tsx
  cards/
    feature-card.tsx
    project-card.tsx
  projects/
    project-filters.tsx
    project-meta.tsx
    waitlist-cta.tsx      (subscribe button + modal)
  content/
    prose.tsx             (typography wrapper)
  shared/
    theme-toggle.tsx

lib/
  projects.ts             (data loader, schema validation)
  seo.ts                  (metadata helpers)
  analytics.ts            (Cloudflare/Vercel minimal)
  rendering.ts            (SSR flags, caching helpers)

content/
  projects/               (MDX/JSON data per project)
    lux-salary-compare.mdx
    outsourcing-register.mdx
    ...

public/
  images/
    projects/
  og/
```

---

## 6) Content Model (lightweight, file‑based)

**Approach**: Keep content in‑repo. Start with **MDX** per project for rich body; index page consumes a generated JSON map. Add Zod validation in `lib/projects.ts`.

**Project front‑matter fields (schema)**:

* `title` (string)
* `slug` (string)
* `summary` (string, ≤160 chars)
* `year` (number)
* `area` (enum: "Risk & Controls" | "Compliance" | "Ops" | "AI/ML" | "Tools")
* `tags` (string[] e.g., ["Next.js","Tailwind","OpenAI"])
* `status` (enum: "Prototype" | "MVP" | "Live" | "Archived")
* `links` ({ type: "Demo"|"GitHub"|"Write‑up", url: string }[])
* `hero` (image path or emoji)
* `role` (string, e.g., "Design, Build, Docs")
* `stack` (string[])
* `problems` (string[]) — bullet points of pain points addressed
* `outcomes` (string[]) — concrete impacts/learned
* `waitlistFormId` (string) — Brevo form identifier for project waitlist
* `earlyAccess` (boolean) — surface waitlist CTA on cards
* `body` (MDX content)

**Listing JSON (derived)**: `{ slug, title, summary, year, tags, status, area, links, hero, earlyAccess }`.

**Copy guidance**: lead with the problem, then solution, then what changed/what you learned.

---

## 7) Visual Design System

* **Tokens first**: Always use the existing CSS theme tokens (OKLCH vars) — **no raw hex/rgb in components**. If a new color is needed, add a token, don’t inline a color.
* **Type**: Inter/Geist/Sans; display 700–800 for headings, 400 for body. Tight but readable line‑height.
* **Layout & Responsiveness (no manual breakpoints)**:

  * Use **fluid sizing** with `clamp()` for typography and spacing.
  * Use **CSS Grid auto‑fit/auto‑fill** with `minmax()` so cards flow naturally.
  * Use **container queries** for local adaptations (Tailwind @container) instead of global breakpoints.
  * Max width via container (e.g., `max-w-` tokens) so content doesn’t stretch.
* **Components (shadcn/ui)**: Button, Badge, Card, Separator, Dialog (image zoom), Sheet (mobile menu), Form (contact/waitlist), Input/Textarea.
* **Imagery**: clean screenshots/mockups; emoji fallback per project.
* **Motion (Framer Motion)**: subtle; respect reduced‑motion.

**Accessibility**:

* Color contrast ≥ WCAG AA.
* Keyboard focus visible.
* Landmarks: header/main/footer/nav.
* Alt text on all images.

---

## 8) SEO, Metadata & Social

* **Per page**: `title`, `description`, canonical.
* **OG images**: static templates under `/public/og/` with dynamic text later.
* **Structured data (JSON‑LD)**:

  * Use `Organization` (name: "IddiLabs", url, logo) instead of `Person`.
  * `CollectionPage` for Projects list.
  * `CreativeWork` for each Project detail.
* **Robots & Sitemap**: basic allow‑all; include /legal pages.

---

## 9) Analytics, DNS & Privacy

* **DNS**: Cloudflare DNS for apex + www; CNAME flattening on apex; `A`/`AAAA` only if needed. Redirect non‑www→www (or vice‑versa) via Vercel/CF rule.
* **Analytics**: Cloudflare Web Analytics or Vercel Analytics (no cookies).
* **Privacy**: Privacy page explains zero tracking beyond anonymous traffic stats.

---

## 10) Performance & Rendering

* **Rendering Strategy**: Prefer **SSR** everywhere using Server Components and Edge Runtime. Explicitly disable static generation per route (`export const dynamic = 'force-dynamic'`).
* **Caching**: For SSR, use short **Edge caching** where safe (e.g., projects list with `revalidate: 60`) *only if it doesn’t violate SSR requirement*. Otherwise `no-store` for strict SSR.
* **Budget**: LCP < 2.0s on 4G; CLS < 0.05; TTI < 3s.
* **Assets**: next/image with responsive sizes; avoid heavy media; defer non‑critical scripts.

---

## 11) Internationalization (later)

* Default **English**; optional Italian/French later via file‑based dictionaries.
* Start monolingual to ship fast; keep copy centralised for easy i18n.

---

## 12) Contact & Waitlists (Brevo)

* **Contact form**: name, email, message → server action → Brevo transactional email. Honeypot + Zod.
* **Project waitlists**: per‑project Brevo form (use `waitlistFormId` from front‑matter). CTA on cards and detail pages → modal → submit to Brevo.
* **Env vars**: `BREVO_API_KEY`, `BREVO_TO_EMAIL`, `BREVO_FROM_EMAIL`, `BREVO_WAITLIST_BASE_URL` (if using hosted forms).
* **Fallback**: render `mailto:` if env missing.
* **Privacy**: no local DB; only Brevo processes submissions; disclose on Privacy page.

---

## 13) Projects Section — UX Spec

**Filters**: chips for Year, Area, Status; search by title/tags.
**Card content**: hero image/emoji, title, 2‑line summary, tags (1–3), link icons (Demo/GitHub).
**Detail page**: problem → solution → outcomes; stack & role; gallery; links.

---

## 14) About — Content Outline (no personal name)

* Short bio: Risk & Controls professional in Luxembourg; builds small AI tools in spare time; non‑commercial demos.
* Values: privacy‑first, practical, small wins.
* Skills: governance, testing plans, dashboards, Next.js basics, Tailwind, shadcn/ui.
* Visual: abstract geometric motif (no photo/avatar).

---

## 15) Why IddiLabs — Content Outline

* The gap: many ideas die in spreadsheets.
* IddiLabs goal: turn ideas into tiny, testable tools.
* Principles: simple, transparent, documented; learn-in-public.

---

## 16) Footer — Content

* © year IddiLabs • Links: GitHub, LinkedIn, Email • Legal (Imprint/Privacy).
* Note: “Non‑commercial demos; feedback welcome.”
* DNS note (hidden, docs only): Cloudflare DNS fronting Vercel.

---

## 17) Content Prompts (to draft copy fast)

**Hero**:

* Headline: “Risk Manager building tiny AI tools.”
* Sub: “I experiment with AI to improve everyday ops and compliance workflows.”
* CTA: “Explore Projects” / “Get in touch”.

**About**:

* 3‑4 sentences: who you are, what you build, why.
* 3 bullets: areas of interest (e.g., salary calculators, outsourcing registers, dashboards).
* 1 sentence: philosophy (privacy‑first, file‑based, no heavy SaaS).

**Why**:

* 3 short blocks: Problem → IddiLabs approach → Benefit.

**Project**:

* Problem: 1–2 lines.
* Solution: 2–4 lines.
* Outcome/Learnings: 2–3 bullets.
* Links: Demo/GitHub.

**Contact**:

* 1 line: “Say hi — I like swapping ideas about Risk & AI.”

---

## 18) Implementation Plan (phased)

**Phase 1: Structure & Content (Day 1–2)**

* Create routes, stub sections, import tokens, set metadata.
* Draft copy v1 for Home, About, Projects (5–8 entries), Contact.
* Add OG images placeholders.

**Phase 2: Projects Data & Cards (Day 3–4)**

* Define Zod schema, MDX folder.
* Build list page with filters.
* Build detail page layout.

**Phase 3: Polish & Launch (Day 5–6)**

* Motion, accessibility sweep, analytics, legal pages.
* Deploy to Vercel.
* Lighthouse pass & fix.

---

## 19) QA Checklist

* Keyboard‑only nav works everywhere.
* Images have alt.
* Mobile menu works; content readable at 320px.
* OG cards render on Twitter/LinkedIn.
* Sitemap & robots present.
* 404 page is helpful (links back home + projects).

---

## 20) Decisions (locked for v1)

* Languages: **English‑only** for launch.
* Contact: **Brevo** (contact + per‑project waitlists), mailto fallback.
* Legal: **Include Imprint and Privacy** at launch.
* Projects: **Use current items from iddi‑labs.com Projects**.
* Identity: **No personal name on site**; brand is "IddiLabs".
* Rendering: **SSR by default** (Edge Runtime), tokens‑first styling.

---

## 21) Future Enhancements (later)

* MDX live code sandboxes per project (small demos).
* i18n (Italian/French).
* Search across projects using static index.
* Dynamic OG image generation.
* “Uses” page listing hardware/software stack.

---

## 22) Project Lineup (sourced from iddi‑labs.com)

**Canonical v1 list** (titles, status, ETA, one‑line):

1. **Suppliers Risk Register** — *In development* — *Expected: Oct 2025*. Offline, open‑source supplier register aligned with EBA/GL/2019/02 and CSSF; criticality scoring, due diligence tracking, PDF/Excel export.
2. **Transcripts to AI Minutes** — *In development* — *Expected: Dec 2025*. Local audio→minutes processor; templates, decisions/owners/deadlines, offline, PDF export.
3. **Luxembourg ChatBot** — *In development* — *Expected: Feb 2026*. Luxembourg assistant for everyday admin and pro queries; hosted online due to hardware limits.
4. **Custom AI Assistant (Offline LLM)** — *In development* — *Expected: Feb 2026*. On‑prem enterprise assistant; train on private docs; min 8GB RAM.
5. **Regulatory Watch (CSSF Digest)** — *In development* — *Expected: Mar 2026*. Automated CSSF updates with impact classification; email/RSS hooks.

(Optionally include a "Got an idea?" tile linking to Contact.)

---

## 23) Content Checklist (ready for copy drafting)

**Home/Hero**

* Headline, subhead, primary+secondary CTAs
* Badge row (AI • Risk & Controls • Luxembourg)

**About**

* 3–4 sentence bio (Risk Manager in Luxembourg; AI experiments; non‑commercial)
* Values (privacy‑first, simple, transparent)
* Skills list (governance, testing plans, dashboards, Next.js basics, Tailwind, shadcn/ui)
* Abstract geometric motif (no face/avatar)

**Why IddiLabs**

* 3–4 cards: Learning‑in‑public; Privacy‑first demos; Real problems; Open where possible
* Short copy for each card (≤40 words)

**Projects**

* MDX files for 5 entries above (front‑matter per §6)
* Listing blurbs (≤160 chars summary each)
* Links (Demo/GitHub/Early Access)

**Contact**

* One‑liner intro; form fields (name, email, message)
* Social links row (LinkedIn, Instagram)

**Legal**

* Imprint (owner/address, email)
* Privacy (no cookies; Cloudflare/Vercel analytics only; Brevo processing statement)

**SEO**

* Titles/descriptions; OG images placeholders
* JSON‑LD: Person (About), CollectionPage (Projects), CreativeWork (each Project)

---

## 24) Contact & Waitlists (Brevo) — Integration Spec (no code)

* **Contact Flow**: Client form → server action → Brevo Transactional Email API → send to inbox.
* **Waitlist Flow**: Project card/detail → waitlist modal → Brevo form submit (per‑project `waitlistFormId`).
* **Data**: `{ name, email, message?, projectSlug?, timestamp, userAgent }` + honeypot field.
* **Validation**: Zod schema; reject if honeypot filled.
* **Env vars**: `BREVO_API_KEY`, `BREVO_TO_EMAIL`, `BREVO_FROM_EMAIL`, `BREVO_WAITLIST_BASE_URL`.
* **Fallback**: `mailto:` link rendered if env vars missing.
* **Privacy**: Brevo only; no local DB storage; no cookies.

---

## 26) Ops: Cloudflare DNS (docs)

* Root domain on Cloudflare. Use CNAME to Vercel (flatten apex) or Vercel‑recommended A/AAAA.
* Set redirect rule for **www → apex** or **apex → www** (pick one and keep consistent).
* Enable HTTPS; set HSTS at platform level (Vercel) if desired.
* Leave proxy on **DNS‑only** unless you need Cloudflare features beyond DNS and analytics.

---

## 27) Contact Identity

* **Operator:** IddiLabs (non‑commercial project brand).
* **Contact email:** [contact@iddi-labs.com](mailto:contact@iddi-labs.com).
* **Purpose:** general inquiries, feedback, and Brevo form recipient.
* **Legal imprint:** list IddiLabs + this email only; omit personal names.

---

## 28) Branding Tokens & Style Governance

* **Typography scale:** lock font sizes using `clamp()`; maintain modular rhythm (1.125× ratio).
* **Spacing scale:** use `space-*` tokens in Tailwind config; do not hardcode px values.
* **Border radius & shadows:** use predefined tokens (`--radius-sm/md/lg`, `--shadow-sm/md/lg`).
* **Motion:** use `--ease-in-out` and `--duration-*` tokens for consistency.
* **Voice & style:** concise, factual, friendly; avoid marketing jargon; write from IddiLabs perspective.

---

## 29) Rendering Notes (no breakpoints approach)

* Prefer fluid/auto layouts: `clamp()` for type/space; grid `auto-fit/minmax` for cards; container queries for section tweaks.
* Avoid hard breakpoints in Tailwind; if absolutely necessary for accessibility, keep to a **single small fallback**.
* Always use **theme tokens** (CSS vars) for color/space; never inline hex/rgb in components.
