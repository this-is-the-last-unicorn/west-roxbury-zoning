# @app/cli

CLI for development tasks and synthetic data seeding.

## Quick Start

```bash
# From project root
bun run seed           # Seed with defaults
bun run seed:reset     # Clear all data

# Or run directly
bun --cwd tools/cli dev seed
bun --cwd tools/cli dev seed reset
```

## Commands

### `seed`

Seed database with synthetic data.

```bash
# Default: 10 users
app seed

# Custom count
app seed --users 50

# Clean before seeding
app seed --clean

# All options
app seed --users 100 --clean
```

### `seed reset`

Clear all seeded data from database.

```bash
# With confirmation warning
app seed reset

# Skip confirmation
app seed reset --force
```

## Adding New Generators

1. **Create generator file** in `src/generators/`:

   ```ts
   // src/generators/products.ts
   import { faker } from '@faker-js/faker'
   import { prisma } from '@app/database'

   export async function generateProducts(count: number) {
     const products = []

     for (let i = 0; i < count; i++) {
       const product = await prisma.product.create({
         data: {
           name: faker.commerce.productName(),
           price: parseFloat(faker.commerce.price()),
           description: faker.commerce.productDescription(),
         },
       })
       products.push(product)
     }

     return products
   }
   ```

2. **Export from index** in `src/generators/index.ts`:

   ```ts
   export * from './products.js'
   ```

3. **Add to seed command** in `src/commands/seed/index.ts`:

   ```ts
   import { generateProducts } from '../../generators/index.js'

   // In flags
   static override flags = {
     // ... existing flags
     products: Flags.integer({
       char: 'p',
       description: 'Number of products to generate',
       default: 20,
     }),
   }

   // In run()
   this.log(`📦 Generating ${flags.products} products...`)
   const products = await generateProducts(flags.products)
   this.log(`   Created ${products.length} products\n`)
   ```

4. **Update reset command** in `src/commands/seed/reset.ts`:

   ```ts
   // Delete in correct order for foreign keys
   const deletedProducts = await prisma.product.deleteMany()
   this.log(`   Deleted ${deletedProducts.count} products`)
   ```

## Adding New Commands

1. **Create command file** in `src/commands/`:

   ```ts
   // src/commands/my-command.ts
   import { Command, Flags } from '@oclif/core'

   export default class MyCommand extends Command {
     static override description = 'Description of my command'

     static override flags = {
       name: Flags.string({ char: 'n', description: 'Name flag' }),
     }

     public async run(): Promise<void> {
       const { flags } = await this.parse(MyCommand)
       this.log(`Hello, ${flags.name || 'world'}!`)
     }
   }
   ```

2. **Build** to compile TypeScript:

   ```bash
   bun --cwd tools/cli build
   ```

3. **Run**:

   ```bash
   bun --cwd tools/cli dev my-command --name "Test"
   ```

## Faker.js Tips

```ts
import { faker } from '@faker-js/faker'

// People
faker.person.firstName()
faker.person.lastName()
faker.person.fullName()

// Internet
faker.internet.email()
faker.internet.username()
faker.internet.url()

// Commerce
faker.commerce.productName()
faker.commerce.price()
faker.commerce.department()

// Lorem
faker.lorem.sentence()
faker.lorem.paragraph()
faker.lorem.paragraphs(3)

// Dates
faker.date.past()
faker.date.future()
faker.date.between({ from: '2020-01-01', to: '2024-01-01' })

// Numbers
faker.number.int({ min: 1, max: 100 })
faker.number.float({ min: 0, max: 100, fractionDigits: 2 })

// Seed for reproducible data
faker.seed(12345)
```

## Development

```bash
# Build TypeScript
bun --cwd tools/cli build

# Run in dev mode (uses ts-node)
bun --cwd tools/cli dev [command]

# Type check
bun --cwd tools/cli typecheck
```
