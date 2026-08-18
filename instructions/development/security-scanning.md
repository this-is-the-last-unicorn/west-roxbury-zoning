# Security Scanning (Aikido)

Aikido is the standard security toolchain for all Last Unicorn projects. Every repo gets it.

## Two Components

### 1. Aikido Code Scanning (GitHub integration)

Continuous scanning of your GitHub repo for:

- Dependency vulnerabilities (CVEs)
- Exposed secrets in code and git history
- Outdated/EOL packages
- License compliance issues
- SAST (static analysis) findings

**How it works:**

- Connected at the GitHub org level via the Aikido GitHub App
- Read-only access, no tokens stored
- New repos are automatically picked up when added to the org
- Scan results appear within ~1 minute
- Findings create tickets (or integrate with your issue tracker)

**Dashboard:** https://app.aikido.dev/

**Setup (org-level, one-time):**

1. Log in at https://app.aikido.dev/ with GitHub
2. Authorize the `this-is-the-last-unicorn` org
3. Grant access to specific repos or all repos
4. Aikido starts scanning automatically

**Per-repo verification:**

- Check that your repo appears in the Aikido dashboard
- If not, an org admin needs to grant Aikido access to the new repo

### 2. Aikido Safe Chain (local + CI malware protection)

Wraps around package manager CLIs (`bun`, `npm`, `yarn`, `pnpm`, `pip`, etc.)
to block malicious packages at install time.

**What it catches:**

- Packages published less than 24-48 hours ago (configurable)
- Obfuscated code
- Data exfiltration attempts
- Malicious install scripts
- Crypto miners

**Properties:**

- Free, tokenless — no build data shared with Aikido
- Works on developer laptops and in CI/CD
- Does not break builds for legitimate packages

**Install (per-machine, one-time):**

```bash
# macOS / Linux
curl -fsSL https://pkg.aikido.dev/safe-chain/install | sh
```

After install, restart your terminal. Safe-chain is now active globally — every
`bun install`, `npm install`, etc. goes through it automatically.

**Verify it's working:**

Run `bun install` in any project. You should see Aikido safe-chain output in
the install logs (package age warnings, scan results, or the safe-chain banner).
The `ℹ Safe-chain:` messages in bun output confirm it's active.

**CI/CD:**

Add safe-chain to your CI pipeline before dependency installation:

```yaml
# In your CI config (GitHub Actions example)
- name: Install Aikido Safe Chain
  run: curl -fsSL https://pkg.aikido.dev/safe-chain/install | sh

- name: Install dependencies
  run: bun install
```

## Triage Workflow

When Aikido finds issues, use the `.cursor/commands/security-checks.md` command
to triage and fix them systematically. The command walks through:

1. Finding all open security findings
2. Prioritizing by severity (urgent/high/medium/low)
3. Fixing or closing each one
4. Documenting false positives

## Related

- [Security Guidelines](./security-guidelines.md) — coding security practices
- [Security Checks Command](../../.cursor/commands/security-checks.md) — triage workflow
- [Fix Exposed Secrets](../../.cursor/commands/reference/fix-exposed-secrets.md) — emergency rotation guide
