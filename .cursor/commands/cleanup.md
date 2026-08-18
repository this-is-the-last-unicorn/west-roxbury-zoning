# Git Branch Cleanup

After completing a PR and confirming it's been merged, clean up your local branches.

## When to Run This

**Run cleanup when:**

- Your PR has been merged to main
- Remote branch has been deleted on GitHub
- You want to start fresh for new work

**Don't run cleanup if:**

- You have uncommitted changes
- You're in the middle of work on a branch
- You have local branches with unmerged work you want to keep

## Option 1: Safe Cleanup (Recommended)

```bash
# Switch to main and pull latest
git checkout main && git pull origin main

# Delete merged branches only (safe - refuses to delete unmerged)
git branch --merged | grep -v "main" | xargs git branch -d
```

## Option 2: Force Cleanup (Use Carefully)

```bash
git checkout main && git pull origin main

# Force-delete all local branches except main
git branch | grep -v "main" | xargs git branch -D
```

**Warning:** This force-deletes branches even if unmerged. Use only when certain.

## Option 3: Quick One-liner

```bash
git checkout main && git pull origin main && git branch --merged | grep -v "main" | xargs git branch -d
```

## Verification

```bash
git status
git branch        # remaining local branches
git branch -r     # remaining remote branches
```

## After Cleanup

Ready to start new work. See: [start-new-work.md](./start-new-work.md)
