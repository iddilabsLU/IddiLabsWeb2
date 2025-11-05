1) Navbar

Goal: Clear site structure; keep labels short.

Prompt

Write nav labels for: Home, Projects, About, Contact.

Style: 1–2 words each, sentence case, neutral tone.

Include a single CTA label for the Projects anchor (e.g., “Explore Projects”).

Provide accessible aria-labels for the mobile menu button and theme toggle.

Outputs

Labels: [Home] [Projects] [About] [Contact]

CTA: [Explore Projects]

ARIA strings:

Mobile menu button: Open navigation menu / Close navigation menu

Theme toggle: Toggle theme

2) Hero (Home)

Goal: State what IddiLabs is and why it exists, in one breath.

Prompt

Headline (max 7 words): IddiLabs builds small AI-assisted tools.

Subheadline (max 18 words): Practical experiments for operations, compliance, and everyday workflows — built for learning, not selling.

Primary CTA: “Explore Projects” (scroll to Projects section).

Secondary CTA: “Contact” (scroll to Contact).

3 badges (max 2 words each): AI, Risk & Controls, Luxembourg.

Optional supporting line (≤16 words) under CTAs: “Non-commercial demos. Feedback welcome.”

Outputs

Headline: [text]

Subheadline: [text]

Primary/Secondary CTA text

Badges (3)

Supporting line (optional)

3) About (brand-only)

Goal: Explain the idea without personal names.

Prompt

3–4 sentences describing IddiLabs:

What it is (brand, not a person).

Focus areas (Risk & Controls, compliance, ops, useful workflows).

Why it exists (learn-in-public; non-commercial demos).

Where it operates (Luxembourg context).

3 bullets: principles (privacy-first, tiny tools, file-based, open where sensible).

1 closing line (≤12 words): “Ideas become small, testable tools.”

Outputs

Short paragraph (3–4 sentences)

Principles list (3 bullets)

Closing line

4) Why IddiLabs

Goal: State the “why” as 3–4 benefit cards.

Prompt
Write 4 micro-cards, each with:

Title (≤3 words)

Body (≤35 words) — plain, practical, no buzzwords

Example topics to cover: Learning-in-public; Privacy-first demos; Real problems > slides; Open when possible.

Outputs

4 titles + 4 bodies

5) Projects — List (index)

Goal: A short intro + filter-friendly summaries.

Prompt

Section intro (≤25 words): what visitors can expect (small tools, early demos, and prototypes).

For each project (use your current lineup):

Summary (≤160 chars; no commas if possible).

3 tags (tech or topic).

Status label: Prototype, MVP, Live, or Archived.

Waitlist CTA text if earlyAccess: true (≤4 words, e.g., “Join waitlist”).

Outputs

Section intro

Per-project: summary, tags (3), status, waitlist CTA (optional)

6) Project — Detail (per project page)

Goal: Problem → solution → outcomes, crisp and scannable.

Prompt
For [project title] write:

Problem (2 lines, ≤35 words total): what pain point this addresses.

Solution (3–5 lines, ≤70 words total): what the tool does and how it’s built.

Outcomes/Learnings (3 bullets, ≤12 words each): concrete results or insights.

Stack list (≤6 items).

Role line (≤6 words, e.g., “Design, Build, Docs”).

Links: Demo/GitHub/Write-up text (concise).

Waitlist banner text (if coming soon; ≤14 words).

Outputs

Problem, Solution, Outcomes (3), Stack, Role, Links, Waitlist text

7) Contact

Goal: Invite thoughtful messages; explain the form’s use.

Prompt

Section intro (≤20 words): why someone should reach out.

Form helper text (≤14 words): privacy note (“Messages are relayed by Brevo; no database storage”).

Button text (≤2 words): “Send message”.

Success message (≤12 words): “Thanks — reply arrives at the inbox soon.”

Fail message (≤12 words): “Something went wrong — try again.”

Outputs

Intro, helper text, button text, success/fail strings

8) Waitlist (modal/microcopy)

Goal: Drive sign-ups for coming-soon projects.

Prompt

Title (≤3 words): “Early access”.

Subtitle (≤18 words): one clear value sentence for early access.

Fields: Email only (label + placeholder).

Consent line (≤16 words): “I consent to receive emails about this project.”

Button text (≤2 words): “Join waitlist”.

Success message (≤12 words).

Fail message (≤12 words).

Outputs

Title, subtitle, label/placeholder, consent, button, success/fail strings

9) Footer

Goal: Minimal, brand-first, with legal links.

Prompt

Line 1 (≤12 words): “Non-commercial demos by IddiLabs.”

Line 2 (≤10 words): “Feedback is welcome.”

Link labels: GitHub, LinkedIn, Email, Imprint, Privacy.

Copyright: © [year] IddiLabs.

Outputs

Two short lines + link labels + copyright

10) Legal (Imprint & Privacy)

Goal: Compliant and simple; brand-first, no personal name.

Prompt

Imprint:

Operator: IddiLabs

Contact email: contact@iddi-labs.com

Purpose: Non-commercial demos and documentation.

Location context: Luxembourg (no street address required for now).

Short disclaimer (≤30 words).

Privacy:

Plain statement: no cookies; anonymous analytics (Cloudflare or Vercel).

Forms: messages relayed through Brevo; no database storage.

Data retention (≤20 words): email content retained in inbox.

Contact for privacy requests: contact@iddi-labs.com

Outputs

Imprint section text

Privacy section text

11) SEO (per page)

Goal: Tight metadata for SSR.

Prompt
For each route [home, projects, project detail, about, contact]:

Title (≤60 chars).

Description (≤155 chars, action-oriented).

Canonical path (relative, e.g., /projects).

OG image alt text (≤12 words).

Outputs

Title, description, canonical, OG alt for each route

12) OG Image Text (template strings)

Goal: Make share cards informative.

Prompt

OG title (≤40 chars) for each project and page.

OG subline (≤60 chars) for each.

Keep wording consistent with page title and hero/subheads.

Outputs

OG title + subline per route/project

13) Microcopy Pack (buttons, states, a11y)

Goal: Consistency and accessibility.

Prompt

Buttons: Explore Projects, View project, Join waitlist, Send message, Learn more.

ARIA labels:

Project card image: “Preview of [project].”

External link icon: “Opens in a new tab.”

Empty/search state (one line, ≤10 words): “No projects match your filters.”

Outputs

Button labels

ARIA labels

Empty/search line
