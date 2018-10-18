import * as express from "express";
import { NextFunction, Request, Response } from "express";

import roleRouter from "../models/role/routes/roleRouter";
import taskRouter from "../models/task/routes/taskRouter";
import categoryRouter from "../models/category/routes/categoryRouter";
import userRouter from "../models/user/routes/userRouter";
import loginRouter from "./loginRouter";
import loginContorller from "../controllers/loginController";

const router = express.Router();

router.use("/", loginRouter);

router.use(loginContorller.islogin);

router.use("/tasks", taskRouter);
router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/roles", roleRouter);

export default router;
