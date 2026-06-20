              free. no credit card. 11 questions.
              free. no app to download, no call to book.
            <p>most dad advice is written for moms or by therapists.</p>
            <p className="text-accent">this isn't that.</p>
            <p>11 questions. 4 archetypes. one plan built for the dad you actually are right now.</p>
            <p>no journaling. no "fill your cup." no inner child work.</p>
            <p>just a diagnosis and a 14-day protocol you can run starting tomorrow morning.</p>
            <p>i built this because i needed it.</p>
            <p className="text-accent">most dad advice is written for moms, or by people who've never been this specific kind of tired.</p>
            <p>this is the thing i wish someone had handed me at 11pm, when i looked in the mirror and didn't know the guy looking back.</p>
            <p>no guru. no program. just a Dad who's been in the hole, handing you what helped him climb out.</p>
          </div>
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
          <span>start the diagnostic</span>
          <span aria-hidden="true" className="cta-arrow">→</span>
        </a>
      </div>
    </div>
  );
}
