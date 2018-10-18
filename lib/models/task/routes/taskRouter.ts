import { Router } from "express";

import taskController from "../taskController";

const router: Router = Router();

router.get("/:taskId/inc", taskController.increaseSubPeople);
router.get("/:taskId", taskController.getOneTask);
router.delete("/:taskId", taskController.deleteTask);
router.put("/:taskId", taskController.updateTask);

router.get("/categories/:catId", taskController.getTasksByCat);
router.post("/", taskController.createNewTask);
router.get("/", taskController.getOpenTasks);

export default router;
