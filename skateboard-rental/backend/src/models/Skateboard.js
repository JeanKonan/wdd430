import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Skateboard = sequelize.define('Skateboard', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: true
  },
  pricePerHour: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'price_per_hour'
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'available'
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'image_url'
  }
}, {
  timestamps: true,
  tableName: 'skateboards'
});

export { Skateboard };
