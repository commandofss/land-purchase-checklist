// glossary.ts
// Plain-language explainers shown under checklist questions.
// DRAFT: must be reviewed by a lawyer before the demo is shared.
// General explanations only, not legal advice.

export interface Term {
  id: string;
  name: string;
  keywords: string[]; // lowercase fragments that trigger this explainer
  meaning: string;
}

export const GLOSSARY: Term[] = [
  {
    id: "coo",
    name: "Certificate of Occupancy (C of O)",
    keywords: ["certificate of occupancy"],
    meaning:
      "A document from the state government that gives a person the right to occupy and use a piece of land, usually for a fixed number of years.",
  },
  {
    id: "consent",
    name: "Governor’s Consent",
    keywords: ["governor"],
    meaning:
      "Written approval from the state Governor that is normally needed when a registered land title is transferred to a new owner. A sale without the needed consent may not be properly completed, even if the buyer paid in full.",
  },
  {
    id: "deed",
    name: "Deed of Assignment",
    keywords: ["deed of assignment", "register the deed"],
    meaning:
      "The legal document that transfers the seller’s interest in the land to the buyer. It should be prepared or reviewed by the buyer’s own lawyer.",
  },
  {
    id: "survey",
    name: "Survey plan",
    keywords: ["survey plan"],
    meaning:
      "A map of the plot prepared by a licensed surveyor. It shows the exact location, size, shape and corners of the land.",
  },
  {
    id: "beacon",
    name: "Beacon",
    keywords: ["beacon"],
    meaning:
      "A numbered marker, often a concrete pillar, placed at each corner of a plot. The numbers on the ground should match the numbers on the survey plan.",
  },
  {
    id: "poa",
    name: "Power of attorney",
    keywords: ["power of attorney"],
    meaning:
      "A signed paper in which an owner gives another person the authority to act for them. Check what it allows before relying on it.",
  },
  {
    id: "customary",
    name: "Customary right of occupancy",
    keywords: ["customary"],
    meaning:
      "A right to use land that comes from local custom, more common outside the city. A different consent may apply than for city land, so ask your lawyer which one.",
  },
  {
    id: "records",
    name: "Land Registry and KW-GIS",
    keywords: ["land registry", "land records", "kw-gis"],
    meaning:
      "The Land Registry is the state office that keeps records of registered land documents. KW-GIS is the state’s digital land information system. Not every plot is on it yet, so a missing record needs an explanation, not panic.",
  },
  {
    id: "acquisition",
    name: "Government acquisition",
    keywords: ["acquisition", "acquired"],
    meaning:
      "When the government takes land for public use, such as a road or an industrial park. Land that has been acquired may not be sold to private buyers, even if the seller has papers.",
  },
  {
    id: "stamp",
    name: "Stamp duty",
    keywords: ["stamp duty"],
    meaning: "A government tax paid on legal documents such as the Deed of Assignment.",
  },
];

export function termsFor(text: string): Term[] {
  const t = text.toLowerCase();
  return GLOSSARY.filter((g) => g.keywords.some((k) => t.includes(k)));
}
