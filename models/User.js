import db from "../config/Database.js";
import { DataTypes } from "sequelize";
import Product from "./Product.js";
import UserProduct from "./UserProduct.js";

const User = db.define(
  "user",
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING(15),
  },
  { freezeTableName: true }
);

User.belongsToMany(Product, { through: UserProduct, foreignKey: "userId" });
Product.belongsToMany(User, { through: UserProduct, foreignKey: "productId" });

export default User;
