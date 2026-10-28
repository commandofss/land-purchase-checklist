"use client";

import { useState } from "react";
import {
  STAGES,
  assess,
  OUTCOME_TEXT,
  DISCLAIMER,
  type Answer,
  type Question,
} from "@/data/checklist";

type View = "intro" | "stage" | "results";

const BUTTONS: { value: Answer; label: string }[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "unsure", label: "Not sure" },
];

const ACTIVE: Record<Answer, string> = {
  yes: "bg-green-600 text-white border-green-600",
  no: "bg-red-600 text-white border-red-600",
  unsure: "bg-amber-500 text-white border-amber-500",
};

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
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="font-medium text-gray-900">{q.text}</p>
      <p className="mt-1 text-sm text-gray-600">{q.why}</p>
      <div className="mt-3 flex gap-2">
        {BUTTONS.map((b) => (
          <button
            key={b.value}
            onClick={() => onAnswer(b.value)}
            className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium ${
              answer === b.value
                ? ACTIVE[b.value]
                : "border-gray-300 bg-white text-gray-800"
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>
      {(answer === "no" || answer === "unsure") && (
        <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
          <strong>Next step:</strong> {q.nextStep}
        </p>
      )}
    </div>
  );
}

export default function Checklist() {
  const [view, setView] = useState<View>("intro");
  const [stageIdx, setStageIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer | undefined>>({});

  const stage = STAGES[stageIdx];
  const isLast = stageIdx === STAGES.length - 1;

  if (view === "intro") {
    return (
      <main className="mx-auto max-w-2xl p-4">
        <h1 className="text-2xl font-bold">Land Purchase Checklist</h1>
        <p className="mt-1 text-gray-700">Kwara State · Check before you pay</p>
        <p className="mt-4">
          Answer {STAGES.reduce((n, s) => n + s.questions.length, 0)} short
          questions in {STAGES.length} stages. You will get a clear result and a
          list of what to ask your lawyer and surveyor.
        </p>
        <p className="mt-4 rounded-lg bg-gray-100 p-3 text-sm text-gray-700">
          {DISCLAIMER}
        </p>
        <p className="mt-2 text-xs text-gray-500">
          Independent project. Not affiliated with the Kwara State Government.
        </p>
        <button
          onClick={() => setView("stage")}
          className="mt-6 w-full rounded-lg bg-black px-4 py-3 font-medium text-white"
        >
          Start
        </button>
      </main>
    );
  }

  if (view === "results") {
    const r = assess(answers);
    const text = OUTCOME_TEXT[r.outcome];
    const color =
      r.outcome === "stop"
        ? "bg-red-50 border-red-300 text-red-900"
        : r.outcome === "caution"
        ? "bg-amber-50 border-amber-300 text-amber-900"
        : "bg-green-50 border-green-300 text-green-900";
    const Group = ({ title, items }: { title: string; items: Question[] }) =>
      items.length === 0 ? null : (
        <section className="mt-6">
          <h3 className="font-semibold">{title}</h3>
          <ul className="mt-2 space-y-3">
            {items.map((q) => (
              <li key={q.id} className="rounded-lg border bg-white p-3 text-sm">
                <p className="font-medium">{q.text}</p>
                <p className="mt-1 text-gray-700">{q.nextStep}</p>
              </li>
            ))}
          </ul>
        </section>
      );
    return (
      <main className="mx-auto max-w-2xl p-4">
        <div className={`rounded-xl border p-4 ${color}`}>
          <h1 className="text-xl font-bold">{text.title}</h1>
          <p className="mt-1">{text.body}</p>
        </div>
        <Group title="Critical red flags" items={r.criticalFlags} />
        <Group title="Important open checks" items={r.importantFlags} />
        <Group title="Good to do" items={r.goodFlags} />
        <p className="mt-6 rounded-lg bg-gray-100 p-3 text-xs text-gray-700">
          {DISCLAIMER}
        </p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => {
              setView("stage");
              setStageIdx(0);
            }}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3"
          >
            Review answers
          </button>
          <button
            onClick={() => {
              setAnswers({});
              setStageIdx(0);
              setView("intro");
            }}
            className="flex-1 rounded-lg bg-black px-4 py-3 text-white"
          >
            Start over
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl p-4">
      <p className="text-sm text-gray-600">
        Stage {stageIdx + 1} of {STAGES.length}
      </p>
      <div className="mt-1 h-2 rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-black"
          style={{ width: `${((stageIdx + 1) / STAGES.length) * 100}%` }}
        />
      </div>
      <h1 className="mt-4 text-xl font-bold">{stage.title}</h1>
      <p className="text-gray-700">{stage.intro}</p>
      <div className="mt-4 space-y-4">
        {stage.questions.map((q) => (
          <QuestionCard
            key={q.id}
            q={q}
            answer={answers[q.id]}
            onAnswer={(a) => setAnswers((prev) => ({ ...prev, [q.id]: a }))}
          />
        ))}
      </div>
      <div className="mt-6 flex gap-2">
        <button
          disabled={stageIdx === 0}
          onClick={() => setStageIdx((i) => i - 1)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 disabled:opacity-40"
        >
          Back
        </button>
        <button
          onClick={() => (isLast ? setView("results") : setStageIdx((i) => i + 1))}
          className="flex-1 rounded-lg bg-black px-4 py-3 text-white"
        >
          {isLast ? "See result" : "Next"}
        </button>
      </div>
    </main>
  );
}
