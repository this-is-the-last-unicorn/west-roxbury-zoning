# Fix Exposed Secrets (Already in Git)

Handle secrets that were already committed and pushed to git history.

## CRITICAL: Immediate Actions (within 15 minutes)

1. **Rotate the secret immediately**
2. **Revoke the old secret**
3. **Verify the old secret no longer works**

Only after the secret is rotated should you worry about cleaning git history.

## Step 1: Identify the Exposed Secret

```bash
# Find which files contain the secret
git log --all --full-history -S"YOUR_SECRET_PREFIX" --source --name-only

# Check if it's in current codebase
rg "YOUR_SECRET_PREFIX" . -g "!.git" -g "!node_modules"
```

## Step 2: Rotate the Secret

1. Generate a new secret in the service dashboard
2. Update in Doppler with new value
3. Delete/revoke the old secret
4. Verify old secret no longer works

## Step 3: Remove from Current Codebase

```bash
# Replace with environment variable
# See fix-hardcoded-secrets.md for patterns

git add path/to/file
git commit -m "security: remove exposed secret, use env var"
git push origin HEAD
```

## Step 4: Remove from Git History

### Option A: BFG Repo-Cleaner (Recommended)

```bash
brew install bfg

# Clone a fresh mirror copy
cd /tmp
git clone --mirror git@github.com:your-org/your-repo.git

# Create a file with strings to remove
echo "sk-ant-api03-xxxxx" > secrets.txt

# Run BFG
cd your-repo.git
bfg --replace-text ../secrets.txt

# Clean up and force push (COORDINATE WITH TEAM)
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force
```

### Option B: git filter-repo

```bash
brew install git-filter-repo

cd /tmp
git clone git@github.com:your-org/your-repo.git
cd your-repo

echo "sk-ant-api03-xxxxx==>REDACTED" > replacements.txt
git filter-repo --replace-text replacements.txt

git push --force --all
```

## Step 5: Notify Team (if force-pushed)

Everyone needs to:

1. Save local changes
2. Delete and re-clone the repo
3. Rebase any open PRs onto new main

## Step 6: Verify Clean

```bash
git log --all --full-history -S"YOUR_SECRET" --source
rg "YOUR_SECRET" . -g "!.git" -g "!node_modules"
```

## Prevention

1. Run `pre-pr-checks.md` before pushing
2. Use Doppler for all secrets
3. Review diffs before committing

## Related Commands

- [fix-hardcoded-secrets.md](./fix-hardcoded-secrets.md) - Prevent future hardcoded secrets
- [security-checks.md](../security-checks.md) - Regular security review
