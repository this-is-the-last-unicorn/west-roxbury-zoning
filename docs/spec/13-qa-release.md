# QA, Release Gates & Roadmap

---

## QA / Release Gates

**DO NOT PUBLISH** until:

1. Every dimensional rule in the four-column table has been verified against the July 2026 draft legal text — **this is now substantially complete** (Tables B, C, D verified)
2. The automated QA suite passes for all 9,569 West Roxbury parcels
3. Spatial join of parcels to proposed subdistricts has been validated
4. Setback methodology reviewed (GIS estimates, not surveys)
5. Roof-pitch calculations validated against known roof forms
6. Nonconformity rules from Section 20-5 correctly implemented
7. Table B vs Table C vs Table D selection logic verified
8. Lot-size tier logic verified (≤3800 / 3800–6899 / ≥6900)
9. Easement bonus (Section 20-6) correctly modeled
10. Assessor → parcel join validated (GIS_ID matching)
11. All duplicate-address issues resolved
12. Parking elimination correctly surfaced

---

## Required Computations (Build Checklist)

Each item references its formula in [10-data-and-calcs.md](10-data-and-calcs.md).

| #   | Computation                                                                             | Formula                                  | Status                                                                      |
| --- | --------------------------------------------------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------- |
| 1   | Spatial join: Parcels → Proposed Zoning Subdistricts                                    | B1                                       | Pseudocode ready                                                            |
| 2   | Assessor join: Parcels → Assessor FY2026 by `GIS_ID`                                    | B2                                       | Pseudocode ready                                                            |
| 3   | Lot-size tier: ≤3,800 / >3,800–6,899 / ≥6,900 sf                                        | B3                                       | Pseudocode ready                                                            |
| 4   | Table selection: B vs C (requires building existence + yr_built)                        | B4                                       | Pseudocode ready; decision tree finalized                                   |
| 5   | Lot coverage lookup (tiered by lot size)                                                | B5                                       | Pseudocode ready                                                            |
| 6   | Setback estimation from GIS geometry                                                    | B6                                       | Pseudocode ready                                                            |
| 7   | Roof pitch estimation (Gable roofs only)                                                | B7                                       | Pseudocode ready                                                            |
| 8   | Nonconformity detection (units, height, lot coverage, floor plate, setbacks, permeable) | B8                                       | Pseudocode ready                                                            |
| 9   | Property summary generation (incl. becomes-conforming)                                  | B9                                       | Pseudocode ready                                                            |
| 10  | Block aggregation (medians, ranges, character distribution)                             | B10                                      | Pseudocode ready                                                            |
| 11  | Current zoning lookup (Today's Law)                                                     | B11                                      | Pseudocode ready; expanded to 5 districts + non-residential gate            |
| 12  | Proposed zoning full lookup                                                             | B12                                      | Pseudocode ready                                                            |
| 13  | Potential Outcome Engine (full 4th-column computation)                                  | B13                                      | Pseudocode ready                                                            |
| 14  | Confidence scoring per metric                                                           | B14                                      | Pseudocode ready                                                            |
| 15  | Block definition (street segment algorithm)                                             | B15                                      | Pseudocode ready; edge cases resolved (dead ends, cul-de-sacs, thin blocks) |
| 16  | Permeable area calculation                                                              | B16                                      | Pseudocode ready                                                            |
| 17  | Impact scoring (internal only, 1–5)                                                     | B17                                      | Pseudocode ready                                                            |
| 18  | Easement bonus outcome computation                                                      | B18                                      | Pseudocode ready                                                            |
| 19  | Stories inference (from assessor + height)                                              | B19                                      | Pseudocode ready                                                            |
| 20  | Roof distribution + district distribution + lot-size variation                          | B20                                      | Pseudocode ready                                                            |
| 21  | Nonconformity-constrained vertical extension (Section 20-5)                             | B21                                      | Pseudocode ready                                                            |
| 22  | Guided Q&A generation (template-based per parcel)                                       | _See [05-guided-qa.md](05-guided-qa.md)_ | Template structure ready                                                    |

### Data dependencies — status

| Data                           | Needed by       | Status                                                                                                                                                                                                                                                   |
| ------------------------------ | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Street network / intersections | B15             | **Downloaded.** `roads_west_roxbury.geojson` — 3,667 segments from MassGIS. ~78% have from/to cross-street names.                                                                                                                                        |
| Sub-neighborhood boundaries    | Aggregate views | **Generated.** `sub_neighborhoods.geojson` — 6 areas, 99% parcel coverage: Bellevue Hill (1,177), Centre Street Village (1,659), LaGrange (1,845), The Parkway (2,088), Holy Name (2,601), Spring St/Baker (121). Spot-check recommended before publish. |
| Lot frontage values            | B18             | **Not available in assessor CSV.** Must derive from parcel geometry (shortest edge facing street). Implement in pipeline.                                                                                                                                |

---

## Deployment & Infrastructure

| Component           | Provider                            | Notes                                                                          |
| ------------------- | ----------------------------------- | ------------------------------------------------------------------------------ |
| **Code repository** | GitHub (public)                     | `github.com/this-is-the-last-unicorn/west-roxbury-zoning` — MIT license        |
| **Domain**          | `westroxburyzoning.org`             | Cloudflare DNS + CDN + DDoS protection                                         |
| **Hosting**         | Render                              | Web service + PostgreSQL                                                       |
| **Database**        | PostgreSQL on Render (with PostGIS) | All pre-computed results, corrections, feedback, meetings                      |
| **Maps**            | Mapbox GL JS                        | API key required (low cost at this scale)                                      |
| **Analytics**       | Umami (self-hosted on Render)       | Open source, no cookies, no personal data. Tracks page views + referrers only. |

### Frontend Stack (from starter-kit)

| Layer             | Technology                         | Notes                                                       |
| ----------------- | ---------------------------------- | ----------------------------------------------------------- |
| **Runtime**       | Bun                                | Package manager + runtime                                   |
| **Monorepo**      | Turborepo                          | `apps/web` (frontend), `apps/api` (backend)                 |
| **Frontend**      | Next.js 16 (App Router) + React 19 | SSR, routing, static generation                             |
| **Styling**       | Tailwind CSS 4                     | Utility-first, matches design reference                     |
| **Components**    | Radix UI / shadcn                  | Accessible primitives (dialog, tooltip, tabs, select, etc.) |
| **Data fetching** | TanStack React Query               | Client-side caching for API calls                           |
| **ORM**           | Prisma 7                           | PostgreSQL schema management and queries                    |
| **API**           | Express (in `apps/api`)            | Thin REST endpoints over PostgreSQL                         |
| **Type system**   | TypeScript                         | Strict mode across all packages                             |

The site should display its own infrastructure in the About page and footer. This is a transparency feature: anyone can see how the site is built and hosted, and verify that no data is being collected.

---

## Architecture

### Data pipeline (offline, Python)

Runs locally or in CI. Reads raw data files, executes all B1–B21 formulas, writes results to PostgreSQL.

```
Raw data (GeoJSON + CSV + legal text rules)
  │
  ├─ B1: Spatial join (parcels → proposed districts)
  ├─ B2: Assessor join (GIS_ID matching)
  ├─ B3–B4: Lot tier + table selection
  ├─ B5–B8: Metric computations + nonconformity detection
  ├─ B9: Property summary generation
  ├─ B10, B15, B20: Block definition + aggregation + distributions
  ├─ B11–B13: Zoning lookups + Potential Outcome Engine
  ├─ B14: Confidence scoring
  ├─ B16–B21: Remaining computations
  │
  └─→ PostgreSQL (PostGIS)
       ├─ parcels (geometry, raw fields, proposed district, lot tier, table)
       ├─ parcel_results (pre-computed comparison table, summary, Q&A, outcomes)
       ├─ block_stats (pre-computed aggregates per block)
       ├─ street_stats (pre-computed aggregates per street)
       ├─ area_stats (pre-computed aggregates per sub-neighborhood)
       └─ overview_stats (pre-computed WR-wide aggregates)
```

Re-run the pipeline whenever source data updates (new assessor data, updated GIS layers, revised legal text). The pipeline is idempotent — it overwrites all computed results.

### What lives where

| Data                           | Storage                                 | Served how                        | Why                                                                          |
| ------------------------------ | --------------------------------------- | --------------------------------- | ---------------------------------------------------------------------------- |
| Pre-computed property results  | PostgreSQL                              | API: `GET /api/property/{GIS_ID}` | One source of truth, single-row keyed lookup                                 |
| Address search / autocomplete  | PostgreSQL                              | API: `GET /api/search?q=...`      | Indexed text search, fast                                                    |
| Block/Street/Area aggregates   | PostgreSQL                              | API: `GET /api/block/{id}`, etc.  | Pre-computed, keyed lookup                                                   |
| Overview (WR-wide stats)       | PostgreSQL                              | API: `GET /api/overview`          | Single cached response                                                       |
| Map parcel polygons            | Static GeoJSON or Mapbox vector tileset | Mapbox GL JS loads directly       | Don't route 9,569 polygons through the API — Mapbox handles this client-side |
| Map parcel coloring (district) | Baked into GeoJSON properties           | Mapbox data-driven styling        | District is a property on each feature                                       |
| Q&A answers (per parcel)       | PostgreSQL                              | Returned with property results    | Pre-generated, served as part of property payload                            |
| Corrections (user submissions) | PostgreSQL                              | API: `POST /api/corrections`      | Write operation, needs server storage                                        |
| Feedback / sentiment reactions | PostgreSQL                              | API: `POST /api/feedback`         | Write operation, needs server storage                                        |
| Meetings                       | PostgreSQL                              | API: `GET /api/meetings`          | Easier to maintain than JSON files                                           |

### API surface (thin layer over PostgreSQL)

| Endpoint                  | Method | Purpose                                                                         |
| ------------------------- | ------ | ------------------------------------------------------------------------------- |
| `/api/property/{GIS_ID}`  | GET    | Full property results (comparison table, summary, Q&A, nonconformity, outcomes) |
| `/api/search?q={address}` | GET    | Address autocomplete (returns matching addresses + GIS_IDs)                     |
| `/api/block/{block_id}`   | GET    | Block aggregate stats + property list with change deltas                        |
| `/api/street/{slug}`      | GET    | Street aggregate stats + block list                                             |
| `/api/area/{slug}`        | GET    | Sub-neighborhood stats                                                          |
| `/api/overview`           | GET    | WR-wide stats, district distribution                                            |
| `/api/meetings`           | GET    | Upcoming + past meetings                                                        |
| `/api/corrections`        | POST   | Submit a data correction (anonymous by default)                                 |
| `/api/feedback`           | POST   | Submit category reactions + optional free text                                  |

All GET endpoints return JSON. All reads are simple keyed lookups against pre-computed data — no computation at request time. The API is a thin passthrough to PostgreSQL.

### Rate limiting

Basic rate limiting to prevent abuse. KISS — fix later if actually getting spammed.

| Endpoint type           | Limit   | Window            | Implementation                         |
| ----------------------- | ------- | ----------------- | -------------------------------------- |
| GET (all reads)         | 100 req | per minute per IP | In-memory counter (Express middleware) |
| POST `/api/corrections` | 5 req   | per hour per IP   | In-memory counter                      |
| POST `/api/feedback`    | 10 req  | per hour per IP   | In-memory counter                      |

Use `express-rate-limit` (or similar lightweight middleware). No Redis needed at this scale — in-memory is fine for a single Render instance. If the app restarts, rate limit state resets — acceptable.

Response on limit exceeded: `429 Too Many Requests` with body `{"error": "Too many requests. Please try again later."}`

### Database schema (key tables)

```sql
-- Core parcel data + pre-computed results
CREATE TABLE parcels (
    gis_id          TEXT PRIMARY KEY,
    address         TEXT NOT NULL,
    st_num          TEXT,
    st_name         TEXT,
    proposed_district TEXT,
    lot_size_sf     NUMERIC,
    lot_tier        TEXT,  -- small/medium/large
    applicable_table TEXT, -- B/C
    geometry        GEOMETRY(MultiPolygon, 4326)
);

CREATE TABLE parcel_results (
    gis_id          TEXT PRIMARY KEY REFERENCES parcels(gis_id),
    summary         JSONB,   -- property summary (3-4 material changes)
    comparison      JSONB,   -- full 4-column table data
    outcomes        JSONB,   -- potential outcome per metric
    nonconformity   JSONB,   -- flags from B8
    confidence      JSONB,   -- per-metric confidence scores
    qa_answers      JSONB,   -- pre-generated Guided Q&A
    easement_bonus  JSONB,   -- B18 easement scenario
    stories         JSONB,   -- B19 stories inference
    block_id        TEXT,
    pipeline_version TEXT,
    computed_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Pre-computed aggregates
CREATE TABLE block_stats (
    block_id        TEXT PRIMARY KEY,
    street          TEXT,
    bounds_label    TEXT,  -- "Between Oak St and Elm St"
    parcel_count    INT,
    districts       TEXT[],
    stats           JSONB,   -- median/range per metric
    character_dist  JSONB,   -- building type distribution
    roof_dist       JSONB,   -- roof structure distribution
    lot_variation   JSONB,   -- lot-size tier variation detection
    property_list   JSONB    -- address, district, unit delta, height delta per parcel
);

CREATE TABLE street_stats (
    slug            TEXT PRIMARY KEY,
    street_name     TEXT,
    parcel_count    INT,
    districts       TEXT[],
    stats           JSONB,
    block_ids       TEXT[]
);

CREATE TABLE area_stats (
    slug            TEXT PRIMARY KEY,
    area_name       TEXT,
    parcel_count    INT,
    districts       TEXT[],
    stats           JSONB,
    boundary        GEOMETRY(Polygon, 4326)
);

-- User-submitted data
CREATE TABLE corrections (
    id              SERIAL PRIMARY KEY,
    gis_id          TEXT REFERENCES parcels(gis_id),
    description     TEXT NOT NULL,
    contact_email   TEXT,          -- optional
    status          TEXT DEFAULT 'pending',  -- pending/reviewed/applied/dismissed
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE feedback (
    id              SERIAL PRIMARY KEY,
    gis_id          TEXT REFERENCES parcels(gis_id),
    reactions       JSONB,         -- {height: "concerned", units: "support", ...}
    free_text       TEXT,
    session_id      TEXT,          -- lightweight duplicate protection
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE meetings (
    id              SERIAL PRIMARY KEY,
    date            DATE NOT NULL,
    title           TEXT NOT NULL,
    time            TEXT,
    location        TEXT,
    city_url        TEXT,
    recording_url   TEXT,
    materials_url   TEXT,
    is_past         BOOLEAN DEFAULT FALSE
);

-- Indexes
CREATE INDEX idx_parcels_address ON parcels USING gin (address gin_trgm_ops);
CREATE INDEX idx_parcels_st_name ON parcels (st_name);
CREATE INDEX idx_parcels_geometry ON parcels USING gist (geometry);
CREATE INDEX idx_parcel_results_block ON parcel_results (block_id);
CREATE INDEX idx_corrections_status ON corrections (status);
CREATE INDEX idx_meetings_date ON meetings (date);
```

### Map data strategy

Parcel polygons for Mapbox GL JS should NOT come from the API. Two options:

1. **Static GeoJSON** (simpler for V1): Serve `parcels_west_roxbury.geojson` as a static file. Mapbox loads it once, renders all 9,569 parcels client-side. Add `proposed_district` as a property on each feature for data-driven fill coloring. File size: ~5-10 MB, acceptable with Cloudflare CDN caching.

2. **Mapbox vector tileset** (better performance, later): Upload the GeoJSON to Mapbox Studio as a tileset. Mapbox serves pre-rendered vector tiles — faster initial load, better zoom performance. Worth doing if static GeoJSON feels sluggish.

V1 recommendation: start with static GeoJSON. Upgrade to tileset if needed.

### Build order

1. **Database + pipeline** — set up PostgreSQL on Render, run the Python data pipeline, populate all tables
2. **API layer** — thin endpoints over the DB
3. **Property page** — the core experience (calls `/api/property/{GIS_ID}`)
4. **Homepage + search** — address autocomplete (calls `/api/search`)
5. **Aggregate views** — block/street/area/overview (calls respective endpoints)
6. **Map page** — Mapbox GL JS + static GeoJSON + parcel click → property page
7. **Support pages** — FAQ, About, Sources, Meetings (mostly static, meetings from API)
8. **Feedback + corrections** — POST endpoints + forms

---

## V1 Features

- Address search → property analysis (4-column table with verified Article 20 dimensional rules)
- Property summary (3–4 most material changes)
- Grandfathering/existing-condition communication
- Table B / Table C / Table D selection per property
- Lot-size tier determination
- Easement bonus scenario (secondary display)
- Nonconformity analysis (Section 20-5 rules)
- Parking elimination messaging
- Block / Street / Sub-neighborhood / West Roxbury aggregate views
- Proposed-zoning map with clickable parcels (Mapbox GL JS)
- Roof pitch as analytical metric (where high confidence)
- Building character from assessor data
- Roof pitch + character in aggregate views
- Guided Q&A (property-aware FAQ + category menu, pre-generated)
- FAQ page (general, static)
- Data corrections (text-only, anonymous)
- Feedback builder → Boston Planning official process
- Internal sentiment collection
- Meetings & Deadlines
- Past meeting recordings/materials
- Sources & Methodology (with links to all data sources)
- About / How This Works (with authorship, open-source info)
- Public GitHub repo link in footer + About page
- Tooltips (including "Sloped Roof Story" with explanation that the term is undefined)
- Shareable URLs
- Mobile-first
- WCAG accessibility
- No login
- English only

## Later Features

- Lot diagram / visual (existing footprint vs. maximum buildable envelope)
- Photo/document upload for corrections
- Public aggregate sentiment display
- Proposal version comparison ("what changed since last draft")
- Multi-language support
- Downloadable property report/PDF
- Expanded geography (Jamaica Plain, Roslindale, Hyde Park)
- Conditional use (Table D) scenario modeling
- Economic constraint layer (if ever appropriate)
- Other communities forking the repo for their own zoning analysis

---

## Open Implementation Questions

_None remaining — all resolved. See below._

### Resolved

- **Block definition edge cases:** 40% of road segments lack cross-street names. Rules: (1) If a street has no intersections in the road data, the entire street is one block. (2) Dead-end/cul-de-sac streets: treat the dead end as a virtual boundary — the block runs from the nearest intersection to the end. (3) If a block has < 5 properties, expand to the adjacent segment and label: "Example Street (near Oak Street) — expanded view, 8 properties." (4) If cross-street names are missing from the road data, use the road segment geometry to identify intersection points and label as "between [nearest named cross-street] and [end of street]." _(See [10-data-and-calcs.md](10-data-and-calcs.md) B15)_
- **Pre-2027 building determination:** Use assessor `YR_BUILT` as primary signal. Decision tree: (1) `YR_BUILT` exists and < 2027 → Table C. (2) `YR_BUILT` exists and ≥ 2027 → Table B. (3) `YR_BUILT` is null but building footprint > 0 → assume pre-2027, use Table C (conservative for homeowner — Table C is more permissive). (4) No building footprint → vacant lot, Table B. This is a zoning analysis tool, not a legal determination — note in the tooltip that the table selection is based on assessor records and should be verified for legal purposes. _(See [10-data-and-calcs.md](10-data-and-calcs.md) B4)_
- **Sloped Roof Story tooltip wording:** Use this exact copy: _"The proposed zoning requires the third story in RD-2 and RD-3 districts to be a 'Sloped Roof Story.' The July 2026 draft text does not define this term — it establishes no minimum roof pitch and no limit on dormer size. Additionally, this requirement can be waived entirely by recording a 5-foot sidewalk easement (Section 20-6)."_ This is factual, cites the source, and states what the draft does NOT say — which is the relevant finding. _(See [09-shared-components.md](09-shared-components.md) tooltip glossary)_
- **Existing analytical pipeline:** Rebuild clean from the spec. The 21 B-formulas in `10-data-and-calcs.md` ARE the pipeline design. No legacy code to retain — the spec supersedes any prior analysis. The pipeline reads raw data, executes B1–B21, and writes results to PostgreSQL.
- **Table D handling:** Table D (conditional use, up to 16 units) requires Board of Appeal approval and is beyond the scope of V1 by-right analysis. If a parcel's `proposed_district` maps to Table D conditions, show: _"This property may be eligible for conditional use under Table D, which allows up to 16 units with Board of Appeal approval. Conditional use scenarios require property-specific review and are not modeled by this tool."_ Table D is a Later Feature for scenario modeling.
- **Non-residential parcels:** 535 WR parcels are in non-residential districts (NS, CC, CPS, OS-CM, CF, LI, etc.). If someone searches an address in one of these zones, show: _"This property is in a [district name] zone. The Neighborhood Housing proposal changes residential zoning districts. This property's zoning is not directly changed by this proposal."_ Do not show the four-column comparison table. Show the map with the parcel highlighted and a link to the City's general zoning information.
- **Condo address resolution:** 1,731 assessor records are condos. Multiple assessor records share one `GIS_ID`. Resolution: (1) Build the address autocomplete from parcel data (`ST_NUM` + `ST_NAME`), not assessor data — parcels already represent unique lots. (2) If a searched address matches an assessor record with `LU_DESC` containing "CONDO", add the condo note banner (Section 1b of property page). (3) "CONDO MAIN" assessor records represent the land/building — use these for building data. "RESIDENTIAL CONDO" records represent individual units — aggregate their data per `GIS_ID` for unit counts.
- **Current zoning completeness:** B11 now includes `1F-8000` (558 parcels), `2F-5000` (45 parcels), and `MFR` (80 parcels) in addition to `1F-6000` and `2F-6000`. Non-residential districts return `None` and trigger the "not affected" message. _(See [10-data-and-calcs.md](10-data-and-calcs.md) B11)_
- **Feedback builder placement:** Modal overlay from property page. _(See [06-feedback.md](06-feedback.md))_
- **Sub-neighborhood boundaries:** 6 areas (Bellevue Hill, Centre Street Village, LaGrange, The Parkway, Holy Name, Spring St/Baker) covering 99% of parcels. No official city source exists — based on locally recognized names. _(See [03-aggregate-views.md](03-aggregate-views.md))_
- **Easement bonus display:** Collapsible, closed by default. _(See [02-property-page.md](02-property-page.md))_
- **Chat approach:** Guided Q&A with pre-generated answers, no LLM. _(See [05-guided-qa.md](05-guided-qa.md))_
- **Map library:** Mapbox GL JS. _(See [04-browse-map.md](04-browse-map.md))_
- **Authorship:** Emily Gamble, prepared by The Last Unicorn, LLC. _(See [08-about-sources.md](08-about-sources.md))_
- **Open source:** Full public GitHub repository — all code, data, formulas, docs. _(See [08-about-sources.md](08-about-sources.md))_
- **Infrastructure:** GitHub (code) + Render (hosting) + Cloudflare (domain) + Mapbox (maps) + Umami (analytics, self-hosted, no cookies). _(See [08-about-sources.md](08-about-sources.md))_
