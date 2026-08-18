# Architecture Decisions

This file records architecture decisions made during the development of the West Roxbury Zoning Analysis tool. Each section documents a choice that was made, why it was made, and what alternatives were considered.

---

## Decision 1: Project Identity

**Chosen:** West Roxbury Zoning Analysis tool

A full-stack application for analyzing zoning regulations, parcel data, and land use in West Roxbury, Boston. Combines GIS mapping with structured zoning data.

---

## Decision 2: Authentication

**Chosen:** None (public tool)

This is a public-facing analysis tool. No user authentication is required. If auth is added later, Better Auth (DB-backed, local-first) is the default pattern for Last Unicorn projects.

---

## Decision 3: UI Component Library

**Chosen:** shadcn/ui + Tailwind CSS 4

Pre-configured. Add components as needed:

```bash
npx shadcn@latest add button card dialog
```

---

## Decision 4: Infrastructure / Hosting

**Chosen:** Render (via Blueprint in `render.yaml`)

The `render.yaml` Blueprint defines the full stack: web, API, PostgreSQL. Deploy by connecting the repo to Render and creating a Blueprint instance.

See `instructions/development/deployment.md` for the full guide.

---

## Decision 5: Secrets Management

**Chosen:** Doppler

All `dev` scripts run through `doppler run --`. Scripts ending in `:local` bypass Doppler for fully offline development.

Setup:

```bash
./scripts/setup-doppler.sh west-roxbury-zoning "postgresql://localhost:5432/west_roxbury_zoning_local"
```

---

## Decision 6: Security Scanning

**Chosen:** Aikido (always enabled)

### Aikido Code Scanning (GitHub integration)

Scans repos for vulnerabilities, exposed secrets, outdated deps, and license issues. Connected at the GitHub org level — new repos are automatically picked up.

### Aikido Safe Chain (local + CI malware protection)

Wraps around `bun` to block malicious packages on install. Install with:

```bash
curl -fsSL https://pkg.aikido.dev/safe-chain/install | sh
```

---

## Decision 7: Error Tracking

**Chosen:** Sentry (via `@app/logger`)

The logger package includes Sentry integration with version-tracked releases. Add `SENTRY_DSN` to Doppler when ready.

---

## Decision 8: Mapping Library

**Chosen:** Mapbox GL JS

Used for rendering zoning district boundaries, parcel polygons, and interactive map exploration. Requires `MAPBOX_ACCESS_TOKEN` in environment.

---

## Decision 9: Data Pipeline

**Chosen:** Python (`tools/pipeline/load_data.py`)

All zoning math, parcel data ingestion, and geographic calculations are handled by the Python pipeline. This is the single source of truth — TypeScript code queries the results but does not duplicate the calculations.

---

## Decision 10: CI/CD (GitHub Actions)

**Chosen:** All workflows enabled

The `.github/workflows/` directory includes:

| Workflow                 | Trigger                  | What it does                              |
| ------------------------ | ------------------------ | ----------------------------------------- |
| `test.yml`               | PRs + push to main       | Lint, typecheck, test, schema drift check |
| `claude-code-review.yml` | PR opened/updated        | Claude reviews the diff, posts findings   |
| `claude.yml`             | `@claude` in any comment | Claude responds to tagged requests        |
| `deploy.yml`             | PR merged to main        | Triggers Render deploy hooks              |

**Required GitHub secrets:**

| Secret                   | Workflow                           | Required? |
| ------------------------ | ---------------------------------- | --------- |
| `ANTHROPIC_API_KEY`      | claude-code-review, claude, deploy | Yes       |
| `RENDER_WEB_DEPLOY_HOOK` | deploy                             | Yes       |
| `RENDER_API_DEPLOY_HOOK` | deploy                             | Yes       |
