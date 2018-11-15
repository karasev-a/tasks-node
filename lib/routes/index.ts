import * as express from "express";

import roleRouter from "../models/role/routes/roleRouter";
import taskRouter from "../models/task/routes/taskRouter";
import categoryRouter from "../models/category/routes/categoryRouter";
import userRouter from "../models/user/routes/userRouter";
import loginRouter from "./loginRouter";
import { isLogin } from "../middleware/isLogin";
import UserController from "../models/user/user.controller";

const router = express.Router();
router.post("/users/create", UserController.create);

router.use("/", loginRouter);

router.use("/tasks", isLogin, taskRouter);
router.use("/users", isLogin, userRouter);
router.use("/categories", isLogin, categoryRouter);
router.use("/roles", roleRouter);

export default router;
