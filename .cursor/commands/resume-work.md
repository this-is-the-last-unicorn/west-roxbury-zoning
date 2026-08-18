# Resume Work Command

**Purpose**: Resume work on an existing feature branch with full context restoration

---

## What This Command Does

When you say "resume work on [branch-name]", this command:

1. Finds the branch (local or remote)
2. Switches to the branch
3. Reviews research notes (if any exist)
4. Reviews commit history since diverging from main
5. Builds context summary and next steps
6. Waits for your approval before continuing

---

## Usage

```
"Resume work on feature/user-auth"
"Let's continue the dashboard work"
"Resume feature/workflow-engine"
```

## What Gets Reviewed

1. **Branch Information** - local vs remote, commits ahead/behind
2. **Research Notes** - any docs in `instructions/research-notes/`
3. **Commit History** - what's been implemented since branching
4. **Context Summary** - what's complete, in progress, and next

## Success Criteria

- Correct branch checked out
- Full understanding of what's been done
- Clear next steps identified
- Any blockers surfaced

## What This Command Does NOT Do

- Does not make any code changes
- Does not commit anything
- Does not push to remote
- Does not start working until you say "approved"

---

## Related Commands

- **start-new-work.md** - Start fresh work on a new feature
- **pre-pr-checks.md** - Run before creating PR
- **cleanup.md** - Clean up after PR merged
