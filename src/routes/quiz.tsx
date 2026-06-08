import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import {
  CONVERTKIT_WEBHOOK_URL,
  QUESTIONS,
  RESULTS,
  computeResult,
  computeScores,
  type DepletionType,
} from "@/lib/quiz-data";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "take the diagnostic — depleted dad diagnostic" },
      {
        name: "description",
        content: "12 questions. 3 minutes. find your depletion type.",
      },
      { name: "robots", content: "noindex" },
      { name: "theme-color", content: "#0A0A0A" },
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

  // keyboard 1..4 for question screens
  useEffect(() => {
    if (typeof step !== "number") return;
    const handler = (e: KeyboardEvent) => {
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= 4) selectAnswer(step, n - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [step, selectAnswer]);

  const reset = () => {
    setAnswers(new Array(QUESTIONS.length).fill(undefined));
    setEmail("");
    setSubmitStatus("idle");
    setResultType(null);
    setStep(0);
  };

  async function onEmailSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitStatus === "sending") return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setSubmitStatus("sending");
    const scores = computeScores(answers);
    const type = computeResult(scores);
    try {
      const form = new FormData();
      form.append("email_address", email);
      form.append("fields[depletion_type]", type);
      await fetch(CONVERTKIT_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        body: form,
      });
    } catch {
      // we still show the result on screen even if the webhook fails
    }
    setResultType(type);
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
          <ResultScreen key={`r-${resultType}`} type={resultType} onRetake={reset} />
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
          className="text-xs font-bold uppercase tracking-[0.2em] text-foreground"
          aria-label="back to home"
        >
          DDD<span className="text-accent">.</span>
        </Link>
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
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
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
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
      <p className="rise rise-1 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
        question {index + 1} of {QUESTIONS.length}
      </p>
      <h1
        className="rise rise-2 mt-6 text-2xl font-bold leading-[1.15] tracking-tight sm:text-4xl"
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
                className={`group flex w-full items-start gap-4 border px-5 py-5 text-left transition-colors sm:px-6 sm:py-6 ${
                  isSelected
                    ? "border-accent bg-accent/10"
                    : "border-border hover:border-accent hover:bg-muted"
                }`}
                style={{ minHeight: 72 }}
              >
                <span
                  aria-hidden="true"
                  className={`mt-0.5 inline-block text-xs font-bold uppercase tracking-[0.2em] ${
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

      <p className="mt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">
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
      <p className="rise rise-1 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
        your results are ready
      </p>
      <h1 className="rise rise-2 mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
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
          className="w-full border border-border bg-muted px-5 text-base text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
          style={{ minHeight: 56 }}
        />
        <button
          type="submit"
          disabled={!isValid || status === "sending"}
          className="cta group inline-flex w-full items-center justify-center gap-3 bg-accent px-8 py-5 text-base font-bold uppercase tracking-wider text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-50"
          style={{ minHeight: 56 }}
        >
          <span>{status === "sending" ? "sending" : "send me my results"}</span>
          <span aria-hidden="true" className="cta-arrow text-lg">
            →
          </span>
        </button>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          no spam. unsubscribe anytime.
        </p>
      </form>
    </section>
  );
}

function ResultScreen({ type, onRetake }: { type: DepletionType; onRetake: () => void }) {
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
      <p className="rise rise-1 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
        your diagnosis
      </p>
      <h1 className="rise rise-2 mt-6 text-5xl font-bold leading-[0.95] tracking-tight text-accent sm:text-7xl">
        {r.name}
      </h1>
      <p
        className="rise rise-3 mt-5 text-xl font-bold leading-snug tracking-tight text-foreground sm:text-3xl"
        style={{ textWrap: "balance" } as React.CSSProperties}
      >
        {r.headline}
      </p>

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

        <div className="border border-accent bg-accent/5 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
            share this
          </p>
          <p className="mt-4 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
            {r.shareLine}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={copyShare}
              className="cta group inline-flex items-center justify-center gap-3 bg-accent px-6 py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground transition-colors hover:bg-accent/90"
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
              className="inline-flex items-center justify-center gap-3 border border-border px-6 py-4 text-sm font-bold uppercase tracking-wider text-foreground transition-colors hover:border-accent"
              style={{ minHeight: 48 }}
            >
              retake
            </button>
          </div>
        </div>

        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          results also sent to your inbox
        </p>
      </div>
    </section>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}
