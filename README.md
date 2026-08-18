# West Roxbury Zoning Analysis

An open-source tool that shows West Roxbury property owners exactly how Boston's proposed zoning changes affect their property. Built by [Emily Gamble](https://westroxburyzoning.org/about), prepared by [The Last Unicorn, LLC](https://lastunicorn.io).

**Live site:** [westroxburyzoning.org](https://westroxburyzoning.org)

## What This Does

Boston's [Neighborhood Housing Zoning Initiative](https://www.bostonplans.org/neighborhood-housing) proposes new residential zoning for West Roxbury, Roslindale, and Hyde Park. This tool lets any property owner:

1. **Look up their address** and see exactly what would change
2. **Compare current vs. proposed rules** side-by-side (height, units, setbacks, parking, etc.)
3. **Browse by street, block, or sub-neighborhood** to see patterns
4. **View an interactive map** of all proposed district assignments

No login, no cookies, no ads. All data is from public government sources. All code is open source.

## Data Sources

Every number on the site traces back to a government data source. If you find an error, [open an issue](https://github.com/the-last-unicorn/west-roxbury-zoning/issues).

| Source                                              | What We Use It For                                                                  | URL                                                                                                                                                                            |
| --------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Boston Planning Dept — Proposed Zoning Polygons** | Assigns each parcel its proposed district (RD-2, RD-3, RD-4, etc.) via spatial join | [gis.bostonplans.org/.../Neighborhood_Housing_Zoning_Subdistricts](https://gis.bostonplans.org/hosting/rest/services/Neighborhood_Housing_Zoning_Subdistricts/FeatureServer/0) |
| **Boston GIS Parcels (2025)**                       | Parcel boundaries, lot area, current zoning district                                | [data.boston.gov/dataset/parcels-2025](https://data.boston.gov/dataset/parcels-2025)                                                                                           |
| **City Assessor Data (FY2026)**                     | Building type, year built, units, roof structure                                    | [data.boston.gov/dataset/property-assessment](https://data.boston.gov/dataset/property-assessment)                                                                             |
| **Draft Zoning Text**                               | Dimensional tables, district definitions, transition rules                          | [bostonplans.org/neighborhood-housing](https://www.bostonplans.org/neighborhood-housing)                                                                                       |
| **Current Zoning Code (Article 56)**                | Current dimensional requirements (Table D)                                          | [codelibrary.amlegal.com](https://codelibrary.amlegal.com/codes/boston/latest/boston_zoning/0-0-0-18508)                                                                       |
| **MassGIS Road Network**                            | Street centerlines for block definitions                                            | [mass.gov/.../massgis-data-massdot-roads](https://www.mass.gov/info-details/massgis-data-massachusetts-department-of-transportation-massdot-roads)                             |
| **Boston Building Footprints**                      | Building footprints, roof elevation                                                 | [data.boston.gov](https://data.boston.gov/dataset/boston-buildings-with-roof-breaks)                                                                                           |

### Critical: How Proposed Districts Are Assigned

> **Previous versions of this codebase used a hardcoded mapping** (`1F-6000 → RD-2`, `1F-8000 → RD-3`, etc.) which was wrong. The city's proposed districts are assigned geographically — the same current district (e.g. `1F-6000`) can map to different proposed districts depending on location.

The correct method is a **spatial join** against the city's official [Neighborhood_Housing_Zoning_Subdistricts](https://gis.bostonplans.org/hosting/rest/services/Neighborhood_Housing_Zoning_Subdistricts/FeatureServer/0) polygon layer. Each parcel's centroid is tested against the city's proposed zoning polygons to determine its proposed district. This is done in the data pipeline (`tools/pipeline/load_data.py`).

**Verification:** 156 Bellevue ST (`GIS_ID: 2002226000`) should be `RD-3`. If it shows anything else, the data pipeline has a bug.

## How the Math Works

The pipeline computes a zoning analysis for each of West Roxbury's ~9,500 parcels. Every calculation is deterministic and auditable.

### Step 1: Data Loading

```
parcels_west_roxbury.geojson  →  Parcel boundaries + current zoning
assessor_fy2026_west_roxbury.csv  →  Building characteristics
proposed_zoning_districts.geojson  →  City's official proposed zoning polygons
```

### Step 2: Proposed District Assignment (Spatial Join)

For each parcel:

1. Compute the parcel polygon's centroid
2. Test which proposed zoning polygon contains that centroid
3. Assign the `Zoning_Subdistrict` field from the matching polygon

This replaces the old hardcoded `DISTRICT_MAP`. The spatial join correctly handles the fact that parcels with the same current district can be assigned to different proposed districts depending on their physical location.

### Step 3: Table Selection (B vs C)

The draft zoning has two sets of rules:

- **Table B**: New construction (built 2027+) or vacant lots
- **Table C**: Pre-existing buildings (built before 2027) — generally more permissive

```python
if no_existing_building → Table B
if yr_built >= 2027     → Table B
else                    → Table C (conservative, favors homeowner)
```

### Step 4: Current Zoning Rules (Article 56, Table D)

| District | Height | Stories | Units | Front | Side (cumul.) | Rear | Lot Coverage | Parking |
| -------- | ------ | ------- | ----- | ----- | ------------- | ---- | ------------ | ------- |
| 1F-6000  | 35'    | 2.5     | 1     | 20'   | 10'           | 30'  | 40%          | 2       |
| 1F-8000  | 35'    | 2.5     | 1     | 20'   | 15'           | 30'  | 35%          | 2       |
| 2F-5000  | 35'    | 2.5     | 2     | 15'   | 10'           | 30'  | 45%          | 2       |
| MFR      | 45'    | 3       | —     | 15'   | 10'           | 30'  | 50%          | 1       |

Source: [Boston Zoning Code, Article 56](https://codelibrary.amlegal.com/codes/boston/latest/boston_zoning/0-0-0-18508)

### Step 5: Proposed Zoning Rules (Draft Text)

| District | Height | Stories | Max Units | Front | Side (cumul.) | Rear | Parking | Permeable |
| -------- | ------ | ------- | --------- | ----- | ------------- | ---- | ------- | --------- |
| RD-2     | 35'    | 3       | 2*        | 12'   | 10'           | 20'  | 0       | 25%       |
| RD-3     | 35'    | 3       | 3         | 12'   | 10'           | 20'  | 0       | 25%       |
| RD-4     | 35'    | 3       | 4         | 12'   | 10'           | 20'  | 0       | 25%       |
| RG-15    | 35'    | 2.5     | 1         | 20'   | 15'           | 30'  | 1       | 30%       |
| RG-50    | 35'    | 3       | 2         | 20'   | 10'           | 20'  | 1       | 25%       |
| MFR      | 35'    | 3       | —         | 20'   | 10'           | 20'  | 0       | 20%       |

*RD-2: pre-2027 buildings (Table C) may have up to 3 units per the Table B footnote.

**Lot coverage varies by lot size** for RD-2/RD-3/RD-4:

- ≤3,800 sf: 45%
- 3,800–6,899 sf: 35%
- ≥6,900 sf: 30%

Source: [Draft Zoning Text](https://www.bostonplans.org/neighborhood-housing)

### Step 6: Summary Generation

For each parcel, the pipeline computes the 3–4 most material changes between current and proposed rules, ranked by magnitude:

```python
# Example for 156 Bellevue ST (1F-6000 → RD-3, Table C):
# 1. Rear setback decreases from 30' to 10'             (magnitude: 20)
# 2. Front setback decreases from 20' to 12'            (magnitude: 8)
# 3. Side yard (cumulative) increases from 10' to 15'   (magnitude: 5)
# 4. Dwelling units increases from 1 to 3               (magnitude: 2)
```

### Step 7: Comparison Table

A row-by-row comparison of 9 metrics (height, stories, units, front/side/rear setback, lot coverage, parking, permeable area) showing current law, proposed law, and direction of change.

### Non-Residential Parcels

Parcels assigned to non-residential proposed districts (NS, CC, CF, LI, NI, OS, OS-CM, OS-P, OS-RC, OS-UW) are excluded from dimensional analysis and show "Not affected by this proposal" on the site.

## Pipeline Validation

The pipeline includes automated validation checks that **fail the build** if any check doesn't pass:

| Check                 | What It Validates                                                                  |
| --------------------- | ---------------------------------------------------------------------------------- |
| Parcel count          | ≥9,000 parcels loaded (catches missing data)                                       |
| Count consistency     | Parcels = Results = GeoJSON features                                               |
| Spatial match rate    | ≥90% of parcels matched to a proposed district                                     |
| No RD-1               | Zero parcels with RD-1 (doesn't exist in city data)                                |
| Spot checks           | Manually verified addresses match expected districts                               |
| District rules        | Every proposed district has rules defined or is classified as non-residential      |
| Valid JSON            | All summary/comparison fields parse as valid JSON                                  |
| Summary completeness  | Residential parcels with known current+proposed districts have non-empty summaries |
| District distribution | RD-3 is the majority district (≥5,000 parcels)                                     |

To add new spot checks, update `SPOT_CHECKS` in `validate_pipeline()` in `tools/pipeline/load_data.py`.

## Tech Stack

| Category      | Technology                                                      |
| ------------- | --------------------------------------------------------------- |
| **Runtime**   | Bun + Node.js                                                   |
| **Monorepo**  | Turborepo                                                       |
| **API**       | Express + TypeScript                                            |
| **Database**  | PostgreSQL + Prisma + pg_trgm (fuzzy search)                    |
| **Frontend**  | Next.js 16 + React 19 + Tailwind CSS 4                          |
| **Maps**      | Mapbox GL JS                                                    |
| **Analytics** | Umami (self-hosted, no cookies)                                 |
| **Secrets**   | Doppler                                                         |
| **Errors**    | [Sentry](https://sentry.io/) (error tracking + performance)     |
| **Security**  | [Aikido](https://www.aikido.dev/) (SAST, SCA, secrets scanning) |
| **Hosting**   | Render (web + API + DB)                                         |
| **Domain**    | Cloudflare (westroxburyzoning.org)                              |
| **Pipeline**  | Python 3 + Shapely + psycopg2                                   |

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (v1.2+)
- [PostgreSQL](https://www.postgresql.org/) (v14+) with the `pg_trgm` extension
- [Python 3](https://www.python.org/) (v3.10+)
- [Doppler](https://www.doppler.com/) (for secrets) — or manually export `DATABASE_URL`

### Setup (from zero to running)

```bash
# 1. Clone and install dependencies
git clone https://github.com/the-last-unicorn/west-roxbury-zoning.git
cd west-roxbury-zoning
bun install

# 2. Install Python dependencies (for the data pipeline)
pip3 install shapely psycopg2-binary

# 3. Create a local database
createdb west_roxbury_zoning_local
psql west_roxbury_zoning_local -c 'CREATE EXTENSION IF NOT EXISTS pg_trgm;'

# 4. Set up secrets (pick one)
doppler setup                               # Option A: Doppler (select west-roxbury-zoning, dev)
export DATABASE_URL="postgresql://localhost:5432/west_roxbury_zoning_local"  # Option B: manual

# 5. Run database migrations
bun run db:migrate                          # with Doppler
# or: DATABASE_URL=... bun --cwd packages/database db:migrate  # without Doppler

# 6. Download all raw data from public government APIs (~2 min)
bun run data:download

# 7. Run the data pipeline (loads data into PostgreSQL + generates map GeoJSON)
bun run data:pipeline                       # with Doppler
# or: DATABASE_URL=... python3 tools/pipeline/load_data.py  # without Doppler

# 8. Start the dev server
bun run dev
```

The site will be at http://localhost:3000 and the API at http://localhost:3001.

### Getting the Data

All raw data comes from public government APIs. The files are gitignored (too large for standard git) but can be downloaded in one command:

```bash
bun run data:download      # Downloads all 3 required files (~2 min)
```

This fetches:

| File                                | Source                       | Size   |
| ----------------------------------- | ---------------------------- | ------ |
| `parcels_west_roxbury.geojson`      | Boston GIS (ArcGIS REST API) | ~40 MB |
| `assessor_fy2026_west_roxbury.csv`  | data.boston.gov              | ~8 MB  |
| `proposed_zoning_districts.geojson` | City Planning GIS            | ~2 MB  |

The script `scripts/download-data.sh` handles pagination, filtering, and merging automatically. Run it again any time the city updates their data.

A fourth file, `data/sub_neighborhoods.geojson`, is hand-curated and already tracked in git — no download needed.

### Development Commands

```bash
# Dev
bun run dev              # Start web + API
bun run dev:web          # Frontend only
bun run dev:api          # API only

# Data
bun run data:download    # Download raw data from government APIs
bun run data:pipeline    # Run the analysis pipeline (loads DB + generates GeoJSON)

# Database
bun run db:generate      # Generate Prisma client
bun run db:migrate       # Run migrations
bun run db:studio        # Open Prisma Studio

# Quality
bun run check            # Run ALL checks (lint + typecheck + format)
bun run lint             # ESLint (web + API)
bun run typecheck        # TypeScript type-checking
bun run format           # Auto-format with Prettier
bun run format:check     # Check formatting without writing
bun test                 # Run unit tests (149 tests)

# Build
bun run build            # Build all apps
```

### TypeScript + ESLint Setup

This project uses **TypeScript 7** for fast CLI type-checking and **TypeScript 5.9** for ESLint compatibility (typescript-eslint [does not yet support TS 7](https://github.com/typescript-eslint/typescript-eslint/issues/12518); support is expected with TS 7.1 in Autumn 2026).

- `typescript` (5.9.3) — used by ESLint and workspace tooling
- `@typescript/native` (7.0.2, aliased from `npm:typescript@7.0.2`) — provides the `tsc` binary at root

Both are installed automatically via `bun install`. Contributors don't need to manage this manually.

### Re-running the Data Pipeline

If the city updates their proposed zoning data, or if you need to recompute:

```bash
bun run data:download    # Re-download all raw data
bun run data:pipeline    # Re-run pipeline (truncates + reloads, runs validation)

# Verify:
# - Terminal shows "All validation checks passed"
# - 156 Bellevue ST shows RD-3
# - District distribution looks reasonable
```

## Project Structure

```
west-roxbury-zoning/
├── apps/
│   ├── web/               # Next.js frontend (port 3000)
│   │   ├── public/
│   │   │   └── parcels.geojson   # Map data (generated by pipeline)
│   │   └── src/
│   │       ├── app/       # Pages (property, map, street, block, etc.)
│   │       └── components/  # Nav, Footer, MapView, AddressSearch
│   └── api/               # Express API (port 3001)
│       └── src/
│           └── routes/    # property, search, block, street, area, etc.
├── packages/
│   └── database/          # Prisma schema & client
│       └── prisma/
│           ├── schema.prisma
│           └── migrations/
├── tools/
│   └── pipeline/
│       └── load_data.py   # Data pipeline (THE source of truth for all math)
├── scripts/
│   └── download-data.sh   # Downloads all raw data from government APIs
├── tests/                 # Unit tests (API endpoints, zoning math, data integrity)
├── data/                  # Raw data files (gitignored — use bun run data:download)
│   ├── parcels_west_roxbury.geojson
│   ├── assessor_fy2026_west_roxbury.csv
│   ├── proposed_zoning_districts.geojson
│   └── sub_neighborhoods.geojson  (tracked in git)
├── docs/
│   ├── spec/              # Product specification (per-page)
│   ├── ia.md              # Information architecture
│   └── design-reference.md
└── README.md              # You are here
```

## API Endpoints

| Endpoint                   | Description                                  |
| -------------------------- | -------------------------------------------- |
| `GET /api/property/:gisId` | Full analysis for a single parcel            |
| `GET /api/search?q=...`    | Fuzzy address search (pg_trgm)               |
| `GET /api/block/:blockId`  | Block-level aggregate stats                  |
| `GET /api/street/:slug`    | Street-level aggregate stats + property list |
| `GET /api/area/:slug`      | Sub-neighborhood stats                       |
| `GET /api/overview`        | West Roxbury-wide stats                      |
| `GET /api/meetings`        | Upcoming and past meetings                   |
| `POST /api/corrections`    | Submit a data correction                     |
| `POST /api/feedback`       | Submit general feedback                      |

## Contributing

Contributions are welcome. This is a community tool and we want it to be as accurate and useful as possible.

### Ground Rules

1. **All contributions go through pull requests.** No direct pushes to `main`.
2. **All checks must pass before merge.** Run `bun run check && bun test` locally — if it's not green, it won't be merged.
3. **PRs need a clear description.** Explain what you changed, why, and how you tested it. Screenshots are helpful for UI changes.
4. **One concern per PR.** Don't bundle unrelated changes. A typo fix and a new feature should be separate PRs.
5. **Data accuracy is sacred.** If your change touches zoning math, the data pipeline, or dimensional rules, you must include the source (page number, URL, legal citation) in your PR description.

### Development Workflow

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/west-roxbury-zoning.git
cd west-roxbury-zoning

# 2. Create a branch
git checkout -b your-feature-name

# 3. Install dependencies + download data (first time only)
bun install
pip3 install shapely psycopg2-binary
bun run data:download

# 4. Set up database (first time only)
createdb west_roxbury_zoning_local
psql west_roxbury_zoning_local -c 'CREATE EXTENSION IF NOT EXISTS pg_trgm;'
export DATABASE_URL="postgresql://localhost:5432/west_roxbury_zoning_local"
DATABASE_URL=$DATABASE_URL bun --cwd packages/database db:migrate
DATABASE_URL=$DATABASE_URL python3 tools/pipeline/load_data.py

# 5. Make your changes
bun run dev  # http://localhost:3000

# 6. Verify everything passes
bun run check            # lint + typecheck + format (must be clean)
bun test                 # 149 tests (must all pass)

# 7. Commit and push
git add .
git commit -m "Clear description of what and why"
git push origin your-feature-name

# 8. Open a PR against main
```

### Pre-commit Hooks

Husky + lint-staged runs automatically on every commit:

- **ESLint** on staged `.ts`/`.tsx` files — catches type errors and code quality issues
- **Prettier** on staged files — enforces consistent formatting

If a hook fails, fix the issue before committing. Don't skip hooks with `--no-verify`.

### Code Standards

- **TypeScript** — no `any` types. Use proper interfaces or type assertions with named types.
- **ESLint** — `@typescript-eslint/no-explicit-any` and `no-unused-vars` are errors, not warnings.
- **Prettier** — runs on all `.ts`, `.tsx`, `.json`, `.css`, `.md` files. Don't fight it.
- **No `console.log` in API code** — use `console.warn` or `console.error` only when needed; unused catch errors should be prefixed with `_`.
- **React** — avoid `setState` in effects; use callbacks or refs. All interactive elements need proper ARIA attributes.
- **Comments** — only when the code isn't self-explanatory. Never narrate what the code does.

### What We're Looking For

- **Bug reports** with steps to reproduce
- **Data corrections** — if your property shows the wrong numbers, [submit a correction](https://westroxburyzoning.org/feedback) or open an issue with the GIS ID and what should be different
- **Accessibility improvements** — we aim for WCAG 2.1 AA
- **Performance** — faster load times, smaller bundles, better caching
- **New features** — open an issue first to discuss before building

### What We Won't Merge

- Changes that add opinions or advocacy language — this tool presents facts, not positions
- Dependencies without a clear justification
- Code that doesn't pass `bun run check && bun test`
- PRs without a description

## Security

This project uses [Aikido](https://www.aikido.dev/) for continuous security scanning — SAST, dependency vulnerability scanning (SCA), and secrets detection. Aikido runs on every push and PR.

If you discover a security vulnerability, please report it responsibly by emailing the project maintainers rather than opening a public issue.

## Known Limitations

1. **Setback estimates are approximations**, not survey-grade measurements (derived from building footprint vs. parcel boundary)
2. **Condo deduplication** uses the `CONDO MAIN` assessor record for building data; individual unit records are summed for total unit count
3. **54 parcels (~0.6%)** don't fall within any proposed zoning polygon — these show as "Not affected" and may need manual review
4. **Sub-neighborhood boundaries** are project-defined (not official city designations) based on locally recognized areas
5. **The draft zoning text is subject to change** — when the city updates the draft, the pipeline needs to be re-run

## License

MIT — see [LICENSE](./LICENSE)

## Contact

- **Project lead:** Emily Gamble
- **Built by:** [The Last Unicorn, LLC](https://lastunicorn.io)
- **City contact:** Will Cohen, Senior Zoning Reform Planner — [Will.Cohen@boston.gov](mailto:Will.Cohen@boston.gov)
- **City initiative:** [bostonplans.org/neighborhood-housing](https://www.bostonplans.org/neighborhood-housing)
