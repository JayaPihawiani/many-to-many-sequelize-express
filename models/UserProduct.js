import db from "../config/Database.js";

const UserProduct = db.define("user_product", {}, { freezeTableName: true });

export default UserProduct;
