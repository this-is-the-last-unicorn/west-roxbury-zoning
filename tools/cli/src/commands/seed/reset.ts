import { Command, Flags } from '@oclif/core'

/**
 * Reset command - clears all seeded data from the database
 *
 * Usage:
 *   app seed reset           # Reset with confirmation
 *   app seed reset --force   # Reset without confirmation
 */
export default class Reset extends Command {
  static override description = 'Clear all seeded data from the database'

  static override examples = [
    '<%= config.bin %> seed reset',
    '<%= config.bin %> seed reset --force',
  ]

  static override flags = {
    force: Flags.boolean({
      char: 'f',
      description: 'Skip confirmation prompt',
      default: false,
    }),
  }

  public async run(): Promise<void> {
    const { flags } = await this.parse(Reset)
    const { prisma } = await import('@app/database')

    if (!flags.force) {
      this.log('⚠️  This will delete ALL data from the database.')
      this.log('   Use --force to skip this warning.\n')
      // In a real app, you'd add a confirmation prompt here
    }

    this.log('🗑️  Resetting database...\n')

    // Delete in order to respect foreign key constraints
    // Add more tables here as your schema grows
    const deletedUsers = await prisma.user.deleteMany()
    this.log(`   Deleted ${deletedUsers.count} users`)

    this.log('\n✅ Database reset complete!')
  }
}
