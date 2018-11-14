import * as express from "express";

import roleRouter from "../models/role/routes/roleRouter";
import taskRouter from "../models/task/routes/taskRouter";
import categoryRouter from "../models/category/routes/categoryRouter";
import userRouter from "../models/user/routes/userRouter";
import loginRouter from "./loginRouter";
import { isLogin } from "../middleware/isLogin";

const router = express.Router();
router.use("/users", userRouter);
router.use("/", loginRouter);

router.use("/tasks", isLogin, taskRouter);
router.use("/users", isLogin, userRouter);
router.use("/categories", isLogin, categoryRouter);
router.use("/roles", roleRouter);

export default router;
