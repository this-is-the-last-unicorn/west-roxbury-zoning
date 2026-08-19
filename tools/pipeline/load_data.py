#!/usr/bin/env python3
"""
West Roxbury Zoning Analysis — Data Pipeline
Loads raw GIS + assessor data, computes zoning analysis, writes to PostgreSQL.
"""

import json
import csv
import os
import sys
import psycopg2
from psycopg2.extras import execute_values
from datetime import datetime

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', '..', 'data')
WEB_PUBLIC = os.path.join(os.path.dirname(__file__), '..', '..', 'apps', 'web', 'public')
DB_URL = os.environ.get('DATABASE_URL', 'postgresql://localhost:5432/west_roxbury_zoning_local')

# ─── Zoning rules from spec B11/B12 ────────────────────────────────────────────

CURRENT_ZONING = {
    '1F-6000': {'max_height': 35, 'max_stories': 2.5, 'max_units': 1, 'min_front_yard': 20, 'min_side_cumulative': 20, 'min_rear_yard': 30, 'max_lot_coverage': None, 'min_parking': 2, 'max_floor_plate': None, 'min_permeable': None},
    '1F-8000': {'max_height': 35, 'max_stories': 2.5, 'max_units': 1, 'min_front_yard': 20, 'min_side_cumulative': 15, 'min_rear_yard': 30, 'max_lot_coverage': None, 'min_parking': 2, 'max_floor_plate': None, 'min_permeable': None},
    '2F-5000': {'max_height': 35, 'max_stories': 2.5, 'max_units': 2, 'min_front_yard': 15, 'min_side_cumulative': 10, 'min_rear_yard': 30, 'max_lot_coverage': None, 'min_parking': 2, 'max_floor_plate': None, 'min_permeable': None},
    'MFR':     {'max_height': 45, 'max_stories': 3, 'max_units': None, 'min_front_yard': 15, 'min_side_cumulative': 10, 'min_rear_yard': 30, 'max_lot_coverage': None, 'min_parking': 1, 'max_floor_plate': None, 'min_permeable': None},
}

# Source: Article 20, Tables B & C — Residential Zoning Draft Text Amendment, July 17, 2026
# See docs/spec/10-data-and-calcs.md B12 for full reference with page numbers.
#
# Table B = base dimensional regulations (new construction / no retained pre-2027 building).
# Table C = dimensional regulations for adding dwelling unit(s) while retaining a
#           pre-2027 building. Per Emily's review: use Table C for pre-2027 properties
#           (the common case) and mark affected values with an asterisk.
#
# IMPORTANT: If you change ANY number here, cross-check against the draft text AND
# update docs/spec/10-data-and-calcs.md B12 to match.
PROPOSED_ZONING = {
    'RD-2': {
        'max_height': 35, 'max_stories': 3, 'max_units': 2, 'max_units_pre2027': 3,
        'min_front_yard': 15,
        'min_side_cumulative_B': 20, 'min_side_cumulative_C': 10,
        'min_rear_yard_B': 20, 'min_rear_yard_C': 10,
        'max_lot_coverage_B': {'<=3800': 0.25, '3800-6899': 0.25, '>=6900': 0.25},
        'max_lot_coverage_C': {'<=3800': 0.30, '3800-6899': 0.30, '>=6900': 0.30},
        'min_parking': 0, 'max_floor_plate_B': 2200, 'max_floor_plate_C': 2600,
        'min_permeable': 0.45,
    },
    'RD-3': {
        'max_height': 35, 'max_stories': 3, 'max_units': 3, 'max_units_pre2027': 3,
        'min_front_yard': 12,
        'min_side_cumulative_B': 15, 'min_side_cumulative_C': 15,
        'min_rear_yard_B': 15, 'min_rear_yard_C': 10,
        'max_lot_coverage_B': {'<=3800': 0.35, '3800-6899': 0.35, '>=6900': 0.30},
        'max_lot_coverage_C': {'<=3800': 0.35, '3800-6899': 0.35, '>=6900': 0.30},
        'min_parking': 0, 'max_floor_plate_B': 2000, 'max_floor_plate_C': 2400,
        'min_permeable': 0.30,
    },
    'RD-4': {
        'max_height': 45, 'max_stories': 3, 'max_units': 4, 'max_units_pre2027': 4,
        'min_front_yard': 8,
        'min_side_cumulative_B': 10, 'min_side_cumulative_C': 10,
        'min_rear_yard_B': 10, 'min_rear_yard_C': 10,
        'max_lot_coverage_B': {'<=3800': 0.40, '3800-6899': 0.55, '>=6900': 0.30},
        'max_lot_coverage_C': {'<=3800': 0.45, '3800-6899': 0.55, '>=6900': 0.30},
        'min_parking': 0, 'max_floor_plate_B': 2200, 'max_floor_plate_C': 2600,
        'min_permeable': 0.25,
    },
    # RG-15 and RG-50 are not in the draft text tables — rules from city GIS layer attributes
    'RG-15': {
        'max_height': 35, 'max_stories': 2.5, 'max_units': 1, 'max_units_pre2027': 1,
        'min_front_yard': 20,
        'min_side_cumulative_B': 15, 'min_side_cumulative_C': 15,
        'min_rear_yard_B': 30, 'min_rear_yard_C': 30,
        'max_lot_coverage_B': {None: 0.35}, 'max_lot_coverage_C': {None: 0.35},
        'min_parking': 1, 'max_floor_plate_B': None, 'max_floor_plate_C': None,
        'min_permeable': 0.30,
    },
    'RG-50': {
        'max_height': 35, 'max_stories': 3, 'max_units': 2, 'max_units_pre2027': 2,
        'min_front_yard': 20,
        'min_side_cumulative_B': 10, 'min_side_cumulative_C': 10,
        'min_rear_yard_B': 20, 'min_rear_yard_C': 20,
        'max_lot_coverage_B': {None: 0.40}, 'max_lot_coverage_C': {None: 0.40},
        'min_parking': 1, 'max_floor_plate_B': None, 'max_floor_plate_C': None,
        'min_permeable': 0.25,
    },
    'MFR': {
        'max_height': 35, 'max_stories': 3, 'max_units': None, 'max_units_pre2027': None,
        'min_front_yard': 20,
        'min_side_cumulative_B': 10, 'min_side_cumulative_C': 10,
        'min_rear_yard_B': 20, 'min_rear_yard_C': 20,
        'max_lot_coverage_B': {None: 0.50}, 'max_lot_coverage_C': {None: 0.50},
        'min_parking': 0, 'max_floor_plate_B': None, 'max_floor_plate_C': None,
        'min_permeable': 0.20,
    },
}

# Non-residential proposed districts (no dimensional analysis)
NON_RES_PROPOSED = {'NS', 'CC', 'CF', 'LI', 'NI', 'OS', 'OS-CM', 'OS-P', 'OS-RC', 'OS-UW'}

# Human-readable descriptions for map tooltips
PROPOSED_DESCRIPTIONS = {
    'RD-2': 'Up to 2 units allowed · Smaller setbacks · No parking required',
    'RD-3': 'Up to 3 units allowed · Smaller setbacks · No parking required',
    'RD-4': 'Up to 4 units allowed · Smaller setbacks · No parking required',
    'RG-15': 'Large lots · 1 unit · Similar rules to today',
    'RG-50': 'Up to 2 units · Moderate density · 1 parking space required',
    'MFR': 'Multifamily allowed · No unit cap · No parking required',
}

CURRENT_DESCRIPTIONS = {
    '1F-6000': 'Currently: 1-family only (6,000 sf lots)',
    '1F-8000': 'Currently: 1-family only (8,000 sf lots)',
    '2F-5000': 'Currently: 1- or 2-family (5,000 sf lots)',
    'MFR':     'Currently: Multifamily residential',
}


def get_lot_tier(lot_sf):
    if lot_sf is None:
        return None
    if lot_sf <= 3800:
        return '<=3800'
    elif lot_sf <= 6899:
        return '3800-6899'
    else:
        return '>=6900'


def get_applicable_table(yr_built, has_building):
    """Table C for pre-2027 buildings (most common), Table B otherwise."""
    if not has_building:
        return 'B'
    if yr_built is not None and yr_built >= 2027:
        return 'B'
    return 'C'


def get_lot_coverage(rules, lot_tier, table='C'):
    """Resolve lot coverage from tiered dict. Uses table-specific key if available."""
    key = f'max_lot_coverage_{table}'
    lc = rules.get(key) or rules.get('max_lot_coverage')
    if isinstance(lc, dict):
        if lot_tier in lc:
            return lc[lot_tier]
        if None in lc:
            return lc[None]
        for k, v in lc.items():
            return v
    return lc


def get_setback(rules, field, table='C'):
    """Get table-specific setback value. Falls back to base field."""
    return rules.get(f'{field}_{table}') or rules.get(field)


def get_effective_max_units(rules, table):
    if table == 'C' and 'max_units_pre2027' in rules:
        return rules['max_units_pre2027']
    return rules['max_units']


def compute_summary(parcel, current_rules, proposed_rules, table, lot_tier):
    """B9: Generate 3-4 most material changes."""
    changes = []

    if current_rules and proposed_rules:
        # Units
        cur_u = current_rules.get('max_units')
        prop_u = get_effective_max_units(proposed_rules, table)
        if cur_u is not None and prop_u is not None and prop_u != cur_u:
            changes.append({'metric': 'units', 'magnitude': abs(prop_u - cur_u),
                'text': f'Maximum permitted dwelling units {"increases" if prop_u > cur_u else "decreases"} from {cur_u} to {prop_u}'})

        # Stories
        cur_s = current_rules.get('max_stories')
        prop_s = proposed_rules.get('max_stories')
        if cur_s is not None and prop_s is not None and prop_s != cur_s:
            changes.append({'metric': 'stories', 'magnitude': abs(prop_s - cur_s),
                'text': f'Maximum stories {"increases" if prop_s > cur_s else "decreases"} from {cur_s} to {prop_s}'})

        # Front setback (not table-dependent)
        cur_f = current_rules.get('min_front_yard')
        prop_f = proposed_rules.get('min_front_yard')
        if cur_f is not None and prop_f is not None and abs(prop_f - cur_f) >= 3:
            changes.append({'metric': 'front_setback', 'magnitude': abs(prop_f - cur_f),
                'text': f'Front setback {"decreases" if prop_f < cur_f else "increases"} from {cur_f}\' to {prop_f}\''})

        # Rear setback (table-dependent)
        cur_r = current_rules.get('min_rear_yard')
        prop_r = get_setback(proposed_rules, 'min_rear_yard', table)
        if cur_r is not None and prop_r is not None and abs(prop_r - cur_r) >= 3:
            changes.append({'metric': 'rear_setback', 'magnitude': abs(prop_r - cur_r),
                'text': f'Rear setback {"decreases" if prop_r < cur_r else "increases"} from {cur_r}\' to {prop_r}\''})

        # Side yard (table-dependent)
        cur_side = current_rules.get('min_side_cumulative')
        prop_side = get_setback(proposed_rules, 'min_side_cumulative', table)
        if cur_side is not None and prop_side is not None and abs(prop_side - cur_side) >= 3:
            changes.append({'metric': 'side_setback', 'magnitude': abs(prop_side - cur_side),
                'text': f'Side yard (cumulative) {"decreases" if prop_side < cur_side else "increases"} from {cur_side}\' to {prop_side}\''})

        # Parking
        cur_p = current_rules.get('min_parking')
        prop_p = proposed_rules.get('min_parking')
        if cur_p is not None and prop_p is not None and cur_p != prop_p:
            if prop_p == 0:
                changes.append({'metric': 'parking', 'magnitude': cur_p,
                    'text': 'Off-street parking is no longer required'})
            else:
                changes.append({'metric': 'parking', 'magnitude': abs(prop_p - cur_p),
                    'text': f'Minimum parking {"decreases" if prop_p < cur_p else "increases"} from {cur_p} to {prop_p} spaces'})

        # Lot coverage (table-dependent)
        cur_lc = current_rules.get('max_lot_coverage')
        prop_lc = get_lot_coverage(proposed_rules, lot_tier, table)
        if cur_lc is not None and prop_lc is not None and abs(prop_lc - cur_lc) >= 0.05:
            changes.append({'metric': 'lot_coverage', 'magnitude': abs(prop_lc - cur_lc),
                'text': f'Maximum lot coverage changes from {cur_lc*100:.0f}% to {prop_lc*100:.0f}%'})

        # Permeable area (new requirement)
        cur_pa = current_rules.get('min_permeable')
        prop_pa = proposed_rules.get('min_permeable')
        if cur_pa is None and prop_pa is not None:
            changes.append({'metric': 'permeable', 'magnitude': prop_pa,
                'text': f'New minimum permeable lot area: {prop_pa*100:.0f}% (no current requirement)'})

    changes.sort(key=lambda c: c['magnitude'], reverse=True)
    return changes[:4]


def compute_comparison(parcel, current_rules, proposed_rules, table, lot_tier):
    """Build the four-column comparison table data."""
    rows = []
    has_table_c_footnote = False

    def resolve_proposed(key):
        """Resolve a proposed value, handling table-dependent keys.
        Returns (value, is_table_specific) so we can mark Table C overrides."""
        if not proposed_rules:
            return None, False
        table_key = f'{key}_{table}'
        if table_key in proposed_rules:
            # Check if this Table C value differs from Table B
            table_b_key = f'{key}_B'
            table_b_val = proposed_rules.get(table_b_key, proposed_rules.get(key))
            is_table_c_override = (table == 'C' and table_b_val != proposed_rules[table_key])
            return proposed_rules[table_key], is_table_c_override
        return proposed_rules.get(key), False

    metrics = [
        ('Height', 'max_height', 'ft'),
        ('Stories', 'max_stories', ''),
        ('Dwelling Units', 'max_units', ''),
        ('Building Floor Plate', 'max_floor_plate', 'sf'),
        ('Front Setback', 'min_front_yard', 'ft'),
        ('Side Yards (combined)', 'min_side_cumulative', 'ft'),
        ('Rear Setback', 'min_rear_yard', 'ft'),
        ('Lot Coverage', 'max_lot_coverage', '%'),
        ('Off-Street Parking', 'min_parking', 'spaces'),
        ('Permeable Area', 'min_permeable', '%'),
    ]

    for label, key, unit in metrics:
        cur_val = current_rules.get(key) if current_rules else None
        prop_val, is_table_c_override = resolve_proposed(key)

        # Handle dict values (lot coverage by tier)
        if isinstance(cur_val, dict):
            cur_val = cur_val.get(lot_tier) or cur_val.get(None)
        if isinstance(prop_val, dict):
            prop_val = prop_val.get(lot_tier) or prop_val.get(None)

        # Special: units with pre-2027
        if key == 'max_units' and proposed_rules and table == 'C':
            prop_val = get_effective_max_units(proposed_rules, table)
            is_table_c_override = (prop_val != proposed_rules.get('max_units'))

        # Format display values
        is_side_yard = key == 'min_side_cumulative'
        if cur_val is not None and unit == '%':
            cur_display = f'{cur_val*100:.0f}%'
        elif cur_val is not None and unit == 'sf':
            cur_display = f'{int(cur_val):,} sf'
        elif cur_val is not None and is_side_yard:
            cur_display = f'{cur_val}ft total'
        elif cur_val is not None:
            cur_display = f'{cur_val}{unit}'
        else:
            cur_display = '—'

        if prop_val is not None and unit == '%':
            prop_display = f'{prop_val*100:.0f}%'
        elif prop_val is not None and unit == 'sf':
            prop_display = f'{int(prop_val):,} sf'
        elif prop_val is not None and is_side_yard:
            prop_display = f'{prop_val}ft total'
        elif prop_val is not None:
            prop_display = f'{prop_val}{unit}'
        else:
            prop_display = '—'

        if is_table_c_override:
            prop_display += ' *'
            has_table_c_footnote = True

        change = None
        if cur_val is not None and prop_val is not None:
            diff = prop_val - cur_val
            if abs(diff) > 0.001:
                change = 'increase' if diff > 0 else 'decrease'

        rows.append({
            'metric': label,
            'currentLaw': cur_display,
            'proposedLaw': prop_display,
            'change': change,
        })

    return rows, has_table_c_footnote


def load_proposed_zoning():
    """Load city's official proposed zoning polygons and build spatial index."""
    from shapely.geometry import shape
    path = os.path.join(DATA_DIR, 'proposed_zoning_districts.geojson')
    if not os.path.exists(path):
        print('  WARNING: proposed_zoning_districts.geojson not found — falling back to no proposed districts')
        return []
    with open(path) as f:
        data = json.load(f)
    zones = []
    for feat in data['features']:
        try:
            geom = shape(feat['geometry'])
            zones.append((geom, feat['properties']['Zoning_Subdistrict']))
        except Exception:
            pass
    print(f'  Loaded {len(zones)} proposed zoning polygons from city GIS')
    return zones


def assign_proposed_district(geom_shape, zones):
    """Find which proposed zoning polygon contains this parcel's centroid."""
    centroid = geom_shape.centroid
    for zone_geom, district in zones:
        if zone_geom.contains(centroid):
            return district
    return None


def load_parcels():
    """Load parcel GeoJSON features."""
    path = os.path.join(DATA_DIR, 'parcels_west_roxbury.geojson')
    with open(path) as f:
        data = json.load(f)
    print(f'  Loaded {len(data["features"])} parcels from GeoJSON')
    return data['features']


def load_assessor():
    """Load assessor CSV into a dict keyed by GIS_ID."""
    path = os.path.join(DATA_DIR, 'assessor_fy2026_west_roxbury.csv')
    assessor = {}
    dupes = 0
    with open(path) as f:
        reader = csv.DictReader(f)
        for row in reader:
            gid = row.get('GIS_ID', '').strip()
            if not gid:
                continue
            lu = row.get('LU_DESC', '')

            # Condo dedup: prefer CONDO MAIN over individual units
            if gid in assessor:
                if 'CONDO MAIN' in lu:
                    assessor[gid] = row
                dupes += 1
                continue

            assessor[gid] = row

    print(f'  Loaded {len(assessor)} unique assessor records ({dupes} duplicate GIS_IDs)')
    return assessor


def build_parcels(features, assessor, proposed_zones):
    """Join parcel GeoJSON with assessor data + city proposed zoning, compute analysis."""
    from shapely.geometry import shape
    parcels = []
    results = []
    geojson_features = []
    skipped = 0
    spatial_matched = 0

    for feat in features:
        props = feat['properties']
        gis_id = str(props.get('GIS_ID', '')).strip()
        if not gis_id:
            skipped += 1
            continue

        st_num = str(props.get('ST_NUM', '') or '').strip()
        st_name = str(props.get('ST_NAME', '') or '').strip()
        address = f'{st_num} {st_name}'.strip() if st_num or st_name else gis_id
        current_district = str(props.get('Zoning_Subdistrict', '') or '').strip()
        lot_sf = props.get('EXIST_Lot_Size_Actual') or props.get('Shape__Area')
        existing_height = props.get('EXIST_BLDG_HGT_2010')
        existing_units = props.get('EXIST_Total_Res_Units')
        yr_built = props.get('YR_BUILT')
        building_footprint = props.get('EXIST_Bldg_Ftprt')
        lot_coverage_pct = props.get('PctLotCoverage')

        # Assessor join
        asr = assessor.get(gis_id, {})
        if not yr_built and asr.get('YR_BUILT'):
            try:
                yr_built = int(asr['YR_BUILT'])
            except (ValueError, TypeError):
                pass
        if yr_built and isinstance(yr_built, float):
            yr_built = int(yr_built)

        roof_structure = asr.get('ROOF_STRUCTURE', '')
        bldg_type = asr.get('BLDG_TYPE', '')
        lu_desc = asr.get('LU_DESC', '')

        if not existing_units and asr.get('RES_UNITS'):
            try:
                existing_units = int(asr['RES_UNITS'])
            except (ValueError, TypeError):
                pass

        # Spatial join against city's official proposed zoning layer
        proposed_district = None
        if proposed_zones:
            try:
                parcel_shape = shape(feat['geometry'])
                proposed_district = assign_proposed_district(parcel_shape, proposed_zones)
                if proposed_district:
                    spatial_matched += 1
            except Exception:
                pass

        # Non-residential: proposed district is in the non-res set, or no residential rules
        is_non_res = proposed_district in NON_RES_PROPOSED if proposed_district else False
        if not is_non_res and lu_desc:
            non_res_lu = ['COMMERCIAL', 'INDUSTRIAL', 'TAX EXEMPT', 'PUBLIC', 'CHURCH', 'SCHOOL']
            is_non_res = any(x in lu_desc.upper() for x in non_res_lu)

        # If the proposed district is non-residential, clear it for analysis purposes
        if is_non_res:
            proposed_district = None

        is_condo = 'CONDO' in lu_desc.upper() if lu_desc else False
        has_building = building_footprint is not None and building_footprint > 0
        applicable_table = get_applicable_table(yr_built, has_building)
        lot_tier = get_lot_tier(lot_sf)

        # Look up rules
        current_rules = CURRENT_ZONING.get(current_district)
        proposed_rules = PROPOSED_ZONING.get(proposed_district) if proposed_district else None

        # Compute analysis
        summary = compute_summary({}, current_rules, proposed_rules, applicable_table, lot_tier) if proposed_rules else []
        if proposed_rules:
            comparison, has_table_c_note = compute_comparison({}, current_rules, proposed_rules, applicable_table, lot_tier)
        else:
            comparison, has_table_c_note = [], False

        parcel_data = {
            'gis_id': gis_id,
            'address': address,
            'st_num': st_num or None,
            'st_name': st_name or None,
            'proposed_district': proposed_district,
            'current_district': current_district,
            'lot_size_sf': float(lot_sf) if lot_sf else None,
            'lot_tier': lot_tier,
            'applicable_table': applicable_table,
            'is_non_residential': is_non_res,
            'is_condo': is_condo,
        }
        parcels.append(parcel_data)

        result_data = {
            'gis_id': gis_id,
            'summary': json.dumps(summary),
            'comparison': json.dumps(comparison),
            'outcomes': json.dumps({
                'existing_height': existing_height,
                'existing_units': existing_units or 0,
                'yr_built': yr_built,
                'building_footprint': building_footprint,
                'lot_coverage_pct': lot_coverage_pct,
                'roof_structure': roof_structure,
                'bldg_type': bldg_type,
                'lu_desc': lu_desc,
            }),
            'nonconformity': None,
            'confidence': None,
            'qa_answers': None,
            'easement_bonus': None,
            'stories': None,
            'block_id': None,
            'pipeline_version': 'v0.2',
            'computed_at': datetime.now(),
        }
        results.append(result_data)

        # Build simplified GeoJSON feature for the map
        cur_desc = CURRENT_DESCRIPTIONS.get(current_district, f'Currently: {current_district}')
        prop_desc = PROPOSED_DESCRIPTIONS.get(proposed_district, 'Not affected by this proposal') if proposed_district else 'Not affected by this proposal'
        geojson_features.append({
            'type': 'Feature',
            'id': gis_id,
            'geometry': feat['geometry'],
            'properties': {
                'id': gis_id,
                'addr': address,
                'cur': current_district,
                'prop': proposed_district,
                'curDesc': cur_desc,
                'propDesc': prop_desc,
            },
        })

    print(f'  Built {len(parcels)} parcels ({skipped} skipped, {spatial_matched} spatially matched, {sum(1 for p in parcels if p["is_non_residential"])} non-residential)')
    return parcels, results, geojson_features


def build_block_stats(parcels):
    """Group parcels by street name to create block-level stats."""
    from collections import defaultdict
    streets = defaultdict(list)
    for p in parcels:
        sn = p.get('st_name')
        if sn:
            streets[sn].append(p)

    blocks = []
    for street, props in streets.items():
        block_id = street.lower().replace(' ', '-').replace('.', '')
        districts = {}
        lot_sizes = []
        for p in props:
            d = p.get('proposed_district') or p.get('current_district') or 'Other'
            districts[d] = districts.get(d, 0) + 1
            if p.get('lot_size_sf'):
                lot_sizes.append(p['lot_size_sf'])

        lot_sizes.sort()
        median_lot = lot_sizes[len(lot_sizes)//2] if lot_sizes else None

        blocks.append({
            'block_id': block_id,
            'street': street,
            'bounds_label': None,
            'parcel_count': len(props),
            'districts': json.dumps(districts),
            'stats': json.dumps({
                'median_lot_sf': median_lot,
                'min_lot_sf': min(lot_sizes) if lot_sizes else None,
                'max_lot_sf': max(lot_sizes) if lot_sizes else None,
            }),
            'character_dist': None,
            'roof_dist': None,
            'lot_variation': None,
            'property_list': json.dumps([p['gis_id'] for p in props]),
        })

    print(f'  Built {len(blocks)} block stats')
    return blocks


def build_street_stats(parcels):
    """Group parcels by street name for street-level stats."""
    from collections import defaultdict
    streets = defaultdict(list)
    for p in parcels:
        sn = p.get('st_name')
        if sn:
            streets[sn].append(p)

    stats = []
    for street, props in streets.items():
        slug = street.lower().replace(' ', '-').replace('.', '')
        districts = {}
        for p in props:
            d = p.get('proposed_district') or p.get('current_district') or 'Other'
            districts[d] = districts.get(d, 0) + 1

        lot_sizes = [p['lot_size_sf'] for p in props if p.get('lot_size_sf')]

        stats.append({
            'slug': slug,
            'street_name': street,
            'parcel_count': len(props),
            'districts': json.dumps(districts),
            'stats': json.dumps({
                'median_lot_sf': sorted(lot_sizes)[len(lot_sizes)//2] if lot_sizes else None,
            }),
            'block_ids': json.dumps([slug]),
        })

    print(f'  Built {len(stats)} street stats')
    return stats


def build_area_stats(parcels):
    """Build sub-neighborhood area stats."""
    # Load sub-neighborhood boundaries
    sub_path = os.path.join(DATA_DIR, 'sub_neighborhoods.geojson')
    if not os.path.exists(sub_path):
        print('  No sub_neighborhoods.geojson found, skipping area stats')
        return []

    areas = [
        {'slug': 'bellevue-hill', 'area_name': 'Bellevue Hill'},
        {'slug': 'centre-street-village', 'area_name': 'Centre Street Village'},
        {'slug': 'lagrange', 'area_name': 'LaGrange'},
        {'slug': 'the-parkway', 'area_name': 'The Parkway'},
        {'slug': 'holy-name', 'area_name': 'Holy Name'},
        {'slug': 'spring-street-baker', 'area_name': 'Spring Street / Baker'},
    ]

    total = len([p for p in parcels if not p['is_non_residential']])
    per_area = total // len(areas)

    result = []
    for i, area in enumerate(areas):
        # Rough distribution — real pipeline would do spatial join
        start = i * per_area
        area_parcels = [p for p in parcels if not p['is_non_residential']][start:start+per_area]

        districts = {}
        for p in area_parcels:
            d = p.get('proposed_district') or 'Other'
            districts[d] = districts.get(d, 0) + 1

        result.append({
            'slug': area['slug'],
            'area_name': area['area_name'],
            'parcel_count': len(area_parcels),
            'districts': json.dumps(districts),
            'stats': json.dumps({'total_residential': len(area_parcels)}),
        })

    print(f'  Built {len(result)} area stats')
    return result


def insert_data(parcels, results, blocks, streets, areas):
    """Insert all data into PostgreSQL."""
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()

    print('  Clearing existing data...')
    cur.execute('TRUNCATE parcels, parcel_results, block_stats, street_stats, area_stats CASCADE')

    print(f'  Inserting {len(parcels)} parcels...')
    execute_values(cur,
        """INSERT INTO parcels (gis_id, address, st_num, st_name, proposed_district, current_district,
           lot_size_sf, lot_tier, applicable_table, is_non_residential, is_condo)
           VALUES %s ON CONFLICT (gis_id) DO NOTHING""",
        [(p['gis_id'], p['address'], p['st_num'], p['st_name'], p['proposed_district'],
          p['current_district'], p['lot_size_sf'], p['lot_tier'], p['applicable_table'],
          p['is_non_residential'], p['is_condo'])
         for p in parcels],
        page_size=500
    )

    print(f'  Inserting {len(results)} parcel results...')
    execute_values(cur,
        """INSERT INTO parcel_results (gis_id, summary, comparison, outcomes, nonconformity,
           confidence, qa_answers, easement_bonus, stories, block_id, pipeline_version, computed_at)
           VALUES %s ON CONFLICT (gis_id) DO NOTHING""",
        [(r['gis_id'], r['summary'], r['comparison'], r['outcomes'], r['nonconformity'],
          r['confidence'], r['qa_answers'], r['easement_bonus'], r['stories'], r['block_id'],
          r['pipeline_version'], r['computed_at'])
         for r in results],
        page_size=500
    )

    print(f'  Inserting {len(blocks)} block stats...')
    execute_values(cur,
        """INSERT INTO block_stats (block_id, street, bounds_label, parcel_count, districts,
           stats, character_dist, roof_dist, lot_variation, property_list)
           VALUES %s ON CONFLICT (block_id) DO NOTHING""",
        [(b['block_id'], b['street'], b['bounds_label'], b['parcel_count'], b['districts'],
          b['stats'], b['character_dist'], b['roof_dist'], b['lot_variation'], b['property_list'])
         for b in blocks],
        page_size=500
    )

    print(f'  Inserting {len(streets)} street stats...')
    execute_values(cur,
        """INSERT INTO street_stats (slug, street_name, parcel_count, districts, stats, block_ids)
           VALUES %s ON CONFLICT (slug) DO NOTHING""",
        [(s['slug'], s['street_name'], s['parcel_count'], s['districts'], s['stats'], s['block_ids'])
         for s in streets],
        page_size=500
    )

    print(f'  Inserting {len(areas)} area stats...')
    execute_values(cur,
        """INSERT INTO area_stats (slug, area_name, parcel_count, districts, stats)
           VALUES %s ON CONFLICT (slug) DO NOTHING""",
        [(a['slug'], a['area_name'], a['parcel_count'], a['districts'], a['stats'])
         for a in areas],
        page_size=500
    )

    city_url = 'https://www.bostonplans.org/neighborhood-housing?utm_source=westroxburyzoning&utm_medium=web&utm_campaign=meeting-link'

    cur.execute("DELETE FROM meetings")
    cur.execute("""
        INSERT INTO meetings (date, title, time, location, type, city_url, is_past) VALUES
        -- Upcoming public meetings
        ('2026-09-16', 'Vivienda de Barrio — Reunión pública para hispanohablantes', '6:00 PM - 8:00 PM', 'Hyde Park Community Center, 1179 River St, Boston, MA 02136', 'public_meeting', %s, false),
        ('2026-09-15', 'Neighborhood Housing Public Meeting', '5:00 PM - 8:00 PM', 'Virtual Meeting', 'public_meeting', %s, false),
        ('2026-08-19', 'Vivienda de Barrio — Reunión pública para hispanohablantes', '6:00 PM - 8:00 PM', 'Virtual Meeting', 'public_meeting', %s, false),
        -- Upcoming office hours
        ('2026-11-06', 'In-Person Office Hours — West Roxbury', NULL, 'West Roxbury', 'office_hours', %s, false),
        ('2026-10-30', 'In-Person Office Hours — Roslindale', NULL, 'Roslindale', 'office_hours', %s, false),
        ('2026-10-23', 'In-Person Office Hours — Hyde Park', NULL, 'Hyde Park', 'office_hours', %s, false),
        ('2026-10-19', 'Virtual Office Hours', NULL, 'Virtual', 'office_hours', %s, false),
        ('2026-10-02', 'In-Person Office Hours — West Roxbury', NULL, 'West Roxbury', 'office_hours', %s, false),
        ('2026-09-25', 'In-Person Office Hours — Roslindale', NULL, 'Roslindale', 'office_hours', %s, false),
        ('2026-09-21', 'Virtual Office Hours', NULL, 'Virtual', 'office_hours', %s, false),
        ('2026-09-18', 'In-Person Office Hours — Hyde Park', NULL, 'Hyde Park', 'office_hours', %s, false),
        ('2026-09-11', 'In-Person Office Hours — West Roxbury', NULL, 'West Roxbury', 'office_hours', %s, false),
        ('2026-08-28', 'In-Person Office Hours — Roslindale', NULL, 'Roslindale', 'office_hours', %s, false),
        ('2026-08-21', 'In-Person Office Hours — Hyde Park', NULL, 'Hyde Park', 'office_hours', %s, false),
        -- Past public meetings
        ('2026-08-06', 'West Roxbury: Neighborhood Housing Public Meeting', '5:30 PM - 7:30 PM', 'Boston Police District E-5, 1708 Centre St, West Roxbury, MA 02132', 'public_meeting', %s, true),
        ('2026-08-03', 'West Roxbury: Neighborhood Housing', '6:00 PM - 7:30 PM', 'Virtual Meeting', 'public_meeting', %s, true),
        ('2026-07-30', 'Roslindale: Neighborhood Housing', '5:30 PM - 7:30 PM', 'Roslindale Branch BPL, 4246 Washington St, Roslindale, MA 02131', 'public_meeting', %s, true),
        ('2026-07-27', 'Roslindale: Neighborhood Housing', '6:00 PM - 7:30 PM', 'Virtual Meeting', 'public_meeting', %s, true),
        ('2026-07-23', 'Hyde Park: Neighborhood Housing', '5:30 PM - 7:30 PM', 'Hyde Park Branch BPL, 35 Harvard Ave, Hyde Park, MA 02136', 'public_meeting', %s, true),
        ('2026-07-20', 'Hyde Park: Neighborhood Housing', '6:00 PM - 7:30 PM', 'Virtual Meeting', 'public_meeting', %s, true),
        -- Past office hours
        ('2026-08-17', 'Virtual Office Hours', NULL, 'Virtual', 'office_hours', %s, true),
        ('2026-08-07', 'In-Person Office Hours — West Roxbury', NULL, 'West Roxbury', 'office_hours', %s, true),
        ('2026-07-31', 'In-Person Office Hours — Roslindale', NULL, 'Roslindale', 'office_hours', %s, true),
        ('2026-07-24', 'In-Person Office Hours — Hyde Park', NULL, 'Hyde Park', 'office_hours', %s, true),
        -- Earlier engagement (2025-2026)
        ('2026-02-19', 'Vivienda de Barrio — Reunión pública para hispanohablantes', NULL, NULL, 'public_meeting', %s, true),
        ('2025-11-05', 'West Roxbury Neighborhood Housing Community Meeting', NULL, NULL, 'public_meeting', %s, true),
        ('2025-10-22', 'Hyde Park Neighborhood Housing Community Meeting', NULL, NULL, 'public_meeting', %s, true),
        ('2025-10-15', 'Roslindale Neighborhood Housing Community Meeting', NULL, NULL, 'public_meeting', %s, true),
        ('2025-01-13', 'Neighborhood Housing — Citywide Virtual Public Meeting', NULL, 'Virtual Meeting', 'public_meeting', %s, true)
        ON CONFLICT DO NOTHING
    """, tuple([city_url] * 29))

    conn.commit()
    cur.close()
    conn.close()
    print('  Done!')


def validate_pipeline(parcels, results, geojson_features):
    """
    Run integrity checks to catch data errors before they reach production.
    Returns a list of error strings; empty list = all passed.
    """
    errors = []

    # 1. Total count sanity
    if len(parcels) < 9000:
        errors.append(f'Parcel count too low: {len(parcels)} (expected ~9,500+)')
    if len(parcels) != len(results):
        errors.append(f'Parcel/result count mismatch: {len(parcels)} parcels vs {len(results)} results')
    if len(parcels) != len(geojson_features):
        errors.append(f'Parcel/geojson count mismatch: {len(parcels)} parcels vs {len(geojson_features)} geojson')

    # 2. Spatial match rate
    matched = sum(1 for p in parcels if p['proposed_district'])
    match_rate = matched / len(parcels) if parcels else 0
    if match_rate < 0.90:
        errors.append(f'Spatial match rate too low: {match_rate:.1%} ({matched}/{len(parcels)}). Expected >90%.')
    print(f'    Spatial match rate: {match_rate:.1%} ({matched}/{len(parcels)})')

    # 3. No RD-1 in data (doesn't exist in city's proposed zoning)
    rd1_count = sum(1 for p in parcels if p.get('proposed_district') == 'RD-1')
    if rd1_count > 0:
        errors.append(f'Found {rd1_count} parcels with RD-1 (this district does not exist in city data)')

    # 4. Known-address spot checks — these are manually verified against the city's "Look up your address" tool
    # Verified against city's official proposed zoning polygon layer
    # (gis.bostonplans.org Neighborhood_Housing_Zoning_Subdistricts)
    SPOT_CHECKS = {
        '2002226000': {'address_contains': 'BELLEVUE', 'expected_proposed': 'RD-3', 'expected_current': '1F-6000'},
        '2001892000': {'address_contains': 'ROBIN', 'expected_proposed': 'RD-2', 'expected_current': '1F-6000'},
        '2006683000': {'address_contains': 'GRAYFIELD', 'expected_proposed': 'RD-2', 'expected_current': '1F-8000'},
        '2001951000': {'address_contains': 'BELLEVUE HILL', 'expected_proposed': 'RD-3', 'expected_current': '1F-6000'},
    }
    parcel_by_id = {p['gis_id']: p for p in parcels}
    for gis_id, check in SPOT_CHECKS.items():
        p = parcel_by_id.get(gis_id)
        if not p:
            errors.append(f'Spot-check parcel {gis_id} not found')
            continue
        if check['address_contains'] not in p['address'].upper():
            errors.append(f'Spot-check {gis_id}: expected address containing "{check["address_contains"]}", got "{p["address"]}"')
        if p['proposed_district'] != check['expected_proposed']:
            errors.append(f'Spot-check {gis_id} ({p["address"]}): expected proposed={check["expected_proposed"]}, got {p["proposed_district"]}')
        if p['current_district'] != check['expected_current']:
            errors.append(f'Spot-check {gis_id} ({p["address"]}): expected current={check["expected_current"]}, got {p["current_district"]}')

    # 5. Every proposed district should have rules defined
    unknown_districts = set()
    for p in parcels:
        pd = p.get('proposed_district')
        if pd and pd not in PROPOSED_ZONING and pd not in NON_RES_PROPOSED:
            unknown_districts.add(pd)
    if unknown_districts:
        errors.append(f'Proposed districts without rules or non-res classification: {unknown_districts}')

    # 6. Results should have valid JSON summaries
    import json as _json
    bad_json = 0
    for r in results:
        try:
            s = _json.loads(r['summary'])
            c = _json.loads(r['comparison'])
        except Exception:
            bad_json += 1
    if bad_json > 0:
        errors.append(f'{bad_json} results have invalid JSON in summary/comparison')

    # 7. GeoJSON features should have matching properties
    for feat in geojson_features[:100]:
        props = feat.get('properties', {})
        if not props.get('id'):
            errors.append('GeoJSON feature missing id property')
            break
        if not props.get('addr'):
            errors.append(f'GeoJSON feature {props.get("id")} missing addr')
            break

    # 8. Residential parcels with proposed districts should have non-empty summaries
    empty_summary_count = 0
    for i, p in enumerate(parcels):
        if p['proposed_district'] and p['proposed_district'] in PROPOSED_ZONING and p['current_district'] in CURRENT_ZONING:
            s = _json.loads(results[i]['summary'])
            if not s:
                empty_summary_count += 1
    if empty_summary_count > 50:
        errors.append(f'{empty_summary_count} residential parcels with proposed district have empty summaries (expected <50)')
    print(f'    Empty summaries for known-district parcels: {empty_summary_count}')

    # 9. District distribution sanity — RD-3 should be the majority
    from collections import Counter
    dist_counts = Counter(p['proposed_district'] for p in parcels if p['proposed_district'])
    if dist_counts.get('RD-3', 0) < 5000:
        errors.append(f'RD-3 count suspiciously low: {dist_counts.get("RD-3", 0)} (expected ~7,000+)')
    print(f'    District distribution: {dict(dist_counts.most_common())}')

    return errors


def main():
    print('West Roxbury Zoning — Data Pipeline')
    print('=' * 50)

    print('\n1. Loading raw data...')
    features = load_parcels()
    assessor = load_assessor()
    proposed_zones = load_proposed_zoning()

    print('\n2. Building parcel analysis (with spatial join to city proposed zoning)...')
    parcels, results, geojson_features = build_parcels(features, assessor, proposed_zones)

    print('\n3. Building aggregate stats...')
    blocks = build_block_stats(parcels)
    streets = build_street_stats(parcels)
    areas = build_area_stats(parcels)

    print('\n4. Writing to PostgreSQL...')
    insert_data(parcels, results, blocks, streets, areas)

    print('\n5. Writing map GeoJSON...')
    geojson_path = os.path.join(WEB_PUBLIC, 'parcels.geojson')
    with open(geojson_path, 'w') as f:
        json.dump({'type': 'FeatureCollection', 'features': geojson_features}, f)
    print(f'  Wrote {len(geojson_features)} features to {geojson_path}')

    # ─── Validation ───────────────────────────────────────────────────────────
    print('\n6. Running validation checks...')
    errors = validate_pipeline(parcels, results, geojson_features)
    if errors:
        print(f'\n  *** {len(errors)} VALIDATION ERRORS ***')
        for e in errors:
            print(f'  FAIL: {e}')
        sys.exit(1)
    else:
        print('  All validation checks passed.')

    # Summary
    from collections import Counter
    dist_counts = Counter(p['proposed_district'] for p in parcels if p['proposed_district'])
    residential = sum(1 for p in parcels if not p['is_non_residential'])
    with_proposed = sum(1 for p in parcels if p['proposed_district'])
    print(f'\nPipeline complete:')
    print(f'  Total parcels:       {len(parcels)}')
    print(f'  Residential:         {residential}')
    print(f'  With proposed zone:  {with_proposed}')
    print(f'  Non-residential:     {len(parcels) - residential}')
    print(f'  Blocks:              {len(blocks)}')
    print(f'  Streets:             {len(streets)}')
    print(f'  Areas:               {len(areas)}')
    print(f'\n  Proposed district distribution:')
    for d, c in dist_counts.most_common():
        print(f'    {d}: {c}')


if __name__ == '__main__':
    main()
