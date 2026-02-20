import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_NAME || "skateboard_rental",
    process.env.DB_USER || "postgres",
    process.env.DB_PASSWORD || "password",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        logging: false,
    }
);

export { sequelize };