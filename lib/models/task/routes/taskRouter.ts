import { Router } from "express";
import * as joi from "joi";

import taskController from "../taskController";
import CheckParamsMiddleware from "../../../middleware/validation/check-params.middleware";
import * as modelSchema from "../../../middleware/validation/modelSchema";
import {handleErrorAsync} from "../../../middleware/handleErrorAsync";
import {permit} from "../../../middleware/check-role.midleware";
import { Roles } from "../task";

const router: Router = Router();

router.get("/", handleErrorAsync(taskController.getAllTasks));
router.post("/:taskId/subscription", handleErrorAsync(taskController.subscribeToTask));
router.get("/myTasks", handleErrorAsync(taskController.getAllTasksOfUser));
router.get("/admintasks", permit(Roles.admin), handleErrorAsync(taskController.getAllTasksForAdmin));
router.get("/managerTasks",  permit(Roles.admin, Roles.manager), handleErrorAsync(taskController.getOnReviewTasks));
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
