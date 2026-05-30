## Build: The Depleted Dad Diagnostic — Landing Page

A single-route, mobile-first landing page in the existing TanStack Start project. Operator-coded, near-black, bold sans, sharp edges, lots of whitespace.

### Visual direction
- Background: near-black (#0A0A0A) with off-white (#F5F5F2) text
- Accent: single high-contrast color — signal orange (#FF5B1F) used only on CTAs and arrows
- Typography: Space Grotesk for everything, weights 400/500/700; tight tracking on headline
- Sharp 0–2px radius. Hairline borders (1px, low-opacity off-white)
- Generous vertical rhythm. Section padding scales mobile → desktop
- Subtle entrance fade+rise on hero text only (CSS animation, no library)
- Hover: arrow on primary CTA nudges right 4px

### Page sections (single route `/`)
1. Hero — eyebrow, huge headline, subhead, primary CTA, microcopy
2. Benefits — "HERE'S WHAT YOU GET" + 3 bullets with arrow markers
3. Why this exists — short stacked lines
4. Who this is for — bulleted list + hairline separator + "not for" line
5. Final CTA — repeated large button + microcopy
6. Footer — single muted centered line

### CTAs
- Three CTAs total: hero, final section, plus a sticky mobile bottom bar
- Sticky bottom bar on `<768px`: email field + "SEND ME MY RESULTS →" (fallback per brief). Hidden on desktop.
- All primary CTA buttons link to `/quiz` (placeholder route — out of scope, will 404 cleanly via existing root notFound)
- Min 48px tap targets

### Email capture (sticky mobile bar)
- Single email input + submit button
- On submit: POST to a placeholder `CONVERTKIT_WEBHOOK_URL` constant (clearly TODO-marked), then `window.location.href = "/thank-you"`
- Validates email client-side with simple regex
- Thank-you route NOT built (per scope: landing only). The redirect target will 404 until built — noted in code comment.

### SEO / head
- Per-route `head()` in `src/routes/index.tsx`: title, description, og:title/description/url/type=website, twitter card
- No og:image (none available; placeholder would hurt)
- Canonical `/` on leaf
- Favicon: simple SVG data-uri (single letter "D" in accent color) wired via root `links`

### Voice rules enforced
- All body copy lowercase; section headers uppercase
- No em dashes, no exclamation points, no "self-care" vocabulary

### Files touched
- `src/routes/index.tsx` — full landing page replacing placeholder
- `src/styles.css` — add Space Grotesk import, redefine tokens (background, foreground, accent), remove default light/dark blue palette in favor of operator palette
- `src/routes/__root.tsx` — add favicon link + og:site_name default (keep existing shell intact)

### Out of scope (confirmed)
- 12-question quiz logic
- Thank-you page
- Real ConvertKit endpoint (placeholder constant only)
