/**
 * User data generator
 *
 * Uses Faker.js to generate realistic synthetic user data.
 * Extend this pattern for other models in your schema.
 */

import { faker } from '@faker-js/faker'

/**
 * Get Prisma client (lazy loaded to avoid issues with command discovery)
 */
async function getPrisma() {
  const { prisma } = await import('@app/database')
  return prisma
}

/**
 * Generate synthetic users
 *
 * @param count - Number of users to generate
 * @returns Array of created users
 *
 * @example
 * ```ts
 * const users = await generateUsers(10)
 * console.log(`Created ${users.length} users`)
 * ```
 */
export async function generateUsers(count: number) {
  const prisma = await getPrisma()
  const users = []

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    const user = await prisma.user.create({
      data: {
        email: faker.internet.email({ firstName, lastName }).toLowerCase(),
        name: `${firstName} ${lastName}`,
      },
    })

    users.push(user)
  }

  return users
}

/**
 * Generate a single user with specific attributes
 *
 * @param overrides - Partial user data to override defaults
 * @returns Created user
 */
export async function generateUser(overrides: Partial<{ email: string; name: string }> = {}) {
  const prisma = await getPrisma()
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()

  return prisma.user.create({
    data: {
      email: overrides.email || faker.internet.email({ firstName, lastName }).toLowerCase(),
      name: overrides.name || `${firstName} ${lastName}`,
    },
  })
}
