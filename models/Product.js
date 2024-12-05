import db from "../config/Database.js";
import { DataTypes } from "sequelize";

const Product = db.define(
  "product",
  {
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    qty: DataTypes.INTEGER,
  },
  { freezeTableName: true }
);

export default Product;
