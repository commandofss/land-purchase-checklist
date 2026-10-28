// checklist.ts
// Kwara State land-purchase checklist: content + scoring.
// DRAFT: must be reviewed by a lawyer before the demo is shared.
// The app gives general guidance, not legal advice, and cannot verify any document.

export type Weight = "critical" | "important" | "good";
export type Answer = "yes" | "no" | "unsure";
export type Outcome = "stop" | "caution" | "wellChecked";

export interface Question {
  id: string;
  text: string; // phrased so that "Yes" is the safe answer
  why: string; // one-line reason this check matters
  nextStep: string; // shown when the answer is "No" or "Not sure"
  weight: Weight;
}

export interface Stage {
  id: string;
  title: string;
  intro: string;
  questions: Question[];
}

export const STAGES: Stage[] = [
  {
    id: "seller",
    title: "1. The seller",
    intro: "Make sure the person selling is really allowed to sell.",
    questions: [
      {
        id: "s1",
        text: "Have you seen the seller’s government ID, and does the name match every title document?",
        why: "Fraudsters sell land they do not own, often under a different name.",
        nextStep: "Do not pay. Ask for a valid ID and compare the name on every document.",
        weight: "critical",
      },
      {
        id: "s2",
        text: "Is the seller the owner on the documents? If they act for someone else, do you have a signed power of attorney?",
        why: "An agent or relative may not have the right to sell.",
        nextStep: "Ask your lawyer to check the seller’s authority before any payment.",
        weight: "critical",
      },
      {
        id: "s3",
        text: "If this is family land, has the family head and the principal family members agreed to the sale in writing?",
        why: "Family land sold without the family’s agreement is a common source of disputes.",
        nextStep: "Ask for a written family consent signed by the family head and principal members.",
        weight: "critical",
      },
      {
        id: "s4",
        text: "Have you met the actual owner in person, not only an agent or middleman?",
        why: "Agents may sell the same plot to several buyers.",
        nextStep: "Ask to meet the owner, with your lawyer present if possible.",
        weight: "important",
      },
    ],
  },
  {
    id: "title",
    title: "2. The title documents",
    intro: "Check what the seller actually holds, and what the records say.",
    questions: [
      {
        id: "t1",
        text: "Does the seller hold a registered title document (for example a Certificate of Occupancy, or a Deed of Assignment with Governor’s Consent), not only a receipt or allocation letter?",
        why: "A receipt or allocation letter alone is weak proof of ownership.",
        nextStep: "Ask your lawyer what the document is worth and whether the title can be perfected.",
        weight: "critical",
      },
      {
        id: "t2",
        text: "Do earlier documents show how ownership passed from the original holder to the seller?",
        why: "A break in the chain of ownership can make the title defective.",
        nextStep: "Ask the seller for the earlier documents. Do not rely on the latest one only.",
        weight: "important",
      },
      {
        id: "t3",
        text: "Has your lawyer searched the official land records (Kwara State Land Registry, Ilorin, and the KW-GIS land information system) for this plot?",
        why: "A registry search shows who holds the title and whether anything is registered against it.",
        nextStep:
          "Ask your lawyer to run the search and to tell you which office holds the record for your plot. Not every plot is digitised, so a missing record needs an explanation.",
        weight: "critical",
      },
      {
        id: "t4",
        text: "Has a court search been done to confirm the land is not in a legal dispute?",
        why: "Land in litigation can be tied up for years.",
        nextStep: "Ask your lawyer to run a litigation search before you pay.",
        weight: "important",
      },
      {
        id: "t5",
        text: "Have you confirmed the land is not under government acquisition, excision, or a planned layout or project?",
        why: "Government can acquire land for public use, and buyers or farmers may lose their rights.",
        nextStep:
          "Ask your lawyer and the state land office (KW-GIS) to confirm the status of the plot in writing.",
        weight: "critical",
      },
      {
        id: "t6",
        text: "Has your lawyer confirmed whether the land is under a statutory or a customary right of occupancy, and that any needed consent (Governor or Local Government) can be obtained?",
        why: "Consent rules differ, and land outside the city may be held under customary rights.",
        nextStep: "Ask your lawyer to explain which consent applies to this plot and who must apply for it.",
        weight: "important",
      },
    ],
  },
  {
    id: "survey",
    title: "3. The survey plan",
    intro: "The survey plan shows exactly where the land is and how big it is.",
    questions: [
      {
        id: "v1",
        text: "Is there a survey plan signed by a licensed surveyor?",
        why: "Without a proper plan you cannot prove the exact boundaries.",
        nextStep: "Ask the seller for the plan, or hire a licensed surveyor to prepare one.",
        weight: "critical",
      },
      {
        id: "v2",
        text: "Does the plan show the location, size, shape, and beacon numbers of the plot?",
        why: "Missing details make it easy to dispute or swap the plot.",
        nextStep: "Ask a licensed surveyor to review the plan and say what is missing.",
        weight: "important",
      },
      {
        id: "v3",
        text: "Has the survey plan been checked against government records to see whether the plot falls inside acquired land or an approved layout?",
        why: "A plan can look genuine and still sit on land the government has acquired.",
        nextStep: "Ask a licensed surveyor or your lawyer to have the plan checked with the state survey and land office.",
        weight: "critical",
      },
      {
        id: "v4",
        text: "Do the survey plan, the title documents, and the land on the ground all match?",
        why: "Mismatches are a classic sign of a fake document or a double sale.",
        nextStep: "Do not pay until the differences are explained in writing.",
        weight: "critical",
      },
      {
        id: "v5",
        text: "Has an independent surveyor, chosen by you, measured the land?",
        why: "The seller’s surveyor may not be neutral.",
        nextStep: "Consider hiring your own licensed surveyor to confirm the size and beacons.",
        weight: "good",
      },
    ],
  },
  {
    id: "site",
    title: "4. The site and neighbours",
    intro: "Go and see the land, and ask the people who live near it.",
    questions: [
      {
        id: "p1",
        text: "Have you visited the site yourself, with a copy of the survey plan?",
        why: "Photos and agents can hide problems.",
        nextStep: "Visit the plot before paying, ideally with your surveyor.",
        weight: "important",
      },
      {
        id: "p2",
        text: "Is the land free of anyone living on it, farming it, or building on it?",
        why: "Existing occupiers may have rights, or may be a sign of another sale.",
        nextStep: "Find out who they are and on what basis they use the land before you pay.",
        weight: "critical",
      },
      {
        id: "p3",
        text: "Are the boundary beacons in place, and do they match the plan?",
        why: "Beacons are how the boundaries are marked on the ground.",
        nextStep: "Ask your surveyor to locate the beacons and compare them with the plan.",
        weight: "important",
      },
      {
        id: "p4",
        text: "Have you asked neighbours or community leaders whether anyone else claims the land?",
        why: "Neighbours often know about disputes that no document shows.",
        nextStep: "Speak to at least two neighbours and note what they say.",
        weight: "important",
      },
      {
        id: "p5",
        text: "Is there no sign that the same plot is being shown or sold to other buyers?",
        why: "Selling one plot to several buyers is a common land fraud.",
        nextStep: "Treat this as a red flag. Ask your lawyer to check before paying anything.",
        weight: "important",
      },
    ],
  },
  {
    id: "payment",
    title: "5. Payment and paperwork",
    intro: "Pay only when the checks are done and the paperwork is clear.",
    questions: [
      {
        id: "m1",
        text: "Are you free to take your time, with no pressure to pay quickly or in cash?",
        why: "Pressure to pay fast is a typical scam tactic.",
        nextStep: "Slow down. A genuine seller will wait for your checks.",
        weight: "critical",
      },
      {
        id: "m2",
        text: "Will payment go to the verified owner, with a receipt that describes the land and refers to the survey plan?",
        why: "A clear receipt is your proof of payment for this exact plot.",
        nextStep: "Do not pay to a third party or without a detailed receipt.",
        weight: "critical",
      },
      {
        id: "m3",
        text: "Is your own lawyer preparing the Deed of Assignment?",
        why: "The seller’s lawyer protects the seller, not you.",
        nextStep: "Hire an independent lawyer to draft or review the deed.",
        weight: "important",
      },
      {
        id: "m4",
        text: "Is it agreed in writing who will apply for Governor’s Consent, pay stamp duty, and register the deed, and by when?",
        why: "A transfer without consent may not be perfected, even if the full price is paid.",
        nextStep: "Agree this in the contract before paying the balance.",
        weight: "critical",
      },
      {
        id: "m5",
        text: "Will you pay only a refundable deposit until all checks are finished?",
        why: "Paying in full too early is one of the most common mistakes.",
        nextStep: "Limit early payment to a refundable deposit, in writing.",
        weight: "important",
      },
    ],
  },
];

export interface Assessment {
  outcome: Outcome;
  criticalFlags: Question[];
  importantFlags: Question[];
  goodFlags: Question[];
}

/** Any missing answer counts as "unsure". */
export function assess(answers: Record<string, Answer | undefined>): Assessment {
  const criticalFlags: Question[] = [];
  const importantFlags: Question[] = [];
  const goodFlags: Question[] = [];

  for (const stage of STAGES) {
    for (const q of stage.questions) {
      const a = answers[q.id] ?? "unsure";
      if (a === "yes") continue;
      if (q.weight === "critical") criticalFlags.push(q);
      else if (q.weight === "important") importantFlags.push(q);
      else goodFlags.push(q);
    }
  }

  const outcome: Outcome =
    criticalFlags.length > 0 ? "stop" : importantFlags.length > 0 ? "caution" : "wellChecked";

  return { outcome, criticalFlags, importantFlags, goodFlags };
}

export const OUTCOME_TEXT: Record<Outcome, { title: string; body: string }> = {
  stop: {
    title: "Stop. Do not pay yet.",
    body: "One or more critical checks are missing. Resolve each red flag below, with a lawyer and a licensed surveyor, before you pay.",
  },
  caution: {
    title: "Proceed with caution.",
    body: "The critical checks look done, but some important ones are still open. Close them before you pay the balance.",
  },
  wellChecked: {
    title: "Looks well-checked so far.",
    body: "Your answers show the main checks are done. This does not prove the land is safe: have your lawyer confirm every document before you pay.",
  },
};

export const DISCLAIMER =
  "This tool gives general guidance only. It is not legal advice and cannot verify any document, search any registry, or confirm that land is safe to buy. Always use an independent lawyer and a licensed surveyor.";

// Credits for the Devpost page. Add the lawyer or professional who reviews the content.
export const SOURCES = [
  "Mondaq: How To Verify Property Titles In Nigeria Before Purchase",
  "Mondaq: Buying Property In Nigeria As A Foreigner (due diligence steps)",
  "Mondaq: Complete Guide To Buying Land In Lagos State (common mistakes)",
  "Ownkey: How to Buy Land in Nigeria 2026",
  "Supreme Court of Nigeria, Union Bank v Ayodare & Sons (2007), on Governor and Local Government consent",
  "Voice of Nigeria: Kwara launches the KW-GIS digital land information system",
  "Voice of Nigeria: Kwara pays compensation over land acquired for the Eiyenkorin industrial park",
];
