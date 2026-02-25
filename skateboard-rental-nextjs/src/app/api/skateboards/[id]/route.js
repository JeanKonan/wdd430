import { Client } from 'pg';

export async function GET(request, { params }) {
  const { id } = await params;

  const client = new Client({
    user: 'postgres',
    password: 'admin',
    host: 'localhost',
    port: 5432,
    database: 'skateboard_rental_nextjs',
  });

  try {
    await client.connect();

    const result = await client.query(
      'SELECT * FROM "Skateboard" WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return Response.json(
        { error: 'Skateboard not found' },
        { status: 404 }
      );
    }

    return Response.json(result.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await client.end();
  }
}
