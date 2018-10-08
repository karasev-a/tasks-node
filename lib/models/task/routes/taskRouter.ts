import { Router } from "express";

import taskController from "../taskController";

import Task from "../task";

const router: Router = Router();

router.get("/:taskId", taskController.getOneTask);
router.delete("/:taskId", taskController.deleteTask);
router.put("/taskId", taskController.updateTask);
router.post("/", taskController.createNewTask);
router.get("/", taskController.getAllTasks);

export default router;
