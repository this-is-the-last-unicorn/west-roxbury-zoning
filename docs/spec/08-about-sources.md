# About & Sources

Two pages with related content. About is user-facing trust-building; Sources is the detailed methodology reference.

**See also:** [05b-faq.md](05b-faq.md) for general FAQ, [09-shared-components.md](09-shared-components.md) for the Data Correction Modal (linked from About), [10-data-and-calcs.md](10-data-and-calcs.md) for computation formulas referenced by Sources.

---

## About / How This Works (`/about`)

```
┌──────────────────────────────────────────────────────────┐
│  About This Site                                         │
│                                                          │
│  West Roxbury Zoning Analysis is an independent          │
│  civic-data project that helps West Roxbury residents    │
│  understand what Boston's proposed Neighborhood Housing   │
│  zoning changes mean for their property and community.   │
│                                                          │
│  ─────────────────────────────────────────────────        │
│                                                          │
│  CREATED BY                                              │
│  Emily Gamble                                            │
│  Prepared by The Last Unicorn, LLC                       │
│                                                          │
│  ─────────────────────────────────────────────────        │
│                                                          │
│  WHAT WE DO                                              │
│  We take official City data — parcel records, building   │
│  information, assessor data, and the proposed zoning     │
│  rules — and translate them into property-specific       │
│  comparisons any homeowner can understand.               │
│                                                          │
│  WHAT WE DON'T DO                                        │
│  • We are not affiliated with the City of Boston         │
│  • We do not advocate for or against the proposal        │
│  • We do not provide legal or real estate advice         │
│  • We do not collect personal information                │
│  • We do not submit feedback to the City on your behalf  │
│                                                          │
│  OUR APPROACH                                            │
│  • Show facts, not opinions                              │
│  • Show consequences, not opportunities                  │
│  • Use only official, verifiable data sources            │
│  • Show confidence level — "needs review" when we're    │
│    not highly confident                                  │
│  • Link back to City sources on every property           │
│                                                          │
│  LIMITATIONS                                             │
│  • Setbacks are estimated from GIS data, not surveyed   │
│  • Some building details cannot be verified from         │
│    public data alone                                     │
│  • The proposal is a draft — rules may change           │
│  • This site does not replace professional review        │
│                                                          │
│  ─────────────────────────────────────────────────        │
│                                                          │
│  THIS PROJECT IS OPEN SOURCE                             │
│  Every line of code, every data file, every formula,     │
│  and every methodology decision is publicly available    │
│  on GitHub. Anyone can audit how we calculate results,   │
│  verify our data sources, or build on this work.         │
│                                                          │
│  📂 View the code → github.com/the-last-unicorn/...     │
│  📄 View the full methodology → /sources                 │
│                                                          │
│  INFRASTRUCTURE                                          │
│  • Code: GitHub (public, MIT license)                    │
│  • Hosting: Render (web service + PostgreSQL)            │
│  • Domain: westroxburyzoning.org (Cloudflare)            │
│  • Map tiles: Mapbox                                     │
│  • Data: Official City of Boston public sources          │
│  • Analytics: Umami (self-hosted, open source, no cookies)│
│  • No third-party trackers, no cookies, no ads           │
│                                                          │
│  ─────────────────────────────────────────────────        │
│                                                          │
│  FOUND AN ERROR?                                         │
│  Submit a correction → [opens correction modal]          │
│                                                          │
│  View detailed sources & methodology →                   │
└──────────────────────────────────────────────────────────┘
```

### Authorship

**Emily Gamble** is the creator and author of this project. The site is prepared by **The Last Unicorn, LLC**. Emily is a West Roxbury resident who built this tool to help her neighbors understand the zoning proposal.

The About page should present Emily as a real person with a real stake in the community — not a faceless organization. This is critical for trust. First-person credibility ("I built this because I wanted to understand what was happening in my neighborhood") is more powerful than institutional credibility for a civic tool like this.

### Open Source Positioning

The open-source commitment is not just a feature — it IS the credibility model. When someone asks "how do I know this is accurate?" the answer is: "every line of code is public, every formula is documented, every data source is linked. Check it yourself or have anyone you trust check it."

This replaces the need for institutional endorsement. The code is the proof.

---

## Sources & Methodology (`/sources`)

Full-page reference. Every property result also links here via "View full methodology →".

Every data source listed below has a direct link to the original source. Every file listed is included in the public GitHub repository. Anyone can download the same data we use and verify our results independently.

---

### 1. Legal Text (the proposal itself)

| Document                                | Released      | Link                                                                                                          |
| --------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------- |
| Residential Zoning Draft Text Amendment | July 17, 2026 | [Boston Planning PDF](https://www.bostonplans.org/zoning/neighborhood-housing) _(verify URL at publish time)_ |

This is the authoritative source for all proposed dimensional rules (Tables B, C, D), use regulations (Table A), parking rules (Section 23-6(d)), easement bonus (Section 20-6), and nonconformity rules (Section 20-5). Our local copy: `data/Neighborhood-Housing-Draft-Legal-Text_071626.pdf`

---

### 2. GIS Layers

All downloaded to `data/` in the repository. Each links to the original ArcGIS FeatureServer.

| File                                         | Features | Source                                  | Live URL                                                                                                                                          |
| -------------------------------------------- | -------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `proposed_zoning_subdistricts.geojson`       | 1,665    | Boston Planning GIS                     | [FeatureServer](https://gis.bostonplans.org/hosting/rest/services/Neighborhood_Housing_Zoning_Subdistricts/FeatureServer/0)                       |
| `current_zoning_districts.geojson`           | 40       | Boston Planning GIS                     | [FeatureServer](https://gis.bostonplans.org/hosting/rest/services/Zoning_Districts/FeatureServer/0)                                               |
| `parcels_west_roxbury.geojson`               | 9,569    | Boston Planning GIS — FY25 Parcels      | [FeatureServer](https://gis.bostonplans.org/hosting/rest/services/FY25_Parcels_with_Planning_Zoning_Data_UPDATED/FeatureServer/0)                 |
| `parcels_west_roxbury_buffer5ft.geojson`     | 9,527    | Boston Planning GIS — 5ft Inward Buffer | [FeatureServer](https://gis.bostonplans.org/hosting/rest/services/Hosted/Parcels_Planning_and_Zoning_FY25_with_Inward_Buffer_5ft/FeatureServer/0) |
| `buildings_west_roxbury_roof_breaks.geojson` | 23,724   | Boston Planning GIS — Buildings         | [FeatureServer](https://gis.bostonplans.org/hosting/rest/services/Boston_Buildings/FeatureServer/9)                                               |
| `ma_municipalities.geojson`                  | 351      | MassGIS                                 | [FeatureServer](https://services1.arcgis.com/hGdibHYSPO59RG1h/arcgis/rest/services/Massachusetts_Municipalities/FeatureServer/1)                  |

---

### 3. Assessor Data

| File                               | Records | Source                                    | Link                                                                                                                                                                                   |
| ---------------------------------- | ------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `assessor_fy2026_west_roxbury.csv` | 11,100  | City of Boston FY2026 Property Assessment | [data.boston.gov](https://data.boston.gov/dataset/e02c44d2-3c64-459c-8fe2-e1ce5f38a035/resource/ee73430d-96c0-423e-ad21-c4cfb54c8961/download/fy2026-property-assessment-data_rev.csv) |

Filtered to ZIP 02132 (West Roxbury). Key fields used: `BLDG_TYPE`, `ROOF_STRUCTURE`, `NUM_PARKING`, `RES_UNITS`, `LAND_SF`, `GROSS_AREA`, `LIVING_AREA`, `LU_DESC`, `YR_BUILT`, `RES_FLOOR`, `CD_FLOOR`

---

### 4. Webmap Configuration

| File               | Source                                                                                 |
| ------------------ | -------------------------------------------------------------------------------------- |
| `webmap_data.json` | ArcGIS webmap configuration defining all GIS layers, symbology, and filter expressions |

---

### 5. How We Calculate Results

Every calculation this site performs is documented with full pseudocode in the repository. There are **21 documented formulas** covering:

| Formula | What it does                                                                              |
| ------- | ----------------------------------------------------------------------------------------- |
| B1      | Spatial join — assigns each parcel to its proposed zoning district                        |
| B2      | Assessor join — matches building/property data to parcels                                 |
| B3      | Lot-size tier — classifies lots as small/medium/large for tiered rules                    |
| B4      | Table selection — determines whether Table B or C applies                                 |
| B5      | Lot coverage lookup — tiered by district and lot size                                     |
| B6      | Setback estimation — calculates distances from building to lot lines using GIS geometry   |
| B7      | Roof pitch estimation — infers pitch from elevation data on gable roofs                   |
| B8      | Nonconformity detection — flags conditions that differ from current or proposed standards |
| B9      | Property summary — identifies the 3–4 most material changes per property                  |
| B10     | Block aggregation — computes medians, ranges, and distributions                           |
| B11     | Current zoning lookup — maps existing districts to their rules                            |
| B12     | Proposed zoning lookup — all proposed rules by district, table, and lot tier              |
| B13     | Potential Outcome Engine — what the proposed rules enable on each property                |
| B14     | Confidence scoring — determines when to show "Needs review"                               |
| B15     | Block definition — identifies street segments between intersections                       |
| B16     | Permeable area — inverts impervious surface data                                          |
| B17     | Impact scoring — internal-only change magnitude metric                                    |
| B18     | Easement bonus — per-property easement scenario computation                               |
| B19     | Stories inference — estimates story count from assessor + height data                     |
| B20     | Distributions — roof structure, district, lot-size variation                              |
| B21     | Section 20-5 constraints — limits outcomes for nonconforming properties                   |

Full pseudocode for every formula: [view on GitHub → `spec/10-data-and-calcs.md`]

---

### 6. What We Estimate (and what we don't)

| Metric            | Method                                                              | Confidence                                                            |
| ----------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Proposed district | Spatial join (GIS overlay)                                          | High — from official City GIS layer                                   |
| Dwelling units    | Assessor `RES_UNITS` cross-checked with GIS `EXIST_Total_Res_Units` | High — two independent sources                                        |
| Height            | GIS `EXIST_BLDG_HGT_2010`                                           | Moderate — 2010-vintage data, may not reflect recent changes          |
| Lot coverage      | GIS `PctLotCoverage` or computed from footprint/lot area            | High                                                                  |
| Setbacks          | **Estimated** from GIS building/parcel geometry                     | Moderate — **not a professional survey**. Labeled "est." everywhere.  |
| Roof pitch        | **Estimated** from roof-break elevation data                        | Moderate — only on simple gable forms. Complex roofs → "Undetermined" |
| Parking spaces    | Assessor `NUM_PARKING`                                              | Moderate — assessor data, not field-verified                          |
| Stories           | Assessor `RES_FLOOR` or inferred from height                        | Moderate to Low                                                       |
| Permeable area    | Inverted from GIS impervious surface data                           | High                                                                  |

When confidence falls below 90%, the site shows **"Needs property-specific review"** instead of a number.

---

### 7. Open Source & Infrastructure

| Component                | Provider                                | Public?                                                                  |
| ------------------------ | --------------------------------------- | ------------------------------------------------------------------------ |
| **Source code**          | GitHub                                  | Yes — public repository, open source                                     |
| **Data files**           | GitHub (in `data/` directory)           | Yes — all included in repo                                               |
| **Computation formulas** | GitHub (in `spec/10-data-and-calcs.md`) | Yes — full pseudocode                                                    |
| **Specification**        | GitHub (in `spec/` directory)           | Yes — all design decisions documented                                    |
| **Hosting**              | Render                                  | Web service + PostgreSQL                                                 |
| **Domain / CDN**         | Cloudflare                              | —                                                                        |
| **Map tiles**            | Mapbox GL JS                            | —                                                                        |
| **Analytics**            | Umami (self-hosted)                     | Open source, no cookies, no personal data — [umami.is](https://umami.is) |

**License:** MIT

Repository: `github.com/this-is-the-last-unicorn/west-roxbury-zoning`
Domain: `westroxburyzoning.org`

---

### Recently Acquired Data

| File                         | Features | Source                                                                 | Notes                                                                                                                                                                                                                       |
| ---------------------------- | -------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `roads_west_roxbury.geojson` | 3,667    | MassGIS-MassDOT Roads                                                  | Street centerlines with `FM_ST_NAME` / `TO_ST_NAME` (cross-street names). ~78% have from/to populated. [FeatureServer](https://services1.arcgis.com/hGdibHYSPO59RG1h/arcgis/rest/services/MassDOTRoads_gdb/FeatureServer/0) |
| `sub_neighborhoods.geojson`  | 6        | Generated from city records, zoning articles, and community references | Approximate boundaries based on locally recognized areas. Bellevue Hill (1,177), Centre Street Village (1,659), LaGrange (1,845), The Parkway (2,088), Holy Name (2,601), Spring St/Baker (121). Covers 99% of parcels.     |

### Data Still Needed

| Data                                 | Purpose                                                  | Notes                                                                                                                                                                           |
| ------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Lot frontage**                     | B18: Easement bonus area calculation (`frontage × 5 ft`) | Not in assessor CSV (`LOT_FRONT` field does not exist). Must derive from parcel geometry: shortest edge facing the street network.                                              |
| **Sub-neighborhood boundary review** | Verify `/area/{slug}` boundaries                         | 6 areas covering 99% of parcels. Boundaries are approximate and based on locally recognized names — Emily should spot-check on [geojson.io](https://geojson.io) before publish. |

---

## Privacy Policy (`/privacy`)

Short, plain-language page. Emily should have a lawyer review before publish, but this is the draft content:

```
┌──────────────────────────────────────────────────────────┐
│  Privacy Policy                                          │
│                                                          │
│  westroxburyzoning.org does not track you.               │
│                                                          │
│  WHAT WE DON'T DO                                        │
│  • No cookies                                            │
│  • Analytics: Umami (open source, self-hosted, no cookies)│
│  • No advertising                                        │
│  • No user accounts or login                             │
│  • No address search history stored                      │
│  • No personal data sold or shared                       │
│                                                          │
│  WHAT WE DO STORE                                        │
│  • Data corrections: If you submit a correction, we      │
│    store the text you provide and your email address      │
│    (only if you choose to provide one). Corrections      │
│    are reviewed by the site maintainer.                   │
│  • Feedback reactions: If you use the feedback tool,      │
│    we store your anonymous category reactions             │
│    (Support/Concerned/No opinion) and any free text.      │
│    No identifying information is attached.                │
│  • Session duplicate protection: We use your browser's   │
│    localStorage (not cookies) to prevent duplicate        │
│    feedback submissions. This data stays on your          │
│    device and is never sent to our servers.               │
│                                                          │
│  HOW TO DELETE YOUR DATA                                  │
│  • Corrections: Email [contact] to request deletion      │
│  • Feedback: Anonymous and cannot be linked to you        │
│  • localStorage: Clear your browser data at any time      │
│                                                          │
│  ANALYTICS                                               │
│  • We use Umami, an open-source, self-hosted analytics    │
│    tool. It collects page view counts and referrer URLs    │
│    only. It does not use cookies, does not collect IP      │
│    addresses, and cannot identify individual visitors.     │
│    The analytics data is stored on our own server.         │
│    Source code: umami.is                                   │
│                                                          │
│  THIRD-PARTY SERVICES                                    │
│  • Mapbox: Map tiles are loaded from Mapbox servers.      │
│    Mapbox may log standard web request data (IP address)  │
│    per their privacy policy. We do not control this.      │
│  • Cloudflare: DNS and CDN provider. Cloudflare may       │
│    log standard web request data per their privacy policy.│
│  • Render: Hosting provider. Standard server logs only.   │
│                                                          │
│  CONTACT                                                 │
│  Questions: [email — Emily to provide]                   │
│                                                          │
│  Last updated: [date at publish]                         │
└──────────────────────────────────────────────────────────┘
```

### Privacy & Cookie Banner

A simple, one-time dismissible info banner — NOT an annoying consent popup. This site has nothing to consent to, so the banner is a trust signal, not a legal gate.

```
┌──────────────────────────────────────────────────────────────┐
│ 🔒 This site does not use cookies, trackers, or ads.         │
│    We don't collect or sell your data. Learn more →          │
│                                                    [Got it] │
└──────────────────────────────────────────────────────────────┘
```

- Appears once on first visit, dismissed permanently via `localStorage`
- "Learn more" links to `/privacy`
- "Got it" dismisses — no "Accept/Reject" choices because there's nothing to accept or reject
- Subtle — navy background, small text, bottom of viewport. Not a blocking modal.

**GPC (Global Privacy Control) compliance (CCPA 2026):**

Browsers can send a Global Privacy Control signal (`navigator.globalPrivacyControl`). Since January 2026, CCPA requires websites to visually confirm when this signal is honored. Even though we have nothing to disable, we should still detect and acknowledge it:

```javascript
if (navigator.globalPrivacyControl) {
  // Show in footer or banner: "✓ Opt-Out Preference Signal Honored"
  // We don't sell or share personal data, but we honor the signal.
}
```

Add a line to the footer when GPC is detected: `✓ Your opt-out preference has been honored`. This costs zero effort and fully satisfies CCPA §7025(c)(6).

**Third-party cookies note:** Cloudflare may set a `__cf_bm` cookie for bot management, and Mapbox may set cookies for tile delivery. These are set by third parties, not by this site. The privacy policy covers this. No consent required for strictly necessary security cookies under GDPR.

---

## Calculations Required

None — static reference content.
