# Setup Project Command

**Purpose**: Initialize a new project from the starter-kit template.

This command walks through all project decisions and produces a clean, runnable codebase.

---

## When to Use

When you've just cloned or copied starter-kit for a new project.

```
"Set up this project"
"Run through project setup"
"Initialize this repo for [project name]"
```

---

## What This Command Does

1. Reads `DECISIONS.md` at the repo root
2. Walks through each decision with the user
3. Makes all code changes based on the user's choices
4. Runs the post-decision verification checklist
5. Produces a clean initial commit

---

## Agent Instructions

### Step 1: Read DECISIONS.md

Read the full `DECISIONS.md` file. It contains every decision, the default choice,
alternatives, and exact agent instructions for each swap.

### Step 2: Walk Through Decisions

For each decision in DECISIONS.md:

1. Present the default and alternatives to the user
2. Ask which option they want (most will keep the default)
3. If they pick an alternative, follow the "Agent instructions" in DECISIONS.md exactly
4. Confirm the change is done before moving to the next decision

**Important:** Don't batch all questions upfront. Go one at a time so the user can
think through each choice and you can make changes incrementally.

### Step 3: Post-Decision Verification

After all decisions are made, run the post-decision checklist from DECISIONS.md:

```bash
bun install
bun run db:generate
bun run typecheck
bun run lint
```

Fix any errors that come up.

### Step 4: Verify Completeness

- No `[project]` placeholders remain anywhere in the repo
- `.claude.md` accurately describes the project
- `README.md` has the correct project name and description
- `render.yaml` has the correct service names (if using Render)
- All instruction docs reflect the chosen stack

### Step 5: Initial Commit

Stage all changes and create the initial commit:

```
feat: initialize [project-name] from starter-kit

Decisions made:
- Auth: [chosen auth]
- UI: [chosen UI library]
- Hosting: [chosen hosting]
- Secrets: [chosen secrets management]
```

---

### Step 6: Doppler Setup (Optional)

Ask the user if they want to set up Doppler now. If yes:

```bash
./scripts/setup-doppler.sh [project-name] "postgresql://localhost:5432/[db_name]_local"
```

This creates the Doppler project with the standard environment layout
(dev, dev_personal, preview, prd), sets the DATABASE_URL, and links the directory.

---

## What This Command Does NOT Do

- Does not create the database (user does that locally)
- Does not push to a remote (user creates the repo first)
- Does not deploy to Render (user connects via Blueprint)

---

## Related

- **DECISIONS.md** — The source of truth for all project decisions
- **start-new-work.md** — After setup, use this to begin feature work
