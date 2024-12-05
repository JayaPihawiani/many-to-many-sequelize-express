import { Sequelize } from "sequelize";

const db = new Sequelize({
  database: "product_db",
  username: "root",
  password: "",
  host: "localhost",
  dialect: "mysql",
});

export default db;
