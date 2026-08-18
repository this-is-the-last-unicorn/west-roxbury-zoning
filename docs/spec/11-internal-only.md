# Internal-Only Analytics & Analysis

Not exposed to public users in V1. Used for internal QA, Planning Department discussions, and understanding the data.

---

## Internal Nonconformity / Grandfathering Analysis

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

See [10-data-and-calcs.md](10-data-and-calcs.md) B8 for detection algorithm.

---

## Roof Pitch / Character Analysis

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

See [10-data-and-calcs.md](10-data-and-calcs.md) B7 for pitch estimation algorithm.

---

## Internal-Only Analytics Summary

Not exposed to public users in V1:

- **Amount-of-change / impact scoring** — parcel-by-parcel (see [10-data-and-calcs.md](10-data-and-calcs.md) B17)
- **Nonconformity / grandfathering risk flags** — per above
- **Roof pitch / dormer analysis** — per above
- **Easement bonus modeling** — what changes if the 5' easement is granted
- **Aggregate internal sentiment** — per [06-feedback.md](06-feedback.md)
