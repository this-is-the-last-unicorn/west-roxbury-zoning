/**
 * Data generators index
 *
 * Export all generators from here for easy importing.
 * Add new generators as you expand your schema.
 *
 * Pattern for adding new generators:
 *
 * 1. Create generator file: `generators/my-model.ts`
 * 2. Export functions: `generateMyModels`, `generateMyModel`
 * 3. Add export here: `export * from './my-model.js'`
 * 4. Use in seed command
 */

export * from './users.js'
