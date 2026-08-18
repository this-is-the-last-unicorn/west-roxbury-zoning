# Aggregate Views — Block / Street / Sub-neighborhood / Overview

These four pages share the same structural pattern at increasing geographic scope.

**See also:** [10-data-and-calcs.md](10-data-and-calcs.md) for aggregation + block definition formulas, [04-browse-map.md](04-browse-map.md) for the full-screen map (separate page).

**Map library:** Mapbox GL JS

---

## Shared Layout Pattern

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

### Stat cards

Compare **Today's Reality vs Proposed Law** only (no aggregate Potential Outcomes in V1).

Each card shows:

- Metric name + tooltip
- Median value (existing)
- Range (min–max)
- Proposed standard (max or min depending on metric)
- **One-line narrative interpretation** (e.g., "Most homes on this block are about 24 ft tall — the proposed limit is 35 ft, an 11-ft increase.")

The narrative line translates numbers into plain English. Without it, the stat cards are data without meaning. The interpretation must remain neutral: state what exists, state what the proposed limit is, state the gap. No opinion.

**Mixed lot-tier handling:** When a block/street/area contains properties in multiple lot-size tiers, metrics that vary by tier (lot coverage, units) should show the range of proposed values: "Proposed max: 30%–35%" instead of a single number. The one-line narrative should note the variation: "Proposed lot coverage on this block varies from 30% to 35% depending on lot size." This avoids misleading a homeowner whose property faces a different limit than the displayed number.

### Lot-size variation note

If a block/street/area contains properties in multiple lot-size tiers (≤3,800 / 3,800–6,899 / ≥6,900 sf), show a note:

```
┌──────────────────────────────────────────────────────────┐
│ ⓘ Lot sizes on this block range from 3,400 sf to        │
│   8,200 sf. Properties with different lot sizes have     │
│   different proposed rules for lot coverage and units.   │
│   Click any property below to see its specific rules.    │
└──────────────────────────────────────────────────────────┘
```

This addresses the fact that two neighbors on the same block in the same proposed district can have very different rules if their lots are in different size tiers.

---

## Differences by Scope

|                           | Block                 | Street                | Sub-neighborhood     | Overview                     |
| ------------------------- | --------------------- | --------------------- | -------------------- | ---------------------------- |
| **URL**                   | `/block/{id}`         | `/street/{slug}`      | `/area/{slug}`       | `/overview`                  |
| **Map zoom**              | Block-level           | Street-length         | Area boundary        | Full WR                      |
| **Multi-district?**       | Rarely                | Sometimes             | Often                | Always                       |
| **List shows**            | Individual properties | Blocks on this street | Streets in this area | Sub-neighborhoods            |
| **Boundary note**         | No                    | No                    | Yes (if unofficial)  | No                           |
| **District distribution** | No (usually uniform)  | If mixed              | Yes                  | Yes (table)                  |
| **Browse-by links**       | —                     | —                     | —                    | Sub-neighborhood, Street A-Z |

---

## Block View (`/block/{block_id}`)

```
┌──────────────────────────────────────────────────────────┐
│ ← Back to 24 Example Street                             │
│                                                          │
│ Your Block: Example Street                               │
│ Between Oak Street and Elm Street                        │
│ 14 properties | Proposed: RD-3                           │
│                                                          │
│ [Share this block ↗]                                     │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────────────────────────────┐               │
│  │         [Block Map]                    │               │
│  │   Parcels colored by proposed district │               │
│  │   Searched property highlighted        │               │
│  │   Click any parcel → property page     │               │
│  └────────────────────────────────────────┘               │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  Block Statistics: Today's Reality vs Proposed Law       │
│                                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │ Height   │ │ Units    │ │ Coverage │ │ Parking  │    │
│  │ Med: 24' │ │ Med: 1   │ │ Med: 18% │ │ Med: 2   │    │
│  │ Range:   │ │ Range:   │ │ Range:   │ │ Range:   │    │
│  │ 18'–32'  │ │ 1–2      │ │ 12%–28%  │ │ 0–4      │    │
│  │          │ │          │ │          │ │          │    │
│  │ Proposed │ │ Proposed │ │ Proposed │ │ Proposed │    │
│  │ max: 35' │ │ max: 3   │ │ max: 30% │ │ req: 0   │    │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘    │
│                                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │ Floor Plt│ │ Perm Area│ │ Fr. Setbk│ │ Roof     │    │
│  │ Med:     │ │ Med: 58% │ │ Med: 22' │ │ Med:     │    │
│  │ 1,350 sf │ │ Range:   │ │ Range:   │ │ ~7:12    │    │
│  │ Range:   │ │ 35%–72%  │ │ 15'–35'  │ │ Range:   │    │
│  │ 900–     │ │          │ │          │ │ 5:12–    │    │
│  │ 2,100 sf │ │ Proposed │ │ Proposed │ │ 10:12    │    │
│  │          │ │ min: 30% │ │ min: 12' │ │          │    │
│  │ Proposed │ │          │ │          │ │          │    │
│  │ max:     │ │          │ │          │ │          │    │
│  │ 2,000 sf │ │          │ │          │ │          │    │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘    │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  Building Character                                      │
│  Colonial: 7 (50%) | Cape: 3 (21%) | Ranch: 2 (14%)    │
│  Bungalow: 1 (7%) | Undetermined: 1 (7%)               │
│                                                          │
│  Roof Structure                                          │
│  Gable: 9 (64%) | Hip: 3 (21%) | Flat: 1 (7%)         │
│  Unknown: 1 (7%)                                        │
├──────────────────────────────────────────────────────────┤
│  Properties on This Block                                │
│                                                          │
│  20 Example St — 6,800 sf — 1→3 units — 24'→35' max     │
│  22 Example St — 4,200 sf — 1→3 units — 22'→35' max     │
│  24 Example St — 7,200 sf — 1→3 units — 25'→35' max ←you│
│  26 Example St — 7,500 sf — 2→3 units — 28'→35' max     │
│  28 Example St — 3,400 sf — 1→2 units — 22'→35' max     │
│  ...                                                     │
│                                                          │
│  Click any property to see its full analysis →           │
├──────────────────────────────────────────────────────────┤
│  View your street → | View West Roxbury →                │
└──────────────────────────────────────────────────────────┘
```

---

## Street View (`/street/{street_slug}`)

Same framework as Block View but scoped to the full named street within West Roxbury.

Header: "Example Street, West Roxbury — 42 properties"

**Additional content vs Block View:**

- If street spans multiple proposed districts: auto-segmented at district boundary. Show district distribution ("28 parcels RD-3, 14 parcels RD-2")
- Block-by-block breakdown option: "View by block" shows collapsible sections per block segment
- Larger map showing the full street with parcels colored by proposed district

**Street segmentation rule:** Streets that span multiple proposed districts get segmented at the district boundary. Label clearly: "Centre Street — RD-2 section (between X and Y)." Single-district streets stay whole.

---

## Sub-neighborhood View (`/area/{area_slug}`)

Same framework at sub-neighborhood scope.

Header: "Bellevue Hill — 340 properties"

**Additional content:**

- Boundary note: "Boundary based on [official City definition / locally recognized boundary]"
- District distribution across the area
- If boundary is not official: "This boundary is based on locally recognized community geography, not an official City designation."

**V1 launch areas (6):**

| Slug            | Name                  | Parcels | Description                                                                        |
| --------------- | --------------------- | ------- | ---------------------------------------------------------------------------------- |
| `bellevue-hill` | Bellevue Hill         | 1,177   | Boston's highest point. Between Centre St, WR Parkway, Washington St.              |
| `centre-street` | Centre Street Village | 1,659   | Historic village center — main commercial strip and civic core.                    |
| `lagrange`      | LaGrange              | 1,845   | North-central WR along LaGrange Street corridor, between VFW Pkwy and WR Pkwy.     |
| `parkway`       | The Parkway           | 2,088   | Northeast WR along WR Parkway toward Brookline. Manthorne, Church, Russett, Maple. |
| `holy-name`     | Holy Name             | 2,601   | South of Centre St, centered around Holy Name Parish.                              |
| `spring-baker`  | Spring Street / Baker | 121     | Western edge. Millennium Park, Brook Farm historic site, sparse residential.       |

All boundaries are approximate, based on locally recognized community geography. No official city source for sub-neighborhood boundaries exists — the city treats West Roxbury as a single neighborhood.

---

## West Roxbury Overview (`/overview`)

```
┌──────────────────────────────────────────────────────────┐
│  West Roxbury Zoning Overview                            │
│  9,569 parcels analyzed                                  │
│                                                          │
│  ┌──────────────────────────────────────────┐             │
│  │     [Full West Roxbury Map]              │             │
│  │  Parcels colored by proposed district    │             │
│  └──────────────────────────────────────────┘             │
│                                                          │
│  District Distribution                                   │
│  ┌─────────┬──────────┬──────────────────┐               │
│  │ District│ Parcels  │ % of WR          │               │
│  ├─────────┼──────────┼──────────────────┤               │
│  │ RD-2    │ X,XXX    │ XX%              │               │
│  │ RD-3    │ X,XXX    │ XX%              │               │
│  │ RD-4    │ X,XXX    │ XX%              │               │
│  │ RD-6    │ XXX      │ X%               │               │
│  │ Other   │ XXX      │ X%               │               │
│  └─────────┴──────────┴──────────────────┘               │
│                                                          │
│  West Roxbury Today vs Proposed                          │
│  [Same stat card grid, neighborhood-wide]                │
│                                                          │
│  Building Character Distribution                         │
│  [Horizontal bar chart or distribution]                  │
│                                                          │
│  Browse by Sub-neighborhood                              │
│  • Bellevue Hill (1,177 properties) →                    │
│  • Centre Street Village (1,659 properties) →            │
│  • LaGrange (1,845 properties) →                         │
│  • The Parkway (2,088 properties) →                      │
│  • Holy Name (2,601 properties) →                        │
│  • Spring Street / Baker (121 properties) →              │
│                                                          │
│  Browse by Street                                        │
│  • [Alphabetical street list with property counts] →     │
└──────────────────────────────────────────────────────────┘
```

---

## Calculations Required

| Calculation                  | Formula            | Block               | Street                   | Sub-neighborhood | Overview |
| ---------------------------- | ------------------ | ------------------- | ------------------------ | ---------------- | -------- |
| Block definition algorithm   | B15                | Yes                 | Yes (defines sub-blocks) | No               | No       |
| Aggregation (median/range)   | B10                | Yes                 | Yes                      | Yes              | Yes      |
| Character distribution       | B10                | Yes                 | Yes                      | Yes              | Yes      |
| Roof distribution            | B20                | Yes                 | Yes                      | Yes              | Yes      |
| District distribution        | B20                | No                  | If multi-district        | Yes              | Yes      |
| Lot-size variation detection | B20                | Yes                 | Yes                      | Yes              | No       |
| Spatial boundary lookup      | _(manual GeoJSON)_ | No                  | No                       | Yes              | No       |
| Per-property change deltas   | B12 + B13          | Yes (property list) | No                       | No               | No       |

All formulas in [10-data-and-calcs.md](10-data-and-calcs.md).
