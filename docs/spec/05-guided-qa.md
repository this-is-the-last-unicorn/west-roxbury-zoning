# Guided Q&A (Property Page Panel)

**Replaces the original AI Chat spec.** This is a property-aware FAQ + category menu with pre-generated answers — no LLM at runtime.

**See also:** [02-property-page.md](02-property-page.md) for placement within the property page.

---

## Design Decision

No free-form AI chatbot. Instead:

- The system surfaces **relevant questions** based on the property's actual data
- Users can also **browse by category** (units, height, setbacks, parking, ADUs, etc.)
- Answers are **pre-generated** from the data and legal text
- No LLM at runtime — more reliable, more appropriate for a civic tool, simpler to build

---

## Placement

On the property page, **between the Property Summary and the Four-Column Comparison Table**. Expandable panel or always-visible section.

**Rationale:** The comparison table is the detailed reference (48 cells); the Q&A answers the plain-English questions most residents actually have. Placing Q&A before the table means a worried homeowner finds "Could I add a story?" and "What about parking?" in accessible language before encountering dense data. Power users who want the raw table can scroll past.

---

## Surface: Property-Aware Questions

Only show questions that are relevant to THIS property. A question appears if the triggering condition is met:

| Question                                           | Trigger condition                                                    |
| -------------------------------------------------- | -------------------------------------------------------------------- |
| "Could I add a story?"                             | Existing height < proposed max height                                |
| "Could I add a dwelling unit?"                     | Proposed max units > existing units                                  |
| "Could I build an ADU?"                            | Lot has space (existing coverage < proposed max) and district allows |
| "What about parking?"                              | Always (parking elimination applies to all)                          |
| "What is a Sloped Roof Story?"                     | Property is in RD-2 or RD-3                                          |
| "What does the easement bonus do for my property?" | Always                                                               |
| "Why does [metric] say 'Needs review'?"            | Any metric has confidence < 90%                                      |
| "Is my home nonconforming?"                        | Any nonconformity flag detected                                      |
| "What if my lot is smaller/larger than shown?"     | Always (addresses data uncertainty)                                  |
| "I'm a condo owner — what does this mean for me?"  | Property is condo (assessor `LU_DESC` contains "Condo")              |
| "What do I actually give up with the easement?"    | Always                                                               |
| "What about my neighbors' properties?"             | Always                                                               |
| "What should I do next?"                           | Always                                                               |

---

## Browse by Category

Users can also browse all available Q&A by topic:

| Category             | Questions                                                          |
| -------------------- | ------------------------------------------------------------------ |
| **Units**            | Max units, how to add, ADU rules, pre-2027 bonus                   |
| **Height & Stories** | Max height, stories, Sloped Roof Story definition                  |
| **Building Size**    | Floor plate, lot coverage, permeable area                          |
| **Setbacks**         | Front/side/rear yards, how estimated, accuracy                     |
| **Parking**          | Elimination, existing spaces, street parking                       |
| **Easement Bonus**   | What it is, what changes, how to grant                             |
| **My Home**          | Nonconforming status, grandfathering, corrections, condo ownership |
| **My Block**         | Neighbor properties, block-level changes, lot-size variation       |
| **The Proposal**     | What is this, timeline, how to give feedback                       |
| **Next Steps**       | What to do next, professional advice, City contacts                |

---

## Answer Format

Each answer is a pre-generated text block that:

1. **States the fact** using the property's actual data
2. **Cites the source** (Article 20 section, Table B/C/D, assessor data, GIS)
3. **Notes limitations** where applicable ("estimated from GIS", "needs verification")

### Example: "Could I add a story?"

> Based on your property's existing height of **25'** and the proposed maximum of **35'** in RD-3, an additional story appears possible.
>
> Note: In RD-3, the third story must be a "Sloped Roof Story" (Article 20, Table B). The July 2026 draft does not define this term — there is no minimum pitch and no limit on dormer size. This requirement can be waived by granting a sidewalk easement (Section 20-6).
>
> _Source: Draft Text Amendment Table B; FY25 parcel data_

### Example: "What about parking?"

> The proposed zoning eliminates off-street parking requirements in all Residential Districts (Article 23, Section 23-6(d)). Your property currently has **2 parking spaces** (per FY2026 assessor data). These spaces may remain — the proposal does not require removing existing parking, but no parking spaces would be required for new construction or additional units.
>
> _Source: Draft Text Amendment Section 23-6(d); FY2026 assessor data_

### Example: "I'm a condo owner — what does this mean for me?"

> As a condo owner, you do not individually control zoning decisions for your building. Any changes — adding units, altering the building, granting an easement — would require action by the condo association or building owner, depending on your condo documents.
>
> The analysis on this page shows what zoning would permit for the **property as a whole** (all **6 units** on a **9,200 sf lot** in proposed **RD-6**). Individual unit owners do not have separate zoning entitlements.
>
> _Source: Massachusetts Condominium Act (M.G.L. c. 183A); proposed Article 20 applies to the lot, not individual units_

### Example: "My property is currently nonconforming — what happens?"

> Your property currently has **3 dwelling units** in a zone that permits **2**. This is a lawful pre-existing nonconformity — your property can remain as it is.
>
> Under the proposed **RD-3** zoning, **3 units would be permitted**. Your property would become conforming — meaning this condition would no longer be nonconforming at all. This is a legally significant improvement.
>
> _Source: Article 20, Table A; Article 9 (pre-existing nonconformities); FY2026 assessor data_

### Example: "What do I actually give up with the easement?"

> The easement bonus (Section 20-6) requires recording a **5-foot highway easement** along the full front lot line with the Boston Department of Public Works. In practice:
>
> - You dedicate a 5-foot strip along your front property line for public sidewalk use
> - This is a **permanent** recorded easement — it runs with the land
> - You retain ownership of the land, but the City gains a right of use
> - Your **usable front yard effectively shrinks by 5 feet**
> - On your lot (**7,200 sf**), the easement area would be approximately **[lot frontage × 5]** sf
>
> In exchange, the proposed zoning becomes more permissive: more units, the Sloped Roof Story requirement is waived, and Table C dimensions apply.
>
> _Source: Article 20, Section 20-6; Boston DPW easement procedures_

### Example: "What about my neighbors' properties?"

> The same proposed zoning rules apply to your entire block. Your block — **Example Street between Oak St and Elm St** — has **14 properties**, all proposed for **RD-3**.
>
> Today, most homes on your block have **1 unit** and are about **24 ft tall**. Under the proposal, each property could have up to **3 units** and **35 ft** in height.
>
> [Explore your block →](/block/{block_id}) to see the analysis for each property.
>
> _Source: Pre-computed block aggregation from parcel + assessor data_

### Example: "What should I do next?"

> - **Attend a community meeting** to hear from Boston Planning directly. Next meeting: [date] ([link to Meetings page])
> - **Give feedback** — use our feedback tool to draft a comment for Boston Planning ([link to feedback])
> - **Read the full draft text** — the legal document is available from Boston Planning ([link to PDF])
> - **For property-specific advice** (building feasibility, renovation, unit additions), consult a licensed architect familiar with Boston zoning
> - **For zoning questions**, contact the Boston Planning zoning helpline: 617-918-4307
>
> This site shows what zoning _permits_. It does not provide legal, architectural, or real estate advice.

---

## Answer Generation (Build-Time)

Answers are generated when parcel data is processed, not at request time. Template-based:

```python
def generate_qa(parcel, proposed_zoning):
    qa = []

    # "Could I add a story?"
    existing_h = parcel.get("EXIST_BLDG_HGT_2010")
    proposed_h = proposed_zoning["max_height"]
    if existing_h and proposed_h > existing_h:
        answer = f"Based on your property's existing height of "
                 f"**{existing_h:.0f}'** and the proposed maximum of "
                 f"**{proposed_h}'**, an additional story appears possible."
        if proposed_zoning.get("third_story_sloped_roof"):
            answer += (" Note: the third story must be a "
                       "\"Sloped Roof Story\" (undefined term).")
        qa.append({
            "question": "Could I add a story?",
            "answer": answer,
            "category": "height",
            "source": "Draft Text Amendment Table B; FY25 parcel data"
        })

    # ... similar for each question template
    return qa
```

---

## Grounding Rules

- Answer only from: verified City sources, verified legal text, verified parcel data, documented calculations
- Cite sources inline
- Say "This information is not available in our data" when a question can't be answered
- Never fill gaps with generic zoning knowledge

---

## Calculations Required

Uses the same property-level calculations as the comparison table (already computed). No additional computation needed — answers are templated from existing results.
