import { User } from './User.js';
import { Skateboard } from './Skateboard.js';
import { Rental } from './Rental.js';

// Define relationships

// User has many Rentals
User.hasMany(Rental, {
  foreignKey: 'userId',
  as: 'rentals'
});

// Rental belongs to User
Rental.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// Skateboard has many Rentals
Skateboard.hasMany(Rental, {
  foreignKey: 'skateboardId',
  as: 'rentals'
});

// Rental belongs to Skateboard
Rental.belongsTo(Skateboard, {
  foreignKey: 'skateboardId',
  as: 'skateboard'
});

export { User, Skateboard, Rental };
