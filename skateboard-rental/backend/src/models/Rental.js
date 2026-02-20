import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Rental = sequelize.define('Rental', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id'
  },
  skateboardId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'skateboard_id'
  },
  pickupDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'pickup_date'
  },
  returnDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'return_date'
  },
  actualReturnDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'actual_return_date'
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending'
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: 'total_price'
  },
  conditionAtReturn: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'condition_at_return'
  }
}, {
  timestamps: true,
  tableName: 'rentals'
});

export { Rental };
