import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Depleted Dad Diagnostic — find your depletion type in 3 minutes" },
      {
        name: "description",
        content:
          "free 3-minute quiz that identifies which of 4 depletion types is bleeding you out, then delivers a 14-day rebuild protocol to your inbox.",
      },
      { property: "og:title", content: "The Depleted Dad Diagnostic" },
      {
        property: "og:description",
        content: "find your depletion type in 3 minutes. get a 14-day rebuild protocol.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0A0A0A" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

const PrimaryCTA = ({
  children,
  href = "/quiz",
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) => (
  <a
    href={href}
    className={`cta group inline-flex items-center justify-center gap-3 bg-accent px-8 py-5 text-base font-bold uppercase tracking-wider text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
    style={{ minHeight: 56 }}
  >
    <span>{children}</span>
    <span aria-hidden="true" className="cta-arrow text-lg">→</span>
  </a>
);

function Landing() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* top hairline */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">
            DDD<span className="text-accent">.</span>
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            v.01
          </span>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-5 pb-24 pt-16 sm:px-8 sm:pb-32 sm:pt-24">
          <p className="rise rise-1 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
            the depleted dad diagnostic
          </p>

          <h1
            className="rise rise-2 mt-8 max-w-4xl text-[2.25rem] font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            you're three coffees deep, snapped at your kid before 8am, and don't recognize the guy in the mirror.
          </h1>

          <p className="rise rise-3 mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            find your depletion type in 3 minutes.
          </p>

          <div className="rise rise-4 mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <PrimaryCTA className="w-full sm:w-auto">start the diagnostic</PrimaryCTA>
            <span className="text-sm text-muted-foreground sm:ml-4">
              free. no credit card. 12 questions.
            </span>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
            here's what you get
          </h2>

          <ul className="mt-10 grid gap-px bg-border sm:grid-cols-3">
            {[
              "know exactly which of the 4 depletion types is bleeding you out (ghost, engine, bouncer, or sleeper) so you stop guessing what's wrong",
              "get a personalized 14-day rebuild protocol with your 3 daily non-negotiables, not another generic \"drink water and sleep more\" list",
              "find out the #1 mistake your type is making right now that's keeping you stuck in the loop",
            ].map((text, i) => (
              <li
                key={i}
                className="bg-background p-7 sm:p-8"
              >
                <span className="block text-xl font-bold text-accent">→ 0{i + 1}</span>
                <p className="mt-5 text-base leading-relaxed text-foreground/90">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY THIS EXISTS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
            why this exists
          </h2>

          <div className="mt-10 space-y-5 text-xl leading-snug text-foreground/90 sm:text-2xl">
            <p>most dad advice is written for moms or by therapists.</p>
            <p className="text-accent">this isn't that.</p>
            <p>12 questions. 4 archetypes. one plan built for the dad you actually are right now.</p>
            <p>no journaling. no "fill your cup." no inner child work.</p>
            <p>just a diagnosis and a 14-day protocol you can run starting tomorrow morning.</p>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
            who this is for
          </h2>

          <ul className="mt-10 space-y-5 text-lg sm:text-xl">
            {[
              "dads running on fumes who can't remember the last time they felt sharp",
              "dads who keep promising themselves \"next week i'll get it together\"",
              "dads who are tired of being told to meditate when they need a system",
            ].map((t, i) => (
              <li key={i} className="flex gap-4 text-foreground/90">
                <span aria-hidden="true" className="mt-[10px] block h-px w-6 flex-shrink-0 bg-accent" />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <hr className="my-10 border-t border-border" />

          <p className="text-base text-muted-foreground sm:text-lg">
            <span className="font-bold uppercase tracking-wider text-foreground">not for:</span>{" "}
            dads looking for therapy, validation, or another podcast to listen to instead of doing the thing.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
            the diagnostic
          </p>
          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            stop guessing. get the read on what's draining you.
          </h2>
          <div className="mt-10 flex justify-center">
            <PrimaryCTA className="w-full sm:w-auto">find my depletion type</PrimaryCTA>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            takes 3 minutes. results sent straight to your inbox.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pb-28 pt-12 sm:pb-12">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          built by a dad. for dads. no fluff.
        </p>
      </footer>

      {/* STICKY MOBILE EMAIL CAPTURE */}
      <StickyMobileBar />
    </main>
  );
}

function StickyMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden">
      <div className="mx-auto max-w-5xl p-3">
        <a
          href="/quiz"
          className="cta group flex w-full items-center justify-center gap-3 bg-accent px-6 py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground transition-colors hover:bg-accent/90"
          style={{ minHeight: 48 }}
        >
          <span>start the diagnostic</span>
          <span aria-hidden="true" className="cta-arrow">→</span>
        </a>
      </div>
    </div>
  );
}
