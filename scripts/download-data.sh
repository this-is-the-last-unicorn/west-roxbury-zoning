#!/usr/bin/env bash
set -euo pipefail

# Downloads all raw data files needed by the pipeline.
# These are gitignored (too large for standard git) but are all from public government APIs.
# Run this once after cloning, or whenever the city updates their data.

DATA_DIR="$(cd "$(dirname "$0")/../data" && pwd)"
mkdir -p "$DATA_DIR"

echo "Downloading data to $DATA_DIR ..."
echo ""

# ── 1. Boston GIS Parcels (West Roxbury) ─────────────────────────────────────
# Source: data.boston.gov/dataset/parcels-2025
# We query the city's ArcGIS MapServer for parcels in West Roxbury (Ward 20).
echo "[1/3] Boston GIS Parcels (this may take a minute — ~9,500 features) ..."

PARCELS_URL="https://gisportal.boston.gov/arcgis/rest/services/Parcels/Parcels25/MapServer/0/query"
PAGE_SIZE=2000
OFFSET=0
TEMP_DIR=$(mktemp -d)
PAGE=0

while true; do
  PAGE_FILE="$TEMP_DIR/page_${PAGE}.json"
  curl -sf "$PARCELS_URL" \
    --data-urlencode "where=WARD='20'" \
    --data-urlencode "outFields=*" \
    --data-urlencode "f=geojson" \
    --data-urlencode "outSR=4326" \
    --data-urlencode "resultRecordCount=$PAGE_SIZE" \
    --data-urlencode "resultOffset=$OFFSET" \
    -o "$PAGE_FILE"

  COUNT=$(python3 -c "import json; print(len(json.load(open('$PAGE_FILE'))['features']))")
  echo "  Page $((PAGE+1)): $COUNT features (offset $OFFSET)"

  if [ "$COUNT" -lt "$PAGE_SIZE" ]; then
    break
  fi

  OFFSET=$((OFFSET + PAGE_SIZE))
  PAGE=$((PAGE + 1))
done

# Merge pages into single GeoJSON
python3 -c "
import json, glob, os
features = []
for f in sorted(glob.glob(os.path.join('$TEMP_DIR', 'page_*.json'))):
    with open(f) as fh:
        features.extend(json.load(fh)['features'])
geojson = {'type': 'FeatureCollection', 'features': features}
with open('$DATA_DIR/parcels_west_roxbury.geojson', 'w') as fh:
    json.dump(geojson, fh)
print(f'  Total: {len(features)} parcels')
"
rm -rf "$TEMP_DIR"
echo "  ✓ parcels_west_roxbury.geojson"
echo ""

# ── 2. City Assessor Data (FY2026, West Roxbury) ────────────────────────────
# Source: data.boston.gov/dataset/property-assessment
# Uses CKAN datastore dump (the direct S3 download URL rotates/breaks; the dump is stable).
echo "[2/3] City Assessor Data (FY2026, ~76 MB download) ..."

ASSESSOR_FULL_URL="https://data.boston.gov/datastore/dump/ee73430d-96c0-423e-ad21-c4cfb54c8961?format=csv&bom=true"
ASSESSOR_TMP="$DATA_DIR/assessor_full.csv"
curl -sf -L "$ASSESSOR_FULL_URL" -o "$ASSESSOR_TMP"

# Filter to West Roxbury (ZIP codes 02132) and write out
python3 -c "
import csv
with open('$ASSESSOR_TMP') as fin, open('$DATA_DIR/assessor_fy2026_west_roxbury.csv', 'w', newline='') as fout:
    reader = csv.DictReader(fin)
    writer = None
    count = 0
    for row in reader:
        zipcode = row.get('ZIPCODE', '').strip().rstrip('_')
        if zipcode.startswith('02132'):
            if writer is None:
                writer = csv.DictWriter(fout, fieldnames=reader.fieldnames)
                writer.writeheader()
            writer.writerow(row)
            count += 1
    print(f'  Filtered {count} West Roxbury records')
"
rm -f "$ASSESSOR_TMP"
echo "  ✓ assessor_fy2026_west_roxbury.csv"
echo ""

# ── 3. Proposed Zoning Districts (City GIS) ─────────────────────────────────
# Source: gis.bostonplans.org — Neighborhood_Housing_Zoning_Subdistricts
echo "[3/3] Proposed Zoning Districts ..."

curl -sf "https://gis.bostonplans.org/hosting/rest/services/Neighborhood_Housing_Zoning_Subdistricts/FeatureServer/0/query?where=Zoning_District+LIKE+%27%25West+Roxbury%25%27&outFields=*&f=geojson&outSR=4326&resultRecordCount=200" \
  -o "$DATA_DIR/proposed_zoning_districts.geojson"

FEAT_COUNT=$(python3 -c "import json; print(len(json.load(open('$DATA_DIR/proposed_zoning_districts.geojson'))['features']))")
echo "  $FEAT_COUNT proposed zoning polygons"
echo "  ✓ proposed_zoning_districts.geojson"
echo ""

echo "Done. All data files saved to $DATA_DIR"
echo ""
echo "Next steps:"
echo "  1. Run database migrations:  doppler run -- bun --cwd packages/database db:migrate"
echo "  2. Run the pipeline:         python3 tools/pipeline/load_data.py"
echo "  3. Start dev server:         bun run dev"
