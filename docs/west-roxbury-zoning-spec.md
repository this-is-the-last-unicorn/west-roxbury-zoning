# West Roxbury Zoning Analysis

## V1 Product Specification — Build-Ready

**Status:** Build-Ready V1 Spec  
**Geography:** West Roxbury, Boston, Massachusetts  
**Working title:** West Roxbury Zoning Analysis  
**Draft Legal Text:** Residential Zoning Draft Zoning Text Amendment, released July 17, 2026  
**Applicable Article:** New Article 20 — Residential Districts  
**Last updated:** 2026-08-17

---

# 1. PRODUCT VISION

West Roxbury Zoning Analysis is an independent civic-information website that helps West Roxbury residents understand what Boston's proposed Neighborhood Housing zoning changes mean for:

1. their property;
2. their block;
3. their street;
4. their sub-neighborhood/community; and
5. West Roxbury overall.

The fundamental question the product answers:

**"What does this rezoning proposal actually mean for me, my property, my block, and my neighborhood?"**

The core experience:

**Enter an address → understand what exists → understand what today's zoning allows → understand what the proposed zoning allows → understand what could actually change on this particular property.**

---

# 2. POSITIONING AND NEUTRALITY

The site must be as factually neutral as possible.

It is:

- an independent civic-data project;
- not affiliated with or endorsed by the City of Boston;
- not an advocacy organization;
- not a development-feasibility tool;
- not a property-acquisition tool;
- not a developer-prospecting tool.

The site may sometimes _feel_ critical of the proposal because it clearly presents the magnitude of potential changes. That is acceptable. The site should not minimize a change in order to appear neutral. Likewise, it should not exaggerate a theoretical possibility in order to make the proposal appear more consequential.

The goal is to **call the facts what they are**.

---

# 3. CORE PRODUCT PRINCIPLE: CONSEQUENCES, NOT OPPORTUNITIES

The site exists to explain what zoning changes permit. It must **not package those changes as development opportunities**.

There should be **no public development-potential heat map, bulk opportunity search, profitability model, parcel ranking, or bulk parcel export**.

---

# 4. V1 GEOGRAPHIC SCOPE

**West Roxbury only.** Architecture should not prevent future expansion but expansion is not a V1 requirement.

---

# 5. PRIMARY USER

**A West Roxbury homeowner/resident who has heard about the rezoning proposal and wants to know what it means for their property and immediate community.**

Assumes little or no zoning expertise. No login required. Any West Roxbury address searchable. Condo/unit addresses resolve to the underlying parcel/building.

---

# 6. INFORMATION HIERARCHY

**Property → Block → Street → Sub-neighborhood → West Roxbury**

- **Block:** Physical street segment between nearest through-street intersections. Corner lots default to the address-frontage street. Expand to adjacent segment(s) if too few properties, clearly labeled.
- **Street:** Entire named street within West Roxbury; may segment unusually long/heterogeneous streets.
- **Sub-neighborhood:** Official City boundaries where available; recognized local community boundaries (e.g. Bellevue Hill) otherwise, clearly labeled.

---

# 7. HOMEPAGE

## Top-level context

Very short, neutral explanation of: what the rezoning proposal is; that Boston Planning is seeking community input; what this site does; that the site is independent from the City.

## Primary action

**Enter your address** — dominant interaction.

## Secondary action

**Browse West Roxbury** — one obvious click to the map.

## Upcoming Meetings & Deadlines

Small module showing next official Boston Planning meeting/hearing/deadline, linking to full Meetings & Deadlines page.

---

# 8. PROPERTY RESULT PAGE

## 8.1 Header

Display: address, proposed zoning district (RD-2/RD-3/RD-4/RD-6), link to Boston Planning's official material for that district, independent-project disclaimer.

## 8.2 Reassurance statement (CRITICAL)

On every property page, above the comparison table:

> **Your existing home can remain as it is.**
> Proposed zoning changes what may be permitted going forward; it does not require your home to be altered.

This must be unmistakable. Residents must never conclude "I have to change my house."

---

# 9. PROPERTY SUMMARY

## "What changes for this property?"

Surface the **3–4 most material property-specific changes**, generated only from verified/high-confidence calculations. If nothing material changes:

> **The proposal makes little or no material change to what is permitted on this property.**

Do NOT include block-level comparisons here.

---

# 10. CORE PROPERTY COMPARISON TABLE

Four columns:

| Metric | Today's Law | Today's Reality | Proposed Law | Potential Outcome |
| ------ | ----------- | --------------- | ------------ | ----------------- |

## Column definitions

- **Today's Law:** What current zoning legally permits/requires.
- **Today's Reality:** What physically/legally exists on the property today.
- **Proposed Law:** What the proposed Article 20 would permit/require.
- **Potential Outcome:** What the proposed rules appear to enable on this particular property after applying known physical and legal constraints. Shown only at ≥90% internal confidence; otherwise **"Needs property-specific review."**

Potential Outcome is NOT a prediction of owner behavior, an economic feasibility analysis, a probability of redevelopment, or a developer opportunity score.

## Visual indicators

- Subtle color coding when Today's Reality differs from Today's Law or Proposed Law
- Color is never the sole indicator (WCAG requirement)
- Do NOT label nonconforming conditions as "illegal" or "violations" — they may be lawful pre-existing nonconformities

---

# 11. VERIFIED PROPOSED DIMENSIONAL RULES

_Source: Article 20, Tables B, C, D — Residential Zoning Draft Text Amendment, July 17, 2026_

## TABLE B — Base Dimensional Regulations (new construction / no retained pre-2027 building)

### Lot Standards

| Metric                                    | RD-2                                       | RD-3 | RD-4 | RD-6 |
| ----------------------------------------- | ------------------------------------------ | ---- | ---- | ---- |
| **Max Dwelling Units**                    | 2 (existing pre-2027 buildings may have 3) | 3    | 4    | 6    |
| **Max Lot Coverage (lot ≤ 3,800 sf)**     | 25%                                        | 35%  | 40%  | 60%  |
| **Max Lot Coverage (lot 3,800–6,899 sf)** | 25%                                        | 35%  | 55%  | 55%  |
| **Max Lot Coverage (lot ≥ 6,900 sf)**     | 25%                                        | 30%  | 30%  | 30%  |
| **Min Permeable Area**                    | 45%                                        | 30%  | 25%  | 15%  |
| **Min Front Yard**                        | 15'                                        | 12'  | 8'   | 4'   |
| **Min Rear Yard**                         | 20'                                        | 15'  | 10'  | 10'  |
| **Min Side Yard (cumulative)**            | 20'                                        | 15'  | 10'  | 10'  |
| **Min Side Yard (individual min)**        | 3'                                         | 3'   | 3'   | 3'   |

### Building Form Standards

| Metric                             | RD-2                      | RD-3                      | RD-4     | RD-6     |
| ---------------------------------- | ------------------------- | ------------------------- | -------- | -------- |
| **Max Height (feet)**              | 35'                       | 35'                       | 45'      | 45'      |
| **Max Height (stories)**           | 3                         | 3                         | 3        | 4        |
| **Third Story**                    | Must be Sloped Roof Story | Must be Sloped Roof Story | —        | —        |
| **Max Building Floor Plate**       | 2,200 sf                  | 2,000 sf                  | 2,200 sf | 2,200 sf |
| **Multiple Detached Buildings**    | Yes                       | Yes                       | Yes      | Yes      |
| **Min Distance Between Buildings** | 12'                       | 10'                       | 5'       | 5'       |

## TABLE C — Dimensional Regulations for Adding Units While Retaining Pre-2027 Building

More permissive than Table B in several dimensions:

| Metric                                    | RD-2                                        | RD-3        | RD-4        | RD-6        |
| ----------------------------------------- | ------------------------------------------- | ----------- | ----------- | ----------- |
| **Max Lot Coverage (lot ≤ 3,800 sf)**     | 30%                                         | 35%         | 45%         | See Table B |
| **Max Lot Coverage (lot 3,800–6,899 sf)** | 30%                                         | 35%         | See Table B | See Table B |
| **Max Lot Coverage (lot ≥ 6,900 sf)**     | 30%                                         | See Table B | See Table B | See Table B |
| **Min Rear Yard**                         | 10'                                         | 10'         | 10'         | 10'         |
| **Min Side Yard (cumulative)**            | 10'                                         | —           | —           | —           |
| **Min Side Yard (individual min)**        | 3'                                          | 3'          | 3'          | 3'          |
| **Max Building Floor Plate**              | 2,600 sf                                    | 2,400 sf    | 2,600 sf    | 2,600 sf    |
| **ADU (Detached) Max Floor Plate**        | 900 sf                                      | 900 sf      | 900 sf      | 900 sf      |
| **ADU (Detached) Max Height**             | 25' or main building height, whichever less | same        | same        | same        |
| **ADU (Detached) Max Stories**            | 2 (2nd must be Sloped Roof Story)           | same        | same        | same        |
| **Min Distance Between Buildings**        | 5'                                          | 5'          | 5'          | See Table B |

## TABLE D — Conditional Use (New Building Exceeding Table A Unit Maximums)

Requires Board of Appeal conditional use permit. Up to 16 units. Additional dimensional requirements including minimum 55' lot frontage in RD-4/RD-6.

## PARKING

**Article 23, Section 23-6(d): Off-street parking is NOT REQUIRED in any Residential District (RD-2, RD-3, RD-4, RD-6).**

This is a complete elimination of parking requirements. Current zoning requires parking; proposed zoning requires zero.

## STREETSCAPE / EASEMENT BONUS (Section 20-6)

By recording a 5-foot highway easement along the full front lot line:

| District | Bonus                                                                                                                                               |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RD-2** | Max units → 4 (pre-2027) / 3 (new). Table C dims apply. Side yard: 3' min / 25' cumulative. **Sloped Roof Story requirement WAIVED for 3rd story.** |
| **RD-3** | Max units → 4. Table C dims apply. Side yard: 3' min / 15' cumulative. **Sloped Roof Story requirement WAIVED for 3rd story.**                      |
| **RD-4** | Max units → 6. Table C dims apply. Side yard: 3' min / 15' cumulative.                                                                              |
| **RD-6** | Max units → 16. Table D dims apply. Front yard: 6'. Side yard: 5' min / 10' cumulative. Rear yard: 10'.                                             |

**Critical finding:** The easement bonus makes the Sloped Roof Story requirement entirely optional in RD-2 and RD-3. A developer who grants a 5-foot sidewalk easement can build a full vertical third story with no sloped-roof constraint.

## NONCONFORMITY RULES (Section 20-5)

The draft legal text explicitly allows:

**Horizontal extensions** of nonconforming setbacks:

- May extend horizontally along the same nonconforming side/rear yard line
- May not encroach further into the front yard than the existing building

**Vertical extensions** of nonconforming yards/permeability:

- May extend vertically **if** the extension stays within the existing building floor plate
- May not exceed maximum building height
- Must comply with Sloped Roof Story requirements

**Permeable area:** A driveway/walkway on a nonconforming lot may be altered/maintained/resurfaced provided the nonconformity is not worsened.

**Implication:** An existing oversized footprint CAN go vertical to the full 35' height, as long as it stays within the existing floor plate and uses a Sloped Roof Story for the third floor (which, per above, has no defined minimum pitch and can be waived via easement bonus).

---

# 12. REQUIRED PROPERTY METRICS — DATA FIELD MAPPING

Each metric below maps to specific fields in the downloaded datasets.

### Dwelling Units

| Column            | Source                                                                 |
| ----------------- | ---------------------------------------------------------------------- |
| Today's Law       | Parcel `Zoning_Subdistrict` → current district dwelling unit rules     |
| Today's Reality   | Parcel `EXIST_Total_Res_Units` + Assessor `RES_UNITS` (cross-check)    |
| Proposed Law      | Spatial join to proposed subdistricts → Table A max units per district |
| Potential Outcome | Calculate from lot size, proposed floor plate max, setback constraints |

### Height (feet)

| Column            | Source                                                                            |
| ----------------- | --------------------------------------------------------------------------------- |
| Today's Law       | Parcel `ZON_Height_Requirement`                                                   |
| Today's Reality   | Parcel `EXIST_BLDG_HGT_2010` + Buildings `BLDG_HGT_2010` (cross-check)            |
| Proposed Law      | Proposed subdistrict `Max_Height` (35' for RD-2/RD-3, 45' for RD-4/RD-6)          |
| Potential Outcome | Difference between existing height and proposed max; translate to story potential |

### Stories

| Column            | Source                                                                                        |
| ----------------- | --------------------------------------------------------------------------------------------- |
| Today's Law       | Current district stories limit                                                                |
| Today's Reality   | Assessor `RES_FLOOR` / `CD_FLOOR` + building height inference                                 |
| Proposed Law      | 3 stories (RD-2/RD-3/RD-4), 4 stories (RD-6). Third story = Sloped Roof Story in RD-2/RD-3.   |
| Potential Outcome | Based on existing height vs proposed max; note Sloped Roof Story requirement where applicable |

### Building Floor Plate

| Column            | Source                                                                                                    |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| Today's Law       | Current district floor plate max                                                                          |
| Today's Reality   | Parcel `EXIST_Bldg_Ftprt`                                                                                 |
| Proposed Law      | Table B: 2,200 sf (RD-2/RD-4/RD-6), 2,000 sf (RD-3). Table C: 2,600 sf (RD-2/RD-4/RD-6), 2,400 sf (RD-3). |
| Potential Outcome | Compare existing footprint to proposed max; note whether Table B or C applies                             |

### Lot Coverage

| Column            | Source                                                                           |
| ----------------- | -------------------------------------------------------------------------------- |
| Today's Law       | Current district lot coverage max                                                |
| Today's Reality   | Parcel `PctLotCoverage` + `EXIST_Bldg_Ftprt` / `EXIST_Lot_Size_Actual`           |
| Proposed Law      | Table B tiered by lot size (see Section 11). Must determine lot size tier first. |
| Potential Outcome | Existing coverage vs proposed max; show both sq ft and %                         |

Show both **square feet** and **percentage of total lot**.

### Permeable / Open Lot Area

| Column            | Source                                                                                               |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| Today's Law       | Current district permeable area minimum                                                              |
| Today's Reality   | Invert: 100% − Parcel `PctImperviousSurface`. Sq ft: `EXIST_Lot_Size_Actual` − `EXIST_ImpArea_Sqft`. |
| Proposed Law      | Table B: 45% (RD-2), 30% (RD-3), 25% (RD-4), 15% (RD-6)                                              |
| Potential Outcome | Whether existing permeable area meets proposed minimum                                               |

Homeowner-facing label: **Permeable/open lot area**. Show both sq ft and %.

### Setbacks

| Column            | Source                                                                                                                  |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Today's Law       | Current district setback requirements                                                                                   |
| Today's Reality   | GIS-estimated from building footprint position within parcel boundary (buildings + parcels layers). Label as estimated. |
| Proposed Law      | Table B: Front (15'/12'/8'/4'), Rear (20'/15'/10'/10'), Side cumulative (20'/15'/10'/10'), Side min (3' all districts)  |
| Potential Outcome | Whether existing setbacks meet proposed requirements                                                                    |

Mirror the proposal's structure: front yard, rear yard, side yard (cumulative + individual minimum).

### Parking

| Column            | Source                                                                    |
| ----------------- | ------------------------------------------------------------------------- |
| Today's Law       | Current district parking requirement                                      |
| Today's Reality   | Assessor `NUM_PARKING` (physical spaces)                                  |
| Proposed Law      | **0 — No off-street parking required** (Article 23, Section 23-6(d))      |
| Potential Outcome | "Existing parking spaces may remain but are no longer required by zoning" |

Always show parking even when there is no change in physical spaces.

### Roof Pitch (where calculable)

| Column          | Source                                                                                                                                                                      |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Today's Reality | Buildings layer: `GRND_ELEV_2010`, `ROOF_ELEV_2010`, `BLDG_HGT_2010` + building geometry. Cross-check with Assessor `ROOF_STRUCTURE` (Gable/Hip/Flat/Gambrel/Mansard/Shed). |
| Proposed Law    | RD-2/RD-3: "Third Story must be a Sloped Roof Story" (no minimum pitch defined).                                                                                            |

Return **Undetermined** for complex roofs, hip/valley intersections, or low-confidence geometry.

### Building Character / Type

| Column          | Source                                                                                                                                                                                                                             |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Today's Reality | Assessor `BLDG_TYPE`: CL=Colonial, CP=Cape, BW=Bungalow, RN=Ranch, RR=Raised Ranch, SL=Split Level, TF=Two Fam Stack, DX=Duplex, TH=Town House, CV=Conventional, LR=Low Rise, FS=Free Standing. Cross-check with `ROOF_STRUCTURE`. |

Show where high confidence. Otherwise: **Undetermined**.

---

# 13. EXISTING CONDITIONS / GRANDFATHERING COMMUNICATION

Residents must NEVER conclude "I have to change my house."

## Visual indicators

- Subtle color when Today's Reality differs from Today's Law or Proposed Law
- Color never the sole indicator
- Do NOT label as "illegal," "violations," or "noncompliant"

## Statuses

- Meets applicable standard
- Existing condition differs from standard (may remain)
- Needs verification

---

# 14. INTERNAL NONCONFORMITY / GRANDFATHERING ANALYSIS

**Internal-only.** Not a public feature.

Per-parcel internal flag:

| State                        | Meaning                                                                      |
| ---------------------------- | ---------------------------------------------------------------------------- |
| None identified              | All existing conditions within current and proposed standards                |
| Potential                    | One or more dimensions appear outside proposed standards                     |
| Likely                       | Multiple dimensions outside standards or high-confidence data                |
| Requires legal/manual review | Complex situation (e.g., combination of horizontal + vertical nonconformity) |

Track reason: footprint, lot coverage, permeability, setbacks, height, other.

**Verified nonconformity rules from Section 20-5:**

The draft allows vertical extensions of nonconforming conditions provided:

1. Extension stays within existing building floor plate
2. Does not exceed maximum building height
3. Complies with Sloped Roof Story requirements

The Potential Outcome engine must apply these three constraints when calculating outcomes for nonconforming parcels.

---

# 15. POTENTIAL OUTCOME ENGINE

Explain **what the change actually enables** on the searched property. Favor obvious, conservative applications rather than clever combinations that maximize development.

Appropriate: "You could potentially add a story." / "Approximately 500 additional sq ft of footprint may be permitted." / "An additional unit does not appear feasible because [constraint]."

Not appropriate: "High redevelopment potential." / "Most profitable." / "Underutilized."

---

# 16. POTENTIAL OUTCOME COMPUTATION RULES

For each parcel, determine:

1. **Which table applies?**
   - Is there a pre-2027 building being retained? → Table C (more permissive)
   - New construction? → Table B
   - Conditional use for more units? → Table D (requires Board of Appeal)

2. **Which lot-size tier?**
   - ≤ 3,800 sf
   - 3,800–6,899 sf
   - ≥ 6,900 sf (most West Roxbury lots)

3. **Is the easement bonus (Section 20-6) available?**
   - If yes: additional units, relaxed setbacks, and Sloped Roof Story waiver in RD-2/RD-3
   - Show as a secondary "with easement bonus" scenario, not the default

4. **Apply nonconformity rules (Section 20-5):**
   - If existing setbacks are nonconforming: can extend horizontally along same line
   - If existing floor plate is nonconforming: can extend vertically within existing floor plate up to max height, must comply with Sloped Roof Story

5. **Calculate remaining buildable capacity:**
   - Available floor plate: proposed max − existing
   - Available lot coverage: proposed max % × lot area − existing coverage
   - Available height: proposed max − existing height
   - Permeable area constraint: lot area × proposed min permeable − existing permeable
   - Setback envelope: proposed setbacks applied to lot geometry → buildable area

6. **Show outcome only at ≥90% internal confidence.** Otherwise: "Needs property-specific review" with `?` explaining why.

---

# 17. CONFIDENCE STANDARD

90%+ internal threshold. Not displayed publicly.

`?` interaction: "We only show a calculated Potential Outcome when we're highly confident in both the property data and how the proposed zoning applies."

Confidence penalized by: older source data, GIS-estimated setbacks, unverifiable building components (covered vs uncovered porch), unknown structure details, conflicting sources, missing fields.

---

# 18. AI CHAT

Persistent throughout the site. Context-aware to current property/block/street/view.

### Scope

- Property-specific: "Could I add another story?" / "Could I add an ADU?" / "Why does this say needs review?"
- General: "What's the difference between RD-2 and RD-3?" / "What happens to parking?" / "What is a Sloped Roof Story?"

### Grounding (hard requirement)

Answer only from: verified City sources, verified legal text, verified parcel data, documented calculations. Cite sources inline. Say "I don't know" when uncertain. Never fill gaps with generic zoning knowledge.

### Homeowner-provided facts

Chat may accept corrections ("my porch is uncovered") and recalculate, clearly labeled: **"Based in part on homeowner-provided information that has not been independently verified."** Does not overwrite the public dataset.

---

# 19. DATA CORRECTIONS

Users may submit text-only corrections, anonymous by default, optional contact info. Corrections remain unverified until reviewed. No photo/document uploads in V1.

---

# 20. EXPLORE YOUR BLOCK

Immediately after the property table: prominent **Explore Your Block →** with a small preview of block-level stats. Do NOT automatically analyze individual neighbors on the property page.

---

# 21. BLOCK / STREET / SUB-NEIGHBORHOOD / WEST ROXBURY VIEWS

### Block view

- Aggregate statistics: **median + range** for height, stories, units, footprint, lot coverage, permeable area, setbacks, parking, roof pitch, building character
- Compare **Today's Reality vs Proposed Law** only (no aggregate Potential Outcomes in V1)
- Parcel map: clickable parcels, colored by proposed zoning district (RD-2/RD-3/etc.)
- Character distribution where confident (e.g., "60% Cape, 25% Colonial, 15% Undetermined")

### Street / Sub-neighborhood / West Roxbury

Same framework at increasing geographic scope. Same comparison structure.

---

# 22. BROWSE / MAP VIEW

Accessible from homepage. Shows proposed zoning map with all West Roxbury parcels. Colored by proposed district. Address search on map. Click any parcel → property page.

---

# 23. ROOF PITCH / CHARACTER ANALYSIS

### Data sources

- **Buildings layer:** `GRND_ELEV_2010`, `ROOF_ELEV_2010`, `BLDG_HGT_2010` per roof-break segment + building footprint geometry
- **Assessor:** `ROOF_STRUCTURE` (G=Gable, H=Hip, F=Flat, L=Gambrel, M=Mansard, S=Shed) as cross-check

### West Roxbury roof structure distribution (FY2026 assessor data)

- Gable: 6,189 (56%)
- Hip: 1,654 (15%)
- Flat: 820 (7%)
- Gambrel: 403 (4%)
- Mansard: 91 (1%)
- Shed: 69 (1%)
- Blank/unknown: 1,874 (17%)

### Confidence rules

- Calculate pitch only on straightforward Gable forms where roof-break geometry is unambiguous
- Cross-check calculated pitch against `ROOF_STRUCTURE` — flag mismatches
- Complex roofs, dormers, hip/valley intersections, ambiguous geometry → **Undetermined**

### Analytical purpose

The proposed "Sloped Roof Story" requirement for the third story in RD-2/RD-3:

- **Has no defined minimum pitch** in the July 2026 draft text
- **Has no dormer-size limit** relative to the roof face
- **Can be entirely waived** via the 5-foot sidewalk easement bonus (Section 20-6)

Existing roof-pitch data lets us objectively show what "sloped roof" actually means in the existing neighborhood fabric.

### Internal analysis

Analyze how much of a proposed third story could effectively become vertical/full-height through oversized dormers while technically retaining minimal sloped roof. This is an internal analytical finding for the Planning Department discussion flags.

---

# 24. ADUs

ADUs do NOT get a dedicated V1 page. They surface through property analysis and chat.

### Verified ADU rules from the draft legal text

**Detached ADU (Article 8 / Table A):**

- Allowed by right in RD-2; Conditional in RD-3/RD-4/RD-6
- Max floor plate: 900 sf or main building floor plate, whichever less
- Max height: 25' or main building height, whichever less
- Max stories: 2 (second story must be Sloped Roof Story)
- Must be at least 5' from any other structure on the lot
- One detached ADU per lot
- Owner-occupancy requirement **removed** (aligned with MA state law)
- Short-term rental prohibition **removed** (still subject to City STR Ordinance)

**Non-detached ADU:** No longer a distinct use category. Additional dwelling units within an existing structure are simply counted as regular dwelling units within the district's unit maximum. This simplifies the regulatory framework significantly.

---

# 25. FEEDBACK FLOW

### Primary CTA

Persistent, visually secondary: **Share your thoughts with Boston Planning →**

### Optional feedback builder

Guided reactions (Support / Concerned / No opinion) for categories that actually change for the searched property. AI drafts from resident's expressed opinions only. Resident reviews/edits/approves. Nothing submitted automatically. Always skippable.

### What the site does NOT do

- Submit feedback on resident's behalf
- Generate opinions
- Host petitions or advocacy CTAs

### Internal sentiment

Anonymous aggregate Support/Concerned/No opinion per category. Not public. Lightweight duplicate protection. Not a representative poll. Short disclosure to users.

**Flag for Zac:** Where and how prominently the feedback builder appears.

---

# 26. MEETINGS & DEADLINES

Homepage preview module + dedicated page. Past meeting recordings/materials when officially available. Content sourced from official City information.

---

# 27. SOURCES & METHODOLOGY

Every property result includes prominent Sources & Methodology: exact datasets used, what came from each, last-checked date, calculation methodology, known limitations.

## Data Sources

### GIS Layers (downloaded to `data/`)

| File                                         | Features | Source                                                                       |
| -------------------------------------------- | -------- | ---------------------------------------------------------------------------- |
| `proposed_zoning_subdistricts.geojson`       | 1,665    | Boston Planning GIS — Neighborhood Housing Zoning Subdistricts FeatureServer |
| `current_zoning_districts.geojson`           | 40       | Boston Planning GIS — Zoning Districts FeatureServer                         |
| `parcels_west_roxbury.geojson`               | 9,569    | Boston Planning GIS — FY25 Parcels with Planning/Zoning Data                 |
| `parcels_west_roxbury_buffer5ft.geojson`     | 9,527    | Boston Planning GIS — Parcels with 5ft Inward Buffer                         |
| `buildings_west_roxbury_roof_breaks.geojson` | 23,724   | Boston Planning GIS — Boston Buildings with Roof Breaks                      |
| `ma_municipalities.geojson`                  | 351      | MassGIS — Massachusetts Municipalities                                       |

### Assessor Data (downloaded to `data/`)

| File                               | Records | Source                                                                                  |
| ---------------------------------- | ------- | --------------------------------------------------------------------------------------- |
| `assessor_fy2026_west_roxbury.csv` | 11,100  | City of Boston FY2026 Property Assessment Data (data.boston.gov), filtered to ZIP 02132 |

Key assessor fields: `BLDG_TYPE`, `ROOF_STRUCTURE`, `ROOF_COVER`, `NUM_PARKING`, `RES_UNITS`, `LAND_SF`, `GROSS_AREA`, `LIVING_AREA`, `LU_DESC`, `STRUCTURE_CLASS`, `EXT_COND`, `OVERALL_COND`, `BED_RMS`, `FULL_BTH`, `HLF_BTH`, `TT_RMS`

### Legal Text

| File                                               | Source                                                                            |
| -------------------------------------------------- | --------------------------------------------------------------------------------- |
| `Neighborhood-Housing-Draft-Legal-Text_071626.pdf` | Boston Planning — Residential Zoning Draft Text Amendment, released July 17, 2026 |

### Webmap Configuration

| File               | Source                                                                                 |
| ------------------ | -------------------------------------------------------------------------------------- |
| `webmap_data.json` | ArcGIS webmap configuration defining all GIS layers, symbology, and filter expressions |

### GIS Service URLs

| Layer                        | URL                                                                                                                                                                   |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Proposed Zoning Subdistricts | `https://gis.bostonplans.org/hosting/rest/services/Neighborhood_Housing_Zoning_Subdistricts/FeatureServer/0`                                                          |
| Current Zoning Districts     | `https://gis.bostonplans.org/hosting/rest/services/Zoning_Districts/FeatureServer/0`                                                                                  |
| FY25 Parcels                 | `https://gis.bostonplans.org/hosting/rest/services/FY25_Parcels_with_Planning_Zoning_Data_UPDATED/FeatureServer/0`                                                    |
| Parcels (5ft buffer)         | `https://gis.bostonplans.org/hosting/rest/services/Hosted/Parcels_Planning_and_Zoning_FY25_with_Inward_Buffer_5ft/FeatureServer/0`                                    |
| Buildings with Roof Breaks   | `https://gis.bostonplans.org/hosting/rest/services/Boston_Buildings/FeatureServer/9`                                                                                  |
| MA Municipalities            | `https://services1.arcgis.com/hGdibHYSPO59RG1h/arcgis/rest/services/Massachusetts_Municipalities/FeatureServer/1`                                                     |
| FY2026 Assessor Data         | `https://data.boston.gov/dataset/e02c44d2-3c64-459c-8fe2-e1ce5f38a035/resource/ee73430d-96c0-423e-ad21-c4cfb54c8961/download/fy2026-property-assessment-data_rev.csv` |

---

# 28. ABOUT / HOW THIS WORKS

Short page: who it's for, neutrality principles, independence from City, data methodology overview, limitations, corrections process, link to detailed Sources & Methodology.

---

# 29. TERMINOLOGY / TOOLTIPS

Plain-English tooltips for: floor plate, lot coverage, permeable area, setback, stories, Sloped Roof Story, building lot coverage, cumulative side yard, ADU (detached), etc. Official definitions available underneath.

---

# 30. ZONING DISTRICT EXPLANATION

Do not recreate Boston Planning's explanation. Small info interaction: district name, "Your property-specific results below apply these rules," link to City materials. Our site applies the rules; the City explains the rules.

---

# 31. SHAREABILITY

Every useful layer has a shareable URL: property, block, street, sub-neighborhood, West Roxbury. No downloadable PDF in V1.

---

# 32. TECHNICAL / UX REQUIREMENTS

- **Mobile-first:** Four-column table adapts to metric cards on mobile
- **WCAG accessibility:** Keyboard nav, screen-reader labels, non-color-only indicators, sufficient contrast
- **English only** (architecture should allow later translation)
- **No login / no accounts**
- **No data retention** (no address search history, no newsletter, no contact database)

---

# 33. INTERNAL-ONLY ANALYTICS

Not exposed to public users in V1:

- **Amount-of-change / impact scoring** — parcel-by-parcel
- **Nonconformity / grandfathering risk flags** — per Section 14
- **Roof pitch / dormer analysis** — per Section 23
- **Easement bonus modeling** — what changes if the 5' easement is granted
- **Aggregate internal sentiment** — per Section 25

---

# 34. BOSTON PLANNING DEPARTMENT DISCUSSION FLAGS

Questions/concerns to raise with Planning. **NOT website features or advocacy positions.**

### Flag 1: Floor plate / covered porch treatment

The Building Floor Plate definition includes covered porches and covered balconies. Question whether West Roxbury should distinguish enclosed footprint from covered porches — treating a porch the same as enclosed building mass could discourage porches on lots that can accommodate both.

### Flag 2: Existing nonconformity + vertical expansion (CONFIRMED)

Section 20-5 explicitly allows vertical extension of nonconforming setbacks/permeability **within the existing floor plate** up to maximum height, subject to Sloped Roof Story. This means an existing oversized footprint can go to 35' with effectively no additional horizontal constraint. Combined with the undefined "Sloped Roof Story" (Flag 3), this could produce building mass substantially beyond the intended neighborhood context.

### Flag 3: Sloped Roof Story — undefined term (CONFIRMED)

The draft requires "Third Story must be a Sloped Roof Story" in RD-2/RD-3 but:

- **"Sloped Roof Story" is never defined** in the July 2026 draft text
- No minimum pitch
- No dormer-size limit
- No maximum dormer width as percentage of roof face
- No maximum dormer height relative to ridge

The requirement can also be **entirely waived** via the 5-foot sidewalk easement bonus (Section 20-6). A developer granting a sidewalk easement can build a full vertical third story with no sloped-roof constraint whatsoever.

Questions for Planning:

1. Does the draft establish any minimum pitch for "sloped roof"?
2. Does it limit dormer size relative to the roof face?
3. Is the easement-bonus waiver of the Sloped Roof Story requirement intentional?
4. If these limits don't exist, is that a gap to address before adoption?

### Flag 4: Parking elimination

Section 23-6(d) completely eliminates off-street parking requirements in all Residential Districts. Current West Roxbury assessor data shows most properties have 1–4 parking spaces. While the proposal doesn't require removing existing parking, it removes any zoning-level requirement to provide parking for new units or construction. This is a substantial change worth explicitly surfacing to residents.

### Flag 5: ADU owner-occupancy removal + STR eligibility

The draft removes the owner-occupancy requirement for detached ADUs (aligning with MA state law) and removes the zoning prohibition on short-term rentals in ADUs (subject to the City's STR Ordinance). Combined with the parking elimination and increased unit counts, this could change the practical character of some residential streets. Worth surfacing factually.

---

# 35. QA / RELEASE GATES

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

# 36. V1 VS LATER FEATURES

### V1

- Address search → property analysis (4-column table with verified Article 20 dimensional rules)
- Property summary (3–4 most material changes)
- Grandfathering/existing-condition communication
- Table B / Table C / Table D selection per property
- Lot-size tier determination
- Easement bonus scenario (secondary display)
- Nonconformity analysis (Section 20-5 rules)
- Parking elimination messaging
- Block / Street / Sub-neighborhood / West Roxbury aggregate views
- Proposed-zoning map with clickable parcels
- Roof pitch as analytical metric (where high confidence)
- Building character from assessor data
- Roof pitch + character in aggregate views
- AI chat (persistent, context-aware, source-grounded, citing Article 20)
- Homeowner-provided facts in chat
- Data corrections (text-only, anonymous)
- Feedback builder → Boston Planning official process
- Internal sentiment collection
- Meetings & Deadlines
- Past meeting recordings/materials
- Sources & Methodology
- About / How This Works
- Tooltips (including "Sloped Roof Story" with explanation that the term is undefined)
- Shareable URLs
- Mobile-first
- WCAG accessibility
- No login
- English only

### Later

- Lot diagram / visual (existing footprint vs. maximum buildable envelope)
- Photo/document upload for corrections
- Public aggregate sentiment display
- Proposal version comparison ("what changed since last draft")
- Multi-language support
- Downloadable property report/PDF
- Expanded geography (Jamaica Plain, Roslindale, Hyde Park)
- Conditional use (Table D) scenario modeling
- Economic constraint layer (if ever appropriate)

---

# 37. REQUIRED COMPUTATIONS (BUILD CHECKLIST)

1. **Spatial join:** Parcels → Proposed Zoning Subdistricts (determine proposed district per parcel)
2. **Assessor join:** Parcels (by `GIS_ID`) → Assessor FY2026 (by `GIS_ID`) for building type, roof structure, parking, units
3. **Lot-size tier:** Classify each parcel into ≤3800 / 3800–6899 / ≥6900 sf tiers using `EXIST_Lot_Size_Actual`
4. **Table selection:** Determine Table B vs Table C applicability per parcel (requires knowing if pre-2027 building is retained)
5. **Four-column comparison:** For each metric, populate Today's Law / Today's Reality / Proposed Law / Potential Outcome
6. **Setback estimation:** Calculate min distance from building footprint to each parcel boundary edge (front/side/rear)
7. **Roof pitch estimation:** For Gable-roof buildings, estimate pitch from roof-break elevation data + building width
8. **Nonconformity flags:** Compare Today's Reality to both Today's Law and Proposed Law for each dimensional metric
9. **Property summary generation:** Identify 3–4 most material changes per parcel
10. **Block/street/sub-neighborhood aggregation:** Group by street segment / street name / sub-neighborhood; compute medians + ranges
11. **Parking delta:** Current requirement vs. proposed requirement (0) vs. existing physical spaces
12. **Permeable area:** Invert impervious surface data
13. **Easement bonus modeling:** For each parcel, calculate what changes under Section 20-6 bonus

---

# 38. OPEN IMPLEMENTATION QUESTIONS FOR ZAC

1. **Feedback builder placement:** Where and how prominently does the guided reaction experience appear?

2. **Block definition edge cases:** Cul-de-sacs, dead-end streets, blocks with very few properties?

3. **Sub-neighborhood boundaries:** Which specific West Roxbury sub-communities to define at launch?

4. **Chat infrastructure:** What model/service backs the AI chat? How is Article 20 grounding enforced technically?

5. **Pre-2027 building determination:** How do we reliably determine whether a building existed before January 1, 2027 to select Table B vs Table C? Assessor `YR_BUILT` is available but may not be definitive for this legal determination.

6. **Easement bonus display:** Should the easement bonus scenario be shown proactively on every property, or only when a user asks / clicks "What if I grant the easement?"

7. **Sloped Roof Story tooltip:** How explicitly should we explain that this term is undefined in the draft? The factual statement is powerful; we want to be accurate without being advocacy-flavored.

8. **Existing analytical pipeline:** How much of the prior parcel analysis / QA framework / confidence scoring should be retained vs rebuilt?

---

# APPENDIX A: FULL PAGE-BY-PAGE SPECIFICATIONS

Every screen in the application, fully spec'd.

---

## A1. HOMEPAGE (`/`)

### Layout

```
┌──────────────────────────────────────────────────────────┐
│  [Logo: West Roxbury Zoning Analysis]                    │
│  Nav: Browse Map | Meetings | About | Sources            │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Boston is proposing new zoning for West Roxbury.        │
│  See what it means for your property.                    │
│                                                          │
│  ┌──────────────────────────────┐ ┌──────────────┐       │
│  │ Enter your address           │ │  Look it up  │       │
│  └──────────────────────────────┘ └──────────────┘       │
│                                                          │
│  Or browse the West Roxbury map →                        │
│                                                          │
│  ┌─ Independence notice ───────────────────────────────┐ │
│  │ This is an independent civic-data project.          │ │
│  │ Not affiliated with or endorsed by the City.        │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌─ Upcoming ──────────────────────────────────────────┐ │
│  │ Next meeting: [date] — [description]                │ │
│  │ View all meetings & deadlines →                     │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                          │
│  [Footer]                                                │
└──────────────────────────────────────────────────────────┘
```

### Components

**Address search input:**

- Autocomplete from West Roxbury address list (derived from parcels `ST_NUM` + `ST_NAME`)
- On submit: geocode → match to parcel `GIS_ID` → route to `/property/{GIS_ID}`
- If address not found: "We don't have data for that address. It may be outside West Roxbury or not yet in our database."
- If condo unit: resolve to underlying parcel, show note: "Zoning applies to the property as a whole, not individual units."

**Independence notice:**

- Always visible, not dismissable
- Navy left border, light surface background

**Upcoming meeting module:**

- Source: manually maintained JSON or CMS entry
- Shows: date, title, link to City page
- If no upcoming meeting: "No upcoming meetings scheduled. View past meetings →"

### Mobile

- Stack vertically
- Search input full-width
- Meeting module below fold

---

## A2. PROPERTY RESULT PAGE (`/property/{GIS_ID}`)

This is the heart of the product. Detailed layout:

### Section 1: Header

```
┌──────────────────────────────────────────────────────────┐
│  ← Back to search                                        │
│                                                          │
│  24 Example Street, West Roxbury                         │
│  Proposed zoning: RD-3 ⓘ                                │
│  Lot size: 7,200 sf                                      │
│                                                          │
│  [Share this property ↗]                                 │
└──────────────────────────────────────────────────────────┘
```

- `ⓘ` on district badge → tooltip: "RD-3 — Proposed Residential Dormer-3 district. View Boston Planning's materials →"
- Lot size shown because it determines the lot-coverage tier

### Section 2: Reassurance Banner

```
┌──────────────────────────────────────────────────────────┐
│ ✓ Your existing home can remain as it is.                │
│   Proposed zoning changes what may be permitted going    │
│   forward. It does not require your home to be altered.  │
└──────────────────────────────────────────────────────────┘
```

- Teal left border, light teal background
- Always present, not dismissable

### Section 3: Property Summary

```
┌──────────────────────────────────────────────────────────┐
│  What changes for this property?                         │
│                                                          │
│  • Maximum permitted height increases from 25' to 35'    │
│  • Maximum lot coverage increases from 20% to 30%        │
│  • One additional dwelling unit may be permitted          │
│  • Off-street parking is no longer required               │
└──────────────────────────────────────────────────────────┘
```

**Generation algorithm:**

```
for each metric in [units, height, stories, floor_plate, lot_coverage,
                     permeable_area, front_setback, side_setback,
                     rear_setback, parking]:
    delta = proposed_law[metric] - todays_law[metric]
    if abs(delta) > materiality_threshold[metric]:
        changes.append(format_change(metric, todays_law, proposed_law, delta))

sort changes by abs(delta_pct) descending
return changes[:4]
```

**Materiality thresholds:**

| Metric         | Threshold for "material"        |
| -------------- | ------------------------------- |
| Units          | Any change (≥1 unit difference) |
| Height         | ≥5 ft increase                  |
| Stories        | ≥1 story increase               |
| Floor plate    | ≥200 sf increase                |
| Lot coverage   | ≥5 percentage points            |
| Permeable area | ≥5 percentage points            |
| Setbacks (any) | ≥3 ft change                    |
| Parking        | Any change in requirement       |

### Section 4: Four-Column Comparison Table

Full table with all metrics. Desktop shows four columns; mobile converts to stacked metric cards.

**Desktop row structure:**

```
┌─────────────────┬────────────┬────────────┬────────────┬─────────────────┐
│ Metric ⓘ        │ Today's    │ Today's    │ Proposed   │ Potential        │
│                  │ Law        │ Reality    │ Law        │ Outcome          │
├─────────────────┼────────────┼────────────┼────────────┼─────────────────┤
│ Dwelling units  │ 1          │ 1          │ 3          │ Up to 2 add'l   │
│ Height (ft)     │ 35'        │ 25'        │ 35'        │ +10' possible   │
│ Stories         │ 2½         │ 2          │ 3 *        │ +1 story **     │
│ Floor plate     │ —          │ 1,400 sf   │ 2,000 sf   │ +600 sf avail.  │
│ Lot coverage    │ 30%        │ 19%        │ 30%        │ +792 sf avail.  │
│   (sq ft)       │ 2,160 sf   │ 1,368 sf   │ 2,160 sf   │                 │
│ Permeable area  │ —          │ 62%        │ 30% min    │ Meets proposed  │
│   (sq ft)       │ —          │ 4,464 sf   │ 2,160 sf   │                 │
│ Front setback   │ 20'        │ ~22' est.  │ 12'        │ Meets proposed  │
│ Side setback    │ 10' cum    │ ~14' est.  │ 15' cum    │ ⚠ Review needed │
│   (individual)  │ —          │ ~6' / ~8'  │ 3' min     │ Meets proposed  │
│ Rear setback    │ 25'        │ ~30' est.  │ 15'        │ Meets proposed  │
│ Parking         │ 2 required │ 2 spaces   │ 0 required │ No longer req'd │
│ Roof pitch      │ —          │ ~8:12 est. │ Sloped *** │                 │
│ Building type   │ —          │ Colonial   │ —          │ —               │
└─────────────────┴────────────┴────────────┴────────────┴─────────────────┘

*  Third story must be a Sloped Roof Story (undefined term — see ⓘ)
** Subject to Sloped Roof Story requirement
```

**Mobile card structure (per metric):**

```
┌──────────────────────────────────────────────┐
│ Dwelling Units ⓘ                             │
│                                              │
│ Today's Law        Today's Reality           │
│ 1 unit             1 unit                    │
│                                              │
│ Proposed Law       Potential Outcome         │
│ 3 units            Up to 2 additional        │
└──────────────────────────────────────────────┘
```

**Row-level visual indicators:**

- Default: no highlight
- Today's Reality differs from Today's Law: amber left border + amber dot
- Today's Reality differs from Proposed Law: navy left border
- Potential Outcome = "Needs review": amber background pill
- Setback values labeled "est." — tooltip: "Estimated from GIS building/parcel geometry. Not a professional survey."

### Section 5: Sloped Roof Story Note

If property is in RD-2 or RD-3, display after the table:

```
┌──────────────────────────────────────────────────────────┐
│ ⓘ About the "Sloped Roof Story" requirement             │
│                                                          │
│ The proposed zoning requires the third story in RD-2     │
│ and RD-3 to be a "Sloped Roof Story." The July 2026     │
│ draft does not define this term — there is no specified  │
│ minimum roof pitch and no limit on dormer size.          │
│                                                          │
│ Additionally, this requirement can be waived by          │
│ recording a 5-foot sidewalk easement (Section 20-6).    │
│                                                          │
│ Source: Article 20, Tables B & C; Section 20-6           │
└──────────────────────────────────────────────────────────┘
```

### Section 6: Easement Bonus Scenario

Collapsible section, closed by default:

```
▶ What if the sidewalk easement bonus is used? (Section 20-6)

[Expanded:]
By recording a 5-foot highway easement along the front lot line,
the following changes:

• Maximum units: 3 → 4
• Sloped Roof Story requirement: Waived (full vertical third story)
• Side yard minimum: 3' / 15' cumulative (unchanged in RD-3)
• Table C dimensional rules apply
```

### Section 7: Explore Your Block

```
┌──────────────────────────────────────────────────────────┐
│ Your Block                                               │
│                                                          │
│ Example Street (between Oak St and Elm St)               │
│ 14 properties on this block                              │
│                                                          │
│ Existing median height: 24 ft                            │
│ Proposed maximum height: 35 ft                           │
│                                                          │
│ Existing median lot coverage: 18%                        │
│ Proposed maximum lot coverage: 30%                       │
│                                                          │
│ Explore Your Block →                                     │
└──────────────────────────────────────────────────────────┘
```

### Section 8: Feedback CTA

```
┌──────────────────────────────────────────────────────────┐
│ Share your thoughts with Boston Planning →               │
└──────────────────────────────────────────────────────────┘
```

Visually secondary. Links to feedback flow (see A7).

### Section 9: Sources for This Property

```
┌──────────────────────────────────────────────────────────┐
│ Sources for this property                                │
│                                                          │
│ Proposed zoning: Boston Planning GIS (checked [date])    │
│ Parcel data: FY25 Parcels, Boston Planning (checked [d]) │
│ Building data: Boston Buildings GIS (checked [date])     │
│ Assessor data: FY2026 Property Assessment (checked [d])  │
│ Zoning rules: Draft Text Amendment, July 17, 2026       │
│                                                          │
│ View full methodology →                                  │
└──────────────────────────────────────────────────────────┘
```

### Floating Elements

- **Chat button:** Bottom-right corner, navy circle with chat icon. Opens chat drawer.
- **Feedback CTA:** If not visible in scroll position, appears as subtle floating bar at bottom.

---

## A3. BLOCK VIEW (`/block/{block_id}`)

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
│  20 Example St — RD-3 — 1 unit — 24' — Colonial         │
│  22 Example St — RD-3 — 1 unit — 22' — Cape             │
│  24 Example St — RD-3 — 1 unit — 25' — Colonial  ← you │
│  26 Example St — RD-3 — 2 units — 28' — Colonial        │
│  ...                                                     │
│                                                          │
│  Click any property to see its full analysis →           │
├──────────────────────────────────────────────────────────┤
│  View your street → | View West Roxbury →                │
└──────────────────────────────────────────────────────────┘
```

### Stat cards computation

```
for each metric:
    values = [parcel[metric] for parcel in block_parcels
              if parcel[metric] is not None and confidence >= threshold]
    median = np.median(values)
    range_min = min(values)
    range_max = max(values)
    proposed = get_proposed_value(metric, proposed_district)
```

---

## A4. STREET VIEW (`/street/{street_name}`)

Same framework as Block View but scoped to the full named street within West Roxbury.

Header: "Example Street, West Roxbury — 42 properties"

Additional content vs Block View:

- If street spans multiple proposed districts: show district distribution ("28 parcels RD-3, 14 parcels RD-2")
- Block-by-block breakdown option: "View by block" shows collapsible sections per block segment
- Larger map showing the full street with parcels colored by proposed district

---

## A5. SUB-NEIGHBORHOOD VIEW (`/area/{area_slug}`)

Same framework at sub-neighborhood scope.

Header: "Bellevue Hill — 340 properties"

Additional content:

- Boundary note: "Boundary based on [official City definition / locally recognized boundary]"
- District distribution across the area
- If boundary is not official: "This boundary is based on locally recognized community geography, not an official City designation."

---

## A6. WEST ROXBURY OVERVIEW (`/overview`)

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
│  [Same stat card grid as Block View, neighborhood-wide]  │
│                                                          │
│  Building Character Distribution                         │
│  [Horizontal bar chart or distribution]                  │
│                                                          │
│  Browse by Sub-neighborhood                              │
│  • Bellevue Hill (340 properties) →                      │
│  • [Other areas] →                                       │
│                                                          │
│  Browse by Street                                        │
│  • [Alphabetical street list with property counts] →     │
└──────────────────────────────────────────────────────────┘
```

---

## A7. FEEDBACK FLOW (`/feedback` or modal)

### Step 1: Reactions (optional)

```
┌──────────────────────────────────────────────────────────┐
│  What do you think about the proposed changes?           │
│                                                          │
│  [Only show categories that actually change for this     │
│   property/block]                                        │
│                                                          │
│  Height (25' → 35'):  [Support] [Concerned] [No opinion] │
│  Units (1 → 3):      [Support] [Concerned] [No opinion] │
│  Lot coverage:        [Support] [Concerned] [No opinion] │
│  Parking (2 → 0 req): [Support] [Concerned] [No opinion] │
│                                                          │
│  Anything else you want the City to know?                │
│  ┌──────────────────────────────────────────────────┐    │
│  │ [Optional free text]                              │    │
│  └──────────────────────────────────────────────────┘    │
│                                                          │
│  [Generate draft] or [Skip — go to Boston Planning →]    │
│                                                          │
│  ⓘ Your anonymous reactions are aggregated for internal │
│    analysis. We do not submit anything on your behalf.   │
└──────────────────────────────────────────────────────────┘
```

### Step 2: Draft review (if not skipped)

```
┌──────────────────────────────────────────────────────────┐
│  Here's a draft based on what you told us:               │
│                                                          │
│  "I'm a resident at [address/block]. Regarding the       │
│   proposed RD-3 zoning: I support the changes to lot     │
│   coverage but am concerned about the increase in        │
│   permitted height from 25' to 35' and the elimination   │
│   of parking requirements. [User's additional text]"     │
│                                                          │
│  [Edit this draft]                                       │
│                                                          │
│  [Continue to Boston Planning's feedback form →]         │
│                                                          │
│  This draft was generated from YOUR expressed opinions.  │
│  Review it carefully before submitting to the City.      │
└──────────────────────────────────────────────────────────┘
```

### Step 3: Handoff

Opens Boston Planning's official feedback submission URL in a new tab. User copies their draft and submits through the City's process.

---

## A8. BROWSE MAP (`/map`)

```
┌──────────────────────────────────────────────────────────┐
│  [Nav bar]                                               │
├──────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────┐                   │
│  │ Search: [Enter address]           │                   │
│  └────────────────────────────────────┘                   │
│  ┌──────────────────────────────────────────────────────┐ │
│  │                                                      │ │
│  │              [Full-width map]                         │ │
│  │                                                      │ │
│  │   All West Roxbury parcels                           │ │
│  │   Colored by proposed district:                      │ │
│  │     ■ RD-2 (lightest)                                │ │
│  │     ■ RD-3                                           │ │
│  │     ■ RD-4                                           │ │
│  │     ■ RD-6 (darkest)                                 │ │
│  │                                                      │ │
│  │   Click any parcel → property popup                  │ │
│  │                                                      │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                          │
│  [Legend] [Zoom controls] [Reset view]                   │
└──────────────────────────────────────────────────────────┘
```

**Map interaction:**

- Click parcel → popup with: address, proposed district, existing height, existing units, "View full analysis →"
- Address search → fly to parcel, open popup
- Map library: Mapbox GL JS or Leaflet with GeoJSON overlay
- Parcel polygons from `parcels_west_roxbury.geojson`
- Color by proposed district (determined via spatial join to `proposed_zoning_subdistricts.geojson`)

---

## A9. MEETINGS & DEADLINES (`/meetings`)

```
┌──────────────────────────────────────────────────────────┐
│  Meetings & Deadlines                                    │
│                                                          │
│  UPCOMING                                                │
│  ┌────────────────────────────────────────────────────┐   │
│  │ [Date] — [Meeting title]                           │   │
│  │ [Time] | [Location/virtual link]                   │   │
│  │ [Link to City page →]                              │   │
│  └────────────────────────────────────────────────────┘   │
│                                                          │
│  PAST MEETINGS                                           │
│  ┌────────────────────────────────────────────────────┐   │
│  │ [Date] — [Meeting title]                           │   │
│  │ [Recording →] [Presentation materials →]           │   │
│  └────────────────────────────────────────────────────┘   │
│  (repeat for each past meeting)                          │
│                                                          │
│  Stay informed: [Link to City newsletter signup →]       │
└──────────────────────────────────────────────────────────┘
```

Data: manually maintained JSON file or simple CMS. Each entry:

```json
{
  "date": "2026-09-15",
  "title": "West Roxbury Community Meeting",
  "time": "6:30 PM",
  "location": "West Roxbury Library",
  "city_url": "https://...",
  "recording_url": null,
  "materials_url": null,
  "is_past": false
}
```

---

## A10. ABOUT / HOW THIS WORKS (`/about`)

```
┌──────────────────────────────────────────────────────────┐
│  About This Site                                         │
│                                                          │
│  West Roxbury Zoning Analysis is an independent          │
│  civic-data project that helps West Roxbury residents    │
│  understand what Boston's proposed Neighborhood Housing   │
│  zoning changes mean for their property and community.   │
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
│  FOUND AN ERROR?                                         │
│  Submit a correction →                                   │
│                                                          │
│  View detailed sources & methodology →                   │
└──────────────────────────────────────────────────────────┘
```

---

## A11. SOURCES & METHODOLOGY (`/sources`)

Full-page version of the per-property sources section. Lists all data sources with URLs, dates, field descriptions, calculation methodology for each metric, and known limitations. Content already documented in Section 27 of the main spec.

---

## A12. CHAT INTERFACE

**Trigger:** Floating navy circle button, bottom-right, with chat icon.

**Drawer:** Slides in from right on desktop, full-screen on mobile.

```
┌──────────────────────────────┐
│ Ask about zoning        [✕]  │
├──────────────────────────────┤
│                              │
│ [Context: Viewing 24         │
│  Example St, RD-3]           │
│                              │
│ User: Could I add another    │
│ story?                       │
│                              │
│ Bot: Based on your           │
│ property's existing height   │
│ of 25' and the proposed      │
│ maximum of 35', an           │
│ additional story appears     │
│ possible. Note that in       │
│ RD-3, the third story must   │
│ be a "Sloped Roof Story"     │
│ (Article 20, Table B).       │
│                              │
│ Source: Draft Text Amendment  │
│ Table B; parcel data         │
│                              │
├──────────────────────────────┤
│ [Type a question...]  [Send] │
└──────────────────────────────┘
```

**Context awareness:** Chat receives the current page context (property GIS_ID, block ID, or view level) and can reference the specific parcel data without the user restating their address.

---

## A13. DATA CORRECTION FORM (`/correct` or modal)

```
┌──────────────────────────────────────────────────────────┐
│  Submit a Correction                                     │
│                                                          │
│  Property: 24 Example Street (auto-filled if from        │
│  property page)                                          │
│                                                          │
│  What needs correcting?                                  │
│  ┌──────────────────────────────────────────────────┐    │
│  │ [Text area — describe what's wrong and what      │    │
│  │  the correct information is]                     │    │
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

---

## A14. ERROR / NOT FOUND STATES

**Address not found:**

> "We don't have data for that address. It may be outside West Roxbury, or not yet in our database."
> [Try another address] [Browse the map instead]

**Property data incomplete:**

> "We have limited data for this property. Some calculations may show 'Needs property-specific review.'"

**Service error:**

> "Something went wrong loading this property. Please try again."
> [Retry] [Go to homepage]

---

# APPENDIX B: COMPUTATION FORMULAS

Pseudocode for every calculation the system performs.

---

## B1. SPATIAL JOIN — Parcels to Proposed Districts

```python
import geopandas as gpd

parcels = gpd.read_file("data/parcels_west_roxbury.geojson")
proposed = gpd.read_file("data/proposed_zoning_subdistricts.geojson")

# Filter proposed to the relevant 'CH' districts
proposed_ch = proposed[proposed["Comments"] == "CH"]

# Spatial join: each parcel gets its proposed district
parcels_with_proposed = gpd.sjoin(
    parcels,
    proposed_ch[["Zoning_Subdistrict", "Max_Height", "Max_FAR",
                  "Front_Setback", "Side_Setback", "Rear_Setback",
                  "Max_Number_of_Floors", "Dwelling_Units_Factor",
                  "geometry"]],
    how="left",
    predicate="intersects"
)

# Parcels not intersecting any proposed district → "No proposed change"
```

---

## B2. ASSESSOR JOIN

```python
import pandas as pd

assessor = pd.read_csv("data/assessor_fy2026_west_roxbury.csv")

# Join on GIS_ID
parcels_full = parcels_with_proposed.merge(
    assessor[["GIS_ID", "BLDG_TYPE", "ROOF_STRUCTURE", "NUM_PARKING",
              "RES_UNITS", "LAND_SF", "GROSS_AREA", "LIVING_AREA",
              "LU_DESC", "YR_BUILT", "RES_FLOOR", "CD_FLOOR"]],
    on="GIS_ID",
    how="left"
)
```

---

## B3. LOT-SIZE TIER CLASSIFICATION

```python
def get_lot_tier(lot_size_sf):
    if lot_size_sf <= 3800:
        return "small"       # ≤ 3,800 sf
    elif lot_size_sf <= 6899:
        return "medium"      # 3,800 – 6,899 sf
    else:
        return "large"       # ≥ 6,900 sf

parcels_full["lot_tier"] = parcels_full["EXIST_Lot_Size_Actual"].apply(get_lot_tier)
```

---

## B4. TABLE SELECTION (B vs C)

```python
def get_applicable_table(yr_built):
    """
    Table C applies when adding units to a lot that retains
    a building built before January 1, 2027.
    For V1, assume all existing buildings qualify (YR_BUILT < 2027).
    Table B applies to new construction.
    Default to Table C for existing properties (conservative for homeowner).
    """
    if yr_built is not None and yr_built < 2027:
        return "C"
    return "B"
```

---

## B5. LOT COVERAGE LOOKUP

```python
LOT_COVERAGE_MAX = {
    "B": {
        "RD-2": {"small": 0.25, "medium": 0.25, "large": 0.25},
        "RD-3": {"small": 0.35, "medium": 0.35, "large": 0.30},
        "RD-4": {"small": 0.40, "medium": 0.55, "large": 0.30},
        "RD-6": {"small": 0.60, "medium": 0.55, "large": 0.30},
    },
    "C": {
        "RD-2": {"small": 0.30, "medium": 0.30, "large": 0.30},
        "RD-3": {"small": 0.35, "medium": 0.35, "large": 0.30},
        # RD-4/RD-6 Table C defers to Table B for some tiers
        "RD-4": {"small": 0.45, "medium": 0.55, "large": 0.30},
        "RD-6": {"small": 0.60, "medium": 0.55, "large": 0.30},
    }
}

def get_proposed_lot_coverage_max(district, lot_tier, table):
    return LOT_COVERAGE_MAX[table][district][lot_tier]
```

---

## B6. SETBACK ESTIMATION

```python
from shapely.geometry import shape
from shapely.ops import nearest_points

def estimate_setbacks(parcel_geom, building_geom, front_lot_line):
    """
    Estimate front, side, and rear setbacks from building footprint
    to parcel boundary.

    front_lot_line: the parcel boundary edge facing the street
    (identified by proximity to street centerline or address point)
    """
    parcel = shape(parcel_geom)
    building = shape(building_geom)
    boundary = parcel.boundary

    # Front setback: min distance from building to front lot line
    front_setback = building.distance(front_lot_line)

    # Rear setback: distance from building to the boundary segment
    # opposite the front lot line (farthest from street)
    rear_line = get_rear_lot_line(parcel, front_lot_line)
    rear_setback = building.distance(rear_line)

    # Side setbacks: distance to each side boundary segment
    left_line, right_line = get_side_lot_lines(parcel, front_lot_line)
    left_setback = building.distance(left_line)
    right_setback = building.distance(right_line)

    cumulative_side = left_setback + right_setback
    min_side = min(left_setback, right_setback)

    return {
        "front": round(front_setback, 1),
        "rear": round(rear_setback, 1),
        "side_cumulative": round(cumulative_side, 1),
        "side_min": round(min_side, 1),
        "side_left": round(left_setback, 1),
        "side_right": round(right_setback, 1),
        "confidence": "estimated"  # always GIS estimate
    }
```

---

## B7. ROOF PITCH ESTIMATION

```python
import numpy as np

def estimate_roof_pitch(building_parts, assessor_roof_structure):
    """
    Estimate roof pitch from building roof-break elevation data.

    building_parts: list of roof-break features for this building
    Each has: GRND_ELEV_2010, ROOF_ELEV_2010, BLDG_HGT_2010, geometry

    Returns pitch as rise:12 (e.g., 8:12) or "Undetermined"
    """
    # Only attempt for Gable roofs
    if assessor_roof_structure not in ("G", "G - Gable"):
        return {"pitch": "Undetermined", "confidence": "low",
                "reason": "Non-gable roof form"}

    if len(building_parts) < 2:
        return {"pitch": "Undetermined", "confidence": "low",
                "reason": "Insufficient roof-break segments"}

    # Find the ridge (highest point) and eave (lowest roof point)
    roof_elevs = [p["ROOF_ELEV_2010"] for p in building_parts
                  if p["ROOF_ELEV_2010"] is not None]
    if not roof_elevs:
        return {"pitch": "Undetermined", "confidence": "low",
                "reason": "Missing elevation data"}

    ridge_elev = max(roof_elevs)
    eave_elev = min(roof_elevs)
    rise = ridge_elev - eave_elev

    if rise <= 0:
        return {"pitch": "Undetermined", "confidence": "low",
                "reason": "No elevation difference between segments"}

    # Estimate run from building width (perpendicular to ridge)
    # Use building geometry bounding box as proxy
    building_geom = get_combined_geometry(building_parts)
    bbox = building_geom.minimum_rotated_rectangle
    coords = list(bbox.exterior.coords)
    widths = [
        np.sqrt((coords[1][0]-coords[0][0])**2 + (coords[1][1]-coords[0][1])**2),
        np.sqrt((coords[2][0]-coords[1][0])**2 + (coords[2][1]-coords[1][1])**2)
    ]
    run = min(widths) / 2  # half the narrower dimension = run

    if run <= 0:
        return {"pitch": "Undetermined", "confidence": "low",
                "reason": "Cannot determine building width"}

    # Pitch as rise per 12 units of run
    pitch_ratio = (rise / run) * 12
    pitch_rounded = round(pitch_ratio)

    # Sanity check: typical residential pitches are 4:12 to 12:12
    if pitch_rounded < 2 or pitch_rounded > 16:
        return {"pitch": "Undetermined", "confidence": "low",
                "reason": f"Calculated pitch {pitch_rounded}:12 outside typical range"}

    return {
        "pitch": f"{pitch_rounded}:12",
        "rise_ft": round(rise, 1),
        "run_ft": round(run, 1),
        "confidence": "moderate"
    }
```

---

## B8. NONCONFORMITY DETECTION

```python
def detect_nonconformities(parcel, current_zoning, proposed_zoning):
    """
    Compare existing conditions against both current and proposed standards.
    Returns list of nonconformity flags.
    """
    flags = []

    checks = [
        ("lot_coverage", parcel["PctLotCoverage"],
         current_zoning["max_lot_coverage"], proposed_zoning["max_lot_coverage"]),
        ("height", parcel["EXIST_BLDG_HGT_2010"],
         current_zoning["max_height"], proposed_zoning["max_height"]),
        ("front_setback", parcel["est_front_setback"],
         current_zoning["min_front_yard"], proposed_zoning["min_front_yard"]),
        ("side_setback_cum", parcel["est_side_cumulative"],
         current_zoning["min_side_cumulative"], proposed_zoning["min_side_cumulative"]),
        ("rear_setback", parcel["est_rear_setback"],
         current_zoning["min_rear_yard"], proposed_zoning["min_rear_yard"]),
    ]

    for metric, existing, current_std, proposed_std in checks:
        if existing is None:
            continue

        # For maximums (coverage, height): nonconforming if existing > standard
        # For minimums (setbacks, permeable): nonconforming if existing < standard
        is_max_metric = metric in ("lot_coverage", "height")

        if is_max_metric:
            current_nc = existing > current_std if current_std else False
            proposed_nc = existing > proposed_std if proposed_std else False
        else:
            current_nc = existing < current_std if current_std else False
            proposed_nc = existing < proposed_std if proposed_std else False

        if current_nc or proposed_nc:
            flags.append({
                "metric": metric,
                "existing": existing,
                "current_standard": current_std,
                "proposed_standard": proposed_std,
                "nonconforming_current": current_nc,
                "nonconforming_proposed": proposed_nc,
                "becomes_conforming": current_nc and not proposed_nc,
                "becomes_nonconforming": not current_nc and proposed_nc,
            })

    # Classify overall risk
    if not flags:
        risk = "none"
    elif any(f["nonconforming_current"] and f["nonconforming_proposed"]
             for f in flags):
        risk = "likely"
    elif len(flags) >= 2:
        risk = "likely"
    else:
        risk = "potential"

    return {"risk": risk, "flags": flags}
```

---

## B9. PROPERTY SUMMARY GENERATION

```python
def generate_summary(parcel, current_zoning, proposed_zoning):
    """
    Identify the 3-4 most material changes for plain-English summary.
    """
    changes = []

    # Units
    current_units = current_zoning.get("max_units", 1)
    proposed_units = proposed_zoning.get("max_units", 1)
    if proposed_units > current_units:
        changes.append({
            "metric": "units",
            "magnitude": proposed_units - current_units,
            "text": f"Maximum permitted dwelling units increases from "
                    f"{current_units} to {proposed_units}."
        })

    # Height
    current_h = current_zoning.get("max_height")
    proposed_h = proposed_zoning.get("max_height")
    if current_h and proposed_h and abs(proposed_h - current_h) >= 5:
        changes.append({
            "metric": "height",
            "magnitude": proposed_h - current_h,
            "text": f"Maximum permitted height changes from "
                    f"{current_h}' to {proposed_h}'."
        })

    # Lot coverage
    current_lc = current_zoning.get("max_lot_coverage")
    proposed_lc = proposed_zoning.get("max_lot_coverage")
    if current_lc and proposed_lc and abs(proposed_lc - current_lc) >= 0.05:
        changes.append({
            "metric": "lot_coverage",
            "magnitude": proposed_lc - current_lc,
            "text": f"Maximum lot coverage changes from "
                    f"{current_lc*100:.0f}% to {proposed_lc*100:.0f}%."
        })

    # Parking (always material if it changes)
    if proposed_zoning.get("parking_required", 0) == 0:
        changes.append({
            "metric": "parking",
            "magnitude": 1,
            "text": "Off-street parking is no longer required by zoning."
        })

    # Permeable area
    current_pa = current_zoning.get("min_permeable")
    proposed_pa = proposed_zoning.get("min_permeable")
    if current_pa and proposed_pa and abs(proposed_pa - current_pa) >= 0.05:
        changes.append({
            "metric": "permeable",
            "magnitude": abs(proposed_pa - current_pa),
            "text": f"Minimum permeable lot area changes from "
                    f"{current_pa*100:.0f}% to {proposed_pa*100:.0f}%."
        })

    # Setbacks (summarize if any material change)
    for sb in ["front", "side_cumulative", "rear"]:
        current_sb = current_zoning.get(f"min_{sb}_setback")
        proposed_sb = proposed_zoning.get(f"min_{sb}_setback")
        if current_sb and proposed_sb and abs(proposed_sb - current_sb) >= 3:
            label = sb.replace("_", " ").title()
            changes.append({
                "metric": f"setback_{sb}",
                "magnitude": abs(proposed_sb - current_sb),
                "text": f"{label} setback changes from "
                        f"{current_sb}' to {proposed_sb}'."
            })

    # Sort by magnitude (largest changes first), take top 4
    changes.sort(key=lambda c: abs(c["magnitude"]), reverse=True)
    return changes[:4]
```

---

## B10. BLOCK AGGREGATION

```python
def compute_block_stats(block_parcels, metric_field, proposed_field=None):
    """
    Compute median + range for a metric across block parcels.
    """
    values = [p[metric_field] for p in block_parcels
              if p[metric_field] is not None]

    if not values:
        return None

    return {
        "median": round(np.median(values), 1),
        "min": round(min(values), 1),
        "max": round(max(values), 1),
        "count": len(values),
        "proposed": proposed_field  # e.g., "35'" or "30%"
    }

def compute_character_distribution(block_parcels):
    """
    Distribution of building types on the block.
    """
    types = {}
    for p in block_parcels:
        bt = p.get("BLDG_TYPE", "Undetermined") or "Undetermined"
        bt = BLDG_TYPE_LABELS.get(bt, bt)
        types[bt] = types.get(bt, 0) + 1

    total = sum(types.values())
    return {k: {"count": v, "pct": round(v/total*100)}
            for k, v in sorted(types.items(), key=lambda x: -x[1])}

BLDG_TYPE_LABELS = {
    "CL": "Colonial", "CP": "Cape", "BW": "Bungalow",
    "RN": "Ranch", "RR": "Raised Ranch", "SL": "Split Level",
    "TF": "Two Family", "DX": "Duplex", "TH": "Townhouse",
    "CV": "Conventional", "LR": "Low Rise", "FS": "Free Standing",
    "99": "Vacant Lot", "NoBld": "No Building",
}
```

---

## B11. CURRENT ZONING LOOKUP (Today's Law)

West Roxbury is currently zoned primarily 1F-6000 and 2F-6000, with some pockets of other districts. The "Today's Law" column is populated from the parcel's current zoning subdistrict.

```python
CURRENT_ZONING = {
    "1F-6000": {
        "max_units": 1,
        "max_height": 35,
        "max_stories": 2.5,
        "max_lot_coverage": 0.30,
        "min_front_yard": 20,
        "min_rear_yard": 25,
        "min_side_cumulative": 20,
        "min_side_individual": 5,
        "min_permeable": None,  # not specified in current code
        "parking_per_unit": 2,
    },
    "2F-6000": {
        "max_units": 2,
        "max_height": 35,
        "max_stories": 2.5,
        "max_lot_coverage": 0.35,
        "min_front_yard": 15,
        "min_rear_yard": 25,
        "min_side_cumulative": 15,
        "min_side_individual": 5,
        "min_permeable": None,
        "parking_per_unit": 2,
    },
    # Add other current districts found in data as needed
}

def get_current_zoning_rules(parcel):
    district = parcel.get("Zoning_Subdistrict") or parcel.get("ZONE_")
    return CURRENT_ZONING.get(district, CURRENT_ZONING["1F-6000"])
```

## B12. PROPOSED ZONING FULL LOOKUP

```python
PROPOSED_ZONING = {
    "RD-2": {
        "max_units": 2,  # 3 if pre-2027 building
        "max_height": 35,
        "max_stories": 3,
        "third_story_sloped_roof": True,
        "max_floor_plate_B": 2200,
        "max_floor_plate_C": 2600,
        "max_lot_coverage": {"small": 0.25, "medium": 0.25, "large": 0.25},
        "max_lot_coverage_C": {"small": 0.30, "medium": 0.30, "large": 0.30},
        "min_permeable": 0.45,
        "min_front_yard": 15,
        "min_rear_yard_B": 20,
        "min_rear_yard_C": 10,
        "min_side_cumulative_B": 20,
        "min_side_cumulative_C": 10,
        "min_side_individual": 3,
        "parking_required": 0,
        "easement_bonus": {
            "max_units": 3,  # 4 if pre-2027
            "sloped_roof_waived": True,
            "side_cumulative": 25,
        },
    },
    "RD-3": {
        "max_units": 3,
        "max_height": 35,
        "max_stories": 3,
        "third_story_sloped_roof": True,
        "max_floor_plate_B": 2000,
        "max_floor_plate_C": 2400,
        "max_lot_coverage": {"small": 0.35, "medium": 0.35, "large": 0.30},
        "max_lot_coverage_C": {"small": 0.35, "medium": 0.35, "large": 0.30},
        "min_permeable": 0.30,
        "min_front_yard": 12,
        "min_rear_yard_B": 15,
        "min_rear_yard_C": 10,
        "min_side_cumulative_B": 15,
        "min_side_cumulative_C": 15,
        "min_side_individual": 3,
        "parking_required": 0,
        "easement_bonus": {
            "max_units": 4,
            "sloped_roof_waived": True,
            "side_cumulative": 15,
        },
    },
    "RD-4": {
        "max_units": 4,
        "max_height": 45,
        "max_stories": 3,
        "third_story_sloped_roof": False,
        "max_floor_plate_B": 2200,
        "max_floor_plate_C": 2600,
        "max_lot_coverage": {"small": 0.40, "medium": 0.55, "large": 0.30},
        "max_lot_coverage_C": {"small": 0.45, "medium": 0.55, "large": 0.30},
        "min_permeable": 0.25,
        "min_front_yard": 8,
        "min_rear_yard_B": 10,
        "min_rear_yard_C": 10,
        "min_side_cumulative_B": 10,
        "min_side_cumulative_C": 10,
        "min_side_individual": 3,
        "parking_required": 0,
        "easement_bonus": {
            "max_units": 6,
            "sloped_roof_waived": False,
            "side_cumulative": 15,
        },
    },
    "RD-6": {
        "max_units": 6,
        "max_height": 45,
        "max_stories": 4,
        "third_story_sloped_roof": False,
        "max_floor_plate_B": 2200,
        "max_floor_plate_C": 2600,
        "max_lot_coverage": {"small": 0.60, "medium": 0.55, "large": 0.30},
        "max_lot_coverage_C": {"small": 0.60, "medium": 0.55, "large": 0.30},
        "min_permeable": 0.15,
        "min_front_yard": 4,
        "min_rear_yard_B": 10,
        "min_rear_yard_C": 10,
        "min_side_cumulative_B": 10,
        "min_side_cumulative_C": 10,
        "min_side_individual": 3,
        "parking_required": 0,
        "easement_bonus": {
            "max_units": 16,
            "sloped_roof_waived": False,
            "side_cumulative": 10,
            "side_min": 5,
            "front_yard": 6,
            "rear_yard": 10,
        },
    },
}
```

---

## B13. POTENTIAL OUTCOME ENGINE (FULL)

```python
def compute_potential_outcome(parcel, current_zoning, proposed_zoning, table):
    """
    The full Potential Outcome computation for a single parcel.
    Returns the fourth column of the comparison table.
    """
    lot_size = parcel["EXIST_Lot_Size_Actual"]
    lot_tier = get_lot_tier(lot_size)
    existing_fp = parcel.get("EXIST_Bldg_Ftprt")
    existing_height = parcel.get("EXIST_BLDG_HGT_2010")
    district = parcel["proposed_district"]
    rules = PROPOSED_ZONING[district]

    outcomes = {}

    # --- UNITS ---
    proposed_max = rules["max_units"]
    existing_units = parcel.get("EXIST_Total_Res_Units", 1)
    if proposed_max > existing_units:
        outcomes["units"] = {
            "text": f"Up to {proposed_max - existing_units} additional unit(s)",
            "value": proposed_max,
            "delta": proposed_max - existing_units,
        }
    else:
        outcomes["units"] = {"text": "No additional units", "value": existing_units}

    # --- HEIGHT ---
    proposed_h = rules["max_height"]
    if existing_height and proposed_h > existing_height:
        outcomes["height"] = {
            "text": f"+{proposed_h - existing_height:.0f}' possible",
            "value": proposed_h,
            "delta": proposed_h - existing_height,
        }
    elif existing_height and existing_height > proposed_h:
        outcomes["height"] = {
            "text": "Existing exceeds proposed max (may remain)",
            "value": existing_height,
        }
    else:
        outcomes["height"] = {"text": "No change", "value": existing_height}

    # --- FLOOR PLATE ---
    fp_key = f"max_floor_plate_{table}"
    proposed_fp = rules[fp_key]
    if existing_fp:
        if proposed_fp > existing_fp:
            outcomes["floor_plate"] = {
                "text": f"+{proposed_fp - existing_fp:.0f} sf available",
                "value": proposed_fp,
                "delta": proposed_fp - existing_fp,
            }
        elif existing_fp > proposed_fp:
            outcomes["floor_plate"] = {
                "text": f"Existing exceeds proposed max by "
                        f"{existing_fp - proposed_fp:.0f} sf (may remain)",
                "value": existing_fp,
            }
        else:
            outcomes["floor_plate"] = {"text": "At proposed max", "value": proposed_fp}
    else:
        outcomes["floor_plate"] = {"text": "Needs property-specific review"}

    # --- LOT COVERAGE ---
    lc_key = f"max_lot_coverage{'_C' if table == 'C' else ''}"
    proposed_lc = rules[lc_key][lot_tier]
    existing_lc = parcel.get("PctLotCoverage")
    if existing_lc is not None and lot_size:
        existing_lc_dec = existing_lc / 100 if existing_lc > 1 else existing_lc
        proposed_lc_sf = proposed_lc * lot_size
        existing_lc_sf = existing_lc_dec * lot_size
        if proposed_lc > existing_lc_dec:
            outcomes["lot_coverage"] = {
                "text": f"+{proposed_lc_sf - existing_lc_sf:.0f} sf available",
                "value_pct": proposed_lc * 100,
                "value_sf": proposed_lc_sf,
            }
        else:
            outcomes["lot_coverage"] = {
                "text": "Meets proposed" if existing_lc_dec <= proposed_lc
                        else "Existing exceeds proposed (may remain)",
            }
    else:
        outcomes["lot_coverage"] = {"text": "Needs property-specific review"}

    # --- PERMEABLE AREA ---
    perm = compute_permeable_area(parcel)
    proposed_perm = rules["min_permeable"]
    if perm["pct"] is not None:
        if perm["pct"] / 100 >= proposed_perm:
            outcomes["permeable"] = {"text": "Meets proposed minimum"}
        else:
            deficit = (proposed_perm * lot_size) - perm["sf"]
            outcomes["permeable"] = {
                "text": f"Below proposed minimum by ~{deficit:.0f} sf",
            }
    else:
        outcomes["permeable"] = {"text": "Needs property-specific review"}

    # --- SETBACKS ---
    for sb_type in ["front", "rear"]:
        key = f"min_{sb_type}_yard_{'C' if table == 'C' else 'B'}"
        proposed_sb = rules.get(key) or rules.get(f"min_{sb_type}_yard")
        est = parcel.get(f"est_{sb_type}_setback")
        if est is not None and proposed_sb:
            if est >= proposed_sb:
                outcomes[f"{sb_type}_setback"] = {"text": "Meets proposed"}
            else:
                outcomes[f"{sb_type}_setback"] = {
                    "text": f"~{proposed_sb - est:.0f}' short of proposed minimum",
                }
        else:
            outcomes[f"{sb_type}_setback"] = {
                "text": "Needs property-specific review",
            }

    # Cumulative side
    cum_key = f"min_side_cumulative_{'C' if table == 'C' else 'B'}"
    proposed_cum = rules[cum_key]
    est_cum = parcel.get("est_side_cumulative")
    est_min = parcel.get("est_side_min")
    if est_cum is not None:
        if est_cum >= proposed_cum and (est_min or 0) >= rules["min_side_individual"]:
            outcomes["side_setback"] = {"text": "Meets proposed"}
        elif est_cum < proposed_cum:
            outcomes["side_setback"] = {
                "text": f"Cumulative ~{proposed_cum - est_cum:.0f}' short",
            }
        elif (est_min or 0) < rules["min_side_individual"]:
            outcomes["side_setback"] = {
                "text": f"Individual min ~{rules['min_side_individual'] - est_min:.0f}' short",
            }
    else:
        outcomes["side_setback"] = {"text": "Needs property-specific review"}

    # --- PARKING ---
    existing_parking = parcel.get("NUM_PARKING", 0) or 0
    outcomes["parking"] = {
        "text": f"Existing {existing_parking} space(s) may remain; "
                f"no longer required by zoning"
    }

    return outcomes
```

---

## B14. CONFIDENCE SCORING

```python
def compute_confidence(parcel, metric):
    """
    Returns confidence score (0.0-1.0) for a specific metric calculation.
    Only show Potential Outcome publicly if score >= 0.90.
    """
    score = 1.0
    penalties = []

    # Data age
    if parcel.get("data_year", 2025) < 2024:
        score -= 0.10
        penalties.append("Older source data")

    # GIS-estimated setbacks
    if metric in ("front_setback", "side_setback", "rear_setback"):
        score -= 0.05
        penalties.append("Setback estimated from GIS, not surveyed")

    # Missing building data
    if parcel.get("EXIST_Bldg_Ftprt") is None:
        score -= 0.15
        penalties.append("Missing building footprint data")

    # Missing assessor cross-check
    if parcel.get("BLDG_TYPE") is None or parcel.get("BLDG_TYPE") == "":
        score -= 0.05
        penalties.append("Building type not classified")

    # Conflicting unit counts
    gis_units = parcel.get("EXIST_Total_Res_Units")
    assessor_units = parcel.get("RES_UNITS")
    if gis_units and assessor_units and gis_units != assessor_units:
        score -= 0.10
        penalties.append("Conflicting unit counts between sources")

    # Proposed district not determined
    if parcel.get("proposed_district") is None:
        score -= 0.30
        penalties.append("Proposed zoning district not determined")

    # Nonconformity complexity
    nc = parcel.get("nonconformity_flags", [])
    if len(nc) >= 2:
        score -= 0.10
        penalties.append("Multiple nonconformities complicate analysis")

    return {
        "score": max(score, 0.0),
        "meets_threshold": score >= 0.90,
        "penalties": penalties
    }
```

---

## B15. BLOCK DEFINITION ALGORITHM

```python
def define_block(target_parcel, all_parcels, street_network):
    """
    A "block" is the set of parcels fronting the same street segment
    between the nearest two through-street intersections.

    Corner lots default to their address-frontage street.
    If a block has fewer than 5 properties, expand to adjacent segment.
    """
    street = target_parcel["ST_NAME"]

    # Find parcels on the same street
    same_street = [p for p in all_parcels if p["ST_NAME"] == street]

    # Sort by street number
    same_street.sort(key=lambda p: parse_street_num(p["ST_NUM"]))

    # Find nearest intersecting streets on each side of target
    target_num = parse_street_num(target_parcel["ST_NUM"])

    lower_bound = find_nearest_intersection(street, target_num, "lower",
                                             street_network)
    upper_bound = find_nearest_intersection(street, target_num, "upper",
                                             street_network)

    block_parcels = [
        p for p in same_street
        if lower_bound <= parse_street_num(p["ST_NUM"]) <= upper_bound
    ]

    # Edge case: too few properties
    if len(block_parcels) < 5:
        block_parcels = expand_to_adjacent_segment(
            block_parcels, same_street, lower_bound, upper_bound,
            street_network
        )

    block_id = f"{street.lower().replace(' ', '-')}-{lower_bound}-{upper_bound}"

    return {
        "id": block_id,
        "street": street,
        "bounds": f"Between {get_cross_street(lower_bound)} and "
                  f"{get_cross_street(upper_bound)}",
        "parcels": block_parcels,
        "count": len(block_parcels),
    }
```

---

## B16. PERMEABLE AREA CALCULATION

```python
def compute_permeable_area(parcel):
    """
    Derive permeable area from impervious surface data.
    """
    lot_size = parcel.get("EXIST_Lot_Size_Actual")
    imp_area = parcel.get("EXIST_ImpArea_Sqft")
    imp_pct = parcel.get("PctImperviousSurface")

    if lot_size and imp_area:
        perm_sf = lot_size - imp_area
        perm_pct = (perm_sf / lot_size) * 100
    elif lot_size and imp_pct:
        perm_pct = 100 - imp_pct
        perm_sf = lot_size * (perm_pct / 100)
    else:
        return {"sf": None, "pct": None, "confidence": "low"}

    return {
        "sf": round(perm_sf),
        "pct": round(perm_pct, 1),
        "confidence": "high"
    }
```

---

## B17. IMPACT SCORING (INTERNAL ONLY)

```python
def compute_impact_score(parcel, current_zoning, proposed_zoning):
    """
    Internal-only score (1-5) measuring magnitude of zoning change.
    NOT displayed publicly.
    """
    score = 0.0

    # Unit increase (35% weight)
    unit_delta = (proposed_zoning["max_units"] - current_zoning["max_units"])
    score += min(unit_delta / 3, 1.0) * 0.35

    # Setback reduction (20% weight)
    for sb in ["front", "side_cumulative", "rear"]:
        curr = current_zoning.get(f"min_{sb}")
        prop = proposed_zoning.get(f"min_{sb}")
        if curr and prop and prop < curr:
            score += ((curr - prop) / curr) * (0.20 / 3)

    # Building envelope increase (15% weight)
    lc_delta = proposed_zoning["max_lot_coverage"] - current_zoning["max_lot_coverage"]
    score += min(max(lc_delta / 0.20, 0), 1.0) * 0.15

    # Parking reduction (10% weight)
    if proposed_zoning.get("parking_required", 0) == 0:
        score += 0.10

    # Height increase (10% weight)
    h_delta = proposed_zoning["max_height"] - current_zoning["max_height"]
    score += min(max(h_delta / 15, 0), 1.0) * 0.10

    # Nonconformity becoming conforming (5% weight)
    nc_flags = parcel.get("nonconformity_flags", [])
    if any(f["becomes_conforming"] for f in nc_flags):
        score += 0.05

    # Easement bonus opportunity (5% weight)
    score += 0.05  # always available

    # Map to 1-5 scale
    if score < 0.15: return 1   # Minimal
    elif score < 0.30: return 2  # Limited
    elif score < 0.50: return 3  # Moderate
    elif score < 0.70: return 4  # Significant
    else: return 5               # Major
```

---

# APPENDIX C: NAVIGATION & URL STRUCTURE

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
| About                 | `/about`                      | —                               |
| Sources & Methodology | `/sources`                    | —                               |
| Feedback              | `/feedback?property={GIS_ID}` | Optional property context       |
| Submit Correction     | `/correct?property={GIS_ID}`  | Optional property context       |

All pages with a `GIS_ID` or `block_id` parameter produce shareable URLs.

---

# APPENDIX D: TOOLTIP / GLOSSARY CONTENT

| Term                              | Plain-English                                                                                                                                                                                                                                                    | Source                               |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| **Dwelling unit**                 | A self-contained home — a house, apartment, or unit someone lives in.                                                                                                                                                                                            | Article 2                            |
| **Building floor plate**          | The ground-level area of a building, measured to the outside of exterior walls, including covered porches and balconies.                                                                                                                                         | Article 2, BRA definition            |
| **Lot coverage**                  | The percentage of your lot that is covered by buildings. A 7,200 sf lot with a 1,440 sf building footprint has 20% lot coverage.                                                                                                                                 | Article 20, Table B                  |
| **Permeable area**                | The portion of your lot that allows water to soak into the ground — grass, garden, gravel. Driveways, patios, and buildings are impermeable.                                                                                                                     | Article 20, Table B                  |
| **Front yard / setback**          | The minimum distance required between your building and the front property line (the street side).                                                                                                                                                               | Article 20, Table B                  |
| **Side yard (cumulative)**        | The combined width of both side yards. If your side yards are 8' and 7', your cumulative side yard is 15'.                                                                                                                                                       | Article 20, Table B                  |
| **Side yard (minimum)**           | The narrowest any single side yard can be. Under the proposal, this is 3' in all RD districts.                                                                                                                                                                   | Article 20, Table B                  |
| **Rear yard**                     | The minimum distance required between your building and the rear property line.                                                                                                                                                                                  | Article 20, Table B                  |
| **Sloped Roof Story**             | The proposed zoning requires the third story in RD-2 and RD-3 to be a "Sloped Roof Story." The July 2026 draft does not define this term — there is no minimum pitch and no dormer-size limit. The requirement can be waived by granting a 5' sidewalk easement. | Article 20, Tables B/C; Section 20-6 |
| **ADU (Accessory Dwelling Unit)** | A separate, self-contained home on the same lot as a main house. Under the proposal, a detached ADU can be up to 900 sf and 25' tall (or the main building height, whichever is less).                                                                           | Article 8, Table A                   |
| **Nonconforming / pre-existing**  | A building or condition that doesn't meet current zoning rules but is legally allowed to remain because it existed before the rules were adopted. You are NOT required to change it.                                                                             | Article 9; Article 20, Section 20-5  |
| **Easement bonus**                | The property owner records a 5' highway easement along the front lot line with DPW. In exchange: more units, relaxed setbacks, and in RD-2/RD-3, the Sloped Roof Story requirement is waived.                                                                    | Article 20, Section 20-6             |
| **Conditional use**               | A use or building that requires Board of Appeal approval after public hearing. Under the proposal, buildings with more units than the district normally allows require conditional use.                                                                          | Article 6; Article 20, Section 20-3  |

---

_Source: Zoning site spec conversation (ChatGPT, exported 2026-08-17)_  
_Legal text: Residential Zoning Draft Text Amendment, released July 17, 2026_  
_Data downloaded: 2026-08-17_  
_Spec finalized: 2026-08-17_  
_Design reference: USAFacts.org (navy adaptation)_
