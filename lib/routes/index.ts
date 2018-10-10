import * as express from "express";

import roleRouter from "../models/role/routes/roleRouter";
import taskRouter from "../models/task/routes/taskRouter";
import categoryRouter from "../models/category/routes/categoryRouter";
import userRouter from "../models/user/routes/userRouter";

const router = express.Router();

router.use("/tasks", taskRouter);
router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/roles", roleRouter);

export default router;
