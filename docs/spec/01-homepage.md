# Homepage (`/`)

**See also:** [00-product-vision.md](00-product-vision.md) for positioning principles, [09-shared-components.md](09-shared-components.md) for nav/footer.

---

## Layout

```
┌──────────────────────────────────────────────────────────┐
│  [Logo: West Roxbury Zoning Analysis]                    │
│  Nav: Browse Map | FAQ | Meetings | About | Sources      │
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

---

## Top-Level Context

Very short, neutral explanation of: what the rezoning proposal is; that Boston Planning is seeking community input; what this site does; that the site is independent from the City.

---

## Primary Action — Address Search

**Enter your address** — dominant interaction.

**Address search input:**

- Autocomplete from West Roxbury address list (derived from parcels `ST_NUM` + `ST_NAME`)
- On submit: geocode → match to parcel `GIS_ID` → route to `/property/{GIS_ID}`
- If address not found: "We don't have data for that address. It may be outside West Roxbury or not yet in our database."
- If condo unit: resolve to underlying parcel, show note: "Zoning applies to the property as a whole, not individual units."

---

## Secondary Actions

**Browse West Roxbury** — one obvious click to the map (`/map`).

**Don't own a home yet?** — text link below the map link: "You can browse the map to explore any neighborhood, or read the FAQ to understand the proposal." Links to `/map` and `/faq`. This acknowledges renters, prospective buyers, and curious residents who don't have "their" address to search.

---

## Independence Notice

- Always visible, not dismissable
- Navy left border, light surface background

---

## Upcoming Meeting Module

- Source: PostgreSQL `meetings` table via API (see [07-meetings.md](07-meetings.md))
- Shows: date, title, link to City page
- If no upcoming meeting: "No upcoming meetings scheduled. View past meetings →"
- Links to full Meetings & Deadlines page (`/meetings`)

---

## Mobile

- Stack vertically
- Search input full-width
- Meeting module below fold

---

## Calculations Required

None — static content + meeting data lookup.
