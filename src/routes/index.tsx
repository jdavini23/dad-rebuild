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
            the Dad you want to be is still in there.
          </h1>

          <p className="rise rise-3 mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            find out which kind of depleted you are, and get a 14-day plan to start rebuilding. three minutes, eleven questions.
          </p>

          <div className="rise rise-4 mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <PrimaryCTA className="w-full sm:w-auto">show me what's draining me</PrimaryCTA>
            <span className="text-sm text-muted-foreground sm:ml-4">
              free. no app to download, no call to book.
            </span>
          </div>
        </div>
      </section>

      {/* WHAT YOU WALK AWAY WITH */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
            what you walk away with
          </h2>

          <p className="mt-6 max-w-2xl text-lg text-foreground/90 sm:text-xl">
            in three minutes, you'll know what's actually draining you. that's more than most dads ever stop to find out.
          </p>

          <ul className="mt-10 grid gap-px bg-border sm:grid-cols-3">
            {[
              {
                lead: "your depletion type.",
                body: "one of four. the specific way you're getting worn down, named, so you can stop wondering what's wrong with you.",
              },
              {
                lead: "the one mistake keeping you stuck.",
                body: "the move your type makes on repeat that quietly keeps the tank empty.",
              },
              {
                lead: "a 14-day rebuild.",
                body: "three small daily things, built for your type. not \"sleep more, drink water.\" the actual first steps back.",
              },
            ].map((item, i) => (
              <li key={i} className="bg-background p-7 sm:p-8">
                <span className="block text-xl font-bold text-accent">→ 0{i + 1}</span>
                <p className="mt-5 text-base leading-relaxed text-foreground/90">
                  <span className="font-bold text-foreground">{item.lead}</span> {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
            how it works
          </h2>

          <ul className="mt-10 space-y-5 text-lg sm:text-xl">
            {[
              "answer eleven honest questions. real moments from a real day, not a personality test.",
              "get your type and your plan the second you finish.",
              "run the fourteen days. notice what changes.",
            ].map((t, i) => (
              <li key={i} className="flex gap-4 text-foreground/90">
                <span aria-hidden="true" className="mt-[10px] block h-px w-6 flex-shrink-0 bg-accent" />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-2xl text-lg text-foreground/90 sm:text-xl">
            no journaling. no inner work. no overhauling your whole life. a clear read on what's wrong, and a place to start.
          </p>
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
              "dads running on fumes who can't remember the last time they felt sharp.",
              "dads who've been telling themselves \"next week i'll get it together\" for about a year of next weeks.",
              "dads who don't want therapy or another podcast. they want to know what's wrong and what to do monday morning.",
            ].map((t, i) => (
              <li key={i} className="flex gap-4 text-foreground/90">
                <span aria-hidden="true" className="mt-[10px] block h-px w-6 flex-shrink-0 bg-accent" />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <hr className="my-10 border-t border-border" />

          <p className="text-base text-muted-foreground sm:text-lg">
            <span className="font-bold uppercase tracking-wider text-foreground">not for:</span> dads looking for validation, or one more thing to listen to instead of doing the thing.
          </p>
        </div>
      </section>

      {/* WHY THIS EXISTS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
            why this exists
          </h2>

          <div className="mt-10 space-y-5 text-xl leading-snug text-foreground/90 sm:text-2xl">
            <p>i built this because i needed it.</p>
            <p className="text-accent">most dad advice is written for moms, or by people who've never been this specific kind of tired.</p>
            <p>this is the thing i wish someone had handed me at 11pm, when i looked in the mirror and didn't know the guy looking back.</p>
            <p>no guru. no program. just a Dad who's been in the hole, handing you what helped him climb out.</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
            find out what's draining you
          </p>
          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            three minutes from now, you'll know your type and you'll have your first fourteen days. that's the whole start.
          </h2>
          <div className="mt-10 flex justify-center">
            <PrimaryCTA className="w-full sm:w-auto">show me my type</PrimaryCTA>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            free. your results the moment you finish.
          </p>
        </div>
      </section>
      {/* FOOTER */}
      <footer className="pb-28 pt-12 sm:pb-12">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          made by joe. a Dad figuring it out, same as you.
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
          <span>show me what's draining me</span>
          <span aria-hidden="true" className="cta-arrow">→</span>
        </a>
      </div>
    </div>
  );
}
