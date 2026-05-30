## Build: Depleted Dad Diagnostic — Quiz + Results

Adds the working quiz behind the START button on the existing landing page. Reuses the design system already shipped (Space Grotesk, near-black bg, signal orange accent, hairline borders, sharp edges, rise-in animation, cta-arrow nudge). Voice rules carry over: lowercase body, uppercase headers, no em dashes, no exclamation points.

### Routes (file-based, TanStack Start)
- `src/routes/quiz.tsx` — the full quiz experience (question flow → email gate → result), self-contained in one route to keep state simple and avoid URL leakage of answers. Result is rendered as a screen within the route, not a separate URL, so refresh-loss is fine and the share screenshot is one clean view.
- Landing page's primary CTA already points to `/quiz` — no change needed there.

### State model (single route, React state)
- `answers: number[]` of length up to 12 (index of chosen option per question)
- `scores: { ghost, engine, bouncer, sleeper }` recomputed from answers
- `step: number` 0..11 for questions, then `"email"`, then `"result"`
- `email: string`, `submitStatus: idle | sending | error`
- `resultType` computed on submit using tiebreak priority: bouncer > ghost > sleeper > engine

### Quiz data
- `src/lib/quiz-data.ts` — exports `QUESTIONS` array (12 items, each `{ prompt, options: [{ label, type, points }] }`) and `RESULTS` map keyed by type with `{ name, headline, whatsHappening, mistake, protocol: string[3], shareLine }`. All copy lifted verbatim from spec.

### Components (in `src/routes/quiz.tsx` or split as small local components)
1. **QuizHeader** — sticky-ish top bar: "DDD." mark left, "question N of 12" right, thin progress bar (filled width = step/12) in accent color.
2. **QuestionScreen** — large prompt (balanced text), then vertical stack of full-width option buttons. Each button: hairline border, left-aligned lowercase text, generous padding (min 72px tall), hover/focus → border becomes accent + subtle bg shift. Tap advances immediately (no separate "next" button) which matches the "one screen at a time, big tap targets" spec. Back link (small, muted) bottom-left to go to previous question.
3. **EmailScreen** — uppercase eyebrow "your results are ready", short subhead "where should we send your 14-day protocol", single email input, primary CTA "send me my results →". Reuses the same fetch-to-`CONVERTKIT_WEBHOOK_URL` placeholder constant pattern as the sticky mobile bar (no-cors POST), then transitions to result. Stores email locally for redundancy, no real persistence.
4. **ResultScreen** — screenshot-friendly single screen:
   - eyebrow "your diagnosis"
   - giant headline: `THE GHOST` (etc.) in accent
   - one-line diagnosis under it
   - "what's happening" block
   - "the #1 mistake your type makes" block
   - "your 14-day rebuild" with 3 numbered non-negotiables (arrow markers like the landing benefits)
   - share line in a bordered callout: "i'm a ghost. what'd you get?"
   - secondary actions: "copy share line" (writes share line to clipboard, swaps label to "copied") and "retake" (resets state to step 0)
   - footer microcopy: "results also sent to your inbox"

### Scoring + tiebreak
- Pure function `computeResult(scores)` in `src/lib/quiz-data.ts`. Finds max; among ties, picks by priority array `["bouncer","ghost","sleeper","engine"]`.

### Interaction details
- Smooth fade between steps using the existing `.rise` animation class (re-keyed per step via `key={step}`).
- Keyboard: 1–4 number keys select options on question screens; Enter submits email.
- Mobile-first layout, max-w-2xl centered, generous vertical padding matching landing rhythm.
- Hide the landing's sticky mobile email bar on `/quiz` (it lives only in the index route, so nothing to change — confirming scope).

### SEO / head
- `head()` on `/quiz`: title "Take the Diagnostic — Depleted Dad Diagnostic", description short, `robots: noindex` (quiz/results aren't pages we want indexed; landing is the entry point), canonical `/quiz`.

### Files touched
- `src/routes/quiz.tsx` — new, full quiz route
- `src/lib/quiz-data.ts` — new, questions + results + scoring

### Out of scope
- Real ConvertKit endpoint (placeholder constant only, same TODO marker)
- Persisting answers across reloads
- A separate `/result/:type` URL (kept in-memory by design for the share-loop screenshot UX)
- Server-side email send (handled by Kit webhook on submit)
- Native share sheet (copy-to-clipboard is enough for v1; can add later)
