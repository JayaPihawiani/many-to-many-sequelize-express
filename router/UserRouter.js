import express from "express";
import UserController from "../controller/UserController.js";

const userRouter = express.Router();
const user = new UserController();

userRouter.post("/", user.createUser);
userRouter.post("/login", user.loginUser);

export default userRouter;
