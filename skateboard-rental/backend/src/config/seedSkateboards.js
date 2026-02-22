import { Skateboard } from '../models/Skateboard.js';
import { sequelize } from '../config/database.js';

const seedSkateboards = async () => {
  try {
    // Sync database
    await sequelize.sync();

    // Delete all existing skateboards (fresh start)
    await Skateboard.destroy({ where: {} });
    console.log('Cleared existing skateboards.');

    // Sample skateboard data
    const skateboards = [
      {
        name: 'Pro Street Rider',
        type: 'Street',
        brand: 'Tony Hawk',
        pricePerHour: 15.00,
        status: 'available',
        imageUrl: 'https://via.placeholder.com/300x200?text=Pro+Street+Rider'
      },
      {
        name: 'Cruiser Classic',
        type: 'Cruiser',
        brand: 'Sector 9',
        pricePerHour: 12.00,
        status: 'available',
        imageUrl: 'https://via.placeholder.com/300x200?text=Cruiser+Classic'
      },
      {
        name: 'Trick Master',
        type: 'Trick',
        brand: 'Spitfire',
        pricePerHour: 16.00,
        status: 'available',
        imageUrl: 'https://via.placeholder.com/300x200?text=Trick+Master'
      },
      {
        name: 'Speed Demon',
        type: 'Downhill',
        brand: 'Loaded',
        pricePerHour: 18.00,
        status: 'available',
        imageUrl: 'https://via.placeholder.com/300x200?text=Speed+Demon'
      },
      {
        name: 'Park Shredder',
        type: 'Park',
        brand: 'Element',
        pricePerHour: 14.00,
        status: 'available',
        imageUrl: 'https://via.placeholder.com/300x200?text=Park+Shredder'
      },
      {
        name: 'City Commuter',
        type: 'Cruiser',
        brand: 'Santa Cruz',
        pricePerHour: 11.00,
        status: 'available',
        imageUrl: 'https://via.placeholder.com/300x200?text=City+Commuter'
      },
      {
        name: 'Technical Beast',
        type: 'Technical',
        brand: 'Zero',
        pricePerHour: 17.00,
        status: 'available',
        imageUrl: 'https://via.placeholder.com/300x200?text=Technical+Beast'
      },
      {
        name: 'Beginner Board',
        type: 'Street',
        brand: 'Powell',
        pricePerHour: 10.00,
        status: 'available',
        imageUrl: 'https://via.placeholder.com/300x200?text=Beginner+Board'
      }
    ];

    // Create skateboards in database
    await Skateboard.bulkCreate(skateboards);
    console.log(`✅ Successfully seeded ${skateboards.length} skateboards!`);
  } catch (error) {
    console.error('❌ Error seeding skateboards:', error);
  }
};

export { seedSkateboards };
