# IddiLabs — UI ASCII Wireframes & Implementation Brief

Scope: High‑level, code‑free guidance for Claude Code to implement the UI using SSR, tokens‑first styling, fluid layout (no manual breakpoints), and container queries.
Reference docs: `docs/architecture-spec.md`, `context/copy-prompts-responses.md`.

Design rules:

* SSR (Edge) everywhere; tokens only (no raw colors).
* Fluid type/spacing via `clamp()`; grid auto‑fit/minmax; container queries.
* Accessible defaults: focus states, aria labels, sufficient contrast.

---

## 1) Global Shell (Header + Footer)

```
┌───────────────────────────────────────────────────────────────┐
│  IddiLabs                                   [☾]  [Explore]   │
│  ───────────────────────────────────────────────────────────   │
│  [Home]  [Projects]  [About]  [Contact]                       │
└───────────────────────────────────────────────────────────────┘
                    (page content below)
…
┌───────────────────────────────────────────────────────────────┐
│  Non‑commercial demos by IddiLabs.  Feedback welcome.         │
│  GitHub • LinkedIn • Email • Imprint • Privacy                │
└───────────────────────────────────────────────────────────────┘
```

Notes

* Header: brand wordmark left; theme toggle; CTA button “Explore Projects” right.
* Nav row stacks under brand on small containers via container queries (not breakpoints).
* Footer: two text lines + inline links.

Components

* `components/site/navbar.tsx`
* `components/site/footer.tsx`

---

## 2) Home — Hero

```
┌───────────────────────────────────────────────────────────────┐
│  Risk & AI, working together.                                 │
│  IddiLabs builds small, practical AI tools…                   │
│                                                               │
│  [Explore Projects]   [Contact]                               │
│  AI  •  Risk & Controls  •  Luxembourg                        │
└───────────────────────────────────────────────────────────────┘
```

Layout

* Centered stack; max‑width container; generous leading per tokens.
* Badges inline and wrap naturally.

Components

* `section`, `section-heading`, `badge-list`.

---

## 3) Home — About (abstract motif)

```
┌───────────────────────────────────────────────────────────────┐
│  ╭─────────────────────────────────────────────────────────╮  │
│  │   ░ geometric / gradient motif (no photo)              │  │
│  ╰─────────────────────────────────────────────────────────╯  │
│  IddiLabs is an independent initiative…                      │
│  • Privacy-first…                                            │
│  • Small, testable tools…                                    │
│  • Knowledge shared…                                         │
│  Ideas become tools, and tools become learning.              │
└───────────────────────────────────────────────────────────────┘
```

Layout

* Media block above text on narrow containers; side‑by‑side when space allows (container queries).

Components

* `prose`, `feature-card` (if needed for principles).

---

## 4) Home — Why IddiLabs (4 cards)

```
┌───────────────────────────────────────────────────────────────┐
│ [ Learning in public ]  [ Privacy-first demos ]               │
│ [ Real problems       ]  [ Open when possible ]               │
└───────────────────────────────────────────────────────────────┘
```

Layout

* CSS Grid with `auto-fit, minmax(260px, 1fr)` so it flows 1→2→4 columns.

Components

* `cards/feature-card.tsx` (title + body).

---

## 5) Home — Projects (teaser grid + filters)

```
┌───────────────────────────────────────────────────────────────┐
│  Projects                                                     │
│  (filters)  [Year ▾] [Area ▾] [Status ▾]      [search  🔎 ]   │
│  ───────────────────────────────────────────────────────────   │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐               │
│  │  emoji/img │  │  emoji/img │  │  emoji/img │  …            │
│  │ Title      │  │ Title      │  │ Title      │               │
│  │ summary…   │  │ summary…   │  │ summary…   │               │
│  │ tags…      │  │ tags…      │  │ tags…      │               │
│  │ [View] [↗] │  │ [View] [↗] │  │ [View] [↗] │               │
│  └────────────┘  └────────────┘  └────────────┘               │
└───────────────────────────────────────────────────────────────┘
```

Notes

* If `earlyAccess: true`, card shows a subtle `Join waitlist` button or badge.
* External icon `[↗]` for GitHub/Demo links with aria label.

Components

* `projects/project-filters`, `cards/project-card`, `projects/waitlist-cta`.

---

## 6) Projects — Index Page

```
┌───────────────────────────────────────────────────────────────┐
│  Practical AI experiments…  (intro text)                      │
│  [Year] [Area] [Status] [Search …]                            │
│  ───────────────────────────────────────────────────────────   │
│  [Grid cards as above; auto-fit/minmax]                        │
│  [Empty state: “No projects match your filters.”]              │
└───────────────────────────────────────────────────────────────┘
```

Data

* Read from `content/projects/*.mdx` via loader; SSR render.

---

## 7) Project — Detail Page

```
┌───────────────────────────────────────────────────────────────┐
│  [emoji/img]  Project Title                                   │
│  summary line                                                 │
│  tags: [AI] [Compliance] [Next.js]                            │
│  ───────────────────────────────────────────────────────────   │
│  Problem                                                      │
│  Solution                                                     │
│  Outcomes (• • •)                                             │
│  Stack | Role                                                 │
│  [Demo ↗] [GitHub ↗] [Write‑up]  [ Join waitlist ]            │
│  Gallery (optional)                                           │
└───────────────────────────────────────────────────────────────┘
```

Layout

* Single column; gallery becomes two‑up on larger containers via container queries.

Components

* `projects/project-meta`, `waitlist-cta`.

---

## 8) Contact Page

```
┌───────────────────────────────────────────────────────────────┐
│  Contact                                                      │
│  Have an idea…                                                │
│  [ Name        ]                                              │
│  [ Email       ]                                              │
│  [ Message …               ]                                  │
│  (helper: “Messages are relayed via Brevo…”)                  │
│  [ Send message ]                                             │
│  (success/fail inline)                                        │
└───────────────────────────────────────────────────────────────┘
```

Notes

* Honeypot field hidden; server action with SSR; mailto fallback.

---

## 9) Waitlist Modal (global)

```
┌───────────────────────────────────────────────────────────────┐
│  Early access                                                 │
│  Join the waiting list…                                       │
│  [ Email ]   [ Join waitlist ]                                │
│  Consent: I agree to receive updates…                         │
│  (success | fail message)                                     │
└───────────────────────────────────────────────────────────────┘
```

Trigger

* Appears from project cards and project detail pages.

---

## 10) Legal Pages (Imprint, Privacy)

```
┌───────────────────────────────────────────────────────────────┐
│  Imprint                                                      │
│  Operator: IddiLabs                                           │
│  Contact: contact@iddi-labs.com                               │
│  Purpose: Non-commercial…                                     │
│  Location: Luxembourg                                         │
│  Disclaimer: …                                                │
└───────────────────────────────────────────────────────────────┘
```

```
┌───────────────────────────────────────────────────────────────┐
│  Privacy                                                      │
│  No cookies; anonymous analytics; Brevo for forms; …          │
└───────────────────────────────────────────────────────────────┘
```

---

## 11) Layout Mechanics (for Claude Code)

* **Containers**: One central `container` class with tokenized max‑width.
* **Grid**: Use `grid auto-fit minmax(260px,1fr)` for cards; spacing via tokens.
* **Type scale**: Use tokenized `clamp()` values; heading/subhead/button sizes increase fluidly.
* **Container queries**: Adjust card density, header layout, and gallery columns based on container width only.
* **Focus**: Ensure visible focus ring token; keyboard tab order correct.
* **Icons**: Lucide; external links include aria label “Opens in new tab.”

---

## 12) Data/Content Wiring

* Read copy from `context/copy-prompts-responses.md` (as source of truth).
* Project data from `content/projects/*.mdx` with front‑matter (including `waitlistFormId`, `earlyAccess`).
* Buttons/labels mirrored into small constants map (if needed) but do **not** create `.ts` now.

---

## 13) Interaction Notes

* **Filters**: Update URL query on change; SSR render list with current filters; preserve state on back/forward.
* **Waitlist**: Submits to Brevo; disable button while pending; success/fail inline; no toasts.
* **Contact**: Server action with Zod validation; honeypot; show inline result messages.
* **Theme toggle**: Persist in `prefers-color-scheme`/local storage minimal; honor reduced motion.

---

## 14) QA Checklist (UI only)

* All text matches `context/copy-prompts-responses.md`.
* Grid adapts smoothly from phone to laptop with no layout jumps.
* Focus visible on all controls; aria labels present.
* External links open in new tab; icons have aria text.
* Empty/search state appears when filters hide all projects.

---

## 15) Hand‑off Brief for Claude Code

**Goal:** Implement UI per these wireframes, SSR, tokens‑first, container queries, no manual breakpoints.

**Tasks (no code here; just instructions):**

1. Scaffold header/footer and sections on Home using the above ASCII layouts.
2. Implement Projects index (filters + grid) pulling MDX front‑matter.
3. Implement Project detail with Problem→Solution→Outcomes and waitlist CTA.
4. Build Contact page form (server action to Brevo) and global Waitlist modal.
5. Wire Legal pages with provided copy.
6. Verify fluid scaling and accessibility per QA checklist.
