import { sequelize } from './database.js';
import { User, Skateboard, Rental } from '../models/index.js';

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true }); // WARNING: Deletes existing data!
    console.log('Database synced successfully!');
    console.log('Tables created: users, skateboards, rentals');
  } catch (error) {
    console.error('Error syncing database:', error);
  } finally {
    process.exit();
  }
}

syncDatabase();
