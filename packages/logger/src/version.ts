import fs from 'fs'
import path from 'path'

/**
 * Version information from git tags
 *
 * The .version.json file is created during build by scripts/build-with-version.sh
 * and persists from build time to runtime.
 */
export interface VersionInfo {
  version: string
  commit: string
  buildTime: string
}

let cachedVersion: VersionInfo | null = null

/**
 * Read version info from .version.json file
 *
 * Falls back to environment variables if file doesn't exist (for local dev).
 *
 * @returns Version information
 *
 * @example
 * ```typescript
 * const versionInfo = getVersionInfo()
 * console.log(`Version: ${versionInfo.version}`)
 * // Output: Version: v0.1.0
 * ```
 */
export function getVersionInfo(): VersionInfo {
  // Return cached version if available
  if (cachedVersion) {
    return cachedVersion
  }

  try {
    // Try to read from .version.json in workspace root
    // Services run from apps/api/, apps/workers/, etc.
    // So ../../.version.json resolves to workspace root
    const versionPath = path.join(process.cwd(), '../../.version.json')

    if (fs.existsSync(versionPath)) {
      const versionData = fs.readFileSync(versionPath, 'utf8')
      const parsed = JSON.parse(versionData) as VersionInfo
      cachedVersion = parsed
      return parsed
    }
  } catch {
    // Ignore read errors
  }

  // Fallback to environment variables (for local dev without build)
  cachedVersion = {
    version: process.env.APP_VERSION || 'dev',
    commit: process.env.GIT_COMMIT || 'unknown',
    buildTime: process.env.BUILD_TIME || new Date().toISOString(),
  }

  return cachedVersion
}

/**
 * Get just the version string
 *
 * @returns Version string (e.g., "v0.1.0")
 *
 * @example
 * ```typescript
 * const version = getVersion()
 * console.log(version) // "v0.1.0"
 * ```
 */
export function getVersion(): string {
  return getVersionInfo().version
}
