# Meetings & Deadlines (`/meetings`)

**See also:** [01-homepage.md](01-homepage.md) for the homepage preview module.

---

## Layout

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

---

## Data Structure

Stored in the `meetings` table in PostgreSQL (see [13-qa-release.md](13-qa-release.md) for schema). Managed via direct DB inserts or a seed script — no admin UI needed.

Each entry:

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

## Content Rules

- Past meeting recordings/materials linked when officially available
- Content sourced from official City information only
- Sorted: upcoming first (chronological), then past (reverse chronological)

---

## Calculations Required

None — manually maintained content.
