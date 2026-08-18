# Browse Map (`/map`)

**See also:** [09-shared-components.md](09-shared-components.md) for nav/footer, [10-data-and-calcs.md](10-data-and-calcs.md) for spatial join.

**Map library:** Mapbox GL JS

---

## Layout

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

---

## Map Interaction

- Click parcel → popup with: address, proposed district, existing height, existing units, "View full analysis →"
- Address search → fly to parcel, open popup
- Parcel polygons from `parcels_west_roxbury.geojson`
- Color by proposed district (determined via spatial join to `proposed_zoning_subdistricts.geojson`)

---

## URL Parameters

`/map` — default view centered on West Roxbury
`/map?lat=X&lng=Y&zoom=Z` — shareable map position

---

## Distinction from Overview

The Browse Map (`/map`) is a **spatial exploration tool** — full-screen, interactive, for users who want to browse geographically.

The Overview (`/overview`) is a **dashboard** — stats, district distribution, browse-by-area/street lists.

Both have maps but serve different intents.

---

## Calculations Required

- Spatial join for parcel → proposed district coloring
- Parcel popup: address, district, height, units (pre-joined data)
