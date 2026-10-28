"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  STAGES,
  assess,
  OUTCOME_TEXT,
  DISCLAIMER,
  type Answer,
  type Question,
} from "@/data/checklist";
import { termsFor } from "@/data/glossary";

type View = "intro" | "stage" | "results";
type Answers = Record<string, Answer | undefined>;
type Size = "sm" | "md" | "lg";
type IconName =
  | "chevron"
  | "check"
  | "cross"
  | "question"
  | "warn"
  | "pin"
  | "moon"
  | "sun";

const STORAGE_KEY = "land-checklist-v1";
const PREFS_KEY = "land-checklist-prefs";

/* ---------- Shared look ---------- */

const PILL =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors";
const PRIMARY = `${PILL} bg-brand text-white hover:bg-brand-dark`;
const OUTLINE = `${PILL} border-2 border-line bg-surface text-ink hover:bg-soft`;
const ON_DARK_FILLED = `${PILL} bg-white text-crimson hover:bg-gray-100`;
const ON_DARK_OUTLINE = `${PILL} border-2 border-white/70 text-white hover:bg-white/10`;

const BUTTONS: { value: Answer; label: string; icon: IconName }[] = [
  { value: "yes", label: "Yes", icon: "check" },
  { value: "no", label: "No", icon: "cross" },
  { value: "unsure", label: "Not sure", icon: "question" },
];

const ACTIVE: Record<Answer, string> = {
  yes: "border-ok-line bg-ok-line text-white",
  no: "border-flag-line bg-flag-line text-white",
  unsure: "border-warn-line bg-warn-line text-white",
};

const TONES = {
  flag: {
    border: "border-l-flag-line",
    ink: "text-flag-ink",
    icon: "warn" as IconName,
    label: "Red flag",
  },
  warn: {
    border: "border-l-warn-line",
    ink: "text-warn-ink",
    icon: "question" as IconName,
    label: "Open check",
  },
  ok: {
    border: "border-l-ok-line",
    ink: "text-ok-ink",
    icon: "check" as IconName,
    label: "Good to do",
  },
};

function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName;
  className?: string;
}) {
  const p = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "chevron":
      return (
        <svg {...p}>
          <path d="M9 6l6 6-6 6" />
        </svg>
      );
    case "check":
      return (
        <svg {...p}>
          <path d="M5 12l5 5 9-10" />
        </svg>
      );
    case "cross":
      return (
        <svg {...p}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case "question":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7" />
          <path d="M12 17.5h.01" />
        </svg>
      );
    case "warn":
      return (
        <svg {...p}>
          <path d="M12 3l10 18H2L12 3z" />
          <path d="M12 10v5M12 18h.01" />
        </svg>
      );
    case "pin":
      return (
        <svg {...p}>
          <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
      );
    case "moon":
      return (
        <svg {...p}>
          <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" />
        </svg>
      );
    case "sun":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      );
  }
}

/* ---------- Text size and dark mode ---------- */

function UtilityBar() {
  const [size, setSize] = useState<Size>("md");
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      const p = raw ? JSON.parse(raw) : null;
      if (p?.size === "sm" || p?.size === "md" || p?.size === "lg") {
        setSize(p.size);
      }
      if (typeof p?.dark === "boolean") {
        setDark(p.dark);
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setDark(true);
      }
    } catch {
      // Ignore blocked or corrupted storage.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.documentElement.dataset.size = size;
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify({ size, dark }));
    } catch {
      // Ignore storage errors.
    }
  }, [size, dark, ready]);

  const sizes: { value: Size; label: string; px: number }[] = [
    { value: "sm", label: "Smaller text", px: 12 },
    { value: "md", label: "Normal text", px: 15 },
    { value: "lg", label: "Larger text", px: 19 },
  ];

  return (
    <div className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-5xl items-center justify-end gap-3 px-4 py-1.5 text-sm text-muted">
        <div className="flex items-center gap-1" role="group" aria-label="Text size">
          {sizes.map((s) => (
            <button
              key={s.value}
              onClick={() => setSize(s.value)}
              aria-pressed={size === s.value}
              aria-label={s.label}
              className={`grid h-8 w-8 place-items-center rounded-full font-bold ${
                size === s.value ? "bg-brand text-white" : "text-ink hover:bg-soft"
              }`}
            >
              <span style={{ fontSize: s.px }}>A</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => setDark((d) => !d)}
          aria-pressed={dark}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-ink hover:bg-soft"
        >
          <Icon name={dark ? "sun" : "moon"} className="h-4 w-4" />
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </div>
  );
}

function Shell({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-page text-ink">
      <UtilityBar />
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand text-white">
              <Icon name="pin" />
            </span>
            <span className="text-base font-bold leading-tight">
              Land Purchase Checklist
            </span>
          </div>
          {action}
        </div>
      </header>
      {children}
    </div>
  );
}

/* ---------- Pieces ---------- */

function Explainer({ text }: { text: string }) {
  const terms = termsFor(text);
  if (terms.length === 0) return null;
  return (
    <details className="mt-3 rounded-2xl bg-info-bg p-3 text-sm text-info-ink">
      <summary className="cursor-pointer font-semibold">What is this?</summary>
      <dl className="mt-2 space-y-2">
        {terms.map((t) => (
          <div key={t.id}>
            <dt className="font-semibold">{t.name}</dt>
            <dd>{t.meaning}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}

function QuestionCard({
  q,
  answer,
  onAnswer,
}: {
  q: Question;
  answer?: Answer;
  onAnswer: (a: Answer) => void;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      <p className="text-lg font-semibold leading-snug">{q.text}</p>
      <p className="mt-1 text-muted">{q.why}</p>
      <Explainer text={q.text} />
      <div className="mt-4 grid grid-cols-3 gap-2">
        {BUTTONS.map((b) => (
          <button
            key={b.value}
            onClick={() => onAnswer(b.value)}
            aria-pressed={answer === b.value}
            className={`inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full border-2 px-2 py-2 text-sm font-semibold transition-colors ${
              answer === b.value
                ? ACTIVE[b.value]
                : "border-line bg-surface text-ink hover:bg-soft"
            }`}
          >
            <Icon name={b.icon} className="h-4 w-4" />
            {b.label}
          </button>
        ))}
      </div>
      {(answer === "no" || answer === "unsure") && (
        <p className="mt-4 flex gap-2 rounded-2xl bg-warn-bg p-4 text-sm text-warn-ink">
          <Icon name="warn" className="mt-0.5 h-5 w-5 shrink-0" />
          <span>
            <strong>Next step:</strong> {q.nextStep}
          </span>
        </p>
      )}
    </div>
  );
}

function FlagGroup({
  title,
  items,
  tone,
}: {
  title: string;
  items: Question[];
  tone: keyof typeof TONES;
}) {
  if (items.length === 0) return null;
  const t = TONES[tone];
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold">{title}</h2>
      <ul className="mt-3 space-y-3">
        {items.map((q) => (
          <li
            key={q.id}
            className={`rounded-2xl border border-l-8 border-line bg-surface p-4 ${t.border}`}
          >
            <p className={`flex items-center gap-1.5 text-sm font-bold ${t.ink}`}>
              <Icon name={t.icon} className="h-4 w-4" />
              {t.label}
            </p>
            <p className="mt-1 font-semibold">{q.text}</p>
            <p className="mt-1 text-sm text-muted">{q.nextStep}</p>
            <Explainer text={q.text} />
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------- Main component ---------- */

export default function Checklist() {
  const [view, setView] = useState<View>("intro");
  const [stageIdx, setStageIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [hydrated, setHydrated] = useState(false);

  // Load saved progress once, in the browser only.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved && typeof saved === "object") {
          if (saved.answers && typeof saved.answers === "object") {
            setAnswers(saved.answers);
          }
          if (
            typeof saved.stageIdx === "number" &&
            saved.stageIdx >= 0 &&
            saved.stageIdx < STAGES.length
          ) {
            setStageIdx(saved.stageIdx);
          }
        }
      }
    } catch {
      // Storage can be blocked or corrupted. Start fresh.
    }
    setHydrated(true);
  }, []);

  // Save progress whenever it changes (after the first load).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, stageIdx }));
    } catch {
      // Ignore storage errors.
    }
  }, [answers, stageIdx, hydrated]);

  const stage = STAGES[stageIdx];
  const isLast = stageIdx === STAGES.length - 1;
  const hasProgress = Object.keys(answers).length > 0;
  const totalQuestions = STAGES.reduce((n, s) => n + s.questions.length, 0);

  function startOver() {
    setAnswers({});
    setStageIdx(0);
    setView("intro");
  }

  /* ----- Intro ----- */
  if (view === "intro") {
    return (
      <Shell
        action={
          <button
            onClick={() => setView("stage")}
            className={`${PRIMARY} hidden !min-h-10 !py-2 text-sm sm:inline-flex`}
          >
            {hasProgress ? "Continue" : "Start checklist"}
          </button>
        }
      >
        <section className="hero">
          <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-[1.1fr_1fr] md:items-center md:py-16">
            <div>
              <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
                Buying land? Check before you pay.
              </h1>
              <p className="mt-4 max-w-md text-lg text-white/85">
                Answer {totalQuestions} short questions in {STAGES.length}{" "}
                stages. You get a clear result and a list of what to ask your
                lawyer and surveyor. Made for Kwara State.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={() => setView("stage")} className={ON_DARK_FILLED}>
                  {hasProgress ? "Continue where you stopped" : "Start checklist"}
                </button>
                {hasProgress && (
                  <button onClick={startOver} className={ON_DARK_OUTLINE}>
                    Start over
                  </button>
                )}
              </div>
              {hasProgress && (
                <p className="mt-3 text-sm text-white/75">
                  Your answers are saved only on this device.
                </p>
              )}
            </div>
            <div className="rounded-3xl bg-night/80 p-5 ring-1 ring-white/10">
              <h2 className="text-xl font-bold text-white">
                Your {STAGES.length} stages
              </h2>
              <ul className="mt-4 space-y-2.5">
                {STAGES.map((s, i) => (
                  <li key={s.title}>
                    <button
                      onClick={() => {
                        setStageIdx(i);
                        setView("stage");
                      }}
                      className="flex min-h-12 w-full items-center justify-between gap-3 rounded-full bg-brand px-5 py-2.5 text-left font-semibold leading-snug text-white transition-colors hover:bg-brand-dark"
                    >
                      <span>
                        {i + 1}. {s.title}
                      </span>
                      <Icon name="chevron" className="h-5 w-5 shrink-0" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <main className="mx-auto max-w-3xl px-4 py-8">
          <p className="rounded-2xl border border-line bg-surface p-4 text-sm text-muted">
            {DISCLAIMER}
          </p>
          <p className="mt-3 text-xs text-muted">
            Independent project. Not affiliated with the Kwara State Government.
          </p>
        </main>
      </Shell>
    );
  }

  /* ----- Results ----- */
  if (view === "results") {
    const r = assess(answers);
    const text = OUTCOME_TEXT[r.outcome];
    const tone =
      r.outcome === "stop"
        ? { hero: "hero", icon: "warn" as IconName }
        : r.outcome === "caution"
        ? { hero: "hero hero-warn", icon: "question" as IconName }
        : { hero: "hero hero-ok", icon: "check" as IconName };
    return (
      <Shell
        action={
          <button
            onClick={() => setView("intro")}
            className={`${OUTLINE} !min-h-10 !py-2 text-sm`}
          >
            Home
          </button>
        }
      >
        <section className={tone.hero}>
          <div className="mx-auto max-w-3xl px-4 py-10">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-white/15 text-white">
              <Icon name={tone.icon} className="h-7 w-7" />
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white md:text-4xl">
              {text.title}
            </h1>
            <p className="mt-2 max-w-xl text-lg text-white/90">{text.body}</p>
            <div className="mt-5 flex flex-wrap gap-2 text-sm font-semibold text-white">
              <span className="rounded-full bg-white/15 px-3 py-1">
                {r.criticalFlags.length} red flags
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1">
                {r.importantFlags.length} open checks
              </span>
            </div>
          </div>
        </section>
        <main className="mx-auto max-w-3xl px-4 pb-10">
          <FlagGroup title="Critical red flags" items={r.criticalFlags} tone="flag" />
          <FlagGroup title="Important open checks" items={r.importantFlags} tone="warn" />
          <FlagGroup title="Good to do" items={r.goodFlags} tone="ok" />
          <p className="mt-8 rounded-2xl border border-line bg-surface p-4 text-xs text-muted">
            {DISCLAIMER}
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button
              onClick={() => {
                setStageIdx(0);
                setView("stage");
              }}
              className={OUTLINE}
            >
              Review answers
            </button>
            <button onClick={startOver} className={PRIMARY}>
              Start over
            </button>
          </div>
        </main>
      </Shell>
    );
  }

  /* ----- Stage ----- */
  return (
    <Shell
      action={
        <button
          onClick={() => setView("intro")}
          className={`${OUTLINE} !min-h-10 !py-2 text-sm`}
        >
          Home
        </button>
      }
    >
      <section className="hero">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <p className="text-sm font-semibold text-white/85">
            Stage {stageIdx + 1} of {STAGES.length}
          </p>
          <div
            className="mt-2 flex gap-1.5"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={STAGES.length}
            aria-valuenow={stageIdx + 1}
          >
            {STAGES.map((s, i) => (
              <span
                key={s.title}
                className={`h-2 flex-1 rounded-full ${
                  i <= stageIdx ? "bg-white" : "bg-white/25"
                }`}
              />
            ))}
          </div>
          <h1 className="mt-4 text-2xl font-extrabold text-white md:text-3xl">
            {stage.title}
          </h1>
          <p className="mt-1 max-w-xl text-white/85">{stage.intro}</p>
        </div>
      </section>
      <main className="mx-auto max-w-3xl px-4 py-6">
        <div className="space-y-4">
          {stage.questions.map((q) => (
            <QuestionCard
              key={q.id}
              q={q}
              answer={answers[q.id]}
              onAnswer={(a) => setAnswers((prev) => ({ ...prev, [q.id]: a }))}
            />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2">
          <button
            disabled={stageIdx === 0}
            onClick={() => setStageIdx((i) => i - 1)}
            className={`${OUTLINE} disabled:opacity-40`}
          >
            Back
          </button>
          <button
            onClick={() => (isLast ? setView("results") : setStageIdx((i) => i + 1))}
            className={PRIMARY}
          >
            {isLast ? "See result" : "Next"}
            <Icon name="chevron" className="h-5 w-5" />
          </button>
        </div>
      </main>
    </Shell>
  );
}
