# Property Page (`/property/{GIS_ID}`)

**The heart of the product.** This is what a resident sees after entering their address.

**See also:** [10-data-and-calcs.md](10-data-and-calcs.md) for computation formulas, [05-guided-qa.md](05-guided-qa.md) for the Q&A panel, [09-shared-components.md](09-shared-components.md) for nav/footer/tooltips.

---

## Page Flow (top to bottom)

1. Header (+ condo/vacant lot variant if applicable)
2. Reassurance banner
3. Property summary (3–4 material changes)
4. Nonconformity callout (if any flags detected)
5. **Guided Q&A panel** (property-aware FAQ — placed early so users find answers before deep-dive data)
6. Four-column comparison table
7. Sloped Roof Story note (RD-2/RD-3 only)
8. Easement bonus scenario (collapsible)
9. Explore Your Block & Neighbors
10. Next Steps
11. Feedback CTA
12. Sources for this property

**Design rationale for Q&A placement:** The comparison table is the detailed reference; the Q&A answers the plain-English questions most residents actually have. Putting Q&A before the table means a worried homeowner finds "Could I add a story?" and "What about parking?" in accessible language before encountering 48 data cells. Users who want the data can scroll past.

---

## Section 1: Header

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

---

## Section 1b: Property Context Variants

The header area adapts for special property types:

**Condo units:**

```
┌──────────────────────────────────────────────────────────┐
│ ⓘ Condo note                                            │
│ You searched a unit in a multi-unit building. Zoning     │
│ applies to the property as a whole — any changes would   │
│ require action by the condo association or building       │
│ owner, not individual unit owners. The analysis below    │
│ shows what zoning permits for the entire building/lot.   │
└──────────────────────────────────────────────────────────┘
```

**Vacant lots (no existing building):**

```
┌──────────────────────────────────────────────────────────┐
│ ⓘ Vacant lot                                            │
│ This lot has no existing building on record. The         │
│ analysis below shows what new construction would be      │
│ permitted under the proposed zoning (Table B rules).     │
│ "Today's Reality" columns show lot characteristics only. │
└──────────────────────────────────────────────────────────┘
```

For vacant lots, suppress comparison metrics that require an existing building (height delta, stories delta, floor plate delta). Show proposed rules clearly as "what you could build."

**Non-residential parcels** (NS, CC, CPS, OS-CM, CF, LI, etc. — 535 parcels):

```
┌──────────────────────────────────────────────────────────┐
│  24 Example Street, West Roxbury                         │
│  Current zoning: NS (Neighborhood Shopping) ⓘ           │
│  Lot size: 12,400 sf                                     │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ This property is in a Neighborhood Shopping zone.  │  │
│  │ The proposed Neighborhood Housing changes apply to │  │
│  │ residential zoning districts. This property's      │  │
│  │ zoning is not directly changed by this proposal.   │  │
│  │                                                    │  │
│  │ → View Boston's general zoning information         │  │
│  │ → View on map                                      │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

The four-column comparison table, summary cards, and all analysis sections are suppressed. Show only the header, the info message, the property location on the map, and the footer.

**Table B / Table C indicator** (all properties with existing buildings):

```
┌──────────────────────────────────────────────────────────┐
│ Rules applied: Table C — Retaining pre-2027 building ⓘ  │
└──────────────────────────────────────────────────────────┘
```

Tooltip: "Because your building was constructed before 2027, the proposed zoning applies the more permissive Table C dimensional rules (larger floor plate, reduced setbacks) when adding units. If the building were demolished and replaced, the stricter Table B rules would apply."

Show as a small badge/pill below the lot size in the header. This is critical context — Table C gives meaningfully better rules and homeowners deserve to know.

---

## Section 2: Reassurance Banner (CRITICAL)

```
┌──────────────────────────────────────────────────────────┐
│ ✓ Your existing home can remain as it is.                │
│   Proposed zoning changes what may be permitted going    │
│   forward. It does not require your home to be altered.  │
└──────────────────────────────────────────────────────────┘
```

- Teal left border, light teal background
- Always present, not dismissable
- Residents must NEVER conclude "I have to change my house"

---

## Section 3: Property Summary

```
┌──────────────────────────────────────────────────────────┐
│  What changes for this property?                         │
│                                                          │
│  • Maximum permitted dwelling units increases from 1 to 3│
│  • Front setback decreases from 20' to 12'               │
│  • Off-street parking is no longer required               │
│  • Maximum stories increases from 2½ to 3                │
│                                                          │
│  These are changes to what zoning would PERMIT —         │
│  not changes anyone is required to make.                 │
│                                                          │
│  See how this affects your block →                       │
└──────────────────────────────────────────────────────────┘
```

The trailing line reinforces the reassurance banner. Always present.

The "See how this affects your block →" link jumps to Section 9 (Explore Your Block) or links directly to the Block page. This is critical for mobile users — without it, block context is buried below the full comparison table and may require 15+ screens of scrolling.

### Generation algorithm

Surface the **3–4 most material property-specific changes**, generated only from verified/high-confidence calculations.

**Also surface "becomes conforming" changes.** If any existing condition is currently nonconforming but would become conforming under the proposal, include it:

> "Your property's existing [metric] currently exceeds the zoning standard but would meet the proposed standard."

This is a significant change for the property owner even though no numeric increase occurs.

If nothing material changes AND no becomes-conforming flags:

> **The proposal makes little or no material change to what is permitted on this property.**

Do NOT include block-level comparisons here.

### Materiality thresholds

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

Sort by magnitude of change (largest first), take top 4. See [10-data-and-calcs.md](10-data-and-calcs.md) B9 for full pseudocode.

---

## Section 4: Nonconformity Callout

**Condition:** Only display if any nonconformity flags are detected (see [10-data-and-calcs.md](10-data-and-calcs.md) B8).

### Variant A: Existing nonconformity RESOLVED by proposal (becomes conforming)

```
┌──────────────────────────────────────────────────────────┐
│ ✓ Good news for this property                            │
│                                                          │
│ Your property currently has 3 dwelling units in a zone   │
│ that permits 2. Under the proposed RD-3 zoning, 3 units  │
│ would be permitted — your property would meet the new    │
│ standard.                                                │
│                                                          │
│ This is a legally significant change: your property      │
│ would go from a pre-existing nonconformity to a          │
│ conforming use.                                          │
└──────────────────────────────────────────────────────────┘
```

Teal left border (same as reassurance banner).

### Variant B: Existing nonconformity PERSISTS under proposal

```
┌──────────────────────────────────────────────────────────┐
│ ⓘ About your property's existing conditions              │
│                                                          │
│ Your property's front setback (~10' est.) is less than   │
│ both the current requirement (20') and the proposed      │
│ requirement (12'). This is a lawful pre-existing         │
│ condition — your home may remain exactly as it is.       │
│                                                          │
│ Under Section 20-5, vertical extensions may be possible  │
│ within the existing building footprint. See the          │
│ comparison table below for details.                      │
└──────────────────────────────────────────────────────────┘
```

Amber left border. Multiple nonconformities listed as separate bullets.

### Variant C: NEW nonconformity created by proposal

```
┌──────────────────────────────────────────────────────────┐
│ ⓘ About your property's existing conditions              │
│                                                          │
│ Your property's side yard (cumulative ~14' est.)         │
│ currently meets the zoning standard (10') but would be   │
│ below the proposed standard (15'). If the proposal is    │
│ adopted, this would become a lawful pre-existing         │
│ nonconformity — your home may remain exactly as it is,   │
│ but expansions in this dimension would be restricted.    │
└──────────────────────────────────────────────────────────┘
```

Amber left border. Critical to say "your home may remain exactly as it is."

---

## Section 5: Guided Q&A

Property-aware FAQ + category menu. See [05-guided-qa.md](05-guided-qa.md) for full spec.

---

## Section 6: Four-Column Comparison Table

Four columns:

| Metric | Today's Law | Today's Reality | Proposed Law | Potential Outcome |
| ------ | ----------- | --------------- | ------------ | ----------------- |

### Column definitions

- **Today's Law:** What current zoning legally permits/requires.
- **Today's Reality:** What physically/legally exists on the property today.
- **Proposed Law:** What the proposed Article 20 would permit/require.
- **Potential Outcome:** What the proposed rules appear to enable on this particular property after applying known physical and legal constraints. Shown only at ≥90% internal confidence; otherwise **"Needs property-specific review."**

Potential Outcome is NOT a prediction of owner behavior, an economic feasibility analysis, a probability of redevelopment, or a developer opportunity score.

### Desktop row structure

```
┌─────────────────┬────────────┬────────────┬────────────┬─────────────────┐
│ Metric ⓘ        │ Today's    │ Today's    │ Proposed   │ Potential        │
│                  │ Law        │ Reality    │ Law        │ Outcome          │
├─────────────────┼────────────┼────────────┼────────────┼─────────────────┤
│ Dwelling units  │ 1          │ 1          │ 3          │ Up to 3 (2 add'l)│
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

### Mobile card structure (per metric)

```
┌──────────────────────────────────────────────┐
│ Dwelling Units ⓘ                             │
│                                              │
│ Today's Law        Today's Reality           │
│ 1 unit             1 unit                    │
│                                              │
│ Proposed Law       Potential Outcome         │
│ 3 units            Up to 3 (2 additional)    │
└──────────────────────────────────────────────┘
```

### Row-level visual indicators

- Default: no highlight
- Today's Reality differs from Today's Law: amber left border + amber dot
- Today's Reality differs from Proposed Law: navy left border
- Potential Outcome = "Needs review": amber background pill
- Setback values labeled "est." — tooltip: "Estimated from GIS building/parcel geometry. Not a professional survey."
- Color is never the sole indicator (WCAG requirement)
- Do NOT label nonconforming conditions as "illegal" or "violations" — they may be lawful pre-existing nonconformities

### Existing condition statuses

- Meets applicable standard
- Existing condition differs from standard (may remain)
- Needs verification

---

## Section 7: Sloped Roof Story Note

**Condition:** Only display if property is in RD-2 or RD-3.

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

---

## Section 8: Easement Bonus Scenario

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

Show as a secondary scenario, not the default. Values computed per-property — see [10-data-and-calcs.md](10-data-and-calcs.md) B18.

---

## Section 9: Explore Your Block & Neighbors

```
┌──────────────────────────────────────────────────────────┐
│ Your Block                                               │
│                                                          │
│ Example Street (between Oak St and Elm St)               │
│ 14 properties | Proposed: RD-3                           │
│                                                          │
│ Block today vs proposed:                                 │
│ Median height: 24 ft  →  Proposed max: 35 ft            │
│ Median coverage: 18%  →  Proposed max: 30%              │
│ Median units: 1       →  Proposed max: 3                │
│                                                          │
│ Explore your block →                                     │
│ See what's possible on neighboring properties →          │
└──────────────────────────────────────────────────────────┘
```

Both links go to the Block page. "See what's possible on neighboring properties" links to the block page's property list, which shows per-property change deltas (see [03-aggregate-views.md](03-aggregate-views.md)).

Do NOT automatically analyze individual neighbors on the property page — but DO make it easy to get there in one click.

---

## Section 10: Next Steps

```
┌──────────────────────────────────────────────────────────┐
│  Want to learn more?                                     │
│                                                          │
│  • Read the FAQ for general questions about the proposal │
│  • Attend a community meeting (next: [date])             │
│  • Review the full draft text (link to City PDF)         │
│  • For property-specific advice, consult a licensed      │
│    architect or the Boston Planning zoning helpline       │
│    (617-918-4307)                                        │
└──────────────────────────────────────────────────────────┘
```

This is NOT a CTA for our site — it's genuine next-step guidance for a resident who now understands the zoning changes and wants to act. The zoning helpline number should be verified and kept current.

---

## Section 11: Feedback CTA

```
┌──────────────────────────────────────────────────────────┐
│ Share your thoughts with Boston Planning →               │
└──────────────────────────────────────────────────────────┘
```

Visually secondary. Opens feedback modal (see [06-feedback.md](06-feedback.md)).

---

## Section 12: Sources for This Property

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

---

## ADU Information

ADUs do NOT get a dedicated V1 page. They surface through the property comparison table and the Guided Q&A.

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

**Non-detached ADU:** No longer a distinct use category. Additional dwelling units within an existing structure are simply counted as regular dwelling units within the district's unit maximum.

---

## Potential Outcome Engine

Explain **what the change actually enables** on the searched property. Favor obvious, conservative applications rather than clever combinations that maximize development.

Appropriate: "You could potentially add a story." / "Approximately 500 additional sq ft of footprint may be permitted." / "An additional unit does not appear feasible because [constraint]."

Not appropriate: "High redevelopment potential." / "Most profitable." / "Underutilized."

### Computation rules

For each parcel, determine:

1. **Which table applies?** Pre-2027 building retained → Table C. New construction → Table B. Conditional use → Table D.
2. **Which lot-size tier?** ≤3,800 sf / 3,800–6,899 sf / ≥6,900 sf
3. **Is the easement bonus available?** Show as secondary scenario, not default.
4. **Apply nonconformity rules (Section 20-5):** Horizontal/vertical extension constraints.
5. **Calculate remaining buildable capacity** per metric.
6. **Show outcome only at ≥90% internal confidence.**

Full pseudocode in [10-data-and-calcs.md](10-data-and-calcs.md) B13.

### Confidence standard

90%+ internal threshold. Not displayed publicly.

`?` interaction: "We only show a calculated Potential Outcome when we're highly confident in both the property data and how the proposed zoning applies."

Confidence penalized by: older source data, GIS-estimated setbacks, unverifiable building components, unknown structure details, conflicting sources, missing fields.

See [10-data-and-calcs.md](10-data-and-calcs.md) B14 for scoring formula.

---

## Calculations Required

This page requires the most computation of any page:

| Calculation                                            | Formula |
| ------------------------------------------------------ | ------- |
| Spatial join (parcel → proposed district)              | B1      |
| Assessor join (GIS_ID matching)                        | B2      |
| Lot-size tier classification                           | B3      |
| Table B vs C selection                                 | B4      |
| Lot coverage lookup (tiered)                           | B5      |
| Setback estimation from GIS geometry                   | B6      |
| Roof pitch estimation (where calculable)               | B7      |
| Nonconformity detection (all metrics)                  | B8      |
| Property summary generation (incl. becomes-conforming) | B9      |
| Current zoning lookup (Today's Law)                    | B11     |
| Proposed zoning lookup                                 | B12     |
| Potential Outcome Engine (4th column)                  | B13     |
| Confidence scoring per metric                          | B14     |
| Permeable area calculation                             | B16     |
| Easement bonus outcome computation                     | B18     |
| Stories inference                                      | B19     |
| Section 20-5 vertical extension constraints            | B21     |

All formulas in [10-data-and-calcs.md](10-data-and-calcs.md).
