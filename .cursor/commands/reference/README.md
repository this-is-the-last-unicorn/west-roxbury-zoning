# Reference Documentation

This folder contains detailed guides for specific scenarios that are referenced by the main workflow commands.

## Purpose

- **In-depth explanations** for complex fixes
- **Alternative approaches** for different situations
- **Additional context** beyond what's in the main commands

## When to Use

You typically won't invoke these directly. Instead:

1. Run main workflow commands (like `pre-pr-checks.md` or `security-checks.md`)
2. If issues are found, the main command guides you inline
3. For complex cases, the main command links here for additional details

## Available References

### [fix-console-logs.md](./fix-console-logs.md)

Comprehensive guide for removing debug console.log statements.
**Referenced from:** `pre-pr-checks.md`

### [fix-hardcoded-secrets.md](./fix-hardcoded-secrets.md)

Replacing hardcoded secrets with environment variables.
**Referenced from:** `pre-pr-checks.md`

### [fix-exposed-secrets.md](./fix-exposed-secrets.md)

Emergency guide for secrets already pushed to git.
**Referenced from:** `security-checks.md`
