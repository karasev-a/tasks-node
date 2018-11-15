import { Router } from "express";

import UserController from "../user.controller";

const router: Router = Router();

router.get("/admin", UserController.getAllWithoutLoginUser);
router.get("/:userId", UserController.getById);
router.delete("/:userId", UserController.delete);
router.put("/:userId", UserController.update);
// router.post("/", UserController.create);
router.get("/", UserController.getAll);

export default router;
