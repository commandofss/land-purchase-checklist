# Land Purchase Checklist (Kwara State)

A free, mobile-friendly checklist that helps ordinary buyers check a piece of land **before they pay**. The buyer answers 25 plain-language questions in 5 stages and gets a clear result (Stop, Proceed with caution, or Looks well-checked) plus a list of exactly what to ask their lawyer and licensed surveyor.

**Live demo:** https://land-purchase-checklist.vercel.app

Built for **SafeSpace Hacks**.

> **Independent project.** This app is not affiliated with, endorsed by, or connected to the Kwara State Government, KW-GIS, or any land registry. It uses only public information.

## The problem

Land fraud is common: sellers who do not own the plot, the same plot sold to several buyers, forged documents, family land sold without the family's agreement, and plots that sit inside government-acquired land. Most buyers only discover the problem after they have paid. Legal terms like *Certificate of Occupancy*, *Governor's Consent* and *Deed of Assignment* make it harder for ordinary people to know what to check.

## How it works

1. **The seller**: is this person really allowed to sell?
2. **The title documents**: what does the seller actually hold, and what do the records say?
3. **The survey plan**: where exactly is the land, and does the plan match the ground?
4. **The site and neighbours**: who is on the land, and who else claims it?
5. **Payment and paperwork**: pay only when the checks are done.

Each question has a weight (critical, important, or good to do). Every answer other than **Yes** is flagged, and unanswered questions count as **Not sure**:

| Result | When it appears |
| --- | --- |
| **Stop. Do not pay yet.** | At least one critical check is not a clear Yes |
| **Proceed with caution.** | All critical checks are Yes, but some important ones are open |
| **Looks well-checked so far.** | All critical and important checks are Yes |

Even the best result tells the buyer that the tool cannot prove the land is safe.

## Features

- 25 questions in 5 stages, each with a short reason it matters and a concrete **next step** when the answer is No or Not sure
- "What is this?" plain-language explainers for terms such as Certificate of Occupancy, Governor's Consent, Deed of Assignment, survey plan and beacon
- Results page that lists red flags and open checks with what to ask a lawyer or surveyor
- Progress saved on the user's own device only
- Works on phones, with text size and dark mode controls
- No accounts, no database, no tracking

## Privacy

Answers stay in the browser on the user's device (local storage). Nothing is sent to a server, and there is nothing to log in to.

## Important limits

This tool gives **general guidance only**. It is **not legal advice**. It cannot verify any document, search any registry, or confirm that land is safe to buy. Buyers should always use an independent lawyer and a licensed surveyor.

The questions are drafted from public sources and are written as "ask your lawyer to..." steps. Rules and offices differ by state, so the content is specific to Kwara State.

**Professional review:** _[add the name or role of the lawyer or surveyor who reviewed the content, or write "pending" until it is done]_

## Tech stack

- [Next.js](https://nextjs.org) (App Router) with TypeScript
- Tailwind CSS
- Deployed on [Vercel](https://vercel.com)

The checklist content and scoring live in `src/data/checklist.ts`, and the plain-language explainers live in `src/data/glossary.ts`, so the questions can be reviewed and edited without touching the interface.

## Run it locally

Requires Node.js 20 or newer.

```bash
git clone https://github.com/commandofss/land-purchase-checklist.git
cd land-purchase-checklist
npm install
npm run dev -- -p 3001
```

Open [http://localhost:3001](http://localhost:3001).

To check a production build:

```bash
npm run build
```

## Sources

Public articles and reports used to draft the checklist:

- Mondaq: How To Verify Property Titles In Nigeria Before Purchase
- Mondaq: Buying Property In Nigeria As A Foreigner (due diligence steps)
- Mondaq: Complete Guide To Buying Land In Lagos State (common mistakes)
- Ownkey: How to Buy Land in Nigeria 2026
- Supreme Court of Nigeria, *Union Bank v Ayodare & Sons* (2007), on Governor and Local Government consent
- Voice of Nigeria: Kwara launches the KW-GIS digital land information system
- Voice of Nigeria: Kwara pays compensation over land acquired for the Eiyenkorin industrial park

## Author

Built by [@commandofss](https://github.com/commandofss).
