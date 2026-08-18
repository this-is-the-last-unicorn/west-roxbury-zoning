# Shared Components, Navigation & Technical Requirements

Components that appear across multiple pages, plus global UI/UX standards.

---

## Nav Bar

Appears on all pages.

| Element               | Notes                                                            |
| --------------------- | ---------------------------------------------------------------- |
| Logo                  | "West Roxbury Zoning Analysis" — links to `/`                    |
| Address search (mini) | Compact version of homepage search, in nav on non-homepage pages |
| Browse Map            | Links to `/map`                                                  |
| FAQ                   | Links to `/faq`                                                  |
| Meetings              | Links to `/meetings`                                             |
| About                 | Links to `/about`                                                |
| Sources               | Links to `/sources`                                              |

---

## Footer

Appears on all pages.

```
┌──────────────────────────────────────────────────────────────┐
│  About  ·  Sources & Methodology  ·  FAQ  ·  View on GitHub │
│                                                              │
│  Created by Emily Gamble · Prepared by The Last Unicorn, LLC │
│  This is an independent civic-data project.                  │
│  Not affiliated with or endorsed by the City of Boston.      │
│                                                              │
│  Open source · No trackers · No cookies · No ads · Privacy    │
│  [if GPC detected: ✓ Your opt-out preference honored]        │
└──────────────────────────────────────────────────────────────┘
```

- "View on GitHub" links to the public repository
- Authorship line is always visible
- Open-source / privacy notice reinforces trust on every page

---

## Address Search Input

Used on: Homepage (hero), Nav bar (mini), Map page

- Autocomplete from West Roxbury address list (derived from parcels `ST_NUM` + `ST_NAME`)
- On submit: match to parcel `GIS_ID` → route to `/property/{GIS_ID}`
- If address not found: "We don't have data for that address. It may be outside West Roxbury or not yet in our database."
- If condo unit: resolve to underlying parcel, show note: "Zoning applies to the property as a whole, not individual units."

---

## Stat Card

Used on: Block, Street, Sub-neighborhood, Overview

| Field          | Content                                      |
| -------------- | -------------------------------------------- |
| Metric name    | + tooltip icon                               |
| Existing value | Median                                       |
| Existing range | Min–Max                                      |
| Proposed value | Standard from proposed district (max or min) |

---

## Parcel Map

Used on: Block, Street, Sub-neighborhood, Overview, Browse Map

- **Library:** Mapbox GL JS
- Parcels colored by proposed district (RD-2/RD-3/RD-4/RD-6)
- Click parcel → property page (or popup on Browse Map)
- Searched/highlighted property where applicable

---

## District Badge

Used on: Property header, stat cards, map legend

RD-2 / RD-3 / RD-4 / RD-6 with district-specific color. Tooltip on click/hover with district description and link to City materials.

---

## Tooltip

Used on: Property table metric labels, stat card metric names

Plain-English definition. Full glossary:

| Term                              | Plain-English                                                                                                                                                                                                                                                                                                                             | Source                               |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| **Dwelling unit**                 | A self-contained home — a house, apartment, or unit someone lives in.                                                                                                                                                                                                                                                                     | Article 2                            |
| **Building floor plate**          | The ground-level area of a building, measured to the outside of exterior walls, including covered porches and balconies.                                                                                                                                                                                                                  | Article 2, BRA definition            |
| **Lot coverage**                  | The percentage of your lot that is covered by buildings. A 7,200 sf lot with a 1,440 sf building footprint has 20% lot coverage.                                                                                                                                                                                                          | Article 20, Table B                  |
| **Permeable area**                | The portion of your lot that allows water to soak into the ground — grass, garden, gravel. Driveways, patios, and buildings are impermeable.                                                                                                                                                                                              | Article 20, Table B                  |
| **Front yard / setback**          | The minimum distance required between your building and the front property line (the street side).                                                                                                                                                                                                                                        | Article 20, Table B                  |
| **Side yard (cumulative)**        | The combined width of both side yards. If your side yards are 8' and 7', your cumulative side yard is 15'.                                                                                                                                                                                                                                | Article 20, Table B                  |
| **Side yard (minimum)**           | The narrowest any single side yard can be. Under the proposal, this is 3' in all RD districts.                                                                                                                                                                                                                                            | Article 20, Table B                  |
| **Rear yard**                     | The minimum distance required between your building and the rear property line.                                                                                                                                                                                                                                                           | Article 20, Table B                  |
| **Sloped Roof Story**             | The proposed zoning requires the third story in RD-2 and RD-3 districts to be a "Sloped Roof Story." The July 2026 draft text does not define this term — it establishes no minimum roof pitch and no limit on dormer size. Additionally, this requirement can be waived entirely by recording a 5-foot sidewalk easement (Section 20-6). | Article 20, Tables B/C; Section 20-6 |
| **ADU (Accessory Dwelling Unit)** | A separate, self-contained home on the same lot as a main house. Under the proposal, a detached ADU can be up to 900 sf and 25' tall (or the main building height, whichever is less).                                                                                                                                                    | Article 8, Table A                   |
| **Nonconforming / pre-existing**  | A building or condition that doesn't meet current zoning rules but is legally allowed to remain because it existed before the rules were adopted. You are NOT required to change it.                                                                                                                                                      | Article 9; Article 20, Section 20-5  |
| **Easement bonus**                | The property owner records a 5' highway easement along the front lot line with DPW. In exchange: more units, relaxed setbacks, and in RD-2/RD-3, the Sloped Roof Story requirement is waived.                                                                                                                                             | Article 20, Section 20-6             |
| **Conditional use**               | A use or building that requires Board of Appeal approval after public hearing. Under the proposal, buildings with more units than the district normally allows require conditional use.                                                                                                                                                   | Article 6; Article 20, Section 20-3  |

---

## Zoning District Explanation

Do not recreate Boston Planning's explanation. Small info interaction: district name, "Your property-specific results below apply these rules," link to City materials. Our site applies the rules; the City explains the rules.

---

## Data Correction Modal

Triggered from property page and About page. No standalone URL.

```
┌──────────────────────────────────────────────────────────┐
│  Submit a Correction                                     │
│                                                          │
│  Property: 24 Example Street (auto-filled if from        │
│  property page)                                          │
│                                                          │
│  What needs correcting?                                  │
│  ┌──────────────────────────────────────────────────┐    │
│  │ [Text area]                                      │    │
│  └──────────────────────────────────────────────────┘    │
│                                                          │
│  Contact info (optional — only if you'd like follow-up): │
│  ┌──────────────────────────────────────────────────┐    │
│  │ [Email]                                          │    │
│  └──────────────────────────────────────────────────┘    │
│                                                          │
│  [Submit correction]                                     │
│                                                          │
│  Corrections are anonymous by default and reviewed       │
│  before any changes are made to the dataset.             │
└──────────────────────────────────────────────────────────┘
```

Text-only corrections. Anonymous by default, optional contact info. No photo/document uploads in V1.

### Corrections Review Workflow

No admin panel. When a correction is submitted:

1. API writes to `corrections` table (status: `pending`)
2. API sends email notification to Emily (and/or Slack webhook) with: property address, correction text, contact info if provided
3. Emily reviews and responds via direct database update or a simple script (`scripts/review-correction.sh`)
4. Status updated to `reviewed` / `applied` / `dismissed`

Email notification via Render's built-in SMTP or a free tier transactional service (Resend, Postmark free tier). Slack webhook as backup/secondary channel.

---

## Error / Not Found States

**Address not found:**

> "We don't have data for that address. It may be outside West Roxbury, or not yet in our database."
> [Try another address] [Browse the map instead]

**Property data incomplete:**

> "We have limited data for this property. Some calculations may show 'Needs property-specific review.'"

**Service error:**

> "Something went wrong loading this property. Please try again."
> [Retry] [Go to homepage]

---

## URL Structure

| Page                  | URL                           | Parameters                      |
| --------------------- | ----------------------------- | ------------------------------- |
| Homepage              | `/`                           | —                               |
| Property              | `/property/{GIS_ID}`          | GIS_ID from parcel data         |
| Block                 | `/block/{block_id}`           | Generated from street segment   |
| Street                | `/street/{street_slug}`       | Slugified street name           |
| Sub-neighborhood      | `/area/{area_slug}`           | e.g., `bellevue-hill`           |
| West Roxbury Overview | `/overview`                   | —                               |
| Browse Map            | `/map`                        | Optional: `?lat=X&lng=Y&zoom=Z` |
| Meetings              | `/meetings`                   | —                               |
| FAQ                   | `/faq`                        | —                               |
| About                 | `/about`                      | —                               |
| Sources & Methodology | `/sources`                    | —                               |
| Feedback              | `/feedback?property={GIS_ID}` | Optional property context       |
| Privacy Policy        | `/privacy`                    | —                               |

All pages with a `GIS_ID` or `block_id` parameter produce shareable URLs.

---

## Shareability

Every useful layer has a shareable URL: property, block, street, sub-neighborhood, West Roxbury. No downloadable PDF in V1.

---

## Technical / UX Requirements

- **Mobile-first:** Four-column table adapts to metric cards on mobile
- **WCAG accessibility:** Keyboard nav, screen-reader labels, non-color-only indicators, sufficient contrast
- **English only** (architecture should allow later translation)
- **No login / no accounts**
- **Minimal data retention** — no address search history, no newsletter, no contact database. Only stores: corrections (user-submitted text + optional email), anonymous feedback reactions, and meetings data. See [privacy policy](/privacy).
