# West Roxbury Zoning Analysis — Information Architecture

**Purpose:** Master IA document. Spec has been split into page-level files in `spec/`.  
**Status:** IA locked. Decisions resolved. Files split.

---

## SITE MAP

```
/                                   HOMEPAGE
│
├── /property/{GIS_ID}              PROPERTY PAGE (core experience)
│   ├── [inline] Condo note / Vacant lot note (if applicable)
│   ├── [inline] Reassurance banner
│   ├── [inline] Property summary + permission framing
│   ├── [inline] Nonconformity callout (if applicable)
│   ├── [inline] Guided Q&A (property-aware FAQ + category browse)
│   ├── [inline] Four-column comparison table
│   ├── [inline] Sloped Roof Story note (RD-2/RD-3 only)
│   ├── [inline] Easement bonus scenario (collapsible)
│   ├── [inline] Block preview + neighbor link
│   ├── [inline] Next steps (meetings, helpline, professional advice)
│   └── [inline] Per-property sources
│
├── /block/{block_id}               BLOCK PAGE
│   ├── [inline] Block map (mini)
│   ├── [inline] Stat cards (median + range)
│   ├── [inline] Character & roof distribution
│   └── [inline] Property list
│
├── /street/{street_slug}           STREET PAGE
│   ├── [inline] Street map
│   ├── [inline] Stat cards
│   ├── [inline] District distribution (if multi-district)
│   └── [inline] Block-by-block breakdown (collapsible)
│
├── /area/{area_slug}               SUB-NEIGHBORHOOD PAGE
│   ├── [inline] Area map
│   ├── [inline] Stat cards
│   └── [inline] Boundary note
│
├── /overview                       WEST ROXBURY OVERVIEW
│   ├── [inline] Full map
│   ├── [inline] District distribution table
│   ├── [inline] Aggregate stat cards
│   ├── [inline] Building character distribution
│   ├── [inline] Browse by sub-neighborhood
│   └── [inline] Browse by street (A-Z)
│
├── /map                            BROWSE MAP (full-screen interactive)
│   └── [popup]  Parcel quick-view
│
├── /meetings                       MEETINGS & DEADLINES
│
├── /faq                            FAQ (general proposal questions)
│
├── /about                          ABOUT / HOW THIS WORKS
│
├── /sources                        SOURCES & METHODOLOGY
│
├── /privacy                        PRIVACY POLICY
│
└── /feedback?property={GIS_ID}     FEEDBACK FLOW (modal with URL)

[global] Nav bar (logo, search, Browse Map, FAQ, Meetings, About, Sources)
[global] Footer (About, Sources, FAQ, View on GitHub, authorship, open-source notice)
[panel]  Guided Q&A (property-aware FAQ + category browse, on Property page)
[modal]  Feedback flow (triggered from property page, has /feedback URL)
[modal]  Data Correction form (triggered from property page + About)
[404]    Address not found / error states
```

---

## USER FLOWS

### Flow 1: Address Lookup (primary)

```
Homepage → [enter address] → Property Page
  → (optional) Explore Your Block → Block Page
    → (optional) View Street → Street Page
      → (optional) View Sub-neighborhood → Sub-neighborhood Page
        → (optional) View West Roxbury → Overview
```

This is a **zoom-out** path: property → block → street → area → neighborhood.

### Flow 2: Browse Map

```
Homepage → [click "Browse West Roxbury"] → Map Page
  → [click any parcel] → popup → [click "View full analysis"] → Property Page
```

### Flow 3: Direct Share

```
Shared URL → Property Page (or Block/Street/Area/Overview)
  → [enter different address] → Property Page
```

### Flow 4: Meetings

```
Homepage → [click meeting module] → Meetings Page
   — or —
Nav bar → Meetings → Meetings Page
```

### Flow 5: Feedback

```
Property Page → [click "Share your thoughts"] → Feedback Flow
  → Step 1: Category reactions
  → Step 2: Template-based draft review
  → Step 3: Handoff to City's feedback form (external)
```

### Flow 6: Learn / Trust

```
Any page → Nav → FAQ
Any page → Nav → About
Any page → Nav → Sources & Methodology
Property Page → [click "Sources for this property"] → Sources
FAQ → [CTA at bottom] → Address search → Property Page
```

---

## PAGE INVENTORY & CLASSIFICATION

| #   | Page              | Type                  | Has its own URL? | Core or support? | Unique content?                      |
| --- | ----------------- | --------------------- | ---------------- | ---------------- | ------------------------------------ |
| 1   | Homepage          | Page                  | `/`              | Core             | Yes — search, meeting preview        |
| 2   | Property          | Page                  | `/property/{id}` | Core             | Yes — the heart of the product       |
| 3   | Block             | Page                  | `/block/{id}`    | Core             | Yes — aggregated stats               |
| 4   | Street            | Page                  | `/street/{slug}` | Core             | Yes — wider aggregation              |
| 5   | Sub-neighborhood  | Page                  | `/area/{slug}`   | Core             | Yes — area-level stats               |
| 6   | Overview          | Page                  | `/overview`      | Core             | Yes — WR-wide stats + browsing       |
| 7   | Browse Map        | Page                  | `/map`           | Core             | Yes — full interactive map           |
| 8   | Meetings          | Page                  | `/meetings`      | Support          | Yes — meeting list                   |
| 9   | FAQ               | Page                  | `/faq`           | Support          | Yes — general proposal Q&A           |
| 10  | About             | Page                  | `/about`         | Support          | Yes — positioning, limitations       |
| 11  | Sources           | Page                  | `/sources`       | Support          | Yes — methodology                    |
| 12  | Privacy Policy    | Page                  | `/privacy`       | Support          | Yes — plain-language data practices  |
| 13  | Feedback          | Modal (with URL)      | `/feedback`      | Support          | Yes — reaction + draft flow          |
| 14  | Guided Q&A        | Panel (Property page) | No               | Core             | Property-aware FAQ + category browse |
| 15  | Data Correction   | Modal                 | No               | Support          | Correction form                      |
| 16  | Error / Not Found | State                 | No               | Support          | Error messages                       |

**12 standalone pages + 1 modal with URL + 1 panel + 1 modal + error states = the full product.**

---

## SHARED COMPONENTS (appear on multiple pages)

| Component              | Used on                                        | Notes                                                                  |
| ---------------------- | ---------------------------------------------- | ---------------------------------------------------------------------- |
| **Nav bar**            | All pages                                      | Logo, address search (mini), Browse Map, FAQ, Meetings, About, Sources |
| **Footer**             | All pages                                      | About link, Sources link, independence disclaimer                      |
| **Guided Q&A panel**   | Property page                                  | Property-aware FAQ + category menu; pre-generated answers              |
| **Address search**     | Homepage (hero), Nav bar (mini), Map page      | Autocomplete from parcel addresses                                     |
| **Stat card**          | Block, Street, Sub-neighborhood, Overview      | Metric name, median, range, proposed value                             |
| **Parcel map**         | Block, Street, Sub-neighborhood, Overview, Map | Parcels colored by proposed district                                   |
| **District badge**     | Property header, stat cards, map legend        | RD-2 / RD-3 / RD-4 / RD-6 with color                                   |
| **Tooltip**            | Property table, stat cards, any metric label   | Plain-English definition from glossary                                 |
| **Property list row**  | Block page, Street page                        | Address, district, units, height, type                                 |
| **Reassurance banner** | Property page only                             | "Your existing home can remain as it is"                               |
| **Source citation**    | Property page, Sources page                    | Dataset name, date checked                                             |
| **Meeting card**       | Homepage (preview), Meetings page              | Date, title, link, recording                                           |

---

## AGGREGATE VIEW PATTERN (Block / Street / Sub-neighborhood / Overview)

These four pages share the same structural pattern:

```
┌─ Header (scope name, property count, district(s)) ──────┐
│                                                          │
├─ Map (scope-appropriate zoom) ───────────────────────────┤
│                                                          │
├─ Stat cards grid ────────────────────────────────────────┤
│  Today's Reality (median + range) vs Proposed Law        │
│  Metrics: height, units, lot coverage, permeable area,   │
│           floor plate, front/side/rear setback,          │
│           parking, roof pitch                            │
│                                                          │
├─ Character & Roof distribution ──────────────────────────┤
│                                                          │
├─ Property/Block list ────────────────────────────────────┤
│  (Block shows properties; Street/Area show blocks)       │
│                                                          │
├─ Navigation breadcrumbs ─────────────────────────────────┤
│  [Zoom in: block → property]                             │
│  [Zoom out: block → street → area → overview]            │
└──────────────────────────────────────────────────────────┘
```

**Differences by scope:**

|                           | Block                 | Street                | Sub-neighborhood     | Overview                     |
| ------------------------- | --------------------- | --------------------- | -------------------- | ---------------------------- |
| **Map zoom**              | Block-level           | Street-length         | Area boundary        | Full WR                      |
| **Multi-district?**       | Rarely                | Sometimes             | Often                | Always                       |
| **List shows**            | Individual properties | Blocks on this street | Streets in this area | Sub-neighborhoods            |
| **Boundary note**         | No                    | No                    | Yes (if unofficial)  | No                           |
| **District distribution** | No (usually uniform)  | If mixed              | Yes                  | Yes (table)                  |
| **Browse-by**             | —                     | —                     | —                    | Sub-neighborhood, Street A-Z |

---

## CALCS THAT LIVE ON EACH PAGE

| Page                 | Calculations performed                                                                                                                                                                                                                            | Data required                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| **Homepage**         | None (static + meeting data)                                                                                                                                                                                                                      | PostgreSQL `meetings` table via API  |
| **Property**         | Spatial join, assessor join, lot-tier, table selection, all metric comparisons, nonconformity detection, property summary generation, confidence scoring, permeable area calc, setback estimation, roof pitch estimation, easement bonus modeling | All datasets                         |
| **Block**            | Block definition (street segment algorithm), block aggregation (median/range per metric), character distribution, roof distribution                                                                                                               | Parcels + assessor for block members |
| **Street**           | Same as Block but scoped to full street; district distribution if multi-district                                                                                                                                                                  | Same                                 |
| **Sub-neighborhood** | Same as Block but scoped to area boundary; boundary lookup                                                                                                                                                                                        | Same + area boundaries               |
| **Overview**         | Same aggregation at WR level; district distribution (parcel counts per RD-*); full character distribution                                                                                                                                         | All parcels                          |
| **Map**              | Spatial join for coloring; parcel popup (address, district, height, units)                                                                                                                                                                        | Parcels + proposed districts         |
| **Meetings**         | None (manually maintained)                                                                                                                                                                                                                        | PostgreSQL `meetings` table via API  |
| **FAQ**              | None (static)                                                                                                                                                                                                                                     | —                                    |
| **About**            | None (static)                                                                                                                                                                                                                                     | —                                    |
| **Sources**          | None (static reference)                                                                                                                                                                                                                           | —                                    |
| **Feedback**         | Identify which categories actually changed for the property (reuses property summary)                                                                                                                                                             | Property-level calc results          |
| **Guided Q&A**       | Pre-generate answers for property-relevant questions from data + legal text. No LLM at runtime.                                                                                                                                                   | Parcel data + Article 20 rules       |

---

## PROPOSED FILE SPLIT

Spec files (split complete):

```
bellevue-housing-change/
├── ia.md                          ← this file (sitemap, flows, shared components)
├── design-reference.md            ← already exists
├── spec/
│   ├── 00-product-vision.md       ← sections 1-6 (vision, positioning, principles, scope, user, hierarchy)
│   ├── 01-homepage.md             ← section 7 + A1
│   ├── 02-property-page.md        ← sections 8-17 + A2 (the big one)
│   ├── 03-aggregate-views.md      ← sections 20-21 + A3/A4/A5/A6 (shared pattern)
│   ├── 04-browse-map.md           ← section 22 + A8
│   ├── 05-guided-qa.md            ← property-page Q&A panel (rewritten from chat to guided Q&A)
│   ├── 05b-faq.md                 ← standalone FAQ page (/faq)
│   ├── 06-feedback.md             ← section 25 + A7
│   ├── 07-meetings.md             ← section 26 + A9
│   ├── 08-about-sources.md        ← sections 27-28 + A10/A11
│   ├── 09-shared-components.md    ← nav, footer, tooltips, error states, data correction (sections 29-30, A13-A14, Appendix D)
│   ├── 10-data-and-calcs.md       ← sections 11-12, Appendix B (all computation logic)
│   ├── 11-internal-only.md        ← sections 14, 23, 33 (nonconformity, roof analysis, analytics, impact scoring)
│   ├── 12-planning-flags.md       ← section 34 (discussion flags for Boston Planning)
│   └── 13-qa-release.md           ← sections 35-38 (QA gates, V1 vs later, build checklist, open questions)
├── data/                          ← already exists (GeoJSON, CSV)
└── Neighborhood-Housing-Draft-Legal-Text_071626.pdf
```

---

## IA DECISIONS (RESOLVED)

1. **Feedback: modal with URL.** Modal overlay triggered from property page. Has a `/feedback` URL so it's shareable/linkable (e.g., someone sends a neighbor the link). Property context passed via query param.

2. **Data Correction: modal only.** Triggered from property page and About page. No standalone URL — corrections are always about a specific property.

3. **Chat → Guided Q&A (not free-form chat).** No AI chatbot. Instead: a **property-aware FAQ + category menu**. The system surfaces relevant questions based on the property's actual data (e.g., "Could I add a story?" only appears if the height delta is material). Users can also browse by category (units, height, setbacks, parking, ADUs, etc.). Answers are pre-generated from the data and legal text — no LLM at runtime. This is more reliable, more appropriate for a civic tool, and simpler to build. Presented as an expandable Q&A panel or drawer, not a chat interface.

4. **Sub-neighborhoods: finalized.** 6 areas covering 99% of parcels: Bellevue Hill (1,177), Centre Street Village (1,659), LaGrange (1,845), The Parkway (2,088), Holy Name (2,601), Spring St/Baker (121). No official city source exists — based on locally recognized community geography. Clearly labeled as unofficial.

5. **Street segmentation: auto-segment if multi-district.** Streets that span multiple proposed districts get segmented at the district boundary. Label clearly: "Centre Street — RD-2 section (between X and Y)." Single-district streets stay whole.

6. **Overview + Map: keep both.** `/overview` is a dashboard (stats + browsing by area/street). `/map` is full-screen spatial exploration. Different user intents, both earned.

7. **Map library: Mapbox GL JS.** API key secured. Use for all map instances — full-screen Browse Map, Block/Street/Sub-neighborhood/Overview maps, and Property page block preview. GeoJSON parcels rendered as vector layers with district-based fill colors.
