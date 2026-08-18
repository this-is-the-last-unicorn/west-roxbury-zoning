# Debug Mode Command

## Purpose

Creates a focused debug document for complex issues that require systematic, step-by-step debugging with frequent user testing and validation.

## When to Use

- Multiple related bugs requiring systematic debugging
- Complex UX issues with cascading fixes
- Need to isolate debugging from main research notes
- Building incrementally with frequent user testing

## Usage

```
"Create debug mode doc for [feature name]"
"Enter debug mode for [feature name]"
```

## What It Does

1. Creates `DEBUG-[FEATURE].md` at the repository root
2. Sets up a structured template with step-by-step sections, test criteria, and progress tracking
3. Provides a focused workspace for isolated debugging
4. After completion, consolidates learnings into research notes
5. Deletes the debug doc to avoid clutter

## Template Structure

```markdown
# [FEATURE] Debug Plan

**Date:** [Current Date]
**Status:** Step-by-step debugging

---

## Step 1: [Issue Name] (STATUS)

**What:** Brief description of what this step fixes

**Test Criteria:**

- [ ] Test item 1
- [ ] Test item 2

**Solution:**
[Document fix after completion]

**Status:** IN PROGRESS / COMPLETE

---

## Progress Summary

### Completed Steps

1. Step 1 - Description

### Current Focus

Step X: [Current work]

### Remaining

- Step Y

---

## Key Learnings

- Learning 1
- Learning 2

---

**Ready for consolidation:** [Yes/No]
```

## Workflow

1. User requests debug mode
2. AI creates `DEBUG-[FEATURE].md`
3. Iterative loop: user reports issue -> AI documents -> AI fixes -> user tests -> update status
4. User says "consolidate" or "all issues fixed"
5. AI extracts learnings, updates research notes, deletes debug doc

## Tips

- Keep each step focused on one issue
- Update statuses immediately after changes
- Add test criteria before implementing
- Consolidate promptly after completion
- Always delete debug doc after consolidation

## Related Commands

- **pre-pr-checks.md** - Run before creating PR
