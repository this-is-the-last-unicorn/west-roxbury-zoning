# GitHub Actions (CI/CD)

The starter kit includes GitHub Actions workflows in `.github/workflows/`.

## Workflows

### 1. `test.yml` — CI Quality Gates

**Triggers:** Push to main, PRs targeting main

Runs on every PR and merge to main:

1. Install dependencies (with Aikido safe-chain)
2. Generate Prisma client
3. Check for schema drift (if migrations changed)
4. Prettier format check
5. ESLint
6. TypeScript type check
7. Run tests

### 2. `claude-code-review.yml` — Automated PR Review

**Triggers:** PR opened or updated

Claude reviews every PR automatically:

- Posts an "in progress" comment immediately
- Analyzes the diff for code quality, bugs, security, TypeScript strictness
- Updates the comment with a TL;DR + collapsible full review
- Advisory only — does not block merges

### 3. `claude.yml` — @claude Mentions

**Triggers:** `@claude` in issue/PR comments, reviews, or issue bodies

Lets anyone tag `@claude` in a GitHub comment to get Claude's help
on the issue or PR. Useful for debugging, explaining code, or getting
suggestions without leaving GitHub.

### 4. `deploy.yml` — Release Notes + Deploy

**Triggers:** PR merged to main

Two-phase workflow:

**Phase 1: Release Notes** (`scripts/release-notes/index.mjs`)

- Fetches PR title, body, commits, and file diffs from the GitHub API
- Sends to Claude for semantic analysis — generates user-facing release notes
  and recommends patch vs minor version bump
- Falls back to PR title/body + conventional commit detection if Claude is unavailable
- Creates a GitHub Release with semver auto-incremented from the latest git tag
- Optionally syncs the release to a Notion database

Version determination priority:

1. Explicit PR labels (`release:patch`, `release:minor`) override everything
2. Claude's semantic analysis of the actual code changes
3. Conventional commit prefix detection (`feat:` = minor, everything else = patch)

**Phase 2: Deploy**

- Triggers Render deploy hooks for web, API, and workers
- Comments on the PR if any deploy fails

**Customizing the release notes prompt:**
Edit `scripts/release-notes/prompt.txt` to adjust what Claude generates.
The default prompt produces categorized bullets (Features, Fixes, etc.) with
a `RECOMMENDED_VERSION: patch|minor` line.

### 5. `storybook.yml` — Storybook Build (opt-in)

**Triggers:** Push to main, PRs targeting main

Builds Storybook and uploads the static output as a workflow artifact.
Requires Storybook to be installed in `apps/web` first (see `DECISIONS.md` Decision 10).

Includes commented-out sections for:

- Playwright visual regression testing
- Snapshot diff uploads on failure

If you're not using Storybook, delete this workflow.

## Required Secrets

Add these to your GitHub repo: Settings -> Secrets and variables -> Actions

| Secret                       | Workflow                           | Required?                  |
| ---------------------------- | ---------------------------------- | -------------------------- |
| `ANTHROPIC_API_KEY`          | claude-code-review, claude, deploy | Yes                        |
| `RENDER_WEB_DEPLOY_HOOK`     | deploy                             | Yes (if on Render)         |
| `RENDER_API_DEPLOY_HOOK`     | deploy                             | Yes (if on Render)         |
| `RENDER_WORKERS_DEPLOY_HOOK` | deploy                             | Yes (if on Render)         |
| `NOTION_TOKEN`               | deploy                             | No (optional release sync) |
| `NOTION_DATABASE_ID`         | deploy                             | No (optional release sync) |

`GITHUB_TOKEN` is automatically provided by GitHub Actions — no setup needed.

## Setup Steps

1. Push your repo to GitHub
2. Go to repo Settings -> Secrets and variables -> Actions
3. Add `ANTHROPIC_API_KEY` (get from https://console.anthropic.com/settings/keys)
4. Add Render deploy hooks (get from Render Dashboard -> Service -> Settings -> Deploy Hook)
5. Optionally add `NOTION_TOKEN` + `NOTION_DATABASE_ID` for release tracking
6. The workflows activate automatically on the next PR

## Aikido Integration in CI

The `test.yml` workflow installs Aikido safe-chain before `bun install`, so
malicious packages are blocked in CI just like on developer machines.

For Aikido code scanning (vulnerability reports, secret detection), that runs
separately via the Aikido GitHub App — see `instructions/development/security-scanning.md`.

## Customizing

- **Add more test steps:** Edit `test.yml` (e.g., add `bun run test:e2e`, coverage reports)
- **Add more deploy targets:** Edit `deploy.yml` to add more `deploy_service` calls
- **Adjust Claude's review prompt:** Edit `claude-code-review.yml` prompt section
- **Adjust release notes format:** Edit `scripts/release-notes/prompt.txt`
- **Skip CI for docs-only PRs:** Add path filters to the `on:` triggers
- **Add Chromatic for hosted Storybook:** Add a `chromatic` step to `storybook.yml`
- **Enable Notion release tracking:** Add `NOTION_TOKEN` and `NOTION_DATABASE_ID` secrets
