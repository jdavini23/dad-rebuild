import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import {
  CONVERTKIT_WEBHOOK_URL,
  QUESTIONS,
  RESULTS,
  computeCounts,
  computeResult,
  computeScores,
  computeSeverity,
  severityBand,
  type DepletionType,
  type SeverityBand,
} from "@/lib/quiz-data";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "take the diagnostic — depleted dad diagnostic" },
      {
        name: "description",
        content: "eleven questions. 3 minutes. find your depletion type.",
      },
      { name: "robots", content: "noindex" },
      { name: "theme-color", content: "#fafafa" },
    ],
    links: [{ rel: "canonical", href: "/quiz" }],
  }),
  component: QuizRoute,
});

type Step = number | "email" | "result";

function QuizRoute() {
  const [answers, setAnswers] = useState<(number | undefined)[]>(() =>
    new Array(QUESTIONS.length).fill(undefined),
  );
  const [step, setStep] = useState<Step>(0);
  const [email, setEmail] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "error">("idle");
  const [resultType, setResultType] = useState<DepletionType | null>(null);
  const [band, setBand] = useState<SeverityBand | null>(null);

  const selectAnswer = useCallback(
    (qi: number, optionIndex: number) => {
      setAnswers((prev) => {
        const next = [...prev];
        next[qi] = optionIndex;
        return next;
      });
      if (qi < QUESTIONS.length - 1) setStep(qi + 1);
      else setStep("email");
    },
    [],
  );

  const goBack = useCallback(() => {
    setStep((s) => {
      if (s === "email") return QUESTIONS.length - 1;
      if (typeof s === "number" && s > 0) return s - 1;
      return s;
    });
  }, []);

  // keyboard number keys for question screens (one per option, up to 5)
  useEffect(() => {
    if (typeof step !== "number") return;
    const count = QUESTIONS[step].options.length;
    const handler = (e: KeyboardEvent) => {
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= count) selectAnswer(step, n - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [step, selectAnswer]);

  const reset = () => {
    setAnswers(new Array(QUESTIONS.length).fill(undefined));
    setEmail("");
    setSubmitStatus("idle");
    setResultType(null);
    setBand(null);
    setStep(0);
  };

  async function onEmailSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitStatus === "sending") return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setSubmitStatus("sending");
    const scores = computeScores(answers);
    const counts = computeCounts(answers);
    const type = computeResult(scores, counts);
    const resultBand = severityBand(computeSeverity(scores));
    try {
      const form = new FormData();
      form.append("email_address", email);
      form.append("fields[depletion_type]", type);
      form.append("fields[severity]", resultBand.id);
      await fetch(CONVERTKIT_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        body: form,
      });
    } catch {
      // we still show the result on screen even if the webhook fails
    }
    setResultType(type);
    setBand(resultBand);
    setStep("result");
    setSubmitStatus("idle");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const progress = useMemo(() => {
    if (step === "result") return 1;
    if (step === "email") return 1;
    return (step as number) / QUESTIONS.length;
  }, [step]);

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <QuizHeader
        step={step}
        progress={progress}
        canGoBack={step !== 0 && step !== "result"}
        onBack={goBack}
      />

      <div className="mx-auto max-w-2xl px-5 pb-24 pt-12 sm:px-8 sm:pb-32 sm:pt-20">
        {typeof step === "number" && (
          <QuestionScreen
            key={`q-${step}`}
            index={step}
            selected={answers[step]}
            onSelect={(i) => selectAnswer(step, i)}
          />
        )}

        {step === "email" && (
          <EmailScreen
            key="email"
            email={email}
            setEmail={setEmail}
            status={submitStatus}
            onSubmit={onEmailSubmit}
          />
        )}

        {step === "result" && resultType && (
          <ResultScreen key={`r-${resultType}`} type={resultType} band={band} onRetake={reset} />
        )}
      </div>
    </main>
  );
}

function QuizHeader({
  step,
  progress,
  canGoBack,
  onBack,
}: {
  step: Step;
  progress: number;
  canGoBack: boolean;
  onBack: () => void;
}) {
  const label =
    typeof step === "number"
      ? `question ${step + 1} of ${QUESTIONS.length}`
      : step === "email"
        ? "almost done"
        : "your diagnosis";

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          to="/"
          className="font-mono text-xs uppercase tracking-[0.12em] text-foreground"
          aria-label="back to home"
        >
          DDD<span className="text-accent">.</span>
        </Link>
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</span>
      </div>
      <div className="h-px w-full bg-border">
        <div
          className="h-px bg-accent transition-[width] duration-500 ease-out"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
      {canGoBack && (
        <div className="mx-auto max-w-2xl px-5 pt-3 sm:px-8">
          <button
            type="button"
            onClick={onBack}
            className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
          >
            ← back
          </button>
        </div>
      )}
    </header>
  );
}

function QuestionScreen({
  index,
  selected,
  onSelect,
}: {
  index: number;
  selected: number | undefined;
  onSelect: (i: number) => void;
}) {
  const q = QUESTIONS[index];
  return (
    <section>
      <p className="rise rise-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
        question {index + 1} of {QUESTIONS.length}
      </p>
      <h1
        className="rise rise-2 mt-6 text-2xl font-semibold leading-[1.15] tracking-[-0.02em] sm:text-4xl"
        style={{ textWrap: "balance" } as React.CSSProperties}
      >
        {q.prompt}
      </h1>

      <ul className="rise rise-3 mt-10 space-y-3">
        {q.options.map((opt, i) => {
          const isSelected = selected === i;
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                className={`group flex w-full items-start gap-4 rounded-md border px-5 py-5 text-left transition-colors sm:px-6 sm:py-6 ${
                  isSelected
                    ? "border-accent bg-accent/[0.04]"
                    : "border-border hover:border-foreground hover:bg-muted"
                }`}
                style={{ minHeight: 72 }}
              >
                <span
                  aria-hidden="true"
                  className={`mt-0.5 inline-block font-mono text-xs uppercase tracking-[0.12em] ${
                    isSelected ? "text-accent" : "text-muted-foreground group-hover:text-accent"
                  }`}
                >
                  0{i + 1}
                </span>
                <span className="flex-1 text-base leading-relaxed text-foreground/95 sm:text-lg">
                  {opt.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-8 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
        tap to continue
      </p>
    </section>
  );
}

function EmailScreen({
  email,
  setEmail,
  status,
  onSubmit,
}: {
  email: string;
  setEmail: (v: string) => void;
  status: "idle" | "sending" | "error";
  onSubmit: (e: FormEvent) => void;
}) {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return (
    <section>
      <p className="rise rise-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
        your results are ready
      </p>
      <h1 className="rise rise-2 mt-6 text-3xl font-semibold leading-tight tracking-[-0.025em] sm:text-5xl">
        where should we send your 14-day protocol?
      </h1>
      <p className="rise rise-3 mt-6 text-base text-muted-foreground sm:text-lg">
        you'll see your type on the next screen too. the protocol lands in your inbox.
      </p>

      <form onSubmit={onSubmit} className="rise rise-4 mt-10 space-y-4">
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your email"
          aria-label="your email"
          className="w-full rounded-md border border-border bg-card px-5 text-base text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
          style={{ minHeight: 56 }}
        />
        <button
          type="submit"
          disabled={!isValid || status === "sending"}
          className="cta group inline-flex w-full items-center justify-center gap-3 bg-accent px-8 py-5 text-base font-medium text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-50"
          style={{ minHeight: 56 }}
        >
          <span>{status === "sending" ? "sending" : "send me my results"}</span>
          <span aria-hidden="true" className="cta-arrow text-lg">
            →
          </span>
        </button>
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          no spam. unsubscribe anytime.
        </p>
      </form>
    </section>
  );
}

function ResultScreen({
  type,
  band,
  onRetake,
}: {
  type: DepletionType;
  band: SeverityBand | null;
  onRetake: () => void;
}) {
  const r = RESULTS[type];
  const [copied, setCopied] = useState(false);

  async function copyShare() {
    try {
      await navigator.clipboard.writeText(r.shareLine);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  }

  return (
    <section>
      <p className="rise rise-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
        your diagnosis
      </p>
      <h1 className="rise rise-2 mt-6 text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-foreground sm:text-7xl">
        {r.name}
      </h1>
      <p
        className="rise rise-3 mt-5 text-xl font-bold leading-snug tracking-tight text-foreground sm:text-3xl"
        style={{ textWrap: "balance" } as React.CSSProperties}
      >
        {r.headline}
      </p>
      {band && (
        <p className="rise rise-3 mt-5 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          depletion level: <span className="text-accent">{band.label}</span>
        </p>
      )}

      <div className="rise rise-4 mt-12 space-y-12">
        <Block label="what's happening">
          <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
            {r.whatsHappening}
          </p>
        </Block>

        <Block label="the #1 mistake your type makes">
          <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">{r.mistake}</p>
        </Block>

        <Block label="your 14-day rebuild · 3 daily non-negotiables">
          <ul className="mt-2 space-y-5">
            {r.protocol.map((line, i) => (
              <li key={i} className="flex gap-4">
                <span aria-hidden="true" className="text-base font-bold text-accent sm:text-lg">
                  → 0{i + 1}
                </span>
                <span className="flex-1 text-base leading-relaxed text-foreground/90 sm:text-lg">
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </Block>

        <div className="rounded-md border border-border bg-card p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            share this
          </p>
          <p className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-3xl">
            {r.shareLine}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={copyShare}
              className="cta group inline-flex items-center justify-center gap-3 bg-accent px-6 py-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
              style={{ minHeight: 48 }}
            >
              <span>{copied ? "copied" : "copy share line"}</span>
              <span aria-hidden="true" className="cta-arrow">
                →
              </span>
            </button>
            <button
              type="button"
              onClick={onRetake}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-border px-6 py-4 text-sm font-medium text-foreground transition-colors hover:border-foreground"
              style={{ minHeight: 48 }}
            >
              retake
            </button>
          </div>
        </div>

        <p className="text-center font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          results also sent to your inbox
        </p>
      </div>
    </section>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
