# Cursor Commands

Workflow commands for AI-assisted development. Each command is a self-contained guide
that an AI agent reads and follows step-by-step.

## Project Setup

| Command                                | When to Use                                               |
| -------------------------------------- | --------------------------------------------------------- |
| [setup-project.md](./setup-project.md) | **First time** — initialize project from starter template |

## Workflow Commands

| Command                                    | When to Use                                                  |
| ------------------------------------------ | ------------------------------------------------------------ |
| [start-new-work.md](./start-new-work.md)   | Starting a new feature — create branch, plan, begin          |
| [resume-work.md](./resume-work.md)         | Resuming paused work — restore context, review progress      |
| [take-over-work.md](./take-over-work.md)   | Taking over from a background agent — review, test, iterate  |
| [pre-pr-checks.md](./pre-pr-checks.md)     | Before creating a PR — typecheck, lint, secrets scan, format |
| [cleanup.md](./cleanup.md)                 | After PR merged — delete local branches, reset to main       |
| [debug-mode.md](./debug-mode.md)           | Complex bug — create focused debug doc, systematic fix       |
| [security-checks.md](./security-checks.md) | Security audit — scan for secrets, vulnerabilities, headers  |

## Reference Docs

Detailed guides for specific fix scenarios. Not invoked directly — linked from the
main commands when needed.

| Reference                                                                  | Linked From     |
| -------------------------------------------------------------------------- | --------------- |
| [reference/fix-console-logs.md](./reference/fix-console-logs.md)           | pre-pr-checks   |
| [reference/fix-hardcoded-secrets.md](./reference/fix-hardcoded-secrets.md) | pre-pr-checks   |
| [reference/fix-exposed-secrets.md](./reference/fix-exposed-secrets.md)     | security-checks |

## How to Use

Tell the agent what you want:

```
"Start new work on user-dashboard"
"Resume work on feature/auth-flow"
"Run pre-PR checks"
"Run security checks"
"Create debug mode doc for the data sync issue"
"Take over work from the background agent on feature/workflow-engine"
"Clean up branches"
```

## Standard Development Flow

```
start-new-work  ->  [develop]  ->  pre-pr-checks  ->  [PR merged]  ->  cleanup
```

## Multi-Agent Flow

```
[background agent implements]  ->  take-over-work  ->  [test/iterate]  ->  pre-pr-checks
```
