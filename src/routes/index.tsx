import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Which Dad Are You — find your dad type in 3 minutes" },
      {
        name: "description",
        content:
          "free 3-minute quiz that shows which kind of dad you are right now, then delivers a 14-day rebuild protocol to your inbox.",
      },
      { property: "og:title", content: "Which Dad Are You" },
      {
        property: "og:description",
        content: "find out which dad you are in 3 minutes. get a 14-day rebuild protocol.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#fafafa" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">{children}</p>
);

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
    className={`cta group inline-flex items-center justify-center gap-2 bg-accent px-6 text-base font-medium text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
    style={{ minHeight: 48 }}
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
          <span className="font-mono text-sm font-medium tracking-tight text-foreground">
            WDAY<span className="text-muted-foreground">.</span>
          </span>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="hero-mesh pointer-events-none absolute inset-x-0 top-0 h-[70%] opacity-90"
        />
        <div className="relative z-10 mx-auto max-w-5xl px-5 pb-24 pt-16 sm:px-8 sm:pb-32 sm:pt-24">
          <div className="rise rise-1">
            <Eyebrow>which dad are you</Eyebrow>
          </div>

          <h1
            className="rise rise-2 mt-8 max-w-4xl text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl md:text-7xl"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            the Dad you want to be is still in there.
          </h1>

          <p className="rise rise-3 mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
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
          <Eyebrow>what you walk away with</Eyebrow>

          <p className="mt-6 max-w-2xl text-xl leading-snug text-foreground sm:text-2xl">
            in three minutes, you'll know what's actually draining you. that's more than most dads ever stop to find out.
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
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
              <li key={i} className="rounded-md border border-border bg-card p-6 sm:p-7">
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">{item.lead}</span> {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <Eyebrow>how it works</Eyebrow>

          <ul className="mt-10 space-y-5 text-lg sm:text-xl">
            {[
              "answer eleven honest questions. real moments from a real day, not a personality test.",
              "get your type and your plan the second you finish.",
              "run the fourteen days. notice what changes.",
            ].map((t, i) => (
              <li key={i} className="flex gap-4 text-foreground">
                <span aria-hidden="true" className="mt-[11px] block h-px w-6 flex-shrink-0 bg-foreground" />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            no journaling. no inner work. no overhauling your whole life. a clear read on what's wrong, and a place to start.
          </p>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <Eyebrow>who this is for</Eyebrow>

          <ul className="mt-10 space-y-5 text-lg sm:text-xl">
            {[
              "dads running on fumes who can't remember the last time they felt sharp.",
              "dads who've been telling themselves \"next week i'll get it together\" for about a year of next weeks.",
              "dads who don't want therapy or another podcast. they want to know what's wrong and what to do monday morning.",
            ].map((t, i) => (
              <li key={i} className="flex gap-4 text-foreground">
                <span aria-hidden="true" className="mt-[11px] block h-px w-6 flex-shrink-0 bg-foreground" />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <hr className="my-10 border-t border-border" />

          <p className="text-base text-muted-foreground sm:text-lg">
            <span className="font-medium text-foreground">not for:</span> dads looking for validation, or one more thing to listen to instead of doing the thing.
          </p>
        </div>
      </section>

      {/* WHY THIS EXISTS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 sm:py-28">
          <Eyebrow>why this exists</Eyebrow>

          <div className="mt-10 max-w-3xl space-y-5 text-xl leading-snug text-foreground sm:text-2xl">
            <p>i built this because i needed it.</p>
            <p className="border-l-2 border-foreground pl-5 font-medium text-foreground">most dad advice is written for moms, or by people who've never been this specific kind of tired.</p>
            <p>this is the thing i wish someone had handed me at 11pm, when i looked in the mirror and didn't know the guy looking back.</p>
            <p>no guru. no program. just a Dad who's been in the hole, handing you what helped him climb out.</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <Eyebrow>find out what's draining you</Eyebrow>
          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.025em] sm:text-5xl">
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
        <p className="text-center font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
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
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden">
      <div className="mx-auto max-w-5xl">
        <a
          href="/quiz"
          className="cta group flex w-full items-center justify-center gap-2 bg-accent px-6 py-3.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
          style={{ minHeight: 48 }}
        >
          <span>show me what's draining me</span>
          <span aria-hidden="true" className="cta-arrow">→</span>
        </a>
      </div>
    </div>
  );
}
