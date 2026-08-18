# FAQ (`/faq`)

General questions about the rezoning proposal. Not tied to any specific property — that's the Guided Q&A panel on the property page (see [05-guided-qa.md](05-guided-qa.md)).

**Accessible from:** Nav bar on all pages.

**See also:** [08-about-sources.md](08-about-sources.md) for About/Sources pages, [05-guided-qa.md](05-guided-qa.md) for property-specific Q&A, [07-meetings.md](07-meetings.md) for timeline data.

---

## Purpose

A resident who's heard "Boston is changing the zoning" and wants to understand the basics before (or without) looking up their address.

---

## Questions

### The Proposal

**What is this rezoning proposal?**
Boston Planning is proposing new zoning rules for residential neighborhoods across the city. In West Roxbury, this means new "Residential District" zoning (RD-2, RD-3, RD-4, RD-6) that would replace the current 1F-6000 and 2F-6000 districts. The proposal changes what can be built — height limits, number of units, setbacks, lot coverage, and parking requirements.

_Source: Residential Zoning Draft Text Amendment, July 17, 2026_

**Does this mean my house has to change?**
No. Proposed zoning changes what may be _permitted going forward_. Your existing home can remain exactly as it is. If your home doesn't meet the new rules, it becomes a lawful "pre-existing nonconformity" — which is a legal protection, not a violation.

_Source: Article 20, Section 20-5_

**When would this take effect?**
The proposal is a draft. It must go through public comment, City Council review, and formal adoption before becoming law. See our Meetings & Deadlines page for the current timeline.

**Is this site affiliated with the City of Boston?**
No. This is an independent civic-data project. We are not affiliated with, endorsed by, or funded by the City of Boston or Boston Planning. We use official public data sources, but the analysis is our own.

### Zoning Districts

**What are RD-2, RD-3, RD-4, and RD-6?**
These are the proposed new residential district types. The number roughly indicates the maximum dwelling units allowed on a lot:

- **RD-2:** Up to 2 units (3 if retaining a pre-2027 building)
- **RD-3:** Up to 3 units
- **RD-4:** Up to 4 units
- **RD-6:** Up to 6 units

Each district has its own set of dimensional rules for height, setbacks, lot coverage, and floor plate.

_Source: Article 20, Table A_

**How do I know which district my property would be in?**
Search your address on this site, or browse the map. The proposed district is determined by Boston Planning's proposed zoning map.

### Key Changes

**What happens to parking requirements?**
The proposed zoning completely eliminates off-street parking requirements in all Residential Districts. Your existing parking spaces can remain — the proposal just means no parking spaces would be _required_ for new construction or additional units.

_Source: Article 23, Section 23-6(d)_

**What is a "Sloped Roof Story"?**
The proposed zoning requires the third story in RD-2 and RD-3 districts to be a "Sloped Roof Story." However, the July 2026 draft does not define this term — there is no minimum roof pitch and no limit on dormer size. The requirement can also be waived entirely by granting a 5-foot sidewalk easement.

_Source: Article 20, Tables B & C; Section 20-6_

**What is the easement bonus?**
If a property owner records a 5-foot highway easement along the front of their lot (essentially dedicating land for a wider sidewalk), the zoning rules become more permissive: more units are allowed, setbacks may be relaxed, and in RD-2/RD-3 the Sloped Roof Story requirement is waived.

_Source: Article 20, Section 20-6_

**Can I build an ADU (Accessory Dwelling Unit)?**
Under the proposal, detached ADUs are allowed by right in RD-2 and by conditional use in RD-3/RD-4/RD-6. A detached ADU can be up to 900 sf and 25' tall (or the main building's height, whichever is less). Owner-occupancy is no longer required.

_Source: Article 8, Table A_

**What about lot coverage and permeable area?**
The proposed rules set maximum lot coverage (how much of your lot can be covered by buildings) and minimum permeable area (how much must allow water to soak in). These vary by district and lot size. Search your address to see the specific numbers for your property.

### This Site

**Where does this data come from?**
All data comes from official public sources: Boston Planning GIS, City of Boston assessor records, and the draft legal text itself. See our Sources & Methodology page for the complete list.

**How accurate is this?**
We use the best available public data, but some values are estimates. Setbacks are calculated from GIS geometry, not professional surveys. Some building details can't be verified from public records alone. When we're not highly confident in a calculation, we say "Needs property-specific review" rather than showing a potentially wrong number.

**Is this open source?**
Yes. Every line of code, every data file, every calculation formula, and every design decision is publicly available on GitHub. Anyone can audit how we compute results, verify our data sources, or build on this work for their own community. Our analytics tool (Umami) is also open source and self-hosted — it counts page views without cookies or personal data. We don't use third-party trackers or ads.

_View the code → [github.com/the-last-unicorn/west-roxbury-zoning](https://github.com/the-last-unicorn/west-roxbury-zoning)_

**Who built this?**
This site was created by Emily Gamble and prepared by The Last Unicorn, LLC. Emily is a West Roxbury resident who built this tool to help her neighbors understand the zoning proposal. The site is hosted on Render with a Cloudflare domain.

**I think the data for my property is wrong.**
You can submit a correction from any property page. Corrections are reviewed before changes are made.

---

## Layout

Simple page. No interactive elements beyond the accordion expand/collapse on each question.

```
┌──────────────────────────────────────────────────────────┐
│  Frequently Asked Questions                              │
│                                                          │
│  THE PROPOSAL                                            │
│  ▶ What is this rezoning proposal?                       │
│  ▶ Does this mean my house has to change?                │
│  ▶ When would this take effect?                          │
│  ▶ Is this site affiliated with the City of Boston?      │
│                                                          │
│  ZONING DISTRICTS                                        │
│  ▶ What are RD-2, RD-3, RD-4, and RD-6?                │
│  ▶ How do I know which district my property would be in? │
│                                                          │
│  KEY CHANGES                                             │
│  ▶ What happens to parking requirements?                 │
│  ▶ What is a "Sloped Roof Story"?                        │
│  ▶ What is the easement bonus?                           │
│  ▶ Can I build an ADU?                                   │
│  ▶ What about lot coverage and permeable area?           │
│                                                          │
│  THIS SITE                                               │
│  ▶ Where does this data come from?                       │
│  ▶ How accurate is this?                                 │
│  ▶ Is this open source?                                  │
│  ▶ Who built this?                                       │
│  ▶ I think the data for my property is wrong.            │
│                                                          │
│  ─────────────────────────────────────────────────        │
│  Want to see what this means for your property?          │
│  [Enter your address →]                                  │
└──────────────────────────────────────────────────────────┘
```

CTA at the bottom nudges toward the core experience.

---

## Calculations Required

None — static content. Manually maintained.
