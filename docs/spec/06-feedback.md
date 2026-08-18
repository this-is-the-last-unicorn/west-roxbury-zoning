# Feedback Flow (`/feedback`)

**Type:** Modal overlay with URL. Triggered from the property page; also directly linkable.

**See also:** [02-property-page.md](02-property-page.md) for the feedback CTA placement.

---

## Primary CTA

Persistent, visually secondary on the property page: **Share your thoughts with Boston Planning →**

---

## Step 1: Category Reactions (optional)

```
┌──────────────────────────────────────────────────────────┐
│  What do you think about the proposed changes?           │
│                                                          │
│  [Only show categories that actually change for this     │
│   property/block]                                        │
│                                                          │
│  Units (1 → 3):      [Support] [Concerned] [No opinion] │
│  Front setback (20'→12'): [Support] [Concerned] [No opinion] │
│  Stories (2½ → 3):   [Support] [Concerned] [No opinion] │
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

---

## Step 2: Draft Review (if not skipped)

```
┌──────────────────────────────────────────────────────────┐
│  Here's a draft based on what you told us:               │
│                                                          │
│  "I'm a resident at [address/block]. Regarding the       │
│   proposed RD-3 zoning: I support the increase in        │
│   permitted units but am concerned about the reduced     │
│   front setback from 20' to 12' and the elimination     │
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

---

## Step 3: Handoff

Opens Boston Planning's official feedback submission in a new tab. User copies their draft and submits through the City's process.

**Feedback destinations (verify at publish time):**

- Primary: Survey linked from [bostonplans.org/neighborhood-housing](https://www.bostonplans.org/neighborhood-housing) ("Let us know here through this survey")
- Fallback: Email to `Will.Cohen@boston.gov` (Senior Zoning Reform Planner II, Neighborhood Housing contact)
- Comment deadline: **October 31, 2026** — display countdown/note if approaching deadline

---

## What the Site Does NOT Do

- Submit feedback on resident's behalf
- Generate opinions
- Host petitions or advocacy CTAs

---

## Internal Sentiment Collection

Anonymous aggregate Support/Concerned/No opinion per category.

- Not public in V1
- Lightweight duplicate protection via `localStorage` (not cookies, not IP-based)
- Not a representative poll
- Short disclosure to users: "Your anonymous reactions are aggregated for internal analysis."

---

## Calculations Required

Identify which categories actually changed for the property — reuses the property summary generation (see [10-data-and-calcs.md](10-data-and-calcs.md) B9).
