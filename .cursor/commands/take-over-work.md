# Take Over Work Command

**Purpose**: Take over work from a background agent (worktree) for local testing and iteration

---

## What This Command Does

When you say "take over work from [branch]", this command:

1. Finds the branch the background agent was working on
2. Switches to the branch and pulls latest changes
3. Reviews research notes and commit history
4. Analyzes what the agent implemented vs what's left
5. Identifies the handoff point and what needs testing
6. Waits for your direction on what to test/iterate

---

## Usage

```
"Take over work from feature/workflow-engine"
"Take over the auth branch"
```

## Workflow Context

```
Background Agent (Worktree)
    | (heavy lifting, implementation, research)
    v
[TAKE OVER WORK] <-- You are here
    | (testing, verification, iteration, polish)
    v
[PRE-PR-CHECKS]
    v
Ready to Merge
```

**Key Differences from `/resume-work`:**

| `/resume-work`               | `/take-over-work`                     |
| ---------------------------- | ------------------------------------- |
| Resume YOUR paused work      | Take over from BACKGROUND AGENT       |
| You know what you were doing | Need to understand what agent did     |
| Continue where you left off  | Review, test, iterate on agent's work |

## What Gets Analyzed

1. **Agent's commits** - all changes, approach, architecture decisions
2. **Research & docs** - notes, rationale, known issues
3. **Current state** - fully done, partially done, needs work, needs testing
4. **Handoff** - why agent stopped, what needs your attention

## What This Command Does NOT Do

- Does not make any code changes
- Does not run tests automatically
- Does not start work until you specify what to focus on

---

## Related Commands

- **resume-work.md** - Resume your own paused work
- **start-new-work.md** - Start fresh work
- **pre-pr-checks.md** - Run before creating PR
- **cleanup.md** - Clean up after PR merged
