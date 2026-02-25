import pkg from 'pg'
const { Client } = pkg

export async function GET() {
  const client = new Client({
    user: 'postgres',
    password: 'admin',
    host: 'localhost',
    port: 5432,
    database: 'skateboard_rental_nextjs',
  })

  try {
    await client.connect()
    const result = await client.query('SELECT * FROM "Skateboard" ORDER BY "createdAt" DESC')
    return Response.json(result.rows)
  } catch (error) {
    console.error('Error fetching skateboards:', error)
    return Response.json(
      { error: 'Failed to fetch skateboards' },
      { status: 500 }
    )
  } finally {
    await client.end()
  }
}
