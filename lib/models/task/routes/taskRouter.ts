import { Router } from "express";
import * as joi from "joi";

import taskController from "../taskController";
import CheckParamsMiddleware from "../../../middleware/validation/check-params.middleware";
import * as modelSchema from "../../../middleware/validation/modelSchema";

const router: Router = Router();

const handleErrorAsync = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (error) {
    next(error);
  }
};
router.get("/", handleErrorAsync(taskController.getAllTasks));

router.get("/categoriesstatistic", handleErrorAsync(taskController.getStatistic));

router.post("/:taskId/subscription", handleErrorAsync(taskController.subscribeToTask));
router.get("/myTasks", handleErrorAsync(taskController.getAllTasksOfUser));
router.get("/onReview", handleErrorAsync(taskController.getOnReviewTasksOfManager));
router.get("/:taskId", handleErrorAsync(taskController.getOneTask));
router.delete("/:taskId", handleErrorAsync(taskController.deleteTask));
router.put("/:taskId",
  CheckParamsMiddleware.validateParamsJoi(modelSchema.taskSchema),
  handleErrorAsync(taskController.updateTask));
router.get("/categories/:categoryId", handleErrorAsync(taskController.getTasksByCategory));
router.post("/",
  CheckParamsMiddleware.validateParamsJoi(modelSchema.taskSchema),
  handleErrorAsync(taskController.createNewTask));

export default router;
