# West Roxbury Zoning Analysis — Design Reference

## Inspiration

**USAFacts.org** — neutral, approachable, facts-first civic data presentation.

Their tagline: _"Our nation, in numbers. A comprehensive, nonpartisan view."_
Our equivalent: _"Your neighborhood, in numbers. An independent, factual view."_

## USAFacts Design System (extracted)

### What we're borrowing

| Element                 | USAFacts                                                                 | Our adaptation                                                       |
| ----------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| **Tone**                | Professional, medium energy, general public                              | Same — approachable civics, not planning-jargon                      |
| **Color scheme**        | Light background, hot pink (#E1197A) accents                             | Light background, **navy** accents                                   |
| **Typography**          | Clean sans-serif (Aeonik), large headlines, readable body                | Clean sans-serif, same hierarchy                                     |
| **Layout**              | Hero with single primary action, card-based content, generous whitespace | Hero with address search, card-based property/block results          |
| **Buttons**             | Fully rounded (48px radius), bold primary CTA                            | Same pill-shaped buttons                                             |
| **Data presentation**   | "Fast facts" scrolling ticker, stat cards, clean tables                  | Property comparison table, stat cards for block/neighborhood         |
| **Credibility signals** | "Not-for-profit, nonpartisan civic initiative" prominently placed        | "Independent civic-data project, not affiliated with City of Boston" |
| **Border radius**       | 12px base                                                                | Same                                                                 |

### What we're NOT borrowing

- The pink/magenta brand color → replaced with navy
- Topic-heavy navigation (Economy, Crime, Health, etc.) → our nav is simpler
- Newsletter/subscription CTAs → we explicitly don't collect contact info
- Dense article/editorial content → we lead with property-specific data

---

## Our Color Palette (Navy-based)

### Primary palette

| Role               | Hex       | Usage                                                                   |
| ------------------ | --------- | ----------------------------------------------------------------------- |
| **Primary (Navy)** | `#1B2A4A` | Primary buttons, headings, header/footer backgrounds, key UI elements   |
| **Primary Light**  | `#2D4A7A` | Hover states, secondary headings, active states                         |
| **Primary Dark**   | `#0F1A2E` | Text on light backgrounds, deep contrast elements                       |
| **Accent (Teal)**  | `#0D9488` | Success states, "meets standard" indicators, positive change highlights |
| **Accent Warm**    | `#D97706` | Warning states, "needs review" indicators, attention markers            |
| **Alert**          | `#DC2626` | Error states, "differs from standard" indicators (used sparingly)       |

### Neutral palette

| Role               | Hex       | Usage                                    |
| ------------------ | --------- | ---------------------------------------- |
| **Background**     | `#FFFFFF` | Page background                          |
| **Surface**        | `#F8FAFC` | Card backgrounds, table alternating rows |
| **Surface Dark**   | `#F1F5F9` | Block/section backgrounds, hover states  |
| **Border**         | `#E2E8F0` | Card borders, table borders, dividers    |
| **Text Primary**   | `#0F172A` | Body text, headings                      |
| **Text Secondary** | `#475569` | Captions, labels, secondary information  |
| **Text Muted**     | `#94A3B8` | Placeholders, disabled states            |

### Semantic colors (for the comparison table)

| State                          | Color                    | Usage                                                 |
| ------------------------------ | ------------------------ | ----------------------------------------------------- |
| **Meets standard**             | `#0D9488` (teal)         | Today's Reality within Today's Law / Proposed Law     |
| **Differs from standard**      | `#D97706` (amber)        | Today's Reality outside current or proposed standards |
| **Needs verification**         | `#94A3B8` (muted)        | Insufficient data for determination                   |
| **Proposed change (increase)** | `#1B2A4A` (navy, bold)   | Proposed Law value that represents an increase        |
| **Proposed change (decrease)** | `#1B2A4A` (navy, normal) | Proposed Law value that represents a decrease         |
| **No change**                  | `#475569` (secondary)    | Value unchanged between current and proposed          |

### Map district colors

Sequential navy scale — lighter = fewer units, darker = more units. Distinct enough for colorblind accessibility.

| District                    | Hex       | Fill opacity | Description                           |
| --------------------------- | --------- | ------------ | ------------------------------------- |
| **RD-2**                    | `#93B5E1` | 0.6          | Light steel blue — least dense        |
| **RD-3**                    | `#4A7FBF` | 0.7          | Medium blue                           |
| **RD-4**                    | `#2D4A7A` | 0.7          | Primary navy                          |
| **RD-6**                    | `#1B2A4A` | 0.8          | Deep navy — most dense                |
| **Other / non-residential** | `#E2E8F0` | 0.3          | Light gray — not affected by proposal |
| **Highlighted (searched)**  | `#0D9488` | 0.8          | Teal — stands out from blue scale     |

Stroke: `#FFFFFF` at 1px for parcel boundaries. On hover: stroke changes to `#1B2A4A` at 2px.

---

### Social sharing / Open Graph metadata

Every page should include OG tags for when URLs are shared on social media, iMessage, Slack, etc.

| Page type            | `og:title`                             | `og:description`                                                                                                         |
| -------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Homepage**         | West Roxbury Zoning Analysis           | See what Boston's proposed zoning changes mean for your property. Independent civic data — not affiliated with the City. |
| **Property**         | 24 Example St — Zoning Analysis        | Proposed RD-3 zoning: up to 3 units, 35' height limit, no parking required. See the full comparison.                     |
| **Block**            | Example Street Block — Zoning Analysis | 14 properties between Oak St and Elm St. See how proposed zoning affects your block.                                     |
| **Street**           | Example Street — West Roxbury Zoning   | 42 properties analyzed. See what proposed zoning means for this street.                                                  |
| **Sub-neighborhood** | Bellevue Hill — West Roxbury Zoning    | 1,177 properties analyzed. See how proposed zoning affects Bellevue Hill.                                                |
| **Overview**         | West Roxbury Zoning Overview           | 9,569 properties analyzed. See what Boston's proposed zoning means for West Roxbury.                                     |
| **Map**              | Browse West Roxbury Zoning Map         | Interactive map of proposed zoning districts. Click any property.                                                        |
| **FAQ**              | FAQ — West Roxbury Zoning Analysis     | Common questions about Boston's proposed residential zoning changes.                                                     |

- `og:image`: Static image — a screenshot of the map or a branded card (generate once, reuse). For property pages, consider a dynamically generated card showing address + key stats (Later Feature — static image is fine for V1).
- `og:url`: Canonical URL (e.g., `https://westroxburyzoning.org/property/{GIS_ID}`)
- `og:type`: `website`
- `twitter:card`: `summary_large_image`

---

## Typography

### Font stack

```
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

Inter is a free, open-source alternative that matches the clean, modern feel of Aeonik without licensing concerns. If Aeonik or a similar premium sans-serif is preferred, it can be substituted.

### Scale

| Element                 | Size    | Weight  | Line height |
| ----------------------- | ------- | ------- | ----------- |
| Page title / hero       | 48–64px | 700     | 1.1         |
| Section heading (H2)    | 28–32px | 700     | 1.2         |
| Subsection heading (H3) | 20–24px | 600     | 1.3         |
| Body text               | 16px    | 400     | 1.6         |
| Table cell              | 14–16px | 400/600 | 1.4         |
| Caption / label         | 12–14px | 500     | 1.4         |
| Tooltip                 | 13px    | 400     | 1.5         |

---

## Component Patterns

### Address search (hero)

Modeled after USAFacts' clean hero with single CTA:

- Large, clear headline: **"See what Boston's proposed zoning means for your property."**
- Single prominent search input with navy pill button: **"Look up my address"**
- Secondary text link below: **"Or browse the West Roxbury map →"**
- Minimal surrounding content — the search IS the homepage

### Property comparison table

- Four columns on desktop; stacked metric cards on mobile
- Alternating row backgrounds (`#FFFFFF` / `#F8FAFC`)
- Metric name in left column with `?` tooltip affordance
- Subtle left-border color on rows where Today's Reality differs from a standard
- Navy header row

### Stat cards (block/neighborhood)

Modeled after USAFacts' "Fast facts" pattern:

- White card with subtle border
- Large number in navy
- Label underneath in secondary text
- Optional comparison text: "Block median: 24 ft → Proposed max: 35 ft"

### Buttons

| Type             | Style                                                                               |
| ---------------- | ----------------------------------------------------------------------------------- |
| **Primary**      | Navy background (`#1B2A4A`), white text, fully rounded (48px radius), medium shadow |
| **Secondary**    | White/transparent background, navy border, navy text, fully rounded                 |
| **Ghost**        | No background, navy text, underline on hover                                        |
| **Feedback CTA** | Smaller, muted — not competing with primary actions                                 |

### Reassurance banner

- Light teal background (`#F0FDFA`)
- Teal left border
- Clear text: "Your existing home can remain as it is."
- Always visible on property pages, above the comparison table

### Confidence indicator

- **High confidence:** no special indicator (clean presentation)
- **Needs review:** Amber background pill: "Needs property-specific review" with `?` link

---

## Layout Principles

### From USAFacts

1. **Generous whitespace** — data breathes, never feels cramped
2. **Progressive disclosure** — headline → summary → detail → methodology
3. **Cards over walls of text** — each data point or comparison gets its own visual container
4. **Credibility is structural** — sources and methodology aren't buried, they're part of the experience
5. **Single primary action per screen** — on the homepage it's the address search; on the property page it's the comparison table; on block view it's the map

### Our additions

6. **Reassurance first** — "your home can remain as it is" before any data
7. **Four-column → metric cards on mobile** — responsive without horizontal scrolling
8. **Persistent but quiet feedback CTA** — available but never nagging
9. **Guided Q&A before deep-dive data** — plain-English answers first, then the full comparison table

---

## Page Structure

### Homepage

```
[Nav: Logo | Browse Map | FAQ | Meetings | About | Sources]
[Hero: Headline + Address Search]
[One-line context: "An independent civic-data project..."]
[Upcoming meeting card]
[Footer: About | Sources | FAQ | Privacy | View on GitHub | Emily Gamble · The Last Unicorn, LLC | Independence disclaimer | Open source · No trackers · No cookies · No ads]
```

### Property Page

```
[Nav]
[Address + District badge + Table B/C indicator]
[Condo note / Vacant lot note (if applicable)]
[Reassurance banner]
[Summary: 3-4 most material changes + permission framing]
[Nonconformity callout (if applicable)]
[Guided Q&A: property-aware FAQ + category browse]
[Four-column comparison table]
[Sloped Roof Story note (RD-2/RD-3 only)]
[Easement bonus scenario (collapsible)]
[Explore Your Block + neighboring properties →]
[Next steps: meetings, helpline, professional advice]
[Share your thoughts with Boston Planning →]
[Sources & Methodology for this property]
[Footer]
```

### Block View

```
[Nav]
[Block identifier + Map]
[Aggregate stats cards (median + range)]
[Character distribution]
[Clickable parcel list/map]
[Footer]
```

### Browse Map

```
[Nav]
[Full-width map with address search overlay]
[Legend: RD-2 / RD-3 / RD-4 / RD-6 color key]
[Click any parcel → property page]
```

---

## Accessibility (WCAG 2.1 AA)

- All color contrasts meet 4.5:1 minimum (navy on white = 12.6:1)
- Non-color indicators for all comparison states
- Keyboard-navigable table, map, and Q&A panel
- Screen-reader labels on all interactive elements
- Skip-to-content link
- Focus indicators on all interactive elements

---

_Inspiration: [USAFacts.org](https://usafacts.org/) — "Accessible government data and statistics"_  
_Adaptation: Navy palette, property-specific civic data, West Roxbury zoning context_
