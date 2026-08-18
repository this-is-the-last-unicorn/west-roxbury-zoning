# Data, Dimensional Rules & Computation Formulas

All zoning rules, data field mappings, and computation pseudocode in one place.

**This is the engineering reference.** Page specs reference specific sections here by ID (e.g., "see B13").

---

# PART 1: VERIFIED PROPOSED DIMENSIONAL RULES

_Source: Article 20, Tables B, C, D — Residential Zoning Draft Text Amendment, July 17, 2026_

## TABLE B — Base Dimensional Regulations (new construction / no retained pre-2027 building)

### Lot Standards

| Metric                                            | RD-2                                       | RD-3 | RD-4 | RD-6 |
| ------------------------------------------------- | ------------------------------------------ | ---- | ---- | ---- |
| **Max Dwelling Units**                            | 2 (existing pre-2027 buildings may have 3) | 3    | 4    | 6    |
| **Max Lot Coverage (lot ≤ 3,800 sf)**             | 25%                                        | 35%  | 40%  | 60%  |
| **Max Lot Coverage (lot > 3,800 and ≤ 6,899 sf)** | 25%                                        | 35%  | 55%  | 55%  |
| **Max Lot Coverage (lot ≥ 6,900 sf)**             | 25%                                        | 30%  | 30%  | 30%  |
| **Min Permeable Area**                            | 45%                                        | 30%  | 25%  | 15%  |
| **Min Front Yard**                                | 15'                                        | 12'  | 8'   | 4'   |
| **Min Rear Yard**                                 | 20'                                        | 15'  | 10'  | 10'  |
| **Min Side Yard (cumulative)**                    | 20'                                        | 15'  | 10'  | 10'  |
| **Min Side Yard (individual min)**                | 3'                                         | 3'   | 3'   | 3'   |

### Building Form Standards

| Metric                             | RD-2                      | RD-3                      | RD-4     | RD-6     |
| ---------------------------------- | ------------------------- | ------------------------- | -------- | -------- |
| **Max Height (feet)**              | 35'                       | 35'                       | 45'      | 45'      |
| **Max Height (stories)**           | 3                         | 3                         | 3        | 4        |
| **Third Story**                    | Must be Sloped Roof Story | Must be Sloped Roof Story | —        | —        |
| **Max Building Floor Plate**       | 2,200 sf                  | 2,000 sf                  | 2,200 sf | 2,200 sf |
| **Multiple Detached Buildings**    | Yes                       | Yes                       | Yes      | Yes      |
| **Min Distance Between Buildings** | 12'                       | 10'                       | 5'       | 5'       |

## TABLE C — Adding Units While Retaining Pre-2027 Building

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

## TABLE D — Conditional Use

Requires Board of Appeal conditional use permit. Up to 16 units. Additional dimensional requirements including minimum 55' lot frontage in RD-4/RD-6.

## PARKING

**Article 23, Section 23-6(d): Off-street parking is NOT REQUIRED in any Residential District (RD-2, RD-3, RD-4, RD-6).**

Complete elimination of parking requirements.

## EASEMENT BONUS (Section 20-6)

By recording a 5-foot highway easement along the full front lot line:

| District | Bonus                                                                                                                                               |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RD-2** | Max units → 4 (pre-2027) / 3 (new). Table C dims apply. Side yard: 3' min / 25' cumulative. **Sloped Roof Story requirement WAIVED for 3rd story.** |
| **RD-3** | Max units → 4. Table C dims apply. Side yard: 3' min / 15' cumulative. **Sloped Roof Story requirement WAIVED for 3rd story.**                      |
| **RD-4** | Max units → 6. Table C dims apply. Side yard: 3' min / 15' cumulative.                                                                              |
| **RD-6** | Max units → 16. Table D dims apply. Front yard: 6'. Side yard: 5' min / 10' cumulative. Rear yard: 10'.                                             |

**Critical finding:** The easement bonus makes the Sloped Roof Story requirement entirely optional in RD-2 and RD-3.

## NONCONFORMITY RULES (Section 20-5)

**Horizontal extensions** of nonconforming setbacks:

- May extend horizontally along the same nonconforming side/rear yard line
- May not encroach further into the front yard than the existing building

**Vertical extensions** of nonconforming yards/permeability:

- May extend vertically **if** the extension stays within the existing building floor plate
- May not exceed maximum building height
- Must comply with Sloped Roof Story requirements

**Permeable area:** A driveway/walkway on a nonconforming lot may be altered/maintained/resurfaced provided the nonconformity is not worsened.

---

# PART 2: DATA FIELD MAPPING

Each metric maps to specific fields in the downloaded datasets.

### Dwelling Units

| Column            | Source                                                                 |
| ----------------- | ---------------------------------------------------------------------- |
| Today's Law       | Parcel `Zoning_Subdistrict` → current district dwelling unit rules     |
| Today's Reality   | Parcel `EXIST_Total_Res_Units` + Assessor `RES_UNITS` (cross-check)    |
| Proposed Law      | Spatial join to proposed subdistricts → Table A max units per district |
| Potential Outcome | Calculate from lot size, proposed floor plate max, setback constraints |

### Height (feet)

| Column            | Source                                                                   |
| ----------------- | ------------------------------------------------------------------------ |
| Today's Law       | Parcel `ZON_Height_Requirement`                                          |
| Today's Reality   | Parcel `EXIST_BLDG_HGT_2010` + Buildings `BLDG_HGT_2010` (cross-check)   |
| Proposed Law      | Proposed subdistrict `Max_Height` (35' for RD-2/RD-3, 45' for RD-4/RD-6) |
| Potential Outcome | Difference between existing height and proposed max                      |

### Stories

| Column            | Source                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------- |
| Today's Law       | Current district stories limit                                                              |
| Today's Reality   | Assessor `RES_FLOOR` / `CD_FLOOR` + building height inference                               |
| Proposed Law      | 3 stories (RD-2/RD-3/RD-4), 4 stories (RD-6). Third story = Sloped Roof Story in RD-2/RD-3. |
| Potential Outcome | Based on existing height vs proposed max                                                    |

### Building Floor Plate

| Column            | Source                                                                                                    |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| Today's Law       | Current district floor plate max                                                                          |
| Today's Reality   | Parcel `EXIST_Bldg_Ftprt`                                                                                 |
| Proposed Law      | Table B: 2,200 sf (RD-2/RD-4/RD-6), 2,000 sf (RD-3). Table C: 2,600 sf (RD-2/RD-4/RD-6), 2,400 sf (RD-3). |
| Potential Outcome | Compare existing footprint to proposed max                                                                |

### Lot Coverage

| Column            | Source                                                                 |
| ----------------- | ---------------------------------------------------------------------- |
| Today's Law       | Current district lot coverage max                                      |
| Today's Reality   | Parcel `PctLotCoverage` + `EXIST_Bldg_Ftprt` / `EXIST_Lot_Size_Actual` |
| Proposed Law      | Table B tiered by lot size. Must determine lot size tier first.        |
| Potential Outcome | Existing coverage vs proposed max; show both sq ft and %               |

### Permeable / Open Lot Area

| Column            | Source                                                                                               |
| ----------------- | ---------------------------------------------------------------------------------------------------- |
| Today's Law       | Current district permeable area minimum                                                              |
| Today's Reality   | Invert: 100% − Parcel `PctImperviousSurface`. Sq ft: `EXIST_Lot_Size_Actual` − `EXIST_ImpArea_Sqft`. |
| Proposed Law      | Table B: 45% (RD-2), 30% (RD-3), 25% (RD-4), 15% (RD-6)                                              |
| Potential Outcome | Whether existing permeable area meets proposed minimum                                               |

### Setbacks

| Column            | Source                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| Today's Law       | Current district setback requirements                                                                        |
| Today's Reality   | GIS-estimated from building footprint position within parcel boundary. Label as estimated.                   |
| Proposed Law      | Table B: Front (15'/12'/8'/4'), Rear (20'/15'/10'/10'), Side cumulative (20'/15'/10'/10'), Side min (3' all) |
| Potential Outcome | Whether existing setbacks meet proposed requirements                                                         |

### Parking

| Column            | Source                                                                    |
| ----------------- | ------------------------------------------------------------------------- |
| Today's Law       | Current district parking requirement                                      |
| Today's Reality   | Assessor `NUM_PARKING` (physical spaces)                                  |
| Proposed Law      | **0 — No off-street parking required**                                    |
| Potential Outcome | "Existing parking spaces may remain but are no longer required by zoning" |

### Roof Pitch (where calculable)

| Column          | Source                                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Today's Reality | Buildings layer: `GRND_ELEV_2010`, `ROOF_ELEV_2010`, `BLDG_HGT_2010` + building geometry. Cross-check with Assessor `ROOF_STRUCTURE`. |
| Proposed Law    | RD-2/RD-3: "Third Story must be a Sloped Roof Story" (no minimum pitch defined).                                                      |

### Building Character / Type

| Column          | Source                                                                                                                                                                                          |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Today's Reality | Assessor `BLDG_TYPE`: CL=Colonial, CP=Cape, BW=Bungalow, RN=Ranch, RR=Raised Ranch, SL=Split Level, TF=Two Fam Stack, DX=Duplex, TH=Town House, CV=Conventional, LR=Low Rise, FS=Free Standing. |

---

# PART 3: COMPUTATION FORMULAS

Pseudocode for every calculation the system performs.

---

## B1. Spatial Join — Parcels to Proposed Districts

```python
import geopandas as gpd

parcels = gpd.read_file("data/parcels_west_roxbury.geojson")
proposed = gpd.read_file("data/proposed_zoning_subdistricts.geojson")

proposed_ch = proposed[proposed["Comments"] == "CH"]

parcels_with_proposed = gpd.sjoin(
    parcels,
    proposed_ch[["Zoning_Subdistrict", "Max_Height", "Max_FAR",
                  "Front_Setback", "Side_Setback", "Rear_Setback",
                  "Max_Number_of_Floors", "Dwelling_Units_Factor",
                  "geometry"]],
    how="left",
    predicate="intersects"
)
```

---

## B2. Assessor Join

```python
import pandas as pd

assessor = pd.read_csv("data/assessor_fy2026_west_roxbury.csv")

assessor_fields = assessor[["GIS_ID", "BLDG_TYPE", "ROOF_STRUCTURE", "NUM_PARKING",
              "RES_UNITS", "LAND_SF", "GROSS_AREA", "LIVING_AREA",
              "LU_DESC", "YR_BUILT", "RES_FLOOR", "CD_FLOOR"]]

# Condo deduplication: 1,731 assessor records are condos.
# Multiple rows per GIS_ID — must aggregate before join.
# "CONDO MAIN" = the building/land record → use for building data.
# "RESIDENTIAL CONDO" = individual units → sum RES_UNITS per GIS_ID.
condo_mask = assessor_fields["LU_DESC"].str.contains("CONDO", na=False)
condo_main = assessor_fields[
    assessor_fields["LU_DESC"].str.contains("CONDO MAIN", na=False)
]
condo_units = (
    assessor_fields[assessor_fields["LU_DESC"] == "RESIDENTIAL CONDO"]
    .groupby("GIS_ID")["RES_UNITS"].sum().reset_index()
    .rename(columns={"RES_UNITS": "condo_total_units"})
)

# For non-condos, take the first record per GIS_ID (handles rare duplicates)
non_condo = assessor_fields[~condo_mask]
assessor_deduped = pd.concat([
    non_condo.drop_duplicates(subset="GIS_ID", keep="first"),
    condo_main.drop_duplicates(subset="GIS_ID", keep="first"),
]).drop_duplicates(subset="GIS_ID", keep="first")

parcels_full = parcels_with_proposed.merge(assessor_deduped, on="GIS_ID", how="left")
parcels_full = parcels_full.merge(condo_units, on="GIS_ID", how="left")
parcels_full["is_condo"] = parcels_full["LU_DESC"].str.contains("CONDO", na=False)
```

---

## B3. Lot-Size Tier Classification

```python
def get_lot_tier(lot_size_sf):
    if lot_size_sf <= 3800:
        return "small"
    elif lot_size_sf <= 6899:
        return "medium"
    else:
        return "large"

parcels_full["lot_tier"] = parcels_full["EXIST_Lot_Size_Actual"].apply(get_lot_tier)
```

---

## B4. Table Selection (B vs C)

Decision tree:

1. `YR_BUILT` exists and < 2027 → **Table C**
2. `YR_BUILT` exists and ≥ 2027 → **Table B**
3. `YR_BUILT` is null but building footprint > 0 → assume pre-2027, **Table C** (conservative for homeowner)
4. No building footprint → vacant lot, **Table B**

Note: this is a zoning-analysis best-effort, not a legal determination. The property page tooltip reads: _"Table selection is based on assessor records and should be verified for permitting purposes."_

```python
def get_applicable_table(yr_built, has_existing_building):
    if not has_existing_building:
        return "B"
    if yr_built is not None and yr_built >= 2027:
        return "B"
    # yr_built < 2027 OR yr_built is None with existing building → Table C
    return "C"

def has_building(parcel):
    fp = parcel.get("EXIST_Bldg_Ftprt")
    return fp is not None and fp > 0
```

---

## B5. Lot Coverage Lookup

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
        "RD-4": {"small": 0.45, "medium": 0.55, "large": 0.30},
        "RD-6": {"small": 0.60, "medium": 0.55, "large": 0.30},
    }
}

def get_proposed_lot_coverage_max(district, lot_tier, table):
    return LOT_COVERAGE_MAX[table][district][lot_tier]
```

---

## B6. Setback Estimation

```python
from shapely.geometry import shape

def estimate_setbacks(parcel_geom, building_geom, front_lot_line):
    parcel = shape(parcel_geom)
    building = shape(building_geom)

    front_setback = building.distance(front_lot_line)

    rear_line = get_rear_lot_line(parcel, front_lot_line)
    rear_setback = building.distance(rear_line)

    left_line, right_line = get_side_lot_lines(parcel, front_lot_line)
    left_setback = building.distance(left_line)
    right_setback = building.distance(right_line)

    return {
        "front": round(front_setback, 1),
        "rear": round(rear_setback, 1),
        "side_cumulative": round(left_setback + right_setback, 1),
        "side_min": round(min(left_setback, right_setback), 1),
        "side_left": round(left_setback, 1),
        "side_right": round(right_setback, 1),
        "confidence": "estimated"
    }
```

---

## B7. Roof Pitch Estimation

```python
import numpy as np

def estimate_roof_pitch(building_parts, assessor_roof_structure):
    if assessor_roof_structure not in ("G", "G - Gable"):
        return {"pitch": "Undetermined", "confidence": "low",
                "reason": "Non-gable roof form"}

    if len(building_parts) < 2:
        return {"pitch": "Undetermined", "confidence": "low",
                "reason": "Insufficient roof-break segments"}

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
                "reason": "No elevation difference"}

    building_geom = get_combined_geometry(building_parts)
    bbox = building_geom.minimum_rotated_rectangle
    coords = list(bbox.exterior.coords)
    widths = [
        np.sqrt((coords[1][0]-coords[0][0])**2 + (coords[1][1]-coords[0][1])**2),
        np.sqrt((coords[2][0]-coords[1][0])**2 + (coords[2][1]-coords[1][1])**2)
    ]
    run = min(widths) / 2

    if run <= 0:
        return {"pitch": "Undetermined", "confidence": "low",
                "reason": "Cannot determine building width"}

    pitch_ratio = (rise / run) * 12
    pitch_rounded = round(pitch_ratio)

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

## B8. Nonconformity Detection

```python
def detect_nonconformities(parcel, current_zoning, proposed_zoning, lot_tier, table):
    flags = []

    # Resolve lot-coverage to scalar (proposed stores as dict by lot tier)
    proposed_lc_key = f"max_lot_coverage{'_C' if table == 'C' else ''}"
    proposed_lc_raw = proposed_zoning.get(proposed_lc_key,
                                          proposed_zoning.get("max_lot_coverage"))
    proposed_lc = proposed_lc_raw[lot_tier] if isinstance(proposed_lc_raw, dict) else proposed_lc_raw

    existing_lc = parcel.get("PctLotCoverage")
    if existing_lc is not None and existing_lc > 1:
        existing_lc = existing_lc / 100  # normalize if stored as percentage

    # MAX metrics: nonconforming if existing EXCEEDS the standard
    max_checks = [
        ("lot_coverage", existing_lc,
         current_zoning.get("max_lot_coverage"), proposed_lc),
        ("height", parcel.get("EXIST_BLDG_HGT_2010"),
         current_zoning.get("max_height"), proposed_zoning.get("max_height")),
        ("floor_plate", parcel.get("EXIST_Bldg_Ftprt"),
         current_zoning.get("max_floor_plate"),
         proposed_zoning.get(f"max_floor_plate_{table}")),
    ]

    # UNITS: nonconforming if existing exceeds max allowed
    # RD-2 allows 3 for pre-2027 buildings (Table B footnote)
    existing_units = parcel.get("EXIST_Total_Res_Units")
    if existing_units is not None:
        proposed_max_units = get_effective_max_units(proposed_zoning, table)
        max_checks.append(
            ("units", existing_units,
             current_zoning.get("max_units"), proposed_max_units)
        )

    for metric, existing, current_std, proposed_std in max_checks:
        if existing is None:
            continue
        current_nc = existing > current_std if current_std else False
        proposed_nc = existing > proposed_std if proposed_std else False
        if current_nc or proposed_nc:
            flags.append({
                "metric": metric, "existing": existing,
                "current_standard": current_std,
                "proposed_standard": proposed_std,
                "nonconforming_current": current_nc,
                "nonconforming_proposed": proposed_nc,
                "becomes_conforming": current_nc and not proposed_nc,
                "becomes_nonconforming": not current_nc and proposed_nc,
            })

    # MIN metrics: nonconforming if existing is BELOW the standard
    min_checks = [
        ("front_setback", parcel.get("est_front_setback"),
         current_zoning.get("min_front_yard"),
         proposed_zoning.get(f"min_front_yard")),
        ("side_setback_cum", parcel.get("est_side_cumulative"),
         current_zoning.get("min_side_cumulative"),
         proposed_zoning.get(f"min_side_cumulative_{table}")),
        ("rear_setback", parcel.get("est_rear_setback"),
         current_zoning.get("min_rear_yard"),
         proposed_zoning.get(f"min_rear_yard_{table}")),
    ]

    # Permeable area: nonconforming if below minimum
    perm = compute_permeable_area(parcel)
    if perm["pct"] is not None:
        min_checks.append(
            ("permeable_area", perm["pct"] / 100,
             current_zoning.get("min_permeable"),
             proposed_zoning.get("min_permeable"))
        )

    for metric, existing, current_std, proposed_std in min_checks:
        if existing is None:
            continue
        current_nc = existing < current_std if current_std else False
        proposed_nc = existing < proposed_std if proposed_std else False
        if current_nc or proposed_nc:
            flags.append({
                "metric": metric, "existing": existing,
                "current_standard": current_std,
                "proposed_standard": proposed_std,
                "nonconforming_current": current_nc,
                "nonconforming_proposed": proposed_nc,
                "becomes_conforming": current_nc and not proposed_nc,
                "becomes_nonconforming": not current_nc and proposed_nc,
            })

    if not flags:
        risk = "none"
    elif any(f["nonconforming_current"] and f["nonconforming_proposed"] for f in flags):
        risk = "likely"
    elif len(flags) >= 2:
        risk = "likely"
    else:
        risk = "potential"

    return {"risk": risk, "flags": flags}
```

---

## B9. Property Summary Generation

```python
def generate_summary(parcel, current_zoning, proposed_zoning, lot_tier, table):
    changes = []
    conforming_changes = []

    # --- STANDARD CHANGES (increases/decreases) ---

    current_units = current_zoning.get("max_units", 1)
    proposed_units = get_effective_max_units(proposed_zoning, table)
    if proposed_units > current_units:
        changes.append({
            "metric": "units",
            "magnitude": proposed_units - current_units,
            "text": f"Maximum permitted dwelling units increases from "
                    f"{current_units} to {proposed_units}."
        })

    current_h = current_zoning.get("max_height")
    proposed_h = proposed_zoning.get("max_height")
    if current_h and proposed_h and abs(proposed_h - current_h) >= 5:
        changes.append({
            "metric": "height",
            "magnitude": proposed_h - current_h,
            "text": f"Maximum permitted height changes from "
                    f"{current_h}' to {proposed_h}'."
        })

    current_lc = current_zoning.get("max_lot_coverage")
    proposed_lc_raw = proposed_zoning.get("max_lot_coverage")
    proposed_lc = proposed_lc_raw[lot_tier] if isinstance(proposed_lc_raw, dict) else proposed_lc_raw
    if current_lc and proposed_lc and abs(proposed_lc - current_lc) >= 0.05:
        changes.append({
            "metric": "lot_coverage",
            "magnitude": proposed_lc - current_lc,
            "text": f"Maximum lot coverage changes from "
                    f"{current_lc*100:.0f}% to {proposed_lc*100:.0f}%."
        })

    if proposed_zoning.get("parking_required", 0) == 0:
        changes.append({
            "metric": "parking",
            "magnitude": 1,
            "text": "Off-street parking is no longer required by zoning."
        })

    current_pa = current_zoning.get("min_permeable")
    proposed_pa = proposed_zoning.get("min_permeable")
    if current_pa is None and proposed_pa is not None:
        changes.append({
            "metric": "permeable",
            "magnitude": proposed_pa,
            "text": f"New minimum permeable lot area: {proposed_pa*100:.0f}% "
                    f"(no current requirement)."
        })
    elif current_pa and proposed_pa and abs(proposed_pa - current_pa) >= 0.05:
        changes.append({
            "metric": "permeable",
            "magnitude": abs(proposed_pa - current_pa),
            "text": f"Minimum permeable lot area changes from "
                    f"{current_pa*100:.0f}% to {proposed_pa*100:.0f}%."
        })

    SETBACK_FIELDS = {
        "Front": "min_front_yard",
        "Side (cumulative)": "min_side_cumulative",
        "Rear": "min_rear_yard",
    }
    for label, base_key in SETBACK_FIELDS.items():
        current_sb = current_zoning.get(base_key)
        proposed_key = f"{base_key}_{table}"
        proposed_sb = proposed_zoning.get(proposed_key) or proposed_zoning.get(base_key)
        if current_sb and proposed_sb and abs(proposed_sb - current_sb) >= 3:
            changes.append({
                "metric": f"setback_{base_key}",
                "magnitude": abs(proposed_sb - current_sb),
                "text": f"{label} setback changes from "
                        f"{current_sb}' to {proposed_sb}'."
            })

    # --- BECOMES CONFORMING (nonconformity resolved) ---
    # This is a material change even when the numeric limit doesn't increase.
    # E.g., a 3-unit building in a 2-unit zone becoming legal in a 3-unit zone.

    nc = detect_nonconformities(parcel, current_zoning, proposed_zoning, lot_tier, table)
    for flag in nc.get("flags", []):
        if flag.get("becomes_conforming"):
            label = flag["metric"].replace("_", " ")
            conforming_changes.append({
                "metric": f"conforming_{flag['metric']}",
                "magnitude": 2,  # rank above parking, below major increases
                "text": f"Your property's existing {label} currently exceeds "
                        f"the zoning standard but would meet the proposed standard."
            })

    # Merge: standard changes first (sorted by magnitude), then conforming changes
    changes.sort(key=lambda c: abs(c["magnitude"]), reverse=True)
    all_changes = changes + conforming_changes
    return all_changes[:4]
```

---

## B10. Block Aggregation

```python
def compute_block_stats(block_parcels, metric_field, proposed_field=None):
    values = [p[metric_field] for p in block_parcels
              if p[metric_field] is not None]
    if not values:
        return None
    return {
        "median": round(np.median(values), 1),
        "min": round(min(values), 1),
        "max": round(max(values), 1),
        "count": len(values),
        "proposed": proposed_field
    }

def compute_character_distribution(block_parcels):
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

## B11. Current Zoning Lookup (Today's Law)

Source: Article 56, Table D (West Roxbury Neighborhood District).
**BUILD-TIME VERIFICATION NEEDED:**

- `1F-8000`: Cumulative side yard (using 20' — verify against Article 56 Table D)
- `2F-5000`: All values (using reasonable estimates — verify against Article 56 Table D)
- `MFR`: All values (using reasonable estimates — verify against Article 56 Table D)

```python
CURRENT_ZONING = {
    "1F-6000": {
        "max_units": 1, "max_height": 35, "max_stories": 2.5,
        "max_lot_coverage": 0.30,
        "min_front_yard": 20, "min_rear_yard": 25,
        "min_side_cumulative": 20, "min_side_individual": 5,
        "min_permeable": None, "parking_per_unit": 2,
    },
    "1F-8000": {
        "max_units": 1, "max_height": 35, "max_stories": 2.5,
        "max_lot_coverage": 0.30,
        "min_front_yard": 25, "min_rear_yard": 30,
        "min_side_cumulative": 20, "min_side_individual": 10,
        "min_permeable": None, "parking_per_unit": 2,
    },
    "2F-6000": {
        "max_units": 2, "max_height": 35, "max_stories": 2.5,
        "max_lot_coverage": 0.35,
        "min_front_yard": 15, "min_rear_yard": 25,
        "min_side_cumulative": 15, "min_side_individual": 5,
        "min_permeable": None, "parking_per_unit": 2,
    },
    "2F-5000": {
        "max_units": 2, "max_height": 35, "max_stories": 2.5,
        "max_lot_coverage": 0.40,
        "min_front_yard": 15, "min_rear_yard": 25,
        "min_side_cumulative": 15, "min_side_individual": 5,
        "min_permeable": None, "parking_per_unit": 2,
    },
    "MFR": {
        "max_units": 3, "max_height": 35, "max_stories": 3,
        "max_lot_coverage": 0.50,
        "min_front_yard": 15, "min_rear_yard": 25,
        "min_side_cumulative": 15, "min_side_individual": 5,
        "min_permeable": None, "parking_per_unit": 1,
    },
}

# Districts NOT affected by the Neighborhood Housing proposal
NON_RESIDENTIAL_DISTRICTS = {
    "NS", "CC", "CPS", "OS-CM", "CF", "LI", "OS-RC",
    "OS-P", "OS", "OS-UW", "S4", "NI",
}

def get_current_zoning_rules(parcel):
    district = parcel.get("Zoning_Subdistrict") or parcel.get("ZONE_")
    if district in NON_RESIDENTIAL_DISTRICTS:
        return None  # caller should show "not affected" message
    return CURRENT_ZONING.get(district, CURRENT_ZONING["1F-6000"])
```

---

## B12. Proposed Zoning Full Lookup

```python
PROPOSED_ZONING = {
    "RD-2": {
        "max_units": 2, "max_units_pre2027": 3,
        "max_height": 35, "max_stories": 3,
        "third_story_sloped_roof": True,
        "max_floor_plate_B": 2200, "max_floor_plate_C": 2600,
        "max_lot_coverage": {"small": 0.25, "medium": 0.25, "large": 0.25},
        "max_lot_coverage_C": {"small": 0.30, "medium": 0.30, "large": 0.30},
        "min_permeable": 0.45, "min_front_yard": 15,
        "min_rear_yard_B": 20, "min_rear_yard_C": 10,
        "min_side_cumulative_B": 20, "min_side_cumulative_C": 10,
        "min_side_individual": 3, "parking_required": 0,
        "easement_bonus": {"max_units_pre2027": 4, "max_units_new": 3,
                           "sloped_roof_waived": True, "side_cumulative": 25},
    },
    "RD-3": {
        "max_units": 3, "max_height": 35, "max_stories": 3,
        "third_story_sloped_roof": True,
        "max_floor_plate_B": 2000, "max_floor_plate_C": 2400,
        "max_lot_coverage": {"small": 0.35, "medium": 0.35, "large": 0.30},
        "max_lot_coverage_C": {"small": 0.35, "medium": 0.35, "large": 0.30},
        "min_permeable": 0.30, "min_front_yard": 12,
        "min_rear_yard_B": 15, "min_rear_yard_C": 10,
        "min_side_cumulative_B": 15, "min_side_cumulative_C": 15,
        "min_side_individual": 3, "parking_required": 0,
        "easement_bonus": {"max_units": 4, "sloped_roof_waived": True, "side_cumulative": 15},
    },
    "RD-4": {
        "max_units": 4, "max_height": 45, "max_stories": 3,
        "third_story_sloped_roof": False,
        "max_floor_plate_B": 2200, "max_floor_plate_C": 2600,
        "max_lot_coverage": {"small": 0.40, "medium": 0.55, "large": 0.30},
        "max_lot_coverage_C": {"small": 0.45, "medium": 0.55, "large": 0.30},
        "min_permeable": 0.25, "min_front_yard": 8,
        "min_rear_yard_B": 10, "min_rear_yard_C": 10,
        "min_side_cumulative_B": 10, "min_side_cumulative_C": 10,
        "min_side_individual": 3, "parking_required": 0,
        "easement_bonus": {"max_units": 6, "sloped_roof_waived": False, "side_cumulative": 15},
    },
    "RD-6": {
        "max_units": 6, "max_height": 45, "max_stories": 4,
        "third_story_sloped_roof": False,
        "max_floor_plate_B": 2200, "max_floor_plate_C": 2600,
        "max_lot_coverage": {"small": 0.60, "medium": 0.55, "large": 0.30},
        "max_lot_coverage_C": {"small": 0.60, "medium": 0.55, "large": 0.30},
        "min_permeable": 0.15, "min_front_yard": 4,
        "min_rear_yard_B": 10, "min_rear_yard_C": 10,
        "min_side_cumulative_B": 10, "min_side_cumulative_C": 10,
        "min_side_individual": 3, "parking_required": 0,
        "easement_bonus": {"max_units": 16, "sloped_roof_waived": False,
                           "side_cumulative": 10, "side_min": 5,
                           "front_yard": 6, "rear_yard": 10},
    },
}
```

---

## B13. Potential Outcome Engine (Full)

```python
# Shared utility — used by B8, B9, B13, B17
def get_effective_max_units(rules, table):
    """RD-2 Table B footnote: pre-2027 buildings may have 3 units."""
    if table == "C" and "max_units_pre2027" in rules:
        return rules["max_units_pre2027"]
    return rules["max_units"]

def compute_potential_outcome(parcel, current_zoning, proposed_zoning, table):
    lot_size = parcel["EXIST_Lot_Size_Actual"]
    lot_tier = get_lot_tier(lot_size)
    existing_fp = parcel.get("EXIST_Bldg_Ftprt")
    existing_height = parcel.get("EXIST_BLDG_HGT_2010")
    district = parcel["proposed_district"]
    rules = PROPOSED_ZONING[district]
    outcomes = {}

    # UNITS — RD-2 allows 3 for pre-2027 buildings (Table B footnote)
    proposed_max = get_effective_max_units(rules, table)
    existing_units = parcel.get("EXIST_Total_Res_Units", 1)
    if proposed_max > existing_units:
        outcomes["units"] = {
            "text": f"Up to {proposed_max - existing_units} additional unit(s)",
            "value": proposed_max, "delta": proposed_max - existing_units}
    else:
        outcomes["units"] = {"text": "No additional units", "value": existing_units}

    # HEIGHT
    proposed_h = rules["max_height"]
    if existing_height and proposed_h > existing_height:
        outcomes["height"] = {
            "text": f"+{proposed_h - existing_height:.0f}' possible",
            "value": proposed_h, "delta": proposed_h - existing_height}
    elif existing_height and existing_height > proposed_h:
        outcomes["height"] = {
            "text": "Existing exceeds proposed max (may remain)",
            "value": existing_height}
    else:
        outcomes["height"] = {"text": "No change", "value": existing_height}

    # FLOOR PLATE
    fp_key = f"max_floor_plate_{table}"
    proposed_fp = rules[fp_key]
    if existing_fp:
        if proposed_fp > existing_fp:
            outcomes["floor_plate"] = {
                "text": f"+{proposed_fp - existing_fp:.0f} sf available",
                "value": proposed_fp, "delta": proposed_fp - existing_fp}
        elif existing_fp > proposed_fp:
            outcomes["floor_plate"] = {
                "text": f"Existing exceeds proposed max by "
                        f"{existing_fp - proposed_fp:.0f} sf (may remain)",
                "value": existing_fp}
        else:
            outcomes["floor_plate"] = {"text": "At proposed max", "value": proposed_fp}
    else:
        outcomes["floor_plate"] = {"text": "Needs property-specific review"}

    # LOT COVERAGE
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
                "value_pct": proposed_lc * 100, "value_sf": proposed_lc_sf}
        else:
            outcomes["lot_coverage"] = {
                "text": "Meets proposed" if existing_lc_dec <= proposed_lc
                        else "Existing exceeds proposed (may remain)"}
    else:
        outcomes["lot_coverage"] = {"text": "Needs property-specific review"}

    # PERMEABLE AREA
    perm = compute_permeable_area(parcel)
    proposed_perm = rules["min_permeable"]
    if perm["pct"] is not None:
        if perm["pct"] / 100 >= proposed_perm:
            outcomes["permeable"] = {"text": "Meets proposed minimum"}
        else:
            deficit = (proposed_perm * lot_size) - perm["sf"]
            outcomes["permeable"] = {"text": f"Below proposed minimum by ~{deficit:.0f} sf"}
    else:
        outcomes["permeable"] = {"text": "Needs property-specific review"}

    # SETBACKS
    for sb_type in ["front", "rear"]:
        key = f"min_{sb_type}_yard_{'C' if table == 'C' else 'B'}"
        proposed_sb = rules.get(key) or rules.get(f"min_{sb_type}_yard")
        est = parcel.get(f"est_{sb_type}_setback")
        if est is not None and proposed_sb:
            if est >= proposed_sb:
                outcomes[f"{sb_type}_setback"] = {"text": "Meets proposed"}
            else:
                outcomes[f"{sb_type}_setback"] = {
                    "text": f"~{proposed_sb - est:.0f}' short of proposed minimum"}
        else:
            outcomes[f"{sb_type}_setback"] = {"text": "Needs property-specific review"}

    cum_key = f"min_side_cumulative_{'C' if table == 'C' else 'B'}"
    proposed_cum = rules[cum_key]
    est_cum = parcel.get("est_side_cumulative")
    est_min = parcel.get("est_side_min")
    if est_cum is not None:
        if est_cum >= proposed_cum and (est_min or 0) >= rules["min_side_individual"]:
            outcomes["side_setback"] = {"text": "Meets proposed"}
        elif est_cum < proposed_cum:
            outcomes["side_setback"] = {"text": f"Cumulative ~{proposed_cum - est_cum:.0f}' short"}
        elif (est_min or 0) < rules["min_side_individual"]:
            outcomes["side_setback"] = {
                "text": f"Individual min ~{rules['min_side_individual'] - est_min:.0f}' short"}
    else:
        outcomes["side_setback"] = {"text": "Needs property-specific review"}

    # STORIES (uses B19)
    stories_outcome = compute_stories_outcome(parcel, rules)
    outcomes["stories"] = stories_outcome

    # PARKING
    existing_parking = parcel.get("NUM_PARKING", 0) or 0
    outcomes["parking"] = {
        "text": f"Existing {existing_parking} space(s) may remain; "
                f"no longer required by zoning"}

    return outcomes
```

---

## B14. Confidence Scoring

```python
def compute_confidence(parcel, metric):
    score = 1.0
    penalties = []

    if parcel.get("data_year", 2025) < 2024:
        score -= 0.10; penalties.append("Older source data")
    if metric in ("front_setback", "side_setback", "rear_setback"):
        score -= 0.05; penalties.append("Setback estimated from GIS, not surveyed")
    if parcel.get("EXIST_Bldg_Ftprt") is None:
        score -= 0.15; penalties.append("Missing building footprint data")
    if parcel.get("BLDG_TYPE") is None or parcel.get("BLDG_TYPE") == "":
        score -= 0.05; penalties.append("Building type not classified")

    gis_units = parcel.get("EXIST_Total_Res_Units")
    assessor_units = parcel.get("RES_UNITS")
    if gis_units and assessor_units and gis_units != assessor_units:
        score -= 0.10; penalties.append("Conflicting unit counts between sources")
    if parcel.get("proposed_district") is None:
        score -= 0.30; penalties.append("Proposed zoning district not determined")

    nc = parcel.get("nonconformity_flags", [])
    if len(nc) >= 2:
        score -= 0.10; penalties.append("Multiple nonconformities complicate analysis")

    return {"score": max(score, 0.0), "meets_threshold": score >= 0.90, "penalties": penalties}
```

---

## B15. Block Definition Algorithm

Edge case rules (from WR road data analysis: 3,667 segments, 40% lack cross-street names):

1. **Dead-end / cul-de-sac streets:** If the street has no intersections in the road network, the entire street is one block. Label: "Example Street — 14 properties."
2. **Dead end as virtual boundary:** If only one intersection is found, the block runs from that intersection to the end of the street. Label: "Example Street (past Oak Street) — 8 properties."
3. **Thin blocks (< 5 properties):** Expand to the adjacent segment and relabel. E.g., "Example Street (near Oak Street) — expanded view, 8 properties."
4. **Missing cross-street names:** Use road geometry to identify intersection points. Label as "between [nearest named cross-street] and [end of street]" rather than leaving blank.

```python
def define_block(target_parcel, all_parcels, street_network):
    street = target_parcel["ST_NAME"]
    same_street = [p for p in all_parcels if p["ST_NAME"] == street]
    same_street.sort(key=lambda p: parse_street_num(p["ST_NUM"]))

    target_num = parse_street_num(target_parcel["ST_NUM"])
    intersections = find_intersections(street, street_network)

    if len(intersections) == 0:
        # Dead-end street with no intersections — entire street is one block
        return {
            "id": slugify(street),
            "street": street,
            "bounds": f"{street} — {len(same_street)} properties",
            "parcels": same_street,
            "count": len(same_street),
        }

    lower_bound = find_nearest_intersection(street, target_num, "lower", intersections)
    upper_bound = find_nearest_intersection(street, target_num, "upper", intersections)

    # If only one bound found (dead end on one side)
    if lower_bound is None:
        lower_label = "end of street"
        lower_bound = min(parse_street_num(p["ST_NUM"]) for p in same_street)
    else:
        lower_label = get_cross_street_name(lower_bound, intersections) or "unnamed cross street"

    if upper_bound is None:
        upper_label = "end of street"
        upper_bound = max(parse_street_num(p["ST_NUM"]) for p in same_street)
    else:
        upper_label = get_cross_street_name(upper_bound, intersections) or "unnamed cross street"

    block_parcels = [
        p for p in same_street
        if lower_bound <= parse_street_num(p["ST_NUM"]) <= upper_bound
    ]

    if len(block_parcels) < 5:
        block_parcels, lower_bound, upper_bound, lower_label, upper_label = (
            expand_to_adjacent_segment(
                block_parcels, same_street, lower_bound, upper_bound, intersections))

    block_id = f"{slugify(street)}-{lower_bound}-{upper_bound}"

    return {
        "id": block_id, "street": street,
        "bounds": f"Between {lower_label} and {upper_label}",
        "parcels": block_parcels, "count": len(block_parcels),
    }
```

---

## B16. Permeable Area Calculation

```python
def compute_permeable_area(parcel):
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

    return {"sf": round(perm_sf), "pct": round(perm_pct, 1), "confidence": "high"}
```

---

## B17. Impact Scoring (Internal Only)

```python
def compute_impact_score(parcel, current_zoning, proposed_zoning, table):
    """Internal-only score (1-5). NOT displayed publicly."""
    score = 0.0

    proposed_units = get_effective_max_units(proposed_zoning, table)
    unit_delta = (proposed_units - current_zoning["max_units"])
    score += min(unit_delta / 3, 1.0) * 0.35

    for base_key in ["min_front_yard", "min_side_cumulative", "min_rear_yard"]:
        curr = current_zoning.get(base_key)
        prop_key = f"{base_key}_{table}"
        prop = proposed_zoning.get(prop_key) or proposed_zoning.get(base_key)
        if curr and prop and prop < curr:
            score += ((curr - prop) / curr) * (0.20 / 3)

    proposed_lc = proposed_zoning["max_lot_coverage"]
    if isinstance(proposed_lc, dict):
        lot_tier = get_lot_tier(parcel.get("EXIST_Lot_Size_Actual", 6000))
        proposed_lc = proposed_lc[lot_tier]
    lc_delta = proposed_lc - current_zoning["max_lot_coverage"]
    score += min(max(lc_delta / 0.20, 0), 1.0) * 0.15

    if proposed_zoning.get("parking_required", 0) == 0:
        score += 0.10

    h_delta = proposed_zoning["max_height"] - current_zoning["max_height"]
    score += min(max(h_delta / 15, 0), 1.0) * 0.10

    nc_flags = parcel.get("nonconformity_flags", [])
    if any(f["becomes_conforming"] for f in nc_flags):
        score += 0.05

    score += 0.05  # easement bonus always available

    if score < 0.15: return 1
    elif score < 0.30: return 2
    elif score < 0.50: return 3
    elif score < 0.70: return 4
    else: return 5
```

---

## B18. Easement Bonus Outcome Computation

The property page shows a collapsible "What if the sidewalk easement bonus is used?" section with per-property values. This re-runs the outcome computation with easement-modified rules.

```python
def compute_easement_bonus_outcome(parcel, proposed_zoning, table):
    district = parcel["proposed_district"]
    rules = PROPOSED_ZONING[district]
    bonus = rules["easement_bonus"]
    lot_size = parcel["EXIST_Lot_Size_Actual"]

    is_pre2027 = has_building(parcel) and get_applicable_table(
        parcel.get("YR_BUILT"), has_building(parcel)) == "C"

    # Units with easement
    if "max_units_pre2027" in bonus:
        easement_units = bonus["max_units_pre2027"] if is_pre2027 else bonus["max_units_new"]
    else:
        easement_units = bonus["max_units"]
    existing_units = parcel.get("EXIST_Total_Res_Units", 1)
    base_units = rules["max_units"]

    # Sloped Roof Story waiver
    sloped_roof_waived = bonus.get("sloped_roof_waived", False)

    # Modified setbacks (easement bonus may change side yard rules)
    easement_side_cum = bonus.get("side_cumulative")
    easement_side_min = bonus.get("side_min", rules["min_side_individual"])
    easement_front = bonus.get("front_yard", rules.get("min_front_yard"))
    easement_rear = bonus.get("rear_yard", rules.get(f"min_rear_yard_{table}"))

    # Table C dims always apply with easement (per legal text)
    easement_floor_plate = rules["max_floor_plate_C"]

    return {
        "units": {
            "base": base_units,
            "with_easement": easement_units,
            "delta": easement_units - base_units,
        },
        "sloped_roof_waived": sloped_roof_waived,
        "floor_plate": easement_floor_plate,
        "side_cumulative": easement_side_cum,
        "side_min": easement_side_min,
        "front_yard": easement_front,
        "rear_yard": easement_rear,
        "easement_area_sf": parcel.get("lot_frontage", 0) * 5,
        "table_applied": "C",
    }
```

---

## B19. Stories Inference

The comparison table has a "Stories" row. Existing stories must be inferred from available data.

```python
def infer_existing_stories(parcel):
    """
    Infer existing story count from assessor + building data.
    Priority: assessor floor count > height-based inference.
    """
    assessor_floors = parcel.get("RES_FLOOR") or parcel.get("CD_FLOOR")
    if assessor_floors and assessor_floors > 0:
        return {"stories": assessor_floors, "confidence": "high", "source": "assessor"}

    height = parcel.get("EXIST_BLDG_HGT_2010")
    if height:
        if height <= 15:
            stories = 1
        elif height <= 25:
            stories = 2
        elif height <= 35:
            stories = 2.5  # likely 2 with attic
        else:
            stories = 3
        return {"stories": stories, "confidence": "moderate", "source": "height_inference"}

    return {"stories": None, "confidence": "low", "source": None}

def compute_stories_outcome(parcel, proposed_zoning):
    existing = infer_existing_stories(parcel)
    proposed_max = proposed_zoning["max_stories"]
    sloped_roof = proposed_zoning.get("third_story_sloped_roof", False)

    if existing["stories"] is None:
        return {"text": "Needs property-specific review", "confidence": "low"}

    delta = proposed_max - existing["stories"]
    if delta >= 1:
        text = f"+{delta:.0f} story possible"
        if sloped_roof and proposed_max >= 3:
            text += " (third story must be Sloped Roof Story)"
        return {"text": text, "delta": delta, "confidence": existing["confidence"]}
    elif delta < 0:
        return {"text": "Existing exceeds proposed max (may remain)",
                "confidence": existing["confidence"]}
    else:
        return {"text": "No change", "confidence": existing["confidence"]}
```

---

## B20. Aggregate Distribution Formulas

### Roof Structure Distribution

```python
ROOF_LABELS = {
    "G": "Gable", "H": "Hip", "F": "Flat",
    "L": "Gambrel", "M": "Mansard", "S": "Shed",
}

def compute_roof_distribution(parcels):
    roofs = {}
    for p in parcels:
        rs = p.get("ROOF_STRUCTURE", "") or ""
        label = ROOF_LABELS.get(rs, "Unknown")
        roofs[label] = roofs.get(label, 0) + 1
    total = sum(roofs.values())
    return {k: {"count": v, "pct": round(v/total*100)}
            for k, v in sorted(roofs.items(), key=lambda x: -x[1])}
```

### District Distribution

```python
def compute_district_distribution(parcels):
    districts = {}
    for p in parcels:
        d = p.get("proposed_district", "Unknown")
        districts[d] = districts.get(d, 0) + 1
    total = sum(districts.values())
    return {k: {"count": v, "pct": round(v/total*100)}
            for k, v in sorted(districts.items())}
```

### Lot-Size Tier Variation Detection

```python
def detect_lot_size_variation(block_parcels):
    """Returns True if block contains multiple lot-size tiers."""
    tiers = set()
    for p in block_parcels:
        ls = p.get("EXIST_Lot_Size_Actual")
        if ls:
            tiers.add(get_lot_tier(ls))
    return {
        "has_variation": len(tiers) > 1,
        "tiers_present": sorted(tiers),
        "min_lot": min(p.get("EXIST_Lot_Size_Actual", 0)
                       for p in block_parcels
                       if p.get("EXIST_Lot_Size_Actual")),
        "max_lot": max(p.get("EXIST_Lot_Size_Actual", 0)
                       for p in block_parcels
                       if p.get("EXIST_Lot_Size_Actual")),
    }
```

---

## B21. Nonconformity-Constrained Vertical Extension (Section 20-5)

When a property has nonconforming setbacks or permeable area, the Potential Outcome engine must apply Section 20-5 constraints to height/stories outcomes.

```python
def apply_section_20_5_constraints(parcel, outcomes, nc_flags, proposed_zoning):
    """
    Section 20-5 rules:
    - Vertical extension allowed IF within existing building floor plate
    - May not exceed maximum building height
    - Must comply with Sloped Roof Story requirements

    If any setback is nonconforming, additional stories/height are constrained
    to the existing footprint (no horizontal expansion in that direction).
    """
    has_setback_nc = any(
        f["metric"] in ("front_setback", "side_setback_cum", "rear_setback")
        and f["nonconforming_proposed"]
        for f in nc_flags
    )

    if not has_setback_nc:
        return outcomes  # no constraints needed

    existing_fp = parcel.get("EXIST_Bldg_Ftprt")
    proposed_max_fp = proposed_zoning.get(f"max_floor_plate_{parcel.get('table', 'B')}")

    if existing_fp and proposed_max_fp and existing_fp > proposed_max_fp:
        outcomes["floor_plate"]["text"] = (
            "Existing footprint exceeds proposed max. Vertical extension "
            "within existing footprint permitted (Section 20-5); "
            "horizontal expansion restricted by nonconforming setback."
        )
        outcomes["floor_plate"]["constrained_by_20_5"] = True

    if "height" in outcomes and outcomes["height"].get("delta", 0) > 0:
        outcomes["height"]["text"] += (
            " (vertical extension must stay within existing footprint "
            "per Section 20-5)"
        )
        outcomes["height"]["constrained_by_20_5"] = True

    return outcomes
```
