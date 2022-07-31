import { Sequelize } from "sequelize";

const db = new Sequelize("meja_data", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
