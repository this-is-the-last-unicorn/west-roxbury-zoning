# Product Vision & Foundations

**See also:** [ia.md](../ia.md) for sitemap, flows, and shared components.

---

## 1. PRODUCT VISION

West Roxbury Zoning Analysis is an independent civic-information website that helps West Roxbury residents understand what Boston's proposed Neighborhood Housing zoning changes mean for:

1. their property;
2. their block;
3. their street;
4. their sub-neighborhood/community; and
5. West Roxbury overall.

The fundamental question the product answers:

**"What does this rezoning proposal actually mean for me, my property, my block, and my neighborhood?"**

The core experience:

**Enter an address → understand what exists → understand what today's zoning allows → understand what the proposed zoning allows → understand what could actually change on this particular property.**

---

## 1a. AUTHORSHIP & OPEN SOURCE

**Created by:** Emily Gamble
**Prepared by:** The Last Unicorn, LLC

This is a fully open-source project. All code, data, formulas, and documentation are publicly available on GitHub for anyone to audit, verify, or reuse.

| Component                | Stack                                                                    |
| ------------------------ | ------------------------------------------------------------------------ |
| Code & docs              | GitHub — `github.com/the-last-unicorn/west-roxbury-zoning` (MIT license) |
| Hosting                  | Render (web service + PostgreSQL)                                        |
| Domain                   | `westroxburyzoning.org` via Cloudflare (DNS + CDN)                       |
| Maps                     | Mapbox GL JS                                                             |
| Analytics                | Umami (self-hosted, open source, no cookies)                             |
| Trackers / cookies / ads | **None** — Umami is privacy-respecting and cookie-free                   |

The open-source model IS the credibility model. When anyone asks "how do I know this is accurate?" — the answer is: read the code, check the formulas, verify the data sources. Everything is public.

---

## 2. POSITIONING AND NEUTRALITY

The site must be as factually neutral as possible.

It is:

- an independent civic-data project;
- created by Emily Gamble, a West Roxbury resident;
- prepared by The Last Unicorn, LLC;
- fully open source — all code, data, and methodology are public;
- not affiliated with or endorsed by the City of Boston;
- not an advocacy organization;
- not a development-feasibility tool;
- not a property-acquisition tool;
- not a developer-prospecting tool.

The site may sometimes _feel_ critical of the proposal because it clearly presents the magnitude of potential changes. That is acceptable. The site should not minimize a change in order to appear neutral. Likewise, it should not exaggerate a theoretical possibility in order to make the proposal appear more consequential.

The goal is to **call the facts what they are**.

---

## 3. CORE PRODUCT PRINCIPLE: CONSEQUENCES, NOT OPPORTUNITIES

The site exists to explain what zoning changes permit. It must **not package those changes as development opportunities**.

There should be **no public development-potential heat map, bulk opportunity search, profitability model, parcel ranking, or bulk parcel export**.

---

## 4. V1 GEOGRAPHIC SCOPE

**West Roxbury only.** Architecture should not prevent future expansion but expansion is not a V1 requirement.

---

## 5. PRIMARY USER

**A West Roxbury homeowner/resident who has heard about the rezoning proposal and wants to know what it means for their property and immediate community.**

Assumes little or no zoning expertise. No login required. Any West Roxbury address searchable. Condo/unit addresses resolve to the underlying parcel/building.

---

## 6. INFORMATION HIERARCHY

**Property → Block → Street → Sub-neighborhood → West Roxbury**

- **Block:** Physical street segment between nearest through-street intersections. Corner lots default to the address-frontage street. Expand to adjacent segment(s) if too few properties, clearly labeled.
- **Street:** Entire named street within West Roxbury; auto-segmented if it spans multiple proposed districts.
- **Sub-neighborhood:** V1 launches with a small set of well-known, locally recognized areas (e.g. Bellevue Hill) with manually drawn boundaries. Clearly labeled as unofficial community geography where applicable.
