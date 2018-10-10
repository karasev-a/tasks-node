import { Router } from "express";

import roleController from "../roleController";

const router: Router = Router();

router.get("/:taskId", roleController.getOneRole);
router.delete("/:taskId", roleController.deleteRole);
router.put("/taskId", roleController.updateRole);
router.post("/", roleController.createNewRole);
router.get("/", roleController.getAllRoles);

export default router;
