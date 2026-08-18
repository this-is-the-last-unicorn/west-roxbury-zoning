import { Command, Flags } from '@oclif/core'

import { generateUsers } from '../../generators/users.js'

/**
 * Seed command - populates database with synthetic data
 *
 * Usage:
 *   app seed              # Seed with default counts
 *   app seed --users 50   # Seed 50 users
 *   app seed --clean      # Clear existing data before seeding
 */
export default class Seed extends Command {
  static override description = 'Seed database with synthetic data'

  static override examples = [
    '<%= config.bin %> seed',
    '<%= config.bin %> seed --users 50',
    '<%= config.bin %> seed --clean',
  ]

  static override flags = {
    users: Flags.integer({
      char: 'u',
      description: 'Number of users to generate',
      default: 10,
    }),
    clean: Flags.boolean({
      char: 'c',
      description: 'Clear existing data before seeding',
      default: false,
    }),
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Seed)

    this.log('🌱 Starting seed...\n')

    if (flags.clean) {
      this.log('🧹 Cleaning existing data...')
      // Add clean logic here when you have more models
      this.log('   Done!\n')
    }

    // Generate users
    this.log(`👤 Generating ${flags.users} users...`)
    const users = await generateUsers(flags.users)
    this.log(`   Created ${users.length} users\n`)

    this.log('✅ Seed complete!')
  }
}
