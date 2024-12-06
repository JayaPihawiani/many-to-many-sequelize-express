import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const UserProduct = db.define(
  "user_product",
  { status: DataTypes.STRING },
  { freezeTableName: true }
);

export default UserProduct;
