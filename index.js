import express from "express";
import cors from "cors";
import db from "./config/Database.js";
import userRouter from "./router/UserRouter.js";
import productRouter from "./router/ProductRouter.js";

const app = express();

try {
  await db.authenticate();
  // await db.sync({ alter: true });
  console.log("Database connected");
} catch (error) {
  console.log(error.message);
}

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/product", productRouter);

app.listen(5000, () => console.log("Server running on port 5000"));
