import pkg from 'pg'
const { Client } = pkg

const client = new Client({
  user: 'postgres',
  password: 'admin',
  host: 'localhost',
  port: 5432,
  database: 'skateboard_rental_nextjs',
})

async function main() {
  try {
    await client.connect()
    console.log('✅ Connected to database')

    // Clear existing data
    await client.query('DELETE FROM "Rental"')
    await client.query('DELETE FROM "Skateboard"')
    await client.query('DELETE FROM "User"')
    console.log('🧹 Cleared existing data')

    // Create demo user
    await client.query(
      `INSERT INTO "User" (email, "passwordHash", name, "createdAt") 
       VALUES ($1, $2, $3, NOW())`,
      ['demo@example.com', 'hashed_password_placeholder', 'Demo User']
    )
    console.log('✅ Created demo user')

    // Create skateboards
    const skateboards = [
      ['Street Pro 8.0', 'street', '8.0"', 15.00, true],
      ['Cruiser Wave', 'cruiser', '7.5"', 12.00, true],
      ['Longboard Glide', 'longboard', '9.0"', 18.00, true],
      ['Electric Boost', 'electric', '8.5"', 35.00, true],
      ['Mini Cruiser', 'cruiser', '6.5"', 10.00, false],
      ['Downhill Racer', 'longboard', '9.5"', 22.00, true],
      ['Park Special', 'street', '8.25"', 16.00, true],
      ['Freestyle Master', 'street', '7.75"', 14.00, true],
    ]

    for (const [name, type, size, price, available] of skateboards) {
      await client.query(
        `INSERT INTO "Skateboard" (name, type, size, "pricePerDay", "isAvailable", "createdAt") 
         VALUES ($1, $2, $3, $4, $5, NOW())`,
        [name, type, size, price, available]
      )
    }
    console.log(`✅ Created ${skateboards.length} skateboards`)

    console.log('\n✨ Database seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  } finally {
    await client.end()
  }
}

main()
