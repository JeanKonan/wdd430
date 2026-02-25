import pkg from 'pg'
const { Client } = pkg

const getClient = () => new Client({
  user: 'postgres',
  password: 'admin',
  host: 'localhost',
  port: 5432,
  database: 'skateboard_rental_nextjs',
})

export async function GET() {
  const client = getClient()

  try {
    await client.connect()
    const result = await client.query(`
      SELECT 
        r.*,
        s.name as skateboard_name,
        s.type as skateboard_type,
        s."pricePerDay" as skateboard_price,
        u.name as user_name,
        u.email as user_email
      FROM "Rental" r
      LEFT JOIN "Skateboard" s ON r."skateboardId" = s.id
      LEFT JOIN "User" u ON r."userId" = u.id
      ORDER BY r."createdAt" DESC
    `)
    return Response.json(result.rows)
  } catch (error) {
    console.error('Error fetching rentals:', error)
    return Response.json(
      { error: 'Failed to fetch rentals' },
      { status: 500 }
    )
  } finally {
    await client.end()
  }
}

export async function POST(request) {
  const client = getClient()

  try {
    const body = await request.json()
    const { userId, skateboardId, startDate, endDate } = body

    // Validation
    if (!userId || !skateboardId || !startDate || !endDate) {
      return Response.json(
        { error: 'Missing required fields: userId, skateboardId, startDate, endDate' },
        { status: 400 }
      )
    }

    await client.connect()

    // Check if skateboard exists and is available
    const skateboardResult = await client.query(
      'SELECT * FROM "Skateboard" WHERE id = $1',
      [skateboardId]
    )

    if (skateboardResult.rows.length === 0) {
      return Response.json(
        { error: 'Skateboard not found' },
        { status: 404 }
      )
    }

    const skateboard = skateboardResult.rows[0]
    if (!skateboard.isAvailable) {
      return Response.json(
        { error: 'Skateboard is not available' },
        { status: 400 }
      )
    }

    // Calculate total price
    const start = new Date(startDate)
    const end = new Date(endDate)
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))

    if (days <= 0) {
      return Response.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      )
    }

    const totalPrice = days * skateboard.pricePerDay

    // Create rental
    const rentalResult = await client.query(
      `INSERT INTO "Rental" ("userId", "skateboardId", "startDate", "endDate", "totalPrice", status, "createdAt")
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING *`,
      [userId, skateboardId, startDate, endDate, totalPrice, 'active']
    )

    // Update skateboard availability
    await client.query(
      'UPDATE "Skateboard" SET "isAvailable" = false WHERE id = $1',
      [skateboardId]
    )

    const rental = rentalResult.rows[0]
    return Response.json(rental, { status: 201 })
  } catch (error) {
    console.error('Error creating rental:', error)
    return Response.json(
      { error: 'Failed to create rental' },
      { status: 500 }
    )
  } finally {
    await client.end()
  }
}
