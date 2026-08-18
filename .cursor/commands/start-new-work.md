# Starting New Work

When starting work on a new feature or ticket, always start from main and create a properly-named branch.

## Quick Start

```
Ask me: "Start work on [feature name]"
```

## Step 1: Check for Uncommitted Changes

**Before switching branches**, always check for uncommitted work:

```bash
git status
```

**If there are uncommitted changes:**

```
⚠️ STOP! You have uncommitted changes:
  - Modified files: [list files]
  - Untracked files: [list files]

What would you like to do?
1. Commit these changes to current branch
2. Stash these changes for later
3. Discard these changes (dangerous!)
```

**⚠️ NEVER switch branches with uncommitted work without asking first!**

## Step 2: Create Branch from Main

```bash
# Ensure you're on main with latest changes
git checkout main
git pull origin main

# Create new branch
git checkout -b feature/[brief-description]

# Verify you're on the new branch
git branch --show-current
```

**Branch Naming Convention:**

- Format: `feature/brief-description` or `fix/brief-description`
- Use lowercase and hyphens
- Keep it short but descriptive

Examples:

- `feature/user-auth`
- `feature/dashboard-charts`
- `fix/login-redirect`

## Step 3: Plan Before Coding (For Complex Work)

For complex features, take time to plan:

1. **Understand the requirements**
   - What is the expected behavior?
   - What are the edge cases?
   - What dependencies are involved?

2. **Review existing patterns**
   - Check similar implementations in the codebase
   - Follow established patterns
   - Reuse existing components/utilities

3. **Break down the work**
   - Split into smaller, testable pieces
   - Identify what can be done in parallel
   - Estimate effort for each piece

## Step 4: Start Implementation

**Best Practices:**

- ✅ Implement in small, testable increments
- ✅ Write tests as you go (not after)
- ✅ Commit frequently with descriptive messages
- ✅ Keep PRs focused and reviewable

**Commit frequently:**

```bash
git add .
git commit -m "feat: add [specific change]"
```

## Quick Reference Flow

```bash
# 1. Check for uncommitted changes
git status

# 2. If clean, get latest main
git checkout main && git pull origin main

# 3. Create feature branch
git checkout -b feature/my-feature

# 4. Verify branch
git branch --show-current

# 5. Start coding!
```

## Summary: Golden Rules

1. ✅ **ALWAYS** check for uncommitted changes first
2. ✅ **ALWAYS** create branches from latest main
3. ✅ **ALWAYS** use descriptive branch names
4. ✅ **ALWAYS** commit frequently
5. ❌ **NEVER** work directly on main
6. ❌ **NEVER** switch branches with uncommitted work (without asking)
