import { Router } from "express";

import UserController from "../user.controller";

const router: Router = Router();
const handleErrorAsync = (func) => async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };

// router.get("/:userId", UserController.getById);
router.delete("/:userId", UserController.delete);
router.put("/:userId", UserController.update);
router.put("/", UserController.update);
router.post("/", UserController.create);
router.get("/", UserController.getAll);

export default router;
