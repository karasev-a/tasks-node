import * as express from "express";

// import * as userRouter from  "../models/user/routes/userRouter";
import taskRouter from "../models/task/routes/taskRouter";
// import * as categoryRouter from "../models/category/routes/categoryRouter";

const router = express.Router();

router.use("/tasks", taskRouter);
// router.use("/users", userRouter);
// router.use("/categoty", categoryRouter);

export default router;
