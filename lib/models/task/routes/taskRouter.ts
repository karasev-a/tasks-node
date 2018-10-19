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

router.get("/:taskId/inc", taskController.increaseSubPeople);
router.get("/:taskId",  taskController.getOneTask);
router.delete("/:taskId", taskController.deleteTask);
router.put("/:taskId", CheckParamsMiddleware.validateParamsJoi(modelSchema.taskSchema), taskController.updateTask);

router.get("/categories/:catId", taskController.getTasksByCat);
router.post("/", taskController.createNewTask);
router.get("/", handleErrorAsync(taskController.getOpenTasks));

export default router;
