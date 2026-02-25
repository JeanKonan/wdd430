import { Client } from 'pg';

const client = new Client({
  user: 'postgres',
  password: 'admin',
  host: 'localhost',
  port: 5432,
  database: 'skateboard_rental_nextjs',
});

async function checkUser() {
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM "User"');
    console.log(JSON.stringify(result.rows, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.end();
  }
}

checkUser();
