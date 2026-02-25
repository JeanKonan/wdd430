import pkg from 'pg'
const { Client } = pkg

export async function GET(request, { params }) {
  const client = new Client({
    user: 'postgres',
    password: 'admin',
    host: 'localhost',
    port: 5432,
    database: 'skateboard_rental_nextjs',
  })

  try {
    const id = parseInt(params.id)
    await client.connect()
    const result = await client.query('SELECT * FROM "Skateboard" WHERE id = $1', [id])
    
    if (result.rows.length === 0) {
      return Response.json(
        { error: 'Skateboard not found' },
        { status: 404 }
      )
    }

    return Response.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching skateboard:', error)
    return Response.json(
      { error: 'Failed to fetch skateboard' },
      { status: 500 }
    )
  } finally {
    await client.end()
  }
}
